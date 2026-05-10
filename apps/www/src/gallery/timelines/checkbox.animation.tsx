"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

const CheckboxIcon = ({
  state,
  isChecked,
  isIndeterminate
}: {
  state: "idle" | "active" | "dim";
  isChecked: boolean;
  isIndeterminate?: boolean;
}) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  const transition = config.transition;

  const boxStrokeClass = isActive ? config.highlight.hoverClass : config.highlight.idleClass;

  const checkColorClass = isActive ? "text-background-950" : config.highlight.idleClass;
  const checkOpacity = isChecked || isIndeterminate ? 1 : 0;

  return (
    <g transform="translate(80, 18)">
      {/* Checkbox Box Surface */}
      <rect
        width={20}
        height={20}
        rx={4}
        className={isActive && isChecked ? config.highlight.hoverClass : "text-background-950"}
        fill="currentColor"
        style={{ transition }}
      />
      <rect
        width={20}
        height={20}
        rx={4}
        className={boxStrokeClass}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{
          transition,
          fillOpacity: isActive && isChecked ? 1 : (isDim ? 0.05 : 0.1),
          strokeOpacity: isActive ? 0.8 : 0.4,
        }}
      />

      {/* Checkmark (FaCheck style) */}
      <path
        d="M6 10l3 3 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={checkColorClass}
        style={{
          opacity: isChecked && !isIndeterminate ? checkOpacity : 0,
          transition: "opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {/* Indeterminate Dash */}
      <rect
        x={5}
        y={9}
        width={10}
        height={2}
        rx={1}
        className={checkColorClass}
        fill="currentColor"
        style={{
          opacity: isIndeterminate ? checkOpacity : 0,
          transform: isIndeterminate ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "center",
          transition,
        }}
      />
    </g>
  );
};

const RowContent = ({
  state,
  isChecked,
  isIndeterminate
}: {
  state: "idle" | "active" | "dim";
  isChecked: boolean;
  isIndeterminate?: boolean;
}) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  const transition = config.transition;

  return (
    <g style={{ transition }}>
      {/* Checkbox Icon */}
      <CheckboxIcon state={state} isChecked={isChecked} isIndeterminate={isIndeterminate} />

      {/* Label Skeleton */}
      <rect
        x={116} y={22} width={isActive ? 120 : 90} height={8} rx={4}
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.labelActiveOpacity : (isDim ? 0.2 : 0.4),
          transition
        }}
      />

      {/* Subtext Skeleton */}
      <rect
        x={116} y={34} width={isActive ? 80 : 60} height={4} rx={2}
        className={isActive ? config.activeContent.subtextClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.subtextActiveOpacity : (isDim ? 0.1 : 0.2),
          transition
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
  isChecked,
  isIndeterminate
}: {
  state: "idle" | "active" | "dim";
  y: number;
  isHovered: boolean;
  opacity?: number;
  isChecked: boolean;
  isIndeterminate?: boolean;
}) => {
  const getOpacity = () => {
    if (opacity !== undefined) return opacity;
    if (state === "dim") return 0.5;
    if (!isHovered && state === "idle") return 0.8;
    return 1;
  };

  return (
    <g style={{ transform: `translateY(${y}px)`, opacity: getOpacity(), transition: config.transition }}>
      {/* Background Surface (Transparent trigger) */}
      <rect
        x={70} y={0} width={260} height={56} rx={config.blockRx}
        className="text-transparent"
        fill="currentColor"
        style={{ transition: config.transition }}
      />
      <RowContent state={state} isChecked={isChecked} isIndeterminate={isIndeterminate} />
    </g>
  );
};

export function CheckboxAnimation() {
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

  const startY = 50;
  const rowHeight = 56;
  const gap = 20;
  const step = rowHeight + gap;

  const activeRowY = isHovered ? startY + step : startY + step * 2;
  const guidelineY = activeRowY + rowHeight / 2;

  const cursorFrames = {
    idle: {
      target: { x: 240, y: 220 },
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
            <radialGradient id="checkbox-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="checkbox-grid-mask">
              <rect width="400" height="300" fill="url(#checkbox-grid-fade)" />
            </mask>
          </defs>

          {/* Row Stack: Sliding conveyor belt */}
          <Row
            state="idle"
            isChecked={true}
            isHovered={isHovered}
            y={isHovered ? startY - step : startY}
            opacity={isHovered ? 0 : 1}
          />

          <Row
            state={isHovered ? "dim" : "idle"}
            isChecked={false}
            isIndeterminate={true}
            isHovered={isHovered}
            y={isHovered ? startY : startY + step}
          />

          <Row
            state={isHovered ? "active" : "idle"}
            isChecked={isHovered}
            isHovered={isHovered}
            y={activeRowY}
          />

          <Row
            state={isHovered ? "dim" : "idle"}
            isChecked={false}
            isHovered={isHovered}
            y={isHovered ? startY + step * 2 : startY + step * 3}
            opacity={isHovered ? 1 : 0}
          />

          {/* Highlight for Active Row */}
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
            {/* Accent Dotted Outline */}
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
