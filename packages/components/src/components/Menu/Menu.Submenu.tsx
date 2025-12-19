import * as React from "react"
import * as ReactDOM from "react-dom"
import { useFocusRing, useHover } from "react-aria"
import { ChevronRight } from "lucide-react"
import { useMenuContext, useMenuSubmenuContext, MenuSubmenuContext } from "./Menu"
import type { MenuSubProps, MenuSubTriggerProps, MenuSubContentProps, ItemData } from "./Menu"
import type { Key } from "react-aria"
import styles from "./Menu.module.css"
import { cn } from "@/lib/utils"

// ============================================================================
// Submenu Provider
// ============================================================================

const MenuSub = ({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: MenuSubProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const registeredItemsRef = React.useRef<Map<Key, ItemData>>(new Map())
  const [registeredItems, setRegisteredItems] = React.useState<ItemData[]>([])

  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void) => {
    registeredItemsRef.current.set(key, { key, textValue, isDisabled, onSelect })
    setRegisteredItems(Array.from(registeredItemsRef.current.values()))
  }, [])

  const unregisterItem = React.useCallback((key: Key) => {
    registeredItemsRef.current.delete(key)
    setRegisteredItems(Array.from(registeredItemsRef.current.values()))
  }, [])

  const setIsOpen = React.useCallback((open: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof open === "function" ? open(isOpen) : open
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newValue)
    }
    onOpenChange?.(newValue)
    if (!newValue) {
      setHighlightedIndex(0)
    }
  }, [controlledOpen, isOpen, onOpenChange])

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const parentMenuRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const submenuContext = useMenuSubmenuContext()
  const submenuLevel = (submenuContext?.submenuLevel ?? 0) + 1

  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen: setIsOpen as React.Dispatch<React.SetStateAction<boolean>>,
    triggerRef,
    parentMenuRef,
    submenuLevel,
    items: registeredItems,
    highlightedIndex,
    setHighlightedIndex,
    registerItem,
    unregisterItem,
    contentRef,
    closeTimeoutRef,
  }), [isOpen, setIsOpen, submenuLevel, registeredItems, highlightedIndex, registerItem, unregisterItem])

  return (
    <MenuSubmenuContext.Provider value={contextValue}>
      {children}
    </MenuSubmenuContext.Provider>
  )
}
MenuSub.displayName = "MenuSub"

// ============================================================================
// Submenu Trigger
// ============================================================================

const MenuSubTrigger = React.forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, disabled = false, inset, textValue, className, _index = 0, _isHighlighted }, ref) => {
    const parentContext = useMenuContext()
    const { registerItem, unregisterItem, setHighlightedIndex } = parentContext
    const submenuContext = useMenuSubmenuContext()
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const { focusProps, isFocusVisible } = useFocusRing()
    const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const key = React.useMemo(() => textValue ?? String(children) ?? `subtrigger-${_index}`, [textValue, children, _index])
    const finalTextValue = textValue ?? String(children)
    const setSubmenuOpen = submenuContext?.setIsOpen

    // Compute if this trigger is highlighted based on parent's highlighted index
    const triggerIndex = React.useMemo(() => {
      return parentContext.items.findIndex(item => item.key === key)
    }, [parentContext.items, key])

    const isHighlightedByParent = parentContext.highlightedIndex === triggerIndex && triggerIndex >= 0

    const handleSelect = React.useCallback(() => {
      if (disabled) return
      setSubmenuOpen?.(true)
    }, [disabled, setSubmenuOpen])

    React.useEffect(() => {
      registerItem(key, finalTextValue, disabled, handleSelect, true)
      return () => unregisterItem(key)
    }, [key, finalTextValue, disabled, handleSelect, registerItem, unregisterItem])

    const { hoverProps, isHovered } = useHover({
      isDisabled: disabled,
      onHoverStart: () => {
        if (triggerIndex >= 0) {
          setHighlightedIndex(triggerIndex)
        }
        // Open submenu after delay
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
        hoverTimeoutRef.current = setTimeout(() => {
          setSubmenuOpen?.(true)
        }, 200)
      },
      onHoverEnd: () => {
        // Clear open timeout if we leave before it fires
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
        data-highlighted={isHighlightedByParent || isHovered || undefined}
        data-disabled={disabled || undefined}
        data-inset={inset || undefined}
        data-state={submenuContext?.isOpen ? "open" : "closed"}
        data-focus-visible={isFocusVisible || undefined}
        onClick={handleSelect}
        {...hoverProps}
        {...focusProps}
      >
        {children}
        <ChevronRight className={styles.subTriggerChevron} />
      </div>
    )
  }
)
MenuSubTrigger.displayName = "MenuSubTrigger"

// ============================================================================
// Submenu Content
// ============================================================================

const MenuSubContent = React.forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, className, sideOffset = 2, alignOffset = -4 }, ref) => {
    const submenuContext = useMenuSubmenuContext()
    const parentContext = useMenuContext()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const itemsRef = React.useRef<ItemData[]>([])
    const highlightedIndexRef = React.useRef<number>(0)
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
    const [portalStyle, setPortalStyle] = React.useState<React.CSSProperties>({})
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const { hoverProps } = useHover({
      onHoverStart: () => {
        // Cancel any pending close timeout
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
          closeTimeoutRef.current = null
        }
      },
    })

    // Close submenu when parent menu closes
    React.useEffect(() => {
      if (!parentContext.isOpen && submenuContext?.isOpen) {
        submenuContext.setIsOpen(false)
      }
    }, [parentContext.isOpen, submenuContext])

    React.useEffect(() => {
      if (submenuContext) {
        itemsRef.current = submenuContext.items
        highlightedIndexRef.current = submenuContext.highlightedIndex
      }
    }, [submenuContext?.items, submenuContext?.highlightedIndex])

    React.useEffect(() => {
      if (typeof document === "undefined") return

      const container = document.createElement("div")
      container.setAttribute("data-menu-sub-portal", "")
      container.style.cssText = "position: absolute; top: 0; left: 0; z-index: 51;"
      document.body.appendChild(container)
      setPortalContainer(container)

      return () => {
        document.body.removeChild(container)
      }
    }, [])

    React.useEffect(() => {
      if (submenuContext?.isOpen && submenuContext.triggerRef.current) {
        const triggerRect = submenuContext.triggerRef.current.getBoundingClientRect()
        const top = triggerRect.top + window.scrollY + alignOffset
        const left = triggerRect.right + window.scrollX + sideOffset
        setPortalStyle({ position: "absolute", top, left })
      }
    }, [submenuContext?.isOpen, submenuContext?.triggerRef, sideOffset, alignOffset])

    React.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
        }
      }
    }, [])

    React.useEffect(() => {
      if (!submenuContext?.isOpen) return

      const handleKeyDown = (e: KeyboardEvent) => {
        const items = itemsRef.current
        const highlightedIndex = highlightedIndexRef.current
        const setHighlightedIndex = submenuContext.setHighlightedIndex

        switch (e.key) {
          case "Escape":
          case "ArrowLeft": {
            e.preventDefault()
            e.stopPropagation()
            submenuContext.setIsOpen(false)
            if (submenuContext.triggerRef.current) {
              submenuContext.triggerRef.current.focus()
            }
            break
          }
          case "ArrowDown": {
            e.preventDefault()
            e.stopPropagation()
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
            e.stopPropagation()
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter(i => i >= 0)
            const currentIdx = enabledIndices.indexOf(highlightedIndex)
            if (currentIdx > 0) {
              setHighlightedIndex(enabledIndices[currentIdx - 1])
            } else if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[enabledIndices.length - 1])
            }
            break
          }
          case "Enter":
          case " ": {
            e.preventDefault()
            e.stopPropagation()
            const item = items[highlightedIndex]
            if (item && !item.isDisabled && item.onSelect) {
              item.onSelect()
              parentContext.close()
            }
            break
          }
          case "Home": {
            e.preventDefault()
            e.stopPropagation()
            const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter(i => i >= 0)
            if (enabledIndices.length > 0) {
              setHighlightedIndex(enabledIndices[0])
            }
            break
          }
          case "End": {
            e.preventDefault()
            e.stopPropagation()
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
    }, [submenuContext?.isOpen, submenuContext?.setIsOpen, parentContext?.close, submenuContext?.triggerRef])

    React.useEffect(() => {
      if (submenuContext?.isOpen && contentRef.current) {
        const enabledIndices = submenuContext.items
          .map((item, i) => item.isDisabled ? -1 : i)
          .filter(i => i >= 0)

        if (enabledIndices.length > 0) {
          submenuContext.setHighlightedIndex(enabledIndices[0])
        }

        contentRef.current.focus({ preventScroll: true })
      }
    }, [submenuContext?.isOpen, submenuContext?.items, submenuContext?.setHighlightedIndex])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (submenuContext) {
          submenuContext.contentRef.current = el
        }
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, submenuContext]
    )

    if (!portalContainer || !submenuContext) return null

    return ReactDOM.createPortal(
      <div
        ref={mergedRef}
        role="menu"
        tabIndex={submenuContext.isOpen ? 0 : -1}
        className={cn(styles.subContent, className)}
        data-state={submenuContext.isOpen ? "open" : "closed"}
        style={submenuContext.isOpen ? portalStyle : { position: "absolute", visibility: "hidden", pointerEvents: "none" }}
        {...hoverProps}
      >
        <div className={styles.viewport}>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                _index: index,
                _isHighlighted: submenuContext.isOpen && index === submenuContext.highlightedIndex,
                _isInSubmenu: true,
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
MenuSubContent.displayName = "MenuSubContent"

export { MenuSub, MenuSubTrigger, MenuSubContent }
