"use client";

/** Features landing: capability grid, SEO/integrations/admin strip, deep dives, shared CTA. */
import { motion } from "framer-motion";
import { Sparkles, LayoutTemplate, Rocket, Target, Zap, ShieldCheck, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import { integrationLogoAlt } from "@/lib/image-alt";
import { MARKETING_STACK_LOGOS } from "@/lib/marketing-stack-logos";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { FEATURES_PAGE_FAQ } from "@/lib/marketing-faqs";
import { PRIVACY_POLICY_PATH } from "@/lib/legal-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { handleSamePageHashClick } from "@/lib/hash-nav";
import { resolveBottomCtas, resolveCtaPair } from "@/lib/cms/resolve-page-ctas";
import { isExternalNavigationHref } from "@/lib/utils";
import { BrandAmbient } from "@/components/visual/BrandAmbient";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/** Fixed height so every feature card's mockup + text block line up across the row */
const BENTO_VISUAL_H = "h-[268px]";

/* ═══════════════════════════════════════════════
   BENTO CARD MINI-VISUALS
═══════════════════════════════════════════════ */

/** 1 · AI Content Generation — mini prompt + draft */
function AIContentVisual() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-1.5 overflow-hidden p-0.5">
      <div className="flex justify-end">
        <div className="flex items-end gap-1.5 max-w-[85%]">
          <div className="bg-brand-600 text-brand-lime text-[10px] leading-relaxed px-3 py-2 rounded-2xl rounded-br-sm">
            Rewrite the pricing intro to be shorter.
          </div>
          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center shrink-0 mb-0.5">
            <span className="text-[7px] font-black text-gray-500 dark:text-white/50">U</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-1.5">
        <div className="w-5 h-5 rounded-full brand-ink-badge flex items-center justify-center shrink-0 mb-0.5">
          <span className="text-[6px] font-black text-white">AI</span>
        </div>
        <div className="bg-gray-100 dark:bg-white/[0.07] text-gray-700 dark:text-white/80 text-[10px] leading-relaxed px-3 py-2 rounded-2xl rounded-bl-sm max-w-[85%]">
          Here's a tighter version — <span className="font-bold text-brand-600 dark:text-brand-300">40% fewer words</span>, same key points.
        </div>
      </div>
      <div className="mt-1 bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
        <div className="flex items-end gap-1.5 h-8">
          {[{h:80,l:"Clarity"},{h:55,l:"Tone"},{h:95,l:"SEO"},{h:65,l:"Impact"}].map((b,i)=>(
            <div key={b.l} className="flex-1 flex flex-col items-center justify-end gap-0.5">
              <div className="w-full rounded-t-[2px]" style={{height:`${Math.round(b.h*0.01*28)}px`,background:`rgba(201,255,51,${0.45+i*0.1})`}}/>
              <span className="text-[7px] text-gray-400 dark:text-white/30 truncate w-full text-center">{b.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full brand-ink-badge flex items-center justify-center shrink-0">
          <span className="text-[6px] font-black text-white">AI</span>
        </div>
        <div className="bg-gray-100 dark:bg-white/[0.07] px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center">
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"0ms"}}/>
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"120ms"}}/>
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"240ms"}}/>
        </div>
      </div>
    </div>
  );
}

/** 2 · Visual Editor — structured form fields */
function VisualEditorVisual() {
  const fields = [
    { label: "Hero headline", value: "Edit your website with AI" },
    { label: "Hero subtitle", value: "Describe the copy you want..." },
    { label: "CTA label", value: "Get started" },
  ];
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-1.5 overflow-hidden p-0.5">
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 dark:bg-white/[0.04] rounded-lg border border-gray-100 dark:border-white/[0.05]">
        <LayoutTemplate className="w-3 h-3 text-brand-600 dark:text-brand-400"/>
        <span className="text-[9px] font-semibold text-gray-600 dark:text-white/50">Hero section</span>
        <span className="ml-auto text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Draft saved</span>
      </div>
      {fields.map((f) => (
        <div key={f.label} className="rounded-lg border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] px-2.5 py-2">
          <p className="text-[8px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-semibold mb-1">{f.label}</p>
          <p className="text-[9px] text-gray-700 dark:text-white/70 truncate">{f.value}</p>
        </div>
      ))}
      <div className="mt-auto flex items-center gap-1.5">
        <div className="flex-1 h-6 bg-gray-100 dark:bg-white/[0.06] rounded-lg flex items-center justify-center">
          <span className="text-[9px] font-semibold text-gray-500 dark:text-white/45">Preview</span>
        </div>
        <div className="flex-1 h-6 bg-brand-600 rounded-lg flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">Publish</span>
        </div>
      </div>
    </div>
  );
}

/** 3 · Publishing Workflow — draft/published status dashboard */
function PublishingVisual() {
  const rows = [
    { name: "Homepage", status: "Published" },
    { name: "Pricing page", status: "Draft" },
    { name: "AI Content blog post", status: "Published" },
    { name: "Careers page", status: "Draft" },
  ];
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-1.5 overflow-hidden p-0.5">
      <div className="flex items-center justify-between px-1">
        <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-white/35 font-semibold">Content dashboard</span>
        <Rocket className="w-3 h-3 text-brand-600 dark:text-brand-400"/>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-2 bg-gray-50 dark:bg-white/[0.04] rounded-lg px-2.5 py-2 border border-gray-100 dark:border-white/[0.05]">
          <span className="flex-1 text-[9px] text-gray-700 dark:text-white/70 truncate">{r.name}</span>
          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${
            r.status === "Published"
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20"
              : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20"
          }`}>
            {r.status}
          </span>
        </div>
      ))}
      <p className="mt-auto text-[8px] text-gray-400 dark:text-white/30 text-center">Publish writes straight to your content files — no deploy.</p>
    </div>
  );
}

/** 4 · SEO fields on every page */
function SeoVisual() {
  const chips = [
    { icon: "📝", text: "SEO title generated for /platform/pricing" },
    { icon: "🔎", text: "Meta description drafted from page copy" },
    { icon: "🏷️", text: "Keyword suggestions ready to review" },
    { icon: "🔗", text: "Canonical URL & Open Graph image set" },
  ];
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-2 justify-center overflow-hidden p-0.5">
      <div className="flex items-center justify-between mb-0.5 px-1">
        <span className="text-[9px] font-semibold text-gray-600 dark:text-white/60">SEO field completeness</span>
        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">100%</span>
      </div>
      {chips.map((c, i) => (
        <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[9px] font-medium bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20 text-brand-700 dark:text-brand-300">
          <span>{c.icon}</span>
          <span className="truncate">{c.text}</span>
        </div>
      ))}
    </div>
  );
}

/** 5 · Works with your stack — sources → GOMO Studio */
function DataSyncVisual() {
  const L = MARKETING_STACK_LOGOS;
  const sources = [
    { name: "Next.js", label: "Next.js", fullName: "Next.js", src: L.nextjs },
    { name: "Vercel", label: "Vercel", fullName: "Vercel", src: L.vercel },
    { name: "GitHub", label: "GitHub", fullName: "GitHub", src: L.github },
    { name: "GSC", label: "GSC", fullName: "Google Search Console", src: L.googleSearchConsole },
  ];
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-2 overflow-hidden p-0.5">
      <div className="flex items-center gap-2 w-full justify-center">
        {sources.map(s=>(
          <div key={s.name} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-xl border border-gray-100 dark:border-white/[0.08] bg-white dark:bg-white/[0.06] flex items-center justify-center shadow-sm p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={integrationLogoAlt(s.fullName)} width={18} height={18} className="object-contain max-w-[18px] max-h-[18px]" />
            </div>
            <span className="text-[7px] text-gray-400 dark:text-white/30">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center gap-2">
        {sources.map((_,i)=>(
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="w-px h-4 bg-gradient-to-b from-gray-300 dark:from-white/20 to-emerald-400 dark:to-emerald-500"/>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce" style={{animationDelay:`${i*100}ms`}}/>
          </div>
        ))}
      </div>
      <div className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white"/>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-900 dark:text-white">GOMO Studio</p>
          <p className="text-[9px] text-gray-500 dark:text-white/50">Publish writes straight to your repo</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Live</span>
        </div>
      </div>
    </div>
  );
}

/** 6 · Simple admin dashboard */
function AdminDashboardVisual() {
  const checks = [
    { label:"Password-gated admin",       status:"active",  icon:"🔒" },
    { label:"Content stored as JSON",     status:"in repo", icon:"📁" },
    { label:"Draft autosave",             status:"active",  icon:"💾" },
    { label:"Team roles (Pro)",           status:"active",  icon:"👤" },
  ];
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-1.5 overflow-hidden p-0.5">
      <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl px-3 py-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-white"/>
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-900 dark:text-white">One dashboard</p>
          <p className="text-[9px] text-gray-500 dark:text-white/50">Every page and post in one place</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"/>
          <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold">Secure</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {checks.map((c,i)=>(
          <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05]">
            <span className="text-base leading-none">{c.icon}</span>
            <span className="text-[10px] font-semibold text-gray-700 dark:text-white/75 flex-1">{c.label}</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20">
              {c.status}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 dark:bg-white/[0.04] rounded-xl border border-gray-100 dark:border-white/[0.05]">
        <Lock className="w-3 h-3 text-gray-400 dark:text-white/30 shrink-0"/>
        <span className="text-[9px] text-gray-400 dark:text-white/40 font-medium">Search, filter by status, jump into editing</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   BENTO CARD DATA
═══════════════════════════════════════════════ */
const BENTO_CARDS = [
  { title:"AI Content Generation",  desc:"Describe a rewrite or a new section in plain English and get a publish-ready draft back in seconds.",                              icon:Sparkles, glow:"from-brand-400/10 to-violet-400/5",   border:"border-brand-400/20 dark:border-brand-500/20",   bg:"bg-white dark:bg-[#14141B]", Visual:AIContentVisual, href:SITE_ROUTES.capabilities.aiContent },
  { title:"Visual Editor & Preview", desc:"Every section gets a structured form — headings, lists, links, images — plus a live preview of your real page.",                icon:LayoutTemplate, glow:"from-emerald-400/10 to-teal-400/5",   border:"border-emerald-400/20 dark:border-emerald-500/20", bg:"bg-white dark:bg-[#14141B]", Visual:VisualEditorVisual, href:SITE_ROUTES.capabilities.visualEditor },
  { title:"Publishing Workflow",     desc:"See Draft vs. Published status for every page and post, and publish straight to your content files — no deploy needed.",         icon:Rocket,     glow:"from-blue-400/10 to-cyan-400/5",      border:"border-blue-400/20 dark:border-blue-500/20",     bg:"bg-white dark:bg-[#14141B]", Visual:PublishingVisual, href:SITE_ROUTES.capabilities.publishingWorkflow },
  { title:"SEO fields on every page", desc:"Title, description, keywords, Open Graph image, and canonical URL — labeled fields with AI-assisted suggestions.",              icon:Target,     glow:"from-amber-400/10 to-orange-400/5",   border:"border-amber-400/20 dark:border-amber-500/20",   bg:"bg-white dark:bg-[#14141B]", Visual:SeoVisual, href:SITE_ROUTES.blogPost("seo-basics-for-website-editors") },
  { title:"Works with your stack",   desc:"Built on Next.js, deploys on Vercel, publishes straight to GitHub, and plays nice with Google Search Console.",                  icon:Zap,        glow:"from-pink-400/10 to-rose-500/5",      border:"border-pink-400/20 dark:border-pink-500/20",     bg:"bg-white dark:bg-[#14141B]", Visual:DataSyncVisual, href:SITE_ROUTES.integrations },
  { title:"Simple admin dashboard",  desc:"One password-gated dashboard lists every page and post — search, filter by status, and jump straight into editing.",             icon:ShieldCheck, glow:"from-indigo-400/10 to-purple-400/5",  border:"border-indigo-400/20 dark:border-indigo-500/20", bg:"bg-white dark:bg-[#14141B]", Visual:AdminDashboardVisual, href:PRIVACY_POLICY_PATH },
];

/* ── Deep-dive section visuals ────────────────────── */
function ChatMockup() {
  const msgs = [
    { user:true,  text:"Rewrite the pricing intro to be shorter." },
    { user:false, text:"Here's a tighter version — same key points, 40% fewer words." },
    { user:true,  text:"Now draft an SEO title for this page." },
    { user:false, text:"\"GOMO Studio Pricing — Plans for Every Site Size\" — 54 characters." },
  ];
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"/><span className="w-2.5 h-2.5 rounded-full bg-amber-400"/><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
        <span className="ml-3 text-[11px] font-mono text-gray-400 dark:text-white/30">GOMO Studio — AI panel</span>
        <span className="ml-auto flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/><span className="text-[10px] text-emerald-500 font-medium">Live</span></span>
      </div>
      <div className="p-4 space-y-3">
        {msgs.map((m,i)=>(
          <div key={i} className={`flex ${m.user?"justify-end":"justify-start"}`}>
            {!m.user&&<div className="w-6 h-6 rounded-full brand-ink-badge flex items-center justify-center mr-2 shrink-0 mt-0.5"><span className="text-[7px] font-bold text-brand-lime">AI</span></div>}
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.user?"bg-brand-600 text-brand-lime rounded-br-sm":"bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-white/80 rounded-bl-sm"}`}>{m.text}</div>
            {m.user&&<div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center ml-2 shrink-0 mt-0.5"><span className="text-[8px] font-bold text-gray-500 dark:text-white/50">U</span></div>}
          </div>
        ))}
        <div className="flex justify-start"><div className="w-6 h-6 rounded-full brand-ink-badge flex items-center justify-center mr-2 shrink-0"><span className="text-[7px] font-bold text-brand-lime">AI</span></div><div className="px-4 py-2.5 rounded-xl rounded-bl-sm bg-gray-100 dark:bg-white/[0.06] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"0ms"}}/><span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"150ms"}}/><span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40 animate-bounce" style={{animationDelay:"300ms"}}/></div></div>
      </div>
    </div>
  );
}

const PERF_MAX = 48;
const PERF_BARS = [{pct:70,lbl:"Hero"},{pct:55,lbl:"Pricing"},{pct:90,lbl:"FAQ"},{pct:100,lbl:"SEO"},{pct:62,lbl:"Footer"}];
function PerfMockup() {
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/[0.06]">
        <span className="text-xs font-semibold text-gray-700 dark:text-white/80">Section completeness</span>
        <span className="text-[10px] bg-gray-100 dark:bg-white/[0.06] text-gray-400 dark:text-white/40 px-2 py-0.5 rounded-full">This page</span>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[{l:"Fields filled",v:"18/20",c:"text-brand-600 dark:text-brand-300"},{l:"Sections edited",v:"5",c:"text-emerald-600 dark:text-emerald-400"},{l:"Words drafted",v:"642",c:"text-blue-600 dark:text-blue-400"}].map(m=>(
            <div key={m.l} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
              <p className="text-[9px] text-gray-400 dark:text-white/40 mb-1">{m.l}</p>
              <p className={`text-sm font-black ${m.c}`}>{m.v}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-medium mb-3">Completeness by section</p>
          <div className="flex items-end gap-2" style={{height:PERF_MAX+4}}>
            {PERF_BARS.map((b,i)=>(
              <div key={b.lbl} className="flex-1 flex flex-col items-center justify-end gap-1">
                <span className="text-[8px] text-gray-500 dark:text-white/40 font-semibold">{b.pct}%</span>
                <div className="w-full rounded-t-[3px]" style={{height:`${Math.round((b.pct/100)*PERF_MAX)}px`,background:`rgba(201,255,51,${0.4+i*0.12})`}}/>
              </div>
            ))}
          </div>
          <div className="flex mt-1.5">{PERF_BARS.map(b=><span key={b.lbl} className="flex-1 text-center text-[8px] text-gray-400 dark:text-white/25">{b.lbl}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

function ReportMockup() {
  const rows = [
    { name: "Homepage", status: "Published", ai: false },
    { name: "Pricing page", status: "Draft", ai: true },
    { name: "AI Content blog post", status: "Published", ai: true },
  ];
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-brand-600 flex items-center justify-center"><Rocket className="w-3 h-3 text-brand-500"/></div>
          <span className="text-xs font-semibold text-gray-700 dark:text-white/80">Content dashboard</span>
        </div>
        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">No deploy needed</span>
      </div>
      <div className="p-4 space-y-3">
        {rows.map(s=>(
          <div key={s.name} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3 border border-gray-100 dark:border-white/[0.05] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-semibold text-gray-700 dark:text-white/70 truncate">{s.name}</span>
              {s.ai&&<span className="text-[9px] bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 px-1.5 py-0.5 rounded-full font-medium shrink-0">AI draft</span>}
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
              s.status === "Published"
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300"
            }`}>{s.status}</span>
          </div>
        ))}
        <a href={STUDIO_LOGIN_PATH} className="block w-full text-center text-[11px] font-semibold text-brand-600 dark:text-brand-400 py-2 border border-dashed border-brand-200 dark:border-brand-500/30 rounded-xl hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-colors">
          Open the dashboard
        </a>
      </div>
    </div>
  );
}

const deepDives = [
  { badge:"AI Content Generation", badgeColor:"bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border-brand-100 dark:border-brand-500/20",   title:"Turn a Prompt Into Publish-Ready Copy",         desc:"Open the AI panel on any section, describe the change in plain English, and review a draft that matches your page's structure and tone — nothing publishes until you approve it.", bullets:['Ask for a rewrite, a new section, or a full blog post — one prompt at a time',"The AI reads the current section first, so suggestions stay on-brand","Generate SEO titles, descriptions, and keywords alongside the copy"], cta:{label:"Explore AI Content Generation",href:SITE_ROUTES.capabilities.aiContent}, Visual:ChatMockup,  sectionBg:"bg-white dark:bg-[#0C0C12]",         glow:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)" },
  { badge:"Visual Editor & Preview", badgeColor:"bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20", title:"Structured Forms, Real Live Preview",  desc:"Every page, blog post, and site-wide element gets its own structured form — no markdown, no JSON files to hunt down. Preview shows the exact live page with your draft applied.",                    bullets:["Dedicated SEO fields form: title, description, keywords, Open Graph, canonical URL","Header, footer, and robots.txt are editable the same way as any page","Discard a draft anytime to fall back to what's currently published"],          cta:{label:"Explore the Visual Editor",href:SITE_ROUTES.capabilities.visualEditor}, Visual:PerfMockup,  sectionBg:"bg-[#f0f1f5] dark:bg-[#0E0E14]", glow:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(16,185,129,0.08) 0%, transparent 65%)" },
  { badge:"Publishing Workflow",          badgeColor:"bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-500/20",          title:"Know What's Live, Publish in One Click",          desc:"A dashboard of every page and post with a clear Draft or Published status. Publishing writes straight to your site's content files — no build pipeline or redeploy required.", bullets:["Search and filter content by type or status","Publish writes directly to your site's content files — instantly live","Designed for solo builders and small teams who need to ship fast"],cta:{label:"Explore Publishing Workflow",href:SITE_ROUTES.capabilities.publishingWorkflow}, Visual:ReportMockup,sectionBg:"bg-white dark:bg-[#0C0C12]",         glow:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)" },
];

export function FeaturesClient({ content }) {
  const heroBadge = content?.heroBadge ?? "Platform Features";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Everything You Need to";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Edit, Preview & Publish";
  const heroSubtitle =
    content?.heroSubtitle ??
    "GOMO Studio bundles AI Content Generation, a Visual Editor with live preview, and a Publishing Workflow dashboard — plus SEO fields on every page and a simple admin dashboard, all built on Next.js.";
  const heroPrimaryCtaLabel = content?.heroPrimaryCtaLabel ?? "Get started";
  const heroPrimaryCta = resolveCtaPair(content, "heroPrimaryCtaLabel", "heroPrimaryCtaHref", {
    label: heroPrimaryCtaLabel,
    href: STUDIO_LOGIN_PATH,
  });
  const heroPrimaryExternal = isExternalNavigationHref(heroPrimaryCta.href);
  const includedTitle = content?.includedTitle ?? "One editor, every capability you need";
  const includedSubtitle = content?.includedSubtitle ?? "Everything included";
  const bottomCtas = resolveBottomCtas(content, {
    primary: { label: "Get started", href: STUDIO_LOGIN_PATH },
    secondary: { label: "Book a demo", href: SITE_ROUTES.contact },
  });

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <BrandAmbient variant="hero" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Sparkles className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6">
            {heroTitleLine1} <span className={BRAND_HERO_GRADIENT_CLASS}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.3,ease:EASE}}>
            <a
              href={heroPrimaryCta.href}
              {...(heroPrimaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={(e) => {
                if (!heroPrimaryExternal) handleSamePageHashClick(e, heroPrimaryCta.href);
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              aria-label={heroPrimaryExternal ? `${heroPrimaryCta.label} (opens in new tab)` : heroPrimaryCta.label}>
              {heroPrimaryCta.label} <ArrowRight className="w-4 h-4" aria-hidden/>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES BENTO GRID ───────────────────────── */}
      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">{includedSubtitle}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{includedTitle}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
            {BENTO_CARDS.map(card=>{
              const cardBody = (
                <>
                {/* Gradient glow corner */}
                <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${card.glow} blur-2xl opacity-80 pointer-events-none`}/>
                {/* Visual area */}
                <div
                  className={`relative z-10 ${BENTO_VISUAL_H} shrink-0 overflow-hidden border-b border-gray-100 p-4 dark:border-white/[0.06]`}>
                  <div className="h-full min-h-0 w-full">
                    <card.Visual />
                  </div>
                </div>
                {/* Text area — starts at same baseline across each row once visuals are fixed-height */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-5 pb-6 pt-6 text-center">
                  <div className={`mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${card.border} bg-gradient-to-br ${card.glow}`}>
                    <card.icon className="w-3.5 h-3.5 text-gray-600 dark:text-white/60"/>
                  </div>
                  <h3 className="mb-1.5 flex flex-wrap items-center justify-center gap-2 text-base font-bold leading-snug text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="max-w-sm text-xs leading-relaxed text-gray-500 dark:text-white/60">{card.desc}</p>
                </div>
                </>
              );
              return (
              <motion.div key={card.title} variants={fadeUp} className="h-full">
                {card.href ? (
                  card.href.startsWith("#") ? (
                    <a
                      href={card.href}
                      onClick={(e) => handleSamePageHashClick(e, card.href)}
                      className={`relative flex h-full min-h-0 flex-col rounded-2xl overflow-hidden ${card.bg} border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 group`}
                      aria-label={`${card.title} — scroll to section`}
                    >
                      {cardBody}
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className={`relative flex h-full min-h-0 flex-col rounded-2xl overflow-hidden ${card.bg} border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 group`}
                      aria-label={`Explore ${card.title}`}
                    >
                      {cardBody}
                    </Link>
                  )
                ) : (
                  <div className={`relative flex h-full min-h-0 flex-col rounded-2xl overflow-hidden ${card.bg} border border-gray-100 dark:border-white/[0.07] shadow-sm`}>
                    {cardBody}
                  </div>
                )}
              </motion.div>
            );})}
          </motion.div>
        </div>
      </section>

      {/* ── DEEP DIVE SECTIONS ────────────────────────── */}
      {deepDives.map((s,idx)=>(
        <section key={s.title} className={`relative py-8 md:py-12 px-4 overflow-hidden ${s.sectionBg}`}>
          <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:s.glow}}/>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${idx%2===1?"":"lg:grid-flow-dense"}`}>
              {/* Text side */}
              <motion.div initial={{opacity:0,x:idx%2===1?30:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}
                className={idx%2===1?"lg:col-start-2":""}>
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border mb-4 ${s.badgeColor}`}>{s.badge}</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{s.title}</h2>
                <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">{s.desc}</p>
                <ul className="space-y-4 mb-8">
                  {s.bullets.map((b,i)=>(
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-brand-600 dark:text-brand-400"/>
                      </div>
                      <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                {s.cta.href.startsWith("http") ? (
                  <a
                    href={s.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    aria-label={`${s.cta.label} (opens in new tab)`}
                  >
                    {s.cta.label} <ArrowRight className="w-4 h-4" aria-hidden/>
                  </a>
                ) : s.cta.href.startsWith("#") ? (
                  <a
                    href={s.cta.href}
                    onClick={(e) => handleSamePageHashClick(e, s.cta.href)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    aria-label={`${s.cta.label} — scroll to section`}
                  >
                    {s.cta.label} <ArrowRight className="w-4 h-4" aria-hidden/>
                  </a>
                ) : (
                  <Link
                    href={s.cta.href}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    aria-label={s.cta.label}
                  >
                    {s.cta.label} <ArrowRight className="w-4 h-4" aria-hidden/>
                  </Link>
                )}
              </motion.div>
              {/* Visual side */}
              <motion.div initial={{opacity:0,x:idx%2===1?-30:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}
                className={idx%2===1?"lg:col-start-1 lg:row-start-1":""}>
                <s.Visual/>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <Pricing />

      <MarketingFaqSection
        items={FEATURES_PAGE_FAQ}
        title="GOMO Studio platform FAQ"
        subtitle="Answers about AI content generation, the visual editor, publishing workflow, SEO fields, and integrations."
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
