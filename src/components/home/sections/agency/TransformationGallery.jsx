"use client";

import Image from "next/image";
import { Eyebrow, FadeUp, GradientPillButton } from "./shared";

const GALLERY = [
  { src: "/design/home/gallery-1.png", width: 360, height: 202.5 },
  { src: "/design/home/gallery-2.png", width: 260, height: 368 },
  { src: "/design/home/gallery-3.png", width: 220, height: 312 },
  { src: "/design/home/gallery-4.png", width: 260, height: 260 },
  { src: "/design/home/gallery-5.png", width: 360, height: 202.5 },
];

export function TransformationGallery({ content }) {
  const gallery = content?.transformationGallery?.length ? content.transformationGallery : GALLERY;
  const looped = [...gallery, ...gallery];

  return (
    <section className="overflow-hidden border-t border-white/10 bg-black py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <FadeUp className="max-w-3xl">
          <Eyebrow className="mb-5">{content?.transformationEyebrow || "Beyond Boundaries"}</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight text-white">
            {content?.transformationHeadingPre || "Taking a Transformative "}
            <br />
            <span className="font-serif italic text-[#5cffd3]">{content?.transformationHeadingAccent1 || "Leap Forward"}</span>
            {content?.transformationHeadingMid || " Through the "}
            <br />
            <span className="font-serif italic text-[#5cffd3]">{content?.transformationHeadingAccent2 || "Power of Generative AI"}</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
            {content?.transformationBody ||
              "Explore the vast potential of generative AI in reshaping industries and breaking new ground. This insightful feature delves into how cutting-edge artificial intelligence is not only transforming business operations but also redefining the boundaries of innovation and strategic growth."}
          </p>
          <GradientPillButton href={content?.transformationCtaHref || "/company/contact"} className="mt-8">
            {content?.transformationCtaLabel || "Read more"}
          </GradientPillButton>
        </FadeUp>
      </div>

      <FadeUp delay={0.15} className="marquee-container relative mt-16 w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-4 px-4 sm:px-6">
          {looped.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative h-80 shrink-0 overflow-hidden rounded-lg border border-white/10"
              style={{ width: `${(img.width / img.height) * 320}px` }}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="400px" />
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
