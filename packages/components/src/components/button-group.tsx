"use client"

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Divider } from "./divider"

const buttonGroupVariants = cva(
  "flex w-fit items-center justify-between rounded-lg",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      spacing: {
        tight: "gap-0",
        normal: "gap-1",
        relaxed: "gap-2",
      },
      variant: {
        default: "bg-background-950 border border-background-700",
        secondary: "bg-background-950 border border-background-700",
        outline: "bg-background-950 border border-background-700",
        ghost: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      spacing: "normal",
      variant: "default",
    },
  }
)

const buttonItemVariants = cva(
  "cursor-pointer text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-foreground-50 hover:bg-background-800 active:bg-background-700",
        secondary: "bg-background-800 text-foreground-50 hover:bg-background-700 active:bg-background-600",
        outline: "border border-background-700 text-foreground-50 hover:bg-background-800 active:border-background-600",
        ghost: "text-foreground-50",
      },
      size: {
        sm: "h-6 px-3 text-sm rounded-lg",
        md: "h-8 px-4 text-sm rounded-lg",
        lg: "h-9 px-6 text-md rounded-lg",
        icon: "h-9 w-10 p-0 rounded-lg flex items-center justify-center",
      },
      isSelected: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      isSelected: false,
    },
    compoundVariants: [
      {
        variant: "default",
        isSelected: true,
        className: "bg-background-800 text-foreground-50",
      },
      {
        variant: "secondary",
        isSelected: true,
        className: "bg-background-700 text-foreground-50",
      },
      {
        variant: "outline",
        isSelected: true,
        className: "border-accent-500 bg-accent-500/10 text-accent-500",
      },
      {
        variant: "ghost",
        isSelected: true,
        className: "text-foreground-50",
      },
      {
        variant: "ghost",
        size: "icon",
        className: "h-auto w-auto p-0 rounded-none",
      },
    ],
  }
)

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof buttonGroupVariants> {
  children?: React.ReactNode
  showDividers?: boolean
  variant?: "default" | "secondary" | "outline" | "ghost"
  orientation?: "horizontal" | "vertical"
  spacing?: "tight" | "normal" | "relaxed"
}

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  ButtonGroupProps
>(({ className, orientation, spacing, variant, children, showDividers = false, ...props }, ref) => {
  const isVertical = orientation === "vertical"

  const childrenArray = React.Children.toArray(children).filter(
    (child) => child !== null && child !== undefined
  )

  return (
    <div
      ref={ref}
      className={cn(buttonGroupVariants({ orientation, spacing, variant, className }))}
      role="group"
      {...props}
    >
      {childrenArray.map((child, index) => {
        const isFirst = index === 0
        const isLast = index === childrenArray.length - 1
        const marginClass = isVertical
          ? cn("mx-1", isFirst && "mt-1", isLast && "mb-1")
          : cn("my-1", isFirst && "ml-1", isLast && "mr-1")
        return (
          <React.Fragment key={index}>
            <div className={marginClass}>
              {child}
            </div>
            {showDividers && index < childrenArray.length - 1 && (
              <Divider orientation={isVertical ? "horizontal" : "vertical"} size="sm"
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
})
ButtonGroup.displayName = "ButtonGroup"

interface ButtonGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonItemVariants> {
  isSelected?: boolean
  icon?: React.ReactNode
}

const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  ButtonGroupItemProps
>(({ className, variant, size, isSelected, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonItemVariants({ variant, size, isSelected, className }))}
    aria-pressed={isSelected}
    {...props}
  >
    {icon && <span className="flex items-center justify-center">{icon}</span>}
    {children && size !== "icon" && <span>{children}</span>}
  </button>
))
ButtonGroupItem.displayName = "ButtonGroupItem"

export { ButtonGroup, ButtonGroupItem, buttonGroupVariants, buttonItemVariants };
export type { ButtonGroupProps };
