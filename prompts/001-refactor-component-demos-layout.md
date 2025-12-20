<objective>
Refactor the component detail page layout to display the first example from each component demo above the tabs section, while keeping remaining examples within the tabbed interface. This improves UX by showcasing the component immediately without requiring tab interaction.
</objective>

<context>
This is a Next.js component documentation site using React Aria and custom UI components.

@apps/site/src/app/components/@content/[component]/client.tsx - The main component page client that renders component details, tabs (Examples/API/Styles), and a table of contents.

@apps/site/src/lib/component-demos/button.tsx - Example of a demo configuration file structure with multiple examples. The `buttonDetail` object contains an `examples` array where each example has:
- `id`, `title`, `description`, `code`, `preview`, `controls`, `renderPreview`, `previewHeight`, `previewLayout`

The goal is to surface the first example (e.g., "Basic Button" for the Button component) prominently above the tabs with its controls, while the remaining examples stay in the Examples tab.

Before starting, review CLAUDE.md for project conventions regarding code style and approach.
</context>

<requirements>
1. Refactor `ComponentDetailClient` to:
   - Extract the first example from `component.examples`
   - Render it above the tabs section with minimal styling (preview + controls only, no title/description)
   - Hide the first example from the Examples tab content
   - Keep all other tabs (API, Styles) functioning normally

2. The first example above tabs should:
   - Display the `preview` and `renderPreview` functionality with controls
   - Use the same `controls` array as defined in the demo configuration
   - Maintain interactivity for variant/size/disabled controls
   - Not show a title or description

3. The Examples tab should:
   - Start from the second example onward (index 1+)
   - Keep all existing example rendering logic for remaining items
   - Title and description should display normally for all remaining examples

4. Ensure the layout flows naturally:
   - First example section above tabs (compact, preview + controls)
   - Clean visual separation before tabs start
   - Responsive layout maintained on mobile and desktop
</requirements>

<implementation>
Approach:
1. Modify the component to destructure the first example from the examples array
2. Create a separate render section for the featured example above tabs
3. Update the getTocItems() function to handle the new structure
4. Slice the examples array when rendering in the Examples tab to exclude the first item
5. Keep component configurator logic intact - reuse existing patterns

What to avoid:
- Don't duplicate the ComponentConfigurator logic - refactor to reuse
- Don't break the existing controls system for other examples
- Don't modify the demo configuration files themselves (button.tsx, etc.) - changes should be layout-only
- Don't add new files - this is a layout refactor of existing client component
</implementation>

<output>
Modify these files with relative paths:
- `./apps/site/src/app/components/@content/[component]/client.tsx` - Refactored component to render first example above tabs and remaining examples in the Examples tab
</output>

<verification>
Before declaring complete, verify:
1. First example renders above tabs with controls and preview, without title/description
2. Clicking controls on the first example updates the preview correctly
3. Examples tab contains items starting from the second example onward
4. Remaining examples (2+) still show title, description, and preview
5. API and Styles tabs work unchanged
6. No TypeScript errors
7. Layout is clean with proper spacing between first example and tabs on desktop and mobile
</verification>

<success_criteria>
- First demo displays prominently above tabs with full interactivity
- Examples tab begins from the second item in the examples array
- All controls and state management work correctly for both positioned examples
- No existing functionality is broken
- Code follows project conventions (no comments, minimal spacing, self-documenting)
- Responsive layout maintained across breakpoints
</success_criteria>
