"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Linkedin, Facebook, Youtube } from "lucide-react";
import { Eyebrow, FadeUp, GradientPillButton, SolidPillButton } from "./shared";
import { SITE_ROUTES, PRIVACY_POLICY_PATH } from "@/lib/site-links";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/gomogroup", Icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/gomogroup", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@gomogroup", Icon: Youtube },
];

const DEFAULT_OFFICES = [
  { city: "Gothenburg", address: "Lennart Torstenssonsgatan 8, 412 56 Göteborg" },
  { city: "London", address: "60 St Martins Lane, Covent Garden, London, WC2N 4JS" },
  { city: "Pune", address: "WeWork, Fourth Floor, Raheja Woods, Kalyani Nagar, Pune, Maharashtra 411006" },
  { city: "Stockholm", address: "Upplandsgatan 7, 111 23 Stockholm" },
];

const FOOTER_COLUMNS = [
  { heading: "About", links: [
    { label: "About us", href: SITE_ROUTES.about },
    { label: "Insights", href: SITE_ROUTES.blogs },
    { label: "Career", href: SITE_ROUTES.careers },
    { label: "Brand Guidelines", href: SITE_ROUTES.brand },
  ] },
  { heading: "Case", links: [
    { label: "Industrial Manufacturing (B2B E-Commerce)", href: SITE_ROUTES.blogs },
    { label: "FKAB (B2B SME)", href: SITE_ROUTES.blogs },
    { label: "Industrial Manufacturing (Enterprise)", href: SITE_ROUTES.blogs },
    { label: "Atlas Copco", href: SITE_ROUTES.blogs },
    { label: "All Cases", href: SITE_ROUTES.blogs },
  ] },
  { heading: "Solutions", links: [
    { label: "B2B Enterprise", href: SITE_ROUTES.about },
    { label: "B2B SaaS/Tech", href: SITE_ROUTES.about },
    { label: "B2B SME", href: SITE_ROUTES.about },
    { label: "Generative AI", href: SITE_ROUTES.about },
  ] },
  { heading: "Services", links: [
    { label: "GEO", href: SITE_ROUTES.about },
    { label: "Generative AI", href: SITE_ROUTES.about },
    { label: "SEO", href: SITE_ROUTES.about },
    { label: "SEM/SEA", href: SITE_ROUTES.about },
    { label: "B2B Lead Generation", href: SITE_ROUTES.about },
    { label: "Website Development", href: SITE_ROUTES.about },
    { label: "Website Design", href: SITE_ROUTES.about },
  ] },
];

function ContactForm({ content }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const [firstName, ...restName] = fullName.split(" ");
    const lastName = restName.join(" ") || firstName || "—";
    const email = String(form.get("email") || "").trim();
    const business = String(form.get("business") || "").trim();
    const contact = String(form.get("contact") || "").trim();
    const service = String(form.get("service") || "").trim();
    const note = String(form.get("message") || "").trim();

    const message = [
      service ? `Service: ${service}` : null,
      business ? `Business: ${business}` : null,
      contact ? `Contact: ${contact}` : null,
      note,
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName || fullName, lastName, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 rounded-lg bg-black/40 p-10 text-center text-white backdrop-blur-xl">
        <p className="text-xl font-semibold">Thanks — we&apos;ll be in touch shortly.</p>
        <p className="text-sm text-white/70">{content?.formSuccessSubtitle || "Our team typically replies within one business day."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-lg bg-black/40 p-8 sm:p-10 backdrop-blur-xl">
      <label className="flex flex-col gap-2 border-b border-white/25 pb-2 text-sm text-white/70">
        Choose your service *
        <select name="service" required className="bg-transparent text-base text-white outline-none [&>option]:text-black">
          <option value="">Select a service</option>
          <option>GEO</option>
          <option>SEO</option>
          <option>SEM/SEA</option>
          <option>B2B Lead Generation</option>
          <option>Website Development</option>
          <option>Website Design</option>
          <option>Generative AI</option>
        </select>
      </label>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 border-b border-white/25 pb-2 text-sm text-white/70">
          Full name *
          <input name="fullName" type="text" required className="bg-transparent text-base text-white outline-none placeholder:text-white/40" placeholder="Jane Doe" />
        </label>
        <label className="flex flex-col gap-2 border-b border-white/25 pb-2 text-sm text-white/70">
          Business *
          <input name="business" type="text" required className="bg-transparent text-base text-white outline-none placeholder:text-white/40" placeholder="Company name" />
        </label>
        <label className="flex flex-col gap-2 border-b border-white/25 pb-2 text-sm text-white/70">
          E-mail *
          <input name="email" type="email" required className="bg-transparent text-base text-white outline-none placeholder:text-white/40" placeholder="you@company.com" />
        </label>
        <label className="flex flex-col gap-2 border-b border-white/25 pb-2 text-sm text-white/70">
          Contact *
          <input name="contact" type="text" required className="bg-transparent text-base text-white outline-none placeholder:text-white/40" placeholder="Phone or preferred contact" />
        </label>
      </div>

      <label className="flex flex-col gap-2 border-b border-white/25 pb-2 text-sm text-white/70">
        Your Message *
        <textarea name="message" required rows={3} className="resize-none bg-transparent text-base text-white outline-none placeholder:text-white/40" placeholder="Tell us about your goals" />
      </label>

      {error ? <p className="text-sm text-[#ff5c7f]">{error}</p> : null}

      <SolidPillButton type="submit" className="w-fit disabled:opacity-60">
        {status === "loading" ? "Submitting…" : "Submit form"}
      </SolidPillButton>
    </form>
  );
}

export function FooterCta({ content }) {
  const offices = content?.offices?.length ? content.offices : DEFAULT_OFFICES;

  return (
    <section id="book-a-meeting" className="relative z-0 overflow-hidden border-t border-white/10 px-4 py-24 sm:px-6">
      <Image
        src="/assets/footer-bg.png"
        alt=""
        fill
        className="-z-10 object-cover"
        style={{ objectPosition: "50% 30%" }}
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-black/70" aria-hidden />

      <div className="relative mx-auto max-w-340">
        <FadeUp className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow className="mb-6">{content?.ctaEyebrow || "Get future-ready"}</Eyebrow>
            <h2 className="text-[clamp(2rem,6vw,5rem)] font-medium leading-[1.05] text-white">
              {content?.ctaHeadingPre || "Let's build "}
              <span
                className="bg-clip-text font-serif italic text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, rgb(143,56,248), rgb(189,39,246))" }}
              >
                {content?.ctaHeadingAccent1 || "what's next "}
              </span>
              <br className="hidden sm:block" />
              for <span className="font-serif italic text-[#5cffd3]">{content?.ctaHeadingAccent2 || "your growth."}</span>
            </h2>
          </div>
          <ContactForm content={content} />
        </FadeUp>

        <FadeUp delay={0.1} className="rounded-2xl bg-black/40 p-8 sm:p-16 backdrop-blur-xl realtive">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
            <div className="sm:col-span-2 lg:col-span-2">
              <Image src="/design/home/nav-logo.svg" alt="GOMO Group" width={94} height={24} className="h-6 w-auto" />
              <p className="mt-6 max-w-[20rem] text-base text-white/70">
                {content?.footerTagline ||
                  "Multi-market performance marketing, built to help brands grow, adapt and lead in the generative AI era."}
              </p>
              <GradientPillButton href={content?.footerCtaHref || "/company/contact"} className="mt-6">
                {content?.footerCtaLabel || "Start building"}
              </GradientPillButton>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {offices.map((office) => (
                  <div key={office.city} className="flex flex-col justify-between gap-3 rounded-lg border border-[#8e38f8] p-4">
                    <p className="text-base font-medium text-[#03ffff]">{office.city}</p>
                    <p className="text-sm text-white/70">{office.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="mb-6 text-sm uppercase tracking-[1.12px] text-white/70">{col.heading}</p>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-base text-white transition-colors hover:text-[#5cffd3]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-end lg:absolute right-13.75 bottom-33">
            <Image
              src={content?.partnerBadgesUrl || "/assets/partner-badges.png"}
              alt="2025 & 2026 Microsoft Advertising Elite Partner, Semrush Enterprise Partner, Google Partner, ahrefs, Apollo"
              width={768}
              height={318}
              className="h-auto w-full max-w-md rounded-lg"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white sm:flex-row">
            <p>{content?.footerCopyright || "Copyright © 2026 GO MO Group"}</p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/70 transition-colors hover:text-[#5cffd3]"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link href={PRIVACY_POLICY_PATH} className="hover:text-[#5cffd3]">Privacy Policy</Link>
              <span className="text-white/30" aria-hidden>|</span>
              <Link href={SITE_ROUTES.cookies} className="hover:text-[#5cffd3]">Cookie Policy</Link>
              <span className="text-white/30" aria-hidden>|</span>
              <Link href="/llms.txt" className="hover:text-[#5cffd3]">AI Agent Information</Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
