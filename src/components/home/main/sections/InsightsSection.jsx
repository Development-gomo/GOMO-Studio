"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { MainButton } from "@/components/home/main/MainButton";
import { SITE_ROUTES } from "@/lib/site-links";
import { mcFadeUp, mcStagger, mcViewport, MC_EASE } from "@/components/home/main/tokens";

const DEFAULT_INSIGHTS = [
  {
    tag: "Generative AI, SEO",
    date: "October 8, 2024",
    readTime: "5 MIN READ",
    title: "AI in marketing: the end of website traffic as we know it",
    image: "/images/home-main/insight-1.png",
  },
  {
    tag: "Generative AI",
    date: "May 7, 2025",
    readTime: "5 MIN READ",
    title: "An AI-Case Study from a Global Leader in Heavy Industry and Manufacturing",
    image: "/images/home-main/insight-2.png",
  },
  {
    tag: "Generative AI",
    date: "February 26, 2026",
    readTime: "5 MIN READ",
    title: "Welcome to the Agentic Era: Where your next customer might be an AI",
    image: "/images/home-main/insight-3.png",
  },
];

export function InsightsSection({ content }) {
  const eyebrow = content?.insightsEyebrow || "Latest insights";
  const headingPlain = content?.insightsHeadingPlain || "Insights that drive";
  const headingEm = content?.insightsHeadingEm || "smarter growth.";
  const paragraph =
    content?.insightsParagraph ||
    "Industry-specific insights make a difference. We bring experience from over successful 100 client projects to each new case to develop and implement optimal digital marketing strategies for all of our clients.";
  const ctaLabel = content?.insightsCtaLabel || "View all insights";
  const insights = content?.insightsList?.length ? content.insightsList : DEFAULT_INSIGHTS;

  return (
    <section id="insights" className="relative scroll-mt-24 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcStagger}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <div className="max-w-2xl">
          <motion.div variants={mcFadeUp}>
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h2 variants={mcFadeUp} className="text-[32px] font-medium leading-[1.15] text-white sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
            {headingPlain}{" "}
            <span className="font-[family-name:var(--font-merriweather)] italic text-[#00DEFF]">{headingEm}</span>
          </motion.h2>
          <motion.p variants={mcFadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-white">
            {paragraph}
          </motion.p>
          <motion.div variants={mcFadeUp} className="mt-8">
            <MainButton href={SITE_ROUTES.blogs}>{ctaLabel}</MainButton>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {insights.map((item) => (
            <motion.article
              key={item.title}
              variants={mcFadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: MC_EASE }}
              className="relative flex h-[480px] cursor-pointer flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black" />
              <div className="relative flex flex-col gap-6 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-wide text-[#EEFF41]">{item.tag}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm text-white">
                    <span>{item.date}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="text-2xl leading-snug text-white">{item.title}</h3>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
