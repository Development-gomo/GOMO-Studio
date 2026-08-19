"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
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
  const sectionRef = useRef(null);

  function scrollToNextSection() {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    window.scrollTo({ top: rect.bottom + window.scrollY, behavior: "smooth" });
  }

  return (
    <section ref={sectionRef} className="relative flex min-h-[100dvh] items-center overflow-hidden bg-black">
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
        <p className="text-xs font-medium uppercase tracking-[1.12px] text-white/85 sm:text-sm">
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
          <div className="max-w-[350px] text-left">
            <p className="text-base leading-relaxed text-white/90">
              {content?.heroSubtitle ||
                "We combine strategy, creativity, and generative AI to help B2B companies grow faster and build a lasting competitive advantage."}
            </p>

            <div className="mt-6 flex justify-start">
              <GradientPillButton href={content?.heroPrimaryCtaHref || "#book-a-meeting"} className="w-full text-center sm:w-auto">
                {content?.heroPrimaryCtaLabel || "Accelerate your growth with us"}
              </GradientPillButton>
            </div>
          </div>
          <div className="w-68 h-25" />
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToNextSection}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-3 sm:bottom-10"
      >
        <motion.svg
          width="17"
          height="30"
          viewBox="0 0 17 30"
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M8.46154 0C8.85603 0 9.18116 0.296954 9.22559 0.679522L9.23077 0.769231V17.3723L15.6099 10.9945C15.8872 10.7172 16.3235 10.6959 16.6253 10.9305L16.6978 10.9945C16.9751 11.2718 16.9964 11.7082 16.7618 12.0099L16.6978 12.0824L9.00547 19.7747C8.97824 19.8019 8.94948 19.8267 8.91947 19.849L8.83389 19.9041L8.74718 19.9452L8.66615 19.9724L8.5519 19.9947L8.46154 20L8.40366 19.9979L8.30713 19.9844L8.22143 19.9617L8.13598 19.9279L8.06099 19.8877L7.99008 19.8387L7.91761 19.7747L0.225302 12.0824C-0.0751008 11.782 -0.0751008 11.2949 0.225302 10.9945C0.502598 10.7172 0.938929 10.6959 1.24069 10.9305L1.31316 10.9945L7.69231 17.3723V0.769231C7.69231 0.344396 8.0367 0 8.46154 0Z"
            fill="#F2EBE2"
          />
        </motion.svg>
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-white/70">
          {content?.heroScrollLabel || "Scroll for more"}
        </span>
      </motion.button>
    </section>
  );
}
