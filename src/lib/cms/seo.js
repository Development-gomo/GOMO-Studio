import { buildBlogPostMetadata, buildPageMetadata, canonicalUrl } from "@/lib/page-seo";

/** CmsSeoFields (all optional): title, description, keywords[], canonical, ogTitle, ogDescription,
 * ogImage, ogImageAlt, twitterCard, indexable, schemaType, schemaJson */

export function buildPageMetadataFromCms(path, defaults, seo) {
  const title = seo?.title ?? defaults.title;
  const description = seo?.description ?? defaults.description;
  const keywords = seo?.keywords?.length ? seo.keywords : defaults.keywords;
  const indexable = seo?.indexable ?? defaults.indexable;

  const base = buildPageMetadata({
    path,
    title,
    description,
    keywords,
    indexable,
  });

  const canonical = seo?.canonical ? canonicalUrl(seo.canonical) : undefined;
  const ogTitle = seo?.ogTitle ?? title;
  const ogDescription = seo?.ogDescription ?? description;
  const ogImage = seo?.ogImage;
  const twitterCard = seo?.twitterCard ?? "summary_large_image";

  return {
    ...base,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      ...(typeof base.openGraph === "object" ? base.openGraph : {}),
      title: ogTitle.includes("| GOMO Studio") ? ogTitle : `${ogTitle} | GOMO Studio`,
      description: ogDescription,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: seo?.ogImageAlt ?? "GOMO Studio",
              },
            ],
          }
        : {}),
    },
    twitter: {
      ...(typeof base.twitter === "object" ? base.twitter : {}),
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function buildBlogArticleMetadataFromCms(path, post, seo) {
  const title = seo?.title ?? post.title;
  const description = seo?.description ?? (post.description || post.excerpt);
  const keywords = seo?.keywords?.length
    ? seo.keywords
    : [post.primaryKeyword, ...(post.keywords ?? []), post.category, "GOMO Studio blog"].filter(Boolean);

  const base = buildBlogPostMetadata({
    path,
    title,
    description,
    excerpt: post.excerpt,
    category: post.category,
    datePublished: post.datePublished,
    keywords,
    primaryKeyword: post.primaryKeyword,
    indexable: seo?.indexable,
  });

  const ogTitle = seo?.ogTitle ?? title;
  const ogDescription = seo?.ogDescription ?? description;
  const ogImage = seo?.ogImage;
  const twitterCard = seo?.twitterCard ?? "summary_large_image";
  const canonical = seo?.canonical ? canonicalUrl(seo.canonical) : undefined;

  return {
    ...base,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      ...(typeof base.openGraph === "object" ? base.openGraph : {}),
      title: ogTitle.includes("| GOMO Studio") ? ogTitle : `${ogTitle} | GOMO Studio Blog`,
      description: ogDescription,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: seo?.ogImageAlt ?? post.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      ...(typeof base.twitter === "object" ? base.twitter : {}),
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
