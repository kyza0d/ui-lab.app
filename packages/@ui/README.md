# @ui-lab/components

A collection of 39 accessible, customizable React components built with [React Aria](https://react-spectrum.adobe.com/react-aria/) and CSS Modules. Components are **unstyled by default**—you must pair them with a theme package like `ui-lab-theme-onyx` to provide colors and visual design.

## Features

- **39 Production-Ready Components** - Layout, input, feedback, navigation, and container components with compound component patterns
- **Accessibility First** - Built with React Aria for keyboard navigation, focus management, and screen reader support
- **Decoupled Styling** - CSS Modules + CSS variables enable complete theming flexibility
- **Theme System** - Use `ui-lab-theme-onyx` (included) or create custom themes with color tokens
- **TypeScript** - Full type safety across all components and exports
- **ESM & CJS** - Works in any JavaScript environment
- **Zero Runtime Dependencies** - Only React peer dependency (plus React Aria for accessibility)

## Installation

```bash
npm install ui-lab-components ui-lab-theme-onyx
# or
pnpm add ui-lab-components ui-lab-theme-onyx
```

### Requirements

- **React 19+** — Components are built for React 19 with hooks
- **A theme package** — Styles are decoupled; you must install a theme to render styled components. Use `ui-lab-theme-onyx` or create a custom theme

Peer dependencies:
```bash
npm install react react-dom
```

## Quick Start

### Basic Setup (with ui-lab-theme-onyx)

```tsx
import 'ui-lab-theme-onyx/styles.css';
import { Button, Input, Card } from 'ui-lab-components';

export default function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

The `ui-lab-theme-onyx` theme package provides:
- Color tokens (CSS variables like `--accent-500`, `--background-700`)
- Typography scale
- Spacing, radius, and border tokens
- Light/dark mode support

### Custom Theme Setup

If you want to create a custom theme, define CSS variables that the components expect:

```css
:root {
  /* Color tokens (required) */
  --accent-50: #f0f9ff;
  --accent-500: #3b82f6;
  --accent-600: #2563eb;
  /* ... rest of color scale 50-950 for accent, background, foreground, success, danger, warning, info */

  /* Typography (optional) */
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;

  /* Spacing & radius (optional) */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

@import "ui-lab-components/styles.css";
```

Then import your CSS before your app:

```tsx
import './theme.css';
import { Button } from 'ui-lab-components';
```

For the complete token list and design system reference, see the [root README](../../README.md#design-system) or the documentation site.

## Components

All components use React Aria for accessibility and accept a `className` prop for custom styling.

### Layout (7 components)
- **Grid** - Grid layout system with configurable columns
- **Flex** - Flexbox container with alignment and gap props
- **Expand** - Collapsible container with animated transitions
- **Frame** - Responsive aspect-ratio container
- **Page** - Full-page layout with context for padding management
- **Panel** - Resizable panel layout with sidebar support
- **Gallery** - Image gallery with lightbox

### Composition (2 components)
- **Group** - Horizontal grouping of form/button elements
- **List** - Selectable list with keyboard navigation, checkboxes, media slots

### Input (9 components)
- **Button** - Action trigger with variants and states
- **Input** - Text input with validation support
- **TextArea** - Multi-line text input
- **Select** - Dropdown list with search, multi-select, and submenus
- **Checkbox** - Single toggle selection
- **Radio** - Mutually exclusive selection within groups
- **Switch** - Boolean toggle control
- **Slider** - Range input with visual track
- **Date** - Date picker with calendar

### Information (4 components)
- **Badge** - Status and category indicators with variants
- **Banner** - Alert banner for important messages
- **Label** - Text label for form inputs
- **Tooltip** - Contextual help text on hover

### Feedback (3 components)
- **Popover** - Anchored floating panel
- **Progress** - Linear progress indicator
- **Toast** - Temporary notifications with position and variant control

### Navigation (4 components)
- **Menu** - Dropdown menu with submenus and groups
- **Tabs** - Tabbed interface with keyboard navigation
- **Path** - Breadcrumb navigation trail
- **Anchor** - Link with optional preview tooltip

### Container (4 components)
- **Modal** - Centered dialog with overlay and slots
- **Card** - Container with optional header, body, footer
- **Mask** - Modal overlay for focus
- **Scroll** - Scrollable container with custom scrollbar

### Display (2 components)
- **Table** - Data table with columns and sorting
- **Code** - Code block with syntax highlighting

### Action (2 components)
- **Command** - Searchable command menu (Cmd+K style)
- **Confirm** - Alert dialog for destructive actions

### Theme (1 component)
- **Color** - Color picker input

## Architecture

### CSS Modules + CSS Variables

Components are styled with **unstyled-by-default** CSS Modules that rely on CSS custom properties (variables). This enables complete theming flexibility without needing Tailwind in your application.

```tsx
import styles from './Button.module.css';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const { buttonProps } = useButton({ isDisabled: props.disabled }, ref);

    return (
      <button
        {...buttonProps}
        className={cn(
          styles.button,
          styles[`button__${variant}`],
          styles[`button--${size}`],
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
.button {
  --_bg: var(--accent-500);
  --_fg: var(--accent-50);

  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-md);
  background-color: var(--_bg);
  color: var(--_fg);
  cursor: pointer;
}

.button[data-hovered]:not([data-disabled]) {
  --_bg: var(--accent-600);
}

.button[data-disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### React Aria for Accessibility

All components use React Aria hooks for:
- Keyboard navigation (arrow keys, Enter, Escape)
- Focus management and focus rings
- Screen reader announcements
- ARIA attributes and roles
- Interaction states (hovered, pressed, focused, disabled)

### Design Tokens

The component system expects these CSS variable families. Provided by theme packages like `ui-lab-theme-onyx`:

**Color families** (8 colors × 9 shades each):
- `--accent-{50,100,200,...,900}`
- `--background-{50,...,900}`
- `--foreground-{50,...,900}`
- `--success-{50,...,900}`
- `--danger-{50,...,900}`
- `--warning-{50,...,900}`
- `--info-{50,...,900}`

**Typography**:
- `--text-sm`, `--text-md`, `--text-lg`, `--text-xl`

**Spacing & radius**:
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

See [theme-onyx](https://github.com/kyza0d/ui-lab/tree/main/packages/@theme-onyx) for complete token definitions.

## Development

### Project Structure

```
packages/@ui/
├── src/
│   ├── components/          # 39 component implementations
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.css
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   └── Select.module.css
│   │   └── ... (37 more)
│   ├── providers/           # ThemeProvider, hooks
│   ├── hooks/               # useFilter, useAnimatedWidth, etc.
│   ├── lib/                 # Utilities (cn, classnames)
│   ├── index.ts             # Public exports
│   └── styles.css           # Base component styles
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

## Customization

### Override Colors

Components style themselves using CSS variables, so customization is just defining those variables:

```css
:root {
  --accent-500: #3b82f6;
  --accent-600: #2563eb;
  --background-50: #f8fafc;
  --background-900: #0f172a;
  /* ... etc for all color families */
}
```

The full list of required tokens is shown in [Architecture → Design Tokens](#design-tokens) above.

### Using a Custom Theme

Instead of manually defining all tokens, use a theme package:

```tsx
import 'path/to/custom-theme.css';
import { Button } from 'ui-lab-components';
```

Create your own theme by extending `ui-lab-theme-onyx` or starting from scratch with the token structure.

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

- **@ui-lab/components** - This package (component library, unstyled)
- **@theme-onyx** - Default theme package with color tokens and typography
- **@ui-lab/registry** - Component metadata and documentation
- **@ui-lab/@mcp** - MCP server for AI-assisted development
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
