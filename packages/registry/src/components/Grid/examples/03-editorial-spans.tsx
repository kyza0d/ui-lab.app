"use client";

import React from 'react'
import { Grid, Frame } from 'ui-lab-components'
import type { GridProps } from 'ui-lab-components'
import type { ControlDef } from '@/types'

type GridColumnsValue = '1' | '2' | '3' | '4' | '5' | '6' | 'auto-fit' | 'auto-fill';
type GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const BASE_CELL_STYLE = {
  '--frame-fill': 'var(--background-900)',
  '--frame-stroke-color': 'var(--background-600)',
} as React.CSSProperties;

export const metadata = {
  title: 'Editorial Spans',
  description: 'Dense auto-flow grid with mixed column spans for editorial content layouts.',
};

export const controls: ControlDef[] = [
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
    defaultValue: '4',
  },
  {
    name: 'gap',
    label: 'Gap Token',
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
    label: 'Inline Alignment',
    type: 'select',
    options: [
      { label: 'Stretch', value: 'stretch' },
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'End', value: 'end' },
    ],
    defaultValue: 'stretch',
  },
  {
    name: 'alignItems',
    label: 'Block Alignment',
    type: 'select',
    options: [
      { label: 'Stretch', value: 'stretch' },
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'End', value: 'end' },
      { label: 'Baseline', value: 'baseline' },
    ],
    defaultValue: 'stretch',
  },
  {
    name: 'autoFlow',
    label: 'Auto Placement',
    type: 'select',
    options: [
      { label: 'Row', value: 'row' },
      { label: 'Column', value: 'column' },
      { label: 'Row Dense', value: 'row-dense' },
      { label: 'Column Dense', value: 'column-dense' },
    ],
    defaultValue: 'row-dense',
  },
  {
    name: 'frameCount',
    label: 'Panels',
    type: 'stepper',
    defaultValue: 7,
    min: 5,
    max: 12,
    step: 1,
  },
];

export const previewLayout = 'start' as const;
export const resizable = true;

function getColumns(value: unknown): GridColumnsValue {
  if (value === '1' || value === '2' || value === '4' || value === '5' || value === '6' || value === 'auto-fit' || value === 'auto-fill') return value;
  return '3';
}

function toColumns(value: GridColumnsValue): number | 'auto-fit' | 'auto-fill' {
  if (value === 'auto-fit' || value === 'auto-fill') return value;
  return Number(value);
}

function getApproxColumnCount(value: GridColumnsValue) {
  if (value === 'auto-fit' || value === 'auto-fill') return 4;
  return Number(value);
}

function getGap(value: unknown): GridGap {
  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;
  return 'md';
}

function getJustifyItems(value: unknown): NonNullable<GridProps['justifyItems']> {
  if (value === 'start' || value === 'center' || value === 'end') return value;
  return 'stretch';
}

function getAlignItems(value: unknown): NonNullable<GridProps['alignItems']> {
  if (value === 'start' || value === 'center' || value === 'end' || value === 'baseline') return value;
  return 'stretch';
}

function getAutoFlow(value: unknown): NonNullable<GridProps['autoFlow']> {
  if (value === 'column' || value === 'row-dense' || value === 'column-dense') return value;
  return 'row';
}

function getFrameCount(value: unknown, min: number, max: number, fallback: number) {
  const n = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function span(trackCount: number, desired: number) {
  return `span ${Math.max(1, Math.min(desired, trackCount))}`;
}

function getSpecs(trackCount: number, frameCount: number) {
  if (trackCount <= 2) {
    const pattern = [{ minHeight: '4rem' }, { minHeight: '5.5rem' }, { minHeight: '3rem' }];
    return [
      { style: { width: '100%', minHeight: '8rem' } as React.CSSProperties },
      ...Array.from({ length: Math.max(frameCount - 1, 0) }, (_, i) => ({ style: { width: '100%', ...pattern[i % pattern.length] } as React.CSSProperties })),
    ];
  }
  const pattern = [
    { width: '100%', minHeight: '3rem' },
    { width: '100%', minHeight: '6.5rem', gridColumn: span(trackCount, 2) },
    { width: '100%', minHeight: '4rem' },
    { width: '100%', minHeight: '3rem' },
  ];
  return [
    { style: { width: '100%', minHeight: '8rem', gridColumn: span(trackCount, Math.max(trackCount - 1, 2)) } as React.CSSProperties },
    { style: { width: '100%', minHeight: '8rem' } as React.CSSProperties },
    { style: { width: '100%', minHeight: '3rem' } as React.CSSProperties },
    { style: { width: '100%', minHeight: '5rem', gridColumn: span(trackCount, 2) } as React.CSSProperties },
    { style: { width: '100%', minHeight: '5rem' } as React.CSSProperties },
    ...Array.from({ length: Math.max(frameCount - 5, 0) }, (_, i) => ({ style: pattern[i % pattern.length] as React.CSSProperties })),
  ];
}

export function renderPreview(props: Record<string, unknown>) {
  const columns = getColumns(props.columns);
  const frameCount = getFrameCount(props.frameCount, 5, 12, 7);
  const specs = getSpecs(getApproxColumnCount(columns), frameCount);

  return (
    <Grid
      columns={toColumns(columns)}
      gap={getGap(props.gap)}
      justifyItems={getJustifyItems(props.justifyItems)}
      alignItems={getAlignItems(props.alignItems)}
      autoFlow={getAutoFlow(props.autoFlow)}
      className="w-full"
    >
      {specs.map((spec, index) => (
        <Frame key={index} pathStroke="dashed" style={{ ...BASE_CELL_STYLE, ...spec.style }} className="w-full h-full">
          <div className="size-full" />
        </Frame>
      ))}
    </Grid>
  );
}

export default function Example() {
  return renderPreview({ columns: '4', gap: 'md', justifyItems: 'stretch', alignItems: 'stretch', autoFlow: 'row-dense', frameCount: 7 });
}
