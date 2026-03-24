"use client";

import config from "./config.json";

export function AlertAnimation() {
  const cx = 200;
  const cy = 150;
  const alertW = 300;
  const alertH = 72;
  const alertX = cx - alertW / 2;
  const alertY = cy - alertH / 2;
  const rx = config.blockRx;

  const iconCx = alertX + 22;
  const iconCy = alertY + 22;

  // Action buttons bottom-right
  const btnH = 18;
  const btnY = alertY + alertH - btnH - 10;
  const btnW = 52;
  const btn2X = alertX + alertW - 12 - btnW;
  const btn1X = btn2X - 8 - btnW;

  return (
    <div className="bg-background-950 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="relative w-full">
        <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 overflow-visible" aria-hidden="true">

          {/* Alert container */}
          <rect
            x={alertX}
            y={alertY}
            width={alertW}
            height={alertH}
            rx={rx}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={config.dim.fillOpacity}
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            strokeOpacity={config.dim.strokeOpacity}
          />

          {/* Icon: circle with exclamation */}
          <circle
            cx={iconCx}
            cy={iconCy}
            r={9}
            fill="none"
            stroke="currentColor"
            className={config.highlight.idleClass}
            strokeWidth={1.5}
            strokeOpacity={0.55}
          />
          {/* Exclamation dot */}
          <circle
            cx={iconCx}
            cy={iconCy + 4}
            r={1.5}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.55}
          />
          {/* Exclamation bar */}
          <line
            x1={iconCx}
            y1={iconCy - 4}
            x2={iconCx}
            y2={iconCy + 1}
            stroke="currentColor"
            className={config.highlight.idleClass}
            strokeWidth={2}
            strokeOpacity={0.55}
            strokeLinecap="round"
          />

          {/* Title bar */}
          <rect
            x={alertX + 38}
            y={alertY + 13}
            width={90}
            height={6}
            rx={3}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.4}
          />

          {/* Description lines */}
          <rect
            x={alertX + 38}
            y={alertY + 26}
            width={150}
            height={4}
            rx={2}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.35}
          />
          <rect
            x={alertX + 38}
            y={alertY + 34}
            width={110}
            height={4}
            rx={2}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.25}
          />

          {/* Action button 1 — ghost/secondary */}
          <rect
            x={btn1X}
            y={btnY}
            width={btnW}
            height={btnH}
            rx={5}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={config.dim.fillOpacity}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={config.dim.strokeOpacity}
          />
          <rect
            x={btn1X + 10}
            y={btnY + 7}
            width={32}
            height={4}
            rx={2}
            fill="currentColor"
            className={config.dim.class}
            fillOpacity={0.3}
          />

          {/* Action button 2 — primary */}
          <rect
            x={btn2X}
            y={btnY}
            width={btnW}
            height={btnH}
            rx={5}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.18}
            stroke="currentColor"
            strokeWidth={1}
            strokeOpacity={0.3}
          />
          <rect
            x={btn2X + 10}
            y={btnY + 7}
            width={32}
            height={4}
            rx={2}
            fill="currentColor"
            className={config.highlight.idleClass}
            fillOpacity={0.5}
          />
        </svg>
      </div>
    </div>
  );
}
