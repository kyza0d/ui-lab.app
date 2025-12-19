import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const dividerVariants = cva("shrink-0", {
  variants: {
    variant: {
      solid: "",
      dashed: "",
      dotted: "",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    color: {
      default: "",
      muted: "",
      subtle: "",
    },
    spacing: {
      none: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-px",
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "w-px self-stretch",
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-0.5",
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-0.5 self-stretch",
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-1",
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-1 self-stretch",
    },
    {
      orientation: "horizontal",
      spacing: "none",
      class: "my-0",
    },
    {
      orientation: "vertical",
      spacing: "none",
      class: "mx-0",
    },
    {
      orientation: "horizontal",
      spacing: "sm",
      class: "my-1",
    },
    {
      orientation: "vertical",
      spacing: "sm",
    },
    {
      orientation: "horizontal",
      spacing: "md",
      class: "my-1",
    },
    {
      orientation: "vertical",
      spacing: "md",
      class: "mx-1",
    },
    {
      orientation: "horizontal",
      spacing: "lg",
      class: "my-1",
    },
    {
      orientation: "vertical",
      spacing: "lg",
      class: "mx-1",
    },

    // --- Solid Variant & Color Compounds ---
    {
      variant: "solid",
      orientation: "horizontal",
      color: "default",
      class: "border-t-background-700 border-t",
    },
    {
      variant: "solid",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-background-500 border-t",
    },
    {
      variant: "solid",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-background-400 border-t",
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "default",
      class: "border-l-background-700 border-l",
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "muted",
      class: "border-l-background-500 border-l",
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-background-400 border-l",
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "default",
      class: "border-t-dashed border-t-background-600 border-t",
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-dashed border-t-background-500 border-t",
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-dashed border-t-background-400 border-t",
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "default",
      class: "border-l-dashed border-l-background-600 border-l",
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "muted",
      class: "border-l-dashed border-l-background-500 border-l",
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-dashed border-l-background-400 border-l",
    },

    // --- Dotted Variant ---
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "default",
      class: "border-t-dotted border-t-background-600 border-t",
    },
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-dotted border-t-background-500 border-t",
    },
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-dotted border-t-background-400 border-t",
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "default",
      class: "border-l-dotted border-l-background-600 border-l",
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "muted",
      class: "border-l-dotted border-l-background-500 border-l",
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-dotted border-l-background-400 border-l",
    },
  ],
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
    size: "md",
    color: "default",
    spacing: "md",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof dividerVariants> {
  variant?: "solid" | "dashed" | "dotted";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  color?: "default" | "muted" | "subtle";
  spacing?: "none" | "sm" | "md" | "lg";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      variant,
      orientation,
      size,
      // Destructure 'color'
      color,
      spacing,
      style,
      ...props
    },
    ref
  ) => {
    // 3. The logic is greatly simplified as cva handles all conditional styling.
    const baseClasses = cn(
      dividerVariants({
        variant,
        orientation,
        size,
        color, // Pass the 'color' prop
        spacing,
        className,
      })
    );

    // Ensure style is an object for maintainability (though TS should catch string styles)
    const styleObject = typeof style === "string" ? {} : style;

    return (
      <div
        ref={ref}
        className={baseClasses}
        style={styleObject}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
