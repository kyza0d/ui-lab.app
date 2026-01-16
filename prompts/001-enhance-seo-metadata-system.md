```xml
<objective>
Enhance the SEO metadata system to intelligently render rich, context-aware metadata across all site pages. The metadata should be sourced from different contexts: descriptions from .mdx frontmatter for documentation pages, and descriptions from the registry for components and elements.

The goal is to create a unified metadata generation system that leverages existing data sources (doc descriptions, component descriptions, element descriptions) to improve SEO without duplicating content.
</objective>

<context>
This is a Next.js site with multiple content types:
- Documentation pages (MDX files with YAML frontmatter in /content/docs/, /content/cli/, /content/agents-mcps/, /content/design-system/)
- Component pages (served from /packages/registry/src/components/)
- Element pages (served from /packages/registry/src/elements/)
- Gallery/hub pages (general collection pages)

Current setup:
- @apps/site/src/shared/lib/metadata.ts has a `generateMetadata()` function
- @apps/site/src/shared/lib/metadata-config.ts has route titles and helpers
- Dynamic pages already call generateMetadata() but may not be utilizing all available description sources
- MDX files have frontmatter with "description" fields
- Registry components/elements have metadata.json files with "description" fields

The metadata system should intelligently pull descriptions from the most relevant source based on page context.
</context>

<requirements>
1. **Enhance generateMetadata() function** to accept additional context parameters:
   - Add `sourceType` parameter: 'doc' | 'component' | 'element' | 'page'
   - Add `source` parameter: object containing raw data (frontmatter, component data, element data)
   - Function should intelligently extract description based on sourceType

2. **Create metadata extraction utilities** in a new file `@apps/site/src/shared/lib/metadata-extractors.ts`:
   - `extractDocMetadata()` - pulls from MDX frontmatter (title, description, keywords if available)
   - `extractComponentMetadata()` - pulls from registry component metadata (name, description)
   - `extractElementMetadata()` - pulls from registry element metadata (name, description)
   - Each extractor returns a normalized metadata object with title, description, keywords (if available)

3. **Update dynamic page routes** to use the enhanced system:
   - `/app/(main)/docs/[slug]/page.tsx` - use extractDocMetadata()
   - `/app/(main)/components/@content/[component]/page.tsx` - use extractComponentMetadata()
   - `/app/(main)/elements/@content/[element-id]/page.tsx` - use extractElementMetadata()
   - Gallery/hub pages should continue using pathname-based fallback titles

4. **Normalize metadata handling**:
   - All descriptions should be 150-160 characters (suitable for meta description tag)
   - If description is too long, intelligently truncate with ellipsis
   - If description is missing, use a sensible fallback (component name + "component" or element type)
   - Keywords should be optional but supported throughout the system

5. **Ensure OpenGraph compatibility**:
   - OG descriptions should also use the extracted descriptions
   - OG titles should use extracted titles where available
   - Maintain existing OG image strategy (for now, keep default image)

6. **Maintain backwards compatibility**:
   - Pages that don't provide source data should fall back to current behavior
   - Route titles should still work as fallback
   - No breaking changes to existing generateMetadata() calls
</requirements>

<implementation>
Follow this implementation strategy:

1. **Create the extractors file** (`metadata-extractors.ts`):
   - Define helper function to truncate descriptions to ~160 characters
   - Implement three extractor functions with proper TypeScript types
   - Export all extractors as a unified object

2. **Enhance generateMetadata()** in `metadata.ts`:
   - Add new optional parameters: `sourceType`, `source`, `keywords`
   - Update function logic to use extractors when sourceType is provided
   - Keep existing behavior as default fallback

3. **Update each dynamic page route**:
   - Import the appropriate extractor function
   - Call the extractor with the data you already have (frontmatter, registry data)
   - Pass the extracted metadata to generateMetadata()
   - Ensure descriptions are always passed to generateMetadata()

4. **Pattern for dynamic pages**:
   - Continue using Next.js generateMetadata() pattern
   - Get your data first (from filesystem, registry, etc.)
   - Call the appropriate extractor
   - Pass extracted data to generateMetadata()
   - Example: generateMetadata() should receive title, description, and optional keywords

5. **Fallback strategy**:
   - If description cannot be extracted, construct a reasonable one: "Learn about [Component Name]" or "Discover [Page Title]"
   - If title cannot be extracted, use existing route-based title system
   - Never show undefined or null in metadata

Why this approach:
- DRY principle: Don't duplicate descriptions in both metadata and content
- Centralized: All metadata logic flows through one generateMetadata() function
- Flexible: Supports current and future content types without major refactoring
- Maintainable: Changes to descriptions in frontmatter/registry automatically update SEO
</implementation>

<output>
Create and modify the following files with relative paths:

1. **Create new metadata extractor utilities:**
   - `./apps/site/src/shared/lib/metadata-extractors.ts` - Contains extraction functions for doc, component, and element metadata with proper TypeScript interfaces and description truncation logic

2. **Enhance existing metadata generation:**
   - `./apps/site/src/shared/lib/metadata.ts` - Update generateMetadata() to accept sourceType, source, and keywords parameters; integrate extractor usage

3. **Update dynamic page routes** to use the new extractors:
   - `./apps/site/src/app/(main)/docs/[slug]/page.tsx` - Use extractDocMetadata() with frontmatter data
   - `./apps/site/src/app/(main)/components/@content/[component]/page.tsx` - Use extractComponentMetadata() with registry component data
   - `./apps/site/src/app/(main)/elements/@content/[element-id]/page.tsx` - Use extractElementMetadata() with registry element data

All changes should maintain the existing structure and not break current functionality. Follow the project's TypeScript and code style conventions from CLAUDE.md.
</output>

<verification>
Before declaring the implementation complete, verify:

1. **Metadata extractors are properly defined** with TypeScript types and consistent behavior
2. **generateMetadata() accepts new parameters** without breaking existing calls
3. **All dynamic page routes** are using the appropriate extractor and passing data correctly
4. **Descriptions are properly truncated** to 160 characters or less (check long descriptions)
5. **Fallback descriptions work** when source data is incomplete
6. **Types are properly exported** from metadata-extractors.ts for use in page routes
7. **No runtime errors** when navigating to doc, component, and element pages
8. **Metadata is available** in the HTML head tags (title, meta description, og:title, og:description)
</verification>

<success_criteria>
- Metadata extractors are created and properly typed
- generateMetadata() function enhanced to support all content types
- All dynamic pages (docs, components, elements) use the enhanced metadata system
- SEO descriptions are sourced from frontmatter/registry instead of being hardcoded
- System is backwards compatible with existing code
- Descriptions are consistently formatted and truncated appropriately
- No errors in development or build process
</success_criteria>
```
