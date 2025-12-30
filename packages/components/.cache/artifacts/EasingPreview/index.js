// src/components/EasingPreview/EasingPreview.tsx
import React from "react";

// src/utils/easing.ts
var EASING_FUNCTIONS = {
  smoothSettle: {
    name: "Smooth Settle",
    bezier: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    cssVar: "var(--ease-smooth-settle)",
    description: "Gentle ease with subtle deceleration. Perfect for hovering and state changes."
  },
  snappyPop: {
    name: "Snappy Pop",
    bezier: "cubic-bezier(0.34, 1.56, 0.64, 1.00)",
    cssVar: "var(--ease-snappy-pop)",
    description: "Bouncy easing with overshoot for tactile, responsive feedback on clicks."
  },
  gentleEase: {
    name: "Gentle Ease",
    bezier: "cubic-bezier(0.43, 0.13, 0.23, 0.96)",
    cssVar: "var(--ease-gentle-ease)",
    description: "Smooth ease-in-out perfect for focus transitions and subtle interactions."
  }
};
var EASING_KEYS = Object.keys(EASING_FUNCTIONS);

// src/components/EasingPreview/EasingPreview.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var EasingPreview = React.forwardRef(
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
    return /* @__PURE__ */ jsx(
      "svg",
      {
        ref,
        width: svgSize,
        height: svgSize,
        viewBox: `0 0 ${svgSize} ${svgSize}`,
        className,
        style: {
          display: "inline-block"
        },
        "aria-label": `${easingData.name} easing curve`,
        children: /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "rect",
            {
              x: padding,
              y: padding,
              width: graphWidth,
              height: graphHeight,
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "0.5",
              opacity: "0.2"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: pathData,
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.2",
              vectorEffect: "non-scaling-stroke"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: startX,
              cy: startY,
              r: "0.8",
              fill: "currentColor",
              opacity: "0.6"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: endX,
              cy: endY,
              r: "0.8",
              fill: "currentColor",
              opacity: "0.6"
            }
          )
        ] })
      }
    );
  }
);
EasingPreview.displayName = "EasingPreview";
export {
  EasingPreview
};
