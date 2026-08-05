/**
 * Static blog posts (canonical URLs: `/resources/blogs/{slug}`). Keep in sync with `BlogsClient`.
 */
import { getAllBlogSlugs } from "@/content/blog-slugs";
import { aiContentGenerationExplainedBody } from "@/content/blog-bodies/ai-content-generation-explained";
import { visualEditorVsCodeBody } from "@/content/blog-bodies/visual-editor-vs-code";
import { draftPreviewPublishWorkflowBody } from "@/content/blog-bodies/draft-preview-publish-workflow";
import { seoBasicsForWebsiteEditorsBody } from "@/content/blog-bodies/seo-basics-for-website-editors";
import { choosingAQuickCmsBody } from "@/content/blog-bodies/choosing-a-quick-cms";

export const POSTS_PER_PAGE = 9;

/**
 * StaticBlogPost: { slug, title, category, cluster: "ai"|"editor"|"workflow", readTime, dateLabel,
 * datePublished, excerpt, description, primaryKeyword, keywords[], featured?, bodyMarkdown }
 */
export const STATIC_BLOG_POSTS = [
  {
    slug: "ai-content-generation-explained",
    title: "How AI Content Generation Actually Works in GOMO Studio",
    category: "AI Content Generation",
    cluster: "ai",
    readTime: "6 min read",
    dateLabel: "Aug 4, 2026",
    datePublished: "2026-08-04T10:00:00.000Z",
    excerpt:
      "Section-aware prompts, draft-first suggestions, and why nothing an AI writes ever publishes on its own. A look inside GOMO Studio's AI panel.",
    description:
      "How GOMO Studio's AI Content Generation reads your current page content before suggesting a rewrite, what it can generate, and why every suggestion lands in a draft first.",
    primaryKeyword: "ai content generation",
    keywords: ["ai content generation", "ai copywriting", "ai website copy", "cms ai assistant"],
    featured: true,
    bodyMarkdown: aiContentGenerationExplainedBody,
  },
  {
    slug: "visual-editor-vs-code",
    title: "Visual Editing vs. Editing Code: Why Non-Developers Need a Real CMS",
    category: "Visual Editor & Preview",
    cluster: "editor",
    readTime: "6 min read",
    dateLabel: "Aug 3, 2026",
    datePublished: "2026-08-03T10:00:00.000Z",
    excerpt:
      "The real cost of a code-only content workflow, what a structured form gets you that a text file doesn't, and why preview quality matters more than people think.",
    description:
      "Why a visual editor with structured forms and real live preview beats hand-editing markdown or JSON for the majority of website content changes.",
    primaryKeyword: "visual website editor",
    keywords: ["visual website editor", "no-code cms", "cms vs code", "content editor"],
    bodyMarkdown: visualEditorVsCodeBody,
  },
  {
    slug: "draft-preview-publish-workflow",
    title: "Draft, Preview, Publish: A Safer Content Workflow for Small Teams",
    category: "Publishing Workflow",
    cluster: "workflow",
    readTime: "6 min read",
    dateLabel: "Aug 2, 2026",
    datePublished: "2026-08-02T10:00:00.000Z",
    excerpt:
      "Why two content states beat five, how preview uses your real page template instead of a mockup, and what publish actually does under the hood.",
    description:
      "Inside GOMO Studio's draft, preview, and publish workflow: instant autosave drafts, Next.js Draft Mode preview, and file-based instant publishing.",
    primaryKeyword: "content publishing workflow",
    keywords: ["draft and publish cms", "content workflow", "publish without deploy", "quick cms"],
    bodyMarkdown: draftPreviewPublishWorkflowBody,
  },
  {
    slug: "seo-basics-for-website-editors",
    title: "SEO Basics Every Website Editor Should Get Right",
    category: "AI Content Generation",
    cluster: "ai",
    readTime: "7 min read",
    dateLabel: "Aug 1, 2026",
    datePublished: "2026-08-01T10:00:00.000Z",
    excerpt:
      "The handful of SEO fields that actually matter on every page — title, description, canonical URL, Open Graph image — and how to fill them well without being a specialist.",
    description:
      "A practical guide to title, description, canonical URL, and Open Graph fields for anyone editing website content — no SEO specialism required.",
    primaryKeyword: "seo basics for editors",
    keywords: ["seo basics", "meta description", "seo title tag", "structured data"],
    bodyMarkdown: seoBasicsForWebsiteEditorsBody,
  },
  {
    slug: "choosing-a-quick-cms",
    title: "Choosing a Quick CMS: What to Look for Before You Commit",
    category: "Publishing Workflow",
    cluster: "workflow",
    readTime: "7 min read",
    dateLabel: "Jul 31, 2026",
    datePublished: "2026-07-31T10:00:00.000Z",
    excerpt:
      "A checklist for evaluating a quick CMS: who's actually using it, whether content lives in files you own, preview quality, and instant vs. deploy-gated publishing.",
    description:
      "What to evaluate before committing to a quick CMS: content ownership, preview fidelity, publish speed, and whether AI generation is scoped correctly.",
    primaryKeyword: "quick cms",
    keywords: ["quick cms", "headless cms comparison", "lightweight cms", "cms checklist"],
    bodyMarkdown: choosingAQuickCmsBody,
  },
];

export function getBlogPostsNewestFirst() {
  return [...STATIC_BLOG_POSTS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

export function getBlogPostBySlug(slug) {
  const normalized = slug.replace(/^\/+|\/+$/g, "");
  return STATIC_BLOG_POSTS.find((p) => p.slug === normalized);
}

export function getRelatedBlogPosts(slug, limit = 2) {
  const current = getBlogPostBySlug(slug);
  if (!current) return STATIC_BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, limit);

  const sameCluster = STATIC_BLOG_POSTS.filter((p) => p.slug !== slug && p.cluster === current.cluster);
  const others = STATIC_BLOG_POSTS.filter((p) => p.slug !== slug && p.cluster !== current.cluster);
  return [...sameCluster, ...others].slice(0, limit);
}

export { getAllBlogSlugs } from "@/content/blog-slugs";
