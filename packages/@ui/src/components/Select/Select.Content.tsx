import * as React from "react"
import { createPortal } from "react-dom"
import { useFloating } from "../../hooks/useFloat/react/useFloating"
import { flip } from "../../hooks/useFloat/core/middleware/flip"
import { offset } from "../../hooks/useFloat/core/middleware/offset"
import { autoUpdate } from "../../hooks/useFloat/dom/autoUpdate"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import styles from "./Select.module.css"
import { useSelectContext } from "./Select"
import { GroupContext } from "../Group/Group"
import { Scroll } from "../Scroll"
import { Input } from "../Input"
import { List } from "../List"
import { handleListKeyDown, scrollItemIntoView, useListPointerModality, useMergedRef } from "./Select.shared"

export interface SelectContentStyleSlots {
  root?: StyleValue;
  overlay?: StyleValue;
  searchWrapper?: StyleValue;
  searchInput?: StyleValue;
  listPaddingWrapper?: StyleValue;
}

type SelectContentStylesProp = StylesProp<SelectContentStyleSlots>;

export interface SelectContentProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Renders a search input inside the dropdown for filtering items */
  searchable?: boolean
  /** Placeholder text for the search input when searchable is true */
  searchPlaceholder?: string
  /** Called when the search input value changes */
  onSearch?: (value: string) => void
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectContentStylesProp;
}

const resolveSelectContentBaseStyles = createStylesResolver([
  'root',
  'overlay',
  'searchWrapper',
  'searchInput',
  'listPaddingWrapper',
] as const);

function resolveSelectContentStyles(styles: SelectContentStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveSelectContentBaseStyles(styles)
  const { root, overlay, searchWrapper, searchInput, listPaddingWrapper } = styles
  return resolveSelectContentBaseStyles({ root, overlay, searchWrapper, searchInput, listPaddingWrapper })
}

/** Floating panel that renders the list of selectable options */
const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, searchable = false, searchPlaceholder = "Search items...", onSearch, styles: stylesProp }, ref) => {
    const {
      isOpen,
      setIsOpen,
      setContentPlacement,
      triggerType,
      wrapperRef,
      contentRef,
      triggerRef,
      maxItems,
      triggerMode,
      searchValue,
      setSearchValue,
      filteredItems,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      setFocusedKey,
      focusedKey,
      mouseMoveDetectedRef,
      keyboardScrollIntentRef,
      markKeyboardNavigation,
      moveFocusFromTrigger,
      contentId,
      restoreFocus,
    } = useSelectContext()
    const groupContext = React.useContext(GroupContext)
    const [mounted, setMounted] = React.useState(false)
    const [contentElement, setContentElement] = React.useState<HTMLDivElement | null>(null)
    const floatingRootRef = React.useRef<HTMLDivElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const focusFrameRef = React.useRef<number | null>(null)
    const justOpenedRef = React.useRef(false)

    const offsetValue = groupContext?.isInGroup ? 4 : 2

    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: 'bottom-start',
      // Keep the panel anchored to viewport-fixed/sticky triggers without scroll lag.
      strategy: 'fixed',
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
      if (contentElement && isOpen && wrapperRef.current) {
        const referenceWidth = wrapperRef.current.offsetWidth
        const contentWidth = contentElement.scrollWidth
        const width = Math.max(referenceWidth, contentWidth)
        contentElement.style.width = `${width}px`
        contentElement.style.minWidth = `${referenceWidth}px`
      }
    }, [contentElement, isOpen, wrapperRef])

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
      setContentPlacement(placement.startsWith("top") ? "top" : "bottom")
    }, [placement, setContentPlacement])

    React.useEffect(() => {
      if (isOpen && searchable && inputRef.current) {
        focusFrameRef.current = requestAnimationFrame(() => {
          inputRef.current?.focus({ preventScroll: true })
        })
      }
      return () => {
        if (focusFrameRef.current !== null) {
          cancelAnimationFrame(focusFrameRef.current)
          focusFrameRef.current = null
        }
      }
    }, [isOpen, searchable])

    React.useEffect(() => {
      const shouldKeepTriggerFocus = triggerType === "input" || triggerRef.current?.tagName === "INPUT"

      if (isOpen && !searchable && shouldKeepTriggerFocus) {
        focusFrameRef.current = requestAnimationFrame(() => {
          triggerRef.current?.focus({ preventScroll: true })
        })
      }

      if (isOpen && !searchable && contentElement && !shouldKeepTriggerFocus) {
        focusFrameRef.current = requestAnimationFrame(() => {
          contentElement?.focus({ preventScroll: true })
        })
      }
      return () => {
        if (focusFrameRef.current !== null) {
          cancelAnimationFrame(focusFrameRef.current)
          focusFrameRef.current = null
        }
      }
    }, [isOpen, searchable, contentElement, triggerRef, triggerType])

    useListPointerModality({
      isOpen,
      mouseMoveDetectedRef,
    })

    React.useEffect(() => {
      if (isOpen) {
        justOpenedRef.current = true
      }
    }, [isOpen])

    React.useEffect(() => {
      if (!isOpen || focusedKey === null || !contentElement) return

      const activeItem = contentElement.querySelector('[role="option"][data-focused="true"], [role="option"][data-highlighted="true"]') as HTMLElement | null
      if (!activeItem) return

      if (justOpenedRef.current) {
        justOpenedRef.current = false
        scrollItemIntoView(activeItem, 'instant')
        keyboardScrollIntentRef.current = false
        return
      }

      if (!keyboardScrollIntentRef.current || mouseMoveDetectedRef.current) return

      scrollItemIntoView(activeItem)
      keyboardScrollIntentRef.current = false
    }, [contentElement, focusedKey, isOpen, keyboardScrollIntentRef, mouseMoveDetectedRef])

    const mergedContentRef = useMergedRef<HTMLDivElement>(setContentElement, contentRef, ref)
    const mergedFloatingRef = React.useCallback((el: HTMLDivElement | null) => {
      floatingRootRef.current = el
      refs.setFloating(el)
    }, [refs])

    const closeContent = React.useCallback(() => {
      setIsOpen(false)
      setSearchValue("")
      restoreFocus()
    }, [restoreFocus, setIsOpen, setSearchValue])

    const handleTabNavigation = React.useCallback((e: React.KeyboardEvent) => {
      setIsOpen(false)
      setSearchValue("")
      const direction = e.shiftKey ? -1 : 1
      if (moveFocusFromTrigger(direction as 1 | -1)) {
        e.preventDefault()
      }
    }, [moveFocusFromTrigger, setIsOpen, setSearchValue])

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Tab') {
        handleTabNavigation(e)
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
        markKeyboardNavigation()
      }

      const handled = handleListKeyDown(e, {
        navigateNext: navigateToNextItem,
        navigatePrev: navigateToPrevItem,
        confirm: selectFocusedItem,
        close: closeContent,
        filteredItems,
        setFocusedKey,
      })
      if (!handled) {
        keyboardScrollIntentRef.current = false
      }
    }, [closeContent, filteredItems, handleTabNavigation, keyboardScrollIntentRef, markKeyboardNavigation, navigateToNextItem, navigateToPrevItem, selectFocusedItem, setFocusedKey])

    const handleInputKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') {
        handleTabNavigation(e)
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
        markKeyboardNavigation()
      }

      const handled = handleListKeyDown(e, {
        navigateNext: navigateToNextItem,
        navigatePrev: navigateToPrevItem,
        confirm: selectFocusedItem,
        close: closeContent,
        filteredItems,
        setFocusedKey,
      })
      if (!handled) {
        keyboardScrollIntentRef.current = false
      }
    }, [closeContent, filteredItems, handleTabNavigation, keyboardScrollIntentRef, markKeyboardNavigation, navigateToNextItem, navigateToPrevItem, selectFocusedItem, setFocusedKey])

    React.useEffect(() => {
      if (!isOpen || triggerMode === 'hover') return

      const handlePointerDown = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const isClickInside = wrapperRef.current?.contains(target) ||
          floatingRootRef.current?.contains(target) ||
          Array.from(document.querySelectorAll('[data-select-submenu-content]')).some(el => el.contains(target))

        if (!isClickInside) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handlePointerDown)
      return () => document.removeEventListener('mousedown', handlePointerDown)
    }, [isOpen, triggerMode, wrapperRef, setIsOpen])

    const showContent = isOpen && isPositioned

    if (!mounted) return null

    const resolved = resolveSelectContentStyles(stylesProp);
    const shouldConstrainListHeight = filteredItems.length > maxItems;
    const scrollMaxHeight = shouldConstrainListHeight
      ? `calc(${maxItems} * 36px + 8px)`
      : undefined;

    return createPortal(
      <>
        <div
          ref={mergedFloatingRef}
          className={cn(styles['content-root'], resolved.overlay)}
          style={{
            ...floatingStyles,
            zIndex: 50000,
            visibility: showContent ? 'visible' : 'hidden',
            display: isOpen ? 'block' : 'none',
          }}
        >
          <div
            ref={mergedContentRef}
            id={contentId}
            role="listbox"
            className={cn('select', 'content', styles.content, className, resolved.root)}
            data-state={showContent ? "open" : "closed"}
            data-placement={placement.split('-')[0]}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            style={{
              outline: 'none',
            }}
          >
            {searchable && (
              <div className={cn(styles['search-wrapper'], resolved.searchWrapper)}>
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
                  className={cn(styles['search-content-input'], resolved.searchInput)}
                />
              </div>
            )}
            {shouldConstrainListHeight ? (
              <Scroll
                className="viewport"
                maxHeight={scrollMaxHeight}
                direction="vertical"
                fade-y={!searchable}
                inline
                hide={false}
              >
                <div className={cn(resolved.listPaddingWrapper)} style={{ padding: "0.25rem" }}>
                  <List items={filteredItems}>
                    {children}
                  </List>
                </div>
              </Scroll>
            ) : (
              <div className={cn(resolved.listPaddingWrapper)} style={{ padding: "0.25rem" }}>
                <List items={filteredItems}>
                  {children}
                </List>
              </div>
            )}
          </div>
        </div>
      </>,
      document.body
    )
  }
)
SelectContent.displayName = "SelectContent"

type SearchableContentProps = Omit<SelectContentProps, 'searchable'>

/** Dropdown panel with a built-in search input for filtering the option list */
const SearchableContent = React.forwardRef<HTMLDivElement, SearchableContentProps>(
  (props, ref) => <SelectContent {...props} searchable ref={ref} />
)
SearchableContent.displayName = "SearchableContent"

export { SelectContent, SearchableContent }
