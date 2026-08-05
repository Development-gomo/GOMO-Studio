import { NextResponse } from "next/server";
import {
  escapeHtml,
  getContactNotifyTo,
  getContactSegmentId,
  getResendClient,
  getResendFromAddress,
  getResendSandboxFromAddress,
  isDuplicateContactError,
  isResendAuthError,
  isValidEmail,
  mapResendSendError,
} from "@/lib/resend-utils";
import { brandedEmailHtml } from "@/lib/email-brand";

const MAX_NAME = 120;
const MAX_MESSAGE = 8000;

function parseLead(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const firstName = String(body.firstName ?? "").trim().slice(0, MAX_NAME);
  const lastName = String(body.lastName ?? "").trim().slice(0, MAX_NAME);
  const email = String(body.email ?? "").trim().toLowerCase();
  const message = String(body.message ?? "").trim().slice(0, MAX_MESSAGE);

  if (!firstName || !lastName || !message || !isValidEmail(email)) return null;
  return { firstName, lastName, email, message };
}

async function upsertContactSegment(lead) {
  const resend = getResendClient();
  const segmentId = getContactSegmentId();
  if (!resend || !segmentId) return null;

  const { error } = await resend.contacts.create({
    email: lead.email,
    firstName: lead.firstName,
    lastName: lead.lastName,
    segments: [{ id: segmentId }],
  });

  if (error && !isDuplicateContactError(error.message ?? "")) {
    console.warn("[contact] segment skipped:", error.message ?? "Could not save contact");
  }

  return null;
}

function contactEmailHtml(lead) {
  return brandedEmailHtml(`
    <p><strong>New contact form submission</strong></p>
    <p>Name: ${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</p>
    <p>Email: ${escapeHtml(lead.email)}</p>
    <p>Message:</p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;margin:0">${escapeHtml(lead.message)}</pre>
  `);
}

async function trySendEmail(resend, from, lead, withReplyTo) {
  const { error } = await resend.emails.send({
    from,
    to: [getContactNotifyTo()],
    ...(withReplyTo ? { replyTo: lead.email } : {}),
    subject: `Contact form: ${lead.firstName} ${lead.lastName}`,
    html: contactEmailHtml(lead),
  });
  return error ?? null;
}

async function sendContactNotify(resend, lead) {
  const fromCandidates = [getResendFromAddress(), getResendSandboxFromAddress()];
  let lastError = null;

  for (const from of fromCandidates) {
    for (const withReplyTo of [true, false]) {
      const error = await trySendEmail(resend, from, lead, withReplyTo);
      if (!error) return null;

      lastError = error;
      console.warn(`[contact] send failed (from=${from}, replyTo=${withReplyTo}):`, error.statusCode, error.message);

      if (isResendAuthError(error)) return error;
    }
  }

  return lastError;
}

export async function POST(request) {
  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY on the server." },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json({ error: "Please fill in all fields with a valid email." }, { status: 400 });
  }

  await upsertContactSegment(lead);

  const sendError = await sendContactNotify(resend, lead);
  if (sendError) {
    console.error("[contact] notify failed:", sendError);

    if (process.env.NODE_ENV === "development") {
      console.warn("[contact] dev fallback — submission logged:", lead);
      return NextResponse.json({ ok: true, dev: true });
    }

    return NextResponse.json({ error: mapResendSendError(sendError) }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
