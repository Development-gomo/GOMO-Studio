import path from "path";
import { readJsonEntry, writeJsonEntry } from "@/lib/storage/json-store";

const CMS_ROOT = path.posix.join("content", "cms");

export function cmsFilePath(relativePath) {
  return path.posix.join(CMS_ROOT, relativePath);
}

export async function readCmsJson(relativePath) {
  return readJsonEntry(cmsFilePath(relativePath));
}

export async function writeCmsJson(relativePath, data) {
  await writeJsonEntry(cmsFilePath(relativePath), data);
}
