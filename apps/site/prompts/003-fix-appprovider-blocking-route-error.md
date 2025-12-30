# Fix AppProvider Blocking Route Error for /elements/[element-id]

<objective>
Fix the blocking route error on `/elements/[element-id]` where `AppProvider` (a client component containing React state) is being accessed during prerendering, preventing the page from rendering.

The issue: `AppProvider` wraps all content in `src/lib/app-context.tsx` and is marked `'use client'`, but it's being called at the route level during prerendering. This triggers "Uncached data was accessed outside of Suspense" error.

The solution: Wrap `AppProvider` with a Suspense boundary in the root layout that has a fallback with `fallback={null}` (like the HeaderClient pattern). This allows the page shell to render immediately while the client context initializes.
</objective>

<context>
**Current Problem:**
- Build fails with: "Route "/elements/[element-id]": Uncached data was accessed outside of <Suspense>"
- Error stack points to: `src/lib/app-context.tsx:91` in `AppProvider` function
- Issue: AppProvider uses `useState()` hooks, which are client-only APIs being accessed during prerendering
- The error prevents the entire page from rendering

**Reference Pattern (Already Working):**
- `src/app/(main)/layout.tsx` wraps `HeaderClient` (also a client component) with `<Suspense fallback={null}>`
- This pattern allows client components to initialize without blocking the page render
- Result: Page shell renders immediately, client context hydrates in background

**Files to Check:**
- `src/app/(main)/layout.tsx` - See how HeaderClient is wrapped
- `src/lib/app-context.tsx` - The AppProvider causing the error (lines 91+)
- `src/app/client-layout.tsx` - Where AppProvider is applied (likely)

**Project Context:**
- Next.js 16.1.1 with Turbopack
- Using parallel routes: `@content` and `@sidebar` slots
- The issue manifests on `/elements/[element-id]` but affects all routes
</context>

<requirements>
1. **Locate AppProvider usage**: Find where `AppProvider` wraps the app (likely in `src/app/client-layout.tsx` or root layout)

2. **Wrap AppProvider with Suspense**: Add a `<Suspense fallback={null}>` boundary around the AppProvider component
   - Use `fallback={null}` to avoid visual flashing
   - This matches the exact pattern used for HeaderClient in the main layout
   - The null fallback is safe because AppProvider just provides context state

3. **Verify no visual regression**:
   - The page should render immediately (no blank state)
   - Theme context should hydrate seamlessly in the background
   - No flashing or loading delays

4. **Build successfully**:
   - Run `pnpm build` to verify the `/elements/[element-id]` route prerendering succeeds
   - No "Uncached data accessed outside of Suspense" errors
   - All routes render without blocking

5. **No functional changes**: Only wrap AppProvider with Suspense - don't modify the AppProvider logic itself
</requirements>

<constraints>
- **Must follow the HeaderClient pattern exactly** - It already works without flashing, so it's the proven solution
- **Use `fallback={null}`** - This is critical to avoid visual flashing during app load
- **Do NOT modify AppProvider logic** - The issue is architectural, not in the provider itself
- **Do NOT add loading skeletons** - The null fallback is the correct approach per Next.js 16 best practices
- **Do NOT use dynamic imports** - That's a workaround; Suspense is the proper fix
- Keep all existing functionality and UI intact
</constraints>

<implementation_steps>
1. Open `src/app/client-layout.tsx` (or wherever AppProvider is used - likely at the app root)
2. Import `Suspense` from `'react'` if not already imported
3. Wrap the content that uses AppProvider with:
   ```
   <Suspense fallback={null}>
     <AppProvider>
       {children}
     </AppProvider>
   </Suspense>
   ```
4. Verify the pattern matches `src/app/(main)/layout.tsx` where HeaderClient is wrapped
5. Test that prerendering works: No visual changes, just blocking error gone
</implementation_steps>

<verification>
Before declaring complete:

1. Run `pnpm build` and verify:
   - `/elements/[element-id]` route builds successfully
   - No "Uncached data accessed outside of Suspense" errors
   - Build completes without errors

2. Check the page renders correctly:
   - Navigate to `/elements/[element-id]` (any element)
   - Page loads without flashing
   - Theme and UI render normally
   - No console errors

3. Verify functionality:
   - Settings panel still opens/closes
   - Theme switching still works
   - All context-dependent features function normally

4. Visual inspection:
   - No blank state on initial load
   - No flickering when navigating to the element detail page
   - Header renders smoothly
</verification>

<success_criteria>
- ✓ Build completes successfully (`pnpm build`)
- ✓ No "Uncached data accessed outside of Suspense" errors
- ✓ `/elements/[element-id]` route prerendering succeeds
- ✓ Page renders immediately without Suspense fallback flashing
- ✓ AppProvider context is available to all pages
- ✓ All theme and settings functionality works normally
- ✓ No visual regression or flashing on page load
- ✓ Solution matches the proven HeaderClient Suspense pattern
</success_criteria>

<output>
Modify:
- `src/app/client-layout.tsx` (or root layout file using AppProvider) - Wrap AppProvider with `<Suspense fallback={null}>`

The fix should be minimal: just add the Suspense boundary, no other changes needed.
</output>
