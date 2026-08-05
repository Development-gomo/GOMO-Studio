import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbListSchema } from "@/lib/structured-data";

/** items: { name, path }[] */
export function BreadcrumbStructuredData({ id, items }) {
  if (items.length < 2) return null;
  return <JsonLd id={id} data={breadcrumbListSchema(items)} />;
}
