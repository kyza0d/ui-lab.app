"use client";

import config from "./config.json";

export function ImageAnimation() {
  const frameX = 78;
  const frameY = 62;
  const frameW = 244;
  const frameH = 176;
  const headerH = 30;
  const imageX = frameX + 18;
  const imageY = frameY + headerH + 16;
  const imageW = frameW - 36;
  const imageH = frameH - headerH - 34;

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <rect
            x={frameX}
            y={frameY}
            width={frameW}
            height={frameH}
            rx={config.blockRx}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={config.dim.fillOpacity}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            strokeOpacity={config.dim.strokeOpacity}
          />

          <line
            x1={frameX}
            y1={frameY + headerH}
            x2={frameX + frameW}
            y2={frameY + headerH}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={1.5}
            strokeOpacity={0.18}
          />

          {[0, 1, 2].map((dot) => (
            <circle
              key={dot}
              cx={frameX + 18 + dot * 12}
              cy={frameY + 15}
              r={3}
              fill="currentColor"
              className={dot === 0 ? config.highlight.idleClass : config.dim.class}
              fillOpacity={dot === 0 ? 0.5 : 0.22}
            />
          ))}

          <rect
            x={frameX + frameW - 72}
            y={frameY + 12}
            width={42}
            height={6}
            rx={3}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.18}
          />

          <rect
            x={imageX}
            y={imageY}
            width={imageW}
            height={imageH}
            rx={config.blockRx}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.08}
            stroke="currentColor"
            strokeWidth={2}
            strokeOpacity={0.16}
          />

          <circle
            cx={imageX + imageW - 42}
            cy={imageY + 34}
            r={13}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.42}
          />

          <path
            d={`M ${imageX + 16} ${imageY + imageH - 18} L ${imageX + 70} ${imageY + 62} L ${imageX + 116} ${imageY + imageH - 18} Z`}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.28}
          />
          <path
            d={`M ${imageX + 92} ${imageY + imageH - 18} L ${imageX + 142} ${imageY + 76} L ${imageX + imageW - 16} ${imageY + imageH - 18} Z`}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.2}
          />
          <path
            d={`M ${imageX + 16} ${imageY + imageH - 18} H ${imageX + imageW - 16}`}
            fill="none"
            stroke="currentColor"
            className={config.highlight.idleClass}
            strokeWidth={4}
            strokeOpacity={0.36}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
