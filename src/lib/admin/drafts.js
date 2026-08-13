/**
 * Local-file draft storage for the GOMO Studio editor — one JSON file per registry entry id.
 * Deliberately simple: no per-user scoping, no Redis. "Publish" commits the draft to the repo
 * (see lib/admin/github-publish.js); this module only owns the draft (pre-publish) side.
 *
 * On Vercel, the deployed bundle (`process.cwd()`) is read-only — only `os.tmpdir()` is
 * writable, and it's ephemeral per serverless instance. That's fine for drafts (working state
 * an editor can re-type if a cold start drops it) but NOT fine for published content, which is
 * why publishing goes through GitHub instead of writing straight to disk in production.
 */
import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import os from "os";
import path from "path";

const DRAFTS_ROOT = process.env.VERCEL
  ? path.join(os.tmpdir(), "gomo-cms-drafts")
  : path.join(process.cwd(), ".cms-drafts");

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
