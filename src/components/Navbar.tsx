"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_SECTIONS = ["home", "about", "services", "brands", "contact"] as const;
type SectionId = (typeof NAV_SECTIONS)[number];

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [navExpanded, setNavExpanded] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const lastScrollYRef = useRef<number>(0);

  // Track active section on scroll and auto-collapse expanded menu when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollPos = currentY + 180;
      let current: SectionId = "home";

      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);

      if (Math.abs(currentY - lastScrollYRef.current) > 45) {
        setNavExpanded(false);
        lastScrollYRef.current = currentY;
      }
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

  const handleToggleNav = () => {
    lastScrollYRef.current = window.scrollY;
    setNavExpanded((prev) => !prev);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 w-full bg-transparent border-transparent shadow-none pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 flex items-center justify-between gap-4">
        {/* Left: Clean Brand Logo Lockup Floating Over Unobstructed Video */}
        <a
          href="#home"
          className="pointer-events-auto inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-950/45 backdrop-blur-md border border-white/15 group focus:outline-none shrink-0 transition-colors hover:bg-slate-950/65"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#FACC15] bg-[#0F172A] shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Hook Air Service (ฮูก แอร์เซอร์วิส) Official Logo"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col pr-1.5">
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white leading-none">
              {t.nav.brandName}
            </span>
            <span className="text-[10px] font-bold text-[#FACC15] mt-0.5 leading-none">
              {t.nav.brandSub}
            </span>
          </div>
        </a>

        {/* Right: Floating Glassmorphic Controls (EN | TH Switcher + Navbar Toggle Button) */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          {/* Segmented EN | TH Switcher */}
          <div
            role="group"
            aria-label={t.nav.langSwitchLabel}
            className="inline-flex items-center bg-slate-950/55 backdrop-blur-xl p-1 rounded-full border border-white/15"
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-wider transition-colors cursor-pointer ${
                language === "en"
                  ? "bg-[#FACC15] text-[#0F172A]"
                  : "text-white/80 hover:text-white"
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
                  ? "bg-[#FACC15] text-[#0F172A]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              TH
            </button>
          </div>

          {/* Sleek Floating Glassmorphic Navigation Toggle Pill */}
          <button
            type="button"
            onClick={handleToggleNav}
            aria-expanded={navExpanded}
            aria-label="Toggle navigation menu"
            className={`px-4 py-2 rounded-full backdrop-blur-xl border text-xs font-mono font-extrabold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
              navExpanded
                ? "bg-[#FACC15] text-[#0F172A] border-[#FACC15] shadow-[0_0_24px_rgba(250,204,21,0.4)]"
                : "bg-slate-950/55 text-white border-white/15 hover:border-[#FACC15]/70 hover:bg-slate-950/75"
            }`}
          >
            <span>
              {navExpanded
                ? language === "en"
                  ? "Close"
                  : "ปิดเมนู"
                : language === "en"
                ? "Menu"
                : "เมนู"}
            </span>
            <span
              aria-hidden="true"
              className="w-3.5 h-2.5 flex flex-col justify-between"
            >
              <span
                className={`block h-0.5 w-full rounded-full transition-transform duration-200 ${
                  navExpanded
                    ? "bg-[#0F172A] translate-y-1 rotate-45"
                    : "bg-[#FACC15]"
                }`}
              />
              <span
                className={`block h-0.5 w-full rounded-full transition-transform duration-200 ${
                  navExpanded
                    ? "bg-[#0F172A] -translate-y-1 -rotate-45"
                    : "bg-white"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Frosted-Glass Navigation Pill / Drawer */}
      <AnimatePresence>
        {navExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-4xl mx-auto mt-3 px-4 sm:px-6"
          >
            <div className="rounded-3xl backdrop-blur-xl bg-slate-950/80 border border-white/15 shadow-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <nav
                aria-label="Primary Navigation"
                className="flex flex-col md:flex-row md:items-center gap-1 sm:gap-2"
              >
                {navLinks.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setNavExpanded(false)}
                      className={`px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center justify-between md:justify-start gap-2 ${
                        isActive
                          ? "bg-[#0284C7] text-white"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-[#FACC15] md:hidden">
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>

              <button
                type="button"
                onClick={() => {
                  setNavExpanded(false);
                  onOpenBooking();
                }}
                className="px-6 py-2.5 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                {t.nav.bookService}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
