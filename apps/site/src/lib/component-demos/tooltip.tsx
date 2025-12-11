import { Tooltip } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { Badge } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import {
  FaQuestion,
  FaInfo,
  FaHeart,
  FaStar,
  FaDownload,
  FaGear,
} from "react-icons/fa6";

const tooltipControls: ControlDef[] = [
  {
    name: "position",
    label: "Position",
    type: "select",
    options: [
      { label: "Top", value: "top" },
      { label: "Right", value: "right" },
      { label: "Bottom", value: "bottom" },
      { label: "Left", value: "left" },
    ],
    defaultValue: "top",
  },
  {
    name: "delay",
    label: "Delay (ms)",
    type: "select",
    options: [
      { label: "No Delay", value: "0" },
      { label: "200ms", value: "200" },
      { label: "500ms", value: "500" },
    ],
    defaultValue: "200",
  },
];

const tooltipBasicCode = `import { Tooltip } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <Tooltip content="Click to perform action">
      <Button>Hover me</Button>
    </Tooltip>
  );
}`;

const tooltipPositionsCode = `import { Tooltip } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex gap-8 justify-center p-12">
      <Tooltip content="Top position" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right position" position="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom position" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left position" position="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  );
}`;

const tooltipWithIconsCode = `import { Tooltip } from "ui-lab-components";
import { FaHeart, FaStar, FaDownload } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Add to favorites">
        <button className="p-2 hover:bg-background-800 rounded">
          <FaHeart className="w-5 h-5 text-red-500" />
        </button>
      </Tooltip>
      <Tooltip content="Rate this item">
        <button className="p-2 hover:bg-background-800 rounded">
          <FaStar className="w-5 h-5 text-yellow-500" />
        </button>
      </Tooltip>
      <Tooltip content="Download file">
        <button className="p-2 hover:bg-background-800 rounded">
          <FaDownload className="w-5 h-5 text-blue-500" />
        </button>
      </Tooltip>
    </div>
  );
}`;

const tooltipWithBadgeCode = `import { Tooltip } from "ui-lab-components";
import { Badge } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Tooltip content="Status: Active">
        <Badge variant="success">Active</Badge>
      </Tooltip>
      <Tooltip content="Status: In Review">
        <Badge variant="warning">Pending</Badge>
      </Tooltip>
      <Tooltip content="Status: Inactive">
        <Badge variant="default">Inactive</Badge>
      </Tooltip>
    </div>
  );
}`;

const tooltipWithInputCode = `import { Tooltip } from "ui-lab-components";
import { Input } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <Tooltip content="Enter your full name">
        <Input placeholder="Full name" />
      </Tooltip>
      <Tooltip content="Use a valid email address">
        <Input type="email" placeholder="Email" />
      </Tooltip>
      <Tooltip content="At least 8 characters required">
        <Input type="password" placeholder="Password" />
      </Tooltip>
    </div>
  );
}`;

const tooltipRichContentCode = `import { Tooltip } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex gap-4">
      <Tooltip
        content={
          <div className="text-center">
            <p className="font-semibold">Keyboard Shortcut</p>
            <p className="text-xs mt-1">Ctrl + S</p>
          </div>
        }
      >
        <Button size="sm">Save</Button>
      </Tooltip>
      <Tooltip
        content={
          <div>
            <p className="font-semibold mb-1">Pro Tip:</p>
            <p className="text-xs">Use this feature for bulk operations</p>
          </div>
        }
      >
        <Button size="sm" variant="outline">
          Info
        </Button>
      </Tooltip>
    </div>
  );
}`;

const tooltipOnIconsCode = `import { Tooltip } from "ui-lab-components";
import { FaQuestion, FaInfo, FaGear } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex gap-6 items-center">
      <Tooltip content="Help: Click for more information">
        <FaQuestion className="w-5 h-5 text-foreground-400 cursor-help hover:text-foreground-50" />
      </Tooltip>
      <Tooltip content="Information about this feature">
        <FaInfo className="w-5 h-5 text-info-500 cursor-help hover:text-info-400" />
      </Tooltip>
      <Tooltip content="Open settings">
        <FaGear className="w-5 h-5 text-foreground-400 cursor-pointer hover:text-foreground-50" />
      </Tooltip>
    </div>
  );
}`;

export const tooltipDetail: ComponentDetail = {
  id: "tooltip",
  name: "Tooltip",
  description:
    "A floating label component that appears on hover with positioning control and portal rendering for hover information and contextual help.",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Tooltip component provides contextual information on hover. It uses
        a portal to render content outside of the normal DOM hierarchy, ensuring
        proper layering and positioning even within complex nested structures.
      </p>
      <p>
        With support for four positioning options (top, right, bottom, left),
        configurable delay, and flexible content, tooltips enhance user
        experience by providing helpful guidance and information without
        cluttering the interface.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Tooltip",
      description: "A simple tooltip on a button that shows on hover.",
      code: tooltipBasicCode,
      preview: (
        <div className="flex justify-center p-8">
          <Tooltip content="Click to perform action">
            <Button>Hover me</Button>
          </Tooltip>
        </div>
      ),
      controls: tooltipControls,
      renderPreview: (props: any) => (
        <div className="flex justify-center p-8">
          <Tooltip
            content="Tooltip content"
            position={props.position as any}
            delay={parseInt(props.delay)}
          >
            <Button>Hover me</Button>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "positions",
      title: "Tooltip Positions",
      description: "Tooltips can be positioned in four directions around the trigger.",
      code: tooltipPositionsCode,
      preview: (
        <div className="flex gap-8 justify-center p-12">
          <Tooltip content="Top position" position="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content="Right position" position="right">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip content="Bottom position" position="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content="Left position" position="left">
            <Button>Left</Button>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "with-icons",
      title: "Tooltips on Icons",
      description: "Use tooltips with icon buttons for enhanced UX.",
      code: tooltipWithIconsCode,
      preview: (
        <div className="flex gap-4 justify-center p-8">
          <Tooltip content="Add to favorites">
            <button className="p-2 hover:bg-background-800 rounded transition-colors">
              <FaHeart className="w-5 h-5 text-danger-500" />
            </button>
          </Tooltip>
          <Tooltip content="Rate this item">
            <button className="p-2 hover:bg-background-800 rounded transition-colors">
              <FaStar className="w-5 h-5 text-warning-500" />
            </button>
          </Tooltip>
          <Tooltip content="Download file">
            <button className="p-2 hover:bg-background-800 rounded transition-colors">
              <FaDownload className="w-5 h-5 text-info-500" />
            </button>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "with-badges",
      title: "Tooltips with Badges",
      description: "Use tooltips to provide additional context for status badges.",
      code: tooltipWithBadgeCode,
      preview: (
        <div className="flex flex-wrap gap-3 justify-center p-8">
          <Tooltip content="Status: Active">
            <Badge variant="success">Active</Badge>
          </Tooltip>
          <Tooltip content="Status: In Review">
            <Badge variant="warning">Pending</Badge>
          </Tooltip>
          <Tooltip content="Status: Inactive">
            <Badge variant="default">Inactive</Badge>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "with-inputs",
      title: "Tooltips with Form Fields",
      description: "Provide helpful hints for form inputs with tooltips.",
      code: tooltipWithInputCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm mx-auto p-8">
          <Tooltip content="Enter your full name">
            <Input placeholder="Full name" size="sm" />
          </Tooltip>
          <Tooltip content="Use a valid email address">
            <Input type="email" placeholder="Email" size="sm" />
          </Tooltip>
          <Tooltip content="At least 8 characters required">
            <Input type="password" placeholder="Password" size="sm" />
          </Tooltip>
        </div>
      ),
    },
    {
      id: "rich-content",
      title: "Rich Content Tooltip",
      description: "Tooltips can contain formatted content with multiple elements.",
      code: tooltipRichContentCode,
      preview: (
        <div className="flex gap-4 justify-center p-8">
          <Tooltip
            content={
              <div className="text-center">
                <p className="font-semibold">Keyboard Shortcut</p>
                <p className="text-xs mt-1">Ctrl + S</p>
              </div>
            }
          >
            <Button size="sm">Save</Button>
          </Tooltip>
          <Tooltip
            content={
              <div>
                <p className="font-semibold mb-1">Pro Tip:</p>
                <p className="text-xs">Use this feature for bulk operations</p>
              </div>
            }
          >
            <Button size="sm" variant="outline">
              Info
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "on-icons",
      title: "Tooltip on Icon Elements",
      description: "Tooltips work great for providing context to standalone icons.",
      code: tooltipOnIconsCode,
      preview: (
        <div className="flex gap-6 items-center justify-center p-8">
          <Tooltip content="Help: Click for more information">
            <FaQuestion className="w-5 h-5 text-foreground-400 cursor-help hover:text-foreground-50 transition-colors" />
          </Tooltip>
          <Tooltip content="Information about this feature">
            <FaInfo className="w-5 h-5 text-info-500 cursor-help hover:text-info-400 transition-colors" />
          </Tooltip>
          <Tooltip content="Open settings">
            <FaGear className="w-5 h-5 text-foreground-400 cursor-pointer hover:text-foreground-50 transition-colors" />
          </Tooltip>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "top",
      name: "Top Position",
      description: "Tooltip appears above the trigger element.",
      code: `<Tooltip content="Top position" position="top"><Button>Hover</Button></Tooltip>`,
      preview: (
        <div className="flex justify-center p-8">
          <Tooltip content="Top position" position="top">
            <Button size="sm">Hover me</Button>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "right",
      name: "Right Position",
      description: "Tooltip appears to the right of the trigger element.",
      code: `<Tooltip content="Right position" position="right"><Button>Hover</Button></Tooltip>`,
      preview: (
        <div className="flex justify-center p-8">
          <Tooltip content="Right position" position="right">
            <Button size="sm">Hover me</Button>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "bottom",
      name: "Bottom Position",
      description: "Tooltip appears below the trigger element.",
      code: `<Tooltip content="Bottom position" position="bottom"><Button>Hover</Button></Tooltip>`,
      preview: (
        <div className="flex justify-center p-8">
          <Tooltip content="Bottom position" position="bottom">
            <Button size="sm">Hover me</Button>
          </Tooltip>
        </div>
      ),
    },
    {
      id: "left",
      name: "Left Position",
      description: "Tooltip appears to the left of the trigger element.",
      code: `<Tooltip content="Left position" position="left"><Button>Hover</Button></Tooltip>`,
      preview: (
        <div className="flex justify-center p-8">
          <Tooltip content="Left position" position="left">
            <Button size="sm">Hover me</Button>
          </Tooltip>
        </div>
      ),
    },
  ],
};
