"use client";

import Image from "next/image";
import { Eyebrow, FadeUp, SolidPillButton } from "./shared";

const DEFAULT_CARDS = [
  {
    id: "enterprise",
    titleLine1: "Segment",
    titleLine2: "Enterprise",
    body: "We enhance your global presence with pull marketing and SEO to drive growth. With robust and AI-adapted GEO, we ensure your digital strategy is future-proof.",
    image: "/assets/segment-enterprise.png",
    imagePosition: "90% center",
    href: "/company/about-us",
  },
  {
    id: "sme",
    titleLine1: "Segment SME",
    titleLine2: "",
    body: 'Traditional medium-sized industrial and manufacturing companies are a perfect fit for us. We have a dedicated digital marketing offering that we internally call "B2B SME."',
    image: "/assets/segment-sme.png",
    href: "/company/about-us",
  },
  {
    id: "saas",
    titleLine1: "Segment B2B",
    titleLine2: "SaaS & Tech",
    body: "Improve your online presence and attract potential customers with our vertical SaaS/Tech solution and enhanced searchability. Reach up to 1,000 key prospects annually with a targeted and segmented strategy.",
    image: "/assets/segment-saas.png",
    href: "/company/about-us",
  },
  {
    id: "genai",
    titleLine1: "Generative",
    titleLine2: "AI Offering",
    body: "The digital world is constantly evolving, and generative AI (Gen AI) is crucial for future success. Increase your efficiency by 25% and improve result quality by 40%. Let generative AI take you to the next level.",
    image: "/assets/segment-genai.png",
    href: "/company/about-us",
  },
];

export function IcpCards({ content }) {
  const cards = content?.icpCards?.length ? content.icpCards : DEFAULT_CARDS;

  return (
    <section className="border-t border-white/10 bg-black px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <FadeUp className="mb-8 max-w-2xl">
          <Eyebrow className="mb-5">{content?.icpEyebrow || "What Sets Us Apart"}</Eyebrow>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight text-white">
            {content?.icpHeadingPre || "We build "}
            <span className="font-serif italic text-[#5cffd3]">{content?.icpHeadingAccent1 || "teams targeting"}</span>
            <br />
            {content?.icpHeadingMid || "three "}
            <span className="font-serif italic text-[#5cffd3]">{content?.icpHeadingAccent2 || "Specific ICPs"}</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.05} className="mb-12 max-w-2xl">
          <p className="text-base leading-relaxed text-white/80">
            {content?.icpBody ||
              "You will have your own 360 team with industry experts such as Designer, Website Developer, Copywriter and Strategist, working together to deliver the right solution for your goals irrespective of the scale of your business."}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <FadeUp key={card.id} delay={i * 0.08}>
              <div className="relative z-0 flex h-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-white/80 px-6 py-8 shadow-[0_12px_24px_rgba(0,0,0,0.25)]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="-z-10 object-cover"
                  style={{ objectPosition: card.imagePosition || "center" }}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/55" aria-hidden />
                <div className="relative flex flex-col gap-2 text-white">
                  <h3 className="text-2xl font-semibold leading-tight">
                    {card.titleLine1}
                    {card.titleLine2 ? (<><br />{card.titleLine2}</>) : null}
                  </h3>
                  <p className="text-base leading-relaxed">{card.body}</p>
                </div>
                <SolidPillButton href={card.href} className="relative w-fit">
                  {card.ctaLabel || "Read more"}
                </SolidPillButton>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
