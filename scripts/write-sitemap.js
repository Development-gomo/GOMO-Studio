import { writeFileSync } from "fs";
import { buildSitemapXml } from "../src/lib/sitemap-xml.js";

writeFileSync("public/sitemap.xml", buildSitemapXml(), "utf8");
console.log("Generated public/sitemap.xml");
