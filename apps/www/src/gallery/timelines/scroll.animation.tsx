"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";
import { Cursor, CursorProvider, type CursorFrame } from "./preview-cursor";

const T = config.transition;
// Slow deliberate drag — cursor and thumb share this timing
const DRAG_T = "transform 1.3s cubic-bezier(0.4, 0, 0.6, 1)";
const DRAG_CURSOR_T = "transform 1.3s cubic-bezier(0.4, 0, 0.6, 1), opacity 0.25s ease-out";

// Container
const CL = 108, CT = 72, CW = 184, CH = 156;

// Scrollbar
const SB_X = CL + CW - 10; // 282
const SB_T = CT + 6;        // 78
const SB_H = CH - 12;       // 144
const SB_W = 4;
const THUMB_H = 48;
const THUMB_IDLE_Y = SB_T + 4;                    // 82
const THUMB_DRAG_Y = SB_T + SB_H - THUMB_H - 4;  // 170

const SCROLL_AMT = 90;

type Stage = "idle" | "hovering" | "dragging";

export function ScrollAnimation() {
  const [stage, setStage] = useState<Stage>("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("hovering");
    timersRef.current.push(setTimeout(() => setStage("dragging"), 500));
  }, []);

  const handleLeave = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStage("idle");
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const target = el.closest(".group") || el;
    target.addEventListener("mouseenter", handleEnter);
    target.addEventListener("mouseleave", handleLeave);
    return () => {
      timersRef.current.forEach(clearTimeout);
      target.removeEventListener("mouseenter", handleEnter);
      target.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleEnter, handleLeave]);

  const isActive = stage !== "idle";
  const isDragging = stage === "dragging";

  const cursorFrames = {
    idle: {
      target: { x: 340, y: 230 },
      opacity: 0,
    },
    hovering: {
      target: { x: SB_X, y: THUMB_IDLE_Y + THUMB_H / 2 },
      opacity: 1,
    },
    dragging: {
      target: { x: SB_X, y: THUMB_DRAG_Y + THUMB_H / 2 },
      opacity: 1,
      motionTransition: DRAG_CURSOR_T,
    },
  } satisfies Record<Stage, CursorFrame>;

  const x = CL + 14;

  return (
    <div
      ref={containerRef}
      className="bg-background-950 flex items-center justify-center relative overflow-hidden"
    >
      <div className="relative w-full max-w-[400px]">
        <svg
          viewBox="50 30 300 240"
          className="w-full h-auto relative z-10 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="scroll-clip">
              <rect x={CL} y={CT} width={CW - 16} height={CH} />
            </clipPath>
            <linearGradient id="scroll-fade-t" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-background-950)" stopOpacity="1" />
              <stop offset="1" stopColor="var(--color-background-950)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="scroll-fade-b" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-background-950)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--color-background-950)" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Container background */}
          <rect
            x={CL} y={CT} width={CW} height={CH} rx={4}
            fill="currentColor" className="text-background-950"
          />

          {/* Scrollable content — outer clips, inner translates */}
          <g clipPath="url(#scroll-clip)">
            <g
              style={{
                transform: isDragging ? `translateY(${-SCROLL_AMT}px)` : "translateY(0px)",
                transition: isDragging ? DRAG_T : T,
              }}
            >
              {/* Section 1 */}
              <rect x={x} y={85} width={56} height={5} rx={2.5} fill="currentColor" className="text-background-500" style={{ opacity: 0.5 }} />
              <rect x={x} y={97} width={140} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
              <rect x={x} y={105} width={110} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
              <rect x={x} y={113} width={124} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />

              <line x1={x} y1={125} x2={x + 148} y2={125} stroke="currentColor" className="text-background-700" strokeWidth={0.5} style={{ opacity: 0.5 }} />

              {/* Section 2 */}
              <rect x={x} y={133} width={48} height={5} rx={2.5} fill="currentColor" className="text-background-500" style={{ opacity: 0.5 }} />
              <rect x={x} y={145} width={128} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
              <rect x={x} y={153} width={96} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />

              <line x1={x} y1={165} x2={x + 148} y2={165} stroke="currentColor" className="text-background-700" strokeWidth={0.5} style={{ opacity: 0.5 }} />

              {/* Section 3 — visible */}
              <rect x={x} y={175} width={55} height={5} rx={2.5} fill="currentColor" className="text-background-500" style={{ opacity: 0.5 }} />
              <rect x={x} y={187} width={128} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
              <rect x={x} y={195} width={96} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
              <rect x={x} y={203} width={112} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />

              <line x1={x} y1={215} x2={x + 148} y2={215} stroke="currentColor" className="text-background-700" strokeWidth={0.5} style={{ opacity: 0.5 }} />

              {/* Section 4 — starts below clip (y=228), revealed on scroll */}
              <rect x={x} y={232} width={60} height={5} rx={2.5} fill="currentColor" className="text-background-500" style={{ opacity: 0.5 }} />
              <rect x={x} y={244} width={140} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
              <rect x={x} y={252} width={100} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />

              <line x1={x} y1={264} x2={x + 148} y2={264} stroke="currentColor" className="text-background-700" strokeWidth={0.5} style={{ opacity: 0.5 }} />

              {/* Section 5 */}
              <rect x={x} y={273} width={44} height={5} rx={2.5} fill="currentColor" className="text-background-500" style={{ opacity: 0.5 }} />
              <rect x={x} y={285} width={132} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
              <rect x={x} y={293} width={88} height={4} rx={2} fill="currentColor" className="text-background-500" style={{ opacity: 0.2 }} />
            </g>
          </g>

          {/* Top fade — appears as content scrolls */}
          <rect
            x={CL} y={CT} width={CW - 16} height={22}
            fill="url(#scroll-fade-t)"
            style={{ opacity: isDragging ? 1 : 0, transition: isDragging ? DRAG_T : T, pointerEvents: "none" }}
          />
          {/* Bottom fade — always present */}
          <rect
            x={CL} y={CT + CH - 22} width={CW - 16} height={22}
            fill="url(#scroll-fade-b)"
            style={{ pointerEvents: "none" }}
          />

          {/* Scrollbar thumb — appears on hover, drags on drag */}
          <rect
            x={SB_X} y={THUMB_IDLE_Y} width={SB_W} height={THUMB_H} rx={2}
            fill="currentColor" className="text-background-500"
            style={{
              opacity: isActive ? 0.6 : 0,
              transform: isDragging
                ? `translateY(${THUMB_DRAG_Y - THUMB_IDLE_Y}px)`
                : "translateY(0px)",
              transition: isDragging ? DRAG_T : T,
            }}
          />

          <CursorProvider
            phase={stage}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition:
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
