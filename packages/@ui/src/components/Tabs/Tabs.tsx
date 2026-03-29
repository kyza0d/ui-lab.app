"use client"

import * as React from "react"
import { useFocusRing } from "react-aria"
import { cn } from "@/lib/utils"
import { StyleValue } from "@/lib/utils"
import { asElementProps } from "@/lib/react-aria"
import { StylesProp, createStylesResolver } from "@/lib/styles"
import css from "./Tabs.module.css"

type TabsVariant = "underline"
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
  variant?: TabsVariant
  orientation: TabsOrientation
  isDisabledTab: (value: string) => boolean
  indicatorReady: boolean
  setIndicatorReady: (ready: boolean) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)
const TABS_INDICATOR_INSET = 4
const TABS_UNDERLINE_THICKNESS = 2

interface TabsListContextValue {
  indicatorClassName: string
}

const TabsListContext = React.createContext<TabsListContextValue | null>(null)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs component must be used within Tabs root")
  }
  return context
}

function useTabsListContext() {
  return React.useContext(TabsListContext)
}

function getTabsIndicatorClassName(indicator: string, variant?: TabsVariant) {
  return cn(
    "tabs",
    "indicator",
    variant === "underline" && "underline",
    variant === "underline" && "indicator-underline",
    css.indicator,
    {
      [css["indicator-underline"]]: variant === "underline",
    },
    indicator
  )
}

interface TabsStyleSlots {
  root?: StyleValue
}

interface TabsProps {
  /** Optional alternate visual style of the tab list indicator */
  variant?: TabsVariant
  /** Direction of the tab list layout */
  orientation?: TabsOrientation
  /** Initially selected tab value for uncontrolled usage */
  default?: string
  /** Controlled selected tab value */
  value?: string
  /** Called when the selected tab changes */
  onValueChange?: (value: string) => void
  /** Additional CSS class for the tabs root */
  className?: string
  /** Custom styles for the component slots */
  styles?: StylesProp<TabsStyleSlots>
  children?: React.ReactNode
}

const resolveTabsBaseStyles = createStylesResolver(['root'] as const)

const TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant,
      orientation = "horizontal",
      default: defaultTab,
      value: controlledValue,
      onValueChange,
      className,
      styles: stylesProp,
      children,
    },
    ref
  ) => {
    const { root } = resolveTabsBaseStyles(stylesProp)

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultTab || "")
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

    const [indicatorReady, setIndicatorReady] = React.useState(false)

    return (
      <TabsContext.Provider
        value={{
          selectedValue,
          setSelectedValue,
          variant,
          orientation,
          isDisabledTab,
          indicatorReady,
          setIndicatorReady,
        }}
      >
        <div
          ref={ref}
          className={cn("tabs", css.tabs, root, className)}
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
TabsRoot.displayName = "Tabs"

interface TabsListStyleSlots {
  root?: StyleValue
  indicator?: StyleValue
}

interface TabsListProps {
  /** Additional CSS class names */
  className?: string
  children?: React.ReactNode
  /** Accessible label for the tab list */
  "aria-label"?: string
  /** Custom styles for the component slots */
  styles?: StylesProp<TabsListStyleSlots>
}

const resolveTabsListBaseStyles = createStylesResolver(['root', 'indicator'] as const);

/** Container for the row of tab trigger buttons */
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, "aria-label": ariaLabel, styles: stylesProp }, ref) => {
    const { selectedValue, variant, orientation, setIndicatorReady } = useTabsContext()
    const { root, indicator } = resolveTabsListBaseStyles(stylesProp)
    const listRef = React.useRef<HTMLDivElement>(null)
    const [indicatorPosition, setIndicatorPosition] = React.useState<IndicatorPosition>({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    })
    const [listDimensions, setListDimensions] = React.useState<ListDimensions>({
      width: 0,
      height: 0,
    })

    const indicatorClassName = React.useMemo(
      () => getTabsIndicatorClassName(indicator, variant),
      [indicator, variant]
    )
    const tabsListContext = React.useMemo(
      () => ({ indicatorClassName }),
      [indicatorClassName]
    )

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
            setIndicatorPosition(position)
          }
        }
      },
      [measureTrigger]
    )

    React.useLayoutEffect(() => {
      measureList()
      updateIndicator(selectedValue)
      setIndicatorReady(true)
    }, [selectedValue, updateIndicator, measureList, setIndicatorReady])

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
        margin: 0,
        opacity: indicatorPosition.width === 0 && indicatorPosition.height === 0 ? 0 : 1,
      }

      if (indicatorPosition.width === 0 && indicatorPosition.height === 0) {
        return baseStyle
      }

      if (orientation === "vertical") {
        if (variant === "underline") {
          return {
            ...baseStyle,
            left: 0,
            top: indicatorPosition.top,
            width: TABS_UNDERLINE_THICKNESS,
            height: indicatorPosition.height,
          }
        }
        const horizontalPadding = TABS_INDICATOR_INSET
        const adjustedWidth = Math.max(0, listDimensions.width - horizontalPadding * 2)
        return {
          ...baseStyle,
          left: horizontalPadding,
          top: indicatorPosition.top,
          width: adjustedWidth,
          height: indicatorPosition.height,
        }
      }

      if (variant === "underline") {
        return {
          ...baseStyle,
          left: indicatorPosition.left,
          top: indicatorPosition.top + indicatorPosition.height - TABS_UNDERLINE_THICKNESS,
          width: indicatorPosition.width,
          height: TABS_UNDERLINE_THICKNESS,
        }
      }

      const verticalPadding = TABS_INDICATOR_INSET
      const adjustedHeight = Math.max(0, listDimensions.height - verticalPadding * 2)
      return {
        ...baseStyle,
        left: indicatorPosition.left,
        top: verticalPadding,
        width: indicatorPosition.width,
        height: adjustedHeight,
      }
    }, [indicatorPosition, listDimensions, variant, orientation])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        listRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    return (
      <TabsListContext.Provider value={tabsListContext}>
        <div
          ref={mergedRef}
          role="tablist"
          aria-label={ariaLabel}
          aria-orientation={orientation}
          className={cn("tabs", "list", css.list, root, className)}
          data-variant={variant}
          data-orientation={orientation}
          style={{ position: "relative" }}
        >
          {children}
          {indicatorPosition.width > 0 && (
            <div
              aria-hidden="true"
              className={indicatorClassName}
              style={getIndicatorStyle}
            />
          )}
        </div>
      </TabsListContext.Provider>
    )
  }
)
TabsList.displayName = "TabsList"

interface TabsTriggerStyleSlots {
  root?: StyleValue
  icon?: StyleValue
}

interface TabsTriggerProps {
  /** Unique identifier matching the associated TabsContent value */
  value: string
  /** Whether the tab trigger is disabled */
  disabled?: boolean
  /** Icon element displayed before the tab label */
  icon?: React.ReactNode
  /** Additional CSS class names */
  className?: string
  /** Custom styles for the component slots */
  styles?: StylesProp<TabsTriggerStyleSlots>
  children?: React.ReactNode
  _registerDisabled?: (value: string) => void
  _unregisterDisabled?: (value: string) => void
}

const resolveTabsTriggerBaseStyles = createStylesResolver(['root', 'icon'] as const);

/** A tab button that activates its associated content panel */
const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      value,
      disabled = false,
      icon,
      className,
      styles: stylesProp,
      children,
      _registerDisabled,
      _unregisterDisabled,
    },
    ref
  ) => {
    const { selectedValue, setSelectedValue, indicatorReady, orientation, variant } = useTabsContext()
    const tabsListContext = useTabsListContext()
    const { root, icon: iconStyles } = resolveTabsTriggerBaseStyles(stylesProp)
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const isSelected = value === selectedValue
    const showIndicatorFallback = isSelected && !indicatorReady && !!tabsListContext
    const fallbackIndicatorStyle = React.useMemo<React.CSSProperties>(() => {
      if (variant === "underline") {
        if (orientation === "vertical") {
          return {
            top: 0,
            bottom: 0,
            left: -TABS_UNDERLINE_THICKNESS,
            width: TABS_UNDERLINE_THICKNESS,
            height: "100%",
            margin: 0,
          }
        }

        return {
          left: 0,
          right: 0,
          bottom: -TABS_UNDERLINE_THICKNESS,
          width: "100%",
          height: TABS_UNDERLINE_THICKNESS,
          margin: 0,
        }
      }

      return {
        inset: 0,
        margin: 0,
      }
    }, [orientation, variant])

    const { focusProps, isFocusVisible } = useFocusRing()

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
        {...asElementProps<"button">(focusProps)}
        ref={mergedRef}
        id={`${value}-trigger`}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`${value}-content`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        data-tabs-value={value}
        className={cn("tabs", "trigger", css.trigger, root, className)}
        data-selected={isSelected ? "true" : "false"}
        data-disabled={disabled ? "true" : undefined}
        data-focus-visible={isFocusVisible ? "true" : undefined}
        data-indicator-ready={isSelected && indicatorReady ? "true" : undefined}
        data-indicator-fallback={showIndicatorFallback ? "true" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {showIndicatorFallback && tabsListContext && (
          <span
            aria-hidden="true"
            className={cn(tabsListContext.indicatorClassName, css["indicator-fallback"])}
            style={fallbackIndicatorStyle}
          />
        )}
        {icon && <span className={cn(css["trigger-icon"], iconStyles)}>{icon}</span>}
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "Tab"

interface TabsContentStyleSlots {
  root?: StyleValue
}

interface TabsContentProps {
  /** Unique identifier matching the associated TabsTrigger value */
  value: string
  /** Additional CSS class names */
  className?: string
  /** Custom styles for the component slots */
  styles?: StylesProp<TabsContentStyleSlots>
  children?: React.ReactNode
}

const resolveTabsContentBaseStyles = createStylesResolver(['root'] as const);

/** Content panel shown when its corresponding tab is active */
const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, styles: stylesProp }, ref) => {
    const { selectedValue, orientation } = useTabsContext()
    const { root } = resolveTabsContentBaseStyles(stylesProp);
    const isVisible = value === selectedValue

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`${value}-trigger`}
        id={`${value}-content`}
        className={cn("tabs", "content", css.content, root, className)}
        data-orientation={orientation}
        hidden={!isVisible}
      >
        {isVisible && children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})

export { Tabs }
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }
