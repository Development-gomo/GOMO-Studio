"use client";

/** Animated stat counters for social proof on the home page. */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpChild, viewportOnce } from "@/lib/motion";

const STATS = [
  { end: 2000, suffix: "+",  label: "teams using GOMO Studio", decimal: false },
  { end: 500,  suffix: "K+", label: "AI generations shipped",  decimal: false },
  { end: 94,   suffix: "%",  label: "faster than manual publishing", decimal: false },
  { end: 4.9,  suffix: "★",  label: "average customer rating",   decimal: true  },
];

function StatItem({ end, suffix, label, decimal, active }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const startTime = performance.now();
    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * end);
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [active, end]);

  const display = decimal ? val.toFixed(1) : Math.floor(val).toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-6">
      <p className="mb-2 text-4xl font-black tabular-nums text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
        {display}{suffix}
      </p>
      <p className="text-sm text-gray-500 dark:text-white/62 max-w-[120px] leading-snug">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-6 md:py-10 px-4 border-y border-gray-100 dark:border-white/[0.05] bg-white dark:bg-[#0E0E14]">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-gray-100 dark:divide-white/[0.06]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUpChild} className="flex justify-center">
            <StatItem {...s} active={active} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
