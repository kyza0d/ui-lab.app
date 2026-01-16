<objective>
Implement a comprehensive Starters sidebar structure that serves as the foundation for discovering and filtering starter project templates. This sidebar will help developers quickly find project templates matching their needs by providing intuitive navigation and filtering capabilities.

The sidebar should follow the same functional pattern as the existing sidebar.tsx and elements-sidebar.tsx, establishing a consistent navigation architecture across all domains in the application.
</objective>

<context>
This is part of the larger UI Lab project's starters domain. The starters feature helps developers discover and use pre-configured project templates.

Relevant files:
- @/features/starters/components/starters-sidebar.tsx (current placeholder implementation)
- @/features/elements/components/elements-sidebar.tsx (reference for pattern)
- @/features/navigation/components/sidebar.tsx (reference for pattern)
- @/features/elements/components/elements-sidebar-content.tsx (reference for content structure)

The sidebar should integrate with the existing filter UI components used for elements:
- ElementsFilterPopover
- ElementsSearchHeader

This will be a foundation that can be progressively enhanced with actual starter data.
</context>

<requirements>
Create a structured data system and sidebar component that:

1. **Data Structure** (`/features/starters/lib/starters-registry.ts`):
   - Define StarterMetadata interface with: id, name, description, useCase, frameworks (array), features (array), complexity, featured boolean
   - Define starter use case enum: LANDING_PAGE, SAAS, DASHBOARD, BLOG, ECOMMERCE, MOBILE_APP, API_BACKEND, PORTFOLIO
   - Define starter framework enum: NEXTJS, VITE_REACT, ASTRO, SVELTEKIT, REMIX
   - Define features enum: AUTH, DATABASE, PAYMENTS, CMS, STYLING, ORM
   - Define complexity enum: MINIMAL, STANDARD, ADVANCED
   - Create `startersRegistry` array with empty placeholder structure (no actual starters yet, but structure ready for data)
   - Create helper functions: `getStartersByUseCase`, `getStartersByFramework`, `getStartersByFeatures`, `getFeaturedStarters`

2. **Sidebar Navigation** (update `/features/starters/components/starters-sidebar.tsx`):
   - Implement 5 core functions following the established pattern:
     - `getActiveNavFromPathname(pathname)` → returns current nav section
     - `getMainNav(activeNav)` → returns navigation structure
     - `getSectionsForNav(nav)` → returns content sections for active nav
     - `getHrefForItem(activeNav, itemId)` → generates routes
     - `isItemActive(itemId, pathname, activeNav)` → determines active state

   - Main navigation items:
     - Featured (shows featured starters)
     - All Starters (shows all starters with filters)
     - By Use Case (shows use case categories)
     - By Framework (shows framework categories)
     - By Features (shows feature categories)

3. **Content/Filter Section** (create `/features/starters/components/starters-sidebar-content.tsx`):
   - Reuse/adapt ElementsSearchHeader pattern for search functionality
   - Reuse/adapt ElementsFilterPopover pattern for advanced filters
   - Display content based on active nav section:
     - Featured: Show featured starters list
     - All Starters: Show all starters with search and filters
     - By Use Case: Show use case categories as expandable sections
     - By Framework: Show framework categories as expandable sections
     - By Features: Show feature categories as expandable sections
   - Handle empty state: "No starters available yet" since we're just building structure

4. **Type Definitions** (create `/features/starters/lib/starters-types.ts`):
   - Export all enum types
   - Export StarterMetadata interface
   - Keep types organized for future growth

5. **Exports** (update `/features/starters/index.ts`):
   - Export StartersSidebar component
   - Export types and registry functions

</requirements>

<implementation>
Follow these patterns and principles:

1. **Functional Pattern**: Mirror the approach from sidebar.tsx and elements-sidebar.tsx
   - Use pure functions for navigation logic
   - Use hooks sparingly (only useSidebarScroll, useSearchParams)
   - Keep component logic straightforward and testable

2. **Type Safety**: Use TypeScript enums for categories to prevent invalid values
   - WHY: Enums catch typos at compile time and provide IDE autocomplete for developers using this data

3. **Scalability**: Structure data so starters can be added later without changing the architecture
   - Use a registry pattern that accepts an array of StarterMetadata
   - Create filter/grouping functions upfront
   - WHY: Makes it easy for future PRs to just add starter data without refactoring code

4. **Reusable Components**: Create StartersSidebarContent that can be reused like ElementsList
   - Accept props: activeNav, pathname, selectedFilters, onFilterChange
   - WHY: Separates concerns and makes the sidebar maintainable

5. **Empty States**: Include appropriate messaging for "no starters yet"
   - Different messages for different nav sections (e.g., "No featured starters yet" vs "No starters matching your filters")
   - WHY: Better UX and clearer guidance for users

6. **Navigation Routes**: Design routes that are future-proof:
   - `/starters` - featured/all starters
   - `/starters/use-case/[id]` - starters for use case
   - `/starters/framework/[id]` - starters for framework
   - `/starters/features/[id]` - starters for features
   - `/starters/[starterId]` - individual starter detail page

</implementation>

<output>
Create/modify the following files with relative paths:

- `./apps/site/src/features/starters/lib/starters-types.ts` - Type definitions and enums
- `./apps/site/src/features/starters/lib/starters-registry.ts` - Registry data and helper functions
- `./apps/site/src/features/starters/components/starters-sidebar.tsx` - Main sidebar component (refactor existing)
- `./apps/site/src/features/starters/components/starters-sidebar-content.tsx` - Content/filter section (new file)
- `./apps/site/src/features/starters/index.ts` - Update exports

Do NOT create actual starter templates yet - this is purely the navigation and filter structure. The startersRegistry should be an empty array ready for data.

</output>

<verification>
Before considering this complete, verify:

1. TypeScript compilation succeeds (`pnpm tsc --noEmit`)
2. The sidebar renders without errors when navigating to `/starters`
3. All navigation items (Featured, All Starters, By Use Case, By Framework, By Features) appear in the sidebar
4. Clicking each nav item updates the active state visually
5. Empty state messages appear appropriately for each section
6. The page displays "Starters coming soon" or similar for content sections
7. No console errors appear in the browser

</verification>

<success_criteria>
- ✓ Sidebar structure is complete and follows the established functional pattern
- ✓ Type system supports future growth (enums, interfaces ready for data)
- ✓ Navigation has 5 main sections with proper routing structure
- ✓ Filter/search infrastructure is in place (adapted from elements)
- ✓ TypeScript compilation passes
- ✓ Component renders and navigates correctly at `/starters`
- ✓ Code is ready for adding actual starter data in future PRs
</success_criteria>
