import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, webPageSchema } from "@/lib/structured-data";

/**
 * Home page JSON-LD: WebPage + FAQPage (matches visible FAQ section).
 * faqItems: { question, answer }[]
 */
export function HomeStructuredData({ faqItems, pageTitle, pageDescription }) {
  return (
    <>
      <JsonLd id="ld-home-webpage" data={webPageSchema("/", pageTitle, pageDescription)} />
      {faqItems.length > 0 ? <JsonLd id="ld-home-faq" data={faqPageSchema(faqItems)} /> : null}
    </>
  );
}
