"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva(
  "inline-flex items-center justify-center relative",
  {
    variants: {
      variant: {
        default: "rounded-lg bg-background-800 p-1 border border-background-700",
        underline: "border-b border-background-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  VariantProps<typeof tabsListVariants> {
  className?: string;
  children?: React.ReactNode;
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

  // Update on mount, tab change, and resize
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

  return (
    <TabsPrimitive.List
      ref={(node: HTMLDivElement | null) => {
        if (typeof ref === "function") ref(node)
        listRef.current = node
      }}
      className={cn(
        "inline-flex items-center justify-center relative overflow-hidden",
        tabsListVariants({ variant, className })
      )}
      suppressHydrationWarning
      {...props}
    >
      {children}
      {(variant === "default" || variant === "underline") && indicator.width > 0 && (
        <div
          className={cn(
            "absolute pointer-events-none",
            variant === "default" && "bg-background-700 rounded-md",
            variant === "underline" && "bottom-0 h-0.5 bg-accent-500"
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

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors z-10", // z-10 to stay above background
  {
    variants: {
      variant: {
        default:
          "px-3 py-1.5 rounded-md text-foreground-400 data-[state=active]:text-foreground-50 hover:text-foreground-200",
        underline:
          "px-2 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-transparent data-[state=active]:text-foreground-50 data-[state=inactive]:text-foreground-400 hover:text-foreground-200",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, className }))}
      suppressHydrationWarning
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
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
        className
      )}
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
  tabsListVariants,
  tabsTriggerVariants,
}
