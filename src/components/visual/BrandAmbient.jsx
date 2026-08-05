"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useAmbientLite() {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLite(coarse || narrow || reduced);
  }, []);

  return lite;
}

function themeParticleColors() {
  const isDark = document.documentElement.classList.contains("dark");
  return isDark
    ? { line: (a) => `rgba(201, 255, 51, ${a})`, node: "rgba(201, 255, 51, 0.55)" }
    : { line: (a) => `rgba(95, 143, 0, ${a})`, node: "rgba(95, 143, 0, 0.45)" };
}

/** Local particle mesh for hero sections. */
function AmbientCanvas({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let colors = themeParticleColors();

    const nodes = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      r: 1.2 + Math.random() * 2.2,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const observer = new MutationObserver(() => {
      colors = themeParticleColors();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.14;
            ctx.strokeStyle = colors.line(alpha);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = colors.node;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden />;
}

export function BrandAmbient({
  variant = "hero",
  className,
}) {
  const lite = useAmbientLite();

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {variant === "hero" && (
        <>
          <div className="ambient-orb ambient-orb-a opacity-80" />
          <div className="ambient-orb ambient-orb-b opacity-70" />
          {!lite ? <div className="ambient-mesh opacity-60" /> : null}
          {!lite ? <AmbientCanvas /> : null}
        </>
      )}
      {variant === "subtle" && (
        <>
          <div className="ambient-orb ambient-orb-c opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--ambient-orb-a),transparent_60%)]" />
        </>
      )}
      {variant === "footer" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_100%,var(--ambient-orb-b),transparent_65%)]" />
      )}
      <div className="ambient-grid absolute inset-0 opacity-60" />
    </div>
  );
}
