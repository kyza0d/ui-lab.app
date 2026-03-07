import * as React from "react"
import { type Key } from "@react-types/shared"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import styles from "./Select.module.css"
import { useSelectContext, type SelectItemData } from "./Select"
import { List } from "../List"

export interface SelectGroupStyleSlots {
  root?: StyleValue;
  title?: StyleValue;
}

export type SelectGroupStylesProp = StylesProp<SelectGroupStyleSlots>;

interface SelectGroupProps extends React.PropsWithChildren {
  key?: string
  /** Label displayed above the group of items */
  title?: string
  /** Additional CSS class names */
  className?: string
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectGroupStylesProp;
}

const resolveSelectGroupBaseStyles = createStylesResolver(['root', 'title'] as const);

/** Named grouping of related items with an optional visible title label */
const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, title, className, styles: stylesProp }, ref) => {
    const resolved = resolveSelectGroupBaseStyles(stylesProp);
    return (
      <div ref={ref} className={cn(className, resolved.root)}>
        {title && <div className={cn("px-2 py-1 text-xs font-medium text-foreground-400", resolved.title)}>{title}</div>}
        {children}
      </div>
    );
  }
)
SelectGroup.displayName = "SelectGroup"

export interface SelectValueStyleSlots {
  root?: StyleValue;
  icon?: StyleValue;
  text?: StyleValue;
}

export type SelectValueStylesProp = StylesProp<SelectValueStyleSlots>;

interface SelectValueProps {
  /** Text shown in the trigger when no item is selected */
  placeholder?: string
  /** Additional CSS class names */
  className?: string
  /** Icon displayed to the left of the selected value text */
  icon?: React.ReactNode
  /** Custom render function receiving the selected item, or static content to display */
  children?: ((selectedItem: SelectItemData | null) => React.ReactNode) | React.ReactNode
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectValueStylesProp;
}

const resolveSelectValueBaseStyles = createStylesResolver(['root', 'icon', 'text'] as const);

/** Renders the selected item's label inside the trigger */
const SelectValue = React.forwardRef<HTMLDivElement, SelectValueProps>(
  ({ placeholder = "Select an option", className, icon, children, styles: stylesProp }, ref) => {
    const {
      selectedTextValue,
      selectedKey,
      items,
    } = useSelectContext()

    const selectedItem = items.find(item => item.key === selectedKey)
    const resolved = resolveSelectValueBaseStyles(stylesProp);

    const renderContent = () => {
      if (typeof children === 'function') {
        return (children as (item: SelectItemData | null) => React.ReactNode)(selectedItem || null)
      }
      return (
        <>
          {icon && <span className={cn(styles['value-icon'], resolved.icon)}>{icon}</span>}
          <span className={cn(styles['value-text'], resolved.text)}>{selectedItem?.textValue || selectedTextValue || placeholder}</span>
        </>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(styles.value, className, resolved.root)}
      >
        {renderContent()}
      </div>
    )
  }
)
SelectValue.displayName = "SelectValue"

export interface SelectItemStyleSlots {
  root?: StyleValue;
  iconWrapper?: StyleValue;
  contentWrapper?: StyleValue; // When there's a description
  text?: StyleValue;
  description?: StyleValue; // When there's a description
}

export type SelectItemStylesProp = StylesProp<SelectItemStyleSlots>;

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
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectItemStylesProp;
}

const resolveSelectItemBaseStyles = createStylesResolver([
  'root',
  'iconWrapper',
  'contentWrapper',
  'text',
  'description',
] as const);

/** A single selectable option in the dropdown list */
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, textValue, isDisabled = false, className, icon, description, styles: stylesProp }, ref) => {
    const { mode, onSelect, onToggle, selectedKey, selectedKeys, registerItem, unregisterItem, focusedKey, setFocusedKey, mouseMoveDetectedRef, visibleKeys, searchValue } = useSelectContext()
    const finalTextValue = textValue || String(children)
    const hasDescription = !!description
    const isHighlighted = focusedKey === value
    const isSelected = mode === "multiple" ? selectedKeys?.has(value) : selectedKey === value
    const [isRegistered, setIsRegistered] = React.useState(false)
    // Items hide themselves instead of unmounting so they stay registered in useListNavigation.
    // Unmounting via .filter() caused unregisterItem → items lost → backspace couldn't restore them.
    const isVisible = !isRegistered || visibleKeys.has(value)

    React.useEffect(() => {
      registerItem(value, finalTextValue, isDisabled)
      setIsRegistered(true)
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

    const resolved = resolveSelectItemBaseStyles(stylesProp);

    return (
      <List.Item
        ref={ref}
        value={String(value)}
        role="option"
        aria-selected={isSelected}
        className={cn(styles.item, hasDescription && styles['item-with-description'], className, resolved.root)}
        onClick={handleClick}
        onMouseEnter={() => !isDisabled && mouseMoveDetectedRef.current && setFocusedKey(value)}
        data-disabled={isDisabled || undefined}
        aria-disabled={isDisabled || undefined}
        data-highlighted={isHighlighted ? 'true' : 'false'}
        data-focused={isHighlighted ? 'true' : 'false'}
        style={!isVisible ? { display: 'none' } : undefined}
        aria-hidden={!isVisible || undefined}
      >
        {mode === "multiple" && <List.Checkbox checked={isSelected} />}
        {icon && (
          <span className={cn(styles['item-icon'], hasDescription && styles['item-icon-with-description'], resolved.iconWrapper)}>
            {icon}
          </span>
        )}
        {hasDescription ? (
          <div className={cn(styles['item-content'], resolved.contentWrapper)}>
            <span className={cn(styles['item-text'], resolved.text)}>{children}</span>
            <span className={cn(styles['item-description'], resolved.description)}>{description}</span>
          </div>
        ) : (
          <span className={cn(styles['item-text'], resolved.text)}>{children}</span>
        )}
      </List.Item>
    )
  }
)
SelectItem.displayName = "SelectItem"

export interface SelectListStyleSlots {
  root?: StyleValue;
}

export type SelectListStylesProp = StylesProp<SelectListStyleSlots>;

interface SelectListProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Custom filter predicate applied to the items array */
  filter?: (item: any) => boolean
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectListStylesProp;
}

const resolveSelectListBaseStyles = createStylesResolver(['root'] as const);

/** Wrapper for a collection of SelectItem components */
const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
  ({ children, className, filter, styles: stylesProp }, ref) => {
    const resolved = resolveSelectListBaseStyles(stylesProp);
    return (
      <div ref={ref} className={cn(className, resolved.root)}>
        {children}
      </div>
    );
  }
)
SelectList.displayName = "SelectList"

export { SelectGroup, SelectValue, SelectItem, SelectList }
export type { SelectGroupProps, SelectValueProps, SelectItemProps, SelectListProps }
