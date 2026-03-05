"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

const RowHeaderContent = ({ state, isExpanded, transitionOverride }: { state: "idle" | "active" | "dim", isExpanded?: boolean, transitionOverride?: string }) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  const transition = config.transition;
  const R = 320;

  return (
    <g style={{ transition }}>
      {/* Icon/Media Box */}
      <rect
        x={78} y={8} width={40} height={40} rx={10}
        className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.mediaActiveOpacity : (isDim ? config.skeleton.mediaDimOpacity : config.skeleton.mediaIdleOpacity),
          transition
        }}
      />
      {/* Primary Label */}
      <rect
        x={134} y={16} width={isActive ? 144 : 108} height={8} rx={4}
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.labelActiveOpacity : (isDim ? config.skeleton.textLine1DimOpacity : config.skeleton.textLine1IdleOpacity),
          transition
        }}
      />
      {/* Secondary Subtext */}
      <rect
        x={134} y={30} width={isActive ? 96 : 72} height={6} rx={3}
        className={isActive ? config.activeContent.subtextClass : config.dim.class}
        fill="currentColor"
        style={{
          opacity: isActive ? config.activeContent.subtextActiveOpacity : (isDim ? config.skeleton.textLine2DimOpacity : config.skeleton.textLine2IdleOpacity),
          transition
        }}
      />
      {/* Chevron Trigger */}
      <g style={{
        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
        transformOrigin: `${R - 15}px 28px`,
        transition: transitionOverride || "transform 0.45s cubic-bezier(0.25, 0, 0.25, 1)",
      }}>
        <polyline
          points={`${R - 20},25 ${R - 15},31 ${R - 10},25`}
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className={isActive ? config.highlight.hoverClass : config.guidelines.colorClass}
          style={{ opacity: isActive ? 0.8 : 0.35 }}
        />
      </g>
    </g>
  );
};

const ExpandedContent = ({ isVisible, transition }: { isVisible: boolean, transition?: string }) => {
  const L = 80;
  return (
    <g style={{ opacity: isVisible ? 1 : 0, transition: transition || config.transition }}>
      <rect x={L} y={71} width={180} height={6} rx={3} className="text-foreground-300" fill="currentColor" style={{ opacity: 0.15 }} />
      <rect x={L} y={85} width={150} height={6} rx={3} className="text-foreground-300" fill="currentColor" style={{ opacity: 0.15 }} />
      <rect x={L} y={99} width={120} height={6} rx={3} className="text-foreground-300" fill="currentColor" style={{ opacity: 0.15 }} />
    </g>
  );
};

const Row = ({ state, y, isHovered, isExpanded, opacity, transitionOverride }: { state: "idle" | "active" | "dim"; y: number, isHovered: boolean, isExpanded?: boolean, opacity?: number, transitionOverride?: string }) => {
  const getOpacity = () => {
    if (opacity !== undefined) return opacity;
    if (state === "dim") return 0.5;
    if (!isHovered && state === "idle") return 0.8;
    return 1;
  };

  return (
    <g style={{ transform: `translateY(${y}px)`, opacity: getOpacity(), transition: config.transition }}>
      <rect
        x={70} y={0} width={260} height={56} rx={config.blockRx}
        className="text-transparent"
        fill="currentColor"
        style={{ transition: config.transition }}
      />
      <RowHeaderContent state={state} isExpanded={isExpanded} transitionOverride={transitionOverride} />
    </g>
  );
};

export function ExpandAnimation() {
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
  const expandHeight = 60; // Reduced height after removing buttons

  const activeRowY = isHovered ? startY : startY + step;
  const guidelineY = activeRowY + rowHeight / 2;
  const staggeredTransition = isHovered ? `${config.transition} 0.2s` : config.transition;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="expand-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="expand-grid-mask">
              <rect width="400" height="300" fill="url(#expand-grid-fade)" />
            </mask>
            <clipPath id="expand-content-clip">
              <rect
                x={0}
                y={56}
                width={400}
                style={{
                  height: isHovered ? expandHeight : 0,
                  transition: staggeredTransition,
                }}
              />
            </clipPath>
          </defs>

          {/* Guidelines */}
          <g
            mask="url(#expand-grid-mask)"
            className="text-foreground-300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.30 : 0.15,
              strokeDashoffset: isHovered ? 12 : 0,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            <line x1="200" y1="0" x2="200" y2="300" />
            <line x1="0" y1={guidelineY} x2="400" y2={guidelineY} style={{ transition: config.transition }} />
          </g>

          {/* Background Rows & Content Stack */}

          {/* Row 0 - Shifts up/out on hover */}
          <Row
            state="idle"
            isHovered={isHovered}
            y={isHovered ? startY - step : startY}
            opacity={isHovered ? 0 : 1}
          />

          {/* Row 1: HERO (Expandable) - Shifts up to Focal Point (Position 0) */}
          <g style={{ transform: `translateY(${activeRowY}px)`, transition: config.transition }}>
            <Row
              state={isHovered ? "active" : "idle"}
              isHovered={isHovered}
              isExpanded={isHovered}
              y={0}
              transitionOverride={staggeredTransition}
            />

            {/* Expanded Content revealed via ClipPath */}
            <g clipPath="url(#expand-content-clip)">
              <ExpandedContent isVisible={isHovered} transition={staggeredTransition} />
            </g>
          </g>

          {/* Row 2 - Revealed at bottom on hover, pushed down by expansion */}
          <Row
            state={isHovered ? "dim" : "idle"}
            isHovered={isHovered}
            y={isHovered ? activeRowY + rowHeight + expandHeight + gap : startY + step * 2}
            opacity={isHovered ? 1 : 0}
          />

          {/* Active Highlight & Accent Outline - Follows HERO Row */}
          <g style={{ transform: `translateY(${activeRowY}px)`, transition: config.transition }}>
            {/* Highlight Background - Applies only to trigger header */}
            <rect
              x={70} y={0} width={260} height={rowHeight} rx={config.blockRx}
              className={config.highlight.hoverClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: config.transition,
                fillOpacity: isHovered ? config.highlight.hoverFillOpacity : 0,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : 0,
              }}
            />
            {/* Accent Dotted Outline - Spans full height including expansion */}
            <rect
              x={60} y={-10} width={280} height={isHovered ? rowHeight + expandHeight + 20 : rowHeight + 20}
              rx={config.blockRx + 5}
              fill="none"
              stroke="currentColor"
              className={config.accentOutline.colorClass}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{
                opacity: isHovered ? config.accentOutline.hoverOpacity : 0,
                transition: staggeredTransition,
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
