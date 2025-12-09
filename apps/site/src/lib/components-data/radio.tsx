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
    name: "checked",
    label: "Checked",
    type: "toggle",
    defaultValue: false,
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
];

const radioBasicCode = `import { Radio } from "ui-lab-components";

export function Example() {
  return <Radio label="Option 1" />;
}`;

const radioStatesCode = `import { Radio } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      <Radio label="Unchecked" />
      <Radio label="Checked" checked />
      <Radio label="Disabled" disabled />
      <Radio label="Disabled and Checked" disabled checked />
    </div>
  );
}`;

const radioGroupCode = `import { Radio } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [selected, setSelected] = useState<string>("email");

  const options = [
    { id: "email", label: "Email notification" },
    { id: "sms", label: "SMS notification" },
    { id: "push", label: "Push notification" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground-300 mb-2">
        Notification Method
      </h3>
      {options.map((option) => (
        <Radio
          key={option.id}
          label={option.label}
          name="notification"
          value={option.id}
          checked={selected === option.id}
          onChange={(e) => setSelected(e.target.value)}
        />
      ))}
    </div>
  );
}`;

const radioDescriptionCode = `import { Radio } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [selected, setSelected] = useState<string>("standard");

  const options = [
    {
      id: "standard",
      label: "Standard Plan",
      description: "Perfect for individuals",
    },
    {
      id: "pro",
      label: "Pro Plan",
      description: "Best for small teams",
    },
    {
      id: "enterprise",
      label: "Enterprise Plan",
      description: "Custom solutions for large organizations",
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground-300 mb-2">
        Select Plan
      </h3>
      {options.map((option) => (
        <Radio
          key={option.id}
          label={option.label}
          description={option.description}
          name="plan"
          value={option.id}
          checked={selected === option.id}
          onChange={(e) => setSelected(e.target.value)}
        />
      ))}
    </div>
  );
}`;

const radioSizesCode = `import { Radio } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      <Radio size="sm" label="Small radio" />
      <Radio size="md" label="Medium radio" />
      <Radio size="lg" label="Large radio" />
    </div>
  );
}`;

const radioDisabledCode = `import { Radio } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground-300 mb-2">
        Select an option
      </h3>
      <Radio label="Available option" />
      <Radio label="Disabled option" disabled />
      <Radio label="Disabled and checked" disabled checked />
    </div>
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
        The component supports labels, descriptions, helper text, and various visual states including checked, unchecked, disabled, and error states. When grouped together with the same <code className="text-accent-500 bg-background-900 px-1.5 py-0.5 rounded text-xs">name</code> attribute, only one radio button can be selected at a time.
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
          checked={props.checked}
          disabled={props.disabled}
          error={props.error}
          label={props.label}
        />
      ),
    },
    {
      id: "states",
      title: "Radio States",
      description: "Different states of a radio button: unchecked, checked, and disabled.",
      code: radioStatesCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Radio label="Unchecked" />
          <Radio label="Checked" checked />
          <Radio label="Disabled" disabled />
          <Radio label="Disabled and Checked" disabled checked />
        </div>
      ),
    },
    {
      id: "group",
      title: "Radio Group",
      description: "Multiple radio buttons grouped for mutually exclusive selection.",
      code: radioGroupCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <h3 className="text-sm font-medium text-foreground-300 mb-2">
            Notification Method
          </h3>
          <Radio
            label="Email notification"
            name="notification"
            value="email"
            defaultChecked
          />
          <Radio
            label="SMS notification"
            name="notification"
            value="sms"
          />
          <Radio
            label="Push notification"
            name="notification"
            value="push"
          />
        </div>
      ),
    },
    {
      id: "description",
      title: "With Description",
      description: "Radio buttons with descriptions for additional context.",
      code: radioDescriptionCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <h3 className="text-sm font-medium text-foreground-300 mb-2">
            Select Plan
          </h3>
          <Radio
            label="Standard Plan"
            description="Perfect for individuals"
            name="plan"
            value="standard"
            defaultChecked
          />
          <Radio
            label="Pro Plan"
            description="Best for small teams"
            name="plan"
            value="pro"
          />
          <Radio
            label="Enterprise Plan"
            description="Custom solutions for large organizations"
            name="plan"
            value="enterprise"
          />
        </div>
      ),
    },
    {
      id: "sizes",
      title: "Radio Sizes",
      description: "Choose from three size options: small, medium, and large.",
      code: radioSizesCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Radio size="sm" label="Small radio" />
          <Radio size="md" label="Medium radio" />
          <Radio size="lg" label="Large radio" />
        </div>
      ),
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Radio buttons in disabled state preventing interaction.",
      code: radioDisabledCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <h3 className="text-sm font-medium text-foreground-300 mb-2">
            Select an option
          </h3>
          <Radio label="Available option" />
          <Radio label="Disabled option" disabled />
          <Radio label="Disabled and checked" disabled checked />
        </div>
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
