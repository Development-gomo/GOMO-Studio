"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { isExternalNavigationHref, cn } from "@/lib/utils";
import { MC } from "@/components/home/main/tokens";

const VARIANT_CLASS = {
  solid: "text-white",
  gradient: "text-white",
  outline: "border border-[#030CF4] bg-white text-[#030CF4]",
};

/** Figma "Main Button" component — pill, italic Merriweather label. */
export function MainButton({ href, variant = "solid", children, className, ...rest }) {
  const external = isExternalNavigationHref(href);
  const Comp = external ? "a" : Link;

  return (
    <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 24 }} className="inline-block">
      <Comp
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-12 py-3.5 font-[family-name:var(--font-merriweather)] text-base italic transition-shadow duration-300",
          VARIANT_CLASS[variant],
          variant !== "outline" && "hover:shadow-[0_0_28px_rgba(142,56,248,0.5)]",
          className,
        )}
        style={variant === "gradient" ? { background: MC.buttonGradient } : variant === "solid" ? { background: MC.blue } : undefined}
        {...rest}
      >
        {children}
      </Comp>
    </motion.span>
  );
}
