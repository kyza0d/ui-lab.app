"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

const TextBlock = ({ y, opacity, isDim }: { y: number, opacity: number, isDim?: boolean }) => (
  <g style={{ transform: `translateY(${y}px)`, opacity: isDim ? opacity * 0.4 : opacity, transition: config.transition }}>
    <rect x={80} y={-12} width={140} height={8} rx={config.barRx} className={config.guidelines.colorClass} fill="currentColor" style={{ opacity: 0.40 }} />
    <rect x={80} y={4} width={100} height={8} rx={config.barRx} className={config.guidelines.colorClass} fill="currentColor" style={{ opacity: 0.22 }} />
  </g>
);

const Divider = ({ y, isHovered, isActive, opacity }: { y: number, isHovered: boolean, isActive: boolean, opacity?: number }) => {
  const highlight = isActive && isHovered;
  const baseOpacity = opacity ?? (highlight ? 1 : 0.18);

  return (
    <g style={{ transform: `translateY(${y}px)`, transition: config.transition, opacity: baseOpacity }}>
      <line
        x1={highlight ? 60 : 80}
        y1={0}
        x2={highlight ? 340 : 320}
        y2={0}
        stroke="currentColor"
        strokeWidth={highlight ? 2.5 : 1.5}
        strokeDasharray={highlight ? "6 4" : "400 0"}
        strokeLinecap="round"
        className={highlight ? config.highlight.hoverClass : config.guidelines.colorClass}
        style={{
          transition: "all 0.55s cubic-bezier(0.25, 0, 0.25, 1)",
          strokeDashoffset: highlight ? 20 : 0,
        }}
      />
      <circle
        cx={highlight ? 60 : 80}
        cy={0}
        r={highlight ? 3.5 : 1.5}
        fill="currentColor"
        className={highlight ? config.highlight.hoverClass : "text-foreground-300"}
        style={{ transition: "all 0.55s cubic-bezier(0.25, 0, 0.25, 1)" }}
      />
      <circle
        cx={highlight ? 340 : 320}
        cy={0}
        r={highlight ? 3.5 : 1.5}
        fill="currentColor"
        className={highlight ? config.highlight.hoverClass : "text-foreground-300"}
        style={{ transition: "all 0.55s cubic-bezier(0.25, 0, 0.25, 1)" }}
      />
    </g>
  );
};

export function DividerAnimation() {
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

  const baseY = 130;
  const step = 80;
  const scrollOffset = isHovered ? -step : 0;

  // Key Y positions
  const y1 = baseY + scrollOffset; // Focal point on idle (for Divider 1)
  const y2 = baseY + step + scrollOffset; // Focal point on hover (for Divider 2)

  // The guideline follows the current active focal point
  const guidelineY = isHovered ? y2 : y1;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="divider-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="divider-grid-mask">
              <rect width="400" height="300" fill="url(#divider-grid-fade)" />
            </mask>
          </defs>

          {/* Content Stack */}
          <TextBlock y={y1 - step / 2} opacity={isHovered ? 0 : 0.8} />

          <Divider y={y1} isHovered={isHovered} isActive={false} opacity={isHovered ? 0.05 : 0.18} />

          <TextBlock y={y1 + step / 2} opacity={0.6} isDim={isHovered} />

          {/* Divider 2: HERO - revealed on hover */}
          <Divider y={y2} isHovered={isHovered} isActive={true} />
          <TextBlock y={y2 + step / 2} opacity={isHovered ? 0.6 : 0} />

          {/* Accent Outline follows Divider 2 on hover */}
          <rect
            x={60 - 15}
            y={y2 - 14}
            width={280 + 30}
            height={28}
            rx={7}
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
