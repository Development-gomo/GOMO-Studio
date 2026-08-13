"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { SAAS_EASE as EASE } from "@/lib/motion";
import { GradientPillButton } from "./shared";

const HeroCanvas = dynamic(() => import("./HeroCanvas").then((m) => m.HeroCanvas), { ssr: false });

/** Real <video> hero background. Falls back to the animated aurora/particle layer on error. */
function HeroVideo({ src, onStatusChange }) {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      onCanPlay={() => onStatusChange("playing")}
      onError={() => onStatusChange("failed")}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** Animated aurora fallback for when no hero video is available/playable. */
function HeroAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-[10%] -top-[20%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(255,40,188,0.35)_0%,transparent_70%)] blur-3xl animate-[orb-drift-a_22s_ease-in-out_infinite]" />
      <div className="absolute -right-[5%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(38,141,229,0.35)_0%,transparent_70%)] blur-3xl animate-[orb-drift-b_26s_ease-in-out_infinite]" />
      <div className="absolute right-[20%] top-[25%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(142,56,248,0.3)_0%,transparent_70%)] blur-3xl animate-[orb-drift-c_30s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_15%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_75%,#000_100%)]" />
    </div>
  );
}

export function AgencyHero({ content }) {
  const [videoStatus, setVideoStatus] = useState("loading");
  const videoOk = videoStatus === "playing";

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-black">
      {!videoOk ? (
        <>
          <HeroAurora />
          <HeroCanvas />
        </>
      ) : null}
      <HeroVideo src={content?.heroVideoUrl || "/assets/hero-bg-video.mp4"} onStatusChange={setVideoStatus} />
      {videoOk ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.55) 100%)" }}
          aria-hidden
        />
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
        <p className="mb-4 text-xs font-medium uppercase tracking-[1.12px] text-white/85 sm:mb-6 sm:text-sm">
          {content?.heroEyebrow || "AI-Powered Growth"}
        </p>

        <h1 className="text-[clamp(2.25rem,6.2vw,5.5rem)] font-normal leading-[1.32] text-white">
          {content?.heroTitleLine1 || "AI-Infused"}
          <br />
          <span className="font-serif italic font-bold text-[#ff28bc]">
            {content?.heroTitleLine2 || "B2B Digital Marketing"}
          </span>
        </h1>

        <div className="mt-6 flex justify-start sm:justify-end">
          <div className="max-w-xs text-left sm:text-right">
            <p className="text-base leading-relaxed text-white/90">
              {content?.heroSubtitle ||
                "We combine strategy, creativity, and generative AI to help B2B companies grow faster and build a lasting competitive advantage."}
            </p>

            <div className="mt-6 flex justify-start sm:justify-end">
              <GradientPillButton href={content?.heroPrimaryCtaHref || "#book-a-meeting"} className="w-full text-center sm:w-auto">
                {content?.heroPrimaryCtaLabel || "Accelerate your growth with us"}
              </GradientPillButton>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-10"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-white/70">
          {content?.heroScrollLabel || "Scroll for more"}
        </span>
        <motion.svg
          width="17"
          height="30"
          viewBox="0 0 17 30"
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="1" y="1" width="15" height="28" rx="7.5" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="8.5" cy="9" r="2.5" fill="white" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
