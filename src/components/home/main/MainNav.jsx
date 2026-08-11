"use client";

/** Nav pill with real per-item dropdown submenus + a separate floating "Contact Us" button, matching the Claude Design export's Nav component. */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { SITE_ROUTES } from "@/lib/site-links";
import { MainButton } from "@/components/home/main/MainButton";
import { MC_EASE } from "@/components/home/main/tokens";

const NAV_LINKS = [
  { label: "SOLUTIONS", items: ["B2B Enterprise", "B2B SaaS/Tech", "B2B SME", "Generative AI"] },
  { label: "SERVICES", items: ["GEO", "Generative AI", "SEO", "SEM/SEA", "B2B Lead Generation", "Website Development", "Website Design"] },
  { label: "GEO", items: ["What is GEO", "GEO Audit", "GEO Strategy"] },
  { label: "INSIGHTS", href: "#insights" },
  { label: "CASE", items: ["Industrial Manufacturing (B2B E-Commerce)", "FKAB (B2B SME)", "Industrial Manufacturing (Enterprise)", "Atlas Copco", "All Cases"] },
  { label: "ABOUT US", items: ["About us", "Career", "Brand Guidelines"] },
];

function NavItem({ item, open, onToggle }) {
  if (!item.items) {
    return (
      <Link href={item.href} className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/85 transition-colors hover:text-white">
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/85 transition-colors hover:text-white"
      >
        {item.label}
        <ChevronDown className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.5} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-[calc(100%+14px)] z-20 flex min-w-[220px] flex-col gap-0.5 rounded-xl bg-[#14141C]/98 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/15"
          >
            {item.items.map((sub) => (
              <Link key={sub} href="#" className="whitespace-nowrap rounded-lg px-3 py-2 text-sm text-white transition-colors hover:bg-white/10 hover:text-[#00DEFF]">
                {sub}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MainNav() {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (navRef.current && navRef.current.contains(e.target)) return;
      setOpen(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-6 sm:px-4">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 lg:px-[58px]">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: MC_EASE }}
          className="flex items-center gap-7 rounded-[34px] bg-white/20 px-8 py-3 backdrop-blur-xl"
        >
          <Link href={SITE_ROUTES.home} aria-label="GO MO Group — Home" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home-main/nav-logo.svg" alt="GO MO Group" className="h-6 w-auto" />
          </Link>
          <span className="hidden h-6 w-px shrink-0 bg-white/25 lg:block" aria-hidden />

          <nav ref={navRef} className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((item, i) => (
              <NavItem key={item.label} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: MC_EASE }}
          className="hidden lg:block"
        >
          <MainButton href={SITE_ROUTES.contact} className="px-8 py-3 text-sm">
            Contact Us
          </MainButton>
        </motion.div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xl lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: MC_EASE }}
            className="mx-auto mt-2 max-w-[1440px] overflow-hidden rounded-2xl bg-[#0A0F16]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm uppercase tracking-wide text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2">
                <MainButton href={SITE_ROUTES.contact} className="w-full justify-center px-8 py-3 text-sm">
                  Contact Us
                </MainButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
