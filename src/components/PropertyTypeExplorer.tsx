"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Home,
  Clock,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PropertyTypeExplorerProps {
  onOpenBooking: (propertyType: "condo" | "house", initialUnits?: number) => void;
}

export function PropertyTypeExplorer({ onOpenBooking }: PropertyTypeExplorerProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"condo" | "house">("condo");
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);

  const currentProfile = t.explorer.profiles[activeTab];

  const handleTabChange = (tab: "condo" | "house") => {
    setActiveTab(tab);
    setSelectedStepIdx(0);
  };

  return (
    <section id="property-types" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            {t.explorer.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
            {t.explorer.description}
          </p>
        </div>

        {/* Interactive Condo vs. House Switcher Tabs */}
        <div className="mt-8">
          <p className="text-xs sm:text-sm font-bold text-[#0369A1] mb-3">
            {t.explorer.selectPrompt}
          </p>
          <div
            role="tablist"
            aria-label="Property Type Cleaning Protocols"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl bg-[#F8FAFC] p-2 rounded-2xl border border-[#BAE6FD]"
          >
            {(["condo", "house"] as const).map((tabKey) => {
              const profile = t.explorer.profiles[tabKey];
              const isActive = activeTab === tabKey;
              const Icon = tabKey === "condo" ? Building2 : Home;

              return (
                <button
                  key={tabKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(tabKey)}
                  className={`relative flex items-center gap-3.5 p-4 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#FACC15] text-[#0F172A] shadow-sm border border-[#EAB308]"
                      : "bg-white text-[#0F172A] hover:bg-[#E0F2FE]/60 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#0F172A] text-[#FACC15]"
                        : "bg-[#E0F2FE] text-[#0369A1]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-base sm:text-lg leading-snug">
                      {profile.tabLabel}
                    </div>
                    <div
                      className={`text-xs font-medium truncate ${
                        isActive ? "text-[#0F172A]/85" : "text-[#475569]"
                      }`}
                    >
                      {profile.tabSub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            {/* Protocol Summary Banner */}
            <div className="rounded-2xl bg-[#0369A1] text-white p-6 sm:p-8 border border-[#0284C7] shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-[#FACC15] text-[#0F172A] px-3 py-1 rounded-full text-xs font-extrabold mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{currentProfile.protectionGuarantee}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {currentProfile.headline}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-[#E0F2FE] leading-relaxed">
                    {currentProfile.summary}
                  </p>
                </div>

                {/* Quick Meta Badges */}
                <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-3 shrink-0">
                  <div className="bg-[#075985] border border-[#38BDF8]/40 rounded-xl px-4 py-3 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FACC15] shrink-0" />
                    <div>
                      <span className="block text-[11px] text-[#E0F2FE] font-semibold">
                        {t.explorer.durationLabel}
                      </span>
                      <span className="text-sm font-extrabold text-white tabular-nums">
                        {currentProfile.avgDuration}
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#075985] border border-[#38BDF8]/40 rounded-xl px-4 py-3 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#FACC15] shrink-0" />
                    <div>
                      <span className="block text-[11px] text-[#E0F2FE] font-semibold">
                        {t.explorer.warrantyLabel}
                      </span>
                      <span className="text-sm font-extrabold text-white">
                        {currentProfile.warrantyText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Step Technical Procedure Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentProfile.steps.map((step, index) => {
                const isSelected = selectedStepIdx === index;
                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => setSelectedStepIdx(index)}
                    className={`rounded-2xl p-5 sm:p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#E0F2FE]/55 border-[#0284C7] shadow-sm"
                        : "bg-[#F8FAFC] border-slate-200 hover:border-[#BAE6FD] hover:bg-white"
                    }`}
                  >
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-extrabold font-mono ${
                            isSelected
                              ? "bg-[#0284C7] text-white"
                              : "bg-white text-[#0369A1] border border-[#BAE6FD]"
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        <span className="text-xs font-bold text-[#475569] tabular-nums">
                          {step.duration}
                        </span>
                      </div>

                      <h4 className="text-lg font-extrabold text-[#0F172A] leading-snug">
                        {step.title}
                      </h4>

                      {/* Equipment Pill */}
                      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#BAE6FD] text-xs font-bold text-[#0369A1]">
                        <Wrench className="w-3.5 h-3.5 shrink-0" />
                        <span>{step.equipment}</span>
                      </div>

                      <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#BAE6FD]/60 flex items-start gap-2 text-xs font-bold text-[#0F172A]">
                      <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                      <span>{step.highlight}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing & Checklist Row */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Transparent Pricing Tiers (7 cols) */}
              <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-[#BAE6FD]">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {t.explorer.pricingTitle}
                </h3>
                <p className="mt-1 text-sm text-[#334155]">
                  {t.explorer.pricingSubtitle}
                </p>

                <div className="mt-6 space-y-4">
                  {currentProfile.pricing.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        tier.badge
                          ? "bg-white border-2 border-[#0284C7] shadow-sm"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div>
                        {tier.badge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#FACC15] text-[#0F172A] mb-1.5">
                            <Sparkles className="w-3 h-3" />
                            {tier.badge}
                          </span>
                        )}
                        <div className="font-extrabold text-base sm:text-lg text-[#0F172A]">
                          {tier.label}
                        </div>
                        <div className="text-xs font-semibold text-[#0369A1]">
                          {tier.btuRange}
                        </div>
                        <div className="text-xs text-[#475569] mt-1">
                          {tier.note}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                        <div className="text-right">
                          {tier.originalPrice && (
                            <span className="text-xs text-[#475569] line-through mr-1.5 tabular-nums">
                              {tier.originalPrice}
                            </span>
                          )}
                          <span className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tabular-nums">
                            {tier.pricePerUnit}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            onOpenBooking(
                              activeTab,
                              idx === 0 ? 1 : idx === 1 ? 3 : 2
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] transition-colors cursor-pointer"
                        >
                          <span>{t.explorer.bookThisPackage}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Guarantee Checklist (5 cols) */}
              <div className="lg:col-span-5 bg-[#E0F2FE]/60 rounded-2xl p-6 sm:p-8 border border-[#BAE6FD] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F172A]">
                    {t.explorer.includedTitle}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {currentProfile.checklist.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm sm:text-base text-[#0F172A] font-medium"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#BAE6FD]">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking(activeTab, activeTab === "condo" ? 2 : 3)
                    }
                    className="w-full py-3.5 px-5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm sm:text-base shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>{t.explorer.bookThisPackage}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

