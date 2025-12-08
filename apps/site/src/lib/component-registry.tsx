import { Button } from "@ui-lab/components";
import { buttonDetail } from "./components-data/button";
import { ButtonGroup, ButtonGroupItem } from "@ui-lab/components";
import { buttonGroupDetail } from "./components-data/button-group";
import { Table } from "@/components/table";
import { tableDetail } from "./components-data/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-lab/components";
import { selectDetail } from "./components-data/select";
import { Input } from "@ui-lab/components";
import { inputDetail } from "./components-data/input";
import { Label } from "@ui-lab/components";
import { labelDetail } from "./components-data/label";
import { TextArea } from "@ui-lab/components";
import { textareaDetail } from "./components-data/textarea";
import { Checkbox } from "@ui-lab/components";
import { checkboxDetail } from "./components-data/checkbox";
import { Radio } from "@ui-lab/components";
import { radioDetail } from "./components-data/radio";
import { Badge } from "@ui-lab/components";
import { badgeDetail } from "./components-data/badge";
import { Tooltip } from "@ui-lab/components";
import { tooltipDetail } from "./components-data/tooltip";
import { Popover } from "@ui-lab/components";
import { popoverDetail } from "./components-data/popover";
import { formWrapperDetail } from "./components-data/form-wrapper";
import { toastDetail } from "./components-data/toast";
import { modalDetail } from "./components-data/modal";
import { Slider } from "@ui-lab/components";
import { sliderDetail } from "./components-data/slider";
import { Tabs, TabsList, TabsTrigger } from "@ui-lab/components";
import { tabsDetail } from "./components-data/tabs";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@ui-lab/components";
import { contextMenuDetail } from "./components-data/context-menu";
import { Switch } from "@ui-lab/components";
import { switchDetail } from "./components-data/switch";
import { Progress } from "@ui-lab/components";
import { progressDetail } from "./components-data/progress";
import { cardDetail } from "./components-data/card";
import { commandPaletteDetail } from "./components-data/command-palette";
import { confirmationComponentDetail } from "./components-data/confirmation";
import { Divider } from "@ui-lab/components";
import { dividerDetail } from "./components-data/divider";
import { pageDetail } from "./components-data/page";
import { ComponentDetail } from "@/types/component";
import { FaBell, FaCircleQuestion, FaFile, FaRectangleList, FaWindowRestore } from "react-icons/fa6";
import { FaPencil, FaKeyboard, FaShieldHalved } from "react-icons/fa6";
import {
  componentRegistry as registryData,
  categories,
  categoryOrder,
  categoryMap,
  type ComponentCategory,
  type ComponentMetadata as RegistryMetadata,
} from "@ui-lab/registry";

export type { ComponentCategory } from "@ui-lab/registry";
export { categories, categoryMap, categoryOrder } from "@ui-lab/registry";

export interface ComponentMetadata extends RegistryMetadata {
  preview: React.ReactNode;
}

const previews: Record<string, React.ReactNode> = {
  button: (
    <div className="flex flex-wrap gap-2">
      <Button size="sm">Small</Button>
    </div>
  ),
  'button-group': (
    <div className="flex flex-wrap gap-2">
      <ButtonGroup variant="secondary" spacing="tight" showDividers>
        <ButtonGroupItem size="md">Item 1</ButtonGroupItem>
        <ButtonGroupItem size="md" isSelected>Item 2</ButtonGroupItem>
        <ButtonGroupItem size="md">Item 3</ButtonGroupItem>
      </ButtonGroup>
    </div>
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
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
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
      <Switch size="sm" defaultChecked={false} />
      <Switch size="sm" defaultChecked={true} />
    </div>
  ),
  slider: (
    <div className="w-48">
      <Slider.Root min={0} max={100} defaultValue={[50]}>
        <Slider.Thumb />
      </Slider.Root>
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
  confirmation: (
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

export const componentRegistry: ComponentMetadata[] = Object.entries(registryData).map(
  ([id, metadata]) => ({
    ...metadata,
    preview: previews[id] || <div />,
  })
).concat(
  !registryData.page ? [{
    id: "page",
    name: pageDetail.name,
    description: pageDetail.description,
    category: 'container' as ComponentCategory,
    source: {
      packageName: '@ui-lab/components' as const,
      exportName: 'Page',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card', 'modal'],
    preview: previews.page || <div />,
  }] : [],
  !registryData.table ? [{
    id: "table",
    name: tableDetail.name,
    description: tableDetail.description,
    category: 'data' as ComponentCategory,
    source: {
      packageName: '@ui-lab/components' as const,
      exportName: 'Table',
      packagePath: 'src/components/table.tsx',
    },
    relatedComponents: ['card'],
    preview: previews.table || <div />,
  }] : []
);

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
  "button-group": buttonGroupDetail,
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
  confirmation: confirmationComponentDetail,
  divider: dividerDetail,
  page: pageDetail,
};

export function getComponentById(id: string): ComponentDetail | undefined {
  return componentDetails[id];
}

export function getComponentMetadata(id: string): ComponentMetadata | undefined {
  return componentRegistry.find((component) => component.id === id);
}
