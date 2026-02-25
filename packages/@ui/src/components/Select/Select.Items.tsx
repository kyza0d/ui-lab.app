import * as React from "react"
import { type Key } from "react-aria"
import { cn } from "@/lib/utils"
import styles from "./Select.module.css"
import { useSelectContext, type SelectItemData } from "./Select"
import { List } from "../List"

interface SelectGroupProps extends React.PropsWithChildren {
  key?: string
  /** Label displayed above the group of items */
  title?: string
  /** Additional CSS class names */
  className?: string
}

/** Named grouping of related items with an optional visible title label */
const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, title, className }, ref) => (
    <div ref={ref} className={className}>
      {title && <div className="px-2 py-1 text-xs font-medium text-foreground-400">{title}</div>}
      {children}
    </div>
  )
)
SelectGroup.displayName = "SelectGroup"

interface SelectValueProps {
  /** Text shown in the trigger when no item is selected */
  placeholder?: string
  /** Additional CSS class names */
  className?: string
  /** Icon displayed to the left of the selected value text */
  icon?: React.ReactNode
  /** Custom render function receiving the selected item, or static content to display */
  children?: ((selectedItem: SelectItemData | null) => React.ReactNode) | React.ReactNode
}

/** Renders the selected item's label inside the trigger */
const SelectValue = React.forwardRef<HTMLDivElement, SelectValueProps>(
  ({ placeholder = "Select an option", className, icon, children }, ref) => {
    const {
      selectedTextValue,
      selectedKey,
      items,
    } = useSelectContext()

    const selectedItem = items.find(item => item.key === selectedKey)
    const renderContent = () => {
      if (typeof children === 'function') {
        return (children as (item: SelectItemData | null) => React.ReactNode)(selectedItem || null)
      }
      return (
        <>
          {icon && <span className={styles['value-icon']}>{icon}</span>}
          <span className={styles['value-text']}>{selectedItem?.textValue || selectedTextValue || placeholder}</span>
        </>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(styles.value, className)}
      >
        {renderContent()}
      </div>
    )
  }
)
SelectValue.displayName = "SelectValue"

interface SelectItemProps extends React.PropsWithChildren {
  /** Unique key used to identify this item in the selection state */
  value: Key
  /** Accessible text value used for search filtering and selection display; defaults to children string */
  textValue?: string
  /** Prevents the item from being selected or keyboard-focused */
  isDisabled?: boolean
  /** Additional CSS class names */
  className?: string
  /** Icon displayed to the left of the item label */
  icon?: React.ReactNode
  /** Secondary descriptive text displayed below the item label */
  description?: React.ReactNode
}

/** A single selectable option in the dropdown list */
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, textValue, isDisabled = false, className, icon, description }, ref) => {
    const { mode, onSelect, onToggle, selectedKeys, registerItem, unregisterItem, focusedKey, setFocusedKey, mouseMoveDetectedRef, visibleKeys, searchValue } = useSelectContext()
    const finalTextValue = textValue || String(children)
    const hasDescription = !!description
    const isHighlighted = focusedKey === value
    const isSelected = mode === "multiple" ? selectedKeys?.has(value) : false
    // Items hide themselves instead of unmounting so they stay registered in useListNavigation.
    // Unmounting via .filter() caused unregisterItem → items lost → backspace couldn't restore them.
    const isVisible = !searchValue.trim() || visibleKeys.has(value)

    React.useEffect(() => {
      registerItem(value, finalTextValue, isDisabled)
      return () => unregisterItem(value)
    }, [value, finalTextValue, isDisabled, registerItem, unregisterItem])

    const handleClick = () => {
      if (!isDisabled) {
        if (mode === "multiple") {
          onToggle?.(value)
        } else {
          onSelect(value)
        }
      }
    }

    return (
      <List.Item
        ref={ref}
        value={String(value)}
        className={cn(styles.item, hasDescription && styles['item-with-description'], className)}
        onClick={handleClick}
        onMouseEnter={() => !isDisabled && mouseMoveDetectedRef.current && setFocusedKey(value)}
        data-disabled={isDisabled || undefined}
        data-highlighted={isHighlighted ? 'true' : 'false'}
        style={!isVisible ? { display: 'none' } : undefined}
        aria-hidden={!isVisible || undefined}
      >
        {mode === "multiple" && <List.Checkbox checked={isSelected} />}
        {icon && (
          <span className={cn(styles['item-icon'], hasDescription && styles['item-icon-with-description'])}>
            {icon}
          </span>
        )}
        {hasDescription ? (
          <div className={styles['item-content']}>
            <span className={styles['item-text']}>{children}</span>
            <span className={styles['item-description']}>{description}</span>
          </div>
        ) : (
          <span className={styles['item-text']}>{children}</span>
        )}
      </List.Item>
    )
  }
)
SelectItem.displayName = "SelectItem"

interface SelectListProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Custom filter predicate applied to the items array */
  filter?: (item: any) => boolean
}

/** Wrapper for a collection of SelectItem components */
const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
  ({ children, className, filter }, ref) => {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }
)
SelectList.displayName = "SelectList"

export { SelectGroup, SelectValue, SelectItem, SelectList }
export type { SelectGroupProps, SelectValueProps, SelectItemProps, SelectListProps }
