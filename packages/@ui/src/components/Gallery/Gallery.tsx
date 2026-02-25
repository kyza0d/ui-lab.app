"use client"

import * as React from "react"
import { useFocusRing, useHover, usePress, mergeProps } from "react-aria"
import { cn } from "@/lib/utils"
import { Grid } from "../Grid"
import styles from "./Gallery.module.css"

// Types
type GridColumns = "1" | "2" | "3" | "4" | "5" | "6"
type GridGap = "xs" | "sm" | "md" | "lg" | "xl"
type ResponsiveColumns = {
  sm?: GridColumns
  md?: GridColumns
  lg?: GridColumns
  xl?: GridColumns
}

interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the gallery grid */
  columns?: GridColumns | number | ResponsiveColumns
  /** Gap between gallery items */
  gap?: GridGap | number | string
  /** Number of rows in the gallery grid */
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "auto"
  /** Whether to enable container-query-based responsive columns */
  containerQueryResponsive?: boolean
}

interface GalleryItemProps extends React.HTMLAttributes<HTMLElement> {
  /** URL the item links to */
  href?: string
  /** Called when the item is pressed */
  onPress?: (href?: string) => void
  /** Number of columns this item spans */
  columnSpan?: number
  /** Number of rows this item spans */
  rowSpan?: number
  /** Controls the item's layout orientation */
  orientation?: "vertical" | "horizontal"
}

interface GalleryViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio of the view area (e.g. "16/9") */
  aspectRatio?: string
}

interface GalleryBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

// Helper to map numeric columns to Grid's column values
const mapColumnsToGrid = (columns?: GridColumns | number | ResponsiveColumns): GridColumns | ResponsiveColumns => {
  if (!columns) return "3"
  if (typeof columns === "string") return columns
  if (typeof columns === "object") {
    return columns as ResponsiveColumns
  }
  if (columns >= 1 && columns <= 6) return columns.toString() as GridColumns
  return "3" // default fallback
}

// Helper to map gap values to Grid's gap values
const mapGapToGrid = (gap?: GridGap | number | string): GridGap => {
  if (!gap) return "md"
  if (typeof gap === "string" && ["xs", "sm", "md", "lg", "xl"].includes(gap)) {
    return gap as GridGap
  }
  if (typeof gap === "number") {
    // Map numeric gap values (in pixels) to Grid gap presets
    if (gap <= 4) return "xs"
    if (gap <= 8) return "sm"
    if (gap <= 16) return "md"
    if (gap <= 24) return "lg"
    return "xl"
  }
  return "md" // default fallback
}

// Gallery Root Component
const GalleryRoot = React.forwardRef<HTMLDivElement, GalleryProps>(
  ({ columns = 3, gap = "md", rows, containerQueryResponsive, className, children, ...props }, ref) => {
    const gridColumns = mapColumnsToGrid(columns)
    const gridGap = mapGapToGrid(gap)

    return (
      <Grid
        ref={ref}
        columns={gridColumns as GridColumns | ResponsiveColumns}
        gap={gridGap}
        rows={rows}
        containerQueryResponsive={containerQueryResponsive}
        className={className}
        {...props}
      >
        {children}
      </Grid>
    )
  }
)
GalleryRoot.displayName = "Gallery"

// Gallery Item Component
/** A single media or content tile in the gallery grid */
const GalleryItem = React.forwardRef<HTMLElement, GalleryItemProps>(
  ({ href, onPress, columnSpan, rowSpan, orientation = "vertical", className, style, children, ...props }, ref) => {
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
        "data-orientation": orientation,
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
/** Expanded full-screen view overlay for a selected gallery item */
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
/** Container for the gallery item's visible content */
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
