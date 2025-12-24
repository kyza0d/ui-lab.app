<objective>
Generate comprehensive usage examples for the Button and Select components in the UI Lab component registry. These examples will be embedded in the MCP `get_component` tool responses to help developers understand how to use each component correctly.

The examples should demonstrate real-world usage patterns, show best practices with the UI Lab design system, and help prevent incorrect prop usage like what happened with the Select component (developers tried using `value`, `onChange`, `options` props that don't exist).
</objective>

<context>
This is part of fixing an MCP documentation bug where the Select component returned incomplete API documentation. We've already:
1. Fixed the case-mismatch bug in the registry adapter (PascalCase vs lowercase)
2. Added `examples` field to the ComponentAPI TypeScript type
3. Documented the Select component structure with all sub-components (Trigger, Content, Item, Value, Group, etc.)

Now we need to populate actual examples that will be returned when developers call `get_component("button")` and `get_component("select")`.

Files to update:
- `/home/kyza/Projects/ui-lab/app/packages/registry/src/generated-data.ts` (main registry source)
- `/home/kyza/Projects/ui-lab/app/packages/@mcp/.yalc/ui-lab-registry/src/generated-data.ts` (yalc copy, kept in sync)

Reference files to understand component APIs:
- `./dist/generated-data.ts` - Current generated API specs showing all props and subComponents
- `./src/types.ts` - ComponentExample interface: `{ name, description, code, preview? }`
- `/home/kyza/Projects/ui-lab/marketplace/.yalc/ui-lab-components/dist/components/Button/*.d.ts` - Button TypeScript definitions
- `/home/kyza/Projects/ui-lab/marketplace/.yalc/ui-lab-components/dist/components/Select/*.d.ts` - Select TypeScript definitions
</context>

<requirements>
For each component (Button and Select):

1. **Create 4-5 realistic usage examples** showing:
   - Basic usage (simplest case)
   - Advanced usage (with multiple features)
   - Edge cases or special configurations
   - Design system integration (correct color tokens, not arbitrary colors)
   - Accessibility considerations where relevant

2. **Example structure** (follows ComponentExample interface):
   - `name`: Short, descriptive title (e.g., "Basic Button", "Button with Icon")
   - `description`: 1-2 sentence explanation of what the example demonstrates
   - `code`: Valid TSX code string that developers can copy/paste (use `\n` for newlines)
   - `preview` (optional): Brief description of what the code renders as

3. **Code quality requirements**:
   - Use correct prop names (e.g., Select uses `selectedKey`, not `value`)
   - Use design system color tokens only (e.g., `bg-accent-600`, `text-foreground-50`)
   - **NEVER use arbitrary colors**: No `bg-white`, `text-gray-900`, `bg-blue-500`, hex colors, gradients, or shadows
   - Show proper sub-component composition (SelectTrigger, SelectContent, SelectItem, etc.)
   - Include meaningful placeholder text and labels
   - Demonstrate proper event handlers (e.g., `onSelectionChange` for Select, `onClick` for Button)

4. **Button examples should cover**:
   - Default/primary button with text
   - Button with variant (success, danger, warning, info)
   - Button with size variants (if supported)
   - Disabled button state
   - Button with icon and text combination

5. **Select examples should cover**:
   - Basic select with simple items
   - Select with grouped items (SelectGroup)
   - Disabled select
   - Select with custom trigger styling
   - Searchable select (with SearchableContent)

6. **Integration with design system**:
   - Use only these color families: `accent`, `success`, `danger`, `warning`, `info`, `background`, `foreground`
   - Use correct shade ranges: `background/foreground` use 50-950, semantic colors use 50-600
   - Example correct usage: `bg-accent-600`, `text-foreground-50`, `border-success-300`
   - Example INCORRECT usage to avoid: `bg-white`, `text-gray-900`, `shadow-md`, `border-red-500`
</requirements>

<implementation>
1. **Examine current component APIs** in `./dist/generated-data.ts`:
   - For Button at key "Button": Review props (variant, size, disabled, etc.)
   - For Select at key "Select": Review all subComponents and their props

2. **Examine actual component source code**:
   - Look at Button TypeScript definitions to understand prop types and defaults
   - Look at Select compound components to understand composition pattern
   - Check for any JSDoc comments that might hint at examples

3. **Generate examples in the correct JSON format**:
   - Each example must be a valid object with `name`, `description`, `code` properties
   - Code strings must be properly escaped (use `\n` for newlines, not actual line breaks)
   - Test that the JSON is valid before inserting

4. **Update both registry source files** (keep them in sync):
   - Add `"examples": [...]` array to the "Button" component entry in generatedAPI
   - Add `"examples": [...]` array to the "Select" component entry in generatedAPI
   - The examples field goes AFTER the `subComponents` field (or `props` if no subComponents)

5. **Rebuild the packages**:
   - Run `npm run build` in the registry package to compile TypeScript
   - Run `npm run build` in the MCP package to recompile
   - Verify examples appear in the compiled output

6. **Test the changes**:
   - Run: `node -e "import('./dist/tools.js').then(async (tools) => { const result = await tools.handleGetComponent({ id: 'button' }); console.log('Button examples:', result.component?.api?.examples?.length); })"`
   - Run: `node -e "import('./dist/tools.js').then(async (tools) => { const result = await tools.handleGetComponent({ id: 'select' }); console.log('Select examples:', result.component?.api?.examples?.length); })"`
   - Both should return the correct number of examples
</implementation>

<constraints>
- **Do NOT modify component type definitions** - only add examples to generated-data.ts
- **Do NOT use Tailwind arbitrary colors or non-design-token colors** - this is a critical constraint enforced by the design system
- **Do NOT commit changes yet** - you're preparing them for review
- **Keep JSON structure valid** - malformed JSON will break the build
- **Strings in JSON must use escaped newlines** - actual line breaks will break the format
- Code examples should be self-contained and not reference undefined variables (except standard React imports assumed to be available)
</constraints>

<output>
Update these files with the generated examples:

1. `/home/kyza/Projects/ui-lab/app/packages/registry/src/generated-data.ts`
   - Locate the "Button" entry in the generatedAPI object
   - Add `"examples": [...]` array with 4-5 Button usage examples
   - Locate the "Select" entry in the generatedAPI object
   - Add `"examples": [...]` array with 5 Select usage examples

2. `/home/kyza/Projects/ui-lab/app/packages/@mcp/.yalc/ui-lab-registry/src/generated-data.ts`
   - Apply the SAME examples to keep the yalc copy in sync

After making changes, rebuild with `npm run build` to verify compilation succeeds.
</output>

<verification>
Before declaring the task complete, verify:

1. **File integrity**:
   - Both source files are valid TypeScript (no syntax errors after edit)
   - JSON structure in generatedAPI is still valid
   - No unescaped quotes or malformed objects

2. **Build succeeds**:
   - Run `npm run build` in the registry package - should complete without errors
   - Run `npm run build` in the MCP package - should complete without errors
   - Check that dist/ files are generated

3. **Examples are returned**:
   - Test Button: `node -e "import('./dist/tools.js').then(async (t) => { const r = await t.handleGetComponent({ id: 'button' }); console.log('Button has examples:', !!r.component?.api?.examples); console.log('Button example count:', r.component?.api?.examples?.length); })"`
   - Test Select: `node -e "import('./dist/tools.js').then(async (t) => { const r = await t.handleGetComponent({ id: 'select' }); console.log('Select has examples:', !!r.component?.api?.examples); console.log('Select example count:', r.component?.api?.examples?.length); })"`
   - Both should show `examples: true` and count > 0

4. **Example quality**:
   - Each example has descriptive name and description
   - Code is valid TSX that could be copied and used
   - All colors use design system tokens, not arbitrary colors
   - No undefined variables in example code
   - Sub-component composition is correct for Select
</verification>

<success_criteria>
✓ Button component has 4-5 examples covering all main use cases
✓ Select component has 5 examples covering basic to advanced usage
✓ All examples use correct component prop names
✓ All examples use design system colors only (no arbitrary colors)
✓ JSON is valid and files build without errors
✓ Examples are returned by `get_component` tool
✓ Code examples are realistic and copy-paste ready
✓ Both registry source files are kept in sync
</success_criteria>
