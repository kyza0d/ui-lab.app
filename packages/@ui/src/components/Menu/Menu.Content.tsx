import * as React from "react"
import { createPortal } from "react-dom"
import { useFloating, flip, offset, autoUpdate } from "@floating-ui/react-dom"
import { cn } from "@/lib/utils"
import styles from "./Menu.module.css"
import { useMenuContext } from "./Menu"
import type { MenuTriggerProps, MenuContentProps } from "./menu.types"
import { useMergedRef, handleListKeyDown, scrollItemIntoView } from "../../utils/list-navigation"
import { Scroll } from "../Scroll"
import { List } from "../List"
import { useScrollLock } from "../../hooks/useScrollLock"

/** Wrapper element that opens the context menu on right-click */
const MenuTrigger = React.forwardRef<HTMLDivElement, MenuTriggerProps>(
  ({ children, disabled = false, className }, ref) => {
    const { setIsOpen, clickPositionRef, triggerRef: contextTriggerRef } = useMenuContext()

    const handleMenu = React.useCallback((e: React.MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      clickPositionRef.current = { x: e.clientX, y: e.clientY }
      setIsOpen(true)
    }, [disabled, setIsOpen, clickPositionRef])

    const mergedRef = useMergedRef<HTMLDivElement>(contextTriggerRef, ref)

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

/** Floating panel that contains the menu items, positioned relative to the click location */
const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, onEscapeKeyDown, sideOffset = 0 }, ref) => {
    const {
      isOpen,
      close,
      items,
      focusedKey,
      setFocusedKey,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      isFocusedItemSubmenu,
      mouseMoveDetectedRef,
      clickPositionRef,
      triggerRef,
    } = useMenuContext()
    useScrollLock(isOpen)
    const [mounted, setMounted] = React.useState(false)
    const [floatingElement, setFloatingElement] = React.useState<HTMLDivElement | null>(null)
    const [needsScroll, setNeedsScroll] = React.useState(false)
    const wasJustOpenedRef = React.useRef(false)

    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: "bottom-start",
      strategy: "absolute",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset({ mainAxis: sideOffset }),
        flip(),
      ],
    })

    const isPositioned = x !== null && y !== null

    React.useLayoutEffect(() => {
      if (!isOpen) return
      const pos = clickPositionRef.current
      if (pos.x === 0 && pos.y === 0 && triggerRef.current) {
        refs.setReference(triggerRef.current)
      } else {
        refs.setReference({
          getBoundingClientRect: () => ({
            x: pos.x, y: pos.y, width: 0, height: 0,
            top: pos.y, left: pos.x, bottom: pos.y, right: pos.x,
          }),
        })
      }
    }, [isOpen, refs, clickPositionRef, triggerRef])

    React.useEffect(() => {
      setMounted(true)
    }, [])

    React.useEffect(() => {
      if (isOpen) {
        wasJustOpenedRef.current = true
      }
    }, [isOpen])

    React.useEffect(() => {
      if (isOpen && floatingElement) {
        requestAnimationFrame(() => {
          floatingElement?.focus({ preventScroll: true })
        })
      }
    }, [isOpen, floatingElement])

    React.useEffect(() => {
      if (!isOpen) return
      const handleWindowKeyDown = (e: KeyboardEvent) => {
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
          mouseMoveDetectedRef.current = false
        }
      }
      const handleWindowMouseMove = () => {
        if (!mouseMoveDetectedRef.current) {
          mouseMoveDetectedRef.current = true
        }
      }
      window.addEventListener("keydown", handleWindowKeyDown)
      window.addEventListener("mousemove", handleWindowMouseMove)
      return () => {
        window.removeEventListener("keydown", handleWindowKeyDown)
        window.removeEventListener("mousemove", handleWindowMouseMove)
      }
    }, [isOpen, mouseMoveDetectedRef])

    React.useEffect(() => {
      if (!isOpen || focusedKey === null || !floatingElement) return
      const shouldScroll = !mouseMoveDetectedRef.current || wasJustOpenedRef.current
      if (!shouldScroll) return
      wasJustOpenedRef.current = false
      const el = floatingElement.querySelector('[data-highlighted="true"]') as HTMLElement
      if (el) scrollItemIntoView(el)
    }, [focusedKey, isOpen, floatingElement, mouseMoveDetectedRef])

    React.useEffect(() => {
      if (!isOpen || !floatingElement) return
      const maxHeightPx = 384
      const measure = () => {
        const listElement = floatingElement.querySelector('[role="list"]') as HTMLElement | null
        if (!listElement) return
        const scrollContainer = listElement.parentElement?.parentElement as HTMLElement | null
        if (!scrollContainer) return
        setNeedsScroll(scrollContainer.scrollHeight > maxHeightPx)
      }
      measure()
      const observer = new ResizeObserver(measure)
      observer.observe(floatingElement)
      return () => observer.disconnect()
    }, [isOpen, floatingElement])

    const mergedRef = useMergedRef<HTMLDivElement>(refs.setFloating, setFloatingElement, ref)

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (isFocusedItemSubmenu()) {
          e.preventDefault()
          selectFocusedItem()
          return
        }
      }

      if (e.key === "Escape") {
        e.preventDefault()
        close()
        onEscapeKeyDown?.(e.nativeEvent)
        return
      }

      handleListKeyDown(e, {
        navigateNext: navigateToNextItem,
        navigatePrev: navigateToPrevItem,
        confirm: selectFocusedItem,
        close,
        filteredItems: items,
        setFocusedKey,
      })
    }, [navigateToNextItem, navigateToPrevItem, selectFocusedItem, close, items, setFocusedKey, isFocusedItemSubmenu, onEscapeKeyDown])

    const showContent = isOpen && isPositioned

    if (!mounted) return null

    return createPortal(
      <>
        {showContent && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 49999 }}
            onClick={close}
          />
        )}
        {isOpen && (
          <div
            ref={mergedRef}
            role="menu"
            tabIndex={-1}
            className={cn(styles.content, className)}
            data-state={showContent ? "open" : "closed"}
            data-placement={placement.split("-")[0]}
            onKeyDown={handleKeyDown}
            style={{
              ...floatingStyles,
              zIndex: 50000,
              visibility: isPositioned ? "visible" : "hidden",
              outline: "none",
            }}
          >
            <Scroll
              className={styles.list}
              direction="vertical"
              fadeY
              enabled={needsScroll}
              hide={false}
            >
              <div style={{ padding: "0.25rem" }}>
                <List items={items}>
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
MenuContent.displayName = "MenuContent"

export { MenuTrigger, MenuContent }
