"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Modal, Button, Input, Label, Switch } from "ui-lab-components";

function DeleteConfirmationPreview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete workspace
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Delete workspace"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-foreground-300">
          This will permanently delete <strong className="text-foreground-100">acme-corp</strong> and all
          its data. This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}

function CreateApiKeyPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>New API key</Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="New API key"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              isDisabled={!name.trim()}
            >
              Create
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="key-name">Name</Label>
            <Input
              id="key-name"
              placeholder="e.g. CI deploy key"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <p className="text-xs text-foreground-400">
            The key will only be shown once after creation.
          </p>
        </div>
      </Modal>
    </>
  );
}

function NotificationSettingsPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState({ email: true, push: false, marketing: false });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <Button variant="ghost" onClick={() => setIsOpen(true)}>
        Notification settings
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Header>
          <span className="text-sm font-semibold text-foreground-100">Notification preferences</span>
        </Modal.Header>

        <Modal.Body>
          <div className="flex flex-col divide-y divide-border px-6">
            {(
              [
                { key: "email", label: "Email notifications", description: "Receive updates and alerts by email" },
                { key: "push", label: "Push notifications", description: "Browser and mobile push alerts" },
                { key: "marketing", label: "Product updates", description: "New features and announcements" },
              ] as const
            ).map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between py-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-foreground-100">{label}</span>
                  <span className="text-xs text-foreground-400">{description}</span>
                </div>
                <Switch isSelected={prefs[key]} onChange={() => toggle(key)} />
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const examples: DevExample[] = [
  {
    id: "delete-confirmation",
    title: "Delete Confirmation",
    description: "Destructive action dialog that blocks the user until they explicitly confirm or cancel.",
    preview: <DeleteConfirmationPreview />,
    previewLayout: "center",
  },
  {
    id: "create-api-key",
    title: "Create API Key",
    description: "Form modal with a single required input. The primary action stays disabled until the field has a value.",
    preview: <CreateApiKeyPreview />,
    previewLayout: "center",
  },
  {
    id: "notification-settings",
    title: "Notification Settings",
    description: "Settings panel using the compound Modal.Header / Modal.Body / Modal.Footer API with toggle rows.",
    preview: <NotificationSettingsPreview />,
    previewLayout: "center",
  },
];

export default function ModalExamplesPage() {
  return (
    <DevExampleLayout
      title="Modal Examples"
      description="Focused modal patterns: destructive confirmation, form entry, and a compound-slot settings panel."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
