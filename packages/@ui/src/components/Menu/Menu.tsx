import * as React from "react"
import type { Key } from "react-aria"
import { useListNavigation } from "../../utils/list-navigation"
import type {
  MenuContextValue,
  MenuSubmenuContextValue,
  RadioGroupContextValue,
  MenuProps,
  MenuPortalProps,
  MenuItemExtras,
} from "./menu.types"

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
  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(
    defaultSelectedKeys ?? new Set()
  )
  const [radioGroups, setRadioGroups] = React.useState<Map<string, Key | null>>(new Map())
  const [activeSubmenuKey, setActiveSubmenuKey] = React.useState<Key | null>(null)

  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : uncontrolledSelectedKeys

  const nav = useListNavigation({ isOpen })
  const itemExtrasRef = React.useRef<Map<Key, MenuItemExtras>>(new Map())
  const mouseMoveDetectedRef = React.useRef(true)
  const clickPositionRef = React.useRef({ x: 0, y: 0 })
  const triggerRef = React.useRef<HTMLDivElement | null>(null)

  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {
    nav.registerItem(key, textValue, isDisabled)
    itemExtrasRef.current.set(key, { onSelect, isSubmenuTrigger })
  }, [nav.registerItem])

  const unregisterItem = React.useCallback((key: Key) => {
    nav.unregisterItem(key)
    itemExtrasRef.current.delete(key)
  }, [nav.unregisterItem])

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
    nav.setFocusedKey(null)
  }, [nav.setFocusedKey])

  const selectFocusedItem = React.useCallback(() => {
    if (nav.focusedKey === null) return
    const item = nav.items.find(i => i.key === nav.focusedKey)
    if (item?.isDisabled) return
    const extras = itemExtrasRef.current.get(nav.focusedKey)
    extras?.onSelect?.()
  }, [nav.focusedKey, nav.items])

  const isFocusedItemSubmenu = React.useCallback(() => {
    if (nav.focusedKey === null) return false
    const extras = itemExtrasRef.current.get(nav.focusedKey)
    return extras?.isSubmenuTrigger ?? false
  }, [nav.focusedKey])

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

  React.useEffect(() => {
    if (isOpen && nav.enabledFilteredItems.length > 0) {
      nav.setFocusedKey(nav.enabledFilteredItems[0].key)
    }
  }, [isOpen])

  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen,
    close,
    selectionMode,
    selectedKeys,
    onSelectionChange: handleSelectionChange,
    toggleSelection,
    items: nav.items,
    registerItem,
    unregisterItem,
    focusedKey: nav.focusedKey,
    setFocusedKey: nav.setFocusedKey,
    navigateToNextItem: nav.navigateToNextItem,
    navigateToPrevItem: nav.navigateToPrevItem,
    selectFocusedItem,
    isFocusedItemSubmenu,
    radioGroups,
    setRadioGroupValue,
    getRadioGroupValue,
    triggerRef,
    mouseMoveDetectedRef,
    clickPositionRef,
    activeSubmenuKey,
    setActiveSubmenuKey,
  } satisfies MenuContextValue), [
    isOpen,
    close,
    selectionMode,
    selectedKeys,
    handleSelectionChange,
    toggleSelection,
    nav.items,
    registerItem,
    unregisterItem,
    nav.focusedKey,
    nav.setFocusedKey,
    nav.navigateToNextItem,
    nav.navigateToPrevItem,
    selectFocusedItem,
    isFocusedItemSubmenu,
    radioGroups,
    setRadioGroupValue,
    getRadioGroupValue,
    activeSubmenuKey,
    setActiveSubmenuKey,
  ])

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  )
}
Menu.displayName = "Menu"

export { Menu, MenuPortal }
export type {
  SelectionMode,
  MenuContextValue,
  MenuSubmenuContextValue,
  RadioGroupContextValue,
  MenuItemExtras,
} from "./menu.types"
export type {
  MenuProps,
  MenuTriggerProps,
  MenuPortalProps,
  MenuContentProps,
  MenuGroupProps,
  MenuItemProps,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuLabelProps,
  MenuSeparatorProps,
  MenuShortcutProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuSubContentProps,
} from "./menu.types"
