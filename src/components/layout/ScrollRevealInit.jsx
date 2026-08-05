"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR =
  "main section, main article > div > section, .reveal-on-scroll, [data-reveal]";

/**
 * Observes sections site-wide and toggles `.revealed` for CSS scroll animations.
 * Re-runs on route change so new pages pick up reveals.
 */
export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add("revealed"));
      return;
    }

    const seen = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("revealed");
          seen.add(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (seen.has(el) || el.classList.contains("reveal-skip")) return;
        el.classList.add("reveal");
        observer.observe(el);
      });
    };

    observeAll();
    const t = window.setTimeout(observeAll, 120);

    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
