import { SITE_ORIGIN } from "@/lib/seo-config";

export function stagingRobotsTxt() {
  return "User-agent: *\nDisallow: /\n";
}

export function buildDefaultRobotsTxt() {
  return [
    "User-agent: *",
    "Disallow: /api/",
    "Disallow: /admin",
    "Disallow: /admin/",
    "Disallow: /company/contact/thank-you",
    "Disallow: /*?",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}
