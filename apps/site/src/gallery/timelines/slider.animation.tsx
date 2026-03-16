"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

export function SliderAnimation() {
  const [stage, setStage] = useState<"idle" | "hover" | "drag">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    let timers: NodeJS.Timeout[] = [];

    const handleEnter = () => {
      setStage("hover");
      timers.push(setTimeout(() => setStage("drag"), 500));
    };

    const handleLeave = () => {
      timers.forEach(clearTimeout);
      setStage("idle");
    };

    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      timers.forEach(clearTimeout);
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Layout
  const cx = 200;
  const cy = 150;
  const trackW = 220;
  const trackH = 10;
  const trackX = cx - trackW / 2; // 90
  const trackY = cy - trackH / 2; // 145
  const thumbR = 9;

  // Thumb positions
  const thumbPosIdle = 0.25;
  const thumbPosDrag = 0.72;
  const thumbPos = stage === "drag" ? thumbPosDrag : thumbPosIdle;
  const thumbX = trackX + thumbPos * trackW;

  // Fill
  const fillW = thumbPos * trackW;

  // Tooltip (coords relative to group origin, which is at thumbX in SVG space)
  const tooltipW = 36;
  const tooltipH = 22;
  const thumbTopY = cy - thumbR; // 141
  const tooltipBottomY = thumbTopY - 6; // 135
  const tooltipTopY = tooltipBottomY - tooltipH; // 113

  const cursorFrames = {
    idle: {
      target: { x: cx + 70, y: cy + 60 },
      opacity: 0,
    },
    hover: {
      target: { x: trackX + thumbPosIdle * trackW, y: cy },
      opacity: 1,
    },
    drag: {
      target: { x: trackX + thumbPosDrag * trackW, y: cy },
      opacity: 1,
      scale: 0.9,
    },
  } satisfies Record<"idle" | "hover" | "drag", CursorFrame>;

  const isActive = stage !== "idle";

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
            <radialGradient id="slider-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="slider-mask">
              <rect width="400" height="300" fill="url(#slider-fade)" />
            </mask>
            <clipPath id="slider-track-clip">
              <rect x={trackX} y={trackY} width={trackW} height={trackH} rx={5} />
            </clipPath>
          </defs>

          {/* Main Component Group */}
          <g
            style={{
              filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
              opacity: isActive ? 1 : 0.6,
              transition: `${config.transition}, filter 0.6s ease, opacity 0.6s ease`,
            }}
          >
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

            {/* Track fill */}
            <rect
              x={trackX}
              y={trackY}
              width={fillW}
              height={trackH}
              clipPath="url(#slider-track-clip)"
              className="text-accent-500"
              fill="currentColor"
              style={{
                opacity: 0.85,
                transition: "width 0.9s cubic-bezier(0.25, 0, 0.25, 1)",
              }}
            />

            {/* Min label */}
            <rect
              x={trackX}
              y={cy + 14}
              width={18}
              height={5}
              rx={2.5}
              className="text-background-500"
              fill="currentColor"
              style={{ opacity: 0.25 }}
            />
            {/* Max label */}
            <rect
              x={trackX + trackW - 18}
              y={cy + 14}
              width={18}
              height={5}
              rx={2.5}
              className="text-background-500"
              fill="currentColor"
              style={{ opacity: 0.25 }}
            />

            {/* Thumb + Tooltip (translate together) */}
            <g
              style={{
                transform: `translateX(${thumbX}px)`,
                transition: "transform 0.9s cubic-bezier(0.25, 0, 0.25, 1)",
              }}
            >
              {/* Tooltip */}
              <g
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              >
                {/* Tooltip body */}
                <rect
                  x={-tooltipW / 2}
                  y={tooltipTopY}
                  width={tooltipW}
                  height={tooltipH}
                  rx={5}
                  className="text-background-900"
                  fill="currentColor"
                />
                {/* Tooltip border */}
                <rect
                  x={-tooltipW / 2}
                  y={tooltipTopY}
                  width={tooltipW}
                  height={tooltipH}
                  rx={5}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  className={config.highlight.hoverClass}
                  style={{ opacity: 0.4 }}
                />
                {/* Tooltip tail */}
                <path
                  d={`M -4 ${tooltipBottomY} L 4 ${tooltipBottomY} L 0 ${tooltipBottomY + 8} Z`}
                  className="text-background-900"
                  fill="currentColor"
                />
                {/* Value skeleton bar */}
                <rect
                  x={-10}
                  y={tooltipTopY + (tooltipH - 6) / 2}
                  width={20}
                  height={6}
                  rx={3}
                  className={config.highlight.hoverClass}
                  fill="currentColor"
                  style={{ opacity: 0.7 }}
                />
              </g>

              {/* Thumb */}
              <circle
                cx={0}
                cy={cy}
                r={thumbR}
                fill="white"
                style={{
                  filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
                  opacity: 0.95,
                }}
              />
              {/* Thumb accent ring */}
              <circle
                cx={0}
                cy={cy}
                r={thumbR}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className={config.highlight.hoverClass}
                style={{
                  opacity: isActive ? 0.5 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />
            </g>
          </g>

          <CursorProvider
            phase={stage}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition: "transform 0.8s cubic-bezier(0.25, 0, 0.25, 1), opacity 0.3s ease",
              shapeTransition: "transform 0.8s cubic-bezier(0.25, 0, 0.25, 1), opacity 0.3s ease",
            }}
          >
            <Cursor />
          </CursorProvider>
        </svg>
      </div>
    </div>
  );
}
