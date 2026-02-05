import { Select as SelectRoot, SelectListBox, SelectContext, useSelectContext } from "./Select"
import { SelectTrigger, SearchableTrigger } from "./Select.Trigger"
import { SelectContent, SearchableContent } from "./Select.Content"
import { SelectItem, SelectGroup, SelectValue } from "./Select.Items"
import { SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from "./Select.Decorative"
import { Multi, MultiSelect, MultiSelectTrigger, MultiSelectContent, MultiSelectList, MultiSelectItem, useMultiSelectContext } from "./MultiSelect"

// Create compound component pattern for Select
const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  List: SelectListBox,
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
  Multi,
  MultiSelect,
  SelectContext,
  useSelectContext,
  useMultiSelectContext,
}

export type { SelectProps, SelectContextValue, SelectItemData, SelectTriggerMode, SelectListProps } from "./Select"
export type { SelectTriggerProps, SearchableTriggerProps } from "./Select.Trigger"
export type { SelectContentProps, SearchableContentProps } from "./Select.Content"
export type { SelectItemProps, SelectGroupProps, SelectValueProps } from "./Select.Items"
export type { SelectSeparatorProps } from "./Select.Decorative"
export type { MultiSelectProps, MultiSelectTriggerProps, MultiSelectContentProps, MultiSelectListProps, MultiSelectItemProps, MultiSelectItemData } from "./MultiSelect"
