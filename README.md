# UI Lab

A modern monorepo for building, documenting, and publishing a production-grade React component library. UI Lab combines accessible components, semantic design tokens, and comprehensive documentation into a single development experience.

## What is UI Lab?

UI Lab is a complete component library ecosystem with:

- **27+ accessible React components** - Built with React Aria and Tailwind CSS
- **Type-safe styling** - CSS Modules with semantic CSS variables
- **Interactive documentation** - Next.js site with live component demos
- **Component registry** - Metadata and discovery system
- **Monorepo structure** - Organized packages for scalability

Perfect for teams building design systems or developers who need production-ready UI components with strong accessibility and customization.

## Repository Structure

```
ui-lab/
├── packages/
│   ├── components/                 # Component library (@ui-lab/components)
│   │   ├── src/components/         # 27+ React components
│   │   ├── src/lib/                # Utilities (cn, hooks)
│   │   ├── dist/                   # Built UMD + ESM
│   │   └── README.md               # Component library documentation
│   └── registry/                   # Component metadata (@ui-lab/registry)
│       └── generated/              # Auto-generated component data
│
├── apps/
│   └── site/                       # Documentation website (@ui-lab/site)
│       ├── app/                    # Next.js app directory
│       ├── components/             # Site-specific components
│       └── public/                 # Static assets
│
├── pnpm-workspace.yaml             # Monorepo configuration
├── package.json                    # Root package scripts
└── README.md                       # This file
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kyza0d/ui-lab.app.git
cd ui-lab

# Install dependencies
pnpm install
```

### Development

Start the development environment:

```bash
# Run everything in parallel (site + backend builds)
pnpm dev

# Or run individual packages
pnpm dev:site                      # Next.js documentation site only
pnpm build:packages                # Build component library only
```

The site will start at `http://localhost:3000` with hot reloading.

### Building

```bash
# Build all packages
pnpm build

# Build only component library
pnpm build:packages

# Build only documentation site
pnpm build:site

# Type check all packages
pnpm type-check

# Lint all packages
pnpm lint

# Clean all dist directories
pnpm clean
```

## Packages

### @ui-lab/components

The component library - 27+ accessible, customizable React components.

**Features:**
- React Aria for accessibility (WCAG AA)
- CSS Modules + Tailwind CSS
- Type-safe styling
- ESM + CJS exports
- Zero runtime dependencies

**Key Components:** Button, Input, Select, Modal, Tabs, Form, CommandPalette, and more.

**Install standalone:**
```bash
npm install ui-lab-components
```

[Full documentation →](./packages/components/README.md)

### @ui-lab/registry

Component metadata and documentation system. Auto-generated component registry for discovery and integration.

**Contents:**
- Component names and descriptions
- Component API documentation
- Usage examples and patterns
- Component categorization

### @ui-lab/site

Interactive documentation and demo site built with Next.js.

**Features:**
- Live component previews
- Copy-paste code examples
- Responsive design showcase
- Search and component discovery
- Installation guides

**Run locally:**
```bash
pnpm dev:site
```

## Component Library Overview

### Layout Components
Flex, Grid, Group, Fold, Card, Divider

### Input Components
Button, Input, TextArea, Checkbox, Radio, Switch, Select, Label

### Feedback Components
Badge, Progress, Toast, Tooltip

### Modal Components
Modal, Popover, Menu, Confirmation

### Complex Components
Tabs, Slider, Form, CommandPalette, Breadcrumbs

[Browse all components →](./packages/components/README.md#components)

## Development Workflow

### Adding a New Component

1. **Create component structure:**
   ```bash
   mkdir packages/components/src/components/my-component
   ```

2. **Implement component** with React Aria hooks and CSS Modules:
   ```
   MyComponent.tsx         # React component
   MyComponent.module.css  # Scoped styles
   MyComponent.module.css.d.ts  # Type definitions
   ```

3. **Export in index.ts:**
   ```tsx
   export { MyComponent } from './components/my-component';
   ```

4. **Build and test:**
   ```bash
   pnpm build:packages
   ```

5. **Add demo to site** (optional but recommended)

See [Component Conversion Guide](./packages/components/COMPONENT_CONVERSION.md) for detailed implementation patterns.

### Publishing

To publish the component library:

```bash
# Update package versions
# Then publish to npm
pnpm publish -r
```

Use [yalc](https://github.com/wclr/yalc) for local testing before publishing:

```bash
pnpm build:push          # Build and push to yalc
pnpm run use:local       # Use local version in site
pnpm run use:prod        # Switch back to published version
```

## Styling & Design System

### CSS Variables

Components use semantic CSS variables for theming:

```css
--accent-50 through --accent-950
--background-700, --background-800
--foreground-50, --foreground-900
--text-sm, --text-md, --text-lg
--radius-md, --radius-lg, --radius-full
--border-width-base
```

### Tailwind CSS

Tailwind is integrated for layout utilities (`@apply px-4 py-2`). Avoid using `@apply` for colors - use CSS variables instead.

### CSS Modules Pattern

All components follow strict CSS Module patterns:

```tsx
import styles from './Button.module.css';

<button className={cn(styles.button, styles['button.primary'])} />
```

[CSS Module patterns →](./packages/components/COMPONENT_CONVERSION.md#css-module-structure)

## Accessibility

All components meet **WCAG 2.1 AA** standards:

- ✅ Full keyboard navigation
- ✅ Screen reader support
- ✅ Semantic HTML
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ ARIA attributes

Built with [React Aria](https://react-spectrum.adobe.com/react-aria/) for production-grade accessibility.

## Project Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all development servers |
| `pnpm dev:site` | Start documentation site only |
| `pnpm build` | Build all packages |
| `pnpm build:packages` | Build component library only |
| `pnpm build:site` | Build documentation site only |
| `pnpm build:push` | Build and push components to yalc |
| `pnpm type-check` | Check TypeScript types across all packages |
| `pnpm lint` | Lint all packages |
| `pnpm clean` | Clean all dist directories |
| `pnpm publish` | Publish to npm (interactive) |

## Technology Stack

### Core
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Component library bundler
- **Next.js** - Documentation site

### Styling
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - CSS processing
- **CSS Modules** - Scoped styles

### Accessibility
- **React Aria** - Accessible components
- **React Stately** - State management
- **Floating UI** - Popover positioning

### Development
- **pnpm** - Package manager
- **ESLint** - Code quality
- **TypeScript** - Type checking

## Contributing

### Branch Strategy

- `master` - Main development branch
- Feature branches use conventional naming: `feat/`, `fix/`, `docs/`, etc.

### Code Standards

- **No comments** - Write self-documenting code
- **Type safety** - Comprehensive TypeScript
- **Accessibility first** - All interactive elements must be keyboard navigable
- **CSS Modules** - Follow the strict pattern in COMPONENT_CONVERSION.md
- **React Aria** - Use hooks for accessibility, never custom solutions

### Component Guidelines

1. Use React Aria for all interactive elements
2. Follow CSS Module patterns with semantic variables
3. Implement data attributes for state styling
4. Test keyboard navigation and screen reader support
5. Ensure focus-visible styling for all interactive elements

[Detailed component patterns →](./packages/components/COMPONENT_CONVERSION.md)

## Resources

### Documentation
- [Component Library README](./packages/components/README.md) - Full component documentation
- [Component Conversion Guide](./packages/components/COMPONENT_CONVERSION.md) - Implementation patterns
- [Component API](./packages/components/README.md#components) - Component reference

### External Resources
- [React Aria Documentation](https://react-spectrum.adobe.com/react-aria/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN CSS Modules](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Modules)
- [Next.js Documentation](https://nextjs.org/docs)

## Links

- **npm Package**: [ui-lab-components](https://www.npmjs.com/package/ui-lab-components)
- **Repository**: [kyza0d/ui-lab.app](https://github.com/kyza0d/ui-lab.app)
- **Issues**: [GitHub Issues](https://github.com/kyza0d/ui-lab.app/issues)
- **Live Demo**: [UI Lab Site](https://ui-lab.app) (when deployed)

## License

MIT - See LICENSE file

---

**Get Started:** [Install the component library](./packages/components/README.md#installation) or [run the development site](./packages/components/README.md#quick-start)
