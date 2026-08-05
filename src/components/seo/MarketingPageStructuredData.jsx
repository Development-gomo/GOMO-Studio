import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, webPageSchema } from "@/lib/structured-data";

/**
 * Marketing route JSON-LD: WebPage + optional FAQPage.
 * faqItems: { question, answer }[]
 */
export function MarketingPageStructuredData({
  path,
  pageTitle,
  pageDescription,
  faqItems = [],
}) {
  const slug = path.replace(/\//g, "-").replace(/^-/, "") || "home";
  return (
    <>
      <JsonLd id={`ld-webpage-${slug}`} data={webPageSchema(path, pageTitle, pageDescription)} />
      {faqItems.length > 0 ? (
        <JsonLd id={`ld-faq-${slug}`} data={faqPageSchema(faqItems)} />
      ) : null}
    </>
  );
}
