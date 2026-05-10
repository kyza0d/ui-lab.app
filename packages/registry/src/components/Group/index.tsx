import React from 'react';
import { Divider, Group } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-group.js';
import Example2, { metadata as metadata2 } from './examples/02-create-project.js';
import Example3, { metadata as metadata3 } from './examples/03-filter-bar.js';
import Example4, { metadata as metadata4 } from './examples/04-documentation-search.js';
import Example5, { metadata as metadata5 } from './examples/05-email-signup.js';
import Example6, { metadata as metadata6 } from './examples/06-copy-command.js';
import Example7, { metadata as metadata7 } from './examples/07-delete-confirmation.js';
import Example8, { metadata as metadata8 } from './examples/08-slider-integration.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';

const examplesData = [
  { id: '01-basic-group', Component: Example1, metadata: metadata1 },
  { id: '02-create-project', Component: Example2, metadata: metadata2 },
  { id: '03-filter-bar', Component: Example3, metadata: metadata3 },
  { id: '04-documentation-search', Component: Example4, metadata: metadata4 },
  { id: '05-email-signup', Component: Example5, metadata: metadata5 },
  { id: '06-copy-command', Component: Example6, metadata: metadata6 },
  { id: '07-delete-confirmation', Component: Example7, metadata: metadata7 },
  { id: '08-slider-integration', Component: Example8, metadata: metadata8 },
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
export * from './examples/index.js';
