/**
 * Public blog article at `/resources/blogs/[slug]` — static markdown; canonical + BlogPosting JSON-LD.
 */
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { getAllBlogSlugs, getRelatedBlogPosts } from "@/content/blog-posts";
import { extractBlogFaqsForSchema } from "@/lib/blog-schema";
import { extractMarkdownH2Headings } from "@/lib/blog-headings";
import { buildBlogArticleMetadataFromCms } from "@/lib/cms/seo";
import { getPublishedBlogPost, getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { SITE_ORIGIN } from "@/lib/seo-config";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";
import { blogPostingSchema, faqPageSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) {
    return {};
  }
  const path = blogPostPath(slug);
  const overlay = await getPublishedPageOverlay(path);
  return buildBlogArticleMetadataFromCms(
    path,
    {
      title: post.title,
      description: post.description,
      excerpt: post.excerpt,
      category: post.category,
      datePublished: post.datePublished,
      keywords: post.keywords,
      primaryKeyword: post.primaryKeyword,
    },
    overlay?.seo,
  );
}

export default async function PublicBlogPage({ params }) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) {
    notFound();
  }

  const path = blogPostPath(slug);
  const canonicalUrl = `${SITE_ORIGIN}${path}`;
  const headings = extractMarkdownH2Headings(post.bodyMarkdown);
  const related = getRelatedBlogPosts(post.slug, 2);
  const faqs = extractBlogFaqsForSchema(post.bodyMarkdown);

  return (
    <>
      <BreadcrumbStructuredData
        id={`ld-blog-breadcrumbs-${post.slug}`}
        items={[
          { name: "Home", path: SITE_PATHS.home },
          { name: "Blog", path: SITE_PATHS.resources.blogs },
          { name: post.title, path },
        ]}
      />
      <JsonLd
        id={`ld-blog-${post.slug}`}
        data={blogPostingSchema({
          url: canonicalUrl,
          headline: post.title,
          description: post.description || post.excerpt,
          datePublished: post.datePublished,
          articleSection: post.category,
          keywords: post.keywords?.length
            ? post.keywords
            : [post.primaryKeyword, post.category, "AI website editor", "GOMO Studio"],
          imageUrl: `${SITE_ORIGIN}/og-image.png`,
        })}
      />
      {faqs.length > 0 ? (
        <JsonLd id={`ld-blog-faq-${post.slug}`} data={faqPageSchema(faqs)} />
      ) : null}
      <BlogArticleLayout post={post} headings={headings} related={related} />
    </>
  );
}
