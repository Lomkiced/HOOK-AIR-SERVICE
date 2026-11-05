"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Snowflake,
  Wind,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
  MessageCircle,
  ArrowDownRight,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Gauge,
  ThermometerSnowflake,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PropertyTypeExplorer } from "@/components/PropertyTypeExplorer";
import { BookingModal } from "@/components/BookingModal";

export default function HomePage() {
  const { t } = useLanguage();

  // Interactive Hero Airflow Boost Toggle
  const [arcticBoost, setArcticBoost] = useState<boolean>(false);

  // Booking Modal State
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalProperty, setModalProperty] = useState<"condo" | "house">("condo");
  const [modalUnits, setModalUnits] = useState<number>(2);
  const [modalZone, setModalZone] = useState<string>("sukhumvit");
  const [modalTab, setModalTab] = useState<"instant" | "line">("instant");

  const openBookingModal = (
    property: "condo" | "house" = "condo",
    units: number = 2,
    zone: string = "sukhumvit",
    tab: "instant" | "line" = "instant"
  ) => {
    setModalProperty(property);
    setModalUnits(units);
    setModalZone(zone);
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      {/* 1. Sticky Glassmorphic Navbar */}
      <Navbar onOpenBooking={() => openBookingModal("condo", 2, "sukhumvit", "instant")} />

      <main className="flex-1">
        {/* ================================================================
            2. INTERACTIVE HERO SECTION
        ================================================================ */}
        <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24">
          {/* Subtle Icy Blue Atmospheric Background Accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[#E0F2FE]/55 border-l border-[#BAE6FD]/60 hidden lg:block"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Hero Copy, Trust Badges & CTAs (7 cols) */}
              <div className="lg:col-span-7">
                {/* Trust Pill Badges */}
                <div className="flex flex-wrap items-center gap-2.5 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                    <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
                    <span>{t.hero.warrantyBadge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#FACC15] text-[#0F172A]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.hero.juristicBadge}</span>
                  </span>
                </div>

                {/* Main Bilingual Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0F172A] leading-[1.12]">
                  <span className="block">{t.hero.titleLine1}</span>
                  <span className="inline-block bg-[#0284C7] text-white px-3.5 py-1 rounded-xl my-1.5">
                    {t.hero.titleHighlight}
                  </span>{" "}
                  <span className="block">{t.hero.titleLine2}</span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
                  {t.hero.subtitle}
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => openBookingModal("condo", 2, "sukhumvit", "instant")}
                    className="px-6 py-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-base shadow-sm flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <CalendarCheck className="w-5 h-5" />
                    <span>{t.hero.primaryCta}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openBookingModal("condo", 2, "sukhumvit", "line")}
                    className="px-5 py-4 rounded-xl bg-[#0369A1] hover:bg-[#075985] text-white font-extrabold text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-[#FACC15]" />
                    <span>{t.hero.lineCta}</span>
                  </button>

                  <a
                    href="#comparison"
                    className="px-5 py-4 rounded-xl bg-[#F8FAFC] hover:bg-[#E0F2FE] text-[#0F172A] border border-[#BAE6FD] font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{t.hero.secondaryCta}</span>
                    <ArrowDownRight className="w-4 h-4 text-[#0284C7]" />
                  </a>
                </div>

                {/* Transparent Starting Rate Note */}
                <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0369A1]">
                  <Sparkles className="w-4 h-4 text-[#EAB308]" />
                  <span>{t.hero.pricingStart}</span>
                </div>

                {/* Verified Track Record Bar */}
                <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] tabular-nums">
                      {t.hero.stats.unitsCleaned.value}
                    </div>
                    <div className="text-xs font-bold text-[#334155] mt-0.5">
                      {t.hero.stats.unitsCleaned.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tabular-nums">
                      {t.hero.stats.onTimeRate.value}
                    </div>
                    <div className="text-xs font-bold text-[#334155] mt-0.5">
                      {t.hero.stats.onTimeRate.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] tabular-nums">
                      {t.hero.stats.leakWarranty.value}
                    </div>
                    <div className="text-xs font-bold text-[#334155] mt-0.5">
                      {t.hero.stats.leakWarranty.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tabular-nums">
                      {t.hero.stats.rating.value}
                    </div>
                    <div className="text-xs font-bold text-[#334155] mt-0.5">
                      {t.hero.stats.rating.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Cooling Visual & Animated Floating Airflow Badges (5 cols) */}
              <div className="lg:col-span-5 relative">
                {/* Interactive Split-System AC Unit & Telemetry Card */}
                <div className="relative rounded-2xl bg-[#0369A1] text-white p-6 sm:p-7 border-2 border-[#0284C7] shadow-xl">
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#38BDF8]/30">
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-5 h-5 text-[#FACC15]" />
                      <span className="text-xs font-mono font-bold tracking-wider text-[#E0F2FE]">
                        {t.hero.liveUnit.header}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#FACC15] text-[#0F172A]">
                      {t.hero.liveUnit.status}
                    </span>
                  </div>

                  {/* Illustrated Indoor Wall-Mount Aircon Unit with Animated Louver Airflow */}
                  <div className="my-5 bg-white text-[#0F172A] rounded-2xl p-5 border border-[#BAE6FD] shadow-inner relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                        <span className="text-xs font-extrabold tracking-tight text-[#0F172A]">
                          INVERTER WALL SPLIT • R32
                        </span>
                      </div>
                      <span className="font-mono text-lg font-extrabold text-[#0284C7] bg-[#E0F2FE] px-2.5 py-0.5 rounded-lg tabular-nums">
                        {arcticBoost ? "10.5°C" : "12.0°C"}
                      </span>
                    </div>

                    {/* Evaporator Fin Grille Representation */}
                    <div className="h-10 rounded-lg bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-around px-3">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-6 rounded-full bg-[#0284C7]/60"
                        />
                      ))}
                    </div>

                    {/* Animated Ice-Cold Airflow Streamlines */}
                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                      {[0, 1, 2, 3].map((streamIdx) => (
                        <motion.div
                          key={streamIdx}
                          animate={{
                            y: arcticBoost ? [0, 5, 0] : [0, 3, 0],
                            opacity: arcticBoost ? [0.65, 1, 0.65] : [0.45, 0.85, 0.45],
                          }}
                          transition={{
                            duration: arcticBoost ? 1.1 : 2.0,
                            repeat: Infinity,
                            delay: streamIdx * 0.2,
                            ease: "easeInOut",
                          }}
                          className="flex items-center gap-1 text-xs font-bold text-[#0284C7]"
                        >
                          <Wind className="w-4 h-4" />
                          <span className="font-mono text-[11px] tabular-nums">
                            {arcticBoost ? "4.8 m/s" : "3.9 m/s"}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Cooling Visual Badges Grid */}
                  <div className="space-y-3">
                    {/* Floating Badge 1: Temp Drop */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                      className="rounded-xl bg-[#075985] border border-[#38BDF8]/40 p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FACC15] text-[#0F172A] flex items-center justify-center shrink-0">
                          <ThermometerSnowflake className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-white">
                            {t.hero.floatingBadges.tempDrop.label}
                          </div>
                          <div className="text-xs text-[#E0F2FE]">
                            {t.hero.floatingBadges.tempDrop.detail}
                          </div>
                        </div>
                      </div>
                      <span className="text-xl font-extrabold text-[#FACC15] tabular-nums shrink-0">
                        {t.hero.floatingBadges.tempDrop.value}
                      </span>
                    </motion.div>

                    {/* Floating Badge 2: 99.9% Mold & Biofilm Removed */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                      className="rounded-xl bg-[#075985] border border-[#38BDF8]/40 p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-white">
                            {t.hero.floatingBadges.hygiene.label}
                          </div>
                          <div className="text-xs text-[#E0F2FE]">
                            {t.hero.floatingBadges.hygiene.detail}
                          </div>
                        </div>
                      </div>
                      <span className="text-xl font-extrabold text-white tabular-nums shrink-0">
                        {t.hero.floatingBadges.hygiene.value}
                      </span>
                    </motion.div>

                    {/* Floating Badge 3: MEA Bill Saving */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 4.1,
                        repeat: Infinity,
                        delay: 1.0,
                        ease: "easeInOut",
                      }}
                      className="rounded-xl bg-[#075985] border border-[#38BDF8]/40 p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FACC15] text-[#0F172A] flex items-center justify-center shrink-0">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-white">
                            {t.hero.floatingBadges.billSaving.label}
                          </div>
                          <div className="text-xs text-[#E0F2FE]">
                            {t.hero.floatingBadges.billSaving.detail}
                          </div>
                        </div>
                      </div>
                      <span className="text-base sm:text-lg font-extrabold text-[#FACC15] tabular-nums shrink-0">
                        {t.hero.floatingBadges.billSaving.value}
                      </span>
                    </motion.div>
                  </div>

                  {/* Interactive Airflow Simulation Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setArcticBoost((prev) => !prev)}
                    className={`mt-5 w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      arcticBoost
                        ? "bg-[#FACC15] text-[#0F172A]"
                        : "bg-white text-[#0F172A] hover:bg-[#E0F2FE]"
                    }`}
                  >
                    <Gauge className="w-4 h-4 text-[#0284C7]" />
                    <span>
                      {arcticBoost
                        ? t.hero.liveUnit.boostActiveBtn
                        : t.hero.liveUnit.simulateBoostBtn}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            3. INTERACTIVE BEFORE & AFTER COIL CLEANING SLIDER
        ================================================================ */}
        <BeforeAfterSlider />

        {/* ================================================================
            4. INTERACTIVE PROPERTY TYPE EXPLORER (CONDO vs. HOUSE TABS)
        ================================================================ */}
        <PropertyTypeExplorer
          onOpenBooking={(propertyType, units) =>
            openBookingModal(propertyType, units || 2, "sukhumvit", "instant")
          }
        />

        {/* ================================================================
            5. INTERACTIVE SERVICE AREA & DISPATCH ZONES SECTION
        ================================================================ */}
        <section
          id="service-areas"
          className="py-20 lg:py-24 bg-[#F8FAFC] border-t border-[#BAE6FD]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                  {t.serviceArea.heading}
                </h2>
                <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
                  {t.serviceArea.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => openBookingModal("condo", 2, "sukhumvit", "instant")}
                className="self-start lg:self-auto px-5 py-3.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{t.serviceArea.bookInZoneCta}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#0369A1] mb-4">
              {t.serviceArea.filterLabel}
            </p>

            {/* Interactive Zone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.serviceArea.zones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => openBookingModal("condo", 2, zone.id, "instant")}
                  className="text-left bg-white hover:bg-[#E0F2FE]/45 rounded-2xl p-6 border border-[#BAE6FD] hover:border-[#0284C7] shadow-2xs transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] group-hover:bg-[#0284C7] text-[#0369A1] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#FACC15] text-[#0F172A] tabular-nums">
                        <Clock className="w-3.5 h-3.5" />
                        {zone.dispatchTime}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-extrabold text-[#0F172A] group-hover:text-[#0369A1] transition-colors">
                      {zone.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#334155] leading-relaxed">
                      {zone.areas}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0369A1]">
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Users className="w-4 h-4 text-[#0284C7]" />
                      {zone.teamsActive} {t.serviceArea.activeTeamsLabel}
                    </span>
                    <span className="underline group-hover:text-[#0F172A]">
                      {t.nav.bookCleaning} →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Zero Travel Surcharge Guarantee Banner */}
            <div className="mt-8 rounded-2xl bg-[#0369A1] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#FACC15] shrink-0" />
                <span className="text-sm sm:text-base font-extrabold">
                  {t.serviceArea.noSurchargeNote}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openBookingModal("condo", 2, "sukhumvit", "line")}
                className="px-4 py-2.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.hero.lineCta}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================
          FOOTER
      ================================================================ */}
      <footer className="bg-[#0F172A] text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0284C7] flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-[#FACC15]" />
                </div>
                <span className="font-extrabold text-lg tracking-tight">
                  {t.nav.brandName}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300 max-w-md leading-relaxed">
                {t.footer.companyDesc}
              </p>
            </div>

            <div className="md:col-span-6 flex flex-col md:items-end justify-between">
              <div className="md:text-right">
                <span className="block text-xs font-bold text-[#FACC15]">
                  {t.footer.hoursLabel}
                </span>
                <span className="block text-sm font-bold text-white mt-1">
                  {t.footer.hoursValue}
                </span>
                <span className="block text-xs text-slate-300 mt-1">
                  {t.footer.licenseText}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <span>{t.footer.copyright}</span>
            <span>LINE Official: @airconpro.th • Tel: 02-114-8890</span>
          </div>
        </div>
      </footer>

      {/* Interactive Booking & Price Estimator Modal */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPropertyType={modalProperty}
        initialUnits={modalUnits}
        initialZoneId={modalZone}
        initialTab={modalTab}
      />
    </div>
  );
}
