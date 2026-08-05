import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_PRIMARY_BUTTON_CLASS, BRAND_SECONDARY_BUTTON_CLASS } from "@/lib/brand";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";

/** CtaConfig: { title, description, href, label, secondaryHref?, secondaryLabel? } */

const SLUG_CTA = {
  "ai-content-generation-explained": {
    title: "Generate your first draft with AI",
    description:
      "Open any section in the Studio editor, describe the change in plain English, and get a publish-ready suggestion back in seconds.",
    href: STUDIO_LOGIN_PATH,
    label: "Try AI Content free",
    secondaryHref: SITE_ROUTES.capabilities.aiContent,
    secondaryLabel: "See AI Content Generation",
  },
  "visual-editor-vs-code": {
    title: "Edit your site without touching code",
    description:
      "Structured forms for every section, plus a live preview rendered from your real page template — see exactly what publishing will do first.",
    href: STUDIO_LOGIN_PATH,
    label: "Open the Visual Editor",
    secondaryHref: SITE_ROUTES.capabilities.visualEditor,
    secondaryLabel: "See the Visual Editor",
  },
  "draft-preview-publish-workflow": {
    title: "Ship your next copy change in one click",
    description:
      "Draft, preview with Next.js Draft Mode, and publish straight to your content files — no deploy step, no waiting on CI.",
    href: STUDIO_LOGIN_PATH,
    label: "Start publishing free",
    secondaryHref: SITE_ROUTES.capabilities.publishingWorkflow,
    secondaryLabel: "See the Publishing Workflow",
  },
  "seo-basics-for-website-editors": {
    title: "Generate SEO fields alongside your copy",
    description:
      "Ask the AI panel for a title, description, and keyword list while you're editing a page — no separate SEO tool required.",
    href: STUDIO_LOGIN_PATH,
    label: "Try AI Content free",
  },
  "choosing-a-quick-cms": {
    title: "See if GOMO Studio fits your stack",
    description:
      "Free for a single site, structured editing, live preview, and AI content generation included from day one.",
    href: STUDIO_LOGIN_PATH,
    label: "Start free",
  },
};

const CATEGORY_CTA = {
  "AI Content Generation": {
    title: "Try AI Content Generation free",
    description: "Describe a rewrite or a new section in plain English and review the AI's first draft in your editor.",
    href: STUDIO_LOGIN_PATH,
    label: "Start generating",
  },
  "Visual Editor & Preview": {
    title: "Edit a page with the Visual Editor",
    description: "Structured forms, live Draft Mode preview, and a publish button — no markdown or JSON required.",
    href: STUDIO_LOGIN_PATH,
    label: "Open the editor",
  },
  "Publishing Workflow": {
    title: "Publish your next change instantly",
    description: "See every page's draft/published status on one dashboard, then publish straight to your content files.",
    href: STUDIO_LOGIN_PATH,
    label: "Start publishing",
  },
};

export function BlogArticleCta({ category, slug }) {
  const defaultCta = {
    title: "Explore GOMO Studio",
    description: "Generate copy with AI, edit visually with live preview, and publish instantly — all in one quick CMS.",
    href: STUDIO_LOGIN_PATH,
    label: "Get started free",
  };

  const cta = (slug ? SLUG_CTA[slug] : undefined) ?? CATEGORY_CTA[category] ?? defaultCta;

  return (
    <aside className="mt-14 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-brand-50/40 p-8 dark:border-brand-500/25 dark:from-brand-500/10 dark:via-[#14141B] dark:to-brand-500/5">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
        Next step
      </p>
      <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{cta.title}</h2>
      <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 dark:text-white/65">{cta.description}</p>
      <div className="flex flex-wrap gap-3">
        <Link href={cta.href} className={BRAND_PRIMARY_BUTTON_CLASS}>
          {cta.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {cta.secondaryHref ? (
          <Link href={cta.secondaryHref} className={BRAND_SECONDARY_BUTTON_CLASS}>
            {cta.secondaryLabel ?? "Learn more"}
          </Link>
        ) : (
          <Link href={SITE_ROUTES.blogs} className={BRAND_SECONDARY_BUTTON_CLASS}>
            More articles
          </Link>
        )}
      </div>
    </aside>
  );
}
