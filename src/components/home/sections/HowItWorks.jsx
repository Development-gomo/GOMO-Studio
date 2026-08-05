"use client";

/** Home "How it works" step carousel walking through the AI Content → Editor → Preview → Publish flow. */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Describe what you need",
    desc: "Ask for a new headline, a shorter paragraph, or a full blog draft — right in the AI panel next to the section you're editing. No prompt engineering required.",
  },
  {
    num: "02",
    title: "AI reads the section first",
    desc: "GOMO Studio reads your page's current content and structure before drafting, so the suggestion matches your tone and layout instead of starting from scratch.",
  },
  {
    num: "03",
    title: "Review the draft + SEO fields",
    desc: "See the suggested copy alongside a generated SEO title, description, and keywords. Nothing publishes automatically — it lands in your draft for review.",
  },
  {
    num: "04",
    title: "Preview, then publish",
    desc: "Preview renders your exact live page template with the draft applied via Next.js Draft Mode. Approve it and publish instantly — no deploy step.",
  },
];

const PANEL_TITLES = ["Describe the change", "Reading your page", "Review the draft", "Preview & publish"];

const CHART_BARS = [
  { lbl: "Clarity", h: 78,  val: "92" },
  { lbl: "Tone",    h: 60,  val: "84" },
  { lbl: "SEO",     h: 100, val: "97" },
  { lbl: "Length",  h: 52,  val: "76" },
  { lbl: "Impact",  h: 86,  val: "90" },
];

const THREAD = [
  { user: true,  text: "Rewrite the pricing intro to be shorter." },
  { user: false, text: "Here's a tighter version — same key points, 40% fewer words." },
  { user: true,  text: "Now draft an SEO title for this page." },
  { user: false, text: "\"GOMO Studio Pricing — Plans for Every Site Size\" — 54 characters." },
];

const SECTIONS_READ = [
  { name: "Hero section",   bg: "bg-orange-50 dark:bg-orange-500/10" },
  { name: "Pricing section", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { name: "SEO fields",     bg: "bg-purple-50 dark:bg-purple-500/10" },
  { name: "Current draft",  bg: "bg-emerald-50 dark:bg-emerald-500/10" },
];

function Panel0() {
  return (
    <div className="p-6">
      <p className="text-[11px] font-mono text-gray-400 dark:text-white/30 mb-3">Try asking...</p>
      <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 flex items-center gap-2 mb-5">
        <span className="text-sm text-gray-700 dark:text-white/70 flex-1 leading-relaxed">
          Rewrite the pricing intro to be shorter.
        </span>
        <span className="w-0.5 h-4 bg-brand-600 animate-pulse rounded-full" />
      </div>
      <div className="flex flex-wrap gap-2">
        {["New headline", "Rewrite tone", "Blog draft", "SEO title", "Meta description"].map(chip => (
          <span key={chip} className="px-2.5 py-1 rounded-full text-[11px] bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-white/40 border border-gray-200 dark:border-white/10">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function Panel1() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-2.5 mb-5">
        {SECTIONS_READ.map(({ name, bg }) => (
          <div key={name} className={`flex items-center gap-3 ${bg} rounded-xl px-3 py-2.5`}>
            <span className="flex-1 text-sm text-gray-700 dark:text-white/70">{name}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        ))}
      </div>
      <p className="text-[11px] font-mono text-gray-400 dark:text-white/30 mb-2">Reading current page content...</p>
      <div className="h-1.5 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
        <div className="h-full w-[72%] bg-brand-600 rounded-full opacity-80" />
      </div>
      <p className="text-xs text-gray-500 dark:text-white/40 mt-3">
        Scoped to the section you're on — nothing else on the page changes.
      </p>
    </div>
  );
}

function Panel2() {
  return (
    <div className="p-6">
      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/30 font-mono mb-4">
        Draft quality — AI Content Generation
      </p>
      <div className="flex items-end gap-2 mb-2" style={{ height: 90 }}>
        {CHART_BARS.map(({ lbl, h, val }) => (
          <div key={lbl} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] font-bold text-gray-500 dark:text-white/50">{val}</span>
            <div className="w-full rounded-t-md" style={{ height: `${(h / 100) * 72}px`, background: "rgba(201,255,51,0.8)" }} />
          </div>
        ))}
      </div>
      <div className="flex mb-4">
        {CHART_BARS.map(({ lbl }) => (
          <span key={lbl} className="flex-1 text-center text-[9px] text-gray-400 dark:text-white/25">{lbl}</span>
        ))}
      </div>
      <div className="bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-xl px-3 py-2.5">
        <p className="text-[11px] text-gray-600 dark:text-white/60">
          ✓ SEO title, meta description, and keywords generated alongside the copy — saved to your draft.
        </p>
      </div>
    </div>
  );
}

function Panel3() {
  return (
    <div className="p-6 flex flex-col gap-3">
      {THREAD.map(({ user, text }, i) => (
        <div key={i} className={`flex ${user ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
            user
              ? "bg-brand-600 text-brand-lime rounded-br-sm"
              : "bg-gray-100 dark:bg-white/8 text-gray-700 dark:text-white/70 rounded-bl-sm"
          }`}>
            {text}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HowItWorks({ content }) {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top; // px scrolled past the top of this section
      const scrollable = section.offsetHeight - window.innerHeight; // total scrollable range

      if (scrolled <= 0) { setActive(0); return; }
      if (scrolled >= scrollable) { setActive(STEPS.length - 1); return; }

      const progress = scrolled / scrollable;
      const step = Math.min(Math.floor(progress * STEPS.length), STEPS.length - 1);
      setActive(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /*
     * Outer div is (STEPS.length + 1) × 100vh tall.
     * The sticky inner takes 100vh, leaving STEPS.length × 100vh of scroll range
     * — exactly 1 viewport of scroll per step.
     */
    <div ref={sectionRef} style={{ height: `${(STEPS.length - 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="w-full max-w-5xl mx-auto px-4 py-4 md:py-8">

          {/* Section header */}
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-3">
              {content?.eyebrow || "How it works"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {content?.title || "From prompt to published page in minutes"}
            </h2>
            <p className="mt-2 sm:mt-3 text-gray-500 dark:text-white/65 max-w-md mx-auto text-sm leading-relaxed px-2">
              {content?.subtitle || "No code, no ticket, no deploy. Describe the change, review the draft, preview the real page, and publish."}
            </p>
          </div>

          {/* Steps + Panel */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">

            {/* Steps list */}
            <div className="flex flex-col gap-1">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 px-4 py-3 sm:p-4 rounded-2xl transition-all duration-500 ${
                    active === i
                      ? "bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20"
                      : "border border-transparent opacity-40"
                  }`}
                >
                  <span className={`text-xs font-mono font-bold shrink-0 mt-0.5 transition-colors duration-500 ${
                    active === i ? "text-brand-600 dark:text-brand-300" : "text-gray-300 dark:text-white/20"
                  }`}>
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold mb-1 transition-colors duration-500 ${
                      active === i ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-white/40"
                    }`}>
                      {step.title}
                    </p>
                    <div className={`overflow-hidden transition-all duration-500 ${active === i ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-sm text-gray-500 dark:text-white/65 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Scroll progress hint */}
              <p className="text-[11px] text-gray-400 dark:text-white/25 text-center mt-3 flex items-center justify-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
                Scroll to explore
              </p>
            </div>

            {/* Synced panel — hidden on mobile to prevent overflow */}
            <div className="hidden lg:block">
              <div className="bg-white dark:bg-[#16161D] rounded-2xl border border-gray-100 dark:border-white/[0.07] shadow-lg shadow-black/5 dark:shadow-black/40 overflow-hidden">
                {/* Window chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#0C0C12]/80 border-b border-gray-100 dark:border-white/[0.06]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-[11px] font-mono text-gray-400 dark:text-white/25">
                    {PANEL_TITLES[active]}
                  </span>
                  {/* Step indicator pills */}
                  <div className="ml-auto flex gap-1">
                    {STEPS.map((_, i) => (
                      <span key={i} className={`rounded-full transition-all duration-300 ${
                        active === i ? "w-4 h-1.5 bg-brand-600" : "w-1.5 h-1.5 bg-gray-200 dark:bg-white/15"
                      }`} />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[260px]"
                  >
                    {active === 0 ? (
                      <Panel0 />
                    ) : active === 1 ? (
                      <Panel1 />
                    ) : active === 2 ? (
                      <Panel2 />
                    ) : (
                      <Panel3 />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
