import { getRegistryEntryByPath } from "@/lib/cms/page-registry";
import { deepMerge } from "@/lib/cms/deep-merge";
import { resolveCmsContent } from "@/lib/cms/resolve-content";
import { getBlogPostBySlug } from "@/content/blog-posts";

export async function getPublishedPageOverlay(path) {
  const entry = getRegistryEntryByPath(path);
  if (!entry || entry.type === "chrome") return null;
  return resolveCmsContent(entry.id, entry.contentFile);
}

/** Generic page overlay merge — `overlay.sections` deep-merged into `defaults`. */
export function mergePageSections(defaults, overlay) {
  if (!overlay?.sections) return defaults;
  return deepMerge(defaults, overlay.sections);
}

export function mergeBlogPost(post, overlay) {
  if (!overlay) return post;
  return {
    ...post,
    ...(overlay.title !== undefined ? { title: overlay.title } : {}),
    ...(overlay.category !== undefined ? { category: overlay.category } : {}),
    ...(overlay.readTime !== undefined ? { readTime: overlay.readTime } : {}),
    ...(overlay.dateLabel !== undefined ? { dateLabel: overlay.dateLabel } : {}),
    ...(overlay.datePublished !== undefined ? { datePublished: overlay.datePublished } : {}),
    ...(overlay.excerpt !== undefined ? { excerpt: overlay.excerpt } : {}),
    ...(overlay.description !== undefined ? { description: overlay.description } : {}),
    ...(overlay.featured !== undefined ? { featured: overlay.featured } : {}),
    ...(overlay.bodyMarkdown !== undefined ? { bodyMarkdown: overlay.bodyMarkdown } : {}),
  };
}

export async function getPublishedBlogPost(slug) {
  const base = getBlogPostBySlug(slug);
  if (!base) return undefined;
  const overlay = await resolveCmsContent(`blog-${slug}`, `blogs/${slug}.json`);
  return mergeBlogPost(base, overlay);
}
