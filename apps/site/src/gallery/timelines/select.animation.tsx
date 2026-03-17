"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

function getRoundedRectPath(
  x: number, y: number, w: number, h: number,
  r: number | { tl: number, tr: number, bl: number, br: number }
) {
  const radii = typeof r === 'number'
    ? { tl: r, tr: r, bl: r, br: r }
    : r;

  return `
    M ${x + radii.tl} ${y}
    H ${x + w - radii.tr}
    A ${radii.tr} ${radii.tr} 0 0 1 ${x + w} ${y + radii.tr}
    V ${y + h - radii.br}
    A ${radii.br} ${radii.br} 0 0 1 ${x + w - radii.br} ${y + h}
    H ${x + radii.bl}
    A ${radii.bl} ${radii.bl} 0 0 1 ${x} ${y + h - radii.bl}
    V ${y + radii.tl}
    A ${radii.tl} ${radii.tl} 0 0 1 ${x + radii.tl} ${y}
    Z
  `;
}

export function SelectAnimation() {
  const [stage, setStage] = useState<
    "idle" | "hover_trigger" | "open" | "hover_option" | "selecting" | "selected"
  >("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("hover_trigger");
    // Sequence: Hover -> Click/Open -> Hover Option -> Click/Select -> Close
    timersRef.current.push(setTimeout(() => setStage("open"), 600));
    timersRef.current.push(setTimeout(() => setStage("hover_option"), 1400));
    timersRef.current.push(setTimeout(() => setStage("selecting"), 2200));
    timersRef.current.push(setTimeout(() => setStage("selected"), 2500));
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

  const isOpen = ["open", "hover_option", "selecting"].includes(stage);
  const isSelected = stage === "selected";
  const isHoveringOption = ["hover_option", "selecting"].includes(stage);

  // Layout Constants
  const centerX = 200;
  const centerY = 150;

  // Trigger
  const triggerW = 200;
  const triggerH = 44;
  const triggerX = centerX - triggerW / 2;
  const triggerY = centerY - triggerH / 2; // fixed: 128

  // Dropdown
  const dropdownW = triggerW;
  const itemH = 36;
  const itemGap = 4;
  const numItems = 3;
  const padding = 6;
  const dropdownH = (itemH * numItems) + (itemGap * (numItems - 1)) + (padding * 2);
  const dropdownY = triggerY + triggerH + 8; // fixed: 180

  // Shift the whole group up when open so trigger+dropdown are centered together
  const groupShift = isOpen ? -((triggerH + 8 + dropdownH) / 2 - triggerH / 2) : 0;

  const cursorFrames = {
    idle: {
      target: { x: 280, y: 250 },
      opacity: 0,
    },
    hover_trigger: {
      target: { x: triggerX + triggerW - 30, y: triggerY + triggerH / 2 + groupShift },
      opacity: 1,
    },
    open: {
      target: { x: triggerX + triggerW - 30, y: triggerY + triggerH / 2 + groupShift },
      opacity: 1,
      scale: 0.9,
    },
    hover_option: {
      target: {
        x: triggerX + triggerW / 2,
        y: dropdownY + padding + itemH + itemGap + itemH / 2 + groupShift,
      },
      opacity: 1,
    },
    selecting: {
      target: {
        x: triggerX + triggerW / 2,
        y: dropdownY + padding + itemH + itemGap + itemH / 2 + groupShift,
      },
      opacity: 1,
      scale: 0.9,
    },
    selected: {
      target: { x: 350, y: 300 },
      opacity: 0,
    },
  } satisfies Record<
    "idle" | "hover_trigger" | "open" | "hover_option" | "selecting" | "selected",
    CursorFrame
  >;

  // Animation Transitions
  const transition = "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";

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
            <radialGradient id="select-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="select-grid-mask">
              <rect width="400" height="300" fill="url(#select-grid-fade)" />
            </mask>
            <clipPath id="dropdown-clip">
              <rect x={triggerX} y={dropdownY} width={dropdownW} height={dropdownH} rx={config.blockRx} />
            </clipPath>
          </defs>

          {/* Trigger + Dropdown — shifted as a unit */}
          <g style={{ transform: `translateY(${groupShift}px)`, transition }}>

            {/* Trigger */}
            <g>
              {/* Trigger Background */}
              <path
                d={getRoundedRectPath(triggerX, triggerY, triggerW, triggerH, config.blockRx)}
                className="text-background-950"
                fill="currentColor"
              />
              <path
                d={getRoundedRectPath(triggerX, triggerY, triggerW, triggerH, config.blockRx)}
                className={isOpen ? config.highlight.hoverClass : config.highlight.idleClass}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={config.strokeWidth}
                style={{
                  transition,
                  fillOpacity: isOpen ? 0.05 : config.highlight.idleFillOpacity,
                  strokeOpacity: isOpen ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
                }}
              />

              {/* Trigger Content */}
              {/* Label Skeleton */}
              <rect
                x={triggerX + 16}
                y={triggerY + 16}
                width={isSelected ? 100 : 80}
                height={12}
                rx={config.barRx}
                fill="currentColor"
                className={isSelected ? config.highlight.hoverClass : config.highlight.idleClass}
                style={{
                  transition,
                  opacity: isSelected ? 0.9 : 0.5,
                }}
              />

              {/* Chevron */}
              <path
                d={`M ${triggerX + triggerW - 24} ${triggerY + 18} L ${triggerX + triggerW - 20} ${triggerY + 22} L ${triggerX + triggerW - 16} ${triggerY + 18}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isOpen ? config.highlight.hoverClass : config.highlight.idleClass}
                style={{
                  transition,
                  opacity: 0.8,
                  transformOrigin: `${triggerX + triggerW - 20}px ${triggerY + 20}px`,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                }}
              />
            </g>

            {/* Dropdown Menu */}
            <g
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                transition,
                pointerEvents: "none"
              }}
            >
              {/* Dropdown Background */}
              <rect
                x={triggerX}
                y={dropdownY}
                width={dropdownW}
                height={dropdownH}
                rx={config.blockRx}
                fill="var(--color-background-900)"
                stroke="currentColor"
                strokeWidth={config.strokeWidth}
                className={config.highlight.idleClass}
                style={{
                  fillOpacity: 1,
                  strokeOpacity: config.highlight.idleStrokeOpacity,
                }}
              />

              {/* Items */}
              {[0, 1, 2].map((n) => {
                const isActive = isHoveringOption && n === 1; // 2nd item is the one we interact with
                const itemY = dropdownY + padding + (n * (itemH + itemGap));

                return (
                  <g key={n} style={{ transition }}>
                    {/* Item Highlight */}
                    <rect
                      x={triggerX + padding}
                      y={itemY}
                      width={dropdownW - (padding * 2)}
                      height={itemH}
                      rx={config.barRx}
                      className={isActive ? config.highlight.hoverClass : "text-transparent"}
                      fill="currentColor"
                      style={{
                        fillOpacity: isActive ? 0.2 : 0,
                        transition
                      }}
                    />

                    {/* Item Text Skeleton */}
                    <rect
                      x={triggerX + padding + 12}
                      y={itemY + 12}
                      width={80 + (n * 20)} // Varying widths
                      height={10}
                      rx={3}
                      fill="currentColor"
                      className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
                      style={{
                        opacity: isActive ? 0.9 : 0.4,
                        transition
                      }}
                    />
                    {/* Checkmark placeholder (optional, maybe for selected state logic, but keeping simple) */}
                  </g>
                );
              })}
            </g>
          </g>{/* end trigger+dropdown wrapper */}

          <CursorProvider
            phase={stage}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition:
                "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
              shapeTransition:
                "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
            }}
          >
            <Cursor />
          </CursorProvider>

        </svg>
      </div>
    </div>
  );
}
