"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

export function GalleryAnimation() {
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

  const vLines = [145, 155, 240, 250];
  const hLines = [150, 160];

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
            <radialGradient id="gallery-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="gallery-mask">
              <rect width="400" height="300" fill="url(#gallery-fade)" />
            </mask>
          </defs>

          {/* Guidelines */}
          <g
            mask="url(#gallery-mask)"
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

          <g mask="url(#gallery-mask)">
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

          <g>
            {/* Primary Tile */}
            <rect
              x={60}
              y={50}
              width={isHovered ? 275 : 180}
              height={isHovered ? 165 : 100}
              rx={config.blockRx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                transitionDelay: "0ms",
                fillOpacity: isHovered ? config.highlight.hoverFillOpacity : config.highlight.idleFillOpacity,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />

            {/* Gallery.View (Image Placeholder) */}
            <rect
              x={68}
              y={58}
              width={isHovered ? 259 : 84}
              height={isHovered ? 100 : 84}
              rx={config.blockRx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{
                transition: config.transition,
                fillOpacity: isHovered ? 0.25 : 0.3,
              }}
            />

            {/* Gallery.Body (Text Lines reflowing) */}
            <rect
              x={isHovered ? 68 : 162}
              y={isHovered ? 174 : 68}
              width={isHovered ? 160 : 65}
              height={8}
              rx={config.barRx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <rect
              x={isHovered ? 68 : 162}
              y={isHovered ? 192 : 86}
              width={isHovered ? 100 : 45}
              height={8}
              rx={config.barRx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{ transition: config.transition }}
            />

            {/* Tile 2 (Right Column) */}
            <rect
              x={250}
              y={isHovered ? 230 : 50}
              width={85}
              height={isHovered ? 30 : 210}
              rx={config.blockRx}
              className={config.dim.class}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                transitionDelay: "40ms",
                fillOpacity: config.dim.fillOpacity,
                strokeOpacity: isHovered ? 0.15 : config.dim.strokeOpacity,
              }}
            />

            {/* Tile 3 (Bottom Left) */}
            <rect
              x={60}
              y={isHovered ? 230 : 160}
              width={85}
              height={isHovered ? 30 : 100}
              rx={config.blockRx}
              className={config.dim.class}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                transitionDelay: "80ms",
                fillOpacity: config.dim.fillOpacity,
                strokeOpacity: isHovered ? 0.15 : config.dim.strokeOpacity,
              }}
            />

            {/* Tile 4 (Bottom Middle) */}
            <rect
              x={155}
              y={isHovered ? 230 : 160}
              width={85}
              height={isHovered ? 30 : 100}
              rx={config.blockRx}
              className={config.dim.class}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                transitionDelay: "120ms",
                fillOpacity: config.dim.fillOpacity,
                strokeOpacity: isHovered ? 0.15 : config.dim.strokeOpacity,
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
