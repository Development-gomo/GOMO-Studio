"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SolidPillButton } from "./shared";
import { SITE_ROUTES } from "@/lib/site-links";

const NAV_LINKS = [
  { label: "Solutions", hasChevron: true },
  { label: "Services", hasChevron: true },
  { label: "GEO", hasChevron: true },
  { label: "Insights", hasChevron: false, href: "/resources/blogs" },
  { label: "Case", hasChevron: true },
  { label: "About Us", hasChevron: true, href: "/company/about-us" },
];

export function AgencyNav({ content }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-6 sm:px-6">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6">
        <nav className="flex flex-1 items-center gap-6 rounded-[34px] bg-white/20 px-5 py-3 backdrop-blur-md">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="GOMO Group home">
            <Image
              src={content?.navLogoUrl || "/design/home/nav-logo.svg"}
              alt="GOMO Group"
              width={94}
              height={24}
              className="h-6 w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href || "#"}
                className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white/90 transition-colors hover:text-white"
              >
                {link.label}
                {link.hasChevron ? <ChevronDown className="h-2.5 w-2.5" aria-hidden /> : null}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto rounded-full p-2 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <div className="hidden shrink-0 lg:block">
          <SolidPillButton href={content?.navCtaHref || SITE_ROUTES.contact} className="px-8 py-3 text-sm">
            {content?.navCtaLabel || "Contact Us"}
          </SolidPillButton>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 flex max-w-[1240px] flex-col gap-1 rounded-3xl bg-black/90 p-4 backdrop-blur-md lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href || "#"}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium uppercase tracking-wide text-white/90 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <SolidPillButton
            href={content?.navCtaHref || SITE_ROUTES.contact}
            className="mt-2 w-full py-3 text-sm"
          >
            {content?.navCtaLabel || "Contact Us"}
          </SolidPillButton>
        </div>
      ) : null}
    </header>
  );
}
