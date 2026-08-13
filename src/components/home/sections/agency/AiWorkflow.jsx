"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Eyebrow, FadeUp, GradientPillButton } from "./shared";

const DEFAULT_CATEGORIES = [
  { name: "Marketing", detail: "Turn repetitive marketing tasks into connected AI workflows that help your team move faster and improve performance." },
  { name: "Sales", detail: "Give your sales team AI-assisted research, outreach, and follow-up workflows that shorten the sales cycle." },
  { name: "Communication", detail: "Standardize internal and customer-facing communication with AI workflows built around your tone and process." },
];

const DEFAULT_TAGS = [
  "Custom Workflow Solutions",
  "Built within your environment",
  "Scalable AI Operations",
  "Data & security compliant",
  "Team Adoption Training",
  "Compliance by Design",
];

function CategoryAccordion({ categories, listHeading }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[1.12px] text-[#eeff41]">{listHeading}</p>
      <div className="flex flex-col">
        {categories.map((cat, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={cat.name} className={i < categories.length - 1 ? "border-b border-white/40" : ""}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-2xl font-semibold text-white">{cat.name}</span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-white/70" aria-hidden />
                ) : (
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/70" aria-hidden />
                )}
              </button>
              {isOpen && cat.detail ? (
                <p className="pb-4 text-base leading-relaxed text-white">{cat.detail}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AiWorkflow({ content }) {
  const categories = content?.aiWorkflowCategories?.length ? content.aiWorkflowCategories : DEFAULT_CATEGORIES;
  const tags = content?.aiWorkflowTags?.length ? content.aiWorkflowTags : DEFAULT_TAGS;
  const looped = [...tags, ...tags];

  return (
    <section className="border-t border-white/10 bg-black px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <FadeUp>
          <div className="relative z-0 overflow-hidden rounded-2xl border border-white/15 pt-12 sm:pt-16">
            <Image src="/assets/ai-workflow-bg.jpg" alt="" fill className="-z-10 object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(109.4deg, rgba(142,56,248,0.25) 1.21%, rgba(0,2,42,0.5) 61.7%)",
              }}
            />
            <div className="relative grid grid-cols-1 gap-8 px-6 sm:px-16 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
              <div className="order-1 lg:col-start-1 lg:row-start-1">
                <Eyebrow className="mb-6">{content?.aiWorkflowEyebrow || "Built to fit"}</Eyebrow>
                <h2 className="max-w-xl text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] text-white">
                  {content?.aiWorkflowHeadingPre || "AI Workflow "}
                  <span className="font-serif italic text-[#5cffd3]">{content?.aiWorkflowHeadingAccent || "Engineering"}</span>
                </h2>
              </div>

              <p className="order-2 text-base leading-relaxed text-white lg:col-start-2 lg:row-start-1">
                {content?.aiWorkflowBody ||
                  "We start with your problem, not the platform. Then we design and build a secure AI tool or workflow within your existing environment, aligned with your data requirements and train your team to use it confidently in everyday work."}
              </p>

              <div className="order-3 lg:col-start-1 lg:row-start-2">
                <GradientPillButton href={content?.aiWorkflowCtaHref || "/company/contact"}>
                  {content?.aiWorkflowCtaLabel || "Book a discovery call"}
                </GradientPillButton>
              </div>

              <div className="order-4 lg:col-start-2 lg:row-start-2">
                <CategoryAccordion categories={categories} listHeading={content?.aiWorkflowListHeading || "What we help you improve"} />
              </div>
            </div>

            <div className="marquee-container relative mt-14 overflow-hidden border-t border-white/10 py-8">
              <div className="flex w-max animate-marquee gap-4">
                {looped.map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 px-6 py-4 text-sm font-serif italic text-white"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#eeff41]" aria-hidden />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
