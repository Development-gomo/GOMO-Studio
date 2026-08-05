"use client";

import { useEffect, useState } from "react";
import { DemoFrame, DemoHeader } from "@/components/visual/capability-demos/DemoFrame";
import {
  CONTENT_DEMO_BODY_CLASS,
  CONTENT_DEMO_CHART_WRAP_CLASS,
  CONTENT_DEMO_KEY_FINDING_CLASS,
  CONTENT_DEMO_KEY_FINDING_LABEL_CLASS,
  contentDemoBarStyle,
} from "@/components/visual/capability-demos/content-demo";
import { GomoLogo } from "@/components/layout/GomoLogo";
import { cn } from "@/lib/utils";

const PROMPT = "Make the hero headline punchier";
const BARS = [
  { label: "Clarity", h: 72 },
  { label: "Tone", h: 48 },
  { label: "SEO", h: 86 },
  { label: "Length", h: 58 },
  { label: "Impact", h: 64 },
];

function AiContentCore({ compact }) {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState("typing");
  const [bars, setBars] = useState(0);
  const chartMax = compact ? 48 : 64;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        clearInterval(t);
        setTimeout(() => {
          setPhase("chart");
          BARS.forEach((_, idx) => setTimeout(() => setBars((b) => Math.max(b, idx + 1)), idx * 90));
          setTimeout(() => setPhase("done"), BARS.length * 90 + 350);
        }, 300);
      }
    }, 32);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={cn(compact && "flex h-full flex-col")}>
      {!compact ? <DemoHeader title="AI Content" badge="Claude-powered" /> : null}
      <div
        className={cn(
          "flex flex-1 flex-col gap-3",
          compact ? "justify-center p-2.5" : cn(CONTENT_DEMO_BODY_CLASS, "justify-start"),
        )}
      >
        <div className="rounded-xl border border-gray-200/80 dark:border-white/[0.06] bg-gray-50/90 dark:bg-white/[0.05] px-3 py-2.5 text-xs text-gray-700 dark:text-white/80 sm:text-sm">
          {typed}
          {phase === "typing" && typed.length < PROMPT.length ? (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-brand-500 align-middle dark:bg-brand-400" />
          ) : null}
        </div>
        {phase !== "typing" ? (
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 pt-0.5">
              <GomoLogo variant="mark" className="h-6 w-6" />
              <span className="text-[10px] font-semibold text-gray-600 dark:text-white/60">Generated in 2.8s</span>
            </div>
            <div className={CONTENT_DEMO_CHART_WRAP_CLASS}>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/35">
                Suggestion quality
              </p>
              <div className="flex items-end gap-1.5" style={{ height: chartMax }}>
                {BARS.map((bar, i) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center justify-end gap-0.5">
                    <div
                      className="w-full rounded-t transition-all duration-500"
                      style={{
                        ...contentDemoBarStyle(
                          i < bars ? Math.round((bar.h / 100) * chartMax) : 0,
                          i,
                        ),
                      }}
                    />
                    <span className="text-[7px] text-gray-400 dark:text-white/30">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {phase === "done" && !compact ? (
              <div className={CONTENT_DEMO_KEY_FINDING_CLASS}>
                <span className={CONTENT_DEMO_KEY_FINDING_LABEL_CLASS}>✓ Suggestion</span>
                <span className="text-[10px] leading-relaxed text-gray-600 dark:text-white/60">
                  "Ship copy in minutes, not sprints." Saved to your draft — nothing published yet.
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AiContentDemo({ compact = false, embedded = false }) {
  if (compact) {
    return (
      <DemoFrame float={false} glow={!embedded} embedded={embedded} className="h-full w-full">
        <AiContentCore compact />
      </DemoFrame>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <DemoFrame>
        <div className="flex items-center gap-2 border-b border-gray-200/80 dark:border-white/[0.08] px-4 py-3">
          <GomoLogo variant="mark" className="h-6 w-6" />
          <span className="text-xs font-bold text-brand-600 dark:text-brand-300">AI Content Panel</span>
        </div>
        <AiContentCore />
      </DemoFrame>
    </div>
  );
}
