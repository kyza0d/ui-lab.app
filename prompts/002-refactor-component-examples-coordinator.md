<objective>
You are orchestrating a component examples refactoring initiative across the UI Lab registry. Your role is to coordinate multiple sub-agents to refactor components from using hardcoded variants to using auto-generated examples.json files as the single source of truth.

This refactoring addresses the findings in COMPONENT_EXAMPLES_AUDIT_REPORT.md - specifically that 30 components currently maintain duplicate example definitions in both hardcoded variants arrays AND generated examples.json files, creating maintenance burden and inconsistency.

Your mission: Successfully refactor the first batch of HIGH priority components (Button and Toast) to establish a reusable pattern that can scale to the remaining 28 components.

Outcome: Two fully refactored components that serve as templates for subsequent refactoring phases, with clear documentation of the refactoring approach.
</objective>

<context>
You are working within a monorepo structure:
- Root: /home/kyza/Projects/ui-lab/app/
- Registry components: packages/registry/src/components/
- Component implementations: packages/components/src/components/

Key files:
- @COMPONENT_EXAMPLES_AUDIT_REPORT.md - The audit analysis showing all components and their current state
- @packages/registry/src/utils/load-component-examples.ts - The utility function that merges component examples with generated JSON
- @packages/registry/scripts/generate-examples-json.ts - Script that generates examples.json from example .tsx files
- @packages/registry/src/components/Button/ - HIGH priority component #1
- @packages/registry/src/components/Toast/ - HIGH priority component #2

Project context:
- This is a component library documentation site using Next.js
- Components have variant showcase and interactive preview examples
- The goal is to move variant definitions into dedicated example files rather than hardcoding them

Current problem:
Button has 4 hardcoded variants (default, secondary, outline, ghost)
Toast has 5 hardcoded variants (default, success, destructive, info, warning)
Both also have preview examples and controls that are partially hardcoded
This duplication needs to be eliminated.

Success means:
1. Button: All 4 variants moved to example files, examples.json updated, index.tsx simplified
2. Toast: All 5 variants moved to example files, examples.json updated, index.tsx simplified
3. Clear refactoring template documented for scaling to other components
</context>

<requirements>
You must accomplish this through a parallel multi-agent approach:

1. **Analyze Phase** (single agent):
   - Thoroughly examine the current structure of Button and Toast components
   - Understand how the loadComponentExamples utility works
   - Document the current variant structure and example patterns
   - Create a detailed refactoring plan with exact steps

2. **Refactor Phase** (parallel agents - ONE for each component):
   - Launch TWO independent agents in parallel:
     * Agent 1: Refactor Button component
     * Agent 2: Refactor Toast component
   - Each agent should:
     * Move each hardcoded variant into a separate example .tsx file
     * Extract metadata (title, description) for each variant
     * Update/regenerate examples.json with all variants
     * Simplify index.tsx to remove hardcoded variants array
     * Ensure loadComponentExamples() loads all variants correctly
     * Run type-check and verify no breaking changes

3. **Validation Phase** (single agent):
   - After both refactoring agents complete
   - Verify Button refactoring is complete and correct
   - Verify Toast refactoring is complete and correct
   - Document the refactoring pattern and learnings
   - Create a template guide for refactoring remaining components

4. **Documentation Phase** (single agent):
   - Create REFACTORING_PATTERN.md documenting:
     * Step-by-step guide for refactoring a component
     * Before/after code examples
     * Common pitfalls and solutions
     * How to run the examples.json generator script
   - Update COMPONENT_EXAMPLES_AUDIT_REPORT.md to mark Button and Toast as REFACTORED

Execution strategy: Use the Task tool to launch sub-agents for the parallel refactoring phase. Coordinate their work using clear task descriptions.
</requirements>

<constraints>
1. **Source of Truth**: examples.json files (generated from example files) must become the source of truth, not hardcoded variants
2. **Type Safety**: All TypeScript changes must pass `pnpm type-check` without errors
3. **No Breaking Changes**: The refactored components must function identically to before from a user perspective
4. **Consistency**: Follow the existing pattern in Breadcrumbs component which has minimal hardcoding
5. **Preserve Functionality**:
   - Preview examples with controls must continue to work
   - All variant showcases must render correctly
   - Component documentation display must be unaffected
6. **File Organization**: Use the standard pattern:
   - examples/ directory for variant and example files
   - examples.json at component root
   - Metadata embedded in each example file
7. **No External Dependencies**: Don't add new npm packages; work within existing tooling

Why these constraints matter:
- Type safety ensures production quality
- Breaking changes would affect the documentation site
- Consistency helps with future scaling
- File organization aligns with the established pattern
- Preserving functionality ensures examples remain discoverable and useful
</constraints>

<implementation>
Follow this approach:

**Phase 1: Analysis (Execute Sequentially)**
1. Create a detailed analysis of Button and Toast current structure
   - Review current index.tsx for both components
   - Document all hardcoded variants (titles, descriptions, code, previews)
   - Analyze the loadComponentExamples utility thoroughly
   - Create the refactoring plan document

**Phase 2: Refactoring (Execute in Parallel)**
2. Launch Agent 1 to refactor Button:
   - Create example files for each variant (02-secondary-button.tsx, 03-outline-button.tsx, 04-ghost-button.tsx)
   - Extract metadata from current hardcoded variants
   - Update examples.json with all variants
   - Remove hardcoded variants array from index.tsx
   - Keep only minimal preview example if needed for interactive controls
   - Run type-check

3. Launch Agent 2 to refactor Toast (in parallel with Agent 1):
   - Create example files for each variant (02-success-toast.tsx, 03-destructive-toast.tsx, 04-info-toast.tsx, 05-warning-toast.tsx)
   - Extract metadata from current hardcoded variants
   - Update examples.json with all variants
   - Remove hardcoded variants array from index.tsx
   - Keep only minimal preview example if needed for interactive controls
   - Run type-check

**Phase 3: Validation (Execute After Both Complete)**
4. Verify both refactorings:
   - Check Button examples are all loading correctly
   - Check Toast examples are all loading correctly
   - Verify no console errors or type issues
   - Confirm all variants display properly

**Phase 4: Documentation (Execute Last)**
5. Create refactoring template guide
   - Document the exact steps taken for Button and Toast
   - Create before/after comparison showing the pattern
   - Include template example files for reuse
   - Document how to run generate-examples-json.ts script

6. Update main audit report
   - Mark Button as REFACTORED ✅
   - Mark Toast as REFACTORED ✅
   - Note the successful completion of Phase 1
</implementation>

<output>
Create or modify the following files:

**Analysis Output**:
- ./prompts/002-analysis-button-toast-structure.md - Detailed analysis of current component structure and refactoring plan

**Refactoring Outputs** (per component):
- packages/registry/src/components/Button/examples/02-secondary-button.tsx
- packages/registry/src/components/Button/examples/03-outline-button.tsx
- packages/registry/src/components/Button/examples/04-ghost-button.tsx
- packages/registry/src/components/Button/examples.json (regenerated)
- packages/registry/src/components/Button/index.tsx (simplified)

- packages/registry/src/components/Toast/examples/02-success-toast.tsx
- packages/registry/src/components/Toast/examples/03-destructive-toast.tsx
- packages/registry/src/components/Toast/examples/04-info-toast.tsx
- packages/registry/src/components/Toast/examples/05-warning-toast.tsx
- packages/registry/src/components/Toast/examples.json (regenerated)
- packages/registry/src/components/Toast/index.tsx (simplified)

**Documentation Outputs**:
- ./REFACTORING_PATTERN.md - Complete guide for refactoring components (this becomes the template for remaining components)
- ./COMPONENT_EXAMPLES_AUDIT_REPORT.md - Updated to mark Phase 1 as complete with results

**Status File** (optional but helpful):
- ./REFACTORING_PROGRESS.md - Track which components have been refactored
</output>

<success_criteria>
✓ Analysis phase completes with clear refactoring plan documented
✓ Button refactoring completes:
  - All 4 variants have dedicated example files
  - examples.json contains all variant code
  - index.tsx no longer has hardcoded variants array
  - pnpm type-check passes
  - Component displays correctly in documentation site
✓ Toast refactoring completes (parallel with Button):
  - All 5 variants have dedicated example files
  - examples.json contains all variant code
  - index.tsx no longer has hardcoded variants array
  - pnpm type-check passes
  - Component displays correctly in documentation site
✓ REFACTORING_PATTERN.md exists and clearly documents the process
✓ COMPONENT_EXAMPLES_AUDIT_REPORT.md updated showing Phase 1 complete
✓ No breaking changes - components function identically to before
✓ Clear documentation allows remaining 28 components to follow the same pattern

Verification: After completion, verify by:
1. Check both components load examples correctly in documentation site
2. Confirm all variant showcase links work
3. Run pnpm type-check across the registry
4. Review simplified index.tsx files - should be ~40-50% smaller
</success_criteria>

<notes>
This is Phase 1 of a 4-phase refactoring initiative:
- Phase 1 (THIS): HIGH priority components (Button, Toast) - Establishes pattern
- Phase 2 (FUTURE): MEDIUM priority components (14 components) - Scale the pattern
- Phase 3 (FUTURE): LOW priority components (13 components) - Continue scaling
- Phase 4 (FUTURE): Cleanup and optimization - Remove duplication utility if needed

The successful completion of Phase 1 will validate the approach and provide a clear template for subsequent phases. The parallel refactoring of Button and Toast will demonstrate that the approach scales well.
</notes>
