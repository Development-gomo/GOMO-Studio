"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DemoFrame, DemoHeader } from "@/components/visual/capability-demos/DemoFrame";
import { contentDemoBarFill } from "@/components/visual/capability-demos/content-demo";
import { MARKETING_STACK_LOGOS } from "@/lib/marketing-stack-logos";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Pages", value: "24", delta: "+3", status: "Published", tone: "emerald", spark: [42, 48, 52, 58, 64, 72] },
  { label: "Blog posts", value: "18", delta: "+6", status: "Published", tone: "emerald", spark: [30, 38, 45, 55, 68, 80] },
  { label: "Drafts", value: "5", delta: "waiting", status: "In review", tone: "amber", spark: [70, 65, 58, 52, 48, 44] },
  { label: "Publish time", value: "<1s", delta: "instant", status: "No deploy", tone: "emerald", spark: [35, 42, 50, 55, 62, 70] },
];

const STATUS_CLASS = {
  emerald:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
  amber:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
  red: "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300",
};

const DELTA_CLASS = {
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  red: "text-red-600 dark:text-red-400",
};

const PLATFORMS = [
  { src: MARKETING_STACK_LOGOS.github, label: "GitHub" },
  { src: MARKETING_STACK_LOGOS.vercel, label: "Vercel" },
  { src: MARKETING_STACK_LOGOS.nextjs, label: "Next.js" },
];

function Sparkline({ points, animate, compact }) {
  const max = Math.max(...points);
  return (
    <div className={cn("mt-auto flex items-end gap-px", compact ? "h-4" : "h-6")}>
      {points.map((p, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm"
          initial={{ height: 0, opacity: 0.3 }}
          animate={{ height: animate ? `${(p / max) * 100}%` : 0, opacity: 1 }}
          style={contentDemoBarFill(i, 0.08, 0.42)}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        />
      ))}
    </div>
  );
}

function PublishingWorkflowCore({ compact }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={cn(compact ? "flex h-full flex-col" : undefined)}>
      {!compact ? <DemoHeader title="Publishing Workflow" badge="Live" /> : null}
      <div
        className={cn(
          "grid w-full",
          compact
            ? "h-full flex-1 grid-cols-2 content-center items-stretch gap-2 px-2.5 py-2"
            : "grid-cols-2 gap-2.5 p-4 sm:p-5",
        )}
      >
        {STATS.slice(0, compact ? 2 : 4).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={cn(
              "flex flex-col rounded-xl border border-gray-200/80 bg-gray-50/90 dark:border-white/[0.08] dark:bg-white/[0.03]",
              compact ? "justify-between p-2" : "p-2.5 sm:p-3",
            )}
          >
            <div className="mb-1 flex items-center justify-between gap-1">
              <span className={cn("font-medium text-gray-500 dark:text-white/45", compact ? "text-[8px]" : "text-[9px]")}>
                {stat.label}
              </span>
              {!compact ? (
                <span className={cn("rounded-full border px-1.5 py-0.5 text-[7px] font-bold", STATUS_CLASS[stat.tone])}>
                  {stat.status}
                </span>
              ) : null}
            </div>
            <p className={cn("font-bold text-gray-900 dark:text-white", compact ? "text-xs" : "text-sm sm:text-base")}>
              {stat.value}
            </p>
            <p
              className={cn(
                "font-semibold",
                DELTA_CLASS[stat.tone],
                compact ? "mb-1 text-[8px]" : "mb-1.5 text-[9px]",
              )}
            >
              {stat.delta}
            </p>
            <Sparkline points={stat.spark} animate={ready} compact={compact} />
          </motion.div>
        ))}
      </div>
      {!compact ? (
        <div className="border-t border-gray-200/80 dark:border-white/[0.06] px-4 pb-4 pt-3 sm:px-5">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/35">
            Publishes this month
          </p>
          <div className="flex h-12 items-end gap-1">
            {[32, 38, 42, 48, 55, 62, 70, 78, 85, 92].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t"
                initial={{ height: 0 }}
                animate={{ height: ready ? `${h}%` : 0 }}
                style={contentDemoBarFill(i, 0.06, 0.35)}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PublishingWorkflowDemo({ compact = false, embedded = false }) {
  if (compact) {
    return (
      <DemoFrame float={false} glow={!embedded} embedded={embedded} className="h-full w-full">
        <PublishingWorkflowCore compact />
      </DemoFrame>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 lg:flex-row lg:items-center lg:justify-center">
      <div className="w-full max-w-lg flex-1">
        <DemoFrame>
          <PublishingWorkflowCore />
        </DemoFrame>
      </div>
      <div className="flex gap-3 lg:flex-col">
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p.label}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white px-3 py-2 shadow-lg dark:border-white/10 dark:bg-[#1a1b1e]"
          >
            <Image src={p.src} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            <span className="text-[10px] font-semibold text-gray-700 dark:text-white/50">{p.label}</span>
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
