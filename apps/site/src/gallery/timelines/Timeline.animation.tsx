"use client";

import config from "./config.json";

export function TimelineAnimation() {
  const cx = 200;
  const lineX = cx - 60;
  const events = [95, 150, 205];

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">

          {/* Vertical spine */}
          <line
            x1={lineX}
            y1={events[0] - 20}
            x2={lineX}
            y2={events[events.length - 1] + 20}
            stroke="currentColor"
            className={config.dim.class}
            strokeWidth={config.strokeWidth}
            strokeOpacity={config.dim.strokeOpacity}
          />

          {/* Event nodes and content bars */}
          {events.map((y, i) => {
            const isHighlighted = i === 1;
            const colorClass = isHighlighted ? config.highlight.idleClass : config.dim.class;
            const fillOp = isHighlighted ? 0.55 : config.dim.fillOpacity * 3;
            const strokeOp = isHighlighted ? 0.55 : config.dim.strokeOpacity;
            const barW1 = [80, 100, 60][i];
            const barW2 = [60, 70, 45][i];

            return (
              <g key={y}>
                {/* Node circle */}
                <circle
                  cx={lineX}
                  cy={y}
                  r={5}
                  fill="currentColor"
                  className={colorClass}
                  fillOpacity={fillOp}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeOpacity={strokeOp}
                />

                {/* Connector tick */}
                <line
                  x1={lineX + 5}
                  y1={y}
                  x2={lineX + 14}
                  y2={y}
                  stroke="currentColor"
                  className={config.dim.class}
                  strokeWidth={1}
                  strokeOpacity={config.dim.strokeOpacity}
                />

                {/* Title bar */}
                <rect
                  x={lineX + 18}
                  y={y - 8}
                  width={barW1}
                  height={5}
                  rx={config.barRx}
                  fill="currentColor"
                  className={colorClass}
                  fillOpacity={fillOp}
                />

                {/* Subtitle bar */}
                <rect
                  x={lineX + 18}
                  y={y + 1}
                  width={barW2}
                  height={3}
                  rx={config.barRx}
                  fill="currentColor"
                  className={config.dim.class}
                  fillOpacity={config.dim.fillOpacity * 2.5}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
