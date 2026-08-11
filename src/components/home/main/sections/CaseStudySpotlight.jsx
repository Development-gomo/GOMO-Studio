"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { MainButton } from "@/components/home/main/MainButton";
import { SITE_ROUTES } from "@/lib/site-links";
import { mcFadeUp, mcStagger, mcViewport, MC_EASE } from "@/components/home/main/tokens";

const DEFAULT_CASES = [
  {
    stat1: "195%",
    stat1Color: "#EEFF41",
    cap1: "Increase in organic visibility achieved",
    stat2: "400+",
    stat2Color: "#FF28BC",
    cap2: "Marketing hours saved through AI & automation",
    desc: "How Automation and Gen-AI scaled marketing operations and saved 400+ hours for a global B2B e-commerce giant",
    bg: "#BD27F6",
  },
  {
    stat1: "25%",
    stat1Color: "#00DEFF",
    cap1: "Efficiency gain unlocked with generative AI",
    stat2: "40%",
    stat2Color: "#8F38F8",
    cap2: "Improvement in output quality achieved",
    desc: "How a global SaaS leader used generative AI to cut production time and improve creative quality",
    bg: "#268DE5",
  },
];

export function CaseStudySpotlight({ content }) {
  const eyebrow = content?.caseStudiesEyebrow || "Case studies";
  const headingPlain1 = content?.caseHeadingPlain1 || "We craft";
  const headingEm1 = content?.caseHeadingEm1 || "digital experiences";
  const headingPlain2 = content?.caseHeadingPlain2 || "that elevate";
  const headingEm2 = content?.caseHeadingEm2 || "your business.";
  const readFullCaseLabel = content?.caseReadFullCaseLabel || "Read full case";
  const cases = content?.caseStudiesList?.length ? content.caseStudiesList : DEFAULT_CASES;

  const [idx, setIdx] = useState(0);
  const c = cases[idx % cases.length];

  return (
    <section id="case-studies" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home-main/case-spotlight-bg.png" alt="" className="h-full w-full object-cover blur-[5px]" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070C11] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070C11] to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcStagger}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <motion.div variants={mcFadeUp}>
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        </motion.div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <motion.h2 variants={mcFadeUp} className="max-w-lg text-[32px] font-medium leading-[1.2] text-white sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
            {headingPlain1} <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm1}</span>{" "}
            {headingPlain2} <span className="font-[family-name:var(--font-merriweather)] italic text-[#00DEFF]">{headingEm2}</span>
          </motion.h2>

          <motion.div variants={mcFadeUp} className="relative flex w-full max-w-xl overflow-hidden rounded-2xl">
            <div className="flex w-[210px] shrink-0 flex-col divide-y divide-white/20 bg-white/10 p-6">
              <div className="pb-6">
                <span className="font-[family-name:var(--font-merriweather)] text-4xl font-bold italic" style={{ color: c.stat1Color }}>
                  {c.stat1}
                </span>
                <p className="mt-2 text-sm leading-snug text-white">{c.cap1}</p>
              </div>
              <div className="pt-6">
                <span className="font-[family-name:var(--font-merriweather)] text-4xl font-bold italic" style={{ color: c.stat2Color }}>
                  {c.stat2}
                </span>
                <p className="mt-2 text-sm leading-snug text-white">{c.cap2}</p>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: MC_EASE }}
                className="flex flex-1 flex-col justify-between gap-6 p-6"
                style={{ background: c.bg }}
              >
                <p className="text-lg leading-relaxed text-white">{c.desc}</p>
                <MainButton href={SITE_ROUTES.blogs} variant="outline" className="self-start px-8 py-3 text-sm">
                  {readFullCaseLabel}
                </MainButton>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div variants={mcFadeUp} className="mt-12 flex gap-3">
          <button
            type="button"
            onClick={() => setIdx((i) => (i + 1) % cases.length)}
            aria-label="Previous case study"
            className="flex h-[46px] w-[68px] items-center justify-center rounded-lg bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIdx((i) => (i + 1) % cases.length)}
            aria-label="Next case study"
            className="flex h-[46px] w-[68px] items-center justify-center rounded-lg bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/20"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
