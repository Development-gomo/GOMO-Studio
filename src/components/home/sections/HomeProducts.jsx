"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LayoutTemplate, Rocket } from "lucide-react";
import { CAPABILITY_LIST } from "@/lib/capabilities";

const EASE = [0.22, 1, 0.36, 1];

const ICONS = {
  "ai-content": Sparkles,
  "visual-editor": LayoutTemplate,
  "publishing-workflow": Rocket,
};

const STATS = {
  "ai-content": { stat: "Plain English", statSub: "No prompt engineering" },
  "visual-editor": { stat: "Live preview", statSub: "See the real page" },
  "publishing-workflow": { stat: "One click", statSub: "No deploy required" },
};

export function HomeProducts({ content }) {
  return (
    <section className="border-y border-gray-200/80 bg-white py-8 dark:border-white/[0.06] dark:bg-[#0f0f0f] sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 max-w-2xl"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300">
            Platform
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {content?.servicesTitleLine1 || "Three capabilities."}{" "}
            <span className="text-gray-500 dark:text-white/50">
              {content?.servicesTitleLine2 || "One editing workflow."}
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {CAPABILITY_LIST.map((capability, i) => {
            const Icon = ICONS[capability.id];
            const { stat, statSub } = STATS[capability.id];
            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              >
                <Link
                  href={capability.path}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200/80 bg-[#f0f1f5] p-6 transition-all hover:border-brand-400 hover:shadow-lg dark:border-white/[0.08] dark:bg-[#14141B] dark:hover:border-brand-500/40 hover-lift"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-brand-lime">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{capability.name}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 dark:text-white/60">
                    {capability.tagline}
                  </p>
                  <div className="mb-5 rounded-xl border border-gray-200/80 bg-white px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{stat}</p>
                    <p className="text-xs text-gray-500 dark:text-white/45">{statSub}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-300">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
