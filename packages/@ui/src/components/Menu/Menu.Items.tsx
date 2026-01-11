import * as React from "react"
import { useFocusRing } from "react-aria"
import { Check, Circle } from "lucide-react"
import { useMenuContext, useMenuSubmenuContext, useRadioGroupContext } from "./Menu"
import type { MenuItemProps, MenuCheckboxItemProps, MenuRadioItemProps } from "./Menu"
import styles from "./Menu.module.css"
import { cn } from "@/lib/utils"

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, disabled = false, onSelect, textValue, inset, className, _index = 0, _isHighlighted, _isInSubmenu }, ref) => {
    const parentContext = useMenuContext()
    const submenuContext = useMenuSubmenuContext()
    const isInSubmenu = _isInSubmenu || (submenuContext?.isOpen ?? false)
    const { registerItem, unregisterItem, setHighlightedIndex } = isInSubmenu && submenuContext
      ? submenuContext
      : parentContext
    const itemRef = React.useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const { focusProps, isFocusVisible } = useFocusRing()

    const key = React.useMemo(() => textValue ?? String(children) ?? `item-${_index}`, [textValue, children, _index])
    const finalTextValue = textValue ?? String(children)
    const close = parentContext.close

    const handleSelect = React.useCallback(() => {
      if (disabled) return
      onSelect?.()
      close()
    }, [disabled, onSelect, close])

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect)
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, handleSelect])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    return (
      <div
        ref={mergedRef}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn(styles.item, className)}
        data-highlighted={_isHighlighted || isHovered || undefined}
        data-disabled={disabled || undefined}
        data-inset={inset || undefined}
        data-focus-visible={isFocusVisible || undefined}
        onMouseEnter={() => {
          setIsHovered(true)
          setHighlightedIndex(_index)
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleSelect}
        {...focusProps}
      >
        {children}
      </div>
    )
  }
)
MenuItem.displayName = "MenuItem"

const MenuCheckboxItem = React.forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  ({ children, checked = false, onCheckedChange, disabled = false, onSelect, textValue, className, _index = 0, _isHighlighted, _isInSubmenu }, ref) => {
    const parentContext = useMenuContext()
    const submenuContext = useMenuSubmenuContext()
    const isInSubmenu = _isInSubmenu || (submenuContext?.isOpen ?? false)
    const { registerItem, unregisterItem, setHighlightedIndex } = isInSubmenu && submenuContext
      ? submenuContext
      : parentContext
    const itemRef = React.useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const { focusProps, isFocusVisible } = useFocusRing()

    const key = React.useMemo(() => textValue ?? String(children) ?? `checkbox-${_index}`, [textValue, children, _index])
    const finalTextValue = textValue ?? String(children)
    const close = parentContext.close

    const handleSelect = React.useCallback(() => {
      if (disabled) return
      onCheckedChange?.(!checked)
      onSelect?.()
      close()
    }, [disabled, checked, onCheckedChange, onSelect, close])

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect)
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, handleSelect])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    return (
      <div
        ref={mergedRef}
        role="menuitemcheckbox"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled || undefined}
        className={cn(styles.checkboxItem, className)}
        data-highlighted={_isHighlighted || isHovered || undefined}
        data-disabled={disabled || undefined}
        data-state={checked ? "checked" : "unchecked"}
        data-focus-visible={isFocusVisible || undefined}
        onMouseEnter={() => {
          setIsHovered(true)
          setHighlightedIndex(_index)
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleSelect}
        {...focusProps}
      >
        <span className={styles.itemIndicator}>
          {checked && <Check className="h-3 w-3" />}
        </span>
        {children}
      </div>
    )
  }
)
MenuCheckboxItem.displayName = "MenuCheckboxItem"

// ============================================================================
// Radio Menu Item
// ============================================================================

const MenuRadioItem = React.forwardRef<HTMLDivElement, MenuRadioItemProps>(
  ({ children, value, disabled = false, onSelect, textValue, className, _index = 0, _isHighlighted, _isInSubmenu }, ref) => {
    const parentContext = useMenuContext()
    const submenuContext = useMenuSubmenuContext()
    const isInSubmenu = _isInSubmenu || (submenuContext?.isOpen ?? false)
    const { registerItem, unregisterItem, setHighlightedIndex } = isInSubmenu && submenuContext
      ? submenuContext
      : parentContext
    const radioGroupContext = useRadioGroupContext()
    const itemRef = React.useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const { focusProps, isFocusVisible } = useFocusRing()

    const isSelected = radioGroupContext?.value === value
    const key = React.useMemo(() => textValue ?? String(children) ?? `radio-${_index}`, [textValue, children, _index])
    const finalTextValue = textValue ?? String(children)
    const close = parentContext.close

    const handleSelect = React.useCallback(() => {
      if (disabled) return
      radioGroupContext?.onValueChange(value)
      onSelect?.()
      close()
    }, [disabled, radioGroupContext, value, onSelect, close])

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect)
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, handleSelect])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    return (
      <div
        ref={mergedRef}
        role="menuitemradio"
        tabIndex={disabled ? -1 : 0}
        aria-checked={isSelected}
        aria-disabled={disabled || undefined}
        className={cn(styles.radioItem, className)}
        data-highlighted={_isHighlighted || isHovered || undefined}
        data-disabled={disabled || undefined}
        data-state={isSelected ? "checked" : "unchecked"}
        data-focus-visible={isFocusVisible || undefined}
        onMouseEnter={() => {
          setIsHovered(true)
          setHighlightedIndex(_index)
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleSelect}
        {...focusProps}
      >
        <span className={styles.itemIndicator}>
          {isSelected && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </div>
    )
  }
)
MenuRadioItem.displayName = "MenuRadioItem"

export { MenuItem, MenuCheckboxItem, MenuRadioItem }
