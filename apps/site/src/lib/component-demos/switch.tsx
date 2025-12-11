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
    name: "selected",
    label: "Selected",
    type: "toggle",
    defaultValue: false,
  },
  {
    name: "isDisabled",
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
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Switch
      isSelected={isSelected}
      onChange={setIsSelected}
    />
  );
}`;

const switchSizesCode = `import { Switch } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [smallSelected, setSmallSelected] = useState(false);
  const [mediumSelected, setMediumSelected] = useState(true);
  const [largeSelected, setLargeSelected] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Switch
        size="sm"
        isSelected={smallSelected}
        onChange={setSmallSelected}
      />
      <Switch
        size="md"
        isSelected={mediumSelected}
        onChange={setMediumSelected}
      />
      <Switch
        size="lg"
        isSelected={largeSelected}
        onChange={setLargeSelected}
      />
    </div>
  );
}`;

const switchDisabledCode = `import { Switch } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Switch isDisabled={false} defaultSelected={true} />
      <Switch isDisabled={true} defaultSelected={false} />
      <Switch isDisabled={true} defaultSelected={true} />
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
          isSelected={notifications}
          onChange={setNotifications}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground-300">Dark Mode</label>
        <Switch
          isSelected={darkMode}
          onChange={setDarkMode}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm text-foreground-300">Marketing Emails</label>
        <Switch
          isSelected={marketing}
          onChange={setMarketing}
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
        <Switch defaultSelected={false} />
        <span className="text-sm text-foreground-300">Off</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch defaultSelected={true} />
        <span className="text-sm text-foreground-300">On</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch isDisabled={true} defaultSelected={false} />
        <span className="text-sm text-foreground-300">Disabled Off</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch isDisabled={true} defaultSelected={true} />
        <span className="text-sm text-foreground-300">Disabled On</span>
      </div>
    </div>
  );
}`;

const switchPillCode = `import { Switch } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [smallSelected, setSmallSelected] = useState(false);
  const [mediumSelected, setMediumSelected] = useState(true);
  const [largeSelected, setLargeSelected] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Switch
        size="sm"
        pill
        isSelected={smallSelected}
        onChange={setSmallSelected}
      />
      <Switch
        size="md"
        pill
        isSelected={mediumSelected}
        onChange={setMediumSelected}
      />
      <Switch
        size="lg"
        pill
        isSelected={largeSelected}
        onChange={setLargeSelected}
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
          isSelected={props.selected}
          onChange={(value) => props.handleControlChange('selected', value)}
          isDisabled={props.isDisabled}
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
          <Switch size="sm" defaultSelected={false} />
          <Switch size="md" defaultSelected={true} />
          <Switch size="lg" defaultSelected={false} />
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
          <Switch isDisabled={false} defaultSelected={true} />
          <Switch isDisabled={true} defaultSelected={false} />
          <Switch isDisabled={true} defaultSelected={true} />
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
            <Switch defaultSelected={true} />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-foreground-300">Dark Mode</label>
            <Switch defaultSelected={false} />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-foreground-300">
              Marketing Emails
            </label>
            <Switch defaultSelected={false} />
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
            <Switch defaultSelected={false} />
            <span className="text-sm text-foreground-300">Off</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch defaultSelected={true} />
            <span className="text-sm text-foreground-300">On</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch isDisabled={true} defaultSelected={false} />
            <span className="text-sm text-foreground-300">Disabled Off</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch isDisabled={true} defaultSelected={true} />
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
          <Switch size="sm" pill defaultSelected={false} />
          <Switch size="md" pill defaultSelected={true} />
          <Switch size="lg" pill defaultSelected={false} />
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "off",
      name: "Off State",
      description: "Switch in the off/unchecked state.",
      code: `<Switch defaultSelected={false} />`,
      preview: <Switch defaultSelected={false} />,
    },
    {
      id: "on",
      name: "On State",
      description: "Switch in the on/checked state.",
      code: `<Switch defaultSelected={true} />`,
      preview: <Switch defaultSelected={true} />,
    },
    {
      id: "disabled-off",
      name: "Disabled Off",
      description: "Disabled switch in the off state.",
      code: `<Switch isDisabled={true} defaultSelected={false} />`,
      preview: <Switch isDisabled={true} defaultSelected={false} />,
    },
    {
      id: "disabled-on",
      name: "Disabled On",
      description: "Disabled switch in the on state.",
      code: `<Switch isDisabled={true} defaultSelected={true} />`,
      preview: <Switch isDisabled={true} defaultSelected={true} />,
    },
    {
      id: "pill-off",
      name: "Pill Off",
      description: "Pill-shaped switch in the off state.",
      code: `<Switch pill defaultSelected={false} />`,
      preview: <Switch pill defaultSelected={false} />,
    },
    {
      id: "pill-on",
      name: "Pill On",
      description: "Pill-shaped switch in the on state.",
      code: `<Switch pill defaultSelected={true} />`,
      preview: <Switch pill defaultSelected={true} />,
    },
  ],
};
