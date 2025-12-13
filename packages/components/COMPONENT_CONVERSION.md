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

#### 1. **Use "use client" Directive**

All React Aria components must run in the client:

```tsx
"use client";

import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";
```

#### 2. **Simple Components: Direct Hook Usage**

For simple components (Button, Checkbox), use hooks directly:

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isDisabled, variant, size, ...props }, ref) => {
    const { buttonProps, isPressed } = useButton({ isDisabled }, ref);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled });

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        ref={ref}
        data-variant={variant}
        data-size={size}
        data-disabled={isDisabled || undefined}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focus-visible={isFocusVisible || undefined}
        className={cn(styles.button, variantMap[variant], sizeMap[size])}
        {...props}
      >
        {children}
      </button>
    );
  }
);
```

#### 3. **Complex Components: Use Context for Child State**

For components with multiple children (Slider, Select), use Context to avoid prop drilling:

```tsx
const SliderContext = React.createContext<{
  size: SliderSize;
  disabled?: boolean;
} | null>(null);

const Root = React.forwardRef<HTMLDivElement, SliderRootProps>(
  ({ size = 'md', disabled, onValueChange, min = 0, max = 100, ...props }, ref) => {
    const [values, setValues] = React.useState([50]);

    return (
      <SliderContext.Provider value={{ size, disabled }}>
        <div
          ref={ref}
          data-size={size}
          data-disabled={disabled || undefined}
          className={cn(styles.slider)}
          {...props}
        >
          {/* Render track, range, and thumbs here */}
        </div>
      </SliderContext.Provider>
    );
  }
);
```

#### 4. **Use Data Attributes for Styling States**

Always use data attributes (not class names) for state-based styling:

```tsx
<button
  data-pressed={isPressed || undefined}      // Rendered when true
  data-hovered={isHovered || undefined}      // Rendered when true
  data-focus-visible={isFocusVisible || undefined}
  data-disabled={isDisabled || undefined}
  className={styles.button}
/>

// CSS targets data attributes
.button[data-focus-visible] {
  outline: 2px solid var(--blue);
}

.button[data-pressed] {
  background-color: var(--background-active);
}

.button[data-disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
```

#### 5. **Handle Multiple Refs with useMergedRef Helper**

When forwardRef is used with internal refs:

```tsx
function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return React.useCallback((value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
    });
  }, refs);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = useMergedRef(ref, buttonRef);

    const { buttonProps } = useButton(options, buttonRef);

    return <button ref={mergedRef} {...buttonProps} {...props} />;
  }
);
```

### Common React Aria Hooks and Props

These are the most common hooks used in component conversion:

| Hook | Returns | Use Case |
|------|---------|----------|
| `useButton(options, ref)` | `{ buttonProps, isPressed }` | Button components |
| `useFocusRing(options)` | `{ focusProps, isFocusVisible, isFocused }` | Focus styling for any element |
| `useHover(options)` | `{ hoverProps, isHovered }` | Hover state detection |
| `useCheckbox(options, ref)` | `{ inputProps, isSelected, isIndeterminate }` | Checkbox components |
| `useSwitch(options, ref)` | `{ inputProps, isSelected }` | Toggle/Switch components |
| `mergeProps(...objects)` | Merged props object | Combine multiple hook prop objects |

**Key Naming Conventions:**
- Props: `isDisabled`, `isSelected`, `isIndeterminate` (boolean prefix)
- Callbacks: `onPress`, `onChange`, `onFocusChange`
- State: `isPressed`, `isFocusVisible`, `isHovered`, `isSelected`

### CSS Module Patterns for React Aria Hooks

Style components using data attributes set by hook state variables:

```css
@reference "tailwindcss";

@layer components {
  /* Base component */
  .button {
    --background: var(--accent-500);
    --foreground: var(--accent-50);

    @apply px-3 py-1.5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-md);
    background-color: var(--background);
    color: var(--foreground);
    border: var(--border-width-base) solid var(--background);
    border-radius: var(--radius-md);
    cursor: pointer;
  }

  /* Variant via data attributes */
  .button[data-variant="secondary"] {
    --background: var(--background-700);
    --foreground: var(--foreground-50);
  }

  /* Size via data attributes */
  .button[data-size="sm"] {
    @apply px-2.5 py-1;
    font-size: var(--text-sm);
  }

  .button[data-size="lg"] {
    @apply px-4 py-2;
    font-size: var(--text-lg);
  }

  /* Hover state - checked via hook */
  @media (hover: hover) {
    .button[data-hovered]:not([data-disabled]) {
      --background: var(--accent-600);
    }
  }

  /* Pressed state - checked via hook */
  .button[data-pressed]:not([data-disabled]) {
    --background: var(--accent-700);
  }

  /* Focus state - checked via hook */
  .button[data-focus-visible] {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }

  /* Disabled state - checked via hook */
  .button[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Example: Checkbox with data attributes */
  .base {
    --background: var(--background-800);
    --ring-color: var(--accent-500);

    @apply w-5 h-5 cursor-pointer transition-all flex-shrink-0;
    appearance: none;
    background-color: var(--background);
    border-radius: var(--radius-md);
  }

  /* Checked state - from hook or input */
  .base[data-selected="true"] {
    --background: var(--accent-500);
  }

  .base[data-selected="true"]::after {
    content: "✓";
    color: var(--accent-50);
    font-weight: 700;
  }

  /* Focus state - from hook */
  .base[data-focused="true"] {
    box-shadow: 0 0 0 3px var(--ring-color);
  }

  /* Disabled state - from hook */
  .base[data-disabled="true"] {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
```

### React Aria Migration Checklist

Before completing a React Aria migration:

- [ ] **SSR Safe**: Import hooks from `react-aria` 
- [ ] **Client Directive**: Add `"use client"` at the top of the file
- [ ] **Hooks Setup**: Use `useButton`, `useFocusRing`, `useHover`, etc. from `react-aria`
- [ ] **Props Merging**: Use `mergeProps()` to combine hook prop objects
- [ ] **Native Elements**: Render native HTML elements (`<button>`, `<input>`, `<div>`, etc.)
- [ ] **Data Attributes**: Add `data-*` attributes for all hook state (isPressed, isFocusVisible, isHovered, isDisabled)
- [ ] **Context (if needed)**: Use React Context for complex components with multiple children
- [ ] **Ref Handling**: Use `useMergedRef` helper when combining forwardRef with internal refs
- [ ] **CSS Module**: Update styles to target data attributes, not class names
- [ ] **Accessibility**: Verify with keyboard navigation, screen readers, and ARIA attributes
- [ ] **Testing**: Test all states: focus, hover, active, pressed, disabled, indeterminate

### Reference Implementations

- **Button Component** (`button.tsx`, `button.module.css`): Simple hooks-based pattern with `useButton`, `useFocusRing`, `useHover`
- **Checkbox Component** (`checkbox.tsx`, `checkbox.module.css`): Input-based pattern with state management and data attributes
- **Slider Component** (`slider.tsx`, `slider.module.css`): Complex multi-child component with Context and custom state logic

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
