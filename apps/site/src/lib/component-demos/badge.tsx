import { Badge } from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { FaCheck, FaExclamation, FaTimeline, FaInfo, FaStar } from "react-icons/fa6";

const badgeControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Success", value: "success" },
      { label: "Warning", value: "warning" },
      { label: "Danger", value: "danger" },
      { label: "Info", value: "info" },
    ],
    defaultValue: "default",
  },
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
    name: "dismissible",
    label: "Dismissible",
    type: "toggle",
    defaultValue: false,
  },
];

const badgeBasicCode = `import { Badge } from "ui-lab-components";

export function Example() {
  return <Badge>Default</Badge>;
}`;

const badgeVariantsCode = `import { Badge } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  );
}`;

const badgeSizesCode = `import { Badge } from "ui-lab-components";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
}`;

const badgeWithIconCode = `import { Badge } from "ui-lab-components";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa6";

export function Example() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success" icon={<FaCheckCircle />}>
        Success
      </Badge>
      <Badge variant="warning" icon={<FaExclamationTriangle />}>
        Warning
      </Badge>
    </div>
  );
}`;

const badgeDismissibleCode = `import { Badge } from "ui-lab-components";
import { useState } from "react";

export function Example() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Badge
      dismissible
      onDismiss={() => setVisible(false)}
    >
      Dismissible Badge
    </Badge>
  );
}`;

export const badgeDetail: ComponentDetail = {
  id: "badge",
  name: "Badge",
  description: "A versatile badge component for status and tag indicators",

  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        Badge components are compact elements used to display status indicators, tags, labels, and other small pieces of information. They support multiple variants for different semantic meanings, multiple sizes for different contexts, and optional icons and dismissal functionality.
      </p>
      <p>
        Use badges to highlight key information, indicate status changes, or tag content categories.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Badge",
      description: "The simplest form of a badge",
      code: badgeBasicCode,
      preview: <Badge>Default</Badge>,
      controls: badgeControls,
      renderPreview: (props: any) => (
        <Badge
          variant={props.variant as any}
          size={props.size as any}
          dismissible={props.dismissible}
        >
          Badge Text
        </Badge>
      ),
    },
    {
      id: "variants",
      title: "Badge Variants",
      description: "Different variants for different semantic meanings",
      code: badgeVariantsCode,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      ),
    },
    {
      id: "sizes",
      title: "Badge Sizes",
      description: "Three size options for different contexts",
      code: badgeSizesCode,
      preview: (
        <div className="flex flex-wrap gap-3 items-center">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      ),
    },
    {
      id: "with-icon",
      title: "Badge with Icon",
      description: "Badges can display an optional icon",
      code: badgeWithIconCode,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" icon={<FaCheck />}>
            Success
          </Badge>
          <Badge variant="warning" icon={<FaExclamation />}>
            Warning
          </Badge>
          <Badge variant="danger" icon={<FaTimeline />}>
            Error
          </Badge>
          <Badge variant="info" icon={<FaInfo />}>
            Info
          </Badge>
        </div>
      ),
    },
    {
      id: "dismissible",
      title: "Dismissible Badge",
      description: "Badges can be dismissible with an optional close button",
      code: badgeDismissibleCode,
      preview: (
        <div className="flex flex-wrap gap-3">
          <Badge dismissible>Dismissible Badge</Badge>
          <Badge variant="success" dismissible>
            Success
          </Badge>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard gray badge",
      code: `<Badge variant="default">Default</Badge>`,
      preview: <Badge variant="default">Default</Badge>,
    },
    {
      id: "success",
      name: "Success",
      description: "Green badge for successful states",
      code: `<Badge variant="success">Success</Badge>`,
      preview: <Badge variant="success">Success</Badge>,
    },
    {
      id: "warning",
      name: "Warning",
      description: "Yellow badge for warning states",
      code: `<Badge variant="warning">Warning</Badge>`,
      preview: <Badge variant="warning">Warning</Badge>,
    },
    {
      id: "danger",
      name: "Error",
      description: "Red badge for error/danger states",
      code: `<Badge variant="danger">Error</Badge>`,
      preview: <Badge variant="danger">Error</Badge>,
    },
    {
      id: "info",
      name: "Info",
      description: "Blue badge for informational content",
      code: `<Badge variant="info">Info</Badge>`,
      preview: <Badge variant="info">Info</Badge>,
    },
  ],
};
