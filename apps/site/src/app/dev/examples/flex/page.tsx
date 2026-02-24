"use client";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Flex } from "ui-lab-components";
import { cn } from "@/shared";

type FlexDirection = "row" | "column";
type FlexJustify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
type FlexAlign = "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
type Gap = "xs" | "sm" | "md" | "lg" | "xl";

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-accent-500/10 border border-accent-500/30 rounded px-4 py-3 text-accent-400 text-sm font-medium", className)}>
    {children}
  </div>
);

function InteractivePreview(props: Record<string, any>) {
  const direction = (props.direction || "row") as FlexDirection;
  const justify = (props.justify || "flex-start") as FlexJustify;
  const align = (props.align || "stretch") as FlexAlign;
  const gap = (props.gap || "md") as Gap;
  const wrap = (props.wrap || "nowrap") as "wrap" | "nowrap";

  return (
    <div className="w-full min-h-40 border border-background-700 rounded-lg p-4 bg-background-900">
      <Flex direction={direction} justify={justify} align={align} gap={gap} wrap={wrap} className="h-full min-h-32">
        <Box>A</Box>
        <Box className="h-16">B</Box>
        <Box>C</Box>
        <Box className="px-8">D</Box>
      </Flex>
    </div>
  );
}

function DirectionPreview() {
  return (
    <div className="flex gap-8">
      <div>
        <p className="text-xs text-foreground-400 mb-2">Row</p>
        <Flex direction="row" gap="sm">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">Column</p>
        <Flex direction="column" gap="sm">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </Flex>
      </div>
    </div>
  );
}

function JustifyPreview() {
  return (
    <div className="space-y-4 w-full">
      <div>
        <p className="text-xs text-foreground-400 mb-2">flex-start</p>
        <Flex justify="flex-start" gap="sm" className="border border-background-700 rounded p-3">
          <Box>A</Box><Box>B</Box><Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">center</p>
        <Flex justify="center" gap="sm" className="border border-background-700 rounded p-3">
          <Box>A</Box><Box>B</Box><Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">space-between</p>
        <Flex justify="space-between" gap="sm" className="border border-background-700 rounded p-3">
          <Box>A</Box><Box>B</Box><Box>C</Box>
        </Flex>
      </div>
    </div>
  );
}

function AlignPreview() {
  return (
    <div className="space-y-4 w-full">
      <div>
        <p className="text-xs text-foreground-400 mb-2">flex-start</p>
        <Flex align="flex-start" gap="sm" className="border border-background-700 rounded p-3 h-24">
          <Box>A</Box><Box className="h-12">B</Box><Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">center</p>
        <Flex align="center" gap="sm" className="border border-background-700 rounded p-3 h-24">
          <Box>A</Box><Box className="h-12">B</Box><Box>C</Box>
        </Flex>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">stretch</p>
        <Flex align="stretch" gap="sm" className="border border-background-700 rounded p-3 h-24">
          <Box>A</Box><Box>B</Box><Box>C</Box>
        </Flex>
      </div>
    </div>
  );
}

function GapPreview() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-foreground-400 mb-2">gap="xs"</p>
        <Flex gap="xs"><Box>A</Box><Box>B</Box><Box>C</Box></Flex>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">gap="md"</p>
        <Flex gap="md"><Box>A</Box><Box>B</Box><Box>C</Box></Flex>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">gap="xl"</p>
        <Flex gap="xl"><Box>A</Box><Box>B</Box><Box>C</Box></Flex>
      </div>
    </div>
  );
}

const flexControls = [
  { name: "direction", label: "Direction", type: "select" as const, options: [{ label: "Row", value: "row" }, { label: "Column", value: "column" }], defaultValue: "row" },
  { name: "justify", label: "Justify", type: "select" as const, options: [{ label: "Start", value: "flex-start" }, { label: "Center", value: "center" }, { label: "End", value: "flex-end" }, { label: "Space Between", value: "space-between" }, { label: "Space Evenly", value: "space-evenly" }], defaultValue: "flex-start" },
  { name: "align", label: "Align", type: "select" as const, options: [{ label: "Start", value: "flex-start" }, { label: "Center", value: "center" }, { label: "End", value: "flex-end" }, { label: "Stretch", value: "stretch" }], defaultValue: "stretch" },
  { name: "gap", label: "Gap", type: "select" as const, options: [{ label: "XS", value: "xs" }, { label: "SM", value: "sm" }, { label: "MD", value: "md" }, { label: "LG", value: "lg" }, { label: "XL", value: "xl" }], defaultValue: "md" },
  { name: "wrap", label: "Wrap", type: "select" as const, options: [{ label: "No Wrap", value: "nowrap" }, { label: "Wrap", value: "wrap" }], defaultValue: "nowrap" },
];

const examples: DevExample[] = [
  {
    id: "interactive",
    title: "Interactive Flex",
    description: "Adjust properties to see how they affect the container.",
    code: `<Flex direction="row" justify="flex-start" align="stretch" gap="md">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</Flex>`,
    preview: <InteractivePreview direction="row" justify="flex-start" align="stretch" gap="md" wrap="nowrap" />,
    controls: flexControls,
    renderPreview: InteractivePreview,
    previewLayout: "start",
  },
  {
    id: "direction",
    title: "Direction",
    description: "Row arranges items horizontally, column stacks them vertically.",
    code: `<Flex direction="row" gap="sm">...</Flex>
<Flex direction="column" gap="sm">...</Flex>`,
    preview: <DirectionPreview />,
    previewLayout: "start",
  },
  {
    id: "justify",
    title: "Justify Content",
    description: "Controls distribution along the main axis.",
    code: `<Flex justify="flex-start">...</Flex>
<Flex justify="center">...</Flex>
<Flex justify="space-between">...</Flex>`,
    preview: <JustifyPreview />,
    previewLayout: "start",
  },
  {
    id: "align",
    title: "Align Items",
    description: "Controls alignment along the cross axis.",
    code: `<Flex align="flex-start">...</Flex>
<Flex align="center">...</Flex>
<Flex align="stretch">...</Flex>`,
    preview: <AlignPreview />,
    previewLayout: "start",
  },
  {
    id: "gap",
    title: "Gap Sizes",
    description: "Spacing between flex items.",
    code: `<Flex gap="xs">...</Flex>
<Flex gap="md">...</Flex>
<Flex gap="xl">...</Flex>`,
    preview: <GapPreview />,
    previewLayout: "start",
  },
];

export default function FlexExamplesPage() {
  return (
    <DevExampleLayout
      title="Flex Examples"
      description="Flexbox container properties and configurations."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
