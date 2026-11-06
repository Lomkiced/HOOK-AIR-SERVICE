"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Gauge, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BRANDS, getBrand, type BrandId, type PanelStyle } from "@/lib/brands";

interface BrandMasteryShowcaseProps {
  activeBrand: BrandId;
  onSelectBrand: (brand: BrandId) => void;
  onPreviewInHero: (brand: BrandId) => void;
}

function renderBrandFasciaPattern(panel: PanelStyle) {
  if (panel === "micro") {
    // Samsung WindFree 23,000 micro-holes array
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

  // Smooth aerodynamic Coanda profile
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
      className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-[#BAE6FD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Apple-Style Heading */}
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.04]">
            {t.brands.heading}
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-[#334155] font-medium">
            {t.brands.sub}
          </p>
        </div>

        {/* 1. Infinite Velocity Marquee + Interactive 13-Brand Dock */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-[#0369A1] border border-[#0284C7] py-3 px-2">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-3 w-max"
          >
            {[...BRANDS, ...BRANDS].map((b, idx) => {
              const isSelected = b.id === activeBrand;
              return (
                <button
                  key={`${b.id}-${idx}`}
                  type="button"
                  onClick={() => onSelectBrand(b.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#FACC15] text-[#0F172A]"
                      : "bg-[#075985] text-[#E0F2FE] hover:bg-[#0284C7] hover:text-white"
                  }`}
                >
                  {b.name} • {b.psi} PSI
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-extrabold text-[#0369A1] mb-3">
            {t.brands.dockLabel} ({BRANDS.length})
          </div>

          {/* Interactive Brand Pills Dock */}
          <div
            role="tablist"
            aria-label={t.brands.dockLabel}
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            {BRANDS.map((b) => {
              const isSelected = b.id === activeBrand;
              return (
                <button
                  key={b.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectBrand(b.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#FACC15] text-[#0F172A] border-[#EAB308] shadow-sm scale-[1.02]"
                      : "bg-white text-[#0F172A] border-[#BAE6FD] hover:bg-[#E0F2FE]/70 hover:border-[#0284C7]"
                  }`}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Brand-Specific Animated Hardware Visualizer Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 rounded-3xl bg-white border-2 border-[#0284C7] shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Interactive Hardware Schematic Visualizer (6 cols) */}
            <div className="lg:col-span-6 bg-[#0369A1] rounded-2xl p-6 sm:p-8 text-white border border-[#0284C7]">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FACC15] text-[#0F172A] text-xs font-extrabold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  {selected.name}
                </span>
                <span className="font-mono text-xs font-bold text-[#E0F2FE] tabular-nums">
                  {selected.psi} PSI • {selected.minutes} {t.brands.minutes}
                </span>
              </div>

              {/* Morphing Brand Chassis Unit */}
              <div className="rounded-2xl bg-white text-[#0F172A] p-4 border-2 border-[#BAE6FD] shadow-md">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold tracking-tight uppercase text-[#0F172A]">
                    {selected.name} — {selected.panel.toUpperCase()} FASCIA
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0F172A] text-[#FACC15] font-mono text-xs font-extrabold tabular-nums">
                    18°C
                  </span>
                </div>

                {/* Brand-Specific Fascia Surface Texture */}
                <div className="rounded-xl bg-[#F8FAFC] border border-[#BAE6FD] overflow-hidden">
                  {renderBrandFasciaPattern(selected.panel)}
                </div>

                {/* Brand-Specific Louver Geometry */}
                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono font-bold text-[#0369A1]">
                  <span>LOUVER: {selected.louver.toUpperCase()}</span>
                  <span>HYDRO-SAFE VERIFIED</span>
                </div>
              </div>

              {/* Telemetry Pills */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#075985] border border-[#38BDF8]/40 p-3 flex items-center gap-2.5">
                  <Gauge className="w-5 h-5 text-[#FACC15] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#E0F2FE]">
                      {t.brands.pressureLabel}
                    </div>
                    <div className="text-base font-extrabold text-white tabular-nums">
                      {selected.psi} PSI
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-[#075985] border border-[#38BDF8]/40 p-3 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#FACC15] shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#E0F2FE]">
                      {t.brands.timeLabel}
                    </div>
                    <div className="text-base font-extrabold text-white tabular-nums">
                      {selected.minutes} {t.brands.minutes}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Brand Engineering & Cleaning Protocol Details (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">
                  {t.brands.techLabel}
                </div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                  {profile.tech}
                </h3>

                <div className="mt-6 text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">
                  {t.brands.methodLabel}
                </div>
                <p className="mt-1.5 text-base sm:text-lg text-[#334155] leading-relaxed font-medium">
                  {profile.method}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onPreviewInHero(selected.id)}
                  className="px-5 py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>
                    {t.brands.preview} ({selected.name})
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0369A1]">
                  <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                  <span>30-Day Leak Warranty</span>
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
