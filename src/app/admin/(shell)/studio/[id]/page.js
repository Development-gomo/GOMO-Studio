import { notFound } from "next/navigation";
import { getRegistryEntryById } from "@/lib/cms/page-registry";
import { StudioEditor } from "@/components/admin/StudioEditor";

export default async function StudioEntryPage({ params }) {
  const { id } = await params;
  const entry = getRegistryEntryById(id);
  if (!entry) notFound();

  return <StudioEditor id={id} />;
}
