"use client";

import { useState, useEffect, useRef } from "react";

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

  const springBase = "all 0.4s cubic-bezier(0.25, 0, 0.25, 1)";

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
      <div
        className="relative w-full"
      >
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

          <g
            mask="url(#grid-mask)"
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

          <g mask="url(#grid-mask)">
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

          {/* Block A */}
          <rect
            x={60}
            y={60}
            width={isHovered ? 80 : 180}
            height={isHovered ? 180 : 80}
            rx="16"
            className={!isHovered ? "text-accent-500" : "text-foreground-400"}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transition: springBase,
              transitionDelay: "0ms",
              fillOpacity: !isHovered ? 0.15 : 0.05,
              strokeOpacity: !isHovered ? 0.6 : 0.2,
            }}
          />
          <rect
            x={80}
            y={80}
            width={isHovered ? 40 : 140}
            height={8}
            rx="4"
            fill="currentColor"
            className="text-accent-500"
            style={{
              transition: springBase,
              transitionDelay: "0ms",
              opacity: !isHovered ? 0.5 : 0,
            }}
          />
          <rect
            x={80}
            y={100}
            width={isHovered ? 20 : 80}
            height={8}
            rx="4"
            fill="currentColor"
            className="text-accent-500"
            style={{
              transition: springBase,
              transitionDelay: "0ms",
              opacity: !isHovered ? 0.3 : 0,
            }}
          />

          {/* Block B */}
          <rect
            x={isHovered ? 160 : 260}
            y={60}
            width={isHovered ? 180 : 80}
            height={isHovered ? 80 : 180}
            rx="16"
            className={isHovered ? "text-accent-500" : "text-foreground-400"}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transition: springBase,
              transitionDelay: "50ms",
              fillOpacity: isHovered ? 0.15 : 0.05,
              strokeOpacity: isHovered ? 0.6 : 0.2,
            }}
          />
          <rect
            x={isHovered ? 180 : 280}
            y={80}
            width={isHovered ? 140 : 40}
            height={8}
            rx="4"
            fill="currentColor"
            className="text-accent-500"
            style={{
              transition: springBase,
              transitionDelay: "50ms",
              opacity: isHovered ? 0.5 : 0,
            }}
          />
          <rect
            x={isHovered ? 180 : 280}
            y={100}
            width={isHovered ? 80 : 20}
            height={8}
            rx="4"
            fill="currentColor"
            className="text-accent-500"
            style={{
              transition: springBase,
              transitionDelay: "50ms",
              opacity: isHovered ? 0.3 : 0,
            }}
          />

          {/* Block C */}
          <rect
            x={isHovered ? 160 : 60}
            y={160}
            width={80}
            height={80}
            rx="16"
            className="text-foreground-400"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transition: springBase,
              transitionDelay: "100ms",
              fillOpacity: 0.05,
              strokeOpacity: 0.2,
            }}
          />

          {/* Block D */}
          <rect
            x={isHovered ? 260 : 160}
            y={160}
            width={80}
            height={80}
            rx="16"
            className="text-foreground-400"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transition: springBase,
              transitionDelay: "150ms",
              fillOpacity: 0.05,
              strokeOpacity: 0.2,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
