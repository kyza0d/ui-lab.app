# Tools Reference

Tools for working with UI Lab components. Reference the `design/` folder as source of truth.

---

## Component Reference Tools

### getAvailableComponents()

List all UI Lab components organized by category.

**Returns:** Component list with categories

**Example:**
```
getAvailableComponents()
→ {
    layout: ["Flex", "Grid", "Frame", "Divider"],
    action: ["Button", "Group"],
    input: ["Input", "Textarea", "Select", "Checkbox", "Radio", "Switch", "Slider", "Label"],
    information: ["Badge", "Banner", "Tooltip", "Anchor"],
    feedback: ["Toast", "Progress", "Confirmation"],
    navigation: ["Menu", "Tabs", "Breadcrumbs", "Command"],
    container: ["Card", "Modal", "Popover", "Fold", "List"],
    data: ["Table", "Scroll", "Gallery", "Date", "Color"]
  }
```

### getComponentApi(name: string)

Get full API documentation for a component.

**Parameters:**
- `name` - Component name (e.g., "Button", "Card", "Modal")

**Returns:** Component interface, props, variants, compound components

**Example:**
```
getComponentApi("Button")
→ {
    name: "Button",
    import: "import { Button } from 'ui-lab-components'",
    props: {
      variant: "primary" | "default" | "secondary" | "outline" | "ghost",
      size: "sm" | "md" | "lg",
      isDisabled: boolean,
      onPress: (e) => void,
      icon: { left?: ReactNode, right?: ReactNode }
    },
    examples: [...]
  }
```

### searchComponents(query: string)

Search components by keyword.

**Parameters:**
- `query` - Search term (e.g., "modal", "form", "navigation")

**Returns:** Matching components with descriptions

---

## Design Token Tools

### getDesignTokens()

Get all design tokens: colors, spacing, typography, radius.

**Returns:** Complete token reference

**Example:**
```
getDesignTokens()
→ {
    colors: {
      foreground: "50-600",
      background: "500-950",
      accent: "50-600",
      success: "50-600",
      danger: "50-600",
      warning: "50-600",
      info: "50-600"
    },
    spacing: {
      gap: ["xs", "sm", "md", "lg", "xl"]
    },
    typography: {
      body: ["--text-xs", "--text-sm", "--text-md", ...],
      header: ["--header-text-xs", ...]
    },
    radius: ["--radius-xs", "--radius-sm", "--radius-md", ...]
  }
```

### getColorRecommendation(intent: string)

Get the appropriate color token for a semantic intent.

**Parameters:**
- `intent` - Semantic intent (primary, success, error, warning, info, text, background, border)

**Returns:** Color recommendation with CSS variable

**Example:**
```
getColorRecommendation("success")
→ {
    family: "success",
    shade: 500,
    cssVar: "success-500",
    rationale: "Use success-500 for positive outcomes and confirmations"
  }
```

---

## Validation Tools

### validateComponentCode(code: string)

Validate code against UI Lab design system rules.

**Parameters:**
- `code` - TSX/JSX code to validate

**Returns:** Validation result with issues and suggestions

**Checks:**
- Correct import paths (`ui-lab-components`)
- Proper compound component usage
- Semantic color tokens (no arbitrary colors)
- React Aria patterns (isDisabled, onPress, isOpen/onOpenChange)
- Component variant usage

**Example:**
```
validateComponentCode(`
  <Button className="bg-blue-600">Save</Button>
`)
→ {
    valid: false,
    issues: ["Arbitrary color 'bg-blue-600' should use component variant"],
    suggestions: ["Use variant='primary' instead of custom background"]
  }
```

### checkArbitraryColors(code: string)

Detect non-semantic color usage in code.

**Parameters:**
- `code` - Code to check

**Returns:** List of arbitrary color violations

**Example:**
```
checkArbitraryColors(`
  <div className="bg-zinc-800 text-gray-300">
`)
→ {
    violations: [
      { color: "bg-zinc-800", suggestion: "Use bg-background-800" },
      { color: "text-gray-300", suggestion: "Use text-foreground-300" }
    ]
  }
```

### validateSemanticIntent(code: string)

Check that color choices match semantic meaning.

**Parameters:**
- `code` - Code to validate

**Returns:** Semantic intent validation

### checkWcagContrast(fg: string, bg: string)

Verify color combination meets WCAG AA contrast requirements.

**Parameters:**
- `fg` - Foreground color token
- `bg` - Background color token

**Returns:** Contrast ratio and pass/fail status

---

## Pattern Tools

### getPatternComponents(patternName: string)

Get code and rationale for a common UI pattern.

**Parameters:**
- `patternName` - Pattern identifier

**Returns:** Pattern code with component composition

**Available Patterns:**
- `success-banner` - Banner with success variant
- `error-banner` - Banner with danger variant
- `form-field` - Input with Label and error state
- `card-with-actions` - Card with Header, Body, Footer
- `confirmation-modal` - Modal with confirm/cancel
- `status-badge` - Badge with semantic variant
- `button-group` - Group with multiple buttons
- `tab-interface` - Tabs with TabsList, TabsContent
- `breadcrumb-nav` - Breadcrumbs navigation
- `toast-notification` - Toast usage pattern

**Example:**
```
getPatternComponents("confirmation-modal")
→ {
    pattern: "confirmation-modal",
    components: ["Modal", "Button", "Flex"],
    code: `
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} title="Confirm" size="sm">
        <p className="text-foreground-300">Are you sure?</p>
        <Modal.Footer>
          <Flex gap="sm" justify="flex-end">
            <Button variant="ghost" onPress={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onPress={handleConfirm}>Confirm</Button>
          </Flex>
        </Modal.Footer>
      </Modal>
    `
  }
```

---

## Workflows

### Generate UI Component

```
1. getAvailableComponents()     → Find relevant component
2. getComponentApi("Card")      → Get API and props
3. getPatternComponents("card-with-actions") → Get pattern example
4. validateComponentCode(code)  → Validate output
```

### Refactor Existing Code

```
1. checkArbitraryColors(code)   → Find color violations
2. validateSemanticIntent(code) → Check semantic meaning
3. getColorRecommendation("primary") → Get correct tokens
4. validateComponentCode(code)  → Validate refactored code
```

### Audit for Compliance

```
1. checkArbitraryColors(code)   → Detect arbitrary colors
2. validateSemanticIntent(code) → Check semantic usage
3. checkWcagContrast(fg, bg)    → Verify accessibility
4. validateComponentCode(code)  → Full validation
```

---

## Semantic Intent Reference

| Intent | Recommended Token | Use For |
|--------|-------------------|---------|
| `primary` | `accent-600` | Primary actions, CTAs |
| `success` | `success-500` | Positive outcomes, confirmations |
| `error` | `danger-500` | Errors, destructive actions |
| `warning` | `warning-500` | Warnings, cautions |
| `info` | `info-500` | Informational messages |
| `text-primary` | `foreground-300` | Primary body text |
| `text-heading` | `foreground-100` | Headings |
| `text-muted` | `foreground-500` | Muted/secondary text |
| `background-page` | `background-950` | Page background |
| `background-card` | `background-900` | Card surfaces |
| `border` | `background-700` | Borders, dividers |

---

## Return Types

```typescript
interface ValidationResult {
  valid: boolean;
  issues: string[];
  warnings: string[];
  suggestions?: string[];
}

interface ColorRecommendation {
  family: string;
  shade: number;
  cssVar: string;
  rationale: string;
}

interface ComponentApi {
  name: string;
  import: string;
  props: Record<string, string>;
  compoundComponents?: string[];
  examples: string[];
}

interface PatternResult {
  pattern: string;
  components: string[];
  code: string;
  rationale?: string;
}
```
