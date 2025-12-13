import * as React from "react"
import { useMenuContext, RadioGroupContext } from "./menu"
import type { MenuGroupProps, MenuRadioGroupProps, MenuLabelProps, MenuSeparatorProps, MenuShortcutProps } from "./menu"
import type { Key } from "react-aria"
import styles from "./menu.module.css"
import { cn } from "@/lib/utils"

// ============================================================================
// Group Component
// ============================================================================

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

const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ children, inset, className }, ref) => (
    <div
      ref={ref}
      className={cn(styles.label, className)}
      data-inset={inset || undefined}
    >
      {children}
    </div>
  )
)
MenuLabel.displayName = "MenuLabel"

// ============================================================================
// Separator Component
// ============================================================================

const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn(styles.separator, className)}
    />
  )
)
MenuSeparator.displayName = "MenuSeparator"

// ============================================================================
// Shortcut Component
// ============================================================================

const MenuShortcut = ({ className, ...props }: MenuShortcutProps) => {
  return (
    <span className={cn(styles.shortcut, className)} {...props} />
  )
}
MenuShortcut.displayName = "MenuShortcut"

export { MenuGroup, MenuRadioGroup, MenuLabel, MenuSeparator, MenuShortcut }
