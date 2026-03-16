"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

function getRoundedRectPath(x: number, y: number, w: number, h: number, r: { tl: number, tr: number, bl: number, br: number }) {
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

const CommandItem = ({ state, y, x, width }: { state: "idle" | "active" | "dim"; y: number; x: number; width: number }) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  const transition = config.transition;

  const itemHeight = 30; // Adjusted from 44
  const paddingX = 9;   // Adjusted from 12

  return (
    <g style={{ transform: `translateY(${y}px)`, transition }}>
      {/* Base layer */}
      <rect
        x={x + 4} y={1} width={width - 8} height={itemHeight - 4} rx={5} // Adjusted from x+6, y+2, width-12, height-4, rx=8
        className="text-background-950"
        fill="currentColor"
        style={{ transition }}
      />
      {/* Surface layer */}
      <rect
        x={x + 4} y={1} width={width - 8} height={itemHeight - 4} rx={5} // Adjusted from x+6, y+2, width-12, height-4, rx=8
        className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{
          transition,
          fillOpacity: isActive ? config.highlight.hoverFillOpacity : (isDim ? config.dim.fillOpacity : 0),
          strokeOpacity: isActive ? config.highlight.hoverStrokeOpacity : (isDim ? config.dim.strokeOpacity : 0),
        }}
      />

      {/* Icon placeholder */}
      <rect
        x={x + paddingX + 4} y={8} width={14} height={14} rx={config.barRx} // Adjusted from x+paddingX+6, y+12, width=20, height=20
        className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
        fill="currentColor"
        style={{
          opacity: isActive ? config.bar.primaryOpacity : (isDim ? 0.15 : 0.3),
          transition
        }}
      />

      {/* Label */}
      <rect
        x={x + paddingX + 24} y={11} width={isActive ? 82 : 61} height={4} rx={2} // Adjusted from x+paddingX+36, y+16, width=120/90, height=6, rx=3
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.labelActiveOpacity : (isDim ? 0.2 : 0.4),
          transition
        }}
      />

      {/* Subtext */}
      <rect
        x={x + paddingX + 24} y={18} width={isActive ? 55 : 41} height={3} rx={1} // Adjusted from x+paddingX+36, y+26, width=80/60, height=4, rx=2
        className={isActive ? config.activeContent.subtextClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.subtextActiveOpacity : (isDim ? 0.1 : 0.2),
          transition
        }}
      />
    </g>
  );
};

export function CommandAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);
    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Layout Constants
  const centerLine = 150; // Half of new viewBox width 300
  const paletteWidth = 160;
  const startX = centerLine - paletteWidth / 2;
  const startY = 18;
  const headerHeight = 32; // Adjusted from 48
  const itemHeight = 34;
  const listPaddingTop = 6;
  const footerHeight = 24; // Adjusted from 36
  const listHeight = listPaddingTop + itemHeight * 3;
  const totalHeight = headerHeight + listHeight + footerHeight; // 146
  const rx = config.blockRx;

  // Animation values
  const scrollOffset = isHovered ? -itemHeight : 0;
  const transition = config.transition;

  return (
    <div
      ref={containerRef}
      className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans"
    >
      <div className="relative w-full max-w-[210px]">
        <svg
          viewBox="0 0 300 200" // Adjusted from 400 300
          className="w-full h-auto relative z-10 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="command-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="command-grid-mask">
              <rect width="300" height="200" fill="url(#command-grid-fade)" />
            </mask>
            <clipPath id="command-list-clip">
              <rect x={startX} y={startY + headerHeight} width={paletteWidth} height={listHeight} />
            </clipPath>
          </defs>

          {/* Command Palette Shell */}
          <g>
            {/* Base Background */}
            <path
              d={getRoundedRectPath(startX, startY, paletteWidth, totalHeight, {
                tl: rx, tr: rx, bl: rx, br: rx
              })}
              className="text-background-950"
              fill="currentColor"
            />
            {/* Surface / Border */}
            <path
              d={getRoundedRectPath(startX, startY, paletteWidth, totalHeight, {
                tl: rx, tr: rx, bl: rx, br: rx
              })}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition,
                fillOpacity: 0.05,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity
              }}
            />

            {/* Header / Search Bar */}
            <g transform={`translate(${startX}, ${startY})`}>
              <rect width={paletteWidth} height={headerHeight} fill="none" />
              <line
                x1={0} y1={headerHeight} x2={paletteWidth} y2={headerHeight}
                stroke="currentColor"
                className={isHovered ? config.highlight.hoverClass : config.dim.strokeClass}
                strokeWidth={1}
                style={{ opacity: 0.3, transition }}
              />

              {/* Search Icon Placeholder */}
              <circle
                cx={15} cy={headerHeight / 2} r={5}
                fill="none" stroke="currentColor"
                className={isHovered ? config.highlight.hoverClass : "text-background-500"}
                strokeWidth="1.5"
                style={{ opacity: 0.5, transition }}
              />
              <line
                x1={18} y1={headerHeight / 2 + 3} x2={21} y2={headerHeight / 2 + 6}
                stroke="currentColor"
                className={isHovered ? config.highlight.hoverClass : "text-background-500"}
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ opacity: 0.5, transition }}
              />

              {/* Search Text Placeholder */}
              <rect
                x={30} y={headerHeight / 2 - 3} width={isHovered ? 50 : 65} height={6} rx={3}
                className={isHovered ? config.highlight.hoverClass : "text-background-500"}
                fill="currentColor"
                style={{
                  opacity: isHovered ? 0.6 : 0.2,
                  transition
                }}
              />

              {/* Animated Cursor */}
              <rect
                x={isHovered ? 83 : 30} y={headerHeight / 2 - 6} width={2} height={12} rx={1}
                className={config.highlight.hoverClass}
                fill="currentColor"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: `transform 0.4s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.2s`,
                  transform: isHovered ? "translateX(0px)" : "translateX(-10px)"
                }}
              />            </g>

            {/* List Area */}
            <g clipPath="url(#command-list-clip)">
              <g transform={`translate(0, ${startY + headerHeight + listPaddingTop + scrollOffset})`} style={{ transition }}>
                <CommandItem state={isHovered ? "dim" : "idle"} y={0} x={startX} width={paletteWidth} />
                <CommandItem state={isHovered ? "active" : "idle"} y={itemHeight} x={startX} width={paletteWidth} />
                <CommandItem state={isHovered ? "idle" : "idle"} y={itemHeight * 2} x={startX} width={paletteWidth} />
                <CommandItem state={isHovered ? "dim" : "dim"} y={itemHeight * 3} x={startX} width={paletteWidth} />
              </g>
            </g>

            {/* Footer */}
            <g transform={`translate(${startX}, ${startY + headerHeight + listHeight})`}>
              <rect width={paletteWidth} height={footerHeight} className="text-background-950" fill="currentColor" style={{ opacity: 0.2 }} />
              <line
                x1={0} y1={0} x2={paletteWidth} y2={0}
                stroke="currentColor"
                className={config.dim.strokeClass}
                strokeWidth={1}
                style={{ opacity: 0.3 }}
              />

              {/* Footer shortcuts placeholder */}
              <rect x={9} y={10} width={28} height={6} rx={2} className={config.highlight.idleClass} fill="currentColor" style={{ opacity: 0.15 }} />
              <rect x={40} y={10} width={35} height={6} rx={2} className={config.highlight.idleClass} fill="currentColor" style={{ opacity: 0.15 }} />

              {/* Esc key placeholder */}
              <rect x={paletteWidth - 30} y={7} width={20} height={12} rx={3} className="text-background-950" fill="currentColor" style={{ opacity: 0.2 }} />
              <rect x={paletteWidth - 25} y={10} width={10} height={3} rx={1} className={config.highlight.idleClass} fill="currentColor" style={{ opacity: 0.4 }} />
            </g>
          </g>

          {/* Command Palette Highlight Ring */}
          <rect
            x={startX - 10}
            y={startY - 10}
            width={paletteWidth + 20}
            height={totalHeight + 20}
            rx={rx + 5}
            fill="none"
            stroke="currentColor"
            className={config.accentOutline.colorClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? config.accentOutline.hoverOpacity : config.accentOutline.idleOpacity,
              transition
            }}
          />
        </svg>
      </div>
    </div>
  );
}
