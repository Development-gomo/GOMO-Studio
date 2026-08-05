import { splitBlogMarkdownWithFaq } from "@/lib/parse-blog-faq";

/** Strip lightweight markdown for FAQ JSON-LD answer text. */
export function plainTextForSchema(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** FAQ items from blog markdown, normalized for Schema.org FAQPage. */
export function extractBlogFaqsForSchema(markdown) {
  const { faqs } = splitBlogMarkdownWithFaq(markdown);
  return faqs.map((item) => ({
    question: plainTextForSchema(item.question),
    answer: plainTextForSchema(item.answer),
  }));
}
