"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SmoothScrollVideo } from "@/components/SmoothScrollVideo";

const FPOV_VIDEO_SOURCES = [
  "/videos/fpov-walkthrough.mp4",
];

const FPOV_FRAME_SEQUENCE = {
  folder: "/videos/fpov-frames",
  count: 240,
} as const;

const FPOV_STAGE_THRESHOLDS = [0, 0.34, 0.67];

export function AboutUsWalkthrough() {
  const { t, language } = useLanguage();

  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  // Scroll-scrubbed container driving the pure FPOV video and story chapters
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const handleStageChange = useCallback((stageIdx: number) => {
    setActiveStage(stageIdx);
  }, []);

  // Subtle scroll-linked parallax for the right-column editorial cards
  const card1Y = useTransform(scrollYProgress, [0, 0.35], [0, -8]);
  const card2Y = useTransform(scrollYProgress, [0.25, 0.68], [12, 0]);
  const card3Y = useTransform(scrollYProgress, [0.55, 1], [16, 0]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Hook Air Service — Scroll-Triggered FPOV Walkthrough"
      className="relative min-h-[300vh] bg-[#0F172A] text-white border-t border-slate-800/90"
    >
      {/* Subtle Architectural Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28">
        {/* Top Section Index Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-10">
          <span className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#FACC15]">
            {t.about.sectionIndex}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
            {t.about.videoCaption}
          </span>
        </div>

        {/* Editorial Section Heading */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.03]">
            {t.about.heading}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
            {t.about.lead}
          </p>
        </div>

        {/* ====================================================================
            SCROLL-TRIGGERED STUDIO LAYOUT:
            Left (5 cols): Sticky Pure Unobstructed Full Video (Zero Overlays, Zero Indicators)
            Right (7 cols): Scroll-Synced Origin, What We Do, Founder's Pledge & Metrics
        ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN (5 cols): Pure Full-Bleed Sticky 9:16 Video Only */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="relative aspect-[9/16] max-h-[78vh] w-full mx-auto rounded-3xl overflow-hidden bg-[#0F172A] shadow-[0_24px_80px_rgba(2,132,199,0.22)]">
              <SmoothScrollVideo
                sources={FPOV_VIDEO_SOURCES}
                frameSequence={FPOV_FRAME_SEQUENCE}
                scrollYProgress={scrollYProgress}
                dampingLambda={18}
                stageThresholds={FPOV_STAGE_THRESHOLDS}
                onStageChange={handleStageChange}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols): Scroll-Synced Story Chapters & Founder's Pledge */}
          <div className="lg:col-span-7 space-y-8">
            {/* CHAPTER 01: OUR ORIGIN */}
            <motion.article
              style={{ y: card1Y }}
              className={`rounded-3xl p-7 sm:p-9 border transition-all duration-300 ${
                activeStage === 0
                  ? "bg-slate-900/95 border-2 border-[#FACC15] shadow-[0_16px_50px_rgba(250,204,21,0.12)]"
                  : "bg-slate-900/55 border-slate-800/90 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#38BDF8]">
                  {t.about.pillars[0].num} / {t.about.pillars[0].subtitle}
                </span>
              </div>

              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                {t.about.pillars[0].title}
              </h3>

              <p className="mt-3.5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {t.about.pillars[0].body}
              </p>
            </motion.article>

            {/* CHAPTER 02: WHAT WE DO */}
            <motion.article
              style={{ y: card2Y }}
              className={`rounded-3xl p-7 sm:p-9 border transition-all duration-300 ${
                activeStage === 1
                  ? "bg-slate-900/95 border-2 border-[#0284C7] shadow-[0_16px_50px_rgba(2,132,199,0.2)]"
                  : "bg-slate-900/55 border-slate-800/90 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#38BDF8]">
                  {t.about.pillars[1].num} / {t.about.pillars[1].subtitle}
                </span>
              </div>

              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                {t.about.pillars[1].title}
              </h3>

              <p className="mt-3.5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {t.about.pillars[1].body}
              </p>

              {/* 4 Service Capabilities */}
              <div className="mt-6 pt-5 border-t border-slate-800/90 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(language === "en"
                  ? [
                      "01 / Deep Wash",
                      "02 / Repair",
                      "03 / Install",
                      "04 / Relocate",
                    ]
                  : [
                      "01 / ล้างแอร์",
                      "02 / ซ่อมแอร์",
                      "03 / ติดตั้งแอร์",
                      "04 / ย้ายแอร์",
                    ]
                ).map((serviceTag) => (
                  <div
                    key={serviceTag}
                    className="rounded-xl bg-slate-950/90 border border-slate-800 px-3 py-2.5 font-mono text-xs font-extrabold text-[#FACC15] text-center"
                  >
                    {serviceTag}
                  </div>
                ))}
              </div>
            </motion.article>

            {/* CHAPTER 03: FOUNDER'S MESSAGE */}
            <motion.article
              style={{ y: card3Y }}
              className={`rounded-3xl p-7 sm:p-9 border-2 transition-all duration-300 ${
                activeStage === 2
                  ? "bg-white text-[#0F172A] border-[#FACC15] shadow-[0_24px_70px_rgba(250,204,21,0.22)]"
                  : "bg-white/95 text-[#0F172A] border-[#0284C7]"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                  {t.about.founder.eyebrow}
                </span>
                <span className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded bg-[#0F172A] text-[#FACC15] uppercase tracking-wider">
                  EXECUTIVE PLEDGE
                </span>
              </div>

              {/* Quote Body with #FACC15 Yellow Vertical Accent Bar */}
              <div className="mt-6 flex items-stretch gap-4 sm:gap-5">
                <div
                  aria-hidden="true"
                  className="w-1.5 rounded-full bg-[#FACC15] shrink-0"
                />
                <blockquote className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#0F172A] leading-relaxed">
                  &ldquo;{t.about.founder.quote}&rdquo;
                </blockquote>
              </div>

              {/* Typographic Signature Lockup */}
              <div className="mt-7 pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FACC15] bg-[#0F172A] shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Hook Air Service Official Crest"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                      {t.about.founder.author}
                    </div>
                    <div className="font-mono text-[11px] font-bold text-[#0369A1] mt-0.5">
                      {t.about.founder.role}
                    </div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="font-serif italic text-base font-bold text-[#0F172A]">
                    {t.about.founder.signature}
                  </span>
                </div>
              </div>
            </motion.article>

            {/* Key Company Milestones (Large Editorial Typography) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {t.about.milestones.map((m, idx) => (
                <div
                  key={m.label}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6"
                >
                  <span className="font-mono text-[10px] font-extrabold text-[#38BDF8] uppercase tracking-widest block">
                    {`0${idx + 1} / BENCHMARK`}
                  </span>
                  <div className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FACC15] tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-bold text-slate-200 leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
