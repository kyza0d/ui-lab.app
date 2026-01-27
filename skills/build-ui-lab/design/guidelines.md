# UI Lab Design Guidelines

## Architecture Overview

UI Lab is built on a modern stack with specific architectural patterns:

### Technology Stack

- **React 18+** with Server Components support
- **React Aria** for accessibility hooks and interactions
- **CSS Modules** for component styling (`.module.css` files)
- **Tailwind CSS 4** with `@theme` for design tokens
- **TypeScript** for type safety

### Import Patterns

```tsx
// Component imports
import { Button, Card, Modal } from 'ui-lab-components';

// Type imports
import type { ButtonProps, CardProps } from 'ui-lab-components';

// Theme utilities
import { ThemeProvider, useTheme } from 'ui-lab-components';

// Toast imperative API
import { toast, Toaster } from 'ui-lab-components';
```

---

## Design Philosophy

### 1. Semantic Intent Over Appearance

Every design decision answers: **"What does this communicate to the user?"**

| Visual Choice | Semantic Meaning |
|---------------|------------------|
| Accent color button | Primary action, proceed |
| Danger color button | Destructive, be careful |
| Success banner | Positive outcome confirmed |
| Warning badge | Attention needed |

**Code reflects intent:**
```tsx
// Intent is clear from variant choice
<Button variant="primary">Save Changes</Button>
<Button variant="danger">Delete Account</Button>
<Banner variant="success">Payment processed</Banner>
```

### 2. Component APIs Over CSS Overrides

Components handle styling through **props and variants**, not CSS classes:

```tsx
// Correct: Use component variants
<Button variant="primary" size="lg">Submit</Button>
<Badge variant="success">Active</Badge>
<Banner variant="warning">Check your input</Banner>

// Avoid: CSS overrides for behavior
<button className="bg-blue-600 hover:bg-blue-700">Submit</button>
```

**Why?** Components encapsulate:
- Hover/active/focus states
- Accessibility attributes
- Dark mode adaptation
- Consistent spacing
- Animation behaviors

### 3. Compound Components for Complex UI

Many UI Lab components use the **compound component pattern**:

```tsx
// Card with compound children
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Modal with compound children
<Modal isOpen={open} onOpenChange={setOpen}>
  <Modal.Header>Confirm</Modal.Header>
  <Modal.Body>Are you sure?</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </Modal.Footer>
</Modal>

// Banner with compound children
<Banner variant="info">
  <Banner.Title>Note</Banner.Title>
  <Banner.Body>Additional information here.</Banner.Body>
</Banner>
```

### 4. Design Tokens as Constraints

Colors, spacing, and typography use **constrained scales**:

**Colors:** 7 semantic families with defined shade ranges
**Spacing:** Semantic gap tokens (`xs`, `sm`, `md`, `lg`, `xl`)
**Typography:** Dual header/body scales with clamp sizing

These constraints ensure:
- Visual consistency across the application
- Easy theming via CSS variable updates
- Accessibility compliance (WCAG contrast)
- Maintainable, predictable styling

---

## Core Rules

### Rule 1: Use Semantic Color Families

Map UI intent to color families:

| Intent | Family | Example |
|--------|--------|---------|
| Primary action | `accent` | Primary buttons, links |
| Success/positive | `success` | Success messages, valid states |
| Error/destructive | `danger` | Errors, delete buttons |
| Warning/caution | `warning` | Warnings, pending states |
| Informational | `info` | Help text, notices |
| Surfaces | `background` | Page, cards, containers |
| Text/borders | `foreground` | Body text, headings, borders |

```tsx
// Component variants map to semantic colors automatically
<Button variant="primary">    // Uses accent family
<Button variant="danger">     // Uses danger family
<Badge variant="success">     // Uses success family
<Banner variant="warning">    // Uses warning family
```

### Rule 2: Use CSS Variables for Custom Colors

When styling outside components, use design token variables:

```tsx
// Tailwind utilities (preferred)
<div className="bg-background-900 text-foreground-300 border-background-700">

// Arbitrary values with CSS variables
<div className="bg-[var(--background-900)] text-[var(--foreground-300)]">

// In CSS Modules
.customElement {
  background: var(--background-900);
  color: var(--foreground-300);
  border-color: var(--background-700);
}
```

**Never use:**
```tsx
// Arbitrary Tailwind colors
<div className="bg-blue-600 text-white">  // Wrong

// Hex colors
<div style={{ color: '#ffffff' }}>  // Wrong

// Non-semantic gray scales
<div className="bg-zinc-800">  // Wrong
```

### Rule 3: Components Handle Interaction States

Components manage hover, active, disabled, and focus states internally:

```tsx
// Correct: Let Button handle hover
<Button variant="primary">Click me</Button>

// Wrong: Adding hover classes
<Button variant="primary" className="hover:bg-accent-700">
  Click me
</Button>
```

### Rule 4: Use Layout Components

For layout, use `Flex` and `Grid` components with semantic gap tokens:

```tsx
// Flex layout
<Flex direction="row" gap="md" align="center" justify="space-between">
  <div>Left</div>
  <div>Right</div>
</Flex>

// Grid layout
<Grid columns="3" gap="lg">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>
```

### Rule 5: Follow React Aria Patterns

UI Lab uses React Aria for accessibility. Key patterns:

```tsx
// Use isDisabled (not disabled) for React Aria components
<Button isDisabled>Disabled</Button>

// Use onPress (not onClick) when available
<Button onPress={() => handleAction()}>Click</Button>

// Components handle focus management automatically
<Modal isOpen={open} onOpenChange={setOpen}>
  {/* Focus is trapped and managed */}
</Modal>
```

### Rule 6: Prefer Compound Components

For complex UI, use compound patterns over prop drilling:

```tsx
// Preferred: Compound components
<Card>
  <Card.Header>
    <h3>Title</h3>
    <Badge>Status</Badge>
  </Card.Header>
  <Card.Body>Content</Card.Body>
</Card>

// Avoid: Trying to pass everything as props
<Card
  title="Title"
  headerExtra={<Badge>Status</Badge>}
  content="Content"
/>
```

---

## Component-Specific Guidelines

### Buttons

```tsx
// Primary actions (main CTAs)
<Button variant="primary">Save</Button>

// Secondary actions
<Button variant="secondary">Edit</Button>
<Button variant="outline">Details</Button>

// Dangerous/destructive actions
<Button variant="danger">Delete</Button>

// Low-emphasis actions
<Button variant="ghost">Cancel</Button>

// With icons
<Button icon={{ left: <SaveIcon /> }}>Save</Button>
<Button icon={{ right: <ArrowIcon /> }}>Next</Button>

// Disabled state
<Button isDisabled>Unavailable</Button>
```

### Cards

```tsx
<Card>
  <Card.Header className="flex items-center justify-between">
    <h3 className="font-semibold text-foreground-100">Title</h3>
    <Badge variant="success">Active</Badge>
  </Card.Header>
  <Card.Body className="space-y-3">
    <p className="text-foreground-300">Description text.</p>
  </Card.Body>
  <Card.Footer className="border-t border-background-700 pt-4">
    <Group>
      <Group.Button variant="ghost">Cancel</Group.Button>
      <Group.Button variant="primary">Save</Group.Button>
    </Group>
  </Card.Footer>
</Card>
```

### Modals

```tsx
<Modal
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Confirm Action"
  size="md"
  isDismissable
>
  <p className="text-foreground-300">
    Are you sure you want to proceed?
  </p>
  <Modal.Footer>
    <Flex gap="sm" justify="flex-end">
      <Button variant="ghost" onPress={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onPress={handleConfirm}>
        Confirm
      </Button>
    </Flex>
  </Modal.Footer>
</Modal>
```

### Forms

```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="you@example.com"
      error={!!errors.email}
    />
    {errors.email && (
      <p className="text-sm text-danger-500">{errors.email}</p>
    )}
  </div>

  <div className="space-y-2">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" placeholder="Your message..." />
  </div>

  <Checkbox
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    label="I agree to the terms"
  />

  <Button variant="primary" type="submit">Submit</Button>
</form>
```

### Notifications

```tsx
// Banners for persistent messages
<Banner variant="success" isDismissible>
  <Banner.Title>Success!</Banner.Title>
  <Banner.Body>Your changes have been saved.</Banner.Body>
</Banner>

// Toasts for temporary notifications
// First: Add Toaster to layout
<Toaster />

// Then: Trigger toasts imperatively
toast.success("Saved successfully");
toast.error("Failed to save");
toast.warning("Please review your input");
toast.info("New update available");
```

---

## Accessibility

UI Lab components are built with accessibility in mind via React Aria:

### Keyboard Navigation
- All interactive components support keyboard navigation
- Focus indicators are visible and consistent
- Tab order follows logical reading order

### Screen Readers
- Components use semantic HTML elements
- ARIA attributes are applied automatically
- Labels and descriptions are properly associated

### Focus Management
- Modals trap focus when open
- Focus returns to trigger when modal closes
- Skip links and landmarks are supported

### Color Contrast
- All color combinations meet WCAG AA standards
- Don't rely on color alone for meaning
- Use icons alongside color indicators

---

## Common Mistakes to Avoid

### 1. Overriding Component Styles

```tsx
// Wrong: CSS overrides
<Button className="bg-blue-600 hover:bg-blue-700">Save</Button>

// Correct: Use variants
<Button variant="primary">Save</Button>
```

### 2. Using Non-Semantic Colors

```tsx
// Wrong: Arbitrary colors
<div className="bg-zinc-800 text-gray-300">

// Correct: Semantic tokens
<div className="bg-background-800 text-foreground-300">
```

### 3. Ignoring Compound Patterns

```tsx
// Wrong: Plain divs for structure
<div className="card">
  <div className="header">Title</div>
  <div className="body">Content</div>
</div>

// Correct: Compound components
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### 4. Manual Hover States

```tsx
// Wrong: Manual hover handling
<button
  className={`${isHovered ? 'bg-accent-700' : 'bg-accent-600'}`}
  onMouseEnter={() => setIsHovered(true)}
>

// Correct: Let component handle it
<Button variant="primary">Click</Button>
```

### 5. Using `disabled` Instead of `isDisabled`

```tsx
// Check component API - some use isDisabled (React Aria pattern)
<Button isDisabled>Disabled</Button>

// Standard HTML elements still use disabled
<input disabled />
```

---

## Quick Reference

| Task | Solution |
|------|----------|
| Primary button | `<Button variant="primary">` |
| Danger button | `<Button variant="danger">` |
| Card with sections | `<Card><Card.Header>...<Card.Body>...<Card.Footer>...` |
| Modal dialog | `<Modal isOpen={} onOpenChange={}>` |
| Success message | `<Banner variant="success">` |
| Status badge | `<Badge variant="success/danger/warning/info">` |
| Toast notification | `toast.success()` / `toast.error()` |
| Flex layout | `<Flex direction="" gap="" align="" justify="">` |
| Grid layout | `<Grid columns="" gap="">` |
| Button group | `<Group><Group.Button>...</Group>` |
| Form input | `<Input type="" error={} />` |
| Tab interface | `<Tabs><TabsList>...<TabsContent>...` |
