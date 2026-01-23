import React from 'react';
import { ColorPicker } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-colorpicker.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "80%", maxWidth: "130px" }} className="rounded-sm flex flex-col gap-2 p-2">
      {/* Canvas area - outline with dot */}
      <div style={{ width: "100%", height: 50, borderRadius: "var(--radius-sm)" }} className="border-[1px] border-background-600 relative bg-background-900">
        <div style={{ width: 8, height: 8, backgroundColor: "var(--background-500)", opacity: 0.4, top: '30%', left: '60%', transform: 'translate(-50%, -50%)' }} className='rounded-full absolute'></div>
      </div>

      {/* Hue slider - outline */}
      <div style={{ width: "100%", height: 8, borderRadius: "var(--radius-sm)" }} className="border-[1px] border-background-600 bg-background-900 relative">
        <div style={{ width: 4, height: 12, backgroundColor: "var(--background-500)", borderRadius: "var(--radius-sm)", opacity: 0.4, left: '70%', top: '50%', transform: 'translate(-50%, -50%)' }} className='absolute'></div>
      </div>

      {/* Color input - follows Input pattern */}
      <div className='flex flex-col gap-1'>
        <div style={{ width: "100%", height: 24, borderRadius: "var(--radius-md)" }} className="bg-background-900 px-2 flex items-center border-[1px] border-background-700">
          <div style={{ backgroundColor: "var(--background-500)" }} className='flex-1 opacity-10 rounded-sm h-2 ml-2 mr-2'></div>
          <div style={{ backgroundColor: "var(--background-500)" }} className='w-px opacity-30 rounded-base h-3'></div>
        </div>
      </div>
    </div>
  );
}

// Define examplesData locally
const examplesData = [
  { id: '01-basic-colorpicker', Component: Example1, metadata: metadata1 },
];

const colorPickerControls: ControlDef[] = [
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

const colorPickerBasicCode = `import { ColorPicker } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [color, setColor] = useState("#FF6B6B");

  return <ColorPicker value={color} onChange={setColor} />;
}`;

export const colorPickerDetail: ComponentDetail = {
  id: 'colorpicker',
  name: 'ColorPicker',
  description: 'A custom color picker with 2D saturation/lightness canvas, hue slider, optional opacity slider, and color input with format selection.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The ColorPicker component provides a comprehensive color selection interface with multiple interaction methods:
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
      description: 'Customize the ColorPicker component',
      code: colorPickerBasicCode,
      preview: <ColorPicker defaultValue="#FF6B6B" />,
      controls: colorPickerControls,
      renderPreview: (props: any) => (
        <ColorPicker
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

export { colorPickerControls };
export * from './examples';
