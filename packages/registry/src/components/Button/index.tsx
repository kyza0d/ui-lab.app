import React from 'react';
import { Button } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-variants.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples';

// Define examplesData locally
const examplesData = [
  { id: '01-variants', Component: Example1, metadata: metadata1 },
];

const buttonControls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Danger', value: 'danger' },
    ],
    defaultValue: 'default',
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
export * from './examples/index';
