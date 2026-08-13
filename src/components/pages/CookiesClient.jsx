"use client";

import { SITE_ROUTES } from "@/lib/site-links";
import Link from "next/link";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";

/**
 * CookiesContentPreset shape (all fields required unless merged with COOKIES_DEFAULT_PRESET):
 * { kicker, pageTitle, lastUpdated, intro, toc: {id,title}[], whatHeading, whatBody,
 *   typesSectionHeading, cookieTypes: {name,description}[], whyHeading, whyIntro, whyList: string[],
 *   managingHeading, managingIntro, browserInstructions: {browser,steps}[], updatesHeading, updatesBody,
 *   contactHeading, contactLead, contactEmail }
 */
export const COOKIES_DEFAULT_PRESET = {
  kicker: "Legal",
  pageTitle: "Cookies Policy",
  lastUpdated: "Last Updated: August 04, 2026",
  intro:
    `This marketing site uses a small set of cookies and similar technologies. When you first visit, you can choose Essential only or Accept all in the banner; your choice is stored in your browser (local storage). For full details, read the sections below.`,
  toc: [
    { id: "what-are-cookies", title: "What Are Cookies?" },
    { id: "types", title: "Types of Cookies We Use" },
    { id: "why-we-use", title: "Why We Use Cookies" },
    { id: "managing", title: "Managing Your Preferences" },
    { id: "updates", title: "Updates to This Policy" },
    { id: "contact", title: "Contact Us" },
  ],
  whatHeading: "What Are Cookies?",
  whatBody:
    "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and provide a more personalized experience. Cookies can be temporary (session cookies) or stored on your device for a longer period (persistent cookies).",
  typesSectionHeading: "Types of Cookies We Use",
  cookieTypes: [
    {
      name: "Essential Cookies",
      description:
        "These cookies are necessary for the platform to function properly. They enable core features such as admin login and session security.",
    },
    {
      name: "Performance Cookies",
      description:
        "These cookies collect information about how users interact with our platform. We use this data to improve functionality and optimize the editor experience.",
    },
    {
      name: "Functional Cookies",
      description:
        "These cookies remember your preferences, such as theme or dashboard layout, to make your experience more personalized.",
    },
    {
      name: "Marketing Cookies",
      description:
        "These cookies help us deliver relevant marketing content and measure the effectiveness of our campaigns.",
    },
  ],
  whyHeading: "Why We Use Cookies",
  whyIntro: "We use cookies to:",
  whyList: [
    "Enable core functionality, such as secure admin login and navigation.",
    "Analyze how users engage with our platform to improve performance.",
    "Remember user preferences for a personalized experience.",
    "Deliver relevant marketing content across our own pages.",
  ],
  managingHeading: "Managing Your Cookie Preferences",
  managingIntro:
    "You have control over how cookies are used. Most web browsers allow you to manage or disable cookies through their settings. Please note that disabling essential cookies may affect the platform's functionality. To manage cookies in your browser:",
  browserInstructions: [
    { browser: "Chrome", steps: "Settings → Privacy and Security → Cookies and other site data" },
    { browser: "Firefox", steps: "Preferences → Privacy & Security → Cookies and Site Data" },
    { browser: "Safari", steps: "Preferences → Privacy → Manage Website Data" },
  ],
  updatesHeading: "Updates to This Policy",
  updatesBody:
    "We may update this Cookies Policy to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and we encourage you to review the policy periodically.",
  contactHeading: "Contact Us",
  contactLead: "If you have questions or concerns about our use of cookies, please contact us at:",
  contactEmail: "hello@gomostudio.app",
};

export function CookiesClient({ content }) {
  const c = { ...COOKIES_DEFAULT_PRESET, ...content };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black pb-20 pt-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 90% 0%, rgba(38,141,229,0.18) 0%, transparent 65%), radial-gradient(45% 40% at 5% 30%, rgba(189,39,246,0.16) 0%, transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#5cffd3]">
            {c.kicker}
          </span>
          <h1 className="mb-3 text-4xl font-bold leading-tight text-white sm:text-5xl">{c.pageTitle}</h1>
          <p className="text-sm text-white/40">{c.lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/45">Contents</p>
              <nav className="space-y-1">
                {c.toc.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block border-l-2 border-transparent py-1 pl-2 text-sm text-white/55 transition-colors hover:border-[#5cffd3] hover:text-[#5cffd3]"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="space-y-10 lg:col-span-3">
            <p className="leading-relaxed text-white/65">{c.intro}</p>

            <div id="what-are-cookies" className="scroll-mt-28">
              <h2 className="mb-3 text-xl font-bold text-white">{c.whatHeading}</h2>
              <p className="leading-relaxed text-white/65">{c.whatBody}</p>
              <hr className="mt-8 border-white/10" />
            </div>

            <div id="types" className="scroll-mt-28">
              <h2 className="mb-5 text-xl font-bold text-white">{c.typesSectionHeading}</h2>
              <div className="space-y-4">
                {c.cookieTypes.map((type) => (
                  <div key={type.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="mb-2 font-semibold text-white">{type.name}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{type.description}</p>
                  </div>
                ))}
              </div>
              <hr className="mt-8 border-white/10" />
            </div>

            <div id="why-we-use" className="scroll-mt-28">
              <h2 className="mb-3 text-xl font-bold text-white">{c.whyHeading}</h2>
              <p className="mb-4 text-white/65">{c.whyIntro}</p>
              <ul className="space-y-2">
                {c.whyList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5cffd3]" />
                    {item}
                  </li>
                ))}
              </ul>
              <hr className="mt-8 border-white/10" />
            </div>

            <div id="managing" className="scroll-mt-28">
              <h2 className="mb-3 text-xl font-bold text-white">{c.managingHeading}</h2>
              <p className="mb-5 leading-relaxed text-white/65">{c.managingIntro}</p>
              <div className="space-y-3">
                {c.browserInstructions.map((b) => (
                  <div key={b.browser} className="flex items-start gap-3 text-sm">
                    <span className="w-16 shrink-0 font-bold text-[#268de5]">{b.browser}:</span>
                    <span className="text-white/60">Go to {b.steps}</span>
                  </div>
                ))}
              </div>
              <hr className="mt-8 border-white/10" />
            </div>

            <div id="updates" className="scroll-mt-28">
              <h2 className="mb-3 text-xl font-bold text-white">{c.updatesHeading}</h2>
              <p className="leading-relaxed text-white/65">{c.updatesBody}</p>
              <hr className="mt-8 border-white/10" />
            </div>

            <div id="contact" className="scroll-mt-28">
              <h2 className="mb-3 text-xl font-bold text-white">{c.contactHeading}</h2>
              <p className="leading-relaxed text-white/65">
                {c.contactLead}{" "}
                <a href={`mailto:${c.contactEmail}`} className="font-medium text-[#5cffd3] transition-colors hover:text-white">
                  {c.contactEmail}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm text-white/35">
              <Link href={PRIVACY_POLICY_PATH} className="transition-colors hover:text-[#5cffd3]">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href={TERMS_OF_SERVICE_PATH} className="transition-colors hover:text-[#5cffd3]">
                Terms of Service
              </Link>
              <span>·</span>
              <Link href={SITE_ROUTES.contact} className="transition-colors hover:text-[#5cffd3]">
                Contact Us
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
