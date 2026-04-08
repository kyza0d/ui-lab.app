"use client"

import * as React from "react"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import { Button, type ButtonProps } from "../Button"
import { Input, type InputProps } from "../Input"
import { Select, type SelectProps } from "../Select"
import css from "./Group.module.css"

type Orientation = "horizontal" | "vertical"
type Spacing = "none" | "xs" | "sm"
type Variant = "primary" | "secondary" | "outline" | "ghost"

type GroupItemStyles = {
  first?: StyleValue
  last?: StyleValue
  divider?: StyleValue
  grow?: StyleValue
}

export interface GroupStyleSlots {
  root?: StyleValue;
  item?: StyleValue | GroupItemStyles;
  button?: StyleValue;
  input?: StyleValue;
  select?: StyleValue;
}

export type GroupStylesProp = StylesProp<GroupStyleSlots>;

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
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: GroupStylesProp
}

interface GroupContextValue {
  isInGroup: boolean
  groupVariant: Variant
  groupOrientation: Orientation
  groupSpacing: Spacing
  groupIsDisabled: boolean
  groupValue?: string
  groupOnChange?: (value: string) => void
  groupStyles: ReturnType<typeof resolveGroupStyles>
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

const resolveGroupBaseStyles = createStylesResolver([
  "root",
  "item",
  "itemFirst",
  "itemLast",
  "itemDivider",
  "itemGrow",
  "button",
  "input",
  "select",
] as const)

function resolveGroupStyles(styles: GroupStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveGroupBaseStyles(styles)
  const { root, item, button, input, select } = styles

  let itemResolved: StyleValue | undefined
  let itemFirst: StyleValue | undefined
  let itemLast: StyleValue | undefined
  let itemDivider: StyleValue | undefined
  let itemGrow: StyleValue | undefined

  if (item) {
    if (typeof item === "string" || Array.isArray(item)) {
      itemResolved = item
      itemFirst = item
      itemLast = item
      itemDivider = item
      itemGrow = item
    } else {
      itemFirst = item.first
      itemLast = item.last
      itemDivider = item.divider
      itemGrow = item.grow
    }
  }

  return resolveGroupBaseStyles({
    root,
    item: itemResolved,
    itemFirst,
    itemLast,
    itemDivider,
    itemGrow,
    button,
    input,
    select,
  })
}

// Variant and orientation maps
const orientationMap: Record<Orientation, string> = {
  horizontal: css.horizontal,
  vertical: css.vertical,
}

const spacingMap: Record<Spacing, string> = {
  none: css.none,
  xs: css.xs,
  sm: css.sm,
}

const variantMap: Record<Variant, string | undefined> = {
  primary: undefined,
  secondary: undefined,
  outline: undefined,
  ghost: css.ghost,
}

// Detect Divider elements by checking for separator role, orientation prop, or displayName
function isDivider(child: React.ReactNode): boolean {
  if (!React.isValidElement(child)) return false
  const props = (child.props || {}) as Record<string, unknown>
  const type = child.type as any
  return props.role === "separator" || "orientation" in props || type?.displayName === "Divider"
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
      styles: stylesProp,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children).filter(
      (child) => child !== null && child !== undefined
    )

    const resolved = resolveGroupStyles(stylesProp)

    const contextValue: GroupContextValue = {
      isInGroup: true,
      groupVariant: variant,
      groupOrientation: orientation,
      groupSpacing: spacing,
      groupIsDisabled: isDisabled,
      groupValue: value,
      groupOnChange: onChange,
      groupStyles: resolved,
    }

    return (
      <GroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'group',
            orientation,
            variant,
            css.group,
            orientationMap[orientation],
            spacingMap[spacing],
            variantMap[variant],
            resolved.root,
            className
          )}
          role="group"
          aria-disabled={isDisabled || undefined}
          data-disabled={isDisabled ? "true" : undefined}
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
                  css.item,
                  isFirst && resolved.itemFirst,
                  isLast && resolved.itemLast,
                  isDividerChild && css.divider,
                  isDividerChild && resolved.itemDivider,
                  shouldGrow && css.grow,
                  shouldGrow && resolved.itemGrow,
                  resolved.item,
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

/** Button styled to merge seamlessly with adjacent group items */
const GroupButton = React.forwardRef<HTMLButtonElement, GroupButtonProps>(
  ({ active, value, variant, className, onPress, ...restProps }, ref) => {
    const context = useGroupContext()
    // Merge disabled state from group context
    const isDisabled = restProps.isDisabled ?? context.groupIsDisabled

    // Derive active and onPress from toggle group context when value is provided
    const isActive = value !== undefined && context.groupValue !== undefined ? value === context.groupValue : active
    const handlePress = value !== undefined && context.groupOnChange !== undefined ? () => context.groupOnChange!(value) : onPress

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
      "data-selected": isActive ? "true" : "false",
      className: cn(
        "group",
        "button",
        css.button,
        context.groupStyles.button,
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
      <div className={cn("group", "input", css.input, context.groupStyles.input, className)}>
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
      <div className={cn("group", "input", css.input, context.groupStyles.input, className)}>
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
        className={cn("group", "select", css.select, context.groupStyles.select, className)}
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
