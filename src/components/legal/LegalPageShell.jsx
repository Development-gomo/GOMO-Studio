import Link from "next/link";

/** Section anchor — ids must match `LegalNavItem.id` in the page. */
export function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-32 scroll-pb-8 lg:scroll-mt-28">
      <div className="flex gap-0 sm:gap-5">
        <div
          className="hidden w-1 shrink-0 rounded-full sm:block"
          style={{ background: "linear-gradient(180deg, #268de5, #bd27f6)" }}
          aria-hidden
        />
        <div className="min-w-0 flex-1 space-y-4 border-l-2 border-transparent pl-0 sm:border-none sm:pl-0">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-[1.35rem] lg:text-2xl">
            <span className="font-serif italic text-[#5cffd3]">{title}</span>
          </h2>
          <div className="space-y-3 text-[0.9375rem] leading-[1.75] text-white/75">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalH3({ children }) {
  return <h3 className="pt-2 text-base font-bold text-white">{children}</h3>;
}

export function LegalProseList({ items }) {
  return (
    <ul className="list-none space-y-3">
      {items.map((item, i) => (
        <li key={i} className="relative pl-5 text-[0.9375rem] leading-relaxed text-white/75">
          <span className="absolute left-0 top-[0.55em] size-1.5 rounded-full bg-[#268de5]" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Numbered list for sequential obligations or steps. */
export function LegalOrderedList({ items }) {
  return (
    <ol className="list-decimal space-y-3 pl-5 marker:font-semibold marker:text-white">
      {items.map((item, i) => (
        <li key={i} className="pl-1 text-[0.9375rem] leading-relaxed text-white/75">
          {item}
        </li>
      ))}
    </ol>
  );
}

export function LegalCallout({ variant = "note", title, children }) {
  const border = variant === "important" ? "#ff5c7f" : variant === "legal" ? "#bd27f6" : "#268de5";

  return (
    <aside
      className="rounded-2xl border-l-[3px] bg-white/[0.03] px-4 py-4 sm:px-5"
      style={{ borderLeftColor: border }}
    >
      <p className="text-sm font-bold text-white">{title}</p>
      <div className="mt-2 text-[0.8125rem] leading-relaxed text-white/65">{children}</div>
    </aside>
  );
}

const legalLinkClassName =
  "font-semibold text-[#5cffd3] underline decoration-[#5cffd3]/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/50";

export function LegalLink({ href, children }) {
  const external =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={legalLinkClassName}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={legalLinkClassName}>
      {children}
    </Link>
  );
}
