import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/structured-data";

/** Site-wide JSON-LD: Organization, WebSite, SoftwareApplication (GEO + rich results). */
export function SiteStructuredData() {
  return (
    <>
      <JsonLd id="ld-organization" data={organizationSchema()} />
      <JsonLd id="ld-website" data={websiteSchema()} />
      <JsonLd id="ld-software-application" data={softwareApplicationSchema()} />
    </>
  );
}
