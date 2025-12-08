import { Popover } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { Input } from "@ui-lab/components";
import { Label } from "@ui-lab/components";
import { Badge } from "@ui-lab/components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { FaGear, FaBell, FaEllipsis, FaUser, FaBookmark, FaRightFromBracket } from "react-icons/fa6";
import React from "react";

const popoverControls: ControlDef[] = [
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
    defaultValue: "bottom",
  },
];

const popoverBasicCode = `import { Popover } from "@ui-lab/components";
import { Button } from "@ui-lab/components";

export function Example() {
  return (
    <Popover content="Click outside to close">
      <Button>Open Popover</Button>
    </Popover>
  );
}`;

const popoverPositionsCode = `import { Popover } from "@ui-lab/components";
import { Button } from "@ui-lab/components";

export function Example() {
  return (
    <div className="flex gap-8 justify-center p-12">
      <Popover content="Top position" position="top">
        <Button size="sm">Top</Button>
      </Popover>
      <Popover content="Right position" position="right">
        <Button size="sm">Right</Button>
      </Popover>
      <Popover content="Bottom position" position="bottom">
        <Button size="sm">Bottom</Button>
      </Popover>
      <Popover content="Left position" position="left">
        <Button size="sm">Left</Button>
      </Popover>
    </div>
  );
}`;

const popoverWithFormCode = `import { Popover } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { Input } from "@ui-lab/components";
import { Label } from "@ui-lab/components";

export function Example() {
  return (
    <Popover
      content={
        <div className="space-y-3 w-48">
          <div className="space-y-1">
            <Label className="text-xs">Email</Label>
            <Input size="sm" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Message</Label>
            <input
              type="text"
              placeholder="Enter message"
              className="w-full px-2 py-1 text-sm rounded border border-background-700 bg-background-800 text-foreground-50"
            />
          </div>
          <Button size="sm" className="w-full">Subscribe</Button>
        </div>
      }
    >
      <Button>Subscribe</Button>
    </Popover>
  );
}`;

const popoverWithIconsCode = `import { Popover } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { FaBell, FaGear, FaEllipsis } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex gap-6 justify-center">
      <Popover content="View notifications">
        <button className="p-2 hover:bg-background-800 rounded transition-colors">
          <FaBell className="w-5 h-5" />
        </button>
      </Popover>
      <Popover content="Open settings" position="bottom">
        <button className="p-2 hover:bg-background-800 rounded transition-colors">
          <FaGear className="w-5 h-5" />
        </button>
      </Popover>
      <Popover content="More options" position="left">
        <button className="p-2 hover:bg-background-800 rounded transition-colors">
          <FaEllipsis className="w-5 h-5" />
        </button>
      </Popover>
    </div>
  );
}`;

const popoverRichContentCode = `import { Popover } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { Badge } from "@ui-lab/components";

export function Example() {
  return (
    <Popover
      content={
        <div className="space-y-2 w-56">
          <h3 className="font-semibold text-foreground-50">Product Info</h3>
          <p className="text-xs text-foreground-300">
            High-quality component library built with React and Tailwind CSS
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="success">React</Badge>
            <Badge variant="info">TypeScript</Badge>
            <Badge variant="warning">Customizable</Badge>
          </div>
        </div>
      }
      position="right"
    >
      <Button variant="outline">Learn More</Button>
    </Popover>
  );
}`;

const popoverWithListCode = `import { Popover } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { FaUser, FaGear, FaBookmark, FaSignOutAlt } from "react-icons/fa6";

const menuItems = [
  { label: "Profile", icon: FaUser },
  { label: "Settings", icon: FaGear },
  { label: "Saved Items", icon: FaBookmark },
  { label: "Logout", icon: FaSignOutAlt },
];

export function Example() {
  return (
    <Popover
      content={
        <div className="space-y-1 w-48">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded hover:bg-background-800 transition-colors text-foreground-200 hover:text-foreground-50"
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      }
      position="bottom"
    >
      <Button size="sm">Menu</Button>
    </Popover>
  );
}`;

function BasicExample() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex justify-center p-8">
      <Popover content="Click outside to close" isOpen={isOpen} onOpenChange={setIsOpen}>
        <Button>Open Popover</Button>
      </Popover>
    </div>
  );
}

function BasicExampleWithControls(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex justify-center p-8">
      <Popover
        content="Click outside to close"
        position={props.position as any}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <Button>Open Popover</Button>
      </Popover>
    </div>
  );
}

function PositionsExample() {
  return (
    <div className="flex gap-8 justify-center p-12">
      <Popover content="Top position" position="top">
        <Button size="sm">Top</Button>
      </Popover>
      <Popover content="Right position" position="right">
        <Button size="sm">Right</Button>
      </Popover>
      <Popover content="Bottom position" position="bottom">
        <Button size="sm">Bottom</Button>
      </Popover>
      <Popover content="Left position" position="left">
        <Button size="sm">Left</Button>
      </Popover>
    </div>
  );
}

function FormExample() {
  return (
    <div className="flex justify-center">
      <Popover
        content={
          <div className="space-y-3 w-48">
            <div className="space-y-1">
              <Label className="sm">Email</Label>
              <Input size="sm" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-1">
              <Label className="sm">Message</Label>
              <input
                type="text"
                placeholder="Enter message"
                className="w-full px-2 py-1 text-sm rounded border border-background-700 bg-background-800 text-foreground-50"
              />
            </div>
            <Button size="sm" className="w-full">
              Subscribe
            </Button>
          </div>
        }
      >
        <Button>Subscribe</Button>
      </Popover>
    </div>
  );
}

function IconsExample() {
  return (
    <div className="flex gap-6 justify-center p-8">
      <Popover content="View notifications">
        <button className="p-2 hover:bg-background-800 rounded transition-colors">
          <FaBell className="w-5 h-5" />
        </button>
      </Popover>
      <Popover content="Open settings" position="bottom">
        <button className="p-2 hover:bg-background-800 rounded transition-colors">
          <FaGear className="w-5 h-5" />
        </button>
      </Popover>
      <Popover content="More options" position="left">
        <button className="p-2 hover:bg-background-800 rounded transition-colors">
          <FaEllipsis className="w-5 h-5" />
        </button>
      </Popover>
    </div>
  );
}

function RichContentExample() {
  return (
    <div className="flex justify-center p-8">
      <Popover
        content={
          <div className="space-y-2 w-56">
            <h3 className="font-semibold text-foreground-50">Product Info</h3>
            <p className="text-xs text-foreground-300">
              High-quality component library built with React and Tailwind CSS
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="success">React</Badge>
              <Badge variant="info">TypeScript</Badge>
              <Badge variant="warning">Customizable</Badge>
            </div>
          </div>
        }
        position="right"
      >
        <Button variant="outline">Learn More</Button>
      </Popover>
    </div>
  );
}

function ListExample() {
  const menuItems = [
    { label: "Profile", icon: FaUser },
    { label: "Settings", icon: FaGear },
    { label: "Saved Items", icon: FaBookmark },
    { label: "Logout", icon: FaRightFromBracket },
  ];

  return (
    <div className="flex justify-center p-8">
      <Popover
        content={
          <div className="space-y-1 w-48">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex rounded-md items-center gap-3 w-full px-3 py-2 text-sm rounded hover:bg-background-800 transition-colors text-foreground-200 hover:text-foreground-50"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        }
        position="bottom"
      >
        <Button size="sm">Menu</Button>
      </Popover>
    </div>
  );
}

export const popoverDetail: ComponentDetail = {
  id: "popover",
  name: "Popover",
  description:
    "A floating content container triggered by click with positioning control and click-outside-to-close behavior.",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Popover component displays floating content relative to a trigger element.
        Unlike tooltips which appear on hover, popovers are explicitly triggered by user
        interaction and persist until dismissed.
      </p>
      <p>
        Popovers support four positioning options (top, right, bottom, left), controlled
        or uncontrolled state, and automatic dismissal via click-outside or Escape key.
        Perfect for dropdown menus, notifications, forms, and contextual actions.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Popover",
      description: "A simple popover triggered by button click.",
      code: popoverBasicCode,
      preview: <BasicExample />,
      controls: popoverControls,
      renderPreview: (props: any) => <BasicExampleWithControls {...props} />,
    },
    {
      id: "positions",
      title: "Popover Positions",
      description: "Popovers can be positioned in four directions around the trigger.",
      code: popoverPositionsCode,
      preview: <PositionsExample />,
    },
    {
      id: "with-form",
      title: "Popover with Form",
      description: "Use popovers for inline forms and data input.",
      code: popoverWithFormCode,
      preview: <FormExample />,
    },
    {
      id: "with-icons",
      title: "Popovers on Icons",
      description: "Trigger popovers from icon buttons.",
      code: popoverWithIconsCode,
      preview: <IconsExample />,
    },
    {
      id: "rich-content",
      title: "Rich Content Popover",
      description: "Popovers can contain formatted content with multiple elements.",
      code: popoverRichContentCode,
      preview: <RichContentExample />,
    },
    {
      id: "with-list",
      title: "Popover with Menu List",
      description: "Use popovers for dropdown menus with multiple actions.",
      code: popoverWithListCode,
      preview: <ListExample />,
    },
  ],

  variants: [
    {
      id: "top",
      name: "Top Position",
      description: "Popover appears above the trigger element.",
      code: `<Popover content="Top position" position="top"><Button>Click</Button></Popover>`,
      preview: (
        <div className="flex justify-center p-8">
          <Popover content="Top position" position="top">
            <Button size="sm">Click me</Button>
          </Popover>
        </div>
      ),
    },
    {
      id: "right",
      name: "Right Position",
      description: "Popover appears to the right of the trigger element.",
      code: `<Popover content="Right position" position="right"><Button>Click</Button></Popover>`,
      preview: (
        <div className="flex justify-center p-8">
          <Popover content="Right position" position="right">
            <Button size="sm">Click me</Button>
          </Popover>
        </div>
      ),
    },
    {
      id: "bottom",
      name: "Bottom Position",
      description: "Popover appears below the trigger element.",
      code: `<Popover content="Bottom position" position="bottom"><Button>Click</Button></Popover>`,
      preview: (
        <div className="flex justify-center p-8">
          <Popover content="Bottom position" position="bottom">
            <Button size="sm">Click me</Button>
          </Popover>
        </div>
      ),
    },
    {
      id: "left",
      name: "Left Position",
      description: "Popover appears to the left of the trigger element.",
      code: `<Popover content="Left position" position="left"><Button>Click</Button></Popover>`,
      preview: (
        <div className="flex justify-center p-8">
          <Popover content="Left position" position="left">
            <Button size="sm">Click me</Button>
          </Popover>
        </div>
      ),
    },
  ],
};
