"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { Eyebrow, FadeUp } from "./shared";
import { SAAS_EASE as EASE } from "@/lib/motion";

const DEFAULT_PEOPLE = [
  { id: "henrik", name: "Henrik Anderberg", title: "EVP / Vice VD", photo: "/design/home/testimonial-henrik.png", tag: "09.02" },
  { id: "puja", name: "Puja Kumari", title: "Vice Managing Director", photo: "/design/home/testimonial-puja.png", tag: "09.02" },
  { id: "lina", name: "Lina Nygren", title: "Vice President SME Strategy & Success", photo: "/design/home/testimonial-lina.png", tag: "09.02" },
  { id: "vishnu", name: "S Vishnu Vardhan Adithya", title: "Segment Lead - Digital Marketing", photo: "/design/home/testimonial-vishnu.png", tag: "09.02" },
];

export function TeamTestimonials({ content }) {
  const people = content?.teamPeople?.length ? content.teamPeople : DEFAULT_PEOPLE;
  const [activeId, setActiveId] = useState(people[0].id);
  const [open, setOpen] = useState(false);

  const activeIndex = Math.max(0, people.findIndex((p) => p.id === activeId));
  const active = people[activeIndex];
  const others = people.filter((p) => p.id !== activeId);

  const step = (dir) => {
    const next = (activeIndex + dir + people.length) % people.length;
    setActiveId(people[next].id);
  };

  return (
    <section className="border-t border-white/10 bg-black px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <FadeUp className="order-2 lg:order-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative block aspect-[822/436] w-full overflow-hidden rounded-lg border border-white/10 text-left"
            >
              <Image src={active.photo} alt={active.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 65vw, 100vw" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="h-6 w-6 fill-white text-white" aria-hidden />
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xl font-medium sm:text-2xl">{active.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.96px]">{active.title}</p>
              </div>
              <span className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 font-serif text-[10px] font-bold italic uppercase tracking-wide text-white">
                {active.tag}
              </span>
            </button>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 lg:order-2">
            <Eyebrow className="mb-5">{content?.teamEyebrow || "Behind the work"}</Eyebrow>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight text-white">
              {content?.teamHeadingPre || "Meet the minds driving "}
              <span className="font-serif italic text-[#ff5c7f]">{content?.teamHeadingAccent || "our work forward."}</span>
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous person"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next person"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {others.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => setActiveId(person.id)}
              className="group relative block aspect-[405/260] overflow-hidden rounded-lg border border-white/10 text-left"
            >
              <Image src={person.photo} alt={person.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 640px) 33vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70" />
              <span className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white">
                <Play className="h-3.5 w-3.5 fill-white text-white" aria-hidden />
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xl font-medium">{person.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.96px]">{person.title}</p>
              </div>
              <span className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 font-serif text-[10px] font-bold italic uppercase tracking-wide text-white">
                {person.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-10"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
              <div className="relative aspect-video w-full">
                <Image src={active.photo} alt={active.name} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="p-6 text-white">
                <p className="text-xl font-medium">{active.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.96px] text-white/70">{active.title}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
