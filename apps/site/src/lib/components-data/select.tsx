import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";
import { Button } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

// Control definitions for the select configurator
const selectControls: ControlDef[] = [
  {
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    defaultValue: "Select an option",
  },
  {
    name: "disabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
];

const controlledSelectControls: ControlDef[] = [
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
];

const selectBasicCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}`;

const selectWithDefaultCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  return (
    <Select defaultValue="option1">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}`;

const selectDisabledCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  return (
    <div className="flex flex-col gap-3 w-48">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3" disabled>
            Option 3 (Disabled)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}`;

const selectGroupsCode = `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit or vegetable" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="lettuce">Lettuce</SelectItem>
          <SelectItem value="tomato">Tomato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}`;

const selectControlledCode = `"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-4 w-64">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground-300">
          Select an option
        </label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Choose something..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="users">User Management</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
            <SelectItem value="reports">Reports</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {value && (
        <div className="p-3 bg-accent-500/20 border border-accent-500 rounded-md">
          <p className="text-sm text-accent-100">
            <span className="font-semibold">Selected:</span> {value}
          </p>
        </div>
      )}

      <div className="text-xs text-foreground-500">
        <p>Current value: <span className="font-mono text-foreground-400">{value || "null"}</span></p>
      </div>
    </div>
  );
}`;

const selectFormIntegrationCode = `"use client";

import { useState } from "react";
import { Button } from "ui-lab-components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  const [formData, setFormData] = useState({
    department: "",
    priority: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.department && formData.priority) {
      setSubmitted(true);
      console.log("Form submitted:", formData);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleReset = () => {
    setFormData({ department: "", priority: "" });
    setSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground-200 block mb-2">
            Department
          </label>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a department..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground-200 block mb-2">
            Priority Level
          </label>
          <Select
            value={formData.priority}
            onValueChange={(value) =>
              setFormData({ ...formData, priority: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select priority..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="default"
          className="flex-1"
          disabled={!formData.department || !formData.priority}
        >
          {submitted ? "Submitted!" : "Create Task"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      {submitted && (
        <div className="p-4 bg-accent-500/20 border border-accent-500 rounded-lg">
          <p className="text-sm font-medium text-accent-100 mb-2">Task Created</p>
          <div className="text-xs text-foreground-300 space-y-1">
            <p>Department: <span className="font-semibold text-foreground-100">{formData.department}</span></p>
            <p>Priority: <span className="font-semibold text-foreground-100">{formData.priority}</span></p>
          </div>
        </div>
      )}
    </form>
  );
}`;

export const selectDetail: ComponentDetail = {
  id: "select",
  name: "Select",
  description: "A dropdown select component built on Radix UI that allows users to choose from a list of options.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Select component provides a flexible and accessible way for users to choose from a list of options. Built on top of Radix UI's Select primitive, it ensures proper keyboard navigation and accessibility.
      </p>
      <p>
        Use it for form inputs, filters, settings, or any situation where you need users to pick from a predefined set of options. It supports grouping, disabled states, and controlled values.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Select",
      description: "A simple select component with a placeholder and a few options.",
      code: selectBasicCode,
      preview: (
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      ),
      controls: selectControls,
      renderPreview: (props: any) => (
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "default-value",
      title: "With Default Value",
      description: "Select component with a pre-selected default value.",
      code: selectWithDefaultCode,
      preview: (
        <Select defaultValue="option1">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "disabled",
      title: "Disabled States",
      description: "Select and individual items can be disabled.",
      code: selectDisabledCode,
      preview: (
        <div className="flex flex-col gap-3 w-48">
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Disabled select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3" disabled>
                Option 3 (Disabled)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      id: "groups",
      title: "Grouped Options",
      description: "Options can be grouped for better organization.",
      code: selectGroupsCode,
      preview: (
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select a fruit or vegetable" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectItem value="carrot">Carrot</SelectItem>
              <SelectItem value="lettuce">Lettuce</SelectItem>
              <SelectItem value="tomato">Tomato</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "controlled",
      title: "Controlled Select",
      description: "Use with React state to control the selected value. Select an option to see it displayed below.",
      code: selectControlledCode,
      controls: controlledSelectControls,
      preview: (
        <div className="flex flex-col gap-4 w-64">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-300">
              Select an option
            </label>
            <Select defaultValue="users">
              <SelectTrigger>
                <SelectValue placeholder="Choose something..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">User Management</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-foreground-500">
            <p>Try selecting different options to see the value change</p>
          </div>
        </div>
      ),
      renderPreview: (props: any) => {
        const [value, setValue] = React.useState("users");

        return (
          <div className="flex flex-col gap-4 w-64">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground-300">
                Select an option
              </label>
              <Select value={value} onValueChange={setValue} disabled={props.disabled}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose something..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">User Management</SelectItem>
                  <SelectItem value="settings">Settings</SelectItem>
                  <SelectItem value="reports">Reports</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-xs text-foreground-500">
              <p>Current value: <span className="font-mono text-foreground-400">{value || "null"}</span></p>
            </div>
          </div>
        );
      },
    },
    {
      id: "form-integration",
      title: "Form Integration",
      description: "Use multiple selects in a form to collect different types of data. This example demonstrates a realistic task creation form.",
      code: selectFormIntegrationCode,
      preview: (
        <form className="w-80 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground-200 block mb-2">
                Department
              </label>
              <Select defaultValue="engineering">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a department..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground-200 block mb-2">
                Priority Level
              </label>
              <Select defaultValue="high">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="default" className="flex-1">
              Create Task
            </Button>
            <Button variant="outline">
              Reset
            </Button>
          </div>
        </form>
      ),
      renderPreview: (props: any) => {
        const [formData, setFormData] = React.useState({
          department: "engineering",
          priority: "high",
        });
        const [submitted, setSubmitted] = React.useState(false);

        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (formData.department && formData.priority) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
          }
        };

        const handleReset = () => {
          setFormData({ department: "", priority: "" });
          setSubmitted(false);
        };

        return (
          <form onSubmit={handleSubmit} className="w-80 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground-200 block mb-2">
                  Department
                </label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    setFormData({ ...formData, department: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a department..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground-200 block mb-2">
                  Priority Level
                </label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                variant="default"
                className="flex-1"
                disabled={!formData.department || !formData.priority}
              >
                {submitted ? "Submitted!" : "Create Task"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>

            {submitted && (
              <div className="p-4 bg-accent-500/20 border border-accent-500 rounded-lg">
                <p className="text-sm font-medium text-accent-100 mb-2">Task Created</p>
                <div className="text-xs text-foreground-300 space-y-1">
                  <p>Department: <span className="font-semibold text-foreground-100">{formData.department}</span></p>
                  <p>Priority: <span className="font-semibold text-foreground-100">{formData.priority}</span></p>
                </div>
              </div>
            )}
          </form>
        );
      },
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard select component with dark styling.",
      code: selectBasicCode,
      preview: (
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
  ],
};
