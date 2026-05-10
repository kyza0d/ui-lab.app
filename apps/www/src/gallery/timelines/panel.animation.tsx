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

export function PanelAnimation() {
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

  // Grid system matching grid.animation.tsx exactly
  const vLines = [140, 160, 240, 260];
  const hLines = [140, 160];

  const intersections: { x: number; y: number }[] = [];
  vLines.forEach((x) => {
    hLines.forEach((y) => {
      intersections.push({ x, y });
    });
  });

  // Layout Constants
  const sidebarWidth = isHovered ? 80 : 32; // Increased from 12 to 32 for better visibility
  const gap = 20;
  const bottomPanelGap = 8;
  const contentX = 60 + sidebarWidth + gap;
  const contentWidth = 280 - sidebarWidth - gap;
  const bottomPanelHeight = 44; // Slightly smaller
  const mainContentHeight = isHovered ? 180 - bottomPanelHeight - bottomPanelGap : 180;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="panel-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="panel-grid-mask">
              <rect width="400" height="300" fill="url(#panel-grid-fade)" />
            </mask>
          </defs>

          {/* Sidebar Panel */}
          <g>
            <path
              d={getRoundedRectPath(
                60 - 10,
                60 - 10,
                sidebarWidth + 20,
                180 + 20,
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
                opacity: isHovered ? config.accentOutline.hoverOpacity : config.accentOutline.idleOpacity,
                transition: config.transition,
              }}
            />
            <rect
              x={60}
              y={60}
              width={sidebarWidth}
              height={180}
              rx={config.blockRx}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <rect
              x={60}
              y={60}
              width={sidebarWidth}
              height={180}
              rx={config.blockRx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: isHovered ? 0.05 : config.highlight.idleFillOpacity,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />
            {/* Sidebar Icon Placeholder (visible when collapsed) */}
            <rect
              x={60 + (sidebarWidth / 2) - 4}
              y={80}
              width={8}
              height={8}
              rx={2}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{ transition: config.transition, opacity: isHovered ? 0 : config.bar.primaryOpacity }}
            />
            {/* Sidebar List Items (Visible only when expanded) */}
            {[0, 1, 2, 3].map((n, i) => (
              <rect
                key={`side-bar-${n}`}
                x={75}
                y={80 + n * 24}
                width={50}
                height={8}
                rx={config.barRx}
                fill="currentColor"
                className={config.highlight.hoverClass}
                style={{
                  transition: isHovered ? `opacity 0.25s ease` : `opacity 0.15s ease`,
                  opacity: isHovered ? config.bar.secondaryOpacity : 0,
                  transitionDelay: isHovered ? `${400 + i * 60}ms` : "0s",
                }}
              />
            ))}
          </g>

          {/* Main Content Area */}
          <g>
            <rect
              x={contentX}
              y={60}
              width={contentWidth}
              height={mainContentHeight}
              rx={config.blockRx}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <rect
              x={contentX}
              y={60}
              width={contentWidth}
              height={mainContentHeight}
              rx={config.blockRx}
              className={config.dim.class}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: config.dim.fillOpacity,
                strokeOpacity: config.dim.strokeOpacity,
              }}
            />
            {/* Content Details */}
            <rect
              x={contentX + 20}
              y={80}
              width={contentWidth - 40}
              height={8}
              rx={config.barRx}
              fill="currentColor"
              className={config.dim.class}
              style={{
                transition: config.transition,
                opacity: 0,
              }}
            />
          </g>

          {/* Bottom Panel */}
          <g
            style={{
              transition: config.transition,
              transitionDelay: isHovered ? "0.15s" : "0s",
              opacity: isHovered ? 1 : 0,
              transform: `translateY(${isHovered ? 0 : 15}px)`,
              pointerEvents: "none"
            }}
          >
            <rect
              x={contentX}
              y={60 + mainContentHeight + bottomPanelGap}
              width={contentWidth}
              height={bottomPanelHeight}
              rx={config.blockRx}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <rect
              x={contentX}
              y={60 + mainContentHeight + bottomPanelGap}
              width={contentWidth}
              height={bottomPanelHeight}
              rx={config.blockRx}
              className={config.dim.class}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: config.dim.fillOpacity,
                strokeOpacity: config.dim.strokeOpacity,
              }}
            />
            {/* Bottom Panel Details */}
            <rect
              x={contentX + 15}
              y={60 + mainContentHeight + gap + 18}
              width={40}
              height={8}
              rx={config.barRx}
              fill="currentColor"
              className={config.dim.class}
              style={{ transition: config.transition, opacity: 0.2 }}
            />
          </g>

        </svg>
      </div>
    </div>
  );
}
