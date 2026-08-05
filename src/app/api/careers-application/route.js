/**
 * Careers quick apply: multipart FormData (`role`, `resume`) → email with attachment via Resend.
 * Validates MIME type and size; requires RESEND_API_KEY and verified RESEND_FROM in production.
 */
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { brandedEmailHtml } from "@/lib/email-brand";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeFilename(name) {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180);
  return base || "resume.pdf";
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY on the server." },
      { status: 503 },
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const role = String(formData.get("role") ?? "").trim();
  const resume = formData.get("resume");

  if (!role) {
    return NextResponse.json({ error: "Role is required" }, { status: 400 });
  }
  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: "Please attach your resume" }, { status: 400 });
  }
  if (resume.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 5 MB)" }, { status: 400 });
  }

  const mime = resume.type || "";
  const nameLower = resume.name.toLowerCase();
  const extOk = nameLower.endsWith(".pdf") || nameLower.endsWith(".doc") || nameLower.endsWith(".docx");
  if (mime && !ALLOWED_TYPES.has(mime)) {
    return NextResponse.json({ error: "Only PDF, DOC, or DOCX files are allowed" }, { status: 400 });
  }
  if (!mime && !extOk) {
    return NextResponse.json({ error: "Only PDF, DOC, or DOCX files are allowed" }, { status: 400 });
  }

  const to = (process.env.CAREERS_APPLICATION_TO ?? "hello@gomostudio.app").trim();
  const from = process.env.RESEND_FROM?.trim() || "GOMO Studio Careers <onboarding@resend.dev>";

  const buffer = Buffer.from(await resume.arrayBuffer());
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `Careers application: ${role}`,
    html: brandedEmailHtml(`
      <p>New resume submitted for: <strong>${escapeHtml(role)}</strong></p>
      <p>File: ${escapeHtml(resume.name)} (${escapeHtml(mime || "unknown type")})</p>
    `),
    attachments: [{ filename: sanitizeFilename(resume.name), content: buffer }],
  });

  if (error) {
    console.error("[careers-application]", error);
    return NextResponse.json({ error: "Could not send email. Try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
