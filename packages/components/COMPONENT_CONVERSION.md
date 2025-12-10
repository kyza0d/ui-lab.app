# Component Conversion: CVA → CSS Module + CSS Variables (Strict Edition)

Convert any React component currently using **Class Variance Authority (CVA)** into a **type-safe CSS Module pattern** powered by **semantic CSS custom properties** and scoped styles.

This pattern maximizes themeability, accessibility, and maintainability while keeping full TypeScript safety.

### File Structure (Required for Every Component)
1. `[Component].tsx` – Main React component with `forwardRef`
2. `[Component].module.css` – Scoped styles using CSS variables + minimal `@apply`
3. `[Component].module.css.d.ts` – TypeScript declarations for the CSS module

---

## CRITICAL RULES FOR CSS MODULES

### ❌ COMMON MISTAKES TO AVOID

#### 1. **NEVER use `@apply` with font sizes**
```css
/* ❌ WRONG */
.button.sm {
  @apply text-sm font-md;
}

/* ✅ CORRECT */
.button.sm {
  font-size: var(--text-sm);
}
```

#### 2. **NEVER use opacity syntax with CSS variables**
```css
/* ❌ WRONG - This will not work */
--foreground: var(--accent-500 / 0.5);
color: var(--accent-500 / 0.5);

/* ✅ CORRECT - Use color-mix for transparent variants */
color: color-mix(in srgb, var(--accent-500) 15%, transparent);
```

#### 3. **Use full CSS property names, NOT Tailwind abbreviations**
```css
/* ❌ WRONG */
background: bg-primary;
border: bd-primary;

/* ✅ CORRECT */
background: var(--background);
background-color: var(--accent-500);
border: var(--border-width-base) solid var(--border);
```

#### 3a. **Always use `var(--border-width-base)` for border widths**
```css
/* ❌ WRONG */
border: 1px solid var(--border);
border-top: 2px solid var(--border);

/* ✅ CORRECT */
border: var(--border-width-base) solid var(--border);
border-top: var(--border-width-base) solid var(--border);
```

#### 3b. **Always use `var(--radius-*)` for border radius**
```css
/* ❌ WRONG */
border-radius: 0.375rem;
border-radius: 4px;
border-radius: 50%;

/* ✅ CORRECT */
border-radius: var(--radius-md);
border-radius: var(--radius-lg);
border-radius: var(--radius-full);
```

#### 4. **Only use `@apply` for spacing and layout utilities**
```css
/* ✅ ALLOWED with @apply */
@apply px-3 py-1.5;      /* padding */
@apply mx-2 my-4;        /* margin */
@apply flex items-center justify-center;  /* layout */
@apply gap-2;            /* gap */

/* ❌ NEVER with @apply */
@apply bg-primary;       /* colors - use variables */
@apply text-primary;     /* colors - use variables */
@apply text-sm;          /* font-size - use variables */
@apply text-bold;        /* font-weight - use variables */
@apply border-primary;   /* borders - use variables */
```

#### 5. **No comments or unnecessary blank lines**
```css
/* ❌ AVOID - Comments clutter the code */
.button {
  /* This sets the background */
  background: var(--background);
}

/* ✅ CLEAN - Self-documenting code */
.button {
  background: var(--background);
  color: var(--foreground);
}
```

---

## CSS MODULE STRUCTURE

### Required Header
```css
@reference "tailwindcss";

@layer components {
  /* All styles here */
}
```

### Base Class Pattern
Every component **must** have a base class that defines:
1. All semantic CSS variables (--background, --foreground, --border, etc.)
2. Base styles using those variables
3. Interactive states (focus, hover, active, disabled)

```css
@reference "tailwindcss";

@layer components {
  .button {
    /* Semantic CSS variables */
    --background: var(--accent-500);
    --foreground: var(--accent-50);
    --border: var(--accent-500);
    --background-hover: var(--accent-600);
    --border-hover: var(--accent-600);
    --background-active: var(--accent-700);
    --border-active: var(--accent-700);

    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;

    /* Typography - NEVER @apply for font-size */
    font-family: inherit;
    font-weight: 500;
    font-size: var(--text-md);
    line-height: var(--leading-snug);

    /* Spacing - ALLOWED with @apply */
    @apply px-3 py-1.5;

    /* States */
    user-select: none;
    cursor: pointer;
    background-color: var(--background);
    color: var(--foreground);
    border: var(--border-width-base) solid var(--border);
    border-radius: var(--radius-md);

    /* Focus - always use focus-visible */
    &:focus-visible {
      outline: 2px solid var(--blue);
      outline-offset: 2px;
    }

    /* Disabled */
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Hover and active states */
    @media (hover: hover) {
      &:hover:not(:disabled) {
        background-color: var(--background-hover);
        border-color: var(--border-hover);
      }
    }

    &:active:not(:disabled) {
      background-color: var(--background-active);
      border-color: var(--border-active);
    }
  }

  /* Variant classes - ONLY override CSS variables */
  .button.secondary {
    --background: var(--background-800);
    --foreground: var(--foreground-50);
    --border: var(--background-700);
    --background-hover: var(--background-700);
    --border-hover: var(--background-700);
    --background-active: var(--background-600);
    --border-active: var(--background-600);
  }

  /* Size classes - ONLY spacing, NEVER font-size with @apply */
  .button.sm {
    @apply px-2.5 py-1;
    font-size: var(--text-sm);
  }

  .button.md {
    @apply px-3 py-1.5;
    font-size: var(--text-md);
  }

  .button.lg {
    @apply px-4 py-2;
    font-size: var(--text-lg);
  }
}
```

---

### Semantic CSS Variables Reference

Use these semantic variable naming patterns:

```
Color/State Variables:
--background          /* Primary background color */
--foreground          /* Primary text/content color */
--border              /* Border color */
--background-hover    /* Hover state background */
--border-hover        /* Hover state border */
--background-active   /* Active state background */
--border-active       /* Active state border */

Opacity/Transparency (use color-mix):
color-mix(in srgb, var(--accent-500) 15%, transparent)  /* 15% opacity */
color-mix(in srgb, var(--accent-500) 50%, transparent)  /* 50% opacity */

Layout/Typography:
--text-sm             /* Font size small */
--text-md             /* Font size medium */
--text-lg             /* Font size large */
--leading-snug        /* Line height */
--radius-md           /* Border radius */
--border-width-base   /* Border width */
```

---

### Class Naming Conventions

- **Base class**: `.button`, `.checkbox`, `.radio` (component name, singular, lowercase)
- **Variants**: `.button.primary`, `.button.secondary` (class + variant modifier)
- **Sizes**: `.button.sm`, `.button.md`, `.button.lg` (class + size modifier)
- **States**: Use data attributes or pseudo-classes, NOT separate classes
  ```css
  .radio[data-checked="true"] { }
  .radio[data-disabled] { }
  .radio[data-error="true"] { }
  ```

---

## TypeScript Type Declarations

```ts
declare const styles: {
  button: string;
  "button.primary": string;
  "button.secondary": string;
  "button.sm": string;
  "button.md": string;
  "button.lg": string;
};

export default styles;
```

---

## React Component Pattern

```tsx
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
}

const variantMap: Record<Variant, string> = {
  primary: "primary",
  secondary: "secondary",
};

const sizeMap: Record<Size, string> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[`button.${variantMap[variant]}`],
          styles[`button.${sizeMap[size]}`],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

---

## CSS Module Output Checklist

Before considering a CSS module complete, verify:

- [ ] `@reference "tailwindcss"` at the top
- [ ] Everything wrapped in `@layer components { }`
- [ ] Base class defines all semantic CSS variables
- [ ] NO `@apply` used with `text-`, `bg-`, `border-`, `shadow-`, `ring-` utilities
- [ ] Font sizes use `font-size: var(--text-*)` NOT `@apply text-*`
- [ ] Opacity uses `color-mix()` NOT `var(--color / 0.5)` syntax
- [ ] All colors use CSS variables, never Tailwind classes
- [ ] Only `@apply` used for: spacing (p-, m-, gap), layout (flex, grid), radius (rounded-)
- [ ] No comments or blank lines unless essential for readability
- [ ] Interactive states (hover, active, disabled, focus-visible) properly implemented
- [ ] Consistent property ordering: variables → layout → typography → spacing → states

---

## Accessibility Requirements (Non-Negotiable)

- Always include `:focus-visible` with proper outline or box-shadow
- Proper `cursor: pointer` on interactive elements
- `cursor: not-allowed` with disabled state
- Sufficient contrast via semantic design system variables
- Support keyboard navigation with visible focus states

---

**Reference implementations:** `button.module.css`, `radio.module.css`
