"use client";
import { BRAND_HERO_GRADIENT_CLASS, BRAND_SECONDARY_BUTTON_LG_CLASS } from "@/lib/brand";

/** AI Content Generation capability page (marketing). */
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, FileText, Wand2, CheckCircle2, ArrowRight, Users, Bell } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { CapabilitySuiteLinks } from "@/components/capabilities/CapabilitySuiteLinks";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { AI_CONTENT_FAQ } from "@/lib/marketing-faqs";
import { SITE_ROUTES } from "@/lib/site-links";
import { resolveBottomCtas, resolveCtaPair } from "@/lib/cms/resolve-page-ctas";
import { isExternalNavigationHref } from "@/lib/utils";
import { getCapability } from "@/lib/capabilities";
import { CAPABILITY_PAGE_CONTENT } from "@/lib/capability-page-content";
import { GomoLogo } from "@/components/layout/GomoLogo";
import {
  CapabilityHighlightsSection,
  CapabilityGrid,
  CapabilityDeepDive,
  CapabilityHeroVisual,
  CapabilityHowItWorks,
  CapabilityStatsStrip,
} from "@/components/capabilities/CapabilityPageSections";
import {
  CONTENT_DEMO_ANSWERED_BADGE_CLASS,
  CONTENT_DEMO_BODY_CLASS,
  CONTENT_DEMO_INPUT_ROW_CLASS,
  CONTENT_DEMO_KEY_FINDING_CLASS,
  CONTENT_DEMO_KEY_FINDING_LABEL_CLASS,
  CONTENT_DEMO_SHELL_CLASS,
  contentDemoBarStyle,
} from "@/components/visual/capability-demos/content-demo";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── Data ─────────────────────────────────────────── */
const aiContentCapability = getCapability("ai-content");
const pageContent = CAPABILITY_PAGE_CONTENT["ai-content"];

const collaborationFeatures = [
  { icon: Users, title: "Team roles", description: "Share draft review across your team with role-based access on Pro" },
  { icon: FileText, title: "Draft-first history", description: "Every AI suggestion lands in your draft — nothing publishes without your review" },
  { icon: Bell, title: "Publish notifications", description: "Get notified when a teammate publishes a change (Slack integration coming soon)" },
];

const performanceBullets = [
  'Ask for a rewrite like "Make the hero headline punchier" and get a draft back in seconds',
  "Generate SEO titles, descriptions, and keyword lists alongside the body copy",
  "Review every suggestion in your draft before it ever touches the live site",
];

/* ── Feature card inner visuals ──────────────────── */

/* Card 1 — Prompt to draft: animated query input + response */
function PromptVisual() {
  const query = "Make the hero headline punchier";
  const NLQ_MAX = 36;
  const nlqBars = [45, 72, 38, 88, 62, 95];

  return (
    <div className={`w-full ${CONTENT_DEMO_SHELL_CLASS}`}>
      <div className={CONTENT_DEMO_INPUT_ROW_CLASS}>
        <Wand2 className="h-3.5 w-3.5 text-brand-500 shrink-0" />
        <span className="text-xs text-gray-600 dark:text-white/70 font-mono flex-1 truncate">{query}</span>
        <span className="inline-block w-0.5 h-3.5 bg-brand-500 animate-pulse shrink-0"/>
      </div>
      <div className={CONTENT_DEMO_BODY_CLASS}>
        <div className="flex items-start gap-2.5 mb-3">
          <GomoLogo variant="mark" className="h-6 w-6 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] font-semibold text-gray-700 dark:text-white/70">GOMO Studio</span>
              <span className={CONTENT_DEMO_ANSWERED_BADGE_CLASS}>Generated in 1.8s</span>
            </div>
            <div className="flex items-end gap-1 mb-2" style={{ height: NLQ_MAX }}>
              {nlqBars.map((pct, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[2px]"
                  style={contentDemoBarStyle(Math.round((pct / 100) * NLQ_MAX), i)}
                />
              ))}
            </div>
            <p className="text-[10px] text-gray-400 dark:text-white/40 flex gap-1 justify-between">
              {["Clarity", "Tone", "SEO", "Length", "Impact", "Fit"].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
          </div>
        </div>
        <div className={CONTENT_DEMO_KEY_FINDING_CLASS}>
          <span className={CONTENT_DEMO_KEY_FINDING_LABEL_CLASS}>✓ Suggestion</span>
          <span className="text-[10px] text-gray-600 dark:text-white/60 leading-relaxed">
            "Ship copy in minutes, not sprints." Saved to your draft.
          </span>
        </div>
      </div>
    </div>
  );
}

/* Card 2 — Section-aware: scoped hub grid */
function ScopedSectionsVisual() {
  const sections = [
    { name: "Hero", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { name: "Pricing", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { name: "FAQ", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { name: "SEO", bg: "bg-sky-50 dark:bg-sky-500/10" },
  ];
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div className="flex items-center gap-3">
        {sections.slice(0, 2).map((s) => (
          <div key={s.name} className={`w-11 h-11 rounded-xl ${s.bg} border border-white/80 dark:border-white/10 flex items-center justify-center shadow-sm`}>
            <span className="text-[9px] font-bold text-gray-600 dark:text-white/60">{s.name}</span>
          </div>
        ))}
      </div>
      <svg width="80" height="28" viewBox="0 0 80 28" className="opacity-50">
        <line x1="20" y1="0" x2="40" y2="28" stroke="#c9ff33" strokeWidth="1.5" strokeDasharray="3 2"/>
        <line x1="60" y1="0" x2="40" y2="28" stroke="#c9ff33" strokeWidth="1.5" strokeDasharray="3 2"/>
      </svg>
      <div className="w-14 h-14 rounded-2xl brand-ink-badge flex items-center justify-center shadow-lg shadow-brand-500/30">
        <GomoLogo variant="mark" className="h-8 w-8" />
      </div>
      <svg width="80" height="28" viewBox="0 0 80 28" className="opacity-50 rotate-180">
        <line x1="20" y1="0" x2="40" y2="28" stroke="#c9ff33" strokeWidth="1.5" strokeDasharray="3 2"/>
        <line x1="60" y1="0" x2="40" y2="28" stroke="#c9ff33" strokeWidth="1.5" strokeDasharray="3 2"/>
      </svg>
      <div className="flex items-center gap-3">
        {sections.slice(2).map((s) => (
          <div key={s.name} className={`w-11 h-11 rounded-xl ${s.bg} border border-white/80 dark:border-white/10 flex items-center justify-center shadow-sm`}>
            <span className="text-[9px] font-bold text-gray-600 dark:text-white/60">{s.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Scoped to the page you're on</span>
      </div>
    </div>
  );
}

/* Card 3 — SEO & metadata chips */
function SeoMetadataVisual() {
  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-gray-600 dark:text-white/60">SEO field completeness</span>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">+24% this week</span>
      </div>
      <svg width="100%" height="36" viewBox="0 0 160 36" preserveAspectRatio="none">
        <defs>
          <linearGradient id="insightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9ff33" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#c9ff33" stopOpacity="0.02"/>
          </linearGradient>
        </defs>
        <path d="M0 30 C20 28,35 25,55 18 S90 10,110 12 S140 5,160 2 L160 36 L0 36 Z" fill="url(#insightGrad)"/>
        <path d="M0 30 C20 28,35 25,55 18 S90 10,110 12 S140 5,160 2" stroke="#c9ff33" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
      {[
        { icon: "📝", text: "SEO title generated for /platform/pricing", color: "bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20 text-brand-600 dark:text-brand-300" },
        { icon: "🔎", text: "Meta description drafted from page copy", color: "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-700 dark:text-amber-300" },
        { icon: "🏷️", text: "3 keyword suggestions ready to review", color: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
      ].map((chip, i) => (
        <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[11px] font-medium ${chip.color}`}>
          <span>{chip.icon}</span>
          <span>{chip.text}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Mini editor-panel visual ─────────────────────── */
function EditorPanelVisual() {
  const messages = [
    { user: true, text: "Rewrite the pricing intro to be shorter." },
    { user: false, text: "Here's a tighter version — 40% fewer words, same key points." },
    { user: true, text: "Now draft an SEO title for this page." },
    { user: false, text: "\"GOMO Studio Pricing — Plans for Every Site Size\" — 54 characters." },
  ];
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"/>
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"/>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
        <span className="ml-3 text-[11px] font-mono text-gray-400 dark:text-white/30">GOMO Studio — AI panel</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Live</span>
        </span>
      </div>
      <div className="p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.user ? "justify-end" : "justify-start"}`}>
            {!m.user && (
              <div className="w-6 h-6 rounded-full brand-ink-badge flex items-center justify-center mr-2 shrink-0 mt-0.5">
                <span className="text-[7px] font-bold text-brand-500">AI</span>
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
              m.user
                ? "bg-brand-600 text-brand-lime rounded-br-sm"
                : "bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-white/80 rounded-bl-sm"
            }`}>
              {m.text}
            </div>
            {m.user && (
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center ml-2 shrink-0 mt-0.5">
                <span className="text-[8px] font-bold text-gray-500 dark:text-white/50">U</span>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-start">
          <div className="w-6 h-6 rounded-full brand-ink-badge flex items-center justify-center mr-2 shrink-0">
            <span className="text-[7px] font-bold text-brand-500">AI</span>
          </div>
          <div className="px-4 py-2.5 rounded-xl rounded-bl-sm bg-gray-100 dark:bg-white/[0.06] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }}/>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }}/>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini generation-metrics visual ───────────────── */
const BAR_MAX_PX = 52;
const BAR_DATA = [
  { pct: 65, label: "Mon" },
  { pct: 80, label: "Tue" },
  { pct: 45, label: "Wed" },
  { pct: 90, label: "Thu" },
  { pct: 72, label: "Fri" },
  { pct: 95, label: "Sat" },
  { pct: 88, label: "Sun" },
];

function GenerationMetricsVisual() {
  const metrics = [
    { label: "Drafts generated", value: "2,841", change: "+31%" },
    { label: "Avg. gen time", value: "2.4s", change: "-18%" },
    { label: "Words drafted", value: "48k", change: "+22%" },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="text-xs font-semibold text-gray-700 dark:text-white/80">Generation Overview</span>
        <span className="text-[10px] text-gray-400 dark:text-white/40 bg-gray-100 dark:bg-white/[0.06] px-2 py-0.5 rounded-full">Last 7 days</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
              <p className="text-[10px] text-gray-400 dark:text-white/50 mb-1 truncate">{m.label}</p>
              <p className="text-sm font-black text-gray-900 dark:text-white">{m.value}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{m.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/40 font-medium mb-3">
            Daily Generations
          </p>
          <div className="flex items-end gap-1.5" style={{ height: BAR_MAX_PX + 4 }}>
            {BAR_DATA.map((bar, i) => {
              const barPx = Math.round((bar.pct / 100) * BAR_MAX_PX);
              return (
                <div key={bar.label} className="flex-1 flex flex-col items-center justify-end">
                  <div
                    className="w-full rounded-t-[3px]"
                    style={{
                      height: `${barPx}px`,
                      background: `rgba(201,255,51,${0.38 + i * 0.09})`,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex mt-2">
            {BAR_DATA.map((bar) => (
              <span key={bar.label} className="flex-1 text-center text-[8px] text-gray-400 dark:text-white/30">
                {bar.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE CLIENT
   content (optional): heroBadge, heroTitleLine1/2, heroSubtitle, heroSecondarySubtitle,
   coreCapabilitiesTitle/Subtitle, ctaTitle/Subtitle, hero/bottom CTA label+href overrides
══════════════════════════════════════════════════════ */
export function AiContentClient({ content }) {
  const heroBadge = content?.heroBadge ?? "AI Content Generation · AI Content";
  const heroTitleLine1 = content?.heroTitleLine1 ?? aiContentCapability.heroTitleLine1;
  const heroTitleLine2 = content?.heroTitleLine2 ?? aiContentCapability.heroTitleLine2;
  const heroSubtitle = content?.heroSubtitle ?? aiContentCapability.description;
  const heroSecondarySubtitle =
    content?.heroSecondarySubtitle ??
    "Open the AI panel on any section, describe the change in plain English, and review a draft that matches your page's structure and tone — nothing publishes until you approve it.";
  const coreCapabilitiesSubtitle = content?.coreCapabilitiesSubtitle ?? "Core Capabilities";
  const coreCapabilitiesTitle = content?.coreCapabilitiesTitle ?? "Everything you need to draft, rewrite, and ship copy faster";
  const heroPrimaryCta = resolveCtaPair(content, "heroPrimaryCtaLabel", "heroPrimaryCtaHref", {
    label: "Get Started",
    href: STUDIO_LOGIN_PATH,
  });
  const heroSecondaryCta = resolveCtaPair(content, "heroSecondaryCtaLabel", "heroSecondaryCtaHref", {
    label: "Book a Demo",
    href: SITE_ROUTES.contact,
  });
  const heroPrimaryExternal = isExternalNavigationHref(heroPrimaryCta.href);
  const bottomCtas = resolveBottomCtas(content, {
    primary: { label: "Get started", href: STUDIO_LOGIN_PATH },
    secondary: { label: "Book a demo", href: SITE_ROUTES.contact },
  });

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, ease:EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"/>
            {heroBadge}
          </motion.div>

          <motion.h1
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.1, ease:EASE }}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6"
          >
            {heroTitleLine1} <span className={BRAND_HERO_GRADIENT_CLASS}>{heroTitleLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.2, ease:EASE }}
            className="text-lg text-gray-500 dark:text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.25, ease:EASE }}
            className="text-gray-400 dark:text-white/55 text-base mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {heroSecondarySubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.75, delay:0.3, ease:EASE }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={heroPrimaryCta.href}
              {...(heroPrimaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              aria-label={heroPrimaryExternal ? `${heroPrimaryCta.label} (opens in new tab)` : heroPrimaryCta.label}
            >
              {heroPrimaryCta.label}
              <ArrowRight className="w-4 h-4"/>
            </a>
            {isExternalNavigationHref(heroSecondaryCta.href) ? (
              <a
                href={heroSecondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={BRAND_SECONDARY_BUTTON_LG_CLASS}
              >
                {heroSecondaryCta.label}
              </a>
            ) : (
              <Link href={heroSecondaryCta.href} className={BRAND_SECONDARY_BUTTON_LG_CLASS}>
                {heroSecondaryCta.label}
              </Link>
            )}
          </motion.div>
        </div>

        <CapabilityHeroVisual variant="ai" />
      </section>

      <CapabilityStatsStrip stats={pageContent.stats} />

      <CapabilityHowItWorks steps={pageContent.howItWorks} />

      {/* ── 2. KEY FEATURES — bento cards with live mockups ── */}
      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
            className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
              {coreCapabilitiesSubtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {coreCapabilitiesTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once:true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >

            <motion.div variants={fadeUp}
              className="md:col-span-2 relative rounded-2xl p-7 overflow-hidden group
                bg-white dark:bg-[#14141B]
                border border-gray-100 dark:border-white/[0.07]
                shadow-sm hover:shadow-xl dark:hover:shadow-black/50
                hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-brand-400/10 dark:bg-brand-500/15 blur-3xl pointer-events-none"/>
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
                style={{ backgroundImage:"linear-gradient(#c9ff33 1px,transparent 1px),linear-gradient(90deg,#c9ff33 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 text-brand-600 dark:text-brand-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                  <Wand2 className="w-3 h-3"/>
                  Prompt to Draft
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">Prompt-to-Copy Generation</h3>
                <p className="text-sm text-gray-500 dark:text-white/60 mb-6 max-w-sm leading-relaxed">
                  Describe a rewrite or a new section in plain English and get a publish-ready draft back in seconds.
                </p>
                <PromptVisual/>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}
              className="relative rounded-2xl p-7 overflow-hidden group
                bg-gradient-to-br from-white to-blue-50/60 dark:from-[#14141B] dark:to-[#111520]
                border border-gray-100 dark:border-white/[0.07]
                shadow-sm hover:shadow-xl dark:hover:shadow-black/50
                hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl pointer-events-none"/>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                  <FileText className="w-3 h-3"/>
                  Section-aware
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">Section-Aware Editing</h3>
                <p className="text-sm text-gray-500 dark:text-white/60 mb-6 leading-relaxed">
                  The AI reads the section you're on before drafting, so tone and structure stay consistent.
                </p>
                <ScopedSectionsVisual/>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}
              className="md:col-span-3 relative rounded-2xl p-7 overflow-hidden group
                bg-gradient-to-br from-white to-emerald-50/40 dark:from-[#14141B] dark:to-[#111A14]
                border border-gray-100 dark:border-white/[0.07]
                shadow-sm hover:shadow-xl dark:hover:shadow-black/50
                hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"/>
              <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage:"linear-gradient(#10b981 1px,transparent 1px),linear-gradient(90deg,#10b981 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                    <Sparkles className="w-3 h-3"/>
                    SEO & Metadata
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">SEO & Metadata Included</h3>
                  <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed">
                    Generate meta titles, descriptions, and keyword lists alongside your body copy with every request.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {["Meta titles","Descriptions","Keyword lists","Open Graph copy"].map(tag=>(
                      <span key={tag} className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/[0.08]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <SeoMetadataVisual/>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <CapabilityGrid
        title={pageContent.capabilityTitle}
        subtitle={pageContent.capabilitySubtitle}
        capabilities={pageContent.capabilities}
      />

      <CapabilityHighlightsSection />

      <CapabilityDeepDive
        title={pageContent.deepDiveTitle}
        subtitle={pageContent.deepDiveSubtitle}
        bullets={pageContent.deepDiveBullets}
        visual={<EditorPanelVisual />}
      />
      <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background:"radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,255,51,0.09) 0%, transparent 70%)" }}/>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-100 dark:border-orange-500/20 mb-4">
              Why AI Content Generation
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
              Want to stop staring at a blank hero section?
            </h2>
            <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-4 max-w-2xl mx-auto">
              Save hours writing copy from scratch with GOMO Studio's AI Content Generation.
              Replace blank-page anxiety and endless drafts with a first version in seconds.
            </p>
            <p className="text-gray-400 dark:text-white/50 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
              Get a publish-ready draft in seconds instead of hours. Transform your content workflow
              with generation that understands the page you're editing.
            </p>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
              Every plan includes AI content generation — Starter comes with a monthly allowance,
              Pro is unlimited.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, delay:0.15, ease:EASE }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { val:"Unlimited", label:"AI generations on Pro" },
              { val:"<10s",  label:"Typical generation time" },
              { val:"94%",  label:"Faster than writing from scratch" },
              { val:"4.9★", label:"Customer rating" },
            ].map(s => (
              <div key={s.label} className="bg-[#f0f1f5] dark:bg-white/[0.04] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06]">
                <p className={`text-3xl font-black mb-1 ${BRAND_HERO_GRADIENT_CLASS}`}>{s.val}</p>
                <p className="text-xs text-gray-400 dark:text-white/55 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. PRICING — reuse exact home page component ── */}
      <Pricing />

      {/* ── 5. COLLABORATION ─────────────────────────── */}
      <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(201,255,51,0.10) 0%, transparent 65%)" }}/>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
                Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Draft Together,<br/>Publish With Confidence
              </h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">
                Whether you're drafting a new page, rewriting a section, or reviewing a
                teammate's changes, everything happens in the same editor with AI assistance
                on tap.
              </p>
              <ul className="space-y-5">
                {collaborationFeatures.map((feat) => (
                  <li key={feat.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-600/20 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center shrink-0">
                      <feat.icon className="w-5 h-5 text-brand-600 dark:text-brand-300"/>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-semibold mb-1">{feat.title}</p>
                      <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{feat.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href={STUDIO_LOGIN_PATH}
                className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-4 h-4"/>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.1, ease:EASE }}
            >
              <EditorPanelVisual/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. GENERATION METRICS ─────────────────────── */}
      <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{ background:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(201,255,51,0.10) 0%, transparent 65%)" }}/>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, ease:EASE }}
            >
              <GenerationMetricsVisual/>
            </motion.div>

            <motion.div
              initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.1, ease:EASE }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 mb-4">
                Performance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Ship Copy Changes<br/>as Fast as You Think of Them
              </h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">
                Track generation volume, SEO field completeness, and draft-to-publish speed with
                GOMO Studio's AI Content Generation.
              </p>
              <ul className="space-y-4 mb-8">
                {performanceBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400"/>
                    </div>
                    <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={STUDIO_LOGIN_PATH}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-4 h-4"/>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <CapabilitySuiteLinks current="ai-content" />

      <MarketingFaqSection
        items={AI_CONTENT_FAQ}
        title="AI Content Generation FAQ"
        subtitle="Common questions about AI drafts, rewrites, SEO fields, and how much AI usage is included per plan."
      />

      <CTA
        title={content?.ctaTitle}
        subtitle={content?.ctaSubtitle}
        primaryCta={bottomCtas.primaryCta}
        secondaryCta={bottomCtas.secondaryCta}
      />
    </>
  );
}
