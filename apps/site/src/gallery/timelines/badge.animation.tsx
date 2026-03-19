"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

function getRoundedRectPath(
  x: number, y: number, w: number, h: number,
  r: { tl: number, tr: number, bl: number, br: number }
) {
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

export function BadgeAnimation() {
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

  const centerX = 200;
  const centerY = 150;

  const badgeW = 120;
  const badgeH = 38;
  const badgeX = centerX - badgeW / 2;
  const badgeY = centerY - badgeH / 2;
  const badgeRx = 6;

  const iconSize = 12;
  const iconX = badgeX + 12;
  const iconY = centerY - iconSize / 2;

  const textH = 8;
  const textW = 40;
  const textX = iconX + iconSize + 8;
  const textY = centerY - textH / 2;

  const dismissSize = 10;
  const dismissX = badgeX + badgeW - 12 - dismissSize;
  const dismissY = centerY - dismissSize / 2;
  const cursorPhase = isHovered ? "hover" : "idle";
  const cursorFrames = {
    idle: {
      target: { x: 250, y: 220 },
      opacity: 0,
    },
    hover: {
      target: { x: centerX + 20, y: centerY + 20 },
      opacity: 1,
    },
  } satisfies Record<typeof cursorPhase, CursorFrame>;

  return (
    <div
      ref={containerRef}
      className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans"
    >
      <div className="relative w-full max-w-[400px]">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto relative z-10 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="badge-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="badge-grid-mask">
              <rect width="400" height="300" fill="url(#badge-grid-fade)" />
            </mask>
          </defs>

          {/* Accent Outline */}
          <rect
            x={badgeX - 10}
            y={badgeY - 10}
            width={badgeW + 20}
            height={badgeH + 20}
            rx={badgeRx + 5}
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

          {/* Badge */}
          <g style={{ transition: config.transition }}>
            <path
              d={getRoundedRectPath(badgeX, badgeY, badgeW, badgeH, {
                tl: badgeRx, tr: badgeRx, bl: badgeRx, br: badgeRx
              })}
              className="text-background-950"
              fill="currentColor"
            />
            <path
              d={getRoundedRectPath(badgeX, badgeY, badgeW, badgeH, {
                tl: badgeRx, tr: badgeRx, bl: badgeRx, br: badgeRx
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

            {/* Icon */}
            <circle
              cx={iconX + iconSize / 2}
              cy={iconY + iconSize / 2}
              r={iconSize / 2}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{
                transition: config.transition,
                opacity: isHovered ? 0.8 : 0.4,
              }}
            />

            {/* Text Line */}
            <rect
              x={textX}
              y={textY}
              width={textW}
              height={textH}
              rx={config.barRx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              style={{
                transition: config.transition,
                opacity: isHovered ? config.bar.primaryOpacity : config.bar.primaryOpacity * 0.5,
              }}
            />

            {/* Dismiss X */}
            <g style={{ transform: `translate(${dismissX}px, ${dismissY}px)` }}>
              <path
                d={`M 0 0 L ${dismissSize} ${dismissSize} M ${dismissSize} 0 L 0 ${dismissSize}`}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
                style={{
                  transition: config.transition,
                  opacity: isHovered ? 0.6 : 0.3,
                }}
              />
            </g>
          </g>

          <CursorProvider
            phase={cursorPhase}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition:
                "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
            }}
          >
            <Cursor />
          </CursorProvider>
        </svg>
      </div>
    </div>
  );
}
