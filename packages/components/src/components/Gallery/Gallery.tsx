"use client"

import * as React from "react"
import { useFocusRing, useHover, usePress, mergeProps } from "react-aria"
import { cn } from "@/lib/utils"
import styles from "./Gallery.module.css"

// Types
type ResponsiveColumns = {
  base?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

type LayoutType = "grid"

interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | ResponsiveColumns
  gap?: number | string
  layout?: LayoutType
  columnWidth?: number | string
}

interface GalleryItemProps extends React.HTMLAttributes<HTMLElement> {
  href?: string
  onPress?: (href?: string) => void
  columnSpan?: number
  rowSpan?: number
}

interface GalleryViewProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: string
}

interface GalleryBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

// Gallery Root Component
const GalleryRoot = React.forwardRef<HTMLDivElement, GalleryProps>(
  ({ columns = 3, gap, layout = "grid", columnWidth, className, style, children, ...props }, ref) => {
    const columnValue = typeof columns === "number" ? columns : columns.base ?? 3
    const responsiveColumns = typeof columns === "object" ? columns : {}
    const gapValue = typeof gap === "number" ? `${gap / 16}rem` : gap
    const columnWidthValue = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth

    const cssVariables = {
      "--gallery-columns": columnValue,
      "--gallery-columns-sm": responsiveColumns.sm,
      "--gallery-columns-md": responsiveColumns.md,
      "--gallery-columns-lg": responsiveColumns.lg,
      "--gallery-columns-xl": responsiveColumns.xl,
      "--gallery-gap": gapValue,
      "--gallery-column-width": columnWidthValue,
    } as React.CSSProperties

    return (
      <div
        ref={ref}
        className={cn(styles.gallery, className)}
        style={{ ...cssVariables, ...style }}
        data-layout={layout}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GalleryRoot.displayName = "Gallery"

// Gallery Item Component
const GalleryItem = React.forwardRef<HTMLElement, GalleryItemProps>(
  ({ href, onPress, columnSpan, rowSpan, className, style, children, ...props }, ref) => {
    const elementRef = React.useRef<HTMLElement>(null)
    const combinedRef = (node: HTMLElement | null) => {
      (elementRef as React.MutableRefObject<HTMLElement | null>).current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    const { focusProps, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered } = useHover({})

    // Use usePress for button interaction
    const { pressProps, isPressed } = usePress({
      onPress: () => onPress?.(href),
    })

    const spanStyles: React.CSSProperties = {
      ...(columnSpan && { gridColumn: `span ${columnSpan}` }),
      ...(rowSpan && { gridRow: `span ${rowSpan}` }),
      ...style,
    }

    // Ensure accessible name: aria-label, aria-labelledby, or text content
    const ariaLabel = props["aria-label"] || props["aria-labelledby"]
    const hasAccessibleName = ariaLabel || React.Children.count(children) > 0

    const commonProps = mergeProps(
      focusProps,
      hoverProps,
      pressProps,
      {
        className: cn(styles.item, className),
        style: spanStyles,
        "data-focus-visible": isFocusVisible || undefined,
        "data-hovered": isHovered || undefined,
        "data-pressed": isPressed || undefined,
        ...(!hasAccessibleName && { "aria-label": "Gallery item" }),
        ...props,
      }
    )

    return (
      <div
        ref={combinedRef as React.Ref<HTMLDivElement>}
        role="button"
        tabIndex={0}
        {...commonProps}
      >
        {children}
      </div>
    )
  }
)
GalleryItem.displayName = "Gallery.Item"

// Gallery View Component
const GalleryView = React.forwardRef<HTMLDivElement, GalleryViewProps>(
  ({ aspectRatio = "16/9", className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.view, className)}
        style={{
          "--gallery-aspect-ratio": aspectRatio,
          ...style
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GalleryView.displayName = "Gallery.View"

// Gallery Body Component
const GalleryBody = React.forwardRef<HTMLDivElement, GalleryBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.body, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GalleryBody.displayName = "Gallery.Body"

// Compound Component
const Gallery = Object.assign(GalleryRoot, {
  Item: GalleryItem,
  View: GalleryView,
  Body: GalleryBody,
})

export { Gallery, GalleryItem, GalleryView, GalleryBody }
export type { GalleryProps, GalleryItemProps, GalleryViewProps, GalleryBodyProps }
