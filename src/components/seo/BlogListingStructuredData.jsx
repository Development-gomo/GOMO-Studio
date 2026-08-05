import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPostsNewestFirst } from "@/content/blog-posts";
import { blogListingSchema } from "@/lib/structured-data";

export function BlogListingStructuredData() {
  const posts = getBlogPostsNewestFirst();
  return (
    <JsonLd
      id="ld-blog-listing"
      data={blogListingSchema(
        posts.map((post) => ({
          slug: post.slug,
          title: post.title,
          datePublished: post.datePublished,
          description: post.description || post.excerpt,
        })),
      )}
    />
  );
}
