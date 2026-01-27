---
name: build-ui-lab
description: Build UI with semantic design intent using UI Lab components. Tools query design/ folder for tokens, patterns, and component APIs.
---

<objective>
Build consistent, accessible UI by starting with semantic intent ("what does this communicate?") and using design system constraints. Tools read from design/ folder as source of truth.
</objective>

<intake>
What would you like to do?

1. **Generate** - Create a component, layout, or UI section
2. **Refactor** - Transform existing code to use semantic design
3. **Review** - Audit code for design system compliance
4. **Learn** - Understand design philosophy and patterns

Or describe what you need: "Create a delete confirmation modal", "Show me how to build a form with validation"
</intake>

<routing>

| Intent | Action | Tools |
|--------|--------|-------|
| Generate | Design-first component creation | `suggestComponents` → `getComponentApi` → `getColorRecommendation` → `validateComponentCode` |
| Refactor | Transform to semantic design | `checkArbitraryColors` → `getColorRecommendation` → `validateSemanticIntent` |
| Review | Audit for compliance | `checkArbitraryColors` → `validateSemanticIntent` → `checkWcagContrast` → `validateComponentCode` |
| Learn | Explain concepts | `getDesignTokens` → `getAvailableComponents` → `getPatternComponents` |

</routing>

<core_principles>

**Semantic Intent First** - Every color choice answers "what does this communicate?" not "what color looks good?"

**Component APIs Over CSS** - Use component props and variants. Never override with arbitrary Tailwind classes.

**Design Tokens As Constraints** - Colors use `--family-shade` CSS variables. Spacing uses fixed scale. These are constraints, not suggestions.

**design/ Folder Is Truth** - All design decisions reference:
- `design/tokens.md` - Color families, spacing, typography
- `design/patterns.md` - Common UI patterns with rationale
- `design/guidelines.md` - Philosophy and rules
- `design/components.md` - Component registry and APIs

</core_principles>

<tool_reference>
See **TOOLS.md** for complete tool documentation with parameters, return types, and examples.

### Quick Reference

| Need | Tool |
|------|------|
| List components | `getAvailableComponents()` |
| Component API | `getComponentApi(name)` or `getComponentProps(name)` |
| Design tokens | `getDesignTokens()` |
| Find component | `searchComponents(query)` or `suggestComponents(description)` |
| Get pattern | `getPatternComponents(patternName)` |
| Color for intent | `getColorRecommendation(intent)` |
| Validate color | `validateColorUsage(family, shade, context)` |
| Validate code | `validateComponentCode(code)` |
| Find bad colors | `checkArbitraryColors(code)` |
| Check semantics | `validateSemanticIntent(code)` |
| Check contrast | `checkWcagContrast(fg, bg)` |

</tool_reference>

<success_criteria>

A successful output will have:
- All colors using CSS variables (`--family-shade`)
- Component props handling behavior (not CSS overrides)
- Semantic reasoning for design choices
- Code that passes `validateComponentCode()`

</success_criteria>
