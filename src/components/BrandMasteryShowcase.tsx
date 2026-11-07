"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { BRANDS, getBrand, type BrandId, type PanelStyle } from "@/lib/brands";
import { BrandLogo } from "@/components/BrandLogos";

interface BrandMasteryShowcaseProps {
  activeBrand: BrandId;
  onSelectBrand: (brand: BrandId) => void;
  onPreviewInHero: (brand: BrandId) => void;
}

function renderBrandFasciaPattern(panel: PanelStyle) {
  if (panel === "micro") {
    return (
      <svg
        className="w-full h-16"
        viewBox="0 0 360 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="windfree-dots"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.35" fill="#0284C7" fillOpacity="0.7" />
          </pattern>
        </defs>
        <rect width="360" height="64" fill="url(#windfree-dots)" />
      </svg>
    );
  }

  if (panel === "ribbed") {
    return (
      <div className="w-full h-16 flex flex-col justify-evenly px-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-1.5 rounded-full bg-[#0284C7]/55" />
        ))}
      </div>
    );
  }

  if (panel === "mesh") {
    return (
      <svg
        className="w-full h-16"
        viewBox="0 0 360 64"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="ion-mesh"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 12 0 L 0 12 M 0 0 L 12 12"
              stroke="#0284C7"
              strokeWidth="1"
              strokeOpacity="0.45"
            />
          </pattern>
        </defs>
        <rect width="360" height="64" fill="url(#ion-mesh)" />
      </svg>
    );
  }

  if (panel === "slot") {
    return (
      <div className="w-full h-16 grid grid-cols-12 gap-1.5 items-center px-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-9 rounded bg-[#E0F2FE] border border-[#0284C7]/50"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-16 flex flex-col justify-between p-3">
      <div className="h-2 rounded-full bg-[#E0F2FE]" />
      <div className="h-0.5 w-full bg-[#0284C7]/45" />
      <div className="h-2 rounded-full bg-[#BAE6FD]/70" />
    </div>
  );
}

export function BrandMasteryShowcase({
  activeBrand,
  onSelectBrand,
  onPreviewInHero,
}: BrandMasteryShowcaseProps) {
  const { t } = useLanguage();
  const selected = getBrand(activeBrand);
  const profile = t.brands.profiles[activeBrand];

  return (
    <section
      id="brands"
      className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Index Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-10">
          <span className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#0284C7]">
            {t.brands.sectionIndex}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#475569] tabular-nums">
            13 OEM PROFILES • 100–150 PSI
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.03]">
            {t.brands.heading}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#334155] font-medium leading-relaxed">
            {t.brands.sub}
          </p>
        </div>

        {/* 1. Infinite Velocity SVG Brand Wordmark Marquee */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-white border border-slate-200/90 py-3.5 px-2 shadow-2xs">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-4 w-max"
          >
            {[...BRANDS, ...BRANDS].map((b, idx) => {
              const isSelected = b.id === activeBrand;
              return (
                <button
                  key={`${b.id}-${idx}`}
                  type="button"
                  onClick={() => onSelectBrand(b.id)}
                  className={`group px-5 py-2.5 rounded-xl border transition-all cursor-pointer shrink-0 flex items-center gap-4 ${
                    isSelected
                      ? "bg-[#F8FAFC] border-[#0284C7] shadow-2xs"
                      : "bg-white border-slate-200/70 hover:border-[#0284C7]/60"
                  }`}
                >
                  <div
                    className={`w-28 h-6 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "grayscale-0 opacity-100"
                        : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                    }`}
                  >
                    <BrandLogo brand={b.id} className="w-full h-full" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#475569] tabular-nums border-l border-slate-200 pl-3">
                    {b.psi} PSI
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* 2. Authentic 13-Brand SVG Logo Matrix */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-extrabold uppercase tracking-[0.14em] text-[#0369A1]">
              {t.brands.dockLabel} ({BRANDS.length})
            </span>
          </div>

          <div
            role="tablist"
            aria-label={t.brands.dockLabel}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {BRANDS.map((b, index) => {
              const isSelected = b.id === activeBrand;
              const numIndex = String(index + 1).padStart(2, "0");
              return (
                <button
                  key={b.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectBrand(b.id)}
                  className={`group relative rounded-2xl p-4 text-left transition-all cursor-pointer border flex flex-col justify-between h-28 ${
                    isSelected
                      ? "bg-white border-2 border-[#0284C7] shadow-md"
                      : "bg-white/90 border-slate-200/90 hover:bg-white hover:border-[#0284C7]/60"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-[11px] font-extrabold tabular-nums ${
                        isSelected ? "text-[#0284C7]" : "text-[#64748B]"
                      }`}
                    >
                      {numIndex}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded tabular-nums ${
                        isSelected
                          ? "bg-[#FACC15] text-[#0F172A]"
                          : "bg-slate-100 text-[#475569]"
                      }`}
                    >
                      {b.psi} PSI
                    </span>
                  </div>

                  <div
                    className={`w-full h-9 flex items-center justify-start transition-all duration-200 my-1 ${
                      isSelected
                        ? "grayscale-0 opacity-100"
                        : "grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100"
                    }`}
                  >
                    <BrandLogo
                      brand={b.id}
                      className="max-w-[140px] h-7 object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between w-full pt-1 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-[#334155] truncate">
                      {b.name}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#64748B] tabular-nums">
                      {b.minutes}m
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Selected Brand Engineering & Protocol Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 rounded-3xl bg-white border-2 border-[#0284C7] shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left: Interactive Hardware Schematic Visualizer (6 cols) */}
            <div className="lg:col-span-6 bg-[#0F172A] rounded-2xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="bg-white rounded-xl px-4 py-2 h-10 flex items-center justify-center border border-[#BAE6FD]">
                    <BrandLogo brand={selected.id} className="w-28 h-6" />
                  </div>
                  <span className="font-mono text-xs font-extrabold text-[#FACC15] tabular-nums tracking-wider">
                    {selected.psi} PSI • {selected.minutes} {t.brands.minutes}
                  </span>
                </div>

                {/* Morphing Brand Chassis Unit */}
                <div className="rounded-2xl bg-white text-[#0F172A] p-4 border-2 border-[#0284C7] shadow-md">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                    <span className="font-mono text-xs font-extrabold tracking-wider uppercase text-[#0F172A]">
                      {selected.name} — {selected.panel.toUpperCase()} FASCIA
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#0F172A] text-[#FACC15] font-mono text-xs font-extrabold tabular-nums">
                      18.0°C
                    </span>
                  </div>

                  {/* Brand-Specific Fascia Surface Texture */}
                  <div className="rounded-xl bg-[#F8FAFC] border border-[#BAE6FD] overflow-hidden">
                    {renderBrandFasciaPattern(selected.panel)}
                  </div>

                  {/* Brand-Specific Louver Geometry */}
                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-[#0369A1]">
                    <span>LOUVER: {selected.louver.toUpperCase()}</span>
                    <span>OEM CALIBRATED</span>
                  </div>
                </div>
              </div>

              {/* Numeric Telemetry Readouts (No Decorative Icons) */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
                  <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#38BDF8]">
                    {t.brands.pressureLabel}
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                    {selected.psi}{" "}
                    <span className="text-xs font-mono text-[#FACC15]">PSI</span>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
                  <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#38BDF8]">
                    {t.brands.timeLabel}
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                    {selected.minutes}{" "}
                    <span className="text-xs font-mono text-[#E0F2FE]">
                      {t.brands.minutes}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Brand Engineering & Cleaning Protocol Details (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-5">
                  <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">
                    {t.brands.techLabel}
                  </div>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                    {profile.tech}
                  </h3>
                </div>

                <div>
                  <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">
                    {t.brands.methodLabel}
                  </div>
                  <p className="mt-2 text-base sm:text-lg text-[#334155] leading-relaxed font-medium">
                    {profile.method}
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onPreviewInHero(selected.id)}
                  className="px-6 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm transition-colors cursor-pointer"
                >
                  {t.brands.preview} ({selected.name}) →
                </button>

                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                  30-DAY WORKMANSHIP WARRANTY
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
