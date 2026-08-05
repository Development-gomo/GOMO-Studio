/**
 * Canonical `/public` paths for the integrations shown in the home IntegrationsHub and the
 * integrations page. GOMO Studio connects to hosting/deploy/analytics tooling, not ad platforms.
 */
export const MARKETING_STACK_LOGOS = {
  nextjs: "/integrations/nextjs.svg",
  vercel: "/integrations/vercel.svg",
  github: "/integrations/github.svg",
  googleSearchConsole: "/google-search-console-icon.webp",
  googleAnalytics4: "/ga4.svg",
  slack: "/integrations/slack.svg",
  zapier: "/integrations/zapier.svg",
};

export const MARKETING_STACK_LOGO_KEYS = Object.keys(MARKETING_STACK_LOGOS);

/** Default partner names (marquee + hub) when no custom label is set. */
export const DEFAULT_INTEGRATION_PARTNER_LABELS = {
  nextjs: "Next.js",
  vercel: "Vercel",
  github: "GitHub",
  googleSearchConsole: "Google Search Console",
  googleAnalytics4: "Google Analytics 4",
  slack: "Slack",
  zapier: "Zapier",
};

/** Integration page display name → same asset as home */
export const MARKETING_STACK_LOGO_BY_INTEGRATION_NAME = {
  "Next.js": MARKETING_STACK_LOGOS.nextjs,
  Vercel: MARKETING_STACK_LOGOS.vercel,
  GitHub: MARKETING_STACK_LOGOS.github,
  "Google Search Console": MARKETING_STACK_LOGOS.googleSearchConsole,
  "Google Analytics 4": MARKETING_STACK_LOGOS.googleAnalytics4,
  Slack: MARKETING_STACK_LOGOS.slack,
  Zapier: MARKETING_STACK_LOGOS.zapier,
};
