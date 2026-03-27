# ui-lab-components

## 0.3.4

### Patch Changes

- Enhanced component examples and metadata in the registry, improved component styling system with better typography and layout support, and fixed styling issues in Divider and Checkbox components.

## 0.3.3

### Patch Changes

- Added Onyx theme package to the release pipeline.

## 0.3.2

### Patch Changes

- Improved visual consistency across Badge, Banner, Button, and Anchor components, including refined typography sizing and hover interaction styles.

## 0.3.1

### Patch Changes

- Fixed floating positioning in Select, Tooltip, and Popover components. Added cookie-based server-side theme support and updated the color mode API for easier theme integration.

## 0.3.0

### Minor Changes

- Textarea now supports a maxHeight prop for scroll-constrained inputs. Select has an improved searchable trigger with better accessibility. The theme system has been redesigned using CSS variables and semantic color tokens, with a new Onyx theme added.

## 0.2.0

### Minor Changes

- 2a6aaf5: New features:

  - List.Controls — new subcomponent with checkbox, switch, input, and select wrappers
  - Select: valueLabel prop for SSR label persistence
  - Frame component CSS module type definitions

  Refactors / breaking changes:

  - List.Checkbox removed (consolidated into List.Controls)
  - Switch, Modal: simplified APIs with removed complexity
  - Checkbox, Switch: updated styling and component APIs
  - Tooltip, Select: improved animation handling and exports

  Other:

  - Removed Breadcrumbs and Confirmation components
  - Migrated config/scripts to TypeScript
  - Updated registry data and site content
