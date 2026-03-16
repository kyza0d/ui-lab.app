"use client";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Flex } from "ui-lab-components";
import { cn } from "@/shared";

type FlexDirection = "row" | "column";
type FlexJustify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
type FlexAlign = "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
type Gap = "xs" | "sm" | "md" | "lg" | "xl";

const Box = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-accent-500/10 border border-accent-500/30 rounded-xs px-4 py-3 text-accent-400 text-sm font-medium", className)}>
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
    <div className="h-100 w-150 border border-background-700 rounded-sm p-4 bg-background-900">
      <Flex direction={direction} justify={justify} align={align} gap={gap} wrap={wrap} className="h-full min-h-32">
        <Box>A</Box>
        <Box className="h-16">B</Box>
        <Box>C</Box>
        <Box className="px-8">D</Box>
      </Flex>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "interactive",
    title: "Interactive Flex",
    description: "Adjust properties to see how they affect the container.",
    preview: <InteractivePreview direction="row" justify="flex-start" align="stretch" gap="md" wrap="nowrap" />,
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
