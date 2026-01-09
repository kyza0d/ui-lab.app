# Eliminate FOUC Flash with Proper Inline Script Injection

<objective>
Completely eliminate the Flash of Unstyled Content (FOUC) that occurs when a user refreshes a page with a saved dark theme preference. Currently, the page briefly flashes light mode before switching to dark.

The root cause: Using `next/script` with `beforeInteractive` strategy inside a client component is too late - React hydration happens after the script should run. We need the theme script injected as a raw `<script>` tag in the initial HTML response before any client-side code runs.

The goal is to provide a solution that:
1. Eliminates all visual flashing on refresh with saved theme
2. Maintains minimal boilerplate in consumer layouts
3. Works seamlessly with both workspace references and published packages
</objective>

<context>
Project: UI Lab monorepo with component library (@packages/components) and consumer apps (~/Temp/test)

Current state:
- ThemeProvider uses React Context for theme state
- Theme recovery script in themeScript.ts generates a function that reads localStorage
- Consumer layouts are client components with `'use client'` directive
- Using `next/script` with `beforeInteractive` but it's not early enough

Problem: Even with `beforeInteractive`, client component hydration creates a flash because:
1. Browser renders initial HTML (with light mode CSS variables)
2. Client component mounts and hydrates
3. Script from Script component finally executes
4. Theme switches to dark
5. User sees light → dark flash

Solution approach needed: Inject theme script as a raw inline `<script>` tag in the HTML head, not through next/script component. This requires:
- Either server component can inline the script directly
- Or creating a mechanism for consumer apps to inject raw script without needing client component for the layout itself
- Or using middleware/next.config to inject script at the HTTP response level

Current files:
@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/ThemeProvider.tsx - Theme context and logic
@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/themeScript.ts - Script generation
@/home/kyza/Temp/test/src/app/layout.tsx - Consumer layout (currently client component with Script component)
@/home/kyza/Temp/test/src/app/providers.tsx - Simple ThemeProvider wrapper
</context>

<requirements>
1. **Zero FOUC on refresh**: Page should render with correct theme from first paint, no flashing
2. **Minimal consumer boilerplate**: Consumers should need minimal setup (ideally 1-2 lines in layout)
3. **No manual script strings**: Consumers should not paste long script strings into their code
4. **Maintain functionality**: Theme toggling, localStorage persistence, and CSS variables all must continue working
5. **Workspace and package compatible**: Works with local workspace references and published npm packages
6. **TypeScript support**: Full type safety maintained throughout

Thoroughly analyze the problem and consider multiple technical approaches to inject inline scripts in Next.js 16+ layouts:
- Approach 1: Server component with raw script injection
- Approach 2: Custom middleware + response headers
- Approach 3: Hybrid approach (server component that handles script, client component for ThemeProvider)
- Approach 4: Build-time script injection into Next.js config

Recommend the BEST approach and implement it completely.
</requirements>

<implementation_strategy>
1. **First, deeply analyze** which approach works with Next.js 16's server/client component model
2. **Test in dev server** to verify FOUC is eliminated
3. **Verify on refresh** by saving a theme, refreshing the page, and confirming NO flash occurs
4. **Maintain clean API** so consumers don't need to understand the complexity

Key constraints and WHY:
- Cannot use `next/script` with `beforeInteractive` in client components (too late for hydration)
- Cannot inject plain `<script>` tags inside JSX (React doesn't allow it)
- Layout.tsx cannot easily be a pure server component if it needs to wrap ThemeProvider (which is client)
- MUST run before React code executes to prevent flash

AVOID:
- Solutions that require consumers to manually inject script strings (violates "no manual scripts" requirement)
- Solutions that add complexity to consumer setups (violates "minimal boilerplate")
- Solutions that split layout.tsx logic across multiple files in confusing ways
</implementation_strategy>

<output>
Modify/create files with relative paths:

1. **Analysis document first** (optional but recommended for complex solution):
   - `./research/fouc-elimination-analysis.md` - Technical analysis of why each approach works/fails, final recommendation

2. **Package changes**:
   - Modify existing files in @packages/components/src/providers/ as needed
   - Create new exports if necessary for the solution
   - Ensure all exports are in `packages/components/src/index.ts`

3. **Consumer app example** (for testing):
   - Update `../../Temp/test/src/app/layout.tsx` to demonstrate the solution
   - Update `../../Temp/test/src/app/providers.tsx` if needed

4. **Documentation**:
   - Add/update code comments explaining WHY the solution works (especially the timing/order)
   - Include example for consumers in package README or JSDoc

Success looks like:
```
1. Developer sets theme to dark
2. Developer refreshes page
3. Page renders with dark colors immediately (NO light flash)
4. Theme remains dark after hydration complete
```
</output>

<verification>
Before declaring success, verify:
1. **Dev server test**:
   - Run `cd ~/Temp/test && npm run dev`
   - Load http://localhost:3000
   - Click "Dark" button to set theme to dark
   - Refresh the page
   - ✓ CONFIRM: Page shows dark mode immediately, NO light flash before switching
   - Wait for hydration to complete
   - ✓ CONFIRM: Dark mode persists, no additional flashing

2. **No boilerplate bloat**:
   - Layout.tsx should be clean and readable
   - Consumer setup should be obvious from reading the code
   - No long script strings visible in consumer code

3. **Functionality intact**:
   - Theme toggle still works
   - localStorage persistence still works
   - CSS variables still update correctly

4. **Package compatibility**:
   - Verify exports are available from 'ui-lab-components'
   - No build errors in components package
</verification>

<success_criteria>
✓ Zero visible FOUC on page refresh with saved theme
✓ Page renders with correct theme from first paint
✓ Consumer layout.tsx remains clean and minimal (<50 lines total)
✓ No manual script injection needed by consumers
✓ All theme functionality (toggle, persistence, CSS vars) works correctly
✓ TypeScript types work without errors
✓ Works in both dev server and production build
</success_criteria>
