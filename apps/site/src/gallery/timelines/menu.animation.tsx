"use client";

import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

export function MenuAnimation() {
  const [stage, setStage] = useState<
    "idle" | "hover_doc" | "right_click" | "open" | "hover_sub" | "sub_open" | "selecting" | "selected"
  >("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const galleryItem = el.closest(".group") || el;

    const timers: NodeJS.Timeout[] = [];

    const handleEnter = () => {
      setStage("hover_doc");
      timers.push(setTimeout(() => setStage("right_click"), 500));
      timers.push(setTimeout(() => setStage("open"), 800));
      timers.push(setTimeout(() => setStage("hover_sub"), 1600));
      timers.push(setTimeout(() => setStage("sub_open"), 2200));
      timers.push(setTimeout(() => setStage("selecting"), 3000));
      timers.push(setTimeout(() => setStage("selected"), 4600));
    };

    const handleLeave = () => {
      timers.forEach(clearTimeout);
      setStage("idle");
    };

    galleryItem.addEventListener("mouseenter", handleEnter);
    galleryItem.addEventListener("mouseleave", handleLeave);
    return () => {
      timers.forEach(clearTimeout);
      galleryItem.removeEventListener("mouseenter", handleEnter);
      galleryItem.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const isMenuOpen = ["open", "hover_sub", "sub_open", "selecting"].includes(stage);
  const isSubOpen = ["sub_open", "selecting"].includes(stage);
  const isHoveringSubTrigger = ["hover_sub", "sub_open", "selecting"].includes(stage);
  const isSelectingSubItem = stage === "selecting";
  const isDocHighlighted = !["idle", "selected"].includes(stage);

  // Fixed axes
  const centerX = 200;
  const centerY = 150;

  // Menu
  const menuW = 128;
  const padding = 5;
  const labelH = 18;
  const itemH = 24;
  const sepH = 8;
  const menuH = padding + labelH + itemH + itemH + sepH + itemH + padding; // 108
  const menuY = centerY - menuH / 2; // 96


  // Doc
  const docW = 92;
  const docH = padding + labelH + itemH + itemH + sepH + itemH + itemH + padding; // 132
  const docY = centerY - docH / 2; // 84
  const docItem1Y = docY + padding + labelH;  // 107
  const docItem2Y = docItem1Y + itemH;        // 131
  const docSepY = docItem2Y + itemH;          // 155
  const docSubY = docSepY + sepH;             // 163
  const docItem4Y = docSubY + itemH;          // 187

  // Gaps
  const docGap = 10;
  const menuGap = 4;

  // Menu item Y (absolute, unaffected by horizontal shifts)
  const item1Y = menuY + padding + labelH;   // 119
  const item2Y = item1Y + itemH;             // 143
  const sep1Y = item2Y + itemH;             // 167
  const subY = sep1Y + sepH;                // 175

  // Submenu
  const subMenuW = 96;
  const subMenuY = subY - 2;                // 173
  const subItem1Y = subMenuY + padding;     // 178
  const subItem2Y = subItem1Y + itemH;      // 202
  const subMenuH = itemH * 2 + padding * 2; // 58

  // Composition widths
  const noMenuW = docW;                             // 92
  const menuOpenW = docW + docGap + menuW;          // 230
  const subOpenW = menuOpenW + menuGap + subMenuW;  // 330

  // Relative X positions within the shifting group
  const docX = 0;
  const menuX = docW + docGap;              // 102
  const subMenuX = menuX + menuW + menuGap; // 234

  // offsetX: left edge of the group, computed so composition stays centered
  const groupW = isSubOpen ? subOpenW : isMenuOpen ? menuOpenW : noMenuW;
  const offsetX = centerX - groupW / 2;

  // Cursor — absolute coords factoring in stage-specific offsetX
  function offsetForStage(s: typeof stage) {
    const mo = ["open", "hover_sub", "sub_open", "selecting"].includes(s);
    const so = ["sub_open", "selecting"].includes(s);
    const w = so ? subOpenW : mo ? menuOpenW : noMenuW;
    return centerX - w / 2;
  }

  const cursorFrames = {
    idle: {
      target: { x: 300, y: 250 },
      opacity: 0,
    },
    hover_doc: {
      target: { x: offsetForStage("hover_doc") + docX + docW / 2, y: docSubY + itemH / 2 },
      opacity: 1,
    },
    right_click: {
      target: { x: offsetForStage("right_click") + docX + docW / 2, y: docSubY + itemH / 2 },
      opacity: 1,
      scale: 0.85,
    },
    open: {
      target: { x: offsetForStage("open") + docX + docW / 2, y: docSubY + itemH / 2 },
      opacity: 1,
    },
    hover_sub: {
      target: { x: offsetForStage("hover_sub") + menuX + menuW / 2, y: subY + itemH / 2 },
      opacity: 1,
    },
    sub_open: {
      target: { x: offsetForStage("sub_open") + menuX + menuW / 2, y: subY + itemH / 2 },
      opacity: 1,
    },
    selecting: {
      target: { x: offsetForStage("selecting") + subMenuX + subMenuW / 2, y: subItem1Y + itemH / 2 },
      opacity: 1,
      scale: 0.9,
    },
    selected: {
      target: { x: 350, y: 300 },
      opacity: 0,
    },
  } satisfies Record<typeof stage, CursorFrame>;

  const transition = "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";

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
            <radialGradient id="menu-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="menu-grid-mask">
              <rect width="400" height="300" fill="url(#menu-grid-fade)" />
            </mask>
          </defs>

          {/* Main group — shifts left as elements expand to keep composition centered */}
          <g style={{ transform: `translateX(${offsetX}px)`, transition }}>

            {/* Document trigger */}
            <rect
              x={docX} y={docY} width={docW} height={docH} rx={config.blockRx}
              fill="var(--color-background-900)" stroke="currentColor"
              className={isDocHighlighted ? config.highlight.hoverClass : config.highlight.idleClass}
              strokeWidth={config.strokeWidth}
              style={{
                fillOpacity: 1,
                strokeOpacity: isDocHighlighted
                  ? config.highlight.hoverStrokeOpacity
                  : config.highlight.idleStrokeOpacity,
                transition,
              }}
            />
            {/* Label */}
            <rect x={docX + padding + 8} y={docY + padding + 6} width={28} height={6} rx={2}
              fill="currentColor" className={config.guidelines.colorClass} style={{ opacity: 0.3 }}
            />
            {/* Item 1 */}
            <rect x={docX + padding} y={docItem1Y} width={docW - padding * 2} height={itemH} rx={config.barRx}
              fill="currentColor" className={config.highlight.hoverClass} style={{ fillOpacity: 0 }}
            />
            <rect x={docX + padding + 8} y={docItem1Y + 8} width={34} height={7} rx={2}
              fill="currentColor" className={config.highlight.idleClass} style={{ opacity: 0.55 }}
            />
            {/* Item 2 */}
            <rect x={docX + padding} y={docItem2Y} width={docW - padding * 2} height={itemH} rx={config.barRx}
              fill="currentColor" className={config.highlight.hoverClass} style={{ fillOpacity: 0 }}
            />
            <rect x={docX + padding + 8} y={docItem2Y + 8} width={28} height={7} rx={2}
              fill="currentColor" className={config.highlight.idleClass} style={{ opacity: 0.4 }}
            />
            {/* Separator */}
            <line
              x1={docX + padding} y1={docSepY + sepH / 2}
              x2={docX + docW - padding} y2={docSepY + sepH / 2}
              stroke="currentColor" className={config.guidelines.colorClass}
              strokeWidth="1" style={{ opacity: 0.2 }}
            />
            {/* Sub trigger (item 3) */}
            <rect x={docX + padding} y={docSubY} width={docW - padding * 2} height={itemH} rx={config.barRx}
              fill="currentColor" className={config.highlight.hoverClass} style={{ fillOpacity: isDocHighlighted ? 0.15 : 0, transition }}
            />
            <rect x={docX + padding + 8} y={docSubY + 8} width={28} height={7} rx={2}
              fill="currentColor"
              className={isDocHighlighted ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{ opacity: isDocHighlighted ? 0.8 : 0.45, transition }}
            />
            <path
              d={`M ${docX + docW - padding - 14} ${docSubY + 8} L ${docX + docW - padding - 9} ${docSubY + 12} L ${docX + docW - padding - 14} ${docSubY + 16}`}
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              className={isDocHighlighted ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{ opacity: isDocHighlighted ? 0.9 : 0.45, transition }}
            />
            {/* Item 4 (regular, last) */}
            <rect x={docX + padding} y={docItem4Y} width={docW - padding * 2} height={itemH} rx={config.barRx}
              fill="currentColor" className={config.highlight.hoverClass} style={{ fillOpacity: 0 }}
            />
            <rect x={docX + padding + 8} y={docItem4Y + 8} width={22} height={7} rx={2}
              fill="currentColor" className={config.highlight.idleClass} style={{ opacity: 0.35 }}
            />

            {/* Context menu */}
            <g
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(-6px)",
                transition,
                pointerEvents: "none",
              }}
            >
              <rect
                x={menuX} y={menuY} width={menuW} height={menuH} rx={config.blockRx}
                fill="var(--color-background-900)" stroke="currentColor"
                className={config.highlight.idleClass}
                style={{ fillOpacity: 1, strokeOpacity: config.highlight.idleStrokeOpacity }}
              />
              {/* Label */}
              <rect
                x={menuX + padding + 8} y={menuY + padding + 6}
                width={34} height={6} rx={2}
                fill="currentColor" className={config.guidelines.colorClass}
                style={{ opacity: 0.3 }}
              />
              {/* Item 1 */}
              <rect x={menuX + padding} y={item1Y} width={menuW - padding * 2} height={itemH} rx={config.barRx}
                fill="currentColor" className={config.highlight.hoverClass}
                style={{ fillOpacity: 0, transition }}
              />
              <rect x={menuX + padding + 10} y={item1Y + 8} width={48} height={7} rx={2}
                fill="currentColor" className={config.highlight.idleClass}
                style={{ opacity: 0.55, transition }}
              />
              {/* Item 2 */}
              <rect x={menuX + padding} y={item2Y} width={menuW - padding * 2} height={itemH} rx={config.barRx}
                fill="currentColor" className={config.highlight.hoverClass}
                style={{ fillOpacity: 0, transition }}
              />
              <rect x={menuX + padding + 10} y={item2Y + 8} width={40} height={7} rx={2}
                fill="currentColor" className={config.highlight.idleClass}
                style={{ opacity: 0.4, transition }}
              />
              {/* Separator */}
              <line
                x1={menuX + padding} y1={sep1Y + sepH / 2}
                x2={menuX + menuW - padding} y2={sep1Y + sepH / 2}
                stroke="currentColor" className={config.guidelines.colorClass}
                strokeWidth="1" style={{ opacity: 0.2 }}
              />
              {/* Sub trigger */}
              <rect x={menuX + padding} y={subY} width={menuW - padding * 2} height={itemH} rx={config.barRx}
                fill="currentColor" className={config.highlight.hoverClass}
                style={{ fillOpacity: isHoveringSubTrigger ? 0.2 : 0, transition }}
              />
              <rect x={menuX + padding + 10} y={subY + 8} width={36} height={7} rx={2}
                fill="currentColor"
                className={isHoveringSubTrigger ? config.highlight.hoverClass : config.highlight.idleClass}
                style={{ opacity: isHoveringSubTrigger ? 0.9 : 0.55, transition }}
              />
              <path
                d={`M ${menuX + menuW - padding - 14} ${subY + 8} L ${menuX + menuW - padding - 9} ${subY + 12} L ${menuX + menuW - padding - 14} ${subY + 16}`}
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                className={isHoveringSubTrigger ? config.highlight.hoverClass : config.highlight.idleClass}
                style={{ opacity: isHoveringSubTrigger ? 1 : 0.45, transition }}
              />
            </g>

            {/* Submenu */}
            <g
              style={{
                opacity: isSubOpen ? 1 : 0,
                transform: isSubOpen ? "translateX(0)" : "translateX(-8px)",
                transition,
                pointerEvents: "none",
              }}
            >
              <rect
                x={subMenuX} y={subMenuY} width={subMenuW} height={subMenuH} rx={config.blockRx}
                fill="var(--color-background-900)" stroke="currentColor"
                className={config.highlight.idleClass}
                style={{ fillOpacity: 1, strokeOpacity: config.highlight.idleStrokeOpacity }}
              />
              {/* Sub item 1 */}
              <rect x={subMenuX + padding} y={subItem1Y} width={subMenuW - padding * 2} height={itemH} rx={config.barRx}
                fill="currentColor" className={config.highlight.hoverClass}
                style={{ fillOpacity: isSelectingSubItem ? 0.2 : 0, transition }}
              />
              <rect x={subMenuX + padding + 8} y={subItem1Y + 8} width={44} height={7} rx={2}
                fill="currentColor"
                className={isSelectingSubItem ? config.highlight.hoverClass : config.highlight.idleClass}
                style={{ opacity: isSelectingSubItem ? 0.9 : 0.55, transition }}
              />
              {/* Sub item 2 */}
              <rect x={subMenuX + padding} y={subItem2Y} width={subMenuW - padding * 2} height={itemH} rx={config.barRx}
                fill="currentColor" className={config.highlight.hoverClass}
                style={{ fillOpacity: 0, transition }}
              />
              <rect x={subMenuX + padding + 8} y={subItem2Y + 8} width={36} height={7} rx={2}
                fill="currentColor" className={config.highlight.idleClass}
                style={{ opacity: 0.4, transition }}
              />
            </g>

          </g>{/* end main composition group */}

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
