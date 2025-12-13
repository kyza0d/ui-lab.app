import * as React from "react"
import * as ReactDOM from "react-dom"
import { useInteractOutside } from "react-aria"
import { useMenuContext } from "./menu"
import type { MenuTriggerProps, MenuContentProps } from "./menu"
import styles from "./menu.module.css"
import { cn } from "@/lib/utils"

// ============================================================================
// Trigger Component
// ============================================================================

const MenuTrigger = React.forwardRef<HTMLDivElement, MenuTriggerProps>(
  ({ children, disabled = false, className }, ref) => {
    const { setIsOpen, setPosition, triggerRef: contextTriggerRef } = useMenuContext()
    const triggerRef = React.useRef<HTMLDivElement>(null)

    const handleMenu = React.useCallback((e: React.MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      setPosition({ x: e.clientX, y: e.clientY })
      setIsOpen(true)
    }, [disabled, setIsOpen, setPosition])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        contextTriggerRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, contextTriggerRef]
    )

    return (
      <div
        ref={mergedRef}
        onContextMenu={handleMenu}
        className={className}
      >
        {children}
      </div>
    )
  }
)
MenuTrigger.displayName = "MenuTrigger"

// ============================================================================
// Content Component
// ============================================================================

const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, onEscapeKeyDown, onPointerDownOutside, sideOffset = 0 }, ref) => {
    const { isOpen, position, close, items, highlightedIndex, setHighlightedIndex, triggerRef } = useMenuContext()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const itemsRef = React.useRef<typeof items>(items)
    const highlightedIndexRef = React.useRef<number>(highlightedIndex)
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
    const [portalStyle, setPortalStyle] = React.useState<React.CSSProperties>({})

    // Handle click outside using useInteractOutside
    useInteractOutside({
      ref: contentRef,
      isDisabled: !isOpen,
      onInteractOutside: (e) => {
        // Don't close if clicking on the trigger
        if (triggerRef.current?.contains(e.target as Node)) {
          return
        }
        onPointerDownOutside?.(e as PointerEvent)
        close()
      },
    })

    React.useEffect(() => {
      itemsRef.current = items
      highlightedIndexRef.current = highlightedIndex
    }, [items, highlightedIndex])

    React.useEffect(() => {
      if (typeof document === "undefined") return

      const container = document.createElement("div")
      container.setAttribute("data-menu-portal", "")
      container.style.cssText = "position: absolute; top: 0; left: 0; z-index: 50;"
      document.body.appendChild(container)
      setPortalContainer(container)

      return () => {
        document.body.removeChild(container)
      }
    }, [])

    React.useEffect(() => {
      if (isOpen) {
        // If position is {0,0}, this was opened via hover - position relative to trigger
        if (position.x === 0 && position.y === 0 && triggerRef.current) {
          const triggerRect = triggerRef.current.getBoundingClientRect()
          const top = triggerRect.bottom + window.scrollY + sideOffset
          const left = triggerRect.left + window.scrollX
          setPortalStyle({ position: "absolute", top, left })
        } else {
          // Position at click location (right-click context menu)
          const top = position.y + window.scrollY + sideOffset
          const left = position.x + window.scrollX
          setPortalStyle({ position: "absolute", top, left })
        }
      }
    }, [isOpen, position, sideOffset, triggerRef])

    React.useEffect(() => {
      if (!isOpen) return

      const handleKeyDown = (e: KeyboardEvent) => {
        const items = itemsRef.current
        const highlightedIndex = highlightedIndexRef.current

        // Check if focus is inside a submenu portal - if so, let the submenu handler process the event
        const activeElement = document.activeElement as Element | null
        const isInSubmenu = activeElement?.closest('[data-menu-sub-portal]') !== null

        // For arrow keys, only process if NOT in a submenu (submenu's handler will take precedence)
        if ((e.key === "ArrowDown" || e.key === "ArrowUp") && isInSubmenu) {
          return
        }

        switch (e.key) {
          case "Escape":
            e.preventDefault()
            onEscapeKeyDown?.(e)
            close()
            break
          case "ArrowDown": {
            e.preventDefault()
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter(i => i >= 0)
            const currentIdx = enabledIndices.indexOf(highlightedIndex)
            if (currentIdx < enabledIndices.length - 1) {
              setHighlightedIndex(enabledIndices[currentIdx + 1])
            } else if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[0])
            }
            break
          }
          case "ArrowUp": {
            e.preventDefault()
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter(i => i >= 0)
            const currentIdx = enabledIndices.indexOf(highlightedIndex)
            if (currentIdx > 0) {
              setHighlightedIndex(enabledIndices[currentIdx - 1])
            } else if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[enabledIndices.length - 1])
            }
            break
          }
          case "ArrowRight": {
            e.preventDefault()
            const item = items[highlightedIndex]
            if (item && !item.isDisabled && item.isSubmenuTrigger && item.onSelect) {
              item.onSelect()
            }
            break
          }
          case "Enter":
          case " ": {
            e.preventDefault()
            const item = items[highlightedIndex]
            if (item && !item.isDisabled) {
              if (item.isSubmenuTrigger && item.onSelect) {
                item.onSelect()
              } else if (item.onSelect) {
                item.onSelect()
              }
            }
            break
          }
          case "Home": {
            e.preventDefault()
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter(i => i >= 0)
            if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[0])
            }
            break
          }
          case "End": {
            e.preventDefault()
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter(i => i >= 0)
            if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[enabledIndices.length - 1])
            }
            break
          }
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }, [isOpen, close, onEscapeKeyDown, setHighlightedIndex])

    React.useEffect(() => {
      if (isOpen && contentRef.current) {
        contentRef.current.focus({ preventScroll: true })
      }
    }, [isOpen])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    if (!portalContainer) return null

    return ReactDOM.createPortal(
      <div
        ref={mergedRef}
        role="menu"
        tabIndex={isOpen ? 0 : -1}
        className={cn(styles.content, className)}
        data-state={isOpen ? "open" : "closed"}
        style={isOpen ? portalStyle : { position: "absolute", visibility: "hidden", pointerEvents: "none" }}
      >
        <div className={styles.viewport}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                _index: index,
                _isHighlighted: isOpen && index === highlightedIndex,
              })
            }
            return child
          })}
        </div>
      </div>,
      portalContainer
    )
  }
)
MenuContent.displayName = "MenuContent"

export { MenuTrigger, MenuContent }
