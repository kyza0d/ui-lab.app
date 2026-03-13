import * as React from "react"
import { Key } from "@react-types/shared";

import { mergeProps, } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus"
import { useButton } from "@react-aria/button";

import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import styles from "./Select.module.css"
import { useListNavigation, useMergedRef, handleListKeyDown, type ItemData } from "./Select.shared"

export type SelectItemData = ItemData

export type SelectTriggerMode = "click" | "hover"
export type SelectMode = "single" | "multiple"

export interface SelectStyleSlots {
  root?: StyleValue;
}

export type SelectStylesProp = StylesProp<SelectStyleSlots>;

export interface SelectContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  contentPlacement: "top" | "bottom"
  setContentPlacement: React.Dispatch<React.SetStateAction<"top" | "bottom">>
  triggerType: "button" | "input"
  mode: SelectMode
  selectedKey: Key | null
  selectedKeys?: Set<Key>
  selectedTextValue: string
  onSelect: (key: Key) => void
  onToggle?: (key: Key) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  wrapperRef: React.MutableRefObject<HTMLElement | null>
  contentRef: React.MutableRefObject<HTMLElement | null>
  triggerProps: any
  isFocusVisible: boolean
  isPressed: boolean
  isHovered: boolean
  isDisabled: boolean
  items: SelectItemData[]
  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void
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
  isFocusedItemSubmenu: () => boolean
  maxItems: number
  triggerMode: SelectTriggerMode
  handleHoverIntent: (isHovering: boolean) => void
  mouseMoveDetectedRef: React.MutableRefObject<boolean>
  filter?: (item: any) => boolean
  contentId: string
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
  /** Selection mode: "single" for one item, "multiple" for multi-item selection */
  mode?: SelectMode
  /** External items array — used when items are provided as data rather than JSX */
  items?: Array<T>
  /** Controlled selected key for single-select mode */
  selectedKey?: Key | null
  /** Default selected key for uncontrolled single-select */
  defaultSelectedKey?: Key | null
  /** Controlled selected keys for multi-select mode */
  selectedKeys?: Key[]
  /** Default selected keys for uncontrolled multi-select */
  defaultSelectedKeys?: Key[]
  /** Default display text shown in the trigger when nothing is selected */
  defaultValue?: string | null
  /** Display text for the currently selected value — used for SSR/SSG to avoid
   * flash of placeholder before items register. Provide alongside selectedKey or
   * defaultSelectedKey so the correct label renders on the first pass. */
  valueLabel?: string
  /** Called when selection changes; receives a single key (single) or key array (multiple) */
  onSelectionChange?: (value: any) => void
  /** Disables the entire select and prevents interaction */
  isDisabled?: boolean
  /** Focuses the trigger automatically on mount */
  autoFocus?: boolean
  /** Maximum number of items visible before the dropdown scrolls */
  maxItems?: number
  /** Additional CSS class for the root wrapper */
  className?: string
  /** How the dropdown opens: "click" (default) or "hover" */
  trigger?: SelectTriggerMode
  /** Custom filter predicate applied to the items array */
  filter?: (item: T) => boolean
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectStylesProp;
}

const resolveSelectBaseStyles = createStylesResolver(['root'] as const);

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
      valueLabel,
      onSelectionChange,
      isDisabled = false,
      autoFocus = false,
      maxItems = 6,
      children,
      className,
      trigger: triggerMode = "click",
      filter,
      styles: stylesProp,
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLElement>(null)
    const wrapperRef = React.useRef<HTMLElement>(null)
    const contentRef = React.useRef<HTMLElement>(null)
    const mouseMoveDetectedRef = React.useRef(true)
    const itemExtrasRef = React.useRef<Map<Key, { onSelect?: () => void; isSubmenuTrigger?: boolean }>>(new Map())
    const [isOpen, setIsOpen] = React.useState(false)
    const [contentPlacement, setContentPlacement] = React.useState<"top" | "bottom">("bottom")
    const contentId = React.useId()
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
      if (!isOpen || triggerMode !== "hover" || isDisabled) return

      const handleMouseMove = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const isOver = wrapperRef.current?.contains(target) ||
          contentRef.current?.contains(target)

        if (!isOver) {
          handleHoverIntent(false)
        } else {
          handleHoverIntent(true)
        }
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [isOpen, triggerMode, isDisabled, handleHoverIntent])

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
    const [selectedTextValue, setSelectedTextValue] = React.useState(valueLabel ?? defaultValue ?? "")
    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : uncontrolledSelectedKey
    const selectedKeys = controlledSelectedKeys !== undefined ? new Set(controlledSelectedKeys) : uncontrolledSelectedKeys

    const nav = useListNavigation({
      isOpen,
      externalItems: propItems.length > 0 ? propItems : undefined,
      filter: filter ? (item: any) => filter({ ...item, label: item.textValue } as any) : undefined
    })

    const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {
      nav.registerItem(key, textValue, isDisabled)
      itemExtrasRef.current.set(key, { onSelect, isSubmenuTrigger })
    }, [nav.registerItem])

    const unregisterItem = React.useCallback((key: Key) => {
      nav.unregisterItem(key)
      itemExtrasRef.current.delete(key)
    }, [nav.unregisterItem])

    const isFocusedItemSubmenu = React.useCallback(() => {
      if (nav.focusedKey === null) return false
      return itemExtrasRef.current.get(nav.focusedKey)?.isSubmenuTrigger ?? false
    }, [nav.focusedKey])

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
          const extras = itemExtrasRef.current.get(nav.focusedKey)
          if (extras?.onSelect) {
            extras.onSelect()
          } else if (mode === "multiple") {
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
      onPress: (e) => {
        if (isDisabled) return
        // Keyboard interactions are handled by onKeyDown to prevent conflicts
        if (e.pointerType !== 'keyboard') {
          setIsOpen(prev => !prev)
        }
      },
    }, triggerRef)
    const { focusProps, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered } = useHover({
      isDisabled,
      onHoverStart: () => handleHoverIntent(true),
      onHoverEnd: () => handleHoverIntent(false),
    })

    const triggerProps = mergeProps(buttonProps, focusProps, hoverProps, {
      'aria-haspopup': 'listbox' as const,
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? contentId : undefined,
      'aria-disabled': isDisabled || undefined,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || (e.key === ' ' && !isDisabled)) {
            e.preventDefault()
            setIsOpen(true)
          }
          return
        }

        handleListKeyDown(e, {
          navigateNext: nav.navigateToNextItem,
          navigatePrev: nav.navigateToPrevItem,
          confirm: selectFocusedItem,
          close: () => {
            setIsOpen(false)
            nav.setSearchValue("")
            triggerRef.current?.focus()
          },
          filteredItems: nav.filteredItems,
          setFocusedKey: nav.setFocusedKey,
        })
      },
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
          } else if (valueLabel !== undefined) {
            setSelectedTextValue(valueLabel)
          } else if (defaultValue !== undefined && defaultValue !== null) {
            setSelectedTextValue(defaultValue)
          }
        }
      }
    }, [selectedKey, nav.items, mode, defaultValue, valueLabel])

    const rootRef = useMergedRef<HTMLDivElement>(wrapperRef, ref)

    const childrenArray = React.Children.toArray(children)
    const trigger = childrenArray.find(child => React.isValidElement(child) && (
      (child.type as any)?.displayName === 'SelectTrigger' ||
      (child.type as any)?.displayName === 'SearchableTrigger'
    ))
    const contentItems = childrenArray.filter(child => React.isValidElement(child) && ((child.type as any)?.displayName === 'SelectContent' || (child.type as any)?.displayName === 'SearchableContent'))
    const otherContent = childrenArray.filter(child => !React.isValidElement(child) || (
      (child.type as any)?.displayName !== 'SelectTrigger' &&
      (child.type as any)?.displayName !== 'SearchableTrigger' &&
      (child.type as any)?.displayName !== 'SelectContent' &&
      (child.type as any)?.displayName !== 'SearchableContent'
    ))
    const triggerType = React.isValidElement(trigger) && (trigger.type as any)?.displayName === 'SearchableTrigger'
      ? 'input'
      : 'button'

    const resolvedStyles = resolveSelectBaseStyles(stylesProp);

    return (
      <SelectContext.Provider
        value={{
          isOpen,
          setIsOpen,
          contentPlacement,
          setContentPlacement,
          triggerType,
          mode,
          selectedKey,
          selectedKeys: mode === "multiple" ? selectedKeys : undefined,
          selectedTextValue,
          onSelect,
          onToggle: mode === "multiple" ? onToggle : undefined,
          triggerRef,
          wrapperRef,
          contentRef,
          triggerProps,
          isFocusVisible,
          isPressed,
          isHovered,
          isDisabled,
          items: nav.items,
          registerItem,
          unregisterItem,
          searchValue: nav.searchValue,
          setSearchValue: nav.setSearchValue,
          filteredItems: nav.filteredItems,
          visibleKeys: nav.visibleKeys,
          focusedKey: nav.focusedKey,
          setFocusedKey: nav.setFocusedKey,
          navigateToNextItem: nav.navigateToNextItem,
          navigateToPrevItem: nav.navigateToPrevItem,
          selectFocusedItem,
          isFocusedItemSubmenu,
          maxItems,
          triggerMode,
          handleHoverIntent,
          mouseMoveDetectedRef,
          filter,
          contentId,
        }}
      >
        <div
          ref={rootRef}
          className={cn('select', styles.select, className, resolvedStyles.root)}
          data-mode={mode}
        >
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
