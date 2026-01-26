# Build UI Lab Skill

A comprehensive, design-driven agent skill for building beautiful, consistent UI using UI Lab components with semantic design principles.

## Overview

This skill helps developers build optimized, maintainable UI by:

1. **Starting with semantic intent** - What does this UI communicate?
2. **Choosing components wisely** - Which component fits this pattern?
3. **Using design tokens** - Apply colors, spacing, typography from the system
4. **Leveraging component APIs** - Master props and variants, not CSS hacks

Result: Consistent, accessible, maintainable UI that evolves with your design system.

## File Structure

```
build-ui-lab/
├── README.md                          # This file
├── QUICKSTART.md                      # 5-minute introduction
├── SKILL.md                           # Skill router (user entry point)
└── design/
    ├── guidelines.md                  # Design philosophy & rules
    ├── tokens.md                      # Color, spacing, typography reference
    ├── patterns.md                    # 10 common UI patterns
    └── component-selection.md         # Component decision guide

PLANNED (not yet created):
├── workflows/
│   ├── generate-component.md          # Step-by-step generation guide
│   ├── refactor-to-ui-lab.md         # Migration from custom components
│   ├── review-design-consistency.md  # Design audit workflow
│   └── learn-design-system.md        # Educational workflow
├── references/
│   ├── component-apis.md             # Component API documentation
│   ├── color-family-guide.md         # Deep dive on color semantics
│   ├── spacing-typography.md         # Typography and spacing scales
│   ├── dark-mode-patterns.md         # Dark mode implementation
│   └── accessibility-checklist.md    # A11y verification
├── templates/
│   ├── component-template.tsx        # Component generation template
│   ├── layout-template.tsx           # Layout composition template
│   └── pattern-template.tsx          # Pattern implementation template
└── scripts/
    ├── validate-design.ts            # Design compliance validation
    └── component-mapper.ts           # Component recommendation engine
```

## Quick Start

### 1. New to the Skill?

Start here: **[QUICKSTART.md](./QUICKSTART.md)** (5 minutes)

Learn the core philosophy in 5 minutes with practical examples.

### 2. Building UI?

Check these in order:
1. **[design/component-selection.md](./design/component-selection.md)** - What component?
2. **[design/tokens.md](./design/tokens.md)** - What colors and spacing?
3. **[design/patterns.md](./design/patterns.md)** - Is there a pattern?
4. **[design/guidelines.md](./design/guidelines.md)** - Follow the rules

### 3. Learning Philosophy?

Read in order:
1. **[design/guidelines.md](./design/guidelines.md)** - Core principles
2. **[QUICKSTART.md](./QUICKSTART.md)** - Practical intro
3. **[design/patterns.md](./design/patterns.md)** - See examples

### 4. Extending the Skill?

Read: **[../SKILL_DESIGN.md](../SKILL_DESIGN.md)** (comprehensive architecture)

## Core Concepts

### Semantic Design Intent

Every UI decision starts with "What does this communicate?"

- Red button → "Danger" (not arbitrary red)
- Green checkmark → "Success" (not arbitrary green)
- Gray background → "Secondary" (not arbitrary gray)

This semantic meaning is encoded in the color family and component variant.

### Color Families (7 Semantic)

| Family | Communicates | Example |
|--------|--------------|---------|
| **accent** | Primary, brand | "Submit" button |
| **success** | Positive, approved | Success message |
| **danger** | Error, destructive | Delete button |
| **warning** | Caution, pending | Warning message |
| **info** | Information, help | Help text |
| **background** | Surfaces | Page background |
| **foreground** | Text, borders | Body text |

Each family has 11 shades (50-950) as CSS variables: `--family-shade`

### Component Mastery

Master UI Lab components' props and variants instead of working around them with CSS:

```tsx
// ✅ Right: Let component handle styling
<Alert variant="success" title="Success">
  Your changes have been saved.
</Alert>

// ❌ Wrong: Custom CSS to override component
<div className="bg-green-50 border border-green-300 p-4 rounded">
  <p className="text-green-900">Your changes have been saved.</p>
</div>
```

The component handles styling, dark mode, accessibility, responsive sizing, and interactions automatically.

### Design Tokens as Constraints

System consistency comes from constraints, not hope:

- **Colors**: 7 families × 11 shades each (not infinite)
- **Spacing**: 8 fixed values (not arbitrary)
- **Typography**: 7 hierarchy levels (not random)

Changes to tokens automatically propagate everywhere.

## Key Files

### Design Foundation Files

#### [SKILL.md](./SKILL.md)
The skill router that guides users to the right workflow based on their request.

**Contains**:
- Skill name and description
- Essential principles (embedded)
- Intake questions
- Routing logic
- Reference index

#### [design/guidelines.md](./design/guidelines.md)
Core design philosophy and non-negotiable rules.

**Contains**:
- Design philosophy (semantic intent, component mastery, tokens, system)
- 6 non-negotiable rules with examples
- Common misconceptions and corrections
- When design conflicts with system
- Quick reference tables (right vs. wrong)

**Key Takeaway**: Design system enforces consistency through constraints and semantic meaning.

#### [design/tokens.md](./design/tokens.md)
Complete reference for all design tokens in the system.

**Contains**:
- 7 semantic color families with detailed guidance
- 11 shade ranges per color (50-950)
- Shade selection rules (light, medium, dark backgrounds)
- Text color guidance (dark text on light, light text on dark)
- Spacing scale (8 fixed values)
- Typography hierarchy (h1-h6, body, caption)
- Motion/animation guidelines
- Quick reference table

**Key Takeaway**: When you need a color, consult this file.

#### [design/patterns.md](./design/patterns.md)
10 production-ready UI patterns with complete code examples.

**Contains**:
1. Success Alert (Dismissible)
2. Form Field with Error State
3. Card with Title & Action
4. Modal Dialog with Form
5. Status Badge (Inline)
6. Confirmation Dialog (Delete)
7. Loading State / Skeleton
8. Tabs with Content Panels
9. Button Group / Split Button
10. Empty State

For each pattern:
- When to use it (semantic intent)
- Component composition
- Design rationale
- Complete code example
- Usage examples

**Key Takeaway**: Use these as blueprints for your own UIs.

#### [design/component-selection.md](./design/component-selection.md)
Systematic decision-making for choosing the right component.

**Contains**:
- Decision tree flowchart ("What should I use?")
- Component quick reference table
- Detailed sections for major components
- Button variants (primary, secondary, danger, ghost)
- Alert variants (success, danger, warning, info)
- Badge variants
- Form components (Input, Select, Checkbox, Radio, etc.)
- Container components (Card, Dialog, Accordion, etc.)
- Layout components (Flex, Grid, Stack, etc.)
- Navigation components (Tabs, Menu, Navigation, etc.)
- Common mistakes to avoid
- Selection flowcharts for specific contexts

**Key Takeaway**: When uncertain about a component, use the decision tree.

### Educational Files

#### [QUICKSTART.md](./QUICKSTART.md)
5-minute introduction to the skill and its philosophy.

**Best for**: New users, quick reference, examples

**Contains**:
- What is this skill?
- 5-minute introduction
- Three practical scenarios
- Key concepts
- Decision trees
- Quick reference
- Do's and don'ts
- Learning path

**Key Takeaway**: Get productive with the skill in 5 minutes.

## Design System Integration

This skill is designed to work with the existing `@mcp` design system package:

| @mcp Resource | Used In Skill For |
|--------------|-------------------|
| design-system-context.ts | Authoritative design philosophy (referenced in guidelines) |
| design-guidelines.ts | Enforced rules and validation |
| agent-design-guide.ts | Reference tables and best practices |
| component-props-registry.ts | Component API validation and recommendations |
| component-mapper.ts | Component recommendation engine |

The skill references these resources without duplicating content. When @mcp resources update, the skill automatically uses new values.

## How Claude Uses This Skill

1. **User invokes skill**: `/build-ui-lab` or natural language request
2. **SKILL.md intake**: User describes what they want to build
3. **Route to workflow**: Skill determines if this is generate, refactor, review, or learn
4. **Load references**: Workflow loads relevant design files
5. **Claude implements**: Follows workflow using design guidance
6. **Output**: Code with design rationale

## Common Use Cases

### "Create a success alert"
```
1. Read: component-selection.md (feedback components section)
2. Choose: Alert with variant="success"
3. Reference: design/patterns.md (Pattern 1: Success Alert)
4. Output: Complete code with reasoning
```

### "Refactor this component to use UI Lab"
```
1. Analyze: Current code and styling
2. Identify: What semantic intent does this communicate?
3. Map: To UI Lab component
4. Transform: Arbitrary colors → semantic tokens
5. Output: Refactored code with migration notes
```

### "Build a form with validation"
```
1. Plan: Input fields, validation, error handling
2. Choose: Input components (type matches data type)
3. Add: Error styling and messages (danger color)
4. Compose: Form layout with consistent spacing
5. Output: Complete form with design reasoning
```

## Rules to Remember

### Rule 1: Always Use Semantic Color Families
```tsx
// ✅ Correct
<button className="bg-[var(--accent-600)]">Action</button>

// ❌ Never
<button className="bg-blue-600">Action</button>
```

### Rule 2: All Colors Are CSS Variables
```tsx
// ✅ Correct
<div className="bg-[var(--danger-50)]">Error</div>

// ❌ Never
<div className="bg-red-50">Error</div>
```

### Rule 3: Components Handle State Via Props
```tsx
// ✅ Correct
<Button variant="primary" disabled>Submit</Button>

// ❌ Never
<Button className="opacity-50 cursor-not-allowed">Submit</Button>
```

### Rule 4: Dark Mode Handled Automatically
```tsx
// ✅ Correct
<Card title="My Card">Automatically adapts to dark mode</Card>

// ❌ Never
<div className="bg-white dark:bg-black">Manual dark mode</div>
```

### Rule 5: Spacing From Fixed Scale
```tsx
// ✅ Correct
<div className="flex gap-4 p-6">Content</div>

// ❌ Never
<div className="flex gap-7 p-5">Content</div>
```

### Rule 6: Every Decision Includes Semantic Reasoning
All design decisions should be traceable to semantic intent and design system guidelines.

## What's Ready

✅ SKILL.md (router pattern skill)
✅ design/guidelines.md (philosophy and rules)
✅ design/tokens.md (color, spacing, typography)
✅ design/patterns.md (10 production-ready patterns)
✅ design/component-selection.md (component decision guide)
✅ QUICKSTART.md (5-minute intro)
✅ README.md (this file)

## What's Next

The architecture specification in `/SKILL_DESIGN.md` outlines:

1. **Workflows** to implement (generate, refactor, review, learn)
2. **References** to create (component APIs, color guide, a11y, etc.)
3. **Templates** for code generation
4. **Scripts** for validation

See `/SKILL_DESIGN.md` for complete implementation roadmap.

## Support & Learning

### Quick Questions?
- **Colors**: See `design/tokens.md`
- **Components**: See `design/component-selection.md`
- **Rules**: See `design/guidelines.md`
- **Examples**: See `design/patterns.md`
- **Philosophy**: See `design/guidelines.md` or `QUICKSTART.md`

### Want to Learn More?
1. Start with `QUICKSTART.md` (5 min)
2. Read `design/guidelines.md` (design philosophy)
3. Study `design/tokens.md` (available tokens)
4. Review `design/patterns.md` (common compositions)
5. Use `design/component-selection.md` (when building)

### Extending the Skill?
Read `/SKILL_DESIGN.md` (complete architecture and implementation guide)

## Success Indicators

You're using this skill correctly when:

✅ All colors use semantic CSS variables
✅ Component props handle styling
✅ Dark mode works without special code
✅ UI looks consistent across application
✅ Design changes propagate automatically
✅ Code is easier to maintain
✅ New developers understand patterns quickly
✅ Accessibility is built-in

## Related Resources

- **@mcp package**: Design system implementation
- **UI Lab components**: 35+ production components
- **SKILL_DESIGN.md**: Complete architecture specification
- **design/patterns.md**: 10 common UI patterns
- **design/guidelines.md**: Core design principles

## License

Part of the UI Lab project. See project root for license information.

---

## Navigation

| Want to... | Go to... |
|-----------|----------|
| Get started (5 min) | [QUICKSTART.md](./QUICKSTART.md) |
| Understand philosophy | [design/guidelines.md](./design/guidelines.md) |
| Find design tokens | [design/tokens.md](./design/tokens.md) |
| See UI patterns | [design/patterns.md](./design/patterns.md) |
| Choose component | [design/component-selection.md](./design/component-selection.md) |
| Understand skill architecture | [../SKILL_DESIGN.md](../SKILL_DESIGN.md) |
| Extend the skill | [../SKILL_DESIGN.md](../SKILL_DESIGN.md) |

---

Happy building with UI Lab! 🎨
