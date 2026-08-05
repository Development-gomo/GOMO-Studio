/** Cookies Policy. */
import { CookiesClient } from "@/components/pages/CookiesClient";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";

const PAGE_TITLE = "Cookies Policy – GOMO Studio";
const PAGE_DESCRIPTION =
  "How GOMO Studio uses cookies and similar technologies on our marketing website. Manage preferences for analytics, marketing, and essential cookies.";

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.legal.cookies, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default async function CookiesPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.legal.cookies);

  return (
    <>
      <MarketingPageStructuredData
        path={SITE_PATHS.legal.cookies}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <CookiesClient content={overlay?.sections} />
    </>
  );
}
