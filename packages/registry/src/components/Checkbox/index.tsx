import React from 'react';
import { Checkbox } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';

const checkboxControls: ControlDef[] = [
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
          checked={props.checked ?? false}
          onChange={(e) => props.handleControlChange('checked', e.target.checked)}
          disabled={props.disabled}
          label={props.label}
        />
      ),
    },
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
