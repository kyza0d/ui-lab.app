import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectListBox,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";
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
    name: "dsabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
];

const selectBasicCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectListBox,
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
        <SelectListBox>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectListBox>
      </SelectContent>
    </Select>
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
            <SelectListBox>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectListBox>
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
            <SelectListBox>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectListBox>
          </SelectContent>
        </Select>
      ),
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
            <SelectListBox>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectListBox>
          </SelectContent>
        </Select>
      ),
    },
  ],
};
