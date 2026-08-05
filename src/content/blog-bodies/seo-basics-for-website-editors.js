/** Blog body: SEO fundamentals every content editor should get right. */
export const seoBasicsForWebsiteEditorsBody = `
Most SEO advice is written for specialists. Most people editing a website are not SEO specialists — they're the person who owns the copy and just needs the page to be found. This is the short version: the handful of fields that matter on every page, and why GOMO Studio surfaces exactly those and nothing more.

## The fields that actually move the needle

Of the dozens of possible SEO settings, a small set does most of the work for a typical content page:

| Field | What it controls | Good length |
|---|---|---|
| Title | Browser tab, search result headline, share previews | 50–60 characters |
| Description | The snippet under your title in search results | 140–160 characters |
| Canonical URL | Which URL search engines treat as the "real" one | Always your published path |
| Open Graph image | The preview image on social shares | 1200×630px |
| Keywords | Internal targeting reference, not a ranking factor today | 3–8 relevant terms |

GOMO Studio's SEO form exposes exactly these fields on every page, pre-filled with sensible defaults derived from your page content, so publishing a new page without touching SEO still produces a reasonable result.

## Titles: write for the person, not the algorithm

A title stuffed with keywords reads badly and doesn't rank better for it. Write the title a human would want to click, put the most important word near the front, and stop worrying about exact-match keyword density — search engines have not rewarded that for years.

## Descriptions don't rank, but they decide clicks

Your description doesn't directly affect ranking position, but it's the ad copy for your own search result. A vague description ("Learn more about our product") loses clicks to a competitor with a specific one ("See how AI content generation drafts a hero section in one prompt"). Treat the description field as a one-sentence pitch, not an afterthought.

## Canonical URLs prevent duplicate-content confusion

If the same content is reachable at two URLs — with and without a trailing slash, or via a redirect — search engines need to know which one is authoritative. GOMO Studio's SEO form defaults the canonical field to your page's registered path so this is correct out of the box; you only need to touch it if you're intentionally pointing one page's authority at another.

## Structured data: the part you don't have to write by hand

Behind the SEO form, GOMO Studio also emits JSON-LD structured data — Organization, WebPage, BreadcrumbList, FAQPage where relevant — automatically, based on your page's content. You get the benefit of structured data (rich results, better machine readability) without hand-authoring schema markup, which is exactly the kind of task an AI-assisted editor should absorb rather than pass on to you. See how the AI panel can help draft the copy those fields describe in [how AI content generation works](/resources/blogs/ai-content-generation-explained).

## Frequently asked questions

**Do I need a different title and headline?**
Often yes. Your on-page headline can be conversational; your SEO title should front-load the specific term someone would search for.

**What if I leave the SEO fields blank?**
GOMO Studio falls back to sensible defaults derived from the page's title and description, so a blank SEO form never produces an empty search result.

**Does keyword stuffing help rankings?**
No — modern search ranking weighs relevance and content quality far more than keyword repetition. Write for clarity first.

**How often should I revisit SEO fields?**
Whenever the page's core topic or offer changes meaningfully. A title that accurately described the page a year ago can quietly become misleading as the content evolves.
`;
