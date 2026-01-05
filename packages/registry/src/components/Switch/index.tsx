import React from 'react';
import { Switch } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-switch.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div className="flex items-center gap-3">
      <div style={{ paddingLeft: 1 }} className='w-10 h-6 flex items-center rounded-full border border-background-600 bg-background-700'>
        <div style={{ backgroundColor: "var(--background-500)" }} className='w-5 h-5 rounded-full' />
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-switch', Component: Example1, metadata: metadata1 },
];

const switchControls: ControlDef[] = [
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
    name: "selected",
    label: "Selected",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "isDisabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
];

const switchBasicCode = `import { Switch } from "ui-lab-components";

export function Example() {
  return <Switch />;
}`;

export const switchDetail: ComponentDetail = {
  id: "switch",
  name: "Switch",
  description:
    "A toggle switch component for binary on/off states. Perfect for settings, preferences, and feature toggles.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Switch component provides a clear, intuitive way to toggle between two states. It's ideal for settings, preferences, and feature flags where users need to enable or disable something.
      </p>
      <p>
        Switches support multiple sizes, controlled and uncontrolled modes, and disabled states. The smooth animation and clear visual feedback make it easy for users to understand the current state.
      </p>
    </div>
  ),
  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: switchBasicCode,
      preview: <Switch />,
      controls: switchControls,
      renderPreview: (props: any) => (
        <Switch
          size={props.size as any}
          isDisabled={props.isDisabled}
          defaultSelected={props.selected}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard switch in the off state.",
      code: switchBasicCode,
      preview: <Switch />,
    },
    {
      id: "selected",
      name: "Selected",
      description: "Switch in the on/checked state.",
      code: `<Switch defaultSelected={true} />`,
      preview: <Switch defaultSelected={true} />,
    },
  ],
};

export { switchControls };
export * from './examples';
