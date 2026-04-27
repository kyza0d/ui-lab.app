"use client";

import { useState } from "react";
import { Button, Checkbox, Divider, Flex } from "ui-lab-components";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function BasicStatesPreview() {
  return (
    <Flex direction="column" gap="md" style={{ width: 280 }}>
      <Checkbox id="basic-unchecked" label="Unchecked" />
      <Checkbox id="basic-checked" label="Checked" defaultChecked />
      <Checkbox id="basic-disabled" label="Disabled" disabled />
      <Checkbox id="basic-disabled-checked" label="Disabled checked" disabled defaultChecked />
    </Flex>
  );
}

function HelperTextPreview() {
  return (
    <Flex direction="column" gap="lg" style={{ width: 320 }}>
      <Checkbox
        id="helper-release-notes"
        label="Release notes"
        helper="Get a short product update when a new version ships."
        defaultChecked
      />
      <Checkbox
        id="helper-terms"
        label="Accept terms"
        helper="You must accept the terms before continuing."
        helperTextError
        aria-invalid="true"
      />
    </Flex>
  );
}

function ControlledPreview() {
  const [checked, setChecked] = useState(true);

  return (
    <Flex direction="column" gap="md" style={{ width: 300 }}>
      <Checkbox
        id="controlled-email"
        label="Email notifications"
        helper={checked ? "Notifications are enabled." : "Notifications are paused."}
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <Button variant="secondary" onClick={() => setChecked((value) => !value)}>
        {checked ? "Turn off" : "Turn on"}
      </Button>
    </Flex>
  );
}

const subscriptionOptions = [
  "Product updates",
  "Security alerts",
  "Billing reminders",
];

function CheckboxGroupPreview() {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["Product updates", "Security alerts"])
  );

  const toggleOption = (option: string) => {
    setSelected((current) => {
      const next = new Set(current);
      next.has(option) ? next.delete(option) : next.add(option);
      return next;
    });
  };

  return (
    <Flex direction="column" gap="md" style={{ width: 300 }}>
      <div>
        <p className="text-sm font-medium text-foreground-100">Subscriptions</p>
        <p className="text-xs text-foreground-400">Choose the emails this workspace receives.</p>
      </div>
      <Flex direction="column" gap="sm">
        {subscriptionOptions.map((option) => (
          <Checkbox
            key={option}
            id={`subscription-${option.toLowerCase().replaceAll(" ", "-")}`}
            label={option}
            checked={selected.has(option)}
            onChange={() => toggleOption(option)}
          />
        ))}
      </Flex>
    </Flex>
  );
}

const tableColumns = ["Name", "Email", "Role", "Last active"];

function IndeterminatePreview() {
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(["Name", "Email"])
  );

  const allSelected = visibleColumns.size === tableColumns.length;
  const isIndeterminate = visibleColumns.size > 0 && !allSelected;

  const toggleAll = () => {
    setVisibleColumns(allSelected ? new Set() : new Set(tableColumns));
  };

  const toggleColumn = (column: string) => {
    setVisibleColumns((current) => {
      const next = new Set(current);
      next.has(column) ? next.delete(column) : next.add(column);
      return next;
    });
  };

  return (
    <Flex direction="column" gap="sm" style={{ width: 280 }}>
      <Checkbox
        id="columns-all"
        label="Show all columns"
        checked={allSelected}
        isIndeterminate={isIndeterminate}
        onChange={toggleAll}
      />
      <Divider />
      <Flex direction="column" gap="sm" styles={{ root: "pl-8" }}>
        {tableColumns.map((column) => (
          <Checkbox
            key={column}
            id={`column-${column.toLowerCase().replaceAll(" ", "-")}`}
            label={column}
            checked={visibleColumns.has(column)}
            onChange={() => toggleColumn(column)}
          />
        ))}
      </Flex>
    </Flex>
  );
}

function ConsentFormPreview() {
  const [accepted, setAccepted] = useState(false);
  const [updates, setUpdates] = useState(false);

  return (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      <Checkbox
        id="consent-terms"
        label="I agree to the terms"
        helper="Required to create a workspace."
        checked={accepted}
        onChange={(event) => setAccepted(event.currentTarget.checked)}
      />
      <Checkbox
        id="consent-updates"
        label="Send product updates"
        checked={updates}
        onChange={(event) => setUpdates(event.currentTarget.checked)}
      />
      <Button variant="primary" isDisabled={!accepted} styles={{ root: "w-full" }}>
        Continue
      </Button>
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "basic-states",
    title: "Basic States",
    description: "The default checkbox states: unchecked, checked, disabled, and disabled checked.",
    preview: <BasicStatesPreview />,
  },
  {
    id: "helper-text",
    title: "Helper and Error Text",
    description: "A labeled checkbox can include supporting text and an invalid state for form feedback.",
    preview: <HelperTextPreview />,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Use checked and onChange when checkbox state is owned by the surrounding interface.",
    preview: <ControlledPreview />,
  },
  {
    id: "group",
    title: "Checkbox Group",
    description: "Use a small group when a user can select any number of related options.",
    preview: <CheckboxGroupPreview />,
  },
  {
    id: "indeterminate",
    title: "Indeterminate",
    description: "A parent checkbox can show partial selection when only some child options are checked.",
    preview: <IndeterminatePreview />,
  },
  {
    id: "consent-form",
    title: "Consent Form",
    description: "A required checkbox can gate a form action while optional choices remain independent.",
    preview: <ConsentFormPreview />,
  },
];

export default function CheckboxExamplesPage() {
  return (
    <DevExampleLayout
      title="Checkbox Examples"
      description="Minimal checkbox patterns for states, labels, controlled state, groups, indeterminate selection, and consent flows."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
