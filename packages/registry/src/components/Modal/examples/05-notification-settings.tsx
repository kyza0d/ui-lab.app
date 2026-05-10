"use client";

import { useState } from "react";
import { Modal, Button, Switch } from "ui-lab-components";

export const metadata = {
  title: "Notification Settings",
  description: "Settings panel using the compound Modal.Header / Modal.Body / Modal.Footer API with toggle rows.",
};

export default function Example() {
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
