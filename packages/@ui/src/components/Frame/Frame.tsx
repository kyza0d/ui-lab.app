"use client";

import React, { useId } from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Frame.module.css";

interface FrameStyleSlots {
  root?: StyleValue;
}

type FrameStylesProp = StylesProp<FrameStyleSlots>;

const resolveFrameBaseStyles = createStylesResolver(['root'] as const);

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** SVG path data for the notch or tab shape cut into the frame border */
  path?: string;
  /** Width of the path shape in pixels */
  pathWidth?: number;
  /** Which side of the frame the path shape appears on */
  side?: "top" | "bottom" | "left" | "right";
  /** Whether the path shape indents into the frame or extends out from it */
  shapeMode?: "indent" | "extend";
  /** Controls the line style of the frame border and notch stroke */
  pathStroke?: "solid" | "dashed" | "dotted";
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: FrameStylesProp;
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  ({ children, className, styles, style, path, pathWidth = 0, side = "top", shapeMode = "indent", pathStroke = "solid", ...props }, ref) => {
    const maskId = useId();
    const borderMaskId = `border-${maskId}`;
    const bgMaskId = `bg-${maskId}`;

    const borderStroke = 1;

    const strokeDashProps: { strokeDasharray?: string; strokeLinecap?: React.SVGAttributes<SVGElement>["strokeLinecap"] } =
      pathStroke === "dashed"
        ? { strokeDasharray: "8 4" }
        : pathStroke === "dotted"
          ? { strokeDasharray: "2 4", strokeLinecap: "round" }
          : {};

    const positionMap = {
      top: { x: "50%", y: "0", rotate: 0 },
      bottom: { x: "50%", y: "100%", rotate: 180 },
      left: { x: "0", y: "50%", rotate: -90 },
      right: { x: "100%", y: "50%", rotate: 90 },
    };

    const { x, y, rotate } = positionMap[side];

    const resolved = resolveFrameBaseStyles(styles);

    return (
      <div
        ref={ref}
        className={cn("relative w-full group isolate", css.root, className, resolved.root)}
        style={{
          maskImage: path && shapeMode === "indent" ? `url(#${maskId})` : undefined,
          WebkitMaskImage: path && shapeMode === "indent" ? `url(#${maskId})` : undefined,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Mask for the Content/Background: Cuts the path shape (curvature) */}
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="white" className={css.shape} />
              {path && (
                <svg x={x} y={y} overflow="visible">
                  <g transform={`rotate(${rotate}) scale(1.010, 0.990)`}>
                    <path
                      d={path}
                      fill="black"
                      transform={`translate(-${pathWidth / 2}, ${borderStroke / 2})`}
                    />
                  </g>
                </svg>
              )}
            </mask>

            {/* Mask for the Border: Cuts a clean gap for the stroke connection */}
            <mask id={borderMaskId}>
              <rect x="-10%" y="-10%" width="120%" height="120%" fill="white" />
              {path && (
                <svg x={x} y={y} overflow="visible">
                  <g transform={`rotate(${rotate})`}>
                    <rect
                      x={-pathWidth / 2}
                      y={-borderStroke * 2}
                      width={pathWidth}
                      height={borderStroke * 4}
                      fill="black"
                    />
                  </g>
                </svg>
              )}
            </mask>

            {/* Mask for the Background Fill (Union or Difference) */}
            <mask id={bgMaskId}>
              <rect width="100%" height="100%" fill="white" className={css.shape} />
              {path && (
                <svg x={x} y={y} overflow="visible">
                  <g transform={`rotate(${rotate}) scale(1.010, 0.990)`}>
                    <path
                      d={path}
                      fill={shapeMode === "extend" ? "white" : "black"}
                      transform={`translate(-${pathWidth / 2}, ${borderStroke / 2})`}
                    />
                  </g>
                </svg>
              )}
            </mask>
          </defs>

          {/* Background Fill Layer */}
          <rect
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            fill="var(--frame-fill, transparent)"
            mask={`url(#${bgMaskId})`}
          />

          {/* Border Stroke Layer */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="var(--frame-stroke-color, var(--background-700))"
            strokeWidth={borderStroke}
            mask={`url(#${borderMaskId})`}
            className={cn(css.shape, css.stroke)}
            {...strokeDashProps}
          />

          {/* Layer 2: The Notch/Tab Path Stroke */}
          {path && (
            <svg x={x} y={y} overflow="visible">
              <g transform={`rotate(${rotate}) scale(1.010, 1)`}>
                <path
                  d={path}
                  fill="none"
                  stroke="var(--frame-stroke-color, var(--background-700))"
                  strokeWidth={borderStroke}
                  transform={`translate(-${pathWidth / 2}, 0)`}
                  className={css.stroke}
                  {...strokeDashProps}
                />
              </g>
            </svg>
          )}
        </svg>

        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Frame.displayName = "Frame";

export { Frame };
