import React from 'react';
import { Button } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-button.js';
import Example2, { metadata as metadata2 } from './examples/02-secondary-button.js';
import Example3, { metadata as metadata3 } from './examples/03-outline-button.js';
import Example4, { metadata as metadata4 } from './examples/04-ghost-button.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: 80, height: 30 }} className="w-full flex bg-background-900 items-center justify-center border border-background-700 rounded-md">
      <div style={{ width: "70%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
    </div>
  );
}

// Define examplesData locally
const examplesData = [
  { id: '01-basic-button', Component: Example1, metadata: metadata1 },
  { id: '02-secondary-button', Component: Example2, metadata: metadata2 },
  { id: '03-outline-button', Component: Example3, metadata: metadata3 },
  { id: '04-ghost-button', Component: Example4, metadata: metadata4 },
];

const buttonControls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
    ],
    defaultValue: 'primary',
  },
  {
    name: 'size',
    label: 'Size',
    type: 'select',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'md',
  },
  {
    name: 'disabled',
    label: 'Disabled',
    type: 'toggle',
    defaultValue: false,
  },
  {
    name: 'easing',
    label: 'Interaction Ease',
    type: 'select',
    options: [],
    defaultValue: 'snappyPop',
  },
];

const buttonBasicCode = `import { Button } from "ui-lab-components";

export function Example() {
  return <Button>Click me</Button>;
}`;

export const buttonDetail: ComponentDetail = {
  id: 'button',
  name: 'Button',
  description: 'A versatile button component with multiple variants, sizes, and states. Perfect for user interactions and actions.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Button component is a fundamental building block for any user interface. It supports multiple variants for different use cases, multiple sizes for different contexts, and various states including disabled and loading states.
      </p>
      <p>
        Buttons use a clear visual hierarchy with the accent color for primary actions, ensuring users can easily identify the most important action on the page.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: buttonBasicCode,
      preview: <Button>Click me</Button>,
      controls: buttonControls,
      renderPreview: (props: any) => (
        <Button
          variant={props.variant as any}
          size={props.size as any}
          disabled={props.disabled}
        >
          Click me
        </Button>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { buttonControls };
export * from './examples';
