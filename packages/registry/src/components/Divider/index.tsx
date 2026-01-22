import React from 'react';
import { Divider } from "ui-lab-components";
import { ControlDef, ComponentDetail } from "@/types";
import Example1, {
  metadata as metadata1,
} from "./examples/01-basic-divider.js";
import Example2, {
  metadata as metadata2,
} from "./examples/02-pattern-variants.js";
import Example3, {
  metadata as metadata3,
} from "./examples/03-vertical-divider.js";
import examplesJson from "./examples.json";
import { loadComponentExamples } from "../../utils/load-component-examples";

export function getPreview(): React.ReactNode {
  return (
    <div className='w-full'>
      <div style={{ width: "30%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-2 mb-2'></div>
      <div style={{ width: "50%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1 mb-2'></div>
      <div style={{ width: "40%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1'></div>
      <Divider variant="solid" size="sm" className='mb-4' />
      <div style={{ width: "30%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-2 mb-2'></div>
      <div style={{ width: "50%", backgroundColor: "var(--background-500)", opacity: 0.2 }} className='rounded-base h-1 mb-2'></div>
    </div>
  );
}

// Define examplesData locally
const examplesData = [
  { id: "01-basic-divider", Component: Example1, metadata: metadata1 },
  { id: "02-pattern-variants", Component: Example2, metadata: metadata2 },
  { id: "03-vertical-divider", Component: Example3, metadata: metadata3 },
];

const dividerControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Solid", value: "solid" },
      { label: "Dashed", value: "dashed" },
      { label: "Dotted", value: "dotted" },
    ],
    defaultValue: "solid",
  },
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    options: [
      { label: "Horizontal", value: "horizontal" },
      { label: "Vertical", value: "vertical" },
    ],
    defaultValue: "horizontal",
  },
];

const basicDividerCode = `import { Divider } from "ui-lab-components";

export function Example() {
  return <Divider />;
}`;

export const dividerDetail: ComponentDetail = {
  id: "divider",
  name: "Divider",
  description:
    "A simple yet flexible divider component for visual content separation",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Divider component is a lightweight utility component used to
        visually separate content sections, groups, or list items. It supports
        both horizontal and vertical orientations with customizable styling
        options.
      </p>
    </div>
  ),
  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: basicDividerCode,
      preview: <Divider />,
      controls: dividerControls,
      renderPreview: (props: any) => (
        <Divider
          variant={props.variant as any}
          orientation={props.orientation as any}
        />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: "solid",
      name: "Solid",
      description: "A solid, continuous line (default variant).",
      code: `<Divider variant="solid" />`,
      preview: <Divider variant="solid" />,
    },
    {
      id: "vertical",
      name: "Vertical",
      description: "A vertical divider for side-by-side content separation.",
      code: `<Divider orientation="vertical" />`,
      preview: (
        <div className="flex gap-4 h-16">
          <div className="flex items-center">Left</div>
          <Divider orientation="vertical" spacing="none" />
          <div className="flex items-center">Right</div>
        </div>
      ),
    },
  ],
};

export { dividerControls };
export * from "./examples";
