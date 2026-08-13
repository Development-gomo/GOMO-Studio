/**
 * Publishes CMS content by committing straight to the GitHub repo via the Contents API,
 * instead of writing to the deployed filesystem (which is read-only on Vercel outside
 * `/tmp`, and `/tmp` isn't shared with the live site anyway). A commit to the configured
 * branch triggers a normal Vercel redeploy, so "Publish" ends up meaning "commit + deploy".
 *
 * Only active when GITHUB_TOKEN is set. Local dev without it falls back to direct fs writes
 * (see registry-content.js) so `npm run dev` keeps working without any GitHub setup.
 */
const GITHUB_API = "https://api.github.com";

export function isGitHubPublishConfigured() {
  return Boolean(process.env.GITHUB_TOKEN);
}

function repoConfig() {
  const owner = process.env.GITHUB_OWNER || "Development-gomo";
  const repo = process.env.GITHUB_REPO || "GOMO-Studio";
  const branch = process.env.GITHUB_BRANCH || "main";
  return { owner, repo, branch };
}

async function githubRequest(url, options) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options?.headers,
    },
  });
  if (!res.ok && res.status !== 404) {
    const body = await res.text().catch(() => "");
    throw new Error(`GitHub API ${options?.method || "GET"} ${url} failed: ${res.status} ${body}`);
  }
  return res;
}

/**
 * Commits `relativePath` (relative to the repo root, e.g. "content/cms/pages/home.json")
 * with the given JSON-serializable data. Creates the file if it doesn't exist yet.
 */
export async function commitJsonFile(relativePath, data, message) {
  const { owner, repo, branch } = repoConfig();
  const apiPath = relativePath.split(/[\\/]/).join("/");
  const contentsUrl = `${GITHUB_API}/repos/${owner}/${repo}/contents/${apiPath}?ref=${branch}`;

  const existing = await githubRequest(contentsUrl, { method: "GET" });
  const sha = existing.ok ? (await existing.json()).sha : undefined;

  const body = JSON.stringify(data, null, 2);
  const contentBase64 = Buffer.from(body, "utf8").toString("base64");

  const putRes = await githubRequest(`${GITHUB_API}/repos/${owner}/${repo}/contents/${apiPath}`, {
    method: "PUT",
    body: JSON.stringify({
      message: message || `Publish: update ${apiPath}`,
      content: contentBase64,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  return putRes.json();
}
