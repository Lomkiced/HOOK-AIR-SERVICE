"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getBrand, type BrandId } from "@/lib/brands";
import { SmoothScrollVideo } from "@/components/SmoothScrollVideo";

interface ExplodedAirconHeroProps {
  activeBrand: BrandId;
  onOpenBooking: () => void;
}

const HERO_VIDEO_SOURCES = [
  "/videos/hero-aircon-scrub.mp4",
  "/videos/hero-aircon-assembly.mp4",
  "/ACBG2.mp4",
];

const HERO_STAGE_THRESHOLDS = [0, 0.25, 0.55, 0.82];

export function ExplodedAirconHero({
  activeBrand,
  onOpenBooking,
}: ExplodedAirconHeroProps) {
  const { t } = useLanguage();
  const brand = getBrand(activeBrand);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);

  // Only updates 4 times across the entire 450vh scroll (when milestone changes)
  const [activeStage, setActiveStage] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleStageChange = useCallback((nextStage: number) => {
    setActiveStage(nextStage);
  }, []);

  // Procedural fallback canvas renderer (used only before the in-memory Blob finishes loading)
  const renderHeroFallback = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      progress: number
    ) => {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.62;
      const cy = h * 0.48;
      const spread = (1 - progress) * 95;

      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.55);
      grad.addColorStop(0, "rgba(2, 132, 199, 0.30)");
      grad.addColorStop(1, "rgba(15, 23, 42, 0.96)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Exploded-to-assembled schematic layers
      const layers = [
        { offset: -spread * 1.15, color: "#1E293B", border: "#475569", h: 78 },
        { offset: -spread * 0.55, color: "#0F172A", border: "#38BDF8", h: 66 },
        { offset: 0, color: "#0369A1", border: "#FACC15", h: 84 },
        { offset: spread * 0.55, color: "#E0F2FE", border: "#0284C7", h: 74 },
        { offset: spread * 1.15, color: "#FFFFFF", border: "#0284C7", h: 92 },
      ];

      const unitW = Math.min(440, w * 0.48);
      layers.forEach((layer) => {
        const lx = cx - unitW * 0.5 + layer.offset * 0.45;
        const ly = cy - layer.h * 0.5 + layer.offset * 0.65;
        ctx.fillStyle = layer.color;
        ctx.strokeStyle = layer.border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(lx, ly, unitW, layer.h, 14);
        ctx.fill();
        ctx.stroke();
      });
    },
    []
  );

  const activeMilestone =
    t.hero.milestones[activeStage] ?? t.hero.milestones[0];

  return (
    <section
      id="home"
      ref={containerRef}
      aria-label="Scroll-Scrubbed Exploded-to-Assembled Aircon Hero"
      className="relative h-[450vh] w-full bg-[#0F172A] text-white select-none"
    >
      {/* Sticky Viewport aligned directly below the 4rem (64px) Executive Navbar */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] sm:h-[calc(100dvh-4rem)] w-full overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-5 sm:py-7">
        {/* ====================================================================
            1. 60FPS IN-MEMORY BLOB + CANVAS LERP VIDEO SCRUBBER
        ==================================================================== */}
        <SmoothScrollVideo
          sources={HERO_VIDEO_SOURCES}
          scrollYProgress={scrollYProgress}
          lerpFactor={0.18}
          canvasFilter="contrast(1.05) saturate(1.04)"
          stageThresholds={HERO_STAGE_THRESHOLDS}
          onStageChange={handleStageChange}
          progressFillRef={progressFillRef}
          progressTextRef={progressTextRef}
          renderFallback={renderHeroFallback}
          className="pointer-events-none absolute inset-0 w-full h-full"
        />

        {/* Cinema Left-Column Readability Gradient (keeps 3D aircon video vivid & unobstructed) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/35 to-transparent"
        />

        {/* Subtle Architectural Hairline Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#38BDF8_1px,transparent_1px),linear-gradient(to_bottom,#38BDF8_1px,transparent_1px)] bg-[size:64px_64px]"
        />

        {/* ====================================================================
            2. TOP TELEMETRY BAR (Editorial Typography + Numeric Indices)
        ==================================================================== */}
        <div className="relative z-20 max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#38BDF8] uppercase">
              {t.hero.eyebrow}
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <span className="text-slate-300 uppercase">
              UNIT: <strong className="text-white">{brand.name}</strong> ({brand.psi} PSI)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FACC15] text-[#0F172A] font-extrabold tabular-nums">
              {activeMilestone.phase}
            </span>
          </div>
        </div>

        {/* ====================================================================
            3. CENTER STAGE: 3D POP-OUT KINETIC TYPOGRAPHY OVER SCRUBBED VIDEO
        ==================================================================== */}
        <div className="relative z-20 flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-0 my-auto">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              key={activeStage}
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 26,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <div className="font-mono text-xs font-extrabold tracking-[0.22em] text-[#FACC15] uppercase mb-2">
                {activeMilestone.phase}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.03]">
                {activeMilestone.title}
              </h1>

              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#E0F2FE]/90 leading-relaxed max-w-md font-normal">
                {activeMilestone.sub}
              </p>

              {/* Persistent Action Bar with Milestone 4 Highlight */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className={`px-6 py-3.5 rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    activeStage === 3
                      ? "bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] scale-105 shadow-[0_0_30px_rgba(250,204,21,0.45)]"
                      : "bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A]"
                  }`}
                >
                  {t.hero.cta}
                </button>

                <a
                  href="#about"
                  className="px-5 py-3.5 rounded-full border border-white/25 hover:border-[#38BDF8] text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-colors"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ====================================================================
            4. BOTTOM ASSEMBLY TIMELINE SCRUBBER HUD (DOM-Ref Driven, Zero Re-Renders)
        ==================================================================== */}
        <div className="relative z-20 max-w-7xl w-full mx-auto pt-3 border-t border-white/15 shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* 4 Milestone Index Tabs */}
            <div className="md:col-span-7 grid grid-cols-4 gap-2">
              {t.hero.milestones.map((m, idx) => {
                const isActive = idx === activeStage;
                const isPassed = idx < activeStage;
                return (
                  <div
                    key={m.index}
                    className={`rounded-xl px-3 py-2 border transition-colors ${
                      isActive
                        ? "bg-white/10 border-[#FACC15] text-white"
                        : isPassed
                        ? "bg-white/5 border-[#0284C7]/50 text-slate-300"
                        : "bg-slate-900/50 border-white/10 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                      <span className={isActive ? "text-[#FACC15]" : "text-[#38BDF8]"}>
                        {m.index}
                      </span>
                      <span>{idx === 0 ? "0%" : idx === 1 ? "25%" : idx === 2 ? "55%" : "100%"}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] font-bold truncate">
                      {m.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Linear Progress Bar Updated via Direct DOM Refs in rAF */}
            <div className="md:col-span-5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-slate-300 uppercase tracking-wider">
                  {t.hero.assemblyProgressLabel}
                </span>
                <span
                  ref={progressTextRef}
                  className="text-[#FACC15] font-extrabold tabular-nums"
                >
                  0%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800/90 overflow-hidden p-0.5 border border-white/10">
                <div
                  ref={progressFillRef}
                  className="h-full rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#FACC15]"
                  style={{ width: "0%" }}
                />
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>{t.hero.stateExploded}</span>
                <span>{t.hero.scrollPrompt}</span>
                <span>{t.hero.stateAssembled}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
