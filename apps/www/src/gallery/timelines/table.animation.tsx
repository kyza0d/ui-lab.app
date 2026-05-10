"use client";

import { useEffect, useRef, useState } from "react";
import config from "./config.json";

function getRoundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: { tl: number; tr: number; bl: number; br: number },
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

const columns = [
  { x: 0, width: 82, header: 38, cells: [46, 58, 40, 52] },
  { x: 82, width: 62, header: 28, cells: [28, 24, 34, 26] },
  { x: 144, width: 76, header: 42, cells: [54, 46, 60, 42] },
];

const rowHeight = 20;
const headerHeight = 22;
const toolbarHeight = 24;
const tableWidth = 220;
const tableX = 40;
const tableY = 39;
const bodyY = tableY + toolbarHeight + headerHeight;
const visibleRows = 3;
const transition = config.transition;

function TextBar({
  x,
  y,
  width,
  active,
  dim,
}: {
  x: number;
  y: number;
  width: number;
  active?: boolean;
  dim?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={4}
      rx={2}
      fill="currentColor"
      className={active ? config.highlight.hoverClass : config.dim.class}
      style={{
        opacity: active ? 0.78 : dim ? 0.16 : 0.34,
        transition,
      }}
    />
  );
}

function TableRow({
  y,
  rowIndex,
  state,
}: {
  y: number;
  rowIndex: number;
  state: "idle" | "active" | "dim";
}) {
  const isActive = state === "active";
  const isDim = state === "dim";

  return (
    <g transform={`translate(${tableX}, ${y})`} style={{ transition }}>
      <rect
        x={4}
        y={1}
        width={tableWidth - 8}
        height={rowHeight - 2}
        rx={5}
        fill="currentColor"
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        style={{
          fillOpacity: isActive ? 0.14 : 0,
          transition,
        }}
      />
      {columns.map((column, columnIndex) => (
        <g key={column.x}>
          <TextBar
            x={column.x + 11}
            y={8}
            width={column.cells[rowIndex % column.cells.length]}
            active={isActive || (columnIndex === 2 && state !== "dim")}
            dim={isDim}
          />
        </g>
      ))}
      <circle
        cx={tableWidth - 14}
        cy={rowHeight / 2}
        r={2.5}
        fill="currentColor"
        className={isActive ? config.highlight.hoverClass : config.dim.class}
        style={{ opacity: isActive ? 0.8 : isDim ? 0.12 : 0.24, transition }}
      />
    </g>
  );
}

export function TableAnimation() {
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

  const shellHeight = toolbarHeight + headerHeight + rowHeight * visibleRows + 14;
  const scrollOffset = isHovered ? -rowHeight : 0;
  const activeRowY = bodyY + rowHeight;

  return (
    <div
      ref={containerRef}
      className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans"
    >
      <div className="relative w-full max-w-[190px]">
        <svg viewBox="0 0 300 200" className="w-full h-auto relative z-10 overflow-visible" aria-hidden="true">
          <defs>
            <clipPath id="table-body-clip">
              <rect x={tableX} y={bodyY} width={tableWidth} height={rowHeight * visibleRows} />
            </clipPath>
          </defs>

          <path
            d={getRoundedRectPath(tableX, tableY, tableWidth, shellHeight, {
              tl: config.blockRx,
              tr: config.blockRx,
              bl: config.blockRx,
              br: config.blockRx,
            })}
            className="text-background-950"
            fill="currentColor"
          />
          <path
            d={getRoundedRectPath(tableX, tableY, tableWidth, shellHeight, {
              tl: config.blockRx,
              tr: config.blockRx,
              bl: config.blockRx,
              br: config.blockRx,
            })}
            className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            style={{
              fillOpacity: 0.05,
              strokeOpacity: isHovered ? config.highlight.hoverStrokeOpacity : config.highlight.idleStrokeOpacity,
              transition,
            }}
          />

          <g transform={`translate(${tableX}, ${tableY})`}>
            <line
              x1={0}
              y1={toolbarHeight}
              x2={tableWidth}
              y2={toolbarHeight}
              stroke="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.dim.strokeClass}
              strokeWidth={1}
              style={{ opacity: 0.3, transition }}
            />
            <rect
              x={12}
              y={8}
              width={isHovered ? 66 : 86}
              height={7}
              rx={4}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.dim.class}
              style={{ opacity: isHovered ? 0.54 : 0.22, transition }}
            />
            <rect
              x={tableWidth - 54}
              y={7}
              width={22}
              height={10}
              rx={4}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.dim.class}
              style={{ opacity: isHovered ? 0.28 : 0.12, transition }}
            />
            <rect
              x={tableWidth - 24}
              y={7}
              width={12}
              height={10}
              rx={4}
              fill="currentColor"
              className={config.dim.class}
              style={{ opacity: 0.14, transition }}
            />
          </g>

          <g transform={`translate(${tableX}, ${tableY + toolbarHeight})`}>
            <rect
              width={tableWidth}
              height={headerHeight}
              fill="currentColor"
              className={isHovered ? config.highlight.hoverClass : config.highlight.idleClass}
              style={{ opacity: isHovered ? 0.12 : 0.07, transition }}
            />
            {columns.map((column, columnIndex) => (
              <g key={column.x}>
                {columnIndex > 0 && (
                  <line
                    x1={column.x}
                    y1={0}
                    x2={column.x}
                    y2={headerHeight + rowHeight * visibleRows}
                    stroke="currentColor"
                    className={config.dim.strokeClass}
                    strokeWidth={1}
                    style={{ opacity: 0.14, transition }}
                  />
                )}
                <TextBar
                  x={column.x + 11}
                  y={9}
                  width={column.header}
                  active={isHovered && columnIndex === 2}
                />
              </g>
            ))}
          </g>

          <g clipPath="url(#table-body-clip)">
            <g style={{ transform: `translateY(${scrollOffset}px)`, transition }}>
              {[0, 1, 2, 3].map((rowIndex) => (
                <TableRow
                  key={rowIndex}
                  y={bodyY + rowHeight * rowIndex}
                  rowIndex={rowIndex}
                  state={isHovered ? (rowIndex === 2 ? "active" : rowIndex === 1 || rowIndex === 3 ? "idle" : "dim") : "idle"}
                />
              ))}
            </g>
          </g>

          {[1, 2].map((index) => (
            <line
              key={index}
              x1={tableX}
              y1={bodyY + rowHeight * index}
              x2={tableX + tableWidth}
              y2={bodyY + rowHeight * index}
              stroke="currentColor"
              className={config.dim.strokeClass}
              strokeWidth={1}
              style={{ opacity: 0.18, transition }}
            />
          ))}

          <rect
            x={tableX - 10}
            y={activeRowY - 4}
            width={tableWidth + 20}
            height={rowHeight + 8}
            rx={config.blockRx + 4}
            fill="currentColor"
            className={config.highlight.hoverClass}
            style={{
              opacity: isHovered ? 0.05 : 0,
              transition,
            }}
          />
          <rect
            x={tableX - 10}
            y={tableY - 10}
            width={tableWidth + 20}
            height={shellHeight + 20}
            rx={config.blockRx + 5}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            className={config.accentOutline.colorClass}
            style={{
              opacity: isHovered ? config.accentOutline.hoverOpacity : config.accentOutline.idleOpacity,
              transition,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
