import * as React from "react"
import * as ReactDOM from "react-dom"
import { useFloating, flip, shift, offset, size, autoUpdate } from '@floating-ui/react-dom'
import { cn } from "@/lib/utils"
import styles from "./Select.module.css"
import { useSelectContext } from "./Select"
import { GroupContext } from "../Group/Group"
import { Scroll } from "../Scroll"
import { Input } from "../Input"

interface SelectContentProps extends React.PropsWithChildren {
  className?: string
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className }, ref) => {
    const { isOpen, setIsOpen, wrapperRef, maxItems, triggerMode, handleHoverIntent } = useSelectContext()
    const groupContext = React.useContext(GroupContext)
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)

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
        size({
          apply({ rects, elements }) {
            let borderAdjustment = 0
            if (groupContext?.isInGroup && elements.reference) {
              const groupElement = (elements.reference as HTMLElement).closest('.group')
              if (groupElement) {
                const computedStyle = window.getComputedStyle(groupElement)
                const borderWidth = parseFloat(computedStyle.borderLeftWidth) || 2
                borderAdjustment = borderWidth * 2
                console.log('[SelectContent] Dynamic border calculation:', {
                  borderLeftWidth: computedStyle.borderLeftWidth,
                  parsedWidth: borderWidth,
                  totalAdjustment: borderAdjustment,
                })
              } else {
                borderAdjustment = 2
              }
            }

            const targetWidth = rects.reference.width + borderAdjustment
            Object.assign(elements.floating.style, {
              width: `${targetWidth}px`,
              maxWidth: `${Math.max(targetWidth, 512)}px`,
              minWidth: `${targetWidth}px`,
            })
          },
          padding: 0,
        }),
      ],
    })

    // Position is ready when Floating UI has calculated x and y coordinates
    const isPositioned = x !== null && y !== null

    // Sync wrapperRef with Floating UI - use layoutEffect for synchronous positioning before paint
    React.useLayoutEffect(() => {
      if (wrapperRef.current) {
        // Always use the full Select wrapper (.select.groupSelectWrapper) as reference
        // This aligns the dropdown with the left edge of the entire Select component
        refs.setReference(wrapperRef.current)
      }
    }, [refs, wrapperRef.current])

    // Portal setup
    React.useEffect(() => {
      if (typeof document === 'undefined') return

      const container = document.createElement('div')
      container.setAttribute('data-select-portal', '')
      container.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 50000;'

      document.body.appendChild(container)
      setPortalContainer(container)

      return () => {
        document.body.removeChild(container)
      }
    }, [])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        refs.setFloating(el)
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, refs]
    )

    if (!portalContainer) return null

    // Only show content visually when open AND positioned to prevent animation from wrong location
    const showContent = isOpen && isPositioned

    const hoverHandlers = triggerMode === "hover"
      ? {
        onMouseEnter: () => handleHoverIntent(true),
        onMouseLeave: () => handleHoverIntent(false),
      }
      : {}

    return ReactDOM.createPortal(
      <>
        {showContent && triggerMode !== "hover" && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 49999 }}
            onClick={() => setIsOpen(false)}
          />
        )}
        {/* Always mount when open so Floating UI can measure, but hide until positioned */}
        {isOpen && (
          <div
            ref={mergedRef}
            className={cn(styles.content, className)}
            data-state={showContent ? "open" : "closed"}
            data-placement={placement.split('-')[0]}
            style={{
              ...floatingStyles,
              // Hide visually until position is calculated to prevent flash at (0,0)
              visibility: isPositioned ? 'visible' : 'hidden',
            }}
            {...hoverHandlers}
          >
            <Scroll
              className="viewport"
              maxHeight={`calc(${maxItems} * 36px + 8px)`}
              direction="vertical"
              style={{ padding: "0.25rem" }}
            >
              {children}
            </Scroll>
          </div>
        )}
      </>,
      portalContainer
    )
  }
)
SelectContent.displayName = "SelectContent"

interface SearchableContentProps extends React.PropsWithChildren {
  className?: string
  searchPlaceholder?: string
  onSearch?: (value: string) => void
}

const SearchableContent = React.forwardRef<HTMLDivElement, SearchableContentProps>(
  ({ children, className, searchPlaceholder = "Search items...", onSearch }, ref) => {
    const {
      isOpen,
      setIsOpen,
      wrapperRef,
      searchValue,
      setSearchValue,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      filteredItems,
      setFocusedKey,
      focusedKey,
      maxItems,
      triggerMode,
      handleHoverIntent,
    } = useSelectContext()
    const groupContext = React.useContext(GroupContext)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)

    const offsetValue = groupContext?.isInGroup ? 4 : 2

    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: 'bottom-start',
      strategy: 'fixed',
      whileElementsMounted: autoUpdate,
      middleware: [
        offset({
          mainAxis: offsetValue,
          crossAxis: groupContext?.isInGroup ? -2 : 0,
        }),
        flip({
          fallbackPlacements: ['top-start'],
        }),
        size({
          apply({ rects, elements }) {
            let borderAdjustment = 0
            if (groupContext?.isInGroup && elements.reference) {
              const groupElement = (elements.reference as HTMLElement).closest('.group')
              if (groupElement) {
                const computedStyle = window.getComputedStyle(groupElement)
                const borderWidth = parseFloat(computedStyle.borderLeftWidth) || 2
                borderAdjustment = borderWidth * 2 // left + right borders
                console.log('[SearchableContent] Dynamic border calculation:', {
                  borderLeftWidth: computedStyle.borderLeftWidth,
                  parsedWidth: borderWidth,
                  totalAdjustment: borderAdjustment,
                })
              } else {
                borderAdjustment = 4
              }
            }

            const targetWidth = rects.reference.width + borderAdjustment
            Object.assign(elements.floating.style, {
              width: `${targetWidth}px`,
              maxWidth: `${Math.max(targetWidth, 512)}px`,
              minWidth: `${targetWidth}px`,
            })
          },
        }),
      ],
    })

    const isPositioned = x !== null && y !== null

    React.useLayoutEffect(() => {
      if (wrapperRef.current) {
        refs.setReference(wrapperRef.current)
      }
    }, [refs, wrapperRef.current])

    React.useEffect(() => {
      if (typeof document === 'undefined') return

      const container = document.createElement('div')
      container.setAttribute('data-select-portal', '')
      container.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 50000;'
      document.body.appendChild(container)
      setPortalContainer(container)

      return () => {
        document.body.removeChild(container)
      }
    }, [])

    // Focus input when opened with RAF to ensure DOM is ready
    React.useEffect(() => {
      if (isOpen && inputRef.current) {
        requestAnimationFrame(() => {
          inputRef.current?.focus({ preventScroll: true })
        })
      }
    }, [isOpen])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        refs.setFloating(el)
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, refs]
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          navigateToNextItem()
          break
        case 'ArrowUp':
          e.preventDefault()
          navigateToPrevItem()
          break
        case 'Enter':
          e.preventDefault()
          selectFocusedItem()
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          setSearchValue("")
          break
        case 'Home':
          if (e.ctrlKey) {
            e.preventDefault()
            const firstEnabled = filteredItems.find(item => !item.isDisabled)
            if (firstEnabled) setFocusedKey(firstEnabled.key)
          }
          break
        case 'End':
          if (e.ctrlKey) {
            e.preventDefault()
            const lastEnabled = [...filteredItems].reverse().find(item => !item.isDisabled)
            if (lastEnabled) setFocusedKey(lastEnabled.key)
          }
          break
      }
    }

    if (!portalContainer) return null

    // Only show content visually when open AND positioned to prevent animation from wrong location
    const showContent = isOpen && isPositioned

    const hoverHandlers = triggerMode === "hover"
      ? {
        onMouseEnter: () => handleHoverIntent(true),
        onMouseLeave: () => handleHoverIntent(false),
      }
      : {}

    return ReactDOM.createPortal(
      <>
        {showContent && triggerMode !== "hover" && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 49999 }}
            onClick={() => setIsOpen(false)}
          />
        )}
        {/* Always mount when open so Floating UI can measure, but hide until positioned */}
        {isOpen && (
          <div
            ref={mergedRef}
            className={cn(styles.content, className)}
            data-state={showContent ? "open" : "closed"}
            data-placement={placement.split('-')[0]}
            style={{
              ...floatingStyles,
              visibility: isPositioned ? 'visible' : 'hidden',
            }}
            {...hoverHandlers}
          >
            <div className="px-2 py-2">
              <Input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-autocomplete="list"
                aria-activedescendant={focusedKey !== null ? String(focusedKey) : undefined}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  onSearch?.(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                variant="ghost"
              />
            </div>
            <Scroll
              className="viewport"
              maxHeight={`calc(${maxItems} * 36px + 8px)`}
              direction="vertical"
              style={{ padding: "0.25rem" }}
            >
              {children}
            </Scroll>
          </div>
        )}
      </>,
      portalContainer
    )
  }
)
SearchableContent.displayName = "SearchableContent"

export { SelectContent, SearchableContent }
export type { SelectContentProps, SearchableContentProps }
