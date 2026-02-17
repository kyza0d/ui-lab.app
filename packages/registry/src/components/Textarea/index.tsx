import React from 'react';
import { TextArea } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-textarea.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples';

// Define examplesData locally
const examplesData = [
  { id: '01-basic-textarea', Component: Example1, metadata: metadata1 },
];

const textareaControls: ControlDef[] = [
  {
    name: 'rows',
    label: 'Rows',
    type: 'text',
    defaultValue: '4',
  },
  {
    name: 'placeholder',
    label: 'Placeholder',
    type: 'text',
    defaultValue: 'Enter your text here...',
  },
  {
    name: 'disabled',
    label: 'Disabled',
    type: 'toggle',
    defaultValue: false,
  },
];

const textareaBasicCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return (
    <TextArea
      placeholder="Enter your text here..."
      rows={4}
    />
  );
}`;

export const textareaDetail: ComponentDetail = {
  id: 'textarea',
  name: 'TextArea',
  description: 'A multi-line text input component for collecting longer text input from users.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The TextArea component provides a multi-line text input field, perfect for collecting longer text input such as comments, descriptions, or messages. It's more flexible than a single-line input and can be sized to fit your layout needs.
      </p>
      <p>
        TextArea supports customizable row heights, placeholder text, and disabled states, making it suitable for various form scenarios.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: textareaBasicCode,
      preview: <TextArea placeholder="Enter your text here..." rows={4} />,
      controls: textareaControls,
      renderPreview: (props: any) => (
        <TextArea
          placeholder={props.placeholder}
          rows={props.rows}
          disabled={props.disabled}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { textareaControls };
export * from './examples/index';
