"use client";

import { SITE_ROUTES } from "@/lib/site-links";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogPostMarkdown } from "@/components/blog/BlogPostMarkdown";
import { BlogArticleCta } from "@/components/blog/BlogArticleCta";
import { BlogReadingProgress } from "@/components/blog/BlogReadingProgress";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { BrandAmbient } from "@/components/visual/BrandAmbient";
import { BlogArticleHeroVisual } from "@/components/visual/capability-demos/CapabilityVisual";

const CATEGORY_STYLES = {
  "AI Content Generation":
    "bg-brand-50 text-brand-700 border-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:border-brand-500/20",
  "Visual Editor & Preview":
    "bg-emerald-50 text-emerald-800 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
  "Publishing Workflow":
    "bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function BlogArticleLayout({ post, headings, related }) {
  const categoryClass =
    CATEGORY_STYLES[post.category] ??
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-white/[0.06] dark:text-white/60 dark:border-white/[0.08]";

  return (
    <article className="bg-[#f0f1f5] dark:bg-transparent" lang="en">
      <BlogReadingProgress />

      <header className="relative overflow-hidden border-b border-gray-200/80 dark:border-white/[0.06]">
        <BrandAmbient variant="hero" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 md:pb-16 md:pt-32">
          <Link
            href={SITE_ROUTES.blogs}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-600 dark:text-white/50 dark:hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500 dark:text-white/45">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={SITE_ROUTES.blogs} className="transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-700 dark:text-white/70">{post.category}</li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_min(420px,38%)] lg:items-end lg:gap-10">
            <div className="min-w-0">
              <span
                className={`mb-5 inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${categoryClass}`}
              >
                {post.category}
              </span>
              <h1 className="marketing-hero-title mb-5 max-w-3xl text-gray-900 dark:text-white sm:mb-6">
                {post.title}
              </h1>
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-white/45">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 shrink-0" />
                  {formatDate(post.datePublished)}
                </span>
                {post.readTime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 shrink-0" />
                    {post.readTime}
                  </span>
                ) : null}
              </div>
              {post.excerpt ? (
                <p className="max-w-2xl text-base leading-relaxed text-gray-600 dark:text-white/70 sm:text-lg">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="min-w-0 lg:order-none">
              <BlogArticleHeroVisual cluster={post.cluster} />
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <aside className="mb-8 lg:hidden">
              <BlogTableOfContents headings={headings} collapsible />
            </aside>

            <div className="prose-safe rounded-2xl border border-gray-200/80 bg-white px-4 py-8 shadow-sm dark:border-white/[0.07] dark:bg-[#14141B] sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
              <BlogPostMarkdown markdown={post.bodyMarkdown} headingIds={headings.map((h) => h.id)} />
              <BlogArticleCta category={post.category} slug={post.slug} />
            </div>

            {related.length > 0 ? (
              <section className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Continue reading</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={SITE_ROUTES.blogPost(r.slug)}
                      className="group flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 transition-all hover:border-brand-400 hover:shadow-md dark:border-white/[0.08] dark:bg-[#14141B] dark:hover:border-brand-500/40"
                    >
                      <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
                        {r.category}
                      </span>
                      <h3 className="mb-3 flex-1 text-base font-bold leading-snug text-gray-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                        {r.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-white/45">
                        Read article <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BlogTableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
