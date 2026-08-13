"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow, FadeUp, OutlinePillButton } from "./shared";
import { SAAS_EASE as EASE } from "@/lib/motion";

const DEFAULT_SLIDES = [
  {
    stat1Value: "195%",
    stat1Label: "Increase in organic visibility achieved",
    stat2Value: "400+",
    stat2Label: "Marketing hours saved through AI & automation",
    quote: "How Automation and Gen-AI scaled marketing operations and saved 400+ hours for a global B2B e-commerce giant",
    ctaLabel: "Read full case",
    ctaHref: "/resources/blogs",
    color: "#bd27f6",
    stat1Color: "#eeff41",
    stat2Color: "#ff28bc",
  },
  {
    stat1Value: "25%",
    stat1Label: "Efficiency gain unlocked with generative AI",
    stat2Value: "40%",
    stat2Label: "Improvement in output quality achieved",
    quote: "How a global SaaS leader used generative AI to cut production time and improve creative quality",
    ctaLabel: "Read full case",
    ctaHref: "/resources/blogs",
    color: "#268de5",
    stat1Color: "#5cffd3",
    stat2Color: "#bd27f6",
  },
];

export function DigitalExperienceCaseStudy({ content }) {
  const slides = content?.caseStudies?.length ? content.caseStudies : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative z-0 overflow-hidden border-t border-white/10 px-4 py-24 sm:px-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#0a0500",
          backgroundImage:
            "radial-gradient(70% 60% at 85% 20%, rgba(255,111,0,0.55) 0%, transparent 65%), radial-gradient(60% 70% at 10% 90%, rgba(189,39,246,0.5) 0%, transparent 65%), radial-gradient(50% 50% at 50% 100%, rgba(3,12,244,0.45) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        <FadeUp className="mb-14 max-w-xl">
          <Eyebrow className="mb-5">{content?.caseStudyEyebrow || "Case studies"}</Eyebrow>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight text-white">
            {content?.caseStudyHeadingPre || "We craft "}
            <span className="font-serif italic text-[#5cffd3]">{content?.caseStudyHeadingAccent1 || "digital experiences"}</span>
            {content?.caseStudyHeadingMid || " that elevate "}
            <span className="font-serif italic text-[#03ffff]">{content?.caseStudyHeadingAccent2 || "your business."}</span>
          </h2>
        </FadeUp>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="ml-auto flex max-w-3xl flex-col overflow-hidden rounded-lg sm:flex-row"
          >
            <div className="flex shrink-0 flex-col bg-white/10 text-white sm:w-[250px]">
              <div className="flex flex-1 flex-col justify-center gap-1 border-b border-white/20 p-6">
                <p className="font-serif text-4xl font-bold sm:text-5xl" style={{ color: slide.stat1Color }}>{slide.stat1Value}</p>
                <p className="max-w-[13rem] text-sm text-white">{slide.stat1Label}</p>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-1 p-6">
                <p className="font-serif text-4xl font-bold sm:text-5xl" style={{ color: slide.stat2Color }}>{slide.stat2Value}</p>
                <p className="max-w-[13rem] text-sm text-white">{slide.stat2Label}</p>
              </div>
            </div>

            <div className="relative flex-1 p-8 sm:p-10" style={{ backgroundColor: slide.color }}>
              <p className="text-xl leading-relaxed text-white sm:text-2xl">{slide.quote}</p>
              <OutlinePillButton href={slide.ctaHref || "/resources/blogs"} className="mt-8">
                {slide.ctaLabel || "Read full case"}
              </OutlinePillButton>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous case study"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next case study"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
