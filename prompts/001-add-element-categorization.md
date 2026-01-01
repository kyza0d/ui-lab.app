<objective>
Add a centralized categorization system for elements in the registry. Create a configuration file that maps elements to categories, starting with a "Layout" category containing Header and Sidebar elements. This enables the ability to organize and filter elements by category, which will be used in the UI later.
</objective>

<context>
This is a UI component registry project. The elements are stored in `@packages/registry/src/elements/` with subdirectories for each element (Header, Sidebar). The categorization system needs to be flexible to support future categories beyond "Layout".

Related files:
@packages/registry/src/elements/
@packages/registry/src/elements/index.ts
@apps/site/src/features/elements/components/elements-sidebar.tsx
</context>

<requirements>
1. Create a centralized categories configuration file that maps element IDs to their categories
2. The configuration should support a "Layout" category with "Header" and "Sidebar" elements
3. The structure should be easily extensible for future categories
4. Ensure the categorization is exported and accessible from the registry's main index
5. Element metadata should be queryable by category for downstream UI usage
</requirements>

<implementation>
1. Create a new file `@packages/registry/src/elements/categories.ts` that exports:
   - A category configuration mapping element IDs to category names
   - A utility function to get elements by category
   - Type definitions for category-related data

2. Update `@packages/registry/src/elements/index.ts` to:
   - Export the categories configuration
   - Export a function that accepts ElementMetadata[] and returns elements organized by category

3. Follow the project's file naming conventions (kebab-case for files)
4. Keep implementation concise and self-documenting with clear variable/function names
5. Do NOT add comments - write self-documenting code

The categories configuration should be simple and maintainable. Think of it as a registry that can grow as more elements and categories are added.
</implementation>

<output>
- `./packages/registry/src/elements/categories.ts` - Centralized category configuration with utilities
- Update `./packages/registry/src/elements/index.ts` - Export categorization functionality
</output>

<verification>
1. Verify the categories.ts file exports the category configuration and utility functions
2. Verify that Header and Sidebar are correctly mapped to the "Layout" category
3. Check that the exports are available from the elements index
4. Ensure the code is type-safe and follows the project conventions from CLAUDE.md
</verification>

<success_criteria>
- A categories.ts file exists in @packages/registry/src/elements/
- The file contains a mapping of element IDs to categories
- "Header" and "Sidebar" are both assigned to the "Layout" category
- A utility function exists to retrieve elements by category
- All exports are properly defined and integrated into the index
</success_criteria>
