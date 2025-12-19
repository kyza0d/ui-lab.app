import * as React from "react"
import { useButton, useFocusRing, useHover, mergeProps, useFilter, type Key } from "react-aria"
import { cn } from "@/lib/utils"
import styles from "./select.module.css"

export interface SelectItemData {
  key: Key
  textValue: string
  isDisabled?: boolean
}

export type SelectTriggerMode = "click" | "hover"

export interface SelectContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedKey: Key | null
  selectedTextValue: string
  onSelect: (key: Key) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  triggerProps: any
  isFocusVisible: boolean
  isPressed: boolean
  isHovered: boolean
  isDisabled: boolean
  items: SelectItemData[]
  registerItem: (key: Key, textValue: string, isDisabled?: boolean) => void
  unregisterItem: (key: Key) => void
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  filteredItems: SelectItemData[]
  visibleKeys: Set<Key>
  focusedKey: Key | null
  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>
  navigateToNextItem: () => void
  navigateToPrevItem: () => void
  selectFocusedItem: () => void
  maxItems: number
  triggerMode: SelectTriggerMode
  handleHoverIntent: (isHovering: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

export function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select component must be used within Select root")
  }
  return context
}

export interface SelectProps<T> extends React.PropsWithChildren {
  items?: Array<T>
  selectedKey?: Key | null
  defaultSelectedKey?: Key | null
  defaultValue?: string | null
  onSelectionChange?: (key: Key | null) => void
  isDisabled?: boolean
  autoFocus?: boolean
  maxItems?: number
  className?: string
  trigger?: SelectTriggerMode
}

const Select = React.forwardRef<HTMLDivElement, SelectProps<any>>(
  (
    {
      items: propItems = [],
      selectedKey: controlledSelectedKey,
      defaultSelectedKey,
      defaultValue,
      onSelectionChange,
      isDisabled = false,
      autoFocus = false,
      maxItems = 6,
      children,
      className,
      trigger: triggerMode = "click",
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLElement>(null)
    const [isOpen, setIsOpen] = React.useState(false)
    const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    // Handle hover intent for trigger="hover" mode
    // Uses a timeout to allow mouse to move between trigger and content
    const handleHoverIntent = React.useCallback((isHovering: boolean) => {
      if (triggerMode !== "hover" || isDisabled) return

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }

      if (isHovering) {
        setIsOpen(true)
      } else {
        hoverTimeoutRef.current = setTimeout(() => {
          setIsOpen(false)
        }, 100)
      }
    }, [triggerMode, isDisabled])

    React.useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
      }
    }, [])
    const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React.useState<Key | null>(
      defaultSelectedKey ?? null
    )
    const [searchValue, setSearchValue] = React.useState("")
    const [focusedKey, setFocusedKey] = React.useState<Key | null>(null)
    const [selectedTextValue, setSelectedTextValue] = React.useState(defaultValue ?? "")
    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : uncontrolledSelectedKey
    const registeredItemsRef = React.useRef<Map<Key, SelectItemData>>(new Map())
    const [registeredItems, setRegisteredItems] = React.useState<SelectItemData[]>([])

    // Use React Aria's useFilter for locale-aware filtering
    const { contains } = useFilter({ sensitivity: 'base' })

    const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean) => {
      registeredItemsRef.current.set(key, { key, textValue, isDisabled })
      setRegisteredItems(Array.from(registeredItemsRef.current.values()))
    }, [])

    const unregisterItem = React.useCallback((key: Key) => {
      registeredItemsRef.current.delete(key)
      setRegisteredItems(Array.from(registeredItemsRef.current.values()))
    }, [])

    const items = propItems.length > 0 ? propItems : registeredItems

    // Filter items using React Aria's useFilter for locale-aware matching
    const filteredItems = React.useMemo(() => {
      if (!searchValue.trim()) return items
      return items.filter(item => contains(item.textValue, searchValue))
    }, [items, searchValue, contains])

    // Create a Set of visible keys for O(1) lookup
    const visibleKeys = React.useMemo(() => {
      return new Set(filteredItems.map(item => item.key))
    }, [filteredItems])

    // Get enabled (navigable) items from filtered items
    const enabledFilteredItems = React.useMemo(() => {
      return filteredItems.filter(item => !item.isDisabled)
    }, [filteredItems])

    const onSelect = React.useCallback((key: Key) => {
      const item = items.find(i => i.key === key)
      if (item) {
        setSelectedTextValue(item.textValue)
      }
      if (controlledSelectedKey === undefined) {
        setUncontrolledSelectedKey(key)
      }
      onSelectionChange?.(key)
      setIsOpen(false)
      setSearchValue("")
    }, [controlledSelectedKey, onSelectionChange, items])

    // Navigate to next enabled item
    const navigateToNextItem = React.useCallback(() => {
      if (enabledFilteredItems.length === 0) return

      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : -1
      const nextIndex = currentIndex < enabledFilteredItems.length - 1 ? currentIndex + 1 : 0

      setFocusedKey(enabledFilteredItems[nextIndex].key)
    }, [enabledFilteredItems, focusedKey])

    // Navigate to previous enabled item
    const navigateToPrevItem = React.useCallback(() => {
      if (enabledFilteredItems.length === 0) return

      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : 0
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledFilteredItems.length - 1

      setFocusedKey(enabledFilteredItems[prevIndex].key)
    }, [enabledFilteredItems, focusedKey])

    // Select the currently focused item
    const selectFocusedItem = React.useCallback(() => {
      if (focusedKey !== null) {
        const item = enabledFilteredItems.find(item => item.key === focusedKey)
        if (item && !item.isDisabled) {
          onSelect(focusedKey)
        }
      }
    }, [focusedKey, enabledFilteredItems, onSelect])

    // Reset focused key when dropdown opens or filter changes
    React.useEffect(() => {
      if (isOpen) {
        // Try to focus selected item, or first enabled item
        if (selectedKey !== null && visibleKeys.has(selectedKey)) {
          const selectedItem = filteredItems.find(item => item.key === selectedKey)
          if (selectedItem && !selectedItem.isDisabled) {
            setFocusedKey(selectedKey)
            return
          }
        }
        // Fall back to first enabled item
        if (enabledFilteredItems.length > 0) {
          setFocusedKey(enabledFilteredItems[0].key)
        } else {
          setFocusedKey(null)
        }
      }
    }, [isOpen, selectedKey, visibleKeys, enabledFilteredItems, filteredItems])

    // Update focused key when filter changes to ensure it's still visible
    React.useEffect(() => {
      if (focusedKey !== null && !visibleKeys.has(focusedKey)) {
        // Current focused key is no longer visible, reset to first enabled item
        if (enabledFilteredItems.length > 0) {
          setFocusedKey(enabledFilteredItems[0].key)
        } else {
          setFocusedKey(null)
        }
      }
    }, [visibleKeys, enabledFilteredItems, focusedKey])

    const { buttonProps, isPressed } = useButton({
      isDisabled,
      onPress: () => !isDisabled && setIsOpen(prev => !prev),
    }, triggerRef)
    const { focusProps, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered } = useHover({ isDisabled })

    const triggerProps = mergeProps(buttonProps, focusProps, hoverProps, {
      'aria-haspopup': 'listbox' as const,
      'aria-expanded': isOpen,
    })

    React.useEffect(() => {
      if (autoFocus && triggerRef.current) {
        triggerRef.current.focus({ preventScroll: true })
      }
    }, [autoFocus])

    // Clear search when dropdown closes
    React.useEffect(() => {
      if (!isOpen) {
        setSearchValue("")
      }
    }, [isOpen])

    // Sync selectedTextValue with selectedKey
    React.useEffect(() => {
      if (selectedKey === null) {
        setSelectedTextValue("")
      } else {
        const selectedItem = items.find(item => item.key === selectedKey)
        if (selectedItem) {
          setSelectedTextValue(selectedItem.textValue)
        }
      }
    }, [selectedKey, items])

    return (
      <SelectContext.Provider
        value={{
          isOpen,
          setIsOpen,
          selectedKey,
          selectedTextValue,
          onSelect,
          triggerRef,
          triggerProps,
          isFocusVisible,
          isPressed,
          isHovered,
          isDisabled,
          items,
          registerItem,
          unregisterItem,
          searchValue,
          setSearchValue,
          filteredItems,
          visibleKeys,
          focusedKey,
          setFocusedKey,
          navigateToNextItem,
          navigateToPrevItem,
          selectFocusedItem,
          maxItems,
          triggerMode,
          handleHoverIntent,
        }}
      >
        <div ref={ref} className={cn(styles.select, className)}>
          {children}
        </div>
      </SelectContext.Provider>
    )
  }
)
Select.displayName = "Select"

interface SelectListBoxProps extends React.PropsWithChildren {
  className?: string
}

const SelectListBox = React.forwardRef<HTMLUListElement, SelectListBoxProps>(
  ({ children, className }, forwardedRef) => {
    const {
      setIsOpen,
      isOpen,
      focusedKey,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      filteredItems,
      setFocusedKey,
    } = useSelectContext()
    const listBoxRef = React.useRef<HTMLUListElement>(null)

    const mergedRef = React.useCallback(
      (el: HTMLUListElement | null) => {
        (listBoxRef as React.MutableRefObject<HTMLUListElement | null>).current = el
        if (typeof forwardedRef === "function") forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      },
      [forwardedRef]
    )

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          navigateToNextItem()
          break
        case 'ArrowUp':
          e.preventDefault()
          navigateToPrevItem()
          break
        case 'Home':
          e.preventDefault()
          if (filteredItems.length > 0) {
            const firstEnabled = filteredItems.find(item => !item.isDisabled)
            if (firstEnabled) setFocusedKey(firstEnabled.key)
          }
          break
        case 'End':
          e.preventDefault()
          if (filteredItems.length > 0) {
            const lastEnabled = [...filteredItems].reverse().find(item => !item.isDisabled)
            if (lastEnabled) setFocusedKey(lastEnabled.key)
          }
          break
        case 'Enter':
          e.preventDefault()
          selectFocusedItem()
          break
        case ' ':
          if (document.activeElement?.tagName !== 'INPUT') {
            e.preventDefault()
            selectFocusedItem()
          }
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          break
      }
    }, [isOpen, navigateToNextItem, navigateToPrevItem, selectFocusedItem, setIsOpen, filteredItems, setFocusedKey])

    React.useEffect(() => {
      if (isOpen) {
        if (document.activeElement?.tagName !== 'INPUT') {
          requestAnimationFrame(() => {
            listBoxRef.current?.focus({ preventScroll: true })
          })
        }
      }
    }, [isOpen])

    return (
      <ul
        ref={mergedRef}
        role="listbox"
        tabIndex={isOpen ? 0 : -1}
        className={className}
        onKeyDown={handleKeyDown}
        style={{ outline: 'none' }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Pass focusedKey to children so they can check if they're focused
            return React.cloneElement(child as React.ReactElement<any>, { _focusedKey: focusedKey })
          }
          return child
        })}
      </ul>
    )
  }
)
SelectListBox.displayName = "SelectListBox"

export { Select, SelectListBox, SelectContext }
