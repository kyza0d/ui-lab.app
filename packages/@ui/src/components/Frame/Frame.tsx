"use client";

import React, { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import styles from "./Frame.module.css";

const frameVariants = cva("relative w-full group isolate", {
  variants: {
    variant: {
      default: "text-zinc-500",
      accent: "text-emerald-500",
    },
    padding: {
      none: "p-0",
      small: "p-2",
      medium: "p-4",
      large: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "medium",
  },
});

export interface FrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof frameVariants> {
  /** SVG path data for the notch or tab shape cut into the frame border */
  path?: string;
  /** Width of the path shape in pixels */
  pathWidth?: number;
  /** Which side of the frame the path shape appears on */
  side?: "top" | "bottom" | "left" | "right";
  /** Corner radius of the frame border in pixels */
  cornerRadius?: number;
  /** Fill color applied behind the frame content area */
  fill?: string;
  /** Whether the path shape indents into the frame or extends out from it */
  shapeMode?: "indent" | "extend";
  /** Stroke width of the frame border in pixels */
  borderWidth?: number;
  /** Color of the frame border stroke */
  borderColor?: string;
  /** Visual color style of the frame */
  variant?: "default" | "accent" | null;
  /** Internal padding preset */
  padding?: "none" | "small" | "medium" | "large" | null;
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  ({ children, variant, padding, className, style, path, pathWidth = 0, side = "top", cornerRadius, fill, shapeMode = "indent", borderWidth, borderColor = "var(--background-700)", ...props }, ref) => {
    const maskId = useId();
    const borderMaskId = `border-${maskId}`;
    const bgMaskId = `bg-${maskId}`;

    const borderStroke = borderWidth ?? 1;
    const halfStroke = borderStroke / 2;

    const positionMap = {
      top: { x: "50%", y: "0", rotate: 0 },
      bottom: { x: "50%", y: "100%", rotate: 180 },
      left: { x: "0", y: "50%", rotate: -90 },
      right: { x: "100%", y: "50%", rotate: 90 },
    };

    const { x, y, rotate } = positionMap[side];

    return (
      <div
        ref={ref}
        className={cn(frameVariants({ variant, padding }), styles.root, className)}
        style={{
          ...(cornerRadius !== undefined && { "--frame-radius": `${cornerRadius}px` }),
          ...(borderWidth !== undefined && { "--frame-stroke-width": `${borderWidth}px` }),
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
              <rect width="100%" height="100%" fill="white" className={styles.shape} />
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
              <rect width="100%" height="100%" fill="white" className={styles.shape} />
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
          {fill && (
            <rect
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              fill={fill}
              mask={`url(#${bgMaskId})`}
            />
          )}

          {/* Border Stroke Layer */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke={borderColor}
            strokeWidth={borderStroke}
            mask={`url(#${borderMaskId})`}
            className={cn(styles.shape, styles.stroke)}
          />

          {/* Layer 2: The Notch/Tab Path Stroke */}
          {path && (
            <svg x={x} y={y} overflow="visible">
              <g transform={`rotate(${rotate}) scale(1.010, 0.990)`}>
                <path
                  d={path}
                  fill="none"
                  stroke={borderColor}
                  strokeWidth={borderStroke}
                  transform={`translate(-${pathWidth / 2}, ${borderStroke / 2})`}
                  className={styles.stroke}
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
