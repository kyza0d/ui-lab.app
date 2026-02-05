"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "../Button"
import { Input, type InputProps } from "../Input"
import { Select, type SelectProps } from "../Select"
import { SelectTriggerContext } from "../Select/Select.Trigger"
import styles from "./Group.module.css"

type Orientation = "horizontal" | "vertical"
type Spacing = "none" | "sm"
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
  none: styles.none,
  sm: styles.sm,
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
      spacing = "none",
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
          {childrenArray.flatMap((child, index) => {
            const isFirst = index === 0
            const isLast = index === childrenArray.length - 1

            const elements: React.ReactNode[] = [
              <div
                key={`item-${index}`}
                className={cn(
                  styles.itemWrapper,
                  isVertical ? styles.vertical : styles.horizontal,
                  isFirst && styles.first,
                  isLast && styles.last
                )}
              >
                {child}
              </div>,
            ]

            // Add divider after this item (unless it's the last item, or variant is ghost)
            if (!isLast && variant !== "ghost") {
              elements.push(
                <div
                  key={`divider-${index}`}
                  className={styles.separator}
                  aria-orientation={orientation}
                />
              )
            }

            return elements
          })}
        </div>
      </GroupContext.Provider>
    )
  }
)
GroupRoot.displayName = "Group"

// Group.Button component
interface GroupButtonProps extends ButtonProps {
  active?: boolean
}

const GroupButton = React.forwardRef<HTMLButtonElement, GroupButtonProps>(
  ({ active, variant, className, ...restProps }, ref) => {
    const context = useGroupContext()
    const isInSelectTrigger = React.useContext(SelectTriggerContext)

    // Merge disabled state from group context
    const isDisabled = restProps.isDisabled ?? context.groupIsDisabled

    if (isInSelectTrigger) {
      return (
        <span className={cn(styles.groupItem, className)}>
          {restProps.icon?.left}
          {restProps.children}
          {restProps.icon?.right}
        </span>
      )
    }

    let buttonVariant = variant
    if (variant === undefined) {
      if (context.groupVariant === "ghost") {
        buttonVariant = active ? "default" : "ghost"
      } else {
        buttonVariant = "ghost"
      }
    }

    const buttonProps = {
      ...restProps,
      variant: buttonVariant,
      isDisabled,
      className: cn(
        styles.groupItem,
        active && styles.active,
        className
      ),
    }

    return <Button ref={ref} {...buttonProps} />
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

// Group.InputWrapper component - preserves Input styling (for use with ghost variant)
interface GroupInputWrapperProps extends InputProps { }

const GroupInputWrapper = React.forwardRef<HTMLInputElement, GroupInputWrapperProps>(
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
GroupInputWrapper.displayName = "Group.InputWrapper"

// Group.Select component
interface GroupSelectProps extends SelectProps<any> { }

const GroupSelect = React.forwardRef<HTMLDivElement, GroupSelectProps>(
  ({ className, isDisabled, ...props }, ref) => {
    const context = useGroupContext()

    // Merge disabled state from group context
    const disabled = isDisabled ?? context.groupIsDisabled

    return (
      <Select
        ref={ref}
        {...props}
        isDisabled={disabled}
        className={cn('groupSelectWrapper', styles.groupSelectWrapper, className)}
      />
    )
  }
)
GroupSelect.displayName = "Group.Select"

// Assemble compound component
const Group = Object.assign(GroupRoot, {
  Button: GroupButton,
  Input: GroupInput,
  InputWrapper: GroupInputWrapper,
  Select: GroupSelect,
})

export { Group, GroupContext }
export type { GroupProps, GroupContextValue, GroupButtonProps }
