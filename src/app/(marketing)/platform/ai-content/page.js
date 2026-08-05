/** Capability: AI Content deep-dive + pricing reuse. */
import { CapabilityStructuredData } from "@/components/seo/CapabilityStructuredData";
import { AiContentClient } from "@/components/capabilities/AiContentClient";
import { AI_CONTENT_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";
import { getCapability } from "@/lib/capabilities";

const capability = getCapability("ai-content");

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

export default async function AiContentPage() {
  const overlay = await getPublishedPageOverlay(capability.path);
  const content = overlay?.sections;

  return (
    <>
      <CapabilityStructuredData capabilityId="ai-content" faqItems={AI_CONTENT_FAQ} />
      <AiContentClient content={content} />
    </>
  );
}
