/**
 * Rich capability-page section copy.
 * ProductStep: { step, title, description } · ProductStat: { value, label }
 * ProductCapability: { title, description, tag? }
 */
export const CAPABILITY_PAGE_CONTENT = {
  "ai-content": {
    heroImage: "/capabilities/ai-content-hero.png",
    heroImageAlt: "AI Content Generation panel suggesting a rewritten hero headline inside the GOMO Studio editor",
    howItWorks: [
      {
        step: "01",
        title: "Open the AI panel",
        description: "Every section in the editor has an AI panel that already knows the page you're on.",
      },
      {
        step: "02",
        title: "Describe the change",
        description: "\"Make the hero headline punchier\" or \"draft an FAQ about our pricing\" — plain English works.",
      },
      {
        step: "03",
        title: "Review the suggestion",
        description: "The AI reads your current copy first, then proposes a rewrite in the same structure.",
      },
      {
        step: "04",
        title: "Accept into your draft",
        description: "Nothing publishes automatically — the suggestion lands in your draft for you to edit and save.",
      },
    ],
    stats: [
      { value: "1", label: "Prompt to first draft" },
      { value: "<10s", label: "Typical generation time" },
      { value: "0", label: "Prompt engineering required" },
      { value: "100%", label: "Reviewed before publish" },
    ],
    capabilityTitle: "Built for people who write website copy, not prompts",
    capabilitySubtitle: "AI Content Generation stays scoped to the section you're editing — no copy-pasting context by hand.",
    capabilities: [
      { tag: "Context", title: "Section-aware generation", description: "The AI sees the current section's fields, so suggestions match structure and tone automatically." },
      { tag: "Rewrite", title: "Shorten, lengthen, or retone", description: "Ask for a punchier headline, a longer paragraph, or a more formal tone in one request." },
      { tag: "SEO", title: "Metadata generation", description: "Generate SEO titles, descriptions, and keyword lists alongside the page copy." },
      { tag: "Blog", title: "Full post drafting", description: "Draft an entire blog post from a topic prompt, ready to refine in the editor." },
      { tag: "Safety", title: "Draft-first by design", description: "AI output always lands in your draft — publishing is a separate, deliberate step." },
      { tag: "Model", title: "Claude-powered", description: "Generation is powered by Anthropic's Claude models for consistent, on-topic writing." },
    ],
    deepDiveTitle: "From prompt to publish-ready copy",
    deepDiveSubtitle: "Stop staring at a blank hero section. Describe the outcome and let AI Content Generation draft the first version.",
    deepDiveBullets: [
      "Works on any section: hero, FAQ, pricing copy, testimonials, and more",
      "Generates SEO fields alongside body copy so pages stay optimized",
      "Suggestions merge into your draft — you always have the final edit",
      "Included on every plan, no separate AI add-on to configure",
    ],
  },
  "visual-editor": {
    heroImage: "/capabilities/visual-editor-hero.png",
    heroImageAlt: "GOMO Studio visual editor showing a structured form next to a live page preview",
    howItWorks: [
      {
        step: "01",
        title: "Pick what to edit",
        description: "Choose any page, blog post, or site-wide element like the header or footer from the dashboard.",
      },
      {
        step: "02",
        title: "Edit structured fields",
        description: "Headings, lists, links, and images each get the right input — no raw JSON or markdown.",
      },
      {
        step: "03",
        title: "Preview the real page",
        description: "Draft Mode renders your actual page template with the draft content applied, live.",
      },
      {
        step: "04",
        title: "Publish when ready",
        description: "One click writes the change to your site's content files — no redeploy required.",
      },
    ],
    stats: [
      { value: "19", label: "Editable pages & elements" },
      { value: "1-click", label: "Live preview" },
      { value: "0", label: "Markdown files to find" },
      { value: "Instant", label: "Draft autosave" },
    ],
    capabilityTitle: "A real editor, not a code editor",
    capabilitySubtitle: "Every field maps to something you can see rendered on the page — because it's the same page template.",
    capabilities: [
      { tag: "Forms", title: "Structured section forms", description: "Text, lists, and links get purpose-built inputs instead of one giant text box." },
      { tag: "SEO", title: "Dedicated SEO form", description: "Title, description, keywords, Open Graph image, and canonical URL in one place." },
      { tag: "Preview", title: "Next.js Draft Mode preview", description: "Preview renders the exact production page component — what you see is what publishes." },
      { tag: "Chrome", title: "Header, footer & robots.txt", description: "Site-wide elements are editable the same way as any page." },
      { tag: "Safety net", title: "Discard anytime", description: "Discard a draft to instantly fall back to the last published version." },
      { tag: "Speed", title: "No build step", description: "Saving a draft and previewing it both happen without triggering a rebuild." },
    ],
    deepDiveTitle: "Edit like a document, publish like a developer",
    deepDiveSubtitle: "The Visual Editor closes the gap between 'I want to change this' and 'it's live' — without a deploy in between.",
    deepDiveBullets: [
      "Structured forms prevent broken layouts from stray formatting",
      "Preview uses draft mode, so it's never a stale or fake mockup",
      "Every editable page is registered once — nothing to configure per page",
      "Pairs directly with AI Content Generation for first-draft copy",
    ],
  },
  "publishing-workflow": {
    heroImage: "/capabilities/publishing-workflow-hero.png",
    heroImageAlt: "GOMO Studio dashboard showing draft and published status badges across pages and blog posts",
    howItWorks: [
      {
        step: "01",
        title: "See everything at a glance",
        description: "The dashboard lists every page and post with a Draft or Published badge.",
      },
      {
        step: "02",
        title: "Filter to what matters",
        description: "Search by title or filter by content type and status to find what needs attention.",
      },
      {
        step: "03",
        title: "Review the draft",
        description: "Open an item to see exactly what changed before it goes live.",
      },
      {
        step: "04",
        title: "Publish instantly",
        description: "Publishing writes straight to your content files — no CI pipeline, no waiting.",
      },
    ],
    stats: [
      { value: "2", label: "States: draft & published" },
      { value: "Instant", label: "Publish time" },
      { value: "1-click", label: "Discard to revert" },
      { value: "0", label: "Deploys required" },
    ],
    capabilityTitle: "Know exactly what's live",
    capabilitySubtitle: "Publishing Workflow is the source of truth for what's on your site right now versus what's waiting.",
    capabilities: [
      { tag: "Status", title: "Draft / Published badges", description: "Every registered page and post shows its current state on the dashboard." },
      { tag: "Search", title: "Search & filter", description: "Find content fast by title, type, or status as your site grows." },
      { tag: "Publish", title: "One-click publish", description: "Writes directly to content/cms — no build pipeline in the loop." },
      { tag: "Revert", title: "Discard drafts", description: "Change your mind before publishing? Discard reverts to the published version instantly." },
      { tag: "History", title: "Always current", description: "The dashboard reflects the real state of your content files, not a cached snapshot." },
      { tag: "Solo-friendly", title: "No process overhead", description: "Built for solo builders and small teams — one shared login, no approval chains." },
    ],
    deepDiveTitle: "Ship copy changes as fast as you write them",
    deepDiveSubtitle: "No pull requests, no CI queue — the Publishing Workflow is the whole review process for a quick CMS.",
    deepDiveBullets: [
      "Draft and Published are the only two states — nothing to misconfigure",
      "Publish writes JSON straight into your repo's content/cms folder",
      "Works identically for pages, blog posts, and site-wide chrome",
      "Pairs with Visual Editor's preview so you know before you publish",
    ],
  },
};
