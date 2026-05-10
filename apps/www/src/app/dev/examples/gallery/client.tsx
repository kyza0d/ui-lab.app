"use client";

import type { CSSProperties } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Gallery, Frame } from "ui-lab-components";
import type { GalleryProps } from "ui-lab-components";
import { cn } from "@/shared";

// ─── Types ────────────────────────────────────────────────────────────────────

type GalleryGap = NonNullable<GalleryProps["gap"]>;
type ItemTier = "common" | "archived" | "experimental";

interface ItemData {
  id: string;
  title: string;
  description: string;
  tier: ItemTier;
}

// ─── Frame Style Maps ─────────────────────────────────────────────────────────

const FRAME_STYLE: Record<ItemTier, CSSProperties> = {
  common: {
    "--frame-fill": "var(--background-900)",
    "--frame-stroke-color": "var(--background-600)",
  } as CSSProperties,
  archived: {
    "--frame-fill": "var(--background-950)",
    "--frame-stroke-color": "var(--background-700)",
  } as CSSProperties,
  experimental: {
    "--frame-fill": "var(--background-950)",
    "--frame-stroke-color": "var(--background-800)",
  } as CSSProperties,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGap(value: unknown): GalleryGap {
  if (value === "xs" || value === "sm" || value === "lg" || value === "xl") return value;
  return "md";
}

function getInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = Number(value);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

function getAspectRatio(value: unknown): string {
  if (typeof value === "string" && value.includes("/")) return value;
  return "4/3";
}

function getOrientation(value: unknown): "vertical" | "horizontal" {
  return value === "horizontal" ? "horizontal" : "vertical";
}

// ─── Shared Placeholder ───────────────────────────────────────────────────────

function PlaceholderView({
  aspectRatio = "4/3",
  tier = "common",
}: {
  aspectRatio?: string;
  tier?: ItemTier;
}) {
  return (
    <Gallery.View aspectRatio={aspectRatio}>
      <Frame
        pathStroke={tier === "experimental" ? "dotted" : "dashed"}
        style={FRAME_STYLE[tier]}
        className="w-full h-full"
      />
    </Gallery.View>
  );
}

function itemClassName(tier: ItemTier) {
  if (tier === "archived") return "opacity-60";
  if (tier === "experimental") return "opacity-35";
  return undefined;
}

// ─── Example 1: Grid Composition ─────────────────────────────────────────────

const GRID_ITEMS: ItemData[] = [
  { id: "g1",  title: "Brand Kit",         description: "Identity · Updated 2d ago",       tier: "common"       },
  { id: "g2",  title: "Icon Set",           description: "UI Assets · 142 icons",           tier: "common"       },
  { id: "g3",  title: "Type Scale",         description: "Typography · 8 weights",          tier: "common"       },
  { id: "g4",  title: "Color Tokens",       description: "Design System · v3.2",            tier: "common"       },
  { id: "g5",  title: "Grid Spec",          description: "Layout · 12-column",              tier: "common"       },
  { id: "g6",  title: "Motion Guide",       description: "Animation · 24 presets",          tier: "common"       },
  // archived — revealed at count ≥ 7
  { id: "g7",  title: "Legacy Icons",       description: "Archived · v1.4",                 tier: "archived"     },
  { id: "g8",  title: "Old Palette",        description: "Archived · 2021",                 tier: "archived"     },
  { id: "g9",  title: "Beta Components",    description: "Archived · Pre-release",          tier: "archived"     },
  // experimental — revealed at count ≥ 10
  { id: "g10", title: "Prototype A",        description: "Experimental · Do not ship",      tier: "experimental" },
  { id: "g11", title: "Prototype B",        description: "Experimental · Internal only",    tier: "experimental" },
  { id: "g12", title: "Prototype C",        description: "Experimental · Unreleased",       tier: "experimental" },
];

const gridControls: NonNullable<DevExample["controls"]> = [
  {
    name: "columns",
    label: "Columns",
    type: "stepper",
    defaultValue: 3,
    min: 1,
    max: 6,
    step: 1,
  },
  {
    name: "gap",
    label: "Gap Token",
    type: "select",
    options: [
      { label: "Extra Small", value: "xs" },
      { label: "Small",       value: "sm" },
      { label: "Medium",      value: "md" },
      { label: "Large",       value: "lg" },
      { label: "Extra Large", value: "xl" },
    ],
    defaultValue: "md",
  },
  {
    name: "aspectRatio",
    label: "Aspect Ratio",
    type: "select",
    options: [
      { label: "1:1",  value: "1/1"  },
      { label: "4:3",  value: "4/3"  },
      { label: "3:4",  value: "3/4"  },
      { label: "16:9", value: "16/9" },
    ],
    defaultValue: "4/3",
  },
  {
    name: "itemCount",
    label: "Items",
    type: "stepper",
    defaultValue: 4,
    min: 4,
    max: 12,
    step: 1,
  },
  {
    name: "responsive",
    label: "Container-Query Responsive",
    type: "toggle",
    defaultValue: false,
  },
];

function renderGridComposition(props: Record<string, unknown>) {
  const columns = getInt(props.columns, 1, 6, 3);
  const gap     = getGap(props.gap);
  const ratio   = getAspectRatio(props.aspectRatio);
  const count   = getInt(props.itemCount, 4, 12, 4);
  const responsive = Boolean(props.responsive);
  const items   = GRID_ITEMS.slice(0, count);

  const resolvedColumns: GalleryProps["columns"] = responsive
    ? { sm: 1, md: Math.min(2, columns), lg: columns }
    : columns;

  return (
    <Gallery columns={resolvedColumns} gap={gap} responsive={responsive} className="w-full">
      {items.map((item) => (
        <Gallery.Item
          key={item.id}
          className={itemClassName(item.tier)}
          aria-disabled={item.tier === "experimental" ? true : undefined}
        >
          <PlaceholderView aspectRatio={ratio} tier={item.tier} />
          <Gallery.Body>
            <span>{item.title}</span>
            <span>{item.description}</span>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  );
}

// ─── Example 2: Item Orientation ─────────────────────────────────────────────

const ORIENTATION_ITEMS: ItemData[] = [
  { id: "o1",  title: "Waveform Study",   description: "12:34 · Electronic",                 tier: "common"       },
  { id: "o2",  title: "Threshold",        description: "8:02 · Ambient",                     tier: "common"       },
  { id: "o3",  title: "Parallel Lines",   description: "5:47 · Minimal",                     tier: "common"       },
  { id: "o4",  title: "Resonance",        description: "9:15 · Drone",                       tier: "common"       },
  { id: "o5",  title: "Liminal Space",    description: "11:20 · Experimental",               tier: "common"       },
  { id: "o6",  title: "Undertow",         description: "7:45 · Ambient",                     tier: "common"       },
  // archived — revealed at count ≥ 7
  { id: "o7",  title: "Archive Vol. I",   description: "Archived · 2019 sessions",           tier: "archived"     },
  { id: "o8",  title: "Archive Vol. II",  description: "Archived · Rough cuts",              tier: "archived"     },
  { id: "o9",  title: "Archive Vol. III", description: "Archived · Unmixed",                 tier: "archived"     },
  // experimental — revealed at count ≥ 10
  { id: "o10", title: "Session X-01",     description: "Experimental · Unreleased draft",   tier: "experimental" },
  { id: "o11", title: "Session X-02",     description: "Experimental · Internal",           tier: "experimental" },
  { id: "o12", title: "Session X-03",     description: "Experimental · Do not distribute",  tier: "experimental" },
];

const orientationControls: NonNullable<DevExample["controls"]> = [
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    options: [
      { label: "Vertical",   value: "vertical"   },
      { label: "Horizontal", value: "horizontal" },
    ],
    defaultValue: "vertical",
  },
  {
    name: "columns",
    label: "Columns (vertical only)",
    type: "stepper",
    defaultValue: 2,
    min: 1,
    max: 4,
    step: 1,
  },
  {
    name: "gap",
    label: "Gap Token",
    type: "select",
    options: [
      { label: "Extra Small", value: "xs" },
      { label: "Small",       value: "sm" },
      { label: "Medium",      value: "md" },
      { label: "Large",       value: "lg" },
    ],
    defaultValue: "sm",
  },
  {
    name: "aspectRatio",
    label: "View Aspect Ratio (vertical only)",
    type: "select",
    options: [
      { label: "1:1",  value: "1/1"  },
      { label: "4:3",  value: "4/3"  },
      { label: "3:4",  value: "3/4"  },
      { label: "16:9", value: "16/9" },
    ],
    defaultValue: "4/3",
  },
  {
    name: "itemCount",
    label: "Items",
    type: "stepper",
    defaultValue: 4,
    min: 4,
    max: 12,
    step: 1,
  },
];

function renderOrientation(props: Record<string, unknown>) {
  const orientation = getOrientation(props.orientation);
  const columns     = getInt(props.columns, 1, 4, 2);
  const gap         = getGap(props.gap);
  const ratio       = getAspectRatio(props.aspectRatio);
  const count       = getInt(props.itemCount, 4, 12, 4);
  const items       = ORIENTATION_ITEMS.slice(0, count);

  const resolvedColumns: GalleryProps["columns"] =
    orientation === "horizontal" ? 1 : columns;

  return (
    <Gallery columns={resolvedColumns} gap={gap} className="w-full">
      {items.map((item) => (
        <Gallery.Item
          key={item.id}
          orientation={orientation}
          className={itemClassName(item.tier)}
          aria-disabled={item.tier === "experimental" ? true : undefined}
        >
          <PlaceholderView
            aspectRatio={orientation === "horizontal" ? "1/1" : ratio}
            tier={item.tier}
          />
          <Gallery.Body>
            <span>{item.title}</span>
            <span>{item.description}</span>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  );
}

// ─── Example 3: Span Layout ───────────────────────────────────────────────────

const SPAN_ITEMS: ItemData[] = [
  { id: "s1",  title: "Editor's Pick",    description: "Featured collection — Spring 2024", tier: "common"       },
  { id: "s2",  title: "Series No. 1",     description: "Monochrome",                        tier: "common"       },
  { id: "s3",  title: "Series No. 2",     description: "Landscape",                         tier: "common"       },
  { id: "s4",  title: "Series No. 3",     description: "Portrait",                          tier: "common"       },
  { id: "s5",  title: "Series No. 4",     description: "Abstract",                          tier: "common"       },
  { id: "s6",  title: "Series No. 5",     description: "Documentary",                       tier: "common"       },
  // archived — revealed at count ≥ 7
  { id: "s7",  title: "Hidden Vol. I",    description: "Archived · Unlisted",               tier: "archived"     },
  { id: "s8",  title: "Hidden Vol. II",   description: "Archived · Private",                tier: "archived"     },
  { id: "s9",  title: "Hidden Vol. III",  description: "Archived · Limited print",          tier: "archived"     },
  // experimental — revealed at count ≥ 10
  { id: "s10", title: "Vault A",          description: "Experimental · Access restricted",  tier: "experimental" },
  { id: "s11", title: "Vault B",          description: "Experimental · Internal preview",   tier: "experimental" },
  { id: "s12", title: "Vault C",          description: "Experimental · Embargoed",          tier: "experimental" },
];

const spanControls: NonNullable<DevExample["controls"]> = [
  {
    name: "columns",
    label: "Columns",
    type: "stepper",
    defaultValue: 3,
    min: 2,
    max: 6,
    step: 1,
  },
  {
    name: "gap",
    label: "Gap Token",
    type: "select",
    options: [
      { label: "Extra Small", value: "xs" },
      { label: "Small",       value: "sm" },
      { label: "Medium",      value: "md" },
      { label: "Large",       value: "lg" },
    ],
    defaultValue: "md",
  },
  {
    name: "featuredColumnSpan",
    label: "Featured Column Span",
    type: "stepper",
    defaultValue: 2,
    min: 1,
    max: 4,
    step: 1,
  },
  {
    name: "featuredRowSpan",
    label: "Featured Row Span",
    type: "stepper",
    defaultValue: 2,
    min: 1,
    max: 3,
    step: 1,
  },
  {
    name: "featuredAspect",
    label: "Featured Aspect Ratio",
    type: "select",
    options: [
      { label: "4:3",  value: "4/3"  },
      { label: "16:9", value: "16/9" },
      { label: "21:9", value: "21/9" },
      { label: "1:1",  value: "1/1"  },
    ],
    defaultValue: "16/9",
  },
  {
    name: "itemCount",
    label: "Items",
    type: "stepper",
    defaultValue: 5,
    min: 3,
    max: 12,
    step: 1,
  },
];

function renderSpanLayout(props: Record<string, unknown>) {
  const columns      = getInt(props.columns, 2, 6, 3);
  const gap          = getGap(props.gap);
  const colSpan      = Math.min(getInt(props.featuredColumnSpan, 1, 4, 2), columns);
  const rowSpan      = getInt(props.featuredRowSpan, 1, 3, 2);
  const featuredRatio = getAspectRatio(props.featuredAspect);
  const count        = getInt(props.itemCount, 3, 12, 5);
  const [featured, ...rest] = SPAN_ITEMS.slice(0, count);

  return (
    <Gallery columns={columns} gap={gap} className="w-full">
      <Gallery.Item columnSpan={colSpan} rowSpan={rowSpan}>
        <PlaceholderView aspectRatio={featuredRatio} tier="common" />
        <Gallery.Body>
          <span>{featured.title}</span>
          <span>{featured.description}</span>
        </Gallery.Body>
      </Gallery.Item>
      {rest.map((item) => (
        <Gallery.Item
          key={item.id}
          className={itemClassName(item.tier)}
          aria-disabled={item.tier === "experimental" ? true : undefined}
        >
          <PlaceholderView aspectRatio="4/3" tier={item.tier} />
          <Gallery.Body>
            <span>{item.title}</span>
            <span>{item.description}</span>
          </Gallery.Body>
        </Gallery.Item>
      ))}
    </Gallery>
  );
}

// ─── Examples Registry ────────────────────────────────────────────────────────

const examples: DevExample[] = [
  {
    id: "grid-composition",
    title: "Grid Composition",
    description: "",
    preview: null,
    controls: gridControls,
    renderPreview: renderGridComposition,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "item-orientation",
    title: "Item Orientation",
    description: "",
    preview: null,
    controls: orientationControls,
    renderPreview: renderOrientation,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "span-layout",
    title: "Span Layout",
    description: "",
    preview: null,
    controls: spanControls,
    renderPreview: renderSpanLayout,
    previewLayout: "start",
    resizable: true,
  },
];

export default function GalleryExamplesPage() {
  return (
    <DevExampleLayout
      title="Gallery Examples"
      description=""
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
