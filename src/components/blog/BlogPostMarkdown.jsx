"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { BlogFaqAccordion } from "@/components/blog/BlogFaqAccordion";
import { splitBlogMarkdownWithFaq } from "@/lib/parse-blog-faq";

const createComponents = (headingIds, h2IndexRef, h2StartIndex = 0) => ({
  h2: ({ children, ...props }) => {
    const id = headingIds[h2StartIndex + h2IndexRef.current++] ?? undefined;
    return (
      <h2
        id={id}
        className="mt-12 mb-4 scroll-mt-24 border-b border-gray-100 pb-3 text-xl font-bold tracking-tight text-gray-900 dark:border-white/[0.08] dark:text-white sm:mt-14 sm:scroll-mt-28 sm:text-2xl md:text-3xl"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => (
    <h3
      className="mt-8 mb-3 scroll-mt-24 text-lg font-bold text-gray-900 dark:text-white sm:mt-10 sm:scroll-mt-28 sm:text-xl md:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 text-base leading-[1.75] text-gray-600 dark:text-white/72 sm:text-[1.0625rem] sm:leading-[1.8]" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-6 list-none space-y-2.5 pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.65em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brand-500 [&>li]:before:content-['']" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-6 list-decimal space-y-2.5 pl-6 text-[1.0625rem] leading-[1.75] text-gray-600 dark:text-white/72" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-[1.0625rem] leading-[1.75] text-gray-600 dark:text-white/72" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900 dark:text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700 dark:text-white/80" {...props}>
      {children}
    </em>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    const className =
      "font-medium text-brand-600 underline decoration-brand-300/50 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-300 dark:decoration-brand-500/40 dark:hover:text-brand-500";
    if (isExternal) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={className} {...props}>
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-8 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4 text-base not-italic text-gray-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-white/75"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={`${className} block text-sm`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[0.9em] font-mono text-brand-700 dark:bg-white/[0.08] dark:text-brand-300"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-8 overflow-x-auto rounded-2xl border border-gray-200 bg-gray-950 p-5 text-sm text-gray-100 dark:border-white/[0.08]"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/[0.08]">
      <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-white/[0.08]" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 dark:bg-white/[0.04]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-white/80"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-sm text-gray-600 dark:text-white/70" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-gray-100 last:border-0 dark:border-white/[0.06]" {...props}>
      {children}
    </tr>
  ),
  hr: () => <hr className="my-12 border-gray-200 dark:border-white/[0.08]" />,
});

const faqHeadingClassName =
  "mt-12 mb-4 scroll-mt-24 border-b border-gray-100 pb-3 text-xl font-bold tracking-tight text-gray-900 dark:border-white/[0.08] dark:text-white sm:mt-14 sm:scroll-mt-28 sm:text-2xl md:text-3xl";

export function BlogPostMarkdown({ markdown, headingIds = [] }) {
  const beforeH2Ref = useRef(0);
  const afterH2Ref = useRef(0);
  beforeH2Ref.current = 0;
  afterH2Ref.current = 0;

  const { before, faqs, after, hasFaq } = useMemo(
    () => splitBlogMarkdownWithFaq(markdown),
    [markdown],
  );

  const faqH2Index = useMemo(() => (before.match(/^## /gm) || []).length, [before]);
  const faqHeadingId = hasFaq ? headingIds[faqH2Index] : undefined;

  const beforeComponents = useMemo(
    () => createComponents(headingIds, beforeH2Ref, 0),
    [headingIds],
  );
  const afterComponents = useMemo(
    () => createComponents(headingIds, afterH2Ref, faqH2Index + 1),
    [headingIds, faqH2Index],
  );

  return (
    <div className="blog-article-prose">
      {before ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={beforeComponents}>
          {before.trim()}
        </ReactMarkdown>
      ) : null}

      {hasFaq ? (
        <>
          <h2 id={faqHeadingId} className={faqHeadingClassName}>
            Frequently asked questions
          </h2>
          <BlogFaqAccordion items={faqs} />
        </>
      ) : null}

      {after ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={afterComponents}>
          {after.trim()}
        </ReactMarkdown>
      ) : null}
    </div>
  );
}
