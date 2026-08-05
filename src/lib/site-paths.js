/**
 * Canonical folder-based marketing URLs. Use these paths everywhere (nav, sitemap, links, CMS).
 */
export const SITE_PATHS = {
  home: "/",
  platform: {
    features: "/platform/features",
    pricing: "/platform/pricing",
  },
  capabilities: {
    aiContent: "/platform/ai-content",
    visualEditor: "/platform/visual-editor",
    publishingWorkflow: "/platform/publishing-workflow",
  },
  resources: {
    blogs: "/resources/blogs",
    integrations: "/resources/integrations",
    careers: "/resources/careers",
  },
  company: {
    about: "/company/about-us",
    contact: "/company/contact",
    contactThankYou: "/company/contact/thank-you",
    brand: "/company/brand",
  },
  legal: {
    privacy: "/legal/privacy-and-policy",
    terms: "/legal/terms-of-service",
    cookies: "/legal/cookies",
  },
};

export function blogPostPath(slug) {
  return `${SITE_PATHS.resources.blogs}/${slug}`;
}

export function blogPostSlugFromPath(path) {
  const prefix = `${SITE_PATHS.resources.blogs}/`;
  if (!path.startsWith(prefix)) return undefined;
  const slug = path.slice(prefix.length).replace(/\/$/, "");
  return slug || undefined;
}
