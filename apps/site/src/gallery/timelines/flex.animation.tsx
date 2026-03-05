"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

/**
 * Helper to generate a path for a rectangle with specific corner radii
 */
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

  const xLines = [60, 200, 220, 270, 290, 340];
  const yLines = [60, 140, 160, 240];

  // Modified to include dynamic hover/idle delays for elegant choreography
  const blocks = [
    {
      row: { x: 60, y: 60, w: 140, h: 180 },
      col: { x: 60, y: 60, w: 280, h: 80 },
      delayHover: "150ms", // Waits for B & C to clear out before expanding
      delayIdle: "0ms",    // Contracts immediately on mouse leave
      id: "A"
    },
    {
      row: { x: 220, y: 60, w: 50, h: 180 },
      col: { x: 60, y: 160, w: 140, h: 80 },
      delayHover: "0ms",   // Moves out of the way immediately on hover
      delayIdle: "100ms",  // Waits for A to contract before moving back up
      id: "B"
    },
    {
      row: { x: 290, y: 60, w: 50, h: 180 },
      col: { x: 220, y: 160, w: 120, h: 80 },
      delayHover: "50ms",  // Slightly staggered after B on hover
      delayIdle: "150ms",  // Staggered return after B on mouse leave
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

          {/* Vertical guidelines */}
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

          {/* Horizontal guidelines */}
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

          {/* Vertical dividers */}
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
            <line x1={200} y1={0} x2={200} y2={300} />
            <line x1={220} y1={0} x2={220} y2={300} />
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

                <rect
                  x={current.x + 20}
                  y={current.y + 20}
                  width={isHovered ? (i === 1 ? 40 : 120) : (i === 0 ? 80 : 24)}
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
                  x={current.x + 20}
                  y={current.y + 36}
                  width={isHovered ? (i === 1 ? 20 : 80) : (i === 0 ? 40 : 14)}
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
              transitionDelay: isHovered ? blocks[0].delayHover : blocks[0].delayIdle, // Syncing ring with Block A
            }}
          />
        </svg>
      </div>
    </div>
  );
}
