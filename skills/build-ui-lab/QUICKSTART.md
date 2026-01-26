# Build UI Lab Skill - Quick Start Guide

Get started using the UI Lab Design-Driven Agent Skill in minutes.

## What Is This Skill?

A design-driven approach to building UI with UI Lab components. Instead of thinking about *appearance*, you think about *intent*:

- "What does this communicate?" (success, danger, warning, info, primary action, etc.)
- "What interaction pattern fits?" (button, input, alert, card, modal, etc.)
- "What semantic color family matches?" (accent, success, danger, warning, info, etc.)

Result: Beautiful, consistent, accessible UI that's easy to maintain.

## 5-Minute Introduction

### The Philosophy: Semantic Design

```
TRADITIONAL APPROACH
Design mockup → "Make this look like this" → CSS tweaks

DESIGN-DRIVEN APPROACH
User intent → "Communicate this semantically" → Component selection
```

Example: You need to show a success message.

❌ **Traditional**: "Make it green with white text and a checkmark icon"
```tsx
<div className="bg-green-50 border border-green-300 p-4">
  <CheckIcon className="text-green-600" />
  <p className="text-green-900">Success</p>
</div>
```

✅ **Design-Driven**: "Use Alert with success variant"
```tsx
<Alert variant="success" title="Success">
  Your changes have been saved.
</Alert>
```

The component handles all styling, dark mode, accessibility automatically.

### The System: Three Layers

1. **Color Families** (7 types)
   - accent (primary/brand)
   - success (positive)
   - danger (error)
   - warning (caution)
   - info (informational)
   - background (surfaces)
   - foreground (text/borders)

2. **Components** (35+)
   - Button, Input, Card, Alert, Badge, Tabs, Dialog, etc.
   - Each handles its own styling, state, and interactions

3. **Design Tokens** (fixed values)
   - Colors: CSS variables (--family-shade, e.g., `--accent-600`)
   - Spacing: Scale (4, 8, 12, 16, 24, 32, 48, 64px)
   - Typography: Hierarchy (h1-h6, body, caption)

## Getting Started: Three Scenarios

### Scenario 1: "Create a success alert"

**Step 1**: Identify semantic intent → "Success, positive outcome"
**Step 2**: Choose component → "Alert component"
**Step 3**: Apply variant → `variant="success"`
**Step 4**: Done!

```tsx
<Alert variant="success" title="Payment Processed">
  Your payment has been successfully processed.
</Alert>
```

The Alert component handles:
- Green background (--success-50)
- Dark green text (--success-900)
- Green border (--success-300)
- Responsive sizing
- Dark mode adaptation
- Accessibility (ARIA labels)

### Scenario 2: "Create a form with validation"

**Step 1**: Identify the inputs
- Name field → Input (type="text")
- Email field → Input (type="email")
- Agreed checkbox → Checkbox
- Submit button → Button (variant="primary")

**Step 2**: Add error handling
- Show error message when validation fails
- Use danger color for error text (--danger-700)
- Input component shows error border automatically

**Step 3**: Compose together

```tsx
<form className="flex flex-col gap-4">
  <div>
    <Label>Name</Label>
    <Input
      type="text"
      placeholder="Your name"
      error={!!errors.name}
      aria-invalid={!!errors.name}
    />
    {errors.name && (
      <p className="text-sm text-[var(--danger-700)]">{errors.name}</p>
    )}
  </div>

  <div>
    <Label>Email</Label>
    <Input
      type="email"
      placeholder="your@example.com"
      error={!!errors.email}
      aria-invalid={!!errors.email}
    />
    {errors.email && (
      <p className="text-sm text-[var(--danger-700)]">{errors.email}</p>
    )}
  </div>

  <Checkbox label="I agree to the terms" />

  <Button variant="primary" type="submit">
    Submit
  </Button>
</form>
```

### Scenario 3: "Refactor existing component to use UI Lab"

**Before** (arbitrary Tailwind colors):
```tsx
function StatusBadge({ status }) {
  const colors = {
    success: 'bg-green-50 text-green-900',
    danger: 'bg-red-50 text-red-900',
    warning: 'bg-yellow-50 text-yellow-900',
  };

  return (
    <span className={`px-3 py-1 rounded ${colors[status]}`}>
      {status}
    </span>
  );
}
```

**After** (semantic design tokens):
```tsx
function StatusBadge({ status }) {
  return <Badge variant={status}>{status}</Badge>;
}
```

The Badge component handles all styling and respects your theme.

## Key Concepts

### Semantic Color Families

| Family | Communicates | Example |
|--------|--------------|---------|
| **accent** | Primary, brand, important | "Submit" button, main link |
| **success** | Positive, approved, completed | "Payment processed", checkmark |
| **danger** | Error, problem, destructive | "Delete account", error message |
| **warning** | Caution, pending, attention needed | "Deprecation notice", pending state |
| **info** | Information, help, context | "Tip: you can use shortcuts", help text |
| **background** | Surfaces, containers | Page background, card container |
| **foreground** | Text, borders, labels | Body text, input border, label |

### No Arbitrary Colors

**Never use**:
- `bg-blue-600` → Use `bg-[var(--accent-600)]` instead
- `bg-red-500` → Use `bg-[var(--danger-600)]` instead
- `bg-white` → Use `bg-[var(--background-50)]` instead
- `#ffffff` → Use `var(--background-50)` instead

**Why?** Semantic families communicate intent. Arbitrary colors are confusing and inconsistent.

### Component Props Over CSS

**Never use CSS to**:
- Force hover states → Use component API
- Handle dark mode → Components handle automatically
- Override component styling → Use variant prop instead
- Implement interactions → Components provide this

**Always use**:
- Component `variant` prop (primary, secondary, danger, ghost)
- Component `size` prop (sm, md, lg)
- Component `disabled` prop (automatic styling)
- Component `error` prop (for validation)

## Decision Trees

### "What component should I use?"

```
Is it clickable?
├─ Yes → Button
│  ├─ Main action? → variant="primary"
│  ├─ Alternative? → variant="secondary"
│  ├─ Destructive? → variant="danger"
│  └─ Subtle? → variant="ghost"
└─ No → Continue below

Is it a form input?
├─ Single line text → Input (type="text")
├─ Email → Input (type="email")
├─ Password → Input (type="password")
├─ Multiple lines → Textarea
├─ Single choice → Radio
├─ Multiple choices → Checkbox
└─ Many options → Select

Is it a message/feedback?
├─ Success → Alert (variant="success")
├─ Error → Alert (variant="danger")
├─ Warning → Alert (variant="warning")
├─ Info → Alert (variant="info")
└─ Status → Badge

Is it a container?
├─ Grouped content → Card
├─ Modal/overlay → Dialog
├─ Expandable section → Accordion
└─ Tooltip → Tooltip

Is it a layout?
├─ Flexible → Flex
├─ Grid → Grid
├─ Navigation → Tabs or Navigation
└─ Sidebar → Flex + position
```

### "What color should I use?"

```
What's the semantic intent?
├─ Primary action → accent family
├─ Success/confirmed → success family
├─ Error/failed → danger family
├─ Warning/caution → warning family
├─ Information → info family
├─ Background → background family
└─ Text/border → foreground family

What's the context?
├─ Light background needed → Shades 50-300
├─ Medium emphasis → Shades 400-500
├─ Dark background needed → Shades 600-950
├─ Text on light background → Shades 700-950
└─ Text on dark background → Shades 50-100
```

## Common Patterns

Ready-to-use UI patterns in `design/patterns.md`:

1. ✅ Success Alert (Dismissible)
2. ✅ Form Field with Error State
3. ✅ Card with Title & Action
4. ✅ Modal Dialog with Form
5. ✅ Status Badge
6. ✅ Confirmation Dialog (Delete)
7. ✅ Loading State / Skeleton
8. ✅ Tabs with Content Panels
9. ✅ Button Group / Split Button
10. ✅ Empty State

Use these as blueprints for your own UIs.

## Quick Reference

### Design Tokens

**Color CSS Variables**:
- `--accent-50` through `--accent-950` (primary color)
- `--success-50` through `--success-950` (green)
- `--danger-50` through `--danger-950` (red)
- `--warning-50` through `--warning-950` (orange)
- `--info-50` through `--info-950` (blue)
- `--background-50` through `--background-950` (gray)
- `--foreground-50` through `--foreground-950` (gray)

**Spacing Scale** (always use one of these):
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Typography** (hierarchy levels):
- h1 (32px), h2 (24px), h3 (20px), h4 (18px)
- body (16px), small (14px), caption (12px)

### Button Variants

```
variant="primary"   → Main action (blue)
variant="secondary" → Alternative (gray)
variant="danger"    → Destructive (red)
variant="ghost"     → Subtle (transparent)
```

### Alert Variants

```
variant="success"   → Success message (green)
variant="danger"    → Error message (red)
variant="warning"   → Warning message (orange)
variant="info"      → Info message (blue)
```

### Badge Variants

```
variant="default"   → Neutral (gray)
variant="success"   → Success (green)
variant="danger"    → Error (red)
variant="warning"   → Warning (orange)
variant="info"      → Info (blue)
```

## Do's and Don'ts

### ✅ Do This

```tsx
// Use semantic color families
<button className="bg-[var(--accent-600)]">Primary</button>

// Use component variants
<Button variant="primary">Primary</Button>

// Let components handle styling
<Alert variant="success">Success message</Alert>

// Include labels for accessibility
<label>Email</label>
<Input type="email" placeholder="your@example.com" />

// Use semantic spacing from scale
<div className="flex gap-4 p-6">Content</div>

// Trust components for dark mode
<Card title="My Card">Dark mode works automatically</Card>
```

### ❌ Don't Do This

```tsx
// ❌ Arbitrary Tailwind colors
<button className="bg-blue-600">Not semantic</button>

// ❌ CSS to override component behavior
<Button className="hover:bg-blue-700">Redundant</Button>

// ❌ Dark mode utility prefixes
<div className="bg-white dark:bg-black">Not needed</div>

// ❌ Custom spacing values
<div className="p-[13px] gap-[7px]">Off-scale</div>

// ❌ Color alone for meaning
<div className="bg-red-50">Error (no text or icon)</div>

// ❌ Reinventing component behavior
<div
  role="button"
  onClick={handleClick}
  className="cursor-pointer p-2"
>
  Use Button component instead
</div>
```

## Learning Path

1. **Read This File** (5 min)
   - Understand the philosophy and basic concepts

2. **Read `design/guidelines.md`** (10 min)
   - Learn the 6 non-negotiable rules
   - See examples of right vs. wrong

3. **Read `design/tokens.md`** (10 min)
   - Understand color families
   - Learn spacing and typography scales

4. **Read `design/component-selection.md`** (15 min)
   - Use decision trees for component choice
   - Reference quick lookup tables

5. **Study `design/patterns.md`** (20 min)
   - See 10 production-ready examples
   - Understand design rationale for each

6. **Create Your First UI** (30 min)
   - Start with a simple component (success alert)
   - Progress to a form with validation
   - Try refactoring an existing component

## When to Reference What

| Question | Reference |
|----------|-----------|
| "What does this communicate?" | design/guidelines.md (semantic intent) |
| "Which component should I use?" | design/component-selection.md |
| "What color should I use?" | design/tokens.md (color families) |
| "How do I space things?" | design/tokens.md (spacing scale) |
| "Is there a pattern for this?" | design/patterns.md (10 examples) |
| "What are the rules?" | design/guidelines.md (6 core rules) |
| "How do dark mode work?" | design/guidelines.md (Rule 4) |

## Need Help?

- **Confused about colors?** → See design/tokens.md color families section
- **Unsure which component?** → See design/component-selection.md decision tree
- **Want an example?** → See design/patterns.md (10 patterns)
- **Breaking a rule?** → See design/guidelines.md (6 core rules)
- **Want to learn philosophy?** → See design/guidelines.md (core principles)

## Success Indicators

You're using the skill correctly when:

✅ All colors use semantic CSS variables (`--family-shade`)
✅ Component props handle styling, not CSS classes
✅ Every color choice maps to semantic intent
✅ Dark mode works without special code
✅ UI looks consistent and predictable
✅ Code is easier to maintain than before
✅ Accessibility is built-in (no manual ARIA)
✅ Design changes automatically propagate

## Next Steps

1. Review the skill files:
   - `design/guidelines.md` - Philosophy and rules
   - `design/tokens.md` - Token reference
   - `design/patterns.md` - Common patterns
   - `design/component-selection.md` - Component guide

2. Try generating UI with the skill:
   - Start simple ("Create a button")
   - Progress to complex ("Form with validation")
   - Try refactoring ("Improve this component")

3. Reference the skill when uncertain:
   - Component choice? → Use decision tree
   - Color choice? → Use color family guide
   - Pattern exists? → Check patterns.md

Happy building with UI Lab! 🎨
