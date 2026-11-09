"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { BrandId } from "@/lib/brands";
import { Navbar } from "@/components/Navbar";
import { MapDispatchLoader } from "@/components/MapDispatchLoader";
import { ExplodedAirconHero } from "@/components/ExplodedAirconHero";
import { AboutUsWalkthrough } from "@/components/AboutUsWalkthrough";
import { BrandMasteryShowcase } from "@/components/BrandMasteryShowcase";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PropertyTypeExplorer } from "@/components/PropertyTypeExplorer";
import { BookingModal } from "@/components/BookingModal";

export default function HomePage() {
  const { t } = useLanguage();

  // Shared Brand State synced between BrandMasteryShowcase & ExplodedAirconHero
  const [activeBrand, setActiveBrand] = useState<BrandId>("daikin");

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

  const handlePreviewBrandInHero = (brandId: BrandId) => {
    setActiveBrand(brandId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      {/* 00. Minimalist Camera-Tracking 3-Wheeled Vehicle Dispatch Loader */}
      <MapDispatchLoader />

      {/* 0. Executive Minimalist Navbar */}
      <Navbar
        onOpenBooking={() => openBookingModal("condo", 2, "sukhumvit", "instant")}
      />

      <main className="flex-1">
        {/* 1. #home — Scroll-Scrubbed Exploded-to-Assembled Video & Hardware Hero */}
        <ExplodedAirconHero
          activeBrand={activeBrand}
          onOpenBooking={() => openBookingModal("condo", 2, "sukhumvit", "instant")}
        />

        {/* 2. #about — Scroll-Scrubbed FPOV On-Site Walkthrough, Origin Story & Founder's Message */}
        <AboutUsWalkthrough />

        {/* 3. #services — 4-Discipline Service Matrix, Condo vs. House Protocol & Coil Comparison */}
        <PropertyTypeExplorer
          onOpenBooking={(propertyType, units) =>
            openBookingModal(propertyType, units || 2, "sukhumvit", "instant")
          }
        />
        <BeforeAfterSlider />

        {/* 4. #brands — Authentic 13-Brand SVG Wordmark Matrix & Engineering Dossier */}
        <BrandMasteryShowcase
          activeBrand={activeBrand}
          onSelectBrand={setActiveBrand}
          onPreviewInHero={handlePreviewBrandInHero}
        />

        {/* 5. #contact — Executive Contact Us & Dispatch Desk Section */}
        <section
          id="contact"
          className="py-24 lg:py-32 bg-[#0F172A] text-white border-t border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Section Index Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-10">
              <span className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#FACC15]">
                {t.contact.sectionIndex}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
                BANGKOK METROPOLITAN DISPATCH
              </span>
            </div>

            {/* Editorial Heading */}
            <div className="max-w-3xl">
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.03]">
                {t.contact.heading}
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
                {t.contact.sub}
              </p>
            </div>

            {/* 4-Column Editorial Contact & Dispatch Grid (Zero Icons) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* 01 / Direct Telephone Dispatch */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#38BDF8]">
                    01 / {t.contact.phoneTitle}
                  </span>
                  <div className="mt-4 space-y-1.5">
                    <a
                      href={`tel:${t.contact.phonePrimary.replace(/-/g, "")}`}
                      className="block text-2xl font-extrabold tracking-tight text-[#FACC15] hover:underline tabular-nums"
                    >
                      {t.contact.phonePrimary}
                    </a>
                    <a
                      href={`tel:${t.contact.phoneSecondary.replace(/-/g, "")}`}
                      className="block text-xl font-extrabold tracking-tight text-white hover:text-[#38BDF8] transition-colors tabular-nums"
                    >
                      {t.contact.phoneSecondary}
                    </a>
                  </div>
                </div>
                <p className="mt-5 pt-4 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  {t.contact.phoneNote}
                </p>
              </div>

              {/* 02 / Official LINE Concierge */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#38BDF8]">
                    02 / {t.contact.lineTitle}
                  </span>
                  <div className="mt-4 text-2xl font-extrabold tracking-tight text-white font-mono">
                    {t.contact.lineHandle}
                  </div>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {t.contact.lineNote}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => openBookingModal("condo", 2, "sukhumvit", "line")}
                    className="text-xs font-extrabold uppercase tracking-wider text-[#FACC15] hover:underline cursor-pointer"
                  >
                    {t.contact.lineCta} →
                  </button>
                </div>
              </div>

              {/* 03 / Operating Hours */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#38BDF8]">
                    03 / {t.contact.hoursTitle}
                  </span>
                  <div className="mt-4 text-xl font-extrabold tracking-tight text-white tabular-nums">
                    {t.contact.hoursValue}
                  </div>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {t.contact.hoursSub}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-800/80 font-mono text-[11px] font-bold text-[#38BDF8] uppercase">
                  SAME-DAY & NEXT-DAY SLOTS
                </div>
              </div>

              {/* 04 / Service Coverage Zones */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#38BDF8]">
                    04 / {t.contact.coverageTitle}
                  </span>
                  <div className="mt-4 text-base font-bold tracking-tight text-white leading-snug">
                    {t.contact.coverageSub}
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-800/80 font-mono text-[11px] font-bold text-[#FACC15] uppercase">
                  ZERO TRAVEL SURCHARGE
                </div>
              </div>
            </div>

            {/* Interactive Bangkok Zone Quick-Dispatch Strip */}
            <div className="mt-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#E0F2FE]">
                  {t.contact.coverageTitle}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  6 METROPOLITAN SECTORS
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {t.serviceArea.zones.map((zone, idx) => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => openBookingModal("condo", 2, zone.id, "instant")}
                    className="text-left rounded-xl bg-[#0F172A] hover:bg-slate-800/90 border border-slate-800 hover:border-[#0284C7] p-4 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-[#0284C7] group-hover:text-[#FACC15]">
                        0{idx + 1} / {zone.name}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-400 group-hover:text-white">
                        →
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-slate-300 truncate">
                      {zone.areas}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* High-Contrast Closing Callout Card */}
            <div className="mt-12 rounded-3xl bg-[#0284C7] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-2 border-[#38BDF8]/40 shadow-2xl">
              <div className="max-w-xl">
                <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.04]">
                  {t.hero.milestones[3].title}
                </h3>
                <p className="mt-3 text-lg sm:text-xl text-[#E0F2FE] font-medium">
                  {t.hero.milestones[3].sub}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openBookingModal("condo", 2, "sukhumvit", "instant")}
                  className="px-8 py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm sm:text-base shadow-lg transition-colors cursor-pointer"
                >
                  {t.contact.primaryCta} →
                </button>

                <button
                  type="button"
                  onClick={() => openBookingModal("condo", 2, "sukhumvit", "line")}
                  className="px-8 py-4 rounded-full bg-[#0F172A] hover:bg-slate-900 text-white font-extrabold text-sm sm:text-base border border-white/15 transition-colors cursor-pointer"
                >
                  {t.contact.lineCta}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Executive Minimalist Footer */}
      <footer className="bg-[#0F172A] text-white py-12 border-t border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#FACC15] shrink-0 bg-[#0F172A]">
              <Image
                src="/logo.png"
                alt="Hook Air Service (ฮูก แอร์เซอร์วิส) Official Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block font-extrabold text-sm tracking-tight leading-none">
                {t.nav.brandName}
              </span>
              <span className="block text-xs text-[#FACC15] font-bold mt-1">
                {t.nav.brandSub} • {t.footer.licenseText}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {t.footer.copyright} • TEL: {t.contact.phonePrimary} • LINE:{" "}
            {t.contact.lineHandle}
          </div>
        </div>
      </footer>

      {/* Quick Booking & Price Estimator Modal */}
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
