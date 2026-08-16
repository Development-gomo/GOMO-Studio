/**
 * Draft storage for the GOMO Studio editor — one JSON entry per registry entry id, keyed
 * under `.cms-drafts/`. Deliberately simple: no per-user scoping. "Publish" writes the draft
 * straight into `content/cms/<contentFile>`; this module only owns the draft side.
 *
 * Backed by the local filesystem in dev, and by Vercel Blob in production (see
 * src/lib/storage/json-store.js) — Vercel's serverless functions can't write to disk.
 */
import { readJsonEntry, writeJsonEntry, deleteJsonEntry } from "@/lib/storage/json-store";

function draftKey(id) {
  return `.cms-drafts/${id}.json`;
}

export async function readDraftJson(id) {
  return readJsonEntry(draftKey(id));
}

export async function writeDraftJson(id, data) {
  await writeJsonEntry(draftKey(id), data);
}

export async function discardDraft(id) {
  await deleteJsonEntry(draftKey(id));
  return true;
}

export async function hasDraft(id) {
  return (await readDraftJson(id)) !== null;
}
