import React from 'react';
import { Page } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import examplesJson from './examples.json' with { type: 'json' };

const pageControls: ControlDef[] = [
  {
    name: 'maxWidth',
    label: 'Max Width',
    type: 'select',
    options: [
      { label: '800px', value: '800px' },
      { label: '1024px', value: '1024px' },
      { label: '1200px', value: '1200px' },
      { label: '1400px', value: '1400px' },
      { label: 'Full Width', value: 'none' },
    ],
    defaultValue: '1400px',
  },
  {
    name: 'padding',
    label: 'Padding',
    type: 'select',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    defaultValue: 'md',
  },
  {
    name: 'centered',
    label: 'Centered',
    type: 'toggle',
    defaultValue: true,
  },
  {
    name: 'fullscreen',
    label: 'Fullscreen',
    type: 'toggle',
    defaultValue: false,
  },
];

const pageBasicCode = `import { Page } from "ui-lab-components";

export function Example() {
  return (
    <Page maxWidth="1400px" padding="md" centered>
      <div className="space-y-4">
        <h1>Page Title</h1>
        <p>Page content goes here</p>
      </div>
    </Page>
  );
}`;

export const pageDetail: ComponentDetail = {
  id: 'page',
  name: 'Page',
  description: 'A lightweight page container that provides page-level context, constraints, and semantic structure.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Page component serves as the top-level page wrapper. It provides max-width constraints,
        padding control, and page-level theming context. Perfect as the root wrapper for any page
        in your application.
      </p>
      <p>
        Supports mobile viewport detection and works seamlessly with Layout and Panel components
        for building responsive page structures.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the page container',
      code: pageBasicCode,
      preview: (
        <Page maxWidth="1400px" padding="md" centered>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Page Title</h1>
            <p className="text-foreground-300">Page content goes here</p>
          </div>
        </Page>
      ),
      controls: pageControls,
      renderPreview: (props: any) => (
        <Page
          maxWidth={props.maxWidth === 'none' ? undefined : props.maxWidth}
          padding={props.padding as any}
          centered={props.centered as boolean}
          fullscreen={props.fullscreen as boolean}
        >
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Page Title</h1>
            <p className="text-foreground-300">Page content goes here</p>
          </div>
        </Page>
      ),
    },
  ],
};

export { pageControls };
