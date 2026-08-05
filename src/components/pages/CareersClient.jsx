"use client";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

/**
 * Careers listing + culture sections; quick apply posts resume to `/api/careers-application` (no mailto for files).
 */
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Upload, Cpu, Target, TrendingUp, Trophy, Sparkles, ArrowRight, Users, Medal, Star, Globe, Heart, BookOpen, Clock, Wallet, Coffee } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { SITE_ROUTES } from "@/lib/site-links";
import { resolveBottomCtas, resolveCtaPair } from "@/lib/cms/resolve-page-ctas";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.65, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

/* ── Why-join bento visuals ──────────────────────── */

/** 1 · AI Content Innovation — prompt understanding pipeline visual */
function AIInnovationVisual() {
  const tokens = ["Rewrite","the","pricing","intro","shorter","please"];
  const labels  = ["Verb","Det","N","N","Adj","—"];
  const colors  = ["bg-brand-100 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300","bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300","bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300","bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/45","bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300","bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300"];
  return (
    <div className="w-full p-3 space-y-2.5">
      {/* Model header */}
      <div className="flex items-center gap-2 px-2.5 py-2 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-xl">
        <Cpu className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0"/>
        <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300">AI Content Engine</span>
        <span className="ml-auto flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"/><span className="text-[9px] text-brand-500 font-semibold">Running</span></span>
      </div>
      {/* Token labelling */}
      <div>
        <p className="text-[8px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-semibold px-1 mb-1.5">Prompt parsing</p>
        <div className="flex flex-wrap gap-1">
          {tokens.map((t,i)=>(
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${colors[i]}`}>{t}</span>
              <span className="text-[7px] text-gray-400 dark:text-white/25">{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Intent output */}
      <div className="bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05] rounded-xl px-2.5 py-2">
        <p className="text-[8px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-semibold mb-1">Detected request</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/[0.07] rounded-full overflow-hidden">
            <div className="h-full w-[94%] brand-ink-bar rounded-full"/>
          </div>
          <span className="text-[10px] font-black text-brand-600 dark:text-brand-300 shrink-0">94% rewrite request</span>
        </div>
      </div>
    </div>
  );
}

/** 2 · Impact-Driven Product — live team counter */
function ImpactVisual() {
  const teams = [
    {name:"Northwind",  q:142, color:"bg-brand-600"},
    {name:"Loop Studio",q:98,  color:"bg-emerald-600"},
    {name:"Vertex Labs",q:215, color:"bg-violet-600"},
    {name:"Bright Path",q:87,  color:"bg-blue-600"},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="grid grid-cols-2 gap-1.5 mb-1">
        {[{v:"1,200+",l:"Teams",c:"text-brand-600 dark:text-brand-300"},{v:"10M+",l:"Words drafted",c:"text-emerald-600 dark:text-emerald-400"}].map(s=>(
          <div key={s.l} className="bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05] rounded-xl p-2.5 text-center">
            <p className={`text-lg font-black ${s.c}`}>{s.v}</p>
            <p className="text-[8px] text-gray-400 dark:text-white/35 font-medium">{s.l}</p>
          </div>
        ))}
      </div>
      <p className="text-[8px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-semibold px-1">Active teams this week</p>
      {teams.map((t,i)=>(
        <div key={i} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-lg ${t.color} flex items-center justify-center shrink-0`}>
            <span className="text-[6px] font-black text-white">{t.name[0]}</span>
          </div>
          <span className="text-[9px] font-semibold text-gray-600 dark:text-white/60 w-16">{t.name}</span>
          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${t.color}`} style={{width:`${(t.q/215)*100}%`}}/>
          </div>
          <span className="text-[9px] font-bold text-gray-500 dark:text-white/50 w-7 text-right">{t.q}</span>
        </div>
      ))}
    </div>
  );
}

/** 3 · Rapid Growth — growth chart */
const GROWTH_SPARK = [12,18,15,25,22,35,30,48,42,62,55,80];
function GrowthVisual() {
  const max = Math.max(...GROWTH_SPARK);
  const pts = GROWTH_SPARK.map((v,i)=>`${(i/(GROWTH_SPARK.length-1))*100},${100-(v/max)*82}`).join(" ");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="grid grid-cols-3 gap-1.5 mb-1">
        {[{v:"48k",l:"Words drafted/mo",c:"text-blue-600 dark:text-blue-400"},{v:"3×",l:"YoY growth",c:"text-brand-600 dark:text-brand-300"},{v:"99.9%",l:"Uptime",c:"text-emerald-600 dark:text-emerald-400"}].map(s=>(
          <div key={s.l} className="bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.05] rounded-xl p-2 text-center">
            <p className={`text-sm font-black ${s.c}`}>{s.v}</p>
            <p className="text-[7px] text-gray-400 dark:text-white/30 font-medium leading-tight">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-white/[0.04] rounded-xl p-2.5 border border-gray-100 dark:border-white/[0.05]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/30">Platform growth 2026</span>
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">↑ 3×</span>
        </div>
        <svg viewBox="0 0 100 55" className="w-full h-10" preserveAspectRatio="none">
          <defs><linearGradient id="gg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/></linearGradient></defs>
          <polygon points={`0,100 ${pts} 100,100`} fill="url(#gg1)"/>
          <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex justify-between mt-1">
          {["Q1","Q2","Q3","Q4"].map(q=><span key={q} className="text-[7px] text-gray-400 dark:text-white/25">{q}</span>)}
        </div>
      </div>
    </div>
  );
}

/** 4 · Industry Recognition — awards wall */
function RecognitionVisual() {
  const awards = [
    { icon: Trophy, title:"Product of the Year",    org:"SaaS Awards 2025",  color:"bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20"},
    { icon: Medal, title:"Best AI Startup",         org:"Startup Summit 2025",   color:"bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20"},
    { icon: Star, title:"4.9 Customer Rating",    org:"2,000+ verified reviews",   color:"bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"},
  ];
  return (
    <div className="w-full p-3 space-y-2">
      <div className="flex items-center gap-2 px-2.5 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-xl mb-1">
        <Trophy className="w-4 h-4 text-amber-500 shrink-0"/>
        <div>
          <p className="text-[10px] font-black text-gray-800 dark:text-white/80">Industry Leader</p>
          <p className="text-[8px] text-gray-400 dark:text-white/35">Quick CMS Category 2025</p>
        </div>
        <span className="ml-auto text-[9px] font-bold text-amber-600 dark:text-amber-400">#1</span>
      </div>
      {awards.map((a,i)=>{
        const Icon = a.icon;
        return (
        <div key={i} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl border ${a.color}`}>
          <Icon className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-800 dark:text-white/80 truncate">{a.title}</p>
            <p className="text-[8px] text-gray-400 dark:text-white/35 truncate">{a.org}</p>
          </div>
        </div>
      );})}
    </div>
  );
}

const whyJoin = [
  { icon:Cpu,       title:"AI Content Innovation",        desc:"Work on cutting-edge AI content generation that transforms how anyone edits and drafts website copy.",                    glow:"from-brand-400/10 to-violet-400/5",  border:"border-brand-400/20 dark:border-brand-500/20",  Visual:AIInnovationVisual },
  { icon:Target,    title:"Impact-Driven Product",        desc:"Your code directly helps 1,200+ teams ship copy changes without waiting on engineering.",                               glow:"from-emerald-400/10 to-teal-400/5",  border:"border-emerald-400/20 dark:border-emerald-500/20",Visual:ImpactVisual       },
  { icon:TrendingUp,title:"Rapid Growth Environment",     desc:"Join a fast-scaling platform generating tens of thousands of words monthly with unlimited learning opportunities.",             glow:"from-blue-400/10 to-cyan-400/5",     border:"border-blue-400/20 dark:border-blue-500/20",    Visual:GrowthVisual       },
  { icon:Trophy,    title:"Industry Recognition",         desc:"Be part of the team redefining the quick CMS category — from hackathons to industry conferences, we lead innovation.",          glow:"from-amber-400/10 to-orange-400/5",  border:"border-amber-400/20 dark:border-amber-500/20",  Visual:RecognitionVisual  },
];

const perks = [
  { icon: Globe, label:"Remote-first" },
  { icon: Heart, label:"Health benefits" },
  { icon: BookOpen, label:"Learning budget" },
  { icon: Clock, label:"Flexible hours" },
  { icon: Wallet, label:"Equity options" },
  { icon: Coffee, label:"Team offsites" },
];

const openRoles = [
  { title:"Senior AI Engineer – Content Generation", location:"Remote – India", type:"Full-time", dept:"Engineering",
    description:"We're looking for an experienced AI engineer to help build and improve our AI content generation engine. You'll work on prompt design and structured generation so section rewrites and first drafts stay on-brand.",
    skills:["Python","NLP/LLM","Next.js","FastAPI"] },
  { title:"Sr. SEO Analyst",                               location:"Remote – India", type:"Full-time", dept:"Growth",
    description:"Join our growth team to drive organic traffic and improve our search visibility. You'll work closely with product and content teams to build scalable SEO strategies and shape our SEO fields feature.",
    skills:["Technical SEO","Analytics","Content Strategy","Keyword Research"] },
];

const DEPT_COLORS = {
  "Engineering": "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border-brand-100 dark:border-brand-500/20",
  "Growth":      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-500/20",
};

function RoleQuickApply({ roleTitle }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);
  const inputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setNotice(null);
    const fd = new FormData();
    fd.set("role", roleTitle);
    fd.set("resume", file);
    try {
      const res = await fetch("/api/careers-application", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotice({ kind: "err", text: data.error || "Something went wrong. Please try again." });
        return;
      }
      setNotice({ kind: "ok", text: "Thanks — your resume was sent to our team. We'll be in touch." });
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      setNotice({ kind: "err", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl border border-dashed border-gray-200 dark:border-white/[0.10] bg-gray-50 dark:bg-white/[0.02] cursor-pointer hover:border-brand-400 dark:hover:border-brand-400/50 hover:bg-brand-50/50 dark:hover:bg-brand-600/5 transition-all group">
          <Upload className="w-4 h-4 text-gray-400 dark:text-white/30 group-hover:text-brand-500 transition-colors shrink-0"/>
          <span className="text-gray-500 dark:text-white/45 text-sm group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors truncate">
            {file ? file.name : "Upload your resume (PDF, DOC, DOCX)"}
          </span>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <button
          type="submit"
          disabled={loading || !file}
          aria-label={`Submit resume for ${roleTitle}`}
          className="px-6 py-3 rounded-xl text-sm font-semibold btn-brand-primary shadow-md shadow-brand-600/20 transition-all duration-200 hover:scale-[1.02] shrink-0 text-center inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Sending…" : "Submit"}
        </button>
      </div>
      {notice ? (
        <p
          role="status"
          className={`text-xs font-medium ${notice.kind === "ok" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-700 dark:text-amber-300"}`}
        >
          {notice.text}
        </p>
      ) : null}
    </form>
  );
}

/** CareersContentPreset (all optional): heroBadge, heroTitleLine1/2, heroSubtitle, heroButtonLabel/Href,
 * lifeAtGomoTitle/Subtitle, openPositionsTitle/Subtitle, ctaTitle/Subtitle, ctaPrimary/SecondaryLabel/Href */

export function CareersClient({ content }) {
  const heroBadge = content?.heroBadge ?? "We're Hiring";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Join Our Mission to";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Redefine Website Editing";
  const heroSubtitle =
    content?.heroSubtitle ??
    "At GOMO Studio, we're not just building a CMS—we're democratizing website editing for every builder. Let's build the future together.";
  const heroButton = resolveCtaPair(content, "heroButtonLabel", "heroButtonHref", {
    label: content?.heroButtonLabel ?? "See Open Positions",
    href: "#open-positions",
  });
  const bottomCtas = resolveBottomCtas(content, {
    primary: { label: "Book a demo", href: SITE_ROUTES.contact },
    secondary: { label: "Get started", href: "#pricing" },
  });
  const lifeAtGomoTitle = content?.lifeAtConalyticTitle ?? "Why You'll Love Building the Future with Us";
  const lifeAtGomoSubtitle =
    content?.lifeAtConalyticSubtitle ??
    "We're a team of engineers, product innovators, and content people—here's why talented people choose GOMO Studio.";
  const openPositionsTitle = content?.openPositionsTitle ?? "Open Positions";
  const openPositionsSubtitle = content?.openPositionsSubtitle ?? "Find your next opportunity at GOMO Studio";

  return (
    <>
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Users className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6">
            {heroTitleLine1} <span className={BRAND_HERO_GRADIENT_CLASS}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
            {heroSubtitle}
          </motion.p>
          <motion.a initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.3,ease:EASE}}
            href={heroButton.href}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.03]">
            {heroButton.label} <ArrowRight className="w-4 h-4"/>
          </motion.a>
        </div>
      </section>

      {/* ── PERKS ───────────────────────────────────── */}
      <section className="py-10 px-4 bg-white dark:bg-[#0C0C12] border-b border-gray-100 dark:border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {perks.map(p=>{
              const Icon = p.icon;
              return (
              <div key={p.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0f1f5] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07] text-sm font-medium text-gray-700 dark:text-white/70">
                <Icon className="h-4 w-4 text-brand-600 dark:text-brand-300" /><span>{p.label}</span>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* ── WHY JOIN ────────────────────────────────── */}
      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">Life at GOMO Studio</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{lifeAtGomoTitle}</h2>
            <p className="text-gray-500 dark:text-white/65 max-w-2xl mx-auto leading-relaxed">{lifeAtGomoSubtitle}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyJoin.map(r=>(
              <motion.div key={r.title} variants={fadeUp}
                className="relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300">
                <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${r.glow} blur-2xl opacity-80 pointer-events-none`}/>
                {/* Visual */}
                <div className="relative z-10 border-b border-gray-100 dark:border-white/[0.06] min-h-[200px] flex flex-col">
                  <r.Visual/>
                </div>
                {/* Text */}
                <div className="relative z-10 p-4">
                  <div className={`inline-flex items-center gap-1.5 mb-3 px-2 py-1 rounded-lg border ${r.border} bg-gradient-to-br ${r.glow}`}>
                    <r.icon className="w-3.5 h-3.5 text-gray-600 dark:text-white/60"/>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1.5 leading-snug">{r.title}</h3>
                  <p className="text-gray-500 dark:text-white/60 text-xs leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ──────────────────────────── */}
      <section id="open-positions" className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,255,51,0.08) 0%, transparent 70%)"}}/>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}} className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-500/20 mb-4">Open Roles</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{openPositionsTitle}</h2>
            <p className="text-gray-500 dark:text-white/65">{openPositionsSubtitle}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="space-y-5">
            {openRoles.map(role=>(
              <motion.div key={role.title} variants={fadeUp}
                className="rounded-2xl bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm overflow-hidden hover:border-brand-300 dark:hover:border-brand-500/40 hover:shadow-lg dark:hover:shadow-black/40 transition-all duration-300">
                <div className="p-6 sm:p-8">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DEPT_COLORS[role.dept]||"bg-gray-100 dark:bg-white/[0.07] text-gray-500 dark:text-white/50"}`}>{role.dept}</span>
                      <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/30 px-2 py-0.5 rounded-full">{role.type}</span>
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-snug">{role.title}</h3>
                    <div className="flex items-center gap-1.5 mt-2 text-gray-400 dark:text-white/45 text-xs">
                      <MapPin className="w-3.5 h-3.5"/>{role.location}
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-white/65 text-sm leading-relaxed mb-5">{role.description}</p>
                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {role.skills.map(s=>(
                      <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/[0.07] text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/[0.08]">{s}</span>
                    ))}
                  </div>
                  {/* Quick application */}
                  <div className="border-t border-gray-100 dark:border-white/[0.06] pt-5">
                    <p className="text-gray-600 dark:text-white/60 text-xs font-semibold mb-3 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-brand-500"/>Quick Application</p>
                    <RoleQuickApply roleTitle={role.title} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Pricing />

      <CTA
        title={content?.ctaTitle ?? "Ready to Transform How You Edit Your Site?"}
        subtitle={content?.ctaSubtitle ?? "Join 2,000+ teams already using GOMO Studio to ship content faster"}
        primaryCta={bottomCtas.primaryCta}
        secondaryCta={bottomCtas.secondaryCta}
      />
    </>
  );
}
