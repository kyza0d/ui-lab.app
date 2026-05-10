"use client";

import config from "./config.json";

export function IconAnimation() {
  const tileSize = 48;
  const gap = 14;
  const gridW = tileSize * 3 + gap * 2;
  const gridH = tileSize * 2 + gap;
  const startX = 200 - gridW / 2;
  const startY = 150 - gridH / 2;
  const glyphStroke = 3;

  const tile = (index: number) => {
    const col = index % 3;
    const row = Math.floor(index / 3);

    return {
      x: startX + col * (tileSize + gap),
      y: startY + row * (tileSize + gap),
      cx: startX + col * (tileSize + gap) + tileSize / 2,
      cy: startY + row * (tileSize + gap) + tileSize / 2,
    };
  };

  const selected = tile(1);

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isSelected = index === 1;
            const item = tile(index);

            return (
              <rect
                key={index}
                x={item.x}
                y={item.y}
                width={tileSize}
                height={tileSize}
                rx={config.blockRx}
                fill="currentColor"
                className={isSelected ? config.highlight.idleClass : config.dim.class}
                fillOpacity={isSelected ? 0.18 : config.dim.fillOpacity}
                stroke="currentColor"
                strokeWidth={isSelected ? 2.5 : config.strokeWidth}
                strokeOpacity={isSelected ? 0.38 : config.dim.strokeOpacity}
              />
            );
          })}

          <circle
            cx={tile(0).cx}
            cy={tile(0).cy}
            r={10}
            fill="none"
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={glyphStroke}
            strokeOpacity={0.42}
          />

          <path
            d={`M ${selected.cx} ${selected.cy - 14} L ${selected.cx + 4} ${selected.cy - 4} L ${selected.cx + 14} ${selected.cy - 4} L ${selected.cx + 6} ${selected.cy + 3} L ${selected.cx + 9} ${selected.cy + 14} L ${selected.cx} ${selected.cy + 8} L ${selected.cx - 9} ${selected.cy + 14} L ${selected.cx - 6} ${selected.cy + 3} L ${selected.cx - 14} ${selected.cy - 4} L ${selected.cx - 4} ${selected.cy - 4} Z`}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.52}
          />

          <line
            x1={tile(2).cx - 11}
            y1={tile(2).cy}
            x2={tile(2).cx + 11}
            y2={tile(2).cy}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={glyphStroke}
            strokeOpacity={0.42}
            strokeLinecap="round"
          />
          <line
            x1={tile(2).cx}
            y1={tile(2).cy - 11}
            x2={tile(2).cx}
            y2={tile(2).cy + 11}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={glyphStroke}
            strokeOpacity={0.42}
            strokeLinecap="round"
          />

          <polyline
            points={`${tile(3).cx - 4},${tile(3).cy - 11} ${tile(3).cx + 8},${tile(3).cy} ${tile(3).cx - 4},${tile(3).cy + 11}`}
            fill="none"
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={glyphStroke}
            strokeOpacity={0.42}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <rect
            x={tile(4).cx - 10}
            y={tile(4).cy - 10}
            width={20}
            height={20}
            rx={config.barRx}
            fill="none"
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={glyphStroke}
            strokeOpacity={0.42}
          />

          <path
            d={`M ${tile(5).cx} ${tile(5).cy - 13} L ${tile(5).cx + 13} ${tile(5).cy} L ${tile(5).cx} ${tile(5).cy + 13} L ${tile(5).cx - 13} ${tile(5).cy} Z`}
            fill="none"
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={glyphStroke}
            strokeOpacity={0.42}
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
