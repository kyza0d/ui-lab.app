import { Group } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-group.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-group', Component: Example1, metadata: metadata1 },
];


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
]

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
}`

const groupBasicCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <Group>
      <Group.Button>Save</Group.Button>
      <Group.Button variant="outline">Cancel</Group.Button>
    </Group>
  );
}`;

const groupVerticalCode = `import { Group } from "ui-lab-components";

export function Example() {
  return (
    <Group orientation="vertical">
      <Group.Button>Top</Group.Button>
      <Group.Button variant="outline">Middle</Group.Button>
      <Group.Button variant="outline">Bottom</Group.Button>
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
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: groupBasicCode,
      preview: (
        <Group>
          <Group.Button>Save</Group.Button>
          <Group.Button variant="outline">Cancel</Group.Button>
        </Group>
      ),
      controls: groupControls,
      renderPreview: (props: any) => (
        <Group orientation={props.orientation} spacing={props.spacing} isDisabled={props.isDisabled}>
          <Group.Button>Save</Group.Button>
          <Group.Button variant="outline">Cancel</Group.Button>
        </Group>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
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

export { groupControls };
export * from './examples';
