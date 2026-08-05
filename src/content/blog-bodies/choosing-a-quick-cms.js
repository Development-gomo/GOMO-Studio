/** Blog body: a checklist for evaluating a quick CMS. */
export const choosingAQuickCmsBody = `
"Quick CMS" gets used loosely — sometimes it means a genuinely lightweight tool, sometimes it means a full headless CMS with a simpler onboarding flow bolted on. Before committing to one, it's worth being specific about what you actually need, because the wrong choice shows up months later as either "this is too limited" or "this is more infrastructure than I wanted to run."

## Start with who's actually going to use it

A tool built for a content team of twenty with approval chains and role-based permissions will feel bureaucratic for a solo builder. A tool built for a single editor will feel thin the moment a second person needs write access. Be honest about your team size today, not your ambitions for next year — you can always migrate later, and over-provisioning for a team you don't have yet is its own cost.

## The checklist

| Question | Why it matters |
|---|---|
| Does content live in files I own, or a vendor's database? | Determines how locked-in you are and whether Git can track content changes |
| Is there a real preview before publishing? | Determines how many mistakes reach production |
| Does publishing require a rebuild/redeploy? | Determines how fast you can actually ship a change |
| Can it generate a first draft, or only store text I write elsewhere? | Determines how much of the writing burden the tool actually removes |
| What's the pricing model at the size you'll actually be? | Free tiers often cap out exactly where a growing team lives |

## File-based content is underrated

A CMS that stores your pages as JSON or Markdown files in your own repository gives you something a hosted database-backed CMS can't: your content history is your Git history. No separate export process, no vendor lock-in, no "what happens to our content if we cancel the subscription" anxiety. GOMO Studio takes this approach deliberately — see [visual editing vs. editing code](/resources/blogs/visual-editor-vs-code) for how that plays out day to day.

## Preview quality is a bigger deal than it sounds

Plenty of tools call something "preview" when it's really a stripped-down rendering that doesn't match production styling. That gap is where "it looked fine in the CMS" and "it looks broken on the live site" come from. Ask specifically whether preview uses your actual page components or a separate simplified renderer — the answer tells you how much you can trust it.

## Instant publish vs. deploy-gated publish

Some CMS platforms treat every content change as a deploy: publishing triggers a rebuild, which takes anywhere from seconds to minutes depending on your host and site size. That's fine for occasional changes and painful for anyone iterating quickly. A quick CMS, by definition, should make the common case — fixing a sentence, updating a price — feel instant, which is why GOMO Studio's publish step writes directly to content files rather than queuing a build.

## AI generation is a feature, not a gimmick, if it's scoped correctly

The difference between useful AI writing help and a novelty chat box bolted onto a CMS is context. A tool that reads your current page before suggesting a rewrite saves real editing time; one that just opens a generic chat window mostly produces text you still have to reshape by hand. See [how AI content generation works](/resources/blogs/ai-content-generation-explained) for what "scoped correctly" looks like in practice.

## Frequently asked questions

**Is a quick CMS the same as a headless CMS?**
Not necessarily. Headless describes the architecture (content and presentation are separate); quick describes the intended team size and workflow simplicity. A tool can be both, neither, or just one.

**How do I know if I've outgrown a quick CMS?**
Common signals: you need multi-stage approval workflows, dozens of editors with different permission levels, or content localized across many languages with separate review cycles.

**Does file-based content scale to large sites?**
It scales well into the hundreds of pages. Very large sites with thousands of dynamic entries usually want a database-backed system regardless of how "quick" the editing experience is.

**What should I evaluate first — features or workflow fit?**
Workflow fit. A tool with every feature imaginable is still the wrong choice if its editing model doesn't match how your team actually works day to day.
`;
