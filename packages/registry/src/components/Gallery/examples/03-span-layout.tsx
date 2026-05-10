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
  title: 'Span Layout',
  description: 'A featured item spans multiple columns and rows to create an editorial grid layout.',
};

export const controls: ControlDef[] = [
  { name: 'columns', label: 'Columns', type: 'stepper', defaultValue: 3, min: 2, max: 6, step: 1 },
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
    defaultValue: 'md',
  },
  { name: 'featuredColumnSpan', label: 'Featured Column Span', type: 'stepper', defaultValue: 2, min: 1, max: 4, step: 1 },
  { name: 'featuredRowSpan', label: 'Featured Row Span', type: 'stepper', defaultValue: 2, min: 1, max: 3, step: 1 },
  {
    name: 'featuredAspect',
    label: 'Featured Aspect Ratio',
    type: 'select',
    options: [
      { label: '4:3', value: '4/3' },
      { label: '16:9', value: '16/9' },
      { label: '21:9', value: '21/9' },
      { label: '1:1', value: '1/1' },
    ],
    defaultValue: '16/9',
  },
  { name: 'itemCount', label: 'Items', type: 'stepper', defaultValue: 5, min: 3, max: 12, step: 1 },
];

export const previewLayout = 'start' as const;
export const resizable = true;

const SPAN_ITEMS = [
  { id: 's1', title: "Editor's Pick", description: 'Featured collection — Spring 2024', tier: 'common' as ItemTier },
  { id: 's2', title: 'Series No. 1', description: 'Monochrome', tier: 'common' as ItemTier },
  { id: 's3', title: 'Series No. 2', description: 'Landscape', tier: 'common' as ItemTier },
  { id: 's4', title: 'Series No. 3', description: 'Portrait', tier: 'common' as ItemTier },
  { id: 's5', title: 'Series No. 4', description: 'Abstract', tier: 'common' as ItemTier },
  { id: 's6', title: 'Series No. 5', description: 'Documentary', tier: 'common' as ItemTier },
  { id: 's7', title: 'Hidden Vol. I', description: 'Archived · Unlisted', tier: 'archived' as ItemTier },
  { id: 's8', title: 'Hidden Vol. II', description: 'Archived · Private', tier: 'archived' as ItemTier },
  { id: 's9', title: 'Hidden Vol. III', description: 'Archived · Limited print', tier: 'archived' as ItemTier },
  { id: 's10', title: 'Vault A', description: 'Experimental · Access restricted', tier: 'experimental' as ItemTier },
  { id: 's11', title: 'Vault B', description: 'Experimental · Internal preview', tier: 'experimental' as ItemTier },
  { id: 's12', title: 'Vault C', description: 'Experimental · Embargoed', tier: 'experimental' as ItemTier },
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
  const columns = getInt(props.columns, 2, 6, 3);
  const gap = getGap(props.gap);
  const colSpan = Math.min(getInt(props.featuredColumnSpan, 1, 4, 2), columns);
  const rowSpan = getInt(props.featuredRowSpan, 1, 3, 2);
  const featuredRatio = getAspectRatio(props.featuredAspect);
  const count = getInt(props.itemCount, 3, 12, 5);
  const [featured, ...rest] = SPAN_ITEMS.slice(0, count);

  return (
    <Gallery columns={columns} gap={gap} className="w-full">
      <Gallery.Item columnSpan={colSpan} rowSpan={rowSpan}>
        <Gallery.View aspectRatio={featuredRatio}>
          <Frame pathStroke="dashed" style={FRAME_STYLE.common} className="w-full h-full" />
        </Gallery.View>
        <Gallery.Body>
          <span>{featured.title}</span>
          <span>{featured.description}</span>
        </Gallery.Body>
      </Gallery.Item>
      {rest.map((item) => (
        <Gallery.Item key={item.id} className={itemClassName(item.tier)} aria-disabled={item.tier === 'experimental' ? true : undefined}>
          <Gallery.View aspectRatio="4/3">
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
  return renderPreview({ columns: 3, gap: 'md', featuredColumnSpan: 2, featuredRowSpan: 2, featuredAspect: '16/9', itemCount: 5 });
}
