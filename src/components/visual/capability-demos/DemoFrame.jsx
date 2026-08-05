"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

function useReduceMotionOnMobile() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}

export function DemoFrame({
  children,
  className,
  float = true,
  glow = true,
  embedded = false,
}) {
  const reduceMotion = useReduceMotionOnMobile();
  const shouldFloat = float && !reduceMotion;
  const shouldGlow = glow && !reduceMotion;

  if (embedded) {
    return (
      <div className={cn("flex h-full w-full items-center justify-center", className)}>
        <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-[#14141B] shadow-lg shadow-gray-900/5 dark:shadow-black/30">
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: EASE }}
      className={cn("relative", className)}
    >
      {shouldGlow ? (
        <div className="absolute -inset-3 rounded-[2rem] bg-brand-500/8 blur-3xl dark:bg-brand-500/15 sm:-inset-6" aria-hidden />
      ) : null}
      <motion.div
        animate={shouldFloat ? { y: [0, -8, 0] } : undefined}
        transition={shouldFloat ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="relative overflow-hidden rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white dark:bg-[#14141B]/95 shadow-2xl shadow-gray-900/10 dark:shadow-black/50 backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function DemoHeader({ title, badge }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-200/80 dark:border-white/[0.08] px-3 py-2.5 sm:px-5 sm:py-3">
      <span className="text-xs font-bold text-gray-900 dark:text-white sm:text-sm">{title}</span>
      {badge ? (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          {badge}
        </span>
      ) : null}
    </div>
  );
}
