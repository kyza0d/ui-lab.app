# UI Lab Design System Reference

Canonical rules for validating adherence to UI Lab tokens, components, and patterns. Each section lists rules; violations are flaggable.

## Color tokens

### Neutral palette

Tailwind neutrals are never allowed. Replace:

| Disallowed | Replacement |
|---|---|
| `bg-white`, `bg-gray-*`, `bg-zinc-*`, `bg-slate-*`, `bg-stone-*`, `bg-neutral-*` | `bg-background-{500–950}` |
| `bg-black` | `bg-background-950` |
| `text-gray-*`, `text-zinc-*`, `text-slate-*`, `text-stone-*`, `text-neutral-*` | `text-foreground-{50–400}` |

Surface is dark-first: higher shade = deeper surface.

| Role | Shade |
|---|---|
| Root container | `bg-background-950` or `-900` |
| Card / panel / modal | `bg-background-800` or `-900` |
| Toolbar / header | `bg-background-700` to `-800` |
| Hover | One shade lighter than base |

### Semantic tokens

Feedback states use semantic tokens, not chromatic Tailwind:

| Intent | Use | Not |
|---|---|---|
| Success | `text-success-*`, `bg-success-*` | `*-green-*` |
| Danger | `text-danger-*`, `bg-danger-*` | `*-red-*` |
| Warning | `text-warning-*`, `bg-warning-*` | `*-yellow-*`, `*-amber-*` |
| Info | `text-info-*`, `bg-info-*` | `*-blue-*` |

Chromatic Tailwind is allowed as intentional decoration (brand, file-type indicators, illustration). Only flag when it substitutes for a semantic token.

### Shade ranges

| Token | Valid range |
|---|---|
| `text-foreground-*` | 50–400 (500+ does not exist) |
| `bg-background-*` (surfaces) | 600–950 |
| `bg-background-*` (text/icon-on-dark only) | any |
| Semantic (`success`/`danger`/`warning`/`info`/`accent`) | max 600 |

`bg-background-{<600}` used as a surface fill is a depth inversion.

## Styling prohibitions

Never use:
- Hex: `#rrggbb`
- `rgba()` in className or inline style
- `shadow-*`, `drop-shadow-*`
- `from-*`, `to-*`, `via-*`, `bg-gradient-*`
- `dark:` prefixes (CSS variables handle theming)

## Components

Any native element with styling must be replaced with its UI Lab equivalent.

| Native | UI Lab |
|---|---|
| `<button>` | `<Button>` |
| `<a>` | `<Anchor>` |
| `<input type="text">` | `<Input>` |
| `<input type="checkbox">` | `<Checkbox>` |
| `<input type="radio">` | `<Radio>` |
| `<select>` | `<Select>` |
| `<textarea>` | `<TextArea>` |
| `<label>` | `<Label>` |
| `<form>` | `<Form>` |
| `<div className="flex">` | `<Flex>` |
| `<div className="grid">` | `<Grid>` |
| `<div>` (padded container) | `<Card>` |
| `<div>` (grouping controls) | `<Group>` |

Imports:
```js
import { ComponentName } from 'ui-lab-components'
```

Do not infer component APIs from memory. Fetch from MCP `get_component`. Theme provider must come verbatim from MCP `get_theme_setup`.

### Prop conventions (React Aria)

| Use | Not |
|---|---|
| `isDisabled` | `disabled` |
| `onPress` | `onClick` |
| `isOpen` / `onOpenChange` | `isVisible` / `onVisibilityChange` |

### Compound sub-components

Prefer compound forms over raw wrappers:
- `<Card.Header>`, `<Card.Footer>` over `<div>`
- `<Modal.Footer>` over footer wrapper
- `<List.Item>` with `<List.Checkbox>` for selectable lists
- `<Group.Select>` for grouped controls

## Interactive states

Every interactive element defines: hover, active/pressed, disabled (when applicable), focus (keyboard).

## Affordance rules

- **No zero-state chrome.** Hide counters/filters/results UI until count > 0 (`"0 items selected"`, `"No filters applied"`, `"0 results"` are violations).
- **No duplicate affordances.** Same action on the same element twice (icon button + text link for delete) — pick one or differentiate hierarchy.
- **No mode-leaking affordances.** In mutually exclusive modes (single vs. batch select), per-item actions hide in batch mode; batch actions hide in single mode.
- **No redundant action surfaces.** Two surfaces with the same intent under the same conditions — one is redundant.

## Anti-patterns

Flag these; they indicate hand-tuned utilities substituting for system tokens.

### Typography

- Arbitrary sizes: `text-[11px]`, `text-[10px]`, etc.
- Arbitrary tracking: `tracking-[0.22em]`, etc.
- `uppercase tracking-wide` and similar micro-label combos without semantic need
- `uppercase` used purely for visual flavor
- Stacked overrides like `font-bold leading-snug` on labels, chips, buttons, supporting text
- Manual line-height overrides without a real wrapping/density need

Prefer component defaults and tokenized text styles.

### Motion

- `transition-all` (flag by default)
- `transition-colors` on static containers, layout wrappers, non-interactive decoration
- Decorative `delay-*` with no state-change signal

Motion must be tied to state, feedback, or focus.

### Copy

- **Redundant labels.** Tooltip or aria-label identical to visible text (`<Button>Save</Button>` with `aria-label="Save"`).
- **Parasitic instructions.** Help text that persists after the described action (e.g. "Enter your email" still showing post-submit).
- **Heading/breadcrumb duplication.** Heading restates the last breadcrumb segment.
- **Icon+label parity.** Decorative prefix icon that restates the label with no hierarchy or indicator value.
- **Verbose empty states.** More than one short sentence + one CTA.

## Audit checklist

1. Colors: neutral palette, semantic tokens, shade ranges
2. Styling prohibitions (hex, rgba, shadow, gradient, `dark:`)
3. Component substitutions for styled native elements
4. Imports from `ui-lab-components`; theme from `get_theme_setup`
5. React Aria props; compound sub-components where available
6. Interactive states present
7. Affordance rules (zero-state, duplicates, mode-leaking, redundant surfaces)
8. Anti-patterns (typography, motion, copy)
