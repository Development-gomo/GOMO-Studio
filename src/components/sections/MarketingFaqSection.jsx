"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";
import { SITE_ROUTES } from "@/lib/site-links";

const EASE = [0.22, 1, 0.36, 1];

/** items: MarketingFaqItem[] — { question, answer } */
export function MarketingFaqSection({
  items,
  title = "Frequently asked questions",
  subtitle = "Answers about GOMO Studio's features, integrations, and pricing.",
  id = "faq",
}) {
  if (!items.length) return null;

  return (
    <section id={id} className="py-8 md:py-12 px-4 bg-white dark:bg-[#0E0E14]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
          <p className="text-gray-500 dark:text-white/65">{subtitle}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          <Accordion items={items} />
        </motion.div>
        <p className="text-center text-sm text-gray-500 dark:text-white/55 mt-8">
          Still have questions?{" "}
          <Link
            href={SITE_ROUTES.contact}
            className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
          >
            Talk to our team
          </Link>
        </p>
      </div>
    </section>
  );
}
