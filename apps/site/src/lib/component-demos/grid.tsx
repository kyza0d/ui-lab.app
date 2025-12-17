import React, { useState, useRef, useEffect } from "react";
import { Grid } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { cn } from "@/lib/utils";
import { RxDragHandleDots2 } from "react-icons/rx";

const ResizableFrame = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [width, setWidth] = useState<number | string>("100%");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.parentElement?.getBoundingClientRect();
      if (!containerRect) return;

      const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;

      const maxWidth = containerRef.current.parentElement?.clientWidth || 800;
      const clampedWidth = Math.max(200, Math.min(newWidth, maxWidth));

      setWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div className="w-full flex justify-center py-4">
      <div
        ref={containerRef}
        style={{ width }}
        className={cn("relative min-h-[150px] border border-dashed border-background-600 rounded bg-background-800/20", className)}
      >
        <div className="w-full h-full overflow-hidden p-4">
          {children}
        </div>

        <div
          onMouseDown={startDrag}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-background-700 border border-background-600 rounded-full flex items-center justify-center cursor-ew-resize hover:bg-background-600 hover:border-background-500 hover:text-foreground-50 transition-colors z-20 shadow-lg -mr-3"
          title="Drag to resize"
        >
          <RxDragHandleDots2 className="text-current rotate-90" />
        </div>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-foreground-500 font-mono">
          {typeof width === 'number' ? `${Math.round(width)}px` : '100%'}
        </div>
      </div>
    </div>
  );
};

const GridCell = ({
  children,
  className,
  h = "h-20",
}: {
  children?: React.ReactNode;
  className?: string;
  h?: string;
}) => (
  <div className={cn(
    "bg-accent-500/10 border border-accent-500/10 rounded flex items-center justify-center text-accent-500 text-sm font-medium shadow-sm",
    h, className
  )}
  >
    {children}
  </div>
);

const gridControls: ControlDef[] = [
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
    label: "Gap",
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
    label: "Justify Items",
    type: "select",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Stretch", value: "stretch" },
    ],
    defaultValue: "stretch",
  },
  {
    name: "alignItems",
    label: "Align Items",
    type: "select",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Stretch", value: "stretch" },
      { label: "Baseline", value: "baseline" },
    ],
    defaultValue: "stretch",
  },
  {
    name: "autoFlow",
    label: "Auto Flow",
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

const gridBasicCode = `import { Grid } from "ui-lab-components";

export function Example() {
  return (
    <Grid columns="3" gap="md">
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">1</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">2</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">3</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">4</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">5</div>
      <div className="h-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">6</div>
    </Grid>
  );
}`;

const gridColumnsCode = `import { Grid } from "ui-lab-components";

export function Example() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div>
        <p className="text-sm text-foreground-400 mb-2">2 Columns</p>
        <Grid columns="2" gap="sm">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 p-4 bg-accent-500/20 rounded flex items-center justify-center">{i + 1}</div>
          ))}
        </Grid>
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">3 Columns</p>
        <Grid columns="3" gap="sm">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 p-4 bg-accent-500/20 rounded flex items-center justify-center">{i + 1}</div>
          ))}
        </Grid>
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">4 Columns</p>
        <Grid columns="4" gap="sm">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 p-4 bg-accent-500/20 rounded flex items-center justify-center">{i + 1}</div>
          ))}
        </Grid>
      </div>
    </div>
  );
}`;

const gridAutoFitCode = `import { Grid } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-foreground-400 mb-3">Auto-Fit (collapses empty tracks)</p>
        <Grid columns="auto-fit" gap="md">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 p-4 bg-accent-500/20 rounded flex items-center justify-center">Item {i + 1}</div>
          ))}
        </Grid>
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-3">Auto-Fill (maintains empty tracks)</p>
        <Grid columns="auto-fill" gap="md">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 p-4 bg-accent-500/20 rounded flex items-center justify-center">Item {i + 1}</div>
          ))}
        </Grid>
      </div>
    </div>
  );
}`;

const gridGapCode = `import { Grid } from "ui-lab-components";

export function Example() {
  const gaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  return (
    <div className="space-y-6">
      {gaps.map(gap => (
        <div key={gap}>
          <p className="text-sm text-foreground-400 mb-2">Gap: {gap}</p>
          <Grid columns="3" gap={gap}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 p-4 bg-accent-500/20 rounded flex items-center justify-center">{i + 1}</div>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}`;

const gridAlignmentCode = `import { Grid } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-foreground-400 mb-3">Justify Items: Center</p>
        <Grid columns="3" gap="md" justifyItems="center" className="bg-background-900/50 p-4 rounded">
          <div className="h-16 w-16 bg-accent-500/20 rounded flex items-center justify-center">1</div>
          <div className="h-16 w-16 bg-accent-500/20 rounded flex items-center justify-center">2</div>
          <div className="h-16 w-16 bg-accent-500/20 rounded flex items-center justify-center">3</div>
        </Grid>
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-3">Align Items: Center</p>
        <Grid columns="3" gap="md" alignItems="center" className="bg-background-900/50 p-4 rounded h-32">
          <div className="h-10 bg-accent-500/20 rounded flex items-center justify-center">Short</div>
          <div className="h-24 bg-accent-500/20 rounded flex items-center justify-center">Tall</div>
          <div className="h-14 bg-accent-500/20 rounded flex items-center justify-center">Mid</div>
        </Grid>
      </div>
    </div>
  );
}`;

const gridDenseCode = `import { Grid } from "ui-lab-components";

export function Example() {
  return (
    <Grid columns="4" gap="md" autoFlow="row-dense" className="bg-background-500/50 p-4 rounded">
      <div className="h-20 bg-accent-500/20 rounded flex items-center justify-center col-span-2">1</div>
      <div className="h-20 bg-accent-500/20 rounded flex items-center justify-center">2</div>
      <div className="h-20 bg-accent-500/20 rounded flex items-center justify-center">3</div>
      <div className="h-20 bg-accent-500/20 rounded flex items-center justify-center">4</div>
      <div className="h-20 bg-accent-500/20 rounded flex items-center justify-center row-span-2">5</div>
      <div className="h-20 bg-accent-500/20 rounded flex items-center justify-center">6</div>
      <div className="h-20 bg-accent-500/20 rounded flex items-center justify-center">7</div>
    </Grid>
  );
}`;

const gridResponsiveCode = `import { Grid } from "ui-lab-components";

export function Example() {
  // This grid automatically adjusts columns based on its own width
  return (
    <Grid
      columns="3"
      gap="md"
      containerQueryResponsive
      className="w-full bg-background-800/30 p-4 rounded"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="h-20 bg-accent-500/20 rounded flex items-center justify-center">
          {i + 1}
        </div>
      ))}
    </Grid>
  );
}`;

const gridGalleryCode = `import { Grid } from "ui-lab-components";

export function Example() {
  return (
    <Grid columns="auto-fit" gap="md">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="aspect-square bg-accent-500/20 rounded flex items-center justify-center text-accent-200 font-medium">
          Image {i + 1}
        </div>
      ))}
    </Grid>
  );
}`;

export const gridDetail: ComponentDetail = {
  id: "grid",
  name: "Grid",
  description: "A powerful grid layout component for building responsive grid layouts. It abstracts standard CSS Grid properties and includes container-query based responsiveness.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Grid component provides a convenient way to apply CSS Grid layout patterns. Unlike standard CSS classes, this component enforces consistency via the design system's spacing scale and simplifies responsive behavior through container queries.
      </p>
      <p>
        Use the <strong>Interactive Preview</strong> below to adjust the wrapper size and see how the grid automatically responds to container width changes.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Interactive Playground",
      description: "Experiment with all grid properties. Drag the handle on the right to test responsiveness.",
      code: gridBasicCode,
      previewLayout: "center",
      renderPreview: (props: any) => (
        <ResizableFrame className="min-h-[250px]">
          <Grid
            columns={props.columns}
            gap={props.gap}
            justifyItems={props.justifyItems}
            alignItems={props.alignItems}
            autoFlow={props.autoFlow}
            className="w-full"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <GridCell key={i}>{i + 1}</GridCell>
            ))}
          </Grid>
        </ResizableFrame>
      ),
      controls: gridControls,
      preview: null,
    },
    {
      id: "columns",
      title: "Column Configurations",
      description: "Compare different column counts from 2 to 4 columns.",
      code: gridColumnsCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame className="min-h-[350px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-foreground-500">2 Columns</span>
              <Grid columns="2" gap="sm" className="bg-background-900/50 p-4 rounded border border-background-800">
                {Array.from({ length: 4 }).map((_, i) => (
                  <GridCell key={i} h="h-16">{i + 1}</GridCell>
                ))}
              </Grid>
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-foreground-500">3 Columns</span>
              <Grid columns="3" gap="sm" className="bg-background-900/50 p-4 rounded border border-background-800">
                {Array.from({ length: 6 }).map((_, i) => (
                  <GridCell key={i} h="h-16">{i + 1}</GridCell>
                ))}
              </Grid>
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-foreground-500">4 Columns</span>
              <Grid columns="4" gap="sm" className="bg-background-900/50 p-4 rounded border border-background-800">
                {Array.from({ length: 8 }).map((_, i) => (
                  <GridCell key={i} h="h-16">{i + 1}</GridCell>
                ))}
              </Grid>
            </div>
          </div>
        </ResizableFrame>
      ),
    },
    {
      id: "auto-fit-fill",
      title: "Auto-Fit vs Auto-Fill",
      description: "Auto-fit collapses empty tracks while auto-fill maintains them. Drag to resize and see the difference.",
      code: gridAutoFitCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame className="min-h-[350px]">
          <div className="space-y-6 w-full">
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Auto-Fit (Empty tracks collapse)</span>
              <Grid columns="auto-fit" gap="md" className="bg-background-900/50 p-4 rounded border border-background-800">
                {Array.from({ length: 6 }).map((_, i) => (
                  <GridCell key={i} h="h-20">{i + 1}</GridCell>
                ))}
              </Grid>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Auto-Fill (Empty tracks maintained)</span>
              <Grid columns="auto-fill" gap="md" className="bg-background-900/50 p-4 rounded border border-background-800">
                {Array.from({ length: 3 }).map((_, i) => (
                  <GridCell key={i} h="h-20">{i + 1}</GridCell>
                ))}
              </Grid>
            </div>
          </div>
        </ResizableFrame>
      ),
    },
    {
      id: "gaps",
      title: "Gap Variations",
      description: "Visual comparison of different gap sizes from xs to xl.",
      code: gridGapCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame className="min-h-[400px]">
          <div className="space-y-6 w-full">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(gap => (
              <div key={gap} className="space-y-2">
                <span className="text-xs text-foreground-500">Gap: {gap}</span>
                <Grid columns="3" gap={gap} className="bg-background-900/50 p-4 rounded border border-background-800">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <GridCell key={i} h="h-14">{i + 1}</GridCell>
                  ))}
                </Grid>
              </div>
            ))}
          </div>
        </ResizableFrame>
      ),
    },
    {
      id: "alignment",
      title: "Alignment Options",
      description: "Control item alignment with justify-items and align-items properties.",
      code: gridAlignmentCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame>
          <div className="space-y-6 w-full">
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Justify Items: Center</span>
              <Grid columns="3" gap="md" justifyItems="center" className="bg-background-900/50 p-4 rounded border border-background-800">
                <GridCell h="h-16">1</GridCell>
                <GridCell h="h-16">2</GridCell>
                <GridCell h="h-16">3</GridCell>
              </Grid>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Align Items: Center (with varying heights)</span>
              <Grid columns="3" gap="md" alignItems="center" className="bg-background-900/50 p-4 rounded border border-background-800 h-40">
                <GridCell h="h-10">Short</GridCell>
                <GridCell h="h-24">Tall</GridCell>
                <GridCell h="h-14">Mid</GridCell>
              </Grid>
            </div>
          </div>
        </ResizableFrame>
      ),
    },
    {
      id: "dense-packing",
      title: "Dense Packing",
      description: "Use auto-flow with dense packing to fill gaps in the grid layout.",
      code: gridDenseCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame>
          <Grid columns="4" gap="md" autoFlow="row-dense" className="bg-background-900/50 p-4 rounded border border-background-800">
            <div className="col-span-2 h-20 bg-accent-500/20 rounded flex items-center justify-center font-medium">1 (span 2)</div>
            <GridCell h="h-20">2</GridCell>
            <GridCell h="h-20">3</GridCell>
            <GridCell h="h-20">4</GridCell>
            <div className="row-span-2 h-auto bg-accent-500/20 rounded flex items-center justify-center font-medium">5 (span 2)</div>
            <GridCell h="h-20">6</GridCell>
            <GridCell h="h-20">7</GridCell>
          </Grid>
        </ResizableFrame>
      ),
    },
    {
      id: "responsive",
      title: "Container Queries",
      description: "The 'containerQueryResponsive' prop automatically adjusts columns based on the container width, not the screen size.",
      code: gridResponsiveCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame>
          <div className="text-xs text-center mb-4 text-foreground-500">
            Resize the container to see responsive behavior (breakpoints: 400px, 600px, 500px)
          </div>
          <Grid
            columns="3"
            gap="md"
            containerQueryResponsive
            className="w-full"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <GridCell key={i} h="h-20">{i + 1}</GridCell>
            ))}
          </Grid>
        </ResizableFrame>
      ),
    },
    {
      id: "gallery",
      title: "Image Gallery",
      description: "A practical example using auto-fit for a responsive image gallery.",
      code: gridGalleryCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame className="min-h-[350px]">
          <Grid columns="auto-fit" gap="md" className="w-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-accent-500/20 rounded flex items-center justify-center text-accent-200 font-medium border border-accent-500/30"
              >
                Image {i + 1}
              </div>
            ))}
          </Grid>
        </ResizableFrame>
      ),
    },
  ],
};
