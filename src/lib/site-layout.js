/**
 * Shared shapes for site chrome (nav, footer) and Open Graph helpers.
 *
 * NavbarConfig: { links: SiteConfigLink[], loginLabel, loginHref, primaryCtaLabel, primaryCtaHref }
 * SiteConfigLink: { label, href, description?, target?, comingSoon?, children?: SiteConfigLink[] }
 * FooterConfig: { email, columns: {title, links: SiteConfigLink[]}[], socialLinks: {label,href,target?}[], legalLinks: SiteConfigLink[], copyrightText }
 */

/** Merge absolute image URL into Open Graph / Twitter metadata. */
export function mergeSocialPreviewImage(metadata, imageUrl) {
  if (!imageUrl) return metadata;
  const images = [{ url: imageUrl }];
  return {
    ...metadata,
    openGraph: {
      ...(typeof metadata.openGraph === "object" && metadata.openGraph ? metadata.openGraph : {}),
      images,
    },
    twitter: {
      ...(typeof metadata.twitter === "object" && metadata.twitter ? metadata.twitter : {}),
      card: "summary_large_image",
      images: [imageUrl],
    },
  };
}
