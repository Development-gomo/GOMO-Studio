/**
 * Shared utilities: Tailwind class merge (`cn`) and external link detection for nav/CTAs.
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** True when the href should open in a new tab (http(s), mailto). Internal paths like `/contact` are false. */
export function isExternalNavigationHref(href) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}
