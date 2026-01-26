# UI Lab Design-Driven Agent Skill Architecture

## Executive Summary

This document outlines the complete architecture for a design-driven agent skill that generates optimized, consistent UI using the UI Lab component library with semantic design principles. The skill emphasizes design-first thinking, component mastery, and design token literacy over arbitrary styling.

---

## Part 1: Skill Architecture

### Recommended Structure

```
build-ui-lab/
├── SKILL.md                          # Router pattern skill with intake & routing
├── design/
│   ├── guidelines.md                 # Core design principles & philosophy
│   ├── tokens.md                     # Design tokens reference (colors, spacing, typography, motion)
│   ├── patterns.md                   # Common UI patterns & best practices
│   └── component-selection.md        # Decision matrix for component recommendations
├── workflows/
│   ├── generate-component.md         # Generate a single component or UI section
│   ├── refactor-to-ui-lab.md        # Migrate existing code to UI Lab
│   ├── review-design-consistency.md # Audit UI for design consistency
│   └── compose-layout.md             # Compose multi-component layouts
├── references/
│   ├── component-apis.md             # UI Lab component API reference
│   ├── color-family-guide.md        # Detailed color family semantics
│   ├── spacing-typography.md         # Spacing & typography scales
│   ├── dark-mode-patterns.md        # Dark mode implementation patterns
│   └── accessibility-checklist.md    # A11y requirements & validation
├── templates/
│   ├── component-template.tsx        # Component generation template
│   ├── layout-template.tsx           # Layout composition template
│   └── pattern-template.tsx          # Pattern implementation template
└── scripts/
    ├── validate-design.ts            # Validation script for design compliance
    └── component-mapper.ts           # Component recommendation engine
```

### Why This Structure

1. **SKILL.md as Router** - Routes user intent to appropriate workflows based on their request
2. **design/** - Foundational knowledge that all workflows reference (DRY principle)
3. **workflows/** - Step-by-step procedures that guide Claude through complex tasks
4. **references/** - Detailed domain knowledge referenced by workflows (not loaded by default)
5. **templates/** - Reusable output structures copied and filled by Claude
6. **scripts/** - Executable utilities Claude runs to validate or transform code

---

## Part 2: Core Philosophy

### Design-First Principles

**1. Semantic Intent Over Visual Appearance**
- Every UI decision starts with "What does this communicate to users?"
- Colors map to semantic families (accent, success, danger, warning, info, background, foreground)
- Components are chosen based on interaction patterns, not visual similarity

**2. Component Mastery Over Styling Tweaks**
- Master UI Lab components' props, variants, and composition patterns
- Never apply CSS classes to force behavior a component prop should handle
- Trust component APIs for state management, interactions, dark mode
- Layout with composition, not utility classes

**3. Design Tokens as Constraints**
- All colors use semantic CSS variables (`--family-shade`)
- Spacing follows consistent scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- Typography uses established scale and hierarchy
- Motion uses consistent easing and duration
- These aren't suggestions—they're constraints that ensure consistency

**4. Design System as Source of Truth**
- When uncertain, consult design guidelines rather than inventing solutions
- Design tokens in code (`design-system-context.ts`, `design-guidelines.ts`, `agent-design-guide.ts`) are authoritative
- Component APIs in registry (`component-props-registry.ts`) define what's possible
- Never work around system limitations—elevate concerns

### How This Differs from Generic UI Generation

| Aspect | Traditional Approach | Design-Driven Approach |
|--------|---------------------|----------------------|
| Starting Point | "What should this look like?" | "What should this communicate?" |
| Color Selection | Pick arbitrary colors, test contrast later | Map to semantic family, contrast verified |
| Component Choice | Visual similarity | Interaction pattern match |
| Customization | CSS classes & style props | Component props & variants |
| Dark Mode | Special dark: prefixes | Components handle automatically |
| Consistency | Hope developers follow examples | System enforces through tokens |
| Change Impact | Ripple effects across codebase | Single source of truth updates |

---

## Part 3: Integration with Existing @mcp System

### Existing Resources

Your `@mcp` package already provides:

```typescript
// Design System Context (authoritative design philosophy)
@mcp/src/context/design-system-context.ts
  - getDesignSystemContext() → Complete OKLCH philosophy

// Design Guidelines (concise, enforceable rules)
@mcp/src/context/design-guidelines.ts
  - DESIGN_GUIDELINES object → Color families, shade ranges, rules
  - formatDesignGuidelines() → Human-readable guidelines

// Agent Design Guide (structured reference tables)
@mcp/src/context/agent-design-guide.ts
  - getColorFamilyReference() → Color family quick reference
  - getShadeSelectionGuide() → Shade selection rules
  - getCommonPatterns() → Pre-made color patterns
  - getCodeExamples() → Correct/incorrect examples
  - getAccessibilityChecklist() → A11y validation
  - getMistakesToAvoid() → Common errors & fixes

// Component Registry (authoritative component APIs)
@mcp/src/generation/registries/component-props-registry.ts
  - COMPONENT_PROPS_REGISTRY → Props, variants, children support
  - getComponentRegistry(id) → Component API metadata
  - isPropValid() / isPropRequired() → Prop validation

// Component Mapper (recommendation engine)
@mcp/src/agent/component-mapper.ts
  - Maps custom components to UI Lab alternatives
  - Calculates confidence scores
  - Suggests props mappings
```

### How Skill Leverages @mcp

```yaml
Workflow: "generate-component"
  1. Load SKILL.md → User provides UI request
  2. Read references/component-apis.md → Understand component landscape
  3. Call getColorFamilyReference() from @mcp → Get semantic color guidance
  4. Call getCommonPatterns() from @mcp → Reference proven patterns
  5. Query COMPONENT_PROPS_REGISTRY → Validate component props
  6. Call formatDesignGuidelines() → Include in response for Claude
  7. Generate component using semantic design tokens
  8. Call getMistakesToAvoid() → Cross-check implementation
  9. Return implementation
```

### Design Files Reference Points

These new skill files should **reference and extend** the @mcp resources:

- `design/guidelines.md` → Summarizes + extends `design-system-context.ts`
- `design/patterns.md` → Curates from `getCommonPatterns()` + adds UI Lab specific patterns
- `references/component-apis.md` → Transforms `component-props-registry.ts` into narrative form
- `references/color-family-guide.md` → Expands `getColorFamilyReference()` with examples

**Critical**: Never duplicate or contradict @mcp resources. Instead, reference them and add skill-specific knowledge.

---

## Part 4: Tool Design & Capabilities

### Skill Exposes Two Workflows

**Workflow 1: Generate Component/Layout**
```
User Input:
  "Create a success alert with icon, title, and dismissible action"

Skill Process:
  1. Analyze request → Determine UI intent (communicate success)
  2. Map to components → Alert (wrapper) + Icon (semantic) + Button (dismiss)
  3. Select colors → success family (semantic intent)
  4. Select shades → bg-success-50, text-success-900 (accessibility)
  5. Choose spacing → 16px (from scale)
  6. Compose layout → Alert.Root > [Icon, Content, Button]
  7. Output → Working code with design rationale
```

**Workflow 2: Refactor to UI Lab**
```
User Input:
  Pastes custom React component using arbitrary colors

Skill Process:
  1. Parse component → Identify elements, styling, state
  2. Find mappings → CustomCard → Card, CustomButton → Button
  3. Extract styling → bg-zinc-50, text-gray-900 → semantic families
  4. Suggest replacements → bg-background-50, text-foreground-900
  5. Migrate state → dark: prefix → component props
  6. Output → Refactored code + migration notes
```

### No External Tools Needed

**Why?** Design decisions are deterministic:
- Color family selection → Follows semantic guidelines
- Shade selection → Determined by use case + accessibility rules
- Component choice → Matched via component registry + pattern matching
- Layout composition → Follows established patterns

All decision-making happens in the skill workflows, guided by @mcp resources.

---

## Part 5: Design Files Content

### File 1: design/guidelines.md

**Purpose**: Establish the design philosophy and non-negotiable rules

**Structure**:
```markdown
# UI Lab Design Guidelines

## Design Philosophy
- Semantic Intent Over Appearance
- Component Mastery Over Styling
- Design Tokens As Constraints
- Design System As Source of Truth

## Core Rules (Non-Negotiable)
1. Always use semantic color families, never arbitrary colors
2. All colors are CSS variables: --family-shade
3. Components handle interactions, not CSS classes
4. Dark mode works via component props, not utility prefixes
5. Spacing follows the scale: 4, 8, 12, 16, 24, 32, 48, 64px
6. Typography uses established hierarchy (h1-h6, body, caption)
7. Every design decision starts with semantic intent

## When These Rules Conflict With Design
- Rules always win
- If a design violates rules, work with design to adjust
- System consistency > unique visual design

## Common Misconceptions
- "I need hover:bg-red-600" → Use component variant prop instead
- "I need custom colors" → Map intent to semantic family
- "Dark mode needs special CSS" → Components handle this
- "Different padding needed" → Probably indicates wrong component
```

### File 2: design/tokens.md

**Purpose**: Reference guide for available design tokens and how to use them

**Structure**:
```markdown
# Design Tokens Reference

## Color Families (Semantic)

### accent (Brand/Primary)
Used for: Primary actions, links, focus indicators, active states
CSS Variables: --accent-50 through --accent-950
Common Uses:
  - Primary buttons: --accent-600 bg, --foreground-50 text
  - Link color: --accent-600
  - Focus ring: --accent-600 border

### success (Positive)
Used for: Confirmations, approved states, positive feedback
Common Uses:
  - Success alert: --success-50 bg, --success-900 text
  - Success badge: --success-200 bg, --success-900 text

[... similar for danger, warning, info, background, foreground ...]

## Spacing Scale

Fixed scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
Usage:
  - p-4 (padding), m-2 (margin), gap-3 (flex gap), etc.
  - Always use scale values
  - Never use arbitrary spacing like p-13

## Typography Scale

h1: 2rem (32px), font-weight: 700, line-height: 1.2
h2: 1.5rem (24px), font-weight: 700, line-height: 1.3
... [through h6 and body variants]

Hierarchy:
  1. h1 - Page titles
  2. h2 - Section titles
  3. h3 - Subsection titles
  4. h4 - Card titles
  5. body (default) - Main content
  6. caption - Metadata

## Motion/Animation

Durations:
  - Quick: 150ms (micro-interactions)
  - Normal: 300ms (normal transitions)
  - Slow: 500ms (complex animations)

Easing:
  - ease-out: Recommended for entrance
  - ease-in: Recommended for exit
  - ease-in-out: Recommended for complex animations

## Breakpoints

Mobile First:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
```

### File 3: design/patterns.md

**Purpose**: Common UI patterns implemented with UI Lab components

**Structure**:
```markdown
# Common UI Patterns

## Pattern: Success Alert (Dismissible)

When to use: Confirm successful user actions

Composition:
```tsx
<Alert variant="success" title="Changes saved">
  <Button variant="ghost" size="sm" onClick={dismiss}>Dismiss</Button>
</Alert>
```

Design Rationale:
- Alert component handles base styling (--success-50 bg, --success-900 text, --success-300 border)
- Ghost button variant for secondary action inside primary component
- Semantic success family communicates positive outcome

## Pattern: Form Field with Error

When to use: Validate user input in real-time

## Pattern: Card with Title & Action

When to use: Group related content with optional action

[... 8-10 more patterns ...]

## Pattern: Modal Dialog with Form

When to use: Collect user input without leaving page context

Each pattern includes:
- When to use it (user intent)
- Component composition (which UI Lab components)
- Semantic color reasoning
- Complete code example
- Accessibility notes
```

### File 4: design/component-selection.md

**Purpose**: Decision matrix for choosing the right component

**Structure**:
```markdown
# Component Selection Guide

## Decision Tree: "What should I use?"

```
Is it clickable?
  └─ Yes → Button or Link (Button with variant="ghost")
  └─ No
     └─ Does it contain information?
        └─ Yes → Card or Alert
        └─ No
           └─ Is it a standalone message?
              └─ Yes → Alert or Badge
              └─ No
                 └─ Is it part of a form?
                    └─ Yes → Input, Select, Checkbox, Radio, Textarea
                    └─ No → Flex, Grid, Stack
```

## Component Quick Reference

| Need | Use | Props |
|------|-----|-------|
| Primary action | Button | variant="primary" |
| Secondary action | Button | variant="secondary" |
| Delete action | Button | variant="danger" |
| Link/ghost action | Button | variant="ghost" |
| Grouped choices | Radio | within RadioGroup |
| Multiple choices | Checkbox | standalone or CheckboxGroup |
| Dropdown options | Select | with Option children |
| Free text input | Input | type="text" |
| Email validation | Input | type="email" |
| Success feedback | Alert | variant="success" |
| Error feedback | Alert | variant="danger" |
| Grouped content | Card | with title prop |
| Status indicator | Badge | variant="success\|danger\|warning\|info" |
| 2D layout | Flex | with direction, justify, align |
| Grid layout | Grid | with columns prop |
| Tabs | Tabs | with Tab children |
| Modal | Dialog | with nested content |
| Dropdown menu | Menu | with MenuItem children |
| Tooltip | Tooltip | on hover |
| Multi-line input | Textarea | larger text entry |
| Numeric input | Input | type="number" |
| Date input | Input | type="date" |

## Variant Selection Rules

Button variants map to semantic intent:
- primary (accent-600) → Main action, most important
- secondary (background-600) → Alternative action
- danger (danger-700) → Destructive action
- ghost (transparent) → Tertiary action, low emphasis

Alert variants communicate feedback:
- success → Positive outcome
- danger → Error/problem
- warning → Caution needed
- info → Informational

Badge variants match alert variants but for inline status display.
```

---

## Part 6: Component Recommendation Engine

### How It Works

The skill doesn't need an external "recommendation tool" because recommendations are deterministic and rule-based:

```typescript
// Pseudo-code: Component Recommendation Logic

function recommendComponent(userIntent: string): Component[] {
  // Step 1: Parse semantic intent from request
  const intent = parseSemanticIntent(userIntent);
  // e.g., "Show a success message" → { type: 'feedback', sentiment: 'positive' }

  // Step 2: Query component registry for matching patterns
  const candidates = queryComponentRegistry(intent);
  // Uses component-props-registry.ts from @mcp

  // Step 3: Rank by suitability
  const ranked = rankByPatternMatch(candidates, intent);

  // Step 4: Return with reasoning
  return ranked.map(comp => ({
    component: comp.name,
    confidence: comp.score,
    reason: generateReason(comp, intent),
    exampleProps: generateExampleProps(comp, intent),
  }));
}
```

### Built-in Decision Rules

**1. User Intent → Semantic Color Family**
```
"success" → success family
"error" / "failed" → danger family
"warning" / "caution" → warning family
"info" / "help" → info family
"action" / "primary" → accent family
"background" / "container" → background family
"text" / "label" / "border" → foreground family
```

**2. Component Type → Required Props**
```
Button with success intent:
  - If destructive: variant="danger"
  - If primary: variant="primary"
  - If secondary: variant="secondary"

Alert with danger intent:
  - variant="danger"
  - bg: --danger-50, text: --danger-900, border: --danger-300
```

**3. Interaction Pattern → Component Choice**
```
Single choice → Radio
Multiple choices → Checkbox group
Many options → Select dropdown
Yes/no toggle → Checkbox (or Toggle if available)
Related content → Card
Important notice → Alert
Quick note → Badge
Overlay interaction → Dialog/Modal
Contextual info → Tooltip
```

---

## Part 7: Integration Checklist

### Before Launching Skill

- [ ] **SKILL.md**
  - [ ] Routes user intent to workflows
  - [ ] Minimal intake questions
  - [ ] Clear success criteria

- [ ] **design/guidelines.md**
  - [ ] Summarizes @mcp design system without duplicating
  - [ ] Establishes non-negotiable rules
  - [ ] Addresses "why" for each rule

- [ ] **design/tokens.md**
  - [ ] Color families with CSS variable references
  - [ ] Spacing scale
  - [ ] Typography hierarchy
  - [ ] Motion/animation guidelines
  - [ ] Links to @mcp for authoritative details

- [ ] **design/patterns.md**
  - [ ] 8-10 common patterns with composition
  - [ ] Design rationale for each
  - [ ] Complete code examples
  - [ ] A11y notes

- [ ] **workflows/generate-component.md**
  - [ ] Step-by-step component generation process
  - [ ] References design files
  - [ ] Includes @mcp tool calls
  - [ ] Clear success criteria

- [ ] **workflows/refactor-to-ui-lab.md**
  - [ ] Analyzes existing component
  - [ ] Maps to UI Lab alternatives
  - [ ] Transforms styling to semantic tokens
  - [ ] Output: Refactored code + migration notes

- [ ] **references/component-apis.md**
  - [ ] All UI Lab components with props
  - [ ] Variants and defaults
  - [ ] Children composition rules
  - [ ] Links to component-props-registry.ts

- [ ] **references/color-family-guide.md**
  - [ ] Deep dive on each color family
  - [ ] Semantic meaning
  - [ ] Shade selection rules
  - [ ] Contrast requirements
  - [ ] Examples for each

- [ ] **references/accessibility-checklist.md**
  - [ ] WCAG AA requirements
  - [ ] Contrast verification
  - [ ] Color + text combinations
  - [ ] Motion considerations

- [ ] **templates/component-template.tsx**
  - [ ] Well-formed component structure
  - [ ] Semantic color usage
  - [ ] Proper spacing
  - [ ] Accessibility attributes

- [ ] **Testing**
  - [ ] Test with "simple" request (button)
  - [ ] Test with "complex" request (form with validation)
  - [ ] Test refactoring flow
  - [ ] Verify all code uses semantic tokens

---

## Part 8: Example Usage Flows

### Flow 1: Generate a "Status Badge" Component

```
User: "Create a status badge that shows 'Pending' with a pending state indicator"

Skill Process:
1. Read SKILL.md intake → Identify as "generate-component" request
2. Route to workflows/generate-component.md
3. Analyze request:
   - UI Type: Badge (status indicator)
   - Semantic Intent: Pending state (non-critical, waiting)
   - Color Family: warning (caution/pending)
4. Consult references/component-apis.md:
   - Badge component accepts: variant, size, children
   - Variant options: default, success, danger, warning, info
   - Choose variant="warning"
5. Consult design/tokens.md:
   - warning family shades: Use 200 for bg (light), 900 for text (dark)
   - Spacing: 12px padding (medium)
6. Consult design/patterns.md:
   - Find "Status Badge Pattern"
   - Includes icon, text, semantic color
7. Generate code:
   ```tsx
   <Badge variant="warning" className="flex items-center gap-2">
     <ClockIcon className="w-4 h-4" />
     Pending
   </Badge>
   ```
8. Verify design consistency:
   - Uses UI Lab Badge component ✓
   - Semantic warning family ✓
   - Proper spacing (gap-2) ✓
   - No arbitrary colors ✓
   - No dark: prefixes ✓
9. Output with rationale
```

### Flow 2: Refactor Existing Custom Component

```
User: [Pastes custom badge component with bg-yellow-100, text-yellow-800]

Skill Process:
1. Parse component → Identify Badge with styling
2. Analyze styling:
   - bg-yellow-100 → Communicates warning/caution
   - text-yellow-800 → Complements background
3. Map to design tokens:
   - Intent: Warning status
   - Color family: warning (semantic match)
   - Shades: --warning-100 (bg), --warning-900 (text)
4. Consult component-props-registry.ts:
   - Badge accepts variant="warning"
5. Transform:
   - Remove arbitrary Tailwind colors
   - Apply variant="warning"
   - Let component handle styling
6. Output:
   ```tsx
   <Badge variant="warning">Pending</Badge>
   ```
7. Include rationale:
   - "Replaced arbitrary Tailwind colors with semantic warning family"
   - "Component variant handles all styling + dark mode"
   - "No CSS classes needed—Badge variant provides complete styling"
```

---

## Part 9: Success Criteria

### A Well-Designed Skill Will

1. **Enforce Design System**
   - All generated code uses semantic color families
   - No arbitrary Tailwind colors appear in output
   - No CSS classes work around component API

2. **Prioritize Component APIs**
   - Recommendations start with "Which component?"
   - Props are preferred over styling
   - Component variants used before custom CSS

3. **Maintain Consistency**
   - Every generated UI follows design patterns
   - Spacing, typography, colors are consistent
   - Design decisions are traceable to guidelines

4. **Enable Refactoring**
   - Can analyze existing code
   - Transforms arbitrary styles to design tokens
   - Suggests UI Lab component replacements

5. **Provide Transparency**
   - Always includes design rationale
   - Explains why semantic families were chosen
   - Points to specific guidelines for decisions

6. **Support Accessibility**
   - Verifies color contrast
   - Suggests accessible patterns
   - Flags potential a11y issues

---

## Part 10: Implementation Notes

### How Claude Uses This Skill

1. **Reads SKILL.md** → Understands design philosophy
2. **User provides request** → Skill asks clarifying questions if needed
3. **Routes to workflow** → `generate-component.md` or `refactor-to-ui-lab.md`
4. **Workflow loads references** → `component-apis.md`, `color-family-guide.md`, etc.
5. **Claude implements workflow** → Generates code with design guidance
6. **Validates against rules** → Checks for semantic colors, component usage, etc.
7. **Outputs result** → Code + design rationale

### Why No External Tools

Design recommendations are deterministic:
- Color selection follows semantic rules (verifiable, not probabilistic)
- Component selection follows pattern matching (registry-based, deterministic)
- Layout composition follows established patterns (non-ambiguous)
- Accessibility rules are objective (WCAG AA requirements)

The skill doesn't need tools to make decisions—it needs **knowledge** (the design files) and **reasoning** (the workflows).

### Extending the Skill

To add new capabilities:
1. Add workflow file: `workflows/new-feature.md`
2. Add reference if needed: `references/new-reference.md`
3. Update SKILL.md routing
4. Test with real examples

---

## Appendix: Quick Reference for Skill Author

### Color Family Quick Map

| Intent | Family | Primary Shade | Secondary | Usage |
|--------|--------|---------------|-----------|-------|
| Primary Action | accent | 600 | 700 (hover) | Buttons, links, focus |
| Success | success | 600 | 50 (alert bg) | Confirmations, approved |
| Error/Danger | danger | 700 | 50 (alert bg) | Errors, delete buttons |
| Warning/Caution | warning | 600 | 50 (alert bg) | Warnings, pending |
| Information | info | 600 | 50 (alert bg) | Help, documentation |
| Container | background | 50 (light) | 900 (dark) | Page/card backgrounds |
| Text/Borders | foreground | 950 (text) | 300 (borders) | Labels, borders, icons |

### Component Quick Map

| Use Case | Component | Variant | Key Props |
|----------|-----------|---------|-----------|
| Primary action | Button | primary | onClick, children |
| Delete action | Button | danger | onClick, children |
| Link/secondary | Button | ghost | onClick, children |
| Grouped choices | Radio | - | within RadioGroup |
| Multiple choices | Checkbox | - | standalone/group |
| Select from list | Select | - | with Option children |
| Free text | Input | text | onChange, value |
| Multi-line text | Textarea | - | onChange, value |
| Success message | Alert | success | title, description |
| Error message | Alert | danger | title, description |
| Status label | Badge | success\|danger\|warning | - |
| Content container | Card | default | title, children |
| Flexible layout | Flex | - | direction, gap, justify |
| Modal/overlay | Dialog | - | open, onClose |

---

## Conclusion

This skill transforms UI generation from "make it look like this design" to "implement this intent with semantic design principles." By combining:

1. **Design knowledge** (guidelines, tokens, patterns)
2. **Component mastery** (APIs, variants, composition)
3. **Systematic workflows** (step-by-step generation processes)
4. **Integration with @mcp** (existing design system resources)

The result is a skill that produces beautiful, consistent, accessible UI that's easy to maintain and evolve.
