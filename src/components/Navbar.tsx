"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Menu, X, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white/85 backdrop-blur-md border-b border-[#BAE6FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Official Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#FACC15] shadow-xs shrink-0 group-hover:scale-105 transition-transform bg-[#0F172A]">
            <Image
              src="/logo.png"
              alt="Hook Air Service (ฮูก แอร์เซอร์วิส) Official Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <span className="block font-extrabold text-sm sm:text-base tracking-tight text-[#0F172A] leading-none">
              {t.nav.brandName}
            </span>
            <span className="block text-[10px] font-semibold text-[#0369A1] mt-0.5">
              {t.nav.brandTagline}
            </span>
          </div>
        </a>

        {/* Desktop Minimal Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          <a
            href="#brands"
            className="text-xs font-extrabold tracking-tight text-[#334155] hover:text-[#0284C7] transition-colors"
          >
            {t.nav.brands}
          </a>
          <a
            href="#comparison"
            className="text-xs font-extrabold tracking-tight text-[#334155] hover:text-[#0284C7] transition-colors"
          >
            {t.nav.comparison}
          </a>
          <a
            href="#property-types"
            className="text-xs font-extrabold tracking-tight text-[#334155] hover:text-[#0284C7] transition-colors"
          >
            {t.nav.propertyTypes}
          </a>
        </nav>

        {/* Right Controls: Pill Language Switcher (🇬🇧 EN | 🇹🇭 TH), Book Now CTA, Staff Portal */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div
            role="group"
            aria-label={t.nav.langSwitchLabel}
            className="inline-flex items-center bg-[#E0F2FE] p-1 rounded-full border border-[#BAE6FD]"
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-[#FACC15] text-[#0F172A]"
                  : "text-[#0369A1] hover:text-[#0F172A]"
              }`}
            >
              🇬🇧 EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("th")}
              aria-pressed={language === "th"}
              className={`px-2.5 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                language === "th"
                  ? "bg-[#FACC15] text-[#0F172A]"
                  : "text-[#0369A1] hover:text-[#0F172A]"
              }`}
            >
              🇹🇭 TH
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>{t.nav.bookCleaning}</span>
          </button>

          <Link
            href="/login"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#475569] hover:text-[#0369A1] hover:bg-[#F8FAFC] transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>{t.nav.staffPortal}</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl border border-[#BAE6FD] text-[#0F172A] hover:bg-[#E0F2FE] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#BAE6FD] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            <a
              href="#brands"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-[#E0F2FE]/60"
            >
              {t.nav.brands}
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-[#E0F2FE]/60"
            >
              {t.nav.comparison}
            </a>
            <a
              href="#property-types"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-bold text-[#0F172A] hover:bg-[#E0F2FE]/60"
            >
              {t.nav.propertyTypes}
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.nav.bookCleaning}</span>
            </button>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs font-bold text-[#334155] flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>{t.nav.staffPortal} (/login)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
