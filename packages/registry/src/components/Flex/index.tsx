import React from 'react';
import { Flex } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1, controls as controls1, renderPreview as renderPreview1, previewLayout as previewLayout1, resizable as resizable1 } from './examples/01-axis-control.js';
import Example2, { metadata as metadata2, controls as controls2, renderPreview as renderPreview2, previewLayout as previewLayout2, resizable as resizable2 } from './examples/02-wrap-overflow.js';
import Example3, { metadata as metadata3, controls as controls3, renderPreview as renderPreview3, previewLayout as previewLayout3, resizable as resizable3 } from './examples/03-container-query-reflow.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';

// Define examplesData locally
const examplesData = [
  { id: '01-axis-control', Component: Example1, metadata: metadata1, controls: controls1, renderPreview: renderPreview1, previewLayout: previewLayout1, resizable: resizable1 },
  { id: '02-wrap-overflow', Component: Example2, metadata: metadata2, controls: controls2, renderPreview: renderPreview2, previewLayout: previewLayout2, resizable: resizable2 },
  { id: '03-container-query-reflow', Component: Example3, metadata: metadata3, controls: controls3, renderPreview: renderPreview3, previewLayout: previewLayout3, resizable: resizable3 },
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
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'End', value: 'end' },
      { label: 'Space Between', value: 'between' },
    ],
    defaultValue: 'start',
  },
  {
    name: 'align',
    label: 'Align Items',
    type: 'select',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'End', value: 'end' },
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
export * from './examples/index.js';
