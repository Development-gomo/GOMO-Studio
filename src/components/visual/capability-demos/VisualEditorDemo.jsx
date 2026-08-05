"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, FileText } from "lucide-react";
import { DemoFrame } from "@/components/visual/capability-demos/DemoFrame";
import { contentDemoBarFill } from "@/components/visual/capability-demos/content-demo";
import { MARKETING_STACK_LOGOS } from "@/lib/marketing-stack-logos";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { title: "Hero Section", rotate: -8, x: -24, y: 8, z: 1 },
  { title: "SEO Fields", rotate: 0, x: 0, y: 0, z: 3, featured: true },
  { title: "Pricing Section", rotate: 8, x: 24, y: 8, z: 2 },
];

const SOURCES = [
  { src: MARKETING_STACK_LOGOS.nextjs, label: "Next.js" },
  { src: MARKETING_STACK_LOGOS.googleSearchConsole, label: "GSC" },
  { src: MARKETING_STACK_LOGOS.googleAnalytics4, label: "GA4" },
];

function SectionCard({ title, rotate, x, y, z, featured, compact }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: z, rotate, x, y }}
      animate={{ y: [y, y - 6, y] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: z * 0.3 }}
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl border bg-[#1a1b1e] shadow-xl",
          featured ? "border-brand-500/30 shadow-brand-500/10" : "border-white/10",
        )}
      >
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-2.5 py-1.5">
          <FileText className="h-3 w-3 text-brand-lime" />
          <span className="truncate text-[8px] font-semibold text-white/70 sm:text-[9px]">{title}</span>
        </div>
        <div className={cn("space-y-1.5 p-2.5", compact ? "h-14" : "h-20 sm:h-24")}>
          <div className="h-1.5 w-3/4 rounded bg-white/10" />
          <div className="h-1.5 w-1/2 rounded bg-white/[0.06]" />
          {featured ? (
            <div className="mt-2 flex h-8 items-end gap-0.5">
              {[40, 55, 45, 70, 60, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ height: `${h}%`, ...contentDemoBarFill(i, 0.1, 0.4) }}
                />
              ))}
            </div>
          ) : (
            <div className="mt-2 grid grid-cols-3 gap-1">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-6 rounded bg-white/[0.05]" />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function VisualEditorCoreCompact() {
  return (
    <div className="flex h-full w-full flex-1 flex-col justify-center gap-2 px-2.5 py-2">
      <div className="rounded-lg border border-gray-200/80 bg-gray-50 p-2.5 shadow-sm dark:border-brand-500/35 dark:bg-[#1a1b1e] dark:shadow-lg dark:shadow-brand-500/5">
        <p className="text-[9px] font-bold text-gray-900 dark:text-brand-300">SEO Fields</p>
        <div className="mt-2 flex h-12 items-end gap-1">
          {[35, 48, 42, 62, 55, 72].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${h}%`, ...contentDemoBarFill(i, 0.09, 0.45) }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {["Hero Section", "Pricing Section"].map((title) => (
          <div
            key={title}
            className="rounded-lg border border-gray-200/80 bg-gray-50/90 p-2 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <p className="truncate text-[8px] font-semibold text-gray-700 dark:text-white/55">{title}</p>
            <div className="mt-1.5 space-y-1">
              <div className="h-1 w-full rounded bg-gray-200 dark:bg-white/10" />
              <div className="h-1 w-2/3 rounded bg-gray-100 dark:bg-white/[0.06]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualEditorCore({ compact }) {
  if (compact) {
    return <VisualEditorCoreCompact />;
  }

  return (
    <div className={cn("relative w-full", "h-44 sm:h-52")}>
      {SECTIONS.map((s) => (
        <SectionCard key={s.title} {...s} compact={compact} />
      ))}
      {!compact ? (
        <motion.div
          className="absolute -right-1 top-2 flex items-center gap-1 rounded-lg border border-brand-200 bg-brand-50 px-2 py-1 dark:border-brand-500/25 dark:bg-brand-500/10"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Eye className="h-3 w-3 text-brand-600 dark:text-brand-400" />
          <span className="text-[8px] font-bold text-brand-700 dark:text-brand-300">Live Preview</span>
        </motion.div>
      ) : null}
    </div>
  );
}

export function VisualEditorDemo({ compact = false, embedded = false }) {
  if (compact) {
    return (
      <DemoFrame float={false} glow={!embedded} embedded={embedded} className="h-full w-full">
        <VisualEditorCore compact />
      </DemoFrame>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl px-4">
      <DemoFrame>
        <div className="border-b border-gray-200/80 px-4 py-3 dark:border-white/[0.08] sm:px-5">
          <p className="text-xs font-bold text-gray-900 dark:text-white">Visual Editor</p>
          <p className="text-[10px] text-gray-500 dark:text-white/45">Structured forms + live preview</p>
        </div>
        <div className="p-5 sm:p-8">
          <VisualEditorCore />
        </div>
        <div className="border-t border-gray-200/80 px-4 py-4 dark:border-white/[0.06] sm:px-5">
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-xs font-bold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300"
              animate={{ boxShadow: ["0 0 0 rgba(201,255,51,0)", "0 0 24px rgba(201,255,51,0.25)", "0 0 0 rgba(201,255,51,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Draft
            </motion.div>
            {SOURCES.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200/80 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]">
                  <Image src={s.src} alt="" width={18} height={18} className="h-4 w-4 object-contain" />
                </div>
                <span className="text-[8px] text-gray-500 dark:text-white/35">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}
