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

const gridControls = [
  { name: "columns", label: "Columns", type: "select" as const, options: [{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6", value: "6" }, { label: "Auto Fit", value: "auto-fit" }], defaultValue: "3" },
  { name: "gap", label: "Gap", type: "select" as const, options: [{ label: "XS", value: "xs" }, { label: "SM", value: "sm" }, { label: "MD", value: "md" }, { label: "LG", value: "lg" }, { label: "XL", value: "xl" }], defaultValue: "md" },
];

const examples: DevExample[] = [
  {
    id: "interactive",
    title: "Interactive Grid",
    description: "Adjust properties to see how they affect the container.",
    code: `<Grid columns="3" gap="md">
  {items.map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</Grid>`,
    preview: <InteractivePreview columns="3" gap="md" />,
    controls: gridControls,
    renderPreview: InteractivePreview,
    previewLayout: "start",
  },
  {
    id: "columns",
    title: "Column Counts",
    description: "Fixed column layouts from 1 to 6 columns.",
    code: `<Grid columns="2">...</Grid>
<Grid columns="3">...</Grid>
<Grid columns="4">...</Grid>`,
    preview: <ColumnsPreview />,
    previewLayout: "start",
  },
  {
    id: "span",
    title: "Spanning Cells",
    description: "Items can span multiple columns.",
    code: `<Grid columns="4" gap="md">
  <div style={{ gridColumn: "span 2" }}>Span 2</div>
  <div>1</div>
  <div>1</div>
  <div style={{ gridColumn: "span 3" }}>Span 3</div>
  <div style={{ gridColumn: "span 4" }}>Full width</div>
</Grid>`,
    preview: <SpanPreview />,
    previewLayout: "start",
  },
  {
    id: "gap",
    title: "Gap Sizes",
    description: "Spacing between grid cells.",
    code: `<Grid columns="4" gap="xs">...</Grid>
<Grid columns="4" gap="md">...</Grid>
<Grid columns="4" gap="xl">...</Grid>`,
    preview: <GapPreview />,
    previewLayout: "start",
  },
  {
    id: "autofit",
    title: "Auto-Fit",
    description: "Columns adjust automatically based on available width.",
    code: `<Grid columns="auto-fit" gap="md">
  {items.map((item, i) => (
    <div key={i} className="min-w-28">{item}</div>
  ))}
</Grid>`,
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
