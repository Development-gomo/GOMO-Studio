import { getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";

export async function buildRouteMetadata(path, defaults) {
  const overlay = await getPublishedPageOverlay(path);
  return buildPageMetadataFromCms(path, defaults, overlay?.seo);
}
