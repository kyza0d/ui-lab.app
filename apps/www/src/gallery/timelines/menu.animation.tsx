"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import config from "./config.json";
import {
  Cursor,
  CursorProvider,
  type CursorFrame,
} from "./preview-cursor";

function DocTrigger({ docX, docY, docW, docH, docItem1Y, docItem2Y, docSepY, docSubY, docItem4Y, padding, itemH, sepH, isDocHighlighted, transition }: {
  docX: number; docY: number; docW: number; docH: number;
  docItem1Y: number; docItem2Y: number; docSepY: number; docSubY: number; docItem4Y: number;
  padding: number; itemH: number; sepH: number; isDocHighlighted: boolean; transition: string;
}) {
  return (
    <>
      <rect
        x={docX} y={docY} width={docW} height={docH} rx={config.blockRx}
        fill="var(--color-background-900)" stroke="currentColor"
        className={isDocHighlighted ? config.highlight.hoverClass : config.highlight.idleClass}
        strokeWidth={config.strokeWidth}
        style={{
          fillOpacity: 1,
          strokeOpacity: isDocHighlighted ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
          transition,
        }}
      />
      <rect x={docX + padding + 8} y={docY + padding + 6} width={28} height={6} rx={2}
        fill="currentColor" className={config.guidelines.colorClass} style={{ opacity: 0.3 }}
      />
      <rect x={docX + padding} y={docItem1Y} width={docW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass} style={{ fillOpacity: 0 }}
      />
      <rect x={docX + padding + 8} y={docItem1Y + 8} width={34} height={7} rx={2}
        fill="currentColor" className={config.highlight.idleClass} style={{ opacity: 0.55 }}
      />
      <rect x={docX + padding} y={docItem2Y} width={docW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass} style={{ fillOpacity: 0 }}
      />
      <rect x={docX + padding + 8} y={docItem2Y + 8} width={28} height={7} rx={2}
        fill="currentColor" className={config.highlight.idleClass} style={{ opacity: 0.4 }}
      />
      <line
        x1={docX + padding} y1={docSepY + sepH / 2}
        x2={docX + docW - padding} y2={docSepY + sepH / 2}
        stroke="currentColor" className={config.guidelines.colorClass}
        strokeWidth="1" style={{ opacity: 0.2 }}
      />
      <rect x={docX + padding} y={docSubY} width={docW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass}
        style={{ fillOpacity: isDocHighlighted ? 0.15 : 0, transition }}
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
      <rect x={docX + padding} y={docItem4Y} width={docW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass} style={{ fillOpacity: 0 }}
      />
      <rect x={docX + padding + 8} y={docItem4Y + 8} width={22} height={7} rx={2}
        fill="currentColor" className={config.highlight.idleClass} style={{ opacity: 0.35 }}
      />
    </>
  );
}

function ContextMenuGroup({ menuX, menuY, menuW, menuH, padding, itemH, sepH, item1Y, item2Y, sep1Y, subY, isMenuOpen, isHoveringSubTrigger, transition }: {
  menuX: number; menuY: number; menuW: number; menuH: number;
  padding: number; itemH: number; sepH: number;
  item1Y: number; item2Y: number; sep1Y: number; subY: number;
  isMenuOpen: boolean; isHoveringSubTrigger: boolean; transition: string;
}) {
  return (
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
      <rect
        x={menuX + padding + 8} y={menuY + padding + 6}
        width={34} height={6} rx={2}
        fill="currentColor" className={config.guidelines.colorClass}
        style={{ opacity: 0.3 }}
      />
      <rect x={menuX + padding} y={item1Y} width={menuW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass}
        style={{ fillOpacity: 0, transition }}
      />
      <rect x={menuX + padding + 10} y={item1Y + 8} width={48} height={7} rx={2}
        fill="currentColor" className={config.highlight.idleClass}
        style={{ opacity: 0.55, transition }}
      />
      <rect x={menuX + padding} y={item2Y} width={menuW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass}
        style={{ fillOpacity: 0, transition }}
      />
      <rect x={menuX + padding + 10} y={item2Y + 8} width={40} height={7} rx={2}
        fill="currentColor" className={config.highlight.idleClass}
        style={{ opacity: 0.4, transition }}
      />
      <line
        x1={menuX + padding} y1={sep1Y + sepH / 2}
        x2={menuX + menuW - padding} y2={sep1Y + sepH / 2}
        stroke="currentColor" className={config.guidelines.colorClass}
        strokeWidth="1" style={{ opacity: 0.2 }}
      />
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
  );
}

function SubMenuPanel({ subMenuX, subMenuY, subMenuW, subMenuH, subItem1Y, subItem2Y, padding, itemH, isSubOpen, isSelectingSubItem, transition }: {
  subMenuX: number; subMenuY: number; subMenuW: number; subMenuH: number;
  subItem1Y: number; subItem2Y: number; padding: number; itemH: number;
  isSubOpen: boolean; isSelectingSubItem: boolean; transition: string;
}) {
  return (
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
      <rect x={subMenuX + padding} y={subItem1Y} width={subMenuW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass}
        style={{ fillOpacity: isSelectingSubItem ? 0.2 : 0, transition }}
      />
      <rect x={subMenuX + padding + 8} y={subItem1Y + 8} width={44} height={7} rx={2}
        fill="currentColor"
        className={isSelectingSubItem ? config.highlight.hoverClass : config.highlight.idleClass}
        style={{ opacity: isSelectingSubItem ? 0.9 : 0.55, transition }}
      />
      <rect x={subMenuX + padding} y={subItem2Y} width={subMenuW - padding * 2} height={itemH} rx={config.barRx}
        fill="currentColor" className={config.highlight.hoverClass}
        style={{ fillOpacity: 0, transition }}
      />
      <rect x={subMenuX + padding + 8} y={subItem2Y + 8} width={36} height={7} rx={2}
        fill="currentColor" className={config.highlight.idleClass}
        style={{ opacity: 0.4, transition }}
      />
    </g>
  );
}

export function MenuAnimation() {
  const [stage, setStage] = useState<
    "idle" | "hover_doc" | "right_click" | "open" | "hover_sub" | "sub_open" | "selecting" | "selected"
  >("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleEnter = useCallback(() => {
    setStage("hover_doc");
    timersRef.current.push(setTimeout(() => setStage("right_click"), 500));
    timersRef.current.push(setTimeout(() => setStage("open"), 800));
    timersRef.current.push(setTimeout(() => setStage("hover_sub"), 1600));
    timersRef.current.push(setTimeout(() => setStage("sub_open"), 2200));
    timersRef.current.push(setTimeout(() => setStage("selecting"), 3000));
    timersRef.current.push(setTimeout(() => setStage("selected"), 4600));
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
  const menuH = padding + labelH + itemH + itemH + sepH + itemH + padding;
  const menuY = centerY - menuH / 2;

  // Doc
  const docW = 92;
  const docH = padding + labelH + itemH + itemH + sepH + itemH + itemH + padding;
  const docY = centerY - docH / 2;
  const docItem1Y = docY + padding + labelH;
  const docItem2Y = docItem1Y + itemH;
  const docSepY = docItem2Y + itemH;
  const docSubY = docSepY + sepH;
  const docItem4Y = docSubY + itemH;

  // Gaps
  const docGap = 10;
  const menuGap = 4;

  // Menu item Y
  const item1Y = menuY + padding + labelH;
  const item2Y = item1Y + itemH;
  const sep1Y = item2Y + itemH;
  const subY = sep1Y + sepH;

  // Submenu
  const subMenuW = 96;
  const subMenuY = subY - 2;
  const subItem1Y = subMenuY + padding;
  const subItem2Y = subItem1Y + itemH;
  const subMenuH = itemH * 2 + padding * 2;

  // Composition widths
  const noMenuW = docW;
  const menuOpenW = docW + docGap + menuW;
  const subOpenW = menuOpenW + menuGap + subMenuW;

  // Relative X positions within the shifting group
  const docX = 0;
  const menuX = docW + docGap;
  const subMenuX = menuX + menuW + menuGap;

  // offsetX: left edge of the group, computed so composition stays centered
  const groupW = isSubOpen ? subOpenW : isMenuOpen ? menuOpenW : noMenuW;
  const offsetX = centerX - groupW / 2;

  function offsetForStage(s: typeof stage) {
    const mo = ["open", "hover_sub", "sub_open", "selecting"].includes(s);
    const so = ["sub_open", "selecting"].includes(s);
    const w = so ? subOpenW : mo ? menuOpenW : noMenuW;
    return centerX - w / 2;
  }

  const cursorFrames = {
    idle: { target: { x: 300, y: 250 }, opacity: 0 },
    hover_doc: { target: { x: offsetForStage("hover_doc") + docX + docW / 2, y: docSubY + itemH / 2 }, opacity: 1 },
    right_click: { target: { x: offsetForStage("right_click") + docX + docW / 2, y: docSubY + itemH / 2 }, opacity: 1, scale: 0.85 },
    open: { target: { x: offsetForStage("open") + docX + docW / 2, y: docSubY + itemH / 2 }, opacity: 1 },
    hover_sub: { target: { x: offsetForStage("hover_sub") + menuX + menuW / 2, y: subY + itemH / 2 }, opacity: 1 },
    sub_open: { target: { x: offsetForStage("sub_open") + menuX + menuW / 2, y: subY + itemH / 2 }, opacity: 1 },
    selecting: { target: { x: offsetForStage("selecting") + subMenuX + subMenuW / 2, y: subItem1Y + itemH / 2 }, opacity: 1, scale: 0.9 },
    selected: { target: { x: 350, y: 300 }, opacity: 0 },
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

          <g style={{ transform: `translateX(${offsetX}px)`, transition }}>
            <DocTrigger
              docX={docX} docY={docY} docW={docW} docH={docH}
              docItem1Y={docItem1Y} docItem2Y={docItem2Y} docSepY={docSepY}
              docSubY={docSubY} docItem4Y={docItem4Y}
              padding={padding} itemH={itemH} sepH={sepH}
              isDocHighlighted={isDocHighlighted} transition={transition}
            />
            <ContextMenuGroup
              menuX={menuX} menuY={menuY} menuW={menuW} menuH={menuH}
              padding={padding} itemH={itemH} sepH={sepH}
              item1Y={item1Y} item2Y={item2Y} sep1Y={sep1Y} subY={subY}
              isMenuOpen={isMenuOpen} isHoveringSubTrigger={isHoveringSubTrigger}
              transition={transition}
            />
            <SubMenuPanel
              subMenuX={subMenuX} subMenuY={subMenuY} subMenuW={subMenuW} subMenuH={subMenuH}
              subItem1Y={subItem1Y} subItem2Y={subItem2Y}
              padding={padding} itemH={itemH}
              isSubOpen={isSubOpen} isSelectingSubItem={isSelectingSubItem}
              transition={transition}
            />
          </g>

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
