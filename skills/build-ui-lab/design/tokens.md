# Design Tokens Reference

Complete reference for all design tokens available in UI Lab. Use these values whenever generating UI code.

## Color Families (Semantic)

All colors in UI Lab are organized into semantic families, each with 11 shades ranging from 50 (lightest) to 950 (darkest). Each shade is accessible as a CSS variable: `--{family}-{shade}`.

### accent (Brand/Primary Color)

**Purpose**: Primary actions, links, focus indicators, active states. Communicates "main action" or "this is brand identity."

**Semantic Meaning**: Primary, most important, brand-focused

**CSS Variables**: `--accent-50` through `--accent-950`

**Common Usage**:
- Primary button background: `--accent-600`
- Primary button text: `--foreground-50`
- Primary button hover: `--accent-700`
- Link color: `--accent-600`
- Focus ring: 2px solid `--accent-600`
- Tab indicator (active): `--accent-600`
- Toggle (active): `--accent-600` background

**Shade Ranges**:
- Light (50-300): Subtle accents, backgrounds for hints
- Medium (400-600): Buttons, links, primary actions
- Dark (700-950): Strong CTAs, dark mode, elevated emphasis

**Example**:
```tsx
<Button className="bg-[var(--accent-600)] text-[var(--foreground-50)] hover:bg-[var(--accent-700)]">
  Primary Action
</Button>
```

---

### success (Positive Outcomes)

**Purpose**: Success states, confirmations, approved items, positive feedback. Communicates "good, success, completed."

**Semantic Meaning**: Positive, approved, successful, go ahead

**CSS Variables**: `--success-50` through `--success-950`

**Common Usage**:
- Success alert background: `--success-50`
- Success alert text: `--success-900`
- Success alert border: `--success-300`
- Success button background: `--success-600`
- Success button hover: `--success-700`
- Success badge background: `--success-200`
- Success badge text: `--success-900`
- Checkmark icon: `--success-600`
- Approved state indicator: `--success-500`

**Shade Ranges**:
- Light (50-300): Alert backgrounds, badge backgrounds
- Medium (400-600): Button backgrounds, active states
- Dark (700-950): Text on light backgrounds, dark mode backgrounds

**Example**:
```tsx
<Alert variant="success" title="Payment Confirmed">
  Your payment has been successfully processed.
</Alert>
```

---

### danger (Errors & Destructive)

**Purpose**: Errors, delete buttons, failed states, destructive actions. Communicates "danger, stop, be careful."

**Semantic Meaning**: Error, problem, destructive, delete, failed

**CSS Variables**: `--danger-50` through `--danger-950`

**Common Usage**:
- Error alert background: `--danger-50`
- Error alert text: `--danger-900`
- Error alert border: `--danger-300`
- Delete button background: `--danger-700`
- Delete button hover: `--danger-800`
- Invalid input border: `--danger-500`
- Error message text: `--danger-900`
- Error icon: `--danger-600`
- Destructive action indicator: `--danger-600`

**Shade Ranges**:
- Light (50-300): Alert backgrounds for visibility
- Medium (400-600): Warning indicators, invalid states
- Dark (700-950): Destructive buttons, error states

**Example**:
```tsx
<Button variant="danger" onClick={handleDelete}>
  Delete Account
</Button>

<div className="bg-[var(--danger-50)] border border-[var(--danger-300)] p-4">
  <strong className="text-[var(--danger-900)]">Error:</strong> Unable to process request
</div>
```

---

### warning (Cautions & Pending)

**Purpose**: Warnings, cautions, pending states, important notices. Communicates "caution, attention needed, pending."

**Semantic Meaning**: Warning, caution, pending, attention needed

**CSS Variables**: `--warning-50` through `--warning-950`

**Common Usage**:
- Warning alert background: `--warning-50`
- Warning alert text: `--warning-900`
- Warning alert border: `--warning-300`
- Warning button background: `--warning-600`
- Warning badge background: `--warning-200`
- Pending status indicator: `--warning-500`
- Caution icon: `--warning-600`
- Deprecation notice: `--warning-50` background

**Shade Ranges**:
- Light (50-300): Alert backgrounds, badge backgrounds
- Medium (400-600): Buttons, indicators, emphasis
- Dark (700-950): Text, dark mode backgrounds

**Example**:
```tsx
<Alert variant="warning" title="Deprecation Notice">
  This feature will be removed in version 3.0. Please migrate to the new API.
</Alert>
```

---

### info (Informational)

**Purpose**: Information, help text, neutral metadata, documentation. Communicates "information, help, context."

**Semantic Meaning**: Information, help, neutral, context, tips

**CSS Variables**: `--info-50` through `--info-950`

**Common Usage**:
- Info alert background: `--info-50`
- Info alert text: `--info-900`
- Info alert border: `--info-300`
- Help text color: `--info-600`
- Info icon: `--info-600`
- Informational badge background: `--info-200`
- Hint/tip background: `--info-50`
- Documentation highlight: `--info-100`

**Shade Ranges**:
- Light (50-300): Alert backgrounds, documentation backgrounds
- Medium (400-600): Icons, text, emphasis
- Dark (700-950): Dark mode, text on light backgrounds

**Example**:
```tsx
<div className="bg-[var(--info-50)] border border-[var(--info-300)] rounded p-4">
  <p className="text-[var(--info-900)]">
    💡 Tip: You can use keyboard shortcuts to speed up your workflow.
  </p>
</div>
```

---

### background (Grayscale - Neutral Surfaces)

**Purpose**: Page backgrounds, card backgrounds, containers, elevated surfaces. Communicates "this is a surface or container."

**Semantic Meaning**: Container, surface, neutral, grayscale

**CSS Variables**: `--background-50` through `--background-950`

**Common Usage**:
- Page background (light): `--background-50` or `--background-100`
- Card background: `--background-50` or `--background-100`
- Secondary container: `--background-200`
- Hover state background: `--background-100`
- Disabled button background: `--background-500`
- Dark mode page background: `--background-900` or `--background-950`
- Dark mode card: `--background-800`
- Elevated surface: `--background-700`

**Shade Ranges**:
- Very Light (50-100): Primary backgrounds
- Light (200-300): Secondary surfaces
- Medium (400-500): Disabled states, tertiary containers
- Dark (600-950): Dark mode, elevated surfaces

**Example**:
```tsx
<div className="bg-[var(--background-50)] p-6 rounded">
  <h2 className="text-[var(--foreground-950)]">Card Content</h2>
</div>
```

---

### foreground (Grayscale - Text & Borders)

**Purpose**: Text, icons, borders, dividers, labels. Communicates "foreground element, readable content."

**Semantic Meaning**: Text, icon, border, label, neutral

**CSS Variables**: `--foreground-50` through `--foreground-950`

**Common Usage**:
- Primary text (dark background): `--foreground-950`
- Secondary text (subtle): `--foreground-600` or `--foreground-500`
- Tertiary text (very subtle): `--foreground-400`
- Disabled text: `--foreground-300`
- Border color: `--foreground-200` or `--foreground-300`
- Divider: `--foreground-100`
- Light text on dark background: `--foreground-50`
- Placeholder text: `--foreground-400`
- Icon color: `--foreground-600`
- Label text: `--foreground-700` or `--foreground-900`

**Shade Ranges**:
- Very Light (50-100): Light text on dark, dividers
- Light (200-300): Borders, subtle elements
- Medium (400-600): Icons, secondary text
- Dark (700-950): Primary text, body copy, labels

**Example**:
```tsx
<label className="text-[var(--foreground-900)] font-medium">
  Full Name
</label>
<input
  className="border border-[var(--foreground-300)] text-[var(--foreground-950)] placeholder:text-[var(--foreground-400)]"
  placeholder="Enter your full name"
/>
```

---

## Shade Selection Guide

### Light Backgrounds (50-300)

Use for: Page backgrounds, card backgrounds, alert backgrounds, badge backgrounds

**Rationale**: Light shades create visual hierarchy and separate content from the page

**Common Pairings**:
- `--background-50` page background + `--foreground-900` text
- `--success-50` alert background + `--success-900` text
- `--danger-50` error background + `--danger-900` text

**Examples**:
```tsx
// Page background
<div className="bg-[var(--background-50)]">
  Content
</div>

// Success alert
<div className="bg-[var(--success-100)]">
  <p className="text-[var(--success-900)]">Success!</p>
</div>

// Info badge
<span className="bg-[var(--info-200)] text-[var(--info-900)]">
  New
</span>
```

---

### Medium Backgrounds (400-500)

Use for: Hover states, secondary containers, disabled states, medium emphasis

**Rationale**: Medium shades bridge light and dark, perfect for interactive feedback

**Common Pairings**:
- `--background-500` hover state + `--foreground-50` text
- `--accent-500` active indicator + `--foreground-50` text

**Examples**:
```tsx
// Disabled button
<button disabled className="bg-[var(--background-500)] text-[var(--foreground-400)] cursor-not-allowed">
  Disabled
</button>

// Hover state (if not using component hover)
<div className="bg-[var(--background-100)] hover:bg-[var(--background-200)]">
  Hoverable content
</div>
```

---

### Dark Backgrounds (600-950)

Use for: Dark mode backgrounds, elevated surfaces, strong emphasis, destructive actions

**Rationale**: Dark shades create depth and are necessary for dark mode

**Common Pairings**:
- `--background-900` dark mode background + `--foreground-50` text
- `--danger-700` delete button + `--foreground-50` text
- `--accent-700` hover state + `--foreground-50` text

**Examples**:
```tsx
// Dark mode background
<div className="bg-[var(--background-900)] text-[var(--foreground-50)]">
  Dark mode content
</div>

// Elevated dark card
<div className="bg-[var(--background-800)] text-[var(--foreground-50)]">
  Card on dark background
</div>

// Destructive button
<button className="bg-[var(--danger-700)] text-[var(--foreground-50)] hover:bg-[var(--danger-800)]">
  Delete
</button>
```

---

### Text on Light Backgrounds (700-950)

Use for: Text, labels, strong emphasis on light backgrounds

**Rationale**: Dark shades provide sufficient contrast (WCAG AA minimum 4.5:1)

**Common Pairings**:
- `--background-50` background + `--foreground-950` text
- `--success-50` background + `--success-950` text

**Rule**: Always use 700-950 range for text on light backgrounds to meet accessibility standards

**Examples**:
```tsx
// Body text on light background
<p className="text-[var(--foreground-900)]">
  This is readable body text with good contrast.
</p>

// Label on light background
<label className="text-[var(--foreground-950)] font-semibold">
  Email Address
</label>

// Success text on light success background
<div className="bg-[var(--success-50)]">
  <p className="text-[var(--success-900)]">Success message</p>
</div>
```

---

### Text on Dark Backgrounds (50-100)

Use for: Text on dark backgrounds, light text for readability

**Rationale**: Light shades are necessary for contrast on dark backgrounds

**Common Pairings**:
- `--background-900` background + `--foreground-50` text
- `--accent-700` background + `--foreground-50` text

**Examples**:
```tsx
// Light text on dark background
<div className="bg-[var(--background-900)] text-[var(--foreground-50)]">
  Content with good contrast
</div>

// Primary button (dark background, light text)
<button className="bg-[var(--accent-600)] text-[var(--foreground-50)]">
  Click me
</button>
```

---

## Spacing Scale

Fixed spacing values ensure consistent visual rhythm. Always use these values; never create arbitrary spacing.

### Scale Values

```
4px   → gap-1, p-1, m-1
8px   → gap-2, p-2, m-2
12px  → gap-3, p-3, m-3
16px  → gap-4, p-4, m-4
24px  → gap-6, p-6, m-6
32px  → gap-8, p-8, m-8
48px  → gap-12, p-12, m-12
64px  → gap-16, p-16, m-16
```

### Usage Patterns

**Tight spacing (4-8px)**: Icon + text, inline elements
```tsx
<div className="flex gap-2 items-center">
  <IconComponent />
  <span>Label</span>
</div>
```

**Comfortable spacing (12-16px)**: Form fields, list items, button groups
```tsx
<form className="flex flex-col gap-4">
  <Input label="Name" />
  <Input label="Email" />
  <Button>Submit</Button>
</form>
```

**Generous spacing (24-64px)**: Section separation, major layout divisions
```tsx
<div className="space-y-12">
  <Section title="Introduction" />
  <Section title="Details" />
  <Section title="Conclusion" />
</div>
```

### Never Use Off-Scale Values

```tsx
// ❌ Wrong
<div className="p-5 gap-7 m-13">

// ✓ Correct
<div className="p-4 gap-6 m-12">
```

---

## Typography Scale

Consistent typography creates visual hierarchy and improves readability.

### Hierarchy Levels

```
h1: 2rem (32px), font-weight: 700, line-height: 1.2
  → Page titles, major headings

h2: 1.5rem (24px), font-weight: 700, line-height: 1.3
  → Section titles, modal titles

h3: 1.25rem (20px), font-weight: 600, line-height: 1.4
  → Subsection titles, card titles

h4: 1.125rem (18px), font-weight: 600, line-height: 1.5
  → Minor headings, group labels

body: 1rem (16px), font-weight: 400, line-height: 1.5
  → Body text, main content (default)

small: 0.875rem (14px), font-weight: 400, line-height: 1.5
  → Secondary text, helper text

caption: 0.75rem (12px), font-weight: 500, line-height: 1.6
  → Labels, metadata, timestamps
```

### Usage Examples

```tsx
// Page title
<h1 className="text-2xl font-bold">Welcome to Dashboard</h1>

// Section title
<h2 className="text-xl font-bold">Account Settings</h2>

// Card title
<h3 className="text-lg font-semibold">Profile Information</h3>

// Body text (default)
<p>This is the main content of the article.</p>

// Secondary text
<p className="text-sm text-[var(--foreground-600)]">
  Optional helper text
</p>

// Caption/metadata
<time className="text-xs text-[var(--foreground-500)]">
  Last updated 2 days ago
</time>
```

---

## Motion & Animation

Consistent motion creates smooth, predictable interactions.

### Duration Scale

```
Quick:  150ms  → Micro-interactions, hover effects
Normal: 300ms  → Standard transitions, state changes
Slow:   500ms  → Complex animations, page transitions
```

### Easing Functions

```
ease-out:    → For entrance animations (feels more responsive)
ease-in-out: → For standard transitions
ease-in:     → For exit animations
```

### Common Patterns

**Button hover** (Quick + ease-out):
```css
transition: background-color 150ms ease-out;
```

**Modal entrance** (Normal + ease-out):
```css
animation: slideIn 300ms ease-out;
```

**Dropdown menu** (Quick + ease-out):
```css
transition: opacity 150ms ease-out;
```

---

## Responsive Breakpoints

Mobile-first approach with these breakpoints:

```
mobile:  < 640px  (default, no prefix)
sm:      640px    (tablets)
md:      768px    (small laptops)
lg:      1024px   (laptops)
xl:      1280px   (large screens)
2xl:     1536px   (extra large)
```

### Usage Pattern

```tsx
// Start with mobile, add tablet/desktop overrides
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablets, 3 on large screens */}
</div>
```

---

## Quick Reference Table

| Use Case | Color | Shade | CSS Variable |
|----------|-------|-------|--------------|
| Page background (light) | background | 50 | `--background-50` |
| Page background (dark) | background | 900 | `--background-900` |
| Primary button | accent | 600 | `--accent-600` |
| Button hover | accent | 700 | `--accent-700` |
| Success alert bg | success | 50 | `--success-50` |
| Success alert text | success | 900 | `--success-900` |
| Error alert bg | danger | 50 | `--danger-50` |
| Error alert text | danger | 900 | `--danger-900` |
| Delete button | danger | 700 | `--danger-700` |
| Body text | foreground | 900 | `--foreground-900` |
| Secondary text | foreground | 600 | `--foreground-600` |
| Border | foreground | 300 | `--foreground-300` |
| Disabled button | background | 500 | `--background-500` |
| Badge bg | success/warning/info | 200 | `--success-200` |
| Badge text | success/warning/info | 900 | `--success-900` |

---

## Integration with @mcp

These design tokens are defined in and managed by the @mcp package:

- **Source**: `/packages/@mcp/src/context/design-system-context.ts`
- **Guidelines**: `/packages/@mcp/src/context/design-guidelines.ts`
- **Registry**: `/packages/@mcp/src/generation/registries/design-token-registry.ts`

All values here reference those authoritative sources. When tokens change, this reference will be updated accordingly.
