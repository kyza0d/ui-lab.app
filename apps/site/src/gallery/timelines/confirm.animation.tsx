"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

// Brought over from your GroupAnimation pattern
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

export function ConfirmAnimation() {
  // Expanded state machine for a realistic multi-click sequence
  const [stage, setStage] = useState<
    "idle" | "hovering" | "clicking_trash" | "confirming"
  >("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;

    let timers: NodeJS.Timeout[] = [];

    const handleEnter = () => {
      setStage("hovering");
      // Sequence the actions naturally
      timers.push(setTimeout(() => setStage("clicking_trash"), 500));
      timers.push(setTimeout(() => setStage("confirming"), 800));
    };

    const handleLeave = () => {
      timers.forEach(clearTimeout);
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

  const isConfirming = stage === "confirming";
  const isTrashActive = stage === "hovering" || stage === "clicking_trash";

  // Layout Constants
  const centerY = 150;
  const containerH = 48;
  const containerY = centerY - containerH / 2;
  const rx = config.blockRx;

  // Grouped Item Dimensions
  const trashW = 130;
  const cancelW = 110;
  const confirmW = 148;
  const gap = 20; // Increased gap for distinct button look

  // Fixed Layout Positions
  const trashX = 200 - trashW / 2;
  const confirmGroupW = cancelW + confirmW + gap;
  const confirmGroupX = 200 - confirmGroupW / 2;
  const cancelX = confirmGroupX;
  const confirmX = confirmGroupX + cancelW + gap;

  // Press animation style
  const press = {
    idle: { transform: "translateY(0px)" },
    hover: { transform: "translateY(2px)" },
  };

  // 1. Fixed Cursor Tracking
  // Hardcode coordinates to target the logical center of the buttons rather than relying on container bounds
  let cursorX = 200;
  let cursorY = 200;
  let cursorScale = 1;
  let cursorOpacity = 0;

  switch (stage) {
    case "idle": cursorX = 250; cursorY = 220; cursorOpacity = 0; break;
    case "hovering": cursorX = 200; cursorY = 150; cursorOpacity = 1; cursorScale = 1; break; // Center of Trash
    case "clicking_trash": cursorX = 200; cursorY = 150; cursorOpacity = 1; cursorScale = 0.85; break; // Press Trash
    case "confirming": cursorX = confirmX + (confirmW / 2); cursorY = 150; cursorOpacity = 1; cursorScale = 1; break; // Center of Confirm
  }

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
            <radialGradient id="group-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="group-grid-mask">
              <rect width="400" height="300" fill="url(#group-grid-fade)" />
            </mask>
            <clipPath id="confirm-clip">
              <path
                d={getRoundedRectPath(confirmX, containerY, confirmW, containerH, {
                  tl: rx, bl: rx, tr: rx, br: rx
                })}
              />
            </clipPath>
          </defs>

          {/* Guidelines */}
          <g
            mask="url(#group-grid-mask)"
            className={config.guidelines.colorClass}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: stage !== "idle" ? 0.30 : 0.15,
              strokeDashoffset: stage !== "idle" ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            <line x1={200} y1="0" x2={200} y2="300" />
            <line x1="0" y1={centerY} x2="400" y2={centerY} />
          </g>

          <g
            style={{
              opacity: isConfirming ? 0 : 1,
              transform: isConfirming ? "translateY(-40px)" : (stage !== "idle" ? press.hover.transform : press.idle.transform),
              transition: config.transition,
              pointerEvents: isConfirming ? "none" : "auto",
            }}
          >
            {/* Trash Button Surface */}
            <path
              d={getRoundedRectPath(trashX, containerY, trashW, containerH, {
                tl: rx, bl: rx, tr: rx, br: rx,
              })}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <path
              d={getRoundedRectPath(trashX, containerY, trashW, containerH, {
                tl: rx, bl: rx, tr: rx, br: rx,
              })}
              className={isTrashActive ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: isTrashActive ? config.highlight.hoverFillOpacity : config.highlight.idleFillOpacity,
                strokeOpacity: isTrashActive ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />

            {/* Trash Button Skeletons */}
            <rect
              x={trashX + 12}
              y={containerY + 14}
              width={12}
              height={12}
              rx={config.barRx}
              fill="currentColor"
              className={isTrashActive ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{
                transition: config.transition,
                opacity: config.bar.primaryOpacity,
              }}
            />
            <rect
              x={trashX + 30}
              y={containerY + 16}
              width={58}
              height={8}
              rx={config.barRx}
              fill="currentColor"
              className={isTrashActive ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{
                transition: config.transition,
                opacity: config.bar.primaryOpacity,
              }}
            />
          </g>

          <g
            style={{
              opacity: isConfirming ? 1 : 0,
              transform: isConfirming ? press.hover.transform : "translateY(20px)",
              transition: config.transition,
              transitionDelay: isConfirming ? "0.3s" : "0s",
              pointerEvents: isConfirming ? "auto" : "none",
            }}
          >


            {/* Accent outline for Confirm button */}
            <rect
              x={confirmX - 10}
              y={containerY - 10}
              width={confirmW + 20}
              height={containerH + 20}
              rx={rx + 5}
              fill="none"
              stroke="currentColor"
              className="text-accent-500"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{
                opacity: 0.4,
                transition: config.transition,
                transformOrigin: "center",
              }}
            />

            {/* Cancel Button */}
            <path
              d={getRoundedRectPath(cancelX, containerY, cancelW, containerH, {
                tl: rx, bl: rx, tr: rx, br: rx,
              })}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <path
              d={getRoundedRectPath(cancelX, containerY, cancelW, containerH, {
                tl: rx, bl: rx, tr: rx, br: rx,
              })}
              className={config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: config.highlight.idleFillOpacity,
                strokeOpacity: config.highlight.idleStrokeOpacity,
              }}
            />

            {/* Cancel Skeleton */}
            <rect
              x={cancelX + (cancelW - 40) / 2}
              y={containerY + 20}
              width={40}
              height={8}
              rx={config.barRx}
              className={config.highlight.idleClass}
              fill="currentColor"
              style={{
                transition: config.transition,
                opacity: config.bar.secondaryOpacity
              }}
            />

            {/* Confirm Button */}
            <path
              d={getRoundedRectPath(confirmX, containerY, confirmW, containerH, {
                tl: rx, bl: rx, tr: rx, br: rx,
              })}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <path
              d={getRoundedRectPath(confirmX, containerY, confirmW, containerH, {
                tl: rx, bl: rx, tr: rx, br: rx,
              })}
              className={config.highlight.hoverClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: config.highlight.hoverFillOpacity,
                strokeOpacity: config.highlight.hoverStrokeOpacity,
              }}
            />

            {/* Loading Progress Bar (Fills slowly from left to right) */}
            <rect
              x={confirmX}
              y={containerY}
              width={isConfirming ? confirmW : 0}
              height={containerH}
              clipPath="url(#confirm-clip)"
              className="text-accent-500"
              fill="currentColor"
              style={{
                opacity: 0.6,
                transition: isConfirming ? "width 2s ease-out" : "none",
                transitionDelay: isConfirming ? "0.8s" : "0s",
              }}
            />

            {/* Confirm Skeleton */}
            <rect
              x={confirmX + (confirmW - 46) / 2}
              y={containerY + 20}
              width={46}
              height={8}
              rx={config.barRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              style={{
                transition: config.transition,
                opacity: config.bar.primaryOpacity
              }}
            />
          </g>

          <g
            style={{
              transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
              transition: `transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out`,
              opacity: cursorOpacity,
            }}
          >
            <path
              d="M0 0 L14 14 L9 15 L14 20 L12 22 L7 17 L2 22 Z"
              className={config.highlight.hoverClass}
              fill="currentColor"
              style={{ transition: config.transition }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
