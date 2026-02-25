"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Mask.module.css";

interface MaskContextValue {
  maskFilters: string[];
  clipPath?: string;
}

const MaskContext = React.createContext<MaskContextValue | undefined>(undefined);

const useMaskContext = () => {
  const context = React.useContext(MaskContext);
  if (!context) {
    throw new Error("Mask sub-components must be used within a Mask component");
  }
  return context;
};

export interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MaskRoot = React.forwardRef<HTMLDivElement, MaskProps>(
  ({ className, children, style, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const maskFilters: string[] = [];
    let clipPath: string | undefined;
    let hasFixedFade = false;
    let contentChildren: React.ReactNode[] = [];

    childArray.forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === MaskFade) {
          const fadeChild = child as React.ReactElement<MaskFadeProps>;
          if (fadeChild.props.fixed) hasFixedFade = true;
          maskFilters.push(generateFadeMask(fadeChild.props.direction, fadeChild.props.intensity, fadeChild.props.fixed));
        } else if (child.type === MaskClip) {
          const clipChild = child as React.ReactElement<MaskClipProps>;
          clipPath = clipChild.props.shape;
        } else {
          contentChildren.push(child);
        }
      } else {
        contentChildren.push(child);
      }
    });

    const contextValue: MaskContextValue = { maskFilters, clipPath };

    const maskStyles = {
      ...style,
      ...(hasFixedFade ? { maxHeight: "inherit", overflow: "hidden" as const } : {}),
      ...(clipPath ? { "--mask-clip-path": clipPath } as Record<string, string> : {}),
      ...(maskFilters.length > 0 ? {
        WebkitMaskImage: maskFilters.join(", "),
        maskImage: maskFilters.join(", "),
        WebkitMaskComposite: maskFilters.length > 1 ? "source-in" : "source-over",
        maskComposite: maskFilters.length > 1 ? "intersect" : "add",
      } : {}),
    } as React.CSSProperties;

    return (
      <MaskContext.Provider value={contextValue}>
        <div
          {...props}
          ref={ref}
          className={cn("mask", styles.mask, className)}
          style={maskStyles}
        >
          {contentChildren}
        </div>
      </MaskContext.Provider>
    );
  }
);

MaskRoot.displayName = "Mask";

export interface MaskGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS gradient string applied as the mask image */
  gradient: string;
}

const MaskGradient = React.forwardRef<HTMLDivElement, MaskGradientProps>(
  ({ className, gradient, style, children, ...props }, ref) => {
    const maskStyles = {
      ...style,
      "--mask-gradient": gradient,
    } as React.CSSProperties;

    return (
      <div
        {...props}
        ref={ref}
        className={cn(styles.mask, styles["mask-gradient"], className)}
        style={maskStyles}
      >
        {children}
      </div>
    );
  }
);

MaskGradient.displayName = "MaskGradient";

export interface MaskFadeProps {
  /** Edge of the container where the fade starts */
  direction?: "top" | "bottom" | "left" | "right";
  /** Controls the size of the fade — higher values produce a longer fade */
  intensity?: number;
  /** Uses percentage-based fade size instead of pixel-based, for fixed-height containers */
  fixed?: boolean;
}

const MaskFade: React.FC<MaskFadeProps> = () => null;
MaskFade.displayName = "MaskFade";

function generateFadeMask(direction: string = "bottom", intensity: number = 1, fixed?: boolean): string {
  const fadeSize = fixed ? `${Math.min(50, 15 * intensity)}%` : `${Math.min(200, 40 * intensity)}px`;
  const directionMap = {
    top: `linear-gradient(to bottom, transparent 0, black ${fadeSize})`,
    bottom: `linear-gradient(to bottom, black calc(100% - ${fadeSize}), transparent 100%)`,
    left: `linear-gradient(to right, transparent 0, black ${fadeSize})`,
    right: `linear-gradient(to right, black calc(100% - ${fadeSize}), transparent 100%)`,
  };
  return directionMap[direction as keyof typeof directionMap] || directionMap.bottom;
}


export interface MaskClipProps {
  /** CSS clip-path value applied to the container (e.g. polygon, circle) */
  shape: string;
}

const MaskClip: React.FC<MaskClipProps> = () => null;
MaskClip.displayName = "MaskClip";

const Mask = Object.assign(MaskRoot, {
  Gradient: MaskGradient,
  Fade: MaskFade,
  Clip: MaskClip,
});

export { Mask };
