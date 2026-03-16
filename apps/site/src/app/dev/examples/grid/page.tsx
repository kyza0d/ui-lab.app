"use client";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Grid } from "ui-lab-components";
import { cn } from "@/shared";

type GridColumns = "1" | "2" | "3" | "4" | "5" | "6" | "auto-fit" | "auto-fill";
type Gap = "xs" | "sm" | "md" | "lg" | "xl";

const Cell = ({ children, span, className }: { children: React.ReactNode; span?: number; className?: string }) => (
  <div
    className={cn("bg-accent-500/10 border border-accent-500/30 rounded-xs h-16 flex items-center justify-center text-accent-400 text-sm font-medium", className)}
    style={span ? { gridColumn: `span ${span}` } : undefined}
  >
    {children}
  </div>
);

function InteractivePreview(props: Record<string, any>) {
  const columns = (props.columns || "3") as GridColumns;
  const gap = (props.gap || "md") as Gap;

  return (
    <div className="h-100 w-150 border border-background-700 rounded-sm p-4 bg-background-900">
      <Grid columns={columns} gap={gap}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Cell key={i}>{i + 1}</Cell>
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
