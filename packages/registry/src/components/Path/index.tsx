import React from 'react';
import { Path, PathItem } from 'ui-lab-components';
import { ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-path.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';

const examplesData = [
  { id: '01-basic-path', Component: Example1, metadata: metadata1 },
];

const pathBasicCode = `import { Path, PathItem } from "ui-lab-components";

export function Example() {
  return (
    <Path>
      <PathItem href="/">Home</PathItem>
      <PathItem href="/products">Products</PathItem>
      <PathItem>Electronics</PathItem>
    </Path>
  );
}`;

export const pathDetail: ComponentDetail = {
  id: 'path',
  name: 'Path',
  description: 'A navigation component that displays the current page location in a site hierarchy.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Path component helps users understand their location within a website's hierarchy and provides quick navigation to parent pages. It displays a trail of links separated by visual dividers.
      </p>
      <p>
        Built with accessibility in mind, including proper ARIA attributes. The current page is automatically marked as the active step.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: pathBasicCode,
      preview: (
        <Path>
          <PathItem href="/">Home</PathItem>
          <PathItem href="/products">Products</PathItem>
          <PathItem>Electronics</PathItem>
        </Path>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard path navigation with links',
      code: pathBasicCode,
      preview: (
        <Path>
          <PathItem href="/">Home</PathItem>
          <PathItem href="/products">Products</PathItem>
          <PathItem>Electronics</PathItem>
        </Path>
      ),
    },
  ],
};

export * from './examples/index.js';
