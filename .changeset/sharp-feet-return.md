---
"ui-lab-components": minor
"ui-lab-registry": minor
---

New features:

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
