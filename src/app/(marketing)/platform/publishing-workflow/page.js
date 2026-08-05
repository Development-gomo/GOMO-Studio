/** Capability: Publishing Workflow marketing route. */
import { CapabilityStructuredData } from "@/components/seo/CapabilityStructuredData";
import { PublishingWorkflowClient } from "@/components/capabilities/PublishingWorkflowClient";
import { PUBLISHING_WORKFLOW_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";
import { getCapability } from "@/lib/capabilities";

const capability = getCapability("publishing-workflow");

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

export default function PublishingWorkflowPage() {
  return (
    <>
      <CapabilityStructuredData capabilityId="publishing-workflow" faqItems={PUBLISHING_WORKFLOW_FAQ} />
      <PublishingWorkflowClient />
    </>
  );
}
