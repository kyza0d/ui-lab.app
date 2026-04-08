import * as React from "react"
import { useMenuContext, RadioGroupContext } from "./Menu"
import type { MenuGroupProps, MenuRadioGroupProps, MenuLabelProps, MenuSeparatorProps, MenuShortcutProps } from "./Menu"
import type { Key } from "@react-types/shared"
import styles from "./Menu.module.css"
import { cn } from "@/lib/utils"
import { createStylesResolver } from "@/lib/styles"

const resolveMenuLabelBaseStyles = createStylesResolver(['root'] as const);
const resolveMenuSeparatorBaseStyles = createStylesResolver(['root'] as const);
const resolveMenuShortcutBaseStyles = createStylesResolver(['root'] as const);

function resolveMenuLabelStyles(styles: MenuLabelProps["styles"]) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveMenuLabelBaseStyles(styles)
  const { root } = styles
  return resolveMenuLabelBaseStyles({ root })
}

function resolveMenuSeparatorStyles(styles: MenuSeparatorProps["styles"]) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveMenuSeparatorBaseStyles(styles)
  const { root } = styles
  return resolveMenuSeparatorBaseStyles({ root })
}

function resolveMenuShortcutStyles(styles: MenuShortcutProps["styles"]) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveMenuShortcutBaseStyles(styles)
  const { root } = styles
  return resolveMenuShortcutBaseStyles({ root })
}

// ============================================================================
// Group Component
// ============================================================================

/** Logical grouping container for related menu items */
const MenuGroup = React.forwardRef<
  HTMLDivElement,
  MenuGroupProps
>(({ children, ...props }, ref) => (
  <div ref={ref} role="group" {...props}>
    {children}
  </div>
))
MenuGroup.displayName = "MenuGroup"

// ============================================================================
// Radio Group Component
// ============================================================================

/** Group of mutually exclusive radio items sharing a single selected value */
const MenuRadioGroup = React.forwardRef<HTMLDivElement, MenuRadioGroupProps>(
  ({ children, value, onValueChange }, ref) => {
    const groupName = React.useId()
    const { setRadioGroupValue, getRadioGroupValue } = useMenuContext()

    const currentValue = value !== undefined ? value : getRadioGroupValue(groupName)

    const handleValueChange = React.useCallback((newValue: Key) => {
      setRadioGroupValue(groupName, newValue)
      onValueChange?.(String(newValue))
    }, [groupName, setRadioGroupValue, onValueChange])

    return (
      <RadioGroupContext.Provider value={{ name: groupName, value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} role="group">
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
MenuRadioGroup.displayName = "MenuRadioGroup"

// ============================================================================
// Label Component
// ============================================================================

/** Non-interactive label for a section of menu items */
const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ children, inset, className, styles: stylesProp }, ref) => {
    const resolved = resolveMenuLabelStyles(stylesProp)
    return (
    <div
      ref={ref}
      className={cn('menu', 'label', styles.label, className, resolved.root)}
      data-inset={inset ? "true" : undefined}
    >
      {children}
    </div>
  )
  }
)
MenuLabel.displayName = "MenuLabel"

// ============================================================================
// Separator Component
// ============================================================================

/** Horizontal rule that visually divides sections of the menu */
const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, styles: stylesProp }, ref) => {
    const resolved = resolveMenuSeparatorStyles(stylesProp)
    return (
    <div
      ref={ref}
      role="separator"
      className={cn('menu', 'separator', styles.separator, className, resolved.root)}
    />
  )
  }
)
MenuSeparator.displayName = "MenuSeparator"

// ============================================================================
// Shortcut Component
// ============================================================================

/** Keyboard shortcut hint aligned to the right side of a menu item */
const MenuShortcut = ({ className, styles: stylesProp, ...props }: MenuShortcutProps) => {
  const resolved = resolveMenuShortcutStyles(stylesProp)
  return (
    <span className={cn('menu', 'shortcut', styles.shortcut, className, resolved.root)} {...props} />
  )
}
MenuShortcut.displayName = "MenuShortcut"

export { MenuGroup, MenuRadioGroup, MenuLabel, MenuSeparator, MenuShortcut }
