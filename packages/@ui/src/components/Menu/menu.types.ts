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
  /** Controls how many items can be selected at once */
  selectionMode?: SelectionMode
  /** Controlled set of selected item keys */
  selectedKeys?: Set<Key>
  /** Initial selected keys for uncontrolled usage */
  defaultSelectedKeys?: Set<Key>
  /** Called when the selected keys change */
  onSelectionChange?: (keys: Set<Key>) => void
}

export interface MenuTriggerProps extends React.PropsWithChildren {
  /** Whether the trigger is non-interactive */
  disabled?: boolean
  /** Whether to render the trigger as its child element */
  asChild?: boolean
  /** Additional CSS class names */
  className?: string
}

export interface MenuPortalProps extends React.PropsWithChildren {
  /** DOM element to portal the menu content into */
  container?: HTMLElement
}

export interface MenuContentProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Called when focus returns to the trigger after close */
  onCloseAutoFocus?: (event: Event) => void
  /** Called when the Escape key is pressed */
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  /** Called when a pointer event occurs outside the menu */
  onPointerDownOutside?: (event: PointerEvent) => void
  /** Horizontal offset from the trigger alignment */
  alignOffset?: number
  /** Vertical offset from the trigger element */
  sideOffset?: number
}

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface MenuItemProps extends React.PropsWithChildren {
  /** Whether the item is non-interactive */
  disabled?: boolean
  /** Called when the item is selected */
  onSelect?: () => void
  /** Accessible text used for typeahead matching */
  textValue?: string
  /** Whether to add leading inset padding */
  inset?: boolean
  /** Additional CSS class names */
  className?: string
}

export interface MenuCheckboxItemProps extends React.PropsWithChildren {
  /** Whether the checkbox item is checked */
  checked?: boolean
  /** Called when the checked state changes */
  onCheckedChange?: (checked: boolean) => void
  /** Whether the item is non-interactive */
  disabled?: boolean
  /** Called when the item is selected */
  onSelect?: () => void
  /** Accessible text used for typeahead matching */
  textValue?: string
  /** Additional CSS class names */
  className?: string
}

export interface MenuRadioGroupProps extends React.PropsWithChildren {
  /** Controlled value of the selected radio item */
  value?: string
  /** Called when the selected radio value changes */
  onValueChange?: (value: string) => void
}

export interface MenuRadioItemProps extends React.PropsWithChildren {
  /** Value this radio item represents */
  value: string
  /** Whether the item is non-interactive */
  disabled?: boolean
  /** Called when the item is selected */
  onSelect?: () => void
  /** Accessible text used for typeahead matching */
  textValue?: string
  /** Additional CSS class names */
  className?: string
}

export interface MenuLabelProps extends React.PropsWithChildren {
  /** Whether to add leading inset padding */
  inset?: boolean
  /** Additional CSS class names */
  className?: string
}

export interface MenuSeparatorProps {
  /** Additional CSS class names */
  className?: string
}

export interface MenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Additional CSS class names */
  className?: string
}

export interface MenuSubProps extends React.PropsWithChildren {
  /** Controlled open state of the submenu */
  open?: boolean
  /** Initial open state for uncontrolled usage */
  defaultOpen?: boolean
  /** Called when the submenu open state changes */
  onOpenChange?: (open: boolean) => void
}

export interface MenuSubTriggerProps extends React.PropsWithChildren {
  /** Whether the trigger is non-interactive */
  disabled?: boolean
  /** Whether to add leading inset padding */
  inset?: boolean
  /** Accessible text used for typeahead matching */
  textValue?: string
  /** Additional CSS class names */
  className?: string
}

export interface MenuSubContentProps extends React.PropsWithChildren {
  /** Additional CSS class names */
  className?: string
  /** Vertical offset from the trigger element */
  sideOffset?: number
  /** Horizontal offset from the trigger alignment */
  alignOffset?: number
}
