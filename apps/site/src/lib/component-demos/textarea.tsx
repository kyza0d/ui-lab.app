import { TextArea } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

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
          resizable={props.resizable}
          showCharacterCount={props.showCharacterCount}
          placeholder={props.placeholder}
        />
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
              placeholder="Limited to 100 characters..."
            />
          </div>
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
    }
  ],
};
