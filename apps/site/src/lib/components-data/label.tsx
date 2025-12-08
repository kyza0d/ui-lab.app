import { Label } from "@ui-lab/components";
import { Input } from "@ui-lab/components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { Button } from "@ui-lab/components";

// Control definitions for the label configurator
const labelControls: ControlDef[] = [
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
    name: "required",
    label: "Required",
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
];

const labelBasicCode = `import { Label } from "@ui-lab/components";

export function Example() {
  return <Label htmlFor="name">Name</Label>;
}`;

const labelWithInputCode = `import { Label } from "@ui-lab/components";
import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-2 max-w-sm">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" placeholder="John Doe" />
    </div>
  );
}`;

const labelRequiredCode = `import { Label } from "@ui-lab/components";
import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-2 max-w-sm">
      <Label htmlFor="email" required>
        Email Address
      </Label>
      <Input id="email" type="email" placeholder="john@example.com" />
    </div>
  );
}`;

const labelWithHelperCode = `import { Label } from "@ui-lab/components";
import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-2 max-w-sm">
      <Label htmlFor="password" required helperText="At least 8 characters">
        Password
      </Label>
      <Input id="password" type="password" placeholder="Enter password" />
    </div>
  );
}`;

const labelSizesCode = `import { Label } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-4">
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
    </div>
  );
}`;

const labelStatesCode = `import { Label } from "@ui-lab/components";
import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="default">Default State</Label>
        <Input id="default" placeholder="Default" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="disabled" disabled>
          Disabled State
        </Label>
        <Input id="disabled" disabled placeholder="Disabled" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="error" error>
          Error State
        </Label>
        <Input id="error" error placeholder="Error" />
        <p className="text-sm text-danger-600">This field is required</p>
      </div>
    </div>
  );
}`;

const labelErrorWithHelperCode = `import { Label } from "@ui-lab/components";
import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-2 max-w-sm">
      <Label
        htmlFor="username"
        required
        error
        helperText="Username must be 3-20 characters"
        helperTextError={true}
      >
        Username
      </Label>
      <Input id="username" error placeholder="Enter username" />
    </div>
  );
}`;

const labelFormCode = `import { Label } from "@ui-lab/components";
import { Input } from "@ui-lab/components";
import { Button } from "@ui-lab/components";

export function Example() {
  return (
    <form className="space-y-5 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="name" required helperText="Your full name">
          Full Name
        </Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" required>
          Email Address
        </Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" helperText="Maximum 500 characters">
          Message
        </Label>
        <Input id="message" placeholder="Your message" />
      </div>
      <Button className="w-full">Submit</Button>
    </form>
  );
}`;

export const labelDetail: ComponentDetail = {
  id: "label",
  name: "Label",
  description: "Form field label component with required indicator, helper text, and error state styling for use with form inputs.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Label component is a semantic form label that works seamlessly with input components. It provides built-in support for required indicators, helper text, and error state styling to improve form clarity and accessibility.
      </p>
      <p>
        With support for multiple sizes and states, the Label component helps create consistent, accessible form layouts. Use it with inputs to establish proper label-input associations through the htmlFor attribute.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Label",
      description: "A simple label for form fields.",
      code: labelBasicCode,
      preview: <Label htmlFor="name">Name</Label>,
      controls: labelControls,
      renderPreview: (props: any) => (
        <Label
          size={props.size as any}
          required={props.required}
          disabled={props.disabled}
          error={props.error}
          htmlFor="example"
        >
          Label Text
        </Label>
      ),
    },
    {
      id: "with-input",
      title: "Label with Input",
      description: "Label properly associated with an input field.",
      code: labelWithInputCode,
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>
      ),
    },
    {
      id: "required",
      title: "Required Indicator",
      description: "Label with required indicator to show mandatory fields.",
      code: labelRequiredCode,
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <Label htmlFor="email" required>
            Email Address
          </Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
      ),
    },
    {
      id: "with-helper",
      title: "Helper Text",
      description: "Label with helper text to guide users.",
      code: labelWithHelperCode,
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <Label
            htmlFor="password"
            required
            helperText="At least 8 characters"
          >
            Password
          </Label>
          <Input id="password" type="password" placeholder="Enter password" />
        </div>
      ),
    },
    {
      id: "sizes",
      title: "Label Sizes",
      description: "Choose from three size options for different contexts.",
      code: labelSizesCode,
      preview: (
        <div className="space-y-4 w-full">
          <Label size="sm">Small Label</Label>
          <Label size="md">Medium Label</Label>
          <Label size="lg">Large Label</Label>
        </div>
      ),
    },
    {
      id: "states",
      title: "Label States",
      description: "Labels support different states: default, disabled, and error.",
      code: labelStatesCode,
      preview: (
        <div className="space-y-6 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="default">Default State</Label>
            <Input id="default" placeholder="Default" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled" disabled>
              Disabled State
            </Label>
            <Input id="disabled" disabled placeholder="Disabled" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="error" error>
              Error State
            </Label>
            <Input id="error" error placeholder="Error" />
            <p className="text-sm text-danger-600">This field is required</p>
          </div>
        </div>
      ),
    },
    {
      id: "error-helper",
      title: "Error with Helper Text",
      description: "Helper text styled as error message for validation feedback.",
      code: labelErrorWithHelperCode,
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <Label
            htmlFor="username"
            required
            error
            helperText="Username must be 3-20 characters"
            helperTextError={true}
          >
            Username
          </Label>
          <Input id="username" error placeholder="Enter username" />
        </div>
      ),
    },
    {
      id: "form",
      title: "Form Integration",
      description: "Labels used within a complete form with inputs and buttons.",
      code: labelFormCode,
      preview: (
        <form className="space-y-5 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="name" required helperText="Your full name">
              Full Name
            </Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" helperText="Maximum 500 characters">
              Message
            </Label>
            <Input id="message" placeholder="Your message" />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </form>
      ),
    },
  ],

  variants: [
    {
      id: "small",
      name: "Small",
      description: "Small label for compact form layouts.",
      code: `<Label size="sm">Small Label</Label>`,
      preview: <Label size="sm">Small Label</Label>,
    },
    {
      id: "medium",
      name: "Medium",
      description: "Medium label for standard form layouts.",
      code: `<Label size="md">Medium Label</Label>`,
      preview: <Label size="md">Medium Label</Label>,
    },
    {
      id: "large",
      name: "Large",
      description: "Large label for prominent form sections.",
      code: `<Label size="lg">Large Label</Label>`,
      preview: <Label size="lg">Large Label</Label>,
    },
  ],
};
