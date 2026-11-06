"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { BrandId } from "@/lib/brands";
import { Navbar } from "@/components/Navbar";
import { ExplodedAirconHero } from "@/components/ExplodedAirconHero";
import { BrandMasteryShowcase } from "@/components/BrandMasteryShowcase";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PropertyTypeExplorer } from "@/components/PropertyTypeExplorer";
import { BookingModal } from "@/components/BookingModal";

export default function HomePage() {
  const { t } = useLanguage();

  // Shared Brand State synced between BrandMasteryShowcase & ExplodedAirconHero Layer 1 Fascia
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
      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        onOpenBooking={() => openBookingModal("condo", 2, "sukhumvit", "instant")}
      />

      <main className="flex-1">
        {/* 1. Scroll-Driven Exploded Aircon Hero (400vh Sticky Hardware Experience) */}
        <ExplodedAirconHero activeBrand={activeBrand} />

        {/* 2. The 13-Brand Interactive Architecture Showcase */}
        <BrandMasteryShowcase
          activeBrand={activeBrand}
          onSelectBrand={setActiveBrand}
          onPreviewInHero={handlePreviewBrandInHero}
        />

        {/* 3. Minimalist Before & After Coil Comparison Slider */}
        <BeforeAfterSlider />

        {/* 4. Minimalist Property Type Explorer (Condo vs. House) */}
        <PropertyTypeExplorer
          onOpenBooking={(propertyType, units) =>
            openBookingModal(propertyType, units || 2, "sukhumvit", "instant")
          }
        />

        {/* 5. High-Contrast Apple-Style Closing CTA Section */}
        <section className="py-20 lg:py-28 bg-[#0284C7] text-white text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl sm:text-7xl lg:text-[84px] font-extrabold tracking-tight leading-[0.98]">
              {t.closing.title}
            </h2>
            <p className="mt-4 text-lg sm:text-2xl text-[#E0F2FE] font-medium">
              {t.closing.sub}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openBookingModal("condo", 2, "sukhumvit", "instant")}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-base shadow-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>{t.closing.cta}</span>
              </button>

              <button
                type="button"
                onClick={() => openBookingModal("condo", 2, "sukhumvit", "line")}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold text-base flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#FACC15]" />
                <span>{t.closing.line}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Minimalist Footer */}
      <footer className="bg-[#0F172A] text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
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
              <span className="block font-extrabold text-base tracking-tight leading-none">
                {t.nav.brandName}
              </span>
              <span className="block text-xs text-[#FACC15] font-bold mt-1">
                ฮูก แอร์เซอร์วิส
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-300">
            {t.footer.copyright} • LINE: @airconpro.th
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
