import { Progress } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

const progressControls: ControlDef[] = [
  {
    name: "size",
    label: "Size",
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    defaultValue: "md",
  },
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Success", value: "success" },
      { label: "Warning", value: "warning" },
      { label: "Error", value: "error" },
    ],
    defaultValue: "default",
  },
  {
    name: "value",
    label: "Value",
    type: "select",
    options: [
      { label: "0%", value: "0" },
      { label: "25%", value: "25" },
      { label: "50%", value: "50" },
      { label: "75%", value: "75" },
      { label: "100%", value: "100" },
    ],
    defaultValue: "50",
  },
  {
    name: "indeterminate",
    label: "Indeterminate",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "showValue",
    label: "Show Value",
    type: "toggle",
    defaultValue: false,
  },
];

const progressBasicCode = `import { Progress } from "ui-lab-components";

export function Example() {
  return <Progress value={60} />;
}`;

const progressSizesCode = `import { Progress } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <Progress size="sm" value={40} />
      <Progress size="md" value={60} />
      <Progress size="lg" value={80} />
    </div>
  );
}`;

const progressVariantsCode = `import { Progress } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <Progress variant="default" value={60} />
      <Progress variant="success" value={100} />
      <Progress variant="warning" value={45} />
      <Progress variant="error" value={20} />
    </div>
  );
}`;

const progressIndeterminateCode = `import { Progress } from "ui-lab-components";

export function Example() {
  return <Progress indeterminate />;
}`;

const progressWithLabelCode = `import { Progress } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-6 w-full max-w-sm">
      <Progress value={75} label="Uploading..." showValue />
      <Progress value={100} label="Complete" variant="success" showValue />
      <Progress indeterminate label="Loading..." />
    </div>
  );
}`;

const progressAnimatedCode = `import { Progress } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <Progress value={50} animated />
      <Progress value={75} variant="success" animated />
    </div>
  );
}`;

export const progressDetail: ComponentDetail = {
  id: "progress",
  name: "Progress",
  description:
    "A horizontal progress bar with configurable value, variants, and sizes. Supports determinate and indeterminate states.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Progress component displays a horizontal bar that fills based on a percentage value. It's ideal for showing loading states, upload progress, completion status, and other metrics.
      </p>
      <p>
        Progress bars support multiple sizes, semantic color variants, and an indeterminate mode for unknown durations. Labels and percentage values can be displayed for additional context.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Progress",
      description: "A simple progress bar with a fixed value.",
      code: progressBasicCode,
      preview: <Progress value={60} />,
      controls: progressControls,
      renderPreview: (props: any) => (
        <Progress
          size={props.size as any}
          variant={props.variant as any}
          value={Number(props.value) || 50}
          indeterminate={props.indeterminate}
          showValue={props.showValue}
        />
      ),
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Three size options for different visual contexts.",
      code: progressSizesCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Progress size="sm" value={40} />
          <Progress size="md" value={60} />
          <Progress size="lg" value={80} />
        </div>
      ),
    },
    {
      id: "variants",
      title: "Variants",
      description: "Semantic color variants for different states.",
      code: progressVariantsCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Progress variant="default" value={60} />
          <Progress variant="success" value={100} />
          <Progress variant="warning" value={45} />
          <Progress variant="error" value={20} />
        </div>
      ),
    },
    {
      id: "with-label",
      title: "With Label",
      description: "Progress bars with labels and percentage values.",
      code: progressWithLabelCode,
      preview: (
        <div className="space-y-6 w-full max-w-sm">
          <Progress value={75} label="Uploading..." showValue />
          <Progress value={100} label="Complete" variant="success" showValue />
          <Progress indeterminate label="Loading..." />
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard progress bar with primary color.",
      code: `<Progress value={60} />`,
      preview: <Progress value={60} />,
    },
    {
      id: "success",
      name: "Success",
      description: "Green progress bar for successful states.",
      code: `<Progress variant="success" value={100} />`,
      preview: <Progress variant="success" value={100} />,
    },
    {
      id: "warning",
      name: "Warning",
      description: "Yellow progress bar for warning states.",
      code: `<Progress variant="warning" value={45} />`,
      preview: <Progress variant="warning" value={45} />,
    },
    {
      id: "error",
      name: "Error",
      description: "Red progress bar for error states.",
      code: `<Progress variant="error" value={20} />`,
      preview: <Progress variant="error" value={20} />,
    },
    {
      id: "indeterminate",
      name: "Indeterminate",
      description: "Animated loading state.",
      code: `<Progress indeterminate />`,
      preview: <Progress indeterminate />,
    },
  ],

  props: [
    {
      name: "value",
      type: "number",
      default: "0",
      description: "Current progress value (0-100 by default).",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum progress value.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the progress bar.",
    },
    {
      name: "variant",
      type: '"default" | "success" | "warning" | "error"',
      default: '"default"',
      description: "Color variant of the progress bar.",
    },
    {
      name: "animated",
      type: "boolean",
      default: "false",
      description: "Enable pulse animation on the fill.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      default: "false",
      description: "Show animated loading state for unknown durations.",
    },
    {
      name: "label",
      type: "string",
      description: "Label text displayed above the progress bar.",
    },
    {
      name: "showValue",
      type: "boolean",
      default: "false",
      description: "Display percentage value above the progress bar.",
    },
  ],
};
