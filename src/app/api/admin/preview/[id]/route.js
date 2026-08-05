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
  return NextResponse.redirect(new URL(previewPath, request.url));
}
