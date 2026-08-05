"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleSamePageHashClick } from "@/lib/hash-nav";

/** headings: { id, text }[] */
export function BlogTableOfContents({ headings, collapsible = false }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [open, setOpen] = useState(!collapsible);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-gray-200/80 bg-white p-4 dark:border-white/[0.08] dark:bg-[#14141B] sm:p-5"
    >
      {collapsible ? (
        <button
          type="button"
          className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/45">
            On this page
          </span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-gray-400 transition-transform dark:text-white/40", open && "rotate-180")}
            aria-hidden
          />
        </button>
      ) : (
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/45">
          On this page
        </p>
      )}
      {open ? (
        <ul className={cn("space-y-1", collapsible && "mt-2 border-t border-gray-100 pt-3 dark:border-white/[0.06]")}>
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  handleSamePageHashClick(e, `#${h.id}`);
                  setActiveId(h.id);
                  if (collapsible) setOpen(false);
                }}
                className={cn(
                  "flex min-h-[40px] items-center rounded-lg py-2 pl-3 text-sm leading-snug transition-colors border-l-2",
                  activeId === h.id
                    ? "border-brand-500 text-gray-900 font-semibold dark:text-white"
                    : "border-transparent text-gray-500 hover:text-gray-800 dark:text-white/50 dark:hover:text-white/80",
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}
