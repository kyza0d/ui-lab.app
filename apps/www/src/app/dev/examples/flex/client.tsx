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
  "--frame-fill": "var(--background-900)",
  "--frame-stroke-color": "var(--background-600)",
} as CSSProperties;

type FrameSpec = {
  className?: string;
  style: CSSProperties;
};

const arrangementControlsBase: NonNullable<DevExample["controls"]> = [
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
    name: "frameCount",
    label: "Frames",
    type: "stepper",
    defaultValue: 4,
    min: 4,
    max: 10,
    step: 1,
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

const axisControls: DevExample["controls"] = arrangementControlsBase;

const wrapControls: DevExample["controls"] = arrangementControlsBase.map((control) => (
  control.name === "frameCount"
    ? { ...control, defaultValue: 7, max: 12 }
    : control
));

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
    name: "frameCount",
    label: "Frames",
    type: "stepper",
    defaultValue: 5,
    min: 5,
    max: 10,
    step: 1,
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

function getDirection(value: unknown): FlexDirection {
  return value === "column" ? "column" : "row";
}

function getJustify(value: unknown): FlexJustify {
  if (
    value === "center"
    || value === "end"
    || value === "between"
    || value === "around"
    || value === "evenly"
  ) {
    return value;
  }
  return "start";
}

function getAlign(value: unknown): FlexAlign {
  if (
    value === "start"
    || value === "center"
    || value === "end"
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

function getAxisColumnActionSpecs(frameCount: number) {
  const totalActions = Math.max(frameCount - 2, 1);

  return repeatFrameSpecs(totalActions, [
    { className: "min-w-[4.75rem] flex-1", style: { width: "auto", minWidth: "4.75rem", height: "2.75rem" } },
    { className: "min-w-[5.5rem] flex-1", style: { width: "auto", minWidth: "5.5rem", height: "2.75rem" } },
    { className: "min-w-[4rem] flex-1", style: { width: "auto", minWidth: "4rem", height: "3rem" } },
  ]);
}

function getAxisRowGroups(frameCount: number) {
  const groupCount = Math.max(Math.ceil(frameCount / 4), 1);

  return Array.from({ length: groupCount }, (_, groupIndex) => {
    const remaining = frameCount - groupIndex * 4;
    const itemCount = Math.min(Math.max(remaining, 0), 4);

    return {
      rail: itemCount >= 1,
      canvas: itemCount >= 2,
      actionTop: itemCount >= 3,
      actionBottom: itemCount >= 4,
    };
  });
}

function getToolbarFlowSpecs(direction: FlexDirection, frameCount: number) {
  if (direction === "column") {
    return repeatFrameSpecs(frameCount, [
      { className: "w-full", style: { width: "100%", height: "3.25rem" } },
      { className: "w-full", style: { width: "100%", height: "3rem" } },
      { className: "w-full", style: { width: "100%", height: "3.25rem" } },
      { className: "w-full", style: { width: "100%", height: "2.75rem" } },
    ]);
  }

  return [
    {
      className: "min-w-[12rem]",
      style: { width: "auto", minWidth: "12rem", flex: "1.6 1 14rem", height: "3.25rem" },
    },
    ...repeatFrameSpecs(Math.max(frameCount - 1, 0), [
      { className: "shrink-0", style: { width: "6rem", height: "3.25rem" } },
      { className: "shrink-0", style: { width: "6.75rem", height: "3.25rem" } },
      { className: "shrink-0", style: { width: "5.5rem", height: "3.25rem" } },
      { className: "shrink-0", style: { width: "6.5rem", height: "3.25rem" } },
      { className: "shrink-0", style: { width: "4.5rem", height: "3.25rem" } },
      { className: "shrink-0", style: { width: "5.5rem", height: "3.25rem" } },
    ]),
  ];
}

function getResponsiveDistribution(frameCount: number) {
  let metadataCount = 2;
  let sidebarCount = 1;
  let remainingFrames = Math.max(frameCount - 5, 0);

  while (remainingFrames > 0) {
    metadataCount += 1;
    remainingFrames -= 1;

    if (remainingFrames > 0) {
      sidebarCount += 1;
      remainingFrames -= 1;
    }
  }

  return { metadataCount, sidebarCount };
}

function renderAxisPreview(props: Record<string, unknown>) {
  const direction = getDirection(props.direction);
  const frameCount = getFrameCount(props.frameCount, 4, 10, 4);

  if (direction === "row") {
    const groups = getAxisRowGroups(frameCount);

    return (
      <Flex
        direction="column"
        justify={getJustify(props.justify)}
        align={getAlign(props.align)}
        gap={getGap(props.gap)}
        wrap="nowrap"
        className="w-full"
      >
        {groups.map((group, index) => (
          <Flex
            key={`axis-row-group-${index}`}
            direction="row"
            gap="md"
            align="stretch"
            className="w-full"
          >
            {group.rail && (
              <FrameCell
                className="shrink-0"
                style={{ width: "4.5rem", height: "8.5rem" }}
              />
            )}
            {group.canvas && (
              <FrameCell
                className="min-w-[11rem] flex-1"
                style={{ width: "auto", minWidth: "11rem", flex: "1.4 1 12rem", height: "8.5rem" }}
              />
            )}
            {(group.actionTop || group.actionBottom) && (
              <Flex
                direction="column"
                gap="sm"
                className="w-[5.5rem] shrink-0"
              >
                {group.actionTop && (
                  <FrameCell
                    className="shrink-0"
                    style={{ width: "5.5rem", height: "4.5rem" }}
                  />
                )}
                {group.actionBottom && (
                  <FrameCell
                    className="shrink-0"
                    style={{ width: "5.5rem", height: "3.25rem" }}
                  />
                )}
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
    );
  }

  const actions = getAxisColumnActionSpecs(frameCount);

  return (
    <Flex
      direction="column"
      justify={getJustify(props.justify)}
      align={getAlign(props.align)}
      gap={getGap(props.gap)}
      wrap={getWrap(props.wrap)}
      className="w-full"
    >
      <FrameCell
        className="w-full"
        style={{ width: "100%", height: "2.75rem" }}
      />
      <FrameCell
        className="w-full"
        style={{ width: "100%", height: "8rem" }}
      />
      <Flex
        direction="row"
        wrap="wrap"
        gap="sm"
        className="w-full"
      >
        {actions.map((action, index) => (
          <FrameCell
            key={`column-action-${index}`}
            className={action.className}
            style={action.style}
          />
        ))}
      </Flex>
    </Flex>
  );
}

function renderResponsivePreview(props: Record<string, unknown>) {
  const frameCount = getFrameCount(props.frameCount, 5, 10, 5);
  const { metadataCount, sidebarCount } = getResponsiveDistribution(frameCount);

  return (
    <Flex
      justify={getJustify(props.justify)}
      align="center"
      gap={getGap(props.gap)}
      wrap={getWrap(props.wrap)}
      containerQueryResponsive={Boolean(props.containerQueryResponsive)}
      className="w-full"
    >
      <FrameCell className="shrink-0" style={{ width: "5rem", height: "7rem" }} />
      <Flex direction="column" gap="sm" className="min-w-[14rem] flex-[2_1_15rem]">
        <FrameCell style={{ width: "100%", height: "4.5rem" }} />
        <Flex gap="sm" wrap="wrap" className="w-full">
          {repeatFrameSpecs(metadataCount, [
            { className: "min-w-[4.75rem] flex-1", style: { width: "auto", minWidth: "4.75rem", height: "2rem" } },
            { className: "min-w-[4rem] flex-1", style: { width: "auto", minWidth: "4rem", height: "2rem" } },
            { className: "min-w-[5.25rem] flex-1", style: { width: "auto", minWidth: "5.25rem", height: "2rem" } },
          ]).map((frame, index) => (
            <FrameCell
              key={`responsive-meta-${index}`}
              className={frame.className}
              style={frame.style}
            />
          ))}
        </Flex>
      </Flex>
      <Flex direction="column" gap="sm" className="min-w-[10rem] flex-1">
        {repeatFrameSpecs(sidebarCount, [
          { className: "w-full", style: { width: "100%", height: "7rem" } },
          { className: "w-full", style: { width: "100%", height: "3rem" } },
          { className: "w-full", style: { width: "100%", height: "2.5rem" } },
        ]).map((frame, index) => (
          <FrameCell
            key={`responsive-sidebar-${index}`}
            className={frame.className}
            style={frame.style}
          />
        ))}
      </Flex>
    </Flex>
  );
}

function renderWrapPreview(props: Record<string, unknown>) {
  const direction = getDirection(props.direction);
  const frameCount = getFrameCount(props.frameCount, 4, 12, 7);

  return (
    <Flex
      direction={direction}
      justify={getJustify(props.justify)}
      align={getAlign(props.align)}
      gap={getGap(props.gap)}
      wrap={getWrap(props.wrap)}
      className="w-full"
    >
      {getToolbarFlowSpecs(direction, frameCount).map((frame, index) => (
        <FrameCell
          key={`${direction}-toolbar-${index}`}
          className={frame.className}
          style={frame.style}
        />
      ))}
    </Flex>
  );
}

const wrapPreview = renderWrapPreview({
  direction: "row",
  justify: "flex-start",
  align: "center",
  gap: "md",
  frameCount: 7,
  wrap: "wrap",
});

const examples: DevExample[] = [
  {
    id: "axis-control",
    title: "Axis Control",
    description: "",
    preview: null,
    controls: axisControls,
    renderPreview: renderAxisPreview,
    previewLayout: "start",
    resizable: true,
  },
  {
    id: "wrap-overflow",
    title: "Wrap Overflow Into Rows",
    description: "",
    preview: wrapPreview,
    controls: wrapControls,
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
