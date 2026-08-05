import { resolveCmsContent } from "@/lib/cms/resolve-content";

/** Admin-configured site-wide default theme (draft-mode aware). Falls back to "dark". */
export async function getDefaultThemeSetting() {
  const data = await resolveCmsContent("theme", "site/theme.json");
  return data?.defaultTheme === "light" ? "light" : "dark";
}
