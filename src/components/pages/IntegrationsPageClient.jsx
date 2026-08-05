"use client";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

/** Integrations page: the stack GOMO Studio runs on and connects to (`marketing-stack-logos`). */
import { motion } from "framer-motion";
import { useState } from "react";
import { Zap } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import Image from "next/image";
import { integrationLogoAlt } from "@/lib/image-alt";
import { MARKETING_STACK_LOGO_BY_INTEGRATION_NAME } from "@/lib/marketing-stack-logos";
import {
  COMING_SOON_INTEGRATION_BADGE_CLASS,
  COMING_SOON_INTEGRATION_LABEL,
} from "@/lib/marketing-integrations";
import { INTEGRATIONS_PAGE_FAQ } from "@/lib/marketing-faqs";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { resolveBottomCtas } from "@/lib/cms/resolve-page-ctas";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.55, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.05 } } };

/** The stack GOMO Studio is built on and connects to. */
const integrations = [
  {
    name: "Next.js",
    category: "Framework",
    desc: "GOMO Studio is a standard Next.js application — pages, blog posts, and site chrome are all React components rendered by Next.js.",
    siSlug: "nextdotjs",
    color: "#000000",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Next.js"],
    products: "Visual Editor · Publishing",
  },
  {
    name: "Vercel",
    category: "Hosting",
    desc: "Deploy GOMO Studio on Vercel and publishing writes go live on your deployment instantly — no separate build step required.",
    siSlug: "vercel",
    color: "#000000",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Vercel"],
    products: "Publishing Workflow",
  },
  {
    name: "GitHub",
    category: "Version Control",
    desc: "Content lives as plain JSON files in your repository, so every publish is a regular file change you can track with Git.",
    siSlug: "github",
    color: "#181717",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["GitHub"],
    products: "Publishing Workflow",
  },
  {
    name: "Google Search Console",
    category: "SEO",
    desc: "Once your SEO fields are filled in and a page is published, monitor how it performs in search from your existing GSC property.",
    siSlug: "googlesearchconsole",
    color: "#458CF5",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Google Search Console"],
    products: "SEO fields",
  },
  {
    name: "Google Analytics 4",
    category: "Analytics",
    desc: "Track visits and engagement on the pages and posts you publish through GOMO Studio.",
    siSlug: "googleanalytics",
    color: "#E37400",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Google Analytics 4"],
    products: "Analytics",
  },
  {
    name: "Slack",
    category: "Notifications",
    desc: "Get a notification in Slack when a teammate publishes a change to a page or post.",
    siSlug: "slack",
    color: "#4A154B",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Slack"],
    products: COMING_SOON_INTEGRATION_LABEL,
    comingSoon: true,
  },
  {
    name: "Zapier",
    category: "Automation",
    desc: "Trigger automations in thousands of apps whenever content is published in GOMO Studio.",
    siSlug: "zapier",
    color: "#FF4A00",
    logoSrc: MARKETING_STACK_LOGO_BY_INTEGRATION_NAME["Zapier"],
    products: COMING_SOON_INTEGRATION_LABEL,
    comingSoon: true,
  },
];

const CATEGORY_COLORS = {
  Framework: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-500/20",
  Hosting: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-500/20",
  "Version Control": "bg-gray-100 dark:bg-white/[0.07] text-gray-600 dark:text-white/60 border-gray-200 dark:border-white/[0.1]",
  SEO: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20",
  Analytics: "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-100 dark:border-brand-500/20",
  Notifications: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20",
  Automation: "bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-500/20",
};

function IntegrationLogo({ logoSrc, slug, name, color }) {
  const [localFailed, setLocalFailed] = useState(false);
  const [siFailed, setSiFailed] = useState(false);

  if (logoSrc && !localFailed) {
    return (
      <Image
        src={logoSrc}
        alt={integrationLogoAlt(name)}
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
        onError={() => setLocalFailed(true)}
        unoptimized
      />
    );
  }
  if (!siFailed) {
    return (
      <Image
        src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
        alt={integrationLogoAlt(name)}
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
        onError={() => setSiFailed(true)}
        unoptimized
      />
    );
  }
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs" style={{ backgroundColor: color }}>
      {name.substring(0, 2).toUpperCase()}
    </div>
  );
}

export function IntegrationsPageClient({ content }) {
  const heroBadge = content?.heroBadge ?? "Integrations";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Built On the Stack";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "You Already Trust";
  const heroSubtitle =
    content?.heroSubtitle ??
    "GOMO Studio is a standard Next.js application that deploys on Vercel, publishes straight to GitHub, and plays nicely with Google Search Console and Analytics — with Slack and Zapier notifications on the way.";
  const bottomCtas = resolveBottomCtas(content, {
    primary: { label: "Get started", href: STUDIO_LOGIN_PATH },
    secondary: { label: "Book a demo", href: SITE_ROUTES.contact },
  });

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Zap className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6">
            {heroTitleLine1} <span className={BRAND_HERO_GRADIENT_CLASS}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* ── GRID ─────────────────────────────────────── */}
      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            The stack behind every published page
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-white/55 mb-10 max-w-2xl mx-auto">
            GOMO Studio runs on {integrations.length} tools you likely already use — no proprietary lock-in.
          </p>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {integrations.map(itg=>(
              <motion.div key={itg.name} variants={fadeUp}
                className="relative rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 group hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:border-white/[0.07] dark:bg-[#14141B] dark:hover:border-brand-500/40 dark:hover:shadow-black/40">
                {itg.comingSoon ? (
                  <span
                    className={`absolute right-4 top-4 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${COMING_SOON_INTEGRATION_BADGE_CLASS}`}
                  >
                    {COMING_SOON_INTEGRATION_LABEL}
                  </span>
                ) : null}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.06] border border-gray-100 dark:border-white/[0.08] flex items-center justify-center p-1.5 shrink-0">
                    <IntegrationLogo logoSrc={itg.logoSrc} slug={itg.siSlug} name={itg.name} color={itg.color}/>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-tight">{itg.name}</h3>
                </div>
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2.5 ${CATEGORY_COLORS[itg.category] || "bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50 border-gray-200 dark:border-white/[0.1]"}`}>
                  {itg.category}
                </span>
                <p className="text-gray-400 dark:text-white/55 text-xs leading-relaxed">{itg.desc}</p>
                <p className={`mt-2 text-[10px] font-semibold uppercase tracking-wider ${
                  itg.comingSoon
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-brand-600 dark:text-brand-400"
                }`}>
                  {itg.products}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Pricing />

      <MarketingFaqSection
        items={INTEGRATIONS_PAGE_FAQ}
        title="Integrations FAQ"
        subtitle="How GOMO Studio works with Next.js, Vercel, GitHub, and your search console."
      />

      <CTA
        title={content?.ctaTitle ?? "Why Choose GOMO Studio?"}
        subtitle={content?.ctaSubtitle ?? "Built for teams who want to edit and publish content faster, on the stack they already trust"}
        primaryCta={bottomCtas.primaryCta}
        secondaryCta={bottomCtas.secondaryCta}
      />
    </>
  );
}
