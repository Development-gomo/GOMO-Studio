/**
 * Home route (/): static marketing page with WebPage + FAQPage JSON-LD.
 */
import { MainHome } from "@/components/home/main/MainHome";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { DEFAULT_HOME_FAQ } from "@/lib/default-home-faq";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";

const PAGE_TITLE = "GOMO Studio – AI Website Editor & Quick CMS";
const PAGE_DESCRIPTION =
  "GOMO Studio is an AI website editor with AI Content generation, a Visual Editor for on-page editing, and a Publishing Workflow for draft, preview, and publish. Quick CMS setup, no code required. Free to start.";

export async function generateMetadata() {
  return buildRouteMetadata("/", {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "AI website editor",
      "quick CMS",
      "AI content generation",
      "visual editor",
      "publishing workflow",
      "no-code website builder",
      "AI website builder",
    ],
  });
}

export default async function HomePage() {
  const overlay = await getPublishedPageOverlay("/");
  const homeLdTitle = "AI website editing with Content, Visual Editor, and Publishing";
  const homeLdDescription = overlay?.seo?.description ?? PAGE_DESCRIPTION;

  return (
    <>
      <HomeStructuredData faqItems={[...DEFAULT_HOME_FAQ]} pageTitle={homeLdTitle} pageDescription={homeLdDescription} />
      <MainHome
        content={overlay?.sections}
        sectionOrder={overlay?.layout?.sectionOrder}
        hiddenSections={overlay?.layout?.hiddenSections}
      />
    </>
  );
}
