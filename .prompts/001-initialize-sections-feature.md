<objective>
Initialize a new Sections feature for the UI Lab that mirrors the Elements architecture but contains predefined designs for common website sections (like Heroes, CTAs, Features, etc.). Create the foundational structure, establish two Hero section examples, and implement reusable components so that both Elements and Sections grids render identically without duplication.

This feature will provide ready-made section designs that developers can drop into their layouts, complementing the lower-level Elements while promoting design consistency and rapid prototyping.
</objective>

<context>
The project is a monorepo using pnpm with Next.js (Turbopack) for the site and a component library structure. The Elements feature already exists at @apps/site/src/features/elements/ and is registered in @packages/registry/src/elements/.

Key observations about the Elements implementation:
- Elements are defined with metadata (id, name, description, category, tags, layout config)
- Each element has variants stored in variations/ directories
- The registry auto-generates from scripts/generate-element-registry.ts
- Layout configuration controls grid positioning (columnSpan, rowSpan, layoutClass)
- A Gallery component renders items with layout config applied
- The ElementsGridClient component iterates elements and uses getPreviewComponent()
- PreviewContainer wraps previews with layout styling

Current structure:
- Elements are at: packages/registry/src/elements/{ElementName}/
- Elements site features are at: apps/site/src/features/elements/
- Types are defined in: packages/registry/src/types.ts

You need to:
1. Determine what code can be extracted into a reusable grid/gallery component
2. Create parallel Sections structure under packages/registry/src/sections/
3. Create site features under apps/site/src/features/sections/
4. Implement two Hero section examples with realistic full-page layouts
5. Ensure the agent knows how to extend Sections (add new section types)
6. Document the pattern so other developers can follow it
</context>

<requirements>
1. **Reusable Grid Component**: Identify what ElementsGridClient does generically and extract it into a reusable GenericGridClient that works for any item type (elements, sections, etc.). This component should:
   - Accept a generic items array
   - Use layout config for grid positioning
   - Use a preview component function
   - Handle click navigation to detail pages
   - Support customizable item rendering (header, footer, etc.)

2. **Sections Type Definition**: Add a SectionMetadata type to packages/registry/src/types.ts that extends or mirrors ElementMetadata for sections. Include:
   - id, name, description, category, tags
   - variants array with section-specific layout examples
   - fullPageLayout: boolean or flag indicating it's a complete section
   - componentDependencies for tracking used components

3. **Sections Directory Structure**: Create:
   - packages/registry/src/sections/ (mirror of elements/)
   - packages/registry/src/sections/Hero/variations/01-simple/ and 02-with-cta/
   - Auto-generation script adaptation or extend existing scripts

4. **Two Hero Examples** that are production-ready:
   - **01-simple**: Clean hero with background image, headline, subheading, and CTA button
   - **02-with-cta**: Hero with alternating text/image layout, multiple CTAs, and feature highlights
   - Each should use existing UI components from ui-lab-components where possible
   - Each should include a getPreview() function for grid display

5. **Site Feature Mirroring**: Create parallel features structure:
   - apps/site/src/features/sections/lib/ (similar to elements/lib/)
   - apps/site/src/features/sections/components/ (include SectionsGridClient based on reusable grid)
   - Determine which components from elements/ can be reused/adapted (sort, filter, search, sidebar, etc.)

6. **Extraction Opportunities**: Identify and document which components/utilities can be shared:
   - PreviewContainer can probably be shared as-is
   - ElementsGridClient logic should become GenericGridClient
   - Sort/Filter/Search logic is likely agnostic
   - Layout configuration logic is reusable
   - Side-by-side comparison: which elements/sections components differ vs. which are identical

7. **Extension Documentation**: The agent should create inline comments or mental notes about how to:
   - Add a new section type (e.g., "FeatureGrid" section)
   - Where the auto-generation runs and what it expects
   - How variations are structured
   - How metadata flows to the site

</requirements>

<implementation>
**Approach:**
1. Start by thoroughly analyzing the Elements implementation to understand all moving parts
2. Extract generic grid rendering logic into a reusable component
3. Create the Sections parallel structure following Elements patterns exactly
4. Implement the two Hero examples with full, realistic designs
5. Update imports and references incrementally
6. Document the reusability pattern for future developers

**What to Avoid:**
- Don't duplicate code between Elements and Sections grids; use shared components
- Don't create one-off utilities; if code is used twice, extract it
- Don't hardcode component paths; use configurable functions for preview resolution
- Don't assume Sections are just smaller Elements; allow for full-page section layouts with different metadata
- Don't skip type definitions; Sections should be properly typed from the start

**Code Style:**
- Follow CLAUDE.md: use kebab-case for file names, PascalCase for component directories
- No comments; write self-documenting code with clear variable/function names
- Keep components compact and focused
- Use TypeScript for type safety
</implementation>

<output>
Commit message: "feat(sections): initialize sections feature with hero examples and shared grid component"

Create/modify these files:

**Type Definitions:**
- `packages/registry/src/types.ts` - Add SectionMetadata interface

**Reusable Grid Component:**
- `apps/site/src/features/shared/components/generic-grid-client.tsx` - Extracted grid rendering logic

**Sections Registry Structure:**
- `packages/registry/src/sections/index.ts` - Registry generation (mirror elements/index.ts)
- `packages/registry/src/sections/Hero/index.tsx` - Hero metadata and preview
- `packages/registry/src/sections/Hero/variations.json` - Variations data
- `packages/registry/src/sections/Hero/variations/01-simple/index.tsx` - Simple hero
- `packages/registry/src/sections/Hero/variations/01-simple/layout/Hero.tsx` - Hero component
- `packages/registry/src/sections/Hero/variations/02-with-cta/index.tsx` - Hero with CTA layout
- `packages/registry/src/sections/Hero/variations/02-with-cta/layout/HeroWithCTA.tsx` - CTA hero component

**Site Features (Sections):**
- `apps/site/src/features/sections/index.ts` - Feature exports
- `apps/site/src/features/sections/lib/get-section-preview.ts` - Preview component resolution
- `apps/site/src/features/sections/lib/layout-registry.ts` - Section layout config
- `apps/site/src/features/sections/components/sections-grid-client.tsx` - Grid renderer for sections
- `apps/site/src/features/sections/components/sections-sidebar.tsx` - Sidebar (can reuse from elements)
- `apps/site/src/features/sections/components/sections-search-header.tsx` - Search (can reuse from elements)

**Updates to Existing Files:**
- `apps/site/src/features/elements/components/elements-grid-client.tsx` - Refactor to use GenericGridClient
- `apps/site/src/features/elements/lib/element-layout-config.ts` - No changes needed, pattern is reusable
- Create corresponding lib files for sections using the same pattern

The grid and layout logic is almost identical; capture that reusability in the GenericGridClient so future collectors (Products, Features, etc.) can also use it without duplication.
</output>

<verification>
Before declaring complete, verify your work:
1. Both ElementsGridClient and SectionsGridClient render without errors
2. Elements page still displays all elements correctly
3. Create a new Sections page (/sections) that displays the two Hero examples using SectionsGridClient
4. Sections sidebar/search/filter follow the same patterns as Elements and use the same generic components where applicable
5. Type safety: SectionMetadata is properly typed and used throughout
6. The two Hero examples are visually distinct, production-ready, and use real UI components (not placeholder divs)
7. Hero 01-simple is truly simple (clean, minimal)
8. Hero 02-with-cta is more complex (layout options, multiple CTAs, feature highlights)
9. Both heroes are responsive and look good at different viewport sizes
10. Code for ExtensionPatternReview: Pick a hypothetical new section type (e.g., "FeaturedGrid"), verify you could add it without modifying any grid/layout logic—only registry and metadata

After implementation, create a brief mental or inline note documenting:
- Where shared components live (generic-grid-client.tsx)
- How sections are structured (parallel to elements)
- How to add a new section type (create folder, manifest, variations)
- Why ElementsGridClient and SectionsGridClient are now thin wrappers around GenericGridClient
</verification>

<success_criteria>
✓ GenericGridClient created and used by both Elements and Sections
✓ SectionMetadata type defined and integrated into registry
✓ Two Hero section examples implemented with distinct, production-quality designs
✓ Sections feature mirrors Elements structure (lib/, components/, index.ts exports)
✓ No code duplication between grid renderers
✓ Elements page still works; Sections page displays both heroes
✓ Layout config and preview resolution work for Sections
✓ File structure follows project conventions (kebab-case files, PascalCase components)
✓ TypeScript compilation passes without errors
✓ Clear extension path documented (how to add new section types)
</success_criteria>
