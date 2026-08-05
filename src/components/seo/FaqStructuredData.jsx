import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";

/** items: { question, answer }[]. Must match visible FAQ accordion on the same page. */
export function FaqStructuredData({ items, id = "ld-faq" }) {
  if (!items.length) return null;
  return <JsonLd id={id} data={faqPageSchema(items)} />;
}
