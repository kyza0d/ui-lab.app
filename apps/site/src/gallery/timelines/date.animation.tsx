"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

// Helper to generate a path for a rectangle with specific corner radii
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

const MonthGrid = ({ 
  state, 
  x, 
  y, 
  highlightDayIndex = -1 
}: { 
  state: "idle" | "active" | "dim" | "entering" | "leaving"; 
  x: number; 
  y: number; 
  highlightDayIndex?: number;
}) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  
  const transition = config.transition;

  // Grid Layout
  const cols = 7;
  const rows = 4;
  const cellSize = 18;
  const gap = 6;
  const gridWidth = cols * cellSize + (cols - 1) * gap;
  
  // Header Layout
  const headerHeight = 30;
  
  return (
    <g style={{ transform: `translate(${x}px, ${y}px)`, opacity: isDim ? 0.5 : 1, transition: config.transition }}>
      {/* Header Month/Year */}
      <rect 
        x={0} y={0} width={60} height={8} rx={config.barRx} 
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        fill="currentColor"
        style={{ 
          opacity: isActive ? config.activeContent.labelActiveOpacity : config.activeContent.labelIdleOpacity,
          transition 
        }}
      />
      
      {/* Chevrons */}
      <g transform={`translate(${gridWidth - 30}, 0)`}>
         {/* Prev */}
         <polyline 
            points="5,1 2,4 5,7" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className={config.guidelines.colorClass}
            style={{ opacity: 0.5 }}
         />
         {/* Next */}
         <polyline 
            points="25,1 28,4 25,7" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className={isActive ? config.highlight.hoverClass : "text-foreground-300"}
            style={{ opacity: isActive ? config.activeContent.interactiveActiveOpacity : config.activeContent.interactiveIdleOpacity, transition }}
         />
      </g>

      {/* Days Grid */}
      <g transform={`translate(0, ${headerHeight})`}>
        {Array.from({ length: rows * cols }).map((_, i) => {
          const isHighlighted = i === highlightDayIndex;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const dx = col * (cellSize + gap);
          const dy = row * (cellSize + gap);

          return (
            <rect
              key={i}
              x={dx}
              y={dy}
              width={cellSize}
              height={cellSize}
              rx={4}
              className={isHighlighted ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{
                opacity: isHighlighted 
                  ? config.bar.primaryOpacity 
                  : (isActive ? 0.15 : 0.1),
                transition
              }}
            />
          );
        })}
      </g>
    </g>
  );
};

export function DateAnimation() {
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

  // Container Dimensions
  const width = 220;
  const height = 180;
  const x = (400 - width) / 2;
  const y = (300 - height) / 2;
  const rx = config.blockRx;
  const transition = config.transition;

  // Animation States
  const slideDistance = width; 
  const tapeX = isHovered ? -slideDistance : 0;
  const slideTransition = "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1)"; 
  
  // Inner Padding
  const px = 24;
  const py = 24;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="date-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="date-grid-mask">
              <rect width="400" height="300" fill="url(#date-grid-fade)" />
            </mask>
            <clipPath id="date-content-clip">
              <rect x={x} y={y} width={width} height={height} rx={rx} />
            </clipPath>
          </defs>

          {/* Guidelines */}
          <g
            mask="url(#date-grid-mask)"
            className={config.guidelines.colorClass}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? config.guidelines.hoverOpacity : config.guidelines.idleOpacity,
              strokeDashoffset: isHovered ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            <line x1="200" y1="0" x2="200" y2="300" />
            <line x1="0" y1={150} x2="400" y2={150} />
          </g>

          {/* Date Picker Container */}
          <g>
             {/* Background */}
            <rect 
              x={x} y={y} width={width} height={height} rx={rx}
              className="text-background-950"
              fill="currentColor"
              style={{ transition }}
            />
            {/* Border/Surface */}
            <rect 
              x={x} y={y} width={width} height={height} rx={rx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition,
                fillOpacity: 0.05,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />
          </g>

          {/* Sliding Content (Clipped) */}
          <g clipPath="url(#date-content-clip)">
            <g style={{ transform: `translateX(${x + px + tapeX}px)`, transition: slideTransition }}>
                
                {/* Month 1 (Exits Left) */}
                <MonthGrid 
                  state={isHovered ? "leaving" : "idle"}
                  x={0} 
                  y={y + py}
                  highlightDayIndex={10} 
                />
                
                {/* Month 2 (Enters Center) */}
                <MonthGrid 
                  state={isHovered ? "active" : "entering"}
                  x={slideDistance} 
                  y={y + py}
                  highlightDayIndex={15} 
                />

                 {/* Month 3 (Way Right - Preload) */}
                 <MonthGrid 
                  state="entering"
                  x={slideDistance * 2} 
                  y={y + py}
                />
            </g>
          </g>
          
          {/* Active Highlight Ring (Outer) */}
          <rect
            x={x - 10}
            y={y - 10}
            width={width + 20}
            height={height + 20}
            rx={rx + 5}
            fill="none"
            stroke="currentColor"
            className={config.accentOutline.colorClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? config.accentOutline.hoverOpacity : config.accentOutline.idleOpacity,
              transition,
              transform: `translateY(${isHovered ? 0 : -10}px)`
            }}
          />

          {/* Cursor (Simulate Interaction) */}
          <g
            style={{
              transform: isHovered 
                ? `translate(${x + width - 40}px, ${y + 35}px)` 
                : `translate(${x + width + 40}px, ${y + height + 20}px)`, 
              opacity: isHovered ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.2, 1, 0.4, 1) 0.1s"
            }}
          >
            <path
              d="M0 0 L14 14 L9 15 L14 20 L12 22 L7 17 L2 22 Z"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{ 
                transform: isHovered ? "scale(0.9)" : "scale(1)",
                transition: "transform 0.2s" 
              }}
            />
          </g>

        </svg>
      </div>
    </div>
  );
}
