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

export function GroupAnimation() {
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

  // Layout constants
  const centerLine = 200;
  const groupY = 130;
  const itemWidth = 100;
  const middleWidth = 100;
  const itemHeight = 40;
  const gap = isHovered ? 0 : 12;

  // Calculate centered start position
  const totalWidth = isHovered ? (itemWidth * 2 + middleWidth) : (itemWidth * 2 + middleWidth + gap * 2);
  const startX = centerLine - totalWidth / 2;

  // X positions
  const leftX = startX;
  const middleX = leftX + itemWidth + gap;
  const rightX = middleX + middleWidth + gap;

  const rx = config.blockRx;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="group-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="group-grid-mask">
              <rect width="400" height="300" fill="url(#group-grid-fade)" />
            </mask>
          </defs>

          {/* Group Items */}
          <g style={{ transition: config.transition }}>

            {/* Left Item (Button) */}
            <path
              d={getRoundedRectPath(leftX, groupY, itemWidth, itemHeight, {
                tl: rx,
                tr: isHovered ? 0 : rx,
                bl: rx,
                br: isHovered ? 0 : rx
              })}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <path
              d={getRoundedRectPath(leftX, groupY, itemWidth, itemHeight, {
                tl: rx,
                tr: isHovered ? 0 : rx,
                bl: rx,
                br: isHovered ? 0 : rx
              })}
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
            <rect
              x={leftX + 20}
              y={groupY + 16}
              width={60}
              height={8}
              rx={config.barRx}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{
                transition: config.transition,
                opacity: config.bar.secondaryOpacity,
              }}
            />

            {/* Middle Item (Input) */}
            <path
              d={getRoundedRectPath(middleX, groupY, middleWidth, itemHeight, {
                tl: isHovered ? 0 : rx,
                tr: isHovered ? 0 : rx,
                bl: isHovered ? 0 : rx,
                br: isHovered ? 0 : rx
              })}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <path
              d={getRoundedRectPath(middleX, groupY, middleWidth, itemHeight, {
                tl: isHovered ? 0 : rx,
                tr: isHovered ? 0 : rx,
                bl: isHovered ? 0 : rx,
                br: isHovered ? 0 : rx
              })}
              className={config.dim.class}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: isHovered ? 0.05 : config.highlight.idleFillOpacity,
                strokeOpacity: config.dim.strokeOpacity,
              }}
            />
            <rect
              x={middleX + 15}
              y={groupY + 16}
              width={70}
              height={8}
              rx={config.barRx}
              fill="currentColor"
              className={config.guidelines.colorClass}
              style={{
                transition: config.transition,
                opacity: 0.2,
              }}
            />
            <line
              x1={middleX + 15}
              y1={groupY + 12}
              x2={middleX + 15}
              y2={groupY + 28}
              stroke="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.guidelines.colorClass}
              style={{
                transition: config.transition,
                opacity: isHovered ? 1 : 0.3
              }}
            />

            {/* Right Item (Select) */}
            <path
              d={getRoundedRectPath(rightX, groupY, itemWidth, itemHeight, {
                tl: isHovered ? 0 : rx,
                tr: rx,
                bl: isHovered ? 0 : rx,
                br: rx
              })}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: config.transition }}
            />
            <path
              d={getRoundedRectPath(rightX, groupY, itemWidth, itemHeight, {
                tl: isHovered ? 0 : rx,
                tr: rx,
                bl: isHovered ? 0 : rx,
                br: rx
              })}
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
            <path
              d={`M ${rightX + itemWidth - 25} ${groupY + 16} L ${rightX + itemWidth - 20} ${groupY + 21} L ${rightX + itemWidth - 15} ${groupY + 16}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{
                transition: config.transition,
                opacity: isHovered ? 0.8 : 0.4,
              }}
            />
            <rect
              x={rightX + 15}
              y={groupY + 16}
              width={45}
              height={8}
              rx={config.barRx}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{
                transition: config.transition,
                opacity: config.bar.secondaryOpacity,
              }}
            />
          </g>

          {/* Grouping Highlight Ring */}
          <rect
            x={centerLine - (isHovered ? (totalWidth + 20) : (totalWidth - 20)) / 2}
            y={groupY - 10}
            width={isHovered ? totalWidth + 20 : totalWidth - 20}
            height={itemHeight + 20}
            rx={rx + 5}
            fill="none"
            stroke="currentColor"
            className={config.accentOutline.colorClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.4 : 0,
              transition: config.transition,
              transformOrigin: "center",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
