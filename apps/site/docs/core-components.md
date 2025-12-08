Tier 1 - High Impact

1. Modal/Dialog
  - Blocking overlay interactions
  - Confirmation dialogs
  - Forms in modals
  - Side panels/drawers
2. Card
  - Container for form sections
  - Header/body/footer structure
  - Elevation/shadow variants
  - Essential for layout
3. Dropdown/Menu - Different from Select
  - Action menus (more options)
  - Context menus
  - Cascading submenus
  - Works with buttons

   Tabs - Multi-section navigation
  - Switch between content sections
  - Icon support
  - Accessible tab management

Tier 2 - Polish & UX

5. Pagination - Data navigation
  - Next/prev buttons
  - Page numbers
  - Jump to page
  - Common in data tables
6. Progress/Loading States
  - Progress bar (linear)
  - Spinner/loader (circular)
  - Skeleton loader (content placeholder)
  - Needed for async operations
7. Accordion - Collapsible sections
  - FAQ layouts
  - Settings grouping
  - Space-efficient content
8. Table - Data display
  - Sorting, filtering
  - Striped rows
  - Sortable headers
  - Important if showing lists

Tier 3 - Nice to Have

9. Alert - Distinct from Toast
  - Persistent notifications
  - Dismissible option
  - Validation messages
10. Breadcrumb - Navigation trail
11. Code Block - You might have this already for showcase
12. Switch/Toggle - Boolean state selection
13. Slider/Range - Numeric input alternative
14. File Upload - Common form pattern
15. Combobox - Searchable select hybrid

My Top 3 Recommendations (besides Modal)

Card → Dropdown/Menu → Tabs

These three unlock:
- Better layout structure (Card)
- Richer interactions (Dropdown)
- Multi-view interfaces (Tabs)

  Button Enhancements (Critical)

  15. Button Variants Expansion
    - Loading state - Spinner + disabled
    - Icon support - Icon + text combinations
    - Icon-only variant - Square button for icons
    - Compact variant - Smaller padding for dense UIs
    - Full-width variant - 100% width option
    - Danger variant - Red/destructive actions
    - Success variant - Green/positive actions
    - Link variant - Button styled as link
    - Group support - Button groups (connected buttons)
  16. Button Size Refinements
    - Add xs size for small controls
    - Add xl size for primary CTAs
    - Consistent padding ratios across sizes
    - Icon size scaling with button size
  17. Button State Enhancements
    - Loading with spinner - Animated loading state
    - Icon + text - Flexible icon placement
    - Badge support - Badge overlay for notifications
    - Dropdown indicator - Arrow for dropdown menus
    - Keyboard focus - Visible focus ring

  ---
  Enhanced Form Example Using Proposed Components

  With these components, the Select showcase could include:

  Form Structure:
  ├── Card (container)
  │   ├── Card.Header (title + description)
  │   ├── Card.Body
  │   │   ├── FormGroup
  │   │   │   ├── Label (with optional indicator)
  │   │   │   ├── Input (with helper text)
  │   │   │   └── Checkbox
  │   │   ├── FormGroup
  │   │   │   ├── Label
  │   │   │   ├── Select
  │   │   │   └── Badge (status)
  │   │   ├── FormGroup
  │   │   │   ├── Label
  │   │   │   ├── RadioGroup
  │   │   │   └── Tooltip (info icon)
  │   │   └── Alert (validation message)
  │   └── Card.Footer
  │       ├── Button (primary - with icon)
  │       ├── Button (secondary - outline)
  │       └── Button (danger - destructive)
  ├── Toast (success feedback)
  └── Breadcrumb (navigation)

  ---
  Recommended Implementation Order

  Phase 1 (Essential - Unblock Forms)

  1. Input - Needed for almost all forms
  2. Label - Pairs with Input
  3. Button Enhancements - Loading, icon, variants
  4. Badge - Status indicators in forms
  5. Alert - Form feedback/errors

  Phase 2 (Form Completion)

  6. TextArea - Rich form support
  7. Checkbox - Binary choices
  8. Radio - Single selection from groups
  9. Card - Form containers
  10. Alert improvements - Dismissible

  Phase 3 (Polish & Enhancement)

  11. Toast - Floating notifications
  12. Tooltip - Helper text on hover
  13. Tabs - Multi-step forms/workflows
  14. Popover - Inline editing/details
  15. Breadcrumb - Navigation

  ---
  Button Enhancement Specifics

  The Button component needs these additions to make forms significantly more expressive:

  Current State

  variant: "default" | "secondary" | "outline" | "ghost"
  size: "sm" | "md" | "lg"
  disabled: boolean

  Enhanced State

  variant: "default" | "secondary" | "outline" | "ghost" |
           "danger" | "success" | "link" | "icon-only"
  size: "xs" | "sm" | "md" | "lg" | "xl"
  state: "default" | "loading" | "error"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  badge?: React.ReactNode
  onClick?: () => void
  loading?: boolean

  With These, You Can Create:

  - CTA Buttons - Large, prominent primary actions
  - Form Submit - With loading spinner
  - Icon Buttons - Small, dense toolbars
  - Danger Actions - Delete, destructive operations
  - Status Buttons - Success/error feedback
  - Link Buttons - Inline navigation
  - Badge Buttons - With notification indicators
  - Button Groups - Connected button sets
