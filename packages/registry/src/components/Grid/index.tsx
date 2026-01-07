import React from 'react';
import { Divider, Grid } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-grid';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: '60%' }}>
      <div className="w-full flex flex-col gap-2">
        {/* Row 1: Equal Columns */}
        <div className="flex gap-2">
          <div className="w-full h-10 border border-background-700 rounded bg-background-950" />
          <div className="w-16 h-10 border border-background-700 rounded bg-background-950" />
        </div>

        {/* Row 2: Asymmetrical Columns */}
        <div className="flex gap-2">
          <div className="w-12 h-10 border border-background-700 rounded bg-background-950" />
          <div className="w-full h-10 border border-background-700 rounded bg-background-950" />
        </div>
      </div>
    </div>
  );
}

const examplesData = [
  { id: '01-basic-grid', Component: Example1, metadata: metadata1 },
];

const gridControls: ControlDef[] = [
  {
    name: 'columns',
    label: 'Columns',
    type: 'select',
    options: [
      { label: '1 Column', value: '1' },
      { label: '2 Columns', value: '2' },
      { label: '3 Columns', value: '3' },
      { label: '4 Columns', value: '4' },
      { label: '5 Columns', value: '5' },
      { label: '6 Columns', value: '6' },
      { label: 'Auto Fit', value: 'auto-fit' },
      { label: 'Auto Fill', value: 'auto-fill' },
    ],
    defaultValue: '3',
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
    name: 'justifyItems',
    label: 'Justify Items',
    type: 'select',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'End', value: 'end' },
      { label: 'Stretch', value: 'stretch' },
    ],
    defaultValue: 'stretch',
  },
  {
    name: 'alignItems',
    label: 'Align Items',
    type: 'select',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'End', value: 'end' },
      { label: 'Stretch', value: 'stretch' },
      { label: 'Baseline', value: 'baseline' },
    ],
    defaultValue: 'stretch',
  },
  {
    name: 'autoFlow',
    label: 'Auto Flow',
    type: 'select',
    options: [
      { label: 'Row', value: 'row' },
      { label: 'Column', value: 'column' },
      { label: 'Row Dense', value: 'row-dense' },
      { label: 'Column Dense', value: 'column-dense' },
    ],
    defaultValue: 'row',
  },
];

const gridBasicCode = `import { Grid } from "ui-lab-components";

export function Example() {
  return (
    <Grid columns="3" gap="md">
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">1</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">2</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">3</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">4</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">5</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">6</div>
    </Grid>
  );
}`;

export const gridDetail: ComponentDetail = {
  id: 'grid',
  name: 'Grid',
  description: 'A powerful grid layout component for building responsive grid layouts. It abstracts standard CSS Grid properties and includes container-query based responsiveness.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Grid component provides a convenient way to apply CSS Grid layout patterns. Unlike standard CSS classes, this component enforces consistency via the design system's spacing scale and simplifies responsive behavior through container queries.
      </p>
      <p>
        Use the <strong>Interactive Preview</strong> below to adjust the wrapper size and see how the grid automatically responds to container width changes.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: gridBasicCode,
      previewLayout: 'center',
      renderPreview: (props: any) => {
        const GridCell = ({ children }: { children?: React.ReactNode }) => (
          <div className="bg-accent-500/10 border border-accent-500/10 rounded flex items-center justify-center text-accent-500 text-sm font-medium shadow-sm h-20">
            {children}
          </div>
        );
        return (
          <Grid
            columns={props.columns}
            gap={props.gap}
            justifyItems={props.justifyItems}
            alignItems={props.alignItems}
            autoFlow={props.autoFlow}
            className="w-full"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <GridCell key={i}>{i + 1}</GridCell>
            ))}
          </Grid>
        );
      },
      controls: gridControls,
      preview: null,
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard grid with 3 columns and medium gap.',
      code: gridBasicCode,
      preview: (
        <Grid columns="3" gap="md">
          <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">1</div>
          <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">2</div>
          <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">3</div>
          <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">4</div>
          <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">5</div>
          <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">6</div>
        </Grid>
      ),
    },
  ],
};

export { gridControls };
export * from './examples';
