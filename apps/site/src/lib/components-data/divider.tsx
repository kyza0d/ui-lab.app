import { Divider } from "@ui-lab/components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

// Preview components
function BasicDividerPreview(props: any) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-foreground-400 mb-2">Basic Divider</p>
        <Divider
          variant={props.variant}
          orientation={props.orientation}
          size={props.size}
          color={props.color}
          spacing={props.spacing}
        />
      </div>
    </div>
  );
}

function VariantsDividerPreview() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-foreground-400 mb-2">Solid</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  );
}

function SpacingDividerPreview() {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm text-foreground-400 mb-2">No Spacing</p>
        <Divider spacing="none" />
        <p className="text-xs text-foreground-500 mt-2">Content below</p>
      </div>
      <div className="mt-6">
        <p className="text-sm text-foreground-400 mb-2">Small Spacing</p>
        <Divider spacing="sm" />
        <p className="text-xs text-foreground-500 mt-2">Content below</p>
      </div>
      <div className="mt-6">
        <p className="text-sm text-foreground-400 mb-2">Medium Spacing</p>
        <Divider spacing="md" />
        <p className="text-xs text-foreground-500 mt-2">Content below</p>
      </div>
      <div className="mt-6">
        <p className="text-sm text-foreground-400 mb-2">Large Spacing</p>
        <Divider spacing="lg" />
        <p className="text-xs text-foreground-500 mt-2">Content below</p>
      </div>
    </div>
  );
}

function VerticalDividerPreview() {
  return (
    <div className="flex gap-4 h-32">
      <div className="flex flex-col justify-center">
        <p className="text-sm text-foreground-400">Content Left</p>
      </div>
      <Divider orientation="vertical" spacing="none" />
      <div className="flex flex-col justify-center">
        <p className="text-sm text-foreground-400">Content Right</p>
      </div>
    </div>
  );
}

function ColorsDividerPreview() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-foreground-400 mb-2">Default (Strong)</p>
        <Divider color="default" />
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Muted (Medium)</p>
        <Divider color="muted" />
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Subtle (Light)</p>
        <Divider color="subtle" />
      </div>
    </div>
  );
}

function SizesDividerPreview() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-foreground-400 mb-2">Small (1px)</p>
        <Divider size="sm" spacing="none" />
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Medium (2px)</p>
        <Divider size="md" spacing="none" />
      </div>
      <div>
        <p className="text-sm text-foreground-400 mb-2">Large (3px)</p>
        <Divider size="lg" spacing="none" />
      </div>
    </div>
  );
}

// Control definitions for the divider configurator
const dividerControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Solid", value: "solid" },
      { label: "Dashed", value: "dashed" },
      { label: "Dotted", value: "dotted" },
    ],
    defaultValue: "solid",
  },
  {
    name: "orientation",
    label: "Orientation",
    type: "select",
    options: [
      { label: "Horizontal", value: "horizontal" },
      { label: "Vertical", value: "vertical" },
    ],
    defaultValue: "horizontal",
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
    name: "color",
    label: "Color",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Muted", value: "muted" },
      { label: "Subtle", value: "subtle" },
    ],
    defaultValue: "default",
  },
  {
    name: "spacing",
    label: "Spacing",
    type: "select",
    options: [
      { label: "None", value: "none" },
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    defaultValue: "md",
  },
];

const basicDividerCode = `import { Divider } from "@ui-lab/components";

export function Example() {
  return <Divider />;
}`;

const variantsDividerCode = `import { Divider } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-4">
      <div>
        <p>Solid</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p>Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p>Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  );
}`;

const spacingDividerCode = `import { Divider } from "@ui-lab/components";

export function Example() {
  return (
    <div>
      <Divider spacing="sm" />
      <Divider spacing="md" />
      <Divider spacing="lg" />
    </div>
  );
}`;

const verticalDividerCode = `import { Divider } from "@ui-lab/components";

export function Example() {
  return (
    <div className="flex gap-4 h-32">
      <div>Content Left</div>
      <Divider orientation="vertical" />
      <div>Content Right</div>
    </div>
  );
}`;

const colorsDividerCode = `import { Divider } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-4">
      <Divider color="default" />
      <Divider color="muted" />
      <Divider color="subtle" />
    </div>
  );
}`;

const sizesDividerCode = `import { Divider } from "@ui-lab/components";

export function Example() {
  return (
    <div className="space-y-4">
      <Divider size="sm" />
      <Divider size="md" />
      <Divider size="lg" />
    </div>
  );
}`;

export const dividerDetail: ComponentDetail = {
  id: "divider",
  name: "Divider",
  description: "A simple yet flexible divider component for visual content separation",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Divider component is a lightweight utility component used to visually separate content
        sections, groups, or list items. It supports both horizontal and vertical orientations with
        customizable styling options.
      </p>
      <p>
        Use dividers to improve visual hierarchy and content organization in your layouts. They work
        seamlessly with other layout components like Card, Modal, and Container to create clear
        visual structure.
      </p>
      <p>
        The component supports multiple variants (solid, dashed, dotted), sizes, colors, and spacing
        options to match your design needs. It's built with semantic HTML and accessibility in mind.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Divider",
      description: "A simple horizontal divider with default styling.",
      code: basicDividerCode,
      preview: (
        <div>
          <p className="text-sm text-foreground-400">Content above</p>
          <Divider />
          <p className="text-sm text-foreground-400 mt-4">Content below</p>
        </div>
      ),
      renderPreview: BasicDividerPreview,
      controls: dividerControls,
    },
    {
      id: "variants",
      title: "Divider Variants",
      description: "Different visual styles for dividers (solid, dashed, dotted).",
      code: variantsDividerCode,
      preview: <VariantsDividerPreview />,
      renderPreview: VariantsDividerPreview,
    },
    {
      id: "spacing",
      title: "Divider Spacing",
      description: "Dividers with different spacing options around them.",
      code: spacingDividerCode,
      preview: <SpacingDividerPreview />,
      renderPreview: SpacingDividerPreview,
    },
    {
      id: "vertical",
      title: "Vertical Divider",
      description: "A vertical divider for separating side-by-side content.",
      code: verticalDividerCode,
      preview: <VerticalDividerPreview />,
      renderPreview: VerticalDividerPreview,
    },
    {
      id: "colors",
      title: "Color Variations",
      description: "Dividers with different color emphasis levels.",
      code: colorsDividerCode,
      preview: <ColorsDividerPreview />,
      renderPreview: ColorsDividerPreview,
    },
    {
      id: "sizes",
      title: "Size Variations",
      description: "Dividers with different thickness levels.",
      code: sizesDividerCode,
      preview: <SizesDividerPreview />,
      renderPreview: SizesDividerPreview,
    },
  ],

  variants: [
    {
      id: "solid",
      name: "Solid",
      description: "A solid, continuous line (default variant).",
      code: `<Divider variant="solid" />`,
      preview: <Divider variant="solid" />,
    },
    {
      id: "dashed",
      name: "Dashed",
      description: "A dashed line pattern for visual distinction.",
      code: `<Divider variant="dashed" />`,
      preview: <Divider variant="dashed" />,
    },
    {
      id: "dotted",
      name: "Dotted",
      description: "A dotted line pattern.",
      code: `<Divider variant="dotted" />`,
      preview: <Divider variant="dotted" />,
    },
    {
      id: "horizontal",
      name: "Horizontal",
      description: "A horizontal divider that spans the full width (default orientation).",
      code: `<Divider orientation="horizontal" />`,
      preview: <Divider orientation="horizontal" />,
    },
    {
      id: "vertical",
      name: "Vertical",
      description: "A vertical divider for side-by-side content separation.",
      code: `<div className="flex gap-2 h-16"><div>Left</div><Divider orientation="vertical" /><div>Right</div></div>`,
      preview: (
        <div className="flex gap-4 h-16">
          <div className="flex items-center">Left</div>
          <Divider orientation="vertical" spacing="none" />
          <div className="flex items-center">Right</div>
        </div>
      ),
    },
  ],

  props: [
    {
      name: "variant",
      type: "'solid' | 'dashed' | 'dotted'",
      default: "'solid'",
      description: "The visual style of the divider line.",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "The direction of the divider.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: "The thickness of the divider line (sm=1px, md=2px, lg=3px).",
    },
    {
      name: "color",
      type: "'default' | 'muted' | 'subtle'",
      default: "'default'",
      description: "The color emphasis level of the divider.",
    },
    {
      name: "spacing",
      type: "'none' | 'sm' | 'md' | 'lg'",
      default: "'md'",
      description:
        "The spacing (margin) around the divider (none=0, sm=0.5rem, md=1rem, lg=1.5rem).",
    },
  ],

  accessibility: [
    {
      icon: "🏷️",
      title: "Semantic HTML",
      description:
        "Horizontal dividers render as <hr> elements for semantic correctness. Vertical dividers use <div> with role='separator'.",
    },
    {
      icon: "🎯",
      title: "ARIA Attributes",
      description:
        "Both orientations include aria-orientation to inform assistive technologies of the divider direction.",
    },
    {
      icon: "👁️",
      title: "Color Contrast",
      description:
        "All color variants meet WCAG AA contrast requirements against the background color for visual clarity.",
    },
    {
      icon: "⌨️",
      title: "Keyboard Navigation",
      description:
        "Dividers do not receive focus and do not interfere with keyboard navigation of the page.",
    },
  ],
};
