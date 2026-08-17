/**
 * One-time migration: uploads the repo's content/cms/**\/*.json files to Vercel Blob,
 * under the same keys json-store.js reads at runtime (e.g. "content/cms/pages/home.json").
 *
 * Needed because switching the CMS over to Blob storage means production reads go through
 * Blob only — it doesn't know about content that was only ever written to the repo
 * filesystem in local dev.
 *
 * Auth: either a classic BLOB_READ_WRITE_TOKEN, or BLOB_STORE_ID + VERCEL_OIDC_TOKEN (the
 * default for stores connected from the dashboard now) — @vercel/blob resolves either
 * automatically. Pull both from Vercel first, then run:
 *   vercel env pull .env.local
 *   node --env-file=.env.local scripts/seed-blob-content.mjs
 */
import { put } from "@vercel/blob";
import { readFile, readdir } from "fs/promises";
import path from "path";

if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
  console.error("No Blob credentials found. Run `vercel env pull .env.local` first.");
  process.exit(1);
}

async function collectJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectJsonFiles(full);
      return entry.name.endsWith(".json") ? [full] : [];
    }),
  );
  return files.flat();
}

const files = await collectJsonFiles("content/cms");

if (files.length === 0) {
  console.error("No files matched content/cms/**/*.json — run this from the repo root.");
  process.exit(1);
}

for (const file of files) {
  const key = file.split(path.sep).join("/");
  const body = await readFile(file, "utf8");
  await put(key, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  console.log(`uploaded ${key}`);
}

console.log(`\nDone — seeded ${files.length} files to Blob.`);
