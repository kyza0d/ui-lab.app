import * as React from "react"
import { cn } from "@/lib/utils"
import { FaChevronDown } from "react-icons/fa6"
import styles from "./Select.module.css"
import { useSelectContext } from "./Select"
import { GroupContext } from "../Group/Group"
import groupStyles from "../Group/Group.module.css"
import { useMergedRef, handleListKeyDown } from "./Select.shared"

export const SelectTriggerContext = React.createContext<boolean>(false)

interface SelectTriggerProps extends React.PropsWithChildren {
  className?: string
  chevron?: React.ReactNode
  icon?: { prefix?: React.ReactNode; chevron?: React.ReactNode }
  variant?: 'ghost'
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, chevron, icon, variant }, ref) => {
    const groupContext = React.useContext(GroupContext)
    const { triggerProps, triggerRef, mode, selectedKeys } = useSelectContext()
    const mergedRef = useMergedRef<HTMLButtonElement>(triggerRef, ref)

    const resolvedChevron = icon?.chevron !== undefined ? icon.chevron : chevron !== undefined ? chevron : <FaChevronDown />

    return (
      <SelectTriggerContext.Provider value={true}>
        <button
          ref={mergedRef}
          className={cn(
            'trigger',
            styles.trigger,
            groupContext ? (groupStyles as Record<string, string>).trigger : undefined,
            className
          )}
          type="button"
          data-variant={variant}
          {...triggerProps}
        >
          <div className={styles['value-section']}>
            {icon?.prefix && <span className={styles['icon-prefix']}>{icon.prefix}</span>}
            {mode === "multiple" && children === undefined ? (
              <span className={styles.placeholder}>
                {selectedKeys && selectedKeys.size > 0
                  ? `${selectedKeys.size} selected`
                  : "Select items..."}
              </span>
            ) : (
              children
            )}
          </div>
          {resolvedChevron !== null && (
            <div className={styles['icon-section']}>
              <div className={styles.icon}>
                {resolvedChevron}
              </div>
            </div>
          )}
        </button>
      </SelectTriggerContext.Provider>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SearchableTriggerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  className?: string
  placeholder?: string
}

const SearchableTrigger = React.forwardRef<HTMLInputElement, SearchableTriggerProps>(
  ({ className, placeholder = "Search...", ...props }, ref) => {
    const {
      searchValue,
      setSearchValue,
      isDisabled,
      setIsOpen,
      isOpen,
      selectedTextValue,
      navigateToNextItem,
      navigateToPrevItem,
      selectFocusedItem,
      filteredItems,
      setFocusedKey,
    } = useSelectContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isSearchActive, setIsSearchActive] = React.useState(false)
    const mergedRef = useMergedRef<HTMLInputElement>(inputRef, ref)

    React.useEffect(() => {
      if (!isOpen) {
        setIsSearchActive(false)
      }
    }, [isOpen])

    const displayValue = isSearchActive ? searchValue : (selectedTextValue || "")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          e.preventDefault()
          setIsOpen(true)
        }
        return
      }
      handleListKeyDown(e, {
        navigateNext: navigateToNextItem,
        navigatePrev: navigateToPrevItem,
        confirm: selectFocusedItem,
        close: () => {
          setIsOpen(false)
          setSearchValue("")
          setIsSearchActive(false)
        },
        filteredItems,
        setFocusedKey,
        requireCtrlForHomeEnd: true,
      })
    }

    const handleClick = () => {
      if (selectedTextValue && !searchValue && inputRef.current) {
        inputRef.current.select()
      }
      if (!isOpen) {
        setIsOpen(true)
      }
    }

    return (
      <input
        ref={mergedRef}
        type="text"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        value={displayValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
          setIsSearchActive(true)
          setIsOpen(true)
        }}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onFocus={() => {
          if (!isOpen) {
            setIsOpen(true)
          }
        }}
        placeholder={placeholder}
        disabled={isDisabled}
        className={cn(styles.trigger, className)}
        {...props}
      />
    )
  }
)
SearchableTrigger.displayName = "SearchableTrigger"

export { SelectTrigger, SearchableTrigger }
export type { SelectTriggerProps, SearchableTriggerProps }
