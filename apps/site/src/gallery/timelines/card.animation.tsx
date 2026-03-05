"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";

const CardBody = ({ state }: { state: "dim" | "idle" | "active" }) => {
  const isDim = state === "dim";
  const isActive = state === "active";

  const currentClass = isDim
    ? config.dim.class
    : isActive
      ? config.highlight.hoverClass
      : config.highlight.idleClass;

  const fillOpacity = isDim
    ? config.dim.fillOpacity
    : isActive
      ? config.highlight.hoverFillOpacity
      : config.highlight.idleFillOpacity;

  const strokeOpacity = isDim
    ? config.dim.strokeOpacity
    : isActive
      ? config.highlight.hoverStrokeOpacity
      : config.highlight.idleStrokeOpacity;

  return (
    <g>
      {/* Highlight Ring: Using opacity instead of conditional rendering enables smooth fade-outs */}
      <rect
        x={123} y={60} width={154} height={180} rx={config.blockRx + 5}
        fill="none"
        stroke="currentColor"
        className={config.accentOutline.colorClass}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        style={{
          transition: config.transition,
          opacity: isActive ? 0.4 : 0
        }}
      />

      <rect
        x={130} y={69} width={140} height={162} rx={config.blockRx}
        className="text-background-950"
        fill="currentColor"
      />
      <rect
        x={130} y={69} width={140} height={162} rx={config.blockRx}
        className={currentClass}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{
          transition: config.transition,
          fillOpacity,
          strokeOpacity,
        }}
      />

      {/* Skeletons: Always mounted so they ride the parent fade transition during discards */}
      <g style={{ transition: config.transition }}>
        {/* Card.Header */}
        <rect
          x={137} y={76} width={126} height={63} rx={8}
          className={isActive ? config.highlight.hoverClass : "text-background-500"}
          style={{
            opacity: isDim ? config.skeleton.mediaDimOpacity : (isActive ? config.activeContent.mediaActiveOpacity : 0.3),
            transition: config.transition
          }}
          fill="currentColor"
        />

        {/* Card.Body Lines */}
        <rect
          x={141} y={150} width={isActive ? 98 : 77} height={8} rx={config.barRx}
          className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
          fill="currentColor"
          style={{
            transition: config.transition,
            opacity: isDim ? 0 : config.bar.primaryOpacity
          }}
        />
        <rect
          x={141} y={164} width={isActive ? 77 : 63} height={7} rx={config.barRx}
          className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
          fill="currentColor"
          style={{
            transition: config.transition,
            opacity: isDim ? 0 : config.bar.secondaryOpacity
          }}
        />
      </g>
    </g>
  );
};

// Helper to determine the physical state based on the card's relative offset
const getPosition = (offset: number) => {
  // Deep Discard (Flies further off-screen to the right if spammed)
  if (offset <= -2) return {
    transform: "translate(134px, 86px) rotate(60deg) scale(0.88)",
    opacity: 0
  };
  // Discard Right (The immediate post-active state)
  if (offset === -1) return {
    transform: "translate(67px, 43px) rotate(30deg) scale(0.84)",
    opacity: 0
  };
  // Center (Active front card)
  if (offset === 0) return {
    transform: "translate(0px, 0px) rotate(0deg) scale(0.8)",
    opacity: 1
  };
  // Shallow Left
  if (offset === 1) return {
    transform: "translate(-22px, 14px) rotate(-15deg) scale(0.76)",
    opacity: 1
  };
  // Mid Left
  if (offset === 2) return {
    transform: "translate(-45px, 33px) rotate(-25deg) scale(0.72)",
    opacity: 0.7
  };
  // Deep Left
  if (offset === 3) return {
    transform: "translate(-67px, 54px) rotate(-35deg) scale(0.68)",
    opacity: 0
  };
  // Spawn / Pre-Deep Left (Newly mounted far off-screen to the left)
  return {
    transform: "translate(-89px, 75px) rotate(-45deg) scale(0.64)",
    opacity: 0
  };
};

export function CardAnimation() {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // If step is odd, we are currently hovered.
  const isHovered = step % 2 !== 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Fallback to el itself if .group wrapper isn't present
    const galleryItem = el.closest(".group") || el;
    if (!galleryItem) return;

    // Advance to the next odd step on enter, next even step on leave
    const handleEnter = () => setStep((s) => (s % 2 === 0 ? s + 1 : s));
    const handleLeave = () => setStep((s) => (s % 2 === 1 ? s + 1 : s));

    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const vLines = [40, 120, 200, 280, 360];
  const hLines = [75, 150, 225];
  const intersections: { x: number; y: number }[] = [];
  vLines.forEach(x => hLines.forEach(y => intersections.push({ x, y })));

  const layoutTransition = "transform 0.65s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.5s ease-out";

  return (
    <div ref={containerRef} className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans py-8">
      <div className="relative w-full max-w-xs">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="card-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="card-grid-mask">
              <rect width="400" height="300" fill="url(#card-grid-fade)" />
            </mask>
          </defs>

          {/* Grid Layer */}
          <g
            mask="url(#card-grid-mask)"
            className={config.guidelines.colorClass}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{
              opacity: isHovered ? 0.30 : 0.15,
              strokeDashoffset: step * -12,
              transition: "opacity 0.7s ease, stroke-dashoffset 0.8s linear",
            }}
          >
            {vLines.map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" />)}
            {hLines.map(y => <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />)}
          </g>

          <g mask="url(#card-grid-mask)">
            {intersections.map((pt, i) => (
              <circle
                key={`dot${i}`}
                cx={pt.x}
                cy={pt.y}
                r="1"
                fill="currentColor"
                className={config.guidelines.colorClass}
                style={{
                  transition: "opacity 0.7s ease",
                  opacity: isHovered ? 0.40 : 0.1,
                }}
              />
            ))}
          </g>

          {/* THE ARC SYSTEM: Continuous Forward Loop */}
          {Array.from({ length: 7 }, (_, i) => step - 2 + i)
            .sort((a, b) => b - a)
            .map((cardIndex) => {
              const offset = cardIndex - step;
              const pos = getPosition(offset);

              // REFINED LOGIC: Retain state when discarded
              // If a card is active (offset 0) or flying away (offset < 0), its identity is locked to its index parity.
              const cardState = offset <= 0
                ? (cardIndex % 2 !== 0 ? "active" : "idle")
                : "dim";

              return (
                <g
                  key={cardIndex}
                  style={{
                    transformOrigin: "200px 150px",
                    transition: layoutTransition,
                    opacity: pos.opacity,
                    transform: pos.transform,
                    pointerEvents: offset <= 0 ? "none" : "auto",
                  }}
                >
                  <CardBody state={cardState} />
                </g>
              );
            })}
        </svg>
      </div>
    </div>
  );
}
