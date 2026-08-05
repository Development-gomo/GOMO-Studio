"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { cn } from "@/lib/utils";

const answerComponents = {
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-navy-900/60 dark:text-white/72">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-700 dark:text-white/80">{children}</em>
  ),
  a: ({ href, children }) => {
    const className =
      "font-medium text-brand-600 underline decoration-brand-300/50 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-300 dark:decoration-brand-500/40 dark:hover:text-brand-500";
    if (href?.startsWith("http")) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={className}>
        {children}
      </Link>
    );
  },
};

/** items: BlogFaqItem[] — { question, answer } */
export function BlogFaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items.length) return null;

  return (
    <div className="my-6 space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50/50 transition-all duration-300 dark:border-white/[0.08] dark:bg-white/[0.03]",
              isOpen && "border-brand-500/40 dark:border-brand-500/30",
            )}
          >
            <button
              type="button"
              className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`blog-faq-panel-${i}`}
              id={`blog-faq-heading-${i}`}
            >
              <span
                className={cn(
                  "text-base font-medium transition-colors duration-200",
                  isOpen
                    ? "text-brand-600 dark:text-brand-300"
                    : "text-gray-900 dark:text-white/90 group-hover:text-gray-900 dark:group-hover:text-white",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-brand-500 bg-brand-600 text-brand-lime"
                    : "border-black/10 bg-black/5 group-hover:border-brand-500/50 dark:border-white/10 dark:bg-white/5",
                )}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            <div
              id={`blog-faq-panel-${i}`}
              role="region"
              aria-labelledby={`blog-faq-heading-${i}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="px-5 pb-5 sm:px-6 sm:pb-5">
                <ReactMarkdown components={answerComponents}>{item.answer}</ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
