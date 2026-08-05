import Link from "next/link";
import { buildPageMetadata } from "@/lib/page-seo";
import { SITE_ROUTES } from "@/lib/site-links";

export const metadata = buildPageMetadata({
  path: "/404",
  title: "Page Not Found | GOMO Studio",
  description: "The page you are looking for could not be found on GOMO Studio.",
  indexable: false,
});

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-300">404</p>
      <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Page not found</h1>
      <p className="mb-8 max-w-md text-white/60">
        The page may have moved or no longer exists. Try the links below or return to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href={SITE_ROUTES.home} className="btn-brand-primary rounded-xl px-5 py-2.5 text-sm">
          Go home
        </Link>
        <Link
          href={SITE_ROUTES.blogs}
          className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-brand-500/40 hover:text-brand-300"
        >
          Read the blog
        </Link>
      </div>
    </main>
  );
}
