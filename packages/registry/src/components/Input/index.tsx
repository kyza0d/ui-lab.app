import React from 'react';
import { Input } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-input.js';
import Example2, { metadata as metadata2 } from './examples/02-validation.js';
import Example3, { metadata as metadata3 } from './examples/03-sign-in.js';
import Example4, { metadata as metadata4 } from './examples/04-search.js';
import Example5, { metadata as metadata5 } from './examples/05-user-handle.js';
import Example6, { metadata as metadata6 } from './examples/06-api-key.js';
import Example7, { metadata as metadata7 } from './examples/07-url-validation.js';
import Example8, { metadata as metadata8 } from './examples/08-quantity.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';

const examplesData = [
  { id: '01-basic-input', Component: Example1, metadata: metadata1 },
  { id: '02-validation', Component: Example2, metadata: metadata2 },
  { id: '03-sign-in', Component: Example3, metadata: metadata3 },
  { id: '04-search', Component: Example4, metadata: metadata4 },
  { id: '05-user-handle', Component: Example5, metadata: metadata5 },
  { id: '06-api-key', Component: Example6, metadata: metadata6 },
  { id: '07-url-validation', Component: Example7, metadata: metadata7 },
  { id: '08-quantity', Component: Example8, metadata: metadata8 },
];


const inputControls: ControlDef[] = [
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { label: "Text", value: "text" },
      { label: "Email", value: "email" },
      { label: "Password", value: "password" },
      { label: "Number", value: "number" },
    ],
    defaultValue: "text",
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
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    defaultValue: "Enter text...",
  },
]

const inputBasicCode = `import { Input } from "ui-lab-components";

export function Example() {
  return <Input placeholder="Enter your name..." />;
}`;

export const inputDetail: ComponentDetail = {
  id: "input",
  name: "Input",
  description: "A flexible text input component with multiple variants and icon support for capturing user input.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Input component is an essential form control for capturing user data. It supports multiple input types (text, email, password, number) and provides various states including disabled and error states.
      </p>
      <p>
        With built-in support for prefix and suffix icons, you can enhance the visual feedback and provide contextual information to users.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: inputBasicCode,
      preview: <Input placeholder="Enter your name..." />,
      controls: inputControls,
      renderPreview: (props: any) => (
        <Input
          type={props.type}
          placeholder={props.placeholder}
          disabled={props.disabled}
          error={props.error}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],

  variants: [
    {
      id: "text",
      name: "Text",
      description: "Standard text input for general text entry.",
      code: inputBasicCode,
      preview: <Input type="text" placeholder="Enter text..." />,
    },
    {
      id: "password",
      name: "Password",
      description: "Password input for secure text entry.",
      code: `<Input type="password" placeholder="Enter password..." />`,
      preview: <Input type="password" placeholder="Enter password..." />,
    },
  ],
};

export { inputControls };
export * from './examples/index.js';
