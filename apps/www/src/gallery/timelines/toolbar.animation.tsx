"use client";

import config from "./config.json";

export function ToolbarAnimation() {
  const cx = 200;
  const cy = 150;
  const toolbarW = 210;
  const toolbarH = 36;
  const toolbarX = cx - toolbarW / 2;
  const toolbarY = cy - toolbarH / 2;
  const rx = config.blockRx;

  const btnCount = 5;
  const btnW = toolbarW / btnCount;
  // center x for each button
  const btn = (i: number) => toolbarX + i * btnW + btnW / 2;
  // separator after index 2 (between btn 3 and btn 4)
  const separatorX = toolbarX + 3 * btnW;

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">

          {/* Toolbar container */}
          <rect
            x={toolbarX}
            y={toolbarY}
            width={toolbarW}
            height={toolbarH}
            rx={rx}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={config.dim.fillOpacity}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            strokeOpacity={config.dim.strokeOpacity}
          />

          {/* Separator between groups */}
          <line
            x1={separatorX}
            y1={toolbarY + 7}
            x2={separatorX}
            y2={toolbarY + toolbarH - 7}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={1}
            strokeOpacity={config.dim.strokeOpacity}
          />

          {/* Btn 0 — Bold: two horizontal bars */}
          <rect x={btn(0) - 7} y={cy - 5} width={14} height={4} rx={2} fill="currentColor" className={config.highlight.idleClass} fillOpacity={0.55} />
          <rect x={btn(0) - 7} y={cy + 3} width={14} height={4} rx={2} fill="currentColor" className={config.highlight.idleClass} fillOpacity={0.55} />

          {/* Btn 1 — Italic: shifted bars to suggest slant */}
          <rect x={btn(1) - 3} y={cy - 6} width={10} height={3} rx={2} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />
          <rect x={btn(1) - 5} y={cy - 1} width={10} height={3} rx={2} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />
          <rect x={btn(1) - 7} y={cy + 4} width={10} height={3} rx={2} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />

          {/* Btn 2 — Align: three horizontal bars (text-align style) */}
          <rect x={btn(2) - 8} y={cy - 6} width={16} height={3} rx={2} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />
          <rect x={btn(2) - 8} y={cy - 1} width={12} height={3} rx={2} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />
          <rect x={btn(2) - 8} y={cy + 4} width={16} height={3} rx={2} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />

          {/* Btn 3 — Grid: 2x2 small squares */}
          <rect x={btn(3) - 8} y={cy - 7} width={6} height={6} rx={1} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />
          <rect x={btn(3) + 2} y={cy - 7} width={6} height={6} rx={1} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />
          <rect x={btn(3) - 8} y={cy + 1} width={6} height={6} rx={1} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />
          <rect x={btn(3) + 2} y={cy + 1} width={6} height={6} rx={1} fill="currentColor" className={config.dim.class} fillOpacity={0.45} />

          {/* Btn 4 — Share/Export: circle + outward arrow */}
          <circle
            cx={btn(4) - 2}
            cy={cy}
            r={6}
            fill="none"
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={2}
            strokeOpacity={0.4}
          />
          <line
            x1={btn(4) + 4}
            y1={cy}
            x2={btn(4) + 9}
            y2={cy}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={2}
            strokeOpacity={0.4}
            strokeLinecap="round"
          />
          <polyline
            points={`${btn(4) + 6},${cy - 3} ${btn(4) + 9},${cy} ${btn(4) + 6},${cy + 3}`}
            fill="none"
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={2}
            strokeOpacity={0.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
