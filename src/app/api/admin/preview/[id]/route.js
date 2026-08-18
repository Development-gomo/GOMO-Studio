import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getRegistryEntryById } from "@/lib/cms/page-registry";

/** Enables Next.js Draft Mode and opens the real route with the local draft layered in. */
export async function GET(request, { params }) {
  const { id } = await params;
  const entry = getRegistryEntryById(id);
  if (!entry) {
    return NextResponse.json({ error: "Unknown content id." }, { status: 404 });
  }

  const dm = await draftMode();
  dm.enable();

  const previewPath =
    entry.type === "chrome" || entry.type === "robots" || entry.type === "settings" ? "/" : entry.path;

  // Carry the caller's cache-busting nonce onto the redirect target too — otherwise every
  // refresh redirects to the same URL, and any HTTP cache along the way (browser or CDN) can
  // serve a stale response instead of re-checking draft mode.
  const target = new URL(previewPath, request.url);
  const nonce = new URL(request.url).searchParams.get("t");
  if (nonce) target.searchParams.set("_preview", nonce);

  const response = NextResponse.redirect(target);
  response.headers.set("Cache-Control", "no-store, must-revalidate");
  return response;
}
