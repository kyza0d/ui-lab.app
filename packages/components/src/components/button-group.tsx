"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Divider } from "./divider"
import styles from "./button-group.module.css"

type Orientation = "horizontal" | "vertical"
type Spacing = "tight" | "normal" | "relaxed"
type Variant = "default" | "secondary" | "outline" | "ghost"
type Size = "sm" | "md" | "lg" | "icon"

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  showDividers?: boolean
  variant?: Variant
  orientation?: Orientation
  spacing?: Spacing
}

const orientationMap: Record<Orientation, string> = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
}

const spacingMap: Record<Spacing, string> = {
  tight: styles.tight,
  normal: styles.normal,
  relaxed: styles.relaxed,
}

const groupVariantMap: Record<Variant, string | undefined> = {
  default: undefined,
  secondary: undefined,
  outline: undefined,
  ghost: styles.ghost,
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      spacing = "normal",
      variant = "default",
      children,
      showDividers = false,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical"

    const childrenArray = React.Children.toArray(children).filter(
      (child) => child !== null && child !== undefined
    )

    return (
      <div
        ref={ref}
        className={cn(
          styles.buttonGroup,
          orientationMap[orientation],
          spacingMap[spacing],
          groupVariantMap[variant],
          className
        )}
        role="group"
        {...props}
      >
        {childrenArray.map((child, index) => {
          const isFirst = index === 0
          const isLast = index === childrenArray.length - 1

          return (
            <React.Fragment key={index}>
              <div
                className={cn(
                  styles.itemWrapper,
                  isVertical ? styles.vertical : styles.horizontal,
                  isFirst && styles.first,
                  isLast && styles.last
                )}
              >
                {child}
              </div>
              {showDividers && index < childrenArray.length - 1 && (
                <Divider
                  orientation={isVertical ? "horizontal" : "vertical"}
                  size="sm"
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

interface ButtonGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isSelected?: boolean
  icon?: React.ReactNode
}

const itemVariantMap: Record<Variant, string | undefined> = {
  default: undefined,
  secondary: styles.secondary,
  outline: styles.outline,
  ghost: styles.ghost,
}

const sizeMap: Record<Size, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  icon: styles.icon,
}

const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  ButtonGroupItemProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isSelected,
      icon,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        styles.buttonItem,
        itemVariantMap[variant],
        sizeMap[size],
        isSelected && styles.selected,
        className
      )}
      aria-pressed={isSelected}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children && size !== "icon" && <span>{children}</span>}
    </button>
  )
)
ButtonGroupItem.displayName = "ButtonGroupItem"

export { ButtonGroup, ButtonGroupItem }
export type { ButtonGroupProps, ButtonGroupItemProps }
