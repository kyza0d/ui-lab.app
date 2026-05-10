"use client";

import config from "./config.json";

export function ChartAnimation() {
  const chartX = 86;
  const chartY = 72;
  const chartW = 228;
  const chartH = 150;
  const plotX = chartX + 28;
  const plotY = chartY + 30;
  const plotW = chartW - 48;
  const plotH = chartH - 54;
  const baselineY = plotY + plotH;
  const barW = 16;
  const barGap = 12;
  const barHeights = [42, 68, 54, 86, 62, 76];

  const barX = (index: number) => plotX + 18 + index * (barW + barGap);
  const barY = (height: number) => baselineY - height;

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">
          <rect
            x={chartX}
            y={chartY}
            width={chartW}
            height={chartH}
            rx={config.blockRx}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={config.dim.fillOpacity}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            strokeOpacity={config.dim.strokeOpacity}
          />

          <rect
            x={chartX + 18}
            y={chartY + 16}
            width={66}
            height={6}
            rx={3}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.45}
          />
          <rect
            x={chartX + chartW - 68}
            y={chartY + 16}
            width={18}
            height={6}
            rx={3}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.28}
          />
          <rect
            x={chartX + chartW - 42}
            y={chartY + 16}
            width={20}
            height={6}
            rx={3}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.18}
          />

          {[0, 1, 2].map((line) => (
            <line
              key={line}
              x1={plotX}
              y1={plotY + line * 32}
              x2={plotX + plotW}
              y2={plotY + line * 32}
              stroke="currentColor"
              className={config.dim.class}
              strokeWidth={1}
              strokeOpacity={0.18}
              strokeDasharray="4 6"
            />
          ))}

          <line
            x1={plotX}
            y1={baselineY}
            x2={plotX + plotW}
            y2={baselineY}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={1.5}
            strokeOpacity={0.3}
          />
          <line
            x1={plotX}
            y1={plotY}
            x2={plotX}
            y2={baselineY}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={1.5}
            strokeOpacity={0.25}
          />

          {barHeights.map((height, index) => (
            <rect
              key={height}
              x={barX(index)}
              y={barY(height)}
              width={barW}
              height={height}
              rx={config.barRx}
              fill="currentColor"
              className={index === 3 ? config.highlight.idleClass : config.dim.class}
              fillOpacity={index === 3 ? 0.46 : 0.28}
            />
          ))}

          <polyline
            points={`${barX(0) + barW / 2},${barY(38)} ${barX(1) + barW / 2},${barY(58)} ${barX(2) + barW / 2},${barY(50)} ${barX(3) + barW / 2},${barY(78)} ${barX(4) + barW / 2},${barY(66)} ${barX(5) + barW / 2},${barY(84)}`}
            fill="none"
            stroke="currentColor"
            className={config.highlight.idleClass}
            strokeWidth={3}
            strokeOpacity={0.42}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <circle
              key={index}
              cx={barX(index) + barW / 2}
              cy={barY([38, 58, 50, 78, 66, 84][index])}
              r={3}
              fill="currentColor"
              className={config.highlight.idleClass}
              fillOpacity={0.55}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
