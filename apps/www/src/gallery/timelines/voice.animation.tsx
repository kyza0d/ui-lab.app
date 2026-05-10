"use client";

import config from "./config.json";

const bars = [
  { x: 124, y: 134, height: 32, opacity: 0.2 },
  { x: 140, y: 122, height: 56, opacity: 0.32 },
  { x: 156, y: 104, height: 92, opacity: 0.48 },
  { x: 172, y: 118, height: 64, opacity: 0.36 },
  { x: 188, y: 88, height: 124, opacity: 0.62 },
  { x: 204, y: 108, height: 84, opacity: 0.44 },
  { x: 220, y: 96, height: 108, opacity: 0.54 },
  { x: 236, y: 126, height: 48, opacity: 0.28 },
  { x: 252, y: 138, height: 24, opacity: 0.18 },
  { x: 268, y: 130, height: 40, opacity: 0.24 },
];

export function VoiceAnimation() {
  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          {bars.map((bar) => (
            <rect
              key={bar.x}
              x={bar.x}
              y={bar.y}
              width={8}
              height={bar.height}
              rx={config.barRx}
              fill="currentColor"
              className={config.highlight.idleClass}
              fillOpacity={bar.opacity}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
