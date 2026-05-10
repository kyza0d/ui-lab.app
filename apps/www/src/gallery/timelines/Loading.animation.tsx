"use client";

import config from "./config.json";

export function LoadingAnimation() {
  const cx = 200;
  const cy = 150;
  const r = 36;
  const strokeW = 10;

  // 70% arc: starting at -90° (top), sweeping 252° clockwise
  const startAngleDeg = -90;
  const sweepDeg = 252;
  const endAngleDeg = startAngleDeg + sweepDeg;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const startX = cx + r * Math.cos(toRad(startAngleDeg));
  const startY = cy + r * Math.sin(toRad(startAngleDeg));
  const endX = cx + r * Math.cos(toRad(endAngleDeg));
  const endY = cy + r * Math.sin(toRad(endAngleDeg));

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">

          {/* Full dim track ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={strokeW}
            strokeOpacity={config.dim.strokeOpacity}
          />

          {/* Half arc — highlighted, rounded ends */}
          <path
            d={`M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`}
            fill="none"
            stroke="currentColor"
            className={config.highlight.idleClass}
            strokeWidth={strokeW}
            strokeOpacity={0.55}
            strokeLinecap="round"
          />

        </svg>
      </div>
    </div>
  );
}
