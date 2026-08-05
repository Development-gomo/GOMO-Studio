"use client";

/**
 * Primary nav + mobile menu: optional `NavbarConfig`, else fallback links (Capabilities dropdown).
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn, isExternalNavigationHref } from "@/lib/utils";
import { CAPABILITY_LIST } from "@/lib/capabilities";
import { SITE_ROUTES, MARKETING_CTAS } from "@/lib/site-links";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { GomoLogo } from "@/components/layout/GomoLogo";

const fallbackNavigation = [
  {
    label: "Capabilities",
    href: "#",
    children: CAPABILITY_LIST.map((capability) => ({
      label: capability.shortName,
      href: capability.path,
      description: capability.tagline,
    })),
  },
  { label: "Pricing", href: SITE_ROUTES.pricing },
  { label: "Features", href: SITE_ROUTES.features },
  { label: "About", href: SITE_ROUTES.about },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Integrations", href: SITE_ROUTES.integrations, description: "Connect with your favorite tools" },
      { label: "Blogs", href: SITE_ROUTES.blogs, description: "Guides on AI content, editing, and publishing" },
      { label: "Careers", href: SITE_ROUTES.careers, description: "Join the GOMO Studio team" },
    ],
  },
];

export function Navbar({ config, preview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  const navigation = config?.links?.length ? config.links : fallbackNavigation;
  const loginLabel = config?.loginLabel || MARKETING_CTAS.login.label;
  const loginHref = config?.loginHref || MARKETING_CTAS.login.href;
  const loginIsExternal = isExternalNavigationHref(loginHref);
  const primaryCtaLabel = config?.primaryCtaLabel || MARKETING_CTAS.signup.label;
  const primaryCtaHref = config?.primaryCtaHref || MARKETING_CTAS.signup.href;
  const primaryCtaIsExternal = isExternalNavigationHref(primaryCtaHref);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "z-50 px-3 pt-2 sm:px-4 sm:pt-3 md:pt-4",
        preview ? "relative w-full" : "fixed left-0 right-0 top-0",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-2xl transition-all duration-300",
          preview || scrolled
            ? "border border-gray-200/90 bg-white/92 shadow-lg shadow-black/6 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0f0f0f]/92 dark:shadow-black/40"
            : "border border-transparent bg-white/60 backdrop-blur-md dark:bg-[#0f0f0f]/55"
        )}
      >
        <nav className="px-4 sm:px-6">
          <div className="flex h-[3.25rem] items-center justify-between">
            <Link href="/" className="flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]" aria-label="GOMO Studio — Home">
              <GomoLogo variant="full" />
            </Link>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navigation.map((item) =>
                item.children && item.children.length > 0 ? (
                  <div
                    key={`${item.label}-${item.href}`}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                        "text-gray-600 hover:bg-black/5 hover:text-gray-900",
                        "dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} aria-hidden />
                    </button>
                    <div
                      className={cn(
                        "absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 transition-all duration-200",
                        activeDropdown === item.label ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
                      )}
                    >
                      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white p-2 shadow-xl shadow-black/10 dark:border-white/[0.07] dark:bg-[#18181F] dark:shadow-black/60">
                        {item.children.map((child) => (
                          <Link
                            key={`${child.label}-${child.href}`}
                            href={child.href}
                            className="group flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            <span className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                              {child.label}
                            </span>
                            {child.description && <span className="text-xs text-gray-400 dark:text-white/58">{child.description}</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-brand-50 text-brand-600 dark:bg-brand-600/10 dark:text-brand-300"
                        : "text-gray-600 hover:bg-black/5 hover:text-gray-900 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <ThemeToggle />
              {loginIsExternal ? (
                <a
                  href={loginHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-gray-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 dark:border-white/15 dark:bg-transparent dark:text-white/70 dark:hover:border-white/25 dark:hover:bg-white/5 dark:hover:text-white"
                  aria-label={`${loginLabel} (opens in new tab)`}
                >
                  {loginLabel}
                </a>
              ) : (
                <Link
                  href={loginHref}
                  className="rounded-xl border border-gray-200 bg-white/60 px-4 py-1.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 dark:border-white/15 dark:bg-transparent dark:text-white/70 dark:hover:border-white/25 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {loginLabel}
                </Link>
              )}
              {primaryCtaIsExternal ? (
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand-primary rounded-xl px-4 py-1.5 text-sm shadow-sm"
                  aria-label={`${primaryCtaLabel} (opens in new tab)`}
                >
                  {primaryCtaLabel}
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  className="btn-brand-primary rounded-xl px-4 py-1.5 text-sm shadow-sm"
                  aria-label={primaryCtaLabel}
                >
                  {primaryCtaLabel}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="touch-target flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 lg:hidden",
            isOpen ? "max-h-[min(85dvh,32rem)] overflow-y-auto overscroll-contain" : "max-h-0",
          )}
        >
          <div className="space-y-0.5 border-t border-black/6 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1 dark:border-white/6 sm:px-4">
            {navigation.map((item) =>
              item.children && item.children.length > 0 ? (
                <div key={`${item.label}-${item.href}`}>
                  <button
                    type="button"
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                    className="flex w-full min-h-[44px] items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === item.label && "rotate-180")} aria-hidden />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          className="flex min-h-[44px] items-center rounded-xl px-3 py-3 text-sm text-gray-500 transition-colors hover:bg-black/5 hover:text-gray-900 dark:text-white/55 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                          <span className="flex flex-wrap items-center gap-2">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={cn(
                    "flex min-h-[44px] items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-600/10 dark:text-brand-300"
                      : "text-gray-600 hover:bg-black/5 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-black/6 pt-3 dark:border-white/6">
              {loginIsExternal ? (
                <a
                  href={loginHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                  aria-label={`${loginLabel} (opens in new tab)`}
                >
                  {loginLabel}
                </a>
              ) : (
                <Link
                  href={loginHref}
                  className="w-full rounded-xl border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  {loginLabel}
                </Link>
              )}
              {primaryCtaIsExternal ? (
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand-primary w-full rounded-xl py-2.5 text-center text-sm"
                  aria-label={`${primaryCtaLabel} (opens in new tab)`}
                >
                  {primaryCtaLabel}
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  className="btn-brand-primary w-full rounded-xl py-2.5 text-center text-sm"
                  aria-label={primaryCtaLabel}
                >
                  {primaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
