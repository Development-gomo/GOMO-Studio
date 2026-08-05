/**
 * Small pill label (e.g. "Coming soon" on nav items).
 * variant: "default" | "outline" | "success"
 */
import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-brand-600/15 text-brand-500 dark:text-brand-300 border border-brand-600/25",
        variant === "outline" && "border border-black/20 dark:border-white/20 text-navy-900/70 dark:text-white/70",
        variant === "success" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
        className
      )}
    >
      {children}
    </span>
  );
}
