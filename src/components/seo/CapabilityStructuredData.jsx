import { JsonLd } from "@/components/seo/JsonLd";
import { getCapability } from "@/lib/capabilities";
import {
  breadcrumbListSchema,
  faqPageSchema,
  productSoftwareSchema,
  webPageSchema,
} from "@/lib/structured-data";

/**
 * Capability route JSON-LD: WebPage + SoftwareApplication + optional FAQPage.
 * faqItems: { question, answer }[]
 */
export function CapabilityStructuredData({ capabilityId, faqItems = [] }) {
  const capability = getCapability(capabilityId);

  return (
    <>
      <JsonLd
        id={`ld-capability-webpage-${capabilityId}`}
        data={webPageSchema(capability.path, capability.metaTitle, capability.metaDescription)}
      />
      <JsonLd
        id={`ld-capability-software-${capabilityId}`}
        data={productSoftwareSchema(capability)}
      />
      {faqItems.length > 0 ? (
        <JsonLd id={`ld-capability-faq-${capabilityId}`} data={faqPageSchema(faqItems)} />
      ) : null}
      <JsonLd
        id={`ld-capability-breadcrumbs-${capabilityId}`}
        data={breadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: capability.name, path: capability.path },
        ])}
      />
    </>
  );
}
