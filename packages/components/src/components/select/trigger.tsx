import * as React from "react"
import { cn } from "@/lib/utils"
import { FaChevronDown } from "react-icons/fa6"
import styles from "./select.module.css"
import { useSelectContext } from "./select"

interface SelectTriggerProps extends React.PropsWithChildren {
  className?: string
  chevron?: React.ReactNode
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, chevron }, ref) => {
    const {
      triggerRef: contextTriggerRef,
      triggerProps,
      isFocusVisible,
      isPressed,
      isHovered,
      triggerMode,
      handleHoverIntent,
    } = useSelectContext()

    const mergedRef = React.useCallback(
      (el: HTMLButtonElement | null) => {
        (contextTriggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, contextTriggerRef]
    )

    const hoverHandlers = triggerMode === "hover"
      ? {
          onMouseEnter: () => handleHoverIntent(true),
          onMouseLeave: () => handleHoverIntent(false),
        }
      : {}

    return (
      <button
        ref={mergedRef}
        className={cn(styles.trigger, className)}
        data-focus-visible={isFocusVisible || undefined}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        {...triggerProps}
        {...hoverHandlers}
      >
        <span>{children}</span>
        {chevron !== undefined ? (
          <div className={styles.icon}>{chevron}</div>
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SearchableTriggerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  className?: string
  placeholder?: string
}

const SearchableTrigger = React.forwardRef<HTMLInputElement, SearchableTriggerProps>(
  ({ className, placeholder = "Search...", ...props }, ref) => {
    const {
      searchValue,
      setSearchValue,
      isDisabled,
      setIsOpen,
      isOpen,
      selectedTextValue,
      triggerRef: contextTriggerRef,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      filteredItems,
      setFocusedKey,
    } = useSelectContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isSearchActive, setIsSearchActive] = React.useState(false)

    const mergedRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        (contextTriggerRef as React.MutableRefObject<HTMLInputElement | null>).current = el
        inputRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, contextTriggerRef]
    )

    // Reset search active state when dropdown closes
    React.useEffect(() => {
      if (!isOpen) {
        setIsSearchActive(false)
      }
    }, [isOpen])

    // Show searchValue if user is actively searching (even if empty),
    // otherwise show the selected value
    const displayValue = isSearchActive ? searchValue : (selectedTextValue || "")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            navigateToNextItem()
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (isOpen) {
            navigateToPrevItem()
          }
          break
        case 'Enter':
          e.preventDefault()
          if (isOpen) {
            selectFocusedItem()
          } else {
            setIsOpen(true)
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setSearchValue("")
          setIsSearchActive(false)
          break
        case 'Home':
          if (isOpen && e.ctrlKey) {
            e.preventDefault()
            const firstEnabled = filteredItems.find(item => !item.isDisabled)
            if (firstEnabled) setFocusedKey(firstEnabled.key)
          }
          break
        case 'End':
          if (isOpen && e.ctrlKey) {
            e.preventDefault()
            const lastEnabled = [...filteredItems].reverse().find(item => !item.isDisabled)
            if (lastEnabled) setFocusedKey(lastEnabled.key)
          }
          break
      }
    }

    const handleClick = () => {
      if (selectedTextValue && !searchValue && inputRef.current) {
        inputRef.current.select()
      }
      if (!isOpen) {
        setIsOpen(true)
      }
    }

    return (
      <input
        ref={mergedRef}
        type="text"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        value={displayValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
          setIsSearchActive(true)
          setIsOpen(true)
        }}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onFocus={() => {
          if (!isOpen) {
            setIsOpen(true)
          }
        }}
        placeholder={placeholder}
        disabled={isDisabled}
        className={cn(styles.trigger, className)}
        {...props}
      />
    )
  }
)
SearchableTrigger.displayName = "SearchableTrigger"

export { SelectTrigger, SearchableTrigger }
export type { SelectTriggerProps, SearchableTriggerProps }
