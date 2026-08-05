import { buildRouteMetadata } from "@/lib/cms/page-metadata";

const SECTIONS = [
  { id: "what-is-gomo-studio", label: "What is GOMO Studio" },
  { id: "main-features", label: "Main features" },
  { id: "workflow", label: "How the workflow works" },
  { id: "retained", label: "Retained from the original app" },
  { id: "bugs-fixed", label: "Bugs fixed" },
  { id: "improvements", label: "Improvements & new features" },
  { id: "folder-structure", label: "Folder structure" },
  { id: "setup", label: "Setup & environment variables" },
  { id: "running", label: "Running & building" },
  { id: "limitations", label: "Known limitations & future work" },
];

export async function generateMetadata() {
  return buildRouteMetadata("/documentation", {
    title: "Documentation",
    description:
      "How GOMO Studio works: features, the draft-preview-publish workflow, folder structure, setup, and known limitations.",
  });
}

function Code({ children }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-xl border border-gray-900/10 bg-gray-950 p-4 text-sm text-lime-300 dark:border-white/10">
      <code>{children}</code>
    </pre>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-gray-900/10 py-10 dark:border-white/10 last:border-0">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-gray-600 dark:text-white/70">{children}</div>
    </section>
  );
}

export default function DocumentationPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          Documentation
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          How GOMO Studio works
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/60">
          A complete reference for the product, the admin editor, the workflow it's built around, and how to
          run the project locally.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-1 text-sm">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block rounded-lg px-3 py-1.5 text-gray-500 transition-colors hover:bg-gray-900/5 hover:text-gray-900 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div>
          <Section id="what-is-gomo-studio" title="What GOMO Studio does">
            <p>
              GOMO Studio is an AI-powered website backend editor and quick CMS. It sits behind an existing
              Next.js website and gives whoever owns the content — not necessarily a developer — a dashboard
              to manage every page and blog post, a structured visual editor for each section, an AI panel
              that can generate or rewrite copy on request, and a draft-preview-publish workflow that ships
              changes without a code deploy.
            </p>
            <p>
              The public site you're reading this on is the sample website GOMO Studio manages: its home
              page, capability pages, blog, and legal pages are all editable from{" "}
              <code className="rounded bg-gray-900/5 px-1.5 py-0.5 text-sm dark:bg-white/10">/admin</code>.
            </p>
          </Section>

          <Section id="main-features" title="Main features">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-gray-900 dark:text-white">AI Content Generation</strong> — an AI
                panel on every editable section that reads the current content first, then generates or
                rewrites copy, SEO fields, or full blog posts from a plain-English instruction.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Visual Editor</strong> — structured forms
                for every field (text, lists, booleans, nested objects) instead of raw JSON or markdown, plus
                a dedicated SEO fields form (title, description, keywords, Open Graph, canonical URL).
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Live preview</strong> — built on Next.js
                Draft Mode: "Preview" opens the real page template with your unpublished draft applied, so
                what you see is exactly what publishing will produce.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Publishing workflow</strong> — a dashboard
                of every page and post with a Draft / Published status badge, search and filtering, and a
                one-click Publish that writes straight to the site's content files.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Password-gated admin</strong> — a single
                shared admin password behind a signed session cookie, matching a quick CMS built for solo
                builders and small teams rather than large multi-role organizations.
              </li>
            </ul>
          </Section>

          <Section id="workflow" title="How the user workflow works">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Sign in at <code className="rounded bg-gray-900/5 px-1.5 py-0.5 text-sm dark:bg-white/10">/admin/login</code> with
                the shared admin password.
              </li>
              <li>The dashboard lists every page, blog post, and site-wide element with its current status.</li>
              <li>Open an item to edit its fields in the structured form, or ask the AI panel to draft a change.</li>
              <li>Edits autosave as a local draft the moment you save — nothing is public yet.</li>
              <li>Click <strong>Preview</strong> to see the exact live page with your draft applied.</li>
              <li>Click <strong>Publish</strong> to write the draft into the site's content files. It's live immediately — no rebuild.</li>
              <li>Changed your mind before publishing? <strong>Discard</strong> reverts instantly to the last published version.</li>
            </ol>
          </Section>

          <Section id="retained" title="Features retained from the original application">
            <p>
              This app began as a marketing website with a content-overlay system already wired in: every
              page reads a default set of copy from its React component, then optionally merges in a JSON
              override from <code className="rounded bg-gray-900/5 px-1.5 py-0.5 text-sm dark:bg-white/10">content/cms/</code>.
              That pipeline — the page registry, the deep-merge logic, and the per-route SEO metadata builder
              — is unchanged and is exactly what the new admin editor now writes to.
            </p>
            <p>Also retained: the blog rendering pipeline (markdown, table of contents, FAQ accordion extraction), the sitemap and robots.txt generation, the legal document pages, the newsletter/contact/careers email routes, and the light/dark theme system.</p>
          </Section>

          <Section id="bugs-fixed" title="Bugs fixed">
            <ul className="list-disc space-y-2 pl-5">
              <li>The project mixed TypeScript and a partially-removed admin feature that left dangling environment variables (<code className="rounded bg-gray-900/5 px-1.5 py-0.5 text-sm dark:bg-white/10">ADMIN_PASSWORD</code>, Redis draft settings) with no working UI — the admin surface is now fully implemented and matches its configuration.</li>
              <li>Removed a legacy, unlinked product page (Applicant Tracking System) that had no matching product definition and would have 404'd if navigated to directly; it now redirects to Features.</li>
              <li>Fixed several hardcoded brand references (page titles, structured data, email templates) that were inconsistent between "Conalytic" the marketing product and the actual admin tool.</li>
            </ul>
          </Section>

          <Section id="improvements" title="Improvements and new features added">
            <ul className="list-disc space-y-2 pl-5">
              <li>Rebuilt the admin editor from scratch as a local-file system: drafts are plain JSON files, publish writes directly to the content files — no Redis, no external database, no GitHub staging branch to configure.</li>
              <li>Preview now uses Next.js's native Draft Mode instead of a separate preview renderer, so preview and production always render through the exact same code path.</li>
              <li>Added a generic, recursive content form that adapts to any JSON shape, so every page and blog post is editable without hand-building a form per page.</li>
              <li>Added the AI content panel, scoped to the section being edited, with a plain HMAC-signed session (no third-party auth dependency) gating the whole <code className="rounded bg-gray-900/5 px-1.5 py-0.5 text-sm dark:bg-white/10">/admin</code> area.</li>
              <li>Converted the entire codebase from TypeScript to plain JavaScript and rebranded every page, template, and structured-data field.</li>
              <li>Full responsive pass across dashboard, editor, and marketing pages for mobile and tablet breakpoints.</li>
            </ul>
          </Section>

          <Section id="folder-structure" title="Folder structure">
            <Code>{`src/
  app/
    (marketing)/        Public site routes (home, platform, blog, legal, docs)
    admin/              /admin dashboard, editor, login (gated by middleware)
    api/
      admin/            Auth, content, publish, preview, AI routes
      contact|newsletter|careers-application/
  components/
    admin/              Dashboard, editor, AI panel, form components
    layout/ ui/ sections/ seo/ visual/ blog/ home/ pages/ capabilities/
  content/              Static blog post registry + markdown bodies
  lib/
    admin/              Session auth, local drafts, registry read/write helpers
    cms/                Page registry, deep-merge, SEO metadata pipeline
    *.js                Brand, pricing, capabilities, site links, structured data
content/cms/            Published JSON overlays (what the CMS pipeline reads)
.cms-drafts/            Local unpublished drafts (git-ignored)
`}</Code>
          </Section>

          <Section id="setup" title="Setup and environment variables">
            <p>Copy the variables below into <code className="rounded bg-gray-900/5 px-1.5 py-0.5 text-sm dark:bg-white/10">.env.local</code>:</p>
            <Code>{`NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin (/admin) — required for the admin area to be reachable at all
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=          # must be 32+ characters

# AI content generation (optional locally — the AI panel is disabled without it)
ANTHROPIC_API_KEY=

# Email — contact form, careers applications, newsletter signups (optional locally)
RESEND_API_KEY=
RESEND_FROM=
CONTACT_NOTIFY_TO=
CAREERS_APPLICATION_TO=`}</Code>
          </Section>

          <Section id="running" title="How to run and build the project">
            <Code>{`npm install
npm run dev     # start the dev server at http://localhost:3000
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint`}</Code>
          </Section>

          <Section id="limitations" title="Known limitations and recommended future enhancements">
            <ul className="list-disc space-y-2 pl-5">
              <li>Single shared admin password — no per-user accounts, roles, or permissions.</li>
              <li>Drafts are local JSON files. On serverless hosts without a persistent filesystem, drafts won't survive a cold start — a future iteration could add an optional durable store (e.g. Redis or a database) behind the same interface.</li>
              <li>No image upload — media still needs to be added to <code className="rounded bg-gray-900/5 px-1.5 py-0.5 text-sm dark:bg-white/10">public/</code> directly.</li>
              <li>Pages are a fixed, pre-registered set — the editor can't create or delete pages, only edit existing ones.</li>
              <li>No multi-step approval workflow — draft and published are the only two states, by design, for a quick CMS.</li>
              <li>Recommended next steps: image uploads via the Files API, per-user roles for teams larger than one, scheduled publishing, and a durable draft store option for serverless deploys.</li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
