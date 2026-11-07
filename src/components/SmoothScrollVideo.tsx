"use client";

import React, { useEffect, useRef } from "react";
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
 * High-performance 60FPS Scroll-Scrubbed Video Engine:
 * 1. Immediately primes frame 0 and fetches the MP4 into an in-memory Blob (URL.createObjectURL) to eliminate disk/HTTP Range latency.
 * 2. Runs a single decoupled requestAnimationFrame loop (zero React useState on scroll).
 * 3. Smoothly interpolates video.currentTime using Lerp (0.18) guarded by !video.seeking.
 * 4. Composites decoded frames onto an HTML5 <canvas> with object-cover geometry and will-change: transform.
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
  const isPlayingContinuousRef = useRef<boolean>(isPlayingContinuous);
  const lastStageRef = useRef<number>(-1);
  const onStageChangeRef = useRef(onStageChange);
  const stageThresholdsRef = useRef(stageThresholds);
  const renderFallbackRef = useRef(renderFallback);

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

  // 2. Decoupled 60FPS requestAnimationFrame Lerp + Canvas Compositor Loop
  useEffect(() => {
    let rafId = 0;
    let smoothedProgress = Math.max(0, Math.min(1, scrollYProgress.get()));
    let smoothedTime = 0;
    let continuousFallbackProgress = 0;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d", { alpha: false }) : null;

    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.floor(rect.width * dpr));
      const targetH = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const drawVideoCover = (
      context: CanvasRenderingContext2D,
      video: HTMLVideoElement,
      cw: number,
      ch: number
    ) => {
      const vw = video.videoWidth || 1920;
      const vh = video.videoHeight || 1080;
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

      context.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    const tick = () => {
      const rawProgress = Math.max(0, Math.min(1, scrollYProgress.get()));
      smoothedProgress += (rawProgress - smoothedProgress) * lerpFactor;

      const vid = videoRef.current;
      const hasValidVideo =
        vid !== null &&
        isVideoReadyRef.current &&
        vid.readyState >= 2 &&
        Number.isFinite(vid.duration) &&
        vid.duration > 0;

      // Update optional progress bar / percentage DOM nodes directly (Zero React re-renders)
      let displayProgress = smoothedProgress;
      if (isPlayingContinuousRef.current) {
        if (hasValidVideo && vid) {
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

      // Notify stage change listener ONLY when crossing a threshold
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

      // Scrub video.currentTime with Lerp + !video.seeking guard
      if (hasValidVideo && vid) {
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

        if (canvas && ctx) {
          const rect = canvas.getBoundingClientRect();
          drawVideoCover(ctx, vid, rect.width, rect.height);
        }
      } else if (canvas && ctx) {
        const rect = canvas.getBoundingClientRect();
        if (renderFallbackRef.current) {
          renderFallbackRef.current(ctx, rect.width, rect.height, displayProgress);
        } else {
          ctx.fillStyle = "#0F172A";
          ctx.fillRect(0, 0, rect.width, rect.height);
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress, lerpFactor, progressFillRef, progressTextRef]);

  return (
    <div className={className} style={{ willChange: "transform" }}>
      {/* Hidden In-Memory Video Decoder */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          isVideoReadyRef.current = true;
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
        onError={() => {
          isVideoReadyRef.current = false;
        }}
        className="hidden"
        aria-hidden="true"
      />

      {/* Hardware-Accelerated 60FPS Frame Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          filter: canvasFilter,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}
