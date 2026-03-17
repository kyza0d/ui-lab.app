"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";

export function LabelAnimation() {
  const [stage, setStage] = useState<"idle" | "required" | "error">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("required");
    timersRef.current.push(setTimeout(() => setStage("error"), 700));
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

  const isError = stage === "error";
  const isActive = stage !== "idle";

  // Layout
  const centerX = 200;
  const inputX = 105;
  const inputW = 190;
  const inputH = 40;
  const inputY = 128;
  const labelY = 112;
  const helperY = 176;
  const rx = config.blockRx;
  const labelW = 62;
  const asteriskX = inputX + labelW + 8;

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
            <radialGradient id="label-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="label-mask">
              <rect width="400" height="300" fill="url(#label-fade)" />
            </mask>
          </defs>

          {/* Label text bar */}
          <rect
            x={inputX}
            y={labelY}
            width={labelW}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className={isError ? "text-accent-500" : config.guidelines.colorClass}
            style={{
              transition: config.transition,
              opacity: isError ? 0.8 : (isActive ? 0.5 : 0.35),
            }}
          />

          {/* Required asterisk dot */}
          <circle
            cx={asteriskX}
            cy={labelY + 4}
            r={3.5}
            fill="currentColor"
            className="text-accent-500"
            style={{
              transition: config.transition,
              opacity: isActive ? 0.9 : 0,
              transform: isActive ? "scale(1)" : "scale(0)",
              transformOrigin: `${asteriskX}px ${labelY + 4}px`,
            }}
          />

          {/* Input background */}
          <rect
            x={inputX}
            y={inputY}
            width={inputW}
            height={inputH}
            rx={rx}
            fill="currentColor"
            className="text-background-950"
          />

          {/* Input border + fill */}
          <rect
            x={inputX}
            y={inputY}
            width={inputW}
            height={inputH}
            rx={rx}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className={isError ? "text-accent-500" : config.dim.class}
            style={{
              transition: config.transition,
              fillOpacity: isError ? config.highlight.hoverFillOpacity : config.dim.fillOpacity,
              strokeOpacity: isError ? config.highlight.hoverStrokeOpacity : config.dim.strokeOpacity,
            }}
          />

          {/* Input text skeleton */}
          <rect
            x={inputX + 12}
            y={inputY + 16}
            width={70}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className={config.guidelines.colorClass}
            style={{
              transition: config.transition,
              opacity: 0.2,
            }}
          />

          {/* Cursor */}
          <line
            x1={inputX + 90}
            y1={inputY + 12}
            x2={inputX + 90}
            y2={inputY + 28}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={isError ? "text-accent-500" : config.highlight.idleClass}
            style={{
              transition: config.transition,
              opacity: isActive ? 0.7 : 0,
            }}
          />

          {/* Helper text (error) */}
          <rect
            x={inputX}
            y={helperY}
            width={108}
            height={6}
            rx={config.barRx}
            fill="currentColor"
            className="text-accent-500"
            style={{
              transition: config.transition,
              opacity: isError ? 0.65 : 0,
              transform: isError ? "translateY(0px)" : "translateY(-6px)",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
