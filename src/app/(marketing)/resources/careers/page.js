/** Careers route (resume upload API via `CareersClient`). */
import { CareersClient } from "@/components/pages/CareersClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Careers at GOMO Studio – Join Our Team";
const PAGE_DESCRIPTION =
  "Join GOMO Studio and build the future of AI-assisted website editing — AI Content generation, the Visual Editor, and the Publishing Workflow. Explore open roles in Pune and remote.";

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.resources.careers, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["GOMO Studio careers", "AI website editor jobs", "SaaS jobs India", "AI product careers"],
  });
}

export default async function CareersPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.resources.careers);
  const content = overlay?.sections;

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.resources.careers}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <CareersClient content={content} />
    </>
  );
}
