/**
 * Inline SVG wordmark — replaces the old /logo*.png raster assets.
 * variant: "mark" (icon-only, rounded-square "G" monogram) | "full" (icon + "GOMO Studio" text)
 */
import { cn } from "@/lib/utils";

export function GomoLogo({ variant = "full", className }) {
  const isFull = variant === "full";

  return (
    <span className={cn("inline-flex items-center gap-2.5", !isFull && "h-8 w-8", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label={isFull ? undefined : "GOMO Studio"}
        aria-hidden={isFull ? "true" : undefined}
        className={isFull ? "h-8 w-8 shrink-0" : "h-full w-full shrink-0"}
      >
        <rect width="32" height="32" rx="9" fill="#c9ff33" />
        <path
          d="M20.4 12.4A5.2 5.2 0 1 0 21.2 16h-4.6"
          stroke="#0f0f0f"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {isFull && (
        <span className="text-lg font-bold leading-none tracking-tight text-gray-900 dark:text-white">
          GOMO<span className="font-medium text-gray-500 dark:text-white/55"> Studio</span>
        </span>
      )}
    </span>
  );
}
