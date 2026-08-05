/** Features marketing route. */
import { FeaturesClient } from "@/components/pages/FeaturesClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { FEATURES_PAGE_FAQ } from "@/lib/marketing-faqs";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "Features – AI Content, Visual Editor & Publishing Workflow";
const PAGE_DESCRIPTION =
  "Explore GOMO Studio features: AI content generation for pages and copy, a visual editor for on-page editing, and a draft-preview-publish workflow. Quick CMS setup with no code required.";

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.platform.features, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "AI website editor features",
      "AI content generation features",
      "visual editor software",
      "publishing workflow",
      "quick CMS",
      "no-code website editing",
    ],
  });
}

export default async function FeaturesPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.platform.features);
  const content = overlay?.sections;

  return (
    <>
      <BreadcrumbStructuredData
        id="ld-features-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Features", path: SITE_PATHS.platform.features },
        ]}
      />
      <MarketingPageStructuredData
        path={SITE_PATHS.platform.features}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
        faqItems={FEATURES_PAGE_FAQ}
      />
      <FeaturesClient content={content} />
    </>
  );
}
