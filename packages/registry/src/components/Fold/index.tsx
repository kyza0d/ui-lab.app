import React from 'react';
import { Fold } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-fold.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaChevronDown } from 'react-icons/fa6';

// Define examplesData locally
const examplesData = [
  { id: '01-basic-fold', Component: Example1, metadata: metadata1 },
];

const foldControls: ControlDef[] = [
  {
    name: 'expanded',
    label: 'Default Expanded',
    type: 'toggle',
    defaultValue: false,
  },
];

const basicFoldCode = `import { Fold } from "ui-lab-components";

export function Example() {
  return (
    <Fold title="What is a Fold component?">
      <p>
        A Fold component is a disclosure widget that expands and collapses content.
      </p>
    </Fold>
  );
}`;

export const foldDetail: ComponentDetail = {
  id: 'fold',
  name: 'Fold',
  description: 'A disclosure component that expands and collapses content sections with full keyboard support and ARIA compliance.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Fold component provides a lightweight, accessible way to organize
        collapsible content. Built with React Aria, it supports keyboard
        navigation, proper ARIA roles and attributes, and smooth animations.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: basicFoldCode,
      preview: (
        <Fold title="What is a Fold component?">
          <p className="text-foreground-300">
            A Fold component is a disclosure widget that expands and collapses content.
          </p>
        </Fold>
      ),
      controls: foldControls,
      renderPreview: (props: any) => (
        <Fold title="What is a Fold component?" defaultExpanded={props.expanded}>
          <p className="text-foreground-300">
            A Fold component is a disclosure widget that expands and collapses content.
            It's built with React Aria for full accessibility support.
          </p>
        </Fold>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard fold component in collapsed state.',
      code: basicFoldCode,
      preview: (
        <Fold title="What is a Fold component?">
          <p className="text-foreground-300">Content goes here</p>
        </Fold>
      ),
    },
    {
      id: 'expanded',
      name: 'Expanded',
      description: 'Fold component in expanded state showing content.',
      code: `<Fold title="Title" defaultExpanded>
  <p>Content goes here</p>
</Fold>`,
      preview: (
        <Fold title="Expanded Fold" defaultExpanded>
          <p className="text-foreground-300">Content is visible by default</p>
        </Fold>
      ),
    },
  ],
};

export { foldControls };
export * from './examples';
