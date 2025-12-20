<objective>
Refactor `packages/components/src/components/CommandPalette/CommandPalette.module.css` to follow the correct component styling pattern established in `packages/components/src/components/Button/Button.module.css`.

This ensures consistency across the codebase, improves maintainability, and enables proper theming through CSS variables.
</objective>

<context>
The CommandPalette component currently uses an incorrect styling approach with excessive `@apply` directives and a misplaced `@reference` statement. The Button component demonstrates the correct pattern: using `@layer components` with CSS variables for theming, minimal Tailwind utilities, and proper pseudo-selector handling.

Reference files:
@packages/components/src/components/Button/Button.module.css
@packages/components/src/components/CommandPalette/CommandPalette.module.css
</context>

<requirements>
1. Remove the `@reference "tailwindcss"` line (it doesn't belong)
2. Wrap all styles in `@layer components { ... }`
3. Replace `@apply` directives with:
   - CSS variables for colors (--background, --foreground, --border, etc.)
   - Plain CSS properties for layout, spacing, sizing
   - Only keep `@apply` for utility combinations that are genuinely complex
4. Convert color-related Tailwind utilities to CSS variable references:
   - `bg-background-700` → `var(--background-700)`
   - `text-foreground-50` → `var(--foreground-50)`
   - etc.
5. Use standard CSS for responsive behavior instead of Tailwind's `@media` utilities
6. Structure selectors clearly: base styles, then pseudo-states (`:hover`, `:focus`, etc.), then variants/modifiers
7. Define any necessary CSS variables at the top of relevant rule sets (similar to Button's approach with `--background`, `--foreground`, etc.)
</requirements>

<implementation>
Follow the Button component pattern exactly:
- Start with base class styles using CSS variables and plain CSS
- Group related styles logically (layout, typography, interactions)
- Use CSS custom properties for all color/token values
- Keep transitions and animations as plain CSS
- Maintain clear visual hierarchy in the rule structure

Why this matters: This standardized approach makes styling maintainable, themeable, and consistent with your design system. It also reduces bundle size by eliminating excessive Tailwind utility application.
</implementation>

<output>
Modify `./packages/components/src/components/CommandPalette/CommandPalette.module.css`:
- Follow the exact structure and patterns from Button.module.css
- Ensure all classes maintain their current functionality
- All visual behavior should remain identical to the current implementation
</output>

<verification>
After refactoring, verify:
1. Remove the `@reference` line
2. All styles wrapped in `@layer components`
3. No `@apply` directives remain (or only used for genuinely complex utilities)
4. All colors use CSS variables
5. File structure matches Button.module.css organization
6. Build succeeds with no errors: `pnpm run build:packages`
7. Styles render identically in the component (no visual changes)
</verification>

<success_criteria>
- CommandPalette.module.css follows Button.module.css pattern exactly
- No `@reference` statement
- Proper `@layer components` structure
- CSS variables used for all color/theme values
- All selectors properly organized and clean
- Build succeeds without errors
</success_criteria>
