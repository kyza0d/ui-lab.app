"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";
import { Cursor, CursorProvider, type CursorFrame } from "./preview-cursor";

type AnimPhase = "idle" | "hovering" | "clicking" | "active";

export function TabsAnimation() {
  const [phase, setPhase] = useState<AnimPhase>("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setPhase("hovering");
    timersRef.current.push(setTimeout(() => setPhase("clicking"), 500));
    timersRef.current.push(setTimeout(() => setPhase("active"), 700));
  }, []);

  const handleLeave = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setPhase("idle");
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

  const transition = config.transition;

  const isHovered = phase !== "idle";
  const isClicking = phase === "clicking" || phase === "active";
  const isActive = phase === "active";

  // Tab bar layout
  const barX = 80;
  const barY = 118;
  const barWidth = 240;
  const tabHeight = 36;
  const tabWidth = barWidth / 3; // 80

  // Underline indicator
  const indicatorY = barY + tabHeight - 2;
  const indicatorHeight = 2;

  // Cursor target: center of tab 2
  const tab2CenterX = barX + tabWidth + tabWidth / 2;
  const tab2CenterY = barY + tabHeight / 2;

  const cursorFrames = {
    idle: {
      target: { x: barX + barWidth + 50, y: barY + tabHeight + 40 },
      opacity: 0,
    },
    hovering: {
      target: { x: tab2CenterX, y: tab2CenterY },
      opacity: 1,
    },
    clicking: {
      target: { x: tab2CenterX, y: tab2CenterY },
      opacity: 1,
      scale: 0.82,
    },
    active: {
      target: { x: tab2CenterX, y: tab2CenterY },
      opacity: 1,
    },
  } satisfies Record<AnimPhase, CursorFrame>;

  // Content lines shift on active
  const contentLines = isActive
    ? [{ width: 110, opacity: 0.15 }, { width: 80, opacity: 0.1 }]
    : [{ width: 160, opacity: 0.15 }, { width: 100, opacity: 0.1 }];

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <style>{`
              @keyframes tabs-ripple {
                from { transform: scale(1); opacity: 0.35; }
                to { transform: scale(5); opacity: 0; }
              }
            `}</style>
          </defs>

          {/* Tab bar bottom border */}
          <line
            x1={barX} y1={barY + tabHeight}
            x2={barX + barWidth} y2={barY + tabHeight}
            stroke="currentColor"
            strokeWidth="1"
            className="text-background-600"
            style={{ opacity: 0.5 }}
          />

          {/* Tab 1 label */}
          <rect
            x={barX + 12} y={barY + 13}
            width={56} height={8}
            rx={config.barRx}
            className={isActive ? config.dim.class : config.highlight.hoverClass}
            fill="currentColor"
            style={{
              opacity: isActive ? 0.25 : 0.65,
              transition,
            }}
          />

          {/* Tab 2 label */}
          <rect
            x={barX + tabWidth + 12} y={barY + 13}
            width={56} height={8}
            rx={config.barRx}
            className={isActive ? config.highlight.hoverClass : config.dim.class}
            fill="currentColor"
            style={{
              opacity: isActive ? 0.65 : (isHovered ? 0.35 : 0.2),
              transition,
            }}
          />

          {/* Tab 3 label */}
          <rect
            x={barX + tabWidth * 2 + 12} y={barY + 13}
            width={56} height={8}
            rx={config.barRx}
            className={config.dim.class}
            fill="currentColor"
            style={{ opacity: 0.2 }}
          />

          {/* Underline indicator — slides via translateX */}
          <rect
            x={barX}
            y={indicatorY}
            width={tabWidth}
            height={indicatorHeight}
            rx={1}
            className={config.highlight.hoverClass}
            fill="currentColor"
            style={{
              opacity: 0.8,
              transform: `translateX(${isActive ? tabWidth : 0}px)`,
              transition: `transform 0.4s cubic-bezier(0.25, 0, 0.25, 1)`,
            }}
          />

          {/* Click ripple */}
          <circle
            cx={tab2CenterX}
            cy={tab2CenterY}
            r={4}
            className={config.highlight.hoverClass}
            fill="currentColor"
            style={{
              transformOrigin: `${tab2CenterX}px ${tab2CenterY}px`,
              animation: isClicking ? "tabs-ripple 0.35s ease-out forwards" : "none",
              opacity: 0,
            }}
          />

          {/* Content skeleton */}
          <g>
            {contentLines.map((line, lineIndex) => (
              <rect
                key={lineIndex}
                x={barX}
                y={barY + tabHeight + 20 + lineIndex * 16}
                width={line.width}
                height={6}
                rx={config.barRx}
                className="text-foreground-300"
                fill="currentColor"
                style={{ opacity: line.opacity, transition }}
              />
            ))}
          </g>

          {/* Accent outline ring — wraps the hovered tab trigger */}
          <rect
            x={barX + tabWidth - 8}
            y={barY - 6}
            width={tabWidth + 16}
            height={tabHeight + 12}
            rx={config.blockRx}
            fill="none"
            stroke="currentColor"
            className={config.accentOutline.colorClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isActive ? config.accentOutline.hoverOpacity : 0,
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
