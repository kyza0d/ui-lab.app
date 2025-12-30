# Refactor Elements & Blocks Pages to Match Components Pattern

## Objective

Refactor the elements and blocks pages to follow the exact same proven pattern used by the components pages. The components section builds successfully without "uncached data accessed outside Suspense" errors by strictly separating server-side data processing from client-side interactivity. Apply this pattern to fix the elements and blocks pages.

## Context

**Working Pattern (Components Pages):**
- `@content/page.tsx` - Uses `'use client'`, only calls `useRouter()` for navigation, renders static data from registry
- `@content/[component]/page.tsx` - Server component with `'use cache'` and `cacheLife('hours')`, uses `generateStaticParams()`, renders `ComponentDetailClient`
- `ComponentDetailClient` - Client component that receives data props, handles state and routing

**Current Problem:**
- Elements/blocks pages access dynamic data (search params, filters) in server components during prerendering
- They use `useRouter()`, `usePathname()`, `useSearchParams()` in the wrong context
- This causes "uncached data accessed outside Suspense" errors with `cacheComponents: true`

**Solution:**
Refactor to separate concerns:
1. Server component handles data processing and caching
2. Client component handles all routing and interactivity
3. Pass only the processed data between them

## Files to Modify/Create

### For Elements Page:

1. **Create** `src/components/elements/ElementsPageClient.tsx`
   - Client component (`'use client'`)
   - Accept props: `filteredElements: ElementMetadata[]`, `searchParams: URLSearchParams`
   - Handle search with `useRouter()` and `useSearchParams()`
   - Render the grid, handle sorting and filtering UI
   - Same UI structure as current page

2. **Modify** `src/app/(main)/elements/@content/page.tsx`
   - Remove all client hooks (`useRouter`, `usePathname`, `useSearchParams`)
   - Add `'use cache'` and `cacheLife('hours')`
   - Keep server-side data processing (search, category, tags filtering)
   - Pass `filteredElements` to `ElementsPageClient`
   - Keep `searchParams` as async prop

### For Blocks Page:

1. **Create** `src/components/blocks/BlocksPageClient.tsx` (or similar)
   - Client component (`'use client'`)
   - Accept props as needed
   - Render the "coming soon" UI

2. **Modify** `src/app/(main)/blocks/@content/page.tsx`
   - Add `'use cache'` and `cacheLife('hours')`
   - Render `BlocksPageClient` instead of inline JSX

## Implementation Details

### ElementsPageClient Structure

```
'use client'
- Import useRouter, useSearchParams, usePathname
- Define component that accepts:
  - filteredElements: ElementMetadata[]
  - allElements: ElementMetadata[] (for total count)
  - categories: string[]
  - tags: string[]
- Implement search handler that builds URL params and calls router.push()
- Implement sort handler that manipulates URL search params
- Implement filter handlers (category, tags)
- Render ElementsGridClient with filtered elements
- Render ElementsSearchHeader, ElementsSortDropdown, ElementsFilterPopover
  - Pass current params from useSearchParams()
  - Pass handlers (onSearch, onSortChange, etc.)
```

### Page.tsx Structure

```
- async function
- 'use cache' directive
- cacheLife('hours')
- Extract searchParams via Promise
- Process: search query, category, tags validation
- Filter elements server-side
- Pass results to ElementsPageClient as props
```

## Success Criteria

1. **Build succeeds** with no "uncached data accessed outside Suspense" errors
2. **No client hooks** (`useRouter`, `usePathname`, `useSearchParams`) are called during prerendering in page components
3. **Server components** (`page.tsx`) use `'use cache'` and `cacheLife()`
4. **Data flows correctly:**
   - Server: processes data, applies caching
   - Client: handles routing, state, user interactions
5. **Search/filters work** - users can search, sort, and filter elements
6. **Layout is preserved** - visual structure matches current implementation

## Key Rules to Follow

- ✅ Server components handle data processing
- ✅ Client components handle routing and interactivity
- ✅ Use `'use cache'` + `cacheLife()` in async server components
- ✅ Never use dynamic hooks in server components
- ✅ Pass filtered data as props from server to client
- ✅ Keep the exact same UI/UX - only change the code structure

## Verification

Before declaring complete:
1. Run `pnpm build` - should succeed with no blocking route errors
2. Navigate to `/elements` - page loads quickly
3. Test search functionality - updates URL and filters
4. Test sort dropdown - changes URL params
5. Test filters - category and tags work
6. Test `/blocks` - loads without errors
7. Check that HeaderClient still works with all these changes
