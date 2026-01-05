import React from 'react';
import { Slider } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-slider.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "60%" }} className="relative rounded-md">
      <div className='w-full rounded-md bg-background-700 left-0 absolute h-2' />
      <div style={{ width: "50%", background: "var(--background-600)" }} className='left-0 absolute rounded-md h-2' />
      <div style={{ background: "var(--background-500)", top: -6, width: 17, height: 17 }} className='absolute -translate-x-1/2 left-1/2 rounded-full' />
    </div>
  );
}

const examplesData = [
  { id: '01-basic-slider', Component: Example1, metadata: metadata1 },
];

const sliderControls: ControlDef[] = [
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
];

const sliderBasicCode = `import { Slider } from "ui-lab-components";

export function Example() {
  return <Slider.Root min={0} max={100} defaultValue={[50]} />;
}`;

export const sliderDetail: ComponentDetail = {
  id: "slider",
  name: "Slider",
  description: "A customizable range input with minimal styling and no transitions",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Slider component provides a clean, minimal range input for selecting values within a specified range. It features custom styling that completely overrides native HTML range input appearance, offering a consistent look across all browsers.
      </p>
      <p>
        Perfect for volume controls, brightness adjustment, price ranges, and other value selection scenarios. Available in three sizes: small, medium, and large.
      </p>
    </div>
  ),
  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: sliderBasicCode,
      preview: <Slider.Root min={0} max={100} defaultValue={[50]} />,
      controls: sliderControls,
      renderPreview: (props: any) => (
        <Slider.Root
          min={0}
          max={100}
          defaultValue={[50]}
          size={props.size as any}
          disabled={props.disabled}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard slider for most use cases.",
      code: sliderBasicCode,
      preview: <Slider.Root min={0} max={100} defaultValue={[50]} />,
    },
    {
      id: "range",
      name: "Range Selection",
      description: "Multiple thumbs for selecting a range of values.",
      code: `<Slider.Root min={0} max={100} defaultValue={[30, 70]} />`,
      preview: <Slider.Root min={0} max={100} defaultValue={[30, 70]} />,
    },
  ],
};

export { sliderControls };
export * from './examples';
