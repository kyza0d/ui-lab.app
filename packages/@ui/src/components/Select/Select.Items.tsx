import * as React from "react"
import { type Key } from "react-aria"
import { cn } from "@/lib/utils"
import { FaCheck, FaChevronDown } from "react-icons/fa6"
import styles from "./Select.module.css"
import { useSelectContext, type SelectItemData } from "./Select"

interface SelectGroupProps extends React.PropsWithChildren {
  key?: string
  title?: string
  className?: string
}

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
  placeholder?: string
  className?: string
  icon?: React.ReactNode
  children?: ((selectedItem: SelectItemData | null) => React.ReactNode) | React.ReactNode
}

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
          {icon && <span className={styles.valueIcon}>{icon}</span>}
          <span className={styles.valueText}>{selectedItem?.textValue || selectedTextValue || placeholder}</span>
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
  value: Key
  textValue?: string
  isDisabled?: boolean
  className?: string
  icon?: React.ReactNode
  description?: string
}

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ children, isDisabled = false, className, textValue, value, icon, description }, forwardedRef) => {
    const { selectedKey, onSelect, registerItem, unregisterItem, visibleKeys, isOpen, setFocusedKey, focusedKey } = useSelectContext()
    const itemRef = React.useRef<HTMLLIElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const finalTextValue = typeof textValue === "string" ? textValue : String(children)
    const isSelected = selectedKey === value
    const isFocused = isOpen && focusedKey === value
    const isVisible = visibleKeys.has(value)

    React.useEffect(() => {
      registerItem(value, finalTextValue, isDisabled)
      return () => unregisterItem(value)
    }, [value, finalTextValue, isDisabled, registerItem, unregisterItem])

    // Scroll focused item into view within dropdown viewport only
    React.useEffect(() => {
      if (isFocused && itemRef.current) {
        // Find the Scroll container, then get its scrollable content element
        const scrollContainer = itemRef.current.closest('[class*="viewport"]') as HTMLElement
        if (!scrollContainer) return

        // The Scroll component's scrollable content is the element with the 'content' data attribute or class
        // We need to find the actual scrollable element which is a sibling of the track
        const scrollableEl = scrollContainer.querySelector('[class*="content"]') as HTMLElement
        if (!scrollableEl) return

        const itemRect = itemRef.current.getBoundingClientRect()
        const scrollableRect = scrollableEl.getBoundingClientRect()

        // Check if item is outside the visible viewport
        const isAbove = itemRect.top < scrollableRect.top
        const isBelow = itemRect.bottom > scrollableRect.bottom

        if (isAbove || isBelow) {
          // Calculate scroll position relative to the scrollable container
          const itemOffsetTop = itemRef.current.offsetTop
          const scrollableOffsetTop = scrollableEl.offsetTop
          const relativeTop = itemOffsetTop - scrollableOffsetTop

          const scrollTop = isAbove
            ? relativeTop
            : relativeTop - scrollableEl.clientHeight + itemRef.current.offsetHeight

          scrollableEl.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth'
          })
        }
      }
    }, [isFocused])

    const mergedRef = React.useCallback(
      (el: HTMLLIElement | null) => {
        (itemRef as React.MutableRefObject<HTMLLIElement | null>).current = el
        if (typeof forwardedRef === "function") forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      },
      [forwardedRef]
    )

    const handleClick = () => {
      if (!isDisabled) onSelect(value)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      // Update focused key on hover for better UX
      if (!isDisabled) {
        setFocusedKey(value)
      }
    }

    const handleMouseMove = () => {
      if (!isDisabled && isOpen && focusedKey !== value) {
        setFocusedKey(value)
      }
    }

    // Don't render if filtered out
    if (!isVisible) {
      return null
    }

    return (
      <li
        ref={mergedRef}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        className={cn(styles.item, description && styles.itemWithDescription, className)}
        data-selected={isSelected || undefined}
        data-disabled={isDisabled || undefined}
        data-focus-visible={isFocused || undefined}
        data-hovered={isHovered || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {icon && <div className={cn(styles.itemIcon, description && styles.itemIconWithDescription)}>{icon}</div>}
        <div className={styles.itemContent}>
          <div className={styles.itemText}>{children}</div>
          {description && <div className={styles.itemDescription}>{description}</div>}
        </div>
        <div className={cn(styles.itemIndicator, description && styles.itemIndicatorWithDescription)}>{isSelected && <FaCheck className="w-3 h-3" />}</div>
      </li>
    )
  }
)
SelectItem.displayName = "SelectItem"

export { SelectItem, SelectGroup, SelectValue }
export type { SelectItemProps, SelectGroupProps, SelectValueProps }
