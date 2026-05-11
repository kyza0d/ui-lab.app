"use client"

import * as React from "react"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import { useFocus } from "@/hooks/useFocus"
import { useMergeRefs } from "@/hooks/useMergeRefs"
import { Button, type ButtonProps } from "../Button"
import { Expand, type ExpandProps } from "../Expand"
import { Input, type InputProps } from "../Input"
import { Select, type SelectProps } from "../Select"
import css from "./Group.module.css"

type Orientation = "horizontal" | "vertical"
type Spacing = "none" | "xs" | "sm"

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
  expand?: StyleValue;
}

export type GroupStylesProp = StylesProp<GroupStyleSlots>;

export interface GroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Variant class appended to the root and grouped slots. Accepts any string. */
  variant?: string
  /** Controls the axis that children are arranged along */
  orientation?: Orientation
  /** Controls the gap between group items */
  spacing?: Spacing
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
  groupOrientation: Orientation
  groupSpacing: Spacing
  groupIsDisabled: boolean
  groupValue?: string
  groupOnChange?: (value: string) => void
  groupVariant?: string
  groupStyles: ReturnType<typeof resolveGroupStyles>
  registerInput?: (containerRef: React.RefObject<HTMLDivElement | null>, inputRef: React.RefObject<HTMLInputElement | null>) => void
  unregisterInput?: (containerRef: React.RefObject<HTMLDivElement | null>) => void
  activateInput?: () => boolean
  registerFocusableSurface?: (ref: React.RefObject<HTMLElement | null>) => void
  unregisterFocusableSurface?: (ref: React.RefObject<HTMLElement | null>) => void
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
  "expand",
] as const)

function resolveGroupStyles(styles: GroupStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveGroupBaseStyles(styles)
  const { root, item, button, input, select, expand } = styles

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
    expand,
  })
}

// Orientation and spacing maps
const orientationMap: Record<Orientation, string> = {
  horizontal: css.horizontal,
  vertical: css.vertical,
}

const spacingMap: Record<Spacing, string> = {
  none: css.none,
  xs: css.xs,
  sm: css.sm,
}

// Detect Divider elements by checking for separator role, orientation prop, or displayName
function isDivider(child: React.ReactNode): boolean {
  if (!React.isValidElement(child)) return false
  const props = (child.props || {}) as Record<string, unknown>
  const type = child.type as any
  return props.role === "separator" || "orientation" in props || type?.displayName === "Divider"
}

function isHTMLElement(value: Element | null): value is HTMLElement {
  return value instanceof HTMLElement
}

// Root component
/** Button group that groups related buttons together */
const GroupRoot = React.forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      className,
      variant,
      orientation = "horizontal",
      spacing = "none",
      children,
      isDisabled = false,
      value,
      onChange,
      styles: stylesProp,
      ...props
    },
    ref
  ) => {
    const scopeRef = React.useRef<HTMLDivElement>(null)
    const groupRef = React.useRef<HTMLDivElement>(null)
    const inputsRef = React.useRef<Map<React.RefObject<HTMLDivElement | null>, React.RefObject<HTMLInputElement | null>>>(new Map())
    const focusableSurfacesRef = React.useRef<React.RefObject<HTMLElement | null>[]>([])

    const childrenArray = React.Children.toArray(children).filter(
      (child) => child !== null && child !== undefined
    )

    const resolved = resolveGroupStyles(stylesProp)
    const mergedRef = useMergeRefs<HTMLDivElement>(ref, groupRef)

    const { scopeProps, indicatorProps } = useFocus({
      scopeRef,
      containerRef: groupRef,
      surfaceSelector: '[data-focus-surface="true"]',
      radiusSource: "item",
      dependencies: [childrenArray.length, orientation, spacing],
    })

    const registerInput = React.useCallback((containerRef: React.RefObject<HTMLDivElement | null>, inputRef: React.RefObject<HTMLInputElement | null>) => {
      inputsRef.current.set(containerRef, inputRef)
    }, [])

    const unregisterInput = React.useCallback((containerRef: React.RefObject<HTMLDivElement | null>) => {
      inputsRef.current.delete(containerRef)
    }, [])

    const activateInput = React.useCallback(() => {
      const firstEntry = Array.from(inputsRef.current.entries())[0]
      if (firstEntry) {
        const [containerRef, inputRef] = firstEntry
        if (containerRef.current && inputRef.current) {
          // Focus the actual input for keyboard interaction
          inputRef.current.focus()

          // Force focus-visible state by finding the input container inside the wrapper
          // The Input component renders a container div with data-input-focus-surface
          const inputContainer = containerRef.current.querySelector('[data-input-focus-surface="true"]') as HTMLElement
          if (inputContainer) {
            inputContainer.setAttribute('data-focus-visible', 'true')
            inputContainer.setAttribute('data-focused', 'true')
          }
          return true
        }
      }
      return false
    }, [])

    const registerFocusableSurface = React.useCallback((ref: React.RefObject<HTMLElement | null>) => {
      focusableSurfacesRef.current.push(ref)
    }, [])

    const unregisterFocusableSurface = React.useCallback((ref: React.RefObject<HTMLElement | null>) => {
      focusableSurfacesRef.current = focusableSurfacesRef.current.filter(r => r !== ref)
    }, [])


    const handleGroupKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") {
        return
      }

      const focusedElement = document.activeElement
      if (!focusedElement || !groupRef.current?.contains(focusedElement as Node)) {
        return
      }

      const focusableElements = focusableSurfacesRef.current
        .map(ref => ref.current)
        .filter((el): el is HTMLElement => el !== null && !!groupRef.current?.contains(el))

      if (focusableElements.length === 0) {
        return
      }

      const currentIndex = focusableElements.findIndex(el => el.contains(focusedElement as Node))
      if (currentIndex === -1) {
        return
      }

      const isHorizontal = orientation === "horizontal"
      const isNavigatingInline = (e.key === "ArrowRight" || e.key === "ArrowLeft") && isHorizontal
      const isNavigatingBlock = (e.key === "ArrowDown" || e.key === "ArrowUp") && !isHorizontal

      if (!isNavigatingInline && !isNavigatingBlock) {
        return
      }

      e.preventDefault()

      let nextIndex = currentIndex
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % focusableElements.length
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
      }

      const nextElement = focusableElements[nextIndex]
      if (nextElement) {
        // Try to focus an interactive element within the surface
        const focusableChild = nextElement.querySelector('button, input, [role="button"]') as HTMLElement | null
        if (focusableChild) {
          focusableChild.focus()
        } else {
          nextElement.focus()
        }
      }
    }, [orientation])

    const contextValue: GroupContextValue = {
      isInGroup: true,
      groupOrientation: orientation,
      groupSpacing: spacing,
      groupIsDisabled: isDisabled,
      groupValue: value,
      groupOnChange: onChange,
      groupVariant: variant,
      groupStyles: resolved,
      registerInput,
      unregisterInput,
      activateInput,
      registerFocusableSurface,
      unregisterFocusableSurface,
    }

    return (
      <GroupContext.Provider value={contextValue}>
        <div ref={scopeRef} className={cn("group-scope", scopeProps.className)}>
          <div {...indicatorProps} />
          <div
            ref={mergedRef}
            className={cn(
              'group',
              variant,
              orientation,
              css.group,
              orientationMap[orientation],
              spacingMap[spacing],
              resolved.root,
              className
            )}
            role="group"
            aria-disabled={isDisabled || undefined}
            data-disabled={isDisabled ? "true" : undefined}
            onKeyDown={handleGroupKeyDown}
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
                    variant,
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
  ({ active, value, variant, className, onPress, onPointerDown, onMouseDown, ...restProps }, ref) => {
    const context = useGroupContext()
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const mergedRef = useMergeRefs(buttonRef, ref)

    // Merge disabled state from group context
    const isDisabled = restProps.isDisabled ?? context.groupIsDisabled

    // Derive active and onPress from toggle group context when value is provided
    const isActive = value !== undefined && context.groupValue !== undefined ? value === context.groupValue : active
    const baseHandlePress = value !== undefined && context.groupOnChange !== undefined ? () => context.groupOnChange!(value) : onPress

    const handlePress = React.useCallback((e: { target: EventTarget | null }) => {
      baseHandlePress?.(e)
    }, [baseHandlePress])

    // Activate input on pointer down to avoid focus ring flicker
    const handlePointerDown = React.useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
      if (!isDisabled && e.pointerType !== "mouse") {
        // Pre-activate the input before button loses focus
        context.activateInput?.()
      }
      onPointerDown?.(e)
    }, [context, isDisabled, onPointerDown])

    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled && context.activateInput?.()) {
        e.preventDefault()
      }
      onMouseDown?.(e)
    }, [context, isDisabled, onMouseDown])

    React.useEffect(() => {
      context.registerFocusableSurface?.(buttonRef)
      return () => {
        context.unregisterFocusableSurface?.(buttonRef)
      }
    }, [context])

    const buttonVariant = variant ?? context.groupVariant ?? "ghost"

    const buttonProps = {
      ...restProps,
      onPress: handlePress,
      onPointerDown: handlePointerDown,
      onMouseDown: handleMouseDown,
      variant: buttonVariant,
      isDisabled,
      "data-focus-surface": "true",
      "data-selected": isActive ? "true" : "false",
      className: cn(
        "button",
        buttonVariant,
        css.button,
        context.groupStyles.button,
        className
      ),
    }

    return <Button ref={mergedRef} {...buttonProps} />
  }
)
GroupButton.displayName = "Group.Button"

// Group.Input component
interface GroupInputProps extends InputProps { }

/** Input field integrated into the button group */
const GroupInput = React.forwardRef<HTMLInputElement, GroupInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const context = useGroupContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(ref, inputRef)

    // Register and unregister the input ref with the group context
    React.useEffect(() => {
      context.registerInput?.(containerRef, inputRef)
      return () => {
        context.unregisterInput?.(containerRef)
      }
    }, [context])

    React.useEffect(() => {
      context.registerFocusableSurface?.(containerRef)
      return () => {
        context.unregisterFocusableSurface?.(containerRef)
      }
    }, [context])

    // Merge disabled state from group context
    const inputDisabled = disabled ?? context.groupIsDisabled

    return (
      <div
        ref={containerRef}
        className={cn("input", context.groupVariant, css.input, context.groupStyles.input, className)}
        data-focus-surface="true"
      >
        <Input
          ref={mergedRef}
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
    const inputRef = React.useRef<HTMLInputElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(ref, inputRef)

    // Register and unregister the input ref with the group context
    React.useEffect(() => {
      context.registerInput?.(containerRef, inputRef)
      return () => {
        context.unregisterInput?.(containerRef)
      }
    }, [context])

    React.useEffect(() => {
      context.registerFocusableSurface?.(containerRef)
      return () => {
        context.unregisterFocusableSurface?.(containerRef)
      }
    }, [context])

    // Merge disabled state from group context
    const inputDisabled = disabled ?? context.groupIsDisabled

    return (
      <div
        ref={containerRef}
        className={cn("input", context.groupVariant, css.input, context.groupStyles.input, className)}
        data-focus-surface="true"
      >
        <Input
          ref={mergedRef}
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
    const selectRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(selectRef, ref)

    // Merge disabled state from group context
    const disabled = isDisabled ?? context.groupIsDisabled

    React.useEffect(() => {
      context.registerFocusableSurface?.(selectRef)
      return () => {
        context.unregisterFocusableSurface?.(selectRef)
      }
    }, [context])

    return (
      <Select
        ref={mergedRef}
        {...props}
        isDisabled={disabled}
        data-focus-surface="true"
        className={cn("select", context.groupVariant, css.select, context.groupStyles.select, className)}
      />
    )
  }
)
GroupSelect.displayName = "Group.Select"

// Group.Expand component
interface GroupExpandProps extends ExpandProps { }

/** Expand primitive integrated into the group */
const GroupExpand = React.forwardRef<HTMLDivElement, GroupExpandProps>(
  ({ className, isDisabled, styles: stylesProp, ...props }, ref) => {
    const context = useGroupContext()
    const surfaceRef = React.useRef<HTMLDivElement>(null)
    const disabled = isDisabled ?? context.groupIsDisabled
    const surfaceStyles = typeof stylesProp === "string" || Array.isArray(stylesProp) ? stylesProp : undefined
    const expandStyles = surfaceStyles ? undefined : stylesProp

    React.useEffect(() => {
      context.registerFocusableSurface?.(surfaceRef)
      return () => {
        context.unregisterFocusableSurface?.(surfaceRef)
      }
    }, [context])

    return (
      <div
        ref={surfaceRef}
        data-focus-surface="true"
        className={cn("expand", context.groupVariant, css.expand, context.groupStyles.expand, surfaceStyles)}
      >
        <Expand
          ref={ref}
          {...props}
          className={className}
          styles={expandStyles}
          isDisabled={disabled}
        />
      </div>
    )
  }
)
GroupExpand.displayName = "Group.Expand"

// Assemble compound component
const Group = Object.assign(GroupRoot, {
  Button: GroupButton,
  Input: GroupInput,
  InputWrapper: GroupInputWrapper,
  Select: GroupSelect,
  Expand: GroupExpand,
})

export { Group, GroupContext }
