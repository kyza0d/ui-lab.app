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
  r: { tl: number, tr: number, bl: number, br: number }
) {
  return `
    M ${x + r.tl} ${y}
    H ${x + w - r.tr}
    A ${r.tr} ${r.tr} 0 0 1 ${x + w} ${y + r.tr}
    V ${y + h - r.br}
    A ${r.br} ${r.br} 0 0 1 ${x + w - r.br} ${y + h}
    H ${x + r.bl}
    A ${r.bl} ${r.bl} 0 0 1 ${x} ${y + h - r.bl}
    V ${y + r.tl}
    A ${r.tl} ${r.tl} 0 0 1 ${x + r.tl} ${y}
    Z
  `;
}

export function InputAnimation() {
  const [stage, setStage] = useState<
    "idle" | "hovering" | "focused" | "typing" | "completed"
  >("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  // For typing simulation (0 to 1)
  const [typingProgress, setTypingProgress] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const animationFrameRef = useRef<number>(0);

  const handleEnter = useCallback(() => {
    setStage("hovering");

    // Move to focus/click
    timersRef.current.push(setTimeout(() => {
      setStage("focused");
    }, 600));

    // Start typing
    timersRef.current.push(setTimeout(() => {
      setStage("typing");
      // Animate typing progress
      let start: number | null = null;
      const duration = 800; // ms to type
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setTypingProgress(progress);
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          setStage("completed");
        }
      };
      animationFrameRef.current = requestAnimationFrame(step);
    }, 1100));
  }, []);

  const handleLeave = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setStage("idle");
    setTypingProgress(0);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      timersRef.current.forEach(clearTimeout);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleEnter, handleLeave]);

  // Layout Constants
  const centerY = 150;
  const centerX = 200;
  const inputW = 220;
  const inputH = 48; // Standard height like buttons
  const inputX = centerX - inputW / 2;
  const inputY = centerY - inputH / 2;
  const rx = config.blockRx;

  const isFocused = ["focused", "typing", "completed"].includes(stage);
  const isTyping = stage === "typing";
  const isCompleted = stage === "completed";

  const cursorFrames = {
    idle: {
      target: { x: 260, y: 220 },
      opacity: 0,
    },
    hovering: {
      target: { x: centerX, y: centerY },
      opacity: 1,
    },
    focused: {
      target: { x: centerX, y: centerY },
      opacity: 1,
      scale: 0.85,
    },
    typing: {
      target: { x: centerX + 80, y: centerY + 60 },
      opacity: 0,
    },
    completed: {
      target: { x: centerX + 80, y: centerY + 60 },
      opacity: 0,
    },
  } satisfies Record<
    "idle" | "hovering" | "focused" | "typing" | "completed",
    CursorFrame
  >;

  // Content dimensions
  const maxTextWidth = 120;
  const currentTextWidth = isFocused ? (isTyping ? typingProgress * maxTextWidth : (isCompleted ? maxTextWidth : 0)) : 0;

  // Placeholder visibility
  // Fade out placeholder as we type? Or just hide it on focus? 
  // Standard behavior: placeholder hides when text > 0.
  const showPlaceholder = !isTyping && !isCompleted;

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
            <radialGradient id="input-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="input-grid-mask">
              <rect width="400" height="300" fill="url(#input-grid-fade)" />
            </mask>
          </defs>

          {/* Input Group */}
          <g>
            {/* Main Input Box Background */}
            <path
              d={getRoundedRectPath(inputX, inputY, inputW, inputH, {
                tl: rx, tr: rx, bl: rx, br: rx
              })}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />

            {/* Main Input Box Border */}
            <path
              d={getRoundedRectPath(inputX, inputY, inputW, inputH, {
                tl: rx, tr: rx, bl: rx, br: rx
              })}
              className={isFocused ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: isFocused ? 0.05 : config.highlight.idleFillOpacity,
                strokeOpacity: isFocused ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />

            {/* Placeholder (Skeleton Bar) */}
            <rect
              x={inputX + 16}
              y={inputY + (inputH - 8) / 2}
              width={80}
              height={8}
              rx={config.barRx}
              className={config.dim.class}
              fill="currentColor"
              style={{
                transition: config.transition,
                opacity: showPlaceholder ? config.bar.secondaryOpacity : 0,
                transformOrigin: "left center",
                transform: showPlaceholder ? "scaleX(1)" : "scaleX(0.8)"
              }}
            />

            {/* Typed Text (Growing Bar) */}
            <rect
              x={inputX + 16}
              y={inputY + (inputH - 8) / 2}
              width={Math.max(0, currentTextWidth)}
              height={8}
              rx={config.barRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              style={{
                opacity: (isTyping || isCompleted) ? config.bar.primaryOpacity : 0,
              }}
            />

            {/* Caret / Cursor Line */}
            <rect
              x={inputX + 16 + (showPlaceholder ? 0 : currentTextWidth + 2)}
              y={inputY + 12}
              width={2}
              height={24}
              rx={1}
              className={config.accentOutline.colorClass}
              fill="currentColor"
              style={{
                opacity: isFocused && !isCompleted ? 1 : 0,
                transition: "opacity 0.2s, x 0.1s linear"
              }}
            />

            {/* Suffix Icon (Checkmark) - Appears on completion */}
            <g
              style={{
                opacity: isCompleted ? 1 : 0,
                transform: `translate(${inputX + inputW - 32}px, ${inputY + 14}px)`,
                transition: config.transition,
              }}
              className={config.highlight.hoverClass}
            >
              <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2" />
              <path
                d="M 6 10 L 9 13 L 14 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

          </g>

          <CursorProvider
            phase={stage}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition: "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
              shapeTransition: "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
            }}
          >
            <Cursor />
          </CursorProvider>
        </svg>
      </div>
    </div>
  );
}
