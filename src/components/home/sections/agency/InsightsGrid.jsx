"use client";

import Image from "next/image";
import Link from "next/link";
import { Eyebrow, FadeUp, SolidPillButton } from "./shared";
import { SITE_ROUTES } from "@/lib/site-links";

const DEFAULT_INSIGHTS = [
  {
    tag: "Generative AI, SEO",
    date: "October 8, 2024",
    readTime: "5 MIN READ",
    title: "AI in marketing: the end of website traffic as we know it",
    image: "/assets/insight-default.png",
  },
  {
    tag: "Generative AI",
    date: "May 7, 2025",
    readTime: "5 MIN READ",
    title: "An AI-Case Study from a Global Leader in Heavy Industry and Manufacturing",
    image: "/assets/insight-2.png",
  },
  {
    tag: "Generative AI",
    date: "February 26, 2026",
    readTime: "5 MIN READ",
    title: "Welcome to the Agentic Era: Where your next customer might be an AI",
    image: "/assets/insight-3.png",
  },
];

function InsightCard({ post }) {
  return (
    <Link href={post.href || SITE_ROUTES.blogs} className="group relative block aspect-[397/480] overflow-hidden rounded-lg border border-white/10">
      <Image src={post.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      <div className="absolute inset-x-0 bottom-0 flex h-[217px] flex-col gap-6 overflow-hidden border-t border-white/15 bg-white/10 p-6 backdrop-blur-md">
        <span className="text-sm font-semibold uppercase tracking-[1.12px] text-[#eeff41]">{post.tag}</span>
        <div className="flex flex-col gap-2 text-white">
          <div className="flex items-center justify-between text-sm">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <p className="line-clamp-3 text-2xl font-medium leading-snug">{post.title}</p>
        </div>
      </div>
    </Link>
  );
}

export function InsightsGrid({ content }) {
  const posts = content?.insightPosts?.length ? content.insightPosts : DEFAULT_INSIGHTS;

  return (
    <section className="border-t border-white/10 bg-black px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <FadeUp className="mb-12 grid grid-cols-1 items-start gap-4 sm:grid-cols-[200px_1fr]">
          <Eyebrow>{content?.insightsEyebrow || "Latest insights"}</Eyebrow>
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight text-white">
              {content?.insightsHeadingPre || "Insights that drive "}
              <span className="font-serif italic text-[#5cffd3]">{content?.insightsHeadingAccent || "smarter growth."}</span>
            </h2>
            <p className="mt-4 text-base text-white/80">
              {content?.insightsSubtitle ||
                "Industry-specific insights make a difference. We bring experience from over successful 100 client projects to each new case to develop and implement optimal digital marketing strategies for all of our clients."}
            </p>
            <SolidPillButton href={content?.insightsCtaHref || SITE_ROUTES.blogs} className="mt-6">
              {content?.insightsCtaLabel || "View all insights"}
            </SolidPillButton>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeUp key={`${post.title}-${i}`} delay={i * 0.06}>
              <InsightCard post={post} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
