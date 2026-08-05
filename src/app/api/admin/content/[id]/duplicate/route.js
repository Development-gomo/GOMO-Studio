import { NextResponse } from "next/server";
import { duplicateEntryContent } from "@/lib/admin/registry-content";

/** Copies this entry's content onto another entry of the same type, as a draft. */
export async function POST(request, { params }) {
  const { id } = await params;
  let targetId;
  try {
    const body = await request.json();
    targetId = body?.targetId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (typeof targetId !== "string" || !targetId) {
    return NextResponse.json({ error: "targetId is required." }, { status: 400 });
  }

  try {
    await duplicateEntryContent(id, targetId);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
