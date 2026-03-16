"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import { Cursor, CursorProvider, type CursorFrame } from "./preview-cursor";

const T = "all 0.4s cubic-bezier(0.25, 0, 0.25, 1)";

type Stage = "idle" | "hovering" | "open";

export function AnchorAnimation() {
  const [stage, setStage] = useState<Stage>("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const handleEnter = () => {
      setStage("hovering");
      timers.push(setTimeout(() => setStage("open"), 500));
    };

    const handleLeave = () => {
      timers.forEach(clearTimeout);
      timers = [];
      setStage("idle");
    };

    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      timers.forEach(clearTimeout);
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const isActive = stage !== "idle";
  const isOpen = stage === "open";

  const cursorFrames = {
    idle: { target: { x: 265, y: 195 }, opacity: 0 },
    hovering: { target: { x: 201, y: 152 }, opacity: 1 },
    open: { target: { x: 201, y: 152 }, opacity: 1 },
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
              <div
                className="flex items-center gap-1.5 px-2 py-[5px] border-b"
                style={{ borderColor: "color-mix(in srgb, var(--color-background-700) 50%, transparent)" }}
              >
                <div
                  className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: "var(--color-accent-500)",
                    opacity: isOpen ? 0.55 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.18s" : "0s",
                  }}
                />
                <div
                  className="h-[5px] flex-1 rounded-sm"
                  style={{
                    backgroundColor: "var(--color-accent-500)",
                    opacity: isOpen ? 0.3 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.22s" : "0s",
                  }}
                />
                <div
                  className="h-[5px] w-[20px] rounded-sm bg-background-500"
                  style={{
                    opacity: isOpen ? 0.2 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.24s" : "0s",
                  }}
                />
              </div>

              {/* Content lines */}
              <div className="px-2 py-[6px] flex flex-col gap-[5px]">
                <div
                  className="h-[5px] w-[65%] rounded-sm bg-background-500"
                  style={{
                    opacity: isOpen ? 0.45 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.28s" : "0s",
                  }}
                />
                <div
                  className="h-[5px] w-[80%] rounded-sm bg-background-500"
                  style={{
                    opacity: isOpen ? 0.2 : 0,
                    transition: T,
                    transitionDelay: isOpen ? "0.34s" : "0s",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Line 1 — anchor inline */}
          <div className="flex gap-1 items-center">
            <div className="h-[5px] w-[28px] rounded-sm bg-background-500 opacity-20" />
            <div className="flex flex-col gap-[2px]">
              <div
                className="h-[5px] w-[38px] rounded-sm"
                style={{
                  backgroundColor: isActive
                    ? "var(--color-accent-500)"
                    : "var(--color-background-500)",
                  opacity: isActive ? 0.7 : 0.2,
                  transition: T,
                }}
              />
              <div
                className="h-px w-[38px] rounded-full"
                style={{
                  backgroundColor: "var(--color-accent-500)",
                  opacity: isActive ? 0.45 : 0,
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
