import * as React from "react"
import type { Key } from "react-aria"

export type SelectionMode = "none" | "single" | "multiple"

export interface Position {
  x: number
  y: number
}

export interface ItemData {
  key: Key
  textValue: string
  isDisabled?: boolean
  onSelect?: () => void
  isSubmenuTrigger?: boolean
}

export interface MenuContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  position: Position
  setPosition: React.Dispatch<React.SetStateAction<Position>>
  close: () => void
  selectionMode: SelectionMode
  selectedKeys: Set<Key>
  onSelectionChange: (keys: Set<Key>) => void
  toggleSelection: (key: Key) => void
  highlightedIndex: number
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>
  items: ItemData[]
  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void
  unregisterItem: (key: Key) => void
  radioGroups: Map<string, Key | null>
  setRadioGroupValue: (groupName: string, value: Key | null) => void
  getRadioGroupValue: (groupName: string) => Key | null
  triggerRef: React.MutableRefObject<HTMLDivElement | null>
}

export interface MenuSubmenuContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.MutableRefObject<HTMLDivElement | null>
  parentMenuRef: React.MutableRefObject<HTMLDivElement | null>
  submenuLevel: number
  items: ItemData[]
  highlightedIndex: number
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>
  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void) => void
  unregisterItem: (key: Key) => void
  contentRef: React.MutableRefObject<HTMLDivElement | null>
  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
}

export interface RadioGroupContextValue {
  name: string
  value: Key | null
  onValueChange: (value: Key) => void
}

export interface MenuProps extends React.PropsWithChildren {
  selectionMode?: SelectionMode
  selectedKeys?: Set<Key>
  defaultSelectedKeys?: Set<Key>
  onSelectionChange?: (keys: Set<Key>) => void
}

export interface MenuTriggerProps extends React.PropsWithChildren {
  disabled?: boolean
  asChild?: boolean
  className?: string
}

export interface MenuPortalProps extends React.PropsWithChildren {
  container?: HTMLElement
}

export interface MenuContentProps extends React.PropsWithChildren {
  className?: string
  onCloseAutoFocus?: (event: Event) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: PointerEvent) => void
  alignOffset?: number
  sideOffset?: number
}

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface MenuItemProps extends React.PropsWithChildren {
  disabled?: boolean
  onSelect?: () => void
  textValue?: string
  inset?: boolean
  className?: string
  _index?: number
  _isHighlighted?: boolean
  _isInSubmenu?: boolean
}

export interface MenuCheckboxItemProps extends React.PropsWithChildren {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  onSelect?: () => void
  textValue?: string
  className?: string
  _index?: number
  _isHighlighted?: boolean
  _isInSubmenu?: boolean
}

export interface MenuRadioGroupProps extends React.PropsWithChildren {
  value?: string
  onValueChange?: (value: string) => void
}

export interface MenuRadioItemProps extends React.PropsWithChildren {
  value: string
  disabled?: boolean
  onSelect?: () => void
  textValue?: string
  className?: string
  _index?: number
  _isHighlighted?: boolean
  _isInSubmenu?: boolean
}

export interface MenuLabelProps extends React.PropsWithChildren {
  inset?: boolean
  className?: string
}

export interface MenuSeparatorProps {
  className?: string
}

export interface MenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string
}

export interface MenuSubProps extends React.PropsWithChildren {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface MenuSubTriggerProps extends React.PropsWithChildren {
  disabled?: boolean
  inset?: boolean
  textValue?: string
  className?: string
  _index?: number
  _isHighlighted?: boolean
}

export interface MenuSubContentProps extends React.PropsWithChildren {
  className?: string
  sideOffset?: number
  alignOffset?: number
}

export const MenuContext = React.createContext<MenuContextValue | null>(null)

export function useMenuContext() {
  const context = React.useContext(MenuContext)
  if (!context) {
    throw new Error("Menu component must be used within Menu root")
  }
  return context
}

export const MenuSubmenuContext = React.createContext<MenuSubmenuContextValue | null>(null)

export function useMenuSubmenuContext() {
  return React.useContext(MenuSubmenuContext)
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

export function useRadioGroupContext() {
  return React.useContext(RadioGroupContext)
}

const MenuPortal = ({ children }: MenuPortalProps) => {
  return <>{children}</>
}
MenuPortal.displayName = "MenuPortal"

const Menu = ({
  children,
  selectionMode = "none",
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
}: MenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 })
  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(
    defaultSelectedKeys ?? new Set()
  )
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const [radioGroups, setRadioGroups] = React.useState<Map<string, Key | null>>(new Map())

  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : uncontrolledSelectedKeys

  const registeredItemsRef = React.useRef<Map<Key, ItemData>>(new Map())
  const [registeredItems, setRegisteredItems] = React.useState<ItemData[]>([])

  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {
    registeredItemsRef.current.set(key, { key, textValue, isDisabled, onSelect, isSubmenuTrigger })
    setRegisteredItems(Array.from(registeredItemsRef.current.values()))
  }, [])

  const unregisterItem = React.useCallback((key: Key) => {
    registeredItemsRef.current.delete(key)
    setRegisteredItems(Array.from(registeredItemsRef.current.values()))
  }, [])

  const handleSelectionChange = React.useCallback((keys: Set<Key>) => {
    if (controlledSelectedKeys === undefined) {
      setUncontrolledSelectedKeys(keys)
    }
    onSelectionChange?.(keys)
  }, [controlledSelectedKeys, onSelectionChange])

  const toggleSelection = React.useCallback((key: Key) => {
    const newKeys = new Set(selectedKeys)
    if (selectionMode === "single") {
      newKeys.clear()
      newKeys.add(key)
    } else if (selectionMode === "multiple") {
      if (newKeys.has(key)) {
        newKeys.delete(key)
      } else {
        newKeys.add(key)
      }
    }
    handleSelectionChange(newKeys)
  }, [selectedKeys, selectionMode, handleSelectionChange])

  const close = React.useCallback(() => {
    setIsOpen(false)
    setHighlightedIndex(0)
  }, [])

  const setRadioGroupValue = React.useCallback((groupName: string, value: Key | null) => {
    setRadioGroups(prev => {
      const next = new Map(prev)
      next.set(groupName, value)
      return next
    })
  }, [])

  const getRadioGroupValue = React.useCallback((groupName: string) => {
    return radioGroups.get(groupName) ?? null
  }, [radioGroups])

  const triggerRef = React.useRef<HTMLDivElement | null>(null)

  const contextValue = React.useMemo(() => (
    {
      isOpen,
      setIsOpen,
      position,
      setPosition,
      close,
      selectionMode,
      selectedKeys,
      onSelectionChange: handleSelectionChange,
      toggleSelection,
      highlightedIndex,
      setHighlightedIndex,
      items: registeredItems,
      registerItem,
      unregisterItem,
      radioGroups,
      setRadioGroupValue,
      getRadioGroupValue,
      triggerRef,
    } satisfies MenuContextValue
  ), [
    isOpen,
    setIsOpen,
    position,
    setPosition,
    close,
    selectionMode,
    selectedKeys,
    handleSelectionChange,
    toggleSelection,
    highlightedIndex,
    setHighlightedIndex,
    registeredItems,
    registerItem,
    unregisterItem,
    radioGroups,
    setRadioGroupValue,
    getRadioGroupValue,
  ])

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  )
}
Menu.displayName = "Menu"

export { Menu, MenuPortal }
