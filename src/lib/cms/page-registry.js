import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";
import { HOME_SECTION_DEFS } from "@/lib/cms/home-section-order";

/**
 * Registry entry — maps a site route to its `content/cms/` overlay file.
 * `type`: "page" | "chrome" | "blog" | "robots". `creatable` is always false —
 * GOMO Studio edits a fixed set of routes, it doesn't create/delete pages.
 */
const PAGE_ENTRIES = [
  { id: "chrome-header", label: "Header", type: "chrome", path: "__chrome:header", contentFile: "site/header.json", creatable: false, hasSeo: false },
  { id: "chrome-footer", label: "Footer", type: "chrome", path: "__chrome:footer", contentFile: "site/footer.json", creatable: false, hasSeo: false },
  { id: "theme", label: "Theme", type: "settings", path: "__settings:theme", contentFile: "site/theme.json", creatable: false, hasSeo: false },
  { id: "home", label: "Home", type: "page", path: "/", contentFile: "pages/home.json", creatable: false, hasSeo: true, sections: HOME_SECTION_DEFS },
  { id: "features", label: "Features", type: "page", path: SITE_PATHS.platform.features, contentFile: "pages/features.json", creatable: false, hasSeo: true },
  { id: "pricing", label: "Pricing", type: "page", path: SITE_PATHS.platform.pricing, contentFile: "pages/pricing.json", creatable: false, hasSeo: true },
  { id: "integrations", label: "Integrations", type: "page", path: SITE_PATHS.resources.integrations, contentFile: "pages/integrations.json", creatable: false, hasSeo: true },
  { id: "about", label: "About Us", type: "page", path: SITE_PATHS.company.about, contentFile: "pages/about-us.json", creatable: false, hasSeo: true },
  { id: "contact", label: "Contact", type: "page", path: SITE_PATHS.company.contact, contentFile: "pages/contact.json", creatable: false, hasSeo: true },
  { id: "careers", label: "Careers", type: "page", path: SITE_PATHS.resources.careers, contentFile: "pages/careers.json", creatable: false, hasSeo: true },
  { id: "brand", label: "Brand", type: "page", path: SITE_PATHS.company.brand, contentFile: "pages/brand.json", creatable: false, hasSeo: true },
  { id: "cookies", label: "Cookies", type: "page", path: SITE_PATHS.legal.cookies, contentFile: "pages/cookies.json", creatable: false, hasSeo: true },
  { id: "blogs", label: "Blog index", type: "page", path: SITE_PATHS.resources.blogs, contentFile: "pages/blogs.json", creatable: false, hasSeo: true },
  { id: "capability-ai-content", label: "AI Content Generation", type: "page", path: SITE_PATHS.capabilities.aiContent, contentFile: "capabilities/ai-content.json", creatable: false, hasSeo: true },
  { id: "capability-visual-editor", label: "Visual Editor & Preview", type: "page", path: SITE_PATHS.capabilities.visualEditor, contentFile: "capabilities/visual-editor.json", creatable: false, hasSeo: true },
  { id: "capability-publishing-workflow", label: "Publishing Workflow", type: "page", path: SITE_PATHS.capabilities.publishingWorkflow, contentFile: "capabilities/publishing-workflow.json", creatable: false, hasSeo: true },
  { id: "privacy", label: "Privacy Policy", type: "page", path: SITE_PATHS.legal.privacy, contentFile: "legal/privacy.json", creatable: false, hasSeo: true },
  { id: "terms", label: "Terms of Service", type: "page", path: SITE_PATHS.legal.terms, contentFile: "legal/terms.json", creatable: false, hasSeo: true },
  { id: "robots", label: "Robots.txt", type: "robots", path: "/robots.txt", contentFile: "site/robots.json", creatable: false, hasSeo: false },
];

const BLOG_ENTRIES = STATIC_BLOG_POSTS.map((post) => ({
  id: `blog-${post.slug}`,
  label: post.title.length > 48 ? `${post.title.slice(0, 45)}…` : post.title,
  type: "blog",
  path: blogPostPath(post.slug),
  contentFile: `blogs/${post.slug}.json`,
  creatable: false,
  hasSeo: true,
}));

export const CMS_REGISTRY = [...PAGE_ENTRIES, ...BLOG_ENTRIES];

export function getRegistryEntryByPath(path) {
  const normalized = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return CMS_REGISTRY.find((e) => e.path === normalized);
}

export function getRegistryEntryById(id) {
  return CMS_REGISTRY.find((e) => e.id === id);
}
