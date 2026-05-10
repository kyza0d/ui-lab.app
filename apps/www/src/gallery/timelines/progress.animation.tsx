"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";

export function ProgressAnimation() {
  const [stage, setStage] = useState<"idle" | "filling" | "done">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("filling");
    timersRef.current.push(setTimeout(() => setStage("done"), 1050));
  }, []);

  const handleLeave = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStage("idle");
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      timersRef.current.forEach(clearTimeout);
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleEnter, handleLeave]);

  const cx = 200;
  const cy = 150;
  const trackW = 200;
  const trackH = 10;
  const trackX = cx - trackW / 2;
  const trackY = cy - trackH / 2;

  const progressIdle = 0.28;
  const progressFilling = 0.66;
  const progressDone = 1.0;

  const progress =
    stage === "idle" ? progressIdle : stage === "filling" ? progressFilling : progressDone;
  const fillW = progress * trackW;

  const isActive = stage !== "idle";
  const isDone = stage === "done";
  const isFilling = stage === "filling";

  // Label row sits above the track
  const labelY = trackY - 20;

  // Checkmark to the right of the track
  const checkCX = trackX + trackW + 18;
  const checkCY = cy;

  return (
    <div
      ref={containerRef}
      className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans"
    >
      <div className="relative w-full max-w-[400px]">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto relative z-10 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="progress-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="progress-mask">
              <rect width="400" height="300" fill="url(#progress-fade)" />
            </mask>

            {/* Clips the fill and shimmer to the track's rounded shape */}
            <clipPath id="progress-track-clip">
              <rect x={trackX} y={trackY} width={trackW} height={trackH} rx={5} />
            </clipPath>

            {/* Clips the shimmer to only the filled portion */}
            <clipPath id="progress-fill-clip">
              <rect x={trackX} y={trackY} width={fillW} height={trackH} />
            </clipPath>

            {/* Shimmer highlight gradient */}
            <linearGradient id="progress-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.38" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <style>{`
              @keyframes progress-shimmer {
                from { transform: translateX(${trackX - 80}px); }
                to   { transform: translateX(${trackX + trackW + 80}px); }
              }
            `}</style>
          </defs>

          {/* Main component */}
          <g
            style={{
              filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
              opacity: isActive ? 1 : 0.6,
              transition: `${config.transition}, filter 0.6s ease, opacity 0.6s ease`,
            }}
          >
            {/* Label (left) */}
            <rect
              x={trackX}
              y={labelY}
              width={72}
              height={7}
              rx={3.5}
              fill="currentColor"
              className="text-background-400"
              style={{ opacity: isActive ? 0.5 : 0.25, transition: config.transition }}
            />

            {/* showValue — percentage pill (right-aligned to track) */}
            <rect
              x={trackX + trackW - 28}
              y={labelY}
              width={28}
              height={7}
              rx={3.5}
              fill="currentColor"
              className={isDone ? "text-accent-500" : "text-background-400"}
              style={{
                opacity: isActive ? (isDone ? 0.9 : 0.45) : 0,
                transition: "opacity 0.5s ease",
              }}
            />

            {/* Track background */}
            <rect
              x={trackX}
              y={trackY}
              width={trackW}
              height={trackH}
              rx={5}
              className="text-background-700"
              fill="currentColor"
            />

            {/* Fill — value prop */}
            <rect
              x={trackX}
              y={trackY}
              width={fillW}
              height={trackH}
              rx={5}
              clipPath="url(#progress-track-clip)"
              className="text-accent-500"
              fill="currentColor"
              style={{
                opacity: isDone ? 0.9 : isActive ? 0.72 : 0.5,
                transition: "width 1.1s cubic-bezier(0.25, 0, 0.25, 1), opacity 0.5s ease",
              }}
            />

            {/* Shimmer — animated prop, sweeps during filling */}
            <rect
              x={0}
              y={trackY}
              width={80}
              height={trackH}
              clipPath="url(#progress-fill-clip)"
              fill="url(#progress-shimmer-grad)"
              style={{
                opacity: isFilling ? 1 : 0,
                animation: isFilling ? "progress-shimmer 1.4s linear infinite" : "none",
                transition: "opacity 0.4s ease",
              }}
            />

            {/* Done indicator — variant success */}
            <circle
              cx={checkCX}
              cy={checkCY}
              r={10}
              fill="currentColor"
              className="text-accent-500"
              style={{
                opacity: isDone ? 0.15 : 0,
                transition: "opacity 0.45s ease 0.15s",
              }}
            />
            <path
              d={`M ${checkCX - 5} ${checkCY + 0.5} L ${checkCX - 1} ${checkCY + 4.5} L ${checkCX + 6} ${checkCY - 4}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent-500"
              style={{
                opacity: isDone ? 0.9 : 0,
                transition: "opacity 0.35s ease 0.3s",
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
