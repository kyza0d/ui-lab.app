import React from 'react';
import { Divider, Frame, Grid } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example2, { metadata as metadata2, controls as controls2, renderPreview as renderPreview2, previewLayout as previewLayout2, resizable as resizable2 } from './examples/02-track-placement.js';
import Example3, { metadata as metadata3, controls as controls3, renderPreview as renderPreview3, previewLayout as previewLayout3, resizable as resizable3 } from './examples/03-editorial-spans.js';
import Example4, { metadata as metadata4, controls as controls4, renderPreview as renderPreview4, previewLayout as previewLayout4, resizable as resizable4 } from './examples/04-responsive-card-rail.js';
import examplesJson from './examples.json' with { type: 'json' };
import { loadComponentExamples } from '../../utils/load-component-examples.js';

const examplesData = [
  { id: '02-track-placement', Component: Example2, metadata: metadata2, controls: controls2, renderPreview: renderPreview2, previewLayout: previewLayout2, resizable: resizable2 },
  { id: '03-editorial-spans', Component: Example3, metadata: metadata3, controls: controls3, renderPreview: renderPreview3, previewLayout: previewLayout3, resizable: resizable3 },
  { id: '04-responsive-card-rail', Component: Example4, metadata: metadata4, controls: controls4, renderPreview: renderPreview4, previewLayout: previewLayout4, resizable: resizable4 },
];

const BASE_FRAME_STYLE = {
  '--frame-fill': 'var(--background-900)',
  '--frame-stroke-color': 'var(--background-600)',
} as React.CSSProperties;

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

const gridBasicCode = `import { Grid, Frame } from "ui-lab-components";

export function Example() {
  return (
    <Grid columns={3} gap="md">
      <Frame pathStroke="dashed" style={{ width: "100%", minHeight: "9rem", gridRow: "span 2" }} />
      <Frame pathStroke="dashed" style={{ width: "100%", minHeight: "5rem", gridColumn: "span 2" }} />
      <Frame pathStroke="dashed" style={{ width: "100%", minHeight: "3rem" }} />
      <Frame pathStroke="dashed" style={{ width: "100%", minHeight: "3rem" }} />
      <Frame pathStroke="dashed" style={{ width: "100%", minHeight: "6rem", gridColumn: "span 2" }} />
      <Frame pathStroke="dashed" style={{ width: "100%", minHeight: "4rem" }} />
    </Grid>
  );
}`;

function GridFrame({ style }: { style: React.CSSProperties }) {
  return (
    <Frame pathStroke="dashed" style={{ ...BASE_FRAME_STYLE, ...style }} className="w-full h-full">
      <div className="size-full" />
    </Frame>
  );
}

function getPreviewSpecs(columns: number | 'auto-fit' | 'auto-fill') {
  const trackCount = typeof columns === 'number' ? columns : 4;
  if (trackCount <= 2) {
    return [
      { width: '100%', minHeight: '4rem' },
      { width: '100%', minHeight: '8rem' },
      { width: '100%', minHeight: '3rem' },
      { width: '100%', minHeight: '5rem' },
      { width: '100%', minHeight: '4rem' },
      { width: '100%', minHeight: '3rem' },
    ] as React.CSSProperties[];
  }

  return [
    { width: '100%', minHeight: '9rem', gridRow: 'span 2' },
    { width: '100%', minHeight: '5rem', gridColumn: `span ${Math.max(1, trackCount - 1)}` },
    { width: '100%', minHeight: '3rem' },
    { width: '100%', minHeight: '3rem' },
    { width: '100%', minHeight: '6rem', gridColumn: `span ${Math.min(2, trackCount)}` },
    { width: '100%', minHeight: '4rem' },
  ] as React.CSSProperties[];
}

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
      previewLayout: 'start',
      renderPreview: (props: any) => {
        const columns = props.columns === 'auto-fit' || props.columns === 'auto-fill' ? props.columns : Number(props.columns ?? 3);
        const specs = getPreviewSpecs(columns);

        return (
          <Grid
            columns={columns}
            gap={props.gap}
            justifyItems={props.justifyItems}
            alignItems={props.alignItems}
            autoFlow={props.autoFlow}
            className="w-full"
          >
            {specs.map((style, index) => (
              <GridFrame key={index} style={style} />
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
        <Grid columns={3} gap="md">
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
export * from './examples/index.js';
