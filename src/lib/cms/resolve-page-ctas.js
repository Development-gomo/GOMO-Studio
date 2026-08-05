/**
 * PageLinkFields (all optional strings): heroPrimaryCtaLabel/Href, heroSecondaryCtaLabel/Href,
 * heroButtonLabel/Href, ctaPrimaryLabel/Href, ctaSecondaryLabel/Href, integrationsCtaHref, faqContactHref
 * CtaPair: { label, href }
 */

export function resolveCtaPair(content, labelKey, hrefKey, defaults) {
  const label = content?.[labelKey];
  const href = content?.[hrefKey];
  return {
    label: typeof label === "string" && label.trim() ? label : defaults.label,
    href: typeof href === "string" && href.trim() ? href : defaults.href,
  };
}

export function resolveBottomCtas(content, defaults) {
  return {
    primaryCta: resolveCtaPair(content, "ctaPrimaryLabel", "ctaPrimaryHref", defaults.primary),
    secondaryCta: resolveCtaPair(content, "ctaSecondaryLabel", "ctaSecondaryHref", defaults.secondary),
  };
}
