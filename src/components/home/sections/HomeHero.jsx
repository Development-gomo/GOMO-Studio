"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LayoutTemplate, Rocket } from "lucide-react";
import { BrandAmbient } from "@/components/visual/BrandAmbient";
import { CapabilityVisual } from "@/components/visual/capability-demos/CapabilityVisual";
import { BRAND_HERO_GRADIENT_CLASS, BRAND_SECONDARY_BUTTON_LG_CLASS } from "@/lib/brand";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { handleSamePageHashClick } from "@/lib/hash-nav";
import { isExternalNavigationHref } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

const PILLARS = [
  { icon: Sparkles, label: "AI Content", desc: "Generate & rewrite copy" },
  { icon: LayoutTemplate, label: "Visual Editor", desc: "Edit with live preview" },
  { icon: Rocket, label: "Publishing", desc: "Draft, then ship instantly" },
];

export function HomeHero({ content }) {
  const primaryHref = content?.heroPrimaryCtaHref || STUDIO_LOGIN_PATH;
  const secondaryHref = content?.heroSecondaryCtaHref || SITE_ROUTES.contact;

  return (
    <section className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14">
      <BrandAmbient variant="hero" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 backdrop-blur-sm dark:border-brand-500/25 dark:bg-white/[0.06] dark:text-brand-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            AI-powered website backend
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
            className="marketing-hero-title mb-5 text-gray-900 dark:text-white"
          >
            {content?.heroTitleLine1 || "Edit your website with"}
            {(() => {
              const line2 =
                content?.heroTitleLine2 === ""
                  ? null
                  : content?.heroTitleLine2 || "AI, not tickets";
              return line2 ? (
                <>
                  <br />
                  <span className={BRAND_HERO_GRADIENT_CLASS}>{line2}</span>
                </>
              ) : null;
            })()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 dark:text-white/65 sm:text-lg"
          >
            {content?.heroSubtitle ||
              "Describe the copy you want and let AI draft it, edit any section in a structured visual editor, preview the real page, and publish — no code, no deploy, no dev ticket."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mb-10 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={primaryHref}
              {...(isExternalNavigationHref(primaryHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={(e) => {
                if (!isExternalNavigationHref(primaryHref)) handleSamePageHashClick(e, primaryHref);
              }}
              className="btn-brand-primary px-7 py-3.5 text-base font-bold"
            >
              {content?.heroPrimaryCtaLabel || "Get started"}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={secondaryHref}
              className={BRAND_SECONDARY_BUTTON_LG_CLASS}
            >
              {content?.heroSecondaryCtaLabel || "Book a demo"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
            className="mb-10 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-3 sm:gap-3"
          >
            {PILLARS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-xl border border-gray-200/80 bg-white/70 px-3 py-3 backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04]"
              >
                <Icon className="mb-2 h-4 w-4 text-brand-600 dark:text-brand-400" />
                <p className="text-xs font-bold text-gray-900 dark:text-white">{label}</p>
                <p className="text-[10px] text-gray-500 dark:text-white/45">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <CapabilityVisual variant="ai" />
      </div>
    </section>
  );
}
