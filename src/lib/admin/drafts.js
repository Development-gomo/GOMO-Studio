/**
 * Local-file draft storage for the GOMO Studio editor — one JSON file per registry entry id
 * under `.cms-drafts/`. Deliberately simple: no per-user scoping, no Redis. "Publish" writes
 * the draft straight into `content/cms/<contentFile>`; this module only owns the draft side.
 */
import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

const DRAFTS_ROOT = path.join(process.cwd(), ".cms-drafts");

function draftFilePath(id) {
  return path.join(DRAFTS_ROOT, `${id}.json`);
}

export async function readDraftJson(id) {
  try {
    const raw = await readFile(draftFilePath(id), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writeDraftJson(id, data) {
  await mkdir(DRAFTS_ROOT, { recursive: true });
  await writeFile(draftFilePath(id), JSON.stringify(data, null, 2), "utf8");
}

export async function discardDraft(id) {
  try {
    await unlink(draftFilePath(id));
    return true;
  } catch {
    return false;
  }
}

export async function hasDraft(id) {
  return (await readDraftJson(id)) !== null;
}
