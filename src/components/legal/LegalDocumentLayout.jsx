"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { LEGAL_DOCUMENTS_LAST_UPDATED } from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { GomoLogo } from "@/components/layout/GomoLogo";
import { cn } from "@/lib/utils";

/** LegalNavItem: { id, label } · docKind: "privacy" | "terms" */

export function LegalDocumentLayout({
  docKind,
  title,
  subtitle,
  description,
  navItems,
  children,
}) {
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? "");
  const navRef = useRef(null);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      try {
        history.replaceState(null, "", `#${id}`);
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash?.replace(/^#/, "");
    if (hash && navItems.some((n) => n.id === hash)) {
      requestAnimationFrame(() => scrollToId(hash));
    }
  }, [navItems, scrollToId]);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-12% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems]);

  const otherHref =
    docKind === "privacy" ? TERMS_OF_SERVICE_PATH : PRIVACY_POLICY_PATH;
  const otherLabel =
    docKind === "privacy" ? "Terms of Service" : "Privacy Policy";

  return (
    <div className="min-h-screen bg-black text-white/85">
      {/* Decorative aurora */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 8% 0%, rgba(189,39,246,0.22) 0%, transparent 65%), radial-gradient(50% 40% at 95% 10%, rgba(38,141,229,0.2) 0%, transparent 65%), radial-gradient(45% 40% at 50% 100%, rgba(255,40,188,0.14) 0%, transparent 65%)",
        }}
      />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, #268de5, #bd27f6, #ff28bc)" }}
        />
        <div className="mx-auto flex h-[3.5rem] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
          >
            <GomoLogo variant="full" className="h-6 w-auto" />
          </Link>
          <nav
            className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3"
            aria-label="Site"
          >
            <Link
              href={otherHref}
              className="hidden text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-white sm:inline"
            >
              {otherLabel}
            </Link>
            <Link
              href={otherHref}
              className="inline-flex h-9 items-center rounded-full border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-white/80 backdrop-blur sm:hidden"
            >
              {docKind === "privacy" ? "Terms" : "Privacy"}
            </Link>
            <Link
              href={STUDIO_LOGIN_PATH}
              className="inline-flex h-9 items-center rounded-full bg-[#030cf4] px-4 font-serif text-sm italic text-white shadow-md transition-transform hover:scale-[1.03]"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile: horizontal section nav */}
      <div className="sticky top-14 z-20 border-b border-white/10 bg-black/90 backdrop-blur-lg lg:hidden">
        <div className="legal-scroll-hide flex gap-2 overflow-x-auto px-4 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-left text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                activeId === item.id
                  ? "border-transparent bg-[#030cf4] text-white shadow-md"
                  : "border-white/15 bg-white/[0.03] text-white/70 hover:border-white/30",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6 lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-12 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:gap-14">
        {/* Desktop sidebar */}
        <aside className="mb-10 hidden lg:mb-0 lg:block" ref={navRef}>
          <nav
            className="sticky top-24 space-y-0.5 pl-1"
            aria-label="On this page"
          >
            <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#bd27f6]">
              On this page
            </p>
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={cn(
                    "relative flex w-full items-center rounded-xl py-2.5 pl-4 pr-3 text-left text-[0.8125rem] font-medium leading-snug transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    active
                      ? "bg-white/[0.06] text-white"
                      : "text-white/55 hover:bg-white/[0.04] hover:text-white/85",
                  )}
                >
                  {active && (
                    <span
                      className="absolute inset-y-1 left-0 w-[3px] rounded-full"
                      style={{ background: "linear-gradient(180deg, #268de5, #bd27f6)" }}
                      aria-hidden
                    />
                  )}
                  <span className={cn(active && "pl-1")}>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <article className="min-w-0">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_-24px_rgba(38,141,229,0.25)] backdrop-blur-xl">
            <div className="border-b border-white/10 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#268de5]/30 bg-gradient-to-r from-[#268de5]/10 to-[#bd27f6]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#5cffd3]">
                <span className="size-1.5 rounded-full bg-[#5cffd3]" aria-hidden />
                Last updated {LEGAL_DOCUMENTS_LAST_UPDATED}
              </p>
              <h1 className="mt-5 text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-[2.25rem] lg:text-[2.5rem]">
                {title}
              </h1>
              <p className="mt-2 text-sm font-semibold text-[#5cffd3] sm:text-base">
                {subtitle}
              </p>
              <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-white/70">
                {description}
              </p>
            </div>

            <div className="space-y-12 px-6 py-10 sm:px-10 sm:py-12 lg:space-y-14 lg:px-12 lg:py-14">
              {children}
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-white/35">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white/55">GOMO Group</span>
            . Multi-market performance marketing for the generative AI era.
          </p>
        </article>
      </div>
    </div>
  );
}
