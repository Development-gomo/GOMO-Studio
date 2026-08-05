"use client";

import { useEffect, useState } from "react";

/** Thin lime progress bar at top of viewport — scroll depth indicator. */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-brand-500 shadow-[0_0_12px_color-mix(in_srgb,var(--brand-500)_60%,transparent)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
