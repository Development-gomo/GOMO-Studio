"use client";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

/** Visual Editor & Preview capability page (marketing). */
import { motion } from "framer-motion";
import { LayoutTemplate, Sparkles, Calendar, ArrowRight, CheckCircle2, Eye, Link2, BarChart3 } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { CapabilitySuiteLinks } from "@/components/capabilities/CapabilitySuiteLinks";
import { MarketingFaqSection } from "@/components/sections/MarketingFaqSection";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { VISUAL_EDITOR_FAQ } from "@/lib/marketing-faqs";
import { SITE_ROUTES } from "@/lib/site-links";
import { resolveBottomCtas } from "@/lib/cms/resolve-page-ctas";
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
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── Mini visuals for key feature cards ─────────── */
function SectionFormVisual() {
  const blocks = [
    { label: "Hero Section", w: "col-span-2", h: "h-7", bg: "bg-brand-100 dark:bg-brand-500/15" },
    { label: "SEO Fields", w: "col-span-1", h: "h-12", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Pricing", w: "col-span-1", h: "h-12", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Testimonials", w: "col-span-2", h: "h-6", bg: "bg-violet-50 dark:bg-violet-500/10" },
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Page Editor</span>
        <span className="text-[9px] text-brand-600 dark:text-brand-400 font-semibold border border-brand-200 dark:border-brand-500/30 px-1.5 py-0.5 rounded-md">Autosaved</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {blocks.map((b, i) => (
          <div key={i} className={`${b.w} ${b.h} ${b.bg} rounded-lg border border-gray-200 dark:border-white/[0.07] flex items-center justify-between px-2.5 cursor-grab active:cursor-grabbing group`}>
            <span className="text-[8px] font-semibold text-gray-500 dark:text-white/50">{b.label}</span>
            <span className="text-gray-300 dark:text-white/15 text-sm leading-none opacity-0 group-hover:opacity-100 transition-opacity">⠿</span>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-1.5">
        <div className="flex-1 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">Publish</span>
        </div>
        <div className="px-3 h-7 bg-gray-100 dark:bg-white/[0.06] rounded-lg flex items-center">
          <span className="text-[9px] font-semibold text-gray-500 dark:text-white/40">Preview</span>
        </div>
      </div>
    </div>
  );
}

const RB_SPARK = [28, 35, 30, 42, 38, 52, 44, 58, 48, 64];
function PreviewDiffVisual() {
  const max = Math.max(...RB_SPARK);
  const pts = RB_SPARK.map((v, i) => `${(i / (RB_SPARK.length - 1)) * 100},${100 - (v / max) * 82}`).join(" ");
  return (
    <div className="w-full p-3 space-y-2">
      <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold text-gray-500 dark:text-white/45 uppercase tracking-wider">SEO completeness</span>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">↑ 38%</span>
        </div>
        <svg viewBox="0 0 100 50" className="w-full h-8" preserveAspectRatio="none">
          <defs><linearGradient id="rbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c9ff33" stopOpacity="0.2"/><stop offset="100%" stopColor="#c9ff33" stopOpacity="0"/></linearGradient></defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#rbg)"/>
          <polyline points={pts} fill="none" stroke="#c9ff33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {[
        { c: "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-100 dark:border-brand-500/20", i: "✦", t: "Draft ready to preview" },
        { c: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-500/20", i: "!", t: "Meta description missing on 1 page" },
        { c: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20", i: "✓", t: "Live preview matches production" },
      ].map((chip, i) => (
        <div key={i} className={`flex items-start gap-2 px-2.5 py-2 rounded-xl border text-[9px] font-semibold ${chip.c}`}>
          <span className="shrink-0 mt-px">{chip.i}</span><span>{chip.t}</span>
        </div>
      ))}
    </div>
  );
}

function RecentEditsVisual() {
  const upcoming = [
    { label: "Homepage hero", date: "Draft", status: "pending", color: "text-amber-600 dark:text-amber-400" },
    { label: "Pricing page", date: "Published", status: "sent", color: "text-emerald-600 dark:text-emerald-400" },
    { label: "FAQ section", date: "Published", status: "sent", color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Blog post draft", date: "Draft", status: "pending", color: "text-gray-400 dark:text-white/35" },
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">Recent Edits</span>
        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Autosave on</span>
      </div>
      {upcoming.map((r, i) => (
        <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05]">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${r.status === "sent" ? "bg-emerald-100 dark:bg-emerald-500/15" : "bg-gray-100 dark:bg-white/[0.06]"}`}>
            {r.status === "sent" ? <CheckCircle2 className="w-3 h-3 text-emerald-500"/> : <Calendar className="w-3 h-3 text-gray-400 dark:text-white/30"/>}
          </div>
          <span className="flex-1 text-[10px] font-semibold text-gray-700 dark:text-white/70">{r.label}</span>
          <span className={`text-[9px] font-bold ${r.color}`}>{r.date}</span>
        </div>
      ))}
    </div>
  );
}

const keyFeatures = [
  {
    icon: LayoutTemplate,
    title: "Structured section forms",
    description:
      "Every editable page breaks down into sections — hero, pricing, FAQ, testimonials — each with its own purpose-built form.",
    glow: "from-brand-400/10 to-violet-400/5",
    border: "border-brand-400/20 dark:border-brand-500/20",
    Visual: SectionFormVisual,
  },
  {
    icon: Sparkles,
    title: "Dedicated SEO fields form",
    description:
      "Title, description, keywords, Open Graph image, and canonical URL in one place, alongside a live completeness check.",
    glow: "from-amber-400/10 to-orange-400/5",
    border: "border-amber-400/20 dark:border-amber-500/20",
    Visual: PreviewDiffVisual,
  },
  {
    icon: Calendar,
    title: "Autosaved drafts",
    description:
      "Every change saves as a draft instantly. Discard anytime to fall back to what's currently published.",
    glow: "from-emerald-400/10 to-teal-400/5",
    border: "border-emerald-400/20 dark:border-emerald-500/20",
    Visual: RecentEditsVisual,
  },
];

/* ── Visual editor preview mockup ──────────────────── */
const RB_MAX = 44;
const RB_BARS = [{ pct: 60, lbl: "Jan" }, { pct: 75, lbl: "Feb" }, { pct: 50, lbl: "Mar" }, { pct: 88, lbl: "Apr" }, { pct: 72, lbl: "May" }, { pct: 95, lbl: "Jun" }];

function VisualEditorPreview() {
  return (
    <div className="w-full bg-white dark:bg-[#13131E] rounded-2xl border border-gray-100 dark:border-white/[0.08] shadow-xl overflow-hidden">
      <div className="px-5 py-4 brand-ink-bar">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center"><Eye className="w-3 h-3 text-brand-500"/></div>
            <span className="text-xs font-bold text-white">Live Preview — Pricing Page</span>
          </div>
          <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full">Draft Mode</span>
        </div>
        <p className="text-[9px] text-white/70">Rendered from your real page template</p>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[{ l: "Pages", v: "24", t: "+3" }, { l: "Drafts", v: "5", t: "waiting" }, { l: "Published", v: "19", t: "live" }].map(k => (
            <div key={k.l} className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05] text-center">
              <p className="text-[9px] text-gray-400 dark:text-white/40 mb-0.5">{k.l}</p>
              <p className="text-sm font-black text-gray-900 dark:text-white">{k.v}</p>
              <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">{k.t}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-3">
          <p className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-medium mb-2">SEO field completeness</p>
          <div className="flex items-end gap-1.5" style={{ height: RB_MAX + 4 }}>
            {RB_BARS.map((b, i) => (
              <div key={b.lbl} className="flex-1 flex flex-col items-center justify-end">
                <div className="w-full rounded-t-[3px]" style={{ height: `${Math.round((b.pct / 100) * RB_MAX)}px`, background: `rgba(201,255,51,${0.35 + i * 0.11})` }}/>
              </div>
            ))}
          </div>
          <div className="flex mt-1.5">{RB_BARS.map(b => <span key={b.lbl} className="flex-1 text-center text-[8px] text-gray-400 dark:text-white/25">{b.lbl}</span>)}</div>
        </div>
        <div className="flex items-start gap-2 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-xl px-3 py-2.5">
          <Eye className="w-3 h-3 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0"/>
          <p className="text-[10px] text-gray-600 dark:text-white/65 leading-relaxed">What you see here is the exact live page template — publishing writes this draft straight to your content files.</p>
        </div>
      </div>
    </div>
  );
}

export function VisualEditorClient({ content }) {
  const visualEditorCapability = getCapability("visual-editor");
  const pageContent = CAPABILITY_PAGE_CONTENT["visual-editor"];
  const heroTitleLine1 = content?.heroTitleLine1 ?? visualEditorCapability.heroTitleLine1;
  const heroTitleLine2 = content?.heroTitleLine2 ?? visualEditorCapability.heroTitleLine2;
  const heroSubtitle = content?.heroSubtitle ?? visualEditorCapability.description;
  const heroSecondarySubtitle =
    content?.heroSecondarySubtitle ??
    "Pick a page, blog post, or site-wide element, edit structured fields, and flip into Preview to see the exact live page with your draft applied via Next.js Draft Mode — publish when it's right.";
  const coreFeaturesSubtitle = content?.coreFeaturesSubtitle ?? "Core Features";
  const coreFeaturesTitle = content?.coreFeaturesTitle ?? "Editing that feels like a document, not a database";
  const valueTitle = content?.valueTitle ?? "Want to stop hunting for the right markdown file?";
  const valueSubtitle =
    content?.valueSubtitle ??
    "Eliminate manual file editing with a structured visual editor. Replace scattered content files with one dashboard and real live preview.";
  const bottomCtas = resolveBottomCtas(content, {
    primary: { label: "Get started", href: STUDIO_LOGIN_PATH },
    secondary: { label: "Book a demo", href: SITE_ROUTES.contact },
  });

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-blue-600/10 dark:bg-blue-600/15 pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-500/25 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden/> Available in GOMO Studio
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6">
            {heroTitleLine1} <span className={BRAND_HERO_GRADIENT_CLASS}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-lg text-gray-500 dark:text-white/70 mb-4 max-w-3xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.25,ease:EASE}}
            className="text-gray-400 dark:text-white/55 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
            {heroSecondarySubtitle}
          </motion.p>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.3,ease:EASE}} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={STUDIO_LOGIN_PATH}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              Open the editor <ArrowRight className="w-4 h-4"/>
            </a>
            <a href={SITE_ROUTES.contact}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-gray-700 dark:text-white/85 border-2 border-gray-300 dark:border-white/20 bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] hover:border-brand-400 dark:hover:border-brand-400/50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
              Book a Demo
            </a>
          </motion.div>
        </div>

        <CapabilityHeroVisual variant="editor" />
      </section>

      <CapabilityStatsStrip stats={pageContent.stats} />

      <CapabilityHowItWorks steps={pageContent.howItWorks} />

      {/* ── KEY FEATURES ────────────────────────────── */}
      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">{coreFeaturesSubtitle}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{coreFeaturesTitle}</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {keyFeatures.map(f=>(
              <motion.div key={f.title} variants={fadeUp}
                className={`relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 group`}>
                <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${f.glow} blur-2xl opacity-80 pointer-events-none`}/>
                <div className="relative z-10 border-b border-gray-100 dark:border-white/[0.06] min-h-[190px] flex flex-col">
                  <f.Visual/>
                </div>
                <div className="relative z-10 p-5">
                  <div className={`inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-lg border ${f.border} bg-gradient-to-br ${f.glow}`}>
                    <f.icon className="w-3.5 h-3.5 text-gray-600 dark:text-white/60"/>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1.5 leading-snug">{f.title}</h3>
                  <p className="text-gray-500 dark:text-white/60 text-xs leading-relaxed">{f.description}</p>
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
        visual={<VisualEditorPreview />}
      />

      {/* ── VALUE PROPOSITION ───────────────────────── */}
      <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,255,51,0.09) 0%, transparent 70%)"}}/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-100 dark:border-orange-500/20 mb-4">Why the Visual Editor</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">{valueTitle}</h2>
            <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-4 max-w-2xl mx-auto">{valueSubtitle}</p>
            <p className="text-gray-400 dark:text-white/50 text-sm mb-6 max-w-2xl mx-auto leading-relaxed">
              Edit any page or blog post with structured forms in minutes — not hours of hunting through JSON files.
            </p>
            <p className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
              Preview with Next.js Draft Mode before you publish. Discard anytime to fall back to what's live.
            </p>
          </motion.div>
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.15,ease:EASE}}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{val:"19",label:"Editable pages & elements"},{val:"0",label:"Markdown files to find"},{val:"1-click",label:"Live preview"},{val:"Instant",label:"Draft autosave"}].map(s=>(
              <div key={s.label} className="bg-[#f0f1f5] dark:bg-white/[0.04] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06]">
                <p className={`text-3xl font-black mb-1 ${BRAND_HERO_GRADIENT_CLASS}`}>{s.val}</p>
                <p className="text-xs text-gray-400 dark:text-white/55 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────── */}
      <Pricing/>

      {/* ── EDIT PAGES SECTION ──────────────────────── */}
      <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 55% 50% at 105% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
                Visual Editor
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">Edit Pages Without Touching Code</h2>
              <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">Whether you're updating a hero headline, tweaking pricing copy, or adding an FAQ, every field gets a structured input — text, lists, links, and images — so nothing breaks the layout.</p>
              <ul className="space-y-4 mb-8">
                {["Structured forms for every section — no raw JSON or markdown","Dedicated SEO fields form: title, description, keywords, Open Graph, canonical URL","Preview renders your real page template before you publish"].map((b,i)=>(
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-3 h-3 text-brand-600 dark:text-brand-400"/></div>
                    <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <a href={STUDIO_LOGIN_PATH}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Start editing <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}>
              <VisualEditorPreview/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LIVE PREVIEW & HANDOFF ──────────────────── */}
      <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 55% 50% at -5% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)"}}/>
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 mb-4">Live preview</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">See exactly what publishing will do</h2>
            <p className="text-gray-500 dark:text-white/65 max-w-2xl mx-auto leading-relaxed">Preview uses Next.js Draft Mode to render your actual page template with the draft content applied — never a stale mockup.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="space-y-5">
              {[
                { icon: Eye, title: "Real component preview", description: "Preview renders the exact production page component — what you see is what publishes." },
                { icon: Link2, title: "Discard anytime", description: "Discard a draft to instantly fall back to the last published version." },
                { icon: BarChart3, title: "No build step", description: "Saving a draft and previewing it both happen without triggering a rebuild." },
              ].map(b=>(
                <motion.div key={b.title} variants={fadeUp} className="flex items-start gap-4 p-5 rounded-2xl bg-[#f0f1f5] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07]">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-600/20 border border-brand-100 dark:border-brand-500/20 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-brand-600 dark:text-brand-300"/>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold mb-1">{b.title}</p>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{b.description}</p>
                  </div>
                </motion.div>
              ))}
              <div className="pt-2">
                <a href={STUDIO_LOGIN_PATH}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-lg shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  Get started with the editor <ArrowRight className="w-4 h-4"/>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}}>
              <VisualEditorPreview/>
            </motion.div>
          </div>
        </div>
      </section>

      <CapabilitySuiteLinks current="visual-editor" />

      <MarketingFaqSection
        items={VISUAL_EDITOR_FAQ}
        title="Visual Editor FAQ"
        subtitle="Answers about structured section forms, SEO fields, live Draft Mode preview, and editing site-wide chrome."
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
