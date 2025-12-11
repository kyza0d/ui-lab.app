import React, { useState, useRef, useEffect } from "react";
import { Flex } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { cn } from "@/lib/utils";
import { RxDragHandleDots2 } from "react-icons/rx";

/**
 * A reusable resizable frame to demonstrate fluid layouts.
 * Centered in the parent, but allows width adjustment.
 */
const ResizableFrame = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [width, setWidth] = useState<number | string>("100%");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.parentElement?.getBoundingClientRect();
      if (!containerRect) return;

      // Calculate width based on mouse position relative to the container's left edge
      const newWidth = e.clientX - containerRef.current.getBoundingClientRect().left;

      // Min width 200px, Max width 100% of parent
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
        className={cn("relative min-h-[150px] border border-dashed border-background-600 rounded bg-background-800/20 transition-all duration-75 ease-out", className)}
      >
        <div className="w-full h-full overflow-hidden p-4">
          {children}
        </div>

        {/* Resize Handle */}
        <div
          onMouseDown={startDrag}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-background-700 border border-background-600 rounded-full flex items-center justify-center cursor-ew-resize hover:bg-accent-600 hover:text-white transition-colors z-20 shadow-lg -mr-3"
          title="Drag to resize"
        >
          <RxDragHandleDots2 className="text-current rotate-90" />
        </div>

        {/* Size Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-foreground-500 font-mono">
          {typeof width === 'number' ? `${Math.round(width)}px` : '100%'}
        </div>
      </div>
    </div>
  );
};

/**
 * Visual helper for Flex items
 */
const Box = ({
  children,
  className,
  h = "h-16",
  w = "w-20"
}: {
  children?: React.ReactNode;
  className?: string;
  h?: string;
  w?: string
}) => (
  <div className={cn(
    "bg-accent-500/10 border border-accent-500/30 rounded flex items-center justify-center text-accent-200 text-sm font-medium shadow-sm",
    h, w, className
  )}>
    {children}
  </div>
);

const flexControls: ControlDef[] = [
  {
    name: "direction",
    label: "Direction",
    type: "select",
    options: [
      { label: "Row", value: "row" },
      { label: "Column", value: "column" },
    ],
    defaultValue: "row",
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
    name: "justify",
    label: "Justify Content",
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
    label: "Align Items",
    type: "select",
    options: [
      { label: "Flex Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "Flex End", value: "flex-end" },
      { label: "Stretch", value: "stretch" },
      { label: "Baseline", value: "baseline" },
    ],
    defaultValue: "stretch",
  },
  {
    name: "wrap",
    label: "Wrap",
    type: "select",
    options: [
      { label: "Wrap", value: "wrap" },
      { label: "No Wrap", value: "nowrap" },
    ],
    defaultValue: "nowrap",
  },
];

const flexBasicCode = `import { Flex } from "ui-lab-components";

export function Example() {
  return (
    <Flex gap="md">
      <div className="h-16 w-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">1</div>
      <div className="h-16 w-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">2</div>
      <div className="h-16 w-20 bg-accent-500/20 rounded border border-accent-500/50 flex items-center justify-center">3</div>
    </Flex>
  );
}`;

const flexDirectionCode = `import { Flex } from "ui-lab-components";

export function Example() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="text-sm text-foreground-400 mb-2">Row</p>
        <Flex direction="row" gap="sm">
          <div className="p-4 bg-accent-500/20 rounded">1</div>
          <div className="p-4 bg-accent-500/20 rounded">2</div>
          <div className="p-4 bg-accent-500/20 rounded">3</div>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Column</p>
        <Flex direction="column" gap="sm">
          <div className="p-4 bg-accent-500/20 rounded">1</div>
          <div className="p-4 bg-accent-500/20 rounded">2</div>
          <div className="p-4 bg-accent-500/20 rounded">3</div>
        </Flex>
      </div>
    </div>
  );
}`;

const flexJustifyCode = `import { Flex } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4 w-full">
      {/* Container needs width to show justification */}
      <Flex justify="center" gap="md" className="bg-background-800/50 p-2 rounded w-full">
        <div className="p-2 bg-accent-500/20 rounded">Center</div>
        <div className="p-2 bg-accent-500/20 rounded">Center</div>
      </Flex>

      <Flex justify="space-between" gap="md" className="bg-background-800/50 p-2 rounded w-full">
        <div className="p-2 bg-accent-500/20 rounded">Between</div>
        <div className="p-2 bg-accent-500/20 rounded">Between</div>
      </Flex>
      
       <Flex justify="space-evenly" gap="md" className="bg-background-800/50 p-2 rounded w-full">
        <div className="p-2 bg-accent-500/20 rounded">Evenly</div>
        <div className="p-2 bg-accent-500/20 rounded">Evenly</div>
      </Flex>
    </div>
  );
}`;

const flexAlignCode = `import { Flex } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      {/* Container needs height to show alignment */}
      <Flex align="center" gap="md" className="h-32 bg-background-800/50 rounded w-full">
        <div className="h-10 px-4 bg-accent-500/20 flex items-center rounded">Short</div>
        <div className="h-20 px-4 bg-accent-500/20 flex items-center rounded">Tall</div>
        <div className="h-14 px-4 bg-accent-500/20 flex items-center rounded">Medium</div>
      </Flex>
      
      <Flex align="stretch" gap="md" className="h-32 bg-background-800/50 rounded w-full">
        <div className="px-4 bg-accent-500/20 flex items-center rounded">Stretch</div>
        <div className="px-4 bg-accent-500/20 flex items-center rounded">Stretch</div>
      </Flex>
    </div>
  );
}`;

const flexWrapCode = `import { Flex } from "ui-lab-components";

export function Example() {
  // Resize the container to see wrapping effect
  return (
    <Flex wrap="wrap" gap="md">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="px-4 py-2 bg-accent-500/20 rounded border border-accent-500/30">
          Item {i + 1}
        </div>
      ))}
    </Flex>
  );
}`;

const flexResponsiveCode = `import { Flex } from "ui-lab-components";

export function Example() {
  // This flex container changes gap and direction based on its own width
  return (
    <Flex
      containerQueryResponsive
      className="w-full bg-background-800/30 p-4 rounded"
    >
      <div className="h-20 flex-1 min-w-[100px] bg-accent-500/20 rounded flex items-center justify-center">A</div>
      <div className="h-20 flex-1 min-w-[100px] bg-accent-500/20 rounded flex items-center justify-center">B</div>
      <div className="h-20 flex-1 min-w-[100px] bg-accent-500/20 rounded flex items-center justify-center">C</div>
    </Flex>
  );
}`;

export const flexDetail: ComponentDetail = {
  id: "flex",
  name: "Flex",
  description: "A flexible layout component for building responsive layouts. It abstracts standard CSS Flexbox properties and includes container-query based responsiveness.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Flex component provides a convenient way to apply flexbox layout patterns. Unlike standard CSS classes, this component enforces consistency via the design system's spacing scale (gap) and simplifies responsive behavior.
      </p>
      <p>
        Use the <strong>Interactive Preview</strong> below to adjust the wrapper size and see how content flows, wraps, and aligns dynamically.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Interactive Playground",
      description: "Experiment with all flex properties. Drag the handle on the right to test responsiveness.",
      code: flexBasicCode,
      previewLayout: "center",
      // We render a resizable frame around the component to show true fluid behavior
      renderPreview: (props: any) => (
        <ResizableFrame className="min-h-[250px]">
          <Flex
            direction={props.direction}
            gap={props.gap}
            justify={props.justify}
            align={props.align}
            wrap={props.wrap}
            className="w-full h-full"
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            {props.wrap === 'wrap' && (
              <>
                <Box>4</Box>
                <Box>5</Box>
                <Box>6</Box>
              </>
            )}
          </Flex>
        </ResizableFrame>
      ),
      controls: flexControls,
      preview: null // Using renderPreview instead
    },
    {
      id: "direction",
      title: "Direction",
      description: "Easily switch between row and column layouts.",
      code: flexDirectionCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame className="min-h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-foreground-500">Row</span>
              <Flex direction="row" gap="sm" className="bg-background-900/50 p-4 rounded border border-background-800">
                <Box w="w-12" h="h-12">1</Box>
                <Box w="w-12" h="h-12">2</Box>
                <Box w="w-12" h="h-12">3</Box>
              </Flex>
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-foreground-500">Column</span>
              <Flex direction="column" gap="sm" className="bg-background-900/50 p-4 rounded border border-background-800">
                <Box w="w-full" h="h-12">1</Box>
                <Box w="w-full" h="h-12">2</Box>
                <Box w="w-full" h="h-12">3</Box>
              </Flex>
            </div>
          </div>
        </ResizableFrame>
      ),
    },
    {
      id: "justify",
      title: "Justify Content",
      description: "Controls how space is distributed along the main axis. Useful for navbars and footers.",
      code: flexJustifyCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame>
          <div className="space-y-6 w-full">
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Center</span>
              <Flex justify="center" gap="md" className="bg-background-900/50 p-2 h-14 rounded border border-background-800">
                <Box h="h-10" w="w-24">Center</Box>
                <Box h="h-10" w="w-24">Center</Box>
              </Flex>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Space Between</span>
              <Flex justify="space-between" gap="md" className="bg-background-900/50 p-2 h-14 rounded border border-background-800">
                <Box h="h-10" w="w-24">Start</Box>
                <Box h="h-10" w="w-24">End</Box>
              </Flex>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Space Evenly</span>
              <Flex justify="space-evenly" gap="md" className="bg-background-900/50 p-2 h-14 rounded border border-background-800">
                <Box h="h-10" w="w-16">1</Box>
                <Box h="h-10" w="w-16">2</Box>
                <Box h="h-10" w="w-16">3</Box>
              </Flex>
            </div>
          </div>
        </ResizableFrame>
      ),
    },
    {
      id: "align",
      title: "Align Items",
      description: "Controls alignment along the cross axis. Notice how 'Stretch' fills the height.",
      code: flexAlignCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame>
          <div className="space-y-6 w-full">
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Center</span>
              <Flex align="center" gap="md" className="h-32 bg-background-900/50 rounded border border-background-800">
                <Box h="h-10" w="w-20">Short</Box>
                <Box h="h-24" w="w-20">Tall</Box>
                <Box h="h-14" w="w-20">Mid</Box>
              </Flex>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-foreground-500">Stretch (Default)</span>
              <Flex align="stretch" gap="md" className="h-32 bg-background-900/50 rounded border border-background-800">
                <Box h="h-auto" w="w-20">Auto</Box>
                <Box h="h-auto" w="w-20">Auto</Box>
                <Box h="h-auto" w="w-20">Auto</Box>
              </Flex>
            </div>
          </div>
        </ResizableFrame>
      ),
    },
    {
      id: "wrap",
      title: "Wrapping",
      description: "Controls whether items should wrap to the next line when they run out of space. Drag the handle to see it in action.",
      code: flexWrapCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame className="min-h-[200px]">
          <Flex wrap="wrap" gap="md">
            {Array.from({ length: 14 }).map((_, i) => (
              <Box key={i} h="h-10" w="min-w-[80px] flex-1">Item {i + 1}</Box>
            ))}
          </Flex>
        </ResizableFrame>
      ),
    },
    {
      id: "responsive-logic",
      title: "Container Queries",
      description: "The 'containerQueryResponsive' prop automatically adjusts gap, direction, and wrapping based on the container size, not the screen size.",
      code: flexResponsiveCode,
      previewLayout: "center",
      preview: (
        <ResizableFrame>
          <div className="text-xs text-center mb-4 text-foreground-500">
            Drag handle to &lt; 400px to switch to Column layout
          </div>
          <Flex containerQueryResponsive className="bg-background-900/50 p-4 border border-background-800 rounded">
            <div className="h-24 flex-1 min-w-[120px] bg-emerald-500/20 border border-emerald-500/40 rounded flex flex-col items-center justify-center p-2 text-center">
              <span className="text-emerald-200 font-bold">Content A</span>
              <span className="text-xs text-emerald-400/70">Resizes</span>
            </div>
            <div className="h-24 flex-1 min-w-[120px] bg-blue-500/20 border border-blue-500/40 rounded flex flex-col items-center justify-center p-2 text-center">
              <span className="text-blue-200 font-bold">Content B</span>
              <span className="text-xs text-blue-400/70">Resizes</span>
            </div>
            <div className="h-24 flex-1 min-w-[120px] bg-purple-500/20 border border-purple-500/40 rounded flex flex-col items-center justify-center p-2 text-center">
              <span className="text-purple-200 font-bold">Content C</span>
              <span className="text-xs text-purple-400/70">Resizes</span>
            </div>
          </Flex>
        </ResizableFrame>
      ),
    }
  ],
};
