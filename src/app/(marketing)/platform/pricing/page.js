/** Pricing marketing route. */
import { PricingClient } from "@/components/pages/PricingClient";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { SITE_PATHS } from "@/lib/site-paths";
import { PRICING_PAGE_FAQ } from "@/lib/marketing-faqs";

const PAGE_TITLE = "Pricing – GOMO Studio Pro & Enterprise";
const PAGE_DESCRIPTION =
  "Start free with signup AI credits. Usage-based AI pricing for AI Content generation and the Visual Editor. Top up credits in-app anytime. Publishing Workflow included without LLM metering.";

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.platform.pricing, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "GOMO Studio pricing",
      "AI website editor pricing",
      "free signup AI credits",
      "usage-based AI pricing",
      "AI credits top-up",
    ],
  });
}

export default function PricingPage() {
  return (
    <>
      <BreadcrumbStructuredData
        id="ld-pricing-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: SITE_PATHS.platform.pricing },
        ]}
      />
      <MarketingPageStructuredData
        path={SITE_PATHS.platform.pricing}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
        faqItems={PRICING_PAGE_FAQ}
      />
      <PricingClient />
    </>
  );
}
