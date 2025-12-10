"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import styles from "./tabs.module.css"

const Tabs = TabsPrimitive.Root

type TabsListVariant = "default" | "underline"

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsListVariant
  className?: string
  children?: React.ReactNode
}

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "default", children, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState<{
    left: number
    width: number
    height: number
  }>({ left: 0, width: 0, height: 0 })

  const updateIndicator = React.useCallback(() => {
    if (!listRef.current) return

    const activeTrigger = listRef.current.querySelector(
      '[data-state="active"]'
    ) as HTMLElement | null

    if (activeTrigger) {
      setIndicator({
        left: activeTrigger.offsetLeft,
        width: activeTrigger.offsetWidth,
        height: activeTrigger.offsetHeight,
      })
    } else {
      setIndicator({ left: 0, width: 0, height: 0 })
    }
  }, [])

  React.useEffect(() => {
    updateIndicator()

    const observer = new MutationObserver(updateIndicator)
    const resizeObserver = new ResizeObserver(updateIndicator)

    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        attributeFilter: ["data-state"],
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
  }, [updateIndicator])

  const variantClass = variant === "underline" ? styles.tabsListUnderline : styles.tabsList

  return (
    <TabsPrimitive.List
      ref={(node: HTMLDivElement | null) => {
        if (typeof ref === "function") ref(node)
        listRef.current = node
      }}
      className={cn(variantClass, className)}
      {...props}
    >
      {children}
      {indicator.width > 0 && (
        <div
          className={cn(
            styles.indicator,
            variant === "default" && styles.indicatorDefault,
            variant === "underline" && styles.indicatorUnderline
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
    </TabsPrimitive.List>
  )
})
TabsList.displayName = "TabsList"

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, icon, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(styles.tabsTrigger, className)}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </TabsPrimitive.Trigger>
  )
)
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(styles.tabsContent, className)}
      {...props}
    />
  )
)
TabsContent.displayName = TabsPrimitive.Content.displayName

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
}
