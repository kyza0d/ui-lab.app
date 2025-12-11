import { Slider } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { useState } from "react";

// Control definitions for the slider configurator
const sliderControls: ControlDef[] = [
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
    name: "min",
    label: "Min Value",
    type: "text",
    defaultValue: "0",
  },
  {
    name: "max",
    label: "Max Value",
    type: "text",
    defaultValue: "100",
  },
  {
    name: "step",
    label: "Step",
    type: "text",
    defaultValue: "1",
  },
  {
    name: "disabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
];

const sliderBasicCode = `import * as Slider from "ui-lab-components";

export function Example() {
  return (
    <Slider.Root min={0} max={100} defaultValue={[50]}>
      <Slider.Thumb />
    </Slider.Root>
  );
}`;

const sliderRangeCode = `import * as Slider from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState([30, 70]);

  return (
    <div className="space-y-4 w-64">
      <div>
        <p className="text-sm text-foreground-400 mb-2">Price Range: \${value[0]} - \${value[1]}</p>
        <Slider.Root
          min={0}
          max={100}
          value={value}
          onValueChange={setValue}
          step={1}
        >
          <Slider.Thumb />
          <Slider.Thumb />
        </Slider.Root>
      </div>
    </div>
  );
}`;

const sliderSizesCode = `import * as Slider from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-6 w-64">
      <div>
        <p className="text-sm text-foreground-400 mb-2">Small</p>
        <Slider.Root min={0} max={100} defaultValue={[50]} size="sm">
          <Slider.Thumb />
        </Slider.Root>
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Medium</p>
        <Slider.Root min={0} max={100} defaultValue={[50]} size="md">
          <Slider.Thumb />
        </Slider.Root>
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Large</p>
        <Slider.Root min={0} max={100} defaultValue={[50]} size="lg">
          <Slider.Thumb />
        </Slider.Root>
      </div>
    </div>
  );
}`;

export const sliderDetail: ComponentDetail = {
  id: "slider",
  name: "Slider",
  description: "A customizable range input with minimal styling and no transitions",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Slider component provides a clean, minimal range input for selecting values within a specified range. It features custom styling that completely overrides native HTML range input appearance, offering a consistent look across all browsers.
      </p>
      <p>
        Perfect for volume controls, brightness adjustment, price ranges, and other value selection scenarios. Available in three sizes: small, medium, and large.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Slider",
      description: "A simple slider with default range 0-100",
      code: sliderBasicCode,
      preview: (
        <Slider.Root min={0} max={100} defaultValue={[50]}>
          <Slider.Thumb />
        </Slider.Root>
      ),
      controls: sliderControls,
      renderPreview: (props: any) => (
        <Slider.Root
          size={props.size as any}
          min={Number(props.min || '0')}
          max={Number(props.max || '100')}
          step={Number(props.step || '1')}
          defaultValue={[50]}
          disabled={props.disabled}
        >
          <Slider.Thumb />
        </Slider.Root>
      ),
    },
    {
      id: "range",
      title: "Range Slider",
      description: "A slider with multiple thumbs for selecting a range",
      code: sliderRangeCode,
      preview: (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-foreground-400 mb-2">Price Range: $30 - $70</p>
            <Slider.Root min={0} max={100} defaultValue={[30, 70]} step={1}>
              <Slider.Thumb />
              <Slider.Thumb />
            </Slider.Root>
          </div>
        </div>
      ),
    },
    {
      id: "sizes",
      title: "Slider Sizes",
      description: "Three size options for different contexts",
      code: sliderSizesCode,
      preview: (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-foreground-400 mb-2">Small</p>
            <Slider.Root min={0} max={100} defaultValue={[50]} size="sm">
              <Slider.Thumb />
            </Slider.Root>
          </div>
          <div>
            <p className="text-sm text-foreground-400 mb-2">Medium</p>
            <Slider.Root min={0} max={100} defaultValue={[50]} size="md">
              <Slider.Thumb />
            </Slider.Root>
          </div>
          <div>
            <p className="text-sm text-foreground-400 mb-2">Large</p>
            <Slider.Root min={0} max={100} defaultValue={[50]} size="lg">
              <Slider.Thumb />
            </Slider.Root>
          </div>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "small",
      name: "Small",
      description: "Compact slider for dense layouts",
      code: `<Slider.Root min={0} max={100} defaultValue={[50]} size="sm">
  <Slider.Thumb />
</Slider.Root>`,
      preview: (
        <Slider.Root min={0} max={100} defaultValue={[50]} size="sm">
          <Slider.Thumb />
        </Slider.Root>
      ),
    },
    {
      id: "medium",
      name: "Medium",
      description: "Standard slider for most use cases",
      code: `<Slider.Root min={0} max={100} defaultValue={[50]} size="md">
  <Slider.Thumb />
</Slider.Root>`,
      preview: (
        <Slider.Root min={0} max={100} defaultValue={[50]} size="md">
          <Slider.Thumb />
        </Slider.Root>
      ),
    },
    {
      id: "large",
      name: "Large",
      description: "Prominent slider for featured controls",
      code: `<Slider.Root min={0} max={100} defaultValue={[50]} size="lg">
  <Slider.Thumb />
</Slider.Root>`,
      preview: (
        <Slider.Root min={0} max={100} defaultValue={[50]} size="lg">
          <Slider.Thumb />
        </Slider.Root>
      ),
    },
    {
      id: "disabled",
      name: "Disabled",
      description: "Disabled slider state for inactive controls",
      code: `<Slider.Root min={0} max={100} defaultValue={[50]} disabled>
  <Slider.Thumb />
</Slider.Root>`,
      preview: (
        <Slider.Root min={0} max={100} defaultValue={[50]} disabled>
          <Slider.Thumb />
        </Slider.Root>
      ),
    },
    {
      id: "range",
      name: "Range Selection",
      description: "Multiple thumbs for selecting a range of values",
      code: `<Slider.Root min={0} max={100} defaultValue={[30, 70]}>
  <Slider.Thumb />
  <Slider.Thumb />
</Slider.Root>`,
      preview: (
        <Slider.Root min={0} max={100} defaultValue={[30, 70]}>
          <Slider.Thumb />
          <Slider.Thumb />
        </Slider.Root>
      ),
    },
  ],
};
