"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";
import { Cursor, CursorProvider, type CursorFrame } from "./preview-cursor";

const T = "all 0.4s cubic-bezier(0.25, 0, 0.25, 1)";

type Stage = "idle" | "hovering" | "open";

export function AnchorAnimation() {
  const [stage, setStage] = useState<Stage>("idle");
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
    idle: { target: { x: 265, y: 195 }, opacity: 0 },
    hovering: { target: { x: 186, y: 142 }, opacity: 1 },
    open: { target: { x: 186, y: 142 }, opacity: 1 },
  } satisfies Record<Stage, CursorFrame>;

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="bg-background-950 flex items-center justify-center w-full h-full">
        {/* Text block is the flow anchor — always centered */}
        <div className="relative flex flex-col gap-[7px] w-[148px]">

          {/* Dashed accent outline */}
          <div
            className="absolute pointer-events-none rounded-[10px]"
            style={{
              inset: "-8px",
              border: "1.5px dashed var(--color-accent-500)",
              opacity: isActive ? config.accentOutline.hoverOpacity : 0,
              transition: T,
            }}
          />

          {/* Preview card — absolute, floats above text block */}
          <div
            className="absolute left-0 w-full"
            style={{
              bottom: "calc(100% + 10px)",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0px)" : "translateY(4px)",
              transition: T,
              transitionDelay: isOpen ? "0.08s" : "0s",
              pointerEvents: "none",
            }}
          >
            <div
              className="rounded-[5px] border overflow-hidden"
              style={{
                backgroundColor: "var(--color-background-900)",
                borderColor: "color-mix(in srgb, var(--color-background-700) 80%, transparent)",
              }}
            >
              {/* URL row */}
              <div className="flex items-center gap-1.5 px-2 py-[5px]">
                <div
                  className="w-[6px] h-[6px] rounded-full shrink-0"
                  style={{
                    backgroundColor: "var(--color-accent-500)",
                    opacity: isOpen ? 0.55 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.18s" : "0s",
                  }}
                />
                <div
                  className="h-[4px] flex-1 rounded-sm"
                  style={{
                    backgroundColor: "var(--color-accent-500)",
                    opacity: isOpen ? 0.3 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.22s" : "0s",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Line 1 — anchor inline */}
          <div className="flex gap-1 items-center">
            <div className="h-[5px] w-[28px] rounded-sm bg-background-500 opacity-20" />
            <div className="relative h-[5px] w-[38px]">
              <div
                className="h-[5px] w-full rounded-sm"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-accent-500)"
                    : "var(--color-background-500)",
                  opacity: isActive ? 0.7 : 0.2,
                  transition: T,
                }}
              />
              <div
                className="absolute left-0 w-full h-px rounded-full"
                style={{
                  bottom: "-3px",
                  backgroundColor: isActive
                    ? "var(--color-accent-500)"
                    : "var(--color-background-500)",
                  opacity: isActive ? 0.6 : 0.3,
                  transition: T,
                }}
              />
            </div>
            <div className="h-[5px] w-[48px] rounded-sm bg-background-500 opacity-20" />
          </div>

          {/* Line 3 */}
          <div className="h-[5px] w-[88px] rounded-sm bg-background-500 opacity-20" />
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
