"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";
import { Cursor, CursorProvider, type CursorFrame } from "./preview-cursor";

// Modal
const MW = 220;
const MH = 150;
const MX = (400 - MW) / 2;      // 90
const MY = (300 - MH) / 2 - 18; // 57
const MRX = 4;
const HEADER_H = 26;
const FOOTER_H = 32;

// Background card
const CW = 176;
const CH = 110;
const CARD_X = (400 - CW) / 2;      // 112
const CARD_Y = (300 - CH) / 2 - 4;  // 91
const CARD_HEADER_H = 32;
const CARD_FOOTER_H = 30;

// Avatar icon in card header
const AV_CX = CARD_X + 20;
const AV_CY = CARD_Y + CARD_HEADER_H / 2;
const AV_R = 9;

// Trigger button in card footer
const BTN_W = 58;
const BTN_H = 16;
const BTN_X = CARD_X + CW - BTN_W - 8;
const BTN_Y = CARD_Y + CH - CARD_FOOTER_H + (CARD_FOOTER_H - BTN_H) / 2;

// Skeleton buttons in card footer
const SKEL_BTN_W = 38;
const SKEL_BTN_H = 14;
const SKEL_BTN_Y = CARD_Y + CH - CARD_FOOTER_H + (CARD_FOOTER_H - SKEL_BTN_H) / 2;
const SKEL_BTN1_X = CARD_X + 8;
const SKEL_BTN2_X = CARD_X + 8 + SKEL_BTN_W + 6;

const T = config.transition;

export function ModalAnimation() {
  const [stage, setStage] = useState<"idle" | "hovering" | "open">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("hovering");
    timersRef.current.push(setTimeout(() => setStage("open"), 500));
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

  const isActive = stage !== "idle";
  const isOpen = stage === "open";

  const cursorFrames = {
    idle: {
      target: { x: BTN_X + BTN_W + 44, y: BTN_Y + BTN_H + 32 },
      opacity: 0,
    },
    hovering: {
      target: { x: BTN_X + BTN_W / 2, y: BTN_Y + BTN_H / 2 },
      opacity: 1,
    },
    open: {
      target: { x: MX + MW - 14, y: MY + HEADER_H / 2 },
      opacity: 1,
    },
  } satisfies Record<typeof stage, CursorFrame>;

  const bodyLineY = CARD_Y + CARD_HEADER_H;

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
          <g transform="translate(200, 150) scale(1.15) translate(-200, -150)">
          {/* ── Background card ── */}

          {/* Card fill */}
          <rect
            x={CARD_X} y={CARD_Y} width={CW} height={CH} rx={4}
            fill="currentColor"
            className="text-background-900"
          />

          {/* Card border */}
          <rect
            x={CARD_X} y={CARD_Y} width={CW} height={CH} rx={4}
            fill="none"
            stroke="currentColor"
            className="text-background-700"
            strokeWidth={1}
            style={{ opacity: 0.5 }}
          />

          {/* Header divider */}
          <rect
            x={CARD_X} y={CARD_Y + CARD_HEADER_H} width={CW} height={1}
            fill="currentColor"
            className="text-background-700"
            style={{ opacity: 0.45 }}
          />

          {/* Footer divider */}
          <rect
            x={CARD_X} y={CARD_Y + CH - CARD_FOOTER_H} width={CW} height={1}
            fill="currentColor"
            className="text-background-700"
            style={{ opacity: 0.45 }}
          />

          {/* Avatar circle */}
          <circle
            cx={AV_CX} cy={AV_CY} r={AV_R}
            fill="currentColor"
            className="text-background-600"
            style={{ opacity: 0.35 }}
          />

          {/* Avatar title */}
          <rect
            x={CARD_X + 36} y={AV_CY - 6} width={66} height={7} rx={3.5}
            fill="currentColor"
            className="text-foreground-400"
            style={{ opacity: 0.35 }}
          />

          {/* Avatar subtitle */}
          <rect
            x={CARD_X + 36} y={AV_CY + 3} width={44} height={5} rx={2.5}
            fill="currentColor"
            className="text-foreground-400"
            style={{ opacity: 0.2 }}
          />

          {/* Body line 1 */}
          <rect
            x={CARD_X + 12} y={bodyLineY + 12} width={132} height={6} rx={3}
            fill="currentColor"
            className="text-foreground-400"
            style={{ opacity: 0.2 }}
          />

          {/* Body line 2 */}
          <rect
            x={CARD_X + 12} y={bodyLineY + 24} width={112} height={5} rx={2.5}
            fill="currentColor"
            className="text-foreground-400"
            style={{ opacity: 0.14 }}
          />

          {/* Body line 3 */}
          <rect
            x={CARD_X + 12} y={bodyLineY + 35} width={84} height={5} rx={2.5}
            fill="currentColor"
            className="text-foreground-400"
            style={{ opacity: 0.1 }}
          />

          {/* Footer skeleton buttons */}
          <rect
            x={SKEL_BTN1_X} y={SKEL_BTN_Y} width={SKEL_BTN_W} height={SKEL_BTN_H} rx={2}
            fill="currentColor"
            className="text-background-800"
            style={{ opacity: 0.6 }}
          />
          <rect
            x={SKEL_BTN2_X} y={SKEL_BTN_Y} width={SKEL_BTN_W} height={SKEL_BTN_H} rx={2}
            fill="currentColor"
            className="text-background-800"
            style={{ opacity: 0.4 }}
          />

          {/* Footer trigger button */}
          <rect
            x={BTN_X} y={BTN_Y} width={BTN_W} height={BTN_H} rx={2}
            fill="currentColor"
            className="text-background-800"
          />
          <rect
            x={BTN_X} y={BTN_Y} width={BTN_W} height={BTN_H} rx={2}
            fill="none"
            stroke="currentColor"
            className={isActive ? config.accentOutline.colorClass : "text-background-700"}
            strokeWidth={1}
            style={{ opacity: isActive ? 0.55 : 0.4, transition: T }}
          />
          <rect
            x={BTN_X + 11} y={BTN_Y + BTN_H / 2 - 3} width={36} height={5} rx={2.5}
            fill="currentColor"
            className={isActive ? config.highlight.hoverClass : config.highlight.idleClass}
            style={{ opacity: isActive ? 0.6 : 0.3, transition: T }}
          />

          {/* ── Backdrop ── */}
          <rect
            x={0} y={0} width={400} height={300}
            fill="currentColor"
            className="text-background-950"
            style={{ opacity: isOpen ? 0.82 : 0, transition: T }}
          />

          {/* ── Modal panel ── */}
          <g
            style={{
              opacity: isOpen ? 1 : 0,
              transition: T,
              transitionDelay: isOpen ? "0.05s" : "0s",
            }}
          >
            {/* Panel background */}
            <rect
              x={MX} y={MY} width={MW} height={MH} rx={MRX}
              fill="currentColor"
              className="text-background-900"
            />

            {/* Header divider */}
            <rect
              x={MX} y={MY + HEADER_H} width={MW} height={1}
              fill="currentColor"
              className="text-background-700"
              style={{ opacity: 0.55 }}
            />

            {/* Footer divider */}
            <rect
              x={MX} y={MY + MH - FOOTER_H} width={MW} height={1}
              fill="currentColor"
              className="text-background-700"
              style={{ opacity: 0.55 }}
            />

            {/* Panel border */}
            <rect
              x={MX} y={MY} width={MW} height={MH} rx={MRX}
              fill="none"
              stroke="currentColor"
              className="text-background-700"
              strokeWidth={1}
              style={{ opacity: 0.5 }}
            />

            {/* Header title */}
            <rect
              x={MX + 10} y={MY + HEADER_H / 2 - 3.5} width={58} height={7} rx={3.5}
              fill="currentColor"
              className="text-foreground-400"
              style={{
                opacity: isOpen ? 0.5 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.18s" : "0s",
              }}
            />

            {/* Close X */}
            <line
              x1={MX + MW - 18} y1={MY + HEADER_H / 2 - 4}
              x2={MX + MW - 10} y2={MY + HEADER_H / 2 + 4}
              stroke="currentColor"
              className="text-foreground-400"
              strokeWidth={1.5}
              strokeLinecap="round"
              style={{
                opacity: isOpen ? 0.45 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.2s" : "0s",
              }}
            />
            <line
              x1={MX + MW - 10} y1={MY + HEADER_H / 2 - 4}
              x2={MX + MW - 18} y2={MY + HEADER_H / 2 + 4}
              stroke="currentColor"
              className="text-foreground-400"
              strokeWidth={1.5}
              strokeLinecap="round"
              style={{
                opacity: isOpen ? 0.45 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.2s" : "0s",
              }}
            />

            {/* Body line 1 */}
            <rect
              x={MX + 10} y={MY + HEADER_H + 14} width={142} height={7} rx={3.5}
              fill="currentColor"
              className="text-foreground-400"
              style={{
                opacity: isOpen ? 0.28 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.26s" : "0s",
              }}
            />

            {/* Body line 2 */}
            <rect
              x={MX + 10} y={MY + HEADER_H + 26} width={172} height={5} rx={2.5}
              fill="currentColor"
              className="text-foreground-400"
              style={{
                opacity: isOpen ? 0.17 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.31s" : "0s",
              }}
            />

            {/* Body line 3 */}
            <rect
              x={MX + 10} y={MY + HEADER_H + 36} width={118} height={5} rx={2.5}
              fill="currentColor"
              className="text-foreground-400"
              style={{
                opacity: isOpen ? 0.13 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.35s" : "0s",
              }}
            />

            {/* Footer — cancel */}
            <rect
              x={MX + MW - 118} y={MY + MH - FOOTER_H + 9} width={50} height={14} rx={2}
              fill="none"
              stroke="currentColor"
              className="text-background-600"
              strokeWidth={1}
              style={{
                opacity: isOpen ? 0.45 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.40s" : "0s",
              }}
            />
            <rect
              x={MX + MW - 118 + 9} y={MY + MH - FOOTER_H + 9 + 4} width={32} height={5} rx={2.5}
              fill="currentColor"
              className="text-foreground-400"
              style={{
                opacity: isOpen ? 0.22 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.40s" : "0s",
              }}
            />

            {/* Footer — confirm */}
            <rect
              x={MX + MW - 58} y={MY + MH - FOOTER_H + 9} width={48} height={14} rx={2}
              fill="currentColor"
              className="text-accent-500"
              style={{
                opacity: isOpen ? 0.18 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.44s" : "0s",
              }}
            />
            <rect
              x={MX + MW - 58} y={MY + MH - FOOTER_H + 9} width={48} height={14} rx={2}
              fill="none"
              stroke="currentColor"
              className="text-accent-500"
              strokeWidth={1}
              style={{
                opacity: isOpen ? 0.4 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.44s" : "0s",
              }}
            />
            <rect
              x={MX + MW - 58 + 10} y={MY + MH - FOOTER_H + 9 + 4} width={28} height={5} rx={2.5}
              fill="currentColor"
              className="text-accent-500"
              style={{
                opacity: isOpen ? 0.7 : 0,
                transition: T,
                transitionDelay: isOpen ? "0.44s" : "0s",
              }}
            />
          </g>

          <CursorProvider
            phase={stage}
            frames={cursorFrames}
            appearance={{
              className: config.highlight.hoverClass,
              motionTransition:
                "transform 0.5s cubic-bezier(0.2, 1, 0.4, 1), opacity 0.25s ease-out",
            }}
          >
            <Cursor />
          </CursorProvider>
          </g>
        </svg>
      </div>
    </div>
  );
}
