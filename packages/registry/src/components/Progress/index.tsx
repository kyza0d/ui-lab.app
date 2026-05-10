import React from 'react';
import { Progress } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-progress.js';
import Example2, { metadata as metadata2 } from './examples/02-storage-quota.js';
import Example3, { metadata as metadata3 } from './examples/03-onboarding-steps.js';
import Example4, { metadata as metadata4 } from './examples/04-indeterminate.js';
import Example5, { metadata as metadata5 } from './examples/05-skill-levels.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';

const examplesData = [
  { id: '01-basic-progress', Component: Example1, metadata: metadata1 },
  { id: '02-storage-quota', Component: Example2, metadata: metadata2 },
  { id: '03-onboarding-steps', Component: Example3, metadata: metadata3 },
  { id: '04-indeterminate', Component: Example4, metadata: metadata4 },
  { id: '05-skill-levels', Component: Example5, metadata: metadata5 },
];


const progressControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Success", value: "success" },
      { label: "Warning", value: "warning" },
      { label: "Error", value: "error" },
    ],
    defaultValue: "default",
  },
  {
    name: "value",
    label: "Value",
    type: "select",
    options: [
      { label: "0%", value: "0" },
      { label: "25%", value: "25" },
      { label: "50%", value: "50" },
      { label: "75%", value: "75" },
      { label: "100%", value: "100" },
    ],
    defaultValue: "50",
  },
  {
    name: "indeterminate",
    label: "Indeterminate",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "showValue",
    label: "Show Value",
    type: "toggle",
    defaultValue: false,
  },
]

const progressBasicCode = `import { Progress } from "ui-lab-components";

export function Example() {
  return <Progress value={60} />;
}`;

export const progressDetail: ComponentDetail = {
  id: "progress",
  name: "Progress",
  description:
    "A horizontal progress bar with configurable value and variants. Supports determinate and indeterminate states.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Progress component displays a horizontal bar that fills based on a percentage value. It's ideal for showing loading states, upload progress, completion status, and other metrics.
      </p>
      <p>
        Progress bars support semantic color variants and an indeterminate mode for unknown durations. Labels and percentage values can be displayed for additional context.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: progressBasicCode,
      preview: <Progress value={60} />,
      controls: progressControls,
      renderPreview: (props: any) => (
        <Progress
          value={parseInt(props.value as string)}
          variant={props.variant as any}
          indeterminate={props.indeterminate}
          showValue={props.showValue}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard progress bar with primary color.",
      code: `<Progress value={60} />`,
      preview: <Progress value={60} />,
    },
    {
      id: "success",
      name: "Success",
      description: "Green progress bar for successful states.",
      code: `<Progress variant="success" value={100} />`,
      preview: <Progress variant="success" value={100} />,
    },
  ],
};

export { progressControls };
export * from './examples/index.js';
