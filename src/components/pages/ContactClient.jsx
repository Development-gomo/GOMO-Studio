"use client";
import { BRAND_HERO_GRADIENT_CLASS } from "@/lib/brand";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, MapPin, Send } from "lucide-react";
import { CTA } from "@/components/sections/CTA";
import { Pricing } from "@/components/home/sections/Pricing";
import { resolveBottomCtas } from "@/lib/cms/resolve-page-ctas";
import { SITE_ROUTES } from "@/lib/site-links";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.65, ease:EASE } } };
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

const CONTACT_INBOX = "hello@gomostudio.app";

const contactInfo = [
  { icon:Mail,   title:"Email",    subtitle:"Our friendly team is here to help.", value:CONTACT_INBOX,    href:`mailto:${CONTACT_INBOX}`, color:"from-brand-500/15 to-brand-500/10", border:"border-brand-500/20", iconColor:"text-brand-600 dark:text-brand-400" },
  { icon:MapPin, title:"Location", subtitle:"Let's catch up for a coffee.",        value:"Pune, Maharashtra, India", href:null,                        color:"from-emerald-500/15 to-teal-500/10", border:"border-emerald-500/20",iconColor:"text-emerald-600 dark:text-emerald-400" },
];

const inputBase = "w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-500/20 transition-all text-sm";

export function ContactClient({ content }) {
  const router = useRouter();
  const heroBadge = content?.heroBadge ?? "Get in Touch";
  const heroTitleLine1 = content?.heroTitleLine1 ?? "We're Here to";
  const heroTitleLine2 = content?.heroTitleLine2 ?? "Help!";
  const heroSubtitle = content?.heroSubtitle ?? "Have questions, feedback, or just want to say hi? Let's connect!";
  const formTitle = content?.formTitle ?? "Send us a message";
  const bottomCtas = resolveBottomCtas(content, {
    primary: { label: "Get in touch", href: "#contact-form" },
    secondary: { label: "View pricing", href: SITE_ROUTES.pricing },
  });

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    const role = params.get("role");
    if (topic === "careers" && role) {
      setMessage(`I'm applying for the "${decodeURIComponent(role)}" role.\n\n`);
    } else if (topic === "careers") {
      setMessage("I'm interested in career opportunities at GOMO Studio.\n\n");
    } else if (topic === "brand") {
      setMessage("I'm requesting the full GOMO Studio brand kit (logos, guidelines, and partner assets).\n\n");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });
    const json = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setSubmitError(json.error || "Could not submit your message. Try again later.");
      return;
    }

    router.push("/contact/thank-you");
  }

  return (
    <>
      <section className="relative overflow-hidden px-4 pt-16 pb-8 hero-gradient sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 grid-overlay opacity-[0.08] dark:opacity-[0.05] pointer-events-none"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl bg-brand-600/12 dark:bg-brand-600/18 pointer-events-none"/>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-6">
            <Mail className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-gray-900 dark:text-white mb-6">
            {heroTitleLine1} <span className={BRAND_HERO_GRADIENT_CLASS}>{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-gray-500 dark:text-white/70 max-w-xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 bg-[#f0f1f5] dark:bg-[#0E0E14]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10">
            Contact information
          </h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {contactInfo.map(info=>(
              <motion.div key={info.title} variants={fadeUp}
                className="relative overflow-hidden rounded-2xl p-6 text-center bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-sm hover:shadow-lg dark:hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300">
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${info.color} blur-xl opacity-50 pointer-events-none`}/>
                <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} border ${info.border} flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`w-7 h-7 ${info.iconColor}`}/>
                </div>
                <h3 className="relative z-10 text-gray-900 dark:text-white font-semibold text-lg mb-1">{info.title}</h3>
                <p className="relative z-10 text-gray-400 dark:text-white/45 text-sm mb-3">{info.subtitle}</p>
                {info.href ? (
                  <a href={info.href} className="relative z-10 text-brand-600 dark:text-brand-400 hover:text-brand-300 dark:hover:text-brand-300 transition-colors font-semibold text-sm">{info.value}</a>
                ) : (
                  <p className="relative z-10 text-gray-700 dark:text-white/75 font-semibold text-sm">{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact-form" className="relative py-8 md:py-12 px-4 overflow-hidden bg-white dark:bg-[#0C0C12]">
        <div className="absolute inset-0 pointer-events-none hidden dark:block" style={{background:"radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,255,51,0.08) 0%, transparent 70%)"}}/>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
            <div className="rounded-2xl bg-white dark:bg-[#14141B] border border-gray-100 dark:border-white/[0.07] shadow-lg p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{formTitle}</h2>
              <p className="text-gray-500 dark:text-white/55 text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">First Name</label>
                    <input type="text" placeholder="John" className={inputBase} required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">Last Name</label>
                    <input type="text" placeholder="Doe" className={inputBase} required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">Email</label>
                  <input type="email" placeholder="john@company.com" className={inputBase} required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-gray-600 dark:text-white/60 text-sm font-medium mb-2">Message</label>
                  <textarea id="contact-message" name="message" rows={5} placeholder="How can we help you?" className={`${inputBase} resize-none`} required value={message} onChange={(e)=>setMessage(e.target.value)}/>
                </div>
                {submitError ? (
                  <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 rounded-xl px-4 py-3" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button type="submit" disabled={loading} aria-label="Submit message"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl text-base font-semibold btn-brand-primary shadow-xl shadow-brand-600/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (
                    <><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"/><span>Sending…</span></>
                  ) : (
                    <><Send className="w-4 h-4"/><span>Submit</span></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Pricing />

      <CTA
        title={content?.ctaTitle ?? "Ready to Edit Your Site with AI?"}
        subtitle={content?.ctaSubtitle ?? "Join 2,000+ teams already using GOMO Studio to publish content faster"}
        primaryCta={bottomCtas.primaryCta}
        secondaryCta={bottomCtas.secondaryCta}
      />
    </>
  );
}
