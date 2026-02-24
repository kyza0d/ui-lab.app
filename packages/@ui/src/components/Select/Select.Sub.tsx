import * as React from "react"
import { createPortal } from "react-dom"
import { useFloating, flip, offset, autoUpdate } from "@floating-ui/react-dom"
import { useHover } from "react-aria"
import { ChevronRight } from "lucide-react"
import { useSelectContext, SelectContext, type SelectContextValue } from "./Select"
import type { Key } from "react-aria"
import styles from "./Select.module.css"
import { cn } from "@/lib/utils"
import { useListNavigation, handleListKeyDown } from "./Select.shared"
import type { ItemData } from "./Select.shared"
import { Scroll } from "../Scroll"
import { List } from "../List"

interface SelectSubmenuContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  triggerRef: React.MutableRefObject<HTMLDivElement | null>
  parentMenuRef: React.MutableRefObject<HTMLDivElement | null>
  submenuLevel: number
  items: ItemData[]
  focusedKey: Key | null
  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>
  navigateToNextItem: () => void
  navigateToPrevItem: () => void
  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void
  unregisterItem: (key: Key) => void
  selectFocusedItem: () => void
  isFocusedItemSubmenu: () => boolean
  contentRef: React.MutableRefObject<HTMLDivElement | null>
  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  mouseMoveDetectedRef: React.MutableRefObject<boolean>
  triggerKey: Key | null
  setTriggerKey: React.Dispatch<React.SetStateAction<Key | null>>
  parentSubmenuContext: SelectSubmenuContextValue | null
}

const SelectSubmenuContext = React.createContext<SelectSubmenuContextValue | null>(null)

export function useSelectSubmenuContext() {
  return React.useContext(SelectSubmenuContext)
}

interface SelectSubProps extends React.PropsWithChildren {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface SelectSubTriggerProps extends React.PropsWithChildren {
  disabled?: boolean
  className?: string
  textValue?: string
}

export interface SelectSubContentProps extends React.PropsWithChildren {
  className?: string
  sideOffset?: number
  alignOffset?: number
}

const SelectSub = ({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: SelectSubProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [triggerKey, setTriggerKey] = React.useState<Key | null>(null)
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen

  const rootSelectContext = useSelectContext()
  const nav = useListNavigation({ isOpen })
  const itemExtrasRef = React.useRef<Map<Key, { onSelect?: () => void; isSubmenuTrigger?: boolean }>>(new Map())
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

  const setIsOpen = React.useCallback((open: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(open)
    }
    onOpenChange?.(open)
    if (!open) {
      nav.setFocusedKey(null)
    }
  }, [controlledOpen, onOpenChange, nav.setFocusedKey])

  const isFocusedItemSubmenu = React.useCallback(() => {
    if (nav.focusedKey === null) return false
    return itemExtrasRef.current.get(nav.focusedKey)?.isSubmenuTrigger ?? false
  }, [nav.focusedKey])

  const selectFocusedItem = React.useCallback(() => {
    if (nav.focusedKey === null) return
    const item = nav.items.find(i => i.key === nav.focusedKey)
    if (item?.isDisabled) return
    const extras = itemExtrasRef.current.get(nav.focusedKey)
    if (extras?.onSelect) {
      extras.onSelect()
    } else {
      rootSelectContext.onSelect(nav.focusedKey)
    }
  }, [nav.focusedKey, nav.items, rootSelectContext.onSelect])

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const parentMenuRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const parentSubmenuCtx = useSelectSubmenuContext()
  const submenuLevel = (parentSubmenuCtx?.submenuLevel ?? 0) + 1

  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen,
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
    <SelectSubmenuContext.Provider value={contextValue}>
      {children}
    </SelectSubmenuContext.Provider>
  )
}
SelectSub.displayName = "SelectSub"

const SelectSubTrigger = React.forwardRef<HTMLDivElement, SelectSubTriggerProps>(
  ({ children, disabled = false, textValue, className }, ref) => {
    const rootContext = useSelectContext()
    const submenuContext = useSelectSubmenuContext()
    const parentSub = submenuContext?.parentSubmenuContext
    const parentCtx = parentSub ?? rootContext
    const { setFocusedKey, focusedKey, mouseMoveDetectedRef } = parentCtx
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const id = React.useId()
    const finalKey = textValue ?? String(children) ?? `subtrigger-${id}`
    const finalTextValue = textValue ?? String(children)
    const setSubmenuOpen = submenuContext?.setIsOpen
    const isHighlighted = focusedKey === finalKey

    const handleSelectRef = React.useRef<() => void>(null)
    handleSelectRef.current = () => {
      if (disabled) return
      setSubmenuOpen?.(true)
    }

    React.useEffect(() => {
      parentCtx.registerItem(finalKey, finalTextValue, disabled, () => handleSelectRef.current?.(), true)
      return () => parentCtx.unregisterItem(finalKey)
    }, [finalKey, finalTextValue, disabled, parentCtx.registerItem, parentCtx.unregisterItem])

    React.useEffect(() => {
      submenuContext?.setTriggerKey(finalKey)
    }, [finalKey, submenuContext])

    const { hoverProps } = useHover({
      isDisabled: disabled,
      onHoverStart: () => {
        setFocusedKey(finalKey)
        mouseMoveDetectedRef.current = true
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = setTimeout(() => {
          setSubmenuOpen?.(true)
        }, 200)
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
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
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
        role="option"
        aria-haspopup="listbox"
        aria-expanded={submenuContext?.isOpen}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn(styles.subTrigger, className)}
        data-highlighted={isHighlighted ? "true" : "false"}
        data-disabled={disabled || undefined}
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
SelectSubTrigger.displayName = "SelectSubTrigger"

const SelectSubContent = React.forwardRef<HTMLDivElement, SelectSubContentProps>(
  ({ children, className, sideOffset = 8, alignOffset = 0 }, ref) => {
    const rootContext = useSelectContext()
    const submenuContext = useSelectSubmenuContext()
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

    const parentSub = submenuContext?.parentSubmenuContext
    const effectiveParentIsOpen = parentSub?.isOpen ?? rootContext.isOpen
    const effectiveParentFocusedKey = parentSub?.focusedKey ?? rootContext.focusedKey

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
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
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

    const submenuContextRef = React.useRef(submenuContext)
    submenuContextRef.current = submenuContext
    const forwardedRefRef = React.useRef(ref)
    forwardedRefRef.current = ref

    const stableRegisterItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean) => {
      submenuContextRef.current?.registerItem(key, textValue, isDisabled)
    }, [])

    const stableUnregisterItem = React.useCallback((key: Key) => {
      submenuContextRef.current?.unregisterItem(key)
    }, [])

    const mergedRef = React.useCallback((el: HTMLDivElement | null) => {
      refs.setFloating(el)
      setFloatingElement(el)
      contentRef.current = el
      if (submenuContextRef.current) submenuContextRef.current.contentRef.current = el
      const fRef = forwardedRefRef.current
      if (typeof fRef === "function") fRef(el)
      else if (fRef) fRef.current = el
    }, [refs.setFloating])

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
    }, [submenuContext])

    const overriddenContextValue = React.useMemo<SelectContextValue>(() => ({
      ...rootContext,
      items: submenuContext?.items ?? [],
      filteredItems: submenuContext?.items ?? [],
      registerItem: stableRegisterItem,
      unregisterItem: stableUnregisterItem,
      focusedKey: submenuContext?.focusedKey ?? null,
      setFocusedKey: submenuContext?.setFocusedKey ?? (() => {}),
      navigateToNextItem: submenuContext?.navigateToNextItem ?? (() => {}),
      navigateToPrevItem: submenuContext?.navigateToPrevItem ?? (() => {}),
      selectFocusedItem: submenuContext?.selectFocusedItem ?? (() => {}),
      isFocusedItemSubmenu: submenuContext?.isFocusedItemSubmenu ?? (() => false),
      mouseMoveDetectedRef: submenuContext?.mouseMoveDetectedRef ?? rootContext.mouseMoveDetectedRef,
      searchValue: "",
      visibleKeys: new Set((submenuContext?.items ?? []).map(i => i.key)),
    }), [rootContext, submenuContext, stableRegisterItem, stableUnregisterItem])

    if (!mounted || !submenuContext) return null

    const showContent = submenuContext.isOpen && isPositioned

    return createPortal(
      <>
        {showContent && (
          <div
            ref={mergedRef}
            role="listbox"
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
                <SelectContext.Provider value={overriddenContextValue}>
                  <List items={submenuContext.items}>
                    {children}
                  </List>
                </SelectContext.Provider>
              </div>
            </Scroll>
          </div>
        )}
      </>,
      document.body
    )
  }
)
SelectSubContent.displayName = "SelectSubContent"

export { SelectSub, SelectSubTrigger, SelectSubContent }
export type { SelectSubProps, SelectSubmenuContextValue }
