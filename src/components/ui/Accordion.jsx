"use client";

/**
 * Accessible FAQ-style accordion (home and other pages).
 * items: { question, answer }[]
 */
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ items, className }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={cn(
              "glass-card rounded-2xl overflow-hidden transition-all duration-300",
              isOpen && "border-brand-500/40 glow-purple"
            )}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${i}`}
              id={`accordion-heading-${i}`}
            >
              <span
                className={cn(
                  "text-base font-medium transition-colors duration-200",
                  isOpen ? "text-brand-600 dark:text-brand-300" : "text-navy-900/90 dark:text-white/90 group-hover:text-navy-900 dark:group-hover:text-white"
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border",
                  isOpen
                    ? "bg-brand-600 border-brand-500 rotate-45 text-brand-500"
                    : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 group-hover:border-brand-500/50"
                )}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            <div
              id={`accordion-panel-${i}`}
              role="region"
              aria-labelledby={`accordion-heading-${i}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p className="px-6 pb-5 text-sm leading-relaxed text-navy-900/60 dark:text-white/72">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
