"use client";

import type { CSSProperties } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Flex, Frame, type FlexProps } from "ui-lab-components";
import { cn } from "@/shared";

type FlexDirection = NonNullable<FlexProps["direction"]>;
type FlexJustify = NonNullable<FlexProps["justify"]>;
type FlexAlign = NonNullable<FlexProps["align"]>;
type FlexGap = NonNullable<FlexProps["gap"]>;
type FlexWrap = NonNullable<FlexProps["wrap"]>;

const BASE_CELL_STYLE = {
  "--frame-fill": "transparent",
  "--frame-stroke-color": "color-mix(in srgb, var(--background-700) 88%, var(--foreground-500) 12%)",
} as CSSProperties;

const AXIS_ROW_STYLES: CSSProperties[] = [
  { width: "4rem", height: "auto" },
  { width: "5.25rem", height: "auto" },
  { width: "3.5rem", height: "auto" },
  { width: "4.5rem", height: "auto" },
];

const AXIS_COLUMN_STYLES: CSSProperties[] = [
  { width: "auto", minWidth: "4rem", height: "3rem" },
  { width: "auto", minWidth: "5.25rem", height: "4.25rem" },
  { width: "auto", minWidth: "3.5rem", height: "2.75rem" },
  { width: "auto", minWidth: "4.5rem", height: "3.5rem" },
];

const WRAP_STYLES: CSSProperties[] = [
  { width: "6.5rem", height: "3.5rem" },
  { width: "4.5rem", height: "3.5rem" },
  { width: "7.5rem", height: "3.5rem" },
  { width: "5rem", height: "3.5rem" },
  { width: "6rem", height: "3.5rem" },
  { width: "4rem", height: "3.5rem" },
  { width: "7rem", height: "3.5rem" },
  { width: "5.5rem", height: "3.5rem" },
];

const RESPONSIVE_STYLES: CSSProperties[] = [
  { width: "5.5rem", height: "3.25rem" },
  { width: "7.5rem", height: "3.25rem" },
  { width: "4.75rem", height: "3.25rem" },
  { width: "8rem", height: "3.25rem" },
  { width: "6rem", height: "3.25rem" },
];

const arrangementControls: DevExample["controls"] = [
  {
    name: "direction",
    label: "Main Axis",
    type: "select",
    options: [
      { label: "Row", value: "row" },
      { label: "Column", value: "column" },
    ],
    defaultValue: "row",
  },
  {
    name: "justify",
    label: "Main-Axis Distribution",
    type: "select",
    options: [
      { label: "Flex Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "Flex End", value: "flex-end" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
      { label: "Space Evenly", value: "space-evenly" },
    ],
    defaultValue: "flex-start",
  },
  {
    name: "align",
    label: "Cross-Axis Alignment",
    type: "select",
    options: [
      { label: "Stretch", value: "stretch" },
      { label: "Flex Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "Flex End", value: "flex-end" },
      { label: "Baseline", value: "baseline" },
    ],
    defaultValue: "stretch",
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
    name: "wrap",
    label: "Overflow Strategy",
    type: "select",
    options: [
      { label: "No Wrap", value: "nowrap" },
      { label: "Wrap", value: "wrap" },
    ],
    defaultValue: "nowrap",
  },
];

const responsiveControls: DevExample["controls"] = [
  {
    name: "gap",
    label: "Base Gap Token",
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
    name: "justify",
    label: "Main-Axis Distribution",
    type: "select",
    options: [
      { label: "Flex Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
    ],
    defaultValue: "space-between",
  },
  {
    name: "wrap",
    label: "Overflow Strategy",
    type: "select",
    options: [
      { label: "No Wrap", value: "nowrap" },
      { label: "Wrap", value: "wrap" },
    ],
    defaultValue: "nowrap",
  },
  {
    name: "containerQueryResponsive",
    label: "Enable Container Queries",
    type: "toggle",
    defaultValue: true,
  },
];

function FrameCell({
  className,
  style,
  innerClassName,
}: {
  className?: string;
  style?: CSSProperties;
  innerClassName?: string;
}) {
  return (
    <Frame
      pathStroke="dashed"
      className={cn("shrink-0", className)}
      style={{ ...BASE_CELL_STYLE, ...style }}
    >
      <div
        className={cn(innerClassName)}
      />
    </Frame>
  );
}

function getDirection(value: unknown): FlexDirection {
  return value === "column" ? "column" : "row";
}

function getJustify(value: unknown): FlexJustify {
  if (
    value === "center"
    || value === "flex-end"
    || value === "space-between"
    || value === "space-around"
    || value === "space-evenly"
  ) {
    return value;
  }
  return "flex-start";
}

function getAlign(value: unknown): FlexAlign {
  if (
    value === "flex-start"
    || value === "center"
    || value === "flex-end"
    || value === "baseline"
  ) {
    return value;
  }
  return "stretch";
}

function getGap(value: unknown): FlexGap {
  if (value === "xs" || value === "sm" || value === "lg" || value === "xl") {
    return value;
  }
  return "md";
}

function getWrap(value: unknown): FlexWrap {
  return value === "wrap" ? "wrap" : "nowrap";
}

function renderAxisPreview(props: Record<string, unknown>) {
  const direction = getDirection(props.direction);
  const cellStyles = direction === "column" ? AXIS_COLUMN_STYLES : AXIS_ROW_STYLES;
  const cellInnerClassName =
    direction === "column"
      ? "min-w-[3.5rem] justify-end"
      : "min-h-[2.75rem] items-end";

  return (
    <Flex
      direction={direction}
      justify={getJustify(props.justify)}
      align={getAlign(props.align)}
      gap={getGap(props.gap)}
      wrap={getWrap(props.wrap)}
    >
      {cellStyles.map((style, index) => (
        <FrameCell
          key={`${direction}-${index}`}
          style={style}
          innerClassName={cellInnerClassName}
        />
      ))}
    </Flex>
  );
}

function renderResponsivePreview(props: Record<string, unknown>) {
  return (
    <Flex
      justify={getJustify(props.justify)}
      align="center"
      gap={getGap(props.gap)}
      wrap={getWrap(props.wrap)}
      containerQueryResponsive={Boolean(props.containerQueryResponsive)}
      className="w-full"
    >
      {RESPONSIVE_STYLES.map((style, index) => (
        <FrameCell key={index} style={style} />
      ))}
    </Flex>
  );
}

const wrapPreview = (
  <Flex
    direction="row"
    justify="flex-start"
    align="center"
    gap="md"
    wrap="wrap"
  >
    {WRAP_STYLES.map((style, index) => (
      <FrameCell key={index} style={style} />
    ))}
  </Flex>
);

function renderWrapPreview(props: Record<string, unknown>) {
  return (
    <Flex
      direction={getDirection(props.direction)}
      justify={getJustify(props.justify)}
      align={getAlign(props.align)}
      gap={getGap(props.gap)}
      wrap={getWrap(props.wrap)}
    >
      {WRAP_STYLES.map((style, index) => (
        <FrameCell key={index} style={style} />
      ))}
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "axis-control",
    title: "Axis Control",
    description: "",
    preview: null,
    controls: arrangementControls,
    renderPreview: renderAxisPreview,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "wrap-overflow",
    title: "Wrap Overflow Into Rows",
    description: "",
    preview: wrapPreview,
    controls: arrangementControls,
    renderPreview: renderWrapPreview,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "container-query-reflow",
    title: "Container-Query Reflow",
    description: "",
    preview: null,
    controls: responsiveControls,
    renderPreview: renderResponsivePreview,
    previewLayout: "start",
    resizable: true,
  },
];

export default function FlexExamplesPage() {
  return (
    <DevExampleLayout
      title="Flex Examples"
      description=""
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
