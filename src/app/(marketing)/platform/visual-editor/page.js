/** Capability: Visual Editor marketing route. */
import { CapabilityStructuredData } from "@/components/seo/CapabilityStructuredData";
import { VisualEditorClient } from "@/components/capabilities/VisualEditorClient";
import { VISUAL_EDITOR_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";
import { getCapability } from "@/lib/capabilities";

const capability = getCapability("visual-editor");

export async function generateMetadata() {
  const overlay = await getPublishedPageOverlay(capability.path);
  return buildPageMetadataFromCms(
    capability.path,
    {
      title: capability.metaTitle,
      description: capability.metaDescription,
      keywords: capability.keywords,
    },
    overlay?.seo,
  );
}

export default async function VisualEditorPage() {
  const overlay = await getPublishedPageOverlay(capability.path);
  const content = overlay?.sections;

  return (
    <>
      <CapabilityStructuredData capabilityId="visual-editor" faqItems={VISUAL_EDITOR_FAQ} />
      <VisualEditorClient content={content} />
    </>
  );
}
