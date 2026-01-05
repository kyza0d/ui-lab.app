import React from 'react';
import { Checkbox } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-checkbox.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaCheck } from 'react-icons/fa6';

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center gap-3">
      <div style={{ backgroundColor: "var(--background-700)" }} className='w-5 h-5 flex items-center justify-center rounded-sm border border-background-600'>
        <FaCheck style={{ color: "var(--background-500)", width: 10, height: 10, margin: "-1px 1px 0 0" }} />
      </div>
      <div style={{ width: 80, backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-checkbox', Component: Example1, metadata: metadata1 },
];

const checkboxControls: ControlDef[] = [
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
    name: 'checked',
    label: 'Checked',
    type: 'toggle',
    defaultValue: false,
  },
  {
    name: 'disabled',
    label: 'Disabled',
    type: 'toggle',
    defaultValue: false,
  },
  {
    name: 'error',
    label: 'Error',
    type: 'toggle',
    defaultValue: false,
  },
  {
    name: 'label',
    label: 'Label Text',
    type: 'text',
    defaultValue: 'Accept terms',
  },
];

const checkboxBasicCode = `import { Checkbox } from "ui-lab-components";

export function Example() {
  return <Checkbox label="Accept terms and conditions" />;
}`;

export const checkboxDetail: ComponentDetail = {
  id: 'checkbox',
  name: 'Checkbox',
  description: 'A flexible checkbox component supporting single and grouped selections with multiple states including checked, unchecked, disabled, and error.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Checkbox component is a versatile form control for capturing boolean choices or selections. It supports individual checkboxes as well as checkbox groups for multiple selections.
      </p>
      <p>
        With built-in support for labels, helper text, and various visual states (checked, unchecked, disabled, and error), the Checkbox component handles all common use cases.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: checkboxBasicCode,
      preview: <Checkbox label="Accept terms and conditions" />,
      controls: checkboxControls,
      renderPreview: (props: any) => (
        <Checkbox
          size={props.size as any}
          checked={props.checked ?? false}
          onChange={(e) => props.handleControlChange('checked', e.target.checked)}
          disabled={props.disabled}
          label={props.label}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Default checkbox with label.',
      code: checkboxBasicCode,
      preview: <Checkbox label="Accept terms and conditions" />,
    },
    {
      id: 'checked',
      name: 'Checked',
      description: 'Checkbox in checked state.',
      code: `<Checkbox label="Checked checkbox" defaultChecked />`,
      preview: <Checkbox label="Checked checkbox" defaultChecked />,
    },
  ],
};

export { checkboxControls };
export * from './examples';
