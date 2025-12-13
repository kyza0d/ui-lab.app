# @ui-lab/components

A comprehensive collection of accessible, customizable React components built with [React Aria](https://react-spectrum.adobe.com/react-aria/), [Tailwind CSS](https://tailwindcss.com/), and CSS Modules. Designed for rapid UI development with a focus on accessibility (WCAG AA) and semantic design patterns.

## Features

- **27+ Production-Ready Components** - From simple buttons to complex modals and command palettes
- **Accessibility First** - Built with React Aria for proper keyboard navigation and screen reader support
- **CSS Modules + CSS Variables** - Type-safe styling with semantic design tokens
- **Tailwind CSS Integration** - Leverage Tailwind utilities for layout and spacing
- **TypeScript** - Full type safety across all components
- **Themeable** - Customize colors and design tokens via CSS variables
- **ESM & CJS** - Works in any JavaScript environment
- **Zero Dependencies (Runtime)** - Only React and small peer dependencies

## Installation

```bash
npm install ui-lab-components
# or
pnpm add ui-lab-components
# or
yarn add ui-lab-components
```

### Peer Dependencies

This package requires React 19+:

```bash
npm install react react-dom
```

## Quick Start

```tsx
import { Button, Input, Card } from 'ui-lab-components';
import 'ui-lab-components/styles.css';

export default function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Components

### Layout Components
- **Flex** - Flexbox layout with semantic props
- **Grid** - Grid layout system
- **Group** - Horizontal grouping of elements
- **Fold** - Vertical stacking with spacing presets
- **Card** - Container with header, body, and footer slots
- **Divider** - Visual separator line with variants

### Input Components
- **Button** - Primary action trigger with variants
- **Input** - Text input field with validation support
- **TextArea** - Multi-line text input
- **Checkbox** - Single toggle selection
- **Radio** - Mutually exclusive selection within groups
- **Switch** - Boolean toggle control
- **Select** - Dropdown selection with search support
- **Label** - Associated text label for inputs

### Feedback Components
- **Badge** - Status and category indicators
- **Progress** - Linear progress indicator
- **Toast** - Temporary notifications with variants
- **Tooltip** - Contextual help text on hover

### Modal Components
- **Modal** - Centered dialog with overlay
- **Popover** - Anchored floating panel
- **Menu** - Contextual dropdown with submenus
- **Confirmation** - Alert dialog for destructive actions

### Complex Components
- **Tabs** - Tabbed interface navigation
- **Slider** - Range input with visual track
- **Form** - Composable form component with validation
- **CommandPalette** - Searchable command menu (Cmd+K)
- **Breadcrumbs** - Navigation path indicator

## Architecture

### CSS Module Pattern

All components follow a strict CSS Module pattern with semantic CSS variables:

```tsx
import styles from './Button.module.css';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[`button.${variant}`],
          styles[`button.${size}`],
          className
        )}
        {...props}
      />
    );
  }
);
```

CSS modules use semantic variables and data attributes for state:

```css
@reference "tailwindcss";

@layer components {
  .button {
    --background: var(--accent-500);
    --foreground: var(--accent-50);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-md);
    @apply px-3 py-1.5 rounded-md;

    background-color: var(--background);
    color: var(--foreground);
    cursor: pointer;
  }

  .button[data-hovered]:not([data-disabled]) {
    --background: var(--accent-600);
  }

  .button[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
```

### React Aria Integration

Components use React Aria hooks for accessibility:

```tsx
import { useButton, useFocusRing, useHover, mergeProps } from 'react-aria';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isDisabled, ...props }, ref) => {
    const { buttonProps, isPressed } = useButton({ isDisabled }, ref);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled });

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        ref={ref}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-disabled={isDisabled || undefined}
        className={styles.button}
        {...props}
      />
    );
  }
);
```

### Design Tokens

Components use CSS variables for theming. The default design system includes:

- **Colors**: `--accent-*`, `--background-*`, `--foreground-*` (semantic levels from 50-950)
- **Typography**: `--text-sm`, `--text-md`, `--text-lg` (font sizes)
- **Spacing**: Standard Tailwind spacing scale via `@apply` utilities
- **Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`
- **Borders**: `--border-width-base` (default border width)

## Development

### Project Structure

```
packages/components/
├── src/
│   ├── components/          # Component implementations
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.module.css.d.ts
│   │   ├── checkbox/
│   │   └── ... (27+ more)
│   ├── lib/                 # Utilities (cn, mergeProps, etc.)
│   ├── index.ts             # Public exports
│   └── styles.css           # Global styles
├── dist/                    # Build output (UMD + ESM)
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Building

Components are built with Vite:

```bash
pnpm build              # Build components and styles
pnpm build:css          # Build CSS separately
pnpm type-check         # TypeScript validation
pnpm clean              # Remove dist/ folder
```

### Adding New Components

1. Create component directory: `src/components/my-component/`
2. Implement component: `MyComponent.tsx` with React Aria hooks
3. Add styles: `MyComponent.module.css` with semantic variables
4. Generate types: `MyComponent.module.css.d.ts`
5. Export in `src/index.ts`
6. (Optional) Add demo to `@ui-lab/site`

## Styling Approach

### CSS Variables

Override component colors by setting CSS variables at any scope:

```css
:root {
  --accent-500: #3b82f6;
  --accent-600: #2563eb;
  --background-700: #374151;
  --text-md: 1rem;
}
```

### Tailwind Integration

Use `@apply` for spacing and layout only:

```css
.button {
  @apply px-4 py-2 rounded-lg;  /* ✅ Spacing & layout */
  font-size: var(--text-md);     /* ✅ Use variables for colors/fonts */
}
```

## Accessibility

All components meet WCAG AA standards:

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Semantic HTML
- ✅ ARIA attributes where needed
- ✅ Color contrast compliance

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Monorepo Context

This package is part of the UI Lab monorepo:

- **@ui-lab/components** - This package (component library)
- **@ui-lab/registry** - Component metadata and documentation
- **@ui-lab/site** - Demo and documentation site (Next.js)

See the [root README](../../README.md) for monorepo overview and development setup.

## Contributing

When working on components:
1. Ensure all components use React Aria for accessibility
2. Test keyboard navigation and screen reader support
3. Keep CSS modules focused and minimal
4. Use semantic CSS variables for theming
5. Add demos to the site when adding new components

## License

MIT - See LICENSE in monorepo root

## Resources

- [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN CSS Modules](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Modules)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
