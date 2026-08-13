import { readFile } from "fs/promises";
import path from "path";

const CMS_ROOT = path.join(process.cwd(), "content", "cms");

/** Repo-relative root for CMS content files (used to build GitHub Contents API paths). */
export const CMS_CONTENT_ROOT = "content/cms";

export function cmsFilePath(relativePath) {
  return path.join(CMS_ROOT, relativePath);
}

export async function readCmsJson(relativePath) {
  try {
    const raw = await readFile(cmsFilePath(relativePath), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
