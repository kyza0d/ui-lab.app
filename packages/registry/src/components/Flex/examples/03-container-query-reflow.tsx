"use client";

import React from 'react'
import { Flex, Frame } from 'ui-lab-components'
import type { FlexProps } from 'ui-lab-components'
import type { ControlDef } from '@/types'

type FlexJustify = NonNullable<FlexProps['justify']>;
type FlexGap = NonNullable<FlexProps['gap']>;
type FlexWrap = NonNullable<FlexProps['wrap']>;

const BASE_CELL_STYLE = {
  '--frame-fill': 'var(--background-900)',
  '--frame-stroke-color': 'var(--background-600)',
} as React.CSSProperties;

const CONTAINER_FLOW_STYLES = `
  .flex-container-flow-avatar {
    width: 5rem;
    min-width: 5rem;
    flex-grow: 0.65;
    flex-shrink: 1;
  }

  .flex-container-flow-main {
    width: 15rem;
    min-width: 14rem;
    flex-grow: 2;
    flex-shrink: 1;
  }

  .flex-container-flow-sidebar {
    width: 10rem;
    min-width: 10rem;
    flex-grow: 1;
    flex-shrink: 1;
  }

  @container flex-parent (width < 400px) {
    .flex-container-flow-avatar,
    .flex-container-flow-main,
    .flex-container-flow-sidebar {
      width: 100%;
      min-width: 0;
    }
  }
`;

export const metadata = {
  title: 'Container-Query Reflow',
  description: 'With containerQueryResponsive enabled, the layout reflows based on available container width rather than viewport size.',
};

export const controls: ControlDef[] = [
  {
    name: 'gap',
    label: 'Base Gap Token',
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
    defaultValue: 5,
    min: 5,
    max: 10,
    step: 1,
  },
  {
    name: 'justify',
    label: 'Main-Axis Distribution',
    type: 'select',
    options: [
      { label: 'Start', value: 'start' },
      { label: 'Center', value: 'center' },
      { label: 'Space Between', value: 'between' },
      { label: 'Space Around', value: 'around' },
    ],
    defaultValue: 'start',
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
  {
    name: 'containerQueryResponsive',
    label: 'Enable Container Queries',
    type: 'toggle',
    defaultValue: true,
  },
];

export const previewLayout = 'start' as const;
export const resizable = true;

function getJustify(value: unknown): FlexJustify {
  if (value === 'center' || value === 'end' || value === 'between' || value === 'around' || value === 'evenly') return value;
  return 'start';
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

function getDistribution(frameCount: number) {
  let metadataCount = 2;
  let sidebarCount = 1;
  let remaining = Math.max(frameCount - 5, 0);
  while (remaining > 0) {
    metadataCount += 1;
    remaining -= 1;
    if (remaining > 0) { sidebarCount += 1; remaining -= 1; }
  }
  return { metadataCount, sidebarCount };
}

const META_PATTERN = [
  { className: 'min-w-[4.75rem] flex-1', style: { width: 'auto', minWidth: '4.75rem', height: '2.25rem' } },
  { className: 'min-w-[4rem] flex-1', style: { width: 'auto', minWidth: '4rem', height: '2.25rem' } },
  { className: 'min-w-[5.25rem] flex-1', style: { width: 'auto', minWidth: '5.25rem', height: '2.25rem' } },
];

const SIDEBAR_PATTERN = [
  { style: { width: '100%', height: '7rem' } },
  { style: { width: '100%', height: '3rem' } },
  { style: { width: '100%', height: '2.5rem' } },
];

export function renderPreview(props: Record<string, unknown>) {
  const frameCount = getFrameCount(props.frameCount, 5, 10, 5);
  const { metadataCount, sidebarCount } = getDistribution(frameCount);

  return (
    <>
      <style>{CONTAINER_FLOW_STYLES}</style>
      <Flex
        justify={getJustify(props.justify)}
        align="stretch"
        gap={getGap(props.gap)}
        wrap={getWrap(props.wrap)}
        containerQueryResponsive={Boolean(props.containerQueryResponsive)}
        className="w-full"
      >
        <FrameCell className="flex-container-flow-avatar" style={{ height: '7rem' }} />
        <Flex direction="column" gap="sm" className="flex-container-flow-main">
          <FrameCell style={{ width: '100%', height: '4.5rem' }} />
          <Flex gap="sm" wrap="wrap" className="w-full">
            {Array.from({ length: metadataCount }, (_, i) => META_PATTERN[i % META_PATTERN.length]).map((spec, i) => (
              <FrameCell key={`meta-${i}`} className={spec.className} style={spec.style as React.CSSProperties} />
            ))}
          </Flex>
        </Flex>
        <Flex direction="column" gap="sm" className="flex-container-flow-sidebar">
          {Array.from({ length: sidebarCount }, (_, i) => SIDEBAR_PATTERN[i % SIDEBAR_PATTERN.length]).map((spec, i) => (
            <FrameCell key={`sidebar-${i}`} className="w-full" style={spec.style as React.CSSProperties} />
          ))}
        </Flex>
      </Flex>
    </>
  );
}

export default function Example() {
  return renderPreview({ gap: 'md', frameCount: 5, justify: 'start', wrap: 'nowrap', containerQueryResponsive: true });
}
