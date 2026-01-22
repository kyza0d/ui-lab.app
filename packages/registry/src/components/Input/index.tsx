import React from 'react';
import { Input } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-input.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div className='flex flex-col'>
      <div style={{ width: "50%", backgroundColor: "var(--background-500)" }} className='opacity-10 ml-2 mb-2 rounded-sm h-2'></div>
      <div style={{ width: 140, height: 30, borderRadius: "var(--radius-md)" }} className="w-full flex bg-background-900 pl-2 pr-4 items-center border border-background-700">
        <div style={{ width: "80%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-base h-2'></div>
        <div style={{ backgroundColor: "var(--background-500)" }} className='w-px opacity-30 rounded-base h-4 ml-2'></div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-input', Component: Example1, metadata: metadata1 },
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
  description: "A flexible text input component with multiple variants, sizes, and icon support for capturing user input.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Input component is an essential form control for capturing user data. It supports multiple input types (text, email, password, number) and provides various states including disabled and error states.
      </p>
      <p>
        With built-in support for prefix and suffix icons, you can enhance the visual feedback and provide contextual information to users. The component is responsive and adapts to different sizes and states.
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
          size={props.size as any}
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
export * from './examples';
