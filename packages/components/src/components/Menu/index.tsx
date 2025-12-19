import React from "react"
import { Menu as MenuRoot, MenuPortal } from "./menu"
import { MenuTrigger, MenuContent } from "./content"
import { MenuItem, MenuCheckboxItem, MenuRadioItem } from "./items"
import { MenuLabel, MenuSeparator, MenuShortcut, MenuGroup, MenuRadioGroup } from "./decorative"
import { MenuSub, MenuSubContent, MenuSubTrigger } from "./submenu"

import type {
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
} from "./menu"

interface MenuComponent extends React.FC<React.PropsWithChildren<MenuProps>> {
  Trigger: typeof MenuTrigger
  Content: typeof MenuContent
  Item: typeof MenuItem
  CheckboxItem: typeof MenuCheckboxItem
  RadioItem: typeof MenuRadioItem
  Label: typeof MenuLabel
  Separator: typeof MenuSeparator
  Shortcut: typeof MenuShortcut
  Group: typeof MenuGroup
  RadioGroup: typeof MenuRadioGroup
  Portal: typeof MenuPortal
  Sub: typeof MenuSub
  SubContent: typeof MenuSubContent
  SubTrigger: typeof MenuSubTrigger
}

const Menu: MenuComponent = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CheckboxItem: MenuCheckboxItem,
  RadioItem: MenuRadioItem,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Shortcut: MenuShortcut,
  Group: MenuGroup,
  RadioGroup: MenuRadioGroup,
  Portal: MenuPortal,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger,
}) as MenuComponent

export { Menu }
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
}

export type { SelectionMode, Position, ItemData, MenuContextValue, MenuSubmenuContextValue, RadioGroupContextValue } from "./menu"
