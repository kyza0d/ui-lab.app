import { Select as SelectRoot, SelectContext, useSelectContext, type SelectMode } from "./Select"
import { SelectTrigger, SearchableTrigger } from "./Select.Trigger"
import { SelectContent, SearchableContent } from "./Select.Content"
import { SelectGroup, SelectValue, SelectItem, SelectList } from "./Select.Items"
import { SelectSeparator } from "./Select.Decorative"

const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  List: SelectList,
  Item: SelectItem,
  Group: SelectGroup,
  Value: SelectValue,
  Separator: SelectSeparator,
})

const Searchable = Object.assign(() => null, {
  Trigger: SearchableTrigger,
  Content: SearchableContent,
})

const Multi = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  List: SelectList,
  Item: SelectItem,
})

export {
  Select,
  Searchable,
  Multi,
  SelectContext,
  useSelectContext,
}

export type { SelectProps, SelectContextValue, SelectItemData, SelectTriggerMode } from "./Select"
export type { SelectMode }
export type { SelectTriggerProps, SearchableTriggerProps } from "./Select.Trigger"
export type { SelectContentProps, SearchableContentProps } from "./Select.Content"
export type { SelectGroupProps, SelectValueProps, SelectItemProps, SelectListProps } from "./Select.Items"
export type { SelectSeparatorProps } from "./Select.Decorative"
