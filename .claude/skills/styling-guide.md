# Styling & CSS Architecture Guide Generator

## Purpose
Generate comprehensive documentation about UI Lab's styling system, CSS variable architecture, and component styling patterns. This skill creates educational content that teaches developers how to understand and work with the project's styling approach.

## Responsibilities
- Document the CSS Modules pattern used throughout the project
- Explain the semantic CSS variable system (colors, typography, spacing, etc.)
- Document data attributes for styling interactive states
- Explain Tailwind CSS integration and @apply usage
- Provide styling patterns and examples
- Document theme customization and CSS variable overrides
- Create guides for extending component styling

## Output Requirements
- **Accurate Technical Content**: All CSS variables and patterns verified from actual source code
- **Code Examples**: Show real CSS Module patterns from actual components
- **Visual Organization**: Use clear headings, tables for variable reference, code blocks for examples
- **Copy-Paste Friendly**: CSS and styling examples should be directly usable
- **Practical Focus**: Explain not just what, but how and why of styling decisions
- **No Component Internals**: Focus on the system, not individual component implementation details

## Key Topics to Cover

1. **CSS Architecture Overview**
   - CSS Modules pattern as foundation
   - Semantic CSS variables for theming
   - Tailwind CSS integration (@apply directives)
   - Data attributes for state styling
   - PostCSS processing pipeline

2. **CSS Variable System**
   - **Typography Variables**
     - Text size scale (--text-xs to --text-5xl)
     - Font families (--font-sans, --font-mono)
     - Font weights
     - Line height options
   - **Color Variables**
     - Color scales (50-950) in OKLch color space
     - Background colors (--color-background-*)
     - Foreground/text colors (--color-foreground-*)
     - Semantic colors (accent, success, danger, warning, info)
   - **Layout & Spacing**
     - Border radius scales (--radius-xs to --radius-full)
     - Border widths
     - Responsive spacing scale
     - Transition/animation timing

3. **CSS Module Pattern**
   - How components use CSS Modules
   - BEM-like naming conventions
   - Variant modifiers (e.g., button.primary, button.secondary)
   - Size modifiers (sm, md, lg)
   - Example: button.module.css structure

4. **Data Attributes for State**
   - data-variant
   - data-size
   - data-disabled
   - data-pressed, data-hovered, data-focused
   - data-focus-visible
   - How to use in CSS selectors

5. **Tailwind Integration**
   - @apply directives in CSS Modules
   - Tailwind for layout utilities only
   - CSS variables for colors (not Tailwind color utils)
   - Responsive design with Tailwind classes
   - Tailwind CSS v4 setup

6. **Theme Customization**
   - Overriding CSS variables
   - Light/dark theme switching
   - Pre-built theme templates (vitesse presets)
   - Dynamic theme changes
   - Custom color scale generation

7. **Styling Best Practices**
   - When to use CSS Modules vs Tailwind
   - Component-specific styling patterns
   - Consistent spacing and sizing
   - Accessibility considerations in styling
   - Performance optimization

## Quality Checklist
- ✅ Reference actual CSS variable names from styles.css
- ✅ Show real CSS Module examples from components
- ✅ Include correct OKLch color space explanation
- ✅ Provide proper CSS syntax highlighting
- ✅ Explain the semantic meaning of variables
- ✅ Show before/after styling examples where helpful
- ✅ Include color scale references (50, 100, 200... 950)
- ✅ Explain responsive design approach (clamp() functions)
