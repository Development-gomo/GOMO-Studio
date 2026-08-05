"use client";

/** Blog index — featured newest post + paginated grid (9 per page), newest first. */
import { SITE_ROUTES } from "@/lib/site-links";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { BrandAmbient } from "@/components/visual/BrandAmbient";
import { BlogCardVisual, BlogFeaturedVisual } from "@/components/visual/capability-demos/CapabilityVisual";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";
import { getBlogPostsNewestFirst, POSTS_PER_PAGE } from "@/content/blog-posts";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const CATEGORY_STYLES = {
  "AI Content Generation":
    "bg-brand-50 text-brand-700 border-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:border-brand-500/20",
  "Visual Editor & Preview":
    "bg-emerald-50 text-emerald-800 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
  "Publishing Workflow":
    "bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
};

/** BlogsContentPreset (all optional): heroBadge, heroTitleLine1/2, heroSubtitle */

function BlogCard({ post }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={SITE_ROUTES.blogPost(post.slug)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:shadow-lg dark:border-white/[0.07] dark:bg-[#14141B] dark:hover:border-brand-500/40"
      >
        <BlogCardVisual cluster={post.cluster} />
        <div className="flex flex-1 flex-col p-6">
          <span
            className={`mb-3 inline-flex w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold ${CATEGORY_STYLES[post.category] ?? ""}`}
          >
            {post.category}
          </span>
          <h3 className="mb-3 flex-1 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-white/55">{post.excerpt}</p>
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400 dark:border-white/[0.06] dark:text-white/35">
            <span className="inline-flex items-center gap-2">
              <span>{post.dateLabel}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-brand-300">
              Read <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const blogIndex = SITE_ROUTES.blogs;

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
      <Link
        href={currentPage > 2 ? `${blogIndex}?page=${currentPage - 1}` : blogIndex}
        aria-label="Previous page"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-colors ${
          currentPage <= 1
            ? "pointer-events-none border-gray-200/50 text-gray-300 dark:border-white/[0.04] dark:text-white/20"
            : "border-gray-200 bg-white text-gray-700 hover:border-brand-400 hover:text-brand-600 dark:border-white/[0.08] dark:bg-[#14141B] dark:text-white/70 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? blogIndex : `${blogIndex}?page=${page}`}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors ${
            page === currentPage
              ? "border-brand-400 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300"
              : "border-gray-200 bg-white text-gray-700 hover:border-brand-400 hover:text-brand-600 dark:border-white/[0.08] dark:bg-[#14141B] dark:text-white/70 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={currentPage < totalPages ? `${blogIndex}?page=${currentPage + 1}` : `${blogIndex}?page=${totalPages}`}
        aria-label="Next page"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-colors ${
          currentPage >= totalPages
            ? "pointer-events-none border-gray-200/50 text-gray-300 dark:border-white/[0.04] dark:text-white/20"
            : "border-gray-200 bg-white text-gray-700 hover:border-brand-400 hover:text-brand-600 dark:border-white/[0.08] dark:bg-[#14141B] dark:text-white/70 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}

export function BlogsClient({ content }) {
  const searchParams = useSearchParams();

  const heroBadge = content?.heroBadge ?? "Blog";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Guides for";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "AI Content, Editing & Publishing";
  const heroSubtitle =
    content?.heroSubtitle ??
    "Practical guides on AI content generation, visual editing, SEO basics, and publishing workflows — written for solo builders and small teams running a quick CMS.";

  const sorted = getBlogPostsNewestFirst();
  const featured = sorted[0];
  const rest = sorted.slice(1);
  const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));

  const rawPage = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isFinite(rawPage) && rawPage >= 1 ? Math.min(Math.floor(rawPage), totalPages) : 1;

  const pagePosts = rest.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <>
      <section className="relative overflow-hidden border-b border-gray-200/80 px-4 pt-24 pb-16 dark:border-white/[0.06] sm:pt-28 sm:pb-20 md:pt-32 md:pb-24">
        <BrandAmbient variant="hero" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 backdrop-blur-sm dark:border-brand-500/20 dark:bg-white/[0.06] dark:text-brand-300"
          >
            <BookOpen className="h-3 w-3" />
            {heroBadge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="marketing-hero-title mb-6 text-gray-900 dark:text-white sm:mb-6"
          >
            {heroTitleLine1}{" "}
            <span className={BRAND_HERO_GRADIENT_CLASS}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-white/65 sm:text-xl"
          >
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="bg-[#f0f1f5] px-4 py-12 dark:bg-[#0f0f0f] sm:py-16">
        <div className="mx-auto max-w-6xl">
          {featured ? (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-12"
            >
              <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/40">
                Featured
              </p>
              <Link
                href={SITE_ROUTES.blogPost(featured.slug)}
                className="group grid overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:border-brand-400 hover:shadow-xl dark:border-white/[0.07] dark:bg-[#14141B] dark:hover:border-brand-500/40 lg:grid-cols-2"
              >
                <BlogFeaturedVisual cluster={featured.cluster} />
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${CATEGORY_STYLES[featured.category] ?? ""}`}
                    >
                      {featured.category}
                    </span>
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                      Latest
                    </span>
                  </div>
                  <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300 sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-white/60 sm:text-base">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-white/40">
                      <span>{featured.dateLabel}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featured.readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                      Read guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ) : null}

          <motion.div
            key={currentPage}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {pagePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </motion.div>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
