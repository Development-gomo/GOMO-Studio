"use client";

/**
 * After Next.js client navigations (e.g. `<Link href="/#pricing">`) the URL hash may not trigger a scroll.
 * Also handles initial load with a hash. Same-page `#` clicks are handled via `handleSamePageHashClick` on anchors.
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToElementById } from "@/lib/hash-nav";

function scrollFromLocationHash() {
  const raw = typeof window !== "undefined" ? window.location.hash : "";
  const id = raw.startsWith("#") ? decodeURIComponent(raw.slice(1)) : "";
  if (!id) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToElementById(id));
  });
}

export function HashScrollRestorer() {
  const pathname = usePathname();

  useEffect(() => {
    scrollFromLocationHash();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollFromLocationHash);
    return () => window.removeEventListener("hashchange", scrollFromLocationHash);
  }, []);

  return null;
}
