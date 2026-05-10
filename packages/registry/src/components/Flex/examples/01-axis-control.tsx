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
  title: 'Axis Control',
  description: 'Interactive demo of Flex direction, justify, align, gap, and wrap across row and column layouts.',
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
    defaultValue: 4,
    min: 4,
    max: 10,
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
    defaultValue: 'nowrap',
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

function getAxisColumnActionSpecs(frameCount: number) {
  const total = Math.max(frameCount - 2, 1);
  const pattern = [
    { className: 'min-w-[4.75rem] flex-1', style: { width: 'auto', minWidth: '4.75rem', height: '2.75rem' } },
    { className: 'min-w-[5.5rem] flex-1', style: { width: 'auto', minWidth: '5.5rem', height: '2.75rem' } },
    { className: 'min-w-[4rem] flex-1', style: { width: 'auto', minWidth: '4rem', height: '3rem' } },
  ];
  return Array.from({ length: total }, (_, i) => pattern[i % pattern.length]);
}

function getAxisRowGroups(frameCount: number) {
  const groupCount = Math.max(Math.ceil(frameCount / 4), 1);
  return Array.from({ length: groupCount }, (_, gi) => {
    const remaining = frameCount - gi * 4;
    const itemCount = Math.min(Math.max(remaining, 0), 4);
    return { rail: itemCount >= 1, canvas: itemCount >= 2, actionTop: itemCount >= 3, actionBottom: itemCount >= 4 };
  });
}

export function renderPreview(props: Record<string, unknown>) {
  const direction = getDirection(props.direction);
  const justify = getJustify(props.justify);
  const align = getAlign(props.align);
  const gap = getGap(props.gap);
  const wrap = getWrap(props.wrap);
  const frameCount = getFrameCount(props.frameCount, 4, 10, 4);

  if (direction === 'row') {
    const groups = getAxisRowGroups(frameCount);
    return (
      <Flex direction="column" justify={justify} align={align} gap={gap} wrap="nowrap" className="w-full">
        {groups.map((group, index) => (
          <Flex key={`axis-row-group-${index}`} direction="row" gap="md" align="stretch" className="w-full">
            {group.rail && <FrameCell className="shrink-0" style={{ width: '4.5rem', height: '8.5rem' }} />}
            {group.canvas && <FrameCell className="min-w-[11rem] flex-1" style={{ width: 'auto', minWidth: '11rem', flex: '1.4 1 12rem', height: '8.5rem' }} />}
            {(group.actionTop || group.actionBottom) && (
              <Flex direction="column" gap="sm" className="w-[5.5rem] shrink-0">
                {group.actionTop && <FrameCell className="shrink-0" style={{ width: '5.5rem', height: '4.5rem' }} />}
                {group.actionBottom && <FrameCell className="shrink-0" style={{ width: '5.5rem', height: '3.25rem' }} />}
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    );
  }

  const actions = getAxisColumnActionSpecs(frameCount);
  return (
    <Flex direction="column" justify={justify} align={align} gap={gap} wrap={wrap} className="w-full">
      <FrameCell className="w-full" style={{ width: '100%', height: '2.75rem' }} />
      <FrameCell className="w-full" style={{ width: '100%', height: '8rem' }} />
      <Flex direction="row" wrap="wrap" gap="sm" className="w-full">
        {actions.map((action, index) => (
          <FrameCell key={`column-action-${index}`} className={action.className} style={action.style as React.CSSProperties} />
        ))}
      </Flex>
    </Flex>
  );
}

export default function Example() {
  return renderPreview({ direction: 'row', justify: 'start', align: 'stretch', gap: 'md', wrap: 'nowrap', frameCount: 4 });
}
