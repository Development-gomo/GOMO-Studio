"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow, FadeUp, SolidPillButton } from "./shared";

const DEFAULT_SERVICES = [
  {
    id: "geo",
    name: "Generative Engine Optimization (GEO)",
    description: "Search now extends beyond Google to platforms like ChatGPT, Copilot and Claude. GEO helps your brand stay visible across this new search landscape.",
    gradientImage: "/design/home/services/gradients/grad-geo.svg",
    illustration: "/design/home/services/illus-geo.png",
  },
  {
    id: "pull-marketing",
    name: "Pull Marketing",
    // PLACEHOLDER — the copy sent for this card was a duplicate of the SEO card's; swap once the real text arrives.
    description: "A pull marketing engine built on content, SEO and community that draws qualified buyers to you over time.",
    gradientImage: "/design/home/services/gradients/grad-pull-marketing.svg",
    illustration: "/design/home/services/illus-pull-marketing.png",
  },
  {
    id: "seo",
    name: "SEO (Search Engine Optimization)",
    description: "Maximize your online presence with a comprehensive SEO strategy: drive relevant traffic to your website and build a strong online presence over time.",
    // No dedicated card in the Figma source — reusing Pull Marketing's gradient as a placeholder.
    gradientImage: "/design/home/services/gradients/grad-pull-marketing.svg",
    illustration: "/design/home/services/illus-geo.png",
  },
  {
    id: "sea",
    name: "SEA Advertising",
    description: "Meet your target audience on the search engine as they are looking to buy. Get effective results and increase your company's visibility using SEA.",
    gradientImage: "/design/home/services/gradients/grad-sea.svg",
    illustration: "/design/home/services/illus-sea.png",
  },
  {
    id: "digital-analysis",
    name: "Digital Analysis &\nStrategy Proposal",
    description: "Get a complete picture of your digital presence and optimize your strategy with our digital analysis. Complete insight into your current situation and the competitive landscape.",
    gradientImage: "/design/home/services/gradients/grad-digital-analysis.svg",
    illustration: "/design/home/services/illus-digital-analysis.png",
  },
  {
    id: "web-development",
    name: "Website Development",
    description: "We create functional, user-friendly websites optimized for performance and conversions. With modern technology and custom solutions, we ensure your website meets your business needs and goals.",
    gradientImage: "/design/home/services/gradients/grad-web-development.svg",
    illustration: "/design/home/services/illus-web-development.png",
  },
  {
    id: "web-design",
    name: "Website Design",
    description: "We design visually appealing websites that reflect your brand. Through user-centered design, we create an experience that engages visitors and strengthens your business.",
    gradientImage: "/design/home/services/gradients/grad-web-design.svg",
    illustration: "/design/home/services/illus-web-design.png",
  },
  {
    id: "lead-gen",
    name: "ASBX – B2B Outbound Lead Generation",
    description: "Enhance your B2B marketing with our segmented lead generation. Reach decision-makers with relevant messages and generate business opportunities.",
    gradientImage: "/design/home/services/gradients/grad-lead-gen.svg",
    illustration: "/design/home/services/illus-lead-gen.png",
  },
];

const CARD_WIDTH = 420;
const CARD_GAP = 24;

function ServiceCard({ service }) {
  return (
    <div
      className="group relative flex h-[443px] shrink-0 flex-col gap-4 overflow-hidden rounded-2xl border-2 border-[#8e38f8] bg-black p-8 shadow-[inset_3px_1px_31px_-6px_#bd27f6] transition-[box-shadow,border-color] duration-300 hover:border-[#a78bfa] hover:shadow-[inset_3px_1px_31px_-6px_#bd27f6,0_12px_50px_-10px_rgba(142,56,248,0.7),0_0_35px_-6px_rgba(59,130,246,0.6)]"
      style={{ width: CARD_WIDTH }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG background, not worth Next's image optimizer */}
      <img src={service.gradientImage} alt="" className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover" />
      <div className="pointer-events-none absolute left-3 top-[155px] z-0 h-[257px] w-[396px] overflow-hidden opacity-80 transition-transform duration-300 ease-out group-hover:scale-110">
        <Image src={service.illustration} alt="" fill className="object-cover" sizes="396px" />
      </div>
      <p className="relative z-10 whitespace-pre-line font-serif text-2xl font-bold italic leading-tight text-white">{service.name}</p>
      {service.description ? (
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
          <p className="relative z-10 max-w-[300px] overflow-hidden text-[15px] leading-relaxed text-white/85">
            {service.description}
          </p>
        </div>
      ) : null}
      <SolidPillButton href={service.href || "/company/about-us"} className="relative z-10 w-fit gap-1.5 px-6 py-3 text-sm">
        Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </SolidPillButton>
    </div>
  );
}

export function ServiceMarquee({ content }) {
  const services = content?.services?.length ? content.services : DEFAULT_SERVICES;
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, services.length - 1);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="overflow-hidden border-t border-white/10 bg-black py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <FadeUp className="mb-10 grid grid-cols-1 items-start gap-4 sm:grid-cols-[200px_1fr]">
          <Eyebrow>{content?.servicesEyebrow || "Our services"}</Eyebrow>
          <div>
            <h2 className="max-w-xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight text-white">
              {content?.servicesHeadingPre || "Pull marketing for "}
              <span className="font-serif italic text-[#eeff41]">{content?.servicesHeadingAccent || "long-term growth."}</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/80">
              {content?.servicesSubtitle ||
                "We create valuable digital assets that generate business value over time, with the capacity to scale delivery around your ambition and goals."}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous service"
                disabled={index === 0}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next service"
                disabled={index === maxIndex}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.1} className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            paddingLeft: "max(1rem, calc((100vw - 1240px) / 2))",
            transform: `translateX(-${index * (CARD_WIDTH + CARD_GAP)}px)`,
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </FadeUp>

      <div className="mx-auto mt-8 max-w-[1240px] px-4 sm:px-6">
        <div className="h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-[#030cf4] transition-all duration-500 ease-out"
            style={{ width: `${((index + 1) / services.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
