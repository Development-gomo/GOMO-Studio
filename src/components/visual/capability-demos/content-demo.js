/** Shared shell for capability-demo mockups — theme-aware light/dark. */
export const CONTENT_DEMO_SHELL_CLASS =
  "rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] overflow-hidden";

export const CONTENT_DEMO_INPUT_ROW_CLASS =
  "flex items-center gap-2.5 px-4 py-3 border-b border-gray-200 dark:border-white/[0.06]";

export const CONTENT_DEMO_BODY_CLASS = "p-4";

export const CONTENT_DEMO_CHART_WRAP_CLASS =
  "rounded-xl border border-gray-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.03] p-3";

export const CONTENT_DEMO_KEY_FINDING_CLASS =
  "flex items-center gap-2 bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20 rounded-lg px-3 py-2";

export const CONTENT_DEMO_KEY_FINDING_LABEL_CLASS =
  "text-brand-600 dark:text-brand-300 text-[10px] font-bold shrink-0";

export const CONTENT_DEMO_ANSWERED_BADGE_CLASS =
  "text-[9px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 px-1.5 py-0.5 rounded-full font-medium";

/** Lime bar fill only — pair with CSS height / motion height. */
export function contentDemoBarFill(index, step = 0.1, base = 0.4) {
  const mix = Math.min(95, Math.round((base + index * step) * 100));
  return {
    background: `color-mix(in srgb, var(--brand-lime) ${mix}%, transparent)`,
  };
}

/** Lime bars — uses --brand-lime so light/dark stay consistent (not theme brand-500 olive). */
export function contentDemoBarStyle(heightPx, index, step = 0.1, base = 0.4) {
  const mix = Math.min(95, Math.round((base + index * step) * 100));
  return {
    height: `${heightPx}px`,
    background: `color-mix(in srgb, var(--brand-lime) ${mix}%, transparent)`,
  };
}
