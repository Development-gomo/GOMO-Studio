"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";

export function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "touch-target relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200",
        "border-gray-200/90 bg-white/80 text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-900",
        "dark:border-white/12 dark:bg-white/[0.05] dark:text-white/70 dark:hover:border-white/20 dark:hover:bg-white/[0.08] dark:hover:text-white",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
        aria-hidden
      />
    </button>
  );
}
