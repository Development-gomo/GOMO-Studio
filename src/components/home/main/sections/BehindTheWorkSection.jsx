"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Eyebrow } from "@/components/home/main/Eyebrow";
import { mcFadeUp, mcStagger, mcViewport, MC_EASE } from "@/components/home/main/tokens";

const DEFAULT_TEAM = [
  { name: "Henrik Anderberg", role: "EVP / Vice VD", image: "/images/home-main/team-henrik.png" },
  { name: "Puja Kumari", role: "Vice Managing Director", image: "/images/home-main/team-puja.png" },
  { name: "Lina Nygren", role: "Vice President SME Strategy & Success", image: "/images/home-main/team-lina.png" },
  { name: "S Vishnu Vardhan Adithya", role: "Segment Lead - Digital Marketing", image: "/images/home-main/team-vishnu.png" },
];

function VideoModal({ member, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: MC_EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-[#111] bg-cover bg-center"
        style={{ backgroundImage: `url(${member.image})` }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
        >
          <X className="h-5 w-5" />
        </button>
        <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20">
          <Play className="h-7 w-7 fill-white text-white" />
        </span>
        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-xl">{member.name}</p>
          <p className="text-xs uppercase tracking-[0.08em] text-white/70">{member.role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TeamTile({ member, big, onPlay, onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`group relative overflow-hidden rounded-lg bg-cover bg-center ${big ? "h-[300px] sm:h-[380px] lg:h-[435px]" : "h-[260px] cursor-pointer"}`}
      style={{ backgroundImage: `url(${member.image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70" />
      <span className="absolute right-3 top-3 rounded-md bg-black/40 px-2.5 py-1.5 font-[family-name:var(--font-merriweather)] text-[11px] font-bold italic uppercase tracking-wide text-white">
        09.02
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPlay();
        }}
        aria-label={`Play ${member.name} interview`}
        className={`absolute flex items-center justify-center rounded-full bg-white/20 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          big ? "left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2" : "right-4 top-1/2 h-12 w-12 -translate-y-1/2"
        }`}
      >
        <Play className="h-6 w-6 fill-white text-white" />
      </button>
      <div className="absolute bottom-0 flex flex-col gap-1 p-6">
        <p className="text-2xl leading-snug text-white">{member.name}</p>
        <p className="text-xs uppercase tracking-wide text-white/70">{member.role}</p>
      </div>
    </div>
  );
}

export function BehindTheWorkSection({ content }) {
  const team = content?.behindTeamList?.length ? content.behindTeamList : DEFAULT_TEAM;
  const eyebrow = content?.behindEyebrow || "Behind the work";
  const headingPlain = content?.behindHeadingPlain || "Meet the minds driving";
  const headingEm1 = content?.behindHeadingEm1 || "our";
  const headingEm2 = content?.behindHeadingEm2 || "work forward.";

  const [active, setActive] = useState(0);
  const [modalMember, setModalMember] = useState(null);
  const safeActive = active % team.length;
  const thumbs = [1, 2, 3].map((o) => (safeActive + o) % team.length);
  const featured = team[safeActive];

  return (
    <section className="relative py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={mcViewport}
        variants={mcStagger}
        className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px]"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div variants={mcFadeUp}>
            <TeamTile member={featured} big onPlay={() => setModalMember(featured)} />
          </motion.div>
          <div>
            <motion.div variants={mcFadeUp}>
              <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2 variants={mcFadeUp} className="text-[32px] font-medium leading-[1.15] text-white sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
              {headingPlain}{" "}
              <span className="font-[family-name:var(--font-merriweather)] italic text-[#FF28BC]">{headingEm1}</span>{" "}
              <span className="font-[family-name:var(--font-merriweather)] italic text-[#FF28BC]">{headingEm2}</span>
            </motion.h2>
            <motion.div variants={mcFadeUp} className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setActive((a) => (a + team.length - 1) % team.length)}
                aria-label="Previous team member"
                className="flex h-[46px] w-[68px] items-center justify-center rounded-lg bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActive((a) => (a + 1) % team.length)}
                aria-label="Next team member"
                className="flex h-[46px] w-[68px] items-center justify-center rounded-lg bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div variants={mcFadeUp} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {thumbs.map((idx) => (
            <TeamTile
              key={team[idx].name}
              member={team[idx]}
              onClick={() => setActive(idx)}
              onPlay={() => setModalMember(team[idx])}
            />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {modalMember && <VideoModal member={modalMember} onClose={() => setModalMember(null)} />}
      </AnimatePresence>
    </section>
  );
}
