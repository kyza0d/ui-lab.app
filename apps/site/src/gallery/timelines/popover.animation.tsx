"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Frame } from "ui-lab-components";
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

export function PopoverAnimation() {
  const [stage, setStage] = useState<"idle" | "hovering" | "open">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("hovering");
    timersRef.current.push(setTimeout(() => setStage("open"), 500));
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
  const isOpen = stage === "open";
  const cursorFrames = {
    idle: {
      target: { x: 222, y: 166 },
      opacity: 0,
    },
    hovering: {
      target: { x: 198, y: 132 },
      opacity: 1,
    },
    open: {
      target: { x: 198, y: 202 },
      opacity: 1,
    },
  } satisfies Record<typeof stage, CursorFrame>;

  // When closed, panel still occupies layout space (invisible).
  // Shift the wrapper UP so only the trigger is centered.
  // When open, translateY(0) lets flex justify-center balance the full group.
  const groupShift = isOpen ? "translateY(0)" : "translateY(-34px)";

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="bg-background-950 flex flex-col items-center justify-center w-full h-full">

        {/* Group wrapper — shifts to keep view centered during transition */}
        <div
          className="flex flex-col items-center gap-1"
          style={{ transform: groupShift, transition: T }}
        >
          {/* Popover Panel */}
          <div
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0px)" : "translateY(6px)",
              transition: T,
              transitionDelay: isOpen ? "0.1s" : "0s",
              pointerEvents: "none",
              isolation: "isolate",
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
              <div className="flex flex-col w-[132px]">
                {/* Header */}
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-background-700/60">
                  <div className="w-12 h-1.5 rounded bg-background-500 opacity-55" />
                  <div
                    className="w-2.5 h-2.5 rounded-[2px] border border-background-700/80"
                    style={{ backgroundColor: "var(--color-background-800)" }}
                  />
                </div>

                {/* Body lines */}
                <div className="flex flex-col gap-1 mb-2">
                  <div
                    className="w-[90%] h-1.5 rounded bg-background-500"
                    style={{
                      opacity: isOpen ? 0.25 : 0,
                      transition: T,
                      transitionDelay: isOpen ? "0.22s" : "0s",
                    }}
                  />
                  <div
                    className="w-[70%] h-1.5 rounded bg-background-500"
                    style={{
                      opacity: isOpen ? 0.17 : 0,
                      transition: T,
                      transitionDelay: isOpen ? "0.3s" : "0s",
                    }}
                  />
                </div>

                {/* Action */}
                <div
                  className="flex justify-end"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.36s" : "0s",
                  }}
                >
                  <div className="px-2 py-0.5 rounded-[3px] bg-accent-500/15 border border-accent-500/30 flex items-center">
                    <div className="w-8 h-1.5 rounded bg-accent-500 opacity-75" />
                  </div>
                </div>
              </div>
            </Frame>
          </div>

          {/* Trigger button */}
          <div
            className="flex items-center gap-2 h-7 px-3 rounded-[3px] border select-none"
            style={{
              backgroundColor: "var(--color-background-900)",
              borderColor: isActive
                ? "color-mix(in srgb, var(--color-accent-500) 55%, var(--color-background-700))"
                : "var(--color-background-700)",
              transition: T,
            }}
          >
            <div
              className="w-11 h-1.5 rounded"
              style={{
                backgroundColor: isActive
                  ? "var(--color-accent-500)"
                  : "var(--color-background-500)",
                opacity: isActive ? 0.65 : 0.4,
                transition: T,
              }}
            />
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
              <path
                d={isOpen ? "M1 4L4 1L7 4" : "M1 1L4 4L7 1"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  color: isActive
                    ? "var(--color-accent-500)"
                    : "var(--color-background-500)",
                  opacity: isActive ? 0.65 : 0.4,
                  transition: T,
                }}
              />
            </svg>
          </div>
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
            motionTransition:
              "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
          }}
        >
          <Cursor />
        </CursorProvider>
      </svg>
    </div>
  );
}
