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

          {/* Block A — featured idle, dims on hover */}
          <rect
            x={60}
            y={60}
            width={isHovered ? 80 : 180}
            height={isHovered ? 180 : 80}
            rx={config.blockRx}
            className="text-background-950"
            fill="currentColor"
            style={{
              transition: config.transition,
              transitionDelay: "0ms",
            }}
          />
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
            className="text-background-950"
            fill="currentColor"
            style={{
              transition: config.transition,
              transitionDelay: "50ms",
            }}
          />
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
              fillOpacity: isHovered ? 0.05 : config.dim.fillOpacity,
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
            className="text-background-950"
            fill="currentColor"
            style={{
              transition: config.transition,
              transitionDelay: "0ms",
            }}
          />
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
              transitionDelay: "0ms",
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
            className="text-background-950"
            fill="currentColor"
            style={{
              transition: config.transition,
              transitionDelay: "0ms",
            }}
          />
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
              transitionDelay: "0ms",
              fillOpacity: config.dim.fillOpacity,
              strokeOpacity: config.dim.strokeOpacity,
            }}
          />

          {/* Featured Item Highlight Ring */}
          <path
            d={getRoundedRectPath(
              (isHovered ? 160 : 260) - 10,
              60 - 10,
              (isHovered ? 180 : 80) + 20,
              (isHovered ? 80 : 180) + 20,
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
            }}
          />
        </svg>
      </div>
    </div>
  );
}
