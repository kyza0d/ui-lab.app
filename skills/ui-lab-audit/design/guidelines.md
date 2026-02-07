# UI Lab Design Guidelines

## Stack & Core Principles

**Tech:** React 18+ | React Aria | CSS Modules | Tailwind 4 | TypeScript

**Three core rules:**
1. **Semantic variants over CSS overrides** – Components handle appearance via props/variants
2. **Compound components for complex UI** – Use `Card.Header`, `Modal.Body`, etc.
3. **CSS variables for custom styling** – Always use `--background-900`, `--foreground-300`, never arbitrary colors or hex

---

## Semantic Colors

Map UI intent to color families. Component variants auto-apply correct colors:

| Intent | Family | Example |
|--------|--------|---------|
| Primary action | `accent` | `<Button variant="primary">` |
| Success | `success` | `<Badge variant="success">` |
| Error | `danger` | `<Button variant="danger">` |
| Warning | `warning` | `<Banner variant="warning">` |
| Info | `info` | Notices, help text |
| Surfaces | `background` | Pages, cards, containers |
| Text/borders | `foreground` | Headings, body text |

**Styling custom elements:**
```tsx
// Tailwind (preferred)
<div className="bg-background-900 text-foreground-300">

// CSS Modules
.element { background: var(--background-900); color: var(--foreground-300); }

// Never: <div className="bg-blue-600 dark:bg-zinc-900"> ← WRONG
```

---

## Layout & Interaction

**Use `Flex` and `Grid` for layout** with semantic gaps (`xs`, `sm`, `md`, `lg`, `xl`):
```tsx
<Flex gap="md" align="center">
<Grid columns={{ sm: "1", md: "2", lg: "3" }} gap="lg">
```

**React Aria patterns:**
- `isDisabled` (not `disabled`) for components
- `onPress` (not `onClick`) when available
- Components auto-manage focus/hover/active states—don't override

**Never use dark mode prefixes:** `--background-900` is pre-computed for current theme. No `dark:` needed.

---

## Component Patterns

**Compound components are preferred:**
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

<Modal isOpen={open} onOpenChange={setOpen}>
  <Modal.Header>Confirm?</Modal.Header>
  <Modal.Body>Are you sure?</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </Modal.Footer>
</Modal>
```

**Common component variants:**
```tsx
<Button variant="primary" />       // Main action
<Button variant="secondary" />     // Secondary action
<Button variant="danger" />        // Destructive
<Button variant="ghost" />         // Low emphasis
<Button variant="outline" />       // Alternative

<Banner variant="success|warning|danger|info" isDismissible>
  <Banner.Title>Title</Banner.Title>
  <Banner.Body>Message</Banner.Body>
</Banner>

<Toaster />
toast.success("Message")
toast.error("Message")
```

---

## Accessibility

React Aria handles:
- Keyboard navigation & focus management
- Semantic HTML + ARIA attributes
- Focus trapping in modals
- Color contrast (WCAG AA)

Use semantic components and trust the pattern—don't override state handling.

---

## Quick Reference: What NOT to Do

| ❌ Wrong | ✅ Right |
|----------|----------|
| `<Button className="bg-blue-600">` | `<Button variant="primary">` |
| `<div className="bg-zinc-800">` | `<div className="bg-background-800">` |
| `<div className="bg-white dark:bg-black">` | `<div className="bg-background-100">` |
| Plain `<div>` for structure | `<Card><Card.Header>...</Card.Header>` |
| `<button disabled>` (for components) | `<Button isDisabled>` |
| Manual hover/state logic | Let component handle it |
| `<Button onClick={...}>` | `<Button onPress={...}>` (when available)
