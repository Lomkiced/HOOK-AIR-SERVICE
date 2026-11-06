"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useMotionValueEvent,
  useAnimationFrame,
} from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getBrand, type BrandId } from "@/lib/brands";

interface ExplodedAirconHeroProps {
  activeBrand: BrandId;
}

interface MistParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  tint: "blue" | "ice" | "yellow";
}

export function ExplodedAirconHero({ activeBrand }: ExplodedAirconHeroProps) {
  const { t } = useLanguage();
  const brand = getBrand(activeBrand);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Track scroll progress across the 400vh storytelling section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Unified progress value driven by either natural page scroll OR manual scrub slider
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  const progressVelocity = useVelocity(smoothProgress);
  const fanRotation = useMotionValue(0);

  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [activeBeatIndex, setActiveBeatIndex] = useState<number>(0);
  const [calloutsVisible, setCalloutsVisible] = useState<boolean>(false);
  const isManualScrubRef = useRef<boolean>(false);

  // Sync natural window scroll into rawProgress when not manually dragging slider
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isManualScrubRef.current) {
      rawProgress.set(v);
    }
  });

  // Update UI state (active kinetic beat 0..3, callouts visibility 0.40..0.75, slider readout)
  useMotionValueEvent(smoothProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    setDisplayProgress(clamped);

    const beatIdx =
      clamped < 0.25 ? 0 : clamped < 0.52 ? 1 : clamped < 0.78 ? 2 : 3;
    setActiveBeatIndex(beatIdx);

    // Callout lines fade in ONLY between 0.40 and 0.75
    setCalloutsVisible(clamped >= 0.4 && clamped <= 0.75);
  });

  // Rotate Layer 4 (Cross-Flow Cylindrical Blower Fan) dynamically based on scroll velocity + base spin
  useAnimationFrame((_, delta) => {
    const vel = progressVelocity.get();
    const baseSpin = delta * 0.045;
    const velocityBoost = Math.abs(vel) * delta * 0.85;
    const direction = vel < -0.01 ? -1 : 1;
    fanRotation.set((fanRotation.get() + (baseSpin + velocityBoost) * direction) % 360);
  });

  // HTML5 Canvas 60FPS Particle System (emits 150 PSI water-flush & cooling mist during middle scroll beat)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    const particles: MistParticle[] = Array.from({ length: 56 }, () => ({
      x: Math.random() * 900,
      y: Math.random() * 560,
      vx: (Math.random() - 0.5) * 1.4,
      vy: -0.6 - Math.random() * 1.8,
      radius: 1.5 + Math.random() * 3.2,
      alpha: 0.2 + Math.random() * 0.65,
      tint:
        Math.random() > 0.86
          ? "yellow"
          : Math.random() > 0.45
          ? "blue"
          : "ice",
    }));

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const renderLoop = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const p = smoothProgress.get();
      // Peak particle intensity during middle exploded & sanitized beats (0.25 -> 0.82)
      const intensity =
        p < 0.18
          ? 0.12
          : p <= 0.78
          ? Math.min(1, (p - 0.15) * 2.4)
          : Math.max(0.15, 1 - (p - 0.78) * 3.5);

      const speedMultiplier = 1 + Math.min(3.5, Math.abs(progressVelocity.get()) * 5);

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        pt.x += pt.vx * speedMultiplier;
        pt.y += pt.vy * speedMultiplier;

        if (pt.y < -12) {
          pt.y = h * 0.58 + (Math.random() - 0.5) * 90;
          pt.x = w * 0.5 + (Math.random() - 0.5) * Math.min(w * 0.62, 520);
        }
        if (pt.x < 0) pt.x = w;
        if (pt.x > w) pt.x = 0;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        const alpha = pt.alpha * intensity;
        if (pt.tint === "yellow") {
          ctx.fillStyle = `rgba(250, 204, 21, ${alpha})`;
        } else if (pt.tint === "blue") {
          ctx.fillStyle = `rgba(2, 132, 199, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        }
        ctx.fill();
      }

      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    animationFrameId = window.requestAnimationFrame(renderLoop);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [smoothProgress, progressVelocity]);

  // Manual Scrub Handler: updates explosion immediately and syncs scroll position
  const handleManualScrub = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextVal = parseFloat(e.target.value);
      isManualScrubRef.current = true;
      rawProgress.set(nextVal);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
        if (scrollableDistance > 0) {
          window.scrollTo({
            top: sectionTop + nextVal * scrollableDistance,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }

      window.setTimeout(() => {
        isManualScrubRef.current = false;
      }, 120);
    },
    [rawProgress]
  );

  // ============================================================================
  // 5-LAYER 2.5D/3D EXPLODED HARDWARE TRANSFORMS (0 -> 0.58 explode, 0.72 -> 1.0 reassemble)
  // ============================================================================
  // Keyframe curve: [0, 0.15, 0.55, 0.72, 1.0]
  // Layer 1: Outer Aerodynamic Fascia & Smart LED Display (moves forward + upward)
  const l1Y = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, -32, -96, -96, -6]);
  const l1Z = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 35, 115, 115, 0]);
  const l1RotX = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 5, 12, 12, 0]);

  // Layer 2: Dual High-Density Honey-Comb Pre-Filters (slides out + tilts isometrically)
  const l2Y = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, -16, -48, -48, -3]);
  const l2Z = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 16, 58, 58, 0]);
  const l2RotX = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 8, 20, 20, 0]);
  const l2RotZ = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, -2, -5, -5, 0]);

  // Layer 3: Blue-Fin Evaporator Cooling Coil (centerpiece, glows in middle beat)
  const l3Y = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 0, 0, 0, 0]);
  const l3Z = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 4, 15, 15, 0]);
  const coilGlowOpacity = useTransform(smoothProgress, [0, 0.35, 0.6, 0.85, 1], [0.15, 0.65, 1, 0.4, 0.2]);

  // Layer 4: Cross-Flow Cylindrical Blower Fan (โพรงกระรอก) (moves downward + back)
  const l4Y = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 16, 48, 48, 3]);
  const l4Z = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, -16, -48, -48, 0]);

  // Layer 5: Rear Chassis, Drain Pan & Louver Swing Assembly (anchors the stack)
  const l5Y = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, 32, 96, 96, 6]);
  const l5Z = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, -35, -100, -100, 0]);
  const l5RotX = useTransform(smoothProgress, [0, 0.15, 0.55, 0.72, 1], [0, -4, -10, -10, 0]);

  // Whole-rig subtle isometric tilt during explosion
  const rigRotateX = useTransform(smoothProgress, [0, 0.5, 0.72, 1], [4, 14, 14, 4]);
  const rigRotateY = useTransform(smoothProgress, [0, 0.5, 0.72, 1], [-6, -14, -14, -4]);

  const currentBeat = t.story.beats[activeBeatIndex] ?? t.story.beats[0];

  return (
    <section
      ref={containerRef}
      aria-label="Interactive Exploded Air Conditioner Scrollytelling Experience"
      className="relative h-[400vh] w-full bg-white select-none"
    >
      {/* Sticky Viewport aligned under 4rem/64px Navbar with calc(100dvh - 4rem) */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] sm:h-[calc(100dvh-4rem)] w-full overflow-hidden flex flex-col justify-between pt-3 sm:pt-4 pb-3 sm:pb-4 px-4 sm:px-6 lg:px-8">
        {/* Background Atmospheric Icy Radial Surface & HTML5 Particle Canvas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,#E0F2FE_0%,#FFFFFF_70%)]"
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full z-10"
        />

        {/* ====================================================================
            TOP: APPLE-STYLE KINETIC TYPOGRAPHY BEAT (1-4 words per beat)
        ==================================================================== */}
        <div className="relative z-20 max-w-5xl mx-auto text-center shrink-0">
          <motion.div
            key={activeBeatIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              {currentBeat.title}
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-lg lg:text-xl font-semibold tracking-tight text-[#0369A1]">
              {currentBeat.sub}
            </p>
          </motion.div>
        </div>

        {/* ====================================================================
            CENTER: 5-LAYER 2.5D/3D PERSPECTIVE EXPLODED AIRCON STAGE
        ==================================================================== */}
        <div
          className="relative z-20 flex-1 flex items-center justify-center min-h-0 py-2"
          style={{ perspective: "1400px" }}
        >
          <motion.div
            style={{
              rotateX: rigRotateX,
              rotateY: rigRotateY,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative w-full max-w-[620px] h-[260px] sm:h-[300px] flex items-center justify-center scale-90 sm:scale-95 lg:scale-100 origin-center"
          >
            {/* ----------------------------------------------------------------
                LAYER 5 (BACK): Rear Chassis, Drain Pan & Louver Swing Assembly
            ---------------------------------------------------------------- */}
            <motion.div
              style={{
                y: l5Y,
                z: l5Z,
                rotateX: l5RotX,
                willChange: "transform",
              }}
              className="absolute w-[90%] sm:w-[540px] h-[112px] sm:h-[128px] rounded-2xl bg-[#0F172A] border-2 border-[#334155] shadow-xl flex flex-col justify-between p-3.5 sm:p-4"
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#BAE6FD]">
                <span>05 // REAR CHASSIS & CONDENSATE DRAIN PAN</span>
                <span className="text-[#FACC15]">PVC DRAIN CLEAR</span>
              </div>

              {/* Structural Mounting Ribs & Drain Channel */}
              <div className="grid grid-cols-8 gap-1.5 my-auto opacity-80">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 rounded bg-[#1E293B] border border-[#334155]"
                  />
                ))}
              </div>

              {/* Motorized Louver Swing Blade */}
              <div className="h-3.5 rounded-full bg-[#0369A1] border border-[#38BDF8]/60 flex items-center justify-between px-3">
                <span className="text-[9px] font-mono text-[#E0F2FE]">
                  AUTO SWING LOUVER ASSEMBLY
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
              </div>

              {/* Apple-Style Engineering Callout Line (05) */}
              <div
                className={`hidden md:flex items-center gap-2 absolute -right-52 top-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none ${
                  calloutsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-10 h-px bg-[#0284C7]" />
                <div className="text-left">
                  <div className="text-xs font-extrabold text-[#0F172A] leading-tight">
                    {t.story.layers[4].name}
                  </div>
                  <div className="text-[11px] font-mono text-[#0369A1]">
                    {t.story.layers[4].spec}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                LAYER 4: Cross-Flow Cylindrical Blower Fan (โพรงกระรอก)
            ---------------------------------------------------------------- */}
            <motion.div
              style={{
                y: l4Y,
                z: l4Z,
                willChange: "transform",
              }}
              className="absolute w-[84%] sm:w-[495px] h-[68px] sm:h-[76px] rounded-full bg-[#075985] border-2 border-[#0284C7] shadow-lg flex items-center justify-between px-4 overflow-visible"
            >
              {/* Left Bearing Hub */}
              <div className="w-9 h-9 rounded-full bg-[#0F172A] border-2 border-[#FACC15] flex items-center justify-center shrink-0">
                <motion.div
                  style={{ rotate: fanRotation, willChange: "transform" }}
                  className="w-4 h-4 rounded-sm border-2 border-[#38BDF8]"
                />
              </div>

              {/* Cylindrical Squirrel-Cage Turbine Blades SVG */}
              <div className="flex-1 mx-3 h-10 rounded-full bg-[#0F172A]/90 border border-[#38BDF8]/40 overflow-hidden flex items-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 40"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {Array.from({ length: 26 }).map((_, idx) => (
                    <line
                      key={idx}
                      x1={idx * 16}
                      y1="0"
                      x2={idx * 16 + 10}
                      y2="40"
                      stroke="#38BDF8"
                      strokeWidth="2.2"
                      strokeOpacity="0.85"
                    />
                  ))}
                </svg>
              </div>

              {/* Right Brushless DC Motor Hub */}
              <div className="w-9 h-9 rounded-full bg-[#FACC15] text-[#0F172A] flex items-center justify-center shrink-0 font-mono text-[9px] font-extrabold">
                RPM
              </div>

              {/* Apple-Style Engineering Callout Line (04) */}
              <div
                className={`hidden md:flex items-center gap-2 absolute -left-56 top-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none ${
                  calloutsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-right">
                  <div className="text-xs font-extrabold text-[#0F172A] leading-tight">
                    {t.story.layers[3].name}
                  </div>
                  <div className="text-[11px] font-mono text-[#0369A1]">
                    {t.story.layers[3].spec}
                  </div>
                </div>
                <div className="w-10 h-px bg-[#0284C7]" />
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                LAYER 3: Blue-Fin Evaporator Cooling Coil (Copper + #0284C7 Fins)
            ---------------------------------------------------------------- */}
            <motion.div
              style={{
                y: l3Y,
                z: l3Z,
                willChange: "transform",
              }}
              className="absolute w-[88%] sm:w-[525px] h-[96px] sm:h-[110px] rounded-xl bg-[#0284C7] border-2 border-[#E0F2FE] shadow-xl flex items-center justify-between px-3 overflow-visible"
            >
              {/* Active Sanitization / Cooling Pulse Overlay */}
              <motion.div
                style={{ opacity: coilGlowOpacity }}
                className="pointer-events-none absolute inset-0 rounded-xl bg-[#E0F2FE]/25 ring-4 ring-[#0284C7]/40"
              />

              {/* Left Copper U-Bend Return Loops */}
              <div className="flex flex-col justify-around h-full py-2 pr-2 shrink-0">
                {[0, 1, 2, 3].map((loop) => (
                  <div
                    key={loop}
                    className="w-3.5 h-3.5 rounded-full border-2 border-[#FACC15] bg-[#0369A1]"
                  />
                ))}
              </div>

              {/* High-Density Aluminum Fin Array + Copper Refrigerant Lines */}
              <div className="relative flex-1 h-[78%] rounded-lg bg-[#0369A1] border border-[#BAE6FD]/60 overflow-hidden">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 500 80"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {/* Horizontal Copper Refrigerant Tubes */}
                  <line x1="0" y1="18" x2="500" y2="18" stroke="#FACC15" strokeWidth="3" />
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#FACC15" strokeWidth="3" />
                  <line x1="0" y1="62" x2="500" y2="62" stroke="#FACC15" strokeWidth="3" />
                  {/* Vertical Blue-Fin Heat Exchange Plates */}
                  {Array.from({ length: 50 }).map((_, i) => (
                    <line
                      key={i}
                      x1={i * 10}
                      y1="0"
                      x2={i * 10}
                      y2="80"
                      stroke="#E0F2FE"
                      strokeWidth="1.5"
                      strokeOpacity="0.78"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-2.5 py-0.5 rounded bg-[#0F172A]/85 text-[#FACC15] font-mono text-[10px] font-extrabold tracking-wider">
                    150 PSI HYDRO-JET SANITIZED CORE
                  </span>
                </div>
              </div>

              {/* Right Copper Manifold */}
              <div className="flex flex-col justify-around h-full py-2 pl-2 shrink-0">
                {[0, 1, 2, 3].map((loop) => (
                  <div
                    key={loop}
                    className="w-3.5 h-3.5 rounded-full border-2 border-[#FACC15] bg-[#0369A1]"
                  />
                ))}
              </div>

              {/* Apple-Style Engineering Callout Line (03) */}
              <div
                className={`hidden md:flex items-center gap-2 absolute -right-56 top-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none ${
                  calloutsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-10 h-px bg-[#0284C7]" />
                <div className="text-left">
                  <div className="text-xs font-extrabold text-[#0F172A] leading-tight">
                    {t.story.layers[2].name}
                  </div>
                  <div className="text-[11px] font-mono text-[#0369A1]">
                    {t.story.layers[2].spec}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                LAYER 2: Dual High-Density Honey-Comb Pre-Filters
            ---------------------------------------------------------------- */}
            <motion.div
              style={{
                y: l2Y,
                z: l2Z,
                rotateX: l2RotX,
                rotateZ: l2RotZ,
                willChange: "transform",
              }}
              className="absolute w-[86%] sm:w-[510px] h-[78px] sm:h-[88px] grid grid-cols-2 gap-3 pointer-events-none"
            >
              {[0, 1].map((filterIndex) => (
                <div
                  key={filterIndex}
                  className="rounded-xl bg-[#E0F2FE]/90 border-2 border-[#0284C7] shadow-md p-2 flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[#0369A1]">
                    <span>PM2.5 HONEYCOMB MESH 0{filterIndex + 1}</span>
                    <span>100% CLEAR</span>
                  </div>
                  <svg
                    className="w-full h-11"
                    viewBox="0 0 200 44"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id={`mesh-grid-${filterIndex}`}
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 10 0 L 0 0 0 10"
                          fill="none"
                          stroke="#0284C7"
                          strokeWidth="1"
                          strokeOpacity="0.55"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="200"
                      height="44"
                      fill={`url(#mesh-grid-${filterIndex})`}
                    />
                  </svg>
                </div>
              ))}

              {/* Apple-Style Engineering Callout Line (02) */}
              <div
                className={`hidden md:flex items-center gap-2 absolute -left-56 top-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none ${
                  calloutsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-right">
                  <div className="text-xs font-extrabold text-[#0F172A] leading-tight">
                    {t.story.layers[1].name}
                  </div>
                  <div className="text-[11px] font-mono text-[#0369A1]">
                    {t.story.layers[1].spec}
                  </div>
                </div>
                <div className="w-10 h-px bg-[#0284C7]" />
              </div>
            </motion.div>

            {/* ----------------------------------------------------------------
                LAYER 1 (FRONT): Outer Aerodynamic Fascia & Smart LED Display
            ---------------------------------------------------------------- */}
            <motion.div
              style={{
                y: l1Y,
                z: l1Z,
                rotateX: l1RotX,
                willChange: "transform",
              }}
              className="absolute w-[92%] sm:w-[560px] h-[116px] sm:h-[132px] rounded-2xl bg-white border-2 border-[#0284C7] shadow-2xl flex flex-col justify-between p-4 sm:p-5"
            >
              {/* Top Aerodynamic Intake Contour & Brand Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD]">
                  <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                  <span className="text-xs font-extrabold tracking-tight text-[#0F172A] uppercase">
                    {brand.name}
                  </span>
                </div>

                <span className="text-[11px] font-mono font-bold text-[#0369A1] tabular-nums">
                  {brand.psi} PSI CERTIFIED PROTOCOL
                </span>
              </div>

              {/* Sleek Center Horizon Seam & Smart 18°C LED Matrix */}
              <div className="my-auto flex items-center justify-between gap-4 border-y border-[#E0F2FE] py-2">
                <div className="text-xs font-bold text-[#334155]">
                  INVERTER SPLIT SYSTEM
                </div>

                {/* Smart LED Display */}
                <div className="inline-flex items-center gap-2.5 bg-[#0F172A] text-white px-3.5 py-1 rounded-lg border border-[#0284C7]">
                  <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
                  <span className="font-mono text-base sm:text-lg font-extrabold text-[#FACC15] tabular-nums">
                    18°C
                  </span>
                  <span className="text-[10px] font-mono text-[#E0F2FE] uppercase">
                    PURE COOL
                  </span>
                </div>
              </div>

              {/* Lower Coanda Discharge Lip */}
              <div className="h-2 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                <div className="w-24 h-1 rounded-full bg-[#0284C7]" />
              </div>

              {/* Apple-Style Engineering Callout Line (01) */}
              <div
                className={`hidden md:flex items-center gap-2 absolute -right-56 top-1/2 -translate-y-1/2 transition-opacity duration-300 pointer-events-none ${
                  calloutsVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="w-10 h-px bg-[#0284C7]" />
                <div className="text-left">
                  <div className="text-xs font-extrabold text-[#0F172A] leading-tight">
                    {t.story.layers[0].name}
                  </div>
                  <div className="text-[11px] font-mono text-[#0369A1]">
                    {t.story.layers[0].spec}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ====================================================================
            BOTTOM: FLOATING INTERACTIVE EXPLODE SLIDER & SCROLL INDICATOR
        ==================================================================== */}
        <div className="relative z-30 max-w-md w-full mx-auto shrink-0 pb-1 sm:pb-3">
          <div className="rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#0284C7] shadow-lg px-4 py-2 sm:py-2.5">
            <div className="flex items-center justify-between text-xs font-extrabold text-[#0F172A] mb-1">
              <span className="inline-flex items-center gap-1.5 text-[#0369A1]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{t.story.scrollHint}</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FACC15] text-[#0F172A] tabular-nums">
                {Math.round(displayProgress * 100)}%
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={displayProgress}
              onChange={handleManualScrub}
              aria-label={t.story.scrubLabel}
              className="w-full h-2 rounded-lg appearance-none bg-[#E0F2FE] accent-[#0284C7] cursor-pointer"
            />

            <div className="mt-1 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#475569]">
              <span>{t.story.assembled}</span>
              <span>{t.story.exploded}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

