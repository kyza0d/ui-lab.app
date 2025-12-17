"use client";

import { Frame } from "@/components/experimental";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

const frameControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Accent", value: "accent" },
      { label: "Subtle", value: "subtle" },
    ],
    defaultValue: "default",
  },
  {
    name: "borderWidth",
    label: "Border Width",
    type: "select",
    options: [
      { label: "Thin", value: "thin" },
      { label: "Medium", value: "medium" },
      { label: "Thick", value: "thick" },
    ],
    defaultValue: "medium",
  },
  {
    name: "radius",
    label: "Border Radius",
    type: "select",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
    defaultValue: "medium",
  },
  {
    name: "padding",
    label: "Padding",
    type: "select",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
    defaultValue: "medium",
  },
];

const frameBasicCode = `import { Frame } from "@/components/experimental";

export function Example() {
  return (
    <Frame>
      <p>Framed content</p>
    </Frame>
  );
}`;

const frameVariantsCode = `import { Frame } from "@/components/experimental";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Frame variant="default">
        <p>Default frame</p>
      </Frame>
      <Frame variant="accent">
        <p>Accent frame</p>
      </Frame>
      <Frame variant="subtle">
        <p>Subtle frame</p>
      </Frame>
    </div>
  );
}`;

const frameBorderWidthCode = `import { Frame } from "@/components/experimental";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Frame borderWidth="thin">
        <p>Thin border</p>
      </Frame>
      <Frame borderWidth="medium">
        <p>Medium border</p>
      </Frame>
      <Frame borderWidth="thick">
        <p>Thick border</p>
      </Frame>
    </div>
  );
}`;

const frameRadiusCode = `import { Frame } from "@/components/experimental";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Frame radius="none">
        <p>No rounded corners</p>
      </Frame>
      <Frame radius="small">
        <p>Small radius</p>
      </Frame>
      <Frame radius="medium">
        <p>Medium radius</p>
      </Frame>
      <Frame radius="large">
        <p>Large radius</p>
      </Frame>
    </div>
  );
}`;

const framePaddingCode = `import { Frame } from "@/components/experimental";

export function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Frame padding="none">
        <p>No padding</p>
      </Frame>
      <Frame padding="small">
        <p>Small padding</p>
      </Frame>
      <Frame padding="medium">
        <p>Medium padding</p>
      </Frame>
      <Frame padding="large">
        <p>Large padding</p>
      </Frame>
    </div>
  );
}`;

export const frameDetail: ComponentDetail = {
  id: "frame",
  name: "Frame",
  description: "A decorative border/frame component for wrapping and highlighting content",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Frame component is a flexible decorative wrapper that adds a border around content.
        It supports multiple border styles, widths, border radius options, and padding configurations.
      </p>
      <p>
        Use frames to emphasize content sections, create visual hierarchy, or add decorative
        borders around important information.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Frame",
      description: "The simplest form of a frame with default styling",
      code: frameBasicCode,
      preview: (
        <Frame>
          <p>Framed content</p>
        </Frame>
      ),
      controls: frameControls,
      renderPreview: (props: any) => (
        <Frame
          variant={props.variant as any}
          borderWidth={props.borderWidth as any}
          radius={props.radius as any}
          padding={props.padding as any}
        >
          <p>Framed content</p>
        </Frame>
      ),
    },
    {
      id: "variants",
      title: "Frame Variants",
      description: "Different color variants for different contexts",
      code: frameVariantsCode,
      preview: (
        <div className="flex flex-col gap-4">
          <Frame variant="default">
            <p>Default frame</p>
          </Frame>
          <Frame variant="accent">
            <p>Accent frame</p>
          </Frame>
          <Frame variant="subtle">
            <p>Subtle frame</p>
          </Frame>
        </div>
      ),
    },
    {
      id: "border-width",
      title: "Border Width Options",
      description: "Different border thickness options",
      code: frameBorderWidthCode,
      preview: (
        <div className="flex flex-col gap-4">
          <Frame borderWidth="thin">
            <p>Thin border</p>
          </Frame>
          <Frame borderWidth="medium">
            <p>Medium border</p>
          </Frame>
          <Frame borderWidth="thick">
            <p>Thick border</p>
          </Frame>
        </div>
      ),
    },
    {
      id: "border-radius",
      title: "Border Radius",
      description: "Different corner radius options",
      code: frameRadiusCode,
      preview: (
        <div className="flex flex-col gap-4">
          <Frame radius="none">
            <p>No rounded corners</p>
          </Frame>
          <Frame radius="small">
            <p>Small radius</p>
          </Frame>
          <Frame radius="medium">
            <p>Medium radius</p>
          </Frame>
          <Frame radius="large">
            <p>Large radius</p>
          </Frame>
        </div>
      ),
    },
    {
      id: "padding",
      title: "Padding Options",
      description: "Different inner padding options",
      code: framePaddingCode,
      preview: (
        <div className="flex flex-col gap-4">
          <Frame padding="none">
            <p>No padding</p>
          </Frame>
          <Frame padding="small">
            <p>Small padding</p>
          </Frame>
          <Frame padding="medium">
            <p>Medium padding</p>
          </Frame>
          <Frame padding="large">
            <p>Large padding</p>
          </Frame>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard frame with default border color",
      code: `<Frame variant="default"><p>Content</p></Frame>`,
      preview: (
        <Frame variant="default">
          <p>Content</p>
        </Frame>
      ),
    },
    {
      id: "accent",
      name: "Accent",
      description: "Frame with accent color border",
      code: `<Frame variant="accent"><p>Content</p></Frame>`,
      preview: (
        <Frame variant="accent">
          <p>Content</p>
        </Frame>
      ),
    },
    {
      id: "subtle",
      name: "Subtle",
      description: "Frame with subtle border color",
      code: `<Frame variant="subtle"><p>Content</p></Frame>`,
      preview: (
        <Frame variant="subtle">
          <p>Content</p>
        </Frame>
      ),
    },
  ],
};
