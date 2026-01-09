<objective>
The ThemeProvider is setting color variables on the DOM (e.g., `--accent-500`), but they're being overridden by `styles.css` imports. The CSS defines variables like `--color-accent-500: var(--accent-500, oklch(...))` which should fall back to the underlying variables, but this mechanism is failing.

Goal: Thoroughly investigate CSS specificity, Tailwind integration, and the @theme directive to determine the correct architectural approach for allowing users to define base colors in @theme while the ThemeProvider generates and applies variations.

This investigation should result in a working implementation where colors defined in the CSS @theme block are properly inherited and inverted for light/dark mode switching.
</objective>

<context>
**Project**: UI Lab monorepo with a component library (@packages/components) and test application (@/home/kyza/Temp/test)

**Tech Stack**: Next.js 16, Tailwind CSS 4 with @theme directive, React 19

**Current Problem**:
- `@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/ThemeProvider.tsx` extracts CSS variables and applies them to the DOM
- `@/home/kyza/Temp/test/src/app/globals.css` defines color palettes like `--color-accent-500: var(--accent-500, oklch(60.4% 0.132 51.4))`
- When the ThemeProvider sets `--accent-500` on the DOM, it should flow through to `--color-accent-500`
- Instead, the fallback oklch values are always used, meaning the provider's values are ignored

**Key Files to Examine**:
- @/home/kyza/Projects/ui-lab/app/packages/components/src/providers/ThemeProvider.tsx (color extraction and application)
- @/home/kyza/Projects/ui-lab/app/packages/components/src/providers/extractThemeVars.ts (palette extraction logic)
- @/home/kyza/Temp/test/src/app/globals.css (CSS variable definitions)
- @/home/kyza/Projects/ui-lab/app/apps/site/src/app/globals.css (working reference example)

**Related Context**:
The ThemeProvider attempts to:
1. Extract existing CSS color variables from the page
2. Convert them to underlying variables (`--accent-500`, `--foreground-700`, etc.)
3. Apply these variables to `document.documentElement`
4. Invert the palette for light mode by swapping shade values

The implementation uses `convertToUnderlyingVariables()` to map `--color-accent-500` → `--accent-500`, then applies these via `applyThemeCSSVariables()`.
</context>

<requirements>
**Investigation Requirements** (thoroughly analyze both areas):

1. **CSS Specificity & Variable Resolution**:
   - Why are DOM-set variables not overriding CSS-defined fallback values?
   - What is the CSS cascade order when `@import "ui-lab-components/styles.css"` is used?
   - How does Tailwind CSS @theme directive affect variable resolution?
   - Test: Set `--accent-500: red` on document.documentElement and check if `var(--accent-500, oklch(...))` resolves to red or oklch

2. **Tailwind @theme Integration**:
   - How does Tailwind's @theme directive process variables?
   - Are @theme variables scoped differently than regular CSS variables?
   - Does the order of @import statements affect variable precedence?
   - Compare the working example (@apps/site) with the test project to identify key differences

3. **Current Implementation Analysis**:
   - Does `convertToUnderlyingVariables()` correctly map `--color-*-*` to `--*-*`?
   - Is `applyThemeCSSVariables()` actually setting variables on the correct element?
   - Are there timing issues (e.g., variables set before CSS loads)?
   - Check: log to console what variables are being set and what values they receive

4. **Solution Design**:
   - After investigation, determine if the fix requires:
     - Changing variable naming conventions
     - Modifying CSS structure (where/how variables are defined)
     - Adjusting ThemeProvider timing or application logic
     - Using a different variable resolution strategy (e.g., CSS custom property inheritance, data attributes, etc.)
   - Document the recommended approach with reasoning for why it solves the override issue

</requirements>

<implementation>
**Investigation Strategy**:

1. Start by examining the CSS file structure in both the test project and working @apps/site example
2. Use browser DevTools patterns (via code inspection) to understand variable cascade
3. Analyze the current `convertToUnderlyingVariables()` and `applyThemeCSSVariables()` functions
4. Test hypotheses by checking what variables are actually available in computed styles
5. Identify the root cause of the override

**What to Avoid**:
- Do NOT just add `!important` flags - this masks the underlying issue (variables should work without forcing)
- Do NOT assume the implementation is correct without verifying variable flow through the cascade
- Do NOT propose changes without understanding WHY the current approach fails
- Do NOT ignore the @apps/site working example - it holds clues about correct structure

**Code Style**:
- Follow project conventions in @CLAUDE.md: kebab-case for files, PascalCase for components
- Keep code self-documenting with clear variable names
- Minimize comments; the code structure should be obvious
- Compact, efficient implementation without unnecessary spacing
</implementation>

<investigation_output>
Create an analysis document and update ThemeProvider based on findings:

**Analysis Document** (`./investigation-findings.md`):
- Root cause of the override issue (specific CSS cascade explanation)
- How variables currently flow through the system
- Why the fallback values always win
- Recommended solution with step-by-step reasoning
- Code changes needed to fix the issue

**Code Fix** (`@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/ThemeProvider.tsx` and related files):
- Update variable extraction/conversion logic if needed
- Update application logic if needed
- Ensure variables are set in the correct location/element
- Add any necessary timing adjustments

**Test Verification** (document how to verify the fix works):
- How to test that colors from @theme are properly applied
- How to verify light/dark mode inversion works
- Browser DevTools checks to confirm variable flow
</investigation_output>

<success_criteria>
- ✓ Root cause clearly documented: why DOM-set variables don't override CSS fallbacks
- ✓ CSS specificity/cascade analysis complete: explains Tailwind @theme behavior
- ✓ Solution designed and documented: how to structure variables so ThemeProvider controls them
- ✓ Code implementation: ThemeProvider correctly sets variables that flow through CSS
- ✓ Colors properly applied: test project shows correct colors from @theme when toggling light/dark
- ✓ No hardcoded color values in TypeScript: all colors come from CSS @theme
- ✓ Light/dark inversion works: toggling theme inverts the palette correctly
- ✓ Verified on both test project and working reference (@apps/site pattern understood and replicated)
</success_criteria>

<verification>
Before considering the investigation complete, verify:

1. **Analysis Document**:
   - Explains exactly why `var(--accent-500, oklch(...))` always returns oklch value
   - Identifies which CSS rule or import is causing the override
   - Shows the variable cascade flow step-by-step

2. **Code Changes**:
   - ThemeProvider extracts colors from the CSS correctly
   - Variables are applied to the correct element (document.documentElement)
   - Application timing is correct (after CSS is loaded)
   - convertToUnderlyingVariables correctly maps variable names

3. **Functional Test**:
   - In test project: toggle theme button changes colors
   - Colors match the values defined in @theme (or their inverted versions)
   - No console errors related to variable extraction/application
   - localStorage persistence works correctly

4. **Visual Verification**:
   - Inspect --accent-500 value in browser DevTools - should show the applied color, not fallback
   - Check computed style of element using --color-accent-500 - should resolve to the applied value
   - Light mode shows inverted palette correctly
</verification>
