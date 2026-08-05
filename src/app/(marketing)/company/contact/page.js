/** Contact route. */
import { ContactClient } from "@/components/pages/ContactClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Contact GOMO Studio – Book a Demo";
const PAGE_DESCRIPTION =
  "Contact GOMO Studio for demos, enterprise pricing, and support. Schedule a call to see AI Content generation, the Visual Editor, and the Publishing Workflow for your website.";

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.company.contact, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: ["contact GOMO Studio", "book demo", "AI website editor support", "enterprise pricing"],
  });
}

export default async function ContactPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.company.contact);
  const content = overlay?.sections;

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.company.contact}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <ContactClient content={content} />
    </>
  );
}
