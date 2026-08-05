"use client";

import { SITE_ROUTES } from "@/lib/site-links";
import Link from "next/link";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { BRAND } from "@/lib/brand";

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
    `You have control over how cookies are used. Most web browsers allow you to manage or disable cookies through their settings. Please note that disabling essential cookies may affect the functionality of ${BRAND.name}. To manage cookies in your browser:`,
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
    <div className="min-h-screen bg-white dark:bg-[#0C0C12] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            {c.kicker}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{c.pageTitle}</h1>
          <p className="text-gray-400 dark:text-white/40 text-sm">{c.lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-[#f0f1f5] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07] p-5">
              <p className="text-gray-400 dark:text-white/45 text-xs font-bold uppercase tracking-widest mb-4">Contents</p>
              <nav className="space-y-1">
                {c.toc.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-gray-500 dark:text-white/50 hover:text-brand-600 dark:hover:text-brand-300 text-sm transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-brand-400"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="lg:col-span-3 space-y-10">
            <p className="text-gray-600 dark:text-white/65 leading-relaxed">{c.intro}</p>

            <div id="what-are-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.whatHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">{c.whatBody}</p>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="types" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">{c.typesSectionHeading}</h2>
              <div className="space-y-4">
                {c.cookieTypes.map((type) => (
                  <div
                    key={type.name}
                    className="rounded-xl border border-gray-100 dark:border-white/[0.07] bg-[#f0f1f5] dark:bg-white/[0.03] p-5"
                  >
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="why-we-use" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.whyHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 mb-4">{c.whyIntro}</p>
              <ul className="space-y-2">
                {c.whyList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-white/65 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="managing" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.managingHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 mb-5 leading-relaxed">{c.managingIntro}</p>
              <div className="space-y-3">
                {c.browserInstructions.map((b) => (
                  <div key={b.browser} className="flex items-start gap-3 text-sm">
                    <span className="text-brand-600 dark:text-brand-400 font-bold w-16 shrink-0">{b.browser}:</span>
                    <span className="text-gray-500 dark:text-white/60">Go to {b.steps}</span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="updates" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.updatesHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">{c.updatesBody}</p>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="contact" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.contactHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">
                {c.contactLead}{" "}
                <a
                  href={`mailto:${c.contactEmail}`}
                  className="text-brand-600 dark:text-brand-400 hover:text-brand-300 dark:hover:text-brand-300 transition-colors font-medium"
                >
                  {c.contactEmail}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 dark:text-white/35 pt-4">
              <Link
                href={PRIVACY_POLICY_PATH}
                className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>·</span>
              <Link
                href={TERMS_OF_SERVICE_PATH}
                className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
              >
                Terms of Service
              </Link>
              <span>·</span>
              <Link href={SITE_ROUTES.contact} className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                Contact Us
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
