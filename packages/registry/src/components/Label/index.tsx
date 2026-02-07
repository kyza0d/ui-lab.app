import React from 'react';
import { Label } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-label.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaEnvelope } from 'react-icons/fa6';

const examplesData = [
  { id: '01-basic-label', Component: Example1, metadata: metadata1 },
];


const labelControls: ControlDef[] = [
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
    name: "required",
    label: "Required",
    type: "toggle",
    defaultValue: false,
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
]

const labelBasicCode = `import { Label } from "ui-lab-components";

export function Example() {
  return <Label htmlFor="name">Name</Label>;
}`;

export const labelDetail: ComponentDetail = {
  id: "label",
  name: "Label",
  description: "Form field label component with required indicator, helper text, and error state styling for use with form inputs.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Label component is a semantic form label that works seamlessly with input components. It provides built-in support for required indicators, helper text, and error state styling to improve form clarity and accessibility.
      </p>
      <p>
        With support for multiple sizes and states, the Label component helps create consistent, accessible form layouts. Use it with inputs to establish proper label-input associations through the htmlFor attribute.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: labelBasicCode,
      preview: <Label htmlFor="name">Name</Label>,
      controls: labelControls,
      renderPreview: (props: any) => (
        <Label
          size={props.size as any}
          required={props.required}
          disabled={props.disabled}
          error={props.error}
        >
          {props.label || "Label"}
        </Label>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard label for form fields.",
      code: labelBasicCode,
      preview: <Label htmlFor="name">Name</Label>,
    },
    {
      id: "required",
      name: "Required",
      description: "Label with required indicator for mandatory fields.",
      code: `<Label required htmlFor="email">Email</Label>`,
      preview: <Label required htmlFor="email">Email</Label>,
    },
  ],
};

export { labelControls };
export * from './examples';
