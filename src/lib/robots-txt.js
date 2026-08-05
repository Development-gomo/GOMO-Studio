import { buildDefaultRobotsTxt, stagingRobotsTxt } from "@/lib/cms/robots-default";
import { resolveCmsContent } from "@/lib/cms/resolve-content";
import { allowSearchIndexing } from "@/lib/seo-config";

export { buildDefaultRobotsTxt, stagingRobotsTxt };

export async function getPublishedRobotsBody() {
  const cms = await resolveCmsContent("robots", "site/robots.json");
  const body = cms?.body?.trim();
  return body || null;
}

export async function buildRobotsTxt() {
  if (!allowSearchIndexing()) {
    return stagingRobotsTxt();
  }

  const custom = await getPublishedRobotsBody();
  if (custom) return custom;

  return buildDefaultRobotsTxt();
}
