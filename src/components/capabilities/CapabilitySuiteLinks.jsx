"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CAPABILITY_LIST } from "@/lib/capabilities";

/** current: CapabilityId — "ai-content" | "visual-editor" | "publishing-workflow" */
export function CapabilitySuiteLinks({ current }) {
  const others = CAPABILITY_LIST.filter((capability) => capability.id !== current);

  return (
    <section className="py-8 md:py-12 px-4 bg-white dark:bg-[#0C0C12] border-y border-gray-100 dark:border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300 mb-3">
          GOMO Studio platform
        </p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Explore the rest of the platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {others.map((capability) => (
            <Link
              key={capability.id}
              href={capability.path}
              className="group flex flex-col rounded-2xl border border-gray-100 dark:border-white/[0.08] bg-[#f0f1f5] dark:bg-white/[0.03] p-6 transition-all duration-200 hover:border-brand-200 dark:hover:border-brand-500/30 hover:shadow-lg hover:-translate-y-0.5"
              aria-label={`Explore ${capability.name}`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300 mb-2">
                {capability.appNavLabel}
              </p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{capability.name}</h3>
              <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed mb-4 flex-1">
                {capability.tagline}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300 group-hover:gap-2.5 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
