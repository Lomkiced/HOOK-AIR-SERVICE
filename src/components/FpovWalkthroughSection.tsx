"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function FpovWalkthroughSection() {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [scrubPct, setScrubPct] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.4,
  });

  useMotionValueEvent(smoothScroll, "change", (v) => {
    // Normalize active viewport window [0.15 .. 0.85] -> [0 .. 1]
    const normalized = Math.max(0, Math.min(1, (v - 0.15) / 0.7));
    setScrubPct(Math.round(normalized * 100));

    if (normalized < 0.34) {
      setActivePillar(0);
    } else if (normalized < 0.68) {
      setActivePillar(1);
    } else {
      setActivePillar(2);
    }
  });

  // Scrub FPOV Video (/videos/fpov-walkthrough.mp4 or /BGHOOK.mp4) + Architectural FPOV Canvas Fallback
  useEffect(() => {
    let rafId = 0;
    let smoothedTime = 0;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const renderFrame = () => {
      const raw = smoothScroll.get();
      const p = Math.max(0, Math.min(1, (raw - 0.15) / 0.7));

      // 1. Scrub real FPOV video when available
      const vid = videoRef.current;
      if (vid && vid.readyState >= 2 && Number.isFinite(vid.duration) && vid.duration > 0) {
        const target = p * vid.duration;
        smoothedTime += (target - smoothedTime) * 0.22;
        if (Math.abs(vid.currentTime - smoothedTime) > 0.02) {
          try {
            vid.currentTime = smoothedTime;
          } catch {
            // Ignore seek lock
          }
        }
      }

      // 2. Render architectural FPOV wireframe perspective on Canvas fallback
      if (canvas && ctx && !videoLoaded) {
        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        // Dark clinical slate background
        ctx.fillStyle = "#0F172A";
        ctx.fillRect(0, 0, w, h);

        // Perspective corridor / room convergence lines driven by scroll progress p
        const cx = w * 0.5;
        const cy = h * (0.46 - p * 0.08);
        const zoom = 1 + p * 0.65;

        ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
        ctx.lineWidth = 1;

        for (let i = -4; i <= 4; i++) {
          ctx.beginPath();
          ctx.moveTo(cx + i * 28, cy);
          ctx.lineTo(cx + i * 190 * zoom, h);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(cx + i * 28, cy);
          ctx.lineTo(cx + i * 190 * zoom, 0);
          ctx.stroke();
        }

        // Target A-frame ladder & wall-split aircon silhouette in FPOV
        const boxW = Math.min(w * 0.56, 280) * (0.85 + p * 0.25);
        const boxH = 66 * (0.85 + p * 0.25);
        const boxX = cx - boxW / 2;
        const boxY = cy - 75;

        // Aircon unit under containment shroud
        ctx.strokeStyle = "#0284C7";
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // 360° Catchment Funnel Chute lines down to recovery tank
        ctx.strokeStyle = "rgba(250, 204, 21, 0.75)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(boxX + 12, boxY + boxH);
        ctx.lineTo(cx - 28, h - 36);
        ctx.lineTo(cx + 28, h - 36);
        ctx.lineTo(boxX + boxW - 12, boxY + boxH);
        ctx.stroke();

        // Recovery tank at base
        ctx.fillStyle = "rgba(2, 132, 199, 0.35)";
        ctx.fillRect(cx - 34, h - 42, 68, 32);
        ctx.strokeStyle = "#38BDF8";
        ctx.strokeRect(cx - 34, h - 42, 68, 32);
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [smoothScroll, videoLoaded]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white border-b border-[#BAE6FD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Index & Heading */}
        <div className="max-w-3xl">
          <div className="font-mono text-xs font-extrabold tracking-[0.2em] text-[#0284C7] uppercase">
            {t.about.sectionIndex}
          </div>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08]">
            {t.about.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed">
            {t.about.lead}
          </p>
        </div>

        {/* Main FPOV Scrollytelling Grid (Sticky Video Left + 01/02/03 Editorial Pillars Right) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Scroll-Scrubbed FPOV Video Viewport (7 cols) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden bg-[#0F172A] border-2 border-[#0284C7] aspect-16/10 shadow-xl">
              {/* Real FPOV Video (/videos/fpov-walkthrough.mp4 or /BGHOOK.mp4) */}
              <video
                ref={videoRef}
                muted
                playsInline
                preload="auto"
                onLoadedData={() => setVideoLoaded(true)}
                onError={() => setVideoLoaded(false)}
                style={{ filter: "contrast(1.06) saturate(1.04)" }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <source src="/videos/fpov-walkthrough.mp4" type="video/mp4" />
                <source src="/BGHOOK.mp4" type="video/mp4" />
              </video>

              {/* High-DPI Architectural FPOV Canvas Fallback */}
              <canvas
                ref={canvasRef}
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full ${
                  videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />

              {/* Top HUD Overlay */}
              <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between bg-linear-to-b from-[#0F172A]/85 to-transparent font-mono text-[11px] text-white">
                <span className="tracking-wider text-[#38BDF8] font-bold">
                  {t.about.videoCaption}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#FACC15] text-[#0F172A] font-extrabold tabular-nums">
                  FPOV {scrubPct}%
                </span>
              </div>

              {/* Bottom Timecode & Progress Hairline */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-[#0F172A]/90 to-transparent">
                <div className="flex items-center justify-between font-mono text-xs text-[#E0F2FE] mb-2">
                  <span>{t.about.pillars[activePillar]?.timecode}</span>
                  <span>{t.about.videoSub}</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FACC15] transition-all duration-75"
                    style={{ width: `${scrubPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Verified Editorial Metrics Row (Zero Icons, Pure Tabular Numerals) */}
            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-[#BAE6FD]">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] tabular-nums">
                  {t.about.metrics.units.value}
                </div>
                <div className="mt-1 text-xs font-bold text-[#334155]">
                  {t.about.metrics.units.label}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tabular-nums">
                  {t.about.metrics.warranty.value}
                </div>
                <div className="mt-1 text-xs font-bold text-[#334155]">
                  {t.about.metrics.warranty.label}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0284C7] tabular-nums">
                  {t.about.metrics.compliance.value}
                </div>
                <div className="mt-1 text-xs font-bold text-[#334155]">
                  {t.about.metrics.compliance.label}
                </div>
              </div>
            </div>
          </div>

          {/* Right: 01, 02, 03 Editorial Architectural Standards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {t.about.pillars.map((pillar, idx) => {
              const isCurrent = activePillar === idx;
              return (
                <div
                  key={pillar.num}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                    isCurrent
                      ? "bg-[#F8FAFC] border-[#0284C7] shadow-sm"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-slate-200">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0284C7] tabular-nums">
                      {pillar.num}
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-wider text-[#475569] uppercase">
                      {pillar.timecode}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F172A]">
                    {pillar.title}
                  </h3>

                  <p className="mt-2.5 text-sm sm:text-base text-[#334155] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

