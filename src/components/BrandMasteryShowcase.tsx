"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BRANDS, getBrand, type BrandId } from "@/lib/brands";
import { BrandLogo } from "@/components/BrandLogos";
import { InteractiveAirconRig } from "@/components/InteractiveAirconRig";

interface BrandMasteryShowcaseProps {
  activeBrand: BrandId;
  onSelectBrand: (brand: BrandId) => void;
  onPreviewInHero?: (brand: BrandId) => void;
}

export function BrandMasteryShowcase({
  activeBrand,
  onSelectBrand,
}: BrandMasteryShowcaseProps) {
  const { t, language } = useLanguage();
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

        {/* 12-Column Split-Screen Interactive Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT COLUMN (6 cols): Minimalist Header + 13-Brand Logo Grid + Spec Readout */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.04]">
                {language === "en"
                  ? "13 Brands. Mastered."
                  : "เชี่ยวชาญครบ 13 แบรนด์ชั้นนำ"}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#334155] font-medium leading-relaxed">
                {t.brands.sub}
              </p>
            </div>

            {/* Interactive 13-Brand SVG Wordmark Grid */}
            <div
              role="tablist"
              aria-label={t.brands.dockLabel}
              className="grid grid-cols-3 sm:grid-cols-4 gap-2.5"
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
                    className={`group rounded-2xl p-3 text-left transition-all cursor-pointer border flex flex-col justify-between h-20 ${
                      isSelected
                        ? "bg-white border-2 border-[#0284C7] shadow-md"
                        : "bg-white/90 border-slate-200/90 hover:bg-white hover:border-[#0284C7]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`font-mono text-[10px] font-extrabold tabular-nums ${
                          isSelected ? "text-[#0284C7]" : "text-[#64748B]"
                        }`}
                      >
                        {numIndex}
                      </span>
                      <span
                        className={`font-mono text-[9px] font-extrabold px-1.5 py-0.5 rounded tabular-nums ${
                          isSelected
                            ? "bg-[#FACC15] text-[#0F172A]"
                            : "bg-slate-100 text-[#475569]"
                        }`}
                      >
                        {b.psi} PSI
                      </span>
                    </div>

                    <div
                      className={`w-full h-6 flex items-center justify-start transition-all duration-200 ${
                        isSelected
                          ? "grayscale-0 opacity-100"
                          : "grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100"
                      }`}
                    >
                      <BrandLogo
                        brand={b.id}
                        className="max-w-[115px] h-5 object-contain"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Compact, Icon-Free Specification Readout for Selected Brand */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#0284C7] block">
                    {t.brands.techLabel}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0F172A] mt-0.5">
                    {profile.tech}
                  </h3>
                </div>
                <span className="font-mono text-xs font-extrabold text-[#0369A1] tabular-nums shrink-0">
                  {selected.psi} PSI • {selected.minutes} {t.brands.minutes}
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#0284C7] block">
                  {t.brands.methodLabel}
                </span>
                <p className="mt-1 text-sm text-[#334155] leading-relaxed font-medium">
                  {profile.method}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (6 cols): Interactive 5-Layer Exploded/Assembled Aircon Rig */}
          <div className="lg:col-span-6">
            <InteractiveAirconRig
              selectedBrandId={selected.id}
              selectedBrandName={selected.name}
              selectedBrandColor="#0284C7"
              psi={selected.psi}
              panel={selected.panel}
              louver={selected.louver}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
