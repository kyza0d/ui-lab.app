# Adding New Components Reference

This guide covers everything needed when implementing a new component in the ui-lab project. Follow each section in order to ensure complete integration.

## Overview

Adding a new component requires modifications to three packages:

1. **@packages/@ui** - Component source code and styles
2. **@packages/registry** - Component metadata, documentation, and examples
3. **@apps/site** - Component preview and registration for the showcase site

---

## 1. Component Source Code (@packages/@ui)

### Directory Structure

Create a new directory at `packages/@ui/src/components/{ComponentName}/`:

```
packages/@ui/src/components/{ComponentName}/
├── {ComponentName}.tsx              # Main component file
├── {ComponentName}.module.css       # CSS module styles
├── {ComponentName}.module.css.d.ts  # CSS module type declarations
└── index.ts                         # Public exports
```

### Component File Pattern

`{ComponentName}.tsx`:

```tsx
"use client";

import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./{ComponentName}.module.css";

type {ComponentName}Variant = "default" | "secondary";
type {ComponentName}Size = "sm" | "md" | "lg";

export interface {ComponentName}Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: {ComponentName}Variant;
  size?: {ComponentName}Size;
  isDisabled?: boolean;
}

const variantMap = {
  default: styles["default"],
  secondary: styles["secondary"],
} as const;

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
} as const;

const {ComponentName} = React.forwardRef<HTMLDivElement, {ComponentName}Props>(
  ({ className, variant = "default", size = "md", children, isDisabled, ...props }, ref) => {
    const { focusProps, isFocused, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled });

    return (
      <div
        {...mergeProps(focusProps, hoverProps, props)}
        ref={ref}
        className={cn(styles.{componentName}, variantMap[variant], sizeMap[size], className)}
        data-variant={variant}
        data-size={size}
        data-disabled={isDisabled ? "true" : undefined}
        data-hovered={isHovered ? "true" : "false"}
        data-focused={isFocused ? "true" : "false"}
        data-focus-visible={isFocusVisible ? "true" : "false"}
      >
        {children}
      </div>
    );
  }
);

{ComponentName}.displayName = "{ComponentName}";

export { {ComponentName} };
```

### CSS Module Pattern

`{ComponentName}.module.css`:

```css
@reference "tailwindcss";

@layer components {
  .{componentName} {
    --background: var(--background-800);
    --foreground: var(--foreground-50);
    --border: var(--background-700);

    @apply px-3 py-2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-weight: 500;
    font-size: var(--text-md);
    line-height: var(--leading-snug);
    background-color: var(--background);
    color: var(--foreground);
    border: var(--border-width-base) solid var(--border);
    border-radius: var(--radius-md);
    transition: background-color 0.15s ease-out, border-color 0.15s ease-out, transform 0.15s ease-out;

    &:focus-visible {
      outline: 2px solid var(--blue);
      outline-offset: 2px;
    }

    &:disabled,
    &[data-disabled="true"] {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.{componentName}.default {
  --background: var(--background-800);
  --foreground: var(--foreground-50);
  --border: var(--background-700);

  @media (hover: hover) {
    &:hover:not(:disabled):not([data-disabled="true"]) {
      background-color: var(--background-700);
    }
  }
}

.{componentName}.secondary {
  --background: var(--background-900);
  --foreground: var(--foreground-100);
  --border: var(--background-600);

  @media (hover: hover) {
    &:hover:not(:disabled):not([data-disabled="true"]) {
      background-color: var(--background-800);
    }
  }
}

.{componentName}.sm {
  @apply px-2 py-1;
  font-size: var(--text-sm);
}

.{componentName}.md {
  @apply px-3 py-2;
  font-size: var(--text-md);
}

.{componentName}.lg {
  @apply px-4 py-3;
  font-size: var(--text-lg);
}
```

**CSS Module Requirements:**
- Start with `@reference "tailwindcss";`
- Put base component styles inside `@layer components { ... }`
- Variant/modifier styles go OUTSIDE the @layer block
- Define CSS custom properties (--background, --foreground, --border) for user customization
- Use design system tokens: `var(--background-*)`, `var(--foreground-*)`, `var(--accent-*)`, etc.
- Use `var(--text-sm)`, `var(--text-md)`, `var(--text-lg)` for font sizes
- Use `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)` for border-radius
- Use `var(--border-width-base)` for border widths
- Use `@media (hover: hover)` for hover states to handle touch devices

### CSS Module Type Declarations

`{ComponentName}.module.css.d.ts`:

Create a TypeScript declaration file that exports all CSS class names defined in the module. This provides type safety when importing styles.

```ts
declare const styles: {
  "{componentName}": string;
  "variant-default": string;
  "variant-secondary": string;
  sm: string;
  md: string;
  lg: string;
};

export default styles;
```

List all class names from your CSS module as keys in the `styles` object. This enables TypeScript to provide autocomplete and catch typos when accessing styles.

### Index File

`index.ts`:

```ts
export * from "./{ComponentName}";
```

### CSS Class Names

All components must include raw class names in their className attributes alongside CSS module imports. This provides better CSS debugging and consistency:

```tsx
// ✓ CORRECT - includes raw class name
<span className={cn('{componentName}', styles.{componentName})}>{content}</span>
<div className={cn('trigger', styles.trigger)}>{children}</div>
<div className={cn('preview', styles.preview, className)}>{children}</div>

// ✗ INCORRECT - missing raw class name
<span className={cn(styles.{componentName})}>{content}</span>
<div className={cn(styles.trigger)}>{children}</div>
```

Use lowercase, dash-separated names for the raw class names (e.g., 'button-group', 'scroll-area', 'command-palette').

### Package Export

Add the export to `packages/@ui/src/index.ts`:

```ts
export { {ComponentName} } from "./components/{ComponentName}";
export type { {ComponentName}Props } from "./components/{ComponentName}";
```

---

## 2. Registry Entry (@packages/registry)

### Directory Structure

Create a new directory at `packages/registry/src/components/{ComponentName}/`:

```
packages/registry/src/components/{ComponentName}/
├── index.tsx           # Component detail and examples definition
├── metadata.json       # Component metadata
├── examples.json       # Generated - contains example code snippets
└── examples/
    ├── index.ts                        # Barrel export for all examples
    ├── 01-basic-{component-name}.tsx
    └── 02-{variant}-{component-name}.tsx
```

### Metadata File

`metadata.json`:

```json
{
  "id": "{component-name}",
  "name": "{ComponentName}",
  "description": "A brief description of what the component does.",
  "category": "action",
  "source": {
    "packageName": "ui-lab-components",
    "exportName": "{ComponentName}",
    "packagePath": "dist/index.d.ts"
  },
  "relatedComponents": [
    "button",
    "card"
  ],
  "tags": [
    "interactive",
    "layout",
    "visual"
  ],
  "accessibility": {
    "hasAriaSupport": true,
    "notes": [
      "Supports keyboard navigation",
      "Screen reader friendly",
      "Focus management"
    ]
  }
}
```

**Category Options:**
- `layout` - Grid, Flex, Divider, Fold, Gallery
- `composition` - Form, Group, List
- `action` - Button, Confirm, CommandPalette
- `input` - Checkbox, Input, Radio, Select, Slider, Switch, Textarea
- `information` - Badge, Label, Tooltip
- `feedback` - Popover, Progress
- `navigation` - Breadcrumbs, Menu, Tabs
- `container` - Card, Modal, ScrollArea
- `data` - Table
- `experimental` - Toast (unstable components)

### Example Files

Each example follows this pattern:

`examples/01-basic-{component-name}.tsx`:

```tsx
import React from 'react';
import { {ComponentName} } from 'ui-lab-components';

export const metadata = {
  title: 'Basic {ComponentName}',
  description: 'A simple {component name} with default styling. Use this as the standard {component} in your interface.'
};

export default function Example() {
  return <{ComponentName}>Content</{ComponentName}>;
}
```

`examples/02-secondary-{component-name}.tsx`:

```tsx
import React from 'react';
import { {ComponentName} } from 'ui-lab-components';

export const metadata = {
  title: 'Secondary {ComponentName}',
  description: 'Secondary variant of the {component name}. Use for alternative styling.'
};

export default function Example() {
  return <{ComponentName} variant="secondary">Secondary</{ComponentName}>;
}
```

### Examples Barrel Export

`examples/index.ts`:

Create a barrel export file that re-exports all example components and their metadata. This allows the component's main `index.tsx` to import from `./examples` without needing to reference individual files.

```ts
export { default as Example1 } from './01-basic-{component-name}.js';
export { metadata as metadata1 } from './01-basic-{component-name}.js';

export { default as Example2 } from './02-{variant}-{component-name}.js';
export { metadata as metadata2 } from './02-{variant}-{component-name}.js';
```

Add an export pair for each example file: one for the default component export and one for the metadata export.

### Index File with Component Detail

`index.tsx`:

```tsx
import { {ComponentName} } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-{component-name}.js';
import Example2, { metadata as metadata2 } from './examples/02-secondary-{component-name}.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

const examplesData = [
  { id: '01-basic-{component-name}', Component: Example1, metadata: metadata1 },
  { id: '02-secondary-{component-name}', Component: Example2, metadata: metadata2 },
];

const {componentName}Controls: ControlDef[] = [
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Secondary', value: 'secondary' },
    ],
    defaultValue: 'default',
  },
  {
    name: 'size',
    label: 'Size',
    type: 'select',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'md',
  },
  {
    name: 'disabled',
    label: 'Disabled',
    type: 'toggle',
    defaultValue: false,
  },
];

const {componentName}BasicCode = `import { {ComponentName} } from "ui-lab-components";

export function Example() {
  return <{ComponentName}>Content</{ComponentName}>;
}`;

export const {componentName}Detail: ComponentDetail = {
  id: '{component-name}',
  name: '{ComponentName}',
  description: 'A brief description of the component for the documentation page.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The {ComponentName} component provides [describe main purpose and use case].
        It supports multiple variants and sizes for different contexts.
      </p>
      <p>
        Use {ComponentName} when you need [describe when to use this component].
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the component',
      code: {componentName}BasicCode,
      preview: <{ComponentName}>Content</{ComponentName}>,
      controls: {componentName}Controls,
      renderPreview: (props: any) => (
        <{ComponentName}
          variant={props.variant as any}
          size={props.size as any}
          disabled={props.disabled}
        >
          Content
        </{ComponentName}>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};

export { {componentName}Controls };
export * from './examples';
```

### Add to Registry

Edit `packages/registry/src/registry.ts` to include the new component:

```ts
{component-name}: {
  id: "{component-name}",
  name: "{ComponentName}",
  description: "Component description",
  category: "action",
  source: {
    "packageName": "ui-lab-components",
    "exportName": "{ComponentName}",
    "packagePath": "dist/index.d.ts"
  },
  relatedComponents: ["button"],
  tags: ["interactive"],
  accessibility: {"hasAriaSupport": true, "notes": ["Keyboard accessible"]},
  examples: [
    {
      "title": "Basic {ComponentName}",
      "description": "A simple {component} example.",
      "code": "import { {ComponentName} } from 'ui-lab-components';\n\nexport default function Example() {\n  return <{ComponentName}>Content</{ComponentName}>;\n}"
    }
  ],
},
```

### Add to Component Order

Edit `packages/registry/src/component-order.ts` to include the new component in the appropriate category:

```ts
export const componentOrder: Record<ComponentCategory, string[]> = {
  layout: ['grid', 'flex', 'gallery', 'divider', 'fold'],
  composition: ['form', 'group', 'list'],
  action: ['button', 'confirm', '{component-name}'],  // Add here
  input: ['checkbox', 'input', 'radio', 'select', 'slider', 'switch', 'textarea'],
  information: ['anchor', 'badge', 'label', 'tooltip'],
  feedback: ['popover', 'progress'],
  navigation: ['breadcrumbs', 'menu', 'tabs'],
  container: ['card', 'modal', 'scrollarea'],
  data: ['table'],
  experimental: ['toast'],
};
```

Add the component ID as a string to the appropriate category array. The position in the array determines the display order in the documentation site.

---

## 3. Site Integration (@apps/site)

### Component Registry

Edit `apps/site/src/features/component-docs/lib/component-registry.tsx`:

**1. Add the import for the component detail:**

```tsx
import { {componentName}Detail } from "ui-lab-registry/components/{ComponentName}";
```

**2. Add the component import for previews:**

```tsx
import { {ComponentName} } from "ui-lab-components";
```

**3. Add a preview in the `previews` object:**

```tsx
const previews: Record<string, React.ReactNode> = {
  // ... existing previews
  "{component-name}": (
    <div className="flex items-center justify-center">
      <{ComponentName} variant="default" size="md">
        Preview Content
      </{ComponentName}>
    </div>
  ),
};
```

**4. Add to the `componentDetails` record:**

```tsx
const componentDetails: Record<string, ComponentDetail> = {
  // ... existing details
  "{component-name}": {componentName}Detail,
};
```

**Note:** Component ordering is managed in `packages/registry/src/component-order.ts`, not in the component-registry file. Make sure to update component-order.ts as described in the Registry section above.

---

## 4. Build and Verification

### Generate Examples JSON

After creating example files, the build process will generate `examples.json`:

```bash
pnpm --filter ui-lab-registry build
```

This runs scripts that extract code from example `.tsx` files into `examples.json`.

### Type Check

Verify TypeScript compilation:

```bash
pnpm run type-check
```

### Test Locally

Start the development server:

```bash
pnpm dev
```

Navigate to the component page to verify:
- Component renders correctly
- Preview works in the documentation
- Examples display properly
- Controls function as expected

---

## Design System Tokens Reference

### Colors
- `var(--background-50)` through `var(--background-950)`
- `var(--foreground-50)` through `var(--foreground-950)`
- `var(--accent-50)` through `var(--accent-950)`
- `var(--success-*)`, `var(--warning-*)`, `var(--danger-*)`, `var(--info-*)`

### Typography
- `var(--text-xs)`, `var(--text-sm)`, `var(--text-md)`, `var(--text-lg)`, `var(--text-xl)`
- `var(--leading-snug)`, `var(--leading-normal)`, `var(--leading-relaxed)`

### Spacing & Layout
- `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-xl)`
- `var(--border-width-base)`, `var(--border-width-thick)`

### Animation
- `var(--ease-snappy-pop)` - Standard interaction easing
- Transitions: `0.15s ease-out` for most interactions

---

## Common Patterns

### Data Attributes for State
Use data attributes for CSS state styling:
- `data-variant` - Component variant
- `data-size` - Size modifier
- `data-disabled` - Disabled state
- `data-hovered` - Hover state
- `data-focused` - Focus state
- `data-focus-visible` - Keyboard focus visible
- `data-pressed` - Active/pressed state

### React Aria Integration
Use React Aria hooks for accessibility:
- `useButton` - Button behavior
- `useFocusRing` - Focus visibility
- `useHover` - Hover state
- `mergeProps` - Combine props from multiple hooks

### forwardRef Pattern
Always use `React.forwardRef` for ref forwarding:
```tsx
const Component = React.forwardRef<HTMLElement, Props>((props, ref) => {
  // component implementation
});
Component.displayName = "Component";
```

---

## Checklist

- [ ] Created component directory in `@packages/@ui`
- [ ] Implemented component with TypeScript and CSS module
- [ ] Created `{ComponentName}.module.css.d.ts` TypeScript declarations
- [ ] Added component export to `packages/@ui/src/index.ts`
- [ ] Created registry directory in `@packages/registry`
- [ ] Added `metadata.json` with component information
- [ ] Created at least 2 example files in `examples/` directory
- [ ] Created `examples/index.ts` barrel export file
- [ ] Created `index.tsx` with component detail
- [ ] Added component to `packages/registry/src/registry.ts`
- [ ] Added preview to `apps/site/.../component-registry.tsx`
- [ ] Added component to `componentOrder` in component-registry
- [ ] Added component detail to `componentDetails` in component-registry
- [ ] Ran `pnpm --filter ui-lab-registry build` to generate examples.json
- [ ] Ran `pnpm run type-check` to verify TypeScript
- [ ] Tested component in local development server
