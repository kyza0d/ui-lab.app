# UI Lab Audit Skill

Build UIs with UI Lab's component library using semantic design intent, compound components, and React Aria patterns.

## Files

| File | Purpose |
|------|---------|
| SKILL.md | Router - intake, routing, principles |
| TOOLS.md | Tool reference and workflows |
| tools.ts | Tool implementations |
| design/ | Source of truth for components, tokens, patterns |

## design/ Folder

```
design/
├── components.md   # Full component registry with APIs
├── tokens.md       # Color families, spacing, typography, radius
├── patterns.md     # UI patterns with code examples
└── guidelines.md   # Design philosophy, rules, accessibility
```

## Core Principles

1. **Semantic Intent** - "What does this communicate?"
2. **Compound Components** - Card.Header, Modal.Footer, Banner.Body
3. **React Aria Patterns** - isDisabled, onPress, isOpen/onOpenChange
4. **Design Tokens** - Semantic color families, not arbitrary colors

## Component Categories

| Category | Components |
|----------|------------|
| Layout | Flex, Grid, Divider, Frame |
| Action | Button, Group |
| Input | Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Label |
| Information | Badge, Banner, Tooltip, Anchor |
| Feedback | Toast, Progress, Confirmation |
| Navigation | Menu, Tabs, Breadcrumbs, Command |
| Container | Card, Modal, Popover, Fold, List |
| Data | Table, Scroll, Gallery |

## Quick Reference

```tsx
// Import
import { Button, Card, Modal, Badge, Flex } from 'ui-lab-components';

// Button variants
<Button variant="primary">Save</Button>
<Button variant="danger" isDisabled>Delete</Button>
<Button icon={{ left: <Icon /> }}>With Icon</Button>

// Card (compound pattern)
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Modal
<Modal isOpen={open} onOpenChange={setOpen} title="Confirm" size="md">
  <Modal.Footer>
    <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </Modal.Footer>
</Modal>

// Banner (compound pattern)
<Banner variant="success">
  <Banner.Title>Success!</Banner.Title>
  <Banner.Body>Your changes have been saved.</Banner.Body>
</Banner>

// Toast
toast.success("Saved!");
toast.error("Failed");

// Layout
<Flex direction="row" gap="md" align="center">...</Flex>
<Grid columns="3" gap="lg">...</Grid>
```

## Color Tokens

| Family | Range | Use For |
|--------|-------|---------|
| foreground | 50-600 | Text (300 body, 100 headings, 500 muted) |
| background | 500-950 | Surfaces (950 page, 900 cards, 700 borders) |
| accent | 50-600 | Primary actions, brand |
| success | 50-600 | Positive outcomes |
| danger | 50-600 | Errors, destructive |
| warning | 50-600 | Cautions |
| info | 50-600 | Information |

## Gap Tokens

```tsx
gap="xs" | "sm" | "md" | "lg" | "xl"
```

## Common Mistakes

```tsx
// Wrong: Arbitrary colors
<div className="bg-zinc-800 text-gray-300">

// Correct: Semantic tokens
<div className="bg-background-900 text-foreground-300">

// Wrong: Card with title prop
<Card title="Settings">

// Correct: Compound pattern
<Card>
  <Card.Header>Settings</Card.Header>
</Card>

// Wrong: Dialog component
<Dialog open={open}>

// Correct: Modal component
<Modal isOpen={open} onOpenChange={setOpen}>

// Wrong: Alert component
<Alert variant="success">

// Correct: Banner component
<Banner variant="success">
```
