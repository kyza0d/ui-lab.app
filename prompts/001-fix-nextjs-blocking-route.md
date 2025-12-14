<objective>
Fix the "Blocking Route" error in the component detail page (@apps/site/src/app/components/@content/[component]/page.tsx) by researching and implementing the official Next.js 16 pattern for handling Promise-based params without causing route blocking. The error currently prevents the page from rendering until params are resolved, causing poor user experience and the Suspense workaround is masking the underlying issue.
</objective>

<context>
Project: UI Lab (Next.js 16.0.10 with Turbopack)
File to fix: @apps/site/src/app/components/@content/[component]/page.tsx
Current issue: The server component is accessing a Promise-based `params` object outside of a Suspense boundary, which blocks the entire route from rendering.

Current problematic code at line 44:
```
return <ComponentDetailClient params={params} />
```

The component receives params as `Promise<{ component: string }>` but passes it directly to a client component without awaiting it first. This violates Next.js 16's streaming/concurrent rendering model.
</context>

<research>
Before implementing, research the official Next.js 16 documentation to understand:

1. The correct pattern for handling Promise-based params in Server Components (investigate if params should be awaited at the server level)
2. Whether the issue is that we're passing an unresolved Promise to a Client Component (which can't handle Promises)
3. The recommended approach: should ComponentDetailClient be converted to a server component, or should params be awaited in the current server component?
4. Check Next.js 16 breaking changes or migration guides related to params handling since Next.js 15
5. Verify whether experimental_ppr is the only solution or if there's a standard pattern (we want to avoid deprecated/experimental features)

Thoroughly analyze the official Next.js documentation to determine the best practice approach.
</research>

<requirements>
1. Research official Next.js 16 patterns for Promise-based params handling
2. Implement the recommended solution that:
   - Eliminates the blocking route error
   - Doesn't use experimental features or deprecated patterns
   - Maintains the current component architecture as much as possible (keep ComponentDetailClient as a client component if reasonable)
   - Keeps the loading state/suspense pattern if it's part of the official recommendation
3. Update the component file to follow the correct pattern
4. Verify the fix works by checking that the error no longer appears in development
5. Document your findings about which pattern is the official Next.js 16 approach in your explanation
</requirements>

<constraints>
- Do NOT use experimental_ppr or any experimental features
- Do NOT use deprecated patterns from older Next.js versions
- Do NOT make unnecessary changes to other files unless directly required by the fix
- Only modify what's necessary to resolve the blocking route error
- Follow the project's code style guidelines (see CLAUDE.md - no comments, self-documenting code)
</constraints>

<output>
After researching and implementing:

1. Update: `./apps/site/src/app/components/@content/[component]/page.tsx` - Apply the fix using the official Next.js 16 pattern
2. Brief explanation of: Which Next.js 16 pattern was used and why it solves the blocking route issue (text only, no separate documentation file)
</output>

<verification>
Before declaring the fix complete:
1. Verify the blocking route error no longer appears when running `pnpm dev:site`
2. Check that the component still renders correctly and shows the LoadingFallback while loading
3. Confirm that the component detail page loads without errors
4. Verify the solution uses official Next.js 16 patterns (check against Next.js 16 documentation)
</verification>

<success_criteria>
- The blocking route error is completely resolved
- The solution follows official Next.js 16 patterns (no experimental features)
- The component renders without errors
- The loading state still functions correctly
- The code is clean and self-documenting per project style guidelines
</success_criteria>
