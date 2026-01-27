# Build UI Lab Skill

Semantic design-driven UI with UI Lab components.

## Files

| File | Purpose |
|------|---------|
| SKILL.md | Router - intake, routing, principles |
| TOOLS.md | Tool index and workflows |
| design/ | Source of truth |

## design/ Folder

```
design/
├── components.md   # Component index (use getComponentApi for details)
├── tokens.md       # Color families, spacing, typography
├── patterns.md     # UI patterns with rationale
└── guidelines.md   # Philosophy and rules
```

## Core Pattern

1. **Semantic Intent** - "What does this communicate?"
2. **Component APIs** - Use props, not CSS overrides
3. **Design Tokens** - `--family-shade` CSS variables

## Quick Workflow

```
Generate:  suggestComponents → getComponentApi → validateComponentCode
Audit:     checkArbitraryColors → validateSemanticIntent
Pattern:   getPatternComponents → getComponentApi
```

## Color Families

| Family | Intent |
|--------|--------|
| accent | Primary, brand |
| success | Positive |
| danger | Error, destructive |
| warning | Caution |
| info | Information |
| background | Surfaces |
| foreground | Text, borders |
