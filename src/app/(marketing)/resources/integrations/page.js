/** Integrations directory route. */
import { IntegrationsPageClient } from "@/components/pages/IntegrationsPageClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { INTEGRATIONS_PAGE_FAQ } from "@/lib/marketing-faqs";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Integrations – CMS, Analytics, Hosting & More";
const PAGE_DESCRIPTION =
  "Connect GOMO Studio to your CMS, analytics, hosting, and marketing tools via secure OAuth. Power AI Content generation, the Visual Editor, and the Publishing Workflow with the platforms you already use.";

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.resources.integrations, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "GOMO Studio integrations",
      "CMS integration",
      "analytics integration",
      "hosting integration",
      "AI website editor integrations",
    ],
  });
}

export default async function IntegrationsPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.resources.integrations);
  const content = overlay?.sections;

  return (
    <>
      <BreadcrumbStructuredData
        id="ld-integrations-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Integrations", path: SITE_PATHS.resources.integrations },
        ]}
      />
      <MarketingPageStructuredData
        path={SITE_PATHS.resources.integrations}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
        faqItems={INTEGRATIONS_PAGE_FAQ}
      />
      <IntegrationsPageClient content={content} />
    </>
  );
}
