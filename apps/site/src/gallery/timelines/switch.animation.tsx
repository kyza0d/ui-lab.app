"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

export function SwitchAnimation() {
  const [stage, setStage] = useState<"idle" | "hover" | "toggled">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    let timers: NodeJS.Timeout[] = [];

    const handleEnter = () => {
      setStage("hover");
      timers.push(setTimeout(() => setStage("toggled"), 600));
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

  const isHovered = stage !== "idle";
  const isToggled = stage === "toggled";

  // Layout
  const rowX = 70;
  const rowW = 260;
  const rowH = 48;
  const switchW = 44;
  const switchH = 24;
  const switchX = rowX + rowW - switchW - 8;
  const thumbR = 9;
  const thumbOffX = switchX + 3 + thumbR;
  const thumbOnX = switchX + switchW - 3 - thumbR;
  const trackY = (rowH - switchH) / 2;
  const rowCY = rowH / 2;

  // Sliding positions (3 rows, 2 visible at a time — like radio)
  const startY = 102;
  const step = rowH + 16;

  const row0Y = isHovered ? startY - step : startY;
  const row1Y = isHovered ? startY : startY + step;
  const row2Y = isHovered ? startY + step : startY + step * 2;

  // Cursor targets row2 when hovered
  const switchCX = switchX + switchW / 2;
  const activeCY = startY + step + rowCY;

  const cursorFrames = {
    idle: {
      target: { x: 330, y: 240 },
      opacity: 0,
    },
    hover: {
      target: { x: switchCX - 6, y: activeCY - 6 },
      opacity: 1,
    },
    toggled: {
      target: { x: switchCX - 2, y: activeCY - 2 },
      opacity: 1,
      scale: 0.88,
    },
  } satisfies Record<"idle" | "hover" | "toggled", CursorFrame>;

  const rowData = [
    { y: row0Y, labelW: 80, on: true, isActive: false, opacity: isHovered ? 0 : 1 },
    { y: row1Y, labelW: 100, on: false, isActive: false, opacity: isHovered ? 0.5 : 0.8 },
    { y: row2Y, labelW: 65, on: isToggled, isActive: isHovered, opacity: isHovered ? 1 : 0 },
  ];

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
            <radialGradient id="switch-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="switch-mask">
              <rect width="400" height="300" fill="url(#switch-fade)" />
            </mask>
          </defs>

          <g
            style={{
              filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
              transition: "filter 0.6s ease",
            }}
          >
            {rowData.map((row, i) => {
              const thumbX = row.on ? thumbOnX : thumbOffX;

              return (
                <g
                  key={i}
                  style={{
                    transform: `translateY(${row.y}px)`,
                    opacity: row.opacity,
                    transition: config.transition,
                  }}
                >
                  {/* Row background */}
                  <rect
                    x={rowX} y={0} width={rowW} height={rowH} rx={config.blockRx}
                    className="text-transparent"
                    fill="currentColor"
                  />

                  {/* Active row highlight */}
                  {row.isActive && (
                    <>
                      <rect
                        x={rowX} y={0} width={rowW} height={rowH} rx={config.blockRx}
                        className={config.highlight.hoverClass}
                        fill="currentColor"
                        style={{
                          fillOpacity: isHovered ? 0.05 : 0,
                          transition: config.transition,
                        }}
                      />
                      <rect
                        x={rowX} y={0} width={rowW} height={rowH} rx={config.blockRx}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={config.strokeWidth}
                        className={config.highlight.hoverClass}
                        style={{
                          strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : 0,
                          transition: config.transition,
                        }}
                      />
                      <rect
                        x={rowX - 10} y={-10} width={rowW + 20} height={rowH + 20}
                        rx={config.blockRx + 5}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className={config.accentOutline.colorClass}
                        style={{
                          opacity: isHovered ? config.accentOutline.hoverOpacity : 0,
                          transition: config.transition,
                        }}
                      />
                    </>
                  )}

                  {/* Label */}
                  <rect
                    x={rowX + 12}
                    y={rowCY - 4}
                    width={row.labelW}
                    height={8}
                    rx={config.barRx}
                    className={row.isActive && isHovered ? config.highlight.hoverClass : config.dim.class}
                    fill="currentColor"
                    style={{
                      opacity: row.isActive ? (isHovered ? 0.9 : 0.4) : 0.25,
                      transition: config.transition,
                    }}
                  />

                  {/* Switch Track */}
                  <rect
                    x={switchX}
                    y={trackY}
                    width={switchW}
                    height={switchH}
                    rx={switchH / 2}
                    className={row.on ? config.highlight.hoverClass : "text-background-700"}
                    fill="currentColor"
                    style={{
                      fillOpacity: row.on ? 0.9 : 1,
                      transition: "fill 0.5s ease, fill-opacity 0.5s ease",
                    }}
                  />

                  {/* Switch Track Border */}
                  <rect
                    x={switchX}
                    y={trackY}
                    width={switchW}
                    height={switchH}
                    rx={switchH / 2}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1}
                    className={row.on ? config.highlight.hoverClass : "text-background-600"}
                    style={{
                      strokeOpacity: row.on ? 0.4 : 0.5,
                      transition: config.transition,
                    }}
                  />

                  {/* Switch Thumb */}
                  <g
                    style={{
                      transform: `translateX(${thumbX}px)`,
                      transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <circle
                      cx={0}
                      cy={rowCY}
                      r={thumbR}
                      fill="white"
                      style={{
                        filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
                        opacity: 0.95,
                      }}
                    />
                  </g>
                </g>
              );
            })}
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
