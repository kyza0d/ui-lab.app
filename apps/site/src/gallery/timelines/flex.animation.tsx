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

export function FlexAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group");
    if (!galleryItem) return;
    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);
    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Simplified guidelines to strictly bound the 1D accordion expansion
  const xLines = [60, 160, 260, 340];
  const yLines = [60, 240];

  // Accordion Layout: Elements stay on the same Y-axis. 
  // Delays create a staggered "wave" pushing from right to left, then left to right.
  const blocks = [
    {
      row: { x: 60, y: 60, w: 80, h: 180 },   // Idle: Equal 1/3 width
      col: { x: 60, y: 60, w: 160, h: 180 },  // Hover: Expands
      delayHover: "100ms", // Waits for B & C to shrink right before expanding
      delayIdle: "0ms",    // Shrinks left immediately on leave
      id: "A"
    },
    {
      row: { x: 160, y: 60, w: 80, h: 180 },
      col: { x: 240, y: 60, w: 40, h: 180 },  // Hover: Compresses into a tab
      delayHover: "50ms",  // Staggers after C
      delayIdle: "50ms",   // Staggers after A
      id: "B"
    },
    {
      row: { x: 260, y: 60, w: 80, h: 180 },
      col: { x: 300, y: 60, w: 40, h: 180 },  // Hover: Compresses into a tab
      delayHover: "0ms",   // Shrinks and moves right immediately on hover
      delayIdle: "100ms",  // Waits for A & B to settle before returning
      id: "C"
    }
  ];

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="flex-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="flex-grid-mask">
              <rect width="400" height="300" fill="url(#flex-grid-fade)" />
            </mask>
          </defs>

          {/* Vertical guidelines mapping to the equal-width columns */}
          <g
            mask="url(#flex-grid-mask)"
            className={config.guidelines.colorClass}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0 : 0.25,
              strokeDashoffset: isHovered ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            {xLines.map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" />
            ))}
          </g>

          {/* Horizontal guidelines bounding the container height */}
          <g
            mask="url(#flex-grid-mask)"
            className={config.guidelines.colorClass}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.25 : 0,
              strokeDashoffset: isHovered ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            {yLines.map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
            ))}
          </g>

          {/* Vertical dividers showing the new gaps in hover state */}
          <g
            mask="url(#flex-grid-mask)"
            className={config.guidelines.colorClass}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.25 : 0,
              strokeDashoffset: isHovered ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            <line x1={230} y1={60} x2={230} y2={240} />
            <line x1={290} y1={60} x2={290} y2={240} />
          </g>

          {/* Flex Items */}
          {blocks.map((b, i) => {
            const current = isHovered ? b.col : b.row;
            const isHighlighted = i === 0;
            const currentDelay = isHovered ? b.delayHover : b.delayIdle;

            return (
              <g key={b.id}>
                <rect
                  x={current.x}
                  y={current.y}
                  width={current.w}
                  height={current.h}
                  rx={config.blockRx}
                  className="text-background-950"
                  fill="currentColor"
                  style={{
                    transition: config.transition,
                    transitionDelay: currentDelay,
                  }}
                />
                <rect
                  x={current.x}
                  y={current.y}
                  width={current.w}
                  height={current.h}
                  rx={config.blockRx}
                  className={
                    isHighlighted
                      ? isHovered ? config.highlight.hoverClass : config.highlight.idleClass
                      : config.dim.class
                  }
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={config.strokeWidth}
                  style={{
                    transition: config.transition,
                    transitionDelay: currentDelay,
                    fillOpacity: isHighlighted
                      ? isHovered ? config.highlight.hoverFillOpacity : config.highlight.idleFillOpacity
                      : config.dim.fillOpacity,
                    strokeOpacity: isHighlighted
                      ? isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity
                      : config.dim.strokeOpacity,
                  }}
                />

                {/* Inner Decorative Lines - Adjusted sizes to fit compressed tabs cleanly */}
                <rect
                  x={current.x + 12}
                  y={current.y + 20}
                  width={!isHovered ? 36 : (i === 0 ? 100 : 16)}
                  height={8}
                  rx={config.barRx}
                  fill="currentColor"
                  className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
                  style={{
                    transition: config.transition,
                    transitionDelay: currentDelay,
                    opacity: isHighlighted ? config.bar.primaryOpacity : 0,
                  }}
                />
                <rect
                  x={current.x + 12}
                  y={current.y + 36}
                  width={!isHovered ? 20 : (i === 0 ? 60 : 8)}
                  height={8}
                  rx={config.barRx}
                  fill="currentColor"
                  className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
                  style={{
                    transition: config.transition,
                    transitionDelay: currentDelay,
                    opacity: isHighlighted ? config.bar.secondaryOpacity : 0,
                  }}
                />
              </g>
            );
          })}

          {/* Active Item Highlight Ring */}
          <path
            d={getRoundedRectPath(
              (isHovered ? blocks[0].col : blocks[0].row).x - 10,
              (isHovered ? blocks[0].col : blocks[0].row).y - 10,
              (isHovered ? blocks[0].col : blocks[0].row).w + 20,
              (isHovered ? blocks[0].col : blocks[0].row).h + 20,
              {
                tl: config.blockRx + 5,
                tr: config.blockRx + 5,
                bl: config.blockRx + 5,
                br: config.blockRx + 5,
              }
            )}
            fill="none"
            stroke="currentColor"
            className={config.accentOutline.colorClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.4 : 0,
              transition: config.transition,
              transitionDelay: isHovered ? blocks[0].delayHover : blocks[0].delayIdle,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
