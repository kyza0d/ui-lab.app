import * as React from "react"
import { Check, Circle } from "lucide-react"
import { useMenuContext, useMenuSubmenuContext, useRadioGroupContext } from "./Menu"
import type {
  MenuItemProps,
  MenuCheckboxItemProps,
  MenuRadioItemProps,
  MenuItemStyleSlots,
  MenuCheckboxItemStyleSlots,
  MenuRadioItemStyleSlots,
} from "./menu.types"
import styles from "./Menu.module.css"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import { List } from "../List"

const resolveMenuItemBaseStyles = createStylesResolver(['root'] as const);
const resolveMenuCheckboxItemBaseStyles = createStylesResolver(['root', 'indicator'] as const);
const resolveMenuRadioItemBaseStyles = createStylesResolver(['root', 'indicator'] as const);

/** A clickable action item that closes the menu on selection */
const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, disabled = false, onSelect, textValue, inset, className, styles: stylesProp }, ref) => {
    const parentContext = useMenuContext()
    const submenuContext = useMenuSubmenuContext()
    const isInSubmenu = submenuContext?.isOpen ?? false
    const ctx = isInSubmenu && submenuContext ? submenuContext : parentContext
    const { registerItem, unregisterItem, setFocusedKey, focusedKey } = ctx
    const mouseMoveRef = isInSubmenu && submenuContext ? submenuContext.mouseMoveDetectedRef : parentContext.mouseMoveDetectedRef

    const key = React.useMemo(() => textValue ?? String(children) ?? `item-${React.useId()}`, [textValue, children])
    const finalTextValue = textValue ?? String(children)
    const close = parentContext.close
    const isHighlighted = focusedKey === key

    const handleSelectRef = React.useRef<() => void>(null)
    handleSelectRef.current = () => {
      if (disabled) return
      onSelect?.()
      close()
    }

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, () => handleSelectRef.current?.())
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, registerItem, unregisterItem])

    const resolved = resolveMenuItemBaseStyles(stylesProp);

    return (
      <List.Item
        ref={ref}
        value={key}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn('menu', 'item', styles.item, className, resolved.root)}
        data-highlighted={isHighlighted || undefined}
        data-disabled={disabled || undefined}
        data-inset={inset || undefined}
        onMouseEnter={() => {
          if (!disabled) {
            setFocusedKey(key)
            mouseMoveRef.current = true
          }
        }}
        onClick={() => handleSelectRef.current?.()}
      >
        {children}
      </List.Item>
    )
  }
)
MenuItem.displayName = "MenuItem"

/** A menu item with a checkmark indicator for toggling a boolean state */
const MenuCheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ children, checked = false, onCheckedChange, disabled = false, onSelect, textValue, className, styles: stylesProp }, ref) => {
    const parentContext = useMenuContext()
    const submenuContext = useMenuSubmenuContext()
    const isInSubmenu = submenuContext?.isOpen ?? false
    const ctx = isInSubmenu && submenuContext ? submenuContext : parentContext
    const { registerItem, unregisterItem, setFocusedKey, focusedKey } = ctx
    const mouseMoveRef = isInSubmenu && submenuContext ? submenuContext.mouseMoveDetectedRef : parentContext.mouseMoveDetectedRef

    const key = React.useMemo(() => textValue ?? String(children) ?? `checkbox-${React.useId()}`, [textValue, children])
    const finalTextValue = textValue ?? String(children)
    const close = parentContext.close
    const isHighlighted = focusedKey === key

    const handleSelectRef = React.useRef<() => void>(null)
    handleSelectRef.current = () => {
      if (disabled) return
      onCheckedChange?.(!checked)
      onSelect?.()
      close()
    }

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, () => handleSelectRef.current?.())
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, registerItem, unregisterItem])

    const resolved = resolveMenuCheckboxItemBaseStyles(stylesProp);

    return (
      <List.Item
        ref={ref}
        value={key}
        role="menuitemcheckbox"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        className={cn('menu', 'checkbox-item', styles['checkbox-item'], className, resolved.root)}
        data-highlighted={isHighlighted || undefined}
        data-disabled={disabled || undefined}
        data-state={checked ? "checked" : "unchecked"}
        onMouseEnter={() => {
          if (!disabled) {
            setFocusedKey(key)
            mouseMoveRef.current = true
          }
        }}
        onClick={() => handleSelectRef.current?.()}
      >
        <span className={cn('menu', 'item-indicator', styles['item-indicator'], resolved.indicator)}>
          {checked && <Check className="h-3 w-3" />}
        </span>
        {children}
      </List.Item>
    )
  }
)
MenuCheckboxItem.displayName = "MenuCheckboxItem"

/** A mutually exclusive option within a MenuRadioGroup */
const MenuRadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ children, value, disabled = false, onSelect, textValue, className, styles: stylesProp }, ref) => {
    const parentContext = useMenuContext()
    const submenuContext = useMenuSubmenuContext()
    const isInSubmenu = submenuContext?.isOpen ?? false
    const ctx = isInSubmenu && submenuContext ? submenuContext : parentContext
    const { registerItem, unregisterItem, setFocusedKey, focusedKey } = ctx
    const mouseMoveRef = isInSubmenu && submenuContext ? submenuContext.mouseMoveDetectedRef : parentContext.mouseMoveDetectedRef
    const radioGroupContext = useRadioGroupContext()

    const isSelected = radioGroupContext?.value === value
    const key = React.useMemo(() => textValue ?? String(children) ?? `radio-${React.useId()}`, [textValue, children])
    const finalTextValue = textValue ?? String(children)
    const close = parentContext.close
    const isHighlighted = focusedKey === key

    const handleSelectRef = React.useRef<() => void>(null)
    handleSelectRef.current = () => {
      if (disabled) return
      radioGroupContext?.onValueChange(value)
      onSelect?.()
      close()
    }

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, () => handleSelectRef.current?.())
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, registerItem, unregisterItem])

    const resolved = resolveMenuRadioItemBaseStyles(stylesProp);

    return (
      <List.Item
        ref={ref}
        value={key}
        role="menuitemradio"
        tabIndex={disabled ? -1 : 0}
        aria-checked={isSelected}
        aria-disabled={disabled || undefined}
        className={cn('menu', 'radio-item', styles['radio-item'], className, resolved.root)}
        data-highlighted={isHighlighted || undefined}
        data-disabled={disabled || undefined}
        data-state={isSelected ? "checked" : "unchecked"}
        onMouseEnter={() => {
          if (!disabled) {
            setFocusedKey(key)
            mouseMoveRef.current = true
          }
        }}
        onClick={() => handleSelectRef.current?.()}
      >
        <span className={cn('menu', 'item-indicator', styles['item-indicator'], resolved.indicator)}>
          {isSelected && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </List.Item>
    )
  }
)
MenuRadioItem.displayName = "MenuRadioItem"

export { MenuItem, MenuCheckboxItem, MenuRadioItem }
