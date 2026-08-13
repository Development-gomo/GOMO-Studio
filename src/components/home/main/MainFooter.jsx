"use client";

/** "Get Future-Ready" CTA + contact form + office cards with live analog clocks, then the classic footer panel. */
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Youtube } from "lucide-react";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { MainButton } from "@/components/home/main/MainButton";
import { SITE_ROUTES } from "@/lib/site-links";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { mcFadeUp, mcStagger, mcViewport, MC } from "@/components/home/main/tokens";

const DEFAULT_OFFICES = [
  { city: "Gothenburg", address: "Lennart Torstenssonsgatan 8, 412 56 Göteborg", tz: "Europe/Stockholm" },
  { city: "Pune", address: "WeWork, Fourth Floor, Raheja Woods, Kalyani Nagar, Pune, Maharashtra 411006", tz: "Asia/Kolkata" },
  { city: "London", address: "60 St Martins Lane, Covent Garden, London, WC2N 4JS", tz: "Europe/London" },
  { city: "Stockholm", address: "Upplandsgatan 7, 111 23 Stockholm", tz: "Europe/Stockholm" },
];

const DEFAULT_LINK_COLUMNS = [
  {
    title: "ABOUT",
    links: [
      { label: "About us", href: SITE_ROUTES.about },
      { label: "Insights", href: SITE_ROUTES.blogs },
      { label: "Career", href: SITE_ROUTES.careers },
      { label: "Brand Guidelines", href: SITE_ROUTES.brand },
    ],
  },
  {
    title: "CASE",
    links: [
      { label: "Industrial Manufacturing (B2B E-Commerce)", href: "#case-studies" },
      { label: "FKAB (B2B SME)", href: "#case-studies" },
      { label: "Industrial Manufacturing (Enterprise)", href: "#case-studies" },
      { label: "Atlas Copco", href: "#case-studies" },
      { label: "All Cases →", href: "#case-studies" },
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      { label: "B2B Enterprise", href: "#icp-segments" },
      { label: "B2B SaaS/Tech", href: "#icp-segments" },
      { label: "B2B SME", href: "#icp-segments" },
      { label: "Generative AI", href: "#icp-segments" },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { label: "GEO", href: "#services" },
      { label: "Generative AI", href: "#services" },
      { label: "SEO", href: "#services" },
      { label: "SEM/SEA", href: "#services" },
      { label: "B2B Lead Generation", href: "#services" },
      { label: "Website Development", href: "#services" },
      { label: "Website Design", href: "#services" },
    ],
  },
];

const SERVICE_OPTIONS = ["GEO", "SEO", "SEM/SEA", "Generative AI", "B2B Lead Generation", "Website Development", "Website Design"];

function AnalogClock({ tz }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <span className="h-8 w-8 shrink-0 rounded-full border border-[#8F38F8]" aria-hidden />;
  }

  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: false, hour: "numeric", minute: "numeric" }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour").value) % 12;
  const m = Number(parts.find((p) => p.type === "minute").value);
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6;

  return (
    <span className="relative h-8 w-8 shrink-0 rounded-full border border-[#8F38F8]" aria-hidden>
      <span className="absolute left-1/2 top-1/2 h-2 w-[1.5px] -translate-x-1/2 -translate-y-full origin-bottom rounded-full bg-white" style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
      <span className="absolute left-1/2 top-1/2 h-[11px] w-[1.5px] -translate-x-1/2 -translate-y-full origin-bottom rounded-full bg-white" style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }} />
    </span>
  );
}

function OfficeCard({ office }) {
  return (
    <div
      className="flex flex-col justify-between gap-4 rounded-lg border border-[#8F38F8]/50 p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-base font-medium text-[#00DEFF]">{office.city}</span>
        <AnalogClock tz={office.tz} />
      </div>
      <p className="text-sm leading-relaxed text-white/70">{office.address}</p>
    </div>
  );
}

function ContactForm({ serviceOptions, submitLabel }) {
  const [values, setValues] = useState({ service: "", fullName: "", business: "", email: "", contact: "", message: "" });
  const [status, setStatus] = useState("idle");

  function set(id) {
    return (e) => setValues((v) => ({ ...v, [id]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const [firstName, ...restName] = values.fullName.trim().split(" ");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || values.fullName,
          lastName: restName.join(" "),
          email: values.email,
          message: `Service: ${values.service}\nBusiness: ${values.business}\nContact: ${values.contact}\n\n${values.message}`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-2 w-full border-b border-white/25 bg-transparent pb-2 text-white placeholder:text-white/70 focus:border-[#00DEFF] focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-white/[0.17] p-8 backdrop-blur-[28px] sm:p-10">
      <div className="flex flex-col gap-8">
        <div>
          <select required value={values.service} onChange={set("service")} className={`${fieldClass} appearance-none`}>
            <option value="" disabled>
              Choose your service*
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0a0a12] text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <input required placeholder="Full name *" value={values.fullName} onChange={set("fullName")} className={fieldClass} />
          </div>
          <div>
            <input required placeholder="Business *" value={values.business} onChange={set("business")} className={fieldClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <input required type="email" placeholder="E-mail *" value={values.email} onChange={set("email")} className={fieldClass} />
          </div>
          <div>
            <input required type="tel" placeholder="Contact *" value={values.contact} onChange={set("contact")} className={fieldClass} />
          </div>
        </div>
        <div>
          <textarea required rows={1} placeholder="Your Message *" value={values.message} onChange={set("message")} className={`${fieldClass} resize-none`} />
        </div>
        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-[#030CF4] px-9 py-3.5 font-[family-name:var(--font-merriweather)] text-base italic text-white transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(142,56,248,0.5)] disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : status === "success" ? "Thank you!" : submitLabel}
          </button>
          {status === "error" && <p className="mt-3 text-sm text-[#FF5C7F]">Something went wrong. Please try again.</p>}
        </div>
      </div>
    </form>
  );
}

export function MainFooter({ content }) {
  const year = new Date().getFullYear();
  const eyebrow = content?.footerEyebrow || "Get Future-Ready";
  const headingPlain1 = content?.footerHeadingPlain1 || "Let’s build";
  const headingGrad = content?.footerHeadingGrad || "what’s next";
  const headingPlain2 = content?.footerHeadingPlain2 || "for";
  const headingEm = content?.footerHeadingEm || "your growth.";
  const ctaLabel = content?.footerCtaLabel || "Start building";
  const offices = content?.footerOfficesList?.length ? content.footerOfficesList : DEFAULT_OFFICES;
  const tagline =
    content?.footerTagline ||
    "Multi-market performance marketing, built to help brands grow, adapt and lead in the generative AI era.";
  const linkColumns = content?.footerLinkColumnsList?.length ? content.footerLinkColumnsList : DEFAULT_LINK_COLUMNS;
  const copyrightSuffix = content?.footerCopyrightSuffix || "GO MO Group";
  const serviceOptions = content?.footerServiceOptions?.length ? content.footerServiceOptions : SERVICE_OPTIONS;
  const submitLabel = content?.footerSubmitLabel || "Submit form";

  return (
    <footer className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home-main/footer-bg.png" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070C11] to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcStagger}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[606fr_545fr] lg:gap-16">
          <motion.div variants={mcFadeUp}>
            <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
            <h2 className="font-[family-name:var(--font-merriweather)] text-4xl italic leading-[1.15] text-white sm:text-5xl lg:text-[80px] lg:leading-[90px]">
              <span className="not-italic font-medium">{headingPlain1} </span>
              <span style={{ background: MC.headingGradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                {headingGrad}
              </span>
              <br />
              <span className="not-italic font-medium">{headingPlain2} </span>
              <span className="text-[#5CFFD3]">{headingEm}</span>
            </h2>

            <div className="mt-10">
              <MainButton href={SITE_ROUTES.contact} variant="gradient">
                {ctaLabel}
              </MainButton>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
              {offices.map((office) => (
                <OfficeCard key={office.city} office={office} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={mcFadeUp}>
            <ContactForm serviceOptions={serviceOptions} submitLabel={submitLabel} />
          </motion.div>
        </div>

        <motion.div variants={mcFadeUp} className="mt-16 rounded-2xl bg-white/[0.17] p-8 backdrop-blur-[28px] sm:p-12">
          <div className="flex flex-col gap-10 border-b border-white/20 pb-10 lg:flex-row lg:justify-between">
            <div className="max-w-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home-main/footer-logo.svg" alt="GO MO Group" className="h-[60px] w-auto" />
              <p className="mt-6 text-base leading-relaxed text-white/70">{tagline}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {linkColumns.map((col) => (
                <div key={col.title}>
                  <p className="mb-8 text-sm uppercase tracking-[0.08em] text-white/70">{col.title}</p>
                  <ul className="space-y-3.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-base leading-snug text-white transition-colors hover:text-[#00DEFF]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 pt-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <p className="text-sm text-white">Copyright © {year} {copyrightSuffix}</p>
              <nav aria-label="Legal" className="flex flex-wrap items-center text-sm text-white">
                <Link href={PRIVACY_POLICY_PATH} className="border-l border-white/40 px-2.5 hover:text-[#00DEFF]">
                  Privacy Policy
                </Link>
                <Link href={SITE_ROUTES.cookies} className="border-l border-white/40 px-2.5 hover:text-[#00DEFF]">
                  Cookie Policy
                </Link>
                <Link href={TERMS_OF_SERVICE_PATH} className="border-l border-white/40 px-2.5 hover:text-[#00DEFF]">
                  AI Agent Information
                </Link>
              </nav>
            </div>

            <div className="flex gap-2.5">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/5 text-white shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.2)] transition-colors hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/5 text-white shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.2)] transition-colors hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/5 text-white shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.2)] transition-colors hover:bg-white/10">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
