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
  title: 'Grid Composition',
  description: 'Gallery items arranged in a configurable grid with consistent gap and aspect ratio.',
};

export const controls: ControlDef[] = [
  { name: 'columns', label: 'Columns', type: 'stepper', defaultValue: 3, min: 1, max: 6, step: 1 },
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
    name: 'aspectRatio',
    label: 'Aspect Ratio',
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
  { name: 'responsive', label: 'Container-Query Responsive', type: 'toggle', defaultValue: false },
];

export const previewLayout = 'start' as const;
export const resizable = true;

const GRID_ITEMS = [
  { id: 'g1', title: 'Brand Kit', description: 'Identity · Updated 2d ago', tier: 'common' as ItemTier },
  { id: 'g2', title: 'Icon Set', description: 'UI Assets · 142 icons', tier: 'common' as ItemTier },
  { id: 'g3', title: 'Type Scale', description: 'Typography · 8 weights', tier: 'common' as ItemTier },
  { id: 'g4', title: 'Color Tokens', description: 'Design System · v3.2', tier: 'common' as ItemTier },
  { id: 'g5', title: 'Grid Spec', description: 'Layout · 12-column', tier: 'common' as ItemTier },
  { id: 'g6', title: 'Motion Guide', description: 'Animation · 24 presets', tier: 'common' as ItemTier },
  { id: 'g7', title: 'Legacy Icons', description: 'Archived · v1.4', tier: 'archived' as ItemTier },
  { id: 'g8', title: 'Old Palette', description: 'Archived · 2021', tier: 'archived' as ItemTier },
  { id: 'g9', title: 'Beta Components', description: 'Archived · Pre-release', tier: 'archived' as ItemTier },
  { id: 'g10', title: 'Prototype A', description: 'Experimental · Do not ship', tier: 'experimental' as ItemTier },
  { id: 'g11', title: 'Prototype B', description: 'Experimental · Internal only', tier: 'experimental' as ItemTier },
  { id: 'g12', title: 'Prototype C', description: 'Experimental · Unreleased', tier: 'experimental' as ItemTier },
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

function itemClassName(tier: ItemTier) {
  if (tier === 'archived') return 'opacity-60';
  if (tier === 'experimental') return 'opacity-35';
  return undefined;
}

export function renderPreview(props: Record<string, unknown>) {
  const columns = getInt(props.columns, 1, 6, 3);
  const gap = getGap(props.gap);
  const ratio = getAspectRatio(props.aspectRatio);
  const count = getInt(props.itemCount, 4, 12, 4);
  const responsive = Boolean(props.responsive);
  const items = GRID_ITEMS.slice(0, count);
  const resolvedColumns: GalleryProps['columns'] = responsive ? { sm: 1, md: Math.min(2, columns), lg: columns } : columns;

  return (
    <Gallery columns={resolvedColumns} gap={gap} responsive={responsive} className="w-full">
      {items.map((item) => (
        <Gallery.Item key={item.id} className={itemClassName(item.tier)} aria-disabled={item.tier === 'experimental' ? true : undefined}>
          <Gallery.View aspectRatio={ratio}>
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
  return renderPreview({ columns: 3, gap: 'md', aspectRatio: '4/3', itemCount: 4, responsive: false });
}
