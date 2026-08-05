/** About Us route. */
import { AboutClient } from "@/components/pages/AboutClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "About GOMO Studio – AI Website Editor & Quick CMS";
const PAGE_DESCRIPTION =
  "GOMO Studio builds AI Content generation, a Visual Editor, and a Publishing Workflow for teams who want to edit their website without writing code. Learn how we help teams draft, preview, and publish site changes fast.";

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.company.about, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["about GOMO Studio", "AI website editor company", "quick CMS SaaS", "Pune tech company"],
  });
}

export default async function AboutPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.company.about);
  const content = overlay?.sections;

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.company.about}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <AboutClient content={content} />
    </>
  );
}
