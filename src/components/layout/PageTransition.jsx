"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SAAS_EASE } from "@/lib/motion";

/** Soft route enter — remounts via `app/template.tsx` on every navigation. */
export function PageTransition({ children }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: SAAS_EASE }}
      className="min-h-0 w-full flex-1"
    >
      {children}
    </motion.div>
  );
}
