<objective>
Implement parallel processing for API extraction to further accelerate the registry generation. Assuming caching from prompt 001 is in place and working, this prompt focuses on parsing multiple component files concurrently using Node.js worker threads, reducing the parse time for uncached runs.
</objective>

<context>
This prompt assumes:
- Caching has been successfully implemented (prompt 001: add-caching-to-api-extraction.md)
- The `packages/registry/.cache/api-data.json` cache is working
- Cache misses still take 30-60 seconds because parsing is sequential

The bottleneck is in `extractAllComponentAPIs()` which iterates through components one-by-one and calls `extractComponentAPI()`. Even though caching helps with unchanged components, developers who modify multiple components or pull fresh code still experience the full sequential parse time.

@packages/registry/scripts/generate-api-data.ts - Main file to parallelize
@packages/registry/scripts/cache-api-data.ts - The cache module created in prompt 001
@packages/registry/scripts/generate-registry-data.ts - The runner script
@packages/components/src/components - Components being parsed

Goal: Reduce uncached parse time from 30-60s to 10-20s by parsing 3-4 components in parallel.
</context>

<requirements>
1. Create a worker thread pool implementation:
   - Process 3-4 components in parallel (not all at once to avoid CPU thrashing)
   - Reuse worker threads across multiple parse operations
   - Handle errors gracefully without crashing the entire process
   - Keep pool size configurable (default 4)

2. Modify the extraction pipeline:
   - Split components into batches for parallel processing
   - Use worker threads to parse components concurrently
   - Coordinate results and aggregate into single output object
   - Maintain same output structure as sequential version

3. Worker thread setup:
   - Create `packages/registry/scripts/api-parser-worker.ts` that:
     - Receives component directory name
     - Calls react-docgen-typescript parser
     - Returns parsed API data
     - Handles errors and logs failures

4. Update `extractAllComponentAPIs()`:
   - Determine components that need parsing (cache miss or modified)
   - Batch uncached components into groups of 3-4
   - Spawn worker threads for each batch
   - Aggregate results back together
   - Maintain cache hits (skip parsing for unchanged components)

5. Performance targets:
   - First clean run (no cache): 10-20 seconds for typical 15-20 components
   - With cached components: < 2 seconds overall
   - Memory usage: < 200MB during parsing
</requirements>

<implementation>
Approach:
- Use Node.js `worker_threads` module (built-in, no new dependencies)
- Keep worker pool size at 4 (balance between parallelism and overhead)
- Use a simple queue-based approach (no external thread pool library)
- Worker threads communicate via message passing

Why this approach:
- Worker threads share memory efficiently vs spawning child processes
- Built-in module avoids new dependencies
- Pool of 4 allows CPU cores to work while avoiding context-switch overhead
- Message passing is simple and safe

What to avoid:
- Don't use `child_process` (higher overhead, separate V8 instances)
- Don't spawn unlimited workers (will thrash CPU and memory)
- Don't share parser instances across threads (react-docgen-typescript may have state)
- Don't make the worker implementation overly complex (queue batching is sufficient)

Performance tips:
- Parse only components that are cache misses
- Load cache early in the process
- Separate parsing into worker vs main thread before batching
</implementation>

<output>
Create/modify these files:

- `./packages/registry/scripts/api-parser-worker.ts` - New worker thread file with:
  - Receives `{ componentDirName: string }` message from main thread
  - Calls `extractComponentAPI()` synchronously
  - Returns parsed API or error
  - Handles and reports failures via worker message

- `./packages/registry/scripts/parallel-extract.ts` - New module with:
  - `WorkerPool` class managing thread pool (size 4)
  - `parseComponentsInParallel()` function
  - Queue management for batching components
  - Error aggregation and reporting
  - Cleanup on completion

- `./packages/registry/scripts/generate-api-data.ts` - Modify to:
  - Import `parseComponentsInParallel()`
  - In `extractAllComponentAPIs()`:
    - Load cache first
    - Identify components needing parse (cache miss)
    - Call `parseComponentsInParallel()` for those
    - Merge cached results with new results
    - Update cache with new data
  - Keep existing functions unchanged for worker use

- `./packages/registry/scripts/api-parser-worker.ts` - Implementation notes:
  - Import `extractComponentAPI()` and `withCustomConfig` parser setup
  - Listen for messages via `worker.on('message')`
  - Send results back via `parentPort.postMessage()`
  - Handle errors and send failure messages
</output>

<verification>
After implementation:
1. Delete `packages/registry/.cache/` to force full parse without cache
2. Run registry generation script and time it
3. First run should take 10-20 seconds (parallel parsing)
4. Delete cache again and run a second time to verify consistent performance
5. Modify one component file
6. Run script again - should be < 3 seconds (cache hits for others, fast parse for one)
7. Verify no TypeScript compilation errors
8. Verify output matches sequential version (same API data structure)
9. Check memory usage stays below 200MB during peak parsing
10. Verify worker pool properly closes and no processes hang
</verification>

<success_criteria>
- First clean run (no cache) reduced from 30-60s to 10-20s
- Parallel parsing produces identical results to sequential version
- Cache integration works seamlessly (cache hits skip parsing entirely)
- Worker threads properly cleanup on completion
- No TypeScript errors or warnings
- Memory usage stays reasonable (< 200MB)
- Error handling doesn't crash on parse failures (logs and continues)
- Code is maintainable and doesn't introduce complex async patterns
</success_criteria>
