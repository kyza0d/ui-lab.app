"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

const RadioIcon = ({
  state,
  isSelected,
}: {
  state: "idle" | "active" | "dim";
  isSelected: boolean;
}) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  const transition = config.transition;

  const ringClass = isActive ? config.highlight.hoverClass : config.highlight.idleClass;
  const dotClass = isActive ? config.highlight.hoverClass : config.highlight.idleClass;

  return (
    <g transform="translate(80, 18)">
      {/* Outer ring background */}
      <circle
        cx={10}
        cy={10}
        r={10}
        className="text-background-950"
        fill="currentColor"
        style={{ transition }}
      />
      {/* Outer ring stroke */}
      <circle
        cx={10}
        cy={10}
        r={10}
        className={ringClass}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{
          transition,
          fillOpacity: isActive && isSelected ? 0.15 : (isDim ? 0.05 : 0.1),
          strokeOpacity: isActive ? 0.8 : 0.4,
        }}
      />
      {/* Inner dot */}
      <circle
        cx={10}
        cy={10}
        r={5}
        className={dotClass}
        fill="currentColor"
        style={{
          opacity: isSelected ? 0.6 : 0,
          transform: isSelected ? "scale(1)" : "scale(0.2)",
          transformOrigin: "10px 10px",
          transition: "opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    </g>
  );
};

const RowContent = ({
  state,
  isSelected,
}: {
  state: "idle" | "active" | "dim";
  isSelected: boolean;
}) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  const transition = config.transition;

  return (
    <g style={{ transition }}>
      <RadioIcon state={state} isSelected={isSelected} />

      {/* Label Skeleton */}
      <rect
        x={116} y={22} width={isActive ? 120 : 90} height={8} rx={4}
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.labelActiveOpacity : (isDim ? 0.2 : 0.4),
          transition,
        }}
      />

      {/* Subtext Skeleton */}
      <rect
        x={116} y={34} width={isActive ? 80 : 60} height={4} rx={2}
        className={isActive ? config.activeContent.subtextClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.subtextActiveOpacity : (isDim ? 0.1 : 0.2),
          transition,
        }}
      />
    </g>
  );
};

const Row = ({
  state,
  y,
  isHovered,
  opacity,
  isSelected,
}: {
  state: "idle" | "active" | "dim";
  y: number;
  isHovered: boolean;
  opacity?: number;
  isSelected: boolean;
}) => {
  const getOpacity = () => {
    if (opacity !== undefined) return opacity;
    if (state === "dim") return 0.5;
    if (!isHovered && state === "idle") return 0.8;
    return 1;
  };

  return (
    <g style={{ transform: `translateY(${y}px)`, opacity: getOpacity(), transition: config.transition }}>
      <rect
        x={70} y={0} width={260} height={56} rx={config.blockRx}
        className="text-transparent"
        fill="currentColor"
        style={{ transition: config.transition }}
      />
      <RowContent state={state} isSelected={isSelected} />
    </g>
  );
};

export function RadioAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);
    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const startY = 94;
  const rowHeight = 56;
  const gap = 20;
  const step = rowHeight + gap;

  // 3 rows total, only 2 visible at a time
  const row0Y = isHovered ? startY - step : startY;
  const row1Y = isHovered ? startY : startY + step;
  const row2Y = isHovered ? startY + step : startY + step * 2;

  const activeRowY = row2Y;
  const guidelineY = activeRowY + rowHeight / 2;

  const cursorFrames = {
    idle: {
      target: { x: 240, y: 240 },
      opacity: 0,
      rotate: 15,
      scale: 1.2,
    },
    hover: {
      target: { x: 90, y: activeRowY + 28 },
      opacity: 1,
      rotate: -15,
      scale: 1.1,
    },
  } satisfies Record<"idle" | "hover", CursorFrame>;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="radio-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="radio-grid-mask">
              <rect width="400" height="300" fill="url(#radio-grid-fade)" />
            </mask>
          </defs>

          {/* Row 0 — pre-selected, slides out top on hover */}
          <Row
            state="idle"
            isSelected={true}
            isHovered={isHovered}
            y={row0Y}
            opacity={isHovered ? 0 : 1}
          />

          {/* Row 1 — shifts up, dims on hover */}
          <Row
            state={isHovered ? "dim" : "idle"}
            isSelected={false}
            isHovered={isHovered}
            y={row1Y}
          />

          {/* Row 2 — slides in from bottom, gets selected on hover */}
          <Row
            state={isHovered ? "active" : "idle"}
            isSelected={isHovered}
            isHovered={isHovered}
            y={row2Y}
            opacity={isHovered ? 1 : 0}
          />

          {/* Active row highlight */}
          <g style={{ transform: `translateY(${activeRowY}px)`, transition: config.transition }}>
            <rect
              x={70} y={0} width={260} height={56} rx={config.blockRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: isHovered ? 0.05 : 0,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : 0,
              }}
            />
            <rect
              x={60} y={-10} width={280} height={76}
              rx={config.blockRx + 5}
              fill="none"
              stroke="currentColor"
              className={config.accentOutline.colorClass}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{
                opacity: isHovered ? config.accentOutline.hoverOpacity : 0,
                transition: config.transition,
              }}
            />
          </g>

          <CursorProvider
            phase={isHovered ? "hover" : "idle"}
            frames={cursorFrames}
            appearance={() => ({
              className: config.highlight.hoverClass,
              motionTransition: "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
              shapeTransition: "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
            })}
          >
            <Cursor />
          </CursorProvider>
        </svg>
      </div>
    </div>
  );
}
