import { Group } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Select, SelectListBox } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

const groupControls: ControlDef[] = [
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    options: [
      { label: "Horizontal", value: "horizontal" },
      { label: "Vertical", value: "vertical" },
    ],
    defaultValue: "horizontal",
  },
  {
    name: "spacing",
    label: "Spacing",
    type: "select",
    options: [
      { label: "Tight", value: "tight" },
      { label: "Normal", value: "normal" },
      { label: "Relaxed", value: "relaxed" },
    ],
    defaultValue: "normal",
  },
  {
    name: "isDisabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
];

const groupBasicCode = `import { Group } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <Group>
      <Group.Button>Save</Group.Button>
      <Group.Button variant="outline">Cancel</Group.Button>
    </Group>
  );
}`;

const groupButtonsCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <Group>
      <Group.Button variant="primary">Save</Group.Button>
      <Group.Button variant="secondary">Draft</Group.Button>
      <Group.Button variant="outline">Preview</Group.Button>
      <Group.Button variant="ghost">Delete</Group.Button>
    </Group>
  );
}`;

const groupInputWithButtonCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <Group>
      <Group.Input placeholder="Enter text..." />
      <Group.Button>Search</Group.Button>
    </Group>
  );
}`;

const groupSelectWithButtonCode = `import { Group } from "ui-lab-components";
import { Select, SelectListBox } from "ui-lab-components";

export function Example() {
  return (
    <Group>
      <Group.Select>
        <Select.Trigger>
          <Select.Value placeholder="Category" />
        </Select.Trigger>
        <Select.Content>
          <SelectListBox>
            <Select.Item value="cat1">Category 1</Select.Item>
            <Select.Item value="cat2">Category 2</Select.Item>
          </SelectListBox>
        </Select.Content>
      </Group.Select>
      <Group.Button>Apply</Group.Button>
    </Group>
  );
}`;

const groupVerticalCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <Group orientation="vertical" spacing="normal">
      <Group.Button>Option 1</Group.Button>
      <Group.Button>Option 2</Group.Button>
      <Group.Button>Option 3</Group.Button>
    </Group>
  );
}`;

const groupSpacingCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-6">
      <Group spacing="tight">
        <Group.Button>Tight</Group.Button>
        <Group.Button variant="outline">Spacing</Group.Button>
      </Group>
      <Group spacing="normal">
        <Group.Button>Normal</Group.Button>
        <Group.Button variant="outline">Spacing</Group.Button>
      </Group>
      <Group spacing="relaxed">
        <Group.Button>Relaxed</Group.Button>
        <Group.Button variant="outline">Spacing</Group.Button>
      </Group>
    </div>
  );
}`;

const groupWithDividersCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <Group showDividers>
      <Group.Button>Cut</Group.Button>
      <Group.Button>Copy</Group.Button>
      <Group.Button>Paste</Group.Button>
    </Group>
  );
}`;

const groupDisabledCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <Group isDisabled>
      <Group.Button>Save</Group.Button>
      <Group.Button variant="outline">Cancel</Group.Button>
    </Group>
  );
}`;

const groupMixedInputsCode = `import { Group } from "ui-lab-components";
import { Select, SelectListBox } from "ui-lab-components";

export function Example() {
  return (
    <Group orientation="horizontal">
      <Group.Input placeholder="Search..." />
      <Group.Select>
        <Select.Trigger>
          <Select.Value placeholder="Sort by" />
        </Select.Trigger>
        <Select.Content>
          <SelectListBox>
            <Select.Item value="name">Name</Select.Item>
            <Select.Item value="date">Date</Select.Item>
          </SelectListBox>
        </Select.Content>
      </Group.Select>
      <Group.Button>Apply</Group.Button>
    </Group>
  );
}`;

export const groupDetail: ComponentDetail = {
  id: "group",
  name: "Group",
  description: "A compound component for grouping related form controls and buttons with consistent spacing and styling.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Group component is a container that groups related buttons, inputs, and selects together. It provides consistent spacing, alignment, and visual cohesion for related form controls.
      </p>
      <p>
        Use it to create button groups, search filters, or any collection of related controls that should appear as a unified unit. It supports horizontal and vertical layouts, adjustable spacing, and automatic dividers between items.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Group",
      description: "A simple group of buttons with default styling.",
      code: groupBasicCode,
      preview: (
        <Group>
          <Group.Button>Save</Group.Button>
          <Group.Button variant="outline">Cancel</Group.Button>
        </Group>
      ),
      controls: groupControls,
      renderPreview: (props: any) => (
        <Group
          orientation={props.orientation}
          spacing={props.spacing}
          isDisabled={props.isDisabled}
        >
          <Group.Button>Save</Group.Button>
          <Group.Button variant="outline">Cancel</Group.Button>
        </Group>
      ),
    },
    {
      id: "buttons",
      title: "Button Variants",
      description: "Group with different button variants to show visual hierarchy.",
      code: groupButtonsCode,
      preview: (
        <Group>
          <Group.Button variant="primary">Save</Group.Button>
          <Group.Button variant="secondary">Draft</Group.Button>
          <Group.Button variant="outline">Preview</Group.Button>
          <Group.Button variant="ghost">Delete</Group.Button>
        </Group>
      ),
    },
    {
      id: "input-button",
      title: "Input with Button",
      description: "A search-style input grouped with an action button.",
      code: groupInputWithButtonCode,
      preview: (
        <Group>
          <Group.Input placeholder="Enter text..." />
          <Group.Button>Search</Group.Button>
        </Group>
      ),
    },
    {
      id: "select-button",
      title: "Select with Button",
      description: "A select dropdown grouped with an action button.",
      code: groupSelectWithButtonCode,
      preview: (
        <Group>
          <Group.Select>
            <Select.Trigger>
              <Select.Value placeholder="Category" />
            </Select.Trigger>
            <Select.Content>
              <SelectListBox>
                <Select.Item value="cat1">Category 1</Select.Item>
                <Select.Item value="cat2">Category 2</Select.Item>
              </SelectListBox>
            </Select.Content>
          </Group.Select>
          <Group.Button>Apply</Group.Button>
        </Group>
      ),
    },
    {
      id: "vertical",
      title: "Vertical Layout",
      description: "Group with vertical orientation for stacked controls.",
      code: groupVerticalCode,
      preview: (
        <Group orientation="vertical" spacing="normal">
          <Group.Button>Option 1</Group.Button>
          <Group.Button>Option 2</Group.Button>
          <Group.Button>Option 3</Group.Button>
        </Group>
      ),
    },
    {
      id: "spacing",
      title: "Spacing Options",
      description: "Demonstrating tight, normal, and relaxed spacing between items.",
      code: groupSpacingCode,
      preview: (
        <div className="space-y-6">
          <Group spacing="tight">
            <Group.Button>Tight</Group.Button>
            <Group.Button variant="outline">Spacing</Group.Button>
          </Group>
          <Group spacing="normal">
            <Group.Button>Normal</Group.Button>
            <Group.Button variant="outline">Spacing</Group.Button>
          </Group>
          <Group spacing="relaxed">
            <Group.Button>Relaxed</Group.Button>
            <Group.Button variant="outline">Spacing</Group.Button>
          </Group>
        </div>
      ),
    },
    {
      id: "dividers",
      title: "With Dividers",
      description: "Group with visual dividers between items for better visual separation.",
      code: groupWithDividersCode,
      preview: (
        <Group showDividers>
          <Group.Button>Cut</Group.Button>
          <Group.Button>Copy</Group.Button>
          <Group.Button>Paste</Group.Button>
        </Group>
      ),
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Group with disabled state that disables all child controls.",
      code: groupDisabledCode,
      preview: (
        <Group isDisabled>
          <Group.Button>Save</Group.Button>
          <Group.Button variant="outline">Cancel</Group.Button>
        </Group>
      ),
    },
    {
      id: "mixed",
      title: "Mixed Controls",
      description: "Group combining input, select, and button for complex filters.",
      code: groupMixedInputsCode,
      preview: (
        <Group orientation="horizontal">
          <Group.Input placeholder="Search..." />
          <Group.Select>
            <Select.Trigger>
              <Select.Value placeholder="Sort by" />
            </Select.Trigger>
            <Select.Content>
              <SelectListBox>
                <Select.Item value="name">Name</Select.Item>
                <Select.Item value="date">Date</Select.Item>
              </SelectListBox>
            </Select.Content>
          </Group.Select>
          <Group.Button>Apply</Group.Button>
        </Group>
      ),
    },
  ],

  variants: [
    {
      id: "horizontal",
      name: "Horizontal",
      description: "Controls arranged horizontally in a row. Default orientation.",
      code: groupBasicCode,
      preview: (
        <Group orientation="horizontal">
          <Group.Button>Left</Group.Button>
          <Group.Button variant="outline">Center</Group.Button>
          <Group.Button variant="outline">Right</Group.Button>
        </Group>
      ),
    },
    {
      id: "vertical",
      name: "Vertical",
      description: "Controls arranged vertically in a column.",
      code: groupVerticalCode,
      preview: (
        <Group orientation="vertical" className="w-fit">
          <Group.Button>Top</Group.Button>
          <Group.Button variant="outline">Middle</Group.Button>
          <Group.Button variant="outline">Bottom</Group.Button>
        </Group>
      ),
    },
  ],
};
