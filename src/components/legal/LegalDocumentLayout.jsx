"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { LEGAL_DOCUMENTS_LAST_UPDATED } from "@/lib/legal-site";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { GomoLogo } from "@/components/layout/GomoLogo";
import { cn } from "@/lib/utils";

const C = BRAND.colors;

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
    <div
      className="min-h-screen text-[var(--legal-fg)]"
      style={
        {
          "--legal-fg": C.realisticGrey,
          "--legal-ink": C.veryBlack,
          background:
            `linear-gradient(165deg, ${C.electricBlue}08 0%, transparent 42%),` +
            `linear-gradient(215deg, ${C.dancingPurple}0d 0%, transparent 38%),` +
            `#f6f5fb`,
        }
      }
    >
      {/* Decorative mesh */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 10% -10%, ${C.blueLight}33, transparent), radial-gradient(ellipse 60% 40% at 90% 0%, ${C.electricBlue}22, transparent)`,
        }}
      />

      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div
          className="h-1 w-full bg-gradient-to-r from-[var(--from)] via-[var(--via)] to-[var(--to)]"
          style={
            {
              "--from": C.electricBlue,
              "--via": C.blueLight,
              "--to": C.dancingPurple,
            }
          }
        />
        <div className="mx-auto flex h-[3.5rem] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 text-[var(--legal-ink)] transition-opacity hover:opacity-90"
          >
            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
              <GomoLogo variant="mark" className="h-6 w-6" />
            </span>
            <span className="truncate font-heading text-lg font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#0f0f0f] to-[#1a1b1e] bg-clip-text text-transparent">
                {BRAND.name}
              </span>
            </span>
          </Link>
          <nav
            className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3"
            aria-label="Site"
          >
            <Link
              href={otherHref}
              className="hidden text-sm font-medium text-[#1D2939]/70 underline-offset-4 transition-colors hover:text-[#0f0f0f] sm:inline"
            >
              {otherLabel}
            </Link>
            <Link
              href={otherHref}
              className="inline-flex h-9 items-center rounded-full border border-black/10 bg-white/80 px-3 text-xs font-semibold text-[color:var(--legal-fg)] shadow-sm backdrop-blur sm:hidden"
            >
              {docKind === "privacy" ? "Terms" : "Privacy"}
            </Link>
            <Link
              href={STUDIO_LOGIN_PATH}
              className="inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold shadow-md transition-[filter] hover:brightness-110"
              style={{
                background: C.ink,
                color: C.accent,
                boxShadow: `0 8px 24px -6px ${C.ink}55`,
              }}
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile: horizontal section nav */}
      <div className="sticky top-14 z-20 border-b border-black/5 bg-white/90 backdrop-blur-lg lg:hidden">
        <div className="legal-scroll-hide flex gap-2 overflow-x-auto px-4 py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-left text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f] focus-visible:ring-offset-2",
                activeId === item.id
                  ? "border-transparent shadow-md"
                  : "border-black/10 bg-white text-[#1D2939]/80 hover:border-[#0f0f0f]/35",
              )}
              style={
                activeId === item.id
                  ? {
                      background: C.ink,
                      color: C.accent,
                      boxShadow: `0 4px 14px -4px ${C.ink}66`,
                    }
                  : undefined
              }
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
            <p
              className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em]"
              style={{ color: C.dancingPurple }}
            >
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
                    "relative flex w-full items-center rounded-xl py-2.5 pl-4 pr-3 text-left text-[0.8125rem] font-medium leading-snug transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f] focus-visible:ring-offset-2",
                    active
                      ? "text-[#17191C]"
                      : "text-[#1D2939]/65 hover:bg-black/[0.03] hover:text-[#1D2939]",
                  )}
                >
                  {active && (
                    <span
                      className="absolute inset-y-1 left-0 w-[3px] rounded-full"
                      style={{
                        background: `linear-gradient(180deg, ${C.electricBlue}, ${C.dancingPurple})`,
                      }}
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
          <div
            className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/85 shadow-[0_24px_80px_-24px_rgba(94,86,231,0.25)] backdrop-blur-xl"
            style={{
              boxShadow: `0 24px 80px -24px ${C.electricBlue}33, 0 0 0 1px rgba(255,255,255,0.8) inset`,
            }}
          >
            <div
              className="border-b border-black/[0.06] bg-gradient-to-br from-white via-[#faf9ff] to-[#f3f0fc] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"
            >
              <p
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                style={{
                  borderColor: `${C.electricBlue}33`,
                  color: C.dancingPurple,
                  background: `linear-gradient(90deg, ${C.electricBlue}12, ${C.dancingPurple}10)`,
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: C.successGreen }}
                  aria-hidden
                />
                Last updated {LEGAL_DOCUMENTS_LAST_UPDATED}
              </p>
              <h1 className="mt-5 font-heading text-[1.75rem] font-bold leading-tight tracking-tight text-[color:var(--legal-ink)] sm:text-[2.25rem] lg:text-[2.5rem]">
                {title}
              </h1>
              <p
                className="mt-2 text-sm font-semibold sm:text-base"
                style={{ color: C.electricBlue }}
              >
                {subtitle}
              </p>
              <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-[color:var(--legal-fg)]/85">
                {description}
              </p>
            </div>

            <div className="space-y-12 px-6 py-10 sm:px-10 sm:py-12 lg:space-y-14 lg:px-12 lg:py-14">
              {children}
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-[#1D2939]/45">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#1D2939]/65">{BRAND.name}</span>
            . {BRAND.tagline}
          </p>
        </article>
      </div>
    </div>
  );
}
