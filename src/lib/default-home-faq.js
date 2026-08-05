/**
 * Default home FAQ — visible on the page and mirrored in FAQPage JSON-LD.
 */
export const DEFAULT_HOME_FAQ = [
  {
    question: "What is GOMO Studio?",
    answer:
      "GOMO Studio is an AI-powered website backend editor and quick CMS. It gives you a dashboard of every page and blog post, a visual editor with structured forms and live preview, and an AI panel that can generate or rewrite copy on request — then you publish with one click.",
  },
  {
    question: "Do I need to know how to code to use GOMO Studio?",
    answer:
      "No. Every page section has its own form — headings, lists, links, and images — so you never touch markdown or JSON directly. Preview shows the real rendered page before you publish.",
  },
  {
    question: "How does AI content generation work?",
    answer:
      "Describe what you want in plain English — a new headline, a shorter paragraph, a full blog post — and the AI panel reads the current section first so its suggestion matches your page's structure and tone. Nothing publishes automatically; the suggestion lands in your draft for review.",
  },
  {
    question: "What's the difference between a draft and a published page?",
    answer:
      "Edits always save as a draft first. Preview uses Next.js Draft Mode to show your exact live page template with the draft content applied. Publishing writes the draft straight into your site's content files — nothing goes live until you choose to publish.",
  },
  {
    question: "Can I undo a change before it goes live?",
    answer:
      "Yes. Discard a draft at any time to instantly fall back to the last published version — no history to dig through, no risk of publishing something half-finished.",
  },
  {
    question: "Does GOMO Studio require a separate deploy step to publish?",
    answer:
      "No. Publishing writes directly to your site's content files on disk, so changes appear immediately without a rebuild or redeploy.",
  },
  {
    question: "How does GOMO Studio pricing work?",
    answer:
      "GOMO Studio Starter is free for a single site with a monthly AI generation allowance. Pro adds unlimited AI generations, more sites, and team features. See current plans on the pricing page.",
  },
  {
    question: "Is my content safe with GOMO Studio?",
    answer:
      "Content lives in your own repository as plain JSON files — nothing is locked into a proprietary database. The admin editor is protected by a password-gated session, documented in our Privacy Policy.",
  },
];
