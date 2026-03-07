import * as React from "react"
import { cn, type StyleValue } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"
import { ChevronDown } from "lucide-react"
import styles from "./Select.module.css"
import { useSelectContext } from "./Select"
import { GroupContext } from "../Group/Group"
import groupStyles from "../Group/Group.module.css"
import { useMergedRef, handleListKeyDown } from "./Select.shared"

export const SelectTriggerContext = React.createContext<boolean>(false)

interface SelectTriggerIconStyles {
  prefix?: StyleValue;
  chevron?: StyleValue;
}

export interface SelectTriggerStyleSlots {
  root?: StyleValue;
  valueSection?: StyleValue;
  icon?: StyleValue | SelectTriggerIconStyles; // Compound slot
  iconSection?: StyleValue;
}

export type SelectTriggerStylesProp = StylesProp<SelectTriggerStyleSlots>;

interface SelectTriggerProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Custom chevron icon displayed on the right side of the trigger; defaults to ChevronDown */
  chevron?: React.ReactNode
  /** Icon slot object for prefix and chevron overrides */
  icon?: { prefix?: React.ReactNode; chevron?: React.ReactNode }
  /** Visual style variant; "ghost" removes the default button background */
  variant?: 'ghost'
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SelectTriggerStylesProp;
}

/** Button that opens and closes the Select dropdown */
const resolveSelectTriggerBaseStyles = createStylesResolver([
  'root',
  'valueSection',
  'iconPrefix',
  'iconChevron',
  'iconSection',
] as const);

function resolveSelectTriggerStyles(styles: SelectTriggerStylesProp | undefined) {
  if (!styles || typeof styles === 'string' || Array.isArray(styles)) return resolveSelectTriggerBaseStyles(styles);

  const { root, valueSection, icon, iconSection } = styles;
  let iconPrefix: StyleValue | undefined;
  let iconChevron: StyleValue | undefined;

  if (icon) {
    if (typeof icon === 'string' || Array.isArray(icon)) {
      iconPrefix = icon;
      iconChevron = icon;
    } else {
      iconPrefix = icon.prefix;
      iconChevron = icon.chevron;
    }
  }

  return resolveSelectTriggerBaseStyles({
    root,
    valueSection,
    iconPrefix,
    iconChevron,
    iconSection,
  });
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, chevron, icon, variant, styles: stylesProp }, ref) => {
    const groupContext = React.useContext(GroupContext)
    const { triggerProps, triggerRef, mode, selectedKeys } = useSelectContext()
    const mergedRef = useMergedRef<HTMLButtonElement>(triggerRef, ref)

    const resolvedChevron = icon?.chevron !== undefined ? icon.chevron : chevron !== undefined ? chevron : <ChevronDown size={14} />
    const resolved = resolveSelectTriggerStyles(stylesProp);

    return (
      <SelectTriggerContext.Provider value={true}>
        <button
          ref={mergedRef}
          role="button"
          className={cn(
            'trigger',
            styles.trigger,
            groupContext ? (groupStyles as Record<string, string>).trigger : undefined,
            className,
            resolved.root
          )}
          type="button"
          data-variant={variant}
          {...triggerProps}
        >
          <div className={cn(styles['value-section'], resolved.valueSection)}>
            {icon?.prefix && <span className={cn(styles['icon-prefix'], resolved.iconPrefix)}>{icon.prefix}</span>}
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
            <div className={cn(styles['icon-section'], resolved.iconSection)}>
              <div className={cn(styles.icon, resolved.iconChevron)}>
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

export interface SearchableTriggerStyleSlots {
  root?: StyleValue;
}

export type SearchableTriggerStylesProp = StylesProp<SearchableTriggerStyleSlots>;

interface SearchableTriggerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** Additional CSS class names */
  className?: string
  /** Placeholder text shown when the input is empty */
  placeholder?: string
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SearchableTriggerStylesProp;
}

const resolveSearchableTriggerBaseStyles = createStylesResolver(['root'] as const);

/** Combobox-style input that opens the dropdown on focus and filters items as you type */
const SearchableTrigger = React.forwardRef<HTMLInputElement, SearchableTriggerProps>(
  ({ className, placeholder = "Search...", styles: stylesProp, ...props }, ref) => {
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
    const resolved = resolveSearchableTriggerBaseStyles(stylesProp);

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
        className={cn(styles.trigger, className, resolved.root)}
        {...props}
      />
    )
  }
)
SearchableTrigger.displayName = "SearchableTrigger"

export { SelectTrigger, SearchableTrigger }
export type { SelectTriggerProps, SearchableTriggerProps }
