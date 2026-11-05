"use client";

import React from "react";
import Link from "next/link";
import { Shield, Snowflake, ArrowLeft, Lock } from "lucide-react";
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
          <ArrowLeft className="w-4 h-4" />
          <span>
            {language === "en" ? "Back to Public Landing Page" : "กลับสู่หน้าแรกสำหรับลูกค้า"}
          </span>
        </Link>

        <div className="inline-flex items-center bg-[#E0F2FE] p-1 rounded-full border border-[#BAE6FD]">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1 rounded-full text-xs font-extrabold cursor-pointer ${
              language === "en"
                ? "bg-[#FACC15] text-[#0F172A]"
                : "text-[#0369A1]"
            }`}
          >
            🇬🇧 EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("th")}
            className={`px-2.5 py-1 rounded-full text-xs font-extrabold cursor-pointer ${
              language === "th"
                ? "bg-[#FACC15] text-[#0F172A]"
                : "text-[#0369A1]"
            }`}
          >
            🇹🇭 TH
          </button>
        </div>
      </div>

      {/* Staff Login Card */}
      <main className="max-w-md w-full mx-auto bg-white rounded-2xl border-2 border-[#0284C7] shadow-lg overflow-hidden my-8">
        <div className="bg-[#0369A1] text-white p-6">
          <div className="w-10 h-10 rounded-xl bg-[#075985] flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-[#FACC15]" />
          </div>
          <h1 className="text-xl font-extrabold">
            {language === "en"
              ? "Aircon Service Pro — Staff Portal"
              : "ระบบจัดการคิวช่าง — Aircon Service Pro"}
          </h1>
          <p className="text-xs text-[#E0F2FE] mt-1">
            {language === "en"
              ? "Authorized Technicians & Dispatch Coordinators Only"
              : "สำหรับช่างเทคนิคและเจ้าหน้าที่จัดคิวที่ได้รับอนุญาตเท่านั้น"}
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="staff-id"
              className="block text-xs font-extrabold text-[#0F172A] mb-1"
            >
              {language === "en" ? "Technician / Staff ID" : "รหัสประจำตัวช่าง / พนักงาน"}
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
              className="block text-xs font-extrabold text-[#0F172A] mb-1"
            >
              {language === "en" ? "Security Passcode" : "รหัสผ่านความปลอดภัย"}
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
            className="w-full py-3 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>
              {language === "en" ? "Sign In to Dispatch Console" : "เข้าสู่ระบบจัดการงาน"}
            </span>
          </button>
        </form>
      </main>

      <footer className="text-center text-xs text-[#475569]">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Snowflake className="w-3.5 h-3.5 text-[#0284C7]" />
          Aircon Service Pro Security Gateway
        </span>
      </footer>
    </div>
  );
}

