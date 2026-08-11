"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { MainButton } from "@/components/home/main/MainButton";
import { SITE_ROUTES } from "@/lib/site-links";
import { mcFadeUp, mcStagger, mcViewport } from "@/components/home/main/tokens";

const DEFAULT_GALLERY = [
  "/images/home-main/gallery-1.png",
  "/images/home-main/gallery-3.png",
  "/images/home-main/gallery-5.png",
  "/images/home-main/gallery-4.png",
  "/images/home-main/gallery-2.png",
];

export function BeyondSection({ content }) {
  const eyebrow = content?.beyondEyebrow || "Beyond Boundaries";
  const headingPlain1 = content?.beyondHeadingPlain1 || "Taking a Transformative";
  const headingEm1 = content?.beyondHeadingEm1 || "Leap Forward";
  const headingPlain2 = content?.beyondHeadingPlain2 || "Through the";
  const headingEm2 = content?.beyondHeadingEm2 || "Power of Generative AI";
  const paragraph =
    content?.beyondParagraph ||
    "Explore the vast potential of generative AI in reshaping industries and breaking new ground. This insightful feature delves into how cutting-edge artificial intelligence is not only transforming business operations but also redefining the boundaries of innovation and strategic growth.";
  const ctaLabel = content?.beyondCtaLabel || "Read more";
  const gallery = content?.beyondGallery?.length ? content.beyondGallery : DEFAULT_GALLERY;

  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24">
      <div
        className="pointer-events-none absolute -right-40 -top-20 -z-[1] h-[600px] w-[700px]"
        style={{ background: "radial-gradient(60% 60% at 70% 30%, rgba(3,12,244,0.55), rgba(3,12,244,0) 70%)" }}
        aria-hidden
      />
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[608fr_441fr]">
          <motion.h2 variants={mcFadeUp} className="text-[32px] font-medium leading-[1.2] text-white sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
            {headingPlain1}{" "}
            <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm1}</span>{" "}
            {headingPlain2}{" "}
            <span className="font-[family-name:var(--font-merriweather)] italic text-[#5CFFD3]">{headingEm2}</span>
          </motion.h2>

          <motion.div variants={mcFadeUp} className="lg:pt-1">
            <p className="max-w-md text-base leading-relaxed text-white">{paragraph}</p>
            <div className="mt-8">
              <MainButton href={SITE_ROUTES.blogs}>{ctaLabel}</MainButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={mcFadeUp}
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_80px,#000_calc(100%-80px),transparent)]"
      >
        <div className="flex w-max animate-marquee items-start gap-6">
          {[...gallery, ...gallery].map((src, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              className="h-64 w-auto shrink-0 rounded-lg object-cover shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] sm:h-80"
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
