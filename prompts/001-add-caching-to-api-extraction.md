<objective>
Implement a caching layer for API documentation extraction to reduce the 30-60 second execution time. The goal is to parse component TSX files only when they've changed, storing the results to disk so subsequent runs skip unnecessary TypeScript AST parsing.
</objective>

<context>
The registry generation script (`packages/registry/scripts/generate-registry-data.ts`) calls `extractAllComponentAPIs()` which uses `react-docgen-typescript` to parse component props and types. TypeScript AST parsing is computationally expensive, and the current implementation re-parses all components on every run, causing 30-60 second delays.

@packages/registry/scripts/generate-api-data.ts - The main file to optimize
@packages/registry/scripts/generate-registry-data.ts - Entry point that calls the extraction
@packages/registry/src/types.ts - Type definitions for ComponentAPI and related types
@packages/components/src/components - The component directory being parsed

The solution should:
- Cache parsed API data to disk (JSON or TypeScript module)
- Track file modification times to detect when components have changed
- Invalidate cache entries only when the corresponding component file is modified
- Provide a way to clear the cache if needed
- Remain transparent to callers (no API changes to extractAllComponentAPIs)
</context>

<requirements>
1. Create a cache utility module that handles:
   - Reading/writing cache to `packages/registry/.cache/api-data.json`
   - Tracking file hashes or modification timestamps for each component
   - Comparing current file state with cached state
   - Returning cached data when files haven't changed

2. Implement cache invalidation logic:
   - Check if source files have been modified since cache was created
   - Only re-parse components whose files have changed
   - Update cache with new data
   - Handle deletion of components (remove from cache)

3. Modify `extractAllComponentAPIs()` to:
   - Check cache before calling the expensive parser
   - Use cached results when available
   - Only parse files that are missing from cache or have been modified
   - Write new results back to cache

4. Performance requirement:
   - First run: May be 30-60s (full parse)
   - Subsequent runs with no changes: < 1-2 seconds (cache hit)
   - Incremental changes: Parse only changed components

5. Cache should include:
   - Parsed API data (props, subComponents, examples)
   - File modification timestamps or content hashes
   - Metadata (when cache was created, registry version)
</requirements>

<implementation>
Approach:
- Use Node.js `fs.statSync()` to get file modification times (cheaper than hashing)
- Store cache as JSON in `packages/registry/.cache/api-data.json`
- Keep cache metadata simple: { timestamp, files: { [componentName]: { hash, api, mtime } } }
- Don't add external dependencies; use only Node.js built-ins

Why this approach:
- Modification times are faster than content hashing
- JSON cache is human-readable and debuggable
- No external dependencies keeps the build lean
- File timestamps automatically invalidate cache when sources change

What to avoid:
- Don't try to update cache in-place during parsing (could corrupt on failures)
- Don't implement complex cache versioning; simple mtime checks are sufficient
- Don't add user-facing cache management commands yet (KISS principle)
</implementation>

<output>
Create/modify these files:

- `./packages/registry/scripts/cache-api-data.ts` - New cache utility module with:
  - `loadApiCache()` function
  - `saveApiCache()` function
  - `getCachedOrParse()` helper that wraps extractComponentAPI logic
  - Type definitions for cache structure

- `./packages/registry/scripts/generate-api-data.ts` - Modify to:
  - Import and use the cache module
  - Update `extractAllComponentAPIs()` to check cache before parsing
  - Update `extractComponentAPI()` to skip parsing for cached components

- `./packages/registry/.cache/` - Create directory (add to .gitignore if not present)

- `.gitignore` - Add `packages/registry/.cache/` if it exists
</output>

<verification>
After implementation:
1. Delete `packages/registry/.cache/` to start fresh
2. Run `pnpm --filter @ui-lab/registry run generate` or equivalent script
3. Verify it takes 30-60 seconds (full parse)
4. Run the script again immediately
5. Verify it now takes < 2 seconds (cache hit)
6. Modify one component file (add a prop comment)
7. Run the script again
8. Verify it takes 2-5 seconds (only that component re-parsed)
9. Verify cache file exists at `packages/registry/.cache/api-data.json`
</verification>

<success_criteria>
- Cache successfully reduces subsequent runs from 30-60s to < 2s
- Cache properly invalidates when component files change
- No TypeScript compilation errors
- No changes needed to the public API of extractAllComponentAPIs
- Cache file is human-readable JSON
- First run after cache deletion takes the expected 30-60s
</success_criteria>
