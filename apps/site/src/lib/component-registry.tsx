import { Button } from "ui-lab-components";
import { buttonDetail } from "./component-demos/button";
import { Group } from "ui-lab-components";
import { groupDetail } from "./component-demos/group";
import { Flex } from "ui-lab-components";
import { flexDetail } from "./component-demos/flex";
import { Table } from "@/components/table";
import { tableDetail } from "./component-demos/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectListBox,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

import { selectDetail } from "./component-demos/select";
import { Input } from "ui-lab-components";
import { inputDetail } from "./component-demos/input";
import { Label } from "ui-lab-components";
import { labelDetail } from "./component-demos/label";
import { TextArea } from "ui-lab-components";
import { textareaDetail } from "./component-demos/textarea";
import { Checkbox } from "ui-lab-components";
import { checkboxDetail } from "./component-demos/checkbox";
import { Radio } from "ui-lab-components";
import { radioDetail } from "./component-demos/radio";
import { Badge } from "ui-lab-components";
import { badgeDetail } from "./component-demos/badge";
import { Tooltip } from "ui-lab-components";
import { tooltipDetail } from "./component-demos/tooltip";
import { Popover } from "ui-lab-components";
import { popoverDetail } from "./component-demos/popover";
import { formWrapperDetail } from "./component-demos/form-wrapper";
import { toastDetail } from "./component-demos/toast";
import { modalDetail } from "./component-demos/modal";
import { Slider } from "ui-lab-components";
import { sliderDetail } from "./component-demos/slider";
import { Tabs, TabsList, TabsTrigger } from "ui-lab-components";
import { tabsDetail } from "./component-demos/tabs";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "ui-lab-components";
import { contextMenuDetail } from "./component-demos/context-menu";
import { Switch } from "ui-lab-components";
import { switchDetail } from "./component-demos/switch";
import { Progress } from "ui-lab-components";
import { progressDetail } from "./component-demos/progress";
import { cardDetail } from "./component-demos/card";
import { commandPaletteDetail } from "./component-demos/command-palette";
import { confirmComponentDetail } from "./component-demos/confirmation";
import { Divider } from "ui-lab-components";
import { dividerDetail } from "./component-demos/divider";
import { ComponentDetail } from "@/types/component";
import { FaBell, FaCircleQuestion, FaFile, FaRectangleList, FaWindowRestore } from "react-icons/fa6";
import { FaPencil, FaKeyboard, FaShieldHalved } from "react-icons/fa6";
import {
  componentRegistry as registryData,
  categories,
  type ComponentCategory,
  type ComponentMetadata as RegistryMetadata,
} from "ui-lab-registry";

export type { ComponentCategory } from "ui-lab-registry";
export { categories, categoryMap, categoryOrder } from "ui-lab-registry";

export interface ComponentMetadata extends RegistryMetadata {
  preview: React.ReactNode;
}

const previews: Record<string, React.ReactNode> = {
  button: (
    <div className="flex flex-wrap gap-2">
      <Button size="sm">Small</Button>
    </div>
  ),
  group: (
    <div className="flex flex-wrap gap-2">
      <Group>
        <Group.Button>Save</Group.Button>
        <Group.Button variant="outline">Cancel</Group.Button>
      </Group>
    </div>
  ),
  flex: (
    <Flex gap="md">
      <Button size="sm">Item 1</Button>
      <Button size="sm">Item 2</Button>
      <Button size="sm">Item 3</Button>
    </Flex>
  ),
  table: (
    <div className="w-full overflow-hidden">
      <Table
        data={[
          { name: "Alice", email: "alice@example.com" },
        ]}
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
        ]}
      />
    </div>
  ),
  input: (
    <div className="flex flex-col gap-2 max-w-sm">
      <Input size="sm" placeholder="Small input" />
    </div>
  ),
  label: (
    <div className="flex flex-col gap-4">
      <Label>Default Label</Label>
    </div>
  ),
  select: (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectListBox>
          <SelectItem key="option1" value="option1">Option 1</SelectItem>
          <SelectItem key="option2" value="option2">Option 2</SelectItem>
          <SelectItem key="option3" value="option3">Option 3</SelectItem>
        </SelectListBox>
      </SelectContent>
    </Select>
  ),
  textarea: (
    <div className="flex flex-col gap-2 max-w-sm">
      <TextArea size="sm" placeholder="Small textarea" />
    </div>
  ),
  checkbox: (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
    </div>
  ),
  radio: (
    <div className="flex flex-col gap-3">
      <Radio label="Unchecked" />
      <Radio label="Checked" checked />
    </div>
  ),
  badge: (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
  tooltip: (
    <div className="flex items-center justify-center h-22">
      <Tooltip content="Hover information">
        <FaCircleQuestion className="w-9 h-9 text-accent-500 cursor-help" />
      </Tooltip>
    </div>
  ),
  popover: (
    <div className="flex items-center justify-center h-22">
      <Popover content="Click to show">
        <button className="px-3 py-2 rounded-lg border border-background-600 bg-background-700 text-foreground-300 hover:bg-background-600 text-sm">
          Click me
        </button>
      </Popover>
    </div>
  ),
  'form-wrapper': (
    <div className="flex items-center justify-center h-22">
      <FaPencil className="w-9 h-9 text-accent-500" />
    </div>
  ),
  toast: (
    <div className="flex items-center justify-center h-22">
      <FaBell className="w-9 h-9 text-accent-500" />
    </div>
  ),
  modal: (
    <div className="flex items-center justify-center h-22">
      <FaWindowRestore className="w-9 h-9 text-accent-500" />
    </div>
  ),
  tabs: (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
  'context-menu': (
    <div className="flex items-center justify-center h-22">
      <ContextMenu>
        <ContextMenuTrigger className="px-4 py-2 rounded-lg bg-background-700 text-foreground-50 hover:bg-background-600 transition-colors text-sm cursor-context-menu">
          Right click
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
  switch: (
    <div className="flex items-center gap-3">
      <Switch size="sm" defaultSelected={false} />
      <Switch size="sm" defaultSelected={true} />
    </div>
  ),
  slider: (
    <div className="w-48">
      <Slider.Root min={0} max={100} defaultValue={[50]} />
    </div>
  ),
  progress: (
    <div className="w-48 space-y-2">
      <Progress value={60} size="md" />
    </div>
  ),
  card: (
    <div className="flex items-center justify-center h-22">
      <FaRectangleList className="w-9 h-9 text-accent-500" />
    </div>
  ),
  'command-palette': (
    <div className="flex items-center justify-center h-22">
      <FaKeyboard className="w-9 h-9 text-accent-500" />
    </div>
  ),
  confirm: (
    <div className="flex items-center justify-center h-22">
      <FaShieldHalved className="w-9 h-9 text-accent-500" />
    </div>
  ),
  divider: (
    <div className="space-y-8 min-w-40">
      <Divider className="mb-4" variant="solid" size="md" color="default" />
      <Divider variant="dashed" size="md" color="subtle" />
    </div>
  ),
  page: (
    <div className="flex items-center justify-center h-22">
      <FaFile className="w-9 h-9 text-accent-500" />
    </div>
  ),
};

export const componentRegistry: ComponentMetadata[] = [
  ...Object.entries(registryData).map(
    ([id, metadata]) => ({
      ...metadata,
      preview: previews[id] || <div />,
    })
  ),
  ...(!registryData.table ? [{
    id: "table",
    name: tableDetail.name,
    description: tableDetail.description,
    category: 'data' as const,
    source: {
      packageName: 'ui-lab-component' as const,
      exportName: 'Table',
      packagePath: 'src/components/table.tsx',
    },
    relatedComponents: ['card'],
    preview: previews.table || <div />,
  }] : [])
];

export function getComponentsByCategory(category: ComponentCategory): ComponentMetadata[] {
  return componentRegistry.filter(c => c.category === category)
}

export function getComponentsGroupedByCategory(): Record<ComponentCategory, ComponentMetadata[]> {
  const result: Record<ComponentCategory, ComponentMetadata[]> = {} as Record<ComponentCategory, ComponentMetadata[]>;
  categories.forEach(cat => {
    result[cat.id] = getComponentsByCategory(cat.id);
  });
  return result;
}

export function getRelatedComponents(id: string): ComponentMetadata[] {
  const component = componentRegistry.find(c => c.id === id)
  if (!component) return []
  return component.relatedComponents
    .map(id => componentRegistry.find(c => c.id === id))
    .filter(Boolean) as ComponentMetadata[]
}

const componentDetails: Record<string, ComponentDetail> = {
  button: buttonDetail,
  group: groupDetail,
  flex: flexDetail,
  table: tableDetail,
  input: inputDetail,
  label: labelDetail,
  select: selectDetail,
  textarea: textareaDetail,
  checkbox: checkboxDetail,
  radio: radioDetail,
  badge: badgeDetail,
  tooltip: tooltipDetail,
  popover: popoverDetail,
  "form-wrapper": formWrapperDetail,
  toast: toastDetail,
  modal: modalDetail,
  slider: sliderDetail,
  progress: progressDetail,
  tabs: tabsDetail,
  "context-menu": contextMenuDetail,
  switch: switchDetail,
  card: cardDetail,
  "command-palette": commandPaletteDetail,
  confirm: confirmComponentDetail,
  divider: dividerDetail,
};

export function getComponentById(id: string): ComponentDetail | undefined {
  return componentDetails[id];
}

export function getComponentMetadata(id: string): ComponentMetadata | undefined {
  return componentRegistry.find((component) => component.id === id);
}
