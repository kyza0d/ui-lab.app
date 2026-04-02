# UI Lab Design System Reference

This document captures the canonical standards for design system adherence. Use this as the source of truth when validating how well a design utilizes UI Lab components, tokens, and patterns.

## Color & Theming Standards

### Neutral Palette (ALWAYS Replace)
Replace these Tailwind colors with design tokens:
- `bg-white`, `bg-black`
- `text-gray-*`, `bg-gray-*`
- `text-zinc-*`, `bg-zinc-*`
- `text-slate-*`, `bg-slate-*`
- `text-stone-*`, `bg-stone-*`
- `text-neutral-*`, `bg-neutral-*`

**Replacement pattern:**
- Neutral text → `text-foreground-*` (range 50–400)
- Neutral surface → `bg-background-*` (range 500–950, dark-first hierarchy)

**Specific mappings:**
- `bg-white` → `bg-background-950` (root container, darkest in dark mode, lightest in light mode)
- `bg-gray-100` to `bg-gray-300` → `bg-background-800` to `bg-background-900` (elevated surfaces)
- `bg-gray-400` to `bg-gray-600` → `bg-background-700` to `bg-background-800` (toolbars, headers)

### Semantic Color Tokens
When expressing feedback states or semantic intent, use semantic tokens instead of chromatic Tailwind:
- Success: `text-success-*` / `bg-success-*` (not `text-green-*`, `bg-green-*`)
- Danger/Error: `text-danger-*` / `bg-danger-*` (not `text-red-*`, `bg-red-*`)
- Warning: `text-warning-*` / `text-warning-*` (not `text-yellow-*`, `text-amber-*`)
- Info: `text-info-*` / `bg-info-*` (not `text-blue-*`, `bg-blue-*`)

**Exception:** Chromatic Tailwind colors (red, blue, green, orange, purple, etc.) used as intentional design accents (brand colors, file-type indicators, visual decoration) are NOT violations — only flag when they substitute for a semantic feedback token.

### Foreground Shade Range
- Valid: `text-foreground-50` through `text-foreground-400`
- Invalid: `text-foreground-500+` (shades 500+ do not exist)

### Surface Background Hierarchy (Dark-First)
Surfaces follow this depth hierarchy:
- **Root container:** `bg-background-950` or `bg-background-900`
- **Elevated surface (card, panel, modal):** `bg-background-800` or `bg-background-900`
- **Toolbar/header:** `bg-background-700` to `bg-background-800`
- **Hover state:** One step lighter than its base surface

**Violation:** Shades below 600 (e.g., `bg-background-200`) on surfaces are almost always a depth inversion. Low shades are valid ONLY for text-on-dark or icon-on-dark contexts, never as surface fills.

### Semantic Color Max Shade
- Max valid shade for semantic colors: 600
- Invalid: `bg-accent-700`, `bg-danger-800`, etc.

## Styling Prohibitions

**CRITICAL — Never use:**
- Hex colors: `#rrggbb`
- RGBA colors: `rgba(...)` in className or inline style
- Shadow classes: `shadow-*`, `drop-shadow-*`
- Gradient classes: `from-*`, `to-*`, `via-*`, `bg-gradient-*`
- Dark mode prefixes: `dark:` (CSS variables handle theming automatically)

## Component & API Standards

### Component Mapping (ALWAYS Use UI Lab Components)
Replace native HTML elements with their UI Lab equivalents:

| Native HTML | UI Lab Component | Use Case |
|---|---|---|
| `<button>` | `<Button>` | Any clickable action |
| `<a>` | `<Anchor>` | Links to external sites or internal routes |
| `<input type="text">` | `<Input>` | Text fields |
| `<input type="checkbox">` | `<Checkbox>` | Toggle single option |
| `<input type="radio">` | `<Radio>` | Toggle one option from group |
| `<select>` | `<Select>` | Dropdown menu selection |
| `<div className="flex">` | `<Flex>` | Layout containers |
| `<div className="grid">` | `<Grid>` | Grid layouts |
| `<div>` (with padding/bg) | `<Card>` | Content containers |
| `<div>` (grouping controls) | `<Group>` | Control grouping |
| `<label>` | `<Label>` | Form labels |
| `<textarea>` | `<TextArea>` | Multi-line text input |
| `<form>` | `<Form>` | Form wrapper |

**CRITICAL:** Any native HTML element with styling (className, style) should be replaced with its UI Lab equivalent. This is non-negotiable for adherence.

### Imports
All UI Lab component imports must use:
```javascript
import { ComponentName } from 'ui-lab-components'
```

Never invent or assume component APIs from memory. Always source from MCP via `get_component`.

### React Aria Conventions
UI Lab components follow React Aria naming:
- Use `isDisabled` (not `disabled`)
- Use `onPress` (not `onClick`)
- Use `isOpen`/`onOpenChange` (not `isVisible`/`onVisibilityChange`)

### Compound Sub-Components
Use compound patterns where available:
- `<Card.Header>` instead of raw `<div>`
- `<Modal.Footer>` instead of footer wrapper
- `<List.Item>` with `<List.Checkbox>` for selections
- `<Group.Select>` for grouped controls

### Theme & Provider Setup
Theme provider code must use exact setup returned by MCP's `get_theme_setup`. Never handwrite or assume provider structure.

## Interactive States

Every interactive element must have:
- ✓ Hover state
- ✓ Active/pressed state
- ✓ Disabled state (when applicable)
- ✓ Focus state (for keyboard navigation)

## Redundancy & Affordance Clarity

### Avoid Redundant State Display
Don't show quantity/selection/progress in zero/empty states:
- "0 items selected" → hide until count > 0
- "No filters applied" → hide until filters exist
- "0 results" → hide until results change

### Avoid Duplicate Affordances
Same action exposed multiple times on one element with no hierarchy distinction. Example violation:
- Icon button + text link for "delete" on the same row → pick one or clearly differentiate

### Mode-Leaking Affordances
When UI has mutually exclusive modes (single-select vs. batch-select):
- Per-item actions must be suppressed during batch mode
- Batch actions must be suppressed during single-item mode
- No affordance should remain visible across mode transitions

### Redundant Action Exposure
Same action in multiple places with no meaningful scope distinction:
- Each action surface must have exclusive reason to exist
- If two surfaces serve same intent under same conditions, one is redundant

## AI Slop Patterns (Avoid)

### Redundant Labels
Tooltip, title, or aria-label that verbatim repeats element's visible text:
- "Save" button with tooltip "Save" ❌

### Parasitic Instructional Copy
Help text that persists after user completes described action:
- Example: "Enter your email address" copy still showing after email submitted

### Heading/Breadcrumb Duplication
Page heading that restates final breadcrumb segment word-for-word:
- Breadcrumb: "Settings > Billing" + Heading: "Billing" ❌

### Icon+Label Parity
Decorative prefix icon whose meaning is 100% identical to sibling label with no weight/hierarchy benefit:
- Remove the icon or make it load-bearing (visual indicator, warning symbol, etc.)

### Verbose Empty States
Empty-state body copy longer than one short sentence + one CTA — trim to minimum needed for user to act.

## How to Use This Reference

When auditing a design against the **Adherence** pillar:
1. Check all color usage against Neutral Palette & Semantic Token sections
2. Verify component imports from 'ui-lab-components'
3. Confirm React Aria prop conventions (isDisabled, onPress, etc.)
4. Validate compound component usage
5. Ensure interactive states exist
6. Flag affordance clarity issues
7. Check for AI slop patterns
