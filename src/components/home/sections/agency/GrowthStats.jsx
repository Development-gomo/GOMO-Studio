"use client";

import Image from "next/image";
import { Eyebrow, FadeUp } from "./shared";

const DEFAULT_STATS = [
  { value: "195%", color: "#eeff41", label: "Increase in organic clicks after deploying Gen-AI automation" },
  { value: "400+", color: "#ff5c7f", label: "Hours saved through AI-driven marketing automation" },
  { value: "25%", color: "#5cffd3", label: "Efficiency gain unlocked by our generative AI offering" },
  { value: "40%", color: "#bd27f6", label: "Improvement in output quality with generative AI" },
];

const DEFAULT_LOGOS = [
  { name: "Volvo", src: "/design/home/logos/volvo.png", width: 90, height: 20 },
  { name: "Atlas Copco", src: "/design/home/logos/atlas-copco.png", width: 90, height: 28 },
  { name: "Next", src: "/design/home/logos/next.png", width: 90, height: 20 },
  { name: "Balder", src: "/design/home/logos/balder.png", width: 90, height: 20 },
  { name: "netInsight", src: "/design/home/logos/netinsight.png", width: 90, height: 35 },
];

export function GrowthStats({ content }) {
  const stats = content?.growthStats?.length ? content.growthStats : DEFAULT_STATS;
  const logos = content?.trustedLogos?.length ? content.trustedLogos : DEFAULT_LOGOS;

  return (
    <section className="relative z-0 overflow-hidden border-t border-white/10 bg-black px-4 py-20 sm:px-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 65% at 0% 0%, rgba(189,39,246,0.55) 0%, transparent 60%), radial-gradient(45% 55% at 100% 15%, rgba(255,40,188,0.35) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1240px]">
        <FadeUp>
          <Eyebrow className="mb-5">{content?.growthEyebrow || "Proof, not promises"}</Eyebrow>
          <h2 className="max-w-xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight text-white">
            {content?.growthHeadingPre || "Why "}
            <span className="font-serif italic text-[#5cffd3]">{content?.growthHeadingAccent1 || "growing teams"}</span>
            <br />
            {content?.growthHeadingMid || "choose to "}
            <span className="font-serif italic text-[#5cffd3]">{content?.growthHeadingAccent2 || "work with us."}</span>
          </h2>
        </FadeUp>

        <FadeUp
          delay={0.1}
          className="mt-14 flex flex-col gap-6 border-y border-white/15 py-6 sm:flex-row sm:items-center"
        >
          <p className="shrink-0 max-w-sm text-sm text-white/80">
            <span className="font-semibold text-white">{content?.trustedHeadline || "Join 120+ B2B teams already growing with GO MO Group"}</span>
            <br />
            {content?.trustedSubtitle || "Trusted by industrial, SaaS & enterprise brands worldwide"}
          </p>
          <div className="marquee-container relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_60px,black_calc(100%-60px),transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14 opacity-90">
              {[...logos, ...logos].map((logo, i) => (
                <Image
                  key={`${logo.name}-${i}`}
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-10 w-auto shrink-0 object-contain sm:h-12"
                />
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeUp key={stat.value} delay={i * 0.08} className={i > 0 ? "lg:border-l lg:border-white/15 lg:pl-8" : ""}>
              <p className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold italic" style={{ color: stat.color }}>{stat.value}</p>
              <p className="mt-3 max-w-[16rem] text-base text-white/85">{stat.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
