# Design Tokens

Source of truth for colors, spacing, typography, and visual properties. Based on Tailwind 4's `@theme` system.

## Color System

UI Lab uses a semantic color system with CSS variables. Colors are defined in OKLCH color space for perceptual uniformity.

### Color Families

| Family | Shades | Intent | Use For |
|--------|--------|--------|---------|
| **foreground** | 50-600 | Text, icons, borders | Primary text, secondary text, borders, icons |
| **background** | 500-950 | Surfaces | Page backgrounds, cards, containers, overlays |
| **accent** | 50-600 | Brand, primary actions | CTAs, links, focus rings, brand elements |
| **success** | 50-600 | Positive outcomes | Success messages, confirmations, valid states |
| **danger** | 50-600 | Errors, destructive | Error messages, delete actions, invalid states |
| **warning** | 50-600 | Caution, pending | Warnings, pending states, attention needed |
| **info** | 50-600 | Information | Help text, tips, informational messages |

### Shade Scale

**Foreground/Accent/Semantic (50-600):**
```
50   - Lightest (text on dark backgrounds)
100  - Very light
200  - Light
300  - Light-medium (default body text)
400  - Medium (secondary text)
500  - Medium-dark
600  - Dark (buttons, strong emphasis)
```

**Background (500-950):**
```
500  - Medium (rarely used)
600  - Medium-dark
700  - Dark (borders, dividers)
800  - Very dark (card backgrounds)
900  - Near-black (elevated surfaces)
950  - Darkest (page background)
```

### CSS Variable Patterns

Two naming conventions exist in the system:

```css
/* Base variables (used in component CSS) */
--foreground-300
--background-950
--accent-600

/* Tailwind theme variables (used with color utilities) */
--color-foreground-300
--color-background-950
--color-accent-600
```

### Usage Examples

```tsx
// Using Tailwind color utilities
<div className="bg-background-900 text-foreground-300 border-background-700">

// Using arbitrary values with CSS variables
<div className="bg-[var(--background-900)] text-[var(--foreground-300)]">

// In CSS Modules
.container {
  background: var(--background-900);
  color: var(--foreground-300);
  border-color: var(--background-700);
}
```

### Common Color Mappings

| Context | Recommended Token |
|---------|-------------------|
| Page background | `background-950` |
| Card/surface background | `background-900` or `background-800` |
| Borders, dividers | `background-700` |
| Primary body text | `foreground-300` |
| Secondary text | `foreground-400` or `foreground-500` |
| Headings, emphasis | `foreground-100` or `foreground-200` |
| Muted text | `foreground-500` |
| Primary button | `accent-600` |
| Success indicator | `success-500` or `success-600` |
| Error/danger | `danger-500` or `danger-600` |
| Warning | `warning-500` or `warning-600` |
| Info | `info-500` or `info-600` |

---

## Typography System

UI Lab uses a **dual-scale typography system** with separate scales for headers and body text.

### Body Text Scale

```css
--text-xs:  0.875rem
--text-sm:  1.000rem
--text-md:  1.000rem (base)
--text-lg:  clamp(1.125rem, 2.16vw, 1.380rem)
--text-xl:  clamp(1.250rem, 2.59vw, 1.656rem)
--text-2xl: clamp(1.500rem, 3.11vw, 1.987rem)
--text-3xl: clamp(1.763rem, 3.73vw, 2.385rem)
--text-4xl: clamp(2.115rem, 4.48vw, 2.862rem)
--text-5xl: clamp(2.538rem, 5.37vw, 3.434rem)
```

### Header Text Scale

```css
--header-text-xs:  0.875rem
--header-text-sm:  1.000rem
--header-text-md:  1.000rem
--header-text-lg:  clamp(1.125rem, 2.16vw, 1.380rem)
--header-text-xl:  clamp(1.250rem, 2.59vw, 1.656rem)
--header-text-2xl: clamp(1.500rem, 3.11vw, 1.987rem)
--header-text-3xl: clamp(1.763rem, 3.73vw, 2.385rem)
--header-text-4xl: clamp(2.115rem, 4.48vw, 2.862rem)
--header-text-5xl: clamp(2.538rem, 5.37vw, 3.434rem)
```

### Font Weights

**Header weights:**
```css
--font-weight-header-thin: 100
--font-weight-header-extralight: 200
--font-weight-header-light: 300
--font-weight-header-normal: 400
--font-weight-header-medium: 500
--font-weight-header-semibold: 600
--font-weight-header-bold: 700
--font-weight-header-extrabold: 800
--font-weight-header-black: 900
```

**Body weights:**
```css
--font-weight-body-thin: 100
--font-weight-body-extralight: 200
--font-weight-body-light: 300
--font-weight-body-normal: 400
--font-weight-body-medium: 500
--font-weight-body-semibold: 600
--font-weight-body-bold: 700
--font-weight-body-extrabold: 800
--font-weight-body-black: 900
```

### Letter Spacing

```css
--letter-spacing-xs:   -0.0150em
--letter-spacing-sm:   -0.0100em
--letter-spacing-md:   -0.0050em
--letter-spacing-base:  0.0000em
--letter-spacing-lg:    0.0050em
--letter-spacing-xl:    0.0100em
--letter-spacing-2xl:   0.0150em
--letter-spacing-3xl:   0.0200em
--letter-spacing-4xl:   0.0250em
--letter-spacing-5xl:   0.0300em
```

### Font Families

```css
--font-sans: "Karla", system-ui, sans-serif
--font-mono: "Ioskeley Mono", monospace
```

### Typography Utilities

```tsx
// Body text sizes
<p className="text-sm">Small body text</p>
<p className="text-md">Default body text</p>
<p className="text-lg">Large body text</p>

// Header text sizes
<h1 className="text-header-xl">Page Title</h1>
<h2 className="text-header-lg">Section Header</h2>
<h3 className="text-header-md">Subsection</h3>
```

---

## Spacing System

Components use semantic gap tokens rather than pixel values.

### Gap Scale (for Flex/Grid components)

| Token | Approximate Size |
|-------|------------------|
| `xs` | Extra small gap |
| `sm` | Small gap |
| `md` | Medium gap (default) |
| `lg` | Large gap |
| `xl` | Extra large gap |

### Usage

```tsx
<Flex gap="md">...</Flex>
<Grid gap="lg" rowGap="sm">...</Grid>
```

### Tailwind Spacing

Standard Tailwind spacing utilities work with the design system:
```tsx
<div className="p-4 m-2 gap-3">
```

---

## Border Radius

```css
--radius-xs:   0.05rem
--radius-sm:   0.1rem
--radius-base: 0.2rem
--radius-md:   0.3rem
--radius-lg:   0.5rem
--radius-xl:   0.75rem
--radius-2xl:  1rem
--radius-full: 9999px
```

### Usage

```tsx
<div className="rounded">      // base
<div className="rounded-sm">   // small
<div className="rounded-md">   // medium
<div className="rounded-lg">   // large
<div className="rounded-full"> // pill/circle
```

---

## Border Width

```css
--border-width-none: 0
--border-width-thin: 1px
--border-width-base: 1px
--border-width-2: 2px
--border-width-4: 4px
--border-width-8: 8px
```

---

## Animation & Easing

### Easing Functions

```css
--ease-smooth-settle: cubic-bezier(0.25, 0.46, 0.45, 0.94)
--ease-snappy-pop:    cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-gentle-ease:   cubic-bezier(0.43, 0.13, 0.23, 0.96)
```

### Usage

```tsx
import { EASING_FUNCTIONS, getEasingByKey } from 'ui-lab-components';
```

---

## Layout Variables

```css
--header-height: 3.50rem
--page-width: 2400px
--logo-width: 250px
--spacing-scale: 1
```

---

## Quick Reference

| Need | Token/Utility |
|------|---------------|
| Dark page background | `bg-background-950` |
| Card background | `bg-background-900` |
| Border color | `border-background-700` |
| Primary text | `text-foreground-300` |
| Heading text | `text-foreground-100` |
| Muted text | `text-foreground-500` |
| Primary action | `accent-600` |
| Success state | `success-500` |
| Error state | `danger-500` |
| Warning state | `warning-500` |
| Info state | `info-500` |
