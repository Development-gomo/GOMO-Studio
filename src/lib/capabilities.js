/**
 * Canonical marketing definitions for GOMO Studio's three core capabilities.
 * CapabilityId: "ai-content" | "visual-editor" | "publishing-workflow"
 */
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { SITE_PATHS } from "@/lib/site-paths";

export const CAPABILITIES = {
  "ai-content": {
    id: "ai-content",
    name: "AI Content Generation",
    shortName: "AI Content",
    appNavLabel: "AI Content",
    path: SITE_PATHS.capabilities.aiContent,
    tagline: "Describe what you need — GOMO Studio writes the copy.",
    description:
      "GOMO Studio's AI Content Generation turns a short prompt into publish-ready page copy, SEO metadata, or a full blog post. Ask it to write a new hero headline, rewrite a paragraph in a different tone, or draft an entire article — the AI reads your page's current content first, so edits stay consistent with what's already there.",
    metaTitle: "AI Content Generation — Write & Rewrite Copy in Seconds",
    metaDescription:
      "Generate and rewrite website copy, SEO metadata, and blog posts with AI inside GOMO Studio's editor. No prompt engineering required.",
    keywords: [
      "AI content generation",
      "AI website copy",
      "AI copywriting tool",
      "content generation CMS",
      "AI text rewriting",
      "AI SEO metadata",
      "AI blog writer",
      "website AI assistant",
    ],
    integrations: ["Claude (Anthropic)", "Section-aware prompts", "SEO field generation", "Blog post drafting"],
    features: [
      "Generate a first draft for any page section from a single prompt",
      "Rewrite existing copy — shorter, longer, or in a different tone",
      "AI reads the current section content first, so edits stay on-brand and in context",
      "Generate SEO titles, meta descriptions, and keywords alongside the copy",
      "Every AI suggestion lands in your draft — nothing publishes until you approve it",
    ],
    workflow: [
      "Open any page or blog post in the Studio editor",
      "Describe the change in plain English in the AI panel",
      "Review the suggested copy against your current draft",
      "Accept, tweak, and save — then preview or publish",
    ],
    billingNote: "Included on every GOMO Studio plan.",
    signupUrl: STUDIO_LOGIN_PATH,
    heroTitleLine1: "AI Content Generation for",
    heroTitleLine2: "Every Page You Manage",
  },
  "visual-editor": {
    id: "visual-editor",
    name: "Visual Editor & Preview",
    shortName: "Visual Editor",
    appNavLabel: "Editor",
    path: SITE_PATHS.capabilities.visualEditor,
    tagline: "Edit any section, preview the real page, publish when it's right.",
    description:
      "The Visual Editor gives every page, blog post, and site-wide element (header, footer, robots.txt) its own structured form — no code, no markdown files to hunt down. Save a draft, flip into Preview to see the exact live page with your changes applied via Next.js Draft Mode, then publish when you're happy.",
    metaTitle: "Visual Editor & Live Preview — Edit Without Touching Code",
    metaDescription:
      "Edit page sections, SEO fields, and site-wide content in a structured visual editor, then preview your exact live page before publishing.",
    keywords: [
      "visual website editor",
      "no-code CMS editor",
      "live preview CMS",
      "draft mode preview",
      "website content editor",
      "quick CMS",
      "structured content editor",
    ],
    integrations: ["Next.js Draft Mode", "Structured section forms", "SEO fields form", "Robots.txt editor"],
    features: [
      "Structured forms for every editable section — headings, lists, images, links",
      "Dedicated SEO fields form: title, description, keywords, Open Graph, canonical URL",
      "Live preview renders your real page template with the draft content applied",
      "Header, footer, and robots.txt are editable the same way as any page",
      "Discard a draft anytime to fall back to what's currently published",
    ],
    workflow: [
      "Pick a page, blog post, or site-wide element from the dashboard",
      "Edit fields in the structured form — changes autosave as a draft",
      "Click Preview to see the live page with your draft applied",
      "Publish to write the change straight to the site",
    ],
    signupUrl: STUDIO_LOGIN_PATH,
    heroTitleLine1: "A Visual Editor With",
    heroTitleLine2: "Real Live Preview",
  },
  "publishing-workflow": {
    id: "publishing-workflow",
    name: "Publishing Workflow",
    shortName: "Publishing",
    appNavLabel: "Publishing",
    path: SITE_PATHS.capabilities.publishingWorkflow,
    tagline: "Know what's live, what's drafted, and publish in one click.",
    description:
      "Publishing Workflow gives you a dashboard of every page and post with a clear Draft or Published status. Nothing you edit goes live until you publish it — drafts save to disk instantly, previews use the real page template, and publishing writes straight to your site's content files with no deploy step required.",
    metaTitle: "Publishing Workflow — Draft, Preview, Publish",
    metaDescription:
      "Track draft vs. published status for every page and post, preview changes safely, and publish instantly with GOMO Studio's publishing workflow.",
    keywords: [
      "content publishing workflow",
      "draft and publish CMS",
      "content status dashboard",
      "quick CMS publishing",
      "website content workflow",
      "publish without deploy",
    ],
    integrations: [
      "File-based content storage",
      "Instant publish (no deploy)",
      "Draft status dashboard",
      "Search & filter by status",
    ],
    features: [
      "Dashboard view of every page and post with Draft / Published status badges",
      "Search and filter content by type or status",
      "Publish writes directly to your site's content files — no build or redeploy needed",
      "Discard a draft to revert to the last published version",
      "Designed for solo builders and small teams who need to ship copy changes fast",
    ],
    workflow: [
      "Open the Studio dashboard to see every page's current status",
      "Filter to Drafts to see what's waiting to publish",
      "Open an item, review the change, and hit Publish",
      "Confirm the live page updated instantly",
    ],
    signupUrl: STUDIO_LOGIN_PATH,
    heroTitleLine1: "A Publishing Workflow For",
    heroTitleLine2: "Teams That Ship Fast",
  },
};

export const CAPABILITY_LIST = Object.values(CAPABILITIES);

export function getCapability(id) {
  return CAPABILITIES[id];
}
