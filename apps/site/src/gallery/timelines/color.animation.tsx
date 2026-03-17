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

export function ColorAnimation() {
  const [stage, setStage] = useState<"idle" | "hover" | "hue" | "canvas">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    // Sequence: Hover -> Drag Hue -> Drag Canvas
    setStage("hover");
    timersRef.current.push(setTimeout(() => setStage("hue"), 600));
    timersRef.current.push(setTimeout(() => setStage("canvas"), 1600));
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

  // Constants
  const width = 200;
  const height = 185;
  const cx = 200;
  const cy = 150;
  const x = cx - width / 2;
  const y = cy - height / 2;

  // Dimensions
  const canvasHeight = 120;
  const sliderHeight = 12;
  const inputHeight = 32;
  const gap = 12;
  const rx = config.blockRx;

  // Colors
  // Idle: Desaturated Blue-ish
  const colorIdle = "hsl(210, 30%, 45%)";
  // Hue: Purple-ish (Dragging hue slider to the right)
  const colorHue = "hsl(270, 80%, 50%)";
  // Canvas: Lighter/Desaturated (Dragging canvas pointer)
  const colorCanvas = "hsl(270, 60%, 70%)";

  let currentColor = colorIdle;
  if (stage === "hue") currentColor = colorHue;
  if (stage === "canvas") currentColor = colorCanvas;

  // Knob Positions
  // Hue Slider: 0 to 100%
  // Canvas: x=sat, y=bright (inverse)

  // Initial Positions (Blue)
  const huePosIdle = 0.6 * width; // Somewhat blue
  const canvasXIdle = 0.8 * width;
  const canvasYIdle = 0.5 * canvasHeight;

  // Hue Stage Positions (Purple)
  const huePosHue = 0.8 * width; // Moved right
  const canvasXHue = canvasXIdle; // Same
  const canvasYHue = canvasYIdle; // Same

  // Canvas Stage Positions (Lighter)
  const huePosCanvas = huePosHue;
  const canvasXCanvas = 0.6 * width; // Moved left (desaturate)
  const canvasYCanvas = 0.3 * canvasHeight; // Moved up (lighter)

  let huePos = huePosIdle;
  let canvasX = canvasXIdle;
  let canvasY = canvasYIdle;

  if (stage === "hue") {
    huePos = huePosHue;
  } else if (stage === "canvas") {
    huePos = huePosCanvas;
    canvasX = canvasXCanvas;
    canvasY = canvasYCanvas;
  }

  const cursorFrames = {
    idle: {
      target: { x: cx + 60, y: cy + 60 },
      opacity: 0,
    },
    hover: {
      target: { x: x + huePosIdle, y: y + canvasHeight + gap + sliderHeight / 2 },
      opacity: 1,
    },
    hue: {
      target: { x: x + huePosHue, y: y + canvasHeight + gap + sliderHeight / 2 },
      opacity: 1,
      scale: 0.9,
    },
    canvas: {
      target: { x: x + canvasXCanvas, y: y + canvasYCanvas },
      opacity: 1,
      scale: 0.9,
    },
  } satisfies Record<"idle" | "hover" | "hue" | "canvas", CursorFrame>;

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
            <radialGradient id="color-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="color-grid-mask">
              <rect width="400" height="300" fill="url(#color-grid-fade)" />
            </mask>
            <clipPath id="picker-clip">
              <path
                d={getRoundedRectPath(x, y, width, height, {
                  tl: rx, tr: rx, bl: rx, br: rx
                })}
              />
            </clipPath>
          </defs>

          {/* Main Container */}
          <g style={{
            filter: stage === "idle" ? "grayscale(100%)" : "grayscale(0%)",
            opacity: stage === "idle" ? 0.7 : 1,
            transition: `${config.transition}, filter 0.6s ease, opacity 0.6s ease`,
            transform: "translateY(0)",
          }}>
            {/* Background Shell */}
            <path
              d={getRoundedRectPath(x, y, width, height, {
                tl: rx, tr: rx, bl: rx, br: rx
              })}
              className="text-background-950"
              fill="currentColor"
            />
            {/* Border */}
            <path
              d={getRoundedRectPath(x, y, width, height, {
                tl: rx, tr: rx, bl: rx, br: rx
              })}
              className={stage !== "idle" ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: 0.05,
                strokeOpacity: stage !== "idle" ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />

            {/* Inner Content Wrapper */}
            <g transform={`translate(${x}, ${y})`}>

              {/* 1. Color Canvas (Top) */}
              <g>
                {/* The Canvas Background */}
                <path
                  d={getRoundedRectPath(4, 4, width - 8, canvasHeight, {
                    tl: rx - 4, tr: rx - 4, bl: 4, br: 4
                  })}
                  fill={currentColor}
                  style={{ transition: "fill 1s cubic-bezier(0.25, 0, 0.25, 1)" }}
                />

                {/* Canvas Highlight / Selection Ring */}
                <circle
                  cx={canvasX} // Relative to container x, so we need to adjust or keep it absolute?
                  // My canvasX variable above is relative to container X.
                  cy={canvasY}
                  r={6}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  style={{
                    transition: "cx 1s cubic-bezier(0.25, 0, 0.25, 1), cy 1s cubic-bezier(0.25, 0, 0.25, 1)",
                    opacity: 0.8,
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
                  }}
                />
              </g>

              {/* 2. Sliders (Middle) */}
              <g transform={`translate(12, ${canvasHeight + gap + 4})`}>

                {/* Hue Slider Track */}
                <rect
                  width={width - 24}
                  height={sliderHeight}
                  rx={sliderHeight / 2}
                  fill="url(#hue-gradient)"
                  className="text-background-800"
                  style={{ opacity: 0.5 }} // Placeholder for actual gradient
                />
                {/* Faked Hue Gradient */}
                <defs>
                  <linearGradient id="hue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f00" />
                    <stop offset="17%" stopColor="#ff0" />
                    <stop offset="33%" stopColor="#0f0" />
                    <stop offset="50%" stopColor="#0ff" />
                    <stop offset="67%" stopColor="#00f" />
                    <stop offset="83%" stopColor="#f0f" />
                    <stop offset="100%" stopColor="#f00" />
                  </linearGradient>
                </defs>
                <rect
                  width={width - 24}
                  height={sliderHeight}
                  rx={sliderHeight / 2}
                  fill="url(#hue-gradient)"
                />

                {/* Hue Knob */}
                <circle
                  cx={huePos}
                  cy={sliderHeight / 2}
                  r={sliderHeight / 2 + 2}
                  fill="white"
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="1"
                  style={{
                    transition: "cx 1s cubic-bezier(0.25, 0, 0.25, 1)",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
                  }}
                />

                {/* Opacity Slider Track (Below Hue) */}
                <g transform={`translate(0, ${sliderHeight + gap})`}>
                  {/* Checkerboard pattern for transparency is too complex for this minimal view, just use solid */}
                  <rect
                    width={width - 24}
                    height={sliderHeight}
                    rx={sliderHeight / 2}
                    className="text-background-700"
                    fill="currentColor"
                  />
                  <rect
                    width={width - 24}
                    height={sliderHeight}
                    rx={sliderHeight / 2}
                    fill={currentColor}
                    style={{
                      transition: "fill 1s cubic-bezier(0.25, 0, 0.25, 1)",
                      opacity: 0.5 // Simulate some transparency
                    }}
                  />
                  <circle
                    cx={(width - 24) * 0.8} // Fixed pos for now
                    cy={sliderHeight / 2}
                    r={sliderHeight / 2 + 2}
                    fill="white"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                    style={{
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
                    }}
                  />
                </g>
              </g>
            </g>
          </g>

          <CursorProvider
            phase={stage}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition: "transform 1s cubic-bezier(0.25, 0, 0.25, 1), opacity 0.5s ease",
              shapeTransition: "transform 1s cubic-bezier(0.25, 0, 0.25, 1), opacity 0.5s ease",
            }}
          >
            <Cursor />
          </CursorProvider>

        </svg>
      </div>
    </div>
  );
}
