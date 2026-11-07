"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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

export function InteractiveAirconRig({
  selectedBrandId = "daikin",
  selectedBrandName,
  selectedBrandColor = "#0284C7",
  psi = 135,
  panel = "smooth",
  louver = "dual-flap",
}: InteractiveAirconRigProps) {
  const { language } = useLanguage();

  // 0 = Fully Exploded (5 layers separated), 100 = Fully Assembled
  const [assemblyPct, setAssemblyPct] = useState<number>(15);

  // Convert 0..100 into explosion spread factor (1.0 when exploded, 0.0 when assembled)
  const spread = (100 - assemblyPct) / 100;
  const isExploded = assemblyPct < 50;

  return (
    <div className="rounded-3xl bg-[#0F172A] text-white border-2 border-[#0284C7] shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
      {/* Top Studio Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl px-3.5 py-1.5 h-9 flex items-center justify-center border border-[#BAE6FD]">
            <BrandLogo brand={selectedBrandId} className="w-24 h-5" />
          </div>
          <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#E0F2FE]">
            {selectedBrandName}
          </span>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#FACC15] text-[#0F172A] font-mono text-xs font-extrabold tabular-nums">
          {psi} PSI PROTOCOL
        </span>
      </div>

      {/* 3D Isometric 5-Layer Aircon Assembly Stage */}
      <div
        className="relative my-6 h-[320px] sm:h-[360px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(2,132,199,0.28)_0%,rgba(15,23,42,0.96)_76%)] border border-slate-800"
        style={{ perspective: "1300px" }}
      >
        {/* Subtle Architectural Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#38BDF8_1px,transparent_1px),linear-gradient(to_bottom,#38BDF8_1px,transparent_1px)] bg-[size:40px_40px]"
        />

        {/* Auto-Floating 3D Rig Container */}
        <motion.div
          key={selectedBrandName}
          initial={{ scale: 0.94, opacity: 0.7 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -5, 0],
            rotateX: 12 * spread,
            rotateY: -13 * spread,
          }}
          transition={{
            scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.3 },
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 0.35 },
            rotateY: { duration: 0.35 },
          }}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="relative w-full max-w-[460px] h-[240px] flex items-center justify-center px-4"
        >
          {/* LAYER 5: Rear Structural Chassis & Condensate Drain Trough */}
          <motion.div
            animate={{
              y: 94 * spread,
              z: -90 * spread,
              rotateX: -8 * spread,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="absolute w-[88%] sm:w-[400px] h-[92px] rounded-2xl bg-[#0F172A] border border-slate-600/90 shadow-xl flex flex-col justify-between p-3"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
              <span>05 / REAR CHASSIS & DRAIN PAN</span>
              <span className="text-[#38BDF8]">SEALED DRAINAGE</span>
            </div>
            <div className="grid grid-cols-8 gap-1 my-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 rounded-xs bg-slate-800 border border-slate-700"
                />
              ))}
            </div>
          </motion.div>

          {/* LAYER 4: Cross-Flow Cylindrical Squirrel-Cage Blower Wheel (โพรงกระรอก) */}
          <motion.div
            animate={{
              y: 48 * spread,
              z: -42 * spread,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="absolute w-[84%] sm:w-[380px] h-[68px] rounded-xl bg-slate-900/95 border border-[#38BDF8]/55 shadow-lg flex items-center justify-between px-3.5"
          >
            <span className="font-mono text-[10px] font-bold text-[#E0F2FE]">
              04 / CROSS-FLOW TURBINE
            </span>
            <div className="flex-1 mx-3 h-7 rounded-full bg-gradient-to-r from-[#0369A1] via-[#0284C7] to-[#0369A1] border border-[#38BDF8]/60 flex items-center justify-evenly px-2 overflow-hidden">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 h-full bg-[#E0F2FE]/65 -skew-x-12"
                />
              ))}
            </div>
            <span className="font-mono text-[10px] font-bold text-[#FACC15]">
              BALANCED
            </span>
          </motion.div>

          {/* LAYER 3: Blue-Fin Evaporator Core + Copper U-Bends */}
          <motion.div
            animate={{
              y: 0,
              z: 0,
              boxShadow:
                spread > 0.3
                  ? "0 0 32px rgba(2, 132, 199, 0.55)"
                  : "0 0 12px rgba(2, 132, 199, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="absolute w-[90%] sm:w-[410px] h-[88px] rounded-2xl bg-[#0369A1] border-2 border-[#38BDF8] flex flex-col justify-between p-3 overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] font-extrabold text-white">
              <span>03 / BLUE-FIN EVAPORATOR CORE</span>
              <span className="px-2 py-0.5 rounded bg-[#FACC15] text-[#0F172A]">
                {psi} PSI FLUSH
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-20 gap-0.5 h-7 items-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full bg-[#E0F2FE]/55 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* LAYER 2: Dual Honeycomb Pre-Filters */}
          <motion.div
            animate={{
              y: -48 * spread,
              z: 45 * spread,
              rotateX: 14 * spread,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="absolute w-[88%] sm:w-[396px] h-[74px] rounded-xl bg-[#E0F2FE]/15 backdrop-blur-xs border border-[#BAE6FD]/80 grid grid-cols-2 gap-2.5 p-2.5"
          >
            {[0, 1].map((pane) => (
              <div
                key={pane}
                className="rounded-lg border border-[#38BDF8]/70 bg-[#0284C7]/20 flex items-center justify-between px-2.5"
              >
                <span className="font-mono text-[9px] font-bold text-[#E0F2FE]">
                  02 / FILTER PANE 0{pane + 1}
                </span>
                <span className="font-mono text-[9px] text-[#FACC15]">
                  SANITIZED
                </span>
              </div>
            ))}
          </motion.div>

          {/* LAYER 1: Front Aerodynamic Fascia with Dynamic Brand Badge & 18°C LED */}
          <motion.div
            animate={{
              y: -96 * spread,
              z: 95 * spread,
              rotateX: 9 * spread,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            style={{ borderColor: selectedBrandColor }}
            className="absolute w-[94%] sm:w-[428px] rounded-2xl bg-white text-[#0F172A] border-2 shadow-2xl p-3.5"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedBrandColor }}
                />
                <span className="font-mono text-xs font-extrabold tracking-tight uppercase text-[#0F172A]">
                  {selectedBrandName}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-md bg-[#0F172A] text-[#FACC15] font-mono text-xs font-extrabold tabular-nums">
                18°C PURE
              </span>
            </div>

            {/* Brand-Specific Fascia Texture */}
            <div className="rounded-xl bg-[#F8FAFC] border border-[#BAE6FD] overflow-hidden">
              {renderFasciaSurface(panel)}
            </div>

            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between font-mono text-[10px] font-bold text-[#0369A1]">
              <span>01 / FRONT FASCIA ({panel.toUpperCase()})</span>
              <span>LOUVER: {louver.toUpperCase()}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Controls: Segmented Toggle + Smooth Slider */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Apple-Style Segmented Mode Switch */}
          <div className="inline-flex bg-slate-900 p-1 rounded-full border border-slate-700">
            <button
              type="button"
              onClick={() => setAssemblyPct(0)}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                isExploded
                  ? "bg-[#FACC15] text-[#0F172A]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {language === "en" ? "Exploded View" : "ถอดชิ้นส่วน"}
            </button>
            <button
              type="button"
              onClick={() => setAssemblyPct(100)}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                !isExploded
                  ? "bg-[#FACC15] text-[#0F172A]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {language === "en" ? "Assembled" : "ประกอบสมบูรณ์"}
            </button>
          </div>

          <span className="font-mono text-xs font-extrabold text-[#FACC15] tabular-nums">
            {assemblyPct}% {language === "en" ? "ASSEMBLED" : "ประกอบแล้ว"}
          </span>
        </div>

        {/* Continuous Interactive Range Scrubber */}
        <div className="space-y-1.5">
          <input
            type="range"
            min={0}
            max={100}
            value={assemblyPct}
            onChange={(e) => setAssemblyPct(Number(e.target.value))}
            aria-label={
              language === "en"
                ? "Interactive aircon assembly slider"
                : "แถบเลื่อนถอดและประกอบชิ้นส่วนแอร์"
            }
            className="w-full h-2 rounded-lg appearance-none bg-slate-800 accent-[#FACC15] cursor-pointer"
          />
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
            <span>
              {language === "en" ? "0% EXPLODED LAYERS" : "0% ถอดแยก 5 ชั้น"}
            </span>
            <span>
              {language === "en" ? "DRAG TO INSPECT" : "เลื่อนเพื่อดูโครงสร้าง"}
            </span>
            <span>
              {language === "en" ? "100% FACTORY SEALED" : "100% ประกอบสมบูรณ์"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

