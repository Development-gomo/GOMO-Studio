"use client";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

/** Publishing Workflow capability page (marketing). */
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  LineChart,
  Rocket,
} from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { CapabilitySuiteLinks } from "@/components/capabilities/CapabilitySuiteLinks";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { PUBLISHING_WORKFLOW_FAQ } from "@/lib/marketing-faqs";
import { SITE_ROUTES } from "@/lib/site-links";
import { getCapability } from "@/lib/capabilities";
import { CAPABILITY_PAGE_CONTENT } from "@/lib/capability-page-content";
import {
  CapabilityGrid,
  CapabilityDeepDive,
  CapabilityHeroVisual,
  CapabilityHowItWorks,
  CapabilityStatsStrip,
} from "@/components/capabilities/CapabilityPageSections";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function StatusDashboardVisual() {
  const stats = [
    { label: "Pages", value: "24", status: "Published", tone: "emerald" },
    { label: "Drafts", value: "5", status: "Waiting", tone: "amber" },
    { label: "Blog posts", value: "18", status: "Published", tone: "emerald" },
    { label: "This week", value: "7", status: "Published", tone: "emerald" },
  ];

  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    red: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
  };

  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">
          Content dashboard
        </span>
        <span className="text-[9px] text-brand-600 dark:text-brand-400 font-semibold">
          Live status
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] p-2.5"
          >
            <p className="text-[8px] font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="text-sm font-black text-gray-900 dark:text-white mt-0.5">{stat.value}</p>
            <span
              className={`inline-flex mt-1.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${toneClass[stat.tone]}`}
            >
              {stat.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentTypesVisual() {
  const items = [
    { type: "Pages", metric: "Sections", target: "24 live" },
    { type: "Posts", metric: "Blog", target: "18 live" },
    { type: "Chrome", metric: "Header/Footer", target: "2 live" },
  ];

  return (
    <div className="w-full p-3 space-y-2">
      {items.map((item) => (
        <div
          key={item.metric}
          className="flex items-center gap-2.5 rounded-xl border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.04] px-2.5 py-2"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-500/15 text-[8px] font-black text-brand-700 dark:text-brand-300">
            {item.type}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-gray-700 dark:text-white/75">{item.metric}</p>
            <p className="text-[9px] text-gray-400 dark:text-white/40">{item.target}</p>
          </div>
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
        </div>
      ))}
    </div>
  );
}

function PublishHistoryVisual() {
  const points = [32, 38, 35, 44, 41, 52, 48, 58];
  const max = Math.max(...points);
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * 100},${100 - (v / max) * 82}`).join(" ");

  return (
    <div className="w-full p-3 space-y-2">
      <div className="rounded-xl border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.04] p-2.5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[9px] font-bold text-gray-500 dark:text-white/45 uppercase tracking-wider">
            Publishes — 6 week trend
          </span>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">↑ 18%</span>
        </div>
        <svg viewBox="0 0 100 50" className="h-10 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="publishTrend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9ff33" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#c9ff33" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#publishTrend)" />
          <polyline
            points={pts}
            fill="none"
            stroke="#c9ff33"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-[9px] leading-relaxed text-gray-500 dark:text-white/50">
        Track publishes over time and spot drafts piling up before they go stale.
      </p>
    </div>
  );
}

function DraftPublishedLegend() {
  const statuses = [
    { label: "Draft", desc: "Saved instantly, not yet live", color: "bg-amber-500", ring: "ring-amber-500/30" },
    { label: "Published", desc: "Live on the site right now", color: "bg-emerald-500", ring: "ring-emerald-500/30" },
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-100 dark:border-white/[0.08] bg-white dark:bg-[#13131E] shadow-xl overflow-hidden p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-5">
        Only two states to track
      </p>
      <div className="space-y-4">
        {statuses.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className={`w-3 h-3 rounded-full ${s.color} ring-4 ${s.ring}`}
            />
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{s.label}</p>
              <p className="text-xs text-gray-500 dark:text-white/50">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const keyFeatures = [
  {
    icon: Gauge,
    title: "Unified content dashboard",
    description:
      "See every page and blog post with a Draft or Published badge, filterable by type or status, in one dashboard.",
    glow: "from-brand-400/10 to-violet-400/5",
    border: "border-brand-400/20 dark:border-brand-500/20",
    Visual: StatusDashboardVisual,
  },
  {
    icon: Rocket,
    title: "One-click publish",
    description:
      "Publishing writes directly to your site's content files — no build pipeline, no waiting on a redeploy.",
    glow: "from-emerald-400/10 to-teal-400/5",
    border: "border-emerald-400/20 dark:border-emerald-500/20",
    Visual: ContentTypesVisual,
  },
  {
    icon: LineChart,
    title: "Publish history",
    description:
      "Track how often you're shipping changes so you can spot drafts piling up before they go stale.",
    glow: "from-blue-400/10 to-cyan-400/5",
    border: "border-blue-400/20 dark:border-blue-500/20",
    Visual: PublishHistoryVisual,
  },
];

const benefits = [
  {
    icon: BarChart3,
    title: "File-based, no lock-in",
    description: "Content lives as plain JSON in your own repository — no proprietary database to export from.",
  },
  {
    icon: Rocket,
    title: "No deploy required",
    description: "Publishing writes straight to content files on disk, so changes appear instantly.",
  },
  {
    icon: Gauge,
    title: "Fast setup",
    description: "Every page and post is registered once. Open the dashboard and start publishing in minutes.",
  },
];

export function PublishingWorkflowClient() {
  const publishingCapability = getCapability("publishing-workflow");
  const pageContent = CAPABILITY_PAGE_CONTENT["publishing-workflow"];

  return (
    <>
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-emerald-600/10 dark:bg-emerald-600/15 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/25 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
            Publishing Workflow · {publishingCapability.appNavLabel}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6"
          >
            {publishingCapability.heroTitleLine1}{" "}
            <span className={BRAND_HERO_GRADIENT_CLASS}>{publishingCapability.heroTitleLine2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            className="text-lg text-gray-500 dark:text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            {publishingCapability.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={STUDIO_LOGIN_PATH}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Start publishing <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={SITE_ROUTES.contact}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/85 border-2 border-gray-300 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:border-brand-400 dark:hover:border-brand-400/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a Demo
            </a>
          </motion.div>
        </div>

        <CapabilityHeroVisual variant="workflow" />
      </section>

      <CapabilityStatsStrip stats={pageContent.stats} />

      <CapabilityHowItWorks steps={pageContent.howItWorks} />

      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
              Core features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Know exactly what's live, right now
            </h2>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {keyFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${feature.glow} blur-2xl opacity-80 pointer-events-none`}
                />
                <div className="relative z-10 border-b border-gray-100 dark:border-white/[0.06] min-h-[190px] flex flex-col">
                  <feature.Visual />
                </div>
                <div className="relative z-10 p-5">
                  <div
                    className={`inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-lg border ${feature.border} bg-gradient-to-br ${feature.glow}`}
                  >
                    <feature.icon className="w-3.5 h-3.5 text-gray-600 dark:text-white/60" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1.5 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 dark:text-white/60 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CapabilityGrid
        title={pageContent.capabilityTitle}
        subtitle={pageContent.capabilitySubtitle}
        capabilities={pageContent.capabilities}
      />

      <CapabilityDeepDive
        title={pageContent.deepDiveTitle}
        subtitle={pageContent.deepDiveSubtitle}
        bullets={pageContent.deepDiveBullets}
        visual={<DraftPublishedLegend />}
        reverse
      />

      <section className="py-8 md:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#14141B] p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      <CapabilitySuiteLinks current="publishing-workflow" />

      <MarketingFaqSection
        items={PUBLISHING_WORKFLOW_FAQ}
        title="Publishing Workflow FAQ"
        subtitle="Answers about draft vs published status, instant publishing, and team access."
      />

      <CTA
        title="Start shipping content changes instantly"
        subtitle="See every page's status, review the draft, and publish straight to your content files."
        primaryCta={{ label: "Get Started", href: STUDIO_LOGIN_PATH }}
        secondaryCta={{ label: "Book a Demo", href: SITE_ROUTES.contact }}
      />
    </>
  );
}
