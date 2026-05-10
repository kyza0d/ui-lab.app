"use client";

import React from 'react'
import { Grid, Frame } from 'ui-lab-components'
import type { ControlDef } from '@/types'

type GridColumnsValue = '2' | '3' | '4' | 'auto-fit' | 'auto-fill';
type GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const BASE_CELL_STYLE = {
  '--frame-fill': 'var(--background-900)',
  '--frame-stroke-color': 'var(--background-600)',
} as React.CSSProperties;

export const metadata = {
  title: 'Responsive Card Rail',
  description: 'Grid that adapts column count and gap based on container width using responsive prop objects.',
};

export const controls: ControlDef[] = [
  {
    name: 'columns',
    label: 'Columns',
    type: 'select',
    options: [
      { label: '2 Columns', value: '2' },
      { label: '3 Columns', value: '3' },
      { label: '4 Columns', value: '4' },
      { label: 'Auto Fit', value: 'auto-fit' },
      { label: 'Auto Fill', value: 'auto-fill' },
    ],
    defaultValue: '4',
  },
  {
    name: 'gap',
    label: 'Base Gap Token',
    type: 'select',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    defaultValue: 'md',
  },
  {
    name: 'rowGap',
    label: 'Row Gap',
    type: 'select',
    options: [
      { label: 'Match Gap', value: 'inherit' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'inherit',
  },
  {
    name: 'columnGap',
    label: 'Column Gap',
    type: 'select',
    options: [
      { label: 'Match Gap', value: 'inherit' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'inherit',
  },
  {
    name: 'frameCount',
    label: 'Cards',
    type: 'stepper',
    defaultValue: 6,
    min: 4,
    max: 10,
    step: 1,
  },
  {
    name: 'responsive',
    label: 'Enable Responsive Object',
    type: 'toggle',
    defaultValue: true,
  },
];

export const previewLayout = 'start' as const;
export const resizable = true;

function getColumns(value: unknown): GridColumnsValue {
  if (value === '2' || value === '3' || value === 'auto-fit' || value === 'auto-fill') return value;
  return '4';
}

function toColumns(value: GridColumnsValue): number | 'auto-fit' | 'auto-fill' {
  if (value === 'auto-fit' || value === 'auto-fill') return value;
  return Number(value);
}

function getGap(value: unknown): GridGap {
  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;
  return 'md';
}

function getOptionalGap(value: unknown): GridGap | undefined {
  if (value === 'inherit' || value == null) return undefined;
  return getGap(value);
}

function getFrameCount(value: unknown, min: number, max: number, fallback: number) {
  const n = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

const SPEC_PATTERN = [
  { minHeight: '9rem' },
  { minHeight: '4rem' },
  { minHeight: '3rem' },
  { minHeight: '5rem' },
  { minHeight: '3.5rem' },
  { minHeight: '6rem' },
];

export function renderPreview(props: Record<string, unknown>) {
  const columns = getColumns(props.columns);
  const baseColumns = toColumns(columns);
  const gap = getGap(props.gap);
  const responsive = Boolean(props.responsive);
  const frameCount = getFrameCount(props.frameCount, 4, 10, 6);
  const specs = Array.from({ length: frameCount }, (_, i) => SPEC_PATTERN[i % SPEC_PATTERN.length]);

  return (
    <Grid
      columns={responsive ? { sm: 1, md: 2, lg: baseColumns } : baseColumns}
      gap={responsive ? { sm: 'sm', md: gap, lg: gap } : gap}
      rowGap={getOptionalGap(props.rowGap)}
      columnGap={getOptionalGap(props.columnGap)}
      responsive={responsive}
      className="w-full"
    >
      {specs.map((spec, index) => (
        <Frame key={index} pathStroke="dashed" style={{ ...BASE_CELL_STYLE, width: '100%', minHeight: spec.minHeight } as React.CSSProperties} className="w-full h-full">
          <div className="size-full" />
        </Frame>
      ))}
    </Grid>
  );
}

export default function Example() {
  return renderPreview({ columns: '4', gap: 'md', rowGap: 'inherit', columnGap: 'inherit', frameCount: 6, responsive: true });
}
