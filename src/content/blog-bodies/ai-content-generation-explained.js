/** Blog body: how AI Content Generation works inside GOMO Studio. */
export const aiContentGenerationExplainedBody = `
AI content generation only earns its keep when it produces something you can publish with a light edit, not a wall of generic text you rewrite from scratch. GOMO Studio's AI panel is built around one constraint: it always reads the section you're editing before it writes anything, so a suggestion for your pricing page sounds like your pricing page — not a template pulled from nowhere.

## What does "section-aware" generation actually mean?

Most AI writing tools work from a blank prompt: you type an instruction, the model imagines context, and you get back copy that has to be reshaped to fit your page. GOMO Studio inverts that. When you open the AI panel on a section — a hero, an FAQ block, a pricing card — the current field values for that section are sent along with your instruction automatically.

Ask for "a punchier headline" and the model sees your existing headline, the surrounding subtext, and the section's structure before it proposes a replacement. The result lands in the same shape your form expects, so it drops straight into the draft instead of needing to be reformatted.

## What can you actually ask it to do?

| Request type | Example prompt | What comes back |
|---|---|---|
| Rewrite | "Make this shorter and more direct" | A revised version of the existing field |
| Generate | "Write an FAQ about our refund policy" | A new set of question/answer pairs matching the FAQ section shape |
| Retone | "Make this sound more casual" | The same content, adjusted tone |
| SEO | "Write a meta title and description for this page" | Populated SEO fields, character-length aware |
| Draft a post | "Write a blog post about our new pricing tiers" | A full markdown draft with headings |

## Why nothing publishes automatically

Every AI suggestion in GOMO Studio lands in your draft, not your live site. That's a deliberate boundary: generation is fast and occasionally wrong, and the fix for "occasionally wrong" is a human in the loop, not a smarter model. You review the diff between your current draft and the suggestion, edit what needs editing, and only then save. Publishing is a separate action entirely — see our piece on the [draft, preview, publish workflow](/resources/blogs/draft-preview-publish-workflow) for how that boundary is enforced end to end.

## Getting better results from the AI panel

Vague prompts produce vague output, same as with any model. A few patterns that consistently work better:

- Name the outcome, not the process: "make the CTA more urgent" beats "improve this"
- Reference what you don't want kept: "keep the stats, rewrite the intro paragraph"
- Ask for options when you're not sure: "give me two versions, one shorter"
- Let it see the whole section — don't paste a fragment into a generic prompt elsewhere and copy the result back in

## Frequently asked questions

**Does AI content generation cost extra?**
It's included in every GOMO Studio plan. Starter includes a monthly generation allowance; Pro removes the cap entirely.

**Can I turn off AI suggestions for a section?**
Yes — the AI panel is opt-in per edit. If you never open it, nothing about your editing workflow changes.

**What happens if I don't like the suggestion?**
Discard it and your draft is untouched. Suggestions never overwrite your draft until you explicitly accept them.

**Does the AI know about my other pages?**
It sees the section you're actively editing, not your whole site. That keeps responses fast and on-topic rather than trying to reconcile context across dozens of pages.

Read next: [Visual editing vs. editing code](/resources/blogs/visual-editor-vs-code) and [choosing a quick CMS](/resources/blogs/choosing-a-quick-cms).
`;
