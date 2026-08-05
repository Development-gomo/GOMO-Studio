/** Integrations still in progress — show "Coming soon" in marketing UI. */
export const COMING_SOON_MARKETING_INTEGRATIONS = new Set(["slack", "zapier"]);

export const COMING_SOON_INTEGRATION_LABEL = "Coming soon";

export const COMING_SOON_INTEGRATION_BADGE_CLASS =
  "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20";

export function isMarketingIntegrationComingSoon(key) {
  return COMING_SOON_MARKETING_INTEGRATIONS.has(key);
}
