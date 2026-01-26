# Tools Quick Reference

## At a Glance

| Need | Tool | Returns |
|------|------|---------|
| List all components | `getAvailableComponents()` | `{ components[], total, categories[] }` |
| Get component props | `getComponentProps(name)` | `{ componentId, props{}, requiredProps[], optionalProps[] }` |
| Find design tokens | `getDesignTokens()` | `{ colorFamilies{}, spacingScale[], typography{}, breakpoints{} }` |
| Validate a color | `validateColorUsage(family, shade, context)` | `{ valid, issues[], warnings[], suggestions[] }` |
| Check code | `validateComponentCode(code)` | `{ valid, issues[], warnings[], suggestions[] }` |
| Search for component | `searchComponents(query)` | `{ results[] with scores, query }` |
| Get recommendations | `suggestComponents(description)` | `{ recommendation[], analysis }` |
| Get API docs | `getComponentApi(name)` | `{ component, apiDetails, examples[] }` |
| Find pattern | `getPatternComponents(name)` | `{ pattern, components[], description, rationale, code }` |
| Check for bad colors | `checkArbitraryColors(code)` | `{ issues[], summary }` |
| Suggest color | `getColorRecommendation(intent)` | `{ intent, recommendation, alternatives[] }` |
| Validate intent | `validateSemanticIntent(code)` | `{ valid, analysis, issues[], suggestions[] }` |
| Check contrast | `checkWcagContrast(fg, bg)` | `{ color1, color2, wcagAA, wcagAAA, analysis, recommendation }` |

---

## Workflow: Generate a Component

**Goal:** Create a button component following design system

```
1. Determine what the user needs
2. Get component recommendations
3. Get component API documentation
4. Get color recommendations
5. Generate code
6. Validate code
7. Return code + rationale
```

**Tools Used:** suggestComponents → getComponentApi → getColorRecommendation → validateComponentCode

---

## Workflow: Audit Existing Code

**Goal:** Check if code follows design system

```
1. Check for arbitrary colors
2. Validate semantic intent
3. Check WCAG contrast
4. Report issues + suggestions
```

**Tools Used:** checkArbitraryColors → validateSemanticIntent → checkWcagContrast

---

## Workflow: Implement a Pattern

**Goal:** Use a design pattern with proper components

```
1. Find the pattern
2. Get pattern details (components, code)
3. Get component API for each component
4. Customize pattern
5. Validate final code
```

**Tools Used:** getPatternComponents → getComponentApi → validateComponentCode

---

## Workflow: Discover Components

**Goal:** Find the right component for a use case

```
1. Search by keyword, OR describe need
2. Browse component API
3. Look for similar patterns
4. View examples
```

**Tools Used:** searchComponents OR suggestComponents → getComponentApi → getPatternComponents

---

## Workflow: Design a Color Scheme

**Goal:** Choose colors for UI elements

```
1. Get design tokens (all available colors)
2. Get color recommendation for intent
3. Validate color usage
4. Check contrast with backgrounds
5. Finalize color choices
```

**Tools Used:** getDesignTokens → getColorRecommendation → validateColorUsage → checkWcagContrast

---

## Common Scenarios

### Scenario 1: "Create a form"

```typescript
// 1. Get form component suggestions
const suggestions = suggestComponents("I need a form with email input and submit button");
// → Recommends: input, button

// 2. Get API for each component
const inputApi = getComponentApi("input");
const buttonApi = getComponentApi("button");

// 3. Get color for submit button
const submitColor = getColorRecommendation("primary");
// → accent-600

// 4. Build form code
const code = `
  <form>
    <Input type="email" placeholder="Email" />
    <Button variant="primary">Submit</Button>
  </form>
`;

// 5. Validate
const validation = validateComponentCode(code);
// ✓ All colors are semantic, props are valid
```

### Scenario 2: "What's a success alert?"

```typescript
// 1. Find the pattern
const pattern = getPatternComponents("success-message");
// → Alert with success variant

// 2. Get API documentation
const api = getComponentApi("alert");
// → variant, title, description props

// 3. Look at the code example
console.log(pattern.code);
// → <Alert variant="success" title="Success" description="..." />
```

### Scenario 3: "This color doesn't look right"

```typescript
// 1. Check for arbitrary colors
const colorIssues = checkArbitraryColors(badCode);
// → Found: bg-blue-600, text-gray-900

// 2. Validate semantic intent
const intentCheck = validateSemanticIntent(badCode);
// → Flags semantic mismatches

// 3. Get correct recommendation
const correctColor = getColorRecommendation("primary");
// → Use: accent-600

// 4. Check contrast
const contrast = checkWcagContrast("--accent-600", "--foreground-50");
// ✓ WCAG AA compliant
```

### Scenario 4: "Does this code follow the design system?"

```typescript
// Full audit
const issues = checkArbitraryColors(code);           // Step 1
const intentCheck = validateSemanticIntent(code);    // Step 2
const validation = validateComponentCode(code);      // Step 3
const contrast = checkWcagContrast(fg, bg);          // Step 4

// Report findings
if (issues.issues.length === 0 && validation.valid && intentCheck.valid) {
  console.log("✓ Code follows design system!");
} else {
  console.log("Issues found:");
  console.log(issues.issues);
  console.log(validation.issues);
  console.log(intentCheck.issues);
}
```

---

## Color Intents & Their Tools

### If user needs a color for:
- **Primary action** → `getColorRecommendation("primary")` → accent-600
- **Success/confirmation** → `getColorRecommendation("success")` → success-600
- **Error/deletion** → `getColorRecommendation("error")` → danger-600
- **Warning/caution** → `getColorRecommendation("warning")` → warning-600
- **Info/help** → `getColorRecommendation("info")` → info-600
- **Text/body** → `getColorRecommendation("text")` → foreground-950
- **Page background** → `getColorRecommendation("background")` → background-50
- **Borders** → `getColorRecommendation("border")` → foreground-300

---

## Component Categories

### Interactive
- **Button** - Actions and CTAs

### Form
- **Input** - Text entry with types and validation

### Container
- **Card** - Content grouping and elevation

### Status
- **Badge** - Labels and status indicators

### Feedback
- **Alert** - Messages and notifications

---

## Design Tokens Quick Reference

### Color Families (7 total)
- `accent` - Primary, brand color
- `success` - Positive states, confirmations
- `danger` - Errors, destructive actions
- `warning` - Cautions, attention-needed
- `info` - Information, neutral messages
- `background` - Surfaces and containers
- `foreground` - Text, borders, icons

### Shades (All families)
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- Lower = lighter, Higher = darker

### Spacing Scale
- 0, 4, 8, 12, 16, 24, 32, 48, 64 (pixels)

### Typography Levels
- h1, h2, h3 (headings)
- body (paragraph text)
- caption (small text)

### Breakpoints
- mobile: 480px
- tablet: 768px
- desktop: 1024px
- wide: 1280px+

---

## Validation Rules

### Color Validation
- ✅ Must use semantic family (accent, success, danger, etc.)
- ✅ Must use valid shade (50-950)
- ✅ Must match semantic intent (danger for errors, etc.)
- ✅ Must meet WCAG AA contrast minimum

### Code Validation
- ✅ No arbitrary Tailwind colors (bg-blue-600, text-gray-900)
- ✅ No hex colors (#ffffff, #000000)
- ✅ No shadows, gradients, or dark: modifiers
- ✅ Only valid component props used
- ✅ Only valid components referenced

---

## Error Messages & Fixes

### Error: "Found arbitrary Tailwind colors: bg-blue-600"
**Fix:** `checkArbitraryColors()` reports which colors to replace
→ Use `getColorRecommendation()` to get correct semantic color

### Error: "Light shade (50) may have insufficient contrast for text"
**Fix:** `validateColorUsage()` warns about contrast
→ Use darker shade (700+) for text

### Error: "Component 'Modal' not found"
**Fix:** `validateComponentCode()` detects unknown components
→ Use `getAvailableComponents()` to see available components

### Error: "Destructive action should use danger semantic family"
**Fix:** `validateSemanticIntent()` catches semantic mismatches
→ Use `getColorRecommendation("danger")` instead

---

## Tips & Best Practices

### When generating code:
1. Start with `suggestComponents()` for component recommendations
2. Use `getComponentApi()` to verify prop names
3. Use `getColorRecommendation()` for color choices
4. Always call `validateComponentCode()` before returning

### When auditing code:
1. Start with `checkArbitraryColors()` to find violations
2. Use `validateSemanticIntent()` to check color meaning
3. Use `checkWcagContrast()` for accessibility
4. Report all issues found

### When implementing patterns:
1. Get pattern details with `getPatternComponents()`
2. Customize using component APIs from `getComponentApi()`
3. Use colors from `getColorRecommendation()`
4. Validate with `validateComponentCode()`

### Color selection priority:
1. Ask for semantic intent (primary, error, success, etc.)
2. Get recommendation with `getColorRecommendation()`
3. Validate with `validateColorUsage()` and `checkWcagContrast()`
4. Use the CSS variable in code

---

## Integration Checklist

- [ ] Before generating code: `suggestComponents()` + `getComponentApi()`
- [ ] Before using colors: `getColorRecommendation()` + `validateColorUsage()`
- [ ] Before returning code: `validateComponentCode()`
- [ ] Before using patterns: `getPatternComponents()` + `getComponentApi()`
- [ ] Before colors ship: `checkWcagContrast()` on all pairs

---

## Code Examples

### Example 1: Generate Button
```typescript
const comp = suggestComponents("delete button");
const api = getComponentApi("button");
const color = getColorRecommendation("danger");
const code = `<Button variant="danger">Delete</Button>`;
const validation = validateComponentCode(code);
```

### Example 2: Check Colors
```typescript
const tokens = getDesignTokens();
const recommendation = getColorRecommendation("primary");
const validation = validateColorUsage(recommendation.family, recommendation.shade, "button");
const contrast = checkWcagContrast("--accent-600", "--foreground-50");
```

### Example 3: Find Pattern
```typescript
const pattern = getPatternComponents("primary-button");
const api = getComponentApi(pattern.components[0]);
const validation = validateComponentCode(pattern.code);
```

### Example 4: Audit Code
```typescript
const colors = checkArbitraryColors(code);
const intent = validateSemanticIntent(code);
const validation = validateComponentCode(code);
const hasIssues = colors.issues.length + intent.issues.length + validation.issues.length > 0;
```

---

## One-Liners

```typescript
// Get all components
const all = getAvailableComponents();

// Get component API
const api = getComponentApi("button");

// Get design tokens
const tokens = getDesignTokens();

// Recommend components
const rec = suggestComponents("I need a delete button");

// Find a pattern
const pattern = getPatternComponents("success-message");

// Get color for intent
const color = getColorRecommendation("success");

// Check if color is valid
const valid = validateColorUsage("success", 600, "background");

// Validate code
const check = validateComponentCode(code);

// Find arbitrary colors
const bad = checkArbitraryColors(code);

// Validate semantic intent
const semantic = validateSemanticIntent(code);

// Check contrast
const contrast = checkWcagContrast("--foreground-950", "--background-50");
```

---

## Next: Phase 4 Workflows

Once these tools are integrated, Phase 4 will add workflows:
- `design-component()` - Full component generation workflow
- `design-layout()` - Layout composition workflow
- `design-form()` - Form building workflow
- `design-page()` - Full page design workflow

Workflows will orchestrate these tools automatically!
