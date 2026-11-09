"use client";

import React from "react";
import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { BrandId, PanelStyle } from "@/lib/brands";
import { BrandLogo } from "@/components/BrandLogos";

export interface InteractiveAirconRigProps {
  selectedBrandId?: BrandId;
  selectedBrandName: string;
  selectedBrandColor?: string;
  psi?: number;
  panel?: PanelStyle;
  louver?: string;
  /** Scroll-driven explode progress (0 = Assembled, 1 = Fully Scattered/Exploded) */
  scrollExplodeProgress: MotionValue<number>;
}

function renderFasciaSurface(panel: PanelStyle = "smooth") {
  if (panel === "micro") {
    return (
      <svg
        className="w-full h-11"
        viewBox="0 0 360 44"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="rig-windfree-dots"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.35" fill="#0284C7" fillOpacity="0.65" />
          </pattern>
        </defs>
        <rect width="360" height="44" fill="url(#rig-windfree-dots)" />
      </svg>
    );
  }

  if (panel === "ribbed") {
    return (
      <div className="w-full h-11 flex flex-col justify-evenly px-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-1 rounded-full bg-[#0284C7]/50" />
        ))}
      </div>
    );
  }

  if (panel === "mesh") {
    return (
      <svg
        className="w-full h-11"
        viewBox="0 0 360 44"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="rig-ion-mesh"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 10 M 0 0 L 10 10"
              stroke="#0284C7"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="360" height="44" fill="url(#rig-ion-mesh)" />
      </svg>
    );
  }

  if (panel === "slot") {
    return (
      <div className="w-full h-11 grid grid-cols-12 gap-1 items-center px-2.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-6 rounded-xs bg-[#E0F2FE] border border-[#0284C7]/45"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-11 flex flex-col justify-between p-2.5">
      <div className="h-1.5 rounded-full bg-[#E0F2FE]" />
      <div className="h-0.5 w-full bg-[#0284C7]/40" />
      <div className="h-1.5 rounded-full bg-[#BAE6FD]/70" />
    </div>
  );
}

export const InteractiveAirconRig = React.memo(function InteractiveAirconRig({
  selectedBrandId = "daikin",
  selectedBrandName,
  selectedBrandColor = "#0284C7",
  psi = 135,
  panel = "smooth",
  louver = "dual-flap",
  scrollExplodeProgress,
}: InteractiveAirconRigProps) {
  const { language } = useLanguage();

  // Whole-rig perspective angle driven directly by scroll (0 = Assembled, 1 = Scattered)
  const rigRotX = useTransform(scrollExplodeProgress, [0, 1], [0, 11]);
  const rigRotY = useTransform(scrollExplodeProgress, [0, 1], [0, -12]);

  // Layer 1: Front Aerodynamic Fascia
  const l1Y = useTransform(scrollExplodeProgress, [0, 1], [0, -138]);
  const l1Z = useTransform(scrollExplodeProgress, [0, 1], [0, 110]);
  const l1RotX = useTransform(scrollExplodeProgress, [0, 1], [0, 8]);

  // Layer 2: Dual Honeycomb Pre-Filters
  const l2Y = useTransform(scrollExplodeProgress, [0, 1], [0, -68]);
  const l2Z = useTransform(scrollExplodeProgress, [0, 1], [0, 55]);
  const l2RotX = useTransform(scrollExplodeProgress, [0, 1], [0, 12]);

  // Layer 4: Cross-Flow Cylindrical Blower Wheel
  const l4Y = useTransform(scrollExplodeProgress, [0, 1], [0, 68]);
  const l4Z = useTransform(scrollExplodeProgress, [0, 1], [0, -55]);

  // Layer 5: Rear Structural Chassis & Condensate Drain Pan
  const l5Y = useTransform(scrollExplodeProgress, [0, 1], [0, 138]);
  const l5Z = useTransform(scrollExplodeProgress, [0, 1], [0, -110]);
  const l5RotX = useTransform(scrollExplodeProgress, [0, 1], [0, -8]);

  // Floating part detail callouts opacity & X offset (appear smoothly as layers separate)
  const calloutOpacity = useTransform(scrollExplodeProgress, [0.18, 0.55], [0, 1]);
  const calloutLeftX = useTransform(scrollExplodeProgress, [0.18, 0.55], [14, 0]);
  const calloutRightX = useTransform(scrollExplodeProgress, [0.18, 0.55], [-14, 0]);

  return (
    <div
      className="relative h-[500px] sm:h-[560px] w-full flex items-center justify-center select-none overflow-visible"
      style={{ perspective: "1400px" }}
    >
      {/* Soft Ambient Cooling Aura in Open Space (No Card Box) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[380px] sm:w-[460px] h-[380px] sm:h-[460px] rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.16)_0%,rgba(186,230,253,0.08)_45%,transparent_72%)] blur-2xl"
      />

      {/* Free-Floating 3D 5-Layer Air-Conditioner Assembly (Zero Infinite Loop GPU Drain) */}
      <motion.div
        key={selectedBrandName}
        initial={{ scale: 0.96, opacity: 0.85 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.25 },
        }}
        style={{
          rotateX: rigRotX,
          rotateY: rigRotY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-full max-w-[420px] h-[320px] flex items-center justify-center"
      >
        {/* ====================================================================
            LAYER 5: REAR CHASSIS & DRAIN TROUGH + FLOATING DETAIL CALLOUT
        ==================================================================== */}
        <motion.div
          style={{ y: l5Y, z: l5Z, rotateX: l5RotX, willChange: "transform" }}
          className="absolute w-[84%] sm:w-[340px] h-[82px] rounded-2xl bg-[#0F172A] border-2 border-slate-600 shadow-2xl flex flex-col justify-between p-3"
        >
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-300">
            <span>05 / REAR CHASSIS</span>
            <span className="text-[#38BDF8]">DRAIN PAN</span>
          </div>
          <div className="grid grid-cols-8 gap-1 my-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-3 rounded-xs bg-slate-800 border border-slate-700"
              />
            ))}
          </div>

          {/* Floating Callout Pill — Right */}
          <motion.div
            style={{ opacity: calloutOpacity, x: calloutRightX }}
            className="hidden sm:flex items-center gap-2 absolute -right-44 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <span className="w-6 h-px bg-[#0284C7]" />
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#0284C7]/40 shadow-lg text-left">
              <div className="font-mono text-[9px] font-extrabold text-[#0284C7] uppercase">
                05 / DRAIN TROUGH
              </div>
              <div className="text-[11px] font-extrabold text-[#0F172A] whitespace-nowrap">
                {language === "en" ? "Anti-Sludge Flush" : "ล้างถาดน้ำทิ้งไร้เมือก"}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ====================================================================
            LAYER 4: CROSS-FLOW BLOWER WHEEL + FLOATING DETAIL CALLOUT
        ==================================================================== */}
        <motion.div
          style={{ y: l4Y, z: l4Z, willChange: "transform" }}
          className="absolute w-[80%] sm:w-[324px] h-[62px] rounded-xl bg-slate-900 border-2 border-[#38BDF8]/70 shadow-xl flex items-center justify-between px-3.5"
        >
          <span className="font-mono text-[10px] font-bold text-[#E0F2FE]">
            04 / TURBINE
          </span>
          <div className="flex-1 mx-3 h-6 rounded-full bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0369A1] border border-[#38BDF8]/70 flex items-center justify-evenly px-2 overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="w-0.5 h-full bg-[#E0F2FE]/70 -skew-x-12"
              />
            ))}
          </div>
          <span className="font-mono text-[10px] font-bold text-[#FACC15]">
            RPM OK
          </span>

          {/* Floating Callout Pill — Left */}
          <motion.div
            style={{ opacity: calloutOpacity, x: calloutLeftX }}
            className="hidden sm:flex items-center gap-2 absolute -left-48 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#0284C7]/40 shadow-lg text-right">
              <div className="font-mono text-[9px] font-extrabold text-[#0284C7] uppercase">
                04 / BLOWER WHEEL
              </div>
              <div className="text-[11px] font-extrabold text-[#0F172A] whitespace-nowrap">
                {language === "en" ? "Squirrel-Cage Strip" : "ถอดล้างพัดลมโพรงกระรอก"}
              </div>
            </div>
            <span className="w-6 h-px bg-[#0284C7]" />
          </motion.div>
        </motion.div>

        {/* ====================================================================
            LAYER 3: BLUE-FIN EVAPORATOR COIL + FLOATING DETAIL CALLOUT
        ==================================================================== */}
        <motion.div
          style={{ willChange: "transform" }}
          className="absolute w-[86%] sm:w-[350px] h-[82px] rounded-2xl bg-[#0369A1] border-2 border-[#38BDF8] shadow-[0_12px_36px_rgba(2,132,199,0.35)] flex flex-col justify-between p-3"
        >
          <div className="relative z-10 flex items-center justify-between font-mono text-[10px] font-extrabold text-white">
            <span>03 / EVAPORATOR CORE</span>
            <span className="px-2 py-0.5 rounded bg-[#FACC15] text-[#0F172A]">
              {psi} PSI
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-20 gap-0.5 h-6 items-center">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-full bg-[#E0F2FE]/60 rounded-full"
              />
            ))}
          </div>

          {/* Floating Callout Pill — Right */}
          <motion.div
            style={{ opacity: calloutOpacity, x: calloutRightX }}
            className="hidden sm:flex items-center gap-2 absolute -right-48 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <span className="w-6 h-px bg-[#0284C7]" />
            <div className="px-3 py-1.5 rounded-xl bg-[#0F172A] text-white border border-[#FACC15] shadow-lg text-left">
              <div className="font-mono text-[9px] font-extrabold text-[#FACC15] uppercase">
                03 / EVAPORATOR COIL
              </div>
              <div className="text-[11px] font-extrabold text-white whitespace-nowrap">
                {psi} PSI {language === "en" ? "Hydro-Sanitize" : "ฉีดล้างคอยล์แรงดันสูง"}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ====================================================================
            LAYER 2: DUAL HONEYCOMB PRE-FILTERS + FLOATING DETAIL CALLOUT
        ==================================================================== */}
        <motion.div
          style={{ y: l2Y, z: l2Z, rotateX: l2RotX, willChange: "transform" }}
          className="absolute w-[84%] sm:w-[338px] h-[68px] rounded-xl bg-white/95 border-2 border-[#0284C7]/60 shadow-lg grid grid-cols-2 gap-2 p-2"
        >
          {[0, 1].map((pane) => (
            <div
              key={pane}
              className="rounded-lg border border-[#0284C7]/45 bg-[#E0F2FE]/65 flex items-center justify-between px-2.5"
            >
              <span className="font-mono text-[9px] font-extrabold text-[#0369A1]">
                02 / FILTER 0{pane + 1}
              </span>
              <span className="font-mono text-[9px] font-extrabold text-[#0F172A]">
                PURE
              </span>
            </div>
          ))}

          {/* Floating Callout Pill — Left */}
          <motion.div
            style={{ opacity: calloutOpacity, x: calloutLeftX }}
            className="hidden sm:flex items-center gap-2 absolute -left-48 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#0284C7]/40 shadow-lg text-right">
              <div className="font-mono text-[9px] font-extrabold text-[#0284C7] uppercase">
                02 / HONEYCOMB MESH
              </div>
              <div className="text-[11px] font-extrabold text-[#0F172A] whitespace-nowrap">
                {language === "en" ? "PM2.5 Pre-Filter Wash" : "ฟอกแผ่นกรองฝุ่นละเอียด"}
              </div>
            </div>
            <span className="w-6 h-px bg-[#0284C7]" />
          </motion.div>
        </motion.div>

        {/* ====================================================================
            LAYER 1: FRONT AERODYNAMIC FASCIA + FLOATING DETAIL CALLOUT
        ==================================================================== */}
        <motion.div
          style={{
            y: l1Y,
            z: l1Z,
            rotateX: l1RotX,
            borderColor: selectedBrandColor,
            willChange: "transform",
          }}
          className="absolute w-[90%] sm:w-[368px] rounded-2xl bg-white text-[#0F172A] border-2 shadow-[0_24px_60px_rgba(15,23,42,0.22)] p-3.5"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BrandLogo brand={selectedBrandId} className="w-20 h-4 object-contain" />
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#0F172A] text-[#FACC15] font-mono text-[11px] font-extrabold tabular-nums">
              18°C
            </span>
          </div>

          {/* Brand-Specific Fascia Texture */}
          <div className="rounded-xl bg-[#F8FAFC] border border-[#BAE6FD] overflow-hidden">
            {renderFasciaSurface(panel)}
          </div>

          <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between font-mono text-[9px] font-bold text-[#0369A1]">
            <span>01 / {selectedBrandName.toUpperCase()} FASCIA</span>
            <span>{louver.toUpperCase()}</span>
          </div>

          {/* Floating Callout Pill — Right */}
          <motion.div
            style={{ opacity: calloutOpacity, x: calloutRightX }}
            className="hidden sm:flex items-center gap-2 absolute -right-44 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <span className="w-6 h-px bg-[#0284C7]" />
            <div className="px-3 py-1.5 rounded-xl bg-white border border-[#0284C7]/40 shadow-lg text-left">
              <div className="font-mono text-[9px] font-extrabold text-[#0284C7] uppercase">
                01 / FRONT FASCIA
              </div>
              <div className="text-[11px] font-extrabold text-[#0F172A] whitespace-nowrap">
                {selectedBrandName} ({panel})
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
});
