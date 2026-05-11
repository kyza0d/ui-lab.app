"use client"

import * as React from "react"
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import { useFocus } from "@/hooks/useFocus"
import { useMergeRefs } from "@/hooks/useMergeRefs"
import { Grid } from "../Grid"
import css from "./Gallery.module.css"

type GridColumns = number
type GridGap = "xs" | "sm" | "md" | "lg" | "xl"
type Orientation = "vertical" | "horizontal"
type GalleryRows = "1" | "2" | "3" | "4" | "5" | "6" | "auto"
type ResponsiveColumns = {
  sm?: GridColumns
  md?: GridColumns
  lg?: GridColumns
  xl?: GridColumns
}

export interface GalleryStyleSlots {
  root?: StyleValue
  item?: StyleValue
  view?: StyleValue
  body?: StyleValue
}

export type GalleryStylesProp = StylesProp<GalleryStyleSlots>

export interface GalleryItemStyleSlots {
  root?: StyleValue
}

export type GalleryItemStylesProp = StylesProp<GalleryItemStyleSlots>

export interface GalleryViewStyleSlots {
  root?: StyleValue
}

export type GalleryViewStylesProp = StylesProp<GalleryViewStyleSlots>

export interface GalleryBodyStyleSlots {
  root?: StyleValue
}

export type GalleryBodyStylesProp = StylesProp<GalleryBodyStyleSlots>

export interface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns in the gallery grid */
  columns?: GridColumns | ResponsiveColumns
  /** Gap between gallery items */
  gap?: GridGap | number | string
  /** Number of rows in the gallery grid */
  rows?: GalleryRows
  /** Whether to enable container-query-based responsive columns */
  responsive?: boolean
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: GalleryStylesProp
}

export interface GalleryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL the item links to */
  href?: string
  /** Called when the item is pressed */
  onPress?: (href?: string) => void
  /** Number of columns this item spans */
  columnSpan?: number
  /** Number of rows this item spans */
  rowSpan?: number
  /** Controls the item's layout orientation */
  orientation?: Orientation
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: GalleryItemStylesProp
}

export interface GalleryViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio of the view area (e.g. "16/9") */
  aspectRatio?: string
  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: GalleryViewStylesProp
}

export interface GalleryBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: GalleryBodyStylesProp
}

const resolveGalleryBaseStyles = createStylesResolver([
  "root",
  "item",
  "view",
  "body",
] as const)

const resolveGalleryItemBaseStyles = createStylesResolver(["root"] as const)
const resolveGalleryViewBaseStyles = createStylesResolver(["root"] as const)
const resolveGalleryBodyBaseStyles = createStylesResolver(["root"] as const)

function resolveGalleryStyles(
  styles: GalleryStylesProp | undefined
): ReturnType<typeof resolveGalleryBaseStyles> {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveGalleryBaseStyles(styles)
  }

  const { root, item, view, body } = styles
  return resolveGalleryBaseStyles({ root, item, view, body })
}

function resolveGalleryItemStyles(
  styles: GalleryItemStylesProp | undefined
): ReturnType<typeof resolveGalleryItemBaseStyles> {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveGalleryItemBaseStyles(styles)
  }

  const { root } = styles
  return resolveGalleryItemBaseStyles({ root })
}

function resolveGalleryViewStyles(
  styles: GalleryViewStylesProp | undefined
): ReturnType<typeof resolveGalleryViewBaseStyles> {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveGalleryViewBaseStyles(styles)
  }

  const { root } = styles
  return resolveGalleryViewBaseStyles({ root })
}

function resolveGalleryBodyStyles(
  styles: GalleryBodyStylesProp | undefined
): ReturnType<typeof resolveGalleryBodyBaseStyles> {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveGalleryBodyBaseStyles(styles)
  }

  const { root } = styles
  return resolveGalleryBodyBaseStyles({ root })
}

type GalleryResolvedStyles = ReturnType<typeof resolveGalleryStyles>

const GalleryStylesContext = React.createContext<GalleryResolvedStyles | undefined>(undefined)

const mapColumnsToGrid = (columns?: GridColumns | ResponsiveColumns): GridColumns | ResponsiveColumns => {
  if (!columns) return 3
  if (typeof columns === "object") return columns
  return columns
}

const mapGapToGrid = (gap?: GridGap | number | string): GridGap => {
  if (!gap) return "md"

  if (typeof gap === "string" && ["xs", "sm", "md", "lg", "xl"].includes(gap)) {
    return gap as GridGap
  }

  if (typeof gap === "number") {
    if (gap <= 4) return "xs"
    if (gap <= 8) return "sm"
    if (gap <= 16) return "md"
    if (gap <= 24) return "lg"
    return "xl"
  }

  return "md"
}

const GalleryRoot = React.forwardRef<HTMLDivElement, GalleryProps>(
  (
    {
      columns = 3,
      gap = "md",
      rows,
      responsive,
      className,
      styles: stylesProp,
      children,
      ...props
    },
    ref
  ) => {
    const resolved = resolveGalleryStyles(stylesProp)

    return (
      <GalleryStylesContext.Provider value={resolved}>
        <Grid
          ref={ref}
          columns={mapColumnsToGrid(columns)}
          gap={mapGapToGrid(gap)}
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

const GalleryItem = React.forwardRef<HTMLDivElement, GalleryItemProps>(
  (
    {
      href,
      onPress,
      columnSpan,
      rowSpan,
      orientation = "vertical",
      className,
      style,
      styles: stylesProp,
      children,
      ...props
    },
    ref
  ) => {
    const inherited = React.useContext(GalleryStylesContext)
    const resolved = resolveGalleryItemStyles(stylesProp)
    const scopeRef = React.useRef<HTMLDivElement>(null)
    const itemRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = useMergeRefs(itemRef, ref)
    const { focusProps, isFocused, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered } = useHover({})
    const { pressProps, isPressed } = usePress({
      onPress: () => onPress?.(href),
    })
    const { scopeProps, indicatorProps } = useFocus({
      scopeRef,
      containerRef: scopeRef,
      surfaceSelector: '[data-focus-surface="true"]',
      radiusSource: "surface",
    })

    const spanStyles: React.CSSProperties = {
      ...(columnSpan ? { gridColumn: `span ${columnSpan}` } : {}),
      ...(rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
      ...style,
    }

    const hasAccessibleName =
      props["aria-label"] ||
      props["aria-labelledby"] ||
      typeof props.title === "string" ||
      React.Children.count(children) > 0

    return (
      <div
        ref={scopeRef}
        className={cn(scopeProps.className, css["item-scope"])}
        style={spanStyles}
      >
        <div {...indicatorProps} data-focus-indicator="local" />
        <div
          {...mergeProps(focusProps, hoverProps, pressProps, props)}
          ref={mergedRef}
          role="button"
          tabIndex={props.tabIndex ?? 0}
          className={cn("gallery", "item", css.item, inherited?.item, resolved.root, className)}
          data-selected={props["aria-pressed"] === true ? "true" : undefined}
          data-disabled={props["aria-disabled"] === true ? "true" : undefined}
          data-focused={isFocused ? "true" : undefined}
          data-focus-visible={isFocusVisible ? "true" : undefined}
          data-hovered={isHovered ? "true" : undefined}
          data-pressed={isPressed ? "true" : undefined}
          data-orientation={orientation}
          data-focus-surface="true"
          aria-label={hasAccessibleName ? props["aria-label"] : "Gallery item"}
        >
          {children}
        </div>
      </div>
    )
  }
)
GalleryItem.displayName = "Gallery.Item"

const GalleryView = React.forwardRef<HTMLDivElement, GalleryViewProps>(
  ({ aspectRatio = "16/9", className, style, styles: stylesProp, children, ...props }, ref) => {
    const inherited = React.useContext(GalleryStylesContext)
    const resolved = resolveGalleryViewStyles(stylesProp)

    return (
      <div
        ref={ref}
        className={cn("gallery", "view", css.view, inherited?.view, resolved.root, className)}
        style={
          {
            "--aspect-ratio": aspectRatio,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    )
  }
)
GalleryView.displayName = "Gallery.View"

const GalleryBody = React.forwardRef<HTMLDivElement, GalleryBodyProps>(
  ({ className, styles: stylesProp, children, ...props }, ref) => {
    const inherited = React.useContext(GalleryStylesContext)
    const resolved = resolveGalleryBodyStyles(stylesProp)

    return (
      <div
        ref={ref}
        className={cn("gallery", "body", css.body, inherited?.body, resolved.root, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GalleryBody.displayName = "Gallery.Body"

const Gallery = Object.assign(GalleryRoot, {
  Item: GalleryItem,
  View: GalleryView,
  Body: GalleryBody,
})

export { Gallery, GalleryItem, GalleryView, GalleryBody }
