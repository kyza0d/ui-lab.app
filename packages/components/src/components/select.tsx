"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useButton, useFocusRing, useHover, mergeProps, type Key } from "react-aria"
import { cn } from "@/lib/utils"
import { FaCheck, FaChevronDown } from "react-icons/fa6"
import styles from "./select.module.css"

interface SelectItemData {
  key: Key
  textValue: string
  isDisabled?: boolean
}

interface SelectContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedKey: Key | null
  onSelect: (key: Key) => void
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>
  triggerProps: any
  isFocusVisible: boolean
  isPressed: boolean
  isHovered: boolean
  isDisabled: boolean
  items: SelectItemData[]
  registerItem: (key: Key, textValue: string, isDisabled?: boolean) => void
  unregisterItem: (key: Key) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select component must be used within Select root")
  }
  return context
}

interface SelectProps<T> extends React.PropsWithChildren {
  items?: Array<T>
  selectedKey?: Key | null
  defaultSelectedKey?: Key | null
  onSelectionChange?: (key: Key | null) => void
  isDisabled?: boolean
  autoFocus?: boolean
  className?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps<any>>(
  (
    {
      items: propItems = [],
      selectedKey: controlledSelectedKey,
      defaultSelectedKey,
      onSelectionChange,
      isDisabled = false,
      autoFocus = false,
      children,
      className,
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = React.useState(false)
    const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React.useState<Key | null>(
      defaultSelectedKey ?? null
    )
    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : uncontrolledSelectedKey
    const registeredItemsRef = React.useRef<Map<Key, SelectItemData>>(new Map())
    const [registeredItems, setRegisteredItems] = React.useState<SelectItemData[]>([])

    const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean) => {
      registeredItemsRef.current.set(key, { key, textValue, isDisabled })
      setRegisteredItems(Array.from(registeredItemsRef.current.values()))
    }, [])

    const unregisterItem = React.useCallback((key: Key) => {
      registeredItemsRef.current.delete(key)
      setRegisteredItems(Array.from(registeredItemsRef.current.values()))
    }, [])

    const items = propItems.length > 0 ? propItems : registeredItems

    const onSelect = React.useCallback((key: Key) => {
      if (controlledSelectedKey === undefined) {
        setUncontrolledSelectedKey(key)
      }
      onSelectionChange?.(key)
      setIsOpen(false)
    }, [controlledSelectedKey, onSelectionChange])

    const { buttonProps, isPressed } = useButton({
      isDisabled,
      onPress: () => !isDisabled && setIsOpen(prev => !prev),
    }, triggerRef)
    const { focusProps, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered } = useHover({ isDisabled })

    const triggerProps = mergeProps(buttonProps, focusProps, hoverProps, {
      'aria-haspopup': 'listbox' as const,
      'aria-expanded': isOpen,
    })

    React.useEffect(() => {
      if (autoFocus && triggerRef.current) {
        triggerRef.current.focus({ preventScroll: true })
      }
    }, [autoFocus])

    return (
      <SelectContext.Provider
        value={{
          isOpen,
          setIsOpen,
          selectedKey,
          onSelect,
          triggerRef,
          triggerProps,
          isFocusVisible,
          isPressed,
          isHovered,
          isDisabled,
          items,
          registerItem,
          unregisterItem,
        }}
      >
        <div ref={ref} className={cn(styles.select, className)}>
          {children}
        </div>
      </SelectContext.Provider>
    )
  }
)
Select.displayName = "Select"

interface SelectGroupProps extends React.PropsWithChildren {
  key?: string
  title?: string
  className?: string
}

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, title, className }, ref) => (
    <div ref={ref} className={className}>
      {title && <div className="px-2 py-1 text-xs font-medium text-foreground-400">{title}</div>}
      {children}
    </div>
  )
)
SelectGroup.displayName = "SelectGroup"

interface SelectValueProps extends React.PropsWithChildren {
  placeholder?: string
  className?: string
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder = "Select an option", className }, ref) => {
    const { selectedKey, items } = useSelectContext()
    const selectedItem = items.find(item => item.key === selectedKey)

    return (
      <span ref={ref} className={className}>
        {selectedItem?.textValue || placeholder}
      </span>
    )
  }
)
SelectValue.displayName = "SelectValue"

interface SelectTriggerProps extends React.PropsWithChildren {
  className?: string
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className }, ref) => {
    const { triggerRef: contextTriggerRef, triggerProps, isFocusVisible, isPressed, isHovered } = useSelectContext()

    const mergedRef = React.useCallback(
      (el: HTMLButtonElement | null) => {
        contextTriggerRef.current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref, contextTriggerRef]
    )

    return (
      <button
        ref={mergedRef}
        className={cn(styles.trigger, className)}
        data-focus-visible={isFocusVisible || undefined}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        {...triggerProps}
      >
        <span>{children}</span>
        <FaChevronDown className={styles.icon} />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectContentProps extends React.PropsWithChildren {
  className?: string
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className }, ref) => {
    const { isOpen, setIsOpen, triggerRef } = useSelectContext()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null)
    const [portalStyle, setPortalStyle] = React.useState<React.CSSProperties>({})

    // Create portal container on mount
    React.useEffect(() => {
      if (typeof document === 'undefined') return

      const container = document.createElement('div')
      container.setAttribute('data-select-portal', '')
      container.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 50;'
      document.body.appendChild(container)
      setPortalContainer(container)

      return () => {
        document.body.removeChild(container)
      }
    }, [])

    // Calculate position using document-relative coordinates (includes scroll offset)
    React.useEffect(() => {
      if (isOpen && triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect()
        const gap = 2
        const top = triggerRect.bottom + window.scrollY + gap
        const left = triggerRect.left + window.scrollX
        const width = triggerRect.width

        setPortalStyle({
          position: 'absolute',
          top,
          left,
          width,
        })
      }
    }, [isOpen, triggerRef])

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
      },
      [ref]
    )

    // Don't render anything until portal container is ready
    if (!portalContainer) {
      return null
    }

    return ReactDOM.createPortal(
      <>
        {isOpen && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 49 }}
            onClick={() => setIsOpen(false)}
          />
        )}
        <div
          ref={mergedRef}
          className={cn(styles.content, className)}
          data-state={isOpen ? "open" : "closed"}
          style={isOpen ? portalStyle : { position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
        >
          <div className={styles.viewport}>{children}</div>
        </div>
      </>,
      portalContainer
    )
  }
)
SelectContent.displayName = "SelectContent"

interface SelectListBoxProps extends React.PropsWithChildren {
  className?: string
}

const SelectListBox = React.forwardRef<HTMLUListElement, SelectListBoxProps>(
  ({ children, className }, forwardedRef) => {
    const { items, selectedKey, onSelect, setIsOpen, isOpen } = useSelectContext()
    const listBoxRef = React.useRef<HTMLUListElement>(null)
    const [focusedIndex, setFocusedIndex] = React.useState(0)

    const mergedRef = React.useCallback(
      (el: HTMLUListElement | null) => {
        (listBoxRef as React.MutableRefObject<HTMLUListElement | null>).current = el
        if (typeof forwardedRef === "function") forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      },
      [forwardedRef]
    )

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
      if (!isOpen) return
      const enabledIndices = items.map((item, i) => item.isDisabled ? -1 : i).filter(i => i >= 0)
      const currentEnabledIdx = enabledIndices.indexOf(focusedIndex)
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (currentEnabledIdx < enabledIndices.length - 1) {
            setFocusedIndex(enabledIndices[currentEnabledIdx + 1])
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (currentEnabledIdx > 0) {
            setFocusedIndex(enabledIndices[currentEnabledIdx - 1])
          }
          break
        case 'Home':
          e.preventDefault()
          if (enabledIndices.length > 0) setFocusedIndex(enabledIndices[0])
          break
        case 'End':
          e.preventDefault()
          if (enabledIndices.length > 0) setFocusedIndex(enabledIndices[enabledIndices.length - 1])
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          const item = items[focusedIndex]
          if (item && !item.isDisabled) onSelect(item.key)
          break
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          break
      }
    }, [items, focusedIndex, onSelect, setIsOpen, isOpen])

    React.useEffect(() => {
      if (isOpen) {
        const idx = items.findIndex(item => item.key === selectedKey)
        setFocusedIndex(idx >= 0 ? idx : 0)
        listBoxRef.current?.focus({ preventScroll: true })
      }
    }, [isOpen, items, selectedKey])

    return (
      <ul
        ref={mergedRef}
        role="listbox"
        tabIndex={isOpen ? 0 : -1}
        className={className}
        onKeyDown={handleKeyDown}
        style={{ outline: 'none' }}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { _index: index, _isFocused: isOpen && index === focusedIndex })
          }
          return child
        })}
      </ul>
    )
  }
)
SelectListBox.displayName = "SelectListBox"

interface SelectItemProps extends React.PropsWithChildren {
  value: Key
  textValue?: string
  isDisabled?: boolean
  className?: string
  _index?: number
  _isFocused?: boolean
}

const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ children, isDisabled = false, className, textValue, value, _isFocused }, forwardedRef) => {
    const { selectedKey, onSelect, registerItem, unregisterItem } = useSelectContext()
    const itemRef = React.useRef<HTMLLIElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)
    const finalTextValue = typeof textValue === "string" ? textValue : String(children)
    const isSelected = selectedKey === value

    React.useEffect(() => {
      registerItem(value, finalTextValue, isDisabled)
      return () => unregisterItem(value)
    }, [value, finalTextValue, isDisabled, registerItem, unregisterItem])

    const mergedRef = React.useCallback(
      (el: HTMLLIElement | null) => {
        (itemRef as React.MutableRefObject<HTMLLIElement | null>).current = el
        if (typeof forwardedRef === "function") forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      },
      [forwardedRef]
    )

    const handleClick = () => {
      if (!isDisabled) onSelect(value)
    }

    return (
      <li
        ref={mergedRef}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        className={cn(styles.item, className)}
        data-selected={isSelected || undefined}
        data-disabled={isDisabled || undefined}
        data-focus-visible={_isFocused || undefined}
        data-hovered={isHovered || undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className={styles.itemIndicator}>{isSelected && <FaCheck className="w-3 h-3" />}</div>
        <div className={styles.itemText}>{children}</div>
      </li>
    )
  }
)
SelectItem.displayName = "SelectItem"

interface SelectSeparatorProps extends React.PropsWithChildren {
  className?: string
}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className }, ref) => (
    <div ref={ref} className={cn(styles.separator, className)} role="separator" />
  )
)
SelectSeparator.displayName = "SelectSeparator"

// Keep ScrollButtons for backward compatibility, but they're not needed with React Aria
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

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectListBox,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
export type { SelectProps }
