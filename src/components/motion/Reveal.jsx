"use client";

/** RevealVariant: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right" | "blur-up" */
import { motion, useReducedMotion } from "framer-motion";
import { SAAS_EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: SAAS_EASE } },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: SAAS_EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: SAAS_EASE } },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -36 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: SAAS_EASE } },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 36 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: SAAS_EASE } },
  },
  "blur-up": {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: SAAS_EASE },
    },
  },
};

/** Explicit scroll-triggered reveal — use inside sections for hero copy, cards, etc. */
export function Reveal({
  variant = "fade-up",
  delay = 0,
  className,
  children,
}) {
  const reduceMotion = useReducedMotion();
  const v = variants[variant];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: v.hidden,
        show: {
          ...v.show,
          transition: {
            ...v.show.transition,
            delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Stagger children on scroll — wrap grids and feature lists. */
export function RevealStagger({
  className,
  children,
  stagger = 0.09,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  className,
  children,
  variant = "fade-up",
}) {
  const reduceMotion = useReducedMotion();
  const v = variants[variant];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={v} className={className}>
      {children}
    </motion.div>
  );
}
