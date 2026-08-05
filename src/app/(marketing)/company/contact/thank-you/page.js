import { SITE_ROUTES } from "@/lib/site-links";
import { SITE_PATHS } from "@/lib/site-paths";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, Sparkles } from "lucide-react";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";
import { buildPageMetadata } from "@/lib/page-seo";

const pageMeta = buildPageMetadata({
  path: SITE_PATHS.company.contactThankYou,
  title: "Thank you – GOMO Studio",
  description: "Thanks for reaching out. We'll get back to you soon.",
  indexable: false,
});

export const metadata = {
  ...pageMeta,
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ContactThankYouPage() {
  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-[#f0f1f5] dark:bg-[#0E0E14]">
      <div className="absolute inset-0 grid-overlay opacity-[0.07] dark:opacity-[0.05] pointer-events-none" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl bg-brand-600/14 dark:bg-brand-600/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl bg-emerald-400/10"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <div className="relative mb-8">
          <div
            className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl scale-150"
            aria-hidden
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-200/80 bg-white shadow-lg shadow-emerald-500/10 dark:border-emerald-500/25 dark:bg-[#14141B]">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" aria-hidden />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 shadow-sm backdrop-blur dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
          <Sparkles className="h-3 w-3" aria-hidden />
          Message received
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Thank you!
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-white/70">
          We&apos;ve received your message and will{" "}
          <span className={BRAND_HERO_GRADIENT_CLASS}>reach out to you soon</span>.
        </p>

        <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-white/45">
          Our team typically responds within one business day. Keep an eye on your inbox — we&apos;ll
          be in touch shortly.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50/50 dark:border-white/[0.12] dark:bg-[#14141B] dark:text-white dark:hover:border-brand-500/40"
          >
            <Home className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
          <Link
            href={SITE_ROUTES.features}
            className="btn-brand-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm shadow-lg shadow-brand-600/25"
          >
            Explore features
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
