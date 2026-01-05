import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./Frame.module.css";

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "accent" | "subtle";
  padding?: "none" | "small" | "medium" | "large";
  pathBuilder?: (width: number, height: number) => string;
  notchSize?: number;
}

const defaultPathBuilder = (width: number, height: number) => {
  return `M 0,0 L ${width},0 L ${width},${height} L 0,${height} Z`;
};

const Frame = React.forwardRef<HTMLDivElement, FrameProps>(
  ({ children, variant = "default", padding = "medium", pathBuilder = defaultPathBuilder, notchSize = 0, className = "", style, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const path = React.useMemo(() => {
      if (dimensions.width === 0 || dimensions.height === 0) return "";
      return pathBuilder(dimensions.width, dimensions.height);
    }, [pathBuilder, dimensions]);

    useLayoutEffect(() => {
      if (!internalRef.current) return;

      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
          setDimensions({ width, height });
        }
      });

      observer.observe(internalRef.current);
      return () => observer.disconnect();
    }, []);

    const frameClassName = [
      styles.frame,
      styles[`variant-${variant}`],
      styles[`padding-${padding}`],
      className
    ].filter(Boolean).join(" ");

    return (
      <div
        ref={internalRef}
        className={frameClassName}
        style={{
          ...style,
          "--frame-notch-size": `${notchSize}px`,
          "--frame-path": path ? `'${path}'` : undefined,
          background: style?.background ?? "var(--frame-bg, transparent)",
        } as React.CSSProperties}
        {...props}
      >
        {/* Background layer: Clipped to the path */}
        <div
          className={styles.background}
          style={{ clipPath: path ? `path('${path}')` : undefined }}
        />

        {/* SVG Overlay for stroke */}
        <svg
          className={styles.svgOverlay}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={path}
            className={styles.pathStroke}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Content layer: Now also clipped to prevent overflow visibility */}
        <div
          className={styles.content}
          style={{ clipPath: path ? `path('${path}')` : undefined }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Frame.displayName = "Frame";
export default Frame;
