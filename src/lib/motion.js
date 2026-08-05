/**
 * Shared Framer Motion tokens for marketing pages — premium SaaS feel, consistent easing.
 * Pair with <MotionConfig reducedMotion="user"> in the root layout.
 */
export const SAAS_EASE = [0.22, 1, 0.36, 1];

export const viewportOnce = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -12% 0px",
};

export const viewportOnceTight = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
};

/** Stagger container: use initial="hidden" whileInView="show" */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

/** Child of staggerContainer */
export const fadeUpChild = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: SAAS_EASE },
  },
};

export const scaleInChild = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: SAAS_EASE },
  },
};

export const springSoft = { type: "spring", stiffness: 380, damping: 28 };
export const springCard = { type: "spring", stiffness: 420, damping: 32 };
