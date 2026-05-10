"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

// Brought over from your GroupAnimation pattern
function getRoundedRectPath(
  x: number, y: number, w: number, h: number,
  r: { tl: number, tr: number, bl: number, br: number }
) {
  return `
    M ${x + r.tl} ${y}
    H ${x + w - r.tr}
    A ${r.tr} ${r.tr} 0 0 1 ${x + w} ${y + r.tr}
    V ${y + h - r.br}
    A ${r.br} ${r.br} 0 0 1 ${x + w - r.br} ${y + h}
    H ${x + r.bl}
    A ${r.bl} ${r.bl} 0 0 1 ${x} ${y + h - r.bl}
    V ${y + r.tl}
    A ${r.tl} ${r.tl} 0 0 1 ${x + r.tl} ${y}
    Z
  `;
}

function TrashButtonGroup({ trashX, containerY, trashW, containerH, rx, isConfirming, isTrashActive, isNotIdle }: {
  trashX: number; containerY: number; trashW: number; containerH: number;
  rx: number; isConfirming: boolean; isTrashActive: boolean; isNotIdle: boolean;
}) {
  return (
    <g
      style={{
        opacity: isConfirming ? 0 : 1,
        transform: isConfirming ? "translateY(-40px)" : (isNotIdle ? "translateY(2px)" : "translateY(0px)"),
        transition: config.transition,
        pointerEvents: isConfirming ? "none" : "auto",
      }}
    >
      <path
        d={getRoundedRectPath(trashX, containerY, trashW, containerH, { tl: rx, bl: rx, tr: rx, br: rx })}
        className="text-background-950"
        fill="currentColor"
        style={{ transition: config.transition }}
      />
      <path
        d={getRoundedRectPath(trashX, containerY, trashW, containerH, { tl: rx, bl: rx, tr: rx, br: rx })}
        className={isTrashActive ? config.highlight.hoverClass : config.highlight.idleClass}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{
          transition: config.transition,
          fillOpacity: isTrashActive ? 0.05 : config.highlight.idleFillOpacity,
          strokeOpacity: isTrashActive ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
        }}
      />
      <rect
        x={trashX + 12} y={containerY + 14} width={12} height={12} rx={config.barRx}
        fill="currentColor"
        className={isTrashActive ? config.highlight.hoverClass : config.highlight.idleClass}
        style={{ transition: config.transition, opacity: config.bar.primaryOpacity }}
      />
      <rect
        x={trashX + 30} y={containerY + 16} width={58} height={8} rx={config.barRx}
        fill="currentColor"
        className={isTrashActive ? config.highlight.hoverClass : config.highlight.idleClass}
        style={{ transition: config.transition, opacity: config.bar.primaryOpacity }}
      />
    </g>
  );
}

function ConfirmButtonGroup({ confirmX, cancelX, containerY, confirmW, cancelW, containerH, rx, isConfirming }: {
  confirmX: number; cancelX: number; containerY: number; confirmW: number;
  cancelW: number; containerH: number; rx: number; isConfirming: boolean;
}) {
  return (
    <g
      style={{
        opacity: isConfirming ? 1 : 0,
        transform: isConfirming ? "translateY(2px)" : "translateY(20px)",
        transition: config.transition,
        transitionDelay: isConfirming ? "0.3s" : "0s",
        pointerEvents: isConfirming ? "auto" : "none",
      }}
    >
      <rect
        x={confirmX - 10} y={containerY - 10} width={confirmW + 20} height={containerH + 20}
        rx={rx + 5} fill="none" stroke="currentColor" className="text-accent-500"
        strokeWidth="1.5" strokeDasharray="4 4"
        style={{ opacity: 0.4, transition: config.transition, transformOrigin: "center" }}
      />
      <path
        d={getRoundedRectPath(cancelX, containerY, cancelW, containerH, { tl: rx, bl: rx, tr: rx, br: rx })}
        className="text-background-950" fill="currentColor"
        style={{ transition: config.transition }}
      />
      <path
        d={getRoundedRectPath(cancelX, containerY, cancelW, containerH, { tl: rx, bl: rx, tr: rx, br: rx })}
        className={config.highlight.idleClass} fill="currentColor" stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{ transition: config.transition, fillOpacity: config.highlight.idleFillOpacity, strokeOpacity: config.highlight.idleStrokeOpacity }}
      />
      <rect
        x={cancelX + (cancelW - 40) / 2} y={containerY + 20} width={40} height={8} rx={config.barRx}
        className={config.highlight.idleClass} fill="currentColor"
        style={{ transition: config.transition, opacity: config.bar.secondaryOpacity }}
      />
      <path
        d={getRoundedRectPath(confirmX, containerY, confirmW, containerH, { tl: rx, bl: rx, tr: rx, br: rx })}
        className="text-background-950" fill="currentColor"
        style={{ transition: config.transition }}
      />
      <path
        d={getRoundedRectPath(confirmX, containerY, confirmW, containerH, { tl: rx, bl: rx, tr: rx, br: rx })}
        className={config.highlight.hoverClass} fill="currentColor" stroke="currentColor"
        strokeWidth={config.strokeWidth}
        style={{ transition: config.transition, fillOpacity: 0.05, strokeOpacity: config.highlight.hoverStrokeOpacity }}
      />
      <rect
        x={confirmX} y={containerY} width={isConfirming ? confirmW : 0} height={containerH}
        clipPath="url(#confirm-clip)" className="text-accent-500" fill="currentColor"
        style={{ opacity: 0.6, transition: isConfirming ? "width 2s ease-out" : "none", transitionDelay: isConfirming ? "0.8s" : "0s" }}
      />
      <rect
        x={confirmX + (confirmW - 46) / 2} y={containerY + 20} width={46} height={8} rx={config.barRx}
        className={config.highlight.hoverClass} fill="currentColor"
        style={{ transition: config.transition, opacity: config.bar.primaryOpacity }}
      />
    </g>
  );
}

export function ConfirmAnimation() {
  const [stage, setStage] = useState<
    "idle" | "hovering" | "clicking_trash" | "confirming"
  >("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("hovering");
    timersRef.current.push(setTimeout(() => setStage("clicking_trash"), 500));
    timersRef.current.push(setTimeout(() => setStage("confirming"), 800));
  }, []);

  const handleLeave = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStage("idle");
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;
    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      timersRef.current.forEach(clearTimeout);
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleEnter, handleLeave]);

  const isConfirming = stage === "confirming";
  const isTrashActive = stage === "hovering" || stage === "clicking_trash";
  const isNotIdle = stage !== "idle";

  // Layout Constants
  const centerY = 150;
  const containerH = 48;
  const containerY = centerY - containerH / 2;
  const rx = config.blockRx;

  // Grouped Item Dimensions
  const trashW = 130;
  const cancelW = 110;
  const confirmW = 148;
  const gap = 20;

  // Fixed Layout Positions
  const trashX = 200 - trashW / 2;
  const confirmGroupW = cancelW + confirmW + gap;
  const confirmGroupX = 200 - confirmGroupW / 2;
  const cancelX = confirmGroupX;
  const confirmX = confirmGroupX + cancelW + gap;

  const cursorFrames = {
    idle: { target: { x: 250, y: 220 }, opacity: 0 },
    hovering: { target: { x: 200, y: 150 }, opacity: 1 },
    clicking_trash: { target: { x: 200, y: 150 }, opacity: 1, scale: 0.85 },
    confirming: { target: { x: confirmX + confirmW / 2, y: 150 }, opacity: 1 },
  } satisfies Record<typeof stage, CursorFrame>;

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
            <clipPath id="confirm-clip">
              <path
                d={getRoundedRectPath(confirmX, containerY, confirmW, containerH, {
                  tl: rx, bl: rx, tr: rx, br: rx
                })}
              />
            </clipPath>
          </defs>

          <TrashButtonGroup
            trashX={trashX} containerY={containerY} trashW={trashW}
            containerH={containerH} rx={rx} isConfirming={isConfirming}
            isTrashActive={isTrashActive} isNotIdle={isNotIdle}
          />
          <ConfirmButtonGroup
            confirmX={confirmX} cancelX={cancelX} containerY={containerY}
            confirmW={confirmW} cancelW={cancelW} containerH={containerH}
            rx={rx} isConfirming={isConfirming}
          />

          <CursorProvider
            phase={stage}
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
