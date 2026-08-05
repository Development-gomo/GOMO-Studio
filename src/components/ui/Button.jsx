"use client";

/**
 * Shared button / Link styling.
 * variant: "primary" | "secondary" | "outline" | "ghost"
 * size: "sm" | "md" | "lg"
 */
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BRAND_PRIMARY_BUTTON_CLASS, BRAND_SECONDARY_BUTTON_CLASS } from "@/lib/brand";

const variantClasses = {
  primary: BRAND_PRIMARY_BUTTON_CLASS,
  secondary: BRAND_SECONDARY_BUTTON_CLASS,
  outline:
    "border border-brand-500/45 text-brand-300 hover:bg-brand-500/12 hover:border-brand-500 hover:text-brand-500 active:scale-[0.98]",
  ghost:
    "text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  onClick,
  type = "button",
  disabled,
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
