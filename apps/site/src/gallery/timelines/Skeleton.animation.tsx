"use client";

import config from "./config.json";

export function SkeletonAnimation() {
  const x = 130;
  const y = 90;
  const w = 140;
  const imgSize = 70;
  const barRx = config.barRx;

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">

          {/* Image square */}
          <rect
            x={x}
            y={y}
            width={imgSize}
            height={imgSize}
            rx={config.blockRx}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={config.skeleton.mediaIdleOpacity}
          />

          {/* Bar 1 — full width */}
          <rect x={x} y={y + imgSize + 16} width={w} height={8} rx={barRx} fill="currentColor" className={config.highlight.idleClass} fillOpacity={config.skeleton.textLine1IdleOpacity} />

          {/* Bar 2 — 75% */}
          <rect x={x} y={y + imgSize + 32} width={w * 0.75} height={8} rx={barRx} fill="currentColor" className={config.highlight.idleClass} fillOpacity={config.skeleton.textLine2IdleOpacity} />

          {/* Bar 3 — 50% */}
          <rect x={x} y={y + imgSize + 48} width={w * 0.5} height={8} rx={barRx} fill="currentColor" className={config.dim.class} fillOpacity={config.skeleton.textLine2IdleOpacity} />

        </svg>
      </div>
    </div>
  );
}
