"use client";

import config from "./config.json";

export function VideoAnimation() {
  const frameX = 76;
  const frameY = 72;
  const frameW = 248;
  const frameH = 156;
  const mediaPad = 14;
  const controlsH = 34;
  const mediaX = frameX + mediaPad;
  const mediaY = frameY + mediaPad;
  const mediaW = frameW - mediaPad * 2;
  const mediaH = frameH - controlsH - mediaPad - 8;
  const controlsY = frameY + frameH - controlsH;
  const railX = frameX + 54;
  const railY = controlsY + 17;
  const railW = frameW - 84;
  const playCx = mediaX + mediaW / 2;
  const playCy = mediaY + mediaH / 2;

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

          <rect
            x={mediaX}
            y={mediaY}
            width={mediaW}
            height={mediaH}
            rx={config.blockRx}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.08}
            stroke="currentColor"
            strokeWidth={2}
            strokeOpacity={0.16}
          />

          <path
            d={`M ${playCx - 10} ${playCy - 15} L ${playCx - 10} ${playCy + 15} L ${playCx + 16} ${playCy} Z`}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.56}
          />

          <line
            x1={frameX}
            y1={controlsY}
            x2={frameX + frameW}
            y2={controlsY}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={1.5}
            strokeOpacity={0.18}
          />

          <circle
            cx={frameX + 24}
            cy={railY}
            r={5}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.44}
          />
          <rect
            x={railX}
            y={railY - 3}
            width={railW}
            height={6}
            rx={3}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.18}
          />
          <rect
            x={railX}
            y={railY - 3}
            width={railW * 0.42}
            height={6}
            rx={3}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.5}
          />

          {[0, 1, 2].map((dot) => (
            <circle
              key={dot}
              cx={frameX + frameW - 42 + dot * 11}
              cy={railY}
              r={3}
              fill="currentColor"
              className={config.dim.class}
              fillOpacity={0.24}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
