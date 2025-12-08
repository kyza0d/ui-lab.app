import { Input } from "@ui-lab/components";
import { FaEnvelope, FaLock, FaMagnifyingGlass, FaCheck, FaUser } from "react-icons/fa6";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { Button } from "@ui-lab/components";

// Control definitions for the input configurator
const inputControls: ControlDef[] = [
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { label: "Text", value: "text" },
      { label: "Email", value: "email" },
      { label: "Password", value: "password" },
      { label: "Number", value: "number" },
    ],
    defaultValue: "text",
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
    name: "error",
    label: "Error",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    defaultValue: "Enter text...",
  },
];

const inputBasicCode = `import { Input } from "@ui-lab/components";

export function Example() {
  return <Input placeholder="Enter your name..." />;
}`;

const inputTypesCode = `import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-3">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
    </div>
  );
}`;

const inputSizesCode = `import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-3">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  );
}`;

const inputStatesCode = `import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-3">
      <Input placeholder="Default state" />
      <Input disabled placeholder="Disabled state" />
      <Input error placeholder="Error state" />
    </div>
  );
}`;

const inputWithIconsCode = `import { Input } from "@ui-lab/components";
import { FaEnvelope, FaMagnifyingGlass, FaCheckCircle } from "react-icons/fa6";

export function Example() {
  return (
    <div className="space-y-3">
      <Input
        type="email"
        placeholder="Email address"
        prefixIcon={<FaEnvelope size={16} />}
      />
      <Input
        placeholder="Search..."
        prefixIcon={<FaMagnifyingGlass size={16} />}
      />
      <Input
        placeholder="Confirmed"
        suffixIcon={<FaCheckCircle size={16} className="text-green-600" />}
      />
    </div>
  );
}`;

const inputPasswordCode = `import { Input } from "@ui-lab/components";
import { FaLock } from "react-icons/fa6";

export function Example() {
  return (
    <Input
      type="password"
      placeholder="Enter your password"
      prefixIcon={<FaLock size={16} />}
    />
  );
}`;

const inputFormCode = `import { Input } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { FaUser, FaEnvelope } from "react-icons/fa6";

export function Example() {
  return (
    <form className="space-y-4 max-w-sm">
      <div>
        <label className="block text-sm text-foreground-300 mb-2">
          Full Name
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          prefixIcon={<FaUser size={16} />}
        />
      </div>
      <div>
        <label className="block text-sm text-foreground-300 mb-2">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="john@example.com"
          prefixIcon={<FaEnvelope size={16} />}
        />
      </div>
      <Button className="w-full">Submit</Button>
    </form>
  );
}`;

const inputErrorCode = `import { Input } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-2">
      <Input error placeholder="Invalid input" />
      <p className="text-sm text-danger-600">This field is required</p>
    </div>
  );
}`;

export const inputDetail: ComponentDetail = {
  id: "input",
  name: "Input",
  description: "A flexible text input component with multiple variants, sizes, and icon support for capturing user input.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Input component is an essential form control for capturing user data. It supports multiple input types (text, email, password, number) and provides various states including disabled and error states.
      </p>
      <p>
        With built-in support for prefix and suffix icons, you can enhance the visual feedback and provide contextual information to users. The component is responsive and adapts to different sizes and states.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Input",
      description: "The simplest form of an input with a placeholder.",
      code: inputBasicCode,
      preview: <Input placeholder="Enter your name..." />,
      controls: inputControls,
      renderPreview: (props: any) => (
        <Input
          type={props.type}
          size={props.size as any}
          disabled={props.disabled}
          error={props.error}
          placeholder={props.placeholder}
        />
      ),
    },
    {
      id: "types",
      title: "Input Types",
      description: "Different input types for various use cases.",
      code: inputTypesCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="password" placeholder="Password input" />
          <Input type="number" placeholder="Number input" />
        </div>
      ),
    },
    {
      id: "sizes",
      title: "Input Sizes",
      description: "Choose from three size options depending on the context.",
      code: inputSizesCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input" />
          <Input size="lg" placeholder="Large input" />
        </div>
      ),
    },
    {
      id: "states",
      title: "Input States",
      description: "Inputs support different states: default, disabled, and error.",
      code: inputStatesCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <Input placeholder="Default state" />
          <Input disabled placeholder="Disabled state" />
          <Input error placeholder="Error state" />
        </div>
      ),
    },
    {
      id: "with-icons",
      title: "Input with Icons",
      description: "Enhance inputs with prefix and suffix icons for better UX.",
      code: inputWithIconsCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <Input
            type="email"
            placeholder="Email address"
            prefixIcon={<FaEnvelope size={16} />}
          />
          <Input
            placeholder="Search..."
            prefixIcon={<FaMagnifyingGlass size={16} />}
          />
          <Input
            placeholder="Confirmed"
            suffixIcon={<FaCheck size={16} className="text-green-600" />}
          />
        </div>
      ),
    },
    {
      id: "password",
      title: "Password Input",
      description: "Secure password field with lock icon.",
      code: inputPasswordCode,
      preview: (
        <div className="w-full max-w-sm">
          <Input
            type="password"
            placeholder="Enter your password"
            prefixIcon={<FaLock size={16} />}
          />
        </div>
      ),
    },
    {
      id: "form",
      title: "Form Integration",
      description: "Inputs used within a complete form with labels and buttons.",
      code: inputFormCode,
      preview: (
        <form className="space-y-4 max-w-sm">
          <div>
            <label className="block text-sm text-foreground-300 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              prefixIcon={<FaUser size={16} />}
            />
          </div>
          <div>
            <label className="block text-sm text-foreground-300 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              prefixIcon={<FaEnvelope size={16} />}
            />
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      ),
    },
    {
      id: "error",
      title: "Error State",
      description: "Display error state with helpful error message.",
      code: inputErrorCode,
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <Input error placeholder="Invalid input" />
          <p className="text-sm text-danger-600">This field is required</p>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "text",
      name: "Text",
      description: "Standard text input for general text entry.",
      code: `<Input type="text" placeholder="Enter text..." />`,
      preview: <Input type="text" placeholder="Enter text..." />,
    },
    {
      id: "email",
      name: "Email",
      description: "Email input with email-specific validation.",
      code: `<Input type="email" placeholder="Enter email..." />`,
      preview: <Input type="email" placeholder="Enter email..." />,
    },
    {
      id: "password",
      name: "Password",
      description: "Password input for secure text entry.",
      code: `<Input type="password" placeholder="Enter password..." />`,
      preview: <Input type="password" placeholder="Enter password..." />,
    },
    {
      id: "number",
      name: "Number",
      description: "Number input for numeric values.",
      code: `<Input type="number" placeholder="Enter number..." />`,
      preview: <Input type="number" placeholder="Enter number..." />,
    },
  ],
};
