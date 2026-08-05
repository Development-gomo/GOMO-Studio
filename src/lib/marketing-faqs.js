/** FAQ copy for marketing pages — visible accordions + FAQPage JSON-LD. */

export const AI_CONTENT_FAQ = [
  {
    question: "What is AI Content Generation in GOMO Studio?",
    answer:
      "AI Content Generation lets you describe a change in plain English — a new headline, a shorter paragraph, a full blog post — and get a publish-ready draft back. The AI reads the current section's content first, so suggestions match your page's structure and tone.",
  },
  {
    question: "What can I ask the AI panel to do?",
    answer:
      "Rewrite existing copy shorter, longer, or in a different tone; draft a new section from scratch; generate SEO titles, descriptions, and keywords; or write a full blog post from a topic prompt.",
  },
  {
    question: "Which AI model powers content generation?",
    answer:
      "Generation is powered by Anthropic's Claude models, tuned to return structured content that matches the field you're editing.",
  },
  {
    question: "Does AI content publish automatically?",
    answer:
      "No. Every suggestion lands in your draft for review. You edit, save, preview, and publish on your own schedule — AI never writes directly to your live site.",
  },
  {
    question: "Is AI Content Generation included in every plan?",
    answer:
      "Yes. Starter includes a monthly generation allowance; Pro includes unlimited AI generations.",
  },
];

export const VISUAL_EDITOR_FAQ = [
  {
    question: "What is the Visual Editor in GOMO Studio?",
    answer:
      "The Visual Editor gives every page, blog post, and site-wide element (header, footer, robots.txt) a structured form instead of raw markdown or JSON — text, lists, links, and images each get the right input.",
  },
  {
    question: "How does live preview work?",
    answer:
      "Preview uses Next.js Draft Mode to render your actual page template with the draft content applied — it's the real component tree, not a mockup, so what you see is exactly what publishes.",
  },
  {
    question: "Can I edit the header, footer, and robots.txt?",
    answer:
      "Yes. Site-wide chrome is registered in the same content pipeline as pages, so it's editable through the same forms with the same draft-preview-publish flow.",
  },
  {
    question: "What happens if I don't like a draft?",
    answer:
      "Discard the draft to instantly revert to the last published version. Nothing you edit goes live until you explicitly publish it.",
  },
  {
    question: "Do I need to know SEO fields to use the editor?",
    answer:
      "No — the SEO form has labeled fields (title, description, keywords, Open Graph image, canonical URL) with sensible defaults already filled in from your page.",
  },
];

export const PUBLISHING_WORKFLOW_FAQ = [
  {
    question: "What is the Publishing Workflow in GOMO Studio?",
    answer:
      "It's the dashboard that shows every page and post with a Draft or Published status badge, so you always know what's live and what's waiting.",
  },
  {
    question: "How do I publish a change?",
    answer:
      "Open the item from the dashboard, review the draft, and click Publish. It writes directly to your site's content files — no build pipeline or redeploy needed.",
  },
  {
    question: "Can multiple people use the same GOMO Studio login?",
    answer:
      "Yes — Starter and Pro use a single shared admin password by design, matching a quick CMS for solo builders and small teams. Pro adds team roles for larger groups.",
  },
  {
    question: "Is there a review or approval step before publishing?",
    answer:
      "Publishing Workflow keeps it simple: draft, then published. There's no multi-stage approval chain — review happens in the preview step before you click Publish.",
  },
  {
    question: "What happens to a draft if I never publish it?",
    answer:
      "It stays saved as a draft indefinitely until you either publish it or discard it — the live site is unaffected either way.",
  },
];

export const FEATURES_PAGE_FAQ = [
  {
    question: "What features are included in GOMO Studio?",
    answer:
      "GOMO Studio bundles AI Content Generation, a Visual Editor with live preview, and a Publishing Workflow dashboard — all built on the same structured content pipeline.",
  },
  {
    question: "Do I need to know how to code to use GOMO Studio?",
    answer:
      "No. Every editable section has a structured form, and preview shows your real page template before you publish — no markdown or JSON editing required.",
  },
  {
    question: "Which GOMO Studio features use AI?",
    answer:
      "AI Content Generation powers rewrites, first drafts, SEO metadata generation, and blog post drafting throughout the editor.",
  },
  {
    question: "Can small teams use GOMO Studio, not just solo builders?",
    answer:
      "Yes. Pro adds team roles and multiple sites for growing teams, while Starter is tuned for a single builder on a single site.",
  },
  {
    question: "How does publishing work without a deploy step?",
    answer:
      "GOMO Studio writes content changes directly into your site's content files on disk, so published changes appear immediately without a rebuild.",
  },
  {
    question: "Is there a free way to try GOMO Studio?",
    answer: "Yes — Starter is free for a single site with a monthly AI generation allowance included.",
  },
];

export const PRICING_PAGE_FAQ = [
  {
    question: "Is GOMO Studio really free to start?",
    answer:
      "Yes. Starter is free for a single site — no credit card required — with a monthly AI content generation allowance included.",
  },
  {
    question: "What happens when I run out of AI generations?",
    answer:
      "You can wait for the next monthly reset on Starter, or upgrade to Pro for unlimited AI content generations.",
  },
  {
    question: "What's the difference between Starter and Pro?",
    answer:
      "Starter covers one site with a monthly AI generation cap. Pro adds unlimited AI generations, up to 10 sites, custom domains, advanced SEO fields, and team roles.",
  },
  {
    question: "Do I need a subscription to start?",
    answer:
      "No. You can build on Starter for free indefinitely and only upgrade to Pro when you need more sites, generations, or team features.",
  },
  {
    question: "How does Enterprise pricing work?",
    answer:
      "GOMO Studio Enterprise is tailored for teams that need dedicated infrastructure, SSO, custom integrations, SLAs, and hands-on onboarding. Contact us for a quote.",
  },
];

export const INTEGRATIONS_PAGE_FAQ = [
  {
    question: "What does GOMO Studio integrate with?",
    answer:
      "GOMO Studio is built on Next.js and deploys anywhere Next.js runs, including Vercel. It works alongside GitHub for version control and Google Search Console / GA4 for monitoring published pages.",
  },
  {
    question: "Do I need Vercel to use GOMO Studio?",
    answer:
      "No. GOMO Studio is a standard Next.js application — it runs anywhere Next.js can be hosted. Vercel is a supported, well-tested option, not a requirement.",
  },
  {
    question: "Can I connect Slack or Zapier notifications?",
    answer:
      "Slack and Zapier integrations for publish notifications are on the roadmap and marked coming soon.",
  },
  {
    question: "How does GOMO Studio work with GitHub?",
    answer:
      "Since content is stored as JSON files in your repository, every publish is a regular file change you can track with Git the same way you track code.",
  },
];

export function getCapabilityFaq(capabilityId) {
  switch (capabilityId) {
    case "ai-content":
      return AI_CONTENT_FAQ;
    case "visual-editor":
      return VISUAL_EDITOR_FAQ;
    case "publishing-workflow":
      return PUBLISHING_WORKFLOW_FAQ;
    default:
      return [];
  }
}
