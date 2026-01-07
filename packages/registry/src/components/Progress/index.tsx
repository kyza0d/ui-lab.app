import React from 'react';
import { Progress } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-progress';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "70%" }} className="relative rounded-md">
      <div className='w-full bg-background-700 rounded-md border border-background-600 left-0 absolute h-3' />
      <div style={{ width: "50%", background: "var(--background-600)" }} className='left-0 absolute rounded-md h-3' />
    </div>
  );
}

const examplesData = [
  { id: '01-basic-progress', Component: Example1, metadata: metadata1 },
];


const progressControls: ControlDef[] = [
  {
    name: "size",
    label: "Size",
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    defaultValue: "md",
  },
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
    "A horizontal progress bar with configurable value, variants, and sizes. Supports determinate and indeterminate states.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Progress component displays a horizontal bar that fills based on a percentage value. It's ideal for showing loading states, upload progress, completion status, and other metrics.
      </p>
      <p>
        Progress bars support multiple sizes, semantic color variants, and an indeterminate mode for unknown durations. Labels and percentage values can be displayed for additional context.
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
          size={props.size as any}
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
export * from './examples';
