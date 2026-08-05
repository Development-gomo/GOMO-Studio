export const THEME_STORAGE_KEY = "gomo-studio-theme";

export const DEFAULT_THEME = "dark";

export function resolveTheme(stored) {
  if (stored === "light" || stored === "dark") return stored;
  return DEFAULT_THEME;
}

export function getStoredTheme() {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

/** Runs in <head> before paint — respects the visitor's saved preference, otherwise the site's configured default. */
export function buildThemeInitScript(defaultTheme = DEFAULT_THEME) {
  const fallbackIsDark = defaultTheme !== "light";
  return `(function(){try{var k="${THEME_STORAGE_KEY}";var t=localStorage.getItem(k);var d=t==="dark"||(t!=="light"&&${fallbackIsDark});document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light";}catch(e){}})();`;
}

/** Static fallback (dark) for contexts that can't resolve the admin setting. */
export const THEME_INIT_SCRIPT = buildThemeInitScript();
