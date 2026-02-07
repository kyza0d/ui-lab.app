# Design Tokens

Source of truth for colors, spacing, typography, and visual properties. Based on Tailwind 4's `@theme` system.

---

## Colors

Seven semantic color families with **shades 50-600** (lighter to darker):

| Family | Intent | Use For |
|--------|--------|---------|
| **foreground** | Text, icons, borders | Body text, headings, icons, dividers |
| **background** | Surfaces | Pages, cards, containers, overlays |
| **accent** | Brand, primary actions | CTAs, links, focus rings |
| **success** | Positive outcomes | Confirmations, valid states |
| **danger** | Errors, destructive | Errors, delete actions |
| **warning** | Caution, pending | Warnings, pending states |
| **info** | Information | Help text, tips |

**Shade scale (50-600):**
- `50` = Lightest (text on dark)
- `100-300` = Light/Medium (body text range)
- `400-500` = Medium/Medium-dark (secondary text)
- `600` = Dark (strong emphasis, buttons)

**Background shades (500-950):**
- `600` = Medium-dark
- `700` = Dark (borders, dividers)
- `800` = Very dark (card backgrounds)
- `900` = Near-black (elevated surfaces)
- `950` = Darkest (page background)

**Usage:**
```tsx
// Tailwind utilities
<div className="bg-background-900 text-foreground-300 border-background-700">

// CSS variables
.element { background: var(--background-900); color: var(--foreground-300); }

// Also available with --color- prefix for Tailwind's @theme system
```

**Common mappings:**
- Page background: `background-950`
- Card background: `background-900` or `800`
- Borders: `background-700`
- Primary text: `foreground-300`
- Secondary text: `foreground-400` or `500`
- Headings: `foreground-100` or `200`
- Muted: `foreground-500`
- Primary button: `accent-600`
- Success/danger/warning/info: Use `-500` or `-600`

---

## Typography

**Text sizes (body & headers use same scale):**
```
xs, sm, md (base), lg, xl, 2xl, 3xl, 4xl, 5xl
```

Size details:
```css
text-xs:  0.875rem
text-sm:  1.000rem
text-md:  1.000rem (base)
text-lg:  clamp(1.125rem, 2.16vw, 1.38rem)
text-xl:  clamp(1.250rem, 2.59vw, 1.66rem)
text-2xl: clamp(1.500rem, 3.11vw, 1.99rem)
text-3xl: clamp(1.763rem, 3.73vw, 2.39rem)
text-4xl: clamp(2.115rem, 4.48vw, 2.86rem)
text-5xl: clamp(2.538rem, 5.37vw, 3.43rem)
```

**Font families:**
```css
--font-sans: "Karla", system-ui, sans-serif
--font-mono: "Ioskeley Mono", monospace
```

**Font weights (100-900):**
thin, extralight, light, normal, medium, semibold, bold, extrabold, black

**Letter spacing:**
```
xs (-0.015em), sm (-0.01em), md (-0.005em), base (0), lg (0.005em),
xl (0.01em), 2xl (0.015em), 3xl (0.02em), 4xl (0.025em), 5xl (0.03em)
```

**Usage:**
```tsx
<h1 className="text-header-xl font-semibold">Page Title</h1>
<p className="text-md text-foreground-300">Body text</p>
<h3 className="text-header-md">Subsection</h3>
```

---

## Spacing

**Semantic gap tokens** (for Flex/Grid):
- `xs` = Extra small
- `sm` = Small
- `md` = Medium (default)
- `lg` = Large
- `xl` = Extra large

```tsx
<Flex gap="md">...</Flex>
<Grid gap="lg" rowGap="sm">...</Grid>
<div className="p-4 m-2 gap-3">  // Standard Tailwind spacing also works
```

---

## Border & Radius

**Border radius:**
```css
xs (0.05rem), sm (0.1rem), base (0.2rem), md (0.3rem),
lg (0.5rem), xl (0.75rem), 2xl (1rem), full (pill/circle)
```

**Border width:**
```css
none (0), thin (1px), base (1px), 2 (2px), 4 (4px), 8 (8px)
```

**Usage:**
```tsx
<div className="rounded-md border border-background-700">
```

---

## Animation

**Easing functions:**
```css
--ease-smooth-settle: cubic-bezier(0.25, 0.46, 0.45, 0.94)
--ease-snappy-pop:    cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-gentle-ease:   cubic-bezier(0.43, 0.13, 0.23, 0.96)
```

---

## Layout

```css
--header-height: 3.50rem
--page-width: 2400px
--logo-width: 250px
--spacing-scale: 1
```

---

## Quick Reference

| Use Case | Token |
|----------|-------|
| Page background | `bg-background-950` |
| Card/surface | `bg-background-900` |
| Borders | `border-background-700` |
| Primary text | `text-foreground-300` |
| Headings | `text-foreground-100` |
| Muted text | `text-foreground-500` |
| Primary button | `accent-600` |
| Success | `success-500` |
| Error | `danger-500` |
| Warning | `warning-500` |
| Info | `info-500` |
