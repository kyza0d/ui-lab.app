# ui-lab-components

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
