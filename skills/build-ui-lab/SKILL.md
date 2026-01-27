---
name: build-ui-lab
description: Build UI with UI Lab's component library using semantic design intent, compound components, and React Aria patterns. Tools query design/ folder for tokens, components, and patterns.
---

<objective>
Build consistent, accessible UI using UI Lab's component library. Start with semantic intent ("what does this communicate?"), use compound component patterns, follow React Aria conventions, and leverage design system constraints.
</objective>

<intake>
What would you like to do?

1. **Generate** - Create a component, layout, or UI section
2. **Refactor** - Transform existing code to use UI Lab components
3. **Review** - Audit code for design system compliance
4. **Learn** - Understand component APIs and patterns

Or describe what you need: "Create a delete confirmation modal", "Build a settings card with form", "Add toast notifications"
</intake>

<routing>

| Intent | Action | Reference Files |
|--------|--------|-----------------|
| Generate | Design-first component creation | `components.md` → `patterns.md` → `tokens.md` |
| Refactor | Transform to semantic design | `components.md` → `guidelines.md` |
| Review | Audit for compliance | `guidelines.md` → `tokens.md` |
| Learn | Explain concepts | `guidelines.md` → `components.md` → `patterns.md` |

</routing>

<core_principles>

**Semantic Intent First**
Every design choice answers "what does this communicate?" Use component variants that express intent:
- `variant="primary"` → main action, proceed
- `variant="danger"` → destructive, be careful
- `variant="success"` → positive outcome

**Compound Components**
UI Lab uses compound component patterns extensively:
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

<Modal isOpen={open} onOpenChange={setOpen}>
  <Modal.Header>...</Modal.Header>
  <Modal.Body>...</Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal>

<Banner variant="success">
  <Banner.Title>Success</Banner.Title>
  <Banner.Body>Message</Banner.Body>
</Banner>
```

**React Aria Conventions**
Components follow React Aria patterns:
- Use `isDisabled` (not `disabled`) for interactive components
- Use `onPress` for button handlers (also supports `onClick`)
- Use `isOpen`/`onOpenChange` for controlled modals

**Component APIs Over CSS Overrides**
Use component props and variants. Don't override with arbitrary Tailwind classes:
```tsx
// Correct
<Button variant="primary" size="lg">Submit</Button>

// Wrong
<Button className="bg-blue-600 hover:bg-blue-700">Submit</Button>
```

**Semantic Color Tokens**
Use design system colors, not arbitrary values:
```tsx
// Correct
<div className="bg-background-900 text-foreground-300">

// Wrong
<div className="bg-zinc-900 text-gray-300">
```

</core_principles>

<component_overview>

### Layout Components
- `Flex` - Flexbox layout with gap, direction, align, justify
- `Grid` - CSS Grid with columns, rows, gap
- `Divider` - Visual separator
- `Frame` - Container frame

### Action Components
- `Button` - Primary actions with variants, icons, sizes
- `Group` - Button grouping (Group.Button)

### Input Components
- `Input` - Text input with prefix/suffix icons, error state
- `Textarea` - Multi-line text
- `Select` - Dropdown selection
- `Checkbox` - Boolean toggle with label
- `Radio` - Single selection from group
- `Switch` - Toggle switch
- `Slider` - Range input
- `Label` - Form field label

### Information Components
- `Badge` - Status indicator (variant, pill, dismissible)
- `Banner` - Full-width notification (Banner.Title, Banner.Body)
- `Tooltip` - Hover tooltip
- `Anchor` - Styled link with preview

### Feedback Components
- `Toast` - Temporary notifications (toast.success, toast.error)
- `Progress` - Progress indicator
- `Confirmation` - Confirmation dialog

### Navigation Components
- `Menu` - Dropdown menu (Menu.Trigger, Menu.Content, Menu.Item)
- `Tabs` - Tab interface (TabsList, TabsTrigger, TabsContent)
- `Breadcrumbs` - Navigation breadcrumbs
- `Command` - Command palette

### Container Components
- `Card` - Content container (Card.Header, Card.Body, Card.Footer)
- `Modal` - Modal dialog (Modal.Header, Modal.Body, Modal.Footer)
- `Popover` - Floating content
- `Fold` - Collapsible section
- `List` - Structured list

### Data Components
- `Table` - Data table
- `Scroll` - Custom scroll container
- `Gallery` - Image gallery

</component_overview>

<design_folder>

**design/ Folder Is Source of Truth**

| File | Contents |
|------|----------|
| `design/components.md` | Full component registry with APIs, props, examples |
| `design/tokens.md` | Color families, typography scales, spacing, radius |
| `design/patterns.md` | Common UI patterns with code examples |
| `design/guidelines.md` | Design philosophy, rules, accessibility |

</design_folder>

<quick_reference>

### Common Patterns

| Need | Solution |
|------|----------|
| Primary button | `<Button variant="primary">` |
| Danger/delete button | `<Button variant="danger">` |
| Card with sections | `<Card><Card.Header>...<Card.Body>...<Card.Footer>...` |
| Modal dialog | `<Modal isOpen={} onOpenChange={}>` |
| Success notification | `<Banner variant="success">` or `toast.success()` |
| Status badge | `<Badge variant="success/danger/warning/info">` |
| Flex layout | `<Flex direction="" gap="" align="">` |
| Grid layout | `<Grid columns="" gap="">` |
| Button group | `<Group><Group.Button>...</Group>` |
| Form input | `<Input type="" error={} />` |
| Tab interface | `<Tabs><TabsList>...<TabsContent>...` |

### Import Pattern
```tsx
import { Button, Card, Modal, Badge } from 'ui-lab-components';
```

### Color Tokens
- `background-500` to `background-950` (surfaces)
- `foreground-50` to `foreground-600` (text/icons)
- `accent-50` to `accent-600` (brand/primary)
- `success/danger/warning/info-50` to `-600` (semantic)

</quick_reference>

<success_criteria>

A successful output will have:
- Components imported from `ui-lab-components`
- Compound component patterns used correctly (Card.Header, Modal.Footer, etc.)
- Color tokens using semantic families (background, foreground, accent, success, danger, warning, info)
- React Aria patterns (isDisabled, onPress, isOpen/onOpenChange)
- No arbitrary color overrides (no bg-blue-600, text-gray-300, etc.)
- Semantic reasoning for design choices

</success_criteria>
