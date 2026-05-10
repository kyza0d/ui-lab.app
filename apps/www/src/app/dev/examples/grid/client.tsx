"use client";

import type { CSSProperties } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Grid, Frame, type GridProps } from "ui-lab-components";
import { cn } from "@/shared";

type GridColumnsValue = "1" | "2" | "3" | "4" | "5" | "6" | "auto-fit" | "auto-fill";
type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
type GridJustifyItems = NonNullable<GridProps["justifyItems"]>;
type GridAlignItems = NonNullable<GridProps["alignItems"]>;
type GridAutoFlow = NonNullable<GridProps["autoFlow"]>;

const BASE_CELL_STYLE = {
  "--frame-fill": "var(--background-900)",
  "--frame-stroke-color": "var(--background-600)",
} as CSSProperties;

type FrameSpec = {
  className?: string;
  style: CSSProperties;
};

const arrangementControlsBase: NonNullable<DevExample["controls"]> = [
  {
    name: "columns",
    label: "Columns",
    type: "select",
    options: [
      { label: "1 Column", value: "1" },
      { label: "2 Columns", value: "2" },
      { label: "3 Columns", value: "3" },
      { label: "4 Columns", value: "4" },
      { label: "5 Columns", value: "5" },
      { label: "6 Columns", value: "6" },
      { label: "Auto Fit", value: "auto-fit" },
      { label: "Auto Fill", value: "auto-fill" },
    ],
    defaultValue: "3",
  },
  {
    name: "gap",
    label: "Gap Token",
    type: "select",
    options: [
      { label: "Extra Small", value: "xs" },
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
    ],
    defaultValue: "md",
  },
  {
    name: "justifyItems",
    label: "Inline Alignment",
    type: "select",
    options: [
      { label: "Stretch", value: "stretch" },
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
    ],
    defaultValue: "stretch",
  },
  {
    name: "alignItems",
    label: "Block Alignment",
    type: "select",
    options: [
      { label: "Stretch", value: "stretch" },
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Baseline", value: "baseline" },
    ],
    defaultValue: "stretch",
  },
  {
    name: "autoFlow",
    label: "Auto Placement",
    type: "select",
    options: [
      { label: "Row", value: "row" },
      { label: "Column", value: "column" },
      { label: "Row Dense", value: "row-dense" },
      { label: "Column Dense", value: "column-dense" },
    ],
    defaultValue: "row",
  },
  {
    name: "frameCount",
    label: "Panels",
    type: "stepper",
    defaultValue: 6,
    min: 4,
    max: 12,
    step: 1,
  },
];

const placementControls: DevExample["controls"] = arrangementControlsBase;

const editorialControls: DevExample["controls"] = arrangementControlsBase.map((control) => {
  if (control.name === "columns") {
    return { ...control, defaultValue: "4" };
  }
  if (control.name === "frameCount") {
    return { ...control, defaultValue: 7, min: 5 };
  }
  if (control.name === "autoFlow") {
    return { ...control, defaultValue: "row-dense" };
  }
  return control;
});

const responsiveControls: DevExample["controls"] = [
  {
    name: "columns",
    label: "Columns",
    type: "select",
    options: [
      { label: "2 Columns", value: "2" },
      { label: "3 Columns", value: "3" },
      { label: "4 Columns", value: "4" },
      { label: "Auto Fit", value: "auto-fit" },
      { label: "Auto Fill", value: "auto-fill" },
    ],
    defaultValue: "4",
  },
  {
    name: "gap",
    label: "Base Gap Token",
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
    ],
    defaultValue: "md",
  },
  {
    name: "rowGap",
    label: "Row Gap",
    type: "select",
    options: [
      { label: "Match Gap", value: "inherit" },
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    defaultValue: "inherit",
  },
  {
    name: "columnGap",
    label: "Column Gap",
    type: "select",
    options: [
      { label: "Match Gap", value: "inherit" },
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    defaultValue: "inherit",
  },
  {
    name: "frameCount",
    label: "Cards",
    type: "stepper",
    defaultValue: 6,
    min: 4,
    max: 10,
    step: 1,
  },
  {
    name: "responsive",
    label: "Enable Responsive Object",
    type: "toggle",
    defaultValue: true,
  },
];

function FrameCell({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Frame
      pathStroke="dashed"
      className={cn(className)}
      style={{ ...BASE_CELL_STYLE, ...style }}
    >
      <div className="size-full" />
    </Frame>
  );
}

function getColumns(value: unknown): GridColumnsValue {
  if (
    value === "1"
    || value === "2"
    || value === "4"
    || value === "5"
    || value === "6"
    || value === "auto-fit"
    || value === "auto-fill"
  ) {
    return value;
  }
  return "3";
}

function toColumns(value: GridColumnsValue): number | "auto-fit" | "auto-fill" {
  if (value === "auto-fit" || value === "auto-fill") {
    return value;
  }
  return Number(value);
}

function getApproxColumnCount(value: GridColumnsValue) {
  if (value === "auto-fit" || value === "auto-fill") {
    return 4;
  }
  return Number(value);
}

function getGap(value: unknown): GridGap {
  if (value === "xs" || value === "sm" || value === "lg" || value === "xl") {
    return value;
  }
  return "md";
}

function getJustifyItems(value: unknown): GridJustifyItems {
  if (value === "start" || value === "center" || value === "end") {
    return value;
  }
  return "stretch";
}

function getAlignItems(value: unknown): GridAlignItems {
  if (value === "start" || value === "center" || value === "end" || value === "baseline") {
    return value;
  }
  return "stretch";
}

function getAutoFlow(value: unknown): GridAutoFlow {
  if (value === "column" || value === "row-dense" || value === "column-dense") {
    return value;
  }
  return "row";
}

function getOptionalGap(value: unknown): GridGap | undefined {
  if (value === "inherit" || value == null) {
    return undefined;
  }
  return getGap(value);
}

function getFrameCount(value: unknown, min: number, max: number, fallback: number) {
  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(numericValue)));
}

function repeatFrameSpecs(count: number, pattern: FrameSpec[]) {
  return Array.from({ length: count }, (_, index) => {
    const template = pattern[index % pattern.length];
    return {
      className: template.className,
      style: { ...template.style },
    } satisfies FrameSpec;
  });
}

function spanColumns(trackCount: number, desired: number) {
  return `span ${Math.max(1, Math.min(desired, trackCount))}`;
}

function getPlacementSpecs(trackCount: number, frameCount: number) {
  if (trackCount <= 2) {
    return [
      { className: "w-full", style: { width: "100%", height: "3rem" } },
      { className: "w-full", style: { width: "100%", height: "8rem" } },
      ...repeatFrameSpecs(Math.max(frameCount - 2, 0), [
        { className: "w-full", style: { width: "100%", height: "5rem" } },
        { className: "w-full", style: { width: "100%", height: "3rem" } },
        { className: "w-full", style: { width: "100%", height: "4.5rem" } },
      ]),
    ];
  }

  if (trackCount === 3) {
    return [
      { className: "w-full", style: { width: "100%", height: "9rem", gridColumn: "span 1", gridRow: "span 2" } },
      { className: "w-full", style: { width: "100%", height: "5rem", gridColumn: "span 2" } },
      { className: "w-full", style: { width: "100%", height: "3rem" } },
      { className: "w-full", style: { width: "100%", height: "3rem" } },
      ...repeatFrameSpecs(Math.max(frameCount - 4, 0), [
        { className: "w-full", style: { width: "100%", height: "6rem", gridColumn: "span 2" } },
        { className: "w-full", style: { width: "100%", height: "3rem" } },
        { className: "w-full", style: { width: "100%", height: "4.5rem" } },
      ]),
    ];
  }

  return [
    { className: "w-full", style: { width: "100%", height: "10rem", gridRow: "span 2" } },
    {
      className: "w-full",
      style: { width: "100%", height: "6rem", gridColumn: spanColumns(trackCount - 1, trackCount - 1) },
    },
    { className: "w-full", style: { width: "100%", height: "3rem" } },
    { className: "w-full", style: { width: "100%", height: "3rem" } },
    ...repeatFrameSpecs(Math.max(frameCount - 4, 0), [
      { className: "w-full", style: { width: "100%", height: "6.5rem", gridColumn: spanColumns(trackCount, 2) } },
      { className: "w-full", style: { width: "100%", height: "3rem" } },
      { className: "w-full", style: { width: "100%", height: "4rem" } },
      { className: "w-full", style: { width: "100%", height: "5rem", gridColumn: spanColumns(trackCount, 2) } },
    ]),
  ];
}

function getEditorialSpecs(trackCount: number, frameCount: number) {
  if (trackCount <= 2) {
    return [
      { className: "w-full", style: { width: "100%", height: "8rem" } },
      ...repeatFrameSpecs(Math.max(frameCount - 1, 0), [
        { className: "w-full", style: { width: "100%", height: "4rem" } },
        { className: "w-full", style: { width: "100%", height: "5.5rem" } },
        { className: "w-full", style: { width: "100%", height: "3rem" } },
      ]),
    ];
  }

  return [
    {
      className: "w-full",
      style: { width: "100%", height: "8rem", gridColumn: spanColumns(trackCount, Math.max(trackCount - 1, 2)) },
    },
    { className: "w-full", style: { width: "100%", height: "8rem" } },
    { className: "w-full", style: { width: "100%", height: "3rem" } },
    { className: "w-full", style: { width: "100%", height: "5rem", gridColumn: spanColumns(trackCount, 2) } },
    { className: "w-full", style: { width: "100%", height: "5rem" } },
    ...repeatFrameSpecs(Math.max(frameCount - 5, 0), [
      { className: "w-full", style: { width: "100%", height: "3rem" } },
      { className: "w-full", style: { width: "100%", height: "6.5rem", gridColumn: spanColumns(trackCount, 2) } },
      { className: "w-full", style: { width: "100%", height: "4rem" } },
      { className: "w-full", style: { width: "100%", height: "3rem" } },
    ]),
  ];
}

function getResponsiveSpecs(frameCount: number) {
  return [
    { className: "w-full", style: { width: "100%", height: "9rem" } },
    { className: "w-full", style: { width: "100%", height: "4rem" } },
    ...repeatFrameSpecs(Math.max(frameCount - 2, 0), [
      { className: "w-full", style: { width: "100%", height: "3rem" } },
      { className: "w-full", style: { width: "100%", height: "5rem" } },
      { className: "w-full", style: { width: "100%", height: "3.5rem" } },
      { className: "w-full", style: { width: "100%", height: "6rem" } },
    ]),
  ];
}

function renderGridPreview(
  props: Record<string, unknown>,
  frameSpecs: FrameSpec[],
) {
  return (
    <Grid
      columns={toColumns(getColumns(props.columns))}
      gap={getGap(props.gap)}
      justifyItems={getJustifyItems(props.justifyItems)}
      alignItems={getAlignItems(props.alignItems)}
      autoFlow={getAutoFlow(props.autoFlow)}
      className="w-full"
    >
      {frameSpecs.map((frame, index) => (
        <FrameCell
          key={index}
          className={frame.className}
          style={frame.style}
        />
      ))}
    </Grid>
  );
}

function renderPlacementPreview(props: Record<string, unknown>) {
  const columns = getColumns(props.columns);
  const frameCount = getFrameCount(props.frameCount, 4, 12, 6);

  return renderGridPreview(
    props,
    getPlacementSpecs(getApproxColumnCount(columns), frameCount),
  );
}

function renderEditorialPreview(props: Record<string, unknown>) {
  const columns = getColumns(props.columns);
  const frameCount = getFrameCount(props.frameCount, 5, 12, 7);

  return renderGridPreview(
    props,
    getEditorialSpecs(getApproxColumnCount(columns), frameCount),
  );
}

function renderResponsiveGridPreview(props: Record<string, unknown>) {
  const columns = getColumns(props.columns);
  const baseColumns = toColumns(columns);
  const gap = getGap(props.gap);
  const responsive = Boolean(props.responsive);
  const frameCount = getFrameCount(props.frameCount, 4, 10, 6);

  return (
    <Grid
      columns={responsive ? { sm: 1, md: 2, lg: baseColumns } : baseColumns}
      gap={responsive ? { sm: "sm", md: gap, lg: gap } : gap}
      rowGap={getOptionalGap(props.rowGap)}
      columnGap={getOptionalGap(props.columnGap)}
      responsive={responsive}
      className="w-full"
    >
      {getResponsiveSpecs(frameCount).map((frame, index) => (
        <FrameCell
          key={index}
          className={frame.className}
          style={frame.style}
        />
      ))}
    </Grid>
  );
}

const editorialPreview = renderEditorialPreview({
  columns: "4",
  gap: "md",
  justifyItems: "stretch",
  alignItems: "stretch",
  autoFlow: "row-dense",
  frameCount: 7,
});

const examples: DevExample[] = [
  {
    id: "track-placement",
    title: "Track Placement",
    description: "",
    preview: null,
    controls: placementControls,
    renderPreview: renderPlacementPreview,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "editorial-spans",
    title: "Editorial Spans",
    description: "",
    preview: editorialPreview,
    controls: editorialControls,
    renderPreview: renderEditorialPreview,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "responsive-card-rail",
    title: "Responsive Card Rail",
    description: "",
    preview: null,
    controls: responsiveControls,
    renderPreview: renderResponsiveGridPreview,
    previewLayout: "start",
    resizable: true,
  },
];

export default function GridExamplesPage() {
  return (
    <DevExampleLayout
      title="Grid Examples"
      description=""
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
