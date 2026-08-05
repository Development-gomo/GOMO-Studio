/**
 * Schema.org JSON-LD — Organization, WebSite, SoftwareApplication, FAQPage, BlogPosting, WebPage.
 */
import { MARKETING_CONTACT_ABSOLUTE, STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { CAPABILITY_LIST } from "@/lib/capabilities";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";
import { SITE_ORIGIN } from "@/lib/seo-config";

const SITE = SITE_ORIGIN;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "GOMO Studio",
    legalName: "GOMO Studio",
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/apple-icon` },
    image: `${SITE}/opengraph-image`,
    slogan: "Your website's AI-powered backend.",
    description:
      "GOMO Studio is a quick CMS and AI content editor for your website. Manage pages, generate and rewrite copy with AI, preview changes safely with draft mode, and publish instantly — no dev deploy required.",
    email: "hello@gomostudio.app",
    knowsAbout: [
      "Content management systems",
      "AI content generation",
      "Website publishing workflows",
      "SEO metadata management",
      "Headless CMS",
      "Draft and preview workflows",
      "No-code website editing",
    ],
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [
      "https://linkedin.com/company/gomostudio",
      "https://twitter.com/gomostudio",
      "https://github.com/gomostudio",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@gomostudio.app",
      url: MARKETING_CONTACT_ABSOLUTE,
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "GOMO Studio",
    url: SITE,
    inLanguage: "en-US",
    description:
      "GOMO Studio: an AI-powered website backend editor and quick CMS with AI content generation, a visual editor with live preview, and a draft-publish workflow.",
    publisher: { "@id": `${SITE}/#organization` },
    about: { "@id": `${SITE}/#softwareapplication` },
  };
}

export function breadcrumbListSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalPathToUrl(item.path),
    })),
  };
}

function canonicalPathToUrl(path) {
  if (!path || path === "/") return `${SITE}/`;
  return `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function blogListingSchema(posts) {
  const url = `${SITE}${SITE_PATHS.resources.blogs}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: "GOMO Studio Blog — AI Content, Editing & Publishing Guides",
    description:
      "Guides on AI content generation, visual editing, SEO basics, and publishing workflows for teams running a quick CMS with GOMO Studio.",
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE}${blogPostPath(post.slug)}`,
        name: post.title,
        ...(post.description ? { description: post.description } : {}),
      })),
    },
  };
}

/** Platform suite — parent application referenced on the home page. */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE}/#softwareapplication`,
    name: "GOMO Studio",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Content Management Software",
    operatingSystem: "Web browser",
    browserRequirements: "Requires JavaScript. Modern evergreen browser.",
    url: `${SITE}${STUDIO_LOGIN_PATH}`,
    screenshot: `${SITE}/opengraph-image`,
    description:
      "GOMO Studio includes AI Content Generation, a Visual Editor with live preview, and a Publishing Workflow dashboard. Manage every page and post, generate copy with AI, and publish instantly. Free to start.",
    featureList: [
      "AI Content Generation — generate and rewrite page copy, SEO fields, and blog posts from a prompt",
      "Visual Editor & Preview — structured section forms with live draft-mode preview",
      "Publishing Workflow — draft/published status dashboard with instant publish",
      "Built-in SEO fields, structured data, and sitemap generation",
      "Fast, file-based content storage — no external CMS to configure",
    ],
    hasPart: CAPABILITY_LIST.map((c) => ({ "@id": `${SITE}${c.path}#softwareapplication` })),
    offers: {
      "@type": "Offer",
      name: "GOMO Studio Starter — free signup",
      price: "0",
      priceCurrency: "USD",
      description: "Free account for a single site with AI content generation included.",
      url: `${SITE}${STUDIO_LOGIN_PATH}`,
    },
    provider: { "@id": `${SITE}/#organization` },
    author: { "@id": `${SITE}/#organization` },
  };
}

/** Per-capability SoftwareApplication for capability landing pages and GEO. */
export function productSoftwareSchema(product) {
  const url = `${SITE}${product.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#softwareapplication`,
    name: product.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Content Management Software",
    operatingSystem: "Web browser",
    url: `${SITE}${STUDIO_LOGIN_PATH}`,
    description: product.description,
    featureList: product.features,
    isPartOf: { "@id": `${SITE}/#softwareapplication` },
    provider: { "@id": `${SITE}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: `${SITE}${STUDIO_LOGIN_PATH}`,
      description: product.billingNote ?? "Available on the GOMO Studio Starter plan.",
    },
  };
}

export function faqPageSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingSchema(input) {
  const base = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url: input.url,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    isPartOf: { "@id": `${SITE}${SITE_PATHS.resources.blogs}#webpage` },
    publisher: { "@id": `${SITE}/#organization` },
    author: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "GOMO Studio",
    },
  };
  if (input.articleSection) {
    base.articleSection = input.articleSection;
  }
  if (input.keywords?.length) {
    base.keywords = input.keywords.join(", ");
  }
  if (input.datePublished) {
    base.datePublished = input.datePublished;
    base.dateModified = input.dateModified ?? input.datePublished;
  }
  if (input.imageUrl) {
    base.image = {
      "@type": "ImageObject",
      url: input.imageUrl,
      width: 1200,
      height: 630,
    };
  }
  return base;
}

export function webPageSchema(path, name, description) {
  const url = path === "/" ? SITE : `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE}/#website` },
    publisher: { "@id": `${SITE}/#organization` },
    about: { "@id": `${SITE}/#softwareapplication` },
  };
}
