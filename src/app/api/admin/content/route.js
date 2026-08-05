import { NextResponse } from "next/server";
import { listRegistryWithStatus } from "@/lib/admin/registry-content";

export async function GET() {
  const items = await listRegistryWithStatus();
  return NextResponse.json({ items });
}
