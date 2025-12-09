import { Checkbox } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { Button } from "ui-lab-components";

// Control definitions for the checkbox configurator
const checkboxControls: ControlDef[] = [
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
    name: "indeterminate",
    label: "Indeterminate",
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
    defaultValue: "Accept terms",
  },
];

const checkboxBasicCode = `import { Checkbox } from "ui-lab-components";

export function Example() {
  return <Checkbox label="Accept terms and conditions" />;
}`;

const checkboxStatesCode = `import { Checkbox } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and Checked" disabled checked />
    </div>
  );
}`;

const checkboxIndeterminateCode = `import { Checkbox } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      <Checkbox label="Select All" indeterminate />
      <div className="ml-6 space-y-2">
        <Checkbox label="Option 1" checked />
        <Checkbox label="Option 2" checked />
        <Checkbox label="Option 3" />
      </div>
    </div>
  );
}`;

const checkboxSizesCode = `import { Checkbox } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  );
}`;

const checkboxErrorCode = `import { Checkbox } from "ui-lab-components";

export function Example() {
  return (
    <Checkbox
      label="I agree to the terms"
      error
      helperText="You must agree to continue"
      helperTextError
    />
  );
}`;

const checkboxGroupCode = `import { Checkbox } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { id: "notifications", label: "Email notifications" },
    { id: "marketing", label: "Marketing emails" },
    { id: "updates", label: "Product updates" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground-300 mb-2">
        Preferences
      </h3>
      {options.map((option) => (
        <Checkbox
          key={option.id}
          label={option.label}
          checked={selected.includes(option.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected([...selected, option.id]);
            } else {
              setSelected(selected.filter((id) => id !== option.id));
            }
          }}
        />
      ))}
    </div>
  );
}`;

const checkboxHelperTextCode = `import { Checkbox } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4">
      <Checkbox
        label="Enable two-factor authentication"
        helperText="Adds an extra layer of security to your account"
      />
      <Checkbox
        label="I agree to the terms"
        helperText="Please review our terms before continuing"
        helperTextError
      />
    </div>
  );
}`;

const checkboxFormCode = `import { Checkbox } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <form className="space-y-4 max-w-sm">
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <Checkbox
          label="I would like to receive promotional emails"
        />
        <Checkbox
          label="I agree to the Privacy Policy"
        />
      </div>
      <Button disabled={!agreed} className="w-full">
        Continue
      </Button>
    </form>
  );
}`;

export const checkboxDetail: ComponentDetail = {
  id: "checkbox",
  name: "Checkbox",
  description: "A flexible checkbox component supporting single and grouped selections with multiple states including checked, unchecked, indeterminate, and disabled.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Checkbox component is a versatile form control for capturing boolean choices or selections. It supports individual checkboxes as well as checkbox groups for multiple selections.
      </p>
      <p>
        With built-in support for labels, helper text, and various visual states (checked, unchecked, indeterminate, disabled, and error), the Checkbox component handles all common use cases. The indeterminate state is useful when displaying parent-child relationships, such as a "Select All" option with dependent checkboxes.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Checkbox",
      description: "A simple checkbox with a label.",
      code: checkboxBasicCode,
      preview: <Checkbox label="Accept terms and conditions" />,
      controls: checkboxControls,
      renderPreview: (props: any) => (
        <Checkbox
          size={props.size as any}
          checked={props.checked}
          indeterminate={props.indeterminate}
          disabled={props.disabled}
          error={props.error}
          label={props.label}
        />
      ),
    },
    {
      id: "states",
      title: "Checkbox States",
      description: "Different states of a checkbox: unchecked, checked, and disabled.",
      code: checkboxStatesCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" checked />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled and Checked" disabled checked />
        </div>
      ),
    },
    {
      id: "indeterminate",
      title: "Indeterminate State",
      description: "Useful for representing parent-child relationships in grouped selections.",
      code: checkboxIndeterminateCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Checkbox label="Select All" indeterminate />
          <div className="ml-6 space-y-2">
            <Checkbox label="Option 1" checked />
            <Checkbox label="Option 2" checked />
            <Checkbox label="Option 3" />
          </div>
        </div>
      ),
    },
    {
      id: "sizes",
      title: "Checkbox Sizes",
      description: "Choose from three size options: small, medium, and large.",
      code: checkboxSizesCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Checkbox size="sm" label="Small checkbox" />
          <Checkbox size="md" label="Medium checkbox" />
          <Checkbox size="lg" label="Large checkbox" />
        </div>
      ),
    },
    {
      id: "error",
      title: "Error State",
      description: "Display error state with helpful error message.",
      code: checkboxErrorCode,
      preview: (
        <div className="w-full max-w-sm">
          <Checkbox
            label="I agree to the terms"
            error
            helperText="You must agree to continue"
            helperTextError
          />
        </div>
      ),
    },
    {
      id: "group",
      title: "Checkbox Group",
      description: "Multiple checkboxes grouped for selection.",
      code: checkboxGroupCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <h3 className="text-sm font-medium text-foreground-300 mb-2">
            Preferences
          </h3>
          <Checkbox label="Email notifications" />
          <Checkbox label="Marketing emails" />
          <Checkbox label="Product updates" />
        </div>
      ),
    },
    {
      id: "helper-text",
      title: "Helper Text",
      description: "Provide additional context with helper text.",
      code: checkboxHelperTextCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <Checkbox
            label="Enable two-factor authentication"
            helperText="Adds an extra layer of security to your account"
          />
          <Checkbox
            label="I agree to the terms"
            helperText="Please review our terms before continuing"
            helperTextError
          />
        </div>
      ),
    },
    {
      id: "form",
      title: "Form Integration",
      description: "Checkboxes used in a complete form.",
      code: checkboxFormCode,
      preview: (
        <form className="space-y-4 max-w-sm">
          <div className="space-y-3">
            <Checkbox label="I agree to the Terms of Service" />
            <Checkbox label="I would like to receive promotional emails" />
            <Checkbox label="I agree to the Privacy Policy" />
          </div>
          <Button className="w-full">Continue</Button>
        </form>
      ),
    },
  ],

  variants: [
    {
      id: "checked",
      name: "Checked",
      description: "Checkbox in checked state.",
      code: `<Checkbox label="Checked checkbox" checked />`,
      preview: <Checkbox label="Checked checkbox" checked />,
    },
    {
      id: "unchecked",
      name: "Unchecked",
      description: "Checkbox in unchecked state.",
      code: `<Checkbox label="Unchecked checkbox" />`,
      preview: <Checkbox label="Unchecked checkbox" />,
    },
    {
      id: "indeterminate",
      name: "Indeterminate",
      description: "Checkbox in indeterminate state.",
      code: `<Checkbox label="Indeterminate checkbox" indeterminate />`,
      preview: <Checkbox label="Indeterminate checkbox" indeterminate />,
    },
    {
      id: "disabled",
      name: "Disabled",
      description: "Disabled checkbox preventing interaction.",
      code: `<Checkbox label="Disabled checkbox" disabled />`,
      preview: <Checkbox label="Disabled checkbox" disabled />,
    },
  ],
};
