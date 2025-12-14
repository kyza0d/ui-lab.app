<objective>
Implement Next.js 16 prefetching on hover for component links in the sidebar navigation and component gallery to eliminate perceived loading states when users navigate to component detail pages.

The goal is to pre-load component pages before users click, so navigation feels instant. When a user hovers over a component link (in sidebar or gallery), the page should be prefetched in the background.
</objective>

<context>
Project: UI Lab (Next.js 16.0.10 with Turbopack)
Package manager: pnpm

Component detail pages are located at: `@apps/site/src/app/components/@content/[component]/page.tsx`

These pages use `generateStaticParams()` to pre-generate routes for known components, but users still see a loading skeleton during navigation due to client-side hydration and data fetching.

The sidebar and component gallery contain `<Link>` components that navigate to `/components/[componentId]` routes.
</context>

<research>
Before implementing, research the official Next.js 16 documentation to understand:

1. The `<Link>` component's `prefetch` prop behavior in Next.js 16
2. Whether `prefetch="intent"` or similar hover-based prefetching is available
3. The `router.prefetch()` API for programmatic prefetching
4. Best practices for prefetching on hover vs viewport intersection
5. Any performance considerations or rate limiting for prefetch requests
</research>

<requirements>
1. Identify all Link components that navigate to component detail pages:
   - Sidebar navigation component
   - Component gallery/grid component

2. Implement hover-based prefetching using the official Next.js 16 pattern:
   - When user hovers over a component link, trigger prefetch
   - Use appropriate debouncing to avoid excessive prefetch requests on quick mouse movements
   - Ensure prefetch only triggers once per component (don't re-prefetch on repeated hovers)

3. The implementation should:
   - Follow Next.js 16 best practices (not deprecated patterns)
   - Work with the existing `generateStaticParams()` static generation
   - Not break existing navigation functionality
   - Be performant (no unnecessary network requests)
</requirements>

<implementation>
Possible approaches to evaluate:

1. **Link prefetch prop**: Check if Next.js 16 Link has built-in hover prefetch options
2. **onMouseEnter with router.prefetch()**: Manual prefetch on hover using Next.js router
3. **Custom hook**: Create a `usePrefetchOnHover` hook for reusability

Consider:
- Debounce hover events (100-200ms) to avoid prefetching on quick mouse passes
- Track prefetched URLs to avoid duplicate requests
- Handle touch devices appropriately (prefetch on touch start or focus)
</implementation>

<output>
1. Update the sidebar component with hover prefetching
2. Update the component gallery component with hover prefetching
3. If creating a shared hook, place it in: `./apps/site/src/hooks/usePrefetchOnHover.ts`

Provide a brief explanation of the pattern used and why it's the recommended Next.js 16 approach.
</output>

<verification>
Before declaring complete:
1. Verify prefetch requests are triggered when hovering links (check Network tab in DevTools)
2. Confirm navigation to prefetched pages is faster/instant
3. Ensure no duplicate prefetch requests for the same URL
4. Test that normal click navigation still works correctly
5. Verify no console errors or warnings related to prefetching
</verification>

<success_criteria>
- Hovering over component links triggers prefetch requests
- Navigation to prefetched pages feels instant (no loading skeleton visible)
- Implementation follows official Next.js 16 patterns
- No performance regressions or excessive network requests
- Code is clean and follows project conventions (see CLAUDE.md)
</success_criteria>
