import { NextResponse } from "next/server";
import {
  discardEntryDraft,
  getEntryContent,
  saveEntryDraft,
} from "@/lib/admin/registry-content";

export async function GET(request, { params }) {
  const { id } = await params;
  const result = await getEntryContent(id);
  if (!result) {
    return NextResponse.json({ error: "Unknown content id." }, { status: 404 });
  }
  return NextResponse.json(result);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  let data;
  try {
    const body = await request.json();
    data = body?.data;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json({ error: "data must be an object." }, { status: 400 });
  }

  try {
    await saveEntryDraft(id, data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const discarded = await discardEntryDraft(id);
  return NextResponse.json({ ok: true, discarded });
}
