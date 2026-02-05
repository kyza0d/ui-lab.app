"use client";

import React, { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
  path?: string;
  pathWidth?: number;
  side?: "top" | "bottom" | "left" | "right";
  cornerRadius?: number;
  fill?: string;
  shapeMode?: "indent" | "extend";
  borderWidth?: number;
  borderColor?: string;
}

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  ({ children, variant, padding, className, style, path, pathWidth = 0, side = "top", cornerRadius = 24, fill, shapeMode = "indent", borderWidth, borderColor = "var(--background-700)", ...props }, ref) => {
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
        className={cn(frameVariants({ variant, padding }), className)}
        style={{
          maskImage: path && shapeMode === "indent" ? `url(#${maskId})` : undefined,
          WebkitMaskImage: path && shapeMode === "indent" ? `url(#${maskId})` : undefined,
          ...style,
        }}
        {...props}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Mask for the Content/Background: Cuts the path shape (curvature) */}
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="white" rx={cornerRadius} />
              {path && (
                <svg x={x} y={y} overflow="visible">
                  <g transform={`rotate(${rotate})`}>
                    <path
                      d={path}
                      fill="black"
                      transform={`translate(-${pathWidth / 2}, 0)`}
                    />
                  </g>
                </svg>
              )}
            </mask>

            {/* Mask for the Border: Cuts a clean gap for the stroke connection */}
            <mask id={borderMaskId}>
              <rect width="100%" height="100%" fill="white" rx={cornerRadius} />
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
              <rect width="100%" height="100%" fill="white" rx={cornerRadius} />
              {path && (
                <svg x={x} y={y} overflow="visible">
                  <g transform={`rotate(${rotate})`}>
                    <path
                      d={path}
                      fill={shapeMode === "extend" ? "white" : "black"}
                      transform={`translate(-${pathWidth / 2}, 0.010)`}
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
            rx={cornerRadius}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderStroke}
            mask={`url(#${borderMaskId})`}
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
