/**
 * Newsletter signup: validates email, then either adds a Resend contact (segment or legacy audience)
 * or sends a notification email to the team when no list id is configured.
 */
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml } from "@/lib/email-brand";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isDuplicateContactError(message) {
  const m = message.toLowerCase();
  return m.includes("already") || m.includes("duplicate") || m.includes("exist") || m.includes("unique");
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Newsletter is not configured. Set RESEND_API_KEY on the server." },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID?.trim();
  const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID?.trim();

  if (segmentId) {
    const { error } = await resend.contacts.create({ email, segments: [{ id: segmentId }] });
    if (error) {
      if (isDuplicateContactError(error.message ?? "")) {
        return NextResponse.json({ ok: true, already: true });
      }
      console.error("[newsletter] contacts.create (segment)", error);
      return NextResponse.json({ error: "Could not subscribe right now. Try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  if (audienceId) {
    const { error } = await resend.contacts.create({ email, audienceId });
    if (error) {
      if (isDuplicateContactError(error.message ?? "")) {
        return NextResponse.json({ ok: true, already: true });
      }
      console.error("[newsletter] contacts.create (audience)", error);
      return NextResponse.json({ error: "Could not subscribe right now. Try again later." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  const to = (process.env.NEWSLETTER_NOTIFY_TO ?? "hello@gomostudio.app").trim();
  const from = process.env.RESEND_FROM?.trim() || "GOMO Studio <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `Newsletter signup: ${email}`,
    html: brandedEmailHtml(`
      <p>New newsletter subscription from the website.</p>
      <p><strong>${escapeHtml(email)}</strong></p>
      <p>Add this address to your mailing list or create a Resend segment and set <code>RESEND_NEWSLETTER_SEGMENT_ID</code>.</p>
    `),
  });

  if (error) {
    console.error("[newsletter] emails.send", error);
    return NextResponse.json({ error: "Could not subscribe right now. Try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
