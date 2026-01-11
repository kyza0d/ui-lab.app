"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "../Button"
import { Input, type InputProps } from "../Input"
import { Select, type SelectProps } from "../Select"
import styles from "./Group.module.css"

type Orientation = "horizontal" | "vertical"
type Spacing = "tight" | "normal" | "relaxed"
type Variant = "primary" | "secondary" | "outline" | "ghost"

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation
  spacing?: Spacing
  variant?: Variant
  isDisabled?: boolean
}

interface GroupContextValue {
  isInGroup: boolean
  groupVariant: Variant
  groupOrientation: Orientation
  groupSpacing: Spacing
  groupIsDisabled: boolean
}

// Context
const GroupContext = React.createContext<GroupContextValue | null>(null)

function useGroupContext() {
  const context = React.useContext(GroupContext)
  if (!context) {
    throw new Error("Group sub-components must be used within Group")
  }
  return context
}

// Variant and orientation maps
const orientationMap: Record<Orientation, string> = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
}

const spacingMap: Record<Spacing, string> = {
  tight: styles.tight,
  normal: styles.normal,
  relaxed: styles.relaxed,
}

const variantMap: Record<Variant, string | undefined> = {
  primary: undefined,
  secondary: undefined,
  outline: undefined,
  ghost: styles.ghost,
}

// Root component
const GroupRoot = React.forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      spacing = "normal",
      variant = "primary",
      children,
      isDisabled = false,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical"

    const childrenArray = React.Children.toArray(children).filter(
      (child) => child !== null && child !== undefined
    )

    const contextValue: GroupContextValue = {
      isInGroup: true,
      groupVariant: variant,
      groupOrientation: orientation,
      groupSpacing: spacing,
      groupIsDisabled: isDisabled,
    }

    return (
      <GroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            styles.group,
            orientationMap[orientation],
            spacingMap[spacing],
            variantMap[variant],
            className
          )}
          role="group"
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {childrenArray.map((child, index) => {
            const isFirst = index === 0
            const isLast = index === childrenArray.length - 1

            return (
              <div
                key={index}
                className={cn(
                  styles.itemWrapper,
                  isVertical ? styles.vertical : styles.horizontal,
                  isFirst && styles.first,
                  isLast && styles.last
                )}
              >
                {child}
              </div>
            )
          })}
        </div>
      </GroupContext.Provider>
    )
  }
)
GroupRoot.displayName = "Group"

// Group.Button component
interface GroupButtonProps extends ButtonProps { }

const GroupButton = React.forwardRef<HTMLButtonElement, GroupButtonProps>(
  (props, ref) => {
    const context = useGroupContext()

    // Merge disabled state from group context
    const isDisabled = props.isDisabled ?? context.groupIsDisabled

    return (
      <Button
        ref={ref}
        {...props}
        isDisabled={isDisabled}
        className={cn(styles.groupItem, props.className)}
      />
    )
  }
)
GroupButton.displayName = "Group.Button"

// Group.Input component
interface GroupInputProps extends InputProps { }

const GroupInput = React.forwardRef<HTMLInputElement, GroupInputProps>(
  (props, ref) => {
    const context = useGroupContext()

    // Merge disabled state from group context
    const disabled = props.disabled ?? context.groupIsDisabled

    return (
      <div className={styles.groupInputWrapper}>
        <Input
          ref={ref}
          {...props}
          disabled={disabled}
          className={props.className}
        />
      </div>
    )
  }
)
GroupInput.displayName = "Group.Input"

// Group.Select component
interface GroupSelectProps extends SelectProps<any> { }

const GroupSelect = React.forwardRef<HTMLDivElement, GroupSelectProps>(
  ({ className, isDisabled, ...props }, ref) => {
    const context = useGroupContext()

    // Merge disabled state from group context
    const disabled = isDisabled ?? context.groupIsDisabled

    return (
      <div className={styles.groupItem}>
        <Select
          ref={ref}
          {...props}
          isDisabled={disabled}
          className={cn(styles.groupSelectWrapper, className)}
        />
      </div>
    )
  }
)
GroupSelect.displayName = "Group.Select"

// Assemble compound component
const Group = Object.assign(GroupRoot, {
  Button: GroupButton,
  Input: GroupInput,
  Select: GroupSelect,
})

export { Group }
export type { GroupProps }
