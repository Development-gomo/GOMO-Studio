import { deepMerge } from "@/lib/cms/deep-merge";
import { DEFAULT_FOOTER_CONFIG, DEFAULT_NAVBAR_CONFIG } from "@/lib/cms/defaults/site-chrome";
import { resolveCmsContent } from "@/lib/cms/resolve-content";

export async function getHeaderConfig(overlay) {
  const fromFile = await resolveCmsContent("chrome-header", "site/header.json");
  const merged = deepMerge(DEFAULT_NAVBAR_CONFIG, fromFile ?? {});
  return overlay ? deepMerge(merged, overlay) : merged;
}

export async function getFooterConfig(overlay) {
  const fromFile = await resolveCmsContent("chrome-footer", "site/footer.json");
  const merged = deepMerge(DEFAULT_FOOTER_CONFIG, fromFile ?? {});
  return overlay ? deepMerge(merged, overlay) : merged;
}
