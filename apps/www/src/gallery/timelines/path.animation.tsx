"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import config from "./config.json";

export function PathAnimation() {
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

  const centerY = 150;
  const itemH = 26;
  const itemY = centerY - itemH / 2;
  const itemRx = config.barRx;

  const chevW = 8;
  const gap = 14;

  const item1W = 68;
  const item2W = 80;
  const item3W = 72;

  // Anchor all positions from the 3-item centered start
  const twoItemW = item1W + gap + chevW + gap + item2W;
  const threeItemW = twoItemW + gap + chevW + gap + item3W;
  const hoverStartX = (400 - threeItemW) / 2;
  const idleStartX = (400 - twoItemW) / 2;
  const shiftX = idleStartX - hoverStartX; // how much the 2-item group shifts left on hover

  const item1X = hoverStartX;
  const chev1X = item1X + item1W + gap;
  const item2X = chev1X + chevW + gap;
  const chev2X = item2X + item2W + gap;
  const item3X = chev2X + chevW + gap;

  return (
    <div
      ref={containerRef}
      className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans"
    >
      <div className="relative w-full max-w-[400px]">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto relative z-10"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="path-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="path-grid-mask">
              <rect width="400" height="300" fill="url(#path-fade)" />
            </mask>
          </defs>

          {/* Item 1 + Chevron + Item 2 — shift left on hover to make room */}
          <g
            style={{
              transform: `translateX(${isHovered ? 0 : shiftX}px)`,
              transition: `transform 0.45s cubic-bezier(0.2, 1, 0.4, 1)`,
            }}
          >
            {/* Item 1 */}
            <rect
              x={item1X}
              y={itemY}
              width={item1W}
              height={itemH}
              rx={itemRx}
              className="text-background-950"
              fill="currentColor"
            />
            <rect
              x={item1X}
              y={itemY}
              width={item1W}
              height={itemH}
              rx={itemRx}
              className={config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                fillOpacity: config.highlight.idleFillOpacity,
                strokeOpacity: config.highlight.idleStrokeOpacity,
              }}
            />
            <rect
              x={item1X + 8}
              y={centerY - 3}
              width={item1W - 16}
              height={6}
              rx={config.barRx}
              fill="currentColor"
              className={config.highlight.idleClass}
              style={{ opacity: 0.5 }}
            />

            {/* Chevron 1 */}
            <g transform={`translate(${chev1X - 7}, ${centerY - 11})`}>
              <ChevronRight
                width={22}
                height={22}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={config.highlight.idleClass}
                style={{ opacity: 0.3 }}
              />
            </g>

            {/* Item 2 */}
            <rect
              x={item2X}
              y={itemY}
              width={item2W}
              height={itemH}
              rx={itemRx}
              className="text-background-950"
              fill="currentColor"
            />
            <rect
              x={item2X}
              y={itemY}
              width={item2W}
              height={itemH}
              rx={itemRx}
              className={config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                fillOpacity: config.highlight.idleFillOpacity,
                strokeOpacity: config.highlight.idleStrokeOpacity,
              }}
            />
            <rect
              x={item2X + 8}
              y={centerY - 3}
              width={item2W - 16}
              height={6}
              rx={config.barRx}
              fill="currentColor"
              className={config.highlight.idleClass}
              style={{ opacity: 0.5 }}
            />
          </g>

          {/* Chevron 2 + Item 3 (isCurrent) — slide in from right on hover */}
          <g
            style={{
              transform: `translateX(${isHovered ? 0 : 20}px)`,
              opacity: isHovered ? 1 : 0,
              transition: `transform 0.45s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.35s ease`,
            }}
          >
            <g transform={`translate(${chev2X - 8}, ${centerY - 11})`}>
              <ChevronRight
                width={22}
                height={22}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={config.highlight.hoverClass}
                style={{ opacity: 0.4 }}
              />
            </g>

            <rect
              x={item3X - 8}
              y={itemY - 8}
              width={item3W + 16}
              height={itemH + 16}
              rx={itemRx + 4}
              fill="none"
              stroke="currentColor"
              className={config.accentOutline.colorClass}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{ opacity: 0.4 }}
            />

            <rect
              x={item3X}
              y={itemY}
              width={item3W}
              height={itemH}
              rx={itemRx}
              className="text-background-950"
              fill="currentColor"
            />
            <rect
              x={item3X}
              y={itemY}
              width={item3W}
              height={itemH}
              rx={itemRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                fillOpacity: config.highlight.hoverFillOpacity,
                strokeOpacity: config.highlight.hoverStrokeOpacity,
              }}
            />
            <rect
              x={item3X + 8}
              y={centerY - 3}
              width={item3W - 16}
              height={6}
              rx={config.barRx}
              fill="currentColor"
              className={config.highlight.hoverClass}
              style={{ opacity: config.bar.primaryOpacity }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
