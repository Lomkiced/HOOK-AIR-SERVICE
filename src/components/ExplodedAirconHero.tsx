"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { BrandId } from "@/lib/brands";
import { SmoothScrollVideo } from "@/components/SmoothScrollVideo";

interface ExplodedAirconHeroProps {
  activeBrand?: BrandId;
  onOpenBooking: () => void;
}

const HERO_VIDEO_SOURCES = [
  "/videos/hero-aircon-scrub.mp4",
  "/videos/hero-aircon-assembly.mp4",
  "/ACBG2.mp4",
];

// 0: 0.00-0.24 ("Exposed."), 1: 0.25-0.49 ("150 PSI."), 2: 0.50-0.74 ("Aligned."), 3: 0.75-0.79 ("Pure Air."), 4: 0.80-1.00 ("Pure Air." + CTA)
const HERO_STAGE_THRESHOLDS = [0, 0.25, 0.5, 0.75, 0.8];

const HERO_WORDS = {
  en: ["Exposed.", "150 PSI.", "Aligned.", "Pure Air."],
  th: ["ถอดลึกทุกชิ้นส่วน", "ฉีดล้างแรงดันสูง", "ประกอบปราณีต", "ความเย็นบริสุทธิ์"],
} as const;

export function ExplodedAirconHero({ onOpenBooking }: ExplodedAirconHeroProps) {
  const { language } = useLanguage();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  // Discrete stage index (0..4) updated only when crossing thresholds
  const [stageIndex, setStageIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleStageChange = useCallback((nextStage: number) => {
    setStageIndex(nextStage);
  }, []);

  const wordIndex = Math.min(3, stageIndex);
  const currentWord = HERO_WORDS[language][wordIndex];
  const showFinalCta = stageIndex >= 4;

  return (
    <section
      id="home"
      ref={containerRef}
      aria-label="Scroll-Scrubbed Aircon Hero"
      className="relative h-[400vh] w-full bg-[#0F172A] text-white select-none"
    >
      {/* Full-Viewport Sticky Stage */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] sm:h-[calc(100dvh-4rem)] w-full overflow-hidden flex flex-col justify-end items-center pb-12 sm:pb-16 px-4">
        {/* 1. 100% Full-Bleed Scroll-Scrubbed Video (Zero Procedural Schematics) */}
        <SmoothScrollVideo
          sources={HERO_VIDEO_SOURCES}
          scrollYProgress={scrollYProgress}
          lerpFactor={0.18}
          canvasFilter="contrast(1.05) saturate(1.04)"
          stageThresholds={HERO_STAGE_THRESHOLDS}
          onStageChange={handleStageChange}
          progressFillRef={progressFillRef}
          className="pointer-events-none absolute inset-0 w-full h-full"
        />

        {/* Subtle lower vignette solely to ground the kinetic word */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/25 to-transparent"
        />

        {/* 2. Single High-Impact Changing Kinetic Word + Final Beat CTA */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`${language}-${wordIndex}`}
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 1.03 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_32px_rgba(15,23,42,0.75)]"
            >
              {currentWord}
            </motion.h1>
          </AnimatePresence>

          <div className="h-16 mt-5 flex items-center justify-center">
            <AnimatePresence>
              {showFinalCta && (
                <motion.button
                  key="hero-final-cta"
                  type="button"
                  onClick={onOpenBooking}
                  initial={{ opacity: 0, y: 12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="px-8 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm sm:text-base tracking-tight shadow-[0_0_32px_rgba(250,204,21,0.45)] transition-colors cursor-pointer"
                >
                  {language === "en" ? "Book Now" : "จองคิวล้างแอร์"}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Whisper-Quiet Bottom Edge Scroll Line Indicator */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/10"
        >
          <div
            ref={progressFillRef}
            className="h-full bg-[#FACC15]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}
