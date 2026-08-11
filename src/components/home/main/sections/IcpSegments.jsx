"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { MainButton } from "@/components/home/main/MainButton";
import { SITE_ROUTES } from "@/lib/site-links";
import { mcFadeUp, mcStagger, mcViewport, MC_EASE } from "@/components/home/main/tokens";

const DEFAULT_SEGMENTS = [
  {
    title: "Segment\nEnterprise",
    desc: "We enhance your global presence with pull marketing and SEO to drive growth. With robust and AI-adapted GEO, we ensure your digital strategy is future-proof.",
    gradient:
      "radial-gradient(120% 90% at 15% 100%, rgba(255,40,188,0.9) 0%, rgba(189,39,246,0.35) 35%, rgba(10,5,20,0) 65%), #0A0510",
  },
  {
    title: "Segment SME",
    desc: "Traditional medium-sized industrial and manufacturing companies are a perfect fit for us. We have a dedicated digital marketing offering that we internally call “B2B SME.”",
    gradient:
      "radial-gradient(120% 90% at 85% 15%, rgba(143,56,248,0.85) 0%, rgba(38,141,229,0.4) 40%, rgba(5,5,20,0) 70%), #05050F",
  },
  {
    title: "Segment B2B SaaS & Tech",
    desc: "Improve your online presence and attract potential customers with our vertical SaaS/Tech solution and enhanced searchability. Reach up to 1,000 key prospects annually with a targeted and segmented strategy.",
    gradient:
      "radial-gradient(120% 90% at 90% 10%, rgba(238,255,65,0.65) 0%, rgba(0,222,255,0.4) 40%, rgba(5,10,10,0) 70%), #050A0A",
  },
  {
    title: "Generative\nAI Offering",
    desc: "The digital world is constantly evolving, and generative AI (Gen AI) is crucial for future success. Increase your efficiency by 25% and improve result quality by 40%. Let generative AI take you to the next level.",
    gradient:
      "radial-gradient(120% 90% at 85% 15%, rgba(92,255,211,0.7) 0%, rgba(0,222,255,0.4) 40%, rgba(5,10,15,0) 70%), #05090F",
  },
];

export function IcpSegments({ content }) {
  const eyebrow = content?.icpEyebrow || "What Sets Us Apart";
  const headingPlain1 = content?.icpHeadingPlain1 || "We build";
  const headingEm1 = content?.icpHeadingEm1 || "teams targeting";
  const headingPlain2 = content?.icpHeadingPlain2 || "three";
  const headingEm2 = content?.icpHeadingEm2 || "Specific ICPs";
  const paragraph =
    content?.icpParagraph ||
    "You will have your own 360 team with industry experts such as Designer, Website Developer, Copywriter and Strategist, working together to deliver the right solution for your goals irrespective of the scale of your business.";
  const segments = content?.icpSegmentsList?.length ? content.icpSegmentsList : DEFAULT_SEGMENTS;
  const ctaLabel = content?.icpCtaLabel || "Read more";

  return (
    <section id="icp-segments" className="relative scroll-mt-24 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcStagger}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <motion.div variants={mcFadeUp}>
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h2 variants={mcFadeUp} className="max-w-2xl text-[32px] font-medium leading-[1.15] text-white sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
          {headingPlain1} <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm1}</span> {headingPlain2}{" "}
          <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm2}</span>
        </motion.h2>
        <motion.p variants={mcFadeUp} className="mt-6 max-w-[42.5rem] text-base leading-relaxed text-white">
          {paragraph}
        </motion.p>

        <div className="mt-12 flex items-stretch gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {segments.map((seg) => (
            <motion.div
              key={seg.title}
              variants={mcFadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: MC_EASE }}
              className="relative flex h-[420px] w-[292px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 shadow-[0_12px_24px_rgba(0,0,0,0.25)] sm:w-auto"
              style={{ background: seg.gradient }}
            >
              <h3 className="whitespace-pre-line text-2xl font-semibold leading-tight text-white">{seg.title}</h3>
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-white/90">{seg.desc}</p>
                <div>
                  <MainButton href={SITE_ROUTES.contact} className="px-8 py-3 text-sm">
                    {ctaLabel}
                  </MainButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
