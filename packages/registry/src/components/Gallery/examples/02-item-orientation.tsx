"use client";

import React from 'react'
import { Gallery, Frame } from 'ui-lab-components'
import type { GalleryProps } from 'ui-lab-components'
import type { ControlDef } from '@/types'

type GalleryGap = NonNullable<GalleryProps['gap']>;
type ItemTier = 'common' | 'archived' | 'experimental';

const FRAME_STYLE: Record<ItemTier, React.CSSProperties> = {
  common: { '--frame-fill': 'var(--background-900)', '--frame-stroke-color': 'var(--background-600)' } as React.CSSProperties,
  archived: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-700)' } as React.CSSProperties,
  experimental: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-800)' } as React.CSSProperties,
};

export const metadata = {
  title: 'Item Orientation',
  description: 'Gallery items can be oriented vertically (stacked view + body) or horizontally (side-by-side view + body).',
};

export const controls: ControlDef[] = [
  {
    name: 'orientation',
    label: 'Orientation',
    type: 'select',
    options: [
      { label: 'Vertical', value: 'vertical' },
      { label: 'Horizontal', value: 'horizontal' },
    ],
    defaultValue: 'vertical',
  },
  { name: 'columns', label: 'Columns (vertical only)', type: 'stepper', defaultValue: 2, min: 1, max: 4, step: 1 },
  {
    name: 'gap',
    label: 'Gap Token',
    type: 'select',
    options: [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'sm',
  },
  {
    name: 'aspectRatio',
    label: 'View Aspect Ratio (vertical only)',
    type: 'select',
    options: [
      { label: '1:1', value: '1/1' },
      { label: '4:3', value: '4/3' },
      { label: '3:4', value: '3/4' },
      { label: '16:9', value: '16/9' },
    ],
    defaultValue: '4/3',
  },
  { name: 'itemCount', label: 'Items', type: 'stepper', defaultValue: 4, min: 4, max: 12, step: 1 },
];

export const previewLayout = 'start' as const;
export const resizable = true;

const ORIENTATION_ITEMS = [
  { id: 'o1', title: 'Waveform Study', description: '12:34 · Electronic', tier: 'common' as ItemTier },
  { id: 'o2', title: 'Threshold', description: '8:02 · Ambient', tier: 'common' as ItemTier },
  { id: 'o3', title: 'Parallel Lines', description: '5:47 · Minimal', tier: 'common' as ItemTier },
  { id: 'o4', title: 'Resonance', description: '9:15 · Drone', tier: 'common' as ItemTier },
  { id: 'o5', title: 'Liminal Space', description: '11:20 · Experimental', tier: 'common' as ItemTier },
  { id: 'o6', title: 'Undertow', description: '7:45 · Ambient', tier: 'common' as ItemTier },
  { id: 'o7', title: 'Archive Vol. I', description: 'Archived · 2019 sessions', tier: 'archived' as ItemTier },
  { id: 'o8', title: 'Archive Vol. II', description: 'Archived · Rough cuts', tier: 'archived' as ItemTier },
  { id: 'o9', title: 'Archive Vol. III', description: 'Archived · Unmixed', tier: 'archived' as ItemTier },
  { id: 'o10', title: 'Session X-01', description: 'Experimental · Unreleased draft', tier: 'experimental' as ItemTier },
  { id: 'o11', title: 'Session X-02', description: 'Experimental · Internal', tier: 'experimental' as ItemTier },
  { id: 'o12', title: 'Session X-03', description: 'Experimental · Do not distribute', tier: 'experimental' as ItemTier },
];

function getGap(value: unknown): GalleryGap {
  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;
  return 'md';
}

function getInt(value: unknown, min: number, max: number, fallback: number) {
  const n = Number(value);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function getAspectRatio(value: unknown): string {
  if (typeof value === 'string' && value.includes('/')) return value;
  return '4/3';
}

function getOrientation(value: unknown): 'vertical' | 'horizontal' {
  return value === 'horizontal' ? 'horizontal' : 'vertical';
}

function itemClassName(tier: ItemTier) {
  if (tier === 'archived') return 'opacity-60';
  if (tier === 'experimental') return 'opacity-35';
  return undefined;
}

export function renderPreview(props: Record<string, unknown>) {
  const orientation = getOrientation(props.orientation);
  const columns = getInt(props.columns, 1, 4, 2);
  const gap = getGap(props.gap);
  const ratio = getAspectRatio(props.aspectRatio);
  const count = getInt(props.itemCount, 4, 12, 4);
  const items = ORIENTATION_ITEMS.slice(0, count);
  const resolvedColumns: GalleryProps['columns'] = orientation === 'horizontal' ? 1 : columns;

  return (
    <Gallery columns={resolvedColumns} gap={gap} className="w-full">
      {items.map((item) => (
        <Gallery.Item key={item.id} orientation={orientation} className={itemClassName(item.tier)} aria-disabled={item.tier === 'experimental' ? true : undefined}>
          <Gallery.View aspectRatio={orientation === 'horizontal' ? '1/1' : ratio}>
            <Frame pathStroke={item.tier === 'experimental' ? 'dotted' : 'dashed'} style={FRAME_STYLE[item.tier]} className="w-full h-full" />
          </Gallery.View>
          <Gallery.Body>
            <span>{item.title}</span>
            <span>{item.description}</span>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  );
}

export default function Example() {
  return renderPreview({ orientation: 'vertical', columns: 2, gap: 'sm', aspectRatio: '4/3', itemCount: 4 });
}
