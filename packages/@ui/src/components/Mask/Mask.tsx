"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Mask.module.css";

type MaskVariant = "x" | "y" | "gradient";

export interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MaskVariant;
  gradient?: string;
}

const variantMap = {
  x: styles["mask-x"],
  y: styles["mask-y"],
  gradient: styles["mask-gradient"],
} as const;

const Mask = React.forwardRef<HTMLDivElement, MaskProps>(
  ({ className, variant = "y", gradient, style, children, ...props }, ref) => {
    const maskStyles = gradient
      ? { ...style, "--mask-gradient": gradient } as React.CSSProperties
      : style;

    return (
      <div
        {...props}
        ref={ref}
        className={cn("mask", styles.mask, variantMap[variant], className)}
        data-variant={variant}
        style={maskStyles}
      >
        {children}
      </div>
    );
  }
);

Mask.displayName = "Mask";

export { Mask };
