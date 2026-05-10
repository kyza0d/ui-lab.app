"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

const RowContent = ({ state }: { state: "idle" | "active" | "dim" }) => {
  const isActive = state === "active";
  const isDim = state === "dim";

  const transition = config.transition;

  return (
    <g style={{ transition }}>
      <rect
        x={78} y={8} width={40} height={40} rx={10}
        className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.mediaActiveOpacity : (isDim ? config.skeleton.mediaDimOpacity : config.skeleton.mediaIdleOpacity),
          transition
        }}
      />
      <rect
        x={134} y={16} width={isActive ? 144 : 108} height={8} rx={4}
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.labelActiveOpacity : (isDim ? config.skeleton.textLine1DimOpacity : config.skeleton.textLine1IdleOpacity),
          transition
        }}
      />
      <rect
        x={134} y={30} width={isActive ? 96 : 72} height={6} rx={3}
        className={isActive ? config.activeContent.subtextClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.subtextActiveOpacity : (isDim ? config.skeleton.textLine2DimOpacity : config.skeleton.textLine2IdleOpacity),
          transition
        }}
      />
    </g>
  );
};

const ActiveHighlight = ({ y, isHovered }: { y: number; isHovered: boolean }) => {
  return (
    <g style={{ transform: `translateY(${y}px)`, transition: config.transition }}>
      {/* Background Highlight Fill */}
      <rect
        x={70} y={0} width={260} height={56} rx={config.blockRx}
        className={config.highlight.hoverClass}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{
          transition: config.transition,
          fillOpacity: isHovered ? 0.05 : 0,
          strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : 0,
        }}
      />
      {/* Accent Outline (Dashed) */}
      <rect
        x={60} y={-10} width={280} height={76}
        rx={config.blockRx + 5}
        fill="none"
        stroke="currentColor"
        className={config.accentOutline.colorClass}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        style={{
          opacity: isHovered ? config.accentOutline.hoverOpacity : 0,
          transition: config.transition,
        }}
      />
    </g>
  );
};

const Row = ({ state, y, isHovered, opacity }: { state: "idle" | "active" | "dim"; y: number, isHovered: boolean, opacity?: number }) => {
  const getOpacity = () => {
    if (opacity !== undefined) return opacity;
    if (state === "dim") return 0.5;
    if (!isHovered && state === "idle") return 0.8;
    return 1;
  };

  return (
    <g style={{ transform: `translateY(${y}px)`, opacity: getOpacity(), transition: config.transition }}>
      {/* Background Surface (Consolidated) */}
      <rect
        x={70} y={0} width={260} height={56} rx={config.blockRx}
        className="text-transparent"
        fill="currentColor"
        style={{ transition: config.transition }}
      />
      <RowContent state={state} />
    </g>
  );
};

export function ListAnimation() {
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

  const startY = 50;
  const rowHeight = 56;
  const gap = 20;
  const step = rowHeight + gap;

  const activeRowY = isHovered ? startY + step : startY + step * 2;
  const guidelineY = activeRowY + rowHeight / 2;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="list-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="list-grid-mask">
              <rect width="400" height="300" fill="url(#list-grid-fade)" />
            </mask>
          </defs>

          <Row
            state="idle"
            isHovered={isHovered}
            y={isHovered ? startY - step : startY}
            opacity={isHovered ? 0 : 1}
          />

          <Row
            state={isHovered ? "dim" : "idle"}
            isHovered={isHovered}
            y={isHovered ? startY : startY + step}
          />

          <Row
            state={isHovered ? "active" : "idle"}
            isHovered={isHovered}
            y={activeRowY}
          />

          <Row
            state={isHovered ? "dim" : "idle"}
            isHovered={isHovered}
            y={isHovered ? startY + step * 2 : startY + step * 3}
            opacity={isHovered ? 1 : 0}
          />

          <ActiveHighlight y={activeRowY} isHovered={isHovered} />
        </svg>
      </div>
    </div>
  );
}
