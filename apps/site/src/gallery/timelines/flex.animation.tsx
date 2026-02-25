"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

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
  const yLines = [60, 140, 155, 290];

  const blocks = [
    {
      row: { x: 60, y: 60, w: 140, h: 180 },
      col: { x: 60, y: 60, w: 280, h: 80 },
      delay: "0ms",
      id: "A"
    },
    {
      row: { x: 220, y: 60, w: 50, h: 180 },
      col: { x: 60, y: 155, w: 140, h: 80 },
      delay: "50ms",
      id: "B"
    },
    {
      row: { x: 290, y: 60, w: 50, h: 180 },
      col: { x: 220, y: 155, w: 120, h: 80 },
      delay: "100ms",
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

          {/* Vertical guidelines — visible in row layout */}
          <g
            mask="url(#flex-grid-mask)"
            className="text-foreground-300"
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

          {/* Horizontal guidelines — visible in column layout */}
          <g
            mask="url(#flex-grid-mask)"
            className="text-foreground-300"
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

          {/* Vertical dividers between bottom cells — visible in column layout */}
          <g
            mask="url(#flex-grid-mask)"
            className="text-foreground-300"
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

            return (
              <g key={b.id}>
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
                    transitionDelay: b.delay,
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
                    transitionDelay: b.delay,
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
                    transitionDelay: b.delay,
                    opacity: isHighlighted ? config.bar.secondaryOpacity : 0,
                  }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
