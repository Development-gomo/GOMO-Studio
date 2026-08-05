/**
 * Shared page metadata helpers — self-referencing canonical URLs for every route.
 */
import { allowSearchIndexing, SITE_ORIGIN } from "@/lib/seo-config";

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

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "GOMO Studio — AI-powered website editor and quick CMS",
};

export function canonicalUrl(path) {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") return `${SITE_ORIGIN}/`;

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      return url.pathname === "/" ? `${url.origin}/` : `${url.origin}${url.pathname}`;
    } catch {
      // Fall through and treat as a site path.
    }
  }

  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${SITE_ORIGIN}${normalized}`;
}

function socialImages(alt) {
  return [{ ...DEFAULT_OG_IMAGE, ...(alt ? { alt } : {}) }];
}

function resolveRobots(indexable) {
  const pageIndexable = indexable ?? true;
  return allowSearchIndexing() && pageIndexable ? INDEX_ROBOTS : NO_INDEX_ROBOTS;
}

export function buildPageMetadata(input) {
  const url = canonicalUrl(input.path);
  const titleAbsolute = input.title.includes("| GOMO Studio")
    ? input.title
    : `${input.title} | GOMO Studio`;

  return {
    title: { absolute: titleAbsolute },
    description: input.description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: titleAbsolute,
      description: input.description,
      siteName: "GOMO Studio",
      locale: "en_US",
      images: socialImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbsolute,
      description: input.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: resolveRobots(input.indexable),
  };
}

export function buildBlogPostMetadata(input) {
  const url = canonicalUrl(input.path);
  const titleAbsolute = input.title.includes("| GOMO Studio")
    ? input.title
    : `${input.title} | GOMO Studio Blog`;
  const description = input.description || input.excerpt;
  const keywords = input.keywords?.length
    ? input.keywords
    : [input.primaryKeyword, input.category, "GOMO Studio blog", "AI content", "CMS"].filter(Boolean);

  return {
    title: { absolute: titleAbsolute },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: titleAbsolute,
      description,
      siteName: "GOMO Studio",
      locale: "en_US",
      publishedTime: input.datePublished,
      modifiedTime: input.datePublished,
      section: input.category,
      tags: keywords.slice(0, 12),
      images: socialImages(input.title),
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbsolute,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    robots: resolveRobots(input.indexable),
  };
}
