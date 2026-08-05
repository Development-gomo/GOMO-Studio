/** Blog body: the draft → preview → publish content workflow. */
export const draftPreviewPublishWorkflowBody = `
The riskiest moment in any CMS is the gap between "I changed something" and "I can see whether that was a good idea." A workflow with too few steps ships mistakes straight to production; one with too many steps turns a two-minute copy fix into a half-day process. GOMO Studio settles on exactly two states — draft and published — and makes the step between them, preview, impossible to skip by accident.

## Why two states, not five

Enterprise CMS platforms often model content through multiple review stages: draft, in review, approved, scheduled, published. That's the right shape for a large editorial team with a compliance requirement. It's the wrong shape for a solo builder or a three-person team who just wants to fix a typo without opening a workflow diagram. GOMO Studio's Publishing Workflow deliberately has two states because that's the number a small team actually uses:

| State | Meaning | Who sees it |
|---|---|---|
| Draft | Saved, not live | Only you, via preview |
| Published | Live on the site | Everyone |

## Draft: saved instantly, visible to no one but you

Every edit in the Visual Editor autosaves as a draft the moment you make it — there's no explicit "save" step to forget. Drafts are stored as plain files, one per page or post, so nothing you're working on can leak into production by accident. A draft can sit unpublished indefinitely; there's no expiry, no "abandoned draft" cleanup that surprises you later.

## Preview: the step that catches mistakes before they're public

Preview enables Next.js Draft Mode for your browser session and opens the real route. That's the detail that matters: preview isn't a simulated rendering of your content, it's your actual page template with the draft layered on top. Whatever you see is what publishing will produce — no gap between the preview and reality for anyone testing the flow described in [visual editing vs. editing code](/resources/blogs/visual-editor-vs-code).

## Publish: instant, and reversible up until you click it

Publishing writes your draft straight into the site's content files. There's no deploy queue, no CI pipeline to wait on — the change is live as soon as the write completes. Because nothing is live until that click, you can iterate on a draft as many times as you want with zero risk; the only risky action in the whole workflow is the one button explicitly labeled "Publish."

## What if you change your mind?

Discard the draft and you're back to the last published version, instantly. There's no partial state to clean up and no history to dig through — discard is a single, clean action, which keeps the mental model simple even as your site grows to dozens of pages.

## Frequently asked questions

**Can I schedule a publish for later?**
Not currently — publish is immediate. For a quick CMS built around solo builders and small teams, scheduling adds a layer of complexity that most workflows don't need; see our take on [choosing a quick CMS](/resources/blogs/choosing-a-quick-cms) for how we think about that trade-off.

**Does preview affect the live site for other visitors?**
No. Draft Mode is scoped to your browser session via a cookie — other visitors continue to see the published version while you preview a draft.

**What happens to old drafts after I publish?**
The draft is cleared once its content is written to the published file, so the dashboard only ever shows genuinely unpublished work.

**Is there an undo after publishing?**
Publishing writes to your content files directly, so your normal version control history is the record of what changed and when — the same as any other file in your repository.
`;
