"use client";

import React, { useState, useRef, useCallback } from "react";
import { MoveHorizontal, Sparkles, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function BeforeAfterSlider() {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, rawPercent));
    setSliderPosition(Math.round(clamped));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore release error
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(4, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(96, prev + 5));
    }
  };

  return (
    <section id="comparison" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Single-Word Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.02]">
              {t.slider.heading}
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-[#334155] font-medium">
              {t.slider.sub}
            </p>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
            {t.slider.instruction}
          </span>
        </div>

        {/* Interactive Split-Screen Coil Comparison Stage */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-label={t.slider.ariaLabel}
          aria-valuemin={4}
          aria-valuemax={96}
          aria-valuenow={sliderPosition}
          tabIndex={0}
          className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border-2 border-[#0284C7] shadow-2xl select-none touch-none cursor-ew-resize bg-[#0F172A]"
        >
          {/* ==============================================================
              AFTER LAYER (BASE): DEEP-CLEANED SANITIZED COIL
          ============================================================== */}
          <div className="absolute inset-0 bg-[#0284C7] flex flex-col justify-between p-6 sm:p-10 text-white">
            <svg
              className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="clean-fins-minimal"
                  width="14"
                  height="48"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="5"
                    y1="0"
                    x2="5"
                    y2="48"
                    stroke="#E0F2FE"
                    strokeWidth="2"
                  />
                  <line
                    x1="11"
                    y1="0"
                    x2="11"
                    y2="48"
                    stroke="#BAE6FD"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="24"
                    x2="14"
                    y2="24"
                    stroke="#FACC15"
                    strokeWidth="2.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#clean-fins-minimal)" />
            </svg>

            <div className="relative z-10 flex justify-end">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FACC15] text-[#0F172A] text-xs sm:text-sm font-extrabold">
                <Sparkles className="w-4 h-4" />
                {t.slider.after.label}
              </span>
            </div>

            {/* Large Minimal Telemetry Readout */}
            <div className="relative z-10 ml-auto text-right">
              <div className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white tabular-nums">
                {t.slider.after.temp}
              </div>
              <div className="mt-2 inline-flex flex-wrap justify-end gap-3 text-xs sm:text-sm font-bold text-[#E0F2FE]">
                <span>
                  {t.slider.blockageLabel}: {t.slider.after.blockage}
                </span>
                <span>•</span>
                <span>
                  {t.slider.energyLabel}: {t.slider.after.energy}
                </span>
              </div>
            </div>
          </div>

          {/* ==============================================================
              BEFORE LAYER (CLIPPED): DUSTY, CLOGGED AIRCON UNIT
          ============================================================== */}
          <div
            className="absolute inset-0 bg-[#0F172A] flex flex-col justify-between p-6 sm:p-10 text-white"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-45 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="dirty-fins-minimal"
                  width="14"
                  height="48"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="5"
                    y1="0"
                    x2="5"
                    y2="48"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  <circle cx="7" cy="18" r="5.5" fill="#1E293B" />
                  <circle cx="10" cy="36" r="6" fill="#334155" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dirty-fins-minimal)" />
              <circle cx="26%" cy="52%" r="95" fill="#1E293B" opacity="0.7" />
              <circle cx="42%" cy="60%" r="80" fill="#334155" opacity="0.6" />
            </svg>

            <div className="relative z-10 flex justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0F172A] text-xs sm:text-sm font-extrabold">
                <AlertTriangle className="w-4 h-4 text-[#EAB308]" />
                {t.slider.before.label}
              </span>
            </div>

            <div className="relative z-10 mr-auto text-left">
              <div className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#FACC15] tabular-nums">
                {t.slider.before.temp}
              </div>
              <div className="mt-2 inline-flex flex-wrap gap-3 text-xs sm:text-sm font-bold text-slate-300">
                <span>
                  {t.slider.blockageLabel}: {t.slider.before.blockage}
                </span>
                <span>•</span>
                <span>
                  {t.slider.energyLabel}: {t.slider.before.energy}
                </span>
              </div>
            </div>
          </div>

          {/* ==============================================================
              DIVIDER LINE & HANDLE
          ============================================================== */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-[#FACC15] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FACC15] border-4 border-[#0F172A] shadow-lg flex items-center justify-center text-[#0F172A]">
              <MoveHorizontal className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
