"use client";
import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

export function ButtonAnimation() {
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

  const mainButtonWidth = 100;
  const mainButtonInitialX = 150;
  const squareSize = 40;
  const gap = 20;

  const totalSquaresVisibleWidth = squareSize * 2 + gap;
  const mainButtonShift = totalSquaresVisibleWidth / 2;

  const main = {
    idle: { x: mainButtonInitialX, y: 130, w: mainButtonWidth, h: 40, rx: config.barRx + 2 },
    hover: { x: mainButtonInitialX - mainButtonShift, y: 130, w: mainButtonWidth, h: 40, rx: config.barRx + 2 },
  };

  const button = isHovered ? main.hover : main.idle;
  const sq1XHover = main.hover.x + mainButtonWidth + gap;
  const sq2XHover = sq1XHover + squareSize + gap;

  const sq1 = {
    x: isHovered ? sq1XHover : (mainButtonInitialX + mainButtonWidth + gap),
    y: button.y + (button.h - squareSize) / 2,
    w: squareSize,
    h: squareSize,
    rx: config.barRx,
  };

  const sq2 = {
    x: isHovered ? sq2XHover : (mainButtonInitialX + mainButtonWidth + gap + squareSize + gap),
    y: sq1.y,
    w: squareSize,
    h: squareSize,
    rx: config.barRx,
  };

  const squareButtonAnimation = {
    idle: { opacity: 0 },
    hover: { opacity: 1 },
  };

  const cursorPhase = isHovered ? "hover" : "idle";
  const cursorFrames = {
    idle: {
      target: { x: 240, y: 180 },
      opacity: 0,
      rotate: 15,
      scale: 1.2,
    },
    hover: {
      target: { x: button.x + button.w / 2 - 8, y: button.y + 8 },
      opacity: 1,
      rotate: -15,
      scale: 1.2,
    },
  } satisfies Record<typeof cursorPhase, CursorFrame>;

  const press = {
    idle: { transform: "translateY(0px)" },
    hover: { transform: "translateY(0px)" },
  };

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
            <radialGradient id="group-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="group-grid-mask">
              <rect width="400" height="300" fill="url(#group-grid-fade)" />
            </mask>
          </defs>

          <g
            style={{
              ...(isHovered ? press.hover : press.idle),
              transition: `transform 0.4s cubic-bezier(0.2, 1, 0.4, 1)`,
            }}
          >
            <rect
              x={button.x - (isHovered ? 10 : -10)} // Adjust x to center the expanding rect
              y={button.y - 10}
              width={isHovered ? button.w + 20 : button.w - 20}
              height={button.h + 20}
              rx={button.rx + 5}
              fill="none"
              stroke="currentColor"
              className={config.accentOutline.colorClass}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              style={{
                opacity: isHovered ? 0.4 : 0,
                transition: config.transition,
                transformOrigin: "center",
              }}
            />
            {/* Base layer */}
            <rect
              x={button.x}
              y={button.y}
              width={button.w}
              height={button.h}
              rx={button.rx}
              className="text-background-950"
              fill="currentColor"
              style={{ transition: `${config.transition}, x ${config.transition.split(" ")[1]}, width \${config.transition.split(" ")[1]}` }}
            />
            {/* Surface layer – animates width & x */}
            <rect
              x={button.x}
              y={button.y}
              width={button.w}
              height={button.h}
              rx={button.rx}
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={config.strokeWidth}
              style={{
                transition: `${config.transition}, x ${config.transition.split(" ")[1]}, width ${config.transition.split(" ")[1]}`,
                fillOpacity: isHovered ? 0.05 : config.highlight.idleFillOpacity,
                strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              }}
            />

            {/* Skeleton Icon (Dot) */}
            <rect
              x={button.x + 12}
              y={button.y + 14}
              width={12}
              height={12}
              rx={config.barRx}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{
                transition: `${config.transition}, x ${config.transition.split(" ")[1]}`,
                opacity: isHovered ? config.bar.primaryOpacity : 0.4,
              }}
            />

            {/* Skeleton Text (Bar) */}
            <rect
              x={button.x + 30}
              y={button.y + 16}
              width={58}
              height={8}
              rx={config.barRx}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{
                transition: `${config.transition}, x ${config.transition.split(" ")[1]}`,
                opacity: isHovered ? config.bar.primaryOpacity : 0.4,
              }}
            />
          </g>

          {/* Square buttons – appear to the right */}
          <g
            style={{
              ...(isHovered ? press.hover : press.idle),
              transition: `transform 0.4s cubic-bezier(0.2, 1, 0.4, 1)`,
            }}
          >
            <g>
              <rect
                x={sq1.x}
                y={sq1.y}
                width={sq1.w}
                height={sq1.h}
                rx={sq1.rx}
                className={config.highlight.idleClass}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={config.strokeWidth}
                style={{
                  transition: `${config.transition}, x ${config.transition.split(" ")[1]}`,
                  opacity: squareButtonAnimation[isHovered ? "hover" : "idle"].opacity,
                  fillOpacity: isHovered ? 0.05 : 0,
                  strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : 0,
                }}
              />
              <rect
                x={sq1.x + 14}
                y={sq1.y + 14}
                width={12}
                height={12}
                rx={config.barRx}
                fill="currentColor"
                className={config.highlight.idleClass}
                style={{
                  transition: `${config.transition}, x ${config.transition.split(" ")[1]}`,
                  opacity: isHovered ? config.bar.secondaryOpacity : 0,
                }}
              />
            </g>
            <g>
              <rect
                x={sq2.x}
                y={sq2.y}
                width={sq2.w}
                height={sq2.h}
                rx={sq2.rx}
                className={config.highlight.idleClass}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={config.strokeWidth}
                style={{
                  transition: `${config.transition}, x ${config.transition.split(" ")[1]}`,
                  opacity: squareButtonAnimation[isHovered ? "hover" : "idle"].opacity,
                  fillOpacity: isHovered ? 0.05 : 0,
                  strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : 0,
                }}
              />
              <rect
                x={sq2.x + 14}
                y={sq2.y + 14}
                width={12}
                height={12}
                rx={config.barRx}
                fill="currentColor"
                className={config.highlight.idleClass}
                style={{
                  transition: `${config.transition}, x ${config.transition.split(" ")[1]}`,
                  opacity: isHovered ? config.bar.secondaryOpacity : 0,
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
              shapeTransition:
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
