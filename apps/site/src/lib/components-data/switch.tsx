import { Switch } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

// Control definitions for the switch configurator
const switchControls: ControlDef[] = [
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
    name: "checked",
    label: "Checked",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "disabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "pill",
    label: "Pill",
    type: "toggle",
    defaultValue: false,
  },
];

const switchBasicCode = `import { Switch } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}`;

const switchSizesCode = `import { Switch } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [smallChecked, setSmallChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(true);
  const [largeChecked, setLargeChecked] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Switch
        size="sm"
        checked={smallChecked}
        onCheckedChange={setSmallChecked}
      />
      <Switch
        size="md"
        checked={mediumChecked}
        onCheckedChange={setMediumChecked}
      />
      <Switch
        size="lg"
        checked={largeChecked}
        onCheckedChange={setLargeChecked}
      />
    </div>
  );
}`;

const switchDisabledCode = `import { Switch } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Switch disabled={false} defaultChecked={true} />
      <Switch disabled={true} defaultChecked={false} />
      <Switch disabled={true} defaultChecked={true} />
    </div>
  );
}`;

const switchFormCode = `import { Switch } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground-300">Enable Notifications</label>
        <Switch
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground-300">Dark Mode</label>
        <Switch
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground-300">Marketing Emails</label>
        <Switch
          checked={marketing}
          onCheckedChange={setMarketing}
        />
      </div>
    </div>
  );
}`;

const switchStatesCode = `import { Switch } from "ui-lab-components";

export function Example() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Switch defaultChecked={false} />
        <span className="text-sm text-foreground-300">Off</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch defaultChecked={true} />
        <span className="text-sm text-foreground-300">On</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch disabled={true} defaultChecked={false} />
        <span className="text-sm text-foreground-300">Disabled Off</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch disabled={true} defaultChecked={true} />
        <span className="text-sm text-foreground-300">Disabled On</span>
      </div>
    </div>
  );
}`;

const switchPillCode = `import { Switch } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [smallChecked, setSmallChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(true);
  const [largeChecked, setLargeChecked] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Switch
        size="sm"
        pill
        checked={smallChecked}
        onCheckedChange={setSmallChecked}
      />
      <Switch
        size="md"
        pill
        checked={mediumChecked}
        onCheckedChange={setMediumChecked}
      />
      <Switch
        size="lg"
        pill
        checked={largeChecked}
        onCheckedChange={setLargeChecked}
      />
    </div>
  );
}`;

export const switchDetail: ComponentDetail = {
  id: "switch",
  name: "Switch",
  description:
    "A toggle switch component for binary on/off states. Perfect for settings, preferences, and feature toggles.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Switch component provides a clear, intuitive way to toggle between two states. It's ideal for settings, preferences, and feature flags where users need to enable or disable something.
      </p>
      <p>
        Switches support multiple sizes, controlled and uncontrolled modes, and disabled states. The smooth animation and clear visual feedback make it easy for users to understand the current state.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Switch",
      description: "The simplest form of a switch with default size.",
      code: switchBasicCode,
      preview: <Switch />,
      controls: switchControls,
      renderPreview: (props: any) => (
        <Switch
          size={props.size as any}
          checked={props.checked}
          disabled={props.disabled}
          {...(props.pill && { pill: true })}
        />
      ),
    },
    {
      id: "sizes",
      title: "Switch Sizes",
      description: "Three size options for different contexts and use cases.",
      code: switchSizesCode,
      preview: (
        <div className="flex items-center gap-6">
          <Switch size="sm" defaultChecked={false} />
          <Switch size="md" defaultChecked={true} />
          <Switch size="lg" defaultChecked={false} />
        </div>
      ),
    },
    {
      id: "disabled",
      title: "Disabled State",
      description: "Switches can be disabled to prevent user interaction.",
      code: switchDisabledCode,
      preview: (
        <div className="flex items-center gap-4">
          <Switch disabled={false} defaultChecked={true} />
          <Switch disabled={true} defaultChecked={false} />
          <Switch disabled={true} defaultChecked={true} />
        </div>
      ),
    },
    {
      id: "form",
      title: "In Settings Form",
      description: "Common usage pattern in settings and preferences forms.",
      code: switchFormCode,
      preview: (
        <div className="space-y-4 w-full max-w-sm">
          <div className="flex items-center justify-between">
            <label className="text-sm text-foreground-300">
              Enable Notifications
            </label>
            <Switch defaultChecked={true} />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-foreground-300">Dark Mode</label>
            <Switch defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-foreground-300">
              Marketing Emails
            </label>
            <Switch defaultChecked={false} />
          </div>
        </div>
      ),
    },
    {
      id: "states",
      title: "All States",
      description: "Visual display of all possible switch states.",
      code: switchStatesCode,
      preview: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Switch defaultChecked={false} />
            <span className="text-sm text-foreground-300">Off</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch defaultChecked={true} />
            <span className="text-sm text-foreground-300">On</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch disabled={true} defaultChecked={false} />
            <span className="text-sm text-foreground-300">Disabled Off</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch disabled={true} defaultChecked={true} />
            <span className="text-sm text-foreground-300">Disabled On</span>
          </div>
        </div>
      ),
    },
    {
      id: "pill",
      title: "Pill Variant",
      description: "Switch with fully rounded pill shape.",
      code: switchPillCode,
      preview: (
        <div className="flex items-center gap-6">
          <Switch size="sm" pill defaultChecked={false} />
          <Switch size="md" pill defaultChecked={true} />
          <Switch size="lg" pill defaultChecked={false} />
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "off",
      name: "Off State",
      description: "Switch in the off/unchecked state.",
      code: `<Switch defaultChecked={false} />`,
      preview: <Switch defaultChecked={false} />,
    },
    {
      id: "on",
      name: "On State",
      description: "Switch in the on/checked state.",
      code: `<Switch defaultChecked={true} />`,
      preview: <Switch defaultChecked={true} />,
    },
    {
      id: "disabled-off",
      name: "Disabled Off",
      description: "Disabled switch in the off state.",
      code: `<Switch disabled={true} defaultChecked={false} />`,
      preview: <Switch disabled={true} defaultChecked={false} />,
    },
    {
      id: "disabled-on",
      name: "Disabled On",
      description: "Disabled switch in the on state.",
      code: `<Switch disabled={true} defaultChecked={true} />`,
      preview: <Switch disabled={true} defaultChecked={true} />,
    },
    {
      id: "pill-off",
      name: "Pill Off",
      description: "Pill-shaped switch in the off state.",
      code: `<Switch pill defaultChecked={false} />`,
      preview: <Switch pill defaultChecked={false} />,
    },
    {
      id: "pill-on",
      name: "Pill On",
      description: "Pill-shaped switch in the on state.",
      code: `<Switch pill defaultChecked={true} />`,
      preview: <Switch pill defaultChecked={true} />,
    },
  ],
};
