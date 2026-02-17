import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";
import { GroupContext } from "../Group/Group";

type Orientation = "horizontal" | "vertical";
type Size = "sm" | "md" | "lg";

const DASHED_DIMENSIONS = {
  sm: { thickness: 1, dashLength: 8, gapLength: 4 },
  md: { thickness: 2, dashLength: 8, gapLength: 4 },
  lg: { thickness: 4, dashLength: 10, gapLength: 6 },
} as const;

const DOTTED_DIMENSIONS = {
  sm: { thickness: 1, radius: 0.5, spacing: 3 },
  md: { thickness: 2, radius: 1, spacing: 6 },
  lg: { thickness: 4, radius: 2, spacing: 12 },
} as const;

function getDashedMaskSvg(orientation: Orientation, size: Size): string {
  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size];
  const totalLength = dashLength + gapLength;

  if (orientation === "horizontal") {
    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;
  }
  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;
}

function getDottedMaskSvg(orientation: Orientation, size: Size): string {
  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size];

  if (orientation === "horizontal") {
    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;
  }
  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;
}

// --- CVA Variants ---

const dividerVariants = cva("shrink-0", {
  variants: {
    variant: {
      solid: "",
      dashed: "",
      dotted: "",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "self-stretch",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    spacing: {
      none: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    // Size + Orientation → dimensions
    { orientation: "horizontal", size: "sm", class: "h-px" },
    { orientation: "vertical", size: "sm", class: "w-px" },
    { orientation: "horizontal", size: "md", class: "h-0.5" },
    { orientation: "vertical", size: "md", class: "w-0.5" },
    { orientation: "horizontal", size: "lg", class: "h-1" },
    { orientation: "vertical", size: "lg", class: "w-1" },
    // Spacing + Orientation → margins
    { orientation: "horizontal", spacing: "none", class: "my-0" },
    { orientation: "vertical", spacing: "none", class: "mx-0" },
    { orientation: "horizontal", spacing: "sm", class: "my-1" },
    { orientation: "vertical", spacing: "sm", class: "mx-1" },
    { orientation: "horizontal", spacing: "md", class: "my-2" },
    { orientation: "vertical", spacing: "md", class: "mx-2" },
    { orientation: "horizontal", spacing: "lg", class: "my-4" },
    { orientation: "vertical", spacing: "lg", class: "mx-4" },
  ],
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
    size: "md",
    spacing: "md",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof dividerVariants> {
  variant?: "solid" | "dashed" | "dotted";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  spacing?: "none" | "sm" | "md" | "lg";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      variant = "solid",
      orientation,
      size = "md",
      spacing,
      style,
      ...props
    },
    ref,
  ) => {
    const groupContext = React.useContext(GroupContext);

    const resolvedOrientation = (() => {
      if (orientation !== undefined) return orientation;
      if (!groupContext) return "horizontal";
      return groupContext.groupOrientation === "horizontal" ? "vertical" : "horizontal";
    })() as Orientation;

    const resolvedSpacing = (() => {
      if (spacing !== undefined) return spacing;
      if (!groupContext) return "md";
      return "none";
    })();
    const getMaskStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        backgroundColor: "var(--color-background-700)",
      };

      if (variant === "solid") {
        return baseStyles;
      }

      const svgDataUri =
        variant === "dashed"
          ? getDashedMaskSvg(resolvedOrientation, size)
          : getDottedMaskSvg(resolvedOrientation, size);

      const maskRepeat = resolvedOrientation === "horizontal" ? "repeat-x" : "repeat-y";
      const encodedSvg = `url("data:image/svg+xml,${svgDataUri}")`;

      return {
        ...baseStyles,
        WebkitMaskImage: encodedSvg,
        maskImage: encodedSvg,
        WebkitMaskRepeat: maskRepeat,
        maskRepeat: maskRepeat,
      } as React.CSSProperties;
    };

    return (
      <div
        ref={ref}
        className={cn(
          dividerVariants({ variant, orientation: resolvedOrientation, size, spacing: resolvedSpacing }),
          'divider', className,
        )}
        style={{ ...getMaskStyles(), ...style }}
        role="separator"
        aria-orientation={resolvedOrientation}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
