"use client";

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
  { icon:Mail,   title:"Email",    subtitle:"Our friendly team is here to help.", value:CONTACT_INBOX,    href:`mailto:${CONTACT_INBOX}`, accent:"#5cffd3" },
  { icon:MapPin, title:"Location", subtitle:"Let's catch up for a coffee.",        value:"Pune, Maharashtra, India", href:null, accent:"#bd27f6" },
];

const inputBase = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#268de5] focus:bg-white/[0.06] focus:ring-2 focus:ring-[#268de5]/25 transition-all text-sm";

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
      setMessage("I'm interested in career opportunities at GOMO Group.\n\n");
    } else if (topic === "brand") {
      setMessage("I'm requesting the full GOMO Group brand kit (logos, guidelines, and partner assets).\n\n");
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
    <div className="bg-black">
      <section className="relative overflow-hidden px-4 pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: "radial-gradient(55% 55% at 50% 0%, rgba(38,141,229,0.2) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,ease:EASE}}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/[0.04] text-[#5cffd3] border border-white/10 mb-6">
            <Mail className="w-3 h-3"/> {heroBadge}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.1,ease:EASE}}
            className="marketing-hero-title text-white mb-6">
            {heroTitleLine1} <span className="font-serif italic text-[#ff28bc]">{heroTitleLine2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.75,delay:0.2,ease:EASE}}
            className="text-xl text-white/65 max-w-xl mx-auto leading-relaxed">
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-10">
            Contact information
          </h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{once:true}} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {contactInfo.map(info=>(
              <motion.div key={info.title} variants={fadeUp}
                className="relative overflow-hidden rounded-2xl p-6 text-center border border-white/10 bg-white/[0.03] hover:-translate-y-0.5 transition-all duration-300">
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${info.accent}1a`, borderColor: `${info.accent}33` }}
                >
                  <info.icon className="w-7 h-7" style={{ color: info.accent }} />
                </div>
                <h3 className="relative z-10 text-white font-semibold text-lg mb-1">{info.title}</h3>
                <p className="relative z-10 text-white/45 text-sm mb-3">{info.subtitle}</p>
                {info.href ? (
                  <a href={info.href} className="relative z-10 transition-colors font-semibold text-sm" style={{ color: info.accent }}>{info.value}</a>
                ) : (
                  <p className="relative z-10 text-white/75 font-semibold text-sm">{info.value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact-form" className="relative py-8 md:py-12 px-4 overflow-hidden border-t border-white/10">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: "radial-gradient(50% 50% at 50% 100%, rgba(189,39,246,0.14) 0%, transparent 65%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,ease:EASE}}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-white mb-2">{formTitle}</h2>
              <p className="text-white/55 text-sm mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">First Name</label>
                    <input type="text" placeholder="John" className={inputBase} required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">Last Name</label>
                    <input type="text" placeholder="Doe" className={inputBase} required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Email</label>
                  <input type="email" placeholder="john@company.com" className={inputBase} required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-white/60 text-sm font-medium mb-2">Message</label>
                  <textarea id="contact-message" name="message" rows={5} placeholder="How can we help you?" className={`${inputBase} resize-none`} required value={message} onChange={(e)=>setMessage(e.target.value)}/>
                </div>
                {submitError ? (
                  <p className="text-sm text-[#ff5c7f] bg-[#ff5c7f]/10 border border-[#ff5c7f]/25 rounded-xl px-4 py-3" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button type="submit" disabled={loading} aria-label="Submit message"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-full text-base font-serif italic text-white bg-[#030cf4] shadow-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed">
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
    </div>
  );
}
