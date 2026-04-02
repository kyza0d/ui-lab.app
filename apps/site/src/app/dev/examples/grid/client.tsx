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
  width: "3.5rem",
  height: "3.5rem",
  "--frame-fill": "transparent",
  "--frame-stroke-color": "color-mix(in srgb, var(--background-700) 88%, var(--foreground-500) 12%)",
} as CSSProperties;

const BASIC_CELL_STYLES: CSSProperties[] = Array.from({ length: 8 }, () => ({}));

const SPAN_CELL_STYLES: CSSProperties[] = [
  { gridColumn: "span 2", width: "100%" },
  {},
  {},
  {},
  { gridColumn: "span 2", width: "100%" },
  {},
];

const RESPONSIVE_CELL_STYLES: CSSProperties[] = Array.from({ length: 6 }, () => ({}));

const arrangementControls: DevExample["controls"] = [
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
];

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
      className={cn("shrink-0", className)}
      style={{ ...BASE_CELL_STYLE, ...style }}
    >
      <div className="size-full bg-background-950/50" />
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

function renderGridPreview(
  props: Record<string, unknown>,
  cellStyles: CSSProperties[],
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
      {cellStyles.map((style, index) => (
        <FrameCell key={index} style={style} />
      ))}
    </Grid>
  );
}

function renderBasicGridPreview(props: Record<string, unknown>) {
  return renderGridPreview(props, BASIC_CELL_STYLES);
}

const spanPreview = (
  <Grid
    columns={3}
    gap="md"
    justifyItems="stretch"
    alignItems="stretch"
    autoFlow="row"
    className="w-full"
  >
    {SPAN_CELL_STYLES.map((style, index) => (
      <FrameCell key={index} style={style} />
    ))}
  </Grid>
);

function renderSpanGridPreview(props: Record<string, unknown>) {
  return renderGridPreview(props, SPAN_CELL_STYLES);
}

function renderResponsiveGridPreview(props: Record<string, unknown>) {
  const baseColumns = toColumns(getColumns(props.columns));
  const gap = getGap(props.gap);
  const responsive = Boolean(props.responsive);

  return (
    <Grid
      columns={responsive ? { sm: 1, md: 2, lg: baseColumns } : baseColumns}
      gap={responsive ? { sm: "sm", md: gap, lg: gap } : gap}
      rowGap={getOptionalGap(props.rowGap)}
      columnGap={getOptionalGap(props.columnGap)}
      responsive={responsive}
      className="w-full"
    >
      {RESPONSIVE_CELL_STYLES.map((style, index) => (
        <FrameCell key={index} style={style} />
      ))}
    </Grid>
  );
}

const examples: DevExample[] = [
  {
    id: "basic-grid",
    title: "Basic Grid",
    description: "",
    preview: null,
    controls: arrangementControls,
    renderPreview: renderBasicGridPreview,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "span-grid",
    title: "Span Grid",
    description: "",
    preview: spanPreview,
    controls: arrangementControls,
    renderPreview: renderSpanGridPreview,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "responsive-grid",
    title: "Responsive Grid",
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
