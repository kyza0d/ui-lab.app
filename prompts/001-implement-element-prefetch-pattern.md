<objective>
Implement a static pre-rendering pattern for element detail pages using `generateStaticParams()` to eliminate loading indicators and improve performance. This matches the proven pattern already used in the components detail pages.

By pre-rendering all element pages at build time, we avoid runtime Suspense boundaries and loading states, resulting in instant page loads and a better user experience.
</objective>

<context>
The components detail page at `apps/site/src/app/(main)/components/@content/[component]/page.tsx` uses `generateStaticParams()` to statically pre-render all known components. This eliminates Suspense/loading indicators entirely.

The element detail page at `apps/site/src/app/(main)/elements/@content/[element-id]/page.tsx` currently uses a Suspense boundary with a skeleton loader to handle runtime params access, which shows loading states to users.

Goal: Apply the same static pre-rendering strategy to elements.

@apps/site/src/app/(main)/components/@content/[component]/page.tsx (reference implementation)
@apps/site/src/app/(main)/elements/@content/[element-id]/page.tsx (file to update)
@packages/registry/src/elements/ (where elements are defined)
</context>

<requirements>
1. Examine how components uses `generateStaticParams()` and the `componentIds` array
2. Create an equivalent list of all element IDs from the registry
3. Implement `generateStaticParams()` in the element detail page that returns all element IDs
4. Remove the Suspense boundary from the element detail page
5. Remove the skeleton loader component
6. Use `'use cache'` and `cacheLife('hours')` for caching (like components does)
7. Simplify the page to directly await params without Suspense wrapping (element pages will be pre-rendered, so no runtime loading)

The element detail page should follow this structure:
```
- Import generateStaticParams
- Define elementIds array (get from registry or list all elements)
- Export generateStaticParams function
- Simplify page component to directly access params without Suspense
```
</requirements>

<implementation>
Pattern to follow (from components page):
- Static array of all known IDs at module level
- `export function generateStaticParams()` that returns array of ID objects
- Page component uses `'use cache'` and `cacheLife('hours')`
- No Suspense boundary needed because pages are pre-built
- This causes Next.js to generate all pages at build time

Why this works:
- During build, Next.js calls `generateStaticParams()` and pre-renders every page
- All element pages exist as static files, no runtime computation needed
- No loading states because page is served instantly
- Perfect for framework-agnostic registry - no Next.js 16-specific code in registry
</implementation>

<output>
Modify `apps/site/src/app/(main)/elements/@content/[element-id]/page.tsx`:
- Remove all Suspense-related imports and code
- Add `generateStaticParams()` export
- Simplify the page component
- Remove skeleton loader
- Update to match components pattern exactly

The file should be clean, simple, and match the components page structure.
</output>

<verification>
After implementation, verify:
1. No Suspense boundary exists in the element detail page
2. `generateStaticParams()` is exported and returns all element IDs
3. The page component is synchronous and uses `'use cache'` + `cacheLife('hours')`
4. No skeleton/loading components exist
5. Build completes successfully and generates static pages for all elements
6. Navigating to element pages shows content instantly with no loading indicator
</verification>

<success_criteria>
- Element detail pages load instantly without any loading indicators
- `generateStaticParams()` correctly returns all element IDs from the registry
- Page structure mirrors components implementation exactly
- Build generates static pages for all elements
- No Suspense boundaries in the element detail page
- Framework-agnostic (no registry modifications needed)
</success_criteria>
