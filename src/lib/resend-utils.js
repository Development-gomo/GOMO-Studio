import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isValidEmail(email) {
  return email.length > 0 && email.length <= 254 && EMAIL_RE.test(email);
}

export function isDuplicateContactError(message) {
  const m = message.toLowerCase();
  return (
    m.includes("already") ||
    m.includes("duplicate") ||
    m.includes("exist") ||
    m.includes("unique")
  );
}

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Resend returns 401 when RESEND_API_KEY is missing, revoked, or wrong. */
export function isResendAuthError(error) {
  if (error.statusCode === 401) return true;
  const m = (error.message ?? "").toLowerCase();
  return m.includes("api key") && m.includes("invalid");
}

export function isResendDomainError(error) {
  const m = (error.message ?? "").toLowerCase();
  return (
    error.statusCode === 403 ||
    m.includes("domain") ||
    m.includes("not verified") ||
    m.includes("verify") ||
    m.includes("from address")
  );
}

export function mapResendSendError(error) {
  if (isResendAuthError(error)) {
    return "Message delivery is not configured. Please email us directly at hello@gomostudio.app.";
  }
  if (isResendDomainError(error)) {
    return "Message delivery is temporarily unavailable. Please email us directly at hello@gomostudio.app.";
  }
  return "Could not submit your message. Try again later.";
}

export function getResendFromAddress() {
  const raw = process.env.RESEND_FROM?.trim();
  if (!raw) return "GOMO Studio <onboarding@resend.dev>";
  if (raw.includes("<")) return raw;
  return `GOMO Studio <${raw}>`;
}

export function getResendSandboxFromAddress() {
  return process.env.RESEND_SANDBOX_FROM?.trim() || "GOMO Studio <onboarding@resend.dev>";
}

export function getContactNotifyTo() {
  return (process.env.CONTACT_NOTIFY_TO ?? "hello@gomostudio.app").trim();
}

export function getContactSegmentId() {
  return process.env.RESEND_CONTACT_SEGMENT_ID?.trim() || "";
}
