"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MainButton } from "@/components/home/main/MainButton";
import { SITE_ROUTES } from "@/lib/site-links";
import { MC_EASE } from "@/components/home/main/tokens";

export function Hero({ content }) {
  const eyebrow = content?.heroEyebrow || "AI-Powered Growth";
  const headlineLine1 = content?.heroHeadlineLine1 || "AI-Infused";
  const headlineLine2 = content?.heroHeadlineLine2 || "B2B Digital Marketing";
  const subtitle =
    content?.heroSubtitle ||
    "We combine strategy, creativity, and generative AI to help B2B companies grow faster and build a lasting competitive advantage.";
  const ctaLabel = content?.heroCtaLabel || "Accelerate your growth with us";
  const videoSrc = content?.heroVideoSrc || "/home_video.mp4";
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Attach the error listener before setting `src` (client-side only) so a fast
  // decode failure — which can happen before hydration if `src` is set in the
  // server-rendered markup — is never missed, and the fallback image shows instead
  // of an opaque black video box.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    function handleError() {
      setVideoFailed(true);
    }
    video.addEventListener("error", handleError);
    video.src = videoSrc;
    video.load();
    return () => video.removeEventListener("error", handleError);
  }, [videoSrc]);

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home-main/hero-bg.png"
        alt=""
        className="absolute inset-0 -z-[5] h-full w-full object-cover"
      />
      {!videoFailed && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-[5] h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-[5] bg-black/20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-[5] h-1/3 bg-gradient-to-t from-[#070C11] to-transparent" aria-hidden />

      <div
        className="pointer-events-none absolute -top-24 left-1/2 -z-[4] h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[10px] sm:h-[900px] sm:w-[900px]"
        style={{ background: "radial-gradient(circle at 35% 35%, rgba(189,39,246,0.55), rgba(189,39,246,0) 65%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[98px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: MC_EASE }}
          className="mb-2 text-[14px] uppercase tracking-[0.08em] text-white"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: MC_EASE }}
          className="max-w-4xl text-[44px] font-medium leading-[1.1] text-white sm:text-[64px] lg:text-[84px] xl:text-[100px] xl:leading-[132px]"
        >
          {headlineLine1}
          <br />
          <span className="font-[family-name:var(--font-merriweather)] font-bold italic text-[#FF28BC]">
            {headlineLine2}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: MC_EASE }}
          className="mt-10 flex justify-end sm:mt-14"
        >
          <div className="max-w-sm text-left">
            <p className="text-base leading-relaxed text-white">{subtitle}</p>
            <div className="mt-6">
              <MainButton href={SITE_ROUTES.contact} variant="gradient">
                {ctaLabel}
              </MainButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-3 sm:mt-24"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <ArrowDown className="h-4 w-4 text-white" strokeWidth={2} />
          </motion.span>
          <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/70">Scroll for more</span>
        </motion.div>
      </div>
    </section>
  );
}
