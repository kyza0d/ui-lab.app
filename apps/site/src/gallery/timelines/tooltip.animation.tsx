"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Frame } from "ui-lab-components";
import { FaQuestion } from "react-icons/fa6";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

const TAIL_PATH =
  "M 0.00 0.00 C 3.00 0.00 7.50 -6.00 9.00 -6.00 C 10.50 -6.00 13.50 0.00 18.00 0.00";
const TAIL_WIDTH = 18;
const T = "all 0.4s cubic-bezier(0.25, 0, 0.25, 1)";

export function TooltipAnimation() {
  const [stage, setStage] = useState<"idle" | "hovering" | "shown">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("hovering");
    timersRef.current.push(setTimeout(() => setStage("shown"), 600));
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

  const isActive = stage !== "idle";
  const isShown = stage === "shown";
  const cursorFrames = {
    idle: {
      target: { x: 228, y: 186 },
      opacity: 0,
    },
    hovering: {
      target: { x: 208, y: 166 },
      opacity: 1,
    },
    shown: {
      target: { x: 208, y: 166 },
      opacity: 1,
    },
  } satisfies Record<typeof stage, CursorFrame>;

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="bg-background-950 flex flex-col items-center justify-center gap-2 relative overflow-hidden w-full h-full">
        {/* Tooltip */}
        <div
          style={{
            opacity: isShown ? 1 : 0,
            transform: isShown ? "translateY(0px)" : "translateY(8px)",
            transition: T,
            transitionDelay: isShown ? "0.25s" : "0s",
            pointerEvents: "none",
          }}
        >
          <Frame
            side="bottom"
            shapeMode="extend"
            cornerRadius={4}
            path={TAIL_PATH}
            pathWidth={TAIL_WIDTH}
            fill="var(--color-background-900)"
            padding="small"
          >
            <div className="flex items-center gap-2.5 px-0.5">
              {/* Label skeleton */}
              <div className="w-[66px] h-2 rounded bg-background-500 opacity-50" />

              {/* Hint badge */}
              <div
                className="flex items-center justify-center rounded px-1.5 py-0.5 bg-accent-500/15 border border-accent-500/30"
                style={{
                  opacity: isShown ? 1 : 0,
                  transition: T,
                  transitionDelay: isShown ? "0.45s" : "0s",
                }}
              >
                <div className="w-5 h-1.5 rounded bg-accent-500 opacity-80" />
              </div>
            </div>
          </Frame>
        </div>

        {/* Trigger button */}
        <div
          className="w-7 h-7 flex items-center px-2 rounded-[3px] border"
          style={{
            backgroundColor: "var(--color-background-900)",
            borderColor: isActive
              ? "color-mix(in srgb, var(--color-accent-500) 55%, var(--color-background-700))"
              : "var(--color-background-700)",
            transition: T,
          }}
        >
          <FaQuestion
            size={12}
            style={{
              color: isActive
                ? "var(--color-accent-500)"
                : "var(--color-background-500)",
              transition: T,
            }}
          />
        </div>

      </div>

      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        <CursorProvider
          phase={stage}
          frames={cursorFrames}
          appearance={{
            className: config.highlight.hoverClass,
            motionTransition: "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
          }}
        >
          <Cursor />
        </CursorProvider>
      </svg>
    </div>
  );
}
