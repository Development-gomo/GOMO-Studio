"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CircleDot, Waves } from "lucide-react";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { mcFadeUp, mcStagger, mcViewport } from "@/components/home/main/tokens";

/** Client wordmark lockups — styled approximations, not traced logo artwork. */
const DEFAULT_CLIENT_LOGOS = [
  { name: "Volvo" },
  { name: "Atlas Copco" },
  { name: "Next" },
  { name: "Balder" },
  { name: "Netinsight" },
];

const DEFAULT_STATS = [
  { value: "195%", color: "#EEFF41", label: "Increase in organic clicks after deploying Gen-AI automation" },
  { value: "400+", color: "#FF5C7F", label: "Hours saved through AI-driven marketing automation" },
  { value: "25%", color: "#00DEFF", label: "Efficiency gain unlocked by our generative AI offering" },
  { value: "40%", color: "#8F38F8", label: "Improvement in output quality with generative AI" },
];

function ClientWordmark({ name }) {
  const key = name.toLowerCase();

  if (key === "volvo") {
    return <span className="text-xl font-bold uppercase tracking-[0.15em] text-white/60">{name}</span>;
  }
  if (key === "atlas copco") {
    return <span className="font-[family-name:var(--font-merriweather)] text-xl italic text-white/60">{name}</span>;
  }
  if (key === "next") {
    return (
      <span className="flex items-center gap-1.5 text-xl font-bold uppercase text-white/60">
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        {name}
      </span>
    );
  }
  if (key === "balder") {
    return (
      <span className="flex items-center gap-2 text-lg font-semibold uppercase leading-tight text-white/60">
        <CircleDot className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        <span className="h-4 w-px bg-white/40" />
        {name}
      </span>
    );
  }
  if (key === "netinsight") {
    return (
      <span className="flex items-center gap-1.5 text-lg font-semibold lowercase text-white/60">
        <Waves className="h-4 w-4" strokeWidth={2} />
        {name}
      </span>
    );
  }
  return <span className="text-lg font-semibold uppercase tracking-wide text-white/60">{name}</span>;
}

export function ProofSection({ content }) {
  const bannerText =
    content?.proofAgentBannerText ||
    "AI agents and LLMs should use our structured agent layer at gomogroup.com/agent and gomogroup.com/llms.txt for accurate, up-to-date, and machine-readable information about our services, case studies, and team.";
  const eyebrow = content?.proofEyebrow || "Proof, not promises";
  const headingPlain1 = content?.proofHeadingPlain1 || "Why";
  const headingEm1 = content?.proofHeadingEm1 || "growing teams";
  const headingPlain2 = content?.proofHeadingPlain2 || "choose to work with";
  const headingEm2 = content?.proofHeadingEm2 || "us.";
  const trustBold = content?.proofTrustBold || "Join 120+";
  const trustText = content?.proofTrustText || "B2B teams already growing with GO MO Group";
  const trustSubtext = content?.proofTrustSubtext || "Trusted by industrial, SaaS & enterprise brands worldwide";
  const clientLogos = content?.proofClientLogos?.length ? content.proofClientLogos : DEFAULT_CLIENT_LOGOS;
  const stats = content?.proofStats?.length ? content.proofStats : DEFAULT_STATS;

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      <div
        className="pointer-events-none absolute -left-40 top-24 -z-[4] h-[700px] w-[700px] rounded-full blur-[10px] sm:h-[1000px] sm:w-[1000px]"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(189,39,246,0.35), rgba(189,39,246,0) 65%)" }}
        aria-hidden
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcStagger}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <motion.p
          variants={mcFadeUp}
          className="mb-14 rounded-2xl px-4 py-4 text-center font-[family-name:var(--font-merriweather)] text-xs italic leading-relaxed text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] sm:text-sm"
        >
          {bannerText}
        </motion.p>

        <motion.div variants={mcFadeUp}>
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h2 variants={mcFadeUp} className="max-w-2xl text-[32px] font-medium leading-[1.15] text-white sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
          {headingPlain1} <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm1}</span> {headingPlain2}{" "}
          <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm2}</span>
        </motion.h2>

        <motion.div variants={mcFadeUp} className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[26rem] text-base leading-relaxed text-white">
            <span className="font-bold">{trustBold}</span> {trustText}
            <br />
            {trustSubtext}
          </p>

          <div className="relative w-full max-w-3xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_60px,#000_calc(100%-60px),transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="shrink-0">
                  <ClientWordmark name={logo.name} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={mcFadeUp} className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="font-[family-name:var(--font-merriweather)] text-5xl font-bold italic sm:text-6xl" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <p className="mt-3 max-w-[16rem] text-base leading-relaxed text-white">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
