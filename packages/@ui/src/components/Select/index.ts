import { Select as SelectRoot, SelectContext, useSelectContext, type SelectMode } from "./Select"
import { SelectTrigger, SearchableTrigger } from "./Select.Trigger"
import { SelectContent, SearchableContent } from "./Select.Content"
import { SelectGroup, SelectValue, SelectItem, SelectList } from "./Select.Items"
import { SelectSeparator } from "./Select.Decorative"
import { SelectSub, SelectSubTrigger, SelectSubContent } from "./Select.Sub"

const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  List: SelectList,
  Item: SelectItem,
  Group: SelectGroup,
  Value: SelectValue,
  Separator: SelectSeparator,
  Sub: SelectSub,
  SubTrigger: SelectSubTrigger,
  SubContent: SelectSubContent,
})

const Searchable = Object.assign(() => null, {
  Input: SearchableTrigger,
  Content: SearchableContent,
})

const Multi = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Content: SelectContent,
  List: SelectList,
  Item: SelectItem,
})

export type { SelectProps } from "./Select"
export type {
  SelectContentProps,
  SelectContentStyleSlots,
} from "./Select.Content"
export type {
  SelectTriggerProps,
  SearchableTriggerProps,
} from "./Select.Trigger"
export type { SelectSeparatorProps } from "./Select.Decorative"
export type {
  SelectSubProps,
  SelectSubTriggerProps,
  SelectSubContentProps,
} from "./Select.Sub"
export type {
  SelectGroupProps,
  SelectValueProps,
  SelectItemProps,
  SelectListProps,
} from "./Select.Items"

export {
  Select,
  Searchable,
  Multi,
  useSelectContext,
}

