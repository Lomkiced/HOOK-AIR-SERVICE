"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getBrand, type BrandId } from "@/lib/brands";

interface ExplodedAirconHeroProps {
  activeBrand: BrandId;
  onOpenBooking: () => void;
}

interface CryoParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function ExplodedAirconHero({
  activeBrand,
  onOpenBooking,
}: ExplodedAirconHeroProps) {
  const { t } = useLanguage();
  const brand = getBrand(activeBrand);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [videoReady, setVideoReady] = useState<boolean>(false);
  const [progressPct, setProgressPct] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0);

  // 450vh scroll-scrubbed container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.35,
  });

  // Track milestone index:
  // 0: 0.00 - 0.22 (Exploded Core State)
  // 1: 0.25 - 0.50 (High-Pressure Sanitization)
  // 2: 0.55 - 0.80 (Precision Reassembly)
  // 3: 0.82 - 1.00 (Fully Assembled & Ice Cold)
  useMotionValueEvent(smoothProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    setProgressPct(Math.round(clamped * 100));

    if (clamped < 0.24) {
      setActiveStage(0);
    } else if (clamped < 0.52) {
      setActiveStage(1);
    } else if (clamped < 0.81) {
      setActiveStage(2);
    } else {
      setActiveStage(3);
    }
  });

  // rAF Video Scrubbing Engine + High-DPI Cryo-Mist Canvas
  useEffect(() => {
    let rafId = 0;
    let targetTime = 0;
    let currentTime = 0;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    const initialVid = videoRef.current;

    if (initialVid) {
      if (initialVid.readyState >= 1) {
        setVideoReady(true);
        try {
          if (initialVid.currentTime === 0) {
            initialVid.currentTime = 0.001;
          }
        } catch {
          // Ignore initial seek lock
        }
      } else {
        initialVid.load();
      }
    }

    const particles: CryoParticle[] = Array.from({ length: 48 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 700,
      vx: (Math.random() - 0.5) * 1.1,
      vy: -0.4 - Math.random() * 1.4,
      size: 1.2 + Math.random() * 2.4,
      alpha: 0.15 + Math.random() * 0.55,
    }));

    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const tick = () => {
      const p = Math.max(0, Math.min(1, smoothProgress.get()));

      // 1. Scrub HTML5 <video> if loaded
      const vid = videoRef.current;
      if (vid && vid.readyState >= 2 && Number.isFinite(vid.duration) && vid.duration > 0) {
        targetTime = p * vid.duration;
        currentTime += (targetTime - currentTime) * 0.25;
        if (Math.abs(vid.currentTime - currentTime) > 0.015) {
          try {
            vid.currentTime = currentTime;
          } catch {
            // Ignore seek lock
          }
        }
      }

      // 2. Render cold ambient mist on HTML5 Canvas
      if (canvas && ctx) {
        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        // Peak mist intensity during 150 PSI sanitization (0.25 - 0.55) and arctic output (0.82 - 1.0)
        const mistBoost =
          p >= 0.22 && p <= 0.55 ? 0.95 : p >= 0.8 ? 0.8 : 0.4;

        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];
          pt.x += pt.vx;
          pt.y += pt.vy * (1 + mistBoost);

          if (pt.y < -10) {
            pt.y = h + 10;
            pt.x = Math.random() * w;
          }
          if (pt.x < 0) pt.x = w;
          if (pt.x > w) pt.x = 0;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${pt.alpha * mistBoost})`;
          ctx.fill();
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [smoothProgress]);

  // ============================================================================
  // EXPLODED (0.0) -> ASSEMBLED (1.0) HARDWARE FALLBACK TRANSFORMS
  // At 0.00: Fully exploded internal components.
  // At 0.85 - 1.00: Locked into factory-assembled perfection.
  // ============================================================================
  // Layer 1: Front Aerodynamic Fascia
  const l1Y = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [-104, -78, -8, 0]);
  const l1Z = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [120, 85, 10, 0]);
  const l1RotX = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [12, 8, 1, 0]);

  // Layer 2: Honeycomb Pre-Filters
  const l2Y = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [-52, -38, -3, 0]);
  const l2Z = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [62, 42, 4, 0]);
  const l2RotX = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [18, 12, 0, 0]);

  // Layer 3: Blue-Fin Evaporator Core (glows during 0.25-0.50 hydro-sanitization)
  const coilGlow = useTransform(smoothProgress, [0, 0.25, 0.42, 0.65, 1], [0.25, 0.95, 1, 0.35, 0.15]);

  // Layer 4: Cross-Flow Cylindrical Blower Wheel (โพรงกระรอก)
  const l4Y = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [52, 36, 3, 0]);
  const l4Z = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [-52, -34, -4, 0]);

  // Layer 5: Rear Chassis & Drain Pan
  const l5Y = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [104, 74, 6, 0]);
  const l5Z = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [-105, -72, -8, 0]);
  const l5RotX = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [-10, -7, 0, 0]);

  // Whole-rig perspective angle (isometric exploded -> straight-on executive front view)
  const rigRotX = useTransform(smoothProgress, [0, 0.5, 0.85, 1], [13, 9, 2, 0]);
  const rigRotY = useTransform(smoothProgress, [0, 0.5, 0.85, 1], [-14, -9, -2, 0]);

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
            1. SCROLL-SCRUBBED VIDEO LAYER (/ACBG2.mp4 & /videos/hero-aircon-assembly.mp4)
        ==================================================================== */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            setVideoReady(true);
            try {
              if (e.currentTarget.currentTime === 0) {
                e.currentTarget.currentTime = 0.001;
              }
            } catch {
              // Ignore seek lock
            }
          }}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          style={{ filter: "contrast(1.04) saturate(1.04)" }}
          className={`pointer-events-none absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/ACBG2.mp4" type="video/mp4" />
          <source src="/videos/hero-aircon-assembly.mp4" type="video/mp4" />
        </video>

        {/* Cinema Readability Gradient (keeps video vivid on right/center, legible on left) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            videoReady
              ? "bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/35 to-[#0F172A]/15"
              : "bg-[radial-gradient(circle_at_50%_46%,rgba(2,132,199,0.28)_0%,rgba(15,23,42,0.92)_74%)]"
          }`}
        />

        {/* Subtle Architectural Hairline Grid */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#38BDF8_1px,transparent_1px),linear-gradient(to_bottom,#38BDF8_1px,transparent_1px)] bg-[size:64px_64px] ${
            videoReady ? "opacity-5" : "opacity-15"
          }`}
        />

        {/* Cold Cryo-Mist Particle Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full z-10"
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
            3. CENTER STAGE: EXPLODED -> ASSEMBLED HARDWARE + POP-OUT TYPOGRAPHY
        ==================================================================== */}
        <div className="relative z-20 flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-0 my-auto">
          {/* Left Column: 3D Pop-Out Kinetic Typography (5 cols) */}
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

              {/* Milestone 4 (0.82 - 1.00) or Persistent Action Bar */}
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
                  href="#services"
                  className="px-5 py-3.5 rounded-full border border-white/25 hover:border-[#38BDF8] text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-colors"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Res Exploded-to-Assembled Hardware Visualizer (7 cols)
              Shown whenever /videos/hero-aircon-assembly.mp4 is not yet loaded on disk */}
          <div
            className={`lg:col-span-7 flex items-center justify-center ${
              videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ perspective: "1400px" }}
          >
            <motion.div
              style={{
                rotateX: rigRotX,
                rotateY: rigRotY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              className="relative w-full max-w-[580px] h-[240px] sm:h-[290px] flex items-center justify-center scale-90 sm:scale-95 lg:scale-100"
            >
              {/* LAYER 5: Rear Structural Chassis & Condensate Drain Pan */}
              <motion.div
                style={{ y: l5Y, z: l5Z, rotateX: l5RotX, willChange: "transform" }}
                className="absolute w-[90%] sm:w-[500px] h-[104px] sm:h-[118px] rounded-2xl bg-[#0F172A] border border-slate-600/80 shadow-2xl flex flex-col justify-between p-3.5"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span>05 // REAR CHASSIS & DRAIN TROUGH</span>
                  <span className="text-[#38BDF8]">SEALED DRAINAGE</span>
                </div>
                <div className="grid grid-cols-8 gap-1.5 my-auto">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 rounded-xs bg-slate-800/90 border border-slate-700"
                    />
                  ))}
                </div>
                <div className="h-3 rounded-full bg-[#0369A1]/80 border border-[#38BDF8]/40 flex items-center justify-between px-3 font-mono text-[9px] text-[#E0F2FE]">
                  <span>LASER-ALIGNED LOUVER SWING</span>
                  <span>0.0 MM PLAY</span>
                </div>
              </motion.div>

              {/* LAYER 4: Cross-Flow Cylindrical Squirrel-Cage Blower Wheel */}
              <motion.div
                style={{ y: l4Y, z: l4Z, willChange: "transform" }}
                className="absolute w-[84%] sm:w-[465px] h-[60px] sm:h-[68px] rounded-full bg-[#075985] border border-[#38BDF8] shadow-xl flex items-center justify-between px-4"
              >
                <span className="font-mono text-[9px] font-bold text-[#E0F2FE] shrink-0">
                  04 // TURBINE
                </span>
                <div className="flex-1 mx-3 h-8 rounded-full bg-[#0F172A] border border-[#38BDF8]/40 overflow-hidden">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 32"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 28 }).map((_, idx) => (
                      <line
                        key={idx}
                        x1={idx * 15}
                        y1="0"
                        x2={idx * 15 + 9}
                        y2="32"
                        stroke="#38BDF8"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                      />
                    ))}
                  </svg>
                </div>
                <span className="font-mono text-[9px] font-extrabold text-[#FACC15] shrink-0">
                  BALANCED
                </span>
              </motion.div>

              {/* LAYER 3: Blue-Fin Evaporator Cooling Coil Core */}
              <motion.div
                style={{ z: 0, willChange: "transform" }}
                className="absolute w-[88%] sm:w-[490px] h-[88px] sm:h-[100px] rounded-xl bg-[#0284C7] border border-[#BAE6FD] shadow-2xl flex items-center justify-between px-3"
              >
                <motion.div
                  style={{ opacity: coilGlow }}
                  className="pointer-events-none absolute inset-0 rounded-xl bg-[#38BDF8]/30 ring-2 ring-[#FACC15]/70"
                />
                <div className="flex flex-col justify-around h-full py-2 pr-2 shrink-0">
                  {[0, 1, 2].map((loop) => (
                    <div
                      key={loop}
                      className="w-3 h-3 rounded-full border-2 border-[#FACC15] bg-[#0369A1]"
                    />
                  ))}
                </div>
                <div className="relative flex-1 h-[76%] rounded bg-[#0369A1] border border-[#BAE6FD]/50 overflow-hidden">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 460 72"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <line x1="0" y1="18" x2="460" y2="18" stroke="#FACC15" strokeWidth="2.5" />
                    <line x1="0" y1="36" x2="460" y2="36" stroke="#FACC15" strokeWidth="2.5" />
                    <line x1="0" y1="54" x2="460" y2="54" stroke="#FACC15" strokeWidth="2.5" />
                    {Array.from({ length: 46 }).map((_, i) => (
                      <line
                        key={i}
                        x1={i * 10}
                        y1="0"
                        x2={i * 10}
                        y2="72"
                        stroke="#E0F2FE"
                        strokeWidth="1.4"
                        strokeOpacity="0.75"
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-2.5 py-0.5 rounded bg-[#0F172A]/90 text-[#FACC15] font-mono text-[10px] font-extrabold tracking-widest">
                      03 // 150 PSI EVAPORATOR CORE
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-around h-full py-2 pl-2 shrink-0">
                  {[0, 1, 2].map((loop) => (
                    <div
                      key={loop}
                      className="w-3 h-3 rounded-full border-2 border-[#FACC15] bg-[#0369A1]"
                    />
                  ))}
                </div>
              </motion.div>

              {/* LAYER 2: Dual High-Density Pre-Filters */}
              <motion.div
                style={{ y: l2Y, z: l2Z, rotateX: l2RotX, willChange: "transform" }}
                className="absolute w-[86%] sm:w-[475px] h-[70px] sm:h-[80px] grid grid-cols-2 gap-3 pointer-events-none"
              >
                {[0, 1].map((idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#E0F2FE]/95 border border-[#0284C7] shadow-md p-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] font-bold text-[#0369A1]">
                      <span>02 // MICRO-FILTER 0{idx + 1}</span>
                      <span>SANITIZED</span>
                    </div>
                    <div className="h-8 rounded bg-[#BAE6FD]/60 border border-[#0284C7]/30" />
                  </div>
                ))}
              </motion.div>

              {/* LAYER 1: Outer Aerodynamic Fascia & 16.0°C LED Matrix */}
              <motion.div
                style={{ y: l1Y, z: l1Z, rotateX: l1RotX, willChange: "transform" }}
                className="absolute w-[92%] sm:w-[520px] h-[108px] sm:h-[122px] rounded-2xl bg-white text-[#0F172A] border-2 border-[#38BDF8] shadow-[0_20px_60px_rgba(2,132,199,0.45)] flex flex-col justify-between p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-extrabold tracking-widest text-[#0284C7] uppercase">
                    01 // {brand.name} AERODYNAMIC FASCIA
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#475569] tabular-nums">
                    {progressPct}% ASSEMBLED
                  </span>
                </div>

                <div className="my-auto flex items-center justify-between border-y border-slate-100 py-2">
                  <span className="text-xs font-extrabold tracking-wider text-[#0F172A] uppercase">
                    {brand.name} • CLINICAL SPEC
                  </span>
                  <div className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-3 py-1 rounded-md">
                    <span className="font-mono text-sm sm:text-base font-extrabold text-[#FACC15] tabular-nums">
                      16.5°C
                    </span>
                    <span className="font-mono text-[9px] text-[#38BDF8] uppercase">
                      ARCTIC
                    </span>
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-[#E0F2FE] overflow-hidden">
                  <div
                    className="h-full bg-[#0284C7] transition-all duration-150"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ====================================================================
            4. BOTTOM ASSEMBLY TIMELINE SCRUBBER (Editorial Hairline Bar)
        ==================================================================== */}
        <div className="relative z-20 max-w-7xl w-full mx-auto pt-3 border-t border-white/15 shrink-0">
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs text-slate-300 mb-2">
            <span>{t.hero.stateExploded}</span>
            <span className="text-[#FACC15] font-bold uppercase tracking-widest">
              {t.hero.scrollPrompt} — {progressPct}%
            </span>
            <span>{t.hero.stateAssembled}</span>
          </div>

          {/* 4-Milestone Progress Track */}
          <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-[#FACC15] transition-all duration-75"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
