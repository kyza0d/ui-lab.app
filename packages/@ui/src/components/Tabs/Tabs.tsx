"use client"

import * as React from "react"
import { useFocusRing } from "react-aria"
import { cn } from "@/lib/utils"
import styles from "./Tabs.module.css"

type TabsVariant = "default" | "underline"

interface TabsContextValue {
  selectedValue: string
  setSelectedValue: (value: string) => void
  variant: TabsVariant
  listRef: React.RefObject<HTMLDivElement | null>
  registerTab: (value: string) => void
  tabIds: Map<string, string>
  panelIds: Map<string, string>
  hoveredValue: string | null
  setHoveredValue: (value: string | null) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

interface TabsProps {
  variant?: TabsVariant
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children?: React.ReactNode
}

function Tabs({
  variant = "default",
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: TabsProps) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const [tabIds] = React.useState(() => new Map<string, string>())
  const [panelIds] = React.useState(() => new Map<string, string>())
  const [hoveredValue, setHoveredValue] = React.useState<string | null>(null)

  const isControlled = value !== undefined
  const selectedValue = isControlled ? value : internalValue

  const setSelectedValue = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const registerTab = React.useCallback(
    (tabValue: string) => {
      if (!tabIds.has(tabValue)) {
        const tabId = `tab-${tabValue}-${Math.random().toString(36).slice(2, 9)}`
        const panelId = `panel-${tabValue}-${Math.random().toString(36).slice(2, 9)}`
        tabIds.set(tabValue, tabId)
        panelIds.set(tabValue, panelId)
      }
    },
    [tabIds, panelIds]
  )

  return (
    <TabsContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        variant,
        listRef,
        registerTab,
        tabIds,
        panelIds,
        hoveredValue,
        setHoveredValue,
      }}
    >
      <div className={cn(styles.tabs, className)} data-variant={variant}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

function TabsList({ className, children, "aria-label": ariaLabel }: TabsListProps) {
  const { variant, listRef, hoveredValue } = useTabsContext()

  const [indicator, setIndicator] = React.useState<{
    left: number
    width: number
    height: number
    isHover: boolean
  }>({ left: 0, width: 0, height: 0, isHover: false })

  const updateIndicator = React.useCallback(() => {
    if (!listRef.current) return

    const activeTrigger = listRef.current.querySelector(
      '[data-selected="true"]'
    ) as HTMLElement | null

    if (activeTrigger) {
      setIndicator({
        left: activeTrigger.offsetLeft,
        width: activeTrigger.offsetWidth,
        height: activeTrigger.offsetHeight,
        isHover: false,
      })
    } else if (hoveredValue) {
      const hoveredTrigger = listRef.current.querySelector(
        `[data-value="${hoveredValue}"]`
      ) as HTMLElement | null
      if (hoveredTrigger) {
        setIndicator({
          left: hoveredTrigger.offsetLeft,
          width: hoveredTrigger.offsetWidth,
          height: hoveredTrigger.offsetHeight,
          isHover: true,
        })
      } else {
        setIndicator({ left: 0, width: 0, height: 0, isHover: false })
      }
    } else {
      setIndicator({ left: 0, width: 0, height: 0, isHover: false })
    }
  }, [listRef, hoveredValue])

  React.useEffect(() => {
    updateIndicator()

    const observer = new MutationObserver(updateIndicator)
    const resizeObserver = new ResizeObserver(updateIndicator)

    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        attributeFilter: ["data-selected"],
        subtree: true,
      })
      resizeObserver.observe(listRef.current)
    }

    window.addEventListener("resize", updateIndicator)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateIndicator)
    }
  }, [updateIndicator, listRef])

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      ref={listRef}
      className={cn("tabs", variant, styles.tabsList, className)}
      data-variant={variant}
    >
      {children}
      {indicator.width > 0 && (
        <div
          className={cn(
            styles.indicator,
            variant === "default" && styles.indicatorDefault,
            variant === "underline" && styles.indicatorUnderline,
            indicator.isHover && (styles as any).indicatorHover
          )}
          style={{
            left: variant === "underline" ? 0 : indicator.left,
            width: indicator.width,
            height: variant === "default" ? indicator.height : undefined,
            transform:
              variant === "underline"
                ? `translateX(${indicator.left}px)`
                : undefined,
          }}
        />
      )}
    </div>
  )
}

interface TabsTriggerProps {
  value: string
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

function TabsTrigger({
  value,
  icon,
  disabled,
  className,
  children,
}: TabsTriggerProps) {
  const { selectedValue, setSelectedValue, registerTab, tabIds, panelIds, setHoveredValue } =
    useTabsContext()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    registerTab(value)
  }, [value, registerTab])

  const isSelected = selectedValue === value
  const { focusProps, isFocusVisible } = useFocusRing()

  const handleClick = () => {
    if (!disabled) {
      setSelectedValue(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const tabList = triggerRef.current?.closest('[role="tablist"]')
    if (!tabList) return

    const tabs = Array.from(
      tabList.querySelectorAll('[role="tab"]:not([disabled])')
    ) as HTMLButtonElement[]
    const currentIndex = tabs.indexOf(triggerRef.current!)

    let nextIndex: number | null = null

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length
        break
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = tabs.length - 1
        break
    }

    if (nextIndex !== null) {
      e.preventDefault()
      tabs[nextIndex].focus()
      tabs[nextIndex].click()
    }
  }

  return (
    <button
      {...focusProps}
      ref={triggerRef}
      role="tab"
      id={tabIds.get(value)}
      aria-selected={isSelected}
      aria-controls={panelIds.get(value)}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !disabled && setHoveredValue(value)}
      onMouseLeave={() => setHoveredValue(null)}
      className={cn(styles.tabsTrigger, className)}
      data-selected={isSelected || undefined}
      data-disabled={disabled || undefined}
      data-focus-visible={isFocusVisible || undefined}
      data-value={value}
    >
      {icon && <span className={styles.triggerIcon}>{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

interface TabsContentProps {
  value: string
  className?: string
  children?: React.ReactNode
}

function TabsContent({ value, className, children }: TabsContentProps) {
  const { selectedValue, tabIds, panelIds, registerTab } = useTabsContext()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const { focusProps, isFocusVisible } = useFocusRing()

  React.useEffect(() => {
    registerTab(value)
  }, [value, registerTab])

  const isSelected = selectedValue === value

  if (!isSelected) {
    return null
  }

  return (
    <div
      {...focusProps}
      ref={panelRef}
      role="tabpanel"
      id={panelIds.get(value)}
      aria-labelledby={tabIds.get(value)}
      tabIndex={0}
      className={cn(styles.tabsContent, className)}
      data-focus-visible={isFocusVisible || undefined}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
