"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { MainButton } from "@/components/home/main/MainButton";
import { SITE_ROUTES } from "@/lib/site-links";
import { mcFadeUp, mcStagger, mcViewport } from "@/components/home/main/tokens";

const DEFAULT_IMPROVEMENTS = [
  {
    title: "Marketing",
    desc: "Turn repetitive marketing tasks into connected AI workflows that help your team move faster and improve performance.",
  },
  { title: "Sales", desc: "Equip your sales team with AI workflows that qualify leads and shorten the path to close." },
  { title: "Communication", desc: "Keep every stakeholder aligned with AI-assisted reporting and internal communication flows." },
];

const DEFAULT_TAGS = [
  { label: "Custom Workflow Solutions", color: "#FF28BC" },
  { label: "Built within your environment", color: "#EEFF41" },
  { label: "Scalable AI Operations", color: "#00DEFF" },
  { label: "Data & security compliant", color: "#FF28BC" },
  { label: "Team Adoption Training", color: "#5CFFD3" },
  { label: "Compliance by Design", color: "#BD27F6" },
];

function ImprovementItem({ item, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/40 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-2xl font-semibold text-white">{item.title}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-white/70 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-2 text-base leading-relaxed text-white/80">{item.desc}</p>}
    </div>
  );
}

export function AiWorkflowEngineering({ content }) {
  const eyebrow = content?.workflowEyebrow || "Built to fit";
  const headingPlain = content?.workflowHeadingPlain || "AI Workflow";
  const headingEm = content?.workflowHeadingEm || "Engineering";
  const ctaLabel = content?.workflowCtaLabel || "Book a discovery call";
  const paragraph =
    content?.workflowParagraph ||
    "We start with your problem, not the platform. Then we design and build a secure AI tool or workflow within your existing environment, aligned with your data requirements and train your team to use it confidently in everyday work.";
  const improvementsLabel = content?.workflowImprovementsLabel || "What we help you improve";
  const improvements = content?.workflowImprovementsList?.length ? content.workflowImprovementsList : DEFAULT_IMPROVEMENTS;
  const tags = content?.workflowTagsList?.length ? content.workflowTagsList : DEFAULT_TAGS;

  return (
    <section className="relative py-8 sm:py-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcFadeUp}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-white/15"
          style={{ background: "linear-gradient(124deg, rgba(142, 56, 248, 0.25) 0%, rgba(0, 2, 42, 0.5) 64%)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home-main/workflow-bg.png"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={mcViewport}
            variants={mcStagger}
            className="grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:p-16"
          >
            <div>
              <motion.div variants={mcFadeUp}>
                <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
              </motion.div>
              <motion.h2
                variants={mcFadeUp}
                className="font-medium leading-[1.05] text-white text-4xl sm:text-6xl lg:text-[80px] lg:leading-[104px]"
              >
                {headingPlain}
                <br />
                <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm}</span>
              </motion.h2>
              <motion.div variants={mcFadeUp} className="mt-8">
                <MainButton href={SITE_ROUTES.contact} variant="gradient">
                  {ctaLabel}
                </MainButton>
              </motion.div>
            </div>

            <motion.div variants={mcFadeUp}>
              <p className="max-w-md text-base leading-relaxed text-white">{paragraph}</p>
              <p className="mb-2 mt-10 text-sm font-semibold uppercase tracking-[0.08em] text-[#EEFF41]">
                {improvementsLabel}
              </p>
              <div>
                {improvements.map((item, i) => (
                  <ImprovementItem key={item.title} item={item} defaultOpen={i === 0} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={mcFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={mcViewport}
            className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_60px,#000_calc(100%-60px),transparent)]"
          >
            <div className="flex w-max animate-marquee items-center gap-4">
              {[...tags, ...tags].map((tag, i) => (
                <span
                  key={`${tag.label}-${i}`}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-[family-name:var(--font-merriweather)] italic text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: tag.color }} />
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
