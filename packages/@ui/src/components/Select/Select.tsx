import * as React from "react"
import { useButton, useFocusRing, useHover, mergeProps, type Key } from "react-aria"
import { cn } from "@/lib/utils"
import styles from "./Select.module.css"
import { useListNavigation, useMergedRef, type ItemData } from "./Select.shared"
import { useFilter } from "../../hooks/useFilter"

export type SelectItemData = ItemData

export type SelectTriggerMode = "click" | "hover"
export type SelectMode = "single" | "multiple"

export interface SelectContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  mode: SelectMode
  selectedKey: Key | null
  selectedKeys?: Set<Key>
  selectedTextValue: string
  onSelect: (key: Key) => void
  onToggle?: (key: Key) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  wrapperRef: React.MutableRefObject<HTMLElement | null>
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
  mouseMoveDetectedRef: React.MutableRefObject<boolean>
  filter?: (item: any) => boolean
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

export function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select component must be used within Select root")
  }
  return context
}

export interface SelectProps<T = any> extends React.PropsWithChildren {
  mode?: SelectMode
  items?: Array<T>
  selectedKey?: Key | null
  defaultSelectedKey?: Key | null
  selectedKeys?: Key[]
  defaultSelectedKeys?: Key[]
  defaultValue?: string | null
  onSelectionChange?: (value: any) => void
  isDisabled?: boolean
  autoFocus?: boolean
  maxItems?: number
  className?: string
  trigger?: SelectTriggerMode
  filter?: (item: T) => boolean
}

const Select = React.forwardRef<HTMLDivElement, SelectProps<any>>(
  (
    {
      mode = "single",
      items: propItems = [],
      selectedKey: controlledSelectedKey,
      defaultSelectedKey,
      selectedKeys: controlledSelectedKeys,
      defaultSelectedKeys = [],
      defaultValue,
      onSelectionChange,
      isDisabled = false,
      autoFocus = false,
      maxItems = 6,
      children,
      className,
      trigger: triggerMode = "click",
      filter,
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLElement>(null)
    const wrapperRef = React.useRef<HTMLElement>(null)
    const mouseMoveDetectedRef = React.useRef(true)
    const [isOpen, setIsOpen] = React.useState(false)
    const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

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
    const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(
      new Set(defaultSelectedKeys)
    )
    const [selectedTextValue, setSelectedTextValue] = React.useState(defaultValue ?? "")
    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : uncontrolledSelectedKey
    const selectedKeys = controlledSelectedKeys !== undefined ? new Set(controlledSelectedKeys) : uncontrolledSelectedKeys

    const filteredPropItems = useFilter(propItems, filter)

    const nav = useListNavigation({
      isOpen,
      externalItems: filteredPropItems.length > 0 ? filteredPropItems : undefined,
    })

    const onSelect = React.useCallback((key: Key) => {
      const item = nav.items.find(i => i.key === key)
      if (item) {
        setSelectedTextValue(item.textValue)
      }
      if (controlledSelectedKey === undefined) {
        setUncontrolledSelectedKey(key)
      }
      onSelectionChange?.(key)
      setIsOpen(false)
      nav.setSearchValue("")
    }, [controlledSelectedKey, onSelectionChange, nav.items])

    const onToggle = React.useCallback((key: Key) => {
      const newKeys = new Set(selectedKeys)
      if (newKeys.has(key)) {
        newKeys.delete(key)
      } else {
        newKeys.add(key)
      }
      if (controlledSelectedKeys === undefined) {
        setUncontrolledSelectedKeys(newKeys)
      }
      onSelectionChange?.(Array.from(newKeys))
    }, [selectedKeys, controlledSelectedKeys, onSelectionChange])

    const selectFocusedItem = React.useCallback(() => {
      if (nav.focusedKey !== null) {
        const item = nav.enabledFilteredItems.find(item => item.key === nav.focusedKey)
        if (item && !item.isDisabled) {
          if (mode === "multiple") {
            onToggle(nav.focusedKey)
          } else {
            onSelect(nav.focusedKey)
          }
        }
      }
    }, [nav.focusedKey, nav.enabledFilteredItems, onSelect, onToggle, mode])

    React.useEffect(() => {
      if (isOpen) {
        // Only initialize focusedKey if it's not already valid
        if (nav.focusedKey !== null && nav.visibleKeys.has(nav.focusedKey)) {
          const item = nav.filteredItems.find(item => item.key === nav.focusedKey)
          if (item && !item.isDisabled) {
            return  // Keep current keyboard focus, don't reset it
          }
        }

        const focusKey = mode === "multiple" && selectedKeys.size > 0
          ? Array.from(selectedKeys)[0]
          : selectedKey

        if (focusKey !== null && nav.visibleKeys.has(focusKey)) {
          const item = nav.filteredItems.find(item => item.key === focusKey)
          if (item && !item.isDisabled) {
            nav.setFocusedKey(focusKey)
            return
          }
        }
        if (nav.enabledFilteredItems.length > 0) {
          nav.setFocusedKey(nav.enabledFilteredItems[0].key)
        } else {
          nav.setFocusedKey(null)
        }
      }
    }, [isOpen, selectedKey, selectedKeys, nav.visibleKeys, nav.enabledFilteredItems, nav.filteredItems, mode, nav.focusedKey])

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

    React.useEffect(() => {
      if (mode === "single") {
        if (selectedKey === null) {
          setSelectedTextValue("")
        } else {
          const selectedItem = nav.items.find(item => item.key === selectedKey)
          if (selectedItem) {
            setSelectedTextValue(selectedItem.textValue)
          }
        }
      }
    }, [selectedKey, nav.items, mode])

    const rootRef = useMergedRef<HTMLDivElement>(wrapperRef, ref)

    const childrenArray = React.Children.toArray(children)
    const trigger = childrenArray.find(child => React.isValidElement(child) && (child.type as any)?.displayName === 'SelectTrigger')
    const contentItems = childrenArray.filter(child => React.isValidElement(child) && ((child.type as any)?.displayName === 'SelectContent' || (child.type as any)?.displayName === 'SearchableContent'))
    const otherContent = childrenArray.filter(child => !React.isValidElement(child) || ((child.type as any)?.displayName !== 'SelectTrigger' && (child.type as any)?.displayName !== 'SelectContent' && (child.type as any)?.displayName !== 'SearchableContent'))

    return (
      <SelectContext.Provider
        value={{
          isOpen,
          setIsOpen,
          mode,
          selectedKey,
          selectedKeys: mode === "multiple" ? selectedKeys : undefined,
          selectedTextValue,
          onSelect,
          onToggle: mode === "multiple" ? onToggle : undefined,
          triggerRef,
          wrapperRef,
          triggerProps,
          isFocusVisible,
          isPressed,
          isHovered,
          isDisabled,
          items: nav.items,
          registerItem: nav.registerItem,
          unregisterItem: nav.unregisterItem,
          searchValue: nav.searchValue,
          setSearchValue: nav.setSearchValue,
          filteredItems: nav.filteredItems,
          visibleKeys: nav.visibleKeys,
          focusedKey: nav.focusedKey,
          setFocusedKey: nav.setFocusedKey,
          navigateToNextItem: nav.navigateToNextItem,
          navigateToPrevItem: nav.navigateToPrevItem,
          selectFocusedItem,
          maxItems,
          triggerMode,
          handleHoverIntent,
          mouseMoveDetectedRef,
          filter,
        }}
      >
        <div ref={rootRef} className={cn('select', styles.select, className)} data-mode={mode}>
          {otherContent}
          {trigger}
          {contentItems}
        </div>
      </SelectContext.Provider>
    )
  }
)
Select.displayName = "Select"

export { Select, SelectContext }
