"use client"

import * as React from "react"
import { useFocusRing, useHover, usePress, mergeProps } from "react-aria"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import { Grid } from "../Grid"
import styles from "./Gallery.module.css"

// Types
type GridColumns = number
type GridGap = "xs" | "sm" | "md" | "lg" | "xl"
type ResponsiveColumns = {
  sm?: GridColumns
  md?: GridColumns
  lg?: GridColumns
  xl?: GridColumns
}

interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the gallery grid */
  columns?: GridColumns | ResponsiveColumns
  /** Gap between gallery items */
  gap?: GridGap | number | string
  /** Number of rows in the gallery grid */
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "auto"
  /** Whether to enable container-query-based responsive columns */
  responsive?: boolean
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, or slot object. */
  styles?: GalleryStylesProp
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
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, or slot object. */
  styles?: GalleryItemStylesProp
}

interface GalleryViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio of the view area (e.g. "16/9") */
  aspectRatio?: string
  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object. */
  styles?: GalleryViewStylesProp
}

interface GalleryBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object. */
  styles?: GalleryBodyStylesProp
}

export interface GalleryStyleSlots {
  root?: StyleValue;
  item?: StyleValue;
  view?: StyleValue;
  body?: StyleValue;
}

export type GalleryStylesProp = StylesProp<GalleryStyleSlots>;

export interface GalleryItemStyleSlots {
  root?: StyleValue;
}

export type GalleryItemStylesProp = StylesProp<GalleryItemStyleSlots>;

export interface GalleryViewStyleSlots {
  root?: StyleValue;
}

export type GalleryViewStylesProp = StylesProp<GalleryViewStyleSlots>;

export interface GalleryBodyStyleSlots {
  root?: StyleValue;
}

export type GalleryBodyStylesProp = StylesProp<GalleryBodyStyleSlots>;

const resolveGalleryBaseStyles = createStylesResolver(['root', 'item', 'view', 'body'] as const);
const resolveGalleryItemBaseStyles = createStylesResolver(['root'] as const);
const resolveGalleryViewBaseStyles = createStylesResolver(['root'] as const);
const resolveGalleryBodyBaseStyles = createStylesResolver(['root'] as const);

function resolveGalleryStyles(styles: GalleryStylesProp | undefined) {
  return resolveGalleryBaseStyles(styles);
}

function resolveGalleryItemStyles(styles: GalleryItemStylesProp | undefined) {
  return resolveGalleryItemBaseStyles(styles);
}

function resolveGalleryViewStyles(styles: GalleryViewStylesProp | undefined) {
  return resolveGalleryViewBaseStyles(styles);
}

function resolveGalleryBodyStyles(styles: GalleryBodyStylesProp | undefined) {
  return resolveGalleryBodyBaseStyles(styles);
}

type GalleryResolvedStyles = ReturnType<typeof resolveGalleryBaseStyles>;

const GalleryStylesContext = React.createContext<GalleryResolvedStyles | undefined>(undefined);

// Helper to map numeric columns to Grid's column values
const mapColumnsToGrid = (columns?: GridColumns | ResponsiveColumns): GridColumns | ResponsiveColumns => {
  if (!columns) return 3
  if (typeof columns === "object") return columns as ResponsiveColumns
  return columns
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
  ({ columns = 3, gap = "md", rows, responsive, className, styles: stylesProp, children, ...props }, ref) => {
    const gridColumns = mapColumnsToGrid(columns)
    const gridGap = mapGapToGrid(gap)
    const resolved = resolveGalleryStyles(stylesProp);

    return (
      <GalleryStylesContext.Provider value={resolved}>
        <Grid
          ref={ref}
          columns={gridColumns as GridColumns | ResponsiveColumns}
          gap={gridGap}
          rows={rows}
          responsive={responsive}
          className={cn("gallery", className, resolved.root)}
          {...props}
        >
          {children}
        </Grid>
      </GalleryStylesContext.Provider>
    )
  }
)
GalleryRoot.displayName = "Gallery"

// Gallery Item Component
/** A single media or content tile in the gallery grid */
const GalleryItem = React.forwardRef<HTMLElement, GalleryItemProps>(
  ({ href, onPress, columnSpan, rowSpan, orientation = "vertical", className, style, styles: stylesProp, children, ...props }, ref) => {
    const inherited = React.useContext(GalleryStylesContext);
    const resolved = resolveGalleryItemStyles(stylesProp);
    const elementRef = React.useRef<HTMLElement>(null)
    const combinedRef = (node: HTMLElement | null) => {
      (elementRef as React.MutableRefObject<HTMLElement | null>).current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    const { focusProps, isFocused, isFocusVisible } = useFocusRing()
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
        className: cn('gallery', 'item', styles.item, className, inherited?.item, resolved.root),
        style: spanStyles,
        "data-focused": isFocused ? "true" : "false",
        "data-focus-visible": isFocusVisible ? "true" : "false",
        "data-hovered": isHovered ? "true" : "false",
        "data-pressed": isPressed ? "true" : "false",
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
  ({ aspectRatio = "16/9", className, style, styles: stylesProp, children, ...props }, ref) => {
    const inherited = React.useContext(GalleryStylesContext);
    const resolved = resolveGalleryViewStyles(stylesProp);

    return (
      <div
        ref={ref}
        className={cn("gallery", "view", styles.view, className, inherited?.view, resolved.root)}
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
  ({ className, styles: stylesProp, children, ...props }, ref) => {
    const inherited = React.useContext(GalleryStylesContext);
    const resolved = resolveGalleryBodyStyles(stylesProp);

    return (
      <div
        ref={ref}
        className={cn('gallery', 'body', styles.body, className, inherited?.body, resolved.root)}
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
