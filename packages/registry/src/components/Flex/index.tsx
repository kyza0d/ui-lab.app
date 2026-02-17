import React from 'react';
import { Flex } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-flex.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples';

// Define examplesData locally
const examplesData = [
  { id: '01-basic-flex', Component: Example1, metadata: metadata1 },
];

const flexControls: ControlDef[] = [
  {
    name: 'direction',
    label: 'Direction',
    type: 'select',
    options: [
      { label: 'Row', value: 'row' },
      { label: 'Column', value: 'column' },
    ],
    defaultValue: 'row',
  },
  {
    name: 'gap',
    label: 'Gap',
    type: 'select',
    options: [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    defaultValue: 'md',
  },
  {
    name: 'justify',
    label: 'Justify Content',
    type: 'select',
    options: [
      { label: 'Flex Start', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Flex End', value: 'flex-end' },
      { label: 'Space Between', value: 'space-between' },
    ],
    defaultValue: 'flex-start',
  },
  {
    name: 'align',
    label: 'Align Items',
    type: 'select',
    options: [
      { label: 'Flex Start', value: 'flex-start' },
      { label: 'Center', value: 'center' },
      { label: 'Flex End', value: 'flex-end' },
      { label: 'Stretch', value: 'stretch' },
    ],
    defaultValue: 'stretch',
  },
];

const flexBasicCode = `import { Flex } from "ui-lab-components";

export function Example() {
  return (
    <Flex gap="md">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  );
}`;

export const flexDetail: ComponentDetail = {
  id: 'flex',
  name: 'Flex',
  description: 'A flexible layout component for building responsive layouts with CSS Flexbox.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Flex component provides a convenient way to apply flexbox layout patterns. It enforces
        consistency via the design system's spacing scale and simplifies responsive behavior.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: flexBasicCode,
      preview: (
        <Flex gap="md">
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">1</div>
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">2</div>
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">3</div>
        </Flex>
      ),
      controls: flexControls,
      renderPreview: (props: any) => {
        const Box = ({ children }: { children: React.ReactNode }) => (
          <div className="bg-background-800 border border-background-700 rounded flex items-center justify-center text-foreground-200 text-sm font-medium h-16 w-20">
            {children}
          </div>
        );
        return (
          <Flex
            direction={props.direction as any}
            gap={props.gap as any}
            justify={props.justify as any}
            align={props.align as any}
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        );
      },
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'row',
      name: 'Row',
      description: 'Default flex direction in a row.',
      code: `<Flex direction="row" gap="md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>`,
      preview: (
        <Flex direction="row" gap="md">
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">1</div>
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">2</div>
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">3</div>
        </Flex>
      ),
    },
    {
      id: 'column',
      name: 'Column',
      description: 'Flex direction in a column.',
      code: `<Flex direction="column" gap="md">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>`,
      preview: (
        <Flex direction="column" gap="md">
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">1</div>
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">2</div>
          <div className="h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center">3</div>
        </Flex>
      ),
    },
  ],
};

export { flexControls };
export * from './examples/index';
