import { TextArea } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { Button } from "ui-lab-components";

// Control definitions for the textarea configurator
const textareaControls: ControlDef[] = [
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
    name: "resizable",
    label: "Resizable",
    type: "toggle",
    defaultValue: true,
  },
  {
    name: "showCharacterCount",
    label: "Show Character Count",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    defaultValue: "Enter your message...",
  },
];

const textareaBasicCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return <TextArea placeholder="Enter your message..." />;
}`;

const textareaSizesCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-3">
      <TextArea size="sm" placeholder="Small textarea" />
      <TextArea size="md" placeholder="Medium textarea" />
      <TextArea size="lg" placeholder="Large textarea" />
    </div>
  );
}`;

const textareaStatesCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <TextArea placeholder="Default state" />
      <TextArea disabled placeholder="Disabled state" />
      <TextArea error placeholder="Error state" />
    </div>
  );
}`;

const textareaResizableCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-foreground-300 mb-2">Resizable</p>
        <TextArea resizable placeholder="Drag to resize..." />
      </div>
      <div>
        <p className="text-sm text-foreground-300 mb-2">Not Resizable</p>
        <TextArea resizable={false} placeholder="Fixed size" />
      </div>
    </div>
  );
}`;

const textareaCharacterCountCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div>
        <label className="block text-sm text-foreground-300 mb-2">
          Message (with character count)
        </label>
        <TextArea
          showCharacterCount
          placeholder="Type to see character count..."
        />
      </div>
      <div>
        <label className="block text-sm text-foreground-300 mb-2">
          Limited Message (max 100 characters)
        </label>
        <TextArea
          showCharacterCount
          maxCharacters={100}
          placeholder="Limited to 100 characters..."
        />
      </div>
    </div>
  );
}`;

const textareaFormCode = `import { TextArea } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <form className="space-y-4 max-w-sm">
      <div>
        <label className="block text-sm text-foreground-300 mb-2">
          Your Message
        </label>
        <TextArea placeholder="Enter your message..." />
      </div>
      <div>
        <label className="block text-sm text-foreground-300 mb-2">
          Additional Comments
        </label>
        <TextArea
          size="lg"
          placeholder="Add any additional comments..."
          showCharacterCount
          maxCharacters={500}
        />
      </div>
      <Button className="w-full">Submit</Button>
    </form>
  );
}`;

const textareaWithLabelCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-2 w-full max-w-sm">
      <label htmlFor="message" className="block text-sm text-foreground-300">
        Message
      </label>
      <TextArea
        id="message"
        placeholder="Enter your message..."
        showCharacterCount
      />
    </div>
  );
}`;

const textareaErrorStateCode = `import { TextArea } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-2 w-full max-w-sm">
      <TextArea error placeholder="Invalid input" />
      <p className="text-sm text-danger-600">This field is required</p>
    </div>
  );
}`;

export const textareaDetail: ComponentDetail = {
  id: "textarea",
  name: "TextArea",
  description: "A flexible multi-line text input component with resizing, character count, and state support for capturing longer text input.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The TextArea component is an essential form control for capturing longer text content. It supports multiple sizes and provides various states including disabled and error states.
      </p>
      <p>
        With built-in character counting, configurable maximum character limits, and optional resize controls, you can provide enhanced user feedback and input constraints. The component is responsive and adapts to different sizes and states.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic TextArea",
      description: "The simplest form of a textarea with a placeholder.",
      code: textareaBasicCode,
      preview: <TextArea placeholder="Enter your message..." />,
      controls: textareaControls,
      renderPreview: (props: any) => (
        <TextArea
          size={props.size as any}
          disabled={props.disabled}
          error={props.error}
          resizable={props.resizable}
          showCharacterCount={props.showCharacterCount}
          placeholder={props.placeholder}
        />
      ),
    },
    {
      id: "sizes",
      title: "TextArea Sizes",
      description: "Choose from three size options depending on the context.",
      code: textareaSizesCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <TextArea size="sm" placeholder="Small textarea" />
          <TextArea size="md" placeholder="Medium textarea" />
          <TextArea size="lg" placeholder="Large textarea" />
        </div>
      ),
    },
    {
      id: "states",
      title: "TextArea States",
      description: "TextAreas support different states: default, disabled, and error.",
      code: textareaStatesCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <TextArea placeholder="Default state" />
          <TextArea disabled placeholder="Disabled state" />
          <TextArea error placeholder="Error state" />
        </div>
      ),
    },
    {
      id: "resizable",
      title: "Resizable Options",
      description: "Control whether the textarea can be resized by the user.",
      code: textareaResizableCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <div>
            <p className="text-sm text-foreground-300 mb-2">Resizable</p>
            <TextArea resizable placeholder="Drag to resize..." />
          </div>
          <div>
            <p className="text-sm text-foreground-300 mb-2">Not Resizable</p>
            <TextArea resizable={false} placeholder="Fixed size" />
          </div>
        </div>
      ),
    },
    {
      id: "character-count",
      title: "Character Count",
      description: "Display character count and optionally limit input to a maximum number of characters.",
      code: textareaCharacterCountCode,
      preview: (
        <div className="space-y-3 w-full max-w-sm">
          <div>
            <label className="block text-sm text-foreground-300 mb-2">
              Message (with character count)
            </label>
            <TextArea
              showCharacterCount
              placeholder="Type to see character count..."
            />
          </div>
          <div>
            <label className="block text-sm text-foreground-300 mb-2">
              Limited Message (max 100 characters)
            </label>
            <TextArea
              showCharacterCount
              maxCharacters={100}
              placeholder="Limited to 100 characters..."
            />
          </div>
        </div>
      ),
    },
    {
      id: "form",
      title: "Form Integration",
      description: "TextAreas used within a complete form with labels and buttons.",
      code: textareaFormCode,
      preview: (
        <form className="space-y-4 max-w-sm">
          <div>
            <label className="block text-sm text-foreground-300 mb-2">
              Your Message
            </label>
            <TextArea placeholder="Enter your message..." />
          </div>
          <div>
            <label className="block text-sm text-foreground-300 mb-2">
              Additional Comments
            </label>
            <TextArea
              size="lg"
              placeholder="Add any additional comments..."
              showCharacterCount
              maxCharacters={500}
            />
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      ),
    },
    {
      id: "with-label",
      title: "With Label",
      description: "TextArea with properly associated label for better accessibility.",
      code: textareaWithLabelCode,
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <label htmlFor="message" className="block text-sm text-foreground-300">
            Message
          </label>
          <TextArea
            id="message"
            placeholder="Enter your message..."
            showCharacterCount
          />
        </div>
      ),
    },
    {
      id: "error",
      title: "Error State",
      description: "Display error state with helpful error message.",
      code: textareaErrorStateCode,
      preview: (
        <div className="space-y-2 w-full max-w-sm">
          <TextArea error placeholder="Invalid input" />
          <p className="text-sm text-danger-600">This field is required</p>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "basic",
      name: "Basic",
      description: "Standard textarea for general text entry.",
      code: `<TextArea placeholder="Enter text..." />`,
      preview: <TextArea placeholder="Enter text..." />,
    },
    {
      id: "with-character-count",
      name: "With Character Count",
      description: "Textarea with character count display.",
      code: `<TextArea showCharacterCount placeholder="Enter text..." />`,
      preview: <TextArea showCharacterCount placeholder="Enter text..." />,
    },
    {
      id: "limited-characters",
      name: "Limited Characters",
      description: "Textarea limited to a maximum number of characters.",
      code: `<TextArea showCharacterCount maxCharacters={100} placeholder="Max 100 characters..." />`,
      preview: <TextArea showCharacterCount maxCharacters={100} placeholder="Max 100 characters..." />,
    },
    {
      id: "fixed-size",
      name: "Fixed Size",
      description: "Textarea with fixed size (not resizable).",
      code: `<TextArea resizable={false} placeholder="Fixed size..." />`,
      preview: <TextArea resizable={false} placeholder="Fixed size..." />,
    },
  ],
};
