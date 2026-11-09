"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MapDispatchLoaderProps {
  externalProgress?: number;
  onComplete?: () => void;
}

const WORLD_ROUTE =
  "M 100 520 L 320 520 Q 400 520 400 440 L 400 240 Q 400 160 480 160 L 680 160";

export function MapDispatchLoader({
  externalProgress,
  onComplete,
}: MapDispatchLoaderProps) {
  const [isDone, setIsDone] = useState(false);

  // Direct DOM refs updated inside rAF at full 60/120/144Hz sub-pixel precision (zero React re-renders)
  const pathRef = useRef<SVGPathElement | null>(null);
  const worldGroupRef = useRef<SVGGElement | null>(null);
  const trikeGroupRef = useRef<SVGGElement | null>(null);
  const navGlowOuterRef = useRef<SVGPathElement | null>(null);
  const navGlowCoreRef = useRef<SVGPathElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    // Cache total path length once so we never force SVG geometry recalculation inside rAF
    const totalLen = pathEl.getTotalLength();

    if (navGlowOuterRef.current) {
      navGlowOuterRef.current.style.strokeDasharray = `${totalLen}`;
    }
    if (navGlowCoreRef.current) {
      navGlowCoreRef.current.style.strokeDasharray = `${totalLen}`;
    }

    let lastDisplayedPct = -1;

    // Sub-pixel continuous pose updater (t in [0.0000, 1.0000] — NEVER quantized to integers!)
    const applyContinuousPose = (normalizedT: number) => {
      const clampedT = Math.max(0, Math.min(1, normalizedT));
      const currentLen = clampedT * totalLen;

      const pt = pathEl.getPointAtLength(currentLen);
      // Symmetric tangent sampling across [-6px, +6px] for silky-smooth steering rotation on curves
      const behindPt = pathEl.getPointAtLength(Math.max(0, currentLen - 6));
      const aheadPt = pathEl.getPointAtLength(
        Math.min(totalLen, currentLen + 6)
      );
      const angle =
        (Math.atan2(aheadPt.y - behindPt.y, aheadPt.x - behindPt.x) * 180) /
        Math.PI;

      // Camera center in the 260x260 viewBox is (130, 130)
      const camTranslateX = 130 - pt.x;
      const camTranslateY = 130 - pt.y;

      if (worldGroupRef.current) {
        worldGroupRef.current.setAttribute(
          "transform",
          `translate(${camTranslateX.toFixed(3)}, ${camTranslateY.toFixed(3)})`
        );
      }

      if (trikeGroupRef.current) {
        trikeGroupRef.current.setAttribute(
          "transform",
          `translate(${pt.x.toFixed(3)}, ${pt.y.toFixed(3)}) rotate(${angle.toFixed(2)})`
        );
      }

      const dashOffset = `${(-currentLen).toFixed(2)}`;
      if (navGlowOuterRef.current) {
        navGlowOuterRef.current.style.strokeDashoffset = dashOffset;
      }
      if (navGlowCoreRef.current) {
        navGlowCoreRef.current.style.strokeDashoffset = dashOffset;
      }

      const roundedPct = Math.round(clampedT * 100);
      if (roundedPct !== lastDisplayedPct && progressTextRef.current) {
        lastDisplayedPct = roundedPct;
        progressTextRef.current.textContent = `${roundedPct}%`;
      }
    };

    if (typeof externalProgress === "number") {
      const normalized = Math.max(0, Math.min(100, externalProgress)) / 100;
      const rafId = requestAnimationFrame(() => {
        applyContinuousPose(normalized);
      });
      if (externalProgress >= 100) {
        const t = setTimeout(() => {
          setIsDone(true);
          onCompleteRef.current?.();
        }, 350);
        return () => {
          cancelAnimationFrame(rafId);
          clearTimeout(t);
        };
      }
      return () => cancelAnimationFrame(rafId);
    }

    let frameId = 0;
    let doneTimeout: ReturnType<typeof setTimeout> | null = null;
    const duration = 2200;
    let startTime: number | null = null;

    // Initialize at t = 0 immediately before first paint
    applyContinuousPose(0);

    const tick = (now: number) => {
      if (startTime === null) {
        startTime = now;
      }
      const elapsed = Math.max(0, now - startTime);
      const rawT = Math.min(1, elapsed / duration);

      // Continuous C1-smooth sine ease-in-out curve (zero sudden acceleration jumps)
      const easedT = 0.5 * (1 - Math.cos(Math.PI * rawT));

      applyContinuousPose(easedT);

      if (rawT < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        doneTimeout = setTimeout(() => {
          setIsDone(true);
          onCompleteRef.current?.();
        }, 320);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      if (doneTimeout) clearTimeout(doneTimeout);
    };
  }, [externalProgress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="minimal-trike-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060a12] select-none overflow-hidden"
        >
          {/* Compact Feathered Camera Lens Following the 3-Wheeler */}
          <div
            className="relative w-72 h-72 sm:w-80 sm:h-80 overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle, black 42%, transparent 72%)",
              maskImage:
                "radial-gradient(circle, black 42%, transparent 72%)",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full"
              fill="none"
              shapeRendering="geometricPrecision"
            >
              <defs>
                <linearGradient id="trikeBeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Moving World Group (Camera Locked to 3-Wheeler via Direct rAF Transform) */}
              <g ref={worldGroupRef} transform="translate(30, -390)">
                {/* Subtle Minimalist City Blocks Passing By */}
                <rect
                  x="60"
                  y="360"
                  width="190"
                  height="100"
                  rx="14"
                  fill="#0f172a"
                />
                <rect
                  x="280"
                  y="360"
                  width="65"
                  height="100"
                  rx="14"
                  fill="#0f172a"
                />
                <rect
                  x="140"
                  y="575"
                  width="220"
                  height="95"
                  rx="14"
                  fill="#0f172a"
                />
                <rect
                  x="455"
                  y="215"
                  width="190"
                  height="170"
                  rx="14"
                  fill="#0f172a"
                />
                <rect
                  x="230"
                  y="180"
                  width="115"
                  height="150"
                  rx="14"
                  fill="#0f172a"
                />
                <rect
                  x="440"
                  y="25"
                  width="210"
                  height="85"
                  rx="14"
                  fill="#0f172a"
                />

                {/* Cross Streets */}
                <path
                  d="M 265 200 L 265 700 M 540 0 L 540 450 M 100 340 L 700 340"
                  stroke="#0f172a"
                  strokeWidth="18"
                />

                {/* Main Road Outer Curb */}
                <path
                  d={WORLD_ROUTE}
                  stroke="#1e293b"
                  strokeWidth="44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Main Road Asphalt */}
                <path
                  ref={pathRef}
                  d={WORLD_ROUTE}
                  stroke="#0f172a"
                  strokeWidth="36"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Center Dashed Line */}
                <path
                  d={WORLD_ROUTE}
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  strokeLinecap="round"
                />

                {/* Glowing Navigation Line Ahead of the Trike (Zero-Filter Layered Vector Glow for 120FPS) */}
                <path
                  ref={navGlowOuterRef}
                  d={WORLD_ROUTE}
                  stroke="#0284c7"
                  strokeWidth="14"
                  strokeOpacity="0.32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  ref={navGlowCoreRef}
                  d={WORLD_ROUTE}
                  stroke="#38bdf8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Destination Pin (Only enters camera frame near the end of the drive!) */}
                <g transform="translate(680, 160)">
                  <circle r="18" fill="#ef4444" opacity="0.22" />
                  <circle r="6" fill="#facc15" />
                  <path
                    d="M0 -28 C-9 -28 -16 -21 -16 -12 C-16 -2 0 8 0 8 C0 8 16 -2 16 -12 C16 -21 9 -28 0 -28 Z"
                    fill="#ef4444"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="-13" r="4.5" fill="#ffffff" />
                </g>

                {/* THE 3-WHEELED VEHICLE (Centered in Camera, Rotating Smoothly on Turns) */}
                <g
                  ref={trikeGroupRef}
                  transform="translate(100, 520) rotate(0)"
                >
                  {/* Headlight Cone */}
                  <polygon
                    points="16,-6 52,-22 52,22 16,6"
                    fill="url(#trikeBeam)"
                  />

                  {/* Shadow */}
                  <rect
                    x="-20"
                    y="-12"
                    width="38"
                    height="24"
                    rx="6"
                    fill="rgba(0,0,0,0.6)"
                    transform="translate(2,3)"
                  />

                  {/* Rear 2 Wheels */}
                  <rect
                    x="-17"
                    y="-15"
                    width="11"
                    height="4.5"
                    rx="2"
                    fill="#020617"
                    stroke="#64748b"
                    strokeWidth="1"
                  />
                  <rect
                    x="-17"
                    y="10.5"
                    width="11"
                    height="4.5"
                    rx="2"
                    fill="#020617"
                    stroke="#64748b"
                    strokeWidth="1"
                  />

                  {/* Front Single 3rd Wheel & Fork */}
                  <rect
                    x="12"
                    y="-3"
                    width="9"
                    height="6"
                    rx="2.5"
                    fill="#020617"
                    stroke="#94a3b8"
                    strokeWidth="1"
                  />
                  <path d="M 9 -5 L 16 0 L 9 5 Z" fill="#facc15" />
                  <line
                    x1="7"
                    y1="-8"
                    x2="7"
                    y2="8"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Rear Blue Cargo Bed */}
                  <rect
                    x="-19"
                    y="-11"
                    width="23"
                    height="22"
                    rx="3.5"
                    fill="#0284c7"
                    stroke="#bae6fd"
                    strokeWidth="1.2"
                  />

                  {/* AC Condenser Unit in Cargo Bed */}
                  <rect
                    x="-16"
                    y="-7.5"
                    width="12"
                    height="15"
                    rx="1.5"
                    fill="#f8fafc"
                  />
                  <circle cx="-10" cy="0" r="4" fill="#0f172a" />
                  <circle cx="-10" cy="0" r="1.8" fill="#38bdf8" />

                  {/* Yellow Tuk-Tuk Canopy Roof */}
                  <path
                    d="M -3 -10 L 8 -7.5 Q 12 0 8 7.5 L -3 10 Z"
                    fill="#facc15"
                    stroke="#0f172a"
                    strokeWidth="1.2"
                  />
                </g>
              </g>
            </svg>
          </div>

          {/* Whisper-quiet numeric progress only (Zero words) */}
          <span
            ref={progressTextRef}
            className="mt-2 font-mono text-xs font-medium tracking-widest text-slate-500 tabular-nums"
          >
            0%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MapDispatchLoader;
