"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

function getRoundedRectPath(
  x: number, y: number, w: number, h: number,
  r: { tl: number; tr: number; bl: number; br: number }
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

export function TextareaAnimation() {
  const [stage, setStage] = useState<
    "idle" | "hovering" | "focused" | "typing" | "completed"
  >("idle");
  const [typingProgress, setTypingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;

    let timers: NodeJS.Timeout[] = [];
    let animationFrame: number;

    const handleEnter = () => {
      setStage("hovering");

      timers.push(setTimeout(() => {
        setStage("focused");
      }, 600));

      timers.push(setTimeout(() => {
        setStage("typing");
        let start: number | null = null;
        const duration = 1400;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setTypingProgress(progress);
          if (progress < 1) {
            animationFrame = requestAnimationFrame(step);
          } else {
            setStage("completed");
          }
        };
        animationFrame = requestAnimationFrame(step);
      }, 1100));
    };

    const handleLeave = () => {
      timers.forEach(clearTimeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      setStage("idle");
      setTypingProgress(0);
    };

    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      timers.forEach(clearTimeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Layout
  const textareaX = 80;
  const textareaY = 82;
  const textareaW = 240;
  const textareaH = 108;
  const rx = config.blockRx;
  const centerX = 200;

  const isFocused = ["focused", "typing", "completed"].includes(stage);
  const isCompleted = stage === "completed";
  const hasContent = stage === "typing" || isCompleted;
  const showPlaceholder = !hasContent;

  // Three text lines grow in sequence
  const line1W = Math.max(0, Math.min(1, typingProgress / 0.35) * 160);
  const line2W = Math.max(0, Math.min(1, (typingProgress - 0.35) / 0.35) * 130);
  const line3W = Math.max(0, Math.min(1, (typingProgress - 0.70) / 0.30) * 90);

  // Caret tracks the active line
  let caretX: number;
  let caretY: number;
  if (!hasContent) {
    caretX = textareaX + 16;
    caretY = textareaY + 15;
  } else if (typingProgress < 0.35) {
    caretX = textareaX + 16 + line1W + 2;
    caretY = textareaY + 15;
  } else if (typingProgress < 0.70) {
    caretX = textareaX + 16 + line2W + 2;
    caretY = textareaY + 31;
  } else {
    caretX = textareaX + 16 + line3W + 2;
    caretY = textareaY + 47;
  }

  // Character count bar (47 / 200 chars at completion)
  const charFillW = typingProgress * (47 / 200) * 60;

  const cursorFrames = {
    idle: {
      target: { x: 280, y: 240 },
      opacity: 0,
    },
    hovering: {
      target: { x: centerX, y: textareaY + textareaH / 2 },
      opacity: 1,
    },
    focused: {
      target: { x: centerX, y: textareaY + textareaH / 2 },
      opacity: 1,
      scale: 0.85,
    },
    typing: {
      target: { x: 310, y: 240 },
      opacity: 0,
    },
    completed: {
      target: { x: 310, y: 240 },
      opacity: 0,
    },
  } satisfies Record<
    "idle" | "hovering" | "focused" | "typing" | "completed",
    CursorFrame
  >;

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
            <radialGradient id="textarea-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="textarea-grid-mask">
              <rect width="400" height="300" fill="url(#textarea-grid-fade)" />
            </mask>
            <clipPath id="textarea-clip">
              <rect x={textareaX} y={textareaY} width={textareaW} height={textareaH} rx={rx} />
            </clipPath>
          </defs>

          {/* Label skeleton */}
          <rect
            x={textareaX}
            y={textareaY - 18}
            width={72}
            height={7}
            rx={config.barRx}
            className={config.dim.class}
            fill="currentColor"
            style={{ opacity: 0.3 }}
          />

          {/* Textarea background */}
          <path
            d={getRoundedRectPath(textareaX, textareaY, textareaW, textareaH, { tl: rx, tr: rx, bl: rx, br: rx })}
            className="text-background-950"
            fill="currentColor"
            style={{ transition: config.transition }}
          />

          {/* Textarea border */}
          <path
            d={getRoundedRectPath(textareaX, textareaY, textareaW, textareaH, { tl: rx, tr: rx, bl: rx, br: rx })}
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

          {/* Content (clipped to textarea bounds) */}
          <g clipPath="url(#textarea-clip)">
            {/* Placeholder lines */}
            <rect
              x={textareaX + 16} y={textareaY + 16}
              width={100} height={7} rx={config.barRx}
              className={config.dim.class}
              fill="currentColor"
              style={{ opacity: showPlaceholder ? 0.25 : 0, transition: config.transition }}
            />
            <rect
              x={textareaX + 16} y={textareaY + 30}
              width={68} height={5} rx={config.barRx}
              className={config.dim.class}
              fill="currentColor"
              style={{ opacity: showPlaceholder ? 0.14 : 0, transition: config.transition }}
            />

            {/* Typed text lines */}
            <rect
              x={textareaX + 16} y={textareaY + 16}
              width={line1W} height={7} rx={config.barRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              style={{ opacity: hasContent ? config.bar.primaryOpacity : 0 }}
            />
            <rect
              x={textareaX + 16} y={textareaY + 32}
              width={line2W} height={7} rx={config.barRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              style={{ opacity: hasContent && line2W > 0 ? config.bar.primaryOpacity : 0 }}
            />
            <rect
              x={textareaX + 16} y={textareaY + 48}
              width={line3W} height={7} rx={config.barRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              style={{ opacity: hasContent && line3W > 0 ? config.bar.primaryOpacity : 0 }}
            />
          </g>

          {/* Caret */}
          <rect
            x={caretX}
            y={caretY}
            width={2}
            height={14}
            rx={1}
            className={config.accentOutline.colorClass}
            fill="currentColor"
            style={{
              opacity: isFocused && !isCompleted ? 1 : 0,
              transition: "opacity 0.2s, x 0.08s linear, y 0.15s ease",
            }}
          />

          {/* Resize handle (two diagonal lines, bottom-right corner) */}
          <g
            className={config.dim.class}
            style={{ opacity: isFocused ? 0.45 : 0.2, transition: config.transition }}
          >
            <line
              x1={textareaX + textareaW - 10} y1={textareaY + textareaH - 2}
              x2={textareaX + textareaW - 2} y2={textareaY + textareaH - 10}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            />
            <line
              x1={textareaX + textareaW - 16} y1={textareaY + textareaH - 2}
              x2={textareaX + textareaW - 2} y2={textareaY + textareaH - 16}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            />
          </g>

          {/* Character count bar */}
          <g>
            {/* Background track */}
            <rect
              x={textareaX + textareaW - 60} y={textareaY + textareaH + 10}
              width={60} height={5} rx={2.5}
              className={config.dim.class}
              fill="currentColor"
              style={{ opacity: isFocused ? 0.15 : 0, transition: config.transition }}
            />
            {/* Fill */}
            <rect
              x={textareaX + textareaW - 60} y={textareaY + textareaH + 10}
              width={charFillW} height={5} rx={2.5}
              className={config.highlight.hoverClass}
              fill="currentColor"
              style={{ opacity: isFocused ? 0.7 : 0, transition: "opacity 0.4s" }}
            />
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
