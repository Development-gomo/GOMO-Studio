/** BlogFaqItem: { question, answer } */

const FAQ_SECTION_HEADING = /^## Frequently asked questions\s*$/m;

/** Split blog markdown into body, FAQ items, and trailing sections. */
export function splitBlogMarkdownWithFaq(markdown) {
  const match = markdown.match(FAQ_SECTION_HEADING);
  if (!match || match.index === undefined) {
    return { before: markdown, faqs: [], after: "", hasFaq: false };
  }

  const before = markdown.slice(0, match.index).trimEnd();
  const afterHeading = markdown.slice(match.index + match[0].length);
  const nextH2 = afterHeading.search(/^## /m);

  const faqBlock = (nextH2 === -1 ? afterHeading : afterHeading.slice(0, nextH2)).trim();
  const after = nextH2 === -1 ? "" : afterHeading.slice(nextH2).trimStart();

  return {
    before,
    faqs: parseBlogFaqItems(faqBlock),
    after,
    hasFaq: true,
  };
}

function parseBlogFaqItems(block) {
  const items = [];
  let question = null;
  let answerLines = [];

  const flush = () => {
    if (!question) return;
    const answer = answerLines.join("\n").trim();
    if (answer) {
      items.push({ question, answer });
    }
    question = null;
    answerLines = [];
  };

  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // **Question?** with optional answer on the same line
    const faqLineMatch = trimmed.match(/^\*\*(.+?)\*\*\s*(.*)$/);
    if (faqLineMatch) {
      const [, q, rest] = faqLineMatch;
      flush();
      question = q.trim();
      if (rest.trim()) {
        answerLines.push(rest.trim());
      }
      continue;
    }

    if (question) {
      answerLines.push(trimmed);
    }
  }

  flush();
  return items;
}
