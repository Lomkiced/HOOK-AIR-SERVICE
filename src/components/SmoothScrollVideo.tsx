"use client";

import React, { useEffect, useRef, useCallback } from "react";
import type { MotionValue } from "framer-motion";

export interface SmoothScrollVideoProps {
  /** Ordered list of candidate video URLs to fetch into an in-memory Blob */
  sources: string[];
  /** Framer Motion scrollYProgress (0.0 -> 1.0) read inside rAF without React re-renders */
  scrollYProgress: MotionValue<number>;
  /** Lerp factor for smooth frame interpolation (default: 0.18) */
  lerpFactor?: number;
  /** Optional continuous playback mode (e.g. "Play Full Walkthrough with 1 Click") */
  isPlayingContinuous?: boolean;
  /** CSS filter applied to the hardware-accelerated canvas */
  canvasFilter?: string;
  /** Optional className for the canvas wrapper */
  className?: string;
  /** Optional callback invoked ONLY when discrete stage index changes */
  stageThresholds?: number[];
  onStageChange?: (stageIndex: number) => void;
  /** Optional DOM refs updated directly inside rAF to avoid React state re-renders */
  progressFillRef?: React.RefObject<HTMLDivElement | null>;
  progressTextRef?: React.RefObject<HTMLSpanElement | null>;
  /** Optional procedural canvas fallback when a video asset is not yet placed in public/ */
  renderFallback?: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    progress: number
  ) => void;
}

/**
 * Zero-Blink 60FPS Scroll-Scrubbed Video Engine:
 * 1. Keeps <video> off-screen (1x1px opacity-0) so hardware decoding stays active without native surface flicker.
 * 2. Sets canvas.width / canvas.height ONLY on mount, loadedmetadata, and window resize — never inside rAF.
 * 3. Never calls clearRect() or overwrites the canvas once the first video frame is painted; previous frame persists across seeks.
 * 4. Immediately paints Frame 0 on loadeddata / seeked.
 */
export function SmoothScrollVideo({
  sources,
  scrollYProgress,
  lerpFactor = 0.18,
  isPlayingContinuous = false,
  canvasFilter = "contrast(1.05) saturate(1.04)",
  className = "absolute inset-0 w-full h-full",
  stageThresholds,
  onStageChange,
  progressFillRef,
  progressTextRef,
  renderFallback,
}: SmoothScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mutable refs accessed inside rAF so scroll never triggers React re-renders
  const isVideoReadyRef = useRef<boolean>(false);
  const hasPaintedFirstFrameRef = useRef<boolean>(false);
  const canvasCssSizeRef = useRef<{ w: number; h: number }>({ w: 1920, h: 1080 });
  const isPlayingContinuousRef = useRef<boolean>(isPlayingContinuous);
  const lastStageRef = useRef<number>(-1);
  const onStageChangeRef = useRef(onStageChange);
  const stageThresholdsRef = useRef(stageThresholds);
  const renderFallbackRef = useRef(renderFallback);

  const paintVideoFrameToCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const vid = videoRef.current;
    if (!canvas || !vid || vid.readyState < 2) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvasCssSizeRef.current.w;
    const ch = canvasCssSizeRef.current.h;
    if (cw <= 0 || ch <= 0) return;

    const vw = vid.videoWidth || 1920;
    const vh = vid.videoHeight || 1080;
    const canvasRatio = cw / ch;
    const videoRatio = vw / vh;

    let sx = 0;
    let sy = 0;
    let sw = vw;
    let sh = vh;

    if (canvasRatio > videoRatio) {
      sh = vw / canvasRatio;
      sy = (vh - sh) * 0.5;
    } else {
      sw = vh * canvasRatio;
      sx = (vw - sw) * 0.5;
    }

    // Persistent paint: draw directly over the existing buffer without clearRect()
    ctx.drawImage(vid, sx, sy, sw, sh, 0, 0, cw, ch);
    hasPaintedFirstFrameRef.current = true;
  }, []);

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
      // Immediately repaint current frame after resize so the buffer never blinks
      paintVideoFrameToCanvas();
    }
  }, [paintVideoFrameToCanvas]);

  useEffect(() => {
    isPlayingContinuousRef.current = isPlayingContinuous;
    const vid = videoRef.current;
    if (!vid || !isVideoReadyRef.current) return;

    if (isPlayingContinuous) {
      vid.loop = true;
      vid.play().catch(() => {
        // Ignore autoplay restriction on muted video
      });
    } else {
      vid.pause();
    }
  }, [isPlayingContinuous]);

  useEffect(() => {
    onStageChangeRef.current = onStageChange;
    stageThresholdsRef.current = stageThresholds;
    renderFallbackRef.current = renderFallback;
  }, [onStageChange, stageThresholds, renderFallback]);

  // 1. In-Memory Blob Preloader
  useEffect(() => {
    let isCancelled = false;
    let createdObjectUrl: string | null = null;
    const vid = videoRef.current;
    if (!vid) return;

    async function preloadVideoIntoMemory() {
      for (const srcUrl of sources) {
        if (isCancelled) return;
        try {
          const response = await fetch(srcUrl, { cache: "force-cache" });
          if (!response.ok) continue;

          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("text/html")) continue;

          const blob = await response.blob();
          if (blob.size < 1024) continue;

          if (isCancelled) return;

          const videoBlob =
            blob.type && blob.type.startsWith("video/")
              ? blob
              : new Blob([blob], { type: "video/mp4" });

          createdObjectUrl = URL.createObjectURL(videoBlob);
          if (vid) {
            vid.src = createdObjectUrl;
            vid.load();
          }
          return;
        } catch {
          // Try next candidate source
        }
      }
    }

    preloadVideoIntoMemory();

    return () => {
      isCancelled = true;
      if (createdObjectUrl) {
        URL.revokeObjectURL(createdObjectUrl);
      }
    };
  }, [sources]);

  // 2. Decoupled 60FPS requestAnimationFrame Lerp + Persistent Canvas Paint Loop
  useEffect(() => {
    let rafId = 0;
    let smoothedProgress = Math.max(0, Math.min(1, scrollYProgress.get()));
    let smoothedTime = 0;
    let continuousFallbackProgress = 0;

    syncCanvasDimensions();
    window.addEventListener("resize", syncCanvasDimensions);

    const tick = () => {
      const rawProgress = Math.max(0, Math.min(1, scrollYProgress.get()));
      smoothedProgress += (rawProgress - smoothedProgress) * lerpFactor;

      const vid = videoRef.current;
      const hasLoadedMetadata =
        vid !== null &&
        isVideoReadyRef.current &&
        Number.isFinite(vid.duration) &&
        vid.duration > 0;

      let displayProgress = smoothedProgress;
      if (isPlayingContinuousRef.current) {
        if (hasLoadedMetadata && vid) {
          displayProgress = vid.currentTime / vid.duration;
        } else {
          continuousFallbackProgress = (continuousFallbackProgress + 0.0022) % 1;
          displayProgress = continuousFallbackProgress;
        }
      }

      if (progressFillRef?.current) {
        progressFillRef.current.style.width = `${(displayProgress * 100).toFixed(1)}%`;
      }
      if (progressTextRef?.current) {
        progressTextRef.current.textContent = `${Math.round(displayProgress * 100)}%`;
      }

      if (stageThresholdsRef.current && onStageChangeRef.current) {
        const thresholds = stageThresholdsRef.current;
        let nextStage = 0;
        for (let i = 0; i < thresholds.length; i++) {
          if (displayProgress >= thresholds[i]) {
            nextStage = i;
          }
        }
        if (nextStage !== lastStageRef.current) {
          lastStageRef.current = nextStage;
          onStageChangeRef.current(nextStage);
        }
      }

      if (hasLoadedMetadata && vid) {
        if (!isPlayingContinuousRef.current) {
          const targetTime = rawProgress * vid.duration;
          smoothedTime += (targetTime - smoothedTime) * lerpFactor;

          if (!vid.seeking && Math.abs(vid.currentTime - smoothedTime) > 0.015) {
            try {
              vid.currentTime = Math.max(
                0.001,
                Math.min(vid.duration - 0.01, smoothedTime)
              );
            } catch {
              // Ignore transient seek lock
            }
          }
        }

        // Only draw when readyState >= 2; if seeking, keep previous canvas buffer untouched (zero blink!)
        if (vid.readyState >= 2) {
          paintVideoFrameToCanvas();
        }
      } else if (!hasPaintedFirstFrameRef.current && renderFallbackRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas ? canvas.getContext("2d", { alpha: false }) : null;
        if (ctx) {
          renderFallbackRef.current(
            ctx,
            canvasCssSizeRef.current.w,
            canvasCssSizeRef.current.h,
            displayProgress
          );
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
    lerpFactor,
    progressFillRef,
    progressTextRef,
    syncCanvasDimensions,
    paintVideoFrameToCanvas,
  ]);

  return (
    <div className={className} style={{ willChange: "transform" }}>
      {/* Off-Screen 1x1px Hardware-Active Video Decoder (Never flashes black) */}
      <video
        ref={videoRef}
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
          paintVideoFrameToCanvas();
        }}
        onSeeked={() => {
          paintVideoFrameToCanvas();
        }}
        onCanPlay={() => {
          isVideoReadyRef.current = true;
          paintVideoFrameToCanvas();
        }}
        onError={() => {
          isVideoReadyRef.current = false;
        }}
        className="fixed top-0 left-0 w-px h-px opacity-0 pointer-events-none -z-50"
        aria-hidden="true"
      />

      {/* Double-Buffered Persistent Paint Canvas */}
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
