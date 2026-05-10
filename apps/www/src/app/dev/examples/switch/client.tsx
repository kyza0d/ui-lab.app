"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Switch } from "ui-lab-components";

function InlineFormFieldPreview() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 w-64">
      <label htmlFor="marketing" className="text-sm">
        Marketing emails
      </label>
      <Switch
        id="marketing"
        aria-label="Marketing emails"
        isSelected={enabled}
        onChange={setEnabled}
      />
    </div>
  );
}

function SettingsPanelPreview() {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [badge, setBadge] = useState(true);

  const settings = [
    { id: "notifications", label: "Push notifications", value: notifications, onChange: setNotifications },
    { id: "sounds", label: "Sound effects", value: sounds, onChange: setSounds },
    { id: "badge", label: "App badge", value: badge, onChange: setBadge },
  ];

  return (
    <div className="w-72 divide-y divide-border">
      {settings.map(({ id, label, value, onChange }) => (
        <div key={id} className="flex items-center justify-between py-3">
          <span className="text-sm">{label}</span>
          <Switch aria-label={label} isSelected={value} onChange={onChange} />
        </div>
      ))}
    </div>
  );
}

function DisabledStatePreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch aria-label="Off disabled" isDisabled defaultSelected={false} />
        <span className="text-sm text-muted-foreground">Disabled off</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch aria-label="On disabled" isDisabled defaultSelected={true} />
        <span className="text-sm text-muted-foreground">Disabled on</span>
      </div>
    </div>
  );
}

function SmallSizePreview() {
  const [dense, setDense] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Switch
        size="sm"
        aria-label="Dense mode"
        isSelected={dense}
        onChange={setDense}
      />
      <span className="text-sm text-muted-foreground">Dense mode</span>
    </div>
  );
}

function ControlledTogglePreview() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Switch
        aria-label="Feature flag"
        isSelected={active}
        onChange={setActive}
      />
      <p className="text-xs text-muted-foreground">
        Feature is <strong>{active ? "enabled" : "disabled"}</strong>
      </p>
      <button
        className="text-xs underline text-muted-foreground"
        onClick={() => setActive(false)}
      >
        Reset
      </button>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "inline-form-field",
    title: "Inline Form Field",
    description: "Switch paired with a label in a horizontal form row.",
    preview: <InlineFormFieldPreview />,
    previewLayout: "center",
  },
  {
    id: "settings-panel",
    title: "Settings Panel",
    description: "A list of toggleable settings with dividers.",
    preview: <SettingsPanelPreview />,
    previewLayout: "center",
  },
  {
    id: "disabled-state",
    title: "Disabled State",
    description: "Switch in both on and off disabled states.",
    preview: <DisabledStatePreview />,
    previewLayout: "center",
  },
  {
    id: "small-size",
    title: "Small Size",
    description: "Compact switch for dense UIs.",
    preview: <SmallSizePreview />,
    previewLayout: "center",
  },
  {
    id: "controlled-toggle",
    title: "Controlled Toggle",
    description: "Fully controlled switch with external state and reset.",
    preview: <ControlledTogglePreview />,
    previewLayout: "center",
  },
];

export default function SwitchExamplesPage() {
  return (
    <DevExampleLayout
      title="Switch Examples"
      description="Focused examples of the Switch component across common UI contexts."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
