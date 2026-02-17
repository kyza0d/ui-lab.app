import * as React from "react"
import type { Key } from "react-aria"
import type { ItemData } from "../../utils/list-navigation"

export type SelectionMode = "none" | "single" | "multiple"

export interface MenuItemExtras {
  onSelect?: () => void
  isSubmenuTrigger?: boolean
}

export interface MenuContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  close: () => void
  selectionMode: SelectionMode
  selectedKeys: Set<Key>
  onSelectionChange: (keys: Set<Key>) => void
  toggleSelection: (key: Key) => void
  items: ItemData[]
  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void
  unregisterItem: (key: Key) => void
  focusedKey: Key | null
  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>
  navigateToNextItem: () => void
  navigateToPrevItem: () => void
  selectFocusedItem: () => void
  isFocusedItemSubmenu: () => boolean
  radioGroups: Map<string, Key | null>
  setRadioGroupValue: (groupName: string, value: Key | null) => void
  getRadioGroupValue: (groupName: string) => Key | null
  triggerRef: React.MutableRefObject<HTMLDivElement | null>
  mouseMoveDetectedRef: React.MutableRefObject<boolean>
  clickPositionRef: React.MutableRefObject<{ x: number; y: number }>
  activeSubmenuKey: Key | null
  setActiveSubmenuKey: React.Dispatch<React.SetStateAction<Key | null>>
}

export interface MenuSubmenuContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.MutableRefObject<HTMLDivElement | null>
  parentMenuRef: React.MutableRefObject<HTMLDivElement | null>
  submenuLevel: number
  items: ItemData[]
  focusedKey: Key | null
  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>
  navigateToNextItem: () => void
  navigateToPrevItem: () => void
  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void
  unregisterItem: (key: Key) => void
  selectFocusedItem: () => void
  isFocusedItemSubmenu: () => boolean
  contentRef: React.MutableRefObject<HTMLDivElement | null>
  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  mouseMoveDetectedRef: React.MutableRefObject<boolean>
  triggerKey: Key | null
  setTriggerKey: React.Dispatch<React.SetStateAction<Key | null>>
  parentSubmenuContext: MenuSubmenuContextValue | null
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

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface MenuItemProps extends React.PropsWithChildren {
  disabled?: boolean
  onSelect?: () => void
  textValue?: string
  inset?: boolean
  className?: string
}

export interface MenuCheckboxItemProps extends React.PropsWithChildren {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  onSelect?: () => void
  textValue?: string
  className?: string
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
}

export interface MenuSubContentProps extends React.PropsWithChildren {
  className?: string
  sideOffset?: number
  alignOffset?: number
}
