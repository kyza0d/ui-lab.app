<objective>
Diagnose and fix the header tabs underline re-render/flash issue that occurs when navigating between /elements and /sections routes. The tabs (Elements, Starters, Assets) should maintain a smooth, stable appearance without the active indicator underline flickering or re-rendering unnecessarily.

This is a performance and UX issue: users see the underline jump/flash momentarily when switching between these routes, creating visual instability and a janky user experience.
</objective>

<context>
The app uses a unified header component with navigation tabs that display across both /elements and /sections routes. The tabs are rendered in @apps/site/src/features/layout/components/header/header.tsx and share the same tab group configuration.

Key related files:
- @apps/site/src/features/layout/components/header/header.tsx - Main header with tabs rendering logic
- @apps/site/src/shared/lib/route-config.ts - Route and tab group configuration
- @apps/site/src/features/elements/components/elements-sidebar.tsx - Sidebar that manages active navigation state

The problem manifests as: when clicking between /elements and /sections (or their sub-pages), the active tab underline flashes/re-renders rather than smoothly updating. This suggests dependency arrays, prop changes, or component re-renders are not optimized.

The architecture:
- Both /elements and /sections map to the same 'elements' tab group in TAB_GROUPS
- The activeTabId comes from getActiveTabForPathname() which returns 'elements' for /sections routes
- The Tabs component from ui-lab-components controls which tab appears active via the `value` prop
</context>

<requirements>
1. **Diagnose the root cause** of the underline flash:
   - Check if getTabGroupForPathname or getActiveTabForPathname are returning different values on re-renders
   - Verify that tabGroup and activeTabId remain stable when navigating
   - Check if the Tabs component is being recreated unnecessarily
   - Look for any prop changes in the tab rendering code that trigger re-renders
   - Examine the tab map/render function (lines 210-226) for memoization issues

2. **Implement memoization** to prevent unnecessary re-renders:
   - Use React.memo() to memoize individual tab components if they're recreated on every render
   - Use useMemo() to stabilize tabGroup and activeTabId values
   - Ensure icon elements are not recreated in the render loop
   - Prevent inline JSX creation in the map function

3. **Ensure smooth tab transitions**:
   - The active tab value should update deterministically based on the pathname
   - The underline should follow the active tab without flickering
   - No flashing or visual jumping when navigating between routes

4. **Performance optimization**:
   - Avoid creating new objects/arrays on each render
   - Ensure dependencies in useMemo/useCallback are correct
   - Prevent parent component re-renders from cascading to tab components
</requirements>

<constraints>
- Do NOT modify the Tabs component from ui-lab-components (it's external)
- Do NOT change the route configuration or how paths map to tabs
- Do NOT add new dependencies that would cause MORE renders
- Keep the implementation simple and maintainable
- Follow the project's code style from CLAUDE.md: self-documenting code, minimal comments, compact spacing
</constraints>

<implementation>
1. **Analyze the header component** thoroughly:
   - Trace through the tabGroup and activeTabId values when navigating between /elements and /sections
   - Check if pathname changes are causing unnecessary re-renders of the entire header
   - Verify that getTabGroupForPathname and getActiveTabForPathname return consistent values

2. **Extract and memoize the tab rendering logic**:
   - Create a separate memoized TabItem component (similar to the fix you did in ElementsList)
   - Move the icon extraction and JSX creation outside the map loop
   - Wrap tab-related calculations in useMemo to prevent recalculation

3. **Stabilize the Tabs component rendering**:
   - Ensure the `value` prop (activeTabId) is stable and doesn't change unexpectedly
   - If needed, memoize the entire tab group container to prevent re-renders
   - Consider wrapping the tab list generation in useMemo

4. **Test the fix**:
   - Navigate multiple times between /elements and /sections
   - Navigate to specific sub-items like /elements/[id] and /sections/[id]
   - Verify the active tab indicator updates smoothly without flashing
   - Check for any other visual artifacts or re-render issues

What to look for and WHY:
- The map function (line 210-226) creates new JSX elements and Icon components on every render. This causes React to see "new" children every time, even though they're logically the same.
- If tabGroup or activeTabId are recreated on every render (not using their cached values), the Tabs component will re-render unnecessarily.
- The Tabs and TabsTrigger components might not be memo'd, so they re-render whenever their parent renders, even with the same props.
</implementation>

<output>
Modify the following file to fix the re-render/flash issue:

- @apps/site/src/features/layout/components/header/header.tsx - Optimize tab rendering to prevent the underline flash

Include your changes with:
- Memoized tab item component (if applicable)
- Stabilized dependency arrays
- Optimized tab rendering logic
- Brief explanation of what changed and why it fixes the issue
</output>

<verification>
Before declaring complete, verify your fix:

1. Navigate to /elements - verify the "Elements" tab is active with underline
2. Click to navigate to /elements/button - underline should stay on Elements
3. Click to navigate to /sections - underline should smoothly move (no flash)
4. Click to navigate to /sections/hero - underline should still be on Elements (per getActiveTabForPathname logic)
5. Navigate back to /elements/input - underline updates smoothly
6. Repeat the navigation sequence 5+ times rapidly - no flashing or visual artifacts should occur
7. Open DevTools React Profiler and confirm:
   - Header component doesn't re-render unnecessarily when navigating between routes
   - Tab component re-renders only when activeTabId actually changes
   - No excessive re-renders of individual tab items

</verification>

<success_criteria>
✓ The header tabs underline no longer flashes when navigating between /elements and /sections
✓ The active tab indicator updates smoothly and deterministically based on the route
✓ No visual jumping or flickering of the underline or tab styling
✓ Navigation between routes is fast and responsive
✓ Tab memoization prevents unnecessary re-renders of stable tab items
✓ The fix follows React best practices for optimizing re-renders (useMemo, React.memo)
✓ Code is clean, self-documenting, and maintains the project's style conventions
✓ No new console warnings or errors related to hooks, dependencies, or rendering
</success_criteria>
