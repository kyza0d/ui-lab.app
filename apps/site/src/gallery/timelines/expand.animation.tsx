"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

export function ExpandAnimation() {
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

  const L = 80;
  const R = 320;
  const contentTop = 136;
  const expandHeight = 62;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="50 85 300 150" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">

          <defs>
            <clipPath id="expand-content-clip">
              <rect
                x={L}
                y={contentTop}
                width={R - L}
                style={{
                  height: isHovered ? expandHeight : 0,
                  transition: config.transition,
                }}
              />
            </clipPath>
          </defs>

          <g style={{ transform: `translateY(${isHovered ? -16 : 15}px)`, transition: config.transition }}>
          {/* ── ROW A (expands on hover) ─────────────────────────── */}
          <rect
            x={L} y={116} width={120} height={8} rx={config.barRx}
            fill="currentColor" className="text-foreground-300"
            style={{ transition: config.transition, opacity: 0.35 }}
          />

          {/* Rotating chevron */}
          <g style={{
            transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
            transformOrigin: `${R - 10}px 120px`,
            transition: "transform 0.45s cubic-bezier(0.25, 0, 0.25, 1)",
          }}>
            <polyline
              points={`${R - 15},117 ${R - 10},123 ${R - 5},117`}
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-foreground-300"
              style={{ opacity: 0.35 }}
            />
          </g>

          {/* Top divider — above revealed content */}
          <line
            x1={L} y1={contentTop}
            x2={R} y2={contentTop}
            stroke="currentColor" strokeWidth="1"
            className="text-foreground-300"
            style={{ transition: config.transition, opacity: 0.10 }}
          />

          {/* Content lines — revealed by clip growing downward */}
          <g clipPath="url(#expand-content-clip)">
            <rect
              x={L + 10} y={153} width={100} height={7} rx={config.barRx}
              fill="currentColor" className={config.highlight.hoverClass}
              style={{ opacity: 0.55 }}
            />
            <rect
              x={L + 10} y={167} width={140} height={7} rx={config.barRx}
              fill="currentColor" className={config.highlight.hoverClass}
              style={{ opacity: 0.35 }}
            />
            <rect
              x={L + 10} y={181} width={80} height={7} rx={config.barRx}
              fill="currentColor" className={config.highlight.hoverClass}
              style={{ opacity: 0.35 }}
            />
          </g>

          {/* ── ROW B (shifts down as a unit) ───────────────────── */}
          <g style={{
            transform: `translateY(${isHovered ? expandHeight : 0}px)`,
            transition: config.transition,
          }}>
            <rect
              x={L} y={153} width={100} height={8} rx={config.barRx}
              fill="currentColor" className="text-foreground-300"
              style={{ opacity: 0.18 }}
            />
            <polyline
              points={`${R - 15},154 ${R - 10},160 ${R - 5},154`}
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-foreground-300"
              style={{ opacity: 0.18 }}
            />
            <line
              x1={L} y1={174} x2={R} y2={174}
              stroke="currentColor" strokeWidth="1"
              className="text-foreground-300"
              style={{ opacity: 0.08 }}
            />
          </g>
          </g>

        </svg>
      </div>
    </div>
  );
}
