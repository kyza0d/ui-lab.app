"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

type AnimPhase = "idle" | "hovering" | "clicking" | "sliding";

// Grid constants shared between MonthGrid and DateAnimation
const COLS = 7;
const ROWS = 5;
const CELL_SIZE = 24;
const CELL_GAP = 4;
const GRID_WIDTH = COLS * CELL_SIZE + (COLS - 1) * CELL_GAP; // 192

const MonthGrid = ({
  state,
  x,
  y,
  highlightDayIndex = -1
}: {
  state: "idle" | "active" | "dim" | "entering" | "leaving";
  x: number;
  y: number;
  highlightDayIndex?: number;
}) => {
  const isActive = state === "active";
  const isDim = state === "dim";

  const transition = config.transition;

  // Header Layout
  const headerHeight = 34;

  return (
    <g style={{ transform: `translate(${x}px, ${y}px)`, opacity: isDim ? 0.5 : 1, transition: config.transition }}>
      {/* Header Month/Year */}
      <rect
        x={0} y={5} width={82} height={11} rx={config.barRx}
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.labelActiveOpacity : config.activeContent.labelIdleOpacity,
          transition
        }}
      />

      {/* Chevrons */}
      <g transform={`translate(${GRID_WIDTH - 32}, 3)`}>
        {/* Prev */}
        <polyline
          points="-4,2 -8,7 -4,12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={config.guidelines.colorClass}
          style={{ opacity: 0.45 }}
        />
        {/* Next */}
        <polyline
          points="22,2 26,7 22,12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isActive ? config.highlight.hoverClass : "text-foreground-300"}
          style={{ opacity: isActive ? config.activeContent.interactiveActiveOpacity : config.activeContent.interactiveIdleOpacity, transition }}
        />
      </g>

      {/* Days Grid */}
      <g transform={`translate(0, ${headerHeight})`}>
        {Array.from({ length: ROWS * COLS - 4 }).map((_, i) => {
          const isHighlighted = i === highlightDayIndex;
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const dx = col * (CELL_SIZE + CELL_GAP);
          const dy = row * (CELL_SIZE + CELL_GAP);

          return (
            <rect
              key={i}
              x={dx}
              y={dy}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={config.barRx}
              className={isHighlighted && isActive ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{
                opacity: isHighlighted
                  ? config.bar.primaryOpacity
                  : (isActive ? 0.15 : 0.1),
                transition
              }}
            />
          );
        })}
      </g>
    </g>
  );
};

export function DateAnimation() {
  const [phase, setPhase] = useState<AnimPhase>("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const handleEnter = () => {
      setPhase("hovering");
      timers.push(setTimeout(() => setPhase("clicking"), 480));
      timers.push(setTimeout(() => setPhase("sliding"), 720));
    };

    const handleLeave = () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      setPhase("idle");
    };

    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Container Dimensions
  const width = 220;
  const height = 196;
  const x = (400 - width) / 2;
  const y = (300 - height) / 2;
  const rx = config.blockRx;
  const transition = config.transition;

  const isHovered = phase !== "idle";
  const isClicking = phase === "clicking" || phase === "sliding";
  const isSliding = phase === "sliding";

  // Inner Padding (derived from grid width)
  const px = (width - GRID_WIDTH) / 2; // 14
  const py = 11;

  // Slide tape
  const slideDistance = width;
  const tapeX = isSliding ? -slideDistance : 0;
  const slideTransition = "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1)";

  // Chevron position in SVG space (next chevron center)
  const chevronX = x + px + (GRID_WIDTH - 32) + 24;
  const chevronY = y + py + 9;

  const cursorFrames = {
    idle: {
      target: { x: x + width + 40, y: y + height + 20 },
      opacity: 0,
    },
    hovering: {
      target: { x: chevronX, y: chevronY },
      opacity: 1,
    },
    clicking: {
      target: { x: chevronX, y: chevronY },
      opacity: 1,
      scale: 0.82,
    },
    sliding: {
      target: { x: chevronX, y: chevronY },
      opacity: 1,
    },
  } satisfies Record<AnimPhase, CursorFrame>;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <style>{`
              @keyframes date-ripple {
                from { transform: scale(1); opacity: 0.35; }
                to { transform: scale(5); opacity: 0; }
              }
            `}</style>
            <radialGradient id="date-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="date-grid-mask">
              <rect width="400" height="300" fill="url(#date-grid-fade)" />
            </mask>
            <clipPath id="date-content-clip">
              <rect x={x} y={y} width={width} height={height} rx={rx} />
            </clipPath>
          </defs>

          {/* Date Picker Container */}
          <g>
            {/* Background */}
            <rect
              x={x} y={y} width={width} height={height} rx={rx}
              className="text-background-950"
              fill="currentColor"
              style={{ transition }}
            />
            {/* Border/Surface */}
            <rect
              x={x} y={y} width={width} height={height} rx={rx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition,
                fillOpacity: 0.05,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />
          </g>

          {/* Sliding Content (Clipped) */}
          <g clipPath="url(#date-content-clip)">
            <g style={{ transform: `translateX(${x + px + tapeX}px)`, transition: slideTransition }}>

              {/* Month 1 (Current — exits left on slide) */}
              <MonthGrid
                state={isSliding ? "dim" : (isHovered ? "active" : "idle")}
                x={0}
                y={y + py}
                highlightDayIndex={10}
              />

              {/* Month 2 (Next — enters center on slide) */}
              <MonthGrid
                state={isSliding ? "active" : "idle"}
                x={slideDistance}
                y={y + py}
                highlightDayIndex={15}
              />

              {/* Month 3 (Preloaded right) */}
              <MonthGrid
                state="idle"
                x={slideDistance * 2}
                y={y + py}
              />
            </g>
          </g>

          {/* Chevron click ripple */}
          <circle
            cx={chevronX}
            cy={chevronY}
            r={4}
            className={config.highlight.hoverClass}
            fill="currentColor"
            style={{
              transformOrigin: `${chevronX}px ${chevronY}px`,
              animation: isClicking ? "date-ripple 0.35s ease-out forwards" : "none",
              opacity: 0,
            }}
          />

          {/* Active Highlight Ring (Outer) */}
          <rect
            x={x - 10}
            y={y - 10}
            width={width + 20}
            height={height + 20}
            rx={rx + 5}
            fill="none"
            stroke="currentColor"
            className={isHovered ? config.accentOutline.colorClass : config.highlight.idleClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? config.accentOutline.hoverOpacity : 0,
              transition,
            }}
          />

          <CursorProvider
            phase={phase}
            frames={cursorFrames}
            appearance={() => ({
              className: config.highlight.hoverClass,
              hotspot: { x: 5, y: 4 },
              transformOrigin: "7px 11px",
              motionTransition: "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1) 0.1s, opacity 0.3s ease",
              shapeTransition: "transform 0.12s ease-in-out",
            })}
          >
            <Cursor />
          </CursorProvider>
        </svg>
      </div>
    </div>
  );
}
