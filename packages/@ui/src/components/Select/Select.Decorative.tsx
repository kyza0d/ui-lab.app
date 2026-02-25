import * as React from "react"
import { cn } from "@/lib/utils"
import styles from "./Select.module.css"

interface SelectSeparatorProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
}

/** Horizontal rule that visually separates groups of items in the dropdown */
const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className }, ref) => (
    <div ref={ref} className={cn(styles.separator, className)} role="separator" />
  )
)
SelectSeparator.displayName = "SelectSeparator"

export { SelectSeparator }
export type { SelectSeparatorProps }
