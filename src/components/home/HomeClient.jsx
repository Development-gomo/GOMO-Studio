"use client";

/**
 * Full marketing home: hero, integrations marquee, transformation, how-it-works, stats, pricing, FAQ, CTA.
 * Content merges optional `HomeContentPreset` overrides with sensible defaults; FAQ defaults from `default-home-faq.js`.
 */
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, Fragment } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Transformation } from "@/components/home/sections/Transformation";
import { StatsSection } from "@/components/home/sections/StatsSection";
import { Pricing } from "@/components/home/sections/Pricing";
import { HomeHero } from "@/components/home/sections/HomeHero";
import { HomeProducts } from "@/components/home/sections/HomeProducts";
import { MARQUEE_LOGO_ORDER } from "@/lib/marquee-logos";
import {
  COMING_SOON_INTEGRATION_BADGE_CLASS,
  COMING_SOON_INTEGRATION_LABEL,
  isMarketingIntegrationComingSoon,
} from "@/lib/marketing-integrations";
import {
  DEFAULT_INTEGRATION_PARTNER_LABELS,
  MARKETING_STACK_LOGOS,
} from "@/lib/marketing-stack-logos";
import { integrationLogoAlt, testimonialPhotoAlt } from "@/lib/image-alt";
import { DEFAULT_HOME_FAQ } from "@/lib/default-home-faq";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { HOME_DEFAULT_SECTION_ORDER } from "@/lib/cms/home-section-order";
import { normalizeSectionOrder as resolveSectionOrder, applyHiddenSections } from "@/lib/cms/section-order";
import {
  SAAS_EASE as EASE,
  viewportOnce,
} from "@/lib/motion";

const HowItWorks = dynamic(
  () => import("@/components/home/sections/HowItWorks").then((m) => m.HowItWorks),
  { ssr: true },
);

const CTA = dynamic(() => import("@/components/sections/CTA").then((m) => m.CTA), { ssr: true });

/* ─── constants ─────────────────────────────────────── */

function integrationPartnerRows(content) {
  const order = content?.integrationMarqueeOrder ?? MARQUEE_LOGO_ORDER;
  return order.map((key) => ({
    key,
    name: content?.integrationPartnerLabels?.[key] ?? DEFAULT_INTEGRATION_PARTNER_LABELS[key],
    src: content?.integrationLogoUrls?.[key] ?? MARKETING_STACK_LOGOS[key],
  }));
}

/* ══════════════════════════════════════════════════════
   2. TRUSTED BY
══════════════════════════════════════════════════════ */

function TrustedBySection({ content }) {
  const partners = integrationPartnerRows(content);
  return (
    <section className="overflow-hidden border-y border-gray-200/80 bg-white py-8 dark:border-white/[0.06] dark:bg-[#0f0f0f]">
      <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30">
        {content?.trustedByTitle || "Works with your stack"}
      </p>
      <div className="marquee-container relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-navy-900 to-transparent z-10 pointer-events-none"/>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-navy-900 to-transparent z-10 pointer-events-none"/>
        <div className="flex animate-marquee" style={{ width:"max-content" }}>
          {[...partners, ...partners].map((logo, i) => (
            <motion.div
              key={`${logo.name}-${i}`}
              whileHover={{ scale: 1.04, opacity: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-2 mx-10 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-[opacity,filter] duration-300 cursor-default"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.src} alt={integrationLogoAlt(logo.name)} width={22} height={22} className="object-contain shrink-0" loading="lazy"/>
              <span className="text-sm font-semibold text-gray-600 dark:text-white/50 whitespace-nowrap">{logo.name}</span>
              {isMarketingIntegrationComingSoon(logo.key) ? (
                <span
                  className={`rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${COMING_SOON_INTEGRATION_BADGE_CLASS}`}
                >
                  {COMING_SOON_INTEGRATION_LABEL}
                </span>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   5. INTEGRATIONS HUB  — grid-intersection style
══════════════════════════════════════════════════════ */

/* Hub-and-spoke integrations — all SVG coordinates in a 460×280 viewBox */
const HUB_VW = 460, HUB_VH = 280;
const HUB_CX = 230, HUB_CY = 140; // center of hub

const HUB_BASE = [
  {
    id: "nextjs",
    logoKey: "nextjs",
    name: "Next.js",
    desc: "The framework rendering every page you edit",
    connected: true,
    nx: 72,
    ny: 68,
  },
  {
    id: "github",
    logoKey: "github",
    name: "GitHub",
    desc: "Published content is committed straight to your repo",
    connected: true,
    nx: 72,
    ny: 212,
  },
  {
    id: "vercel",
    logoKey: "vercel",
    name: "Vercel",
    desc: "Publishing writes go live on your deployment instantly",
    connected: true,
    nx: 388,
    ny: 68,
  },
  {
    id: "gsc",
    logoKey: "googleSearchConsole",
    name: "Google Search Console",
    desc: "See how your published pages perform in search",
    connected: true,
    nx: 388,
    ny: 140,
  },
  {
    id: "slack",
    logoKey: "slack",
    name: "Slack",
    desc: "Get notified when a teammate publishes a change",
    connected: false,
    comingSoon: true,
    nx: 388,
    ny: 212,
  },
];

function hubIntegrationRows(content) {
  return HUB_BASE.map((b) => ({
    id: b.id,
    name: content?.integrationPartnerLabels?.[b.logoKey] ?? b.name,
    desc: b.desc,
    connected: b.connected,
    comingSoon: b.comingSoon ?? isMarketingIntegrationComingSoon(b.logoKey),
    logo: content?.integrationLogoUrls?.[b.logoKey] ?? MARKETING_STACK_LOGOS[b.logoKey],
    nx: b.nx,
    ny: b.ny,
  }));
}

function IntegrationsHub({ content }) {
  const hubRows = hubIntegrationRows(content);
  const hubBrandIcon = content?.brandIconUrl ?? "/logo-icon.png";
  /* Tile size */
  const T = 54, R = 14, LOGO = 26;

  return (
    <section className="py-8 md:py-12 px-4 bg-white dark:bg-[#0E0E14]">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {(content?.integrationsTitleLine1 || "Works with")}<br/>
            <span className="font-black">{content?.integrationsTitleLine2 || "the stack you already deploy on"}</span>
          </h2>
          <p className="text-gray-500 dark:text-white/65 text-sm">
            {content?.integrationsSubtitle || "Publishing writes straight to your repo and deployment — no extra setup required."}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* ── Pure-SVG hub diagram — zero HTML/SVG hybrid ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, ease: EASE }}
            whileHover={{ scale: 1.01 }}
            className="w-full lg:w-[500px] shrink-0"
          >
            {/*
              The SVG IS the diagram. viewBox sets the coordinate space.
              All positions (lines, tiles, logos, dots) live in the same
              SVG coordinate system — perfect alignment guaranteed.
            */}
            <svg
              viewBox={`0 0 ${HUB_VW} ${HUB_VH}`}
              className="w-full h-auto rounded-3xl border border-gray-200 dark:border-white/[0.07] overflow-visible"
              style={{ display:"block" }}
              role="img"
              aria-label="Diagram of GOMO Studio hub connected to Next.js, GitHub, Vercel, Google Search Console, and Slack"
            >
              <title>GOMO Studio integrations hub diagram</title>
              {/* ── Background ── */}
              <rect
                x="0" y="0" width={HUB_VW} height={HUB_VH} rx="24"
                style={{ fill:"var(--hub-bg)" }}
              />

              {/* Dot grid pattern */}
              <defs>
                <pattern id="dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.07)"/>
                </pattern>
                <pattern id="dotsDark" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.10)"/>
                </pattern>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#c9ff33" stopOpacity="0.12"/>
                  <stop offset="100%" stopColor="#c9ff33" stopOpacity="0"/>
                </radialGradient>
                <linearGradient id="lgLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c9ff33" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#c9ff33" stopOpacity="0.08"/>
                </linearGradient>
                <linearGradient id="lgRight" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#c9ff33" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#c9ff33" stopOpacity="0.08"/>
                </linearGradient>
                <filter id="tileShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.10)"/>
                </filter>
                <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(201,255,51,0.35)"/>
                </filter>
              </defs>

              {/* Dot overlay */}
              <rect x="0" y="0" width={HUB_VW} height={HUB_VH} rx="24" fill="url(#dots)" opacity="0.8"/>

              {/* Center ambient glow */}
              <ellipse cx={HUB_CX} cy={HUB_CY} rx="110" ry="90" fill="url(#centerGlow)"/>

              {/* ── Lines ── */}
              {hubRows.map((item) => {
                const isRight = item.nx > HUB_CX;
                return (
                  <line key={`line-${item.id}`}
                    x1={item.nx} y1={item.ny}
                    x2={HUB_CX}  y2={HUB_CY}
                    strokeLinecap="round"
                    stroke={item.connected
                      ? (isRight ? "url(#lgRight)" : "url(#lgLeft)")
                      : "rgba(201,255,51,0.42)"}
                    strokeWidth={item.connected ? "1.5" : "1.5"}
                    strokeDasharray={item.connected ? undefined : "6 5"}
                  />
                );
              })}

              {/* ── Travelling dots (connected lines only) ── */}
              {hubRows.filter((n) => n.connected).map((item, idx) => (
                <circle key={`dot-${item.id}`} r="3.5" fill="#c9ff33" opacity="0.9">
                  <animateMotion
                    dur={`${1.9 + idx * 0.4}s`}
                    repeatCount="indefinite"
                    path={`M ${item.nx} ${item.ny} L ${HUB_CX} ${HUB_CY}`}
                  />
                </circle>
              ))}

              {/* ── Pulse rings on center ── */}
              <circle cx={HUB_CX} cy={HUB_CY} r="35" fill="none" stroke="#c9ff33" strokeWidth="1">
                <animate attributeName="r"       values="32;52;32"    dur="2.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.35;0;0.35" dur="2.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx={HUB_CX} cy={HUB_CY} r="52" fill="none" stroke="#c9ff33" strokeWidth="0.6">
                <animate attributeName="r"       values="48;68;48"    dur="2.8s" begin="0.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.18;0;0.18" dur="2.8s" begin="0.8s" repeatCount="indefinite"/>
              </circle>

              {/* ── Integration nodes ── */}
              {hubRows.map((item) => (
                <g key={`node-${item.id}`}>
                  {/* Tile */}
                  <rect
                    x={item.nx - T/2} y={item.ny - T/2}
                    width={T} height={T} rx={R}
                    style={{ fill:"var(--hub-tile)", stroke:"var(--hub-tile-stroke)" }}
                    strokeWidth="1"
                    filter="url(#tileShadow)"
                  />
                  {/* Logo */}
                  <image
                    href={item.logo}
                    x={item.nx - LOGO/2} y={item.ny - LOGO/2}
                    width={LOGO} height={LOGO}
                    preserveAspectRatio="xMidYMid meet"
                  />
                  {/* Status dot */}
                  <circle
                    cx={item.nx + T/2 - 7} cy={item.ny + T/2 - 7}
                    r={5.5}
                    fill={item.connected ? "#10B981" : "#9CA3AF"}
                    stroke="var(--hub-tile)" strokeWidth="2"
                  />
                </g>
              ))}

              {/* ── Center GOMO Studio hub node ── */}
              <rect
                x={HUB_CX - 34} y={HUB_CY - 34}
                width={68} height={68} rx={18}
                style={{ fill:"var(--hub-center)", stroke:"var(--hub-tile-stroke)" }}
                strokeWidth="1.5"
                filter="url(#hubGlow)"
              />
              <image
                href={hubBrandIcon}
                x={HUB_CX - 20} y={HUB_CY - 20}
                width={40} height={40}
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </motion.div>

          {/* ── Integration list ── */}
          <div className="flex-1 w-full space-y-3">
            {hubRows.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                whileHover={{ x: -2, transition: { duration: 0.2 } }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-shadow duration-200 cursor-default group hover:shadow-md dark:hover:border-white/[0.12] ${
                  item.connected
                    ? "bg-white dark:bg-[#16161D] border-gray-100 dark:border-white/[0.07]"
                    : "bg-gray-50/80 dark:bg-[#131318] border-gray-100/70 dark:border-white/[0.05]"
                }`}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white dark:bg-[#1E1E28] shadow-sm border border-gray-100 dark:border-white/[0.07]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={integrationLogoAlt(item.name)}
                    width={22}
                    height={22}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      item.comingSoon
                        ? COMING_SOON_INTEGRATION_BADGE_CLASS
                        : item.connected
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20"
                          : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/35 border-gray-200 dark:border-white/8"
                    }`}>
                      {item.comingSoon
                        ? COMING_SOON_INTEGRATION_LABEL
                        : item.connected
                          ? "Connected"
                          : "Not connected"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-white/60 truncate">{item.desc}</p>
                </div>

                <svg className="w-4 h-4 text-gray-300 dark:text-white/20 group-hover:text-brand-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            >
              <Link href={content?.integrationsCtaHref || SITE_ROUTES.integrations}
                className="inline-flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-300 font-semibold transition-colors mt-1"
                aria-label="View all integrations"
              >
                {content?.integrationsCtaLabel || "View all integrations"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   6. TESTIMONIALS CAROUSEL
══════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { quote:"GOMO Studio replaced our entire content-request backlog. Our marketing team edits and publishes copy themselves — no dev ticket, no waiting on a deploy.", name:"Maria Rodriguez", title:"Marketing Manager", photo:"https://i.pravatar.cc/300?img=47", rating:5 },
  { quote:"We ship a full landing page rewrite in an afternoon now. The AI panel drafts the first pass, we edit in the visual editor, and publish is one click.", name:"Jennifer Walsh", title:"Head of Content", photo:"https://i.pravatar.cc/300?img=44", rating:5 },
  { quote:"Onboarding a new teammate took 20 minutes. They just open a page, describe what to change, and preview it before it goes live.", name:"Alex Kumar", title:"Growth Lead", photo:"https://i.pravatar.cc/300?img=12", rating:5 },
  { quote:"No more 'let me ask engineering.' I write the prompt, review the SEO fields, and publish myself — the whole site is finally mine to edit.", name:"Rachel Park", title:"Website Manager", photo:"https://i.pravatar.cc/300?img=32", rating:5 },
];

function TestimonialsSection({ content }) {
  const testimonials = content?.testimonials?.length ? content.testimonials : TESTIMONIALS;
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];
  const prev = ()=>setCurrent(c=>(c-1+testimonials.length)%testimonials.length);
  const next = ()=>setCurrent(c=>(c+1)%testimonials.length);

  return (
    <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {(content?.testimonialsTitleLine1 || "What our customers say")}<br/><span className="font-black">{content?.testimonialsTitleLine2 || "about us"}</span>
          </h2>
          <p className="text-gray-500 dark:text-white/65 max-w-md mx-auto text-sm">
            {content?.testimonialsSubtitle || "Teams using GOMO Studio ship content changes faster, without waiting on engineering."}
          </p>
        </motion.div>

        <div className="relative flex items-center gap-4">

          {/* Prev button */}
          <button type="button" onClick={prev} aria-label="Previous testimonial" className="w-10 h-10 shrink-0 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/50 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-300 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
              transition={{ duration:0.4, ease:EASE }}
              className="flex-1 rounded-2xl overflow-hidden bg-white dark:bg-[#16161D] border border-gray-100 dark:border-white/[0.07] flex flex-col sm:flex-row shadow-md shadow-black/5 dark:shadow-black/50"
            >
              {/* Avatar panel */}
              <div className="sm:w-48 shrink-0 relative overflow-hidden bg-gray-50 dark:bg-[#1A1A22] flex flex-col items-center justify-center p-6 gap-3 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-white/[0.07]">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-brand-100 dark:ring-brand-500/20 shadow-md">
                  <Image
                    src={t.photo}
                    alt={testimonialPhotoAlt(t.name, t.title)}
                    width={80}
                    height={80}
                    sizes="80px"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-400 dark:text-white/58 mt-0.5">{t.title}</p>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length:t.rating }).map((_,i)=>(
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Quote panel */}
              <div className="flex-1 p-8 flex flex-col justify-between">
                {/* Opening quote mark */}
                <svg className="mb-4 h-8 w-8 text-brand-400 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-gray-700 dark:text-white/88 text-base sm:text-lg leading-relaxed flex-1">
                  {t.quote}
                </p>
                {/* Dots */}
                <div className="flex gap-1.5 mt-6" role="tablist" aria-label="Choose testimonial">
                  {testimonials.map((_,i)=>(
                    <button key={i} type="button" onClick={()=>setCurrent(i)}
                      role="tab"
                      aria-selected={i===current}
                      aria-label={`Testimonial ${i+1} of ${testimonials.length}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i===current ? "bg-brand-500 w-5" : "bg-gray-200 dark:bg-white/15 w-1.5 hover:bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next button */}
          <button type="button" onClick={next} aria-label="Next testimonial" className="btn-brand-primary h-10 w-10 shrink-0 rounded-full shadow-lg hover:scale-105">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   7. FAQ
══════════════════════════════════════════════════════ */

function FAQSection({ content }) {
  const faqs = content?.faqItems?.length ? content.faqItems : [...DEFAULT_HOME_FAQ];

  return (
    <section id="faq" className="py-8 md:py-12 px-4 bg-white dark:bg-[#0E0E14]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">{content?.faqTitle || "Frequently asked questions"}</h2>
          <p className="text-gray-500 dark:text-white/65">{content?.faqSubtitle || "Everything you need to know about GOMO Studio."}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <Accordion items={faqs}/>
        </motion.div>
        <p className="text-center text-gray-400 dark:text-white/58 text-sm mt-8">
          {content?.faqContactPrefix || "Still have questions?"}{" "}
          <Link href={content?.faqContactHref || SITE_ROUTES.contact} className="text-brand-600 dark:text-brand-400 hover:underline font-semibold" aria-label="Contact us — talk to our team">{content?.faqContactLabel || "Talk to our team"}</Link>
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════ */
export function HomeClient({ content, sectionOrder, hiddenSections }) {
  const resolvedOrder = resolveSectionOrder(sectionOrder, HOME_DEFAULT_SECTION_ORDER) ?? [...HOME_DEFAULT_SECTION_ORDER];
  const order = applyHiddenSections(resolvedOrder, hiddenSections);

  const blocks = {
    hero: <HomeHero content={content} />,
    trustedBy: <TrustedBySection content={content} />,
    transformation: <Transformation content={content?.transformation} />,
    howItWorks: <HowItWorks content={content?.howItWorks} />,
    capabilities: <HomeProducts content={content} />,
    stats: <StatsSection />,
    integrations: <IntegrationsHub content={content} />,
    testimonials: <TestimonialsSection content={content} />,
    pricing: <Pricing content={content?.pricing} />,
    faq: <FAQSection content={content} />,
    cta: (
      <CTA
        title={content?.ctaTitle}
        subtitle={content?.ctaSubtitle}
        primaryCta={
          content?.ctaPrimaryLabel || content?.ctaPrimaryHref
            ? {
                label: content?.ctaPrimaryLabel || "Get started",
                href: content?.ctaPrimaryHref || STUDIO_LOGIN_PATH,
              }
            : undefined
        }
        secondaryCta={
          content?.ctaSecondaryLabel || content?.ctaSecondaryHref
            ? {
                label: content?.ctaSecondaryLabel || "Book a demo",
                href: content?.ctaSecondaryHref || SITE_ROUTES.contact,
              }
            : undefined
        }
      />
    ),
  };

  return <>{order.map((id, index) => <Fragment key={`${id}-${index}`}>{blocks[id]}</Fragment>)}</>;
}
