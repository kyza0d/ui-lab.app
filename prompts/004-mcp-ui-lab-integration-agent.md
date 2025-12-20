<objective>
Create an intelligent MCP agent system that enables seamless UI Lab component integration and design overhaul for existing projects. The agent should query the MCP for available UI Lab components and tokens, evaluate whether a project needs UI Lab initialization, and systematically replace existing UI with optimized UI Lab alternatives in user-specified files.

End goal: Allow users to point the agent at any file and receive a fully redesigned, production-ready version using UI Lab components and design tokens while maintaining functional parity.
</objective>

<context>
This MCP agent is part of the UI Lab monorepo (pnpm workspace with packages, apps, and site).

Project structure:
- @ui-lab/components: Core component library
- @ui-lab/tokens: Design token system
- @ui-lab/cli: Command-line initialization tool
- packages/@mcp/: Where the MCP agent code lives

The agent will be invoked by users who want to modernize existing UI in their projects. Primary use cases:
1. Legacy projects with outdated UI patterns
2. Projects that haven't adopted UI Lab yet
3. Selective file-by-file UI migrations
4. Design consistency improvements

File to examine for project setup patterns:
@package.json
@packages/@mcp
</context>

<requirements>
1. **MCP Querying Capability**: The agent must be able to query the MCP server to:
   - List available UI Lab components and their props
   - Retrieve design tokens (colors, spacing, typography, shadows, etc.)
   - Check current project dependencies and UI Lab setup status

2. **Project Analysis**: Before refactoring, the agent should:
   - Detect if UI Lab is already initialized in the target project
   - Identify missing dependencies or configuration
   - Determine required CLI initialization flags

3. **UI Lab Initialization Logic**: When the user explicitly requests it, the agent should:
   - Query MCP to determine initialization requirements
   - Suggest appropriate CLI flags based on project type (React, Next.js, Vue, etc.)
   - Provide clear guidance on running the initialization command

4. **File Targeting & Analysis**: Accept a specific file path from the user and:
   - Parse the file to understand current UI implementation
   - Identify components, styling approaches, and design patterns
   - Map existing patterns to UI Lab component equivalents

5. **Component Selection Strategy**: Using both MCP queries and code analysis:
   - Query MCP for components that match current functionality
   - Analyze existing UI patterns to find best-fit UI Lab replacements
   - Prioritize UI Lab components that reduce code complexity
   - Preserve functional behavior while improving design consistency

6. **Full UI Replacement**: Generate refactored file content that:
   - Uses only UI Lab components and design tokens
   - Maintains 100% functional parity with the original
   - Improves code clarity and maintainability
   - Follows UI Lab conventions and patterns

7. **Output**: Return the fully refactored file code ready for immediate use
</requirements>

<implementation>
**MCP Integration Pattern**:
- Use MCP tools to query component registry: list all available components with their props, usage patterns, and variants
- Use MCP tools to fetch design tokens: retrieve complete token system organized by category (colors, spacing, typography, etc.)
- Implement caching of component/token data to reduce query overhead

**File Analysis Approach**:
- Parse the target file using AST analysis (if code) or pattern matching
- Identify all UI elements, styling mechanisms (inline styles, CSS classes, styled-components, etc.)
- Map each element to its semantic purpose (button, input, card, layout container, etc.)

**Component Matching Strategy**:
1. Query MCP for components matching semantic purpose
2. Analyze current implementation details (size, color, state, interactive behavior)
3. Select UI Lab component that requires minimal prop customization
4. Extract design tokens for styling (colors, spacing, etc.) from MCP

**Code Generation**:
- Import only necessary components and tokens
- Use UI Lab's standard patterns for composition and styling
- Maintain component hierarchy and accessibility attributes
- Include clear, minimal prop usage
- Strip out unnecessary styling and helper functions
- Preserve all interactive behavior and event handlers

**What to AVOID**:
- Don't create wrapper components unless absolutely necessary (increases complexity)
- Don't over-abstract simple UI patterns (a button is a button, no need for custom hooks)
- Don't modify component behavior beyond what's required for UI Lab compatibility
- Don't remove accessibility features or event handlers from original code
- Don't assume styling preferences; use design tokens from MCP for consistency
</implementation>

<output>
After refactoring the specified file, provide:
- The complete refactored file code in the target language/format, ready to replace the original
- Use clear imports for UI Lab components and tokens
- Include necessary type definitions if TypeScript
- Ensure all exports match the original file's public API
</output>

<verification>
Before declaring the refactoring complete:
1. Verify all original functionality is preserved
2. Confirm all imports come from UI Lab packages (components or tokens)
3. Check that no custom styling is introduced (use tokens only)
4. Ensure component composition follows UI Lab patterns
5. Validate that the file structure makes sense for the codebase
6. Test that the code would compile/run without errors

Success means:
- Original file and refactored version have identical functional behavior
- Refactored code uses only UI Lab components and tokens
- Code is simpler and clearer than the original
- Design consistency is improved (all styles come from tokens)
</verification>

<success_criteria>
- Agent can query MCP for component and token information
- Agent accurately determines if UI Lab initialization is needed
- Agent accepts user-provided file paths and analyzes them properly
- Agent generates production-ready refactored code with 100% functional parity
- Refactored files use only UI Lab components and design tokens
- Code quality improves (less custom styling, better component reuse)
- User can immediately use the refactored output
</success_criteria>
