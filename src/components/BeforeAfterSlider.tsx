"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  AlertTriangle,
  Sparkles,
  Wind,
  Zap,
  ShieldCheck,
  ThermometerSnowflake,
  Flame,
  MoveHorizontal,
  CheckCircle2,
  XCircle,
} from "lucide-react";
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
      // Ignore if pointer capture already released
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(4, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(96, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(10);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(90);
    }
  };

  return (
    <section
      id="comparison"
      className="py-20 lg:py-24 bg-[#F8FAFC] border-y border-[#BAE6FD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading & Preset Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              {t.slider.heading}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
              {t.slider.description}
            </p>
          </div>

          {/* Quick View Presets */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-[#BAE6FD] shadow-sm self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setSliderPosition(85)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                sliderPosition > 65
                  ? "bg-[#0F172A] text-white"
                  : "text-[#334155] hover:bg-[#F8FAFC]"
              }`}
            >
              {t.slider.presetDirty}
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                sliderPosition >= 35 && sliderPosition <= 65
                  ? "bg-[#FACC15] text-[#0F172A]"
                  : "text-[#334155] hover:bg-[#F8FAFC]"
              }`}
            >
              {t.slider.presetSplit}
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(15)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                sliderPosition < 35
                  ? "bg-[#0284C7] text-white"
                  : "text-[#334155] hover:bg-[#F8FAFC]"
              }`}
            >
              {t.slider.presetClean}
            </button>
          </div>
        </div>

        {/* Interactive Split-Screen Coil Comparison Canvas */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-label="Before and After Aircon Coil Cleaning Comparison Slider"
          aria-valuemin={4}
          aria-valuemax={96}
          aria-valuenow={sliderPosition}
          tabIndex={0}
          className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden border-2 border-[#0284C7] shadow-lg select-none touch-none cursor-ew-resize bg-[#0F172A]"
        >
          {/* ============================================================
              RIGHT / BASE LAYER: AFTER (DEEP-CLEANED, SANITIZED COIL)
          ============================================================ */}
          <div className="absolute inset-0 bg-[#0369A1] flex flex-col justify-between p-5 sm:p-8 text-white">
            {/* Precision Clean Evaporator Fin Grid Pattern via SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="clean-coil-fins"
                  width="14"
                  height="48"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="4"
                    y1="0"
                    x2="4"
                    y2="48"
                    stroke="#E0F2FE"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="0"
                    x2="10"
                    y2="48"
                    stroke="#BAE6FD"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="24"
                    x2="14"
                    y2="24"
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#clean-coil-fins)" />
            </svg>

            {/* Clean Side Top Status Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E0F2FE] bg-[#075985]/90 px-3 py-1.5 rounded-lg border border-[#38BDF8]/40">
                <ThermometerSnowflake className="w-4 h-4 text-[#FACC15]" />
                <span>10.5°C ARCTIC FLOW</span>
              </div>
              <span className="inline-flex items-center gap-2 bg-[#FACC15] text-[#0F172A] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4" />
                {t.slider.after.badge}
              </span>
            </div>

            {/* Clean Side Center Graphic: Gleaming Evaporator Core & Laminar Airflow */}
            <div className="relative z-10 my-auto flex flex-col items-end text-right max-w-lg ml-auto pointer-events-none">
              <div className="bg-[#075985]/90 backdrop-blur-md border border-[#BAE6FD]/50 rounded-2xl p-4 sm:p-6 shadow-md max-w-md">
                <div className="flex items-center justify-end gap-2 text-[#FACC15] font-bold text-xs sm:text-sm mb-1.5">
                  <Wind className="w-4 h-4" />
                  <span>100% UNOBSTRUCTED ALUMINUM FINS</span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {t.slider.after.title}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2.5 text-left">
                  <div className="bg-[#0369A1]/90 p-2.5 rounded-xl border border-[#38BDF8]/40">
                    <span className="block text-[11px] text-[#E0F2FE] font-medium">
                      {t.slider.after.supplyTemp}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[#FACC15] tabular-nums">
                      {t.slider.after.supplyTempVal}
                    </span>
                  </div>
                  <div className="bg-[#0369A1]/90 p-2.5 rounded-xl border border-[#38BDF8]/40">
                    <span className="block text-[11px] text-[#E0F2FE] font-medium">
                      {t.slider.after.finBlockage}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-white tabular-nums">
                      {t.slider.after.finBlockageVal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Side Bottom Telemetry */}
            <div className="relative z-10 flex items-center justify-end gap-3 text-xs sm:text-sm font-semibold text-[#E0F2FE]">
              <ShieldCheck className="w-4 h-4 text-[#FACC15]" />
              <span>{t.slider.after.airQualityVal}</span>
            </div>
          </div>

          {/* ============================================================
              LEFT / CLIPPED LAYER: BEFORE (DUSTY, CLOGGED AIRCON UNIT)
          ============================================================ */}
          <div
            className="absolute inset-0 bg-[#1E293B] flex flex-col justify-between p-5 sm:p-8 text-white"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            {/* Clogged Dusty Coil Fin Texture & Biofilm Patches via SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-45 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="dirty-coil-fins"
                  width="14"
                  height="48"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="4"
                    y1="0"
                    x2="4"
                    y2="48"
                    stroke="#64748B"
                    strokeWidth="2"
                  />
                  <line
                    x1="10"
                    y1="0"
                    x2="10"
                    y2="48"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  <circle cx="7" cy="14" r="5" fill="#334155" />
                  <circle cx="11" cy="34" r="6" fill="#0F172A" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dirty-coil-fins)" />
              {/* Simulated Dust & Mold Accretion Blobs */}
              <circle cx="22%" cy="48%" r="90" fill="#0F172A" opacity="0.65" />
              <circle cx="38%" cy="62%" r="75" fill="#334155" opacity="0.55" />
              <circle cx="15%" cy="30%" r="60" fill="#0F172A" opacity="0.6" />
            </svg>

            {/* Before Side Top Status Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 bg-[#FACC15] text-[#0F172A] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide shadow-sm">
                <AlertTriangle className="w-4 h-4" />
                {t.slider.before.badge}
              </span>
            </div>

            {/* Before Side Center Diagnostic Box */}
            <div className="relative z-10 my-auto max-w-md pointer-events-none">
              <div className="bg-[#0F172A]/95 backdrop-blur-md border border-slate-600 rounded-2xl p-4 sm:p-6 shadow-md">
                <div className="flex items-center gap-2 text-[#FACC15] font-bold text-xs sm:text-sm mb-1.5">
                  <Flame className="w-4 h-4" />
                  <span>HIGH COMPRESSOR STRAIN & BACTERIA</span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {t.slider.before.title}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <div className="bg-[#1E293B] p-2.5 rounded-xl border border-slate-700">
                    <span className="block text-[11px] text-slate-300 font-medium">
                      {t.slider.before.supplyTemp}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[#FACC15] tabular-nums">
                      {t.slider.before.supplyTempVal}
                    </span>
                  </div>
                  <div className="bg-[#1E293B] p-2.5 rounded-xl border border-slate-700">
                    <span className="block text-[11px] text-slate-300 font-medium">
                      {t.slider.before.powerDraw}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-white tabular-nums">
                      {t.slider.before.powerDrawVal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Before Side Bottom Status */}
            <div className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
              <Zap className="w-4 h-4 text-[#FACC15]" />
              <span>{t.slider.before.airQualityVal}</span>
            </div>
          </div>

          {/* ============================================================
              DRAGGABLE DIVIDER LINE & HANDLE
          ============================================================ */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-[#FACC15] shadow-[0_0_12px_rgba(15,23,42,0.5)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FACC15] border-4 border-[#0F172A] shadow-lg flex items-center justify-center text-[#0F172A] transition-transform duration-150">
              <MoveHorizontal className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Instruction Caption */}
        <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-[#475569] font-medium px-1">
          <span>{t.slider.instruction}</span>
          <span className="font-mono font-semibold text-[#0369A1] tabular-nums">
            {sliderPosition}% Before / {100 - sliderPosition}% After
          </span>
        </div>

        {/* Side-by-Side Technical Breakdown Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before Card */}
          <div
            onClick={() => setSliderPosition(85)}
            className={`rounded-2xl p-6 sm:p-7 border transition-all cursor-pointer ${
              sliderPosition >= 50
                ? "bg-white border-[#0F172A] shadow-md"
                : "bg-white/80 border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-900 text-[#FACC15]">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t.slider.before.badge}
              </span>
              <span className="text-xs font-bold text-[#475569] tabular-nums">
                {t.slider.before.finBlockageVal}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#0F172A]">
              {t.slider.before.title}
            </h3>
            <p className="mt-2 text-sm text-[#334155] leading-relaxed">
              {t.slider.before.subtitle}
            </p>
            <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
              {t.slider.before.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-[#334155]"
                >
                  <XCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Card */}
          <div
            onClick={() => setSliderPosition(15)}
            className={`rounded-2xl p-6 sm:p-7 border transition-all cursor-pointer ${
              sliderPosition < 50
                ? "bg-white border-[#0284C7] shadow-md"
                : "bg-white/80 border-[#BAE6FD] hover:border-[#0284C7]"
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#0284C7] text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
                {t.slider.after.badge}
              </span>
              <span className="text-xs font-bold text-[#0369A1] tabular-nums">
                {t.slider.after.finBlockageVal}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#0F172A]">
              {t.slider.after.title}
            </h3>
            <p className="mt-2 text-sm text-[#334155] leading-relaxed">
              {t.slider.after.subtitle}
            </p>
            <ul className="mt-5 space-y-2.5 border-t border-[#E0F2FE] pt-4">
              {t.slider.after.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-[#0F172A] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

