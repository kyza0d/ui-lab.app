import * as React from "react"
import * as ReactDOM from "react-dom"
import { useButton, useFocusRing, useHover, mergeProps, useFilter, type Key } from "react-aria"
import { useFloating, flip, shift, offset, size, autoUpdate } from '@floating-ui/react-dom'
import { cn } from "@/lib/utils"
import { FaChevronDown } from "react-icons/fa6"
import styles from "./Select.module.css"
import multiStyles from "./MultiSelect.module.css"
import { Scroll } from "../Scroll"
import { Checkbox } from "../Checkbox"
import { Badge } from "../Badge"

export interface MultiSelectItemData {
  key: Key
  textValue: string
  isDisabled?: boolean
  icon?: React.ReactNode
}

interface MultiSelectContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedKeys: Set<Key>
  onToggle: (key: Key) => void
  onRemove: (key: Key) => void
  triggerRef: React.MutableRefObject<HTMLElement | null>
  wrapperRef: React.MutableRefObject<HTMLElement | null>
  isFocusVisible: boolean
  isDisabled: boolean
  items: MultiSelectItemData[]
  registerItem: (key: Key, textValue: string, isDisabled?: boolean, icon?: React.ReactNode) => void
  unregisterItem: (key: Key) => void
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  filteredItems: MultiSelectItemData[]
  visibleKeys: Set<Key>
  focusedKey: Key | null
  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>
  navigateToNextItem: () => void
  navigateToPrevItem: () => void
  toggleFocusedItem: () => void
  maxItems: number
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | null>(null)

function useMultiSelectContext() {
  const context = React.useContext(MultiSelectContext)
  if (!context) throw new Error("MultiSelect components must be used within MultiSelect")
  return context
}

export interface MultiSelectProps extends React.PropsWithChildren {
  selectedKeys?: Key[]
  defaultSelectedKeys?: Key[]
  onSelectionChange?: (keys: Key[]) => void
  isDisabled?: boolean
  maxItems?: number
  className?: string
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ selectedKeys: controlledKeys, defaultSelectedKeys = [], onSelectionChange, isDisabled = false, maxItems = 6, children, className }, ref) => {
    const triggerRef = React.useRef<HTMLElement>(null)
    const wrapperRef = React.useRef<HTMLElement>(null)
    const [isOpen, setIsOpen] = React.useState(false)
    const [uncontrolledKeys, setUncontrolledKeys] = React.useState<Set<Key>>(new Set(defaultSelectedKeys))
    const [searchValue, setSearchValue] = React.useState("")
    const [focusedKey, setFocusedKey] = React.useState<Key | null>(null)
    const registeredItemsRef = React.useRef<Map<Key, MultiSelectItemData>>(new Map())
    const [registeredItems, setRegisteredItems] = React.useState<MultiSelectItemData[]>([])

    const selectedKeys = controlledKeys !== undefined ? new Set(controlledKeys) : uncontrolledKeys
    const { contains } = useFilter({ sensitivity: 'base' })

    const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, icon?: React.ReactNode) => {
      registeredItemsRef.current.set(key, { key, textValue, isDisabled, icon })
      setRegisteredItems(Array.from(registeredItemsRef.current.values()))
    }, [])

    const unregisterItem = React.useCallback((key: Key) => {
      registeredItemsRef.current.delete(key)
      setRegisteredItems(Array.from(registeredItemsRef.current.values()))
    }, [])

    const items = registeredItems
    const filteredItems = React.useMemo(() => {
      if (!searchValue.trim()) return items
      return items.filter(item => contains(item.textValue, searchValue))
    }, [items, searchValue, contains])

    const visibleKeys = React.useMemo(() => new Set(filteredItems.map(item => item.key)), [filteredItems])
    const enabledFilteredItems = React.useMemo(() => filteredItems.filter(item => !item.isDisabled), [filteredItems])

    const onToggle = React.useCallback((key: Key) => {
      const newKeys = new Set(selectedKeys)
      if (newKeys.has(key)) {
        newKeys.delete(key)
      } else {
        newKeys.add(key)
      }
      if (controlledKeys === undefined) {
        setUncontrolledKeys(newKeys)
      }
      onSelectionChange?.(Array.from(newKeys))
    }, [selectedKeys, controlledKeys, onSelectionChange])

    const onRemove = React.useCallback((key: Key) => {
      const newKeys = new Set(selectedKeys)
      newKeys.delete(key)
      if (controlledKeys === undefined) {
        setUncontrolledKeys(newKeys)
      }
      onSelectionChange?.(Array.from(newKeys))
    }, [selectedKeys, controlledKeys, onSelectionChange])

    const navigateToNextItem = React.useCallback(() => {
      if (enabledFilteredItems.length === 0) return
      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : -1
      const nextIndex = currentIndex < enabledFilteredItems.length - 1 ? currentIndex + 1 : 0
      setFocusedKey(enabledFilteredItems[nextIndex].key)
    }, [enabledFilteredItems, focusedKey])

    const navigateToPrevItem = React.useCallback(() => {
      if (enabledFilteredItems.length === 0) return
      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : 0
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledFilteredItems.length - 1
      setFocusedKey(enabledFilteredItems[prevIndex].key)
    }, [enabledFilteredItems, focusedKey])

    const toggleFocusedItem = React.useCallback(() => {
      if (focusedKey !== null) {
        const item = enabledFilteredItems.find(item => item.key === focusedKey)
        if (item && !item.isDisabled) {
          onToggle(focusedKey)
        }
      }
    }, [focusedKey, enabledFilteredItems, onToggle])

    React.useEffect(() => {
      if (isOpen && enabledFilteredItems.length > 0) {
        setFocusedKey(enabledFilteredItems[0].key)
      }
    }, [isOpen])

    React.useEffect(() => {
      if (isOpen && searchValue) {
        if (enabledFilteredItems.length > 0) {
          setFocusedKey(enabledFilteredItems[0].key)
        } else {
          setFocusedKey(null)
        }
      }
    }, [isOpen, searchValue, enabledFilteredItems])

    React.useEffect(() => {
      if (!isOpen) setSearchValue("")
    }, [isOpen])

    const { focusProps, isFocusVisible } = useFocusRing()

    const rootRef = React.useCallback((el: HTMLDivElement | null) => {
      wrapperRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref) ref.current = el
    }, [ref])

    return (
      <MultiSelectContext.Provider value={{
        isOpen, setIsOpen, selectedKeys, onToggle, onRemove, triggerRef, wrapperRef,
        isFocusVisible, isDisabled, items, registerItem, unregisterItem, searchValue,
        setSearchValue, filteredItems, visibleKeys, focusedKey, setFocusedKey,
        navigateToNextItem, navigateToPrevItem, toggleFocusedItem, maxItems,
      }}>
        <div ref={rootRef} className={cn(multiStyles.multiSelect, className)}>
          {children}
        </div>
      </MultiSelectContext.Provider>
    )
  }
)
MultiSelect.displayName = "MultiSelect"

export interface MultiSelectTriggerProps extends React.PropsWithChildren {
  placeholder?: string
  className?: string
}

const MultiSelectTrigger = React.forwardRef<HTMLDivElement, MultiSelectTriggerProps>(
  ({ placeholder = "Select items...", className, children }, ref) => {
    const { isOpen, setIsOpen, selectedKeys, onRemove, items, isDisabled, triggerRef } = useMultiSelectContext()
    const selectedItems = items.filter(item => selectedKeys.has(item.key))

    const mergedRef = React.useCallback((el: HTMLDivElement | null) => {
      triggerRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref) ref.current = el
    }, [ref, triggerRef])

    return (
      <div
        ref={mergedRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={isDisabled ? -1 : 0}
        className={cn(multiStyles.trigger, isDisabled && multiStyles.disabled, className)}
        onClick={() => !isDisabled && setIsOpen(prev => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(prev => !prev)
          }
        }}
      >
        <div className={multiStyles.triggerContent}>
          {selectedItems.length === 0 ? (
            <span className={multiStyles.placeholder}>{placeholder}</span>
          ) : (
            <div className={multiStyles.tags}>
              {selectedItems.map(item => (
                <Badge
                  key={String(item.key)}
                  size="sm"
                  dismissible
                  icon={item.icon}
                  onDismiss={() => onRemove(item.key)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.textValue}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className={multiStyles.chevron}>
          <FaChevronDown />
        </div>
      </div>
    )
  }
)
MultiSelectTrigger.displayName = "MultiSelectTrigger"

export interface MultiSelectContentProps extends React.PropsWithChildren {
  className?: string
  searchPlaceholder?: string
}

const MultiSelectContent = React.forwardRef<HTMLDivElement, MultiSelectContentProps>(
  ({ children, className, searchPlaceholder = "Search..." }, ref) => {
    const { isOpen, setIsOpen, wrapperRef, maxItems, searchValue, setSearchValue, navigateToNextItem, navigateToPrevItem, toggleFocusedItem, filteredItems, setFocusedKey } = useMultiSelectContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)

    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [
        offset({ mainAxis: 4 }),
        flip({ fallbackPlacements: ['top-start'] }),
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, { width: `${rects.reference.width}px`, minWidth: `${rects.reference.width}px` })
          },
        }),
      ],
    })

    const isPositioned = x !== null && y !== null

    React.useLayoutEffect(() => {
      if (wrapperRef.current) refs.setReference(wrapperRef.current)
    }, [refs, wrapperRef.current])

    React.useEffect(() => {
      if (typeof document === 'undefined') return
      const container = document.createElement('div')
      container.setAttribute('data-multiselect-portal', '')
      container.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 50000;'
      document.body.appendChild(container)
      setPortalContainer(container)
      return () => { document.body.removeChild(container) }
    }, [])

    React.useEffect(() => {
      if (isOpen && inputRef.current) {
        requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
      }
    }, [isOpen])

    const mergedRef = React.useCallback((el: HTMLDivElement | null) => {
      refs.setFloating(el)
      if (typeof ref === "function") ref(el)
      else if (ref) ref.current = el
    }, [ref, refs])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); navigateToNextItem(); break
        case 'ArrowUp': e.preventDefault(); navigateToPrevItem(); break
        case 'Enter': e.preventDefault(); toggleFocusedItem(); break
        case 'Escape': e.preventDefault(); setIsOpen(false); break
        case 'Home':
          if (e.ctrlKey) {
            e.preventDefault()
            const first = filteredItems.find(item => !item.isDisabled)
            if (first) setFocusedKey(first.key)
          }
          break
        case 'End':
          if (e.ctrlKey) {
            e.preventDefault()
            const last = [...filteredItems].reverse().find(item => !item.isDisabled)
            if (last) setFocusedKey(last.key)
          }
          break
      }
    }

    if (!portalContainer) return null
    const showContent = isOpen && isPositioned

    return ReactDOM.createPortal(
      <>
        {showContent && <div style={{ position: "fixed", inset: 0, zIndex: 49999 }} onClick={() => setIsOpen(false)} />}
        {isOpen && (
          <div
            ref={mergedRef}
            className={cn(styles.content, className)}
            data-state={showContent ? "open" : "closed"}
            data-placement={placement.split('-')[0]}
            style={{ ...floatingStyles, visibility: isPositioned ? 'visible' : 'hidden' }}
          >
            <div className="px-2 py-2">
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className="w-full px-2 py-1.5 text-sm border border-background-700 rounded bg-background-800 text-foreground-50 placeholder-foreground-500 outline-none focus:border-accent-500"
              />
            </div>
            <Scroll
              className="viewport"
              maxHeight={`calc(${maxItems} * 44px + 8px)`}
              direction="vertical"
              style={{ padding: "0.25rem" }}
            >
              {children}
            </Scroll>
          </div>
        )}
        {/* Keep items registered even when menu is closed */}
        {!isOpen && <div style={{ display: 'none' }}>{children}</div>}
      </>,
      portalContainer
    )
  }
)
MultiSelectContent.displayName = "MultiSelectContent"

export interface MultiSelectListProps extends React.PropsWithChildren {
  className?: string
}

const MultiSelectList = React.forwardRef<HTMLUListElement, MultiSelectListProps>(
  ({ children, className }, ref) => (
    <ul ref={ref} role="listbox" aria-multiselectable="true" className={cn(styles.list, className)}>
      {children}
    </ul>
  )
)
MultiSelectList.displayName = "MultiSelectList"

export interface MultiSelectItemProps extends React.PropsWithChildren {
  value: Key
  textValue?: string
  isDisabled?: boolean
  className?: string
  icon?: React.ReactNode
  description?: string
}

const MultiSelectItem = React.forwardRef<HTMLLIElement, MultiSelectItemProps>(
  ({ children, isDisabled = false, className, textValue, value, icon, description }, ref) => {
    const { selectedKeys, onToggle, registerItem, unregisterItem, visibleKeys, isOpen, setFocusedKey, focusedKey } = useMultiSelectContext()
    const itemRef = React.useRef<HTMLLIElement>(null)
    const finalTextValue = typeof textValue === "string" ? textValue : String(children)
    const isSelected = selectedKeys.has(value)
    const isFocused = isOpen && focusedKey === value
    const isVisible = visibleKeys.has(value)

    React.useEffect(() => {
      registerItem(value, finalTextValue, isDisabled, icon)
      return () => unregisterItem(value)
    }, [value, finalTextValue, isDisabled, icon, registerItem, unregisterItem])

    React.useEffect(() => {
      if (isFocused && itemRef.current) {
        const scrollContainer = itemRef.current.closest('[class*="viewport"]') as HTMLElement
        if (!scrollContainer) return

        const scrollableEl = scrollContainer.querySelector('[class*="content"]') as HTMLElement
        if (!scrollableEl) return

        const itemRect = itemRef.current.getBoundingClientRect()
        const scrollableRect = scrollableEl.getBoundingClientRect()

        const isAbove = itemRect.top < scrollableRect.top
        const isBelow = itemRect.bottom > scrollableRect.bottom

        if (isAbove || isBelow) {
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

    const mergedRef = React.useCallback((el: HTMLLIElement | null) => {
      (itemRef as React.MutableRefObject<HTMLLIElement | null>).current = el
      if (typeof ref === "function") ref(el)
      else if (ref) ref.current = el
    }, [ref])

    if (!isVisible) return null

    return (
      <li
        ref={mergedRef}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        className={cn(styles.item, description && styles.itemWithDescription, multiStyles.multiItem, className)}
        data-selected={isSelected || undefined}
        data-disabled={isDisabled || undefined}
        data-focus-visible={isFocused || undefined}
        onMouseEnter={() => !isDisabled && setFocusedKey(value)}
        onMouseMove={() => !isDisabled && isOpen && focusedKey !== value && setFocusedKey(value)}
        onClick={() => !isDisabled && onToggle(value)}
      >
        <Checkbox
          size="sm"
          checked={isSelected}
          disabled={isDisabled}
          tabIndex={-1}
          className={multiStyles.itemCheckbox}
          onChange={() => {}}
          aria-hidden="true"
        />
        {icon && <div className={cn(styles.itemIcon, description && styles.itemIconWithDescription)}>{icon}</div>}
        <div className={styles.itemContent}>
          <div className={styles.itemText}>{children}</div>
          {description && <div className={styles.itemDescription}>{description}</div>}
        </div>
      </li>
    )
  }
)
MultiSelectItem.displayName = "MultiSelectItem"

const Multi = Object.assign(MultiSelect, {
  Trigger: MultiSelectTrigger,
  Content: MultiSelectContent,
  List: MultiSelectList,
  Item: MultiSelectItem,
})

export { Multi, MultiSelect, MultiSelectTrigger, MultiSelectContent, MultiSelectList, MultiSelectItem, useMultiSelectContext }
