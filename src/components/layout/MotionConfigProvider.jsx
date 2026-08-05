"use client";

/**
 * Respects OS "Reduce motion" — Framer animations shorten or disable automatically.
 */
import { MotionConfig } from "framer-motion";

export function MotionConfigProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
