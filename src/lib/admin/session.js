/**
 * Minimal signed-cookie session for the GOMO Studio admin area — no external session library.
 * Uses Web Crypto (available in both the Node.js and Edge runtimes) so the same code works in
 * `middleware.js` and in route handlers. Token shape: `${expiryMs}.${hmacHex}`.
 */
const encoder = new TextEncoder();

export const ADMIN_SESSION_COOKIE = "gomo_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 12 * 60 * 60; // 12h

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return secret;
}

async function hmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex) {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

/** Both ADMIN_PASSWORD and a >=32 char ADMIN_SESSION_SECRET must be set for the admin area to work at all. */
export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD?.trim()) && Boolean(getSecret());
}

export function isAdminPasswordValid(password) {
  const expected = process.env.ADMIN_PASSWORD?.trim() ?? "";
  return expected.length > 0 && password === expected;
}

export async function createSessionToken() {
  const secret = getSecret();
  if (!secret) return null;
  const expiry = String(Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000);
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(expiry));
  return `${expiry}.${bytesToHex(signature)}`;
}

export async function verifySessionToken(token) {
  const secret = getSecret();
  if (!secret || !token) return false;

  const separatorIndex = token.indexOf(".");
  if (separatorIndex === -1) return false;
  const expiry = token.slice(0, separatorIndex);
  const signatureHex = token.slice(separatorIndex + 1);

  const signatureBytes = hexToBytes(signatureHex);
  if (!signatureBytes) return false;

  const key = await hmacKey(secret);
  const valid = await crypto.subtle.verify("HMAC", key, signatureBytes, encoder.encode(expiry));
  if (!valid) return false;

  const expiryMs = Number(expiry);
  return Number.isFinite(expiryMs) && Date.now() < expiryMs;
}
