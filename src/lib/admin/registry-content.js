import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { CMS_REGISTRY, getRegistryEntryById } from "@/lib/cms/page-registry";
import { readCmsJson, cmsFilePath, CMS_CONTENT_ROOT } from "@/lib/cms/read-cms-file";
import { readDraftJson, writeDraftJson, discardDraft, hasDraft } from "@/lib/admin/drafts";
import { isGitHubPublishConfigured, commitJsonFile } from "@/lib/admin/github-publish";

/** Every registry entry plus whether it currently has an unpublished local draft. */
export async function listRegistryWithStatus() {
  return Promise.all(
    CMS_REGISTRY.map(async (entry) => ({
      ...entry,
      hasDraft: await hasDraft(entry.id),
    })),
  );
}

/** Published content, the raw draft (if any), and the effective (draft-or-published) content for an entry. */
export async function getEntryContent(id) {
  const entry = getRegistryEntryById(id);
  if (!entry) return null;
  const published = await readCmsJson(entry.contentFile);
  const draft = await readDraftJson(id);
  return {
    entry,
    published: published ?? {},
    draft,
    effective: draft ?? published ?? {},
  };
}

/** Drafts always store the *full* effective object — publish writes it verbatim, no partial patching. */
export async function saveEntryDraft(id, data) {
  const entry = getRegistryEntryById(id);
  if (!entry) throw new Error(`Unknown content id: ${id}`);
  await writeDraftJson(id, data);
  return true;
}

export async function discardEntryDraft(id) {
  return discardDraft(id);
}

/** Copies one entry's current content onto another entry of the same type, as a draft (not published). */
export async function duplicateEntryContent(fromId, toId) {
  const fromEntry = getRegistryEntryById(fromId);
  const toEntry = getRegistryEntryById(toId);
  if (!fromEntry || !toEntry) throw new Error("Unknown content id.");
  if (fromEntry.type !== toEntry.type) {
    throw new Error("Can only duplicate content between entries of the same type.");
  }
  const source = await getEntryContent(fromId);
  await saveEntryDraft(toId, source.effective);
  return true;
}

export async function publishEntry(id) {
  const entry = getRegistryEntryById(id);
  if (!entry) throw new Error(`Unknown content id: ${id}`);
  const draft = await readDraftJson(id);
  if (draft === null) return false;

  if (isGitHubPublishConfigured()) {
    // Production path: commit straight to the repo so the write survives the read-only
    // deployed filesystem, and the commit itself triggers the redeploy that serves it.
    const repoPath = `${CMS_CONTENT_ROOT}/${entry.contentFile}`;
    await commitJsonFile(repoPath, draft, `Publish: update ${entry.contentFile}`);
  } else {
    // Local dev fallback: no GITHUB_TOKEN configured, write straight to disk.
    const filePath = cmsFilePath(entry.contentFile);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(draft, null, 2), "utf8");
  }

  await discardDraft(id);
  return true;
}
