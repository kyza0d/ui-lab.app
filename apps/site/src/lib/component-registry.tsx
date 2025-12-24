import { cache } from "react";
import { Button } from "ui-lab-components";
import { buttonDetail } from "ui-lab-registry/components/Button";
import { badgeDetail } from "ui-lab-registry/components/Badge";
import { breadcrumbsDetail } from "ui-lab-registry/components/Breadcrumbs";
import { cardDetail } from "ui-lab-registry/components/Card";
import { checkboxDetail } from "ui-lab-registry/components/Checkbox";
import { dividerDetail } from "ui-lab-registry/components/Divider";
import { flexDetail } from "ui-lab-registry/components/Flex";
import { foldDetail } from "ui-lab-registry/components/Fold";
import { formDetail } from "ui-lab-registry/components/Form";
import { galleryDetail } from "ui-lab-registry/components/Gallery";
import { gridDetail } from "ui-lab-registry/components/Grid";
import { groupDetail } from "ui-lab-registry/components/Group";
import { inputDetail } from "ui-lab-registry/components/Input";
import { labelDetail } from "ui-lab-registry/components/Label";
import { menuDetail } from "ui-lab-registry/components/Menu";
import { toastDetail } from "ui-lab-registry/components/Toast";
import { modalDetail } from "ui-lab-registry/components/Modal";
import { popoverDetail } from "ui-lab-registry/components/Popover";
import { confirmDetail } from "ui-lab-registry/components/Confirm";
import { progressDetail } from "ui-lab-registry/components/Progress";
import { radioDetail } from "ui-lab-registry/components/Radio";
import { commandPaletteDetail } from "ui-lab-registry/components/CommandPalette";
import { scrollareaDetail } from "ui-lab-registry/components/ScrollArea";
import { selectDetail } from "ui-lab-registry/components/Select";
import { sliderDetail } from "ui-lab-registry/components/Slider";
import { switchDetail } from "ui-lab-registry/components/Switch";
import { tableDetail } from "ui-lab-registry/components/Table";
import { tabsDetail } from "ui-lab-registry/components/Tabs";
import { textareaDetail } from "ui-lab-registry/components/Textarea";
import { tooltipDetail } from "ui-lab-registry/components/Tooltip";

import { Group } from "ui-lab-components";
import { Flex } from "ui-lab-components";
import { Grid } from "ui-lab-components";
import { Table } from "ui-lab-components";
import {
  Select,
  SelectListBox,
} from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Label } from "ui-lab-components";
import { TextArea } from "ui-lab-components";
import { Checkbox } from "ui-lab-components";
import { Radio } from "ui-lab-components";
import { Badge } from "ui-lab-components";
import { Breadcrumbs, Breadcrumb } from "ui-lab-components";
import { Tooltip } from "ui-lab-components";
import { Popover } from "ui-lab-components";
import { Slider } from "ui-lab-components";
import { Tabs, TabsList, TabsTrigger } from "ui-lab-components";
import { Menu } from "ui-lab-components";
import { Switch } from "ui-lab-components";
import { Progress } from "ui-lab-components";
import { Divider } from "ui-lab-components";
import { Fold } from "ui-lab-components";
import { Gallery } from "ui-lab-components";
// import { Frame } from "@/components/experimental";
import { frameDetail } from "./demos/frame";
import { ScrollArea } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { FaBell, FaCircleQuestion, FaComputerMouse, FaFile, FaImage, FaInfo, FaRectangleList, FaWindowRestore } from "react-icons/fa6";
import { FaPencil, FaKeyboard, FaShieldHalved } from "react-icons/fa6";
import {
  componentRegistry as registryData,
  categories,
  type ComponentCategory,
  type ComponentMetadata as RegistryMetadata,
} from "ui-lab-registry";
import { experimentalRegistry, type ExperimentalComponentMetadata } from "./experimental-registry";
export type { ComponentCategory } from "ui-lab-registry";
export { categories, categoryMap, categoryOrder } from "ui-lab-registry";
export interface ComponentMetadata extends RegistryMetadata {
  preview: React.ReactNode;
  experimental?: boolean;
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
    <Flex align="center" direction="column" gap="sm">
      <div className="h-7 w-12 bg-background-800 rounded flex items-center justify-center text-foreground-300 text-sm font-medium">1</div>
      <div className="h-7 w-12 bg-background-800 rounded flex items-center justify-center text-foreground-300 text-sm font-medium">2</div>
      <div className="h-7 w-12 bg-background-800 rounded flex items-center justify-center text-foreground-300 text-sm font-medium">3</div>
    </Flex>
  ),
  grid: (
    <Grid columns="3" gap="sm">
      <div className="h-16 bg-background-800 rounded flex items-center justify-center text-foreground-300 text-sm font-medium">1</div>
      <div className="h-16 bg-background-800 rounded flex items-center justify-center text-foreground-300 text-sm font-medium">2</div>
      <div className="h-16 bg-background-800 rounded flex items-center justify-center text-foreground-300 text-sm font-medium">3</div>
    </Grid>
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
  textarea: (
    <div className="flex flex-col gap-2 max-w-sm">
      <TextArea size="sm" placeholder="Small textarea" />
    </div>
  ),
  select: (
    <div className="flex items-center justify-center h-22">
      <Select>
        <Select.Trigger className="w-48">
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Content>
          <SelectListBox>
            <Select.Item key="option1" value="option1">Option 1</Select.Item>
            <Select.Item key="option2" value="option2">Option 2</Select.Item>
            <Select.Item key="option3" value="option3">Option 3</Select.Item>
          </SelectListBox>
        </Select.Content>
      </Select>
    </div>
  ),
  switch: (
    <div className="flex flex-col items-center gap-3">
      <Switch size="sm" defaultSelected={false} />
      <Switch size="sm" defaultSelected={true} />
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
    <div className="flex flex-wrap">
      <Badge><FaInfo className="inline mr-2 mb-0.5" />Badge</Badge>
    </div>
  ),
  breadcrumbs: (
    <Breadcrumbs>
      <Breadcrumb>Home</Breadcrumb>
      <Breadcrumb>Products</Breadcrumb>
      <Breadcrumb>Electronics</Breadcrumb>
    </Breadcrumbs>
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
        <Button
          variant="secondary"
        >
          Click Me
        </Button>
      </Popover>
    </div>
  ),
  'form': (
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
  'menu': (
    <div className="flex items-center justify-center h-22">
      <Menu>
        <Menu.Trigger className="px-4 py-2 rounded-lg bg-background-700 text-foreground-50 hover:bg-background-600 transition-colors text-sm cursor-menu">
          Right click
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Copy</Menu.Item>
          <Menu.Item>Paste</Menu.Item>
        </Menu.Content>
      </Menu>
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
  fold: (
    <div className="w-full max-w-sm">
      <Fold title="Expandable content" defaultExpanded={false}>
        <p className="text-foreground-300 text-sm">
          Click to reveal hidden content
        </p>
      </Fold>
    </div>
  ),
  page: (
    <div className="flex items-center justify-center h-22">
      <FaFile className="w-9 h-9 text-accent-500" />
    </div>
  ),
  gallery: (
    <Gallery columns={3}>
      {[1, 2, 3].map((i) => (
        <Gallery.Item key={i} className="p-4">
          <Gallery.View aspectRatio="5/5">
            <FaImage />
          </Gallery.View>
        </Gallery.Item>
      ))}
    </Gallery>
  ),
  // frame: (
  //   <Frame>
  //     <p className="text-sm text-foreground-300">Framed content</p>
  //   </Frame>
  // ),
  scrollarea: (
    <ScrollArea maxHeight="200px">
      <div className="flex items-center justify-center h-22">
        <FaComputerMouse className="w-9 h-9 text-accent-500" />
      </div>
    </ScrollArea>
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
      packageName: 'ui-lab-components' as const,
      exportName: 'Table',
      packagePath: 'src/components/table.tsx',
    },
    relatedComponents: ['card'],
    preview: previews.table || <div />,
  }] : []),
  ...experimentalRegistry.map((metadata) => ({
    ...metadata,
    source: {
      packageName: 'ui-lab-components' as const,
      exportName: metadata.id.charAt(0).toUpperCase() + metadata.id.slice(1),
      packagePath: `src/components/experimental/${metadata.id}`,
    },
    preview: previews[metadata.id] || <div />,
  }))
];
export const getComponentsByCategory = cache((category: ComponentCategory): ComponentMetadata[] => {
  return componentRegistry.filter(c => c.category === category)
});
export const getComponentsGroupedByCategory = cache((): Record<ComponentCategory, ComponentMetadata[]> => {
  const result: Record<ComponentCategory, ComponentMetadata[]> = {} as Record<ComponentCategory, ComponentMetadata[]>;
  categories.forEach(cat => {
    result[cat.id] = getComponentsByCategory(cat.id);
  });
  return result;
});
export const getRelatedComponents = cache((id: string): ComponentMetadata[] => {
  const component = componentRegistry.find(c => c.id === id)
  if (!component) return []
  return component.relatedComponents
    .map(id => componentRegistry.find(c => c.id === id))
    .filter(Boolean) as ComponentMetadata[]
});
const componentDetails: Record<string, ComponentDetail> = {
  button: buttonDetail,
  group: groupDetail,
  flex: flexDetail,
  grid: gridDetail,
  table: tableDetail,
  input: inputDetail,
  textarea: textareaDetail,
  label: labelDetail,
  select: selectDetail,
  checkbox: checkboxDetail,
  radio: radioDetail,
  badge: badgeDetail,
  breadcrumbs: breadcrumbsDetail,
  tooltip: tooltipDetail,
  popover: popoverDetail,
  "form": formDetail,
  toast: toastDetail,
  modal: modalDetail,
  slider: sliderDetail,
  progress: progressDetail,
  tabs: tabsDetail,
  "menu": menuDetail,
  switch: switchDetail,
  card: cardDetail,
  "command-palette": commandPaletteDetail,
  confirm: confirmDetail,
  divider: dividerDetail,
  fold: foldDetail,
  gallery: galleryDetail,
  // frame: frameDetail,
  scrollarea: scrollareaDetail,
};
export const getComponentById = cache((id: string): ComponentDetail | undefined => {
  return componentDetails[id];
});
export const getComponentMetadata = cache((id: string): ComponentMetadata | undefined => {
  return componentRegistry.find((component) => component.id === id);
});
