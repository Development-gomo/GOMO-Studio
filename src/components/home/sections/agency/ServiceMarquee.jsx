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
    gradient: "linear-gradient(160deg, rgb(20,10,30) 0%, rgb(80,20,90) 55%, rgb(189,39,246) 100%)",
    illustration: "/design/home/services/illus-geo.png",
  },
  {
    id: "pull-marketing",
    name: "Pull Marketing",
    gradient: "linear-gradient(160deg, rgb(10,25,25) 0%, rgb(20,80,90) 45%, rgb(120,40,180) 100%)",
    illustration: "/design/home/services/illus-pull-marketing.png",
  },
  {
    id: "sea",
    name: "SEA (Search Engine Advertising)",
    gradient: "linear-gradient(160deg, rgb(15,10,30) 0%, rgb(150,30,150) 45%, rgb(60,20,120) 100%)",
    illustration: "/design/home/services/illus-sea.png",
  },
  {
    id: "digital-analysis",
    name: "Digital analysis and\nstrategy proposals",
    gradient: "linear-gradient(160deg, rgb(10,10,35) 0%, rgb(30,30,150) 55%, rgb(90,30,170) 100%)",
    illustration: "/design/home/services/illus-digital-analysis.png",
  },
  {
    id: "web-design",
    name: "Web design",
    gradient: "linear-gradient(160deg, rgb(15,10,35) 0%, rgb(70,20,140) 55%, rgb(130,30,190) 100%)",
    illustration: "/design/home/services/illus-web-design.png",
  },
  {
    id: "web-development",
    name: "Web development",
    gradient: "linear-gradient(160deg, rgb(10,10,35) 0%, rgb(40,20,150) 55%, rgb(150,30,170) 100%)",
    illustration: "/design/home/services/illus-web-development.png",
  },
  {
    id: "lead-gen",
    name: "B2B Lead Generation",
    gradient: "linear-gradient(160deg, rgb(20,10,30) 0%, rgb(120,20,110) 55%, rgb(190,30,140) 100%)",
    illustration: "/design/home/services/illus-lead-gen.png",
  },
];

const CARD_WIDTH = 405;
const CARD_GAP = 24;

function ServiceCard({ service }) {
  return (
    <div
      className="relative flex h-[443px] shrink-0 flex-col gap-4 overflow-hidden rounded-2xl border-2 border-[#8e38f8] p-8 shadow-[inset_3px_1px_31px_-6px_#bd27f6]"
      style={{ width: CARD_WIDTH, background: service.gradient }}
    >
      <div className="pointer-events-none absolute bottom-5 right-5 z-0 h-[170px] w-[230px] opacity-90">
        <Image src={service.illustration} alt="" fill className="object-contain" sizes="230px" />
      </div>
      <p className="relative z-10 whitespace-pre-line font-serif text-2xl font-bold italic leading-tight text-white">{service.name}</p>
      {service.description ? (
        <p className="relative z-10 max-w-[300px] text-[15px] leading-relaxed text-white/85">{service.description}</p>
      ) : null}
      <SolidPillButton href={service.href || "/company/about-us"} className="relative z-10 mt-auto w-fit gap-1.5 px-6 py-3 text-sm">
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
