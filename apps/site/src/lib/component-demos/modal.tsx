import React, { useState } from "react";
import { Modal } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Label } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

// Preview components
function BasicModalPreview(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
        size={props.size}
        closeButton={props.closeButton}
        onBackdropClick={props.onBackdropClick}
      >
        <p className="text-foreground-300">
          This is a simple modal dialog. Click the X or outside to close.
        </p>
      </Modal>
    </>
  );
}

function ConfirmationModalPreview(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setIsOpen(false);
    setTimeout(() => setConfirmed(false), 3000);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete Item</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Delete"
        footer={
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleConfirm}
              className="flex-1"
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        }
        size={props.size}
        closeButton={props.closeButton}
        onBackdropClick={props.onBackdropClick}
      >
        <p className="text-foreground-300">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </Modal>

      {confirmed && (
        <div className="mt-4 p-3 bg-accent-500/20 border border-accent-500 rounded-md">
          <p className="text-sm text-accent-100">
            Item deleted successfully!
          </p>
        </div>
      )}
    </>
  );
}

function FormModalPreview(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsOpen(false);
    setFormData({ name: "", email: "" });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create User</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New User"
        footer={
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="flex-1"
            >
              Create
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        }
        size={props.size}
        closeButton={props.closeButton}
        onBackdropClick={props.onBackdropClick}
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

function AlertModalPreview(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );

  const showAlert = (type: "success" | "error" | "warning") => {
    setAlertType(type);
    setIsOpen(true);
  };

  const alerts = {
    success: {
      title: "Success!",
      message: "Your action was completed successfully.",
      color: "bg-success-600/40 text-success-700 border-success-600/50",
    },
    error: {
      title: "Error",
      message: "Something went wrong. Please try again.",
      color: "bg-danger-600/40 text-danger-700 border-danger-600/50",
    },
    warning: {
      title: "Warning",
      message: "Please review your action before proceeding.",
      color: "bg-warning-600/40 text-warning-700 border-warning-600/50",
    },
  };

  const alert = alerts[alertType];

  return (
    <>
      <div className="flex gap-3">
        <Button onClick={() => showAlert("success")}>Success Alert</Button>
        <Button onClick={() => showAlert("error")} variant="outline">
          Error Alert
        </Button>
        <Button onClick={() => showAlert("warning")} variant="outline">
          Warning Alert
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={alert.title}
        onBackdropClick={false}
        size={props.size}
        closeButton={props.closeButton}
      >
        <div className={`p-4 rounded-lg border ${alert.color}`}>
          <p className="text-sm">{alert.message}</p>
        </div>
        <div className="mt-4">
          <Button
            variant="primary"
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            Dismiss
          </Button>
        </div>
      </Modal>
    </>
  );
}

function SizedModalsPreview(props: any) {
  const [openSize, setOpenSize] = useState<"sm" | "md" | "lg" | "xl" | null>(
    null
  );

  const sizes = [
    { size: "sm" as const, label: "Small" },
    { size: "md" as const, label: "Medium" },
    { size: "lg" as const, label: "Large" },
    { size: "xl" as const, label: "Extra Large" },
  ];

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {sizes.map(({ size, label }) => (
          <Button
            key={size}
            variant="outline"
            onClick={() => setOpenSize(size)}
            size="sm"
          >
            {label}
          </Button>
        ))}
      </div>

      {sizes.map(({ size, label }) => (
        <Modal
          key={size}
          isOpen={openSize === size}
          onClose={() => setOpenSize(null)}
          title={`${label} Modal`}
          size={size}
          closeButton={props.closeButton}
          onBackdropClick={props.onBackdropClick}
        >
          <p className="text-foreground-300">
            This is a {label.toLowerCase()} modal. It has a responsive
            max-width.
          </p>
          <p className="text-sm text-foreground-500 mt-4">
            You can use different sizes for different types of content.
          </p>
        </Modal>
      ))}
    </>
  );
}

// Control definitions for the modal configurator
const modalControls: ControlDef[] = [
  {
    name: "size",
    label: "Size",
    type: "select",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
    ],
    defaultValue: "md",
  },
  {
    name: "closeButton",
    label: "Close Button",
    type: "toggle",
    defaultValue: true,
  },
  {
    name: "onBackdropClick",
    label: "Close on Backdrop Click",
    type: "toggle",
    defaultValue: true,
  },
];

const basicModalCode = `import { useState } from "react";
import { Modal } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
      >
        <p className="text-foreground-300">
          This is a simple modal dialog. Click the X or outside to close.
        </p>
      </Modal>
    </>
  );
}`;

const confirmationModalCode = `import { useState } from "react";
import { Modal } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setIsOpen(false);
    setTimeout(() => setConfirmed(false), 3000);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Delete"
      >
        <p className="text-foreground-300 mb-4">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </Modal>

      {confirmed && (
        <div className="mt-4 p-3 bg-accent-500/20 border border-accent-500 rounded-md">
          <p className="text-sm text-accent-100">Item deleted successfully!</p>
        </div>
      )}
    </>
  );
}`;

const formModalCode = `import { useState } from "react";
import { Modal } from "ui-lab-components";
import { Button } from "ui-lab-components";
import { Input } from "ui-lab-components";
import { Label } from "ui-lab-components";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Create User
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New User"
        footer={
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="flex-1"
            >
              Create
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </form>
      </Modal>
    </>
  );
}`;

const alertModalCode = `import { useState } from "react";
import { Modal } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">("success");

  const showAlert = (type: "success" | "error" | "warning") => {
    setAlertType(type);
    setIsOpen(true);
  };

  const alerts = {
    success: {
      title: "Success!",
      message: "Your action was completed successfully.",
      color: "bg-accent-500/20 border-accent-500",
    },
    error: {
      title: "Error",
      message: "Something went wrong. Please try again.",
      color: "bg-danger-600/20 border-danger-600",
    },
    warning: {
      title: "Warning",
      message: "Please review your action before proceeding.",
      color: "bg-yellow-600/20 border-yellow-600",
    },
  };

  const alert = alerts[alertType];

  return (
    <>
      <div className="flex gap-3">
        <Button onClick={() => showAlert("success")}>
          Success Alert
        </Button>
        <Button onClick={() => showAlert("error")} variant="outline">
          Error Alert
        </Button>
        <Button onClick={() => showAlert("warning")} variant="outline">
          Warning Alert
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={alert.title}
        onBackdropClick={false}
      >
        <div className={\`p-4 rounded-lg border \${alert.color}\`}>
          <p className="text-sm text-foreground-100">{alert.message}</p>
        </div>
        <div className="mt-4">
          <Button
            variant="primary"
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            Dismiss
          </Button>
        </div>
      </Modal>
    </>
  );
}`;

const sizedModalsCode = `import { useState } from "react";
import { Modal } from "ui-lab-components";
import { Button } from "ui-lab-components";

export function Example() {
  const [openSize, setOpenSize] = useState<"sm" | "md" | "lg" | "xl" | null>(null);

  const sizes = [
    { size: "sm" as const, label: "Small", width: "max-w-sm" },
    { size: "md" as const, label: "Medium", width: "max-w-md" },
    { size: "lg" as const, label: "Large", width: "max-w-lg" },
    { size: "xl" as const, label: "Extra Large", width: "max-w-2xl" },
  ];

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {sizes.map(({ size, label }) => (
          <Button
            key={size}
            variant="outline"
            onClick={() => setOpenSize(size)}
          >
            {label}
          </Button>
        ))}
      </div>

      {sizes.map(({ size, label, width }) => (
        <Modal
          key={size}
          isOpen={openSize === size}
          onClose={() => setOpenSize(null)}
          title={\`\${label} Modal\`}
          size={size}
        >
          <p className="text-foreground-300">
            This is a {label.toLowerCase()} modal. It has a max-width of {width}.
          </p>
          <p className="text-sm text-foreground-500 mt-4">
            You can use different sizes for different types of content.
          </p>
        </Modal>
      ))}
    </>
  );
}`;

export const modalDetail: ComponentDetail = {
  id: "modal",
  name: "Modal",
  description: "A dialog component for displaying content in a modal overlay with support for forms, confirmations, and alerts.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Modal component displays content in a centedanger dialog that blocks interaction with the page behind it. It's built with accessibility in mind and includes keyboard handling (Escape to close) and backdrop click handling.
      </p>
      <p>
        Use modals for important user interactions like confirmations, forms, alerts, or when you need focused user attention. The component supports various sizes and can include headers, bodies, and footers.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Modal",
      description: "A simple modal with title and content.",
      code: basicModalCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Open modal examples in the preview area
          </p>
        </div>
      ),
      renderPreview: BasicModalPreview,
      controls: modalControls,
    },
    {
      id: "confirmation",
      title: "Confirmation Dialog",
      description: "A modal for confirming destructive actions with action buttons in the footer.",
      code: confirmationModalCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Open modal examples in the preview area
          </p>
        </div>
      ),
      renderPreview: ConfirmationModalPreview,
    },
    {
      id: "form",
      title: "Form Modal",
      description: "A modal containing a form with input fields and submission buttons.",
      code: formModalCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Open modal examples in the preview area
          </p>
        </div>
      ),
      renderPreview: FormModalPreview,
    },
    {
      id: "alert",
      title: "Alert Modal",
      description: "Styled alert modals for success, error, and warning states.",
      code: alertModalCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Open modal examples in the preview area
          </p>
        </div>
      ),
      renderPreview: AlertModalPreview,
    },
    {
      id: "sizes",
      title: "Modal Sizes",
      description: "Different modal sizes for various content types.",
      code: sizedModalsCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">
            Open modal examples in the preview area
          </p>
        </div>
      ),
      renderPreview: SizedModalsPreview,
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard modal with title and content.",
      code: basicModalCode,
      preview: (
        <div className="text-sm text-foreground-400">
          Open modal in preview
        </div>
      ),
    },
  ],
};
