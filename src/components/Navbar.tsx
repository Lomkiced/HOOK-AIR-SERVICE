"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_SECTIONS = ["home", "about", "services", "brands", "contact"] as const;
type SectionId = (typeof NAV_SECTIONS)[number];

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let current: SectionId = "home";

      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { id: SectionId; label: string; href: string }[] = [
    { id: "home", label: t.nav.home, href: "#home" },
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "services", label: t.nav.services, href: "#services" },
    { id: "brands", label: t.nav.brands, href: "#brands" },
    { id: "contact", label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white/90 backdrop-blur-md border-b border-[#BAE6FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Official Hook Air Service Brand Identity + Typographic Lockup */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#FACC15] bg-[#0F172A] shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Hook Air Service (ฮูก แอร์เซอร์วิส) Official Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#0F172A] leading-none">
              {t.nav.brandName}
            </span>
            <span className="text-[11px] font-semibold text-[#0369A1] mt-1 leading-none">
              {t.nav.brandSub}
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Smooth scroll + active state hairline indicator) */}
        <nav
          aria-label="Primary Executive Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-[#0284C7]"
                    : "text-[#334155] hover:text-[#0F172A]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute left-3.5 right-3.5 bottom-0.5 h-0.5 bg-[#0284C7] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: Segmented EN | TH, Discrete Staff Portal, Yellow Pill CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Segmented EN | TH Switcher */}
          <div
            role="group"
            aria-label={t.nav.langSwitchLabel}
            className="inline-flex items-center bg-[#F8FAFC] p-0.5 rounded-full border border-[#BAE6FD]"
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider transition-colors cursor-pointer ${
                language === "en"
                  ? "bg-[#0F172A] text-white"
                  : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("th")}
              aria-pressed={language === "th"}
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider transition-colors cursor-pointer ${
                language === "th"
                  ? "bg-[#0F172A] text-white"
                  : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              TH
            </button>
          </div>

          {/* Discrete Staff Portal (/login) Text Link */}
          <Link
            href="/login"
            className="hidden md:inline-block text-xs font-bold text-[#475569] hover:text-[#0284C7] transition-colors px-2 py-1"
          >
            {t.nav.staffPortal}
          </Link>

          {/* High-Contrast Yellow Pill CTA Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-xs tracking-wide uppercase transition-colors cursor-pointer shadow-2xs"
          >
            {t.nav.bookService}
          </button>

          {/* Minimal Typographic Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden px-3 py-1.5 rounded-full border border-[#BAE6FD] text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#0F172A] hover:bg-[#E0F2FE] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Full-Screen Minimal Typographic Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-white/98 backdrop-blur-xl border-t border-[#BAE6FD] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col divide-y divide-slate-100"
          >
            {navLinks.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 flex items-baseline justify-between group"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-bold text-[#0284C7]">
                    0{idx + 1}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#475569]">
                  →
                </span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#BAE6FD] space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 px-6 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm uppercase tracking-wider transition-colors cursor-pointer"
            >
              {t.nav.bookService}
            </button>

            <div className="flex items-center justify-between text-xs font-bold text-[#475569] pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="underline hover:text-[#0284C7]"
              >
                {t.nav.staffPortal} (/login)
              </Link>
              <span className="font-mono">092-420-0043</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
