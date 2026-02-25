"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

export function GridAnimation() {
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

  const vLines = [140, 160, 240, 260];
  const hLines = [140, 160];

  const intersections: { x: number; y: number }[] = [];
  vLines.forEach((x) => {
    hLines.forEach((y) => {
      intersections.push({ x, y });
    });
  });

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="grid-mask">
              <rect width="400" height="300" fill="url(#grid-fade)" />
            </mask>
          </defs>

          <g
            mask="url(#grid-mask)"
            className="text-foreground-300 transition-all duration-700 ease-in-out"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.30 : 0.15,
              strokeDashoffset: isHovered ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            {vLines.map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" />
            ))}
            {hLines.map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
            ))}
          </g>

          <g mask="url(#grid-mask)">
            {intersections.map((pt, i) => (
              <circle
                key={`dot${i}`}
                cx={pt.x}
                cy={pt.y}
                r="1.5"
                fill="currentColor"
                className="text-foreground-400"
                style={{
                  transition: "opacity 0.7s ease",
                  opacity: isHovered ? 0.40 : 0.1,
                }}
              />
            ))}
          </g>

          {/* Block A — featured idle, dims on hover */}
          <rect
            x={60}
            y={60}
            width={isHovered ? 80 : 180}
            height={isHovered ? 180 : 80}
            rx={config.blockRx}
            className={!isHovered ? config.highlight.idleClass : config.dim.class}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            style={{
              transition: config.transition,
              transitionDelay: "0ms",
              fillOpacity: !isHovered ? config.highlight.idleFillOpacity : config.dim.fillOpacity,
              strokeOpacity: !isHovered ? config.highlight.idleStrokeOpacity : config.dim.strokeOpacity,
            }}
          />
          <rect
            x={80}
            y={80}
            width={isHovered ? 40 : 140}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className={config.highlight.idleClass}
            style={{
              transition: config.transition,
              transitionDelay: "0ms",
              opacity: !isHovered ? config.bar.primaryOpacity : 0,
            }}
          />
          <rect
            x={80}
            y={100}
            width={isHovered ? 20 : 80}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className={config.highlight.idleClass}
            style={{
              transition: config.transition,
              transitionDelay: "0ms",
              opacity: !isHovered ? config.bar.secondaryOpacity : 0,
            }}
          />

          {/* Block B — dim idle, reveals accent on hover */}
          <rect
            x={isHovered ? 160 : 260}
            y={60}
            width={isHovered ? 180 : 80}
            height={isHovered ? 80 : 180}
            rx={config.blockRx}
            className={isHovered ? config.highlight.hoverClass : config.dim.class}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            style={{
              transition: config.transition,
              transitionDelay: "50ms",
              fillOpacity: isHovered ? config.highlight.hoverFillOpacity : config.dim.fillOpacity,
              strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.dim.strokeOpacity,
            }}
          />
          <rect
            x={isHovered ? 180 : 280}
            y={80}
            width={isHovered ? 140 : 40}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className={config.highlight.hoverClass}
            style={{
              transition: config.transition,
              transitionDelay: "50ms",
              opacity: isHovered ? config.bar.primaryOpacity : 0,
            }}
          />
          <rect
            x={isHovered ? 180 : 280}
            y={100}
            width={isHovered ? 80 : 20}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className={config.highlight.hoverClass}
            style={{
              transition: config.transition,
              transitionDelay: "50ms",
              opacity: isHovered ? config.bar.secondaryOpacity : 0,
            }}
          />

          {/* Block C */}
          <rect
            x={isHovered ? 160 : 60}
            y={160}
            width={80}
            height={80}
            rx={config.blockRx}
            className={config.dim.class}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            style={{
              transition: config.transition,
              transitionDelay: "100ms",
              fillOpacity: config.dim.fillOpacity,
              strokeOpacity: config.dim.strokeOpacity,
            }}
          />

          {/* Block D */}
          <rect
            x={isHovered ? 260 : 160}
            y={160}
            width={80}
            height={80}
            rx={config.blockRx}
            className={config.dim.class}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            style={{
              transition: config.transition,
              transitionDelay: "150ms",
              fillOpacity: config.dim.fillOpacity,
              strokeOpacity: config.dim.strokeOpacity,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
