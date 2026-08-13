"use client";

/** About page: mission, values, timeline-style story, CTA. */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FileText, Users, Zap, Target, Globe, Award, ArrowRight } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { STUDIO_LOGIN_PATH } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { resolveBottomCtas } from "@/lib/cms/resolve-page-ctas";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.65, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

const stats = [
  { value:"10M+",  label:"Words AI-Generated", icon:FileText, end:10,  suffix:"M+", isFloat:true, accent:"#5cffd3"  },
  { value:"2,000+", label:"Active Teams",          icon:Users,    end:2000, suffix:"+",  isFloat:false, accent:"#bd27f6" },
  { value:"99.9%",  label:"Platform Uptime",       icon:Zap,      end:99.9, suffix:"%",  isFloat:true, accent:"#268de5"  },
];

const milestones = [
  { year:"2024", title:"Founded",          desc:"Started with a simple idea — managing your website's content shouldn't require a developer.",  icon:Target },
  { year:"2025", title:"First 500 Teams",  desc:"Reached 500 active teams publishing pages and posts with GOMO Studio.",     icon:Users  },
  { year:"2025", title:"AI Content Launch",     desc:"Shipped AI Content Generation, letting anyone draft and rewrite copy in plain English.",      icon:Globe  },
  { year:"2026", title:"Industry Recognition",  desc:"Recognized as a leading quick CMS for teams who ship copy changes fast.",    icon:Award  },
];

/** AboutContentPreset (all optional): heroBadge, heroTitleLine1/2, heroSubtitle, storyBadge, storyTitle, ctaTitle/Subtitle, ctaPrimary/SecondaryLabel/Href */

function CountUp({ end, suffix, isFloat }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const dur = 1600;
      const frame = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(isFloat ? Math.round(eased * end * 10) / 10 : Math.round(eased * end));
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, isFloat]);
  return <span ref={ref}>{isFloat ? (value % 1 === 0 ? value + ".0" : value) : value.toLocaleString()}{suffix}</span>;
}

export function AboutClient({ content }) {
  const heroBadge = content?.heroBadge ?? "Our Story";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "Reimagining How";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Websites Get Edited";
  const heroSubtitle =
    content?.heroSubtitle ??
    "At GOMO Studio, we're passionate about building tools that let anyone manage their website's content — no developer required.";
  const storyBadge = content?.storyBadge ?? "How It All Started";
  const storyTitle = content?.storyTitle ?? "Built by builders, for builders";
  const bottomCtas = resolveBottomCtas(content, {
    primary: { label: "Get started", href: STUDIO_LOGIN_PATH },
    secondary: { label: "Book a demo", href: SITE_ROUTES.contact },
  });
  return (
    <div className="bg-black">
      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: "radial-gradient(50% 45% at 25% 0%, rgba(189,39,246,0.2) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/[0.04] text-[#5cffd3] border border-white/10 mb-6">
            <Globe className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-white mb-6">
            {heroTitleLine1} <span className="font-serif italic text-[#ff28bc]">{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="py-8 md:py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(s=>(
              <motion.div key={s.label} variants={fadeUp}
                className="flex items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.accent}1a`, borderColor: `${s.accent}33` }}>
                  <s.icon className="w-6 h-6" style={{ color: s.accent }} />
                </div>
                <div>
                  <div className="text-3xl font-black font-serif italic" style={{ color: s.accent }}><CountUp end={s.end} suffix={s.suffix} isFloat={s.isFloat}/></div>
                  <div className="text-white/55 text-sm">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY ───────────────────────────────── */}
      <section className="relative py-8 md:py-12 px-4 overflow-hidden border-t border-white/10">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: "radial-gradient(50% 50% at 100% 50%, rgba(38,141,229,0.16) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/[0.04] text-[#5cffd3] border border-white/10 mb-4">{storyBadge}</span>
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{storyTitle}</h2>
              <p className="text-white/65 leading-relaxed mb-4">
                GOMO Studio was founded with a simple idea: managing your website&apos;s content shouldn&apos;t require a developer or a deploy. Frustrated with clunky CMS tools and markdown files scattered across a repo, our founders set out to build a visual editor that anyone on the team could use.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                Today, GOMO Studio is trusted by solo builders and small teams around the world to draft, preview, and publish copy changes in minutes — not sprints. AI Content Generation, a structured Visual Editor, and a Publishing Workflow turn a blank page into a shipped update.
              </p>
              <a href={SITE_ROUTES.contact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-serif italic text-white bg-[#030cf4] shadow-lg transition-all duration-200 hover:scale-[1.02]">
                Get in touch <ArrowRight className="w-4 h-4"/>
              </a>
            </motion.div>
            {/* Timeline — rail centered on icon column (w-10), one row per milestone */}
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:0.1,ease:EASE}} className="relative">
              <div
                className="pointer-events-none absolute left-5 top-5 bottom-5 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#bd27f6]/50 via-[#268de5]/35 to-transparent"
                aria-hidden
              />
              <div className="flex flex-col gap-5">
                {milestones.map((m) => (
                  <div key={m.title} className="flex gap-4 items-start">
                    <div className="relative z-10 flex w-10 shrink-0 justify-center pt-1">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#030cf4] shadow-md ring-4 ring-black">
                        <m.icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-[#5cffd3]">{m.year}</span>
                        <span className="text-sm font-semibold text-white">{m.title}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/60">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Pricing />

      <CTA
        title={content?.ctaTitle}
        subtitle={content?.ctaSubtitle}
        primaryCta={bottomCtas.primaryCta}
        secondaryCta={bottomCtas.secondaryCta}
      />
    </div>
  );
}
