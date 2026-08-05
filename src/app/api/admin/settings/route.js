import { NextResponse } from "next/server";
import { SITE_ORIGIN } from "@/lib/seo-config";

/** Read-only status of env-derived configuration — no secrets are ever returned. */
export async function GET() {
  return NextResponse.json({
    siteOrigin: SITE_ORIGIN,
    aiContentGeneration: {
      configured: Boolean(process.env.ANTHROPIC_API_KEY?.trim()),
      provider: "Anthropic Claude",
    },
    email: {
      configured: Boolean(process.env.RESEND_API_KEY?.trim()),
      provider: "Resend",
    },
    adminAuth: {
      configured:
        Boolean(process.env.ADMIN_PASSWORD?.trim()) &&
        Boolean(process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32),
    },
  });
}
