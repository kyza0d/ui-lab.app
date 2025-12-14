"use client"
import React, { useState } from "react"
import { Confirmation } from "ui-lab-components"
import { ComponentDetail } from "@/types/component"

// Example code snippets
const basicInlineCode = `import { Confirmation } from "ui-lab-components";

export function Example() {
  return (
    <Confirmation
      severity="low"
      triggerLabel="Clear Cache"
      confirmLabel="Clear"
      description="This will delete all cached files"
      onConfirm={() => console.log("Cache cleared")}
    />
  );
}`

const basicDialogCode = `import { Confirmation } from "ui-lab-components";

export function Example() {
  return (
    <Confirmation
      mode="dialog"
      severity="high"
      triggerLabel="Delete Project"
      title="Delete Project?"
      description="This action cannot be undone. All project files will be permanently deleted."
      destructiveActionWarning="Make sure you have a backup before proceeding."
      onConfirm={() => console.log("Project deleted")}
    />
  );
}`

const severityLevelsCode = `import { Confirmation } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex flex-wrap gap-4">
      <Confirmation
        severity="low"
        triggerLabel="Low Severity"
        description="Reversible action"
        onConfirm={() => alert("Low severity action confirmed")}
      />
      <Confirmation
        severity="medium"
        triggerLabel="Medium Severity"
        description="Important action"
        onConfirm={() => alert("Medium severity action confirmed")}
      />
      <Confirmation
        severity="high"
        mode="dialog"
        triggerLabel="High Severity"
        title="Confirm High Severity Action?"
        description="This is an important destructive action"
        onConfirm={() => alert("High severity action confirmed")}
      />
      <Confirmation
        severity="critical"
        mode="dialog"
        triggerLabel="Critical Action"
        title="CRITICAL ACTION"
        description="This is a critical, irreversible action"
        destructiveActionWarning="This cannot be undone!"
        onConfirm={() => alert("Critical action confirmed")}
      />
    </div>
  );
}`

const countdownCode = `import { Confirmation } from "ui-lab-components";

export function Example() {
  return (
    <Confirmation
      severity="critical"
      mode="dialog"
      triggerLabel="Permanently Delete Database"
      title="Permanently Delete Database?"
      description="This is a critical action that cannot be reversed."
      destructiveActionWarning="All data will be permanently lost. You have 5 seconds to reconsider."
      countdownSeconds={5}
      onConfirm={() => console.log("Database deleted")}
    />
  );
}`

const confirmationTextCode = `import { Confirmation } from "ui-lab-components";

export function Example() {
  return (
    <Confirmation
      severity="critical"
      mode="dialog"
      triggerLabel="Erase All Data"
      title="Erase All Data?"
      description="This action is irreversible and will delete all user data."
      requiresReason={true}
      confirmationText="ERASE ALL"
      onConfirm={() => console.log("All data erased")}
    />
  );
}`

const customIconsCode = `import { Confirmation } from "ui-lab-components";
import { MdWarning, MdError } from "react-icons/md";

export function Example() {
  return (
    <div className="flex gap-4">
      <Confirmation
        severity="medium"
        mode="dialog"
        triggerLabel="Trigger Action"
        title="Custom Warning"
        description="This uses a custom icon"
        icon={<MdWarning className="w-6 h-6 text-warning-500" />}
        onConfirm={() => console.log("Action confirmed")}
      />
      <Confirmation
        severity="critical"
        mode="dialog"
        triggerLabel="Delete Everything"
        title="Permanent Deletion"
        description="Everything will be permanently removed"
        icon={<MdError className="w-6 h-6 text-danger-500" />}
        onConfirm={() => console.log("Deletion confirmed")}
      />
    </div>
  );
}`

const asyncActionCode = `import { Confirmation } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [status, setStatus] = useState("");

  const handleAsyncAction = async () => {
    setStatus("Processing...");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("Success! Action completed.");
    } catch (error) {
      setStatus("Error: " + error);
    }
  };

  return (
    <div>
      <Confirmation
        mode="dialog"
        severity="high"
        triggerLabel="Upload Large File"
        title="Upload File?"
        description="This may take a few seconds."
        onConfirm={handleAsyncAction}
      />
      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}`

const errorHandlingCode = `import { Confirmation } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const handleActionWithError = async () => {
    // Simulate an error
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error("Operation failed due to network error");
  };

  return (
    <Confirmation
      mode="dialog"
      severity="high"
      triggerLabel="Risky Operation"
      title="Confirm Operation?"
      description="This operation might fail."
      onConfirm={handleActionWithError}
    />
  );
}`

const autoResetCode = `import { Confirmation } from "ui-lab-components";

export function Example() {
  return (
    <Confirmation
      mode="inline"
      severity="low"
      triggerLabel="Subscribe"
      description="Subscribe to our newsletter?"
      confirmLabel="Yes, subscribe"
      autoResetAfter={5000}
      onConfirm={() => console.log("Subscribed")}
    />
  );
}`

const disabledStateCode = `import { Confirmation } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex gap-4">
      <Confirmation
        severity="medium"
        triggerLabel="Normal"
        onConfirm={() => console.log("Confirmed")}
      />
      <Confirmation
        severity="medium"
        triggerLabel="Disabled"
        disabled={true}
        onConfirm={() => console.log("Confirmed")}
      />
    </div>
  );
}`

const examples = [
  {
    id: "basic-inline",
    title: "Basic Inline Confirmation",
    description:
      "A simple inline confirmation for a low-severity action. The trigger button is replaced with confirmation UI.",
    code: basicInlineCode,
    preview: (
      <Confirmation
        severity="low"
        triggerLabel="Clear Cache"
        confirmLabel="Clear"
        description="This will delete all cached files"
        onConfirm={() => alert("Cache cleared")}
      />
    ),
  },
  {
    id: "basic-dialog",
    title: "Basic Dialog Confirmation",
    description:
      "A dialog-based confirmation for high-severity actions with detailed explanation.",
    code: basicDialogCode,
    preview: (
      <Confirmation
        mode="dialog"
        severity="high"
        triggerLabel="Delete Project"
        title="Delete Project?"
        description="This action cannot be undone. All project files will be permanently deleted."
        destructiveActionWarning="Make sure you have a backup before proceeding."
        onConfirm={() => alert("Project deleted")}
      />
    ),
  },
  {
    id: "severity-levels",
    title: "All Severity Levels",
    description:
      "Demonstrates all four severity levels with appropriate visual indicators and interaction patterns.",
    code: severityLevelsCode,
    preview: (
      <div className="flex flex-wrap gap-4">
        <Confirmation
          severity="low"
          triggerLabel="Low"
          description="Reversible"
          onConfirm={() => alert("Low severity")}
        />
        <Confirmation
          severity="medium"
          triggerLabel="Medium"
          description="Important"
          onConfirm={() => alert("Medium severity")}
        />
        <Confirmation
          severity="high"
          mode="dialog"
          triggerLabel="High"
          title="High Severity?"
          description="Important destructive action"
          onConfirm={() => alert("High severity")}
        />
        <Confirmation
          severity="critical"
          mode="dialog"
          triggerLabel="Critical"
          title="CRITICAL ACTION"
          description="Irreversible action"
          destructiveActionWarning="Cannot be undone!"
          onConfirm={() => alert("Critical severity")}
        />
      </div>
    ),
  },
  {
    id: "countdown-timer",
    title: "Countdown Timer",
    description:
      "For critical actions, a countdown timer can be required before confirmation is possible.",
    code: countdownCode,
    preview: (
      <Confirmation
        severity="critical"
        mode="dialog"
        triggerLabel="Permanent Delete"
        title="Permanently Delete Database?"
        description="This is a critical action that cannot be reversed."
        destructiveActionWarning="All data will be permanently lost. You have 5 seconds to reconsider."
        countdownSeconds={5}
        onConfirm={() => alert("Database deleted")}
      />
    ),
  },
  {
    id: "confirmation-text",
    title: "Confirmation Text Validation",
    description:
      "Users must type a confirmation text to proceed with critical actions, adding an extra layer of safety.",
    code: confirmationTextCode,
    preview: (
      <Confirmation
        severity="critical"
        mode="dialog"
        triggerLabel="Erase All Data"
        title="Erase All Data?"
        description="This action is irreversible and will delete all user data."
        requiresReason={true}
        confirmationText="ERASE ALL"
        onConfirm={() => alert("All data erased")}
      />
    ),
  },
  {
    id: "custom-icons",
    title: "Custom Icons",
    description:
      "Use custom icons to provide additional context for the confirmation action.",
    code: customIconsCode,
    preview: (
      <div className="flex gap-4">
        <Confirmation
          severity="medium"
          mode="dialog"
          triggerLabel="Custom Warning"
          title="Custom Warning"
          description="This uses a custom icon"
          onConfirm={() => alert("Action confirmed")}
        />
      </div>
    ),
  },
  {
    id: "async-action",
    title: "Async Action with Loading",
    description:
      "Handle asynchronous operations with loading states during confirmation execution.",
    code: asyncActionCode,
    preview: (
      <AsyncActionExample />
    ),
  },
  {
    id: "error-handling",
    title: "Error Handling",
    description:
      "The component gracefully handles and displays errors from failed confirmation actions.",
    code: errorHandlingCode,
    preview: (
      <Confirmation
        mode="dialog"
        severity="high"
        triggerLabel="Risky Operation"
        title="Confirm Operation?"
        description="This operation might fail."
        onConfirm={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          throw new Error("Operation failed due to network error")
        }}
      />
    ),
  },
  {
    id: "auto-reset",
    title: "Auto-Reset Inline Mode",
    description:
      "Inline confirmations can automatically reset after a timeout, reverting to the trigger button.",
    code: autoResetCode,
    preview: (
      <Confirmation
        mode="inline"
        severity="low"
        triggerLabel="Subscribe"
        description="Subscribe to our newsletter?"
        confirmLabel="Yes, subscribe"
        autoResetAfter={5000}
        onConfirm={() => alert("Subscribed")}
      />
    ),
  },
  {
    id: "disabled-state",
    title: "Disabled State",
    description:
      "The confirmation component can be disabled to prevent user interaction.",
    code: disabledStateCode,
    preview: (
      <div className="flex gap-4">
        <Confirmation
          severity="medium"
          triggerLabel="Enabled"
          onConfirm={() => alert("Confirmed")}
        />
        <Confirmation
          severity="medium"
          triggerLabel="Disabled"
          disabled={true}
          onConfirm={() => alert("Confirmed")}
        />
      </div>
    ),
  },
]

// Helper component for async action example
function AsyncActionExample() {
  const [status, setStatus] = useState("")

  const handleAsyncAction = async () => {
    setStatus("Processing...")
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("Success! Action completed.")
      setTimeout(() => setStatus(""), 3000)
    } catch (error) {
      setStatus("Error: " + error)
    }
  }

  return (
    <div>
      <Confirmation
        mode="dialog"
        severity="high"
        triggerLabel="Upload Large File"
        title="Upload File?"
        description="This may take a few seconds."
        onConfirm={handleAsyncAction}
      />
      {status && <p className="mt-4 text-sm text-foreground-400">{status}</p>}
    </div>
  )
}

export const confirmComponentDetail: ComponentDetail = {
  id: "confirm",
  name: "Confirm",
  description: "Intelligent confirmation component for destructive or important actions",
  overview: (
    <div className="space-y-4">
      <p>
        The Confirmation component intelligently handles user confirmation for potentially destructive or
        irreversible actions. It adapts based on action severity and provides two distinct interaction patterns:
      </p>
      <ul className="list-disc list-inside space-y-2 text-foreground-300">
        <li>
          <strong>Inline Mode:</strong> Replaces the trigger button with a two-button confirmation interface,
          keeping users in context
        </li>
        <li>
          <strong>Dialog Mode:</strong> Opens a modal overlay with detailed explanation and warnings, for
          critical actions
        </li>
      </ul>
      <p>The component automatically selects the appropriate mode based on severity level:</p>
      <ul className="list-disc list-inside space-y-2 text-foreground-300">
        <li>
          <strong>Low/Medium:</strong> Inline mode for quick, reversible actions
        </li>
        <li>
          <strong>High/Critical:</strong> Dialog mode for destructive, irreversible actions
        </li>
      </ul>
    </div>
  ),

  examples,

  variants: [
    {
      id: "low",
      name: "Low Severity",
      description:
        "For reversible actions like styling changes or theme switching. Uses inline mode by default.",
      code: basicInlineCode,
      preview: (
        <Confirmation
          severity="low"
          triggerLabel="Clear Cache"
          onConfirm={() => alert("Cache cleared")}
        />
      ),
    },
    {
      id: "medium",
      name: "Medium Severity",
      description: "For important but recoverable actions like data edits. Uses inline mode by default.",
      code: `<Confirmation severity="medium" triggerLabel="Delete Comment" onConfirm={() => {}} />`,
      preview: (
        <Confirmation
          severity="medium"
          triggerLabel="Delete Comment"
          onConfirm={() => alert("Comment deleted")}
        />
      ),
    },
    {
      id: "high",
      name: "High Severity",
      description:
        "For destructive but retrievable actions like soft deletes or archiving. Uses dialog mode by default.",
      code: basicDialogCode,
      preview: (
        <Confirmation
          severity="high"
          mode="dialog"
          triggerLabel="Archive Project"
          title="Archive Project?"
          description="The project will be moved to archive and hidden from the main view."
          onConfirm={() => alert("Project archived")}
        />
      ),
    },
    {
      id: "critical",
      name: "Critical Severity",
      description:
        "For permanent data loss like account deletion. Uses dialog mode with additional safeguards.",
      code: `<Confirmation
  severity="critical"
  mode="dialog"
  triggerLabel="Delete Account"
  title="Delete Account?"
  description="This action is permanent and cannot be undone."
  requiresReason={true}
  confirmationText="DELETE"
  onConfirm={() => {}}
/>`,
      preview: (
        <Confirmation
          severity="critical"
          mode="dialog"
          triggerLabel="Delete Account"
          title="Delete Account?"
          description="This action is permanent and cannot be undone."
          destructiveActionWarning="All your data will be permanently deleted."
          onConfirm={() => alert("Account deleted")}
        />
      ),
    },
  ],

  accessibility: [
    {
      icon: "⌨️",
      title: "Keyboard Navigation",
      description:
        "Full keyboard support with Enter to confirm, Escape to cancel, and Tab to navigate between buttons",
    },
    {
      icon: "🏷️",
      title: "ARIA Labels",
      description:
        "Proper ARIA labels for severity indicators, descriptions, and state announcements (loading, error, etc.)",
    },
    {
      icon: "👁️",
      title: "Focus Management",
      description: "Focus automatically moves to the confirm button when dialog opens, and returns on close",
    },
    {
      icon: "🔊",
      title: "Screen Reader Support",
      description:
        "Clear announcements of severity level, required confirmations, countdown timers, and error messages",
    },
    {
      icon: "🎨",
      title: "Color Contrast",
      description: "All severity indicators and text meet WCAG AA contrast requirements",
    },
    {
      icon: "📄",
      title: "Semantic HTML",
      description: "Uses native button elements and dialog semantics for maximum compatibility",
    },
  ],

  props: [
    { name: "mode", type: "'inline' | 'dialog'", default: "auto-select based on severity", description: "Display mode for the confirmation UI" },
    { name: "severity", type: "'low' | 'medium' | 'high' | 'critical'", default: "medium", description: "Action severity level" },
    { name: "onConfirm", type: "() => void | Promise<void>", default: "required", description: "Callback when user confirms" },
    { name: "onCancel", type: "() => void", default: "undefined", description: "Callback when user cancels" },
    { name: "triggerLabel", type: "string", default: "required", description: "Text for the trigger button" },
    { name: "confirmLabel", type: "string", default: "Confirm", description: "Text for the confirm button" },
    { name: "cancelLabel", type: "string", default: "Cancel", description: "Text for the cancel button" },
    { name: "disabled", type: "boolean", default: "false", description: "Disable the trigger button" },
    { name: "title", type: "string", default: "undefined", description: "Modal title (dialog mode)" },
    { name: "description", type: "string", default: "undefined", description: "Description text" },
    { name: "icon", type: "React.ReactNode", default: "severity-based icon", description: "Custom icon (dialog mode)" },
    { name: "destructiveActionWarning", type: "string", default: "undefined", description: "Warning text for high/critical actions" },
    { name: "countdownSeconds", type: "number", default: "undefined", description: "Countdown timer before confirm enabled" },
    { name: "requiresReason", type: "boolean", default: "false", description: "Require confirmation text for critical actions" },
    { name: "confirmationText", type: "string", default: "undefined", description: "Text user must type to confirm" },
  ],
}
