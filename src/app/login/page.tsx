"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function StaffLoginPage() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0369A1] hover:text-[#0F172A] transition-colors"
        >
          <span aria-hidden="true">←</span>
          <span>
            {language === "en"
              ? "Back to Public Landing Page"
              : "กลับสู่หน้าแรกสำหรับลูกค้า"}
          </span>
        </Link>

        <div className="inline-flex items-center bg-white p-1 rounded-full border border-slate-200">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider cursor-pointer ${language === "en"
                ? "bg-[#FACC15] text-[#0F172A]"
                : "text-[#475569]"
              }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("th")}
            className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider cursor-pointer ${language === "th"
                ? "bg-[#FACC15] text-[#0F172A]"
                : "text-[#475569]"
              }`}
          >
            TH
          </button>
        </div>
      </div>

      {/* Staff Login Card */}
      <main className="max-w-md w-full mx-auto bg-white rounded-2xl border-2 border-[#0284C7] shadow-lg overflow-hidden my-8">
        <div className="bg-[#0F172A] text-white p-6 border-b border-slate-800">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FACC15] bg-[#0F172A] shadow-md mb-3 shrink-0">
            <Image
              src="/logo.png"
              alt="Hook Air Service (ฮูก แอร์เซอร์วิส) Official Logo"
              width={48}
              height={48}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            {language === "en"
              ? "Hook Air Service — Staff Portal"
              : "ระบบจัดการคิวช่าง — ฮูก แอร์เซอร์วิส"}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            {language === "en"
              ? "Authorized Technicians & Dispatch Coordinators Only"
              : "สำหรับช่างเทคนิคและเจ้าหน้าที่จัดคิวที่ได้รับอนุญาตเท่านั้น"}
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="staff-id"
              className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1"
            >
              {language === "en"
                ? "01 / Technician or Staff ID"
                : "01 / รหัสประจำตัวช่าง / พนักงาน"}
            </label>
            <input
              id="staff-id"
              type="text"
              placeholder="TECH-BKK-01"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F172A]"
            />
          </div>
          <div>
            <label
              htmlFor="staff-pass"
              className="block font-mono text-xs font-extrabold uppercase tracking-wider text-[#0F172A] mb-1"
            >
              {language === "en"
                ? "02 / Security Passcode"
                : "02 / รหัสผ่านความปลอดภัย"}
            </label>
            <input
              id="staff-pass"
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0F172A]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm transition-colors cursor-pointer"
          >
            {language === "en"
              ? "Sign In to Dispatch Console →"
              : "เข้าสู่ระบบจัดการงาน →"}
          </button>
        </form>
      </main>

      <footer className="text-center text-xs text-[#475569]">
        <span className="inline-flex items-center gap-2 font-semibold">
          <Image
            src="/logo.png"
            alt="Hook Air Service"
            width={18}
            height={18}
            className="rounded-full inline-block"
          />
          Hook Air Service Security Gateway
        </span>
      </footer>
    </div>
  );
}
