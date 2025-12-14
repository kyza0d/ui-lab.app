<objective>
Add alias configuration functionality to the UI Lab CLI that allows users to select which path aliases they want to set up during project initialization. The aliases should be presented as a multi-select checklist with sensible defaults (all checked), and when enabled for a Next.js project, the tsconfig.json file should be updated with the corresponding paths configuration.
</objective>

<context>
The UI Lab CLI is a component installer built with Commander and @clack/prompts. Currently, during project initialization, users are prompted for configuration options. We need to integrate a new step in the initialization flow that:

1. Presents users with a checklist of default aliases
2. Allows them to select which aliases to enable (all checked by default)
3. Updates tsconfig.json with the selected paths (Next.js projects only)
4. Replaces any existing paths configuration in tsconfig.json

Project type: Node.js CLI with TypeScript
Tech stack: Commander, @clack/prompts, ui-lab-registry
Target: MVP feature for Next.js projects only

@./src - Current CLI source code structure
@../../apps/site - Example Next.js project to understand structure
@./package.json - Current dependencies
</context>

<requirements>
1. Create a function that displays a multi-select prompt with these default aliases (all checked by default):
   - "components": "@/components"
   - "utils": "@/lib/utils"
   - "ui": "@/components/ui"
   - "lib": "@/lib"
   - "hooks": "@/hooks"

2. Integration with existing initialization flow:
   - Add the alias selection step to the CLI initialization process
   - Only show/process aliases for Next.js projects (detect presence of next.config.js or next.config.ts)
   - Make it a natural part of the setup flow

3. tsconfig.json updates:
   - Read the existing tsconfig.json from the target project
   - Update the "compilerOptions.paths" object with selected aliases
   - Replace the entire paths object (don't merge with existing aliases)
   - Preserve all other tsconfig.json content
   - Handle the case where paths key doesn't exist (create it)
   - The paths format should be:
     ```json
     "paths": {
       "@/*": ["./src/*"],
       "@/components": ["./src/components"],
       "@/lib/utils": ["./src/lib/utils"],
       ...etc for selected aliases
     }
     ```

4. Error handling:
   - Handle cases where tsconfig.json doesn't exist
   - Handle JSON parsing errors gracefully
   - Provide clear feedback to users about what aliases were applied

5. Code organization:
   - Create reusable alias-related functions (e.g., `getSelectedAliases()`, `updateTsconfig()`)
   - Keep the code maintainable and testable
   - Follow existing code patterns in the CLI project
</requirements>

<implementation>
1. Examine the current initialization flow in the CLI source code to understand where this step should be inserted
2. Use @clack/prompts' multi-select capability (or implement using confirm for each alias if multi-select isn't available) to display the alias selection UI
3. Detect Next.js projects by checking for next.config.js or next.config.ts in the target directory
4. Implement the tsconfig.json reading and writing logic with proper error handling
5. Integrate the alias setup into the initialization sequence before component installation
6. Ensure the JSON formatting is clean and readable (proper indentation)

Constraints and WHY:
- Only support Next.js projects for MVP because other frameworks have different config file structures (Vite uses vite.config.ts, etc.) and we want to keep the initial implementation focused
- Replace existing paths rather than merge because it ensures a clean, predictable configuration state without leaving orphaned or conflicting aliases
- Set all aliases as checked by default because most projects benefit from these common path patterns, and unchecking is faster than checking many items
</implementation>

<output>
Modify or create files as needed:
- `./src/[appropriate-location]/aliases.ts` - Export functions for alias selection and tsconfig updates
- `./src/[initialization-file]` - Integrate alias setup step into the initialization flow
- Update any type definitions if creating new types for alias configuration

Use relative paths from the package root (`/home/kyza/Projects/ui-lab/app/packages/cli/`).
</output>

<verification>
Before declaring complete, verify your work:
1. Test the alias selection prompt displays all 5 default aliases with proper UI
2. Verify that canceling the alias setup doesn't break the initialization flow
3. Test alias setup on a Next.js project and confirm tsconfig.json is updated correctly with selected paths
4. Verify that unselected aliases are not added to tsconfig.json
5. Test that existing tsconfig.json content (except paths) is preserved
6. Confirm non-Next.js projects skip the alias setup step without errors
7. Test edge cases: missing tsconfig.json, malformed JSON, empty paths object
</verification>

<success_criteria>
- Alias selection step is integrated into the CLI initialization flow
- Users can select which aliases to enable via multi-select checklist (all checked by default)
- Selected aliases are correctly written to tsconfig.json with proper JSON formatting
- Only Next.js projects are updated with alias paths
- Existing tsconfig.json paths object is replaced (not merged)
- Clear user feedback confirms which aliases were applied
- No errors occur during initialization if user declines aliases or uses non-Next.js project
</success_criteria>
