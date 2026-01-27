# Component Registry

Minimal index of UI Lab components. Use `getComponentApi(name)` for detailed props and examples.

## Components by Category
### Interactive
- **button** - Actions, submissions, CTAs

### Form
- **input** - Text entry (text, email, password, number)
- **textarea** - Multi-line text
- **select** - Single choice from many options
- **checkbox** - Boolean toggle or multiple selection
- **radio** - Single choice from few options

### Container
- **card** - Content grouping, surfaces
- **dialog** - Modal overlays

### Feedback
- **alert** - Messages, notifications (success, danger, warning, info)

### Status
- **badge** - Inline status indicators

### Navigation
- **tabs** - Section switching

## Usage

```typescript
// List all components
getAvailableComponents()

// Get detailed API for a component
getComponentApi("button")
// Returns: props, variants, examples, use cases

// Search by keyword
searchComponents("form")

// Get recommendation
suggestComponents("delete confirmation")
```

## Component Selection

| Intent | Component | Variant |
|--------|-----------|---------|
| Primary action | button | primary |
| Destructive action | button | danger |
| Success message | alert | success |
| Error message | alert | danger |
| Status indicator | badge | (matches status) |
| Text input | input | type="text" |
| Modal | dialog | - |
