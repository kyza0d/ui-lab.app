"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

export function DividerAnimation() {
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

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="50 47 300 200" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="divider-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="divider-mask">
              <rect width="400" height="300" fill="url(#divider-fade)" />
            </mask>
          </defs>

          {/* Reference boundary lines — the divider "snaps" to these on hover */}
          <g
            mask="url(#divider-mask)"
            className="text-foreground-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.18 : 0.07,
              strokeDashoffset: isHovered ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            <line x1="60" y1="0" x2="60" y2="300" />
            <line x1="340" y1="0" x2="340" y2="300" />
          </g>

          {/* Top text section */}
          <rect
            x={80}
            y={isHovered ? 82 : 100}
            width={140}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className="text-foreground-300"
            style={{ transition: config.transition, opacity: 0.40 }}
          />
          <rect
            x={80}
            y={isHovered ? 98 : 116}
            width={100}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className="text-foreground-300"
            style={{ transition: config.transition, opacity: 0.22 }}
          />

          {/* The Divider — hero element */}
          <line
            x1={isHovered ? 60 : 80}
            y1={150}
            x2={isHovered ? 340 : 320}
            y2={150}
            stroke="currentColor"
            strokeWidth={isHovered ? 2.5 : 1.5}
            strokeDasharray={isHovered ? "6 4" : "400 0"}
            strokeLinecap="round"
            className={isHovered ? config.highlight.hoverClass : "text-foreground-300"}
            style={{
              transition: "all 0.55s cubic-bezier(0.25, 0, 0.25, 1)",
              strokeDashoffset: isHovered ? 20 : 0,
              opacity: isHovered ? 1 : 0.18,
            }}
          />

          {/* End-cap dots — same transition as line so they stay attached */}
          <circle
            cx={isHovered ? 60 : 80}
            cy={150}
            r={isHovered ? 3.5 : 1.5}
            fill="currentColor"
            className={isHovered ? config.highlight.hoverClass : "text-foreground-300"}
            style={{
              transition: "all 0.55s cubic-bezier(0.25, 0, 0.25, 1)",
              opacity: isHovered ? 0.9 : 0.18,
            }}
          />
          <circle
            cx={isHovered ? 340 : 320}
            cy={150}
            r={isHovered ? 3.5 : 1.5}
            fill="currentColor"
            className={isHovered ? config.highlight.hoverClass : "text-foreground-300"}
            style={{
              transition: "all 0.55s cubic-bezier(0.25, 0, 0.25, 1)",
              opacity: isHovered ? 0.9 : 0.18,
            }}
          />

          {/* Bottom text section */}
          <rect
            x={80}
            y={isHovered ? 188 : 170}
            width={120}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className="text-foreground-300"
            style={{ transition: config.transition, opacity: 0.40 }}
          />
          <rect
            x={80}
            y={isHovered ? 204 : 186}
            width={160}
            height={8}
            rx={config.barRx}
            fill="currentColor"
            className="text-foreground-300"
            style={{ transition: config.transition, opacity: 0.22 }}
          />
        </svg>
      </div>
    </div>
  );
}
