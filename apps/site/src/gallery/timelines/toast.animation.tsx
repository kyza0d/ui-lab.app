"use client";
import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

const TW = 256;
const TH = 50;
const CX = 200;
const TX = CX - TW / 2;
const T0_Y = 130;
const RX = 6;
const STEP = TH + 12;
const HOVER_SHIFT = 57;

export function ToastAnimation() {
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

  const cursorPhase = isHovered ? "hover" : "idle";
  const cursorFrames = {
    idle: {
      target: { x: TX + TW + 32, y: T0_Y + TH + 32 },
      opacity: 0,
    },
    hover: {
      target: { x: TX + TW - 28, y: T0_Y + TH - 18 + HOVER_SHIFT },
      opacity: 1,
    },
  } satisfies Record<typeof cursorPhase, CursorFrame>;

  const stackOrigin = `${CX}px ${T0_Y + TH / 2}px`;

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
          <g style={{
            transform: isHovered ? `translateY(${HOVER_SHIFT}px)` : "translateY(0px)",
            transition: config.transition,
          }}>
            {/* Accent outline on front toast when hovered */}
            <rect
              x={TX - 10}
              y={T0_Y - 10}
              width={TW + 20}
              height={TH + 20}
              rx={RX + 5}
              fill="none"
              stroke="currentColor"
              className={config.accentOutline.colorClass}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{
                opacity: isHovered ? 0.4 : 0,
                transition: config.transition,
              }}
            />

            {/* Toast 2 (furthest back) — rendered first, underneath */}
            <g
              style={{
                transformOrigin: stackOrigin,
                transform: isHovered
                  ? `translateY(${-STEP * 2}px)`
                  : `translateY(-10px) scaleX(0.82)`,
                opacity: isHovered ? 1 : 0.28,
                transition:
                  "transform 0.45s cubic-bezier(0.25, 0, 0.25, 1) 0.08s, opacity 0.4s ease 0.08s",
              }}
            >
              <ToastCard isActive={isHovered} />
            </g>

            {/* Toast 1 (middle) */}
            <g
              style={{
                transformOrigin: stackOrigin,
                transform: isHovered
                  ? `translateY(${-STEP}px)`
                  : `translateY(-5px) scaleX(0.91)`,
                opacity: isHovered ? 1 : 0.52,
                transition:
                  "transform 0.45s cubic-bezier(0.25, 0, 0.25, 1) 0.04s, opacity 0.4s ease 0.04s",
              }}
            >
              <ToastCard isActive={isHovered} />
            </g>

            {/* Toast 0 (front) — rendered last, always on top */}
            <ToastCard isActive />
          </g>

          <CursorProvider
            phase={cursorPhase}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition:
                "transform 0.55s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
            }}
          >
            <Cursor />
          </CursorProvider>
        </svg>
      </div>
    </div>
  );
}

function ToastCard({ isActive }: { isActive: boolean }) {
  const iconClass = isActive
    ? config.highlight.hoverClass
    : config.highlight.idleClass;

  return (
    <g>
      <rect
        x={TX} y={T0_Y} width={TW} height={TH} rx={RX}
        className="text-background-900"
        fill="currentColor"
      />
      <rect
        x={TX} y={T0_Y} width={TW} height={TH} rx={RX}
        fill="none"
        stroke="currentColor"
        className="text-background-500"
        strokeWidth={1}
        style={{ opacity: 0.35 }}
      />

      {/* Icon block */}
      <rect
        x={TX + 12} y={T0_Y + TH / 2 - 8}
        width={16} height={16} rx={3}
        fill="currentColor"
        className={iconClass}
        style={{ opacity: isActive ? 0.75 : 0.45, transition: config.transition }}
      />

      {/* Title bar */}
      <rect
        x={TX + 36} y={T0_Y + TH / 2 - 7}
        width={92} height={7} rx={3.5}
        fill="currentColor"
        className="text-foreground-400"
        style={{ opacity: isActive ? 0.6 : 0.3, transition: config.transition }}
      />

      {/* Subtitle bar */}
      <rect
        x={TX + 36} y={T0_Y + TH / 2 + 3}
        width={60} height={5} rx={2.5}
        fill="currentColor"
        className="text-foreground-400"
        style={{ opacity: isActive ? 0.3 : 0.15, transition: config.transition }}
      />

      {/* Close X */}
      <line
        x1={TX + TW - 18} y1={T0_Y + 12}
        x2={TX + TW - 12} y2={T0_Y + 18}
        stroke="currentColor"
        className="text-foreground-400"
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{ opacity: isActive ? 0.5 : 0.2, transition: config.transition }}
      />
      <line
        x1={TX + TW - 12} y1={T0_Y + 12}
        x2={TX + TW - 18} y2={T0_Y + 18}
        stroke="currentColor"
        className="text-foreground-400"
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{ opacity: isActive ? 0.5 : 0.2, transition: config.transition }}
      />
    </g>
  );
}
