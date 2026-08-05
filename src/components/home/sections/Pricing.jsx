"use client";

/** Home pricing section — shares plan data with /pricing page. */
import { SITE_ROUTES } from "@/lib/site-links";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SAAS_EASE as EASE,
  staggerContainer,
  fadeUpChild,
  viewportOnce,
  springCard,
} from "@/lib/motion";
import { PRICING_PLANS } from "@/lib/pricing-data";

export function Pricing({ content }) {
  return (
    <section
      id="pricing"
      className="scroll-mt-28 py-8 md:py-12 px-4 bg-white dark:bg-[#0C0C12]"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            {content?.eyebrow || "Pricing"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content?.title || "Simple, transparent pricing"}
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-white/55">
            <Link href={SITE_ROUTES.pricing} className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              View full pricing details →
            </Link>
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-5 items-stretch"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              variants={fadeUpChild}
              layout
              whileHover={{ y: -5, transition: springCard }}
              whileTap={{ scale: 0.992 }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.featured
                  ? "bg-white dark:bg-[#16161D] border-2 border-brand-500 dark:border-brand-500/50 shadow-xl shadow-brand-500/10 dark:shadow-brand-500/15"
                  : plan.isEnterprise
                    ? "bg-[#F8F7FF] dark:bg-[#13131E] border border-brand-100 dark:border-brand-500/15"
                    : "bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm"
              }`}
            >
              {plan.badge ? (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold bg-brand-600 text-brand-lime uppercase tracking-widest whitespace-nowrap shadow-md shadow-brand-600/25">
                  {plan.badge}
                </div>
              ) : null}

              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3">
                {plan.name}
              </p>

              <div className="mb-1 min-h-[44px] flex flex-col justify-center">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                  {plan.priceLabel}
                </span>
                <span className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {plan.priceSubtext}
                </span>
              </div>

              <p className="text-sm text-gray-500 dark:text-white/65 mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <svg
                      className={
                        plan.featured
                          ? "text-brand-500"
                          : plan.isEnterprise
                            ? "text-brand-400"
                            : "text-brand-600 dark:text-brand-400"
                      }
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-white/72">{f}</span>
                  </div>
                ))}
              </div>

              {plan.ctaHref.startsWith("http") ? (
                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${plan.cta} — ${plan.name} (opens in new tab)`}
                  className={`mt-auto block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.featured
                      ? "btn-brand-primary shadow-lg"
                      : plan.isEnterprise
                        ? "bg-transparent text-brand-700 dark:text-brand-300 border-2 border-brand-600/25 dark:border-brand-500/30 hover:bg-brand-50 dark:hover:bg-brand-500/10"
                        : "btn-brand-primary shadow-md"
                  }`}
                >
                  {plan.cta}
                </a>
              ) : (
                <Link
                  href={plan.ctaHref}
                  aria-label={`${plan.cta} — ${plan.name}`}
                  className={`mt-auto block text-center py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.featured
                      ? "btn-brand-primary shadow-lg"
                      : plan.isEnterprise
                        ? "bg-transparent text-brand-700 dark:text-brand-300 border-2 border-brand-600/25 dark:border-brand-500/30 hover:bg-brand-50 dark:hover:bg-brand-500/10"
                        : "btn-brand-primary shadow-md"
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
