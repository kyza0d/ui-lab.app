# UI Lab Design Guidelines

## Design Philosophy

Building beautiful, consistent UI with UI Lab starts with understanding **what the UI communicates**, not just how it looks. This shifts the entire design approach:

### Semantic Intent Over Appearance

Every design decision answers: "What does this communicate to the user?"

- A red button communicates "danger, be careful" (use danger family)
- A green checkmark communicates "success, completed" (use success family)
- A light gray background communicates "inactive, secondary" (use background-500)

This semantic meaning is encoded in the **design system** through color families, components, and patterns. The design system enforces consistency automatically.

### Component Mastery Over Styling

UI Lab components handle interaction patterns, state management, dark mode, and accessibility built-in. Customization happens through component props and variants, never CSS classes:

```tsx
// ❌ Wrong: Trying to force behavior with CSS
<button className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700">
  Click me
</button>

// ✓ Correct: Let component handle it
<Button variant="primary">Click me</Button>
```

The Button component handles:
- Base styling (accent colors, proper text color)
- Hover states (darker shade)
- Active states (even darker)
- Dark mode (components auto-adapt)
- Focus indicators (for accessibility)
- Disabled states (clear visual feedback)

**Trust the component API.** It's designed by experts who understand accessibility and interaction patterns.

### Design Tokens As System Constraints

The design system constrains your choices to maintain consistency:

**Colors**: 7 semantic families × 11 shades each = 77 colors (not infinite)
**Spacing**: 8 fixed values (not arbitrary pixels)
**Typography**: 7 hierarchy levels (not any font size)
**Motion**: 3 durations and easing options (not random animations)

These constraints enable:
- **Consistency**: All UIs follow the same visual language
- **Maintainability**: Single source of truth for all design tokens
- **Accessibility**: Tokens verified for WCAG AA compliance
- **Theming**: Change all colors by updating token definitions
- **Onboarding**: New developers learn patterns once, apply everywhere

### Design System As Source of Truth

When uncertain, consult the design system rather than inventing solutions:

- **Color choice unclear?** → Reference color-family-guide.md
- **Which component to use?** → Use component-selection.md decision tree
- **Spacing feels off?** → Check spacing-typography.md scale
- **Pattern exists?** → Use patterns.md as blueprint

Never work around system limitations. If something isn't possible with current components, that's valuable feedback—elevate it, don't patch it.

---

## Core Rules (Non-Negotiable)

### Rule 1: Always Use Semantic Color Families

**The Problem**: Arbitrary colors (blue, red, zinc, slate, etc.) don't communicate intent and fragment the design language.

**The Solution**: Map UI intent to semantic families:

| Intent | Family | Example |
|--------|--------|---------|
| Primary action | accent | Primary button, link, focus ring |
| Positive outcome | success | Success message, approved badge |
| Error/problem | danger | Error alert, delete button |
| Caution/pending | warning | Warning message, pending badge |
| Informational | info | Help text, info message |
| Backgrounds | background | Page, card, container backgrounds |
| Text/borders | foreground | Body text, labels, borders |

**Correct**:
```tsx
// All colors use semantic CSS variables
<button className="bg-[var(--accent-600)] text-[var(--foreground-50)]">
  Click me
</button>

<div className="bg-[var(--success-50)] border border-[var(--success-300)]">
  Success!
</div>
```

**Incorrect** (❌ Never):
```tsx
// ❌ Arbitrary Tailwind colors
<button className="bg-blue-600 text-white">
  Click me
</button>

// ❌ Hex colors
<div className="bg-[#f0f9ff] border border-[#dcfce7]">
  Success!
</div>

// ❌ Gray shades
<input className="bg-zinc-50 border border-gray-300" />
```

### Rule 2: All Colors Are CSS Variables

Every color in the design system is a CSS variable: `--{family}-{shade}` where shade ranges from 50 (lightest) to 950 (darkest).

**Why CSS variables?**
- Single source of truth (change `--accent-600` once, updates everywhere)
- Theme switching (define variables for light/dark mode)
- Accessibility (ensure all pairs meet WCAG standards)
- Type safety (validated at design-token-registry level)

**Correct usage**:
```tsx
// CSS
.button {
  background-color: var(--accent-600);
  color: var(--foreground-50);
  border-color: var(--accent-700);
}

// TSX with Tailwind (using arbitrary values)
<button className="bg-[var(--accent-600)] text-[var(--foreground-50)] border border-[var(--accent-700)]">
  Click me
</button>
```

### Rule 3: Components Handle Interactions, Not CSS Classes

UI Lab components manage interaction states (hover, active, disabled, dark mode) through their component logic and built-in styling. Never use CSS classes to override or "fix" component behavior.

**Pattern: Button States**
```tsx
// ✓ Component handles hover and active states automatically
<Button variant="primary">Click me</Button>

// ❌ Never add hover classes - component already has them
<Button variant="primary" className="hover:bg-[var(--accent-700)]">
  Click me
</Button>
```

**Pattern: Dark Mode**
```tsx
// ✓ Component adapts to dark mode automatically
<Alert variant="success">All systems operational</Alert>

// ❌ Never use dark: prefixes - components handle this
<div className="bg-success-50 dark:bg-success-950">
  Content
</div>
```

**Pattern: Disabled State**
```tsx
// ✓ Component handles disabled styling through prop
<Input disabled placeholder="Disabled input" />

// ❌ Never add classes to fake disabled appearance
<input disabled className="opacity-50 cursor-not-allowed" />
```

### Rule 4: Dark Mode Handled by Components

Components automatically adapt to dark mode. Don't add `dark:` utility classes or conditional styling.

**How it works**: Components use CSS variables that change between light and dark themes. Components reference these variables internally, so dark mode "just works."

**Correct**:
```tsx
// Component handles dark mode automatically
<Card title="My Card">
  <p>Content automatically adapts to dark mode</p>
</Card>
```

**Incorrect**:
```tsx
// ❌ Don't use dark: prefixes
<div className="bg-foreground-50 dark:bg-foreground-950">
  Content
</div>

// ❌ Don't conditionally render for dark mode
{isDarkMode ? (
  <div className="bg-black">Content</div>
) : (
  <div className="bg-white">Content</div>
)}
```

### Rule 5: Spacing Follows Fixed Scale

Spacing is constrained to 8 fixed values ensuring visual harmony and consistency:

```
4px  (gap-1, p-1)
8px  (gap-2, p-2)
12px (gap-3, p-3)
16px (gap-4, p-4)
24px (gap-6, p-6)
32px (gap-8, p-8)
48px (gap-12, p-12)
64px (gap-16, p-16)
```

**Why fixed scale?** When spacing is constrained, every design feels harmonious. When arbitrary, spacing feels random and disconnected.

**Correct**:
```tsx
// Only use scale values
<div className="flex gap-4 p-6">
  <Button>One</Button>
  <Button>Two</Button>
</div>
```

**Incorrect**:
```tsx
// ❌ Never invent spacing values
<div className="flex gap-7 p-5">
  <Button>One</Button>
  <Button>Two</Button>
</div>

// ❌ Never use arbitrary padding
<div className="p-[13px]">
  Content
</div>
```

### Rule 6: Every Decision Includes Semantic Reasoning

Every design choice should be traceable to semantic intent and design guidelines. This enables:

1. **Consistency**: Other developers understand why choices were made
2. **Maintainability**: Future changes preserve design intent
3. **Learning**: New team members understand design language
4. **Accountability**: Decisions are guided by system, not personal preference

**Example with reasoning**:
```tsx
// ✓ Semantic reasoning included
// This success alert uses:
// - success family (semantic: positive outcome)
// - light shade bg (--success-50) for emphasis
// - dark text (--success-900) for contrast
// - border (--success-300) for visual definition
<Alert variant="success" title="Payment processed">
  Your payment of $99.99 has been successfully processed.
</Alert>
```

---

## Common Misconceptions & Corrections

### Misconception 1: "I Need Custom Colors For My Brand"

**Reality**: UI Lab color families are customizable through CSS variables. All colors are theme-able—change `--accent-600` and all primary buttons update automatically.

The semantic families (accent, success, danger, etc.) remain the same; the specific colors change via variables.

### Misconception 2: "I Need Hover/Dark Mode CSS Because Component Doesn't Support It"

**Reality**: Components handle hover, active, disabled, and dark mode states automatically through their internal logic and CSS modules.

If a component doesn't behave as expected, that's a component bug or limitation worth reporting—don't patch it with CSS.

### Misconception 3: "I Need Different Padding/Spacing Because The Design Says So"

**Reality**: If spacing needs differ from the scale, usually one of two things is true:
1. Wrong component was chosen (choose different component)
2. Component needs enhancement (file as feedback)

Never break the spacing scale. Consistency trumps one-off design requests.

### Misconception 4: "Dark Mode Needs Special CSS Dark: Prefixes"

**Reality**: Components handle dark mode automatically. The CSS variables they reference change between light and dark themes automatically.

Adding `dark:` prefixes is redundant and breaks the design system's theme abstraction.

---

## When These Rules Conflict With Design

**The short answer**: Rules always win.

**The reasoning**: Design tokens and patterns exist to maintain consistency. When a specific design request violates rules:

1. **Discuss with design**: "This request needs custom colors outside our semantic families. Should we add a new family?"
2. **Elevate if needed**: "This interaction pattern isn't supported by current components. Should we enhance?"
3. **Don't patch**: Never use CSS to work around system constraints
4. **Document**: "This required system extension because [reason]"

The goal is a **system that improves over time**, not a system you work around.

---

## Quick Reference: Wrong vs. Right

### Color Usage

| Wrong | Right | Why |
|-------|-------|-----|
| `bg-blue-600 text-white` | `bg-[var(--accent-600)] text-[var(--foreground-50)]` | Semantic intent, CSS variables |
| `bg-red-500` | `bg-[var(--danger-600)]` | Semantic family for meaning |
| `#ffffff` | `var(--background-50)` | Design token, not arbitrary hex |
| `bg-slate-100` | `bg-[var(--background-100)]` | Grayscale from background family |

### Component Usage

| Wrong | Right | Why |
|-------|-------|-----|
| Custom div with role="button" | `<Button>` | Button component handles a11y |
| `<div className="hover:bg-blue-700">` | `<Button>` component (handles hover) | Component manages states |
| Input with `dark:` prefix styling | `<Input>` (handles dark mode) | Component manages themes |
| Div with spacing not on scale | Adjust component choice or spacing to scale | Consistency |

### Spacing

| Wrong | Right | Why |
|-------|-------|-----|
| `gap-7` | `gap-6` or `gap-8` | Use scale value |
| `p-[13px]` | `p-3` | Use scale value |
| `m-5` | `m-4` or `m-6` | Use scale value |
| Custom margin value | Adjust design or component choice | System constraint |

---

## Summary: Design Philosophy in Action

When you sit down to build a UI section:

1. **Ask**: "What does this communicate?" → Identify semantic intent
2. **Choose**: "Which component matches this pattern?" → Consult component-selection.md
3. **Color**: "What semantic family fits this intent?" → Consult color-family-guide.md
4. **Compose**: "What's the layout structure?" → Check patterns.md for composition
5. **Verify**: "Does this follow all rules?" → Cross-check non-negotiable rules
6. **Document**: "Why these choices?" → Include reasoning in code/comments

Result: Beautiful, consistent, accessible, maintainable UI that communicates clearly to users.
