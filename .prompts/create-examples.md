# Create Basic Component Examples

This guide describes how to create a collection of high-quality, fundamental examples for a specific UI Lab component. Use this prompt when you need to generate 3-4 diverse, simple examples that showcase different use-cases and ways to use the component.

## 1. Objective

Create **multiple focused, minimal examples** that each demonstrate a specific, practical use case for the component. Each example should be:
- **Simple & digestible:** Easy to understand at a glance
- **Use-case focused:** Each showcases a distinct real-world scenario
- **Diverse:** Cover different industries or interaction patterns
- **Complementary:** Together, they demonstrate the component's versatility

**Key Principle:** These are foundational examples that teach users HOW to use the component. The "realistic examples" build upon these basics with richer compositions.

## 2. Strategy: Multi-Use-Case Approach

### Step 1: Identify the Component's Core Purpose
*   *Example:* "What does this component fundamentally do?"
*   *For Button:* "Enable user actions"
*   *For Select:* "Allow users to choose from a list"
*   *For Card:* "Group related content with visual containment"

### Step 2: Brainstorm 4 Diverse Use Cases
For each use case:
1. **Pick a domain** (e-commerce, productivity, finance, social, education, etc.)
2. **Describe the scenario** in one sentence
3. **Identify the simplest composition** needed

**Example for Select Component:**
1. **E-commerce:** Product filter (size: Small, Medium, Large)
2. **Productivity:** Priority picker (Low, Medium, High, Urgent)
3. **Settings:** Time zone selector (UTC, UTC+1, UTC-5, etc.)
4. **Dashboard:** Chart type switcher (Line, Bar, Pie, Area)

### Step 3: Interrogate Each Example
For each use case, ask:
- *Question:* "What is the minimal UI needed?"
- *Answer:* Component + label + optional icon/helper text
- *Question:* "Should I use ecosystem components?"
- *Answer:* Only if the component naturally pairs with it (e.g., `Group` for related buttons, `Label` for form context)

### Step 4: Ensure Visual Consistency
All examples use the same styling approach:
- Simple container (card-like presentation)
- Consistent spacing and sizing
- Semantic color usage only
- No gratuitous decoration

## 3. Design Constraints (STRICT)

### 🚫 Forbidden Styles
*   **NO Shadows:** Do not use `shadow-*`. Use borders and backgrounds for depth.
*   **NO Gradients:** Do not use `bg-gradient-*`.
*   **NO Custom Hover Styles:** Rely on built-in component states.
*   **NO Complexity:** Keep examples focused on ONE feature per example.

### Color System (OKLCH)
*   **NEVER** use standard Tailwind colors (e.g., `bg-blue-500`).
*   **ALWAYS** use semantic CSS variables:
    *   `var(--background-700)` to `var(--background-950)`
    *   `var(--foreground-50)` to `var(--foreground-500)`
    *   `var(--accent-50)` to `var(--accent-500)`
    *   `var(--success-*)`, `var(--warning-*)`, `var(--danger-*)`, `var(--info-*)`

## 4. Gold Standard Reference: Button Component Examples

**Use-Case 1: Primary Action**
- Scenario: "Submit form"
- Code: `<Button variant="primary">Save Changes</Button>`
- Context: Contact form

**Use-Case 2: Secondary Action**
- Scenario: "Cancel operation"
- Code: `<Button variant="secondary">Cancel</Button>`
- Context: Modal footer

**Use-Case 3: Destructive Action**
- Scenario: "Delete account"
- Code: `<Button variant="destructive">Delete</Button>`
- Context: Settings page

**Use-Case 4: Icon Action**
- Scenario: "Toggle favorite"
- Code: `<Button icon={<FaStar />} variant="ghost" />`
- Context: Product card

*Key Pattern:* Each example shows the component in a specific context with clear purpose.

## 5. Output Template

For each basic example file:

### File: `packages/registry/src/components/[Component]/examples/XX-[scenario-name].tsx`

```tsx
import React from 'react';
import {
  [Component],
  // Import other components only if they're part of the core use case
  Label,
  Icon
} from 'ui-lab-components';
import {
  // Import 1-2 relevant icons
  FaIcon1,
  FaIcon2
} from 'react-icons/fa6';

export const metadata = {
  title: '[Specific Scenario]', // e.g., "Size Filter"
  description: '[One-sentence description of the use case].' // e.g., "Selecting product sizes in an e-commerce context."
};

export default function Example() {
  return (
    // Minimal container: showcase the component clearly
    <div className="w-full max-w-[320px] bg-background-950 border border-background-800 rounded-lg p-6">
      {/* Simple, focused usage */}
      <[Component]>
        {/* Content or options */}
      </[Component]>
    </div>
  );
}
```

### Multiple Examples Pattern

Generate 3-4 examples with sequential numbering:
- `01-[first-use-case].tsx`
- `02-[second-use-case].tsx`
- `03-[third-use-case].tsx`
- `04-[fourth-use-case].tsx` (optional, if diversity warrants)

Each file should be **independent and self-contained**, requiring no knowledge of the others.

## 6. Examples.json & Index.ts Updates

Provide entries for each example:

### For `examples.json`:
```json
[
  {
    "name": "[Scenario 1]",
    "description": "[Use case description]",
    "file": "01-[scenario-1].tsx"
  },
  {
    "name": "[Scenario 2]",
    "description": "[Use case description]",
    "file": "02-[scenario-2].tsx"
  },
  ...
]
```

### For `index.ts`:
```typescript
export { default as Example1 } from './01-[scenario-1]';
export { default as Example2 } from './02-[scenario-2]';
...
```

## 7. Quality Checklist

Before finalizing, verify:
- [ ] Each example demonstrates a **different, distinct use case**
- [ ] Examples come from **at least 3 different domains**
- [ ] Each example is **self-contained** and requires no context from others
- [ ] All examples use **semantic colors only** (no hardcoded colors)
- [ ] No shadows, gradients, or custom hover states
- [ ] Each file follows the **minimal, focused** philosophy
- [ ] Metadata titles and descriptions are **clear and specific**
- [ ] Examples are **numbered sequentially** (01, 02, 03, 04)
