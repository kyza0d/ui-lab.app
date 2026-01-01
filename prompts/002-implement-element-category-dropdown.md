<objective>
Update the Elements sidebar UI to display element categories as a dropdown/collapsible section. When a user clicks on "Elements" in the main nav, it should reveal a dropdown showing categories (starting with "Layout"), and clicking a category shows the elements within that category. This requires the categorization system from the previous prompt to be in place.
</objective>

<context>
This prompt depends on the completion of prompt 001-add-element-categorization.md, which provides the categories configuration and utility functions.

The main file to modify is `@apps/site/src/features/elements/components/elements-sidebar.tsx`. This component currently displays all elements in a flat list. It needs to be enhanced to group and display elements by category with a collapsible/dropdown UI.

Related files:
@apps/site/src/features/elements/components/elements-sidebar.tsx
@apps/site/src/features/elements/components/elements-sidebar-content.tsx
@packages/registry/src/elements/categories.ts (from prompt 001)
</context>

<requirements>
1. Update the ElementsSidebar component to make the "Elements" nav item expand/collapse to show categories
2. Display categories as collapsible sections within the sidebar
3. Show elements within their respective categories
4. The Layout category should initially be displayed (expanded or available to expand)
5. Maintain the existing styling and visual consistency with other nav items
6. The active element tracking should work with the category-based display
</requirements>

<implementation>
1. Import the categories configuration and utility function from the registry
2. Modify the ElementsSidebarContent component to display elements grouped by category
3. Add state management for tracking which categories are expanded/collapsed
4. Create a visual distinction between category names and individual elements
5. Ensure the element count badge still works, but update it to reflect the count within categories
6. Maintain responsive design and keyboard accessibility

Follow these patterns:
- Keep component logic clean and focused on rendering
- Use existing UI patterns from the codebase for consistency
- Avoid over-engineering; keep the implementation straightforward
- Do NOT add comments - write self-documenting code with clear component and variable names
</implementation>

<output>
- Update `./apps/site/src/features/elements/components/elements-sidebar.tsx` - Integrate categories into main nav
- Update `./apps/site/src/features/elements/components/elements-sidebar-content.tsx` - Display elements grouped by category
- Any new files needed for category display components (if required for organization)
</output>

<verification>
1. Verify that the sidebar displays the "Layout" category
2. Test that clicking/expanding the category reveals Header and Sidebar elements
3. Confirm that the active element indicator still works correctly
4. Check that the element count badge is still accurate
5. Ensure the styling matches the existing sidebar design
6. Test responsive behavior on different screen sizes
</verification>

<success_criteria>
- The Elements sidebar displays categories as expandable/collapsible sections
- The "Layout" category is visible and contains Header and Sidebar elements
- Users can navigate to individual elements within categories
- Active element tracking works correctly with the category-based display
- The UI is visually consistent with the existing design
- Code follows project conventions from CLAUDE.md
</success_criteria>
