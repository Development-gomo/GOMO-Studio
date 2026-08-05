/** Blog listing `/resources/blogs`. */
import { Suspense } from "react";
import { BlogsClient } from "@/components/pages/BlogsClient";
import { BlogListingStructuredData } from "@/components/seo/BlogListingStructuredData";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { MarketingPageStructuredData } from "@/components/seo/MarketingPageStructuredData";
import { buildRouteMetadata } from "@/lib/cms/page-metadata";
import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { SITE_PATHS } from "@/lib/site-paths";

const PAGE_TITLE = "GOMO Studio Blog – AI Content, Editing & Publishing Guides";
const PAGE_DESCRIPTION =
  "Guides for editing your website with AI: content generation explained, visual editor vs. hand-coding, draft-preview-publish workflows, SEO basics for website editors, and choosing a quick CMS.";
const PAGE_KEYWORDS = [
  "ai content generation",
  "visual editor vs code",
  "draft preview publish workflow",
  "seo basics website editor",
  "quick cms",
  "ai website editor",
  "no-code website editing",
];

export async function generateMetadata() {
  return buildRouteMetadata(SITE_PATHS.resources.blogs, {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: PAGE_KEYWORDS,
  });
}

export default async function BlogsPage() {
  const overlay = await getPublishedPageOverlay(SITE_PATHS.resources.blogs);
  const content = overlay?.sections;

  return (
    <>
      <BreadcrumbStructuredData
        id="ld-blogs-breadcrumbs"
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: SITE_PATHS.resources.blogs },
        ]}
      />
      <MarketingPageStructuredData
        path={SITE_PATHS.resources.blogs}
        pageTitle={overlay?.seo?.title ?? PAGE_TITLE}
        pageDescription={overlay?.seo?.description ?? PAGE_DESCRIPTION}
      />
      <BlogListingStructuredData />
      <Suspense fallback={null}>
        <BlogsClient content={content} />
      </Suspense>
    </>
  );
}
