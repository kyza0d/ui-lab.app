import React from 'react';
import { Slider } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-slider.js';
import Example2, { metadata as metadata2 } from './examples/02-settings-panel.js';
import Example3, { metadata as metadata3 } from './examples/03-price-range.js';
import Example4, { metadata as metadata4 } from './examples/04-step-slider.js';
import Example5, { metadata as metadata5 } from './examples/05-disabled-state.js';
import Example6, { metadata as metadata6 } from './examples/06-vertical-mixer.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';

const examplesData = [
  { id: '01-basic-slider', Component: Example1, metadata: metadata1 },
  { id: '02-settings-panel', Component: Example2, metadata: metadata2 },
  { id: '03-price-range', Component: Example3, metadata: metadata3 },
  { id: '04-step-slider', Component: Example4, metadata: metadata4 },
  { id: '05-disabled-state', Component: Example5, metadata: metadata5 },
  { id: '06-vertical-mixer', Component: Example6, metadata: metadata6 },
];

const sliderControls: ControlDef[] = [
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
        Perfect for volume controls, brightness adjustment, price ranges, and other value selection scenarios.
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
export * from './examples/index.js';
