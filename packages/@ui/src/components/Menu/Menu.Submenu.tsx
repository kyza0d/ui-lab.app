import * as React from "react"
import { createPortal } from "react-dom"
import { useFloating } from "../../hooks/useFloat/react/useFloating"
import { flip } from "../../hooks/useFloat/core/middleware/flip"
import { offset } from "../../hooks/useFloat/core/middleware/offset"
import { autoUpdate } from "../../hooks/useFloat/dom/autoUpdate"
import { useHover } from "react-aria"
import { ChevronRight } from "lucide-react"
import { useMenuContext, useMenuSubmenuContext, MenuSubmenuContext } from "./Menu"
import type { MenuSubProps, MenuSubTriggerProps, MenuSubContentProps } from "./menu.types"
import type { Key } from "react-aria"
import styles from "./Menu.module.css"
import { cn } from "@/lib/utils"
import { useListNavigation, useMergedRef, handleListKeyDown, scrollItemIntoView } from "../../utils/list-navigation"
import type { MenuItemExtras } from "./menu.types"
import { Scroll } from "../Scroll"
import { List } from "../List"

/** Context provider that scopes a nested flyout submenu within the menu */
const MenuSub = ({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: MenuSubProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [triggerKey, setTriggerKey] = React.useState<Key | null>(null)
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen

  const nav = useListNavigation({ isOpen })
  const itemExtrasRef = React.useRef<Map<Key, MenuItemExtras>>(new Map())
  const mouseMoveDetectedRef = React.useRef(true)

  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {
    nav.registerItem(key, textValue, isDisabled)
    itemExtrasRef.current.set(key, { onSelect, isSubmenuTrigger })
  }, [nav.registerItem])

  const unregisterItem = React.useCallback((key: Key) => {
    nav.unregisterItem(key)
    itemExtrasRef.current.delete(key)
  }, [nav.unregisterItem])

  const isOpenRef = React.useRef(isOpen)
  isOpenRef.current = isOpen

  const setIsOpen = React.useCallback((open: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof open === "function" ? open(isOpenRef.current) : open
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newValue)
    }
    onOpenChange?.(newValue)
    if (!newValue) {
      nav.setFocusedKey(null)
    }
  }, [controlledOpen, onOpenChange, nav.setFocusedKey])

  const selectFocusedItem = React.useCallback(() => {
    if (nav.focusedKey === null) return
    const item = nav.items.find(i => i.key === nav.focusedKey)
    if (item?.isDisabled) return
    const extras = itemExtrasRef.current.get(nav.focusedKey)
    extras?.onSelect?.()
  }, [nav.focusedKey, nav.items])

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const parentMenuRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const parentSubmenuCtx = useMenuSubmenuContext()
  const submenuLevel = (parentSubmenuCtx?.submenuLevel ?? 0) + 1

  const isFocusedItemSubmenu = React.useCallback(() => {
    if (nav.focusedKey === null) return false
    const extras = itemExtrasRef.current.get(nav.focusedKey)
    return extras?.isSubmenuTrigger ?? false
  }, [nav.focusedKey])

  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen: setIsOpen as React.Dispatch<React.SetStateAction<boolean>>,
    triggerRef,
    parentMenuRef,
    submenuLevel,
    items: nav.items,
    focusedKey: nav.focusedKey,
    setFocusedKey: nav.setFocusedKey,
    navigateToNextItem: nav.navigateToNextItem,
    navigateToPrevItem: nav.navigateToPrevItem,
    registerItem,
    unregisterItem,
    selectFocusedItem,
    isFocusedItemSubmenu,
    contentRef,
    closeTimeoutRef,
    mouseMoveDetectedRef,
    triggerKey,
    setTriggerKey,
    parentSubmenuContext: parentSubmenuCtx,
  }), [isOpen, setIsOpen, submenuLevel, nav.items, nav.focusedKey, nav.setFocusedKey, nav.navigateToNextItem, nav.navigateToPrevItem, registerItem, unregisterItem, selectFocusedItem, isFocusedItemSubmenu, triggerKey, parentSubmenuCtx])

  return (
    <MenuSubmenuContext.Provider value={contextValue}>
      {children}
    </MenuSubmenuContext.Provider>
  )
}
MenuSub.displayName = "MenuSub"

/** Menu item that opens a nested submenu on hover or keyboard right-arrow */
const MenuSubTrigger = React.forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, disabled = false, inset, textValue, className }, ref) => {
    const rootContext = useMenuContext()
    const submenuContext = useMenuSubmenuContext()
    // Register with parent submenu if nested, root menu if top-level
    const parentSub = submenuContext?.parentSubmenuContext
    const { registerItem, unregisterItem, setFocusedKey, focusedKey, mouseMoveDetectedRef } = parentSub ?? rootContext
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const key = React.useMemo(() => textValue ?? String(children) ?? `subtrigger-${React.useId()}`, [textValue, children])
    const finalTextValue = textValue ?? String(children)
    const setSubmenuOpen = submenuContext?.setIsOpen
    const isHighlighted = focusedKey === key

    const handleSelectRef = React.useRef<() => void>(null)
    handleSelectRef.current = () => {
      if (disabled) return
      setSubmenuOpen?.(true)
    }

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, () => handleSelectRef.current?.(), true)
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, registerItem, unregisterItem])

    React.useEffect(() => {
      submenuContext?.setTriggerKey(key)
    }, [key, submenuContext])

    const { hoverProps, isHovered } = useHover({
      isDisabled: disabled,
      onHoverStart: () => {
        setFocusedKey(key)
        mouseMoveDetectedRef.current = true
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
        setSubmenuOpen?.(true)
      },
      onHoverEnd: () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
          hoverTimeoutRef.current = null
        }
      },
    })

    React.useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
      }
    }, [])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (submenuContext) {
          submenuContext.triggerRef.current = el
        }
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, submenuContext]
    )

    return (
      <div
        ref={mergedRef}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={submenuContext?.isOpen}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn(styles.subTrigger, className)}
        data-highlighted={isHighlighted || isHovered || undefined}
        data-disabled={disabled || undefined}
        data-inset={inset || undefined}
        data-state={submenuContext?.isOpen ? "open" : "closed"}
        onClick={() => handleSelectRef.current?.()}
        {...hoverProps}
      >
        {children}
        <ChevronRight className={styles.subTriggerChevron} />
      </div>
    )
  }
)
MenuSubTrigger.displayName = "MenuSubTrigger"

/** Floating panel containing the items of a nested submenu */
const MenuSubContent = React.forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, className, sideOffset = 8, alignOffset = 0 }, ref) => {
    const submenuContext = useMenuSubmenuContext()
    const parentContext = useMenuContext()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = React.useState(false)
    const [floatingElement, setFloatingElement] = React.useState<HTMLDivElement | null>(null)
    const [needsScroll, setNeedsScroll] = React.useState(false)
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: "right-start",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset({ mainAxis: sideOffset, crossAxis: alignOffset }),
        flip({ fallbackPlacements: ["left-start"] }),
      ],
    })

    const isPositioned = x !== null && y !== null

    React.useLayoutEffect(() => {
      if (submenuContext?.isOpen && submenuContext.triggerRef.current) {
        refs.setReference(submenuContext.triggerRef.current)
      }
    }, [submenuContext?.isOpen, submenuContext?.triggerRef, refs])

    const { hoverProps } = useHover({
      onHoverStart: () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
          closeTimeoutRef.current = null
        }
      },
    })

    // Close when parent closes or parent focus leaves our trigger
    const parentSub = submenuContext?.parentSubmenuContext
    const effectiveParentIsOpen = parentSub?.isOpen ?? parentContext.isOpen
    const effectiveParentFocusedKey = parentSub?.focusedKey ?? parentContext.focusedKey

    React.useEffect(() => {
      if (!submenuContext) return
      if (!effectiveParentIsOpen && submenuContext.isOpen) {
        submenuContext.setIsOpen(false)
      }
      if (submenuContext.isOpen && effectiveParentFocusedKey !== submenuContext.triggerKey) {
        submenuContext.setIsOpen(false)
      }
    }, [effectiveParentIsOpen, effectiveParentFocusedKey, submenuContext])

    React.useEffect(() => {
      setMounted(true)
    }, [])

    React.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
        }
      }
    }, [])

    React.useEffect(() => {
      if (submenuContext?.isOpen && floatingElement) {
        if (submenuContext.items.length > 0) {
          const firstEnabled = submenuContext.items.find(i => !i.isDisabled)
          if (firstEnabled) {
            submenuContext.setFocusedKey(firstEnabled.key)
          }
        }
        floatingElement.focus({ preventScroll: true })
      }
    }, [submenuContext?.isOpen, floatingElement])

    React.useEffect(() => {
      if (!submenuContext?.isOpen) return
      const handleWindowKeyDown = (e: KeyboardEvent) => {
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
          if (submenuContext.mouseMoveDetectedRef) {
            submenuContext.mouseMoveDetectedRef.current = false
          }
        }
      }
      const handleWindowMouseMove = () => {
        if (submenuContext.mouseMoveDetectedRef && !submenuContext.mouseMoveDetectedRef.current) {
          submenuContext.mouseMoveDetectedRef.current = true
        }
      }
      window.addEventListener("keydown", handleWindowKeyDown)
      window.addEventListener("mousemove", handleWindowMouseMove)
      return () => {
        window.removeEventListener("keydown", handleWindowKeyDown)
        window.removeEventListener("mousemove", handleWindowMouseMove)
      }
    }, [submenuContext?.isOpen])

    React.useEffect(() => {
      if (!submenuContext?.isOpen || !floatingElement) return
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
    }, [submenuContext?.isOpen, floatingElement])

    const mergedRef = useMergedRef<HTMLDivElement>(refs.setFloating, setFloatingElement, contentRef, (el: HTMLDivElement | null) => {
      if (submenuContext) submenuContext.contentRef.current = el
    }, ref)

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!submenuContext) return

      if (e.key === "ArrowLeft" || e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
        submenuContext.setIsOpen(false)
        if (submenuContext.triggerRef.current) {
          submenuContext.triggerRef.current.focus()
        }
        return
      }

      if (e.key === "ArrowRight" && submenuContext.isFocusedItemSubmenu()) {
        e.preventDefault()
        e.stopPropagation()
        submenuContext.selectFocusedItem()
        return
      }

      e.stopPropagation()

      handleListKeyDown(e, {
        navigateNext: submenuContext.navigateToNextItem,
        navigatePrev: submenuContext.navigateToPrevItem,
        confirm: () => {
          submenuContext.selectFocusedItem()
          parentContext.close()
        },
        close: () => {
          submenuContext.setIsOpen(false)
          if (submenuContext.triggerRef.current) {
            submenuContext.triggerRef.current.focus()
          }
        },
        filteredItems: submenuContext.items,
        setFocusedKey: submenuContext.setFocusedKey,
      })
    }, [submenuContext, parentContext.close])

    if (!mounted || !submenuContext) return null

    const showContent = submenuContext.isOpen && isPositioned

    return createPortal(
      <>
        {showContent && (
          <div
            ref={mergedRef}
            role="menu"
            tabIndex={-1}
            className={cn(styles.subContent, className)}
            data-state={showContent ? "open" : "closed"}
            data-placement={placement.split("-")[0]}
            onKeyDown={handleKeyDown}
            style={{
              ...floatingStyles,
              zIndex: 50001 + (submenuContext.submenuLevel ?? 0),
              visibility: isPositioned ? "visible" : "hidden",
              outline: "none",
            }}
            {...hoverProps}
          >
            <Scroll
              className={styles.list}
              direction="vertical"
              fadeY
              enabled={needsScroll}
              hide={false}
            >
              <div style={{ padding: "0.25rem" }}>
                <List items={submenuContext.items}>
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
MenuSubContent.displayName = "MenuSubContent"

export { MenuSub, MenuSubTrigger, MenuSubContent }
