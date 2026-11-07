"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface PropertyTypeExplorerProps {
  onOpenBooking: (propertyType: "condo" | "house", initialUnits?: number) => void;
}

export function PropertyTypeExplorer({ onOpenBooking }: PropertyTypeExplorerProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"condo" | "house">("condo");
  const current = t.explorer.profiles[activeTab];

  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================
            PART 1: 4-DISCIPLINE EDITORIAL SERVICE MATRIX (01 - 04)
        ================================================================ */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-10">
          <span className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#0284C7]">
            {t.services.sectionIndex}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#475569]">
            01 — 04 CLINICAL PROTOCOLS
          </span>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.03]">
            {t.services.heading}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#334155] font-medium leading-relaxed">
            {t.services.sub}
          </p>
        </div>

        {/* 4-Card Editorial Discipline Grid (Zero Icons) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.matrix.map((item, idx) => (
            <div
              key={item.num}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-[#0284C7] p-7 sm:p-9 flex flex-col justify-between transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <span className="font-mono text-sm font-extrabold text-[#0284C7] tabular-nums">
                    {item.num}
                  </span>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F8FAFC] text-[#0369A1] border border-[#BAE6FD]">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#334155] leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.specs.map((specItem) => (
                    <span
                      key={specItem}
                      className="font-mono text-[11px] font-bold text-[#475569] bg-slate-100 px-2.5 py-1 rounded"
                    >
                      {specItem}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    {item.unitNote}
                  </div>
                  <div className="mt-1 text-xl sm:text-2xl font-extrabold text-[#0F172A] tabular-nums">
                    {item.price}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenBooking(
                      idx === 1 ? "house" : "condo",
                      idx === 1 ? 3 : 2
                    )
                  }
                  className="px-5 py-2.5 rounded-full bg-[#0F172A] hover:bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider transition-colors self-start sm:self-auto cursor-pointer"
                >
                  {t.services.bookProtocol} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================
            PART 2: CONDO VS. HOUSE STEP-BY-STEP PROTOCOL EXPLORER
        ================================================================ */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.04]">
                {t.explorer.heading}
              </h3>
              <p className="mt-3 text-base sm:text-lg text-[#334155] font-medium">
                {t.explorer.sub}
              </p>
            </div>

            {/* Typographic Segmented Condo / House Switcher (No Icons) */}
            <div
              role="tablist"
              aria-label="Condo or House protocol selector"
              className="inline-flex bg-white p-1.5 rounded-full border-2 border-[#0284C7] self-start md:self-auto"
            >
              {(["condo", "house"] as const).map((tabKey) => {
                const isSelected = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tabKey)}
                    className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold tracking-tight transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FACC15] text-[#0F172A] shadow-2xs"
                        : "text-[#0369A1] hover:text-[#0F172A]"
                    }`}
                  >
                    {t.explorer.profiles[tabKey].tab}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              {/* Large Price & Summary Card */}
              <div className="rounded-3xl bg-[#0369A1] text-white p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-2 border-[#0284C7] shadow-xl">
                <div className="max-w-xl">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#FACC15] text-[#0F172A] font-mono text-xs font-extrabold uppercase tracking-wider">
                    {current.duration} • {current.units}
                  </span>
                  <h4 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    {current.line}
                  </h4>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4 shrink-0">
                  <div className="lg:text-right">
                    <span className="font-mono text-xs font-bold text-[#E0F2FE] uppercase tracking-wider">
                      {t.explorer.from}
                    </span>
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#FACC15] tabular-nums">
                      {current.price}{" "}
                      <span className="text-base font-bold text-[#E0F2FE]">
                        {t.explorer.perUnit}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking(activeTab, activeTab === "condo" ? 2 : 3)
                    }
                    className="px-6 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm transition-colors cursor-pointer"
                  >
                    {t.explorer.book} →
                  </button>
                </div>
              </div>

              {/* 4 Minimalist Numeric Steps */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {current.steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="rounded-2xl bg-white p-6 border border-slate-200/90 flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block font-mono text-xs font-extrabold text-[#0284C7] mb-3 tabular-nums">
                        0{i + 1}
                      </span>
                      <h5 className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                        {step.title}
                      </h5>
                      <p className="mt-2 text-sm text-[#334155] leading-relaxed font-medium">
                        {step.line}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
