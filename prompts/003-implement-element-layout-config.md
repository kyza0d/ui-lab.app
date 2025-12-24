<objective>
Analyze the current layout system for elements in the masonry grid and implement a centralized, element-specific layout configuration that allows easy management of row and column span properties. This will provide a single source of truth for grid layout behavior instead of being hardcoded in components.
</objective>

<context>
The site currently displays elements in a masonry grid (ElementsGridClient.tsx) where each element gets its grid positioning (columnSpan, rowSpan) from a layout registry function. We need to create a centralized configuration system that:

1. Maps each element ID to its desired grid layout
2. Eliminates hardcoded span values from component logic
3. Makes it easy to adjust layout without modifying component code
4. Supports different layouts for different element IDs (Header might span 2 columns, Button might span 1)

Key files to examine:
@apps/site/src/components/elements/ElementsGridClient.tsx - Currently calls getLayoutConfig(element)
@apps/site/src/lib/layout-registry.ts - Currently implements getLayoutConfig function
@packages/registry/src/elements/Header/metadata.json - Element metadata structure
</context>

<requirements>
1. Create a centralized element layout configuration file in @apps/site/src/lib/ that maps element IDs to their grid properties
2. The configuration should include:
   - columnSpan: Number of columns the element should span (1-5, where 5 is full width)
   - rowSpan: Number of rows the element should span (1-2)
   - Include configuration for all existing elements (Header at minimum)
3. Refactor the existing getLayoutConfig function to use this new centralized config as its source of truth
4. Ensure the configuration is easy to read and modify - use a simple, declarative format
5. The config should have sensible defaults for elements not explicitly configured
</requirements>

<implementation>
Approach:
1. First, examine the current layout-registry.ts to understand how getLayoutConfig works
2. Analyze ElementsGridClient.tsx to see how layoutConfig is used
3. Create a new elementLayoutConfig.ts or similar file with a simple record/object mapping element IDs to layout properties
4. Update getLayoutConfig to read from this centralized config
5. Ensure the Header element (and any others) get appropriate span values

Design principles:
- Keep the configuration format simple and declarative - prefer objects/records over complex logic
- Use TypeScript for type safety - define an interface for layout config shape
- Provide a default configuration for unspecified elements so the grid doesn't break
- The configuration should be the single source of truth - avoid any span logic elsewhere in the grid component

Why these constraints matter:
- Declarative format makes it maintainable for future developers who aren't familiar with the codebase
- Type safety prevents configuration mistakes that would break the grid layout
- Centralization means changes to layout don't require understanding component rendering logic
- Defaults ensure new elements automatically get reasonable layouts without explicit config
</implementation>

<output>
Files to create/modify:

1. Create `./apps/site/src/lib/elementLayoutConfig.ts`:
   - Export an interface defining layout config shape: { columnSpan: number, rowSpan: number }
   - Export a Record mapping element IDs to their layout configurations
   - Include reasonable defaults for any unmapped elements
   - Add TypeScript types for safety

2. Modify `./apps/site/src/lib/layout-registry.ts`:
   - Update the getLayoutConfig function to read from the new elementLayoutConfig
   - Remove any hardcoded span logic - make it purely config-driven
   - Keep the same function signature and return type for backwards compatibility

3. No changes needed to ElementsGridClient.tsx or element files - the refactoring should be transparent
</output>

<verification>
Before declaring complete:
1. ✓ The new elementLayoutConfig.ts file exists and exports the element layout mappings
2. ✓ layout-registry.ts has been updated to use the config (verify by checking getLayoutConfig implementation)
3. ✓ The Header element is explicitly configured (should have appropriate span values)
4. ✓ Default configuration exists for unmapped elements
5. ✓ Type checking passes: `pnpm type-check` completes without errors in the site app
6. ✓ The grid still renders correctly (visually verify the layout hasn't broken)
</verification>

<success_criteria>
- Centralized element layout configuration file created with clear, declarative mappings
- All element IDs are mapped to their grid properties (columnSpan, rowSpan)
- Configuration is TypeScript-typed for safety
- getLayoutConfig reads exclusively from this centralized config
- No layout logic remains in component code
- Type-checking passes
- Configuration is easy to modify (adding a new element or changing spans requires only config file edits)
</success_criteria>
