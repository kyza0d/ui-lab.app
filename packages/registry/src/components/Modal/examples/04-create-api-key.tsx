"use client";

import { useState } from "react";
import { Modal, Button, Input, Label } from "ui-lab-components";

export const metadata = {
  title: "Create API Key",
  description: "Form modal with a single required input. The primary action stays disabled until the field has a value.",
};

export default function Example() {
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
