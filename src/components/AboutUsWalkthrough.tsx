"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SmoothScrollVideo } from "@/components/SmoothScrollVideo";

const FPOV_VIDEO_SOURCES = [
  "/videos/fpov-walkthrough-scrub.mp4",
  "/videos/fpov-walkthrough.mp4",
  "/BGHOOK.mp4",
];

const FPOV_STAGE_THRESHOLDS = [0, 0.34, 0.67];

export function AboutUsWalkthrough() {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlayingContinuous, setIsPlayingContinuous] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const handleStageChange = useCallback((stageIdx: number) => {
    setActiveStage(stageIdx);
  }, []);

  /**
   * 60FPS Procedural FPOV Walkthrough Renderer (used when /videos/fpov-walkthrough.mp4 is not yet on disk):
   * Depicts:
   * - 0.00 - 0.34 (01 Arrival): Walking between the two white-and-blue three-wheeled Hook Air Service trucks.
   * - 0.34 - 0.67 (02 Threshold): Stepping through the white-framed glass sliding door onto protective floor tarps.
   * - 0.67 - 1.00 (03 Precision Care): Zooming in on the technician in a blue uniform shirt on a black ladder servicing the wall-mounted aircon.
   */
  const renderFpovFallback = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      p: number
    ) => {
      // Base cold cinema background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, "#0B1528");
      bgGrad.addColorStop(0.55, "#0F172A");
      bgGrad.addColorStop(1, "#1E293B");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.48;

      // Perspective corridor lines (FPOV camera forward dolly)
      ctx.strokeStyle = "rgba(56, 189, 248, 0.16)";
      ctx.lineWidth = 1;
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 24, cy);
        ctx.lineTo(cx + i * (w * 0.24), h);
        ctx.stroke();
      }

      // ======================================================================
      // ACT 1 (0.00 -> 0.42): TWO WHITE-AND-BLUE THREE-WHEELED SERVICE TRUCKS
      // ======================================================================
      if (p < 0.45) {
        const truckProgress = Math.min(1, p / 0.4);
        const scale = 1 + truckProgress * 0.65;
        const spreadX = (w * 0.24 + truckProgress * w * 0.22);

        [-1, 1].forEach((dir) => {
          const tx = cx + dir * spreadX;
          const ty = cy + 20 * scale;
          const tw = 118 * scale;
          const th = 92 * scale;

          ctx.save();
          ctx.translate(tx, ty);

          // White cabin & cargo bed
          ctx.fillStyle = "#F8FAFC";
          ctx.strokeStyle = "#0284C7";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(-tw * 0.5, -th * 0.5, tw, th * 0.78, 10);
          ctx.fill();
          ctx.stroke();

          // Blue roof canopy
          ctx.fillStyle = "#0284C7";
          ctx.beginPath();
          ctx.roundRect(-tw * 0.52, -th * 0.56, tw * 1.04, th * 0.2, 6);
          ctx.fill();

          // Yellow Hook Air Service stripe & windshield
          ctx.fillStyle = "#FACC15";
          ctx.fillRect(-tw * 0.46, -th * 0.02, tw * 0.92, 6 * scale);

          ctx.fillStyle = "#0F172A";
          ctx.beginPath();
          ctx.roundRect(-tw * 0.36, -th * 0.32, tw * 0.72, th * 0.24, 5);
          ctx.fill();

          // Three wheels (center front wheel + dual rear wheels)
          ctx.fillStyle = "#0F172A";
          ctx.strokeStyle = "#94A3B8";
          ctx.lineWidth = 2;
          [-tw * 0.36, 0, tw * 0.36].forEach((wx, idx) => {
            const wy = idx === 1 ? th * 0.32 : th * 0.28;
            ctx.beginPath();
            ctx.arc(wx, wy, 11 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          });

          ctx.restore();
        });
      }

      // ======================================================================
      // ACT 2 (0.28 -> 0.72): WHITE-FRAMED GLASS SLIDING DOOR THRESHOLD
      // ======================================================================
      if (p >= 0.22 && p <= 0.78) {
        const doorLocal = Math.max(0, Math.min(1, (p - 0.22) / 0.5));
        const frameScale = 0.65 + doorLocal * 1.15;
        const doorSlide = Math.min(1, Math.max(0, (p - 0.32) / 0.28)) * (w * 0.22);

        const fw = Math.min(w * 0.85, 360 * frameScale);
        const fh = Math.min(h * 0.85, 230 * frameScale);

        ctx.save();
        ctx.translate(cx, cy);

        // Outer white-framed sliding door portal
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 6;
        ctx.strokeRect(-fw * 0.5, -fh * 0.5, fw, fh);

        // Left & right sliding glass panels parting open
        ctx.fillStyle = "rgba(224, 242, 254, 0.10)";
        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 3;

        // Left glass leaf
        ctx.fillRect(-fw * 0.5 - doorSlide, -fh * 0.48, fw * 0.48, fh * 0.96);
        ctx.strokeRect(-fw * 0.5 - doorSlide, -fh * 0.48, fw * 0.48, fh * 0.96);

        // Right glass leaf
        ctx.fillRect(fw * 0.02 + doorSlide, -fh * 0.48, fw * 0.48, fh * 0.96);
        ctx.strokeRect(fw * 0.02 + doorSlide, -fh * 0.48, fw * 0.48, fh * 0.96);

        // Clean blue protective floor tarp inside threshold
        ctx.fillStyle = "rgba(2, 132, 199, 0.35)";
        ctx.strokeStyle = "#38BDF8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-fw * 0.28, fh * 0.48);
        ctx.lineTo(fw * 0.28, fh * 0.48);
        ctx.lineTo(fw * 0.42, fh * 0.68);
        ctx.lineTo(-fw * 0.42, fh * 0.68);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      // ======================================================================
      // ACT 3 (0.52 -> 1.00): TECHNICIAN IN BLUE SHIRT ON BLACK LADDER + AIRCON
      // ======================================================================
      if (p >= 0.48) {
        const zoomLocal = Math.max(0, Math.min(1, (p - 0.48) / 0.52));
        const zoom = 0.78 + zoomLocal * 0.52;

        ctx.save();
        ctx.translate(cx, cy - zoomLocal * 18);
        ctx.scale(zoom, zoom);

        // Wall-mounted white aircon unit at top center
        const acW = 220;
        const acH = 64;
        const acY = -105;

        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#0284C7";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(-acW * 0.5, acY, acW, acH, 10);
        ctx.fill();
        ctx.stroke();

        // Exposed internal blue evaporator coil fins
        ctx.fillStyle = "#0284C7";
        ctx.fillRect(-acW * 0.42, acY + 14, acW * 0.84, 22);

        // 150 PSI hydro-spray mist fan
        ctx.fillStyle = "rgba(56, 189, 248, 0.28)";
        ctx.beginPath();
        ctx.moveTo(18, acY + 55);
        ctx.lineTo(-42, acY + 20);
        ctx.lineTo(35, acY + 18);
        ctx.closePath();
        ctx.fill();

        // Matte-Black A-Frame Service Ladder
        ctx.strokeStyle = "#090D16";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(-36, acY + 82);
        ctx.lineTo(-68, 138);
        ctx.moveTo(36, acY + 82);
        ctx.lineTo(68, 138);
        ctx.stroke();

        // Black ladder rungs
        ctx.lineWidth = 4;
        [-10, 26, 62, 98].forEach((ry) => {
          const halfSpan = 38 + ((ry + 20) / 160) * 28;
          ctx.beginPath();
          ctx.moveTo(-halfSpan, ry);
          ctx.lineTo(halfSpan, ry);
          ctx.stroke();
        });

        // Technician in Hook Air Service Blue Shirt on the Black Ladder
        // Legs (dark navy work trousers)
        ctx.strokeStyle = "#1E293B";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-12, 34);
        ctx.lineTo(-18, 92);
        ctx.moveTo(12, 34);
        ctx.lineTo(18, 92);
        ctx.stroke();

        // Blue Uniform Shirt Torso (#0284C7) with Yellow emblem badge
        ctx.fillStyle = "#0284C7";
        ctx.strokeStyle = "#E0F2FE";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(-26, -28, 52, 66, 12);
        ctx.fill();
        ctx.stroke();

        // Yellow Hook Air Service crest on back/shoulder
        ctx.fillStyle = "#FACC15";
        ctx.beginPath();
        ctx.arc(0, -2, 8, 0, Math.PI * 2);
        ctx.fill();

        // Technician head & raised arm servicing the coil
        ctx.fillStyle = "#0F172A";
        ctx.beginPath();
        ctx.arc(0, -44, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#0284C7";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(22, -16);
        ctx.lineTo(20, acY + 52);
        ctx.stroke();

        ctx.restore();
      }
    },
    []
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Hook Air Service & FPOV On-Site Walkthrough"
      className="relative bg-white text-[#0F172A] border-t border-slate-200/80 py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Index Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-10">
          <span className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#0284C7]">
            {t.about.sectionIndex}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#475569]">
            {t.about.videoCaption}
          </span>
        </div>

        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.03]">
            {t.about.heading}
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#334155] font-medium leading-relaxed">
            {t.about.lead}
          </p>
        </div>

        {/* ====================================================================
            STICKY SPLIT SCROLLYTELLING GRID:
            Left (7 cols): Sticky 60FPS FPOV Walkthrough Video Stage + 1-Click Play
            Right (5 cols): 01 Our Origin, 02 What We Do, 03 Founder's Message
        ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Sticky Visual Stage (FPOV Walkthrough Video) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="rounded-3xl overflow-hidden bg-[#0F172A] border-2 border-[#0284C7] shadow-2xl">
              {/* Top Camera Telemetry Frame Header */}
              <div className="px-5 py-3.5 bg-[#0F172A] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FACC15]" />
                  <span className="font-mono text-[11px] font-extrabold tracking-[0.16em] text-[#E0F2FE] uppercase">
                    {t.about.videoCaption}
                  </span>
                </div>

                {/* 1-Click Continuous Play vs Scroll-Scrub Toggle */}
                <button
                  type="button"
                  onClick={() => setIsPlayingContinuous((prev) => !prev)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                    isPlayingContinuous
                      ? "bg-[#0284C7] text-white"
                      : "bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A]"
                  }`}
                >
                  {isPlayingContinuous
                    ? t.about.scrubModeBtn
                    : t.about.playFullBtn}
                </button>
              </div>

              {/* 16:9 60FPS Canvas + Blob Video Stage */}
              <div className="relative aspect-video w-full bg-[#0F172A] overflow-hidden">
                <SmoothScrollVideo
                  sources={FPOV_VIDEO_SOURCES}
                  scrollYProgress={scrollYProgress}
                  lerpFactor={0.18}
                  isPlayingContinuous={isPlayingContinuous}
                  canvasFilter="contrast(1.05) saturate(1.04)"
                  stageThresholds={FPOV_STAGE_THRESHOLDS}
                  onStageChange={handleStageChange}
                  progressFillRef={progressFillRef}
                  progressTextRef={progressTextRef}
                  renderFallback={renderFpovFallback}
                  className="absolute inset-0 w-full h-full"
                />

                {/* Cool Ice-Blue Shadow Tint LUT Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-[#0284C7]/10"
                />

                {/* Bottom-Left Live Act Indicator Overlay */}
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div className="px-3.5 py-2 rounded-xl bg-[#0F172A]/85 backdrop-blur-md border border-white/15">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-[#FACC15]">
                      {t.about.stageLabels[activeStage] ?? t.about.stageLabels[0]}
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {t.about.videoSub}
                    </div>
                  </div>

                  <span
                    ref={progressTextRef}
                    className="px-3 py-1.5 rounded-lg bg-[#0F172A]/85 border border-white/15 font-mono text-xs font-extrabold text-[#FACC15] tabular-nums"
                  >
                    0%
                  </span>
                </div>
              </div>

              {/* Real-Time 3-Act Progress Indicator Bar (01 Arrival -> 02 Threshold -> 03 Precision Care) */}
              <div className="p-4 sm:p-5 bg-[#0F172A] border-t border-slate-800 space-y-3">
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    ref={progressFillRef}
                    className="h-full rounded-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#FACC15]"
                    style={{ width: "0%" }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {t.about.stageLabels.map((label, idx) => {
                    const isCurrent = idx === activeStage;
                    return (
                      <div
                        key={label}
                        className={`rounded-xl px-3 py-2 border font-mono text-[11px] font-extrabold transition-colors ${
                          isCurrent
                            ? "bg-slate-800/90 border-[#FACC15] text-[#FACC15]"
                            : "bg-slate-900/60 border-slate-800 text-slate-400"
                        }`}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Key Company Milestones Below Video Stage (Large Editorial Typography) */}
            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {t.about.milestones.map((m, idx) => (
                <div
                  key={m.label}
                  className="rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-4 sm:p-5"
                >
                  <span className="font-mono text-[10px] font-extrabold text-[#0284C7] uppercase tracking-widest block">
                    {`0${idx + 1} / METRIC`}
                  </span>
                  <div className="mt-1 text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-1 text-xs font-bold text-[#334155] leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: The 3 Editorial Story Pillars (01 Origin, 02 What We Do, 03 Founder's Message) */}
          <div className="lg:col-span-5 space-y-8">
            {/* PILLAR 01 & PILLAR 02 */}
            {t.about.pillars.slice(0, 2).map((pillar, idx) => {
              const isHighlighted = activeStage === idx;
              return (
                <article
                  key={pillar.num}
                  className={`rounded-3xl p-7 sm:p-9 border transition-all ${
                    isHighlighted
                      ? "bg-[#F8FAFC] border-2 border-[#0284C7] shadow-lg"
                      : "bg-white border-slate-200/90"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                    <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0284C7]">
                      {pillar.num} / {pillar.subtitle}
                    </span>
                    <span className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded bg-[#0F172A] text-[#FACC15] uppercase tracking-wider shrink-0">
                      {pillar.timecode}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="mt-3.5 text-base text-[#334155] leading-relaxed font-medium">
                    {pillar.body}
                  </p>
                </article>
              );
            })}

            {/* PILLAR 03: FOUNDER'S MESSAGE — EXECUTIVE QUOTE CARD */}
            <article className="rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-white to-[#E0F2FE]/55 border-2 border-[#0284C7] p-7 sm:p-9 shadow-xl">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#BAE6FD]">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0369A1]">
                  {t.about.founder.eyebrow}
                </span>
                <span className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded bg-[#FACC15] text-[#0F172A] uppercase tracking-wider">
                  EXECUTIVE PLEDGE
                </span>
              </div>

              {/* Quote Body with #FACC15 Yellow Vertical Accent Bar */}
              <div className="mt-6 flex items-stretch gap-4 sm:gap-5">
                <div
                  aria-hidden="true"
                  className="w-1.5 rounded-full bg-[#FACC15] shrink-0"
                />
                <blockquote className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] leading-relaxed">
                  &ldquo;{t.about.founder.quote}&rdquo;
                </blockquote>
              </div>

              {/* Typographic Signature Lockup */}
              <div className="mt-7 pt-5 border-t border-[#BAE6FD] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#FACC15] bg-[#0F172A] shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Hook Air Service Founder Crest"
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#0F172A]">
                      {t.about.founder.author}
                    </div>
                    <div className="font-mono text-[11px] font-bold text-[#0369A1] mt-0.5">
                      {t.about.founder.role}
                    </div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="font-serif italic text-base font-bold text-[#0F172A]">
                    {t.about.founder.signature}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

