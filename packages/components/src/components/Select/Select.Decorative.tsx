import * as React from "react"
import { cn } from "@/lib/utils"
import { FaChevronDown } from "react-icons/fa6"
import styles from "./select.module.css"

interface SelectSeparatorProps extends React.PropsWithChildren {
  className?: string
}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className }, ref) => (
    <div ref={ref} className={cn(styles.separator, className)} role="separator" />
  )
)
SelectSeparator.displayName = "SelectSeparator"

const SelectScrollUpButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren>(
  ({ children }, ref) => (
    <button ref={ref} className={styles.scrollButton} type="button">
      {children || <FaChevronDown className="w-2.5 h-2.5" />}
    </button>
  )
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren>(
  ({ children }, ref) => (
    <button ref={ref} className={styles.scrollButton} type="button">
      {children || <FaChevronDown className="w-2.5 h-2.5" />}
    </button>
  )
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

export { SelectSeparator, SelectScrollUpButton, SelectScrollDownButton }
export type { SelectSeparatorProps }
