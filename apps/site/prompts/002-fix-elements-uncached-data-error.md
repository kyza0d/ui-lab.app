# Fix Elements Route Uncached Data Error

<objective>
Fix the blocking route error on `/elements` where uncached data is being accessed outside of a Suspense boundary. The error indicates that the page component is accessing dynamic request data during prerendering, which needs to be properly isolated.

The goal is to ensure the `/elements` page uses the exact same proven pattern that the `/components` page uses successfully - which properly separates server-side static data from client-side dynamic routing.
</objective>

<context>
**Current State:**
- Route `/elements` is throwing: "Uncached data or `connection()` was accessed outside of `<Suspense>`. This delays the entire page from rendering"
- The page is currently a `'use client'` component that uses `useRouter()` and `useSearchParams()`
- The `/components` page works without these errors and should serve as the reference pattern

**Reference Implementation:**
- Examine `src/app/(main)/components/@content/page.tsx` - This is the WORKING pattern
- Examine `src/app/(main)/components/@content/[component]/page.tsx` - This shows how to handle dynamic routes with caching

**Key Files:**
- `src/app/(main)/elements/@content/page.tsx` - Current problematic implementation
- `src/app/(main)/blocks/@content/page.tsx` - Related, should follow same pattern
- `src/app/(main)/layout.tsx` - The layout that wraps these pages
</context>

<requirements>
1. **Understand the components pattern**: Thoroughly examine how `/components` route avoids this error
   - How does it structure server vs client components?
   - Where are the Suspense boundaries placed?
   - How does it handle routing and search parameters?

2. **Apply the pattern to elements**: Refactor `/elements` to follow the exact same structure
   - The elements page should NOT be using `useSearchParams()` during prerendering if that's causing the error
   - Server components should handle data fetching
   - Client components should only handle interactivity

3. **Verify no Suspense suspenders**: The pattern should work without needing explicit Suspense boundaries in the page itself

4. **Blocks page**: Apply the same fix to `/blocks/@content/page.tsx`

5. **No visual regression**: Ensure the header and layout render smoothly without loading states or flashing
</requirements>

<constraints>
- **Do NOT use Suspense boundaries with fallbacks in the page content** - that causes visual flashing and poor UX
- **Do NOT use dynamic imports** - that's a workaround, not the real pattern
- Follow EXACTLY what the components page does - it works without errors
- Keep the existing UI and functionality identical - only change the code structure
- The layout should remain as-is: `'use client'` with `HeaderClient` wrapped in Suspense with `fallback={null}`
- Read CLAUDE.md for code style preferences (no comments, self-documenting code, compact style)
</constraints>

<research>
Before implementing:
1. Read `src/app/(main)/components/@content/page.tsx` completely - understand every part
2. Check if components page uses `'use client'` or is a server component
3. Look at how it handles search params if at all
4. Understand the route structure: does it have a layout, parallel routes, etc.
5. Check `src/app/(main)/components/layout.tsx` to see if there's special handling
</research>

<implementation_approach>
1. Study the components page thoroughly to understand the working pattern
2. Identify the key difference between why components works and elements doesn't
3. Refactor elements page to match that pattern exactly
4. Apply same changes to blocks page
5. Verify no TypeScript errors with `pnpm tsc --noEmit`
6. Test that the pages load without the "Uncached data" error
</implementation_approach>

<output>
Modify these files:
- `src/app/(main)/elements/@content/page.tsx` - Refactored to match components pattern
- `src/app/(main)/blocks/@content/page.tsx` - Refactored to match components pattern

Ensure:
- No breaking changes to the UI or functionality
- Code follows project conventions from CLAUDE.md
- TypeScript compiles without errors
</output>

<verification>
Before declaring complete:
1. Run `pnpm tsc --noEmit` - should show zero TypeScript errors
2. Check that the build error "Uncached data accessed outside of Suspense" is gone
3. Navigate to `/elements` in the app - page should load without errors
4. Verify search, sort, and filter functionality still works
5. Verify the header renders without flashing or delays
6. Check `/blocks` page also loads without errors
</verification>

<success_criteria>
- ✓ `/elements` route loads without "Uncached data" blocking route error
- ✓ `/blocks` route loads without "Uncached data" blocking route error
- ✓ TypeScript type checking passes
- ✓ Search, sort, and filter functionality preserved on elements page
- ✓ Header renders smoothly without visual flashing
- ✓ Code structure follows the proven `/components` page pattern
- ✓ No Suspense boundaries with fallbacks in page content
</success_criteria>
