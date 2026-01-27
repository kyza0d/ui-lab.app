# Design Tokens

Source of truth for colors, spacing, and typography. Use `getDesignTokens()` for programmatic access.

## Color Families

7 semantic families with varying shade ranges.

| Family | Range | Intent | Use For |
|--------|-------|--------|---------|
| **accent** | 50-600 | Primary, brand | Main CTAs, links, brand elements |
| **success** | 50-600 | Positive | Success messages, confirmations |
| **danger** | 50-600 | Error, destructive | Errors, delete actions, warnings |
| **warning** | 50-600 | Caution | Warnings, pending states |
| **info** | 50-600 | Information | Help text, tips, info messages |
| **background** | 600-950 | Surfaces | Page, card, container backgrounds |
| **foreground** | 50-600 | Text, borders | Body text, labels, borders |

## Shade Scale

Available ranges by family:

**Foreground, Accent, Info, Danger, Warning, Success:** 50-600
```
50   - Lightest
100  - Very light
200  - Light
300  - Light-medium
400  - Medium-light
500  - Medium
600  - Medium-dark (buttons, icons)
```

**Background:** 600-950
```
600  - Medium-dark
700  - Dark
800  - Very dark
900  - Near-black
950  - Darkest
```

## CSS Variable Pattern

```css
--family-shade

/* Examples */
--accent-600      /* Primary button */
--danger-600      /* Error text */
--foreground-200  /* Body text */
--background-950  /* Page background */
```

## Spacing Scale

Fixed values only:

```
0, 4, 8, 12, 16, 24, 32, 48, 64 (px)
```

Map to Tailwind: `gap-1` (4px), `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)

## Typography Scale

| Level | Size | Weight | Use For |
|-------|------|--------|---------|
| h1 | 2rem | 700 | Page titles |
| h2 | 1.5rem | 700 | Section headers |
| h3 | 1.25rem | 600 | Card titles |
| body | 1rem | 400 | Body text |
| caption | 0.875rem | 400 | Helper text, labels |

## Quick Reference

| Context | Recommended |
|---------|-------------|
- [x] | Primary text | foreground-200 |
| Secondary text | foreground-400 |
| Borders | background-700 |
| Page background | background-950 |
| Card background | background-900 |
| Primary button | accent-600 |
| Danger button | danger-600 |
| Success message bg | success-600 |
| Error message bg | danger-600 |
