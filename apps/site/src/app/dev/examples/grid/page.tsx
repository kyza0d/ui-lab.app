"use client";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Grid } from "ui-lab-components";
import { cn } from "@/shared";

type GridColumns = "1" | "2" | "3" | "4" | "5" | "6" | "auto-fit" | "auto-fill";
type Gap = "xs" | "sm" | "md" | "lg" | "xl";

const Cell = ({ children, span, className }: { children: React.ReactNode; span?: number; className?: string }) => (
  <div
    className={cn("bg-accent-500/10 border border-accent-500/30 rounded h-16 flex items-center justify-center text-accent-400 text-sm font-medium", className)}
    style={span ? { gridColumn: `span ${span}` } : undefined}
  >
    {children}
  </div>
);

function InteractivePreview(props: Record<string, any>) {
  const columns = (props.columns || "3") as GridColumns;
  const gap = (props.gap || "md") as Gap;

  return (
    <div className="w-full border border-background-700 rounded-lg p-4 bg-background-900">
      <Grid columns={columns} gap={gap}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Cell key={i}>{i + 1}</Cell>
        ))}
      </Grid>
    </div>
  );
}

function ColumnsPreview() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <p className="text-xs text-foreground-400 mb-2">columns="2"</p>
        <Grid columns="2" gap="sm">
          <Cell>1</Cell><Cell>2</Cell><Cell>3</Cell><Cell>4</Cell>
        </Grid>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">columns="3"</p>
        <Grid columns="3" gap="sm">
          <Cell>1</Cell><Cell>2</Cell><Cell>3</Cell><Cell>4</Cell><Cell>5</Cell><Cell>6</Cell>
        </Grid>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">columns="4"</p>
        <Grid columns="4" gap="sm">
          <Cell>1</Cell><Cell>2</Cell><Cell>3</Cell><Cell>4</Cell>
        </Grid>
      </div>
    </div>
  );
}

function SpanPreview() {
  return (
    <div className="w-full">
      <Grid columns="4" gap="md">
        <Cell span={2}>span 2</Cell>
        <Cell>1</Cell>
        <Cell>1</Cell>
        <Cell>1</Cell>
        <Cell span={3}>span 3</Cell>
        <Cell span={4}>span 4 (full width)</Cell>
      </Grid>
    </div>
  );
}

function GapPreview() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <p className="text-xs text-foreground-400 mb-2">gap="xs"</p>
        <Grid columns="4" gap="xs">
          <Cell>1</Cell><Cell>2</Cell><Cell>3</Cell><Cell>4</Cell>
        </Grid>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">gap="md"</p>
        <Grid columns="4" gap="md">
          <Cell>1</Cell><Cell>2</Cell><Cell>3</Cell><Cell>4</Cell>
        </Grid>
      </div>
      <div>
        <p className="text-xs text-foreground-400 mb-2">gap="xl"</p>
        <Grid columns="4" gap="xl">
          <Cell>1</Cell><Cell>2</Cell><Cell>3</Cell><Cell>4</Cell>
        </Grid>
      </div>
    </div>
  );
}

function AutoFitPreview() {
  return (
    <div className="w-full">
      <p className="text-xs text-foreground-400 mb-2">columns="auto-fit" (resize to see effect)</p>
      <Grid columns="auto-fit" gap="md">
        {Array.from({ length: 6 }).map((_, i) => (
          <Cell key={i} className="min-w-28">{i + 1}</Cell>
        ))}
      </Grid>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "interactive",
    title: "Interactive Grid",
    description: "Adjust properties to see how they affect the container.",
    preview: <InteractivePreview columns="3" gap="md" />,
    previewLayout: "start",
  },
  {
    id: "columns",
    title: "Column Counts",
    description: "Fixed column layouts from 1 to 6 columns.",
    preview: <ColumnsPreview />,
    previewLayout: "start",
  },
  {
    id: "span",
    title: "Spanning Cells",
    description: "Items can span multiple columns.",
    preview: <SpanPreview />,
    previewLayout: "start",
  },
  {
    id: "gap",
    title: "Gap Sizes",
    description: "Spacing between grid cells.",
    preview: <GapPreview />,
    previewLayout: "start",
  },
  {
    id: "autofit",
    title: "Auto-Fit",
    description: "Columns adjust automatically based on available width.",
    preview: <AutoFitPreview />,
    previewLayout: "start",
  },
];

export default function GridExamplesPage() {
  return (
    <DevExampleLayout
      title="Grid Examples"
      description="CSS Grid container properties and configurations."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
