"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { mcFadeUp, mcStagger, mcViewport } from "@/components/home/main/tokens";

const DEFAULT_SERVICES = [
  {
    title: "Generative Engine Optimization (GEO)",
    desc: "Search now extends beyond Google to platforms like ChatGPT, Copilot and Claude. GEO helps your brand stay visible across this new search landscape.",
    gradient: "linear-gradient(160deg, rgb(20,10,30) 0%, rgb(80,20,90) 55%, rgb(189,39,246) 100%)",
    image: "/images/home-main/service-1.png",
    defaultHover: true,
  },
  {
    title: "Pull Marketing",
    gradient: "linear-gradient(160deg, rgb(10,25,25) 0%, rgb(20,80,90) 45%, rgb(120,40,180) 100%)",
    image: "/images/home-main/service-2.png",
  },
  {
    title: "SEA (Search Engine Advertising)",
    gradient: "linear-gradient(160deg, rgb(15,10,30) 0%, rgb(150,30,150) 45%, rgb(60,20,120) 100%)",
    image: "/images/home-main/service-3.png",
  },
  {
    title: "Digital analysis and\nstrategy proposals",
    gradient: "linear-gradient(160deg, rgb(10,10,35) 0%, rgb(30,30,150) 55%, rgb(90,30,170) 100%)",
    image: "/images/home-main/service-4.png",
  },
  {
    title: "Web design",
    gradient: "linear-gradient(160deg, rgb(15,10,35) 0%, rgb(70,20,140) 55%, rgb(130,30,190) 100%)",
    image: "/images/home-main/service-5.png",
  },
  {
    title: "Web development",
    gradient: "linear-gradient(160deg, rgb(10,10,35) 0%, rgb(40,20,150) 55%, rgb(150,30,170) 100%)",
    image: "/images/home-main/service-6.png",
  },
  {
    title: "B2B Lead Generation",
    gradient: "linear-gradient(160deg, rgb(20,10,30) 0%, rgb(120,20,110) 55%, rgb(190,30,140) 100%)",
    image: "/images/home-main/service-7.png",
  },
];

function SvcCard({ service, learnMoreLabel }) {
  const [hover, setHover] = useState(!!service.defaultHover);
  const showDesc = hover && service.desc;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(!!service.defaultHover)}
      className="relative flex h-[380px] w-[340px] shrink-0 flex-col gap-4 overflow-hidden rounded-2xl p-8 shadow-[inset_0_0_0_1px_rgba(189,39,246,0.5)] transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_rgba(189,39,246,0.9)] sm:h-[420px] sm:w-[420px]"
      style={{ background: service.gradient }}
    >
      <span className="relative z-[2] whitespace-pre-line font-[family-name:var(--font-merriweather)] text-2xl font-bold italic leading-snug text-white">
        {service.title}
      </span>
      {showDesc && <span className="relative z-[2] max-w-[300px] text-[15px] leading-relaxed text-white/85">{service.desc}</span>}
      <div className="relative z-[2] flex h-9 w-fit items-center justify-center gap-2 rounded-lg bg-[#030CF4] px-4">
        <span className="font-[family-name:var(--font-merriweather)] text-sm italic text-white">{learnMoreLabel}</span>
        <ArrowRight className="h-3.5 w-3.5 text-white" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={service.image}
        alt=""
        className="pointer-events-none absolute bottom-5 right-5 z-[1] h-[130px] w-[170px] rounded-md object-cover transition-opacity duration-300 sm:h-[170px] sm:w-[230px]"
        style={{ opacity: showDesc ? 0.25 : 0.9 }}
        loading="lazy"
      />
    </div>
  );
}

export function ServicesCarousel({ content }) {
  const trackRef = useRef(null);
  const drag = useRef({ dragging: false, startX: 0, startScroll: 0 });
  const eyebrow = content?.servicesEyebrow || "Our services";
  const headingPlain = content?.servicesHeadingPlain || "Pull marketing for";
  const headingEm = content?.servicesHeadingEm || "long-term growth.";
  const paragraph =
    content?.servicesParagraph ||
    "We create valuable digital assets that generate business value over time, with the capacity to scale delivery around your ambition and goals.";
  const services = content?.servicesList?.length ? content.servicesList : DEFAULT_SERVICES;
  const learnMoreLabel = content?.servicesLearnMoreLabel || "Learn more";

  function scrollBy(dir) {
    trackRef.current?.scrollBy({ left: dir * 444, behavior: "smooth" });
  }

  function onPointerDown(e) {
    const el = trackRef.current;
    drag.current = { dragging: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.classList.add("cursor-grabbing");
  }
  function onPointerMove(e) {
    if (!drag.current.dragging) return;
    trackRef.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  }
  function onPointerUp(e) {
    drag.current.dragging = false;
    const el = trackRef.current;
    el.classList.remove("cursor-grabbing");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  }

  return (
    <section id="services" className="relative scroll-mt-24 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcStagger}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div variants={mcFadeUp}>
              <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2 variants={mcFadeUp} className="text-[32px] font-medium leading-[1.15] text-white sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
              {headingPlain}{" "}
              <span className="font-[family-name:var(--font-merriweather)] italic text-[#EEFF41]">{headingEm}</span>
            </motion.h2>
            <motion.p variants={mcFadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-white">
              {paragraph}
            </motion.p>
          </div>

          <motion.div variants={mcFadeUp} className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll services left"
              className="flex h-[46px] w-[68px] items-center justify-center rounded-lg bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll services right"
              className="flex h-[46px] w-[68px] items-center justify-center rounded-lg bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        ref={trackRef}
        variants={mcFadeUp}
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="mt-12 flex cursor-grab snap-x gap-6 overflow-x-auto pl-4 pb-4 [scrollbar-width:none] sm:pl-6 lg:pl-[100px] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service) => (
          <div key={service.title} className="snap-start">
            <SvcCard service={service} learnMoreLabel={learnMoreLabel} />
          </div>
        ))}
        <div className="w-1 shrink-0 sm:w-[calc(100px-1.5rem)]" aria-hidden />
      </motion.div>
    </section>
  );
}
