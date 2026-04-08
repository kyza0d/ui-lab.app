import * as React from "react"
import { createPortal } from "react-dom"
import { mergeProps } from "react-aria"
import { useFloating } from "../../hooks/useFloat/react/useFloating"
import { flip } from "../../hooks/useFloat/core/middleware/flip"
import { offset as offsetMiddleware } from "../../hooks/useFloat/core/middleware/offset"
import { autoUpdate } from "../../hooks/useFloat/dom/autoUpdate"
import { cn } from "@/lib/utils"
import { createStylesResolver } from "@/lib/styles"
import css from "./Menu.module.css"
import { useMenuContext } from "./Menu"
import type { MenuTriggerProps, MenuContentProps } from "./menu.types"
import {
  useMergedRef,
  handleListKeyDown,
  useListPointerModality,
  useListScrollIntoView,
} from "../../utils/list-navigation"
import { Scroll } from "../Scroll"
import { List } from "../List"
import { useScrollLock } from "../../hooks/useScrollLock"

const resolveMenuTriggerBaseStyles = createStylesResolver(['root'] as const);
const resolveMenuContentBaseStyles = createStylesResolver(['root', 'list'] as const);

function resolveMenuTriggerStyles(styles: MenuTriggerProps["styles"]) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveMenuTriggerBaseStyles(styles)
  const { root } = styles
  return resolveMenuTriggerBaseStyles({ root })
}

function resolveMenuContentStyles(styles: MenuContentProps["styles"]) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveMenuContentBaseStyles(styles)
  const { root, list } = styles
  return resolveMenuContentBaseStyles({ root, list })
}

/** Wrapper element that opens the context menu on right-click */
const MenuTrigger = React.forwardRef<HTMLElement, MenuTriggerProps>(
  ({ children, disabled = false, className, styles }, ref) => {
    const { isOpen, setIsOpen, type, clickPositionRef, triggerRef: contextTriggerRef } = useMenuContext()
    const resolved = resolveMenuTriggerStyles(styles)

    const handleContextMenu = React.useCallback((e: React.MouseEvent) => {
      if (disabled || type !== "context-menu") return
      e.preventDefault()
      clickPositionRef.current = { x: e.clientX, y: e.clientY }
      setIsOpen(true)
    }, [disabled, type, setIsOpen, clickPositionRef])

    const handleClick = React.useCallback((e: React.MouseEvent) => {
      if (disabled || type !== "pop-over") return
      clickPositionRef.current = { x: 0, y: 0 }
      setIsOpen(prev => !prev)
    }, [disabled, type, setIsOpen, clickPositionRef])

    const mergedRef = useMergedRef<HTMLElement>(contextTriggerRef, ref)

    const triggerProps = {
      onContextMenu: handleContextMenu,
      onClickCapture: handleClick,
      className: cn('menu', 'trigger', css.trigger, className, resolved.root),
      'data-pressed': isOpen ? "true" : "false",
      'data-type': type,
    }

    const [child] = React.Children.toArray(children)

    if (React.isValidElement(child) && child.type !== React.Fragment) {
      const childElement = child as React.ReactElement<any>

      return React.cloneElement(childElement, {
        ...mergeProps(triggerProps, childElement.props),
          className: cn(
            childElement.props.className,
            'menu',
            'trigger',
            css.trigger,
            className,
            resolved.root,
          ),
          ref: mergedRef,
          'data-pressed': isOpen ? "true" : "false",
          'data-type': type,
        } as any)
    }

    return (
      <div
        ref={mergedRef as React.Ref<HTMLDivElement>}
        {...triggerProps}
      >
        {children}
      </div>
    )
  }
)
MenuTrigger.displayName = "MenuTrigger"

/** Floating panel that contains the menu items, positioned relative to the click location */
const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, onEscapeKeyDown, side = "bottom", align = "start", offset = 0, styles }, ref) => {
    const {
      isOpen,
      type,
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

    const { refs, floatingStyles, x, y, placement } = useFloating({
      placement: type === "context-menu" ? "bottom-start" : `${side}${align === "center" ? "" : `-${align}`}` as any,
      strategy: "absolute",
      whileElementsMounted: autoUpdate,
      middleware: [
        offsetMiddleware({ mainAxis: offset, crossAxis: offset }),
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
      if (isOpen && floatingElement) {
        requestAnimationFrame(() => {
          floatingElement?.focus({ preventScroll: true })
        })
      }
    }, [isOpen, floatingElement])

    useListPointerModality({
      isOpen,
      mouseMoveDetectedRef,
    })

    useListScrollIntoView({
      activeKey: focusedKey,
      container: floatingElement,
      isOpen,
      mouseMoveDetectedRef,
      itemSelector: '[data-focused="true"], [data-highlighted="true"]',
    })

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
    const resolved = resolveMenuContentStyles(styles);

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
            className={cn('menu', 'content', css.content, className, resolved.root)}
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
              className={cn(css.list, resolved.list)}
              direction="vertical"
              fade-y
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
