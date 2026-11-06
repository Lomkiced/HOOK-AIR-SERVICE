"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Home, ArrowRight } from "lucide-react";
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
      id="property-types"
      className="py-24 lg:py-32 bg-[#F8FAFC] border-t border-[#BAE6FD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Segmented Condo / House Pill Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.02]">
              {t.explorer.heading}
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-[#334155] font-medium">
              {t.explorer.sub}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Condo or House protocol selector"
            className="inline-flex bg-white p-1.5 rounded-full border-2 border-[#0284C7] self-start md:self-auto"
          >
            {(["condo", "house"] as const).map((tabKey) => {
              const isSelected = activeTab === tabKey;
              const Icon = tabKey === "condo" ? Building2 : Home;
              return (
                <button
                  key={tabKey}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-6 py-2.5 rounded-full text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#FACC15] text-[#0F172A] shadow-2xs"
                      : "text-[#0369A1] hover:text-[#0F172A]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.explorer.profiles[tabKey].tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Minimalist Protocol View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            {/* Large Price & Summary Card */}
            <div className="rounded-3xl bg-[#0369A1] text-white p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-2 border-[#0284C7] shadow-xl">
              <div className="max-w-xl">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#FACC15] text-[#0F172A] text-xs font-extrabold uppercase">
                  {current.duration} • {current.units}
                </span>
                <h3 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  {current.line}
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end justify-between gap-4 shrink-0">
                <div className=" lg:text-right">
                  <span className="text-xs font-bold text-[#E0F2FE] uppercase">
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
                  className="px-6 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{t.explorer.book}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4 Minimalist Steps */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {current.steps.map((step, i) => (
                <div
                  key={step.title}
                  className="rounded-2xl bg-white p-6 border border-[#BAE6FD] flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block font-mono text-xs font-extrabold text-[#0284C7] mb-3 tabular-nums">
                      0{i + 1}
                    </span>
                    <h4 className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                      {step.title}
                    </h4>
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
    </section>
  );
}
