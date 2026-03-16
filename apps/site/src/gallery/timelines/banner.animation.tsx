"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

export function BannerAnimation() {
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

  const transition = config.transition;
  const bannerX = 45;
  const bannerY = 119;
  const bannerW = 310;
  const bannerH = 62;
  const bannerRx = config.blockRx;

  const guidelineY = bannerY + bannerH / 2;

  // Icon sits top-left
  const iconCx = 68;
  const iconCy = 133;
  const iconR = 9;

  // Content starts right of icon
  const contentX = iconCx + iconR + 10;

  // Dismiss top-right
  const dismissX = bannerX + bannerW - 22;
  const dismissY = bannerY + 7;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="banner-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="banner-grid-mask">
              <rect width="400" height="300" fill="url(#banner-grid-fade)" />
            </mask>
            {/* ClipPath shaped to banner, used to clip the left border strip */}
            <clipPath id="banner-clip">
              <rect x={bannerX} y={bannerY} width={bannerW} height={bannerH} rx={bannerRx} />
            </clipPath>
          </defs>

          {/* Banner Background */}
          <rect
            x={bannerX} y={bannerY} width={bannerW} height={bannerH} rx={bannerRx}
            className="text-background-900"
            fill="currentColor"
            stroke={isHovered
              ? "var(--color-accent-500)" : "var(--color-background-700)"}
            strokeWidth="1"
            style={{ transition }}
          />


          {/* Icon — top-left */}
          <circle
            cx={iconCx} cy={iconCy} r={iconR}
            fill="currentColor"
            className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
            style={{ opacity: isHovered ? 0.25 : 0.15, transition }}
          />
          {/* Info "i" dot */}
          <circle
            cx={iconCx} cy={iconCy - 2.5} r={1.4}
            fill="currentColor"
            className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
            style={{ opacity: isHovered ? 0.9 : 0.4, transition }}
          />
          {/* Info "i" stem */}
          <rect
            x={iconCx - 1.5} y={iconCy + 0.5} width={3} height={5} rx={1.5}
            fill="currentColor"
            className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
            style={{ opacity: isHovered ? 0.9 : 0.4, transition }}
          />

          {/* Title text bar */}
          <rect
            x={contentX} y={bannerY + 12} width={isHovered ? 110 : 80} height={8} rx={4}
            fill="currentColor"
            className={isHovered ? config.highlight.hoverClass : config.dim.class}
            style={{
              opacity: isHovered ? config.activeContent.labelActiveOpacity : config.skeleton.textLine1IdleOpacity,
              transition,
            }}
          />

          {/* Body text line 1 */}
          <rect
            x={contentX} y={bannerY + 28} width={isHovered ? 168 : 124} height={6} rx={3}
            fill="currentColor"
            className="text-foreground-300"
            style={{ opacity: isHovered ? 0.22 : 0.15, transition }}
          />

          {/* Body text line 2 */}
          <rect
            x={contentX} y={bannerY + 40} width={isHovered ? 118 : 86} height={6} rx={3}
            fill="currentColor"
            className="text-foreground-300"
            style={{ opacity: isHovered ? 0.15 : 0.10, transition }}
          />

          {/* Dismiss button — top-right, fades in on hover */}
          <g style={{ opacity: isHovered ? 1 : 0, transition }}>
            <rect
              x={dismissX} y={dismissY} width={14} height={14} rx={3}
              fill="currentColor"
              className="text-background-800"
              style={{ opacity: 0.9 }}
            />
            <line
              x1={dismissX + 4} y1={dismissY + 4} x2={dismissX + 10} y2={dismissY + 10}
              stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
              className="text-foreground-400"
              style={{ opacity: 0.55 }}
            />
            <line
              x1={dismissX + 10} y1={dismissY + 4} x2={dismissX + 4} y2={dismissY + 10}
              stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
              className="text-foreground-400"
              style={{ opacity: 0.55 }}
            />
          </g>

          {/* Accent Outline */}
          <rect
            x={bannerX - 10} y={bannerY - 10} width={bannerW + 20} height={bannerH + 20}
            rx={bannerRx + 5}
            fill="none"
            stroke="currentColor"
            className={config.accentOutline.colorClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? config.accentOutline.hoverOpacity : 0,
              transition,
            }}
          />

          {/* Highlight fill overlay */}
          <rect
            x={bannerX} y={bannerY} width={bannerW} height={bannerH} rx={bannerRx}
            fill="currentColor"
            className={config.highlight.hoverClass}
            style={{
              fillOpacity: isHovered ? 0.04 : 0,
              transition,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
