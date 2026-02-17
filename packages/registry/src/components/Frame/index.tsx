import React from 'react';
import { Frame } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-default-frame.js';
import Example2, { metadata as metadata2 } from './examples/02-tooltip-example.js';
import Example3, { metadata as metadata3 } from './examples/03-sidebar-tab.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-default-frame', Component: Example1, metadata: metadata1 },
  { id: '02-tooltip-example', Component: Example2, metadata: metadata2 },
  { id: '03-sidebar-tab', Component: Example3, metadata: metadata3 },
];

const frameControls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Accent', value: 'accent' },
    ],
    defaultValue: 'default',
  },
  {
    name: 'padding',
    label: 'Padding',
    type: 'select',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ],
    defaultValue: 'medium',
  },
];

const frameBasicCode = `import { Frame } from "ui-lab-components";

export function Example() {
  return (
    <Frame variant="default" padding="medium">
      <p className="text-foreground-300">Framed content</p>
    </Frame>
  );
}`;

export const frameDetail: ComponentDetail = {
  id: 'frame',
  name: 'Frame',
  description: 'A decorative border/frame component with advanced SVG path support for custom shapes.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Frame component provides a sophisticated way to wrap content with decorative borders and custom shapes.
        Using SVG masking and path definitions, it supports complex visual designs including notched frames,
        curved edges, and custom connection points.
      </p>
      <p>
        Perfect for highlighting featured content, creating visual hierarchy, or building unique UI elements
        like tabbed containers with custom tab shapes. Fully responsive with variant and padding options.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: frameBasicCode,
      preview: (
        <Frame variant="default" padding="medium">
          <p className="text-sm text-foreground-300">Framed content</p>
        </Frame>
      ),
      controls: frameControls,
      renderPreview: (props: any) => (
        <Frame variant={props.variant as any} padding={props.padding as any}>
          <p className="text-sm text-foreground-300">Framed content</p>
        </Frame>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { frameControls };
export * from './examples/index';
