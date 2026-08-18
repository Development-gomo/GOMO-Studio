import path from "path";
import { readJsonEntry, writeJsonEntry } from "@/lib/storage/json-store";

const CMS_ROOT = path.posix.join("content", "cms");

/** Repo-relative root for CMS content files (used to build GitHub Contents API paths). */
export const CMS_CONTENT_ROOT = "content/cms";

export function cmsFilePath(relativePath) {
  return path.posix.join(CMS_ROOT, relativePath);
}

export async function readCmsJson(relativePath) {
  return readJsonEntry(cmsFilePath(relativePath));
}

export async function writeCmsJson(relativePath, data) {
  await writeJsonEntry(cmsFilePath(relativePath), data);
}
