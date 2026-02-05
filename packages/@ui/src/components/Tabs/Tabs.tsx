"use client"

import * as React from "react"
import { useFocusRing, useHover, mergeProps } from "react-aria"
import { cn } from "@/lib/utils"
import styles from "./Tabs.module.css"

type TabsVariant = "default" | "underline"
type TabsOrientation = "horizontal" | "vertical"

interface IndicatorPosition {
  left: number
  top: number
  width: number
  height: number
}

interface ListDimensions {
  width: number
  height: number
}

interface TabsContextValue {
  selectedValue: string
  setSelectedValue: (value: string) => void
  variant: TabsVariant
  orientation: TabsOrientation
  isDisabledTab: (value: string) => boolean
  hoveredValue: string | null
  setHoveredValue: (value: string | null) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs component must be used within Tabs root")
  }
  return context
}

interface TabsProps {
  variant?: TabsVariant
  orientation?: TabsOrientation
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children?: React.ReactNode
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = "default",
      orientation = "horizontal",
      defaultValue,
      value: controlledValue,
      onValueChange,
      className,
      children,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
    const [hoveredValue, setHoveredValue] = React.useState<string | null>(null)
    const [disabledTabs, setDisabledTabs] = React.useState<Set<string>>(new Set())

    const selectedValue = controlledValue !== undefined ? controlledValue : uncontrolledValue
    const isDisabledTab = React.useCallback(
      (value: string) => disabledTabs.has(value),
      [disabledTabs]
    )

    const setSelectedValue = React.useCallback(
      (newValue: string) => {
        if (!isDisabledTab(newValue)) {
          if (controlledValue === undefined) {
            setUncontrolledValue(newValue)
          }
          onValueChange?.(newValue)
        }
      },
      [controlledValue, isDisabledTab, onValueChange]
    )

    const registerDisabledTab = React.useCallback((value: string) => {
      setDisabledTabs((prev) => new Set(prev).add(value))
    }, [])

    const unregisterDisabledTab = React.useCallback((value: string) => {
      setDisabledTabs((prev) => {
        const newSet = new Set(prev)
        newSet.delete(value)
        return newSet
      })
    }, [])

    return (
      <TabsContext.Provider
        value={{
          selectedValue,
          setSelectedValue,
          variant,
          orientation,
          isDisabledTab,
          hoveredValue,
          setHoveredValue,
        }}
      >
        <div
          ref={ref}
          className={cn("tabs", styles.tabs, className)}
          data-variant={variant}
          data-orientation={orientation}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child) && child.type === TabsTrigger
              ? React.cloneElement(child, {
                  _registerDisabled: registerDisabledTab,
                  _unregisterDisabled: unregisterDisabledTab,
                } as any)
              : child
          )}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

interface TabsListProps {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, "aria-label": ariaLabel }, ref) => {
    const { selectedValue, hoveredValue, variant, orientation } = useTabsContext()
    const listRef = React.useRef<HTMLDivElement>(null)
    const [indicator, setIndicator] = React.useState<IndicatorPosition>({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    })
    const [listDimensions, setListDimensions] = React.useState<ListDimensions>({
      width: 0,
      height: 0,
    })

    const measureTrigger = React.useCallback((element: HTMLElement | null) => {
      if (!element) return null

      const rect = element.getBoundingClientRect()
      const listRect = listRef.current?.getBoundingClientRect()

      if (!listRect) return null

      const relativeLeft = rect.left - listRect.left
      const relativeTop = rect.top - listRect.top

      return {
        left: relativeLeft,
        top: relativeTop,
        width: rect.width,
        height: rect.height,
      }
    }, [])

    const measureList = React.useCallback(() => {
      if (!listRef.current) return
      const rect = listRef.current.getBoundingClientRect()
      setListDimensions({
        width: rect.width,
        height: rect.height,
      })
    }, [])

    const updateIndicator = React.useCallback(
      (value: string) => {
        if (!listRef.current) return

        const trigger = listRef.current.querySelector(
          `[data-tabs-value="${value}"]`
        ) as HTMLElement | null

        if (trigger) {
          const position = measureTrigger(trigger)
          if (position) {
            setIndicator(position)
          }
        }
      },
      [measureTrigger]
    )

    React.useEffect(() => {
      const rafId = requestAnimationFrame(() => {
        measureList()
        updateIndicator(selectedValue)
      })
      return () => cancelAnimationFrame(rafId)
    }, [selectedValue, updateIndicator, measureList])

    React.useEffect(() => {
      if (!listRef.current) return

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          measureList()
          updateIndicator(selectedValue)
        })
      })

      resizeObserver.observe(listRef.current)
      return () => resizeObserver.disconnect()
    }, [selectedValue, updateIndicator, measureList])

    React.useEffect(() => {
      const handleWindowResize = () => {
        requestAnimationFrame(() => {
          measureList()
          updateIndicator(selectedValue)
        })
      }

      window.addEventListener("resize", handleWindowResize)
      return () => window.removeEventListener("resize", handleWindowResize)
    }, [selectedValue, updateIndicator, measureList])

    const getIndicatorStyle = React.useMemo<React.CSSProperties>(() => {
      const baseStyle: React.CSSProperties = {
        position: "absolute",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
        pointerEvents: "none",
      }

      if (indicator.width === 0 && indicator.height === 0) {
        return { ...baseStyle, opacity: 0 }
      }

      if (orientation === "vertical") {
        if (variant === "underline") {
          return {
            ...baseStyle,
            left: 0,
            top: indicator.top,
            width: 3,
            height: indicator.height,
          }
        }
        // Apply horizontal padding to indicator for vertical orientation
        const horizontalPadding = 4
        const adjustedWidth = Math.max(0, listDimensions.width - horizontalPadding * 2)
        return {
          ...baseStyle,
          left: horizontalPadding,
          top: indicator.top,
          width: adjustedWidth,
          height: indicator.height,
        }
      }

      if (variant === "underline") {
        return {
          ...baseStyle,
          left: indicator.left,
          top: indicator.top + indicator.height,
          width: indicator.width,
          height: 2,
        }
      }

      // Apply vertical padding to indicator (matches --indicator-padding CSS variable)
      const verticalPadding = 4
      const adjustedHeight = Math.max(0, listDimensions.height - verticalPadding * 2)
      return {
        ...baseStyle,
        left: indicator.left,
        top: verticalPadding,
        width: indicator.width,
        height: adjustedHeight,
      }
    }, [indicator, listDimensions, variant, orientation])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        listRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    return (
      <div
        ref={mergedRef}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={cn("tabsList", styles.tabsList, className)}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          className={cn("indicator", styles.indicator, {
            [styles.indicatorDefault]: variant === "default",
            [styles.indicatorUnderline]: variant === "underline",
          })}
          style={getIndicatorStyle}
        />
        {children}
      </div>
    )
  }
)
TabsList.displayName = "TabsList"

interface TabsTriggerProps {
  value: string
  disabled?: boolean
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
  _registerDisabled?: (value: string) => void
  _unregisterDisabled?: (value: string) => void
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      value,
      disabled = false,
      icon,
      className,
      children,
      _registerDisabled,
      _unregisterDisabled,
    },
    ref
  ) => {
    const { selectedValue, setSelectedValue, hoveredValue, setHoveredValue } =
      useTabsContext()
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const isSelected = value === selectedValue
    const isHovered = value === hoveredValue

    const { focusProps, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered: isHoverActive } = useHover({ isDisabled: disabled })

    React.useEffect(() => {
      if (disabled) {
        _registerDisabled?.(value)
      } else {
        _unregisterDisabled?.(value)
      }
    }, [disabled, value, _registerDisabled, _unregisterDisabled])

    const handleClick = React.useCallback(() => {
      if (!disabled) {
        setSelectedValue(value)
      }
    }, [disabled, value, setSelectedValue])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return

        const listElement = buttonRef.current?.parentElement
        if (!listElement) return

        const triggers = Array.from(
          listElement.querySelectorAll('[data-tabs-value]')
        ) as HTMLButtonElement[]
        const currentIndex = triggers.findIndex((el) => el.getAttribute("data-tabs-value") === value)

        let nextValue: string | null = null

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault()
          const nextIndex = (currentIndex + 1) % triggers.length
          nextValue = triggers[nextIndex].getAttribute("data-tabs-value")
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault()
          const prevIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1
          nextValue = triggers[prevIndex].getAttribute("data-tabs-value")
        } else if (e.key === "Home") {
          e.preventDefault()
          nextValue = triggers[0].getAttribute("data-tabs-value")
        } else if (e.key === "End") {
          e.preventDefault()
          nextValue = triggers[triggers.length - 1].getAttribute("data-tabs-value")
        }

        if (nextValue) {
          setSelectedValue(nextValue)
          setTimeout(() => {
            const nextTrigger = listElement.querySelector(
              `[data-tabs-value="${nextValue}"]`
            ) as HTMLButtonElement | null
            nextTrigger?.focus()
          }, 0)
        }
      },
      [value, disabled, setSelectedValue]
    )

    const mergedRef = React.useCallback(
      (el: HTMLButtonElement | null) => {
        buttonRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    return (
      <button
        {...mergeProps(focusProps, hoverProps)}
        ref={mergedRef}
        id={`${value}-trigger`}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`${value}-content`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        data-tabs-value={value}
        className={cn("tabsTrigger", styles.tabsTrigger, className)}
        data-selected={isSelected ? "true" : "false"}
        data-disabled={disabled ? "true" : undefined}
        data-focus-visible={isFocusVisible ? "true" : undefined}
        data-hovered={isHoverActive ? "true" : "false"}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && setHoveredValue(value)}
        onMouseLeave={() => setHoveredValue(null)}
      >
        {icon && <span className={styles.triggerIcon}>{icon}</span>}
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "Tab"

interface TabsContentProps {
  value: string
  className?: string
  children?: React.ReactNode
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children }, ref) => {
    const { selectedValue, variant, orientation } = useTabsContext()
    const isVisible = value === selectedValue

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`${value}-trigger`}
        id={`${value}-content`}
        className={cn("tabsContent", styles.tabsContent, className)}
        data-variant={variant}
        data-orientation={orientation}
        hidden={!isVisible}
      >
        {isVisible && children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }
