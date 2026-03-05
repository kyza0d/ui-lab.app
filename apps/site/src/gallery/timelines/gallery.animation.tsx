"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

// Helper function to create a path for a rectangle with individual corner radii
const createRoundedRectPath = (
  x: number,
  y: number,
  width: number,
  height: number,
  r: { tl: number; tr: number; br: number; bl: number }
) => {
  return `M${x + r.tl},${y}
          h${width - r.tl - r.tr}
          a${r.tr},${r.tr} 0 0 1 ${r.tr},${r.tr}
          v${height - r.tr - r.br}
          a${r.br},${r.br} 0 0 1 -${r.br},${r.br}
          h-${width - r.br - r.bl}
          a${r.bl},${r.bl} 0 0 1 -${r.bl},-${r.bl}
          v-${height - r.bl - r.tl}
          a${r.tl},${r.tl} 0 0 1 ${r.tl},-${r.tl}
          Z`;
};

const GallerySkeleton = ({ width, height, state }: { width: number, height: number, state: "idle" | "active" | "dim" }) => {
  const isActive = state === "active";
  const isDim = state === "dim";
  const colorClass = isActive ? config.highlight.hoverClass : config.highlight.idleClass;

  return (
    <>
      {/* Media Placeholder */}
      <path
        d={createRoundedRectPath(0, 0, width, height - 35, { tl: 6, tr: 6, br: 0, bl: 0 })}
        className={colorClass}
        fill="currentColor"
        style={{ opacity: isDim ? config.skeleton.mediaDimOpacity : (isActive ? config.activeContent.mediaActiveOpacity : config.skeleton.mediaIdleOpacity), transition: config.transition }}
      />
      {/* Bottom Border for Media Placeholder */}
      <line
        x1={0} y1={height - 35} x2={width} y2={height - 35}
        className={isActive ? config.highlight.hoverClass : config.dim.strokeClass}
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{ opacity: isDim ? config.dim.strokeOpacity : (isActive ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity) }}
      />
      {/* Text line */}
      <rect
        x={5} y={height - 27} width={34} height={6} rx={3}
        className={colorClass}
        fill="currentColor"
        style={{ opacity: isDim ? config.skeleton.textLine1DimOpacity : (isActive ? config.activeContent.labelActiveOpacity : config.skeleton.textLine1IdleOpacity), transition: config.transition }}
      />
      <rect
        x={5} y={height - 16} width={48} height={4} rx={3}
        className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
        fill="currentColor"
        style={{
          opacity: isDim ? config.bar.secondaryOpacity : (isActive ? config.bar.secondaryOpacity : config.skeleton.textLine2IdleOpacity),
          transition: config.transition,
        }}
      />
    </>
  );
};

const GalleryActiveContent = ({ width, height, state }: { width: number, height: number, state: "idle" | "active" | "dim" }) => {
  const isActive = state === "active";
  const colorClass = isActive ? config.highlight.hoverClass : config.highlight.idleClass;

  return (
    <>
      {/* Media Slot */}
      <path
        d={createRoundedRectPath(0, 0, 90, height, { tl: 6, tr: 0, br: 0, bl: 6 })}
        className={colorClass}
        fill="currentColor"
        style={{ opacity: isActive ? config.activeContent.mediaActiveOpacity : config.activeContent.mediaIdleOpacity, transition: config.transition }}
      />
      {/* Right Border for Media Slot */}
      <line
        x1={90} y1={0} x2={90} y2={height}
        className={colorClass}
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{ opacity: isActive ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity, transition: config.transition }}
      />
      {/* Label and Subtext Lines */}
      <rect
        x={100} y={16} width={width - 126} height={8} rx={4}
        className={colorClass}
        fill="currentColor"
        style={{ opacity: isActive ? config.activeContent.labelActiveOpacity : config.activeContent.labelIdleOpacity, transition: config.transition }}
      />
      <rect
        x={100} y={30} width={width - 150} height={4} rx={3}
        className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
        fill="currentColor"
        style={{
          opacity: isActive ? config.bar.secondaryOpacity : 0,
          transition: config.transition,
        }}
      />
    </>
  );
};

const Item = ({ width, height, state, isLarge }: { width: number, height: number, state: "idle" | "active" | "dim", isLarge?: boolean }) => {
  const isActive = state === "active";
  const isDim = state === "dim";

  const bgClass = isActive ? config.highlight.hoverClass : config.highlight.idleClass;
  const fillOpacity = isActive ? config.highlight.hoverFillOpacity : (isDim ? config.dim.fillOpacity : config.highlight.idleFillOpacity);
  const strokeOpacity = isActive ? config.highlight.hoverStrokeOpacity : (isDim ? config.dim.strokeOpacity : config.highlight.idleStrokeOpacity);

  return (
    <g>
      <rect
        width={width} height={height} rx={config.blockRx}
        className="text-background-950"
        fill="currentColor"
      />
      <rect
        width={width} height={height} rx={config.blockRx}
        className={bgClass}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{
          transition: config.transition,
          fillOpacity,
          strokeOpacity
        }}
      />
      {
        isLarge ?
          <GalleryActiveContent width={width} height={height} state={state} /> :
          <GallerySkeleton width={width} height={height} state={state} />
      }
    </g>
  );
};

const Row = ({
  type,
  state,
  y,
  isHovered,
  opacity
}: {
  type: "featured" | "grid";
  state: "idle" | "active" | "dim";
  y: number;
  isHovered: boolean;
  opacity?: number;
}) => {
  const isDim = state === "dim";
  const isIdle = !isHovered && state === "idle";

  const getOpacity = () => {
    if (opacity !== undefined) return opacity;
    if (isDim) return 0.5;
    if (isIdle) return 0.8;
    return 1;
  };

  const startX = 60;
  const gap = 20;
  const itemWidth = 80;
  const itemHeight = 80;

  return (
    <g style={{ transform: `translateY(${y}px)`, opacity: getOpacity(), transition: config.transition }}>
      {type === "featured" ? (
        <>
          <g transform={`translate(${startX}, 0)`}>
            <Item width={180} height={itemHeight} state={state} isLarge={true} />
          </g>
          <g transform={`translate(${startX + 180 + gap}, 0)`}>
            <Item width={itemWidth} height={itemHeight} state={isDim ? "dim" : "idle"} />
          </g>
        </>
      ) : (
        [0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${startX + i * (itemWidth + gap)}, 0)`}>
            <Item
              width={itemWidth}
              height={itemHeight}
              state={state === "active" ? "active" : state}
            />
          </g>
        ))
      )}
    </g>
  );
};

export function GalleryAnimation() {
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

  const startY = 60;
  const itemHeight = 80;
  const gap = 20;
  const step = itemHeight + gap;

  const row0Y = isHovered ? startY - step : startY;
  const row1Y = isHovered ? startY : startY + step;
  const row2Y = isHovered ? startY + step : startY + step * 2;

  const vLines = [140, 160, 240, 260];
  const hLines = [140, 160];

  const activeRowY = row1Y;

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
          </defs>

          {/* Background Guidelines */}
          <g
            className={config.guidelines.colorClass}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? config.guidelines.hoverOpacity : config.guidelines.idleOpacity,
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

          <g>
            {/* Row 0: Featured Row (Initial view, scrolls out) */}
            <Row
              type="featured"
              state="idle"
              y={row0Y}
              isHovered={isHovered}
              opacity={isHovered ? 0 : 1}
            />

            {/* Row 1: Grid Row (Moves to top on hover) */}
            <Row
              type="grid"
              state={isHovered ? "active" : "idle"}
              y={row1Y}
              isHovered={isHovered}
            />

            {/* Row 2: Grid Row (Enters and becomes active on hover) */}
            <Row
              type="grid"
              state={isHovered ? "idle" : "dim"}
              y={row2Y}
              isHovered={isHovered}
              opacity={isHovered ? 1 : 0}
            />
          </g>

          {/* Accent Outline for Active Row (only on hover) */}
          <rect
            x={60 - 10}
            y={activeRowY - 10}
            width={280 + 20}
            height={itemHeight + 20}
            rx={config.blockRx + 5}
            fill="none"
            stroke="currentColor"
            className={config.accentOutline.colorClass}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? config.accentOutline.hoverOpacity : config.accentOutline.idleOpacity,
              transition: config.transition,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
