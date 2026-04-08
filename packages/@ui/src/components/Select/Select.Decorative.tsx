import * as React from "react"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import styles from "./Select.module.css"

export interface SelectSeparatorStyleSlots {
  root?: StyleValue
}

export type SelectSeparatorStylesProp = StylesProp<SelectSeparatorStyleSlots>

export interface SelectSeparatorProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectSeparatorStylesProp
}

const resolveSelectSeparatorBaseStyles = createStylesResolver(["root"] as const)

function resolveSelectSeparatorStyles(styles: SelectSeparatorStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveSelectSeparatorBaseStyles(styles)
  const { root } = styles
  return resolveSelectSeparatorBaseStyles({ root })
}

/** Horizontal rule that visually separates groups of items in the dropdown */
const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, styles: stylesProp }, ref) => {
    const resolved = resolveSelectSeparatorStyles(stylesProp)
    return <div ref={ref} className={cn(styles.separator, className, resolved.root)} role="separator" />
  }
)
SelectSeparator.displayName = "SelectSeparator"

export { SelectSeparator }
