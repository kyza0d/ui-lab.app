<objective>
Validate and fully implement the new element architecture by creating a complete, production-ready Header element with two variations (01-basic and 02-with-actions). This serves as both a proof-of-concept and template for the generation scripts that will automate this process for all elements.

The goal is to demonstrate the complete element structure, file organization, and establish the foundation for what generation scripts need to generate.
</objective>

<context>
This builds on the refactored architecture from prompt 001. The Header element will showcase:
- How element metadata flows through the system
- How variations are organized with supporting components
- What the page.tsx entry point should contain
- How variations.json and metadata.json are structured
- What generation scripts need to produce

Current state:
- Elements refactored to new structure
- Ready for a complete, detailed implementation
- Site is prepared to render elements

Files to examine:
@packages/registry/src/elements/Header/ - The header element (partially created from prompt 001)
@packages/registry/src/components/Button/examples/ - Example of how components organize examples
@apps/site/src/app/(main)/elements/ - How elements are rendered in the site
@packages/registry/src/types.ts - Type definitions for elements
</context>

<requirements>
1. **Create complete Header element structure**:
   - src/elements/Header/metadata.json - Element metadata (id, name, description, category, tags)
   - src/elements/Header/variations.json - Registry of both variations with names and descriptions
   - src/elements/Header/index.ts - Exports element metadata and variations

2. **Implement variation 01-basic**:
   - src/elements/Header/variations/01-basic/page.tsx - Main showcase component
   - src/elements/Header/variations/01-basic/layout/Header.tsx - Basic header component
   - The page.tsx should display:
     - The Header component at the top
     - Placeholder content blocks below showing where page content would go
     - Clean, organized layout showcasing the header in context

3. **Implement variation 02-with-actions**:
   - src/elements/Header/variations/02-with-actions/page.tsx - Main showcase with actions
   - src/elements/Header/variations/02-with-actions/layout/Header.tsx - Header with action buttons
   - src/elements/Header/variations/02-with-actions/components/ActionButtons.tsx - Custom action buttons component
   - The page.tsx should display:
     - The Header component with integrated action buttons
     - Placeholder content blocks below
     - Demonstrate how the header integrates actions

4. **Generate string representations**: Create a file that documents:
   - What each generated file should contain (code as strings)
   - The structure of variations.json and metadata.json
   - How the registry aggregates element data
   - What the generation script needs to produce for each element
   - Save this as src/elements/GENERATION_GUIDE.md

5. **Validate complete flow**:
   - Element should be queryable from the registry
   - Both variations should be loadable
   - Metadata should flow correctly through the system
   - Site should render the element detail page at /elements/header with both variations
</requirements>

<structure_and_examples>

**metadata.json structure**:
```json
{
  "id": "header",
  "name": "Header",
  "description": "Navigation header with branding and navigation elements",
  "category": "navigation",
  "tags": ["header", "navigation", "layout"]
}
```

**variations.json structure**:
```json
{
  "01-basic": {
    "name": "Basic Header",
    "description": "Simple header with logo and navigation links"
  },
  "02-with-actions": {
    "name": "Header with Actions",
    "description": "Header with logo, navigation, and action buttons"
  }
}
```

**index.ts structure**:
```typescript
import metadata from './metadata.json';
import variations from './variations.json';

export { metadata, variations };

// Also export the variation components for rendering
export { default as BasicHeader } from './variations/01-basic/page';
export { default as WithActionsHeader } from './variations/02-with-actions/page';
```

**page.tsx for variations** should:
- Import and render the layout component
- Include placeholder content areas to show context
- Export metadata object with title and description
- Be a self-contained, renderable React component

**GENERATION_GUIDE.md** should document:
- What files a generation script needs to create for each element
- The exact JSON structures for metadata.json and variations.json
- How the registry combines element metadata and variations
- Code string examples showing what each file template should generate
- Assumptions the generation script can make
- Variables that change per-element (id, name, description, variation names, etc.)
</structure_and_examples>

<constraints>
- Use actual React components, not placeholder text
- Follow the codebase's existing code style and patterns (see CLAUDE.md)
- The Header component should use components from ui-lab-components where appropriate
- Keep implementations realistic but simple - focus on demonstrating the architecture
- All TypeScript must be properly typed
- Use the project's existing CSS/styling approach
</constraints>

<output>
Create and organize:
- Complete Header element with all files specified above
- Both variation implementations (01-basic and 02-with-actions)
- GENERATION_GUIDE.md documenting what generation scripts need to produce
- Updated registry/site integration as needed

Output a summary showing:
- File structure created
- How each variation is structured
- Example of metadata/variations flow
- Next steps for automating this with generation scripts
</output>

<verification>
Before declaring complete:
1. Build the site: `pnpm run build:site`
2. Check TypeScript compilation: `pnpm type-check`
3. Verify Header element renders at /elements/header (if site is running)
4. Confirm both variations (01-basic, 02-with-actions) appear in variations.json
5. Check that metadata flows correctly to the registry
6. Validate all files exist with proper structure matching the conversation examples
7. Review GENERATION_GUIDE.md for completeness and clarity
</verification>

<success_criteria>
- Header element fully implemented with all required files
- Both variations complete with realistic implementations
- Metadata and variations properly structured as JSON
- Site can render the Header element and its variations
- GENERATION_GUIDE.md clearly documents what generation scripts must produce
- Structure serves as a template that could be replicated for other elements (Card, Sidebar)
- Code is properly typed and follows project conventions
</success_criteria>
