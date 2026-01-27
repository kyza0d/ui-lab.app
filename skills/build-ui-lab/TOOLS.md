# Tools Reference

13 tools organized by phase. Tools read from `design/` folder as source of truth.

## Tool Index

### Phase 1: Core Infrastructure
| Tool | Purpose |
|------|---------|
| `getAvailableComponents()` | List all components with categories |
| `getComponentProps(name)` | Get props for a specific component |
| `getDesignTokens()` | Get color families, spacing, typography |
| `validateColorUsage(family, shade, context)` | Check if color choice is valid |
| `validateComponentCode(code)` | Validate code against design system |

### Phase 2: MCP Integration
| Tool | Purpose |
|------|---------|
| `searchComponents(query)` | Find components by keyword |
| `suggestComponents(description)` | Get component recommendations |
| `getComponentApi(name)` | Full API docs with examples |
| `getPatternComponents(patternName)` | Get pattern code and rationale |

### Phase 3: Design Validation
| Tool | Purpose |
|------|---------|
| `checkArbitraryColors(code)` | Detect non-semantic colors |
| `getColorRecommendation(intent)` | Get color for semantic intent |
| `validateSemanticIntent(code)` | Check colors match meaning |
| `checkWcagContrast(fg, bg)` | Verify accessibility |

## Workflows

### Generate UI
```
suggestComponents("delete button")
  → getComponentApi("button")
  → getColorRecommendation("error")
  → validateComponentCode(code)
```

### Audit Code
```
checkArbitraryColors(code)
  → validateSemanticIntent(code)
  → checkWcagContrast(fg, bg)
```

### Implement Pattern
```
getPatternComponents("success-message")
  → getComponentApi("alert")
  → validateComponentCode(code)
```

## Semantic Intents

| Intent | Returns |
|--------|---------|
| `primary` | accent-500 |
| `success` | success-500 |
| `error` | danger-500 |
| `warning` | warning-500 |
| `info` | info-500 |
| `text` | foreground-300 |
| `background` | background-950 |
| `border` | background-700 |

## Available Patterns

- `success-message` - Alert success variant
- `error-message` - Alert danger variant
- `form-field` - Input with label
- `primary-button` - Button primary variant
- `danger-button` - Button danger variant
- `status-badge` - Badge with semantic variant
- `card-with-title` - Card with title
- `confirmation-dialog` - Dialog with cancel/confirm

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
```
