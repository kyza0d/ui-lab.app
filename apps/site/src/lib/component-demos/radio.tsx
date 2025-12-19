import { Radio } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { useState } from "react";

// Control definitions for the radio configurator
const radioControls: ControlDef[] = [
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
    name: "disabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "error",
    label: "Error",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "label",
    label: "Label Text",
    type: "text",
    defaultValue: "Option 1",
  },
  {
    name: "easing",
    label: "Interaction Ease",
    type: "select",
    options: [], // This acts as a flag to show the easing selector
    defaultValue: "snappyPop",
  },
];

const radioBasicCode = `import { Radio } from "ui-lab-components";

export function Example() {
  return <Radio label="Option 1" />;
}`;

const radioGroupCode = `import { Radio } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [selected, setSelected] = useState<string>("email");

  return (
    <Radio.Group
      value={selected}
      onValueChange={setSelected}
      className="space-y-3"
    >
      <h3 className="text-sm font-medium text-foreground-300 mb-2">
        Notification Method
      </h3>
      <Radio.Item
        value="email"
        label="Email notification"
      />
      <Radio.Item
        value="sms"
        label="SMS notification"
      />
      <Radio.Item
        value="push"
        label="Push notification"
      />
    </Radio.Group>
  );
}`;

const radioDescriptionCode = `import { Radio } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [selected, setSelected] = useState<string>("standard");

  return (
    <Radio.Group
      value={selected}
      onValueChange={setSelected}
      className="space-y-3"
    >
      <h3 className="text-sm font-medium text-foreground-300 mb-2">
        Select Plan
      </h3>
      <Radio.Item
        value="standard"
        label="Standard Plan"
        description="Perfect for individuals"
      />
      <Radio.Item
        value="pro"
        label="Pro Plan"
        description="Best for small teams"
      />
      <Radio.Item
        value="enterprise"
        label="Enterprise Plan"
        description="Custom solutions for large organizations"
      />
    </Radio.Group>
  );
}`;


const radioErrorCode = `import { Radio } from "ui-lab-components";

export function Example() {
  return (
    <Radio
      label="I agree to the terms"
      error
      helperText="You must agree to continue"
      helperTextError
    />
  );
}`;

export const radioDetail: ComponentDetail = {
  id: "radio",
  name: "Radio",
  description: "A radio button group component for mutually exclusive selections with support for grouping, disabled state, and descriptions.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Radio component is a form control for capturing a single choice from a set of mutually exclusive options. Radio buttons are ideal when users need to select one option from a group.
      </p>
      <p>
        The component supports labels, descriptions, helper text, and various visual states including checked, unchecked, disabled, and error states. Use the compound component pattern with <code className="text-accent-500 bg-background-900 px-1.5 py-0.5 rounded text-xs">Radio.Group</code> and <code className="text-accent-500 bg-background-900 px-1.5 py-0.5 rounded text-xs">Radio.Item</code> for automatic group management, or use individual <code className="text-accent-500 bg-background-900 px-1.5 py-0.5 rounded text-xs">Radio</code> components for standalone use.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Radio",
      description: "A simple radio button with a label.",
      code: radioBasicCode,
      preview: <Radio label="Option 1" />,
      controls: radioControls,
      renderPreview: (props: any) => (
        <Radio
          size={props.size as any}
          disabled={props.disabled}
          error={props.error}
          label={props.label}
        />
      ),
    },
    {
      id: "group",
      title: "Radio Group (Compound Pattern)",
      description: "Multiple radio buttons grouped using the compound component pattern with automatic state management.",
      code: radioGroupCode,
      preview: (
        <RadioGroupExample />
      ),
    },
    {
      id: "description",
      title: "With Description",
      description: "Radio items with descriptions for additional context.",
      code: radioDescriptionCode,
      preview: (
        <RadioDescriptionExample />
      ),
    },
    {
      id: "error",
      title: "Error State",
      description: "Display error state with helpful error message.",
      code: radioErrorCode,
      preview: (
        <div className="w-full max-w-sm">
          <Radio
            label="I agree to the terms"
            error
            helperText="You must agree to continue"
            helperTextError
          />
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "checked",
      name: "Checked",
      description: "Radio button in checked state.",
      code: `<Radio label="Checked radio" checked />`,
      preview: <Radio label="Checked radio" checked />,
    },
    {
      id: "unchecked",
      name: "Unchecked",
      description: "Radio button in unchecked state.",
      code: `<Radio label="Unchecked radio" />`,
      preview: <Radio label="Unchecked radio" />,
    },
    {
      id: "disabled",
      name: "Disabled",
      description: "Disabled radio button preventing interaction.",
      code: `<Radio label="Disabled radio" disabled />`,
      preview: <Radio label="Disabled radio" disabled />,
    },
    {
      id: "with-description",
      name: "With Description",
      description: "Radio button with additional description text.",
      code: `<Radio label="Option" description="This is a description" />`,
      preview: <Radio label="Option" description="This is a description" />,
    },
  ],
};

// Helper components for preview examples
function RadioGroupExample() {
  const [selected, setSelected] = useState<string>("email");

  return (
    <div className="w-full max-w-sm">
      <Radio.Group
        value={selected}
        onValueChange={setSelected}
        className="space-y-3"
      >
        <h3 className="text-sm font-medium text-foreground-300 mb-2">
          Notification Method
        </h3>
        <Radio.Item
          value="email"
          label="Email notification"
        />
        <Radio.Item
          value="sms"
          label="SMS notification"
        />
        <Radio.Item
          value="push"
          label="Push notification"
        />
      </Radio.Group>
    </div>
  );
}

function RadioDescriptionExample() {
  const [selected, setSelected] = useState<string>("standard");

  return (
    <div className="w-full max-w-sm">
      <Radio.Group
        value={selected}
        onValueChange={setSelected}
        className="space-y-3"
      >
        <h3 className="text-sm font-medium text-foreground-300 mb-2">
          Select Plan
        </h3>
        <Radio.Item
          value="standard"
          label="Standard Plan"
          description="Perfect for individuals"
        />
        <Radio.Item
          value="pro"
          label="Pro Plan"
          description="Best for small teams"
        />
        <Radio.Item
          value="enterprise"
          label="Enterprise Plan"
          description="Custom solutions for large organizations"
        />
      </Radio.Group>
    </div>
  );
}
