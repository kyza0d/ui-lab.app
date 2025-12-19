import { Select as SelectRoot, SelectListBox, SelectContext, useSelectContext } from "./select"
import { SelectTrigger, SearchableTrigger } from "./trigger"
import { SelectContent, SearchableContent } from "./content"
import { SelectItem, SelectGroup, SelectValue } from "./items"
import { SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from "./decorative"

// Create compound component pattern for Select
const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  Value: SelectValue,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
})

// Create compound component pattern for Searchable
const Searchable = Object.assign(() => null, {
  Trigger: SearchableTrigger,
  Content: SearchableContent,
})

export {
  Select,
  Searchable,
  SelectListBox,
  SelectContext,
  useSelectContext,
}

export type { SelectProps, SelectContextValue, SelectItemData, SelectTriggerMode } from "./select"
export type { SelectTriggerProps, SearchableTriggerProps } from "./trigger"
export type { SelectContentProps, SearchableContentProps } from "./content"
export type { SelectItemProps, SelectGroupProps, SelectValueProps } from "./items"
export type { SelectSeparatorProps } from "./decorative"
