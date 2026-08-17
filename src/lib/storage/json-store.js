/**
 * JSON read/write/delete for CMS content, keyed by a relative path (e.g. "content/cms/pages/home.json"
 * or ".cms-drafts/home.json").
 *
 * Local dev: reads/writes the repo filesystem directly, same as before.
 * Vercel (or anywhere Blob credentials are set): the project's serverless functions run on a
 * read-only filesystem, so this backs onto Vercel Blob instead — same key, addRandomSuffix disabled
 * and allowOverwrite enabled so "the file at this path" stays a stable, overwritable identity.
 *
 * Blob auth comes either from a classic BLOB_READ_WRITE_TOKEN, or (current default when you connect
 * a store from the dashboard) BLOB_STORE_ID + the platform's auto-injected OIDC token — the
 * @vercel/blob SDK resolves that itself, we just need to know which mode to use.
 */
import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

const USE_BLOB = Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

function localPath(key) {
  return path.join(process.cwd(), key);
}

export async function readJsonEntry(key) {
  if (USE_BLOB) {
    const { head } = await import("@vercel/blob");
    try {
      const blob = await head(key);
      const res = await fetch(blob.url, { cache: "no-store" });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
  try {
    const raw = await readFile(localPath(key), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writeJsonEntry(key, data) {
  const body = JSON.stringify(data, null, 2);
  if (USE_BLOB) {
    const { put } = await import("@vercel/blob");
    await put(key, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }
  await mkdir(path.dirname(localPath(key)), { recursive: true });
  await writeFile(localPath(key), body, "utf8");
}

export async function deleteJsonEntry(key) {
  if (USE_BLOB) {
    const { del } = await import("@vercel/blob");
    await del(key);
    return;
  }
  try {
    await unlink(localPath(key));
  } catch {
    // already gone
  }
}
