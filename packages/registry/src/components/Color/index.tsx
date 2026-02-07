import React from 'react';
import { Color } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-color.js';
import Example2, { metadata as metadata2 } from './examples/02-opacity-slider.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

// Define examplesData locally
const examplesData = [
  { id: '01-basic-color', Component: Example1, metadata: metadata1 },
  { id: '02-opacity-slider', Component: Example2, metadata: metadata2 },
];

const colorControls: ControlDef[] = [
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
    name: 'showOpacity',
    label: 'Show Opacity',
    type: 'toggle',
    defaultValue: false,
  },
  {
    name: 'format',
    label: 'Format',
    type: 'select',
    options: [
      { label: 'Hex', value: 'hex' },
      { label: 'RGB', value: 'rgb' },
    ],
    defaultValue: 'hex',
  },
  {
    name: 'disabled',
    label: 'Disabled',
    type: 'toggle',
    defaultValue: false,
  },
];

const colorBasicCode = `import { Color } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [color, setColor] = useState("#FF6B6B");

  return <Color value={color} onChange={setColor} />;
}`;

export const colorDetail: ComponentDetail = {
  id: 'color',
  name: 'Color',
  description: 'A custom color component with 2D saturation/lightness canvas, hue slider, optional opacity slider, and color input with format selection.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Color component provides a comprehensive color selection interface with multiple interaction methods:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>2D canvas for saturation and lightness adjustment</li>
        <li>Horizontal hue slider for hue selection (0-360°)</li>
        <li>Optional opacity slider for alpha channel control</li>
        <li>Recent colors display for quick access</li>
        <li>Manual color input with hex and RGB format support</li>
        <li>Color format switching between Hex and RGB</li>
      </ul>
      <p>
        The component supports both controlled and uncontrolled modes, making it flexible for different use cases. Colors are automatically saved to recent colors for quick reuse.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Customize the Color component',
      code: colorBasicCode,
      preview: <Color defaultValue="#FF6B6B" />,
      controls: colorControls,
      renderPreview: (props: any) => (
        <Color
          defaultValue="#FF6B6B"
          size={props.size as 'sm' | 'md' | 'lg'}
          showOpacity={props.showOpacity}
          format={props.format as 'hex' | 'rgb'}
          disabled={props.disabled}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { colorControls };
export * from './examples';
