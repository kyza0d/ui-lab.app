import React from "react";
import type { EasingKey } from "../../utils/easing";
import { EASING_FUNCTIONS } from "../../utils/easing";

export interface EasingPreviewProps {
  /** The easing function key to visualize */
  easing: EasingKey;
  /** Size of the SVG preview graphic */
  size?: "sm" | "md";
  /** Additional CSS class names */
  className?: string;
}

export const EasingPreview = React.forwardRef<SVGSVGElement, EasingPreviewProps>(
  ({ easing, size = "sm", className = "" }, ref) => {
    const easingData = EASING_FUNCTIONS[easing];
    const match = easingData.bezier.match(
      /cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/
    );

    if (!match) {
      return null;
    }

    const [, x1Str, y1Str, x2Str, y2Str] = match;
    const x1 = parseFloat(x1Str);
    const y1 = parseFloat(y1Str);
    const x2 = parseFloat(x2Str);
    const y2 = parseFloat(y2Str);

    const svgSize = size === "sm" ? 24 : 32;
    const padding = 2;
    const graphWidth = svgSize - padding * 2;
    const graphHeight = svgSize - padding * 2;

    const startX = padding;
    const startY = padding + graphHeight;
    const endX = padding + graphWidth;
    const endY = padding;

    const cp1X = startX + x1 * graphWidth;
    const cp1Y = startY - y1 * graphHeight;
    const cp2X = startX + x2 * graphWidth;
    const cp2Y = startY - y2 * graphHeight;

    const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

    return (
      <svg
        ref={ref}
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className={className}
        style={{
          display: "inline-block",
        }}
        aria-label={`${easingData.name} easing curve`}
      >
        <g>
          <rect
            x={padding}
            y={padding}
            width={graphWidth}
            height={graphHeight}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <path
            d={pathData}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={startX}
            cy={startY}
            r="0.8"
            fill="currentColor"
            opacity="0.6"
          />
          <circle
            cx={endX}
            cy={endY}
            r="0.8"
            fill="currentColor"
            opacity="0.6"
          />
        </g>
      </svg>
    );
  }
);

EasingPreview.displayName = "EasingPreview";
