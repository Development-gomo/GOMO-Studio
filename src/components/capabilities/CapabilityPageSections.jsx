"use client";

/** Reusable modern sections for capability landing pages (AI Content, Visual Editor, Publishing Workflow). */
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CapabilityVisual } from "@/components/visual/capability-demos/CapabilityVisual";
import { BRAND_HERO_GRADIENT_CLASS, BRAND_INK_BADGE_CLASS } from "@/lib/brand";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/** variant: CapabilityVisualVariant — "ai" | "editor" | "workflow" */
export function CapabilityHeroVisual({ variant }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      className="relative z-10 mx-auto mt-16 max-w-5xl px-4"
    >
      <CapabilityVisual variant={variant} />
    </motion.div>
  );
}

/** stats: CapabilityPageContent["stats"] — { value, label }[] */
export function CapabilityStatsStrip({ stats }) {
  return (
    <section className="py-12 px-4 border-y border-gray-100 dark:border-white/[0.06] bg-white dark:bg-[#0C0C12]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="relative text-center p-5 rounded-2xl bg-[#f0f1f5] dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className={`relative text-3xl sm:text-4xl font-black mb-1 ${BRAND_HERO_GRADIENT_CLASS}`}>
                {stat.value}
              </p>
              <p className="relative text-xs text-gray-500 dark:text-white/50 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** steps: CapabilityPageContent["howItWorks"] — { step, title, description }[] */
export function CapabilityHowItWorks({ steps }) {
  return (
    <section className="py-8 md:py-12 px-4 bg-white dark:bg-[#0C0C12]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Four steps to a published page
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent dark:from-brand-500/30 dark:via-brand-500/15" />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step) => (
              <motion.div key={step.step} variants={fadeUp} className="relative group">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${BRAND_INK_BADGE_CLASS}`}
                  >
                    <span className="text-lg font-black text-brand-lime">{step.step}</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-2xl border border-dashed border-gray-900/10 dark:border-white/20"
                    />
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** capabilities: CapabilityPageContent["capabilities"] — { title, description, tag? }[] */
export function CapabilityGrid({ title, subtitle, capabilities }) {
  return (
    <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-[#f0f1f5] dark:bg-[#0E0E14]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,255,51,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-6 bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-black/40 hover:border-brand-300 dark:hover:border-brand-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {cap.tag ? (
                <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20">
                  {cap.tag}
                </span>
              ) : null}
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{cap.title}</h3>
              <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** visual: ReactNode */
export function CapabilityDeepDive({ title, subtitle, bullets, visual, reverse = false }) {
  return (
    <section className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: reverse
            ? "radial-gradient(ellipse 55% 50% at -5% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)"
            : "radial-gradient(ellipse 55% 50% at 105% 50%, rgba(201,255,51,0.09) 0%, transparent 65%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:[direction:ltr]"
          >
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 mb-4">
              Deep dive
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-white/65 leading-relaxed mb-8">{subtitle}</p>
            <ul className="space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-brand-600 dark:text-brand-400" />
                  </div>
                  <span className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="lg:[direction:ltr]"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Highlights how Claude powers AI Content Generation across the editor. */
export function CapabilityHighlightsSection() {
  const highlights = [
    {
      name: "Rewrites",
      provider: "Section-aware",
      desc: "Shorten, lengthen, or retone any section's existing copy in one request, matched to its current structure.",
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-400/20",
    },
    {
      name: "First drafts",
      provider: "Prompt-to-copy",
      desc: "Describe a new hero, FAQ, or pricing blurb in plain English and get a publish-ready draft back.",
      color: "from-orange-500/20 to-amber-500/10",
      border: "border-orange-400/20",
    },
    {
      name: "SEO & metadata",
      provider: "Field generation",
      desc: "Generate a meta title, description, and keyword list alongside the copy, scoped to the page you're on.",
      color: "from-blue-500/20 to-cyan-500/10",
      border: "border-blue-400/20",
    },
  ];

  return (
    <section className="py-8 md:py-12 px-4 bg-white dark:bg-[#0C0C12]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            Powered by Claude
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            One model, scoped to every section
          </h2>
          <p className="mt-4 text-gray-500 dark:text-white/60 max-w-xl mx-auto">
            Every AI panel in the editor is powered by Anthropic's Claude models, tuned to return structured content that matches the field you're editing.
          </p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative rounded-2xl p-6 bg-gradient-to-br ${item.color} border ${item.border} dark:bg-[#14141B] overflow-hidden`}
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10 blur-2xl"
              />
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/40 mb-2">
                {item.provider}
              </p>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-white/65 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
