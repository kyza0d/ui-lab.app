---
name: build-ui-lab
description: Generate beautiful, consistent UI using UI Lab components with design-driven, semantic approach. Start with design intent, not visual appearance. Leverages component APIs and semantic design tokens.
---

<objective>
Build optimized, consistent UI using UI Lab components by starting with semantic design intent and leveraging component APIs, not CSS modifications. Focus on what the UI communicates, not how it looks.
</objective>

<essential_principles>

## Core Design Philosophy

**1. Semantic Intent First**
- Every UI decision starts with "What does this communicate?"
- Colors map to semantic families: accent (primary), success, danger, warning, info, background, foreground
- Components chosen based on interaction patterns and user intent, not visual similarity

**2. Component Mastery Over Styling**
- Master UI Lab components' props and variants
- Never use CSS to force behavior a component prop should handle
- Trust components for state management, dark mode, interactions
- Layout via composition, not arbitrary utility classes

**3. Design Tokens As System Constraints**
- All colors use semantic CSS variables: `--family-shade` (e.g., `--accent-600`)
- Spacing follows fixed scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Typography uses established hierarchy: h1-h6, body, caption
- These aren't suggestions—they're constraints ensuring consistency

**4. Design System As Source of Truth**
- When uncertain, consult design guidelines (guidelines.md)
- Never work around system limitations—elevate concerns instead
- Component registry (component-apis.md) defines what's possible
- Existing @mcp resources (design-system-context.ts, design-guidelines.ts) are authoritative

## What Makes This Different

Most UI generation focuses on "making things look right." This skill focuses on "making things communicate right":

- **Traditional**: "Here's a design, make it look like this" → Visual matching → Styling tweaks
- **Design-Driven**: "Here's an intent, implement it semantically" → Pattern matching → Component selection

Result: UI that's beautiful AND consistent AND maintainable AND semantically meaningful.

## Non-Negotiable Rules

1. Always use semantic color families, never arbitrary colors (no `bg-blue-600`, `bg-zinc-50`, etc.)
2. All colors are CSS variables referencing design tokens: `--family-shade`
3. Components handle interactions and state via props, not CSS classes
4. Dark mode works via component props, not `dark:` utility prefixes
5. Spacing follows the scale; never invent new spacing values
6. Every design decision includes semantic reasoning

</essential_principles>

<intake>
What would you like to do with UI Lab components?

**Choose one:**
1. **Generate** - Create a new component, layout, or UI section
2. **Refactor** - Transform existing code to use UI Lab + semantic design
3. **Review** - Audit UI for design consistency and component patterns
4. **Learn** - Understand design system philosophy and best practices

**Or just describe what you need** - e.g., "Create a modal with a form" or "Show me how to build a payment status card"
</intake>

<routing>

| Response | Workflow | Context |
|----------|----------|---------|
| 1, "generate", "create", "build" | `workflows/generate-component.md` | User has specific UI to build; guide design-first thinking |
| 2, "refactor", "migrate", "convert", [pastes code] | `workflows/refactor-to-ui-lab.md` | User has existing code; transform to UI Lab + semantic tokens |
| 3, "review", "audit", "check", "analyze" | `workflows/review-design-consistency.md` | User has UI to evaluate; check against design guidelines |
| 4, "learn", "explain", "understand", "how", "why" | `workflows/learn-design-system.md` | User wants to understand philosophy; teach principles |
| [Specific UI description] | Determine intent then route | "modal with form" → generate, "show payment badge" → generate |
| [Code block pasted] | `workflows/refactor-to-ui-lab.md` | User showing existing code → refactor |

**Progressive disclosure:** Start with workflow determined by intent. Each workflow loads only the references it needs.

</routing>

<reference_index>

## Core Design Knowledge

All in `design/`:

- **guidelines.md** - Design philosophy and non-negotiable rules
- **tokens.md** - Color families, spacing scale, typography hierarchy, motion
- **patterns.md** - Common UI patterns with component composition and design rationale
- **component-selection.md** - Decision matrix for choosing the right component

## Detailed Reference Materials

All in `references/`:

- **component-apis.md** - UI Lab component reference (props, variants, composition)
- **color-family-guide.md** - Deep dive on semantic color families and shade selection
- **spacing-typography.md** - Spacing and typography scales with usage guidelines
- **dark-mode-patterns.md** - How components handle dark mode automatically
- **accessibility-checklist.md** - WCAG AA requirements and verification

## Templates

All in `templates/`:

- **component-template.tsx** - Well-formed component structure
- **layout-template.tsx** - Multi-component layout composition
- **pattern-template.tsx** - Common pattern implementation

</reference_index>

<success_criteria>

A successful interaction with this skill will produce:

1. **Design-First Thinking** - Every decision traced to semantic intent, not visual appearance
2. **Semantic Color Usage** - All colors use design token CSS variables, no arbitrary Tailwind colors
3. **Component Mastery** - Recommendations start with "which component?", not "what CSS?"
4. **Consistent Patterns** - Output matches established patterns from design/patterns.md
5. **Clear Rationale** - Each UI decision includes explanation of semantic reasoning
6. **Accessibility Built-In** - Color choices verified for contrast, patterns follow a11y guidelines
7. **No Workarounds** - CSS never used to force component behavior; component props used instead
8. **Maintainability** - Future changes to design tokens automatically update all UI using them

</success_criteria>

---

# Tools Reference

All tools are implemented in `tools.ts` and provide direct access to the UI Lab design system and component registry.

## Phase 1: Core Infrastructure Tools

These tools provide the foundation for all other operations.

### Tool: `getAvailableComponents()`

Query the MCP component registry dynamically. Returns all available UI Lab components with metadata.

**Returns:**
```typescript
{
  components: ComponentMeta[],  // List of all components
  total: number,                 // Total component count
  categories: string[]           // Unique categories
}
```

**Example:**
```typescript
const { components, total, categories } = getAvailableComponents();
// Returns: button, input, card, badge, alert + metadata
```

**Use when:** You need to know what components are available or browse by category.

---

### Tool: `getComponentProps(componentName)`

Fetch complete prop information for a specific component.

**Parameters:**
- `componentName: string` - Name of component (e.g., "button", "input")

**Returns:**
```typescript
{
  componentId: string,
  props: Record<string, unknown>,     // Detailed prop metadata
  requiredProps: string[],             // Required props
  optionalProps: string[],             // Optional props
  error?: string
}
```

**Example:**
```typescript
const props = getComponentProps("button");
// Returns: variant (enum), disabled (boolean), size (enum), etc.
```

**Use when:** You need to verify a component's API before generating code.

---

### Tool: `getDesignTokens()`

Load actual CSS variables and design tokens from the system.

**Returns:**
```typescript
{
  colorFamilies: Record<string, ColorFamily>,  // All 7 color families
  spacingScale: number[],                       // [0, 4, 8, 12, 16, 24, 32, 48, 64]
  typographyScale: Record<string, unknown>,     // h1-h6, body, caption
  breakpoints: Record<string, number>           // mobile, tablet, desktop, wide
}
```

**Example:**
```typescript
const tokens = getDesignTokens();
// colorFamilies: accent, success, danger, warning, info, background, foreground
// spacingScale: [0, 4, 8, 12, 16, 24, 32, 48, 64]px
```

**Use when:** You need to reference available design tokens or verify a token exists.

---

### Tool: `validateColorUsage(colorFamily, shade, context)`

Check if color usage follows semantic rules and WCAG standards.

**Parameters:**
- `colorFamily: string` - Color family name (accent, success, danger, etc.)
- `shade: number` - Shade value (50-950)
- `context: string` - Usage context (text, background, border, etc.)

**Returns:**
```typescript
{
  valid: boolean,
  issues: string[],      // Critical problems
  warnings: string[],    // Potential concerns
  suggestions?: string[] // Recommendations
}
```

**Example:**
```typescript
const result = validateColorUsage("foreground", 50, "text");
// Warns: "Light shade (50) may have insufficient contrast for text"
```

**Use when:** You want to verify a color choice is semantically appropriate.

---

### Tool: `validateComponentCode(code)`

Check code uses valid component APIs and semantic colors.

**Parameters:**
- `code: string` - TSX/JSX code to validate

**Returns:**
```typescript
{
  valid: boolean,
  issues: string[],      // Design violations
  warnings: string[],    // Best practice warnings
  suggestions?: string[] // Improvement ideas
}
```

**Example:**
```typescript
const result = validateComponentCode('<button className="bg-blue-600">Click</button>');
// Issues: ["Found arbitrary Tailwind colors: bg-blue-600"]
```

**Use when:** You want to validate generated code before returning.

---

## Phase 2: MCP Integration Tools

These tools connect the skill to the actual component ecosystem.

### Tool: `searchComponents(query)`

Find components by category, use-case, or keyword.

**Parameters:**
- `query: string` - Search term (e.g., "button", "form", "status")

**Returns:**
```typescript
{
  results: Array<ComponentMeta & { relevanceScore: number }>,
  query: string
}
```

**Example:**
```typescript
const results = searchComponents("button");
// Returns: button component with relevance score
```

**Use when:** You need to find a component by keyword or use-case.

---

### Tool: `suggestComponents(uiRequirement)`

AI-powered component recommendations based on UI requirement description.

**Parameters:**
- `uiRequirement: string` - Description of UI need (e.g., "I need a delete button")

**Returns:**
```typescript
{
  recommendation: Array<{ component: ComponentMeta, reason: string }>,
  analysis: string
}
```

**Example:**
```typescript
const suggestion = suggestComponents("I need a form with text input and submit button");
// Recommends: input (for text entry), button (for submit action)
```

**Use when:** You need component recommendations based on semantic intent.

---

### Tool: `getComponentApi(componentName)`

Get full API reference documentation for a component.

**Parameters:**
- `componentName: string` - Component name

**Returns:**
```typescript
{
  component: ComponentMeta,
  apiDetails: string,    // Formatted API documentation
  examples: string[],    // Code examples
  error?: string
}
```

**Example:**
```typescript
const api = getComponentApi("button");
// Returns: component description, props, usage examples
```

**Use when:** You need detailed API documentation for a component.

---

### Tool: `getPatternComponents(patternName)`

Get components and usage rationale for a specific design pattern.

**Parameters:**
- `patternName: string` - Pattern name (e.g., "success-message", "primary-button")

**Returns:**
```typescript
{
  pattern: string,
  components: string[],    // Components used
  description: string,
  rationale: string,       // Why these components
  code: string            // Example implementation
}
```

**Example:**
```typescript
const pattern = getPatternComponents("success-message");
// Returns: Alert component, success variant, example code
```

**Use when:** You need to understand how to implement a common pattern.

---

## Phase 3: Design Validation Tools

These tools enforce design system consistency and accessibility.

### Tool: `checkArbitraryColors(code)`

Detect and flag arbitrary colors in code that violate design system.

**Parameters:**
- `code: string` - Code to check

**Returns:**
```typescript
{
  issues: Array<{
    color: string,      // The bad color (e.g., "bg-blue-600")
    line: string,       // The line it appears on
    suggestion: string  // How to fix it
  }>,
  summary: string
}
```

**Example:**
```typescript
const issues = checkArbitraryColors('className="bg-red-500 text-gray-900"');
// Issues: [
//   { color: "bg-red-500", suggestion: "Use bg-[var(--danger-600)]" },
//   { color: "text-gray-900", suggestion: "Use text-[var(--foreground-950)]" }
// ]
```

**Use when:** You want to audit code for design system violations.

---

### Tool: `getColorRecommendation(semanticIntent)`

Suggest semantic color family and shade for a given intent.

**Parameters:**
- `semanticIntent: string` - Intent (e.g., "primary", "success", "error", "warning")

**Returns:**
```typescript
{
  intent: string,
  recommendation: ColorRecommendation | null,
  alternatives?: ColorRecommendation[]
}
```

**ColorRecommendation:**
```typescript
{
  family: string,      // Color family name
  shade: number,       // Shade (50-950)
  cssVar: string,      // CSS variable name
  rationale: string    // Why this choice
}
```

**Example:**
```typescript
const color = getColorRecommendation("success");
// Returns: { family: "success", shade: 600, cssVar: "--success-600", ... }
```

**Use when:** You need to know what colors to use for a semantic intent.

---

### Tool: `validateSemanticIntent(code)`

Check color family matches semantic meaning in code.

**Parameters:**
- `code: string` - Code to analyze

**Returns:**
```typescript
{
  valid: boolean,
  analysis: string,
  issues: string[],        // Semantic mismatches
  suggestions: string[]    // Best practice recommendations
}
```

**Example:**
```typescript
const result = validateSemanticIntent('<button>Delete</button>');
// Suggests: "Destructive action should use danger semantic family"
```

**Use when:** You want to ensure semantic colors match their intended meaning.

---

### Tool: `checkWcagContrast(foregroundColor, backgroundColor)`

Verify color pairs meet WCAG AA/AAA accessibility standards.

**Parameters:**
- `foregroundColor: string` - Foreground color (e.g., "--foreground-950")
- `backgroundColor: string` - Background color (e.g., "--background-50")

**Returns:**
```typescript
{
  color1: string,
  color2: string,
  wcagAA: boolean,        // Meets WCAG AA standard
  wcagAAA: boolean,       // Meets WCAG AAA standard
  analysis: string,
  recommendation?: string
}
```

**Example:**
```typescript
const contrast = checkWcagContrast("--foreground-950", "--background-50");
// Returns: { wcagAA: true, wcagAAA: true, analysis: "..." }
```

**Use when:** You want to verify color contrast meets accessibility standards.

---

# Tool Integration Examples

## Example 1: Generate a Button Component

```typescript
// 1. Get component recommendations
const suggestions = suggestComponents("I need a primary action button");
// Recommends: Button component

// 2. Get component API
const api = getComponentApi("button");
// Returns: variant, disabled, size props

// 3. Get color recommendation
const color = getColorRecommendation("primary");
// Returns: accent family, shade 600

// 4. Generate code
const code = '<Button variant="primary">Submit</Button>';

// 5. Validate
const validation = validateComponentCode(code);
// Confirms: Code follows design system
```

## Example 2: Audit Existing Code

```typescript
// 1. Check for arbitrary colors
const colorIssues = checkArbitraryColors(existingCode);
// Detects: bg-blue-600, text-gray-900

// 2. Validate semantic intent
const intentCheck = validateSemanticIntent(existingCode);
// Flags: Colors don't match semantic meaning

// 3. Check WCAG contrast
const contrast = checkWcagContrast("--foreground-900", "--background-100");
// Verifies: Color pairs meet WCAG AA
```

## Example 3: Implement a Pattern

```typescript
// 1. Get pattern details
const pattern = getPatternComponents("success-message");
// Returns: Alert component, success variant

// 2. Get component API
const api = getComponentApi("alert");
// Returns: variant, title, description props

// 3. Use pattern code as template
// Customize with semantic colors from getColorRecommendation()

// 4. Validate final code
const result = validateComponentCode(finalCode);
// Ensures: All colors are semantic, props are valid
```

---

# Tool Best Practices

1. **Always validate before returning** - Use `validateComponentCode()` on generated output
2. **Check semantic intent** - Use `validateSemanticIntent()` to ensure colors match meaning
3. **Verify accessibility** - Use `checkWcagContrast()` for color pairs
4. **Reference patterns** - Use `getPatternComponents()` for common implementations
5. **Leverage recommendations** - Use `suggestComponents()` instead of guessing

---
