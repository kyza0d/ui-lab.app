import React from 'react';
import { Badge } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import { FaInfo } from 'react-icons/fa6';
import Example1, { metadata as metadata1 } from './examples/01-basic-badge.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-badge', Component: Example1, metadata: metadata1 },
];

const badgeControls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Success', value: 'success' },
      { label: 'Warning', value: 'warning' },
      { label: 'Danger', value: 'danger' },
      { label: 'Info', value: 'info' },
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
    name: 'dismissible',
    label: 'Dismissible',
    type: 'toggle',
    defaultValue: false,
  },
];

const badgeBasicCode = `import { Badge } from "ui-lab-components";

export function Example() {
  return <Badge>Default</Badge>;
}`;

export const badgeDetail: ComponentDetail = {
  id: 'badge',
  name: 'Badge',
  description: 'A versatile badge component for status and tag indicators',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        Badge components are compact elements used to display status indicators, tags, labels, and other small pieces of information. They support multiple variants for different semantic meanings, multiple sizes for different contexts, and optional icons and dismissal functionality.
      </p>
      <p>
        Use badges to highlight key information, indicate status changes, or tag content categories.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: badgeBasicCode,
      preview: <Badge>Default</Badge>,
      controls: badgeControls,
      renderPreview: (props: any) => (
        <Badge
          variant={props.variant as any}
          size={props.size as any}
          dismissible={props.dismissible}
        >
          Badge Text
        </Badge>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard gray badge for general use',
      code: `<Badge variant="default">Default</Badge>`,
      preview: <Badge variant="default">Default</Badge>,
    },
    {
      id: 'success',
      name: 'Success',
      description: 'Green badge for successful states',
      code: `<Badge variant="success">Success</Badge>`,
      preview: <Badge variant="success">Success</Badge>,
    },
  ],
};

export { badgeControls };
export * from './examples/index';
