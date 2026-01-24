import React from 'react';
import { Radio } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-radio';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center gap-3">
      <div style={{ backgroundColor: "var(--background-700)" }} className='w-5 h-5 flex items-center justify-center rounded-full border border-background-600'>
        <div style={{ background: "var(--background-500)", width: 8, height: 8, margin: "0px 1px 0 0" }} className='rounded-full' />
      </div>
      <div style={{ width: 80, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
    </div >
  );
}

const examplesData = [
  { id: '01-basic-radio', Component: Example1, metadata: metadata1 },
];


const radioControls: ControlDef[] = [
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
    name: "disabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "error",
    label: "Error",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "label",
    label: "Label Text",
    type: "text",
    defaultValue: "Option 1",
  },
  {
    name: "easing",
    label: "Interaction Ease",
    type: "select",
    options: [],
    defaultValue: "snappyPop",
  },
]

const radioBasicCode = `import { Radio } from "ui-lab-components";

export function Example() {
  return <Radio label="Option 1" />;
}`;

export const radioDetail: ComponentDetail = {
  id: "radio",
  name: "Radio",
  description: "A radio button group component for mutually exclusive selections with support for grouping, disabled state, and descriptions.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Radio component is a form control for capturing a single choice from a set of mutually exclusive options. Radio buttons are ideal when users need to select one option from a group.
      </p>
      <p>
        The component supports labels, descriptions, helper text, and various visual states including checked, unchecked, disabled, and error states. Use the compound component pattern with <code className="text-accent-500 bg-background-900 px-1.5 py-0.5 rounded text-xs">Radio.Group</code> and <code className="text-accent-500 bg-background-900 px-1.5 py-0.5 rounded text-xs">Radio.Item</code> for automatic group management, or use individual <code className="text-accent-500 bg-background-900 px-1.5 py-0.5 rounded text-xs">Radio</code> components for standalone use.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: radioBasicCode,
      preview: <Radio label="Option 1" />,
      controls: radioControls,
      renderPreview: (props: any) => (
        <Radio
          size={props.size as any}
          disabled={props.disabled}
          error={props.error}
          label={props.label}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Radio button with label.",
      code: `<Radio label="Option 1" />`,
      preview: <Radio label="Option 1" />,
    },
    {
      id: "disabled",
      name: "Disabled",
      description: "Disabled radio button preventing interaction.",
      code: `<Radio label="Disabled radio" disabled />`,
      preview: <Radio label="Disabled radio" disabled />,
    },
  ],
};

export { radioControls };
export * from './examples';
