/** Decorative browser chrome around a screenshot / asset. */
import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  src,
  alt,
  url = "gomostudio.app/admin",
  className,
  width = 1200,
  height = 750,
}) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl",
        "bg-gray-100 dark:bg-navy-800",
        className
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-200 dark:bg-navy-700 border-b border-black/8 dark:border-white/8">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 browser-frame-dots">
          <span className="bg-[#FF5F57]" />
          <span className="bg-[#FEBC2E]" />
          <span className="bg-[#28C840]" />
        </div>

        {/* URL bar */}
        <div className="flex-1 mx-4">
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md px-3 py-1.5 max-w-xs mx-auto">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-green-400 flex-shrink-0">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="text-xs text-navy-900/50 dark:text-white/50 truncate">{url}</span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" />
          <div className="w-5 h-5 rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" />
        </div>
      </div>

      {/* Screenshot */}
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover object-top"
          priority
        />
        {/* Subtle gradient overlay at bottom for fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-900/60 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
