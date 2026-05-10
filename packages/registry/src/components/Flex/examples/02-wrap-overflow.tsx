"use client";

import React from 'react'
import { Flex, Frame } from 'ui-lab-components'
import type { FlexProps } from 'ui-lab-components'
import type { ControlDef } from '@/types'

type FlexDirection = NonNullable<FlexProps['direction']>;
type FlexJustify = NonNullable<FlexProps['justify']>;
type FlexAlign = NonNullable<FlexProps['align']>;
type FlexGap = NonNullable<FlexProps['gap']>;
type FlexWrap = NonNullable<FlexProps['wrap']>;

const BASE_CELL_STYLE = {
  '--frame-fill': 'var(--background-900)',
  '--frame-stroke-color': 'var(--background-600)',
} as React.CSSProperties;

export const metadata = {
  title: 'Wrap Overflow Into Rows',
  description: 'When wrap="wrap" is set, items that exceed the container width reflow into additional rows.',
};

export const controls: ControlDef[] = [
  {
    name: 'direction',
    label: 'Main Axis',
    type: 'select',
    options: [
      { label: 'Row', value: 'row' },
      { label: 'Column', value: 'column' },
    ],
    defaultValue: 'row',
  },
  {
    name: 'justify',
    label: 'Main-Axis Distribution',
    type: 'select',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'End', value: 'end' },
      { label: 'Space Between', value: 'between' },
      { label: 'Space Around', value: 'around' },
      { label: 'Space Evenly', value: 'evenly' },
    ],
    defaultValue: 'start',
  },
  {
    name: 'align',
    label: 'Cross-Axis Alignment',
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
    name: 'frameCount',
    label: 'Frames',
    type: 'stepper',
    defaultValue: 7,
    min: 4,
    max: 12,
    step: 1,
  },
  {
    name: 'wrap',
    label: 'Overflow Strategy',
    type: 'select',
    options: [
      { label: 'No Wrap', value: 'nowrap' },
      { label: 'Wrap', value: 'wrap' },
    ],
    defaultValue: 'wrap',
  },
];

export const previewLayout = 'start' as const;
export const resizable = true;

function getDirection(value: unknown): FlexDirection {
  return value === 'column' ? 'column' : 'row';
}

function getJustify(value: unknown): FlexJustify {
  if (value === 'center' || value === 'end' || value === 'between' || value === 'around' || value === 'evenly') return value;
  return 'start';
}

function getAlign(value: unknown): FlexAlign {
  if (value === 'start' || value === 'center' || value === 'end' || value === 'baseline') return value;
  return 'stretch';
}

function getGap(value: unknown): FlexGap {
  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;
  return 'md';
}

function getWrap(value: unknown): FlexWrap {
  return value === 'wrap' ? 'wrap' : 'nowrap';
}

function getFrameCount(value: unknown, min: number, max: number, fallback: number) {
  const n = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function FrameCell({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <Frame pathStroke="dashed" className={className} style={{ ...BASE_CELL_STYLE, ...style }}>
      <div className="size-full" />
    </Frame>
  );
}

function getToolbarFlowSpecs(direction: FlexDirection, frameCount: number) {
  if (direction === 'column') {
    const pattern = [
      { style: { width: '100%', height: '3.25rem' } },
      { style: { width: '100%', height: '3rem' } },
      { style: { width: '100%', height: '3.25rem' } },
      { style: { width: '100%', height: '2.75rem' } },
    ];
    return Array.from({ length: frameCount }, (_, i) => ({ className: 'w-full', ...pattern[i % pattern.length] }));
  }
  const repeatPattern = [
    { className: 'shrink-0', style: { width: '6rem', height: '3.25rem' } },
    { className: 'shrink-0', style: { width: '6.75rem', height: '3.25rem' } },
    { className: 'shrink-0', style: { width: '5.5rem', height: '3.25rem' } },
    { className: 'shrink-0', style: { width: '6.5rem', height: '3.25rem' } },
    { className: 'shrink-0', style: { width: '4.5rem', height: '3.25rem' } },
    { className: 'shrink-0', style: { width: '5.5rem', height: '3.25rem' } },
  ];
  return [
    { className: 'min-w-[12rem]', style: { width: 'auto', minWidth: '12rem', flex: '1.6 1 14rem', height: '3.25rem' } },
    ...Array.from({ length: Math.max(frameCount - 1, 0) }, (_, i) => repeatPattern[i % repeatPattern.length]),
  ];
}

export function renderPreview(props: Record<string, unknown>) {
  const direction = getDirection(props.direction);
  const frameCount = getFrameCount(props.frameCount, 4, 12, 7);
  const specs = getToolbarFlowSpecs(direction, frameCount);

  return (
    <Flex
      direction={direction}
      justify={getJustify(props.justify)}
      align={getAlign(props.align)}
      gap={getGap(props.gap)}
      wrap={getWrap(props.wrap)}
      className="w-full"
    >
      {specs.map((spec, index) => (
        <FrameCell key={`${direction}-toolbar-${index}`} className={spec.className} style={spec.style as React.CSSProperties} />
      ))}
    </Flex>
  );
}

export default function Example() {
  return renderPreview({ direction: 'row', justify: 'start', align: 'center', gap: 'md', wrap: 'wrap', frameCount: 7 });
}
