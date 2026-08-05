"use client";

/** "The turning point" before/after metrics block; tuned for mobile spacing with following home sections. */
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SAAS_EASE as EASE, viewportOnce } from "@/lib/motion";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

const BEFORE = [
  { label: "Time to publish a copy edit",     value: "Days",       pct: 85 },
  { label: "People who could edit content",   value: "1 developer", pct: 18 },
  { label: "Content changes shipped weekly",  value: "~2",          pct: 22 },
];

const AFTER = [
  { label: "Time to publish a copy edit",     value: "Minutes",  pct: 10 },
  { label: "People who could edit content",   value: "Whole team", pct: 95 },
  { label: "Content changes shipped weekly",  value: "20+",         pct: 88 },
];

export function Transformation({ content }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Eyebrow + Title */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/60 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 backdrop-blur-sm mb-4">
            {content?.eyebrow || "The turning point"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {(content?.titleLine1 || "The same website.")}<br />
            <span className={BRAND_HERO_GRADIENT_CLASS}>{content?.titleLine2 || "A completely different editing workflow."}</span>
          </h2>
        </motion.div>

        {/* Before / VS / After */}
        <div ref={ref} className="grid md:grid-cols-[1fr_64px_1fr] gap-4 md:gap-0 items-stretch">

          {/* ── BEFORE card ── */}
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/70 dark:bg-[#18100E] backdrop-blur-xl border border-white/80 dark:border-red-500/10 rounded-3xl" />
            {/* Subtle red inner glow */}
            <div className="absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(239,68,68,0.08) 0%, transparent 70%)" }} />

            <div className="relative z-10 p-7">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-7">
                <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-500/15 border border-red-100 dark:border-red-500/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-500 dark:text-red-400">
                  Without GOMO Studio
                </span>
              </div>

              <div className="flex flex-col gap-7">
                {BEFORE.map(({ label, value, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <span className="text-sm text-gray-600 dark:text-white/60">{label}</span>
                      <span className="text-sm font-bold text-red-500 dark:text-red-400 tabular-nums">{value}</span>
                    </div>
                    {/* Track */}
                    <div className="h-2 rounded-full overflow-hidden bg-red-500/10 dark:bg-red-500/15">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: visible ? `${pct}%` : "0%",
                          background: "linear-gradient(90deg, #f87171, #ef4444)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── VS divider ── */}
          <div className="hidden md:flex flex-col items-center justify-center gap-3 px-2">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gray-300/60 dark:via-white/10 to-transparent" />
            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1C1C24] backdrop-blur-sm border border-gray-200/80 dark:border-white/8 flex items-center justify-center text-[10px] font-black text-gray-400 dark:text-white/30 shadow-md shrink-0">
              VS
            </div>
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gray-300/60 dark:via-white/10 to-transparent" />
          </div>

          {/* ── AFTER card ── */}
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/70 dark:bg-[#0D1A10] backdrop-blur-xl border border-white/80 dark:border-emerald-500/10 rounded-3xl" />
            {/* Subtle green/brand inner glow */}
            <div className="absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />

            <div className="relative z-10 p-7">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-7">
                <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  With GOMO Studio
                </span>
              </div>

              <div className="flex flex-col gap-7">
                {AFTER.map(({ label, value, pct }, idx) => (
                  <div key={label}>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <span className="text-sm text-gray-600 dark:text-white/60">{label}</span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{value}</span>
                    </div>
                    {/* Track */}
                    <div className="h-2 rounded-full overflow-hidden bg-emerald-500/10 dark:bg-emerald-500/15">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: visible ? `${pct}%` : "0%",
                          background: "linear-gradient(90deg, #34d399, #10b981)",
                          transitionDelay: `${idx * 100 + 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
