/** Scroll to an element by id (fixed header offset handled via target's `scroll-margin-top`). */
export function scrollToElementById(elementId) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(elementId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * In-app `#anchor` links: native scroll is flaky with Next.js + client components (and re-clicks when the hash is unchanged).
 * Call from `onClick` on `<a href="#...">`; returns true if handled.
 */
export function handleSamePageHashClick(event, href) {
  if (!href.startsWith("#") || href.length < 2) return false;
  const id = decodeURIComponent(href.slice(1));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  event.preventDefault();
  scrollToElementById(id);
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}#${encodeURIComponent(id)}`);
  return true;
}
