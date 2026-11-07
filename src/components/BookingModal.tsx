"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyType?: "condo" | "house";
  initialUnits?: number;
  initialZoneId?: string;
  initialTab?: "instant" | "line";
}

export function BookingModal({
  isOpen,
  onClose,
  initialPropertyType = "condo",
  initialUnits = 2,
  initialZoneId = "sukhumvit",
  initialTab = "instant",
}: BookingModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <BookingModalDialog
          key={`${initialPropertyType}-${initialUnits}-${initialZoneId}-${initialTab}`}
          onClose={onClose}
          initialPropertyType={initialPropertyType}
          initialUnits={initialUnits}
          initialZoneId={initialZoneId}
          initialTab={initialTab}
        />
      )}
    </AnimatePresence>
  );
}

function BookingModalDialog({
  onClose,
  initialPropertyType,
  initialUnits,
  initialZoneId,
  initialTab,
}: Required<Omit<BookingModalProps, "isOpen">>) {
  const { t, language } = useLanguage();

  const [bookingChannel, setBookingChannel] = useState<"instant" | "line">(initialTab);
  const [propertyType, setPropertyType] = useState<"condo" | "house">(initialPropertyType);
  const [unitCount, setUnitCount] = useState<number>(initialUnits);
  const [selectedZone, setSelectedZone] = useState<string>(initialZoneId);
  const [timeSlot, setTimeSlot] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedLine, setCopiedLine] = useState<boolean>(false);

  const getRatePerUnit = (type: "condo" | "house", count: number) => {
    if (type === "condo") {
      return count >= 2 ? 550 : 650;
    }
    return count >= 3 ? 500 : 600;
  };

  const ratePerUnit = getRatePerUnit(propertyType, unitCount);
  const standardRate = 650;
  const totalPrice = ratePerUnit * unitCount;
  const totalSavings = Math.max(0, (standardRate - ratePerUnit) * unitCount);

  const currentZoneObj =
    t.serviceArea.zones.find((z) => z.id === selectedZone) ||
    t.serviceArea.zones[0];

  const prefilledSummary =
    language === "en"
      ? `[HOOK AIR SERVICE] Quote #HAS-884 | ${
          propertyType === "condo" ? "Condo" : "House"
        } (${unitCount} Units) | Zone: ${
          currentZoneObj.name
        } | Est. Total: ฿${totalPrice.toLocaleString()}`
      : `[ฮูก แอร์เซอร์วิส] รหัสจอง #HAS-884 | ${
          propertyType === "condo" ? "คอนโด" : "บ้านพักอาศัย"
        } (${unitCount} เครื่อง) | โซน: ${
          currentZoneObj.name
        } | ยอดสุทธิ: ฿${totalPrice.toLocaleString()}`;

  const handleCopyLine = async () => {
    try {
      await navigator.clipboard.writeText(
        `${t.modal.lineBox.lineIdValue}\n${prefilledSummary}`
      );
      setCopiedLine(true);
      setTimeout(() => setCopiedLine(false), 2500);
    } catch {
      setCopiedLine(true);
      setTimeout(() => setCopiedLine(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0F172A]/75 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border-2 border-[#0284C7] shadow-2xl overflow-hidden my-auto"
      >
        {/* Modal Top Header with Official Logo */}
        <div className="bg-[#0F172A] text-white px-5 py-4 sm:px-7 sm:py-5 flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#FACC15] shrink-0 bg-[#0F172A] shadow-md">
              <Image
                src="/logo.png"
                alt="Hook Air Service Official Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2
                id="booking-modal-title"
                className="text-xl sm:text-2xl font-extrabold tracking-tight"
              >
                {t.modal.title}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-300">
                {t.modal.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Channel Switcher Tabs (Instant Web vs LINE Official) */}
        <div className="bg-[#F8FAFC] px-5 pt-4 sm:px-7 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-xl border border-slate-200 mb-4">
            <button
              type="button"
              onClick={() => setBookingChannel("instant")}
              className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
                bookingChannel === "instant"
                  ? "bg-[#FACC15] text-[#0F172A] shadow-2xs"
                  : "text-[#334155] hover:bg-[#F8FAFC]"
              }`}
            >
              01 / {t.modal.tabInstant}
            </button>
            <button
              type="button"
              onClick={() => setBookingChannel("line")}
              className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
                bookingChannel === "line"
                  ? "bg-[#FACC15] text-[#0F172A] shadow-2xs"
                  : "text-[#334155] hover:bg-[#F8FAFC]"
              }`}
            >
              02 / {t.modal.tabLine}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[78vh] overflow-y-auto space-y-5">
          {/* Shared Configuration: Property Type + Unit Count + Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Property Type */}
            <div>
              <label className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-2">
                01 / {t.modal.propertyTypeLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPropertyType("condo")}
                  className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    propertyType === "condo"
                      ? "bg-[#E0F2FE] border-[#0284C7] text-[#0F172A]"
                      : "bg-white border-slate-200 text-[#475569] hover:border-slate-300"
                  }`}
                >
                  {t.modal.condoOption}
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType("house")}
                  className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    propertyType === "house"
                      ? "bg-[#E0F2FE] border-[#0284C7] text-[#0F172A]"
                      : "bg-white border-slate-200 text-[#475569] hover:border-slate-300"
                  }`}
                >
                  {t.modal.houseOption}
                </button>
              </div>
            </div>

            {/* 2. Unit Count Selector */}
            <div>
              <label className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-2">
                02 / {t.modal.unitCountLabel}
              </label>
              <div className="grid grid-cols-6 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setUnitCount(num)}
                    className={`py-2.5 rounded-xl font-extrabold text-sm tabular-nums border transition-all cursor-pointer ${
                      unitCount === num
                        ? "bg-[#FACC15] border-[#EAB308] text-[#0F172A]"
                        : "bg-white border-slate-200 text-[#334155] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Service Zone Selector */}
          <div>
            <label
              htmlFor="booking-zone-select"
              className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1.5"
            >
              03 / {t.modal.zoneLabel}
            </label>
            <select
              id="booking-zone-select"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-[#F8FAFC] text-sm font-bold text-[#0F172A] focus:bg-white cursor-pointer"
            >
              {t.serviceArea.zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} ({z.areas})
                </option>
              ))}
            </select>
          </div>

          {/* Live Price Calculator Banner */}
          <div className="rounded-2xl bg-[#F8FAFC] border border-[#0284C7]/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                {t.modal.estimatedTotal} ({unitCount} {t.modal.unitSuffix} × ฿
                {ratePerUnit})
              </div>
              {totalSavings > 0 && (
                <div className="inline-block font-mono text-xs font-extrabold text-[#0F172A] bg-[#FACC15] px-2.5 py-0.5 rounded mt-1">
                  {t.modal.multiUnitDiscount} (-฿{totalSavings})
                </div>
              )}
              <p className="text-[11px] text-[#334155] mt-1">
                {t.modal.includesNote}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tabular-nums shrink-0">
              ฿{totalPrice.toLocaleString()}
            </div>
          </div>

          {/* ============================================================
              TAB 1: INSTANT WEB BOOKING FORM OR SUCCESS STATE
          ============================================================ */}
          {bookingChannel === "instant" ? (
            isSubmitted ? (
              <div className="rounded-2xl bg-[#F8FAFC] border-2 border-[#0284C7] p-6 text-center space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#0284C7] text-white font-mono text-xs font-extrabold uppercase tracking-wider">
                  CONFIRMED DISPATCH
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A]">
                  {t.modal.bookingSuccessTitle}
                </h3>
                <p className="text-sm text-[#334155] max-w-md mx-auto">
                  {t.modal.bookingSuccessDesc}
                </p>
                <div className="inline-block bg-white border border-slate-200 rounded-xl px-4 py-2.5">
                  <span className="block text-[11px] font-bold text-[#475569]">
                    {t.modal.bookingRefLabel}
                  </span>
                  <span className="font-mono text-base font-extrabold text-[#0369A1] tabular-nums">
                    HAS-2026-{unitCount}0{selectedZone.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-[#0369A1] underline hover:text-[#0F172A] cursor-pointer"
                  >
                    {t.modal.resetBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Preferred Arrival Window */}
                <div>
                  <label className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1.5">
                    04 / {t.modal.timeSlotLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {t.modal.timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTimeSlot(idx)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          timeSlot === idx
                            ? "bg-[#0F172A] text-white border-[#0F172A]"
                            : "bg-white text-[#334155] border-slate-200 hover:bg-[#F8FAFC]"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1"
                    >
                      {t.modal.nameLabel}
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t.modal.namePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F172A] placeholder:text-[#475569]/70 focus:border-[#0284C7]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="customer-phone"
                      className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1"
                    >
                      {t.modal.phoneLabel}
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t.modal.phonePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F172A] placeholder:text-[#475569]/70 focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm sm:text-base shadow-sm transition-colors cursor-pointer"
                >
                  {t.modal.submitBookingBtn} →
                </button>
              </form>
            )
          ) : (
            /* ============================================================
               TAB 2: LINE OFFICIAL QUICK CONNECT
            ============================================================ */
            <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A]">
                    {t.modal.lineBox.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] mt-1">
                    {t.modal.lineBox.subtext}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#0284C7] text-white font-mono text-xs font-extrabold shrink-0">
                  {t.modal.lineBox.lineIdValue}
                </span>
              </div>

              {/* Pre-filled Quote Summary Box */}
              <div className="bg-white rounded-xl p-3.5 border border-slate-200">
                <span className="block text-[11px] font-bold text-[#475569] mb-1">
                  {t.modal.lineBox.autoMessageLabel}
                </span>
                <code className="block text-xs font-mono text-[#0F172A] break-words">
                  {prefilledSummary}
                </code>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCopyLine}
                  className="py-3 px-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  {copiedLine
                    ? t.modal.lineBox.copiedBtn
                    : t.modal.lineBox.copyBtn}
                </button>
                <a
                  href="https://line.me/R/ti/p/@airconpro.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-extrabold text-xs sm:text-sm text-center transition-colors"
                >
                  {t.modal.lineBox.openLineBtn} →
                </a>
              </div>

              <div className="text-xs text-[#334155] font-medium pt-1">
                {t.modal.lineBox.responseGuarantee}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
