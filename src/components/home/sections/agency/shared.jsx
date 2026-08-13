"use client";

/** Shared primitives for the GOMO Group agency-style home page redesign. */
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SAAS_EASE as EASE, viewportOnce } from "@/lib/motion";

export const AGENCY_CTA_GRADIENT =
  "bg-[linear-gradient(90deg,#8f38f8_0%,#268de5_60%,#2804de_100%)]";

/** Eyebrow row: short vertical tick + uppercase tracked label, used above every section heading. */
export function Eyebrow({ children, className }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="h-3.5 w-px bg-white/60" aria-hidden />
      <span className="text-[13px] font-semibold uppercase tracking-[1.6px] text-white/85">
        {children}
      </span>
    </div>
  );
}

/** Solid GOMO-blue pill CTA — the primary action style throughout the design. */
export function SolidPillButton({ href, external, children, className, onClick, type = "button" }) {
  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#030cf4] px-9 py-3.5 font-serif text-[15px] italic text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]",
    className,
  );
  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>
    ) : (
      <Link href={href} className={classes}>{children}</Link>
    );
  }
  return <button type={type} onClick={onClick} className={classes}>{children}</button>;
}

/** Purple → blue gradient pill CTA — secondary/featured action style. */
export function GradientPillButton({ href, external, children, className, onClick, type = "button" }) {
  const classes = cn(
    AGENCY_CTA_GRADIENT,
    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-9 py-3.5 font-serif text-[15px] italic text-white shadow-[0_12px_32px_rgba(143,56,248,0.35)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]",
    className,
  );
  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>
    ) : (
      <Link href={href} className={classes}>{children}</Link>
    );
  }
  return <button type={type} onClick={onClick} className={classes}>{children}</button>;
}

/** White-outline pill CTA used on light/photo card backgrounds. */
export function OutlinePillButton({ href, children, className }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#030cf4] bg-white px-8 py-2.5 font-serif text-sm italic text-[#030cf4] transition-transform duration-200 hover:scale-[1.03]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Large display heading: regular weight base + italic Merriweather accent span. */
export function DisplayHeading({ pre, accent, post, className, accentClassName }) {
  return (
    <h2 className={cn("font-sans text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] text-white", className)}>
      {pre}
      {accent ? (
        <span className={cn("font-serif italic text-[#5cffd3]", accentClassName)}>{accent}</span>
      ) : null}
      {post}
    </h2>
  );
}

export function FadeUp({ children, delay = 0, className, as: As = motion.div }) {
  return (
    <As
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </As>
  );
}
