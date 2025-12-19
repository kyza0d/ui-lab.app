// import { Button } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { FaDownload, FaTrash, FaCheck, FaHeart, FaStar, FaShare, FaEllipsis, FaRocket, FaMinus, FaPlus } from "react-icons/fa6";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

// Control definitions for the button configurator
const buttonControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Outline", value: "outline" },
      { label: "Ghost", value: "ghost" },
    ],
    defaultValue: "primary",
  },
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
    name: "easing",
    label: "Interaction Ease",
    type: "select",
    options: [], // This acts as a flag to show the easing selector
    defaultValue: "snappyPop",
  },
];

const buttonBasicCode = `import { Button } from "ui-lab-components";

export function Example() {
  return <Button>Click me</Button>;
}`;

const buttonVariantsCode = `import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}`;

const buttonSizesCode = `import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}`;

const buttonDisabledCode = `import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex gap-3">
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
    </div>
  );
}`;

const buttonLoadingCode = `import { Button } from "ui-lab-components";

export function Example() {
  return (
    <Button disabled>
      Loading...
    </Button>
  );
}`;

const buttonWithIconCode = `import { Button } from "ui-lab-components";
import { FaDownload, FaTrash } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex gap-3">
      <Button>
        <FaDownload className="mr-2" />
        Download
      </Button>
      <Button variant="outline">
        <FaTrash />
      </Button>
    </div>
  );
}`;

const buttonFormCode = `import { Button } from "ui-lab-components";
import { FaCheck } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex gap-3">
      <Button type="submit">
        <FaCheck className="mr-2" />
        Submit Form
      </Button>
      <Button type="reset" variant="outline">
        Clear
      </Button>
    </div>
  );
}`;

const buttonIconOnlyCode = `import { Button } from "ui-lab-components";
import { FaHeart, FaStar, FaShare, FaEllipsis } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex gap-2">
      <Button size="sm">
        <FaHeart />
      </Button>
      <Button size="sm" variant="secondary">
        <FaStar />
      </Button>
      <Button size="sm" variant="outline">
        <FaShare />
      </Button>
      <Button size="sm" variant="ghost">
        <FaEllipsis />
      </Button>
    </div>
  );
}`;

const buttonCtaCode = `import { Button } from "ui-lab-components";
import { FaRocket } from "react-icons/fa6";

export function Example() {
  return (
    <div className="space-y-3 max-w-(--page-width)d">
      <Button className="w-full">
        <FaRocket className="mr-2" />
        Get Started Now
      </Button>
      <Button variant="outline" className="w-full">
        Learn More
      </Button>
    </div>
  );
}`;

const buttonCompactCode = `import { Button } from "ui-lab-components";
import { FaMinus, FaPlus } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="ghost">
        <FaMinus />
      </Button>
      <span className="px-3 py-1 bg-background-800 rounded text-sm">5</span>
      <Button size="sm" variant="ghost">
        <FaPlus />
      </Button>
    </div>
  );
}`;

export const buttonDetail: ComponentDetail = {
  id: "button",
  name: "Button",
  description: "A versatile button component with multiple variants, sizes, and states. Perfect for user interactions and actions.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Button component is a fundamental building block for any user interface. It supports multiple variants for different use cases, multiple sizes for different contexts, and various states including disabled and loading states.
      </p>
      <p>
        Buttons use a clear visual hierarchy with the accent color for primary actions, ensuring users can easily identify the most important action on the page.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Button",
      description: "The simplest form of a button with the default variant and size.",
      code: buttonBasicCode,
      preview: <Button>Click me</Button>,
      controls: buttonControls,
      renderPreview: (props: any) => (
        <Button
          variant={props.variant as any}
          size={props.size as any}
          disabled={props.disabled}
        >
          Click me
        </Button>
      ),
    },
    {
      id: "variants",
      title: "Button Variants",
      description: "Buttons support four different variants for various semantic meanings.",
      code: buttonVariantsCode,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      ),
    },
    {
      id: "sizes",
      title: "Button Sizes",
      description: "Choose from three size options depending on the context.",
      code: buttonSizesCode,
      preview: (
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      ),
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Buttons can be disabled to prevent user interaction.",
      code: buttonDisabledCode,
      preview: (
        <div className="flex gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
        </div>
      ),
    },
    {
      id: "loading",
      title: "Loading State",
      description: "Use disabled state with loading text to indicate async operations.",
      code: buttonLoadingCode,
      preview: <Button disabled>Loading...</Button>,
    },
    {
      id: "with-icon",
      title: "With Icons",
      description: "Buttons can include icons for better visual communication.",
      code: buttonWithIconCode,
      preview: (
        <div className="flex gap-3">
          <Button>
            <FaDownload className="mr-2" />
            Download
          </Button>
          <Button variant="outline">
            <FaTrash />
          </Button>
        </div>
      ),
    },
    {
      id: "form",
      title: "Form Actions",
      description: "Use buttons for form submission and reset actions.",
      code: buttonFormCode,
      preview: (
        <div className="flex gap-3">
          <Button type="submit">
            <FaCheck className="mr-2" />
            Submit Form
          </Button>
          <Button type="reset" variant="outline">
            Clear
          </Button>
        </div>
      ),
    },
    {
      id: "icon-only",
      title: "Icon-Only Buttons",
      description: "Use icons alone for compact button interfaces or toolbars.",
      code: buttonIconOnlyCode,
      preview: (
        <div className="flex gap-2">
          <Button size="sm">
            <FaHeart />
          </Button>
          <Button size="sm" variant="secondary">
            <FaStar />
          </Button>
          <Button size="sm" variant="outline">
            <FaShare />
          </Button>
          <Button size="sm" variant="ghost">
            <FaEllipsis />
          </Button>
        </div>
      ),
    },
    {
      id: "cta",
      title: "Call-to-Action",
      description: "Full-width buttons for prominent call-to-action sections.",
      code: buttonCtaCode,
      preview: (
        <div className="space-y-3 max-w-(--page-width)d">
          <Button className="w-full">
            <FaRocket className="mr-2" />
            Get Started Now
          </Button>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </div>
      ),
    },
    {
      id: "compact",
      title: "Compact Controls",
      description: "Compact button controls for quantity selectors and similar patterns.",
      code: buttonCompactCode,
      preview: (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost">
            <FaMinus />
          </Button>
          <span className="px-3 py-1 bg-background-800 rounded text-sm">5</span>
          <Button size="sm" variant="ghost">
            <FaPlus />
          </Button>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Primary action button with accent background. Use for main call-to-actions.",
      code: buttonBasicCode,
      preview: <Button variant="primary">Default Button</Button>,
    },
    {
      id: "secondary",
      name: "Secondary",
      description: "Secondary action button. Use for supplementary actions.",
      code: `<Button variant="secondary">Secondary</Button>`,
      preview: <Button variant="secondary">Secondary Button</Button>,
    },
    {
      id: "outline",
      name: "Outline",
      description: "Outlined button with border. Use for tertiary actions.",
      code: `<Button variant="outline">Outline Button</Button>`,
      preview: <Button variant="outline">Outline Button</Button>,
    },
    {
      id: "ghost",
      name: "Ghost",
      description: "Minimal ghost button. Use for low-priority actions.",
      code: `<Button variant="ghost">Ghost Button</Button>`,
      preview: <Button variant="ghost">Ghost Button</Button>,
    },
  ]
};
