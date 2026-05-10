"use client";

import { useState } from "react";
import { Modal, Button } from "ui-lab-components";

export const metadata = {
  title: "Delete Confirmation",
  description: "Destructive action dialog that blocks the user until they explicitly confirm or cancel.",
};

export default function Example() {
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
