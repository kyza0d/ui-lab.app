<objective>
Analyze why component previews are broken after implementing the component ordering refactoring.
The previews worked before the changes to use getCategoriesInOrder() and getComponentsInCategoryOrder(), but now they're not displaying correctly in the grid or sidebar.
Determine the root cause and identify what's preventing the preview components from rendering.
</objective>

<context>
This is a Next.js site (@apps/site) that displays component previews in a grid layout.
Recent changes modified how components are fetched:
- Changed from getComponentsByCategory() to getComponentsInCategoryOrder()
- Updated @apps/site/src/app/(main)/components/@content/page.tsx
- Updated @apps/site/src/components/Sidebar.tsx
- The refactoring was meant to apply component ordering but may have broken the data flow

@apps/site/src/app/(main)/components/@content/page.tsx - Components page grid
@apps/site/src/components/Sidebar.tsx - Sidebar component list
@apps/site/src/lib/component-registry.tsx - Component registry and helpers
@packages/registry/src/helpers.ts - Helpers including getComponentsInCategoryOrder()
@packages/registry/src/component-order.ts - Component ordering definitions
</context>

<requirements>
1. Thoroughly analyze the component data flow from registry → helper functions → UI rendering
2. Identify where the preview data is being lost or disconnected
3. Check if getComponentsInCategoryOrder() is returning the correct component metadata structure
4. Verify that the preview field is being preserved through the data transformations
5. Determine if the issue is in:
   - The helper function implementation
   - The component registry data structure
   - The page/sidebar component rendering
   - The data mapping between functions

Consider:
- What data does getComponentsByCategory() return vs getComponentsInCategoryOrder()?
- Are all required fields (id, name, description, preview, experimental) present?
- Is there a mismatch between the component IDs in component-order.ts and actual components?
- Are the components being filtered out somewhere in the chain?
</requirements>

<analysis_steps>
1. Examine the component registry structure - what fields exist on each component
2. Trace getComponentsInCategoryOrder() implementation - what data does it return?
3. Compare the old working flow (getComponentsByCategory) with new flow (getComponentsInCategoryOrder)
4. Check the pages that consume this data - what are they expecting?
5. Identify the specific point where preview data is missing
6. List all differences between the two approaches
</analysis_steps>

<output>
Create a detailed analysis document identifying:
- Root cause(s) of the broken previews
- The specific data flow issue(s)
- Which components/functions are affected
- Recommended fix(es) with explanation
- Step-by-step fix implementation guide

Save to: `./analysis-broken-previews.md`
</output>

<verification>
Before completing, verify:
- You've examined the actual implementation of both getComponentsByCategory() and getComponentsInCategoryOrder()
- You've traced the data from registry → helper → UI component
- You've identified exactly where the preview field is being lost
- You've confirmed all component IDs in component-order.ts exist in the registry
- You understand why the old approach worked and the new one doesn't
</verification>

<success_criteria>
- Root cause clearly identified with code references (file:line)
- Explanation of why previews broke after the refactoring
- Specific implementation fixes provided
- Clear steps to restore functionality
- Understanding of the data flow issue documented
</success_criteria>
