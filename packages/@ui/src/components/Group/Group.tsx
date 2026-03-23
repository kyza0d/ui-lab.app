"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "../Button"
import { Input, type InputProps } from "../Input"
import { Select, type SelectProps } from "../Select"
import { SelectTriggerContext } from "../Select/Select.Trigger"
import styles from "./Group.module.css"

type Orientation = "horizontal" | "vertical"
type Spacing = "none" | "xs" | "sm"
type Variant = "primary" | "secondary" | "outline" | "ghost"

export interface GroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controls the axis that children are arranged along */
  orientation?: Orientation
  /** Controls the gap between group items */
  spacing?: Spacing
  /** Controls the shared visual style applied to group items */
  variant?: Variant
  /** Whether all items in the group are non-interactive */
  isDisabled?: boolean
  /** The currently active button value for toggle group behavior */
  value?: string
  /** Called when a button with a value prop is pressed */
  onChange?: (value: string) => void
}

interface GroupContextValue {
  isInGroup: boolean
  groupVariant: Variant
  groupOrientation: Orientation
  groupSpacing: Spacing
  groupIsDisabled: boolean
  groupValue?: string
  groupOnChange?: (value: string) => void
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
  xs: styles.xs,
  sm: styles.sm,
}

const variantMap: Record<Variant, string | undefined> = {
  primary: undefined,
  secondary: undefined,
  outline: undefined,
  ghost: styles.ghost,
}

// Detect Divider elements by checking for separator role or orientation prop
function isDivider(child: React.ReactNode): boolean {
  if (!React.isValidElement(child)) return false
  const props = (child.props || {}) as Record<string, unknown>
  return props.role === "separator" || "orientation" in props
}

// Root component
/** Button group that groups related buttons together */
const GroupRoot = React.forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      spacing = "none",
      variant = "primary",
      children,
      isDisabled = false,
      value,
      onChange,
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
      groupValue: value,
      groupOnChange: onChange,
    }

    return (
      <GroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'group',
            orientation,
            variant,
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
            const isDividerChild = isDivider(child)
            
            // Extract layout-related classes from child to apply to the item wrapper
            const childProps = React.isValidElement(child) ? (child.props as any) : {}
            const childClassName = childProps.className || ""
            const shouldGrow = childClassName.includes('w-full') || childClassName.includes('flex-1')

            return (
              <div
                key={`item-${index}`}
                className={cn(
                  'item',
                  styles.item,
                  isVertical ? styles.vertical : styles.horizontal,
                  isFirst && styles.first,
                  isLast && styles.last,
                  isDividerChild && styles.divider,
                  shouldGrow && styles.grow
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
interface GroupButtonProps extends ButtonProps {
  /** Whether this button is in an active/pressed state */
  active?: boolean
  /** Identifier used for toggle group behavior when Group has value/onChange */
  value?: string
}

type GroupButtonIconSlots = {
  left?: React.ReactNode
  right?: React.ReactNode
}

function isGroupButtonIconSlots(icon: ButtonProps["icon"]): icon is GroupButtonIconSlots {
  return typeof icon === "object" && icon !== null && !React.isValidElement(icon) && ('left' in icon || 'right' in icon)
}

function resolveGroupButtonIcon(icon: ButtonProps["icon"]): GroupButtonIconSlots | undefined {
  if (!icon) return undefined
  if (isGroupButtonIconSlots(icon)) {
    return icon
  }

  return { left: icon as React.ReactNode, right: undefined }
}

/** Button styled to merge seamlessly with adjacent group items */
const GroupButton = React.forwardRef<HTMLButtonElement, GroupButtonProps>(
  ({ active, value, variant, className, onPress, ...restProps }, ref) => {
    const context = useGroupContext()
    const isInSelectTrigger = React.useContext(SelectTriggerContext)

    // Merge disabled state from group context
    const isDisabled = restProps.isDisabled ?? context.groupIsDisabled

    // Derive active and onPress from toggle group context when value is provided
    const isActive = value !== undefined && context.groupValue !== undefined
      ? value === context.groupValue
      : active
    const handlePress = value !== undefined && context.groupOnChange !== undefined
      ? () => context.groupOnChange!(value)
      : onPress

    if (isInSelectTrigger) {
      const icon = resolveGroupButtonIcon(restProps.icon)

      return (
        <span className={cn(styles['group-item'], className)}>
          {icon?.left}
          {restProps.children}
          {icon?.right}
        </span>
      )
    }

    let buttonVariant = variant
    if (variant === undefined) {
      if (context.groupVariant === "ghost") {
        buttonVariant = isActive ? "default" : "ghost"
      } else {
        buttonVariant = "ghost"
      }
    }

    const buttonProps = {
      ...restProps,
      onPress: handlePress,
      variant: buttonVariant,
      isDisabled,
      className: cn(
        styles['group-item'],
        isActive && styles.active,
        className
      ),
    }

    return <Button ref={ref} {...buttonProps} />
  }
)
GroupButton.displayName = "Group.Button"

// Group.Input component
interface GroupInputProps extends InputProps { }

/** Input field integrated into the button group */
const GroupInput = React.forwardRef<HTMLInputElement, GroupInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const context = useGroupContext()

    // Merge disabled state from group context
    const inputDisabled = disabled ?? context.groupIsDisabled

    return (
      <div className={cn(styles['group-input-wrapper'], className)}>
        <Input
          ref={ref}
          {...props}
          disabled={inputDisabled}
          className="w-full"
        />
      </div>
    )
  }
)
GroupInput.displayName = "Group.Input"

// Group.InputWrapper component - preserves Input styling (for use with ghost variant)
interface GroupInputWrapperProps extends InputProps { }

/** Input variant that preserves Input styling within the group */
const GroupInputWrapper = React.forwardRef<HTMLInputElement, GroupInputWrapperProps>(
  ({ className, disabled, ...props }, ref) => {
    const context = useGroupContext()

    // Merge disabled state from group context
    const inputDisabled = disabled ?? context.groupIsDisabled

    return (
      <div className={cn(styles['group-input-wrapper'], className)}>
        <Input
          ref={ref}
          {...props}
          disabled={inputDisabled}
          className="w-full"
        />
      </div>
    )
  }
)
GroupInputWrapper.displayName = "Group.InputWrapper"

// Group.Select component
interface GroupSelectProps extends SelectProps<any> { }

/** Select dropdown integrated into the button group */
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
        className={cn('groupSelectWrapper', styles['group-select-wrapper'], className)}
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
