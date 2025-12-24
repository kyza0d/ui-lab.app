<objective>
Clean slate refactor of the elements system. Remove all existing element code and infrastructure from @packages/registry/src/elements/, and establish the foundational directory structure and exports for the new file-based, variation-driven architecture.

The goal is to delete the old system entirely and create a blank canvas with proper infrastructure in place, so that the next prompt can implement a complete, production-ready Header element as the validation and template for the new architecture.
</objective>

<context>
The project uses a monorepo with two main packages:
- @packages/registry: Contains component examples and element definitions
- @apps/site: Next.js application that renders components and elements

Current state to remove:
- @packages/registry/src/elements/ contains hardcoded .ts files (card.ts, header.ts, sidebar.ts)
- These define metadata, variants, component dependencies, layout config
- Site currently imports and renders these elements on /elements routes

What to preserve:
- @apps/site/src/app/(main)/elements/ - All rendering infrastructure
- @apps/site routes and components that display elements
- Site should be prepared for the new element structure but doesn't need elements yet

New architecture to establish:
- Empty ./packages/registry/src/elements/ directory with proper structure
- Scaffold infrastructure for the new pattern (index.ts, types if needed)
- Directory structure ready for individual element implementations
- Each element will follow pattern: [Element]/metadata.json, variations.json, index.ts, variations/[id]/page.tsx

Files to examine before deletion:
@packages/registry/src/elements/ - Document what's being removed (for reference in prompt 002)
@apps/site/src/app/(main)/elements/ - Understand how elements are rendered so we don't break it
@packages/registry/src/index.ts - See what's currently exported
</context>

<requirements>
1. **Document and remove old system**:
   - Review the current elements implementation and document it (for reference/learning)
   - Delete all content in @packages/registry/src/elements/ except for what we're replacing
   - Remove element-related exports from @packages/registry/src/index.ts that point to the old system

2. **Create new foundational structure**:
   - Create @packages/registry/src/elements/index.ts with:
     - Export statements ready for future elements
     - Types or interfaces if needed for the new structure
     - Comments explaining the new architecture
   - Ensure the directory is ready for nested element implementations

3. **Update registry exports**:
   - Update @packages/registry/src/index.ts to export from the new elements structure
   - Make sure site can still import elements (even if empty for now)
   - Keep the export pattern consistent with how components are exported

4. **Prepare site integration**:
   - Review site code that imports/uses elements
   - Update any imports to work with new structure (or keep them compatible)
   - Ensure site won't break when elements are empty

Avoid:
- Creating any element implementations (save for next prompt)
- Changing component architecture or other packages
- Breaking site functionality - the rendering infrastructure should remain intact
- Over-engineering the initial structure
</requirements>

<constraints>
- All old element code must be removed to ensure clean break
- Site rendering infrastructure must remain functional (even if no elements exist yet)
- The new structure must be ready to support the pattern: metadata.json, variations.json, variations/[id]/page.tsx
- Reference CLAUDE.md for any code style/patterns this project uses
</constraints>

<output>
Execute the cleanup and setup:
- Remove all content from ./packages/registry/src/elements/ (except creating new structure)
- Create new ./packages/registry/src/elements/index.ts with proper exports and documentation
- Update ./packages/registry/src/index.ts to reference new elements structure
- Update site imports if necessary to work with the new (empty) structure

After completion, output a summary of:
- What was removed/deleted
- New foundational structure created
- Changes made to exports
- Confirmation that site infrastructure remains intact
- Clear description of what elements directory is ready for
</output>

<verification>
Before declaring complete:
1. Verify old element files (card.ts, header.ts, sidebar.ts, etc.) are deleted
2. Check that ./packages/registry/src/elements/index.ts exists with proper exports
3. Verify site still builds (even with no elements): `pnpm run build:site`
4. Ensure TypeScript has no critical compilation errors: `pnpm type-check`
5. Confirm site routes for elements don't crash (may show empty state, that's fine)
6. Check @packages/registry/src/index.ts properly exports elements
</verification>

<success_criteria>
- All old element code completely removed
- New empty elements directory structure created with proper infrastructure
- Exports properly updated for new structure
- Site builds successfully without breaking rendering infrastructure
- Directory is clean slate, ready for new element implementations in next prompt
- Code is documented explaining the new architecture
</success_criteria>
