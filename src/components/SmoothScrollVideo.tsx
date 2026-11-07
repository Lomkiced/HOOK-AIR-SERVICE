"use client";

import React, { useEffect, useRef, useCallback } from "react";
import type { MotionValue } from "framer-motion";

export interface FrameSequenceConfig {
  /** Base folder path in public/, e.g. "/videos/hero-frames" */
  folder: string;
  /** Total number of extracted frames (1-indexed: frame_001.webp .. frame_239.webp) */
  count: number;
}

export interface SmoothScrollVideoProps {
  /** Ordered list of candidate video URLs (used for fallback) */
  sources: string[];
  /** Pre-extracted WebP frame sequence for 0ms synchronous razor-sharp canvas scrubbing */
  frameSequence?: FrameSequenceConfig;
  /** Framer Motion scrollYProgress (0.0 -> 1.0) read inside rAF without React re-renders */
  scrollYProgress: MotionValue<number>;
  /** Exponential damping stiffness for frame-rate independent smoothness (default: 18) */
  dampingLambda?: number;
  /** Optional CSS filter applied to the hardware-accelerated canvas */
  canvasFilter?: string;
  /** Optional className for the canvas wrapper */
  className?: string;
  /** Optional callback invoked ONLY when discrete stage index changes */
  stageThresholds?: number[];
  onStageChange?: (stageIndex: number) => void;
  /** Optional DOM refs updated directly inside rAF to avoid React state re-renders */
  progressFillRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Razor-Sharp Zero-Blur 60/120FPS Scroll-Scrubbed Video & Frame-Sequence Engine:
 * 1. Progressive Strided WebP Frame-Bank Preloader (stride 8 -> 4 -> 2 -> 1) in RAM.
 * 2. Crisp Single-Frame Discrete Paint (NO double-exposure alpha ghosting/blurring between frames!).
 * 3. High-DPI (devicePixelRatio) canvas backing store with imageSmoothingQuality="high".
 * 4. Frame-rate independent exponential damping across 60Hz, 120Hz, and 144Hz displays.
 */
export function SmoothScrollVideo({
  sources,
  frameSequence,
  scrollYProgress,
  dampingLambda = 18,
  canvasFilter = "none",
  className = "absolute inset-0 w-full h-full",
  stageThresholds,
  onStageChange,
  progressFillRef,
}: SmoothScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // In-memory decoded HTMLImageElement bank for 0ms synchronous scrubbing
  const framesBankRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedFlagsRef = useRef<boolean[]>([]);
  const hasAnyFrameLoadedRef = useRef<boolean>(false);
  const lastPaintedFrameIdxRef = useRef<number>(-1);

  // Mutable refs accessed inside rAF so scroll never triggers React re-renders
  const isVideoReadyRef = useRef<boolean>(false);
  const canvasCssSizeRef = useRef<{ w: number; h: number }>({ w: 1920, h: 1080 });
  const lastStageRef = useRef<number>(-1);
  const onStageChangeRef = useRef(onStageChange);
  const stageThresholdsRef = useRef(stageThresholds);

  const drawCoverSource = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      source: CanvasImageSource,
      srcW: number,
      srcH: number,
      cw: number,
      ch: number
    ) => {
      if (cw <= 0 || ch <= 0 || srcW <= 0 || srcH <= 0) return;
      const canvasRatio = cw / ch;
      const sourceRatio = srcW / srcH;

      let sx = 0;
      let sy = 0;
      let sw = srcW;
      let sh = srcH;

      if (canvasRatio > sourceRatio) {
        sh = srcW / canvasRatio;
        sy = (srcH - sh) * 0.5;
      } else {
        sw = srcH * canvasRatio;
        sx = (srcW - sw) * 0.5;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(source, sx, sy, sw, sh, 0, 0, cw, ch);
    },
    []
  );

  // Find the closest loaded frame in RAM if the exact frame is still streaming in
  const getNearestLoadedFrame = useCallback(
    (targetIdx: number): { img: HTMLImageElement; index: number } | null => {
      const bank = framesBankRef.current;
      const flags = loadedFlagsRef.current;
      const len = bank.length;
      if (len === 0) return null;

      const clamped = Math.max(0, Math.min(len - 1, targetIdx));
      if (flags[clamped] && bank[clamped]) {
        return { img: bank[clamped]!, index: clamped };
      }

      for (let offset = 1; offset < len; offset++) {
        const prev = clamped - offset;
        if (prev >= 0 && flags[prev] && bank[prev]) {
          return { img: bank[prev]!, index: prev };
        }
        const next = clamped + offset;
        if (next < len && flags[next] && bank[next]) {
          return { img: bank[next]!, index: next };
        }
      }
      return null;
    },
    []
  );

  const syncCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(1, rect.width);
    const cssH = Math.max(1, rect.height);
    canvasCssSizeRef.current = { w: cssW, h: cssH };

    const targetW = Math.max(1, Math.floor(cssW * dpr));
    const targetH = Math.max(1, Math.floor(cssH * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastPaintedFrameIdxRef.current = -1;

      const prog = Math.max(0, Math.min(1, scrollYProgress.get()));
      if (hasAnyFrameLoadedRef.current && framesBankRef.current.length > 0) {
        const idx = Math.round(prog * (framesBankRef.current.length - 1));
        const match = getNearestLoadedFrame(idx);
        if (match) {
          drawCoverSource(
            ctx,
            match.img,
            match.img.naturalWidth || 1280,
            match.img.naturalHeight || 720,
            cssW,
            cssH
          );
          lastPaintedFrameIdxRef.current = match.index;
        }
      }
    }
  }, [scrollYProgress, getNearestLoadedFrame, drawCoverSource]);

  // 1. Progressive Strided WebP Frame-Sequence Preloader (0ms RAM Scrubbing)
  useEffect(() => {
    if (!frameSequence || frameSequence.count <= 0) return;

    let isCancelled = false;
    const total = frameSequence.count;
    const folder = frameSequence.folder;

    framesBankRef.current = new Array(total).fill(null);
    loadedFlagsRef.current = new Array(total).fill(false);
    hasAnyFrameLoadedRef.current = false;
    lastPaintedFrameIdxRef.current = -1;

    // Build progressive strided load order: [0, total-1, stride 8, stride 4, stride 2, stride 1]
    const order: number[] = [];
    const visited = new Set<number>();
    const pushIdx = (i: number) => {
      if (i >= 0 && i < total && !visited.has(i)) {
        visited.add(i);
        order.push(i);
      }
    };

    pushIdx(0);
    pushIdx(total - 1);
    for (const stride of [8, 4, 2, 1]) {
      for (let i = 0; i < total; i += stride) {
        pushIdx(i);
      }
    }

    let cursor = 0;
    const CONCURRENCY = 8;

    const loadNext = () => {
      if (isCancelled || cursor >= order.length) return;
      const frameIdx = order[cursor++];
      const fileNum = String(frameIdx + 1).padStart(3, "0");
      const img = new Image();
      img.decoding = "async";
      img.src = `${folder}/frame_${fileNum}.webp`;

      img.onload = () => {
        if (isCancelled) return;
        framesBankRef.current[frameIdx] = img;
        loadedFlagsRef.current[frameIdx] = true;

        // Paint Frame 0 immediately the instant the first frame finishes loading
        if (!hasAnyFrameLoadedRef.current) {
          hasAnyFrameLoadedRef.current = true;
          const canvas = canvasRef.current;
          const ctx = canvas ? canvas.getContext("2d", { alpha: false }) : null;
          if (ctx) {
            drawCoverSource(
              ctx,
              img,
              img.naturalWidth || 1280,
              img.naturalHeight || 720,
              canvasCssSizeRef.current.w,
              canvasCssSizeRef.current.h
            );
            lastPaintedFrameIdxRef.current = frameIdx;
          }
        }
        loadNext();
      };

      img.onerror = () => {
        if (isCancelled) return;
        loadNext();
      };
    };

    for (let c = 0; c < CONCURRENCY; c++) {
      loadNext();
    }

    return () => {
      isCancelled = true;
    };
  }, [frameSequence, drawCoverSource]);

  useEffect(() => {
    onStageChangeRef.current = onStageChange;
    stageThresholdsRef.current = stageThresholds;
  }, [onStageChange, stageThresholds]);

  // 2. Decoupled 60/120FPS requestAnimationFrame Loop (Crisp Single-Frame Paint, Zero Blur)
  useEffect(() => {
    let rafId = 0;
    let smoothedProgress = Math.max(0, Math.min(1, scrollYProgress.get()));
    let smoothedVideoTime = 0;
    let lastTimestamp = performance.now();

    syncCanvasDimensions();
    window.addEventListener("resize", syncCanvasDimensions);

    const tick = (now: number) => {
      const dtSeconds = Math.min(0.05, Math.max(0.001, (now - lastTimestamp) / 1000));
      lastTimestamp = now;

      // Frame-rate independent exponential smoothing
      const alpha = 1 - Math.exp(-dampingLambda * dtSeconds);
      const rawProgress = Math.max(0, Math.min(1, scrollYProgress.get()));
      smoothedProgress += (rawProgress - smoothedProgress) * alpha;

      if (Math.abs(rawProgress - smoothedProgress) < 0.0004) {
        smoothedProgress = rawProgress;
      }

      if (progressFillRef?.current) {
        progressFillRef.current.style.width = `${(smoothedProgress * 100).toFixed(1)}%`;
      }

      if (stageThresholdsRef.current && onStageChangeRef.current) {
        const thresholds = stageThresholdsRef.current;
        let nextStage = 0;
        for (let i = 0; i < thresholds.length; i++) {
          if (smoothedProgress >= thresholds[i]) {
            nextStage = i;
          }
        }
        if (nextStage !== lastStageRef.current) {
          lastStageRef.current = nextStage;
          onStageChangeRef.current(nextStage);
        }
      }

      const canvas = canvasRef.current;
      const ctx = canvas ? canvas.getContext("2d", { alpha: false }) : null;
      const cw = canvasCssSizeRef.current.w;
      const ch = canvasCssSizeRef.current.h;

      if (ctx && cw > 0 && ch > 0) {
        // Primary Path: 0ms Synchronous RAM Frame Sequence (Crisp Discrete Frame, Zero Ghosting Blur)
        if (hasAnyFrameLoadedRef.current && framesBankRef.current.length > 0) {
          const totalFrames = framesBankRef.current.length;
          const targetIdx = Math.round(smoothedProgress * (totalFrames - 1));
          const match = getNearestLoadedFrame(targetIdx);

          if (match && match.index !== lastPaintedFrameIdxRef.current) {
            drawCoverSource(
              ctx,
              match.img,
              match.img.naturalWidth || 1280,
              match.img.naturalHeight || 720,
              cw,
              ch
            );
            lastPaintedFrameIdxRef.current = match.index;
          }
        }
        // Fallback Path: Hardware Video Scrubbing before frame 0 finishes
        else {
          const vid = videoRef.current;
          if (
            vid &&
            isVideoReadyRef.current &&
            Number.isFinite(vid.duration) &&
            vid.duration > 0
          ) {
            const targetTime = rawProgress * vid.duration;
            smoothedVideoTime += (targetTime - smoothedVideoTime) * alpha;

            if (!vid.seeking && Math.abs(vid.currentTime - smoothedVideoTime) > 0.006) {
              try {
                vid.currentTime = Math.max(
                  0.001,
                  Math.min(vid.duration - 0.01, smoothedVideoTime)
                );
              } catch {
                // Ignore seek lock
              }
            }

            if (vid.readyState >= 2) {
              drawCoverSource(
                ctx,
                vid,
                vid.videoWidth || 1280,
                vid.videoHeight || 720,
                cw,
                ch
              );
            }
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncCanvasDimensions);
    };
  }, [
    scrollYProgress,
    dampingLambda,
    progressFillRef,
    syncCanvasDimensions,
    getNearestLoadedFrame,
    drawCoverSource,
  ]);

  return (
    <div className={className} style={{ willChange: "transform" }}>
      {/* Off-Screen Hardware-Active Video Fallback */}
      <video
        ref={videoRef}
        src={sources[0]}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          isVideoReadyRef.current = true;
          syncCanvasDimensions();
          try {
            if (e.currentTarget.currentTime === 0) {
              e.currentTarget.currentTime = 0.001;
            }
          } catch {
            // Ignore initial seek lock
          }
        }}
        onLoadedData={() => {
          isVideoReadyRef.current = true;
        }}
        onCanPlay={() => {
          isVideoReadyRef.current = true;
        }}
        className="fixed top-0 left-0 w-px h-px opacity-0 pointer-events-none -z-50"
        aria-hidden="true"
      />

      {/* Double-Buffered Crisp Paint Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          filter: canvasFilter,
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        className="block w-full h-full pointer-events-none bg-[#0F172A]"
      />
    </div>
  );
}
