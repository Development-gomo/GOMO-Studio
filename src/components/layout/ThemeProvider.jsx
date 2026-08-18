"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { applyTheme, DEFAULT_THEME, getStoredTheme, resolveTheme, THEME_STORAGE_KEY } from "@/lib/theme";

/** ThemeContextValue: { theme: "light"|"dark", setTheme, toggleTheme, isDark } */
const ThemeContext = createContext(null);

export function ThemeProvider({ children, defaultTheme = DEFAULT_THEME }) {
  const [theme, setThemeState] = useState(defaultTheme);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setThemeState(resolveTheme(getStoredTheme(), defaultTheme));
    setReady(true);
    // Only the mount's initial defaultTheme should seed state; later prop changes shouldn't
    // fight a visitor's own toggle choice.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, ready]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === "dark",
    }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
