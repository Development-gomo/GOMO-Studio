/** Brand tokens for GOMO Studio. Ink + lime identity kept from the prior visual system. */
export const BRAND = {
  name: "GOMO Studio",
  tagline: "Your website's AI-powered backend",
  colors: {
    ink: "#0f0f0f",
    accent: "#c9ff33",
    accentSoft: "#edf7c8",
    elevated: "#1a1b1e",
    grey: "#374151",
    muted: "#6b7280",
    border: "#e8eaef",
    successGreen: "#12B76A",
    blueLight: "#36BFFA",
    roseRed: "#F63D68",
    orangeDark: "#FF692E",
    pinkAttire: "#F670C7",
    electricBlue: "#268de5",
    veryBlack: "#0f0f0f",
    dancingPurple: "#8e38f8",
    realisticGrey: "#374151",
    accentLime: "#c9ff33",
  },
};

/** Ink → grey gradient for titles. */
export const BRAND_GRADIENT_TEXT = {
  background: "linear-gradient(135deg, #0f0f0f 0%, #4b5563 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/** Lime → ink gradient for marketing hero highlights (theme-aware via CSS). */
export const BRAND_HERO_GRADIENT_CLASS = "hero-gradient-text";

/** @deprecated Use BRAND_HERO_GRADIENT_CLASS — kept for gradual migration */
export const BRAND_HERO_GRADIENT_TEXT = {
  background: "linear-gradient(135deg, #5f8f00 0%, #0f0f0f 55%, #374151 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const BRAND_PRIMARY_BUTTON_CLASS = "btn-brand-primary px-6 py-3 text-sm shadow-lg";
export const BRAND_PRIMARY_BUTTON_LG_CLASS =
  "btn-brand-primary px-8 py-3.5 text-base font-semibold shadow-xl";
export const BRAND_PRIMARY_BUTTON_SM_CLASS = "btn-brand-primary px-4 py-1.5 text-sm shadow-sm";

export const BRAND_LIME_TEXT_CLASS = "text-brand-lime";
export const BRAND_INK_BADGE_CLASS = "brand-ink-badge";

export const BRAND_SECONDARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-900/12 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:border-[var(--brand-lime)] hover:bg-[#f4fae8] active:scale-[0.98] dark:border-white/15 dark:bg-white/[0.04] dark:text-white/85 dark:hover:border-brand-500/50 dark:hover:bg-brand-500/12 dark:hover:text-brand-300";
export const BRAND_SECONDARY_BUTTON_LG_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-900/12 bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:border-[var(--brand-lime)] hover:bg-[#f4fae8] active:scale-[0.98] dark:border-white/15 dark:bg-white/[0.04] dark:text-white/85 dark:hover:border-brand-500/40";

export const BRAND_LINK_CLASS =
  "font-medium text-brand-600 underline decoration-brand-300/50 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-300 dark:decoration-brand-500/40 dark:hover:text-brand-500";
