import { draftMode } from "next/headers";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import { readDraftJson } from "@/lib/admin/drafts";
import { deepMerge } from "@/lib/cms/deep-merge";

/**
 * Published content for `contentFile`, layered with the local Studio draft (keyed by registry
 * `id`) whenever Next.js Draft Mode is enabled — this is how Studio's "Preview" works: it flips
 * on draft mode and opens the real route, no separate preview renderer needed.
 */
export async function resolveCmsContent(id, contentFile) {
  const published = await readCmsJson(contentFile);

  let draftEnabled = false;
  try {
    draftEnabled = (await draftMode()).isEnabled;
  } catch {
    draftEnabled = false;
  }
  if (!draftEnabled) return published;

  const draft = await readDraftJson(id);
  if (!draft) return published;
  return published ? deepMerge(published, draft) : draft;
}
