/**
 * Per-capability metadata helpers — absolute titles avoid duplicate "| GOMO Studio" from layout template.
 */
import { getCapability } from "@/lib/capabilities";
import { canonicalUrl } from "@/lib/page-seo";
import { allowSearchIndexing } from "@/lib/seo-config";

const INDEX_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const NO_INDEX_ROBOTS = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function capabilityCanonical(path) {
  return canonicalUrl(path);
}

export function buildCapabilityMetadata(capability) {
  const url = capabilityCanonical(capability.path);
  return {
    title: { absolute: `${capability.metaTitle} | GOMO Studio` },
    description: capability.metaDescription,
    keywords: capability.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${capability.metaTitle} | GOMO Studio`,
      description: capability.metaDescription,
      siteName: "GOMO Studio",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${capability.name} — GOMO Studio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${capability.metaTitle} | GOMO Studio`,
      description: capability.metaDescription,
      images: ["/opengraph-image"],
    },
    robots: allowSearchIndexing() ? INDEX_ROBOTS : NO_INDEX_ROBOTS,
  };
}

export function buildCapabilityMetadataById(id) {
  return buildCapabilityMetadata(getCapability(id));
}
