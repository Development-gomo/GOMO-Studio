/** Blog post slugs only — safe to import from next.config (no markdown body imports). */
export const BLOG_POST_SLUGS = [
  "ai-content-generation-explained",
  "visual-editor-vs-code",
  "draft-preview-publish-workflow",
  "seo-basics-for-website-editors",
  "choosing-a-quick-cms",
];

export function getAllBlogSlugs() {
  return [...BLOG_POST_SLUGS];
}
