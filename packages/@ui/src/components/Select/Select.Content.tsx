import * as React from "react"
import { createPortal } from "react-dom"
import { useFloating, flip, offset, autoUpdate } from '@floating-ui/react-dom'
import { cn } from "@/lib/utils"
import styles from "./Select.module.css"
import { useSelectContext } from "./Select"
import { GroupContext } from "../Group/Group"
import { Scroll } from "../Scroll"
import { Input } from "../Input"
import { List } from "../List"
import { useMergedRef, scrollItemIntoView } from "./Select.shared"

export interface SelectContentProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Renders a search input inside the dropdown for filtering items */
  searchable?: boolean
  /** Placeholder text for the search input when searchable is true */
  searchPlaceholder?: string
  /** Called when the search input value changes */
  onSearch?: (value: string) => void
}

/** Floating panel that renders the list of selectable options */
const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, searchable = false, searchPlaceholder = "Search items...", onSearch }, ref) => {
    const {
      isOpen,
      setIsOpen,
      wrapperRef,
      maxItems,
      triggerMode,
      handleHoverIntent,
      items,
      searchValue,
      setSearchValue,
      onSelect,
      filteredItems,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      setFocusedKey,
      focusedKey,
      mouseMoveDetectedRef,
    } = useSelectContext()
    const groupContext = React.useContext(GroupContext)
    const [mounted, setMounted] = React.useState(false)
    const [floatingElement, setFloatingElement] = React.useState<HTMLDivElement | null>(null)
    const [needsScroll, setNeedsScroll] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const isKeyboardNavRef = React.useRef(false)
    const wasJustOpenedRef = React.useRef(false)

    const offsetValue = groupContext?.isInGroup ? 4 : 2

    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [
        offset({
          mainAxis: offsetValue,
          crossAxis: groupContext?.isInGroup ? -1 : 0,
        }),
        flip({
          fallbackPlacements: ['top-start'],
        }),
      ],
    })

    React.useLayoutEffect(() => {
      if (floatingElement && isOpen && wrapperRef.current) {
        const referenceWidth = wrapperRef.current.offsetWidth
        const contentWidth = floatingElement.scrollWidth
        const width = Math.max(referenceWidth, contentWidth)
        floatingElement.style.width = `${width}px`
        floatingElement.style.minWidth = `${referenceWidth}px`
      }
    }, [floatingElement, isOpen, wrapperRef])

    const isPositioned = x !== null && y !== null

    React.useLayoutEffect(() => {
      if (wrapperRef.current) {
        refs.setReference(wrapperRef.current)
      }
    }, [refs, wrapperRef.current])

    React.useEffect(() => {
      setMounted(true)
    }, [])

    React.useEffect(() => {
      if (isOpen) {
        wasJustOpenedRef.current = true
      }
    }, [isOpen])

    React.useEffect(() => {
      if (isOpen && searchable && inputRef.current) {
        requestAnimationFrame(() => {
          inputRef.current?.focus({ preventScroll: true })
        })
      }
    }, [isOpen, searchable])

    React.useEffect(() => {
      if (isOpen && !searchable && floatingElement) {
        requestAnimationFrame(() => {
          floatingElement?.focus({ preventScroll: true })
        })
      }
    }, [isOpen, searchable, floatingElement])

    React.useEffect(() => {
      if (!isOpen) return
      const handleWindowKeyDown = (e: KeyboardEvent) => {
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
          isKeyboardNavRef.current = true
          mouseMoveDetectedRef.current = false
        }
      }
      const handleWindowMouseMove = () => {
        if (!mouseMoveDetectedRef.current) {
          mouseMoveDetectedRef.current = true
        }
      }
      window.addEventListener('keydown', handleWindowKeyDown)
      window.addEventListener('mousemove', handleWindowMouseMove)
      return () => {
        window.removeEventListener('keydown', handleWindowKeyDown)
        window.removeEventListener('mousemove', handleWindowMouseMove)
      }
    }, [isOpen, mouseMoveDetectedRef])

    React.useEffect(() => {
      if (!isOpen || focusedKey === null || !floatingElement) return
      const shouldScroll = !mouseMoveDetectedRef.current || wasJustOpenedRef.current
      if (!shouldScroll) return
      isKeyboardNavRef.current = false
      wasJustOpenedRef.current = false
      const el = floatingElement.querySelector('[data-highlighted="true"]') as HTMLElement
      if (el) scrollItemIntoView(el)
    }, [focusedKey, isOpen, floatingElement, mouseMoveDetectedRef])

    // Measure actual content height to determine if scrolling is needed.
    // This is more reliable than item count (e.g. items with descriptions exceed maxHeight even when count ≤ maxItems)
    React.useEffect(() => {
      if (!isOpen || !floatingElement) return

      const maxHeightPx = maxItems * 36 + 8
      const measure = () => {
        // The List element has role="list", find it and walk up to the scrollable container
        const listElement = floatingElement.querySelector('[role="list"]') as HTMLElement | null
        if (!listElement) return

        // Walk up 2 levels: List -> padding div -> Scroll content div
        const scrollContainer = listElement.parentElement?.parentElement as HTMLElement | null
        if (!scrollContainer) return

        // Check if content exceeds the maxHeight constraint
        setNeedsScroll(scrollContainer.scrollHeight > maxHeightPx)
      }

      measure()
      const observer = new ResizeObserver(measure)
      observer.observe(floatingElement)
      return () => observer.disconnect()
    }, [isOpen, floatingElement, maxItems])

    const mergedRef = useMergedRef<HTMLDivElement>(refs.setFloating, setFloatingElement, ref)

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          isKeyboardNavRef.current = true
          navigateToNextItem()
          break
        case 'ArrowUp':
          e.preventDefault()
          isKeyboardNavRef.current = true
          navigateToPrevItem()
          break
        case 'Home': {
          e.preventDefault()
          const first = filteredItems.find(item => !item.isDisabled)
          if (first) {
            isKeyboardNavRef.current = true
            setFocusedKey(first.key)
          }
          break
        }
        case 'End': {
          e.preventDefault()
          const last = [...filteredItems].reverse().find(item => !item.isDisabled)
          if (last) {
            isKeyboardNavRef.current = true
            setFocusedKey(last.key)
          }
          break
        }
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
          setSearchValue("")
          break
      }
    }, [navigateToNextItem, navigateToPrevItem, selectFocusedItem, filteredItems, setFocusedKey, setIsOpen, setSearchValue])

    const handleInputKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End' || e.key === 'Enter') {
        handleKeyDown(e as any)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        setSearchValue("")
      }
    }, [handleKeyDown, setIsOpen, setSearchValue])

    const showContent = isOpen && isPositioned

    const hoverHandlers = triggerMode === "hover"
      ? {
        onMouseEnter: () => handleHoverIntent(true),
        onMouseLeave: () => handleHoverIntent(false),
      }
      : {}

    if (!mounted) return null

    return createPortal(
      <>
        {showContent && triggerMode !== "hover" && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 49999 }}
            onClick={() => setIsOpen(false)}
          />
        )}
        {isOpen && (
          <div
            ref={mergedRef}
            className={cn(styles.content, className)}
            data-state={showContent ? "open" : "closed"}
            data-placement={placement.split('-')[0]}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            style={{
              ...floatingStyles,
              zIndex: 50000,
              visibility: isPositioned ? 'visible' : 'hidden',
              outline: 'none',
            }}
            {...hoverHandlers}
          >
            {searchable && (
              <div className="px-2 py-2">
                <Input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  aria-autocomplete="list"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value)
                    onSearch?.(e.target.value)
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder={searchPlaceholder}
                  variant="ghost"
                />
              </div>
            )}
            <Scroll
              className="viewport"
              maxHeight={`calc(${maxItems} * 36px + 8px)`}
              direction="vertical"
              fadeY={!searchable}
              enabled={needsScroll}
              hide={false}
            >
              <div style={{ padding: "0.25rem" }}>
                <List items={filteredItems}>
                  {children}
                </List>
              </div>
            </Scroll>
          </div>
        )}
      </>,
      document.body
    )
  }
)
SelectContent.displayName = "SelectContent"

export type SearchableContentProps = Omit<SelectContentProps, 'searchable'>

/** Dropdown panel with a built-in search input for filtering the option list */
const SearchableContent = React.forwardRef<HTMLDivElement, SearchableContentProps>(
  (props, ref) => <SelectContent {...props} searchable ref={ref} />
)
SearchableContent.displayName = "SearchableContent"

export { SelectContent, SearchableContent }
