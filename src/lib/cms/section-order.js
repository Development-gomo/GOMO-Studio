/** Friendly names → layout.sectionOrder keys. */
const SECTION_ALIASES = {
  hero: "hero",
  "hero section": "hero",
  headline: "hero",
  trusted: "trustedBy",
  "trusted by": "trustedBy",
  logos: "trustedBy",
  transformation: "transformation",
  "how it works": "howItWorks",
  howitworks: "howItWorks",
  capabilities: "capabilities",
  capability: "capabilities",
  products: "capabilities",
  stats: "stats",
  statistics: "stats",
  integrations: "integrations",
  integration: "integrations",
  testimonials: "testimonials",
  reviews: "testimonials",
  pricing: "pricing",
  price: "pricing",
  plans: "pricing",
  faq: "faq",
  faqs: "faq",
  questions: "faq",
  cta: "cta",
  "call to action": "cta",
  footer: "cta",
};

export function resolveSectionKey(name, allowed) {
  const trimmed = name.trim().toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  if (!trimmed) return undefined;

  const alias = SECTION_ALIASES[trimmed];
  if (alias && allowed.includes(alias)) return alias;

  const compact = trimmed.replace(/\s+/g, "");
  for (const key of allowed) {
    if (key.toLowerCase() === trimmed || key.toLowerCase() === compact) return key;
  }

  return undefined;
}

/** Repeated ids in `custom` are preserved (a section can be duplicated on the page). */
export function normalizeSectionOrder(custom, allowed) {
  if (!Array.isArray(custom) || allowed.length === 0) return undefined;

  const allowedSet = new Set(allowed);
  const present = new Set();
  const result = [];

  for (const item of custom) {
    if (typeof item !== "string") continue;
    const key = resolveSectionKey(item, allowed) ?? (allowedSet.has(item) ? item : undefined);
    if (key) {
      result.push(key);
      present.add(key);
    }
  }

  for (const key of allowed) {
    if (!present.has(key)) result.push(key);
  }

  return result.length > 0 ? result : undefined;
}

/** Drops hidden section ids from a resolved order (all instances of a duplicated id). Never hides every section. */
export function applyHiddenSections(order, hidden) {
  if (!Array.isArray(hidden) || hidden.length === 0) return order;
  const hiddenSet = new Set(hidden);
  const visible = order.filter((id) => !hiddenSet.has(id));
  return visible.length > 0 ? visible : order;
}
