import { getSitemapEntries } from "@/lib/sitemap-entries";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml() {
  const lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
  ];

  for (const item of getSitemapEntries()) {
    const lastmod = item.lastModified.toISOString().slice(0, 10);
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(item.url)}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>", "");
  return lines.join("\n");
}
