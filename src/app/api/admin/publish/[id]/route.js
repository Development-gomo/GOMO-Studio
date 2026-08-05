import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getRegistryEntryById } from "@/lib/cms/page-registry";
import { publishEntry } from "@/lib/admin/registry-content";

export async function POST(request, { params }) {
  const { id } = await params;
  const entry = getRegistryEntryById(id);
  if (!entry) {
    return NextResponse.json({ error: "Unknown content id." }, { status: 404 });
  }

  const published = await publishEntry(id);
  if (!published) {
    return NextResponse.json({ error: "No draft to publish." }, { status: 400 });
  }

  if (entry.type === "robots") {
    revalidatePath("/robots.txt");
  } else if (entry.type === "chrome") {
    revalidatePath("/", "layout");
  } else {
    revalidatePath(entry.path);
  }

  return NextResponse.json({ ok: true });
}
