"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { BrandId } from "@/lib/brands";
import { SmoothScrollVideo } from "@/components/SmoothScrollVideo";

interface ExplodedAirconHeroProps {
  activeBrand?: BrandId;
  onOpenBooking: () => void;
  onPreloadProgress?: (loadedPct: number) => void;
}

const HERO_VIDEO_SOURCES = [
  "/videos/hero-aircon-assembly.mp4",
];

const HERO_FRAME_SEQUENCE = {
  folder: "/videos/hero-frames",
  count: 239,
} as const;

const HERO_WORDS = {
  en: ["Exposed.", "150 PSI.", "Aligned.", "Pure Air."],
  th: ["ถอดลึกทุกชิ้นส่วน", "ฉีดล้างแรงดันสูง", "ประกอบปราณีต", "ความเย็นบริสุทธิ์"],
} as const;

export function ExplodedAirconHero({
  onOpenBooking,
  onPreloadProgress,
}: ExplodedAirconHeroProps) {
  const { language } = useLanguage();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Continuous anti-flicker opacity, Y, and scale curves (zero React re-renders or DOM unmounts)
  // Beat 1 (0.00 - 0.24): "Exposed."
  const b1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.24], [1, 1, 0]);
  const b1Y = useTransform(scrollYProgress, [0, 0.18, 0.24], [0, 0, -18]);
  const b1Scale = useTransform(scrollYProgress, [0, 0.18, 0.24], [1, 1, 0.96]);

  // Beat 2 (0.25 - 0.49): "150 PSI."
  const b2Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], [0, 1, 1, 0]);
  const b2Y = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], [18, 0, 0, -18]);
  const b2Scale = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.5], [0.95, 1, 1, 0.96]);

  // Beat 3 (0.50 - 0.74): "Aligned."
  const b3Opacity = useTransform(scrollYProgress, [0.47, 0.53, 0.69, 0.75], [0, 1, 1, 0]);
  const b3Y = useTransform(scrollYProgress, [0.47, 0.53, 0.69, 0.75], [18, 0, 0, -18]);
  const b3Scale = useTransform(scrollYProgress, [0.47, 0.53, 0.69, 0.75], [0.95, 1, 1, 0.96]);

  // Beat 4 (0.75 - 1.00): "Pure Air."
  const b4Opacity = useTransform(scrollYProgress, [0.72, 0.79, 1], [0, 1, 1]);
  const b4Y = useTransform(scrollYProgress, [0.72, 0.79, 1], [18, 0, 0]);
  const b4Scale = useTransform(scrollYProgress, [0.72, 0.79, 1], [0.95, 1, 1]);

  // Final Beat CTA (0.80 - 1.00)
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.85, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.78, 0.85, 1], [14, 0, 0]);
  const ctaPointerEvents = useTransform(scrollYProgress, (v) =>
    v >= 0.78 ? "auto" : "none"
  );

  const words = HERO_WORDS[language];
  const beatTransforms = [
    { opacity: b1Opacity, y: b1Y, scale: b1Scale },
    { opacity: b2Opacity, y: b2Y, scale: b2Scale },
    { opacity: b3Opacity, y: b3Y, scale: b3Scale },
    { opacity: b4Opacity, y: b4Y, scale: b4Scale },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      aria-label="Scroll-Scrubbed Aircon Hero"
      className="relative h-[400vh] w-full bg-[#0F172A] text-white select-none"
    >
      {/* Full-Viewport Sticky Stage (100% Edge-to-Edge Behind Transparent Navbar) */}
      <div className="sticky top-0 h-screen sm:h-dvh w-full overflow-hidden flex flex-col justify-end items-center pb-14 sm:pb-20 px-4">
        {/* 1. Full 24FPS Native RAM Frame-Sequence Scrubber (Zero Blur, Zero Indicators) */}
        <SmoothScrollVideo
          sources={HERO_VIDEO_SOURCES}
          frameSequence={HERO_FRAME_SEQUENCE}
          priority={true}
          scrollYProgress={scrollYProgress}
          dampingLambda={18}
          onPreloadProgress={onPreloadProgress}
          className="pointer-events-none absolute inset-0 w-full h-full"
        />

        {/* Subtle lower vignette solely to ground the kinetic word */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/25 to-transparent"
        />

        {/* 2. Continuous Anti-Flicker Kinetic Word Beats (Mounted Permanently, GPU-Driven) */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
          <div className="relative h-24 sm:h-28 lg:h-32 w-full flex items-center justify-center">
            {words.map((word, idx) => (
              <motion.h1
                key={idx}
                style={{
                  opacity: beatTransforms[idx].opacity,
                  y: beatTransforms[idx].y,
                  scale: beatTransforms[idx].scale,
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
                className="pointer-events-none absolute inset-x-0 text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_32px_rgba(15,23,42,0.75)]"
              >
                {word}
              </motion.h1>
            ))}
          </div>

          <motion.div
            style={{
              opacity: ctaOpacity,
              y: ctaY,
              pointerEvents: ctaPointerEvents,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
            className="h-14 mt-3 flex items-center justify-center"
          >
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm sm:text-base tracking-tight shadow-[0_0_32px_rgba(250,204,21,0.45)] transition-colors cursor-pointer"
            >
              {language === "en" ? "Book Now" : "จองคิวล้างแอร์"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
