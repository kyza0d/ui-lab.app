# UI Lab MCP Server - Implementation Strategy & Architecture Plan

## Executive Summary

The UI Lab MCP (Model Context Protocol) Server is a specialized AI integration layer that enables Claude and other coding agents to discover, understand, and generate production-ready code using the UI Lab component library. The MCP server bridges the gap between component metadata (props, types, dependencies) and agent capabilities, allowing agents to autonomously build complete UIs with minimal guidance.

**Problem Solved**: Currently, agents lack structured, semantic access to component APIs and design system information. They must infer component usage from documentation or examples. The MCP server exposes this information as queryable resources and provides tools for code generation, dependency resolution, and project initialization—enabling agents to generate working, well-typed component code without manual intervention or trial-and-error.

**Core Value**: Agents can now ask "What components exist for forms?", receive structured API information for each component, understand dependencies, and generate usage examples—unlocking autonomous UI building workflows.

---

## Codebase Analysis

### Current State of Registry System

The UI Lab registry (`packages/registry`) is the single source of truth for all component metadata. It serves as the foundation for CLI operations, documentation, and will be the primary data source for the MCP server.

**Key Components**:

- **Type System** (`src/types.ts`): Defines `ComponentMetadata`, `ComponentAPI`, `ComponentStyles`, `ComponentDeps`, and supporting types. Each component has 20+ metadata fields including category, dependencies, related components, and accessibility notes.

- **Registry Data** (`src/registry.ts`): Hardcoded registry of 26+ components with full metadata. Each entry includes component ID, display name, category (input, layout, navigation, etc.), source information, and related components.

- **Data Generation Pipeline** (`scripts/generate-registry-data.ts`): Auto-extracts component metadata from source files:
  - `extract-api.ts`: Uses `react-docgen-typescript` to parse TSX files and extract PropDefinitions for components and sub-components (e.g., `Card.Header`, `Card.Body`)
  - `extract-styles.ts`: Parses CSS modules to extract CSS variables, variants, and sizes
  - `extract-source.ts`: Reads and stores component TSX, CSS, and .d.ts source files

- **Helper Functions** (`src/helpers.ts`): Provides queryable interfaces:
  - `getComponentById(id)`, `getComponentsByCategory(category)`, `searchComponents(query)`
  - `getComponentCount()`, `getAllComponentIds()`, `getRelatedComponents(id)`

- **Dependency Mapping** (`src/component-dependencies.ts`): Tracks both npm and internal component dependencies. Maps each component to required npm packages (react-aria, clsx, cmdk, etc.) and internal component dependencies (e.g., Menu depends on Card, Badge, Divider).

**Integration Point**: The registry is already published as `ui-lab-registry` npm package and used by the CLI. The MCP server will wrap these registry APIs and add MCP-specific serialization and resource/tool mappings.

### Current CLI Capabilities & Architecture

The CLI (`packages/cli`) provides `ui-lab init` and `ui-lab install` commands. Its architecture offers valuable patterns for the MCP server.

**Key Systems**:

- **RegistryClient** (`src/core/registry-client.ts`): Wrapper around the registry package providing higher-level query methods. The MCP server will create a similar interface for agents.

- **DependencyResolver** (`src/core/dependency-resolver.ts`): Traverses the component dependency graph to resolve all required npm packages and internal components. Returns structured `ResolvedDependencies` with npm packages, internal components, and conflict detection. This is perfect for MCP tools—agents will use this to understand what to install.

- **ConfigManager** (`src/core/config-manager.ts`): Reads/writes `ui-lab.config.json` with schema version 2.0.0. Contains framework detection (Next.js vs Vite), component directory, global CSS path, path aliases, and list of installed components. The MCP can use this to understand project configuration.

- **Installer** (`src/core/installer.ts`): Main orchestrator combining registry queries, dependency resolution, source file generation, and npm installation. The MCP can provide agent-friendly alternatives to this without file I/O.

- **ProjectAnalyzer** (`src/detectors/project-analyzer.ts`): Detects framework (Next.js vs Vite), component directory, and global CSS path. Useful for MCP to understand project context.

- **ThemeGenerator** (`src/core/theme-generator.ts`): Generates Tailwind CSS with design tokens from OKLCH presets. Creates globals.css with color scales and typography variables.

**Integration Point**: The MCP server can import and reuse `RegistryClient`, `DependencyResolver`, `ConfigManager` logic without modification. CLI commands become MCP tools—e.g., `ui-lab install button input` becomes an MCP tool that agents can call via the same underlying resolver.

### Component Structure & Metadata

Components in `packages/components/src/components/` follow consistent patterns:

- **Simple Components** (Button): Single component export with React.forwardRef, props interface, and CSS module.

- **Compound Components** (Menu, Select): Main component with sub-components as properties:
  ```typescript
  interface MenuComponent extends React.FC<MenuProps> {
    Trigger: typeof MenuTrigger
    Content: typeof MenuContent
    Item: typeof MenuItem
    // ... 9+ sub-components
  }
  const Menu: MenuComponent = Object.assign(MenuRoot, { Trigger, Content, ... })
  ```

This pattern is reflected in the registry's extracted `ComponentAPI` which includes sub-component definitions.

- **26 Components** organized across 10 categories: input (Button, Input, Select, etc.), layout (Flex, Grid, Card, etc.), navigation (Tabs, Menu), feedback (Toast, Progress), and others.

- **Accessibility**: All components built on React Aria with full keyboard navigation, focus management, and ARIA roles. Registry tracks accessibility support per component.

**Integration Point**: The registry's extracted PropDefinitions accurately represent component APIs. The MCP can expose these directly to agents, including sub-component APIs for compound components.

### Design Tokens & Theming

All design tokens use **OKLCH color space** (perceptually uniform), stored as `{ l, c, h }`:

- **Color Roles**: `background`, `foreground`, `accent`, `success`, `danger`, `warning`, `info`
- **Shades**: 11 levels per role (50, 100, 200, ..., 950) generated from base color
- **Semantic Colors**: Complete chroma and lightness ranges per role

**Color Generation Flow**:
1. CLI's `ThemeGenerator` uses `color-utils.ts` to convert hex → OKLCH
2. Generates 11-shade palettes with perceptually-adjusted lightness
3. Outputs as CSS variables in `globals.css`

**Integration Point**: The MCP server can expose color APIs so agents understand the design system:
- `getColorRole(role)` → returns all shades (50-950) in CSS variable names
- `generateColorScale(baseHex, role)` → returns hex values for all shades
- `validateColor(color, role)` → checks if color respects chroma boundaries

**CLI Color Utils** (`packages/cli/src/utils/color-utils.ts`):
- `hexToOklch()`, `oklchToHex()`, `generateColorScale()`, `generateThemePalettes()`
- Perfect functions for MCP tools to expose to agents

### Documentation Site Integration

The site (`apps/site`) integrates the registry for component discovery and provides live examples:

- **Component Registry Integration** (`src/lib/component-registry.tsx`): Uses registry data for component pages, navigation, and search
- **Examples/Demos** (`src/lib/component-demos/`): Provides working examples for Flex, Grid, Menu, Select, Gallery (potential template sources for MCP)
- **Color System** (`src/lib/color-utils.ts`, `color-data.ts`): Full hex ↔ OKLCH conversion and CSS variable parsing
- **Theme Integration** (`src/lib/themes/shiki/`): Syntax highlighting with theme-aware colors

**Integration Point**: The site's component demos and color utilities are already written and tested. The MCP can expose these as templates/examples to agents.

### Existing Dependencies & External APIs

**Core Runtime Dependencies** (always installed):
- `react-aria` (3.44.0) - Accessibility hooks, used by all interactive components
- `clsx`, `class-variance-authority` - Class name management
- `react-stately` - State management

**Component-Specific Dependencies**:
- `@floating-ui/react-dom` - Popovers, dropdowns (Menu, Popover, Select, Tooltip)
- `gsap`, `@gsap/react` - Animations (Fold component)
- `cmdk` - Command palette (CommandPalette component)
- `lucide-react`, `react-icons` - Icons

**CLI-Only Dependencies**:
- `@clack/prompts` - Interactive CLI prompts
- `commander` - CLI argument parsing

**Integration Point**: The MCP can inform agents about these dependencies, enabling agents to make informed decisions about component selection (e.g., "CommandPalette adds cmdk dependency").

---

## MCP Architecture Design

### High-Level Overview

The MCP server exposes component library functionality as **Resources** (queryable data) and **Tools** (agent actions). It acts as a semantic bridge between agent capabilities and the UI Lab system.

```
Agent Request
    ↓
MCP Tools/Resources
    ├─ Tools: search, generate, validate, resolve
    ├─ Resources: components, design tokens, examples, config
    ↓
Internal APIs
    ├─ RegistryClient (wrapper around ui-lab-registry)
    ├─ DependencyResolver (component → npm packages)
    ├─ ConfigManager (project configuration)
    ├─ ThemeGenerator (color system)
    ├─ ColorUtils (hex ↔ OKLCH conversion)
    ↓
External Data Sources
    ├─ packages/registry - Component metadata
    ├─ packages/components - Source code access
    ├─ packages/cli - Utilities (theme, colors)
    ↓
Generated Output
    ├─ Component discovery results
    ├─ Type-safe import statements
    ├─ Installation plans
    ├─ Code examples and templates
```

### MCP Resources (Exposed Data)

Resources are queryable data sources that agents can read and understand. Each resource has a URI scheme and returns structured data.

#### 1. **Component Catalog Resource**
- **URI**: `component://[component-id]` or `component://*` (all)
- **Returns**: Full `ComponentMetadata` for requested component(s)
- **Fields**: name, description, category, props (with types), sub-components, dependencies, accessibility, related components, source code
- **Example**:
  ```
  component://button
  → {
    id: "button",
    name: "Button",
    category: "input",
    props: [{
      name: "variant",
      type: "enum",
      values: ["primary", "secondary", "outline", "ghost"],
      required: false,
      default: "primary"
    }],
    subComponents: [],
    npmDeps: ["react-aria"],
    internalDeps: [],
    ...
  }
  ```

#### 2. **Component Search Resource**
- **URI**: `components://search?q=[query]&category=[category]&limit=[limit]`
- **Returns**: Array of matching `ComponentMetadata`
- **Parameters**: `q` (search query), `category` (optional filter), `limit` (default 20)
- **Example**:
  ```
  components://search?q=form&category=input
  → [{ id: "input", ... }, { id: "label", ... }, { id: "form", ... }]
  ```

#### 3. **Component Dependencies Resource**
- **URI**: `dependencies://resolve?components=[id1,id2,...]`
- **Returns**: `ResolvedDependencies` with npm packages and internal components
- **Fields**: npmPackages (name, version, components using it), internalComponents (in dependency order), hasConflicts, conflicts
- **Example**:
  ```
  dependencies://resolve?components=menu,tooltip
  → {
    npmPackages: [
      { name: "react-aria", version: "^3.44.0", components: ["menu", "tooltip"] },
      { name: "@floating-ui/react-dom", version: "^2.1.6", components: ["menu", "tooltip"] }
    ],
    internalComponents: [],
    hasConflicts: false
  }
  ```

#### 4. **Design Tokens Resource**
- **URI**: `tokens://colors` or `tokens://colors?role=[role]`
- **Returns**: Color palette data in OKLCH format
- **Fields**: color roles, shades (50-950), hex values, CSS variable names, chroma/lightness ranges
- **Example**:
  ```
  tokens://colors?role=accent
  → {
    role: "accent",
    shades: {
      50: { hex: "#...", okch: { l: 0.95, c: 0.05, h: 200 } },
      100: { hex: "#...", okch: { l: 0.90, c: 0.10, h: 200 } },
      ...
      950: { hex: "#...", okch: { l: 0.15, c: 0.20, h: 200 } }
    },
    cssVarNames: {
      50: "--accent-50",
      100: "--accent-100",
      ...
    }
  }
  ```

#### 5. **Typography Tokens Resource**
- **URI**: `tokens://typography`
- **Returns**: Font sizes, line heights, font families, weights
- **Fields**: font scales, weights, line height presets, CSS variable mappings
- **Example**:
  ```
  tokens://typography
  → {
    sizes: {
      xs: "clamp(0.581rem, 0.5vw + 0.5rem, 0.635rem)",
      sm: "clamp(0.681rem, 0.5vw + 0.5rem, 0.762rem)",
      base: "clamp(1.000rem, 0.4vw + 0.8rem, 1.100rem)",
      ...
    },
    lineHeights: { tight: 1.25, normal: 1.5, ... },
    families: { sans: "Karla, system-ui", mono: "JetBrains Mono Variable" }
  }
  ```

#### 6. **Spacing & Sizing Tokens Resource**
- **URI**: `tokens://spacing` or `tokens://sizing`
- **Returns**: Spacing scale (0.2rem to 32rem), border radius presets, sizing units
- **Example**:
  ```
  tokens://spacing
  → {
    scale: [0.2, 0.4, 0.6, 0.8, 1.0, ...],
    cssVars: { 1: "--spacing-1", 2: "--spacing-2", ... },
    presets: { xs: 0.5, sm: 1, md: 2, lg: 4, ... }
  }
  ```

#### 7. **Component API Resource**
- **URI**: `api://component?id=[id]`
- **Returns**: Full component and sub-component APIs with prop types
- **Fields**: main component props, sub-component prop definitions, prop descriptions, required/optional, defaults, enums
- **Example**:
  ```
  api://component?id=card
  → {
    component: {
      props: [{ name: "children", type: "React.ReactNode", required: true }],
      description: "Container component for grouped content"
    },
    subComponents: {
      "Card.Header": [{ name: "title", type: "string", required: false }],
      "Card.Body": [...],
      "Card.Footer": [...]
    }
  }
  ```

#### 8. **Component Examples & Templates Resource**
- **URI**: `examples://component?id=[id]&template=[template-name]`
- **Returns**: Code examples, usage patterns, boilerplate code
- **Fields**: basic usage, advanced patterns, accessibility considerations, common variants
- **Example**:
  ```
  examples://component?id=button
  → {
    basicUsage: "import { Button } from '@ui-lab/components';\n<Button>Click me</Button>",
    variants: {
      primary: "<Button variant='primary'>Primary</Button>",
      secondary: "<Button variant='secondary'>Secondary</Button>",
      ...
    },
    accessibility: "Supports keyboard focus, ARIA labels, disabled state"
  }
  ```

#### 9. **Project Configuration Resource**
- **URI**: `project://config`
- **Returns**: Project configuration and framework information
- **Fields**: framework (Next.js/Vite), component directory, CSS path, path aliases, theme preset, installed components
- **Example**:
  ```
  project://config
  → {
    framework: "nextjs",
    componentDir: "src/components/ui",
    globalCssPath: "src/app/globals.css",
    pathAlias: "@/",
    themePreset: "vitesse-dark",
    installedComponents: ["button", "input", "label"],
    typescript: true
  }
  ```

#### 10. **Installation Instructions Resource**
- **URI**: `install://plan?components=[id1,id2,...]`
- **Returns**: Step-by-step installation instructions including imports, npm packages, file copies
- **Fields**: npm install commands, file copy operations, import statements, configuration updates
- **Example**:
  ```
  install://plan?components=button,input
  → {
    steps: [
      { type: "npm-install", packages: ["react-aria@3.44.0"] },
      { type: "copy-files", source: "...", destination: "components/ui" },
      { type: "update-imports", imports: ["import Button from '@/components/button'"] }
    ],
    estimatedSize: "45 KB",
    compatibilityNotes: "Requires React 18+"
  }
  ```

### MCP Tools (Agent Actions)

Tools are functions agents can call to perform actions. Each tool takes structured input and returns results.

#### 1. **search_components Tool**
- **Input**: `query` (string), `category` (optional), `limit` (optional, default 20)
- **Output**: Array of matching components with metadata
- **Purpose**: Agent discovers components matching criteria
- **Example**:
  ```
  search_components(query="form input", category="input", limit=10)
  → [{ id: "input", name: "Input", ... }, { id: "textArea", ... }]
  ```

#### 2. **get_component_details Tool**
- **Input**: `component_id` (string)
- **Output**: Full component metadata with API details
- **Purpose**: Agent gets comprehensive component information before using it
- **Example**:
  ```
  get_component_details(component_id="button")
  → { id: "button", name: "Button", props: [...], subComponents: [], examples: "..." }
  ```

#### 3. **get_component_api Tool**
- **Input**: `component_id` (string)
- **Output**: Component prop types, sub-component APIs, required props
- **Purpose**: Agent generates type-correct component code
- **Example**:
  ```
  get_component_api(component_id="select")
  → {
    mainProps: [{ name: "value", type: "string", required: true }, ...],
    subComponents: {
      "Select.Trigger": [...],
      "Select.Content": [...],
      "Select.Item": [...]
    }
  }
  ```

#### 4. **resolve_dependencies Tool**
- **Input**: `component_ids` (array of strings)
- **Output**: `ResolvedDependencies` with npm packages, internal components, conflicts
- **Purpose**: Agent understands what dependencies components require
- **Example**:
  ```
  resolve_dependencies(component_ids=["menu", "tooltip"])
  → {
    npmPackages: [
      { name: "react-aria", version: "^3.44.0" },
      { name: "@floating-ui/react-dom", version: "^2.1.6" }
    ],
    internalComponents: []
  }
  ```

#### 5. **get_installation_plan Tool**
- **Input**: `component_ids` (array of strings), `project_context` (optional)
- **Output**: Installation instructions, npm packages, file paths, import statements
- **Purpose**: Agent gets exact steps to install components in a project
- **Example**:
  ```
  get_installation_plan(component_ids=["button", "input"])
  → {
    npmInstall: "pnpm add ui-lab-components react-aria",
    imports: [
      "import { Button } from '@ui-lab/components'",
      "import { Input } from '@ui-lab/components'"
    ],
    totalSize: "120 KB"
  }
  ```

#### 6. **generate_component_code Tool**
- **Input**: `component_id` (string), `variant` (optional), `props` (optional JSON)
- **Output**: TSX code snippet with proper imports and types
- **Purpose**: Agent generates working component code
- **Example**:
  ```
  generate_component_code(
    component_id="button",
    variant="primary",
    props={"disabled": true, "size": "lg"}
  )
  → "import { Button } from '@ui-lab/components';\n\nexport function MyButton() {\n  return <Button variant='primary' disabled size='lg'>Click Me</Button>;\n}"
  ```

#### 7. **get_design_tokens Tool**
- **Input**: `token_type` (colors, typography, spacing, sizing), `options` (optional)
- **Output**: Design token values with CSS variable names and hex/OKLCH formats
- **Purpose**: Agent generates component styling consistent with design system
- **Example**:
  ```
  get_design_tokens(token_type="colors", options={"role": "accent"})
  → {
    50: { hex: "#...", okch: {...}, cssVar: "--accent-50" },
    100: { hex: "#...", okch: {...}, cssVar: "--accent-100" },
    ...
  }
  ```

#### 8. **get_component_examples Tool**
- **Input**: `component_id` (string), `pattern` (optional, default "basic")
- **Output**: Code examples for the component with multiple patterns
- **Purpose**: Agent learns proper usage patterns by example
- **Example**:
  ```
  get_component_examples(component_id="menu", pattern="with-icons")
  → {
    basicUsage: "<Menu><Menu.Trigger>...</Menu.Trigger><Menu.Content>...</Menu.Content></Menu>",
    withIcons: "<Menu><Menu.Trigger><Icon /> Open</Menu.Trigger>...",
    withSubmenu: "<Menu.Sub><Menu.SubTrigger>...</Menu.SubTrigger>...",
    accessibility: "Full keyboard support, ARIA labels for screen readers"
  }
  ```

#### 9. **validate_component_selection Tool**
- **Input**: `component_ids` (array), `use_case` (optional string description)
- **Output**: Validation result with warnings, suggestions, alternatives
- **Purpose**: Agent validates component choices before generating code
- **Example**:
  ```
  validate_component_selection(
    component_ids=["button", "input"],
    use_case="user registration form"
  )
  → {
    valid: true,
    warnings: [],
    suggestions: ["Consider adding Label component for accessibility"],
    alternatives: {
      button: ["Could use Group component for button groups"]
    }
  }
  ```

#### 10. **analyze_component_dependencies Tool**
- **Input**: `component_ids` (array)
- **Output**: Detailed dependency tree showing npm packages, peer dependencies, component tree
- **Purpose**: Agent understands dependency graph and makes informed selections
- **Example**:
  ```
  analyze_component_dependencies(component_ids=["commandPalette"])
  → {
    component: "commandPalette",
    npmDeps: ["cmdk", "react-aria", "@floating-ui/react-dom"],
    internalDeps: ["Card", "Badge", "Divider"],
    totalSize: "85 KB",
    peerDeps: ["react@^19", "react-dom@^19"]
  }
  ```

### Directory Structure for packages/mcp

The MCP server package will be organized for clarity and maintainability:

```
packages/mcp/
├── Plan.md                          # This architecture document
├── package.json                     # MCP package definition
├── src/
│   ├── index.ts                     # Main entry point, MCP server initialization
│   ├── server.ts                    # MCP server implementation (listens for requests)
│   ├── types.ts                     # TypeScript types for resources and tools
│   ├── resources/                   # Resource definitions (data endpoints)
│   │   ├── index.ts                 # Resource registry
│   │   ├── components.ts            # Component catalog resources
│   │   ├── search.ts                # Component search resources
│   │   ├── dependencies.ts          # Dependency resolution resources
│   │   ├── design-tokens.ts         # Color, typography, spacing tokens
│   │   ├── api.ts                   # Component API resources
│   │   ├── examples.ts              # Code examples and templates
│   │   ├── project.ts               # Project configuration resources
│   │   └── installation.ts          # Installation instructions resources
│   ├── tools/                       # Tool definitions (agent actions)
│   │   ├── index.ts                 # Tool registry
│   │   ├── search.ts                # search_components, get_component_details
│   │   ├── api.ts                   # get_component_api, get_component_examples
│   │   ├── dependencies.ts          # resolve_dependencies, analyze_component_dependencies
│   │   ├── installation.ts          # get_installation_plan, validate_component_selection
│   │   ├── generation.ts            # generate_component_code
│   │   └── tokens.ts                # get_design_tokens
│   ├── adapters/                    # Adapters to external systems
│   │   ├── registry-adapter.ts      # Wraps ui-lab-registry for MCP
│   │   ├── resolver-adapter.ts      # Wraps dependency resolver from CLI
│   │   ├── config-adapter.ts        # Wraps config manager from CLI
│   │   ├── theme-adapter.ts         # Wraps theme generator from CLI
│   │   └── color-adapter.ts         # Wraps color utilities from CLI
│   ├── utils/                       # Utility functions
│   │   ├── formatters.ts            # Format data for MCP responses
│   │   ├── validators.ts            # Input validation
│   │   ├── code-generator.ts        # Template-based code generation
│   │   ├── cache.ts                 # Caching for expensive operations
│   │   └── error-handling.ts        # Error serialization for MCP
│   └── config.ts                    # MCP server configuration
├── tests/                           # Test files (optional for MVP)
├── dist/                            # Compiled output
└── README.md                        # Package documentation
```

**Key Design Principles**:
- **Separation of Concerns**: Resources and tools are independent modules
- **Adapter Pattern**: Wrap existing CLI/registry code rather than duplicating logic
- **Caching**: Expensive operations (API extraction, color generation) cached in memory
- **Stateless**: Tools don't modify external state; read-only operations
- **Type Safety**: Full TypeScript typing for all MCP inputs/outputs
- **Error Handling**: Graceful degradation with informative error messages for agents

### Data Flow Diagrams (Text-Based)

#### Component Discovery Flow
```
Agent: search_components(query="button", category="input")
    ↓
Tool Handler (search.ts)
    ↓
RegistryAdapter.searchComponents()
    ↓
ui-lab-registry helpers.searchComponents(query)
    ↓
Match component metadata against query in registry
    ↓
Return: [{id: "button", name: "Button", ...}, ...]
    ↓
Formatter converts to MCP response format
    ↓
Agent receives structured component list
```

#### Code Generation Flow
```
Agent: generate_component_code(
  component_id="menu",
  variant="with-icons",
  props={...}
)
    ↓
Tool Handler (generation.ts)
    ↓
1. get_component_api(menu) → PropDefinitions
2. Get component examples → Template patterns
3. Code generation with mustache/template
4. Validate generated code against API
    ↓
Return: TSX code string
    ↓
Agent pastes code into project
```

#### Dependency Resolution Flow
```
Agent: resolve_dependencies(component_ids=["menu", "select", "tooltip"])
    ↓
Tool Handler (dependencies.ts)
    ↓
ResolverAdapter.resolve(ids)
    ↓
For each component:
  1. Look up component → get npmDeps + internalDeps
  2. Recursively resolve internal component deps
  3. Deduplicate npm packages
  4. Detect conflicts
    ↓
Return: {
  npmPackages: [react-aria, @floating-ui/react-dom, cmdk],
  internalComponents: [],
  hasConflicts: false
}
    ↓
Agent knows exact npm install command
```

#### Design Token Query Flow
```
Agent: get_design_tokens(token_type="colors", options={role: "accent"})
    ↓
Tool Handler (tokens.ts)
    ↓
TokenAdapter.getColorPalette(role="accent")
    ↓
1. Retrieve base color from preset
2. Generate color scale (50-950 shades)
3. Convert each shade: OKLCH → hex
4. Map to CSS variable names
    ↓
Return: {
  50: {hex: "#...", okch: {...}, cssVar: "--accent-50"},
  100: {hex: "#...", okch: {...}, cssVar: "--accent-100"},
  ...
}
    ↓
Agent uses colors in component styling
```

---

## Phase 1: MVP (Minimum Viable Product)

### Phase 1 Goal
Enable agents to **discover components, understand their APIs, and generate working component code** with proper imports and type-safe props. This is the core foundation—agents can autonomously build functional UIs without manual guidance.

### Phase 1 Resources (Read-Only Data)

#### 1. Component Catalog (GET /components)
- List all 26+ components with basic metadata (name, description, category)
- Essential fields: id, name, description, category, related components
- Omitted: full prop definitions (Phase 2), sub-component APIs (Phase 1 advanced), design system info

#### 2. Component Search (GET /components/search)
- Search by name, description, tags
- Filter by category (input, layout, navigation, etc.)
- Return matching components with metadata
- **Supports agent patterns**: "Find all form components", "Show me layout components"

#### 3. Component Details (GET /components/{id})
- Full component metadata for single component
- Includes: name, description, category, props (type, required, default), sub-components, related components
- Links to React Aria docs if applicable
- Includes accessibility info (e.g., "Full keyboard support, ARIA labels")

#### 4. Component API (GET /components/{id}/api)
- Extracted prop definitions with full type information
- Sub-component API definitions for compound components (Menu.Item, Card.Header, etc.)
- Descriptions for each prop
- Default values and enum options

#### 5. Component Examples (GET /examples/{id})
- Basic usage example (minimal working code)
- Variant examples (different prop combinations)
- Common patterns (e.g., "Menu with icons", "Form validation")
- Accessibility considerations

#### 6. Component Dependencies (GET /components/dependencies)
- For selected components, return npm packages required
- Example: button → ["react-aria"], menu → ["react-aria", "@floating-ui/react-dom", "cmdk"]
- Includes version constraints

#### 7. Installation Plan (GET /install/plan)
- Given component IDs, return:
  - `npm install` command(s) needed
  - Import statements for each component
  - File copy paths if components are scaffolded
  - Total size estimate
  - Compatibility notes (React version, etc.)

### Phase 1 Tools (Agent Actions)

#### 1. search_components
- **Purpose**: Agent discovers relevant components
- **Input**: query (string), category (optional), limit (optional)
- **Output**: Array of components matching query
- **Capability**: Enables agent to autonomously find components without hardcoding knowledge

#### 2. get_component_details
- **Purpose**: Agent gets full metadata for a component
- **Input**: component_id (string)
- **Output**: Full ComponentMetadata including API
- **Capability**: Agents understand component purpose, API, and related components

#### 3. get_component_api
- **Purpose**: Agent gets type-safe prop information
- **Input**: component_id (string)
- **Output**: Component API with prop types, descriptions, required flags
- **Capability**: Agents generate TypeScript-correct code without trial-and-error

#### 4. generate_component_code
- **Purpose**: Agent generates working TSX code
- **Input**: component_id, optional variant, optional props
- **Output**: TSX code snippet with proper imports
- **Capability**: Agents write working component code immediately

#### 5. resolve_dependencies
- **Purpose**: Agent understands what npm packages are needed
- **Input**: component_ids (array)
- **Output**: ResolvedDependencies with npm packages and versions
- **Capability**: Agents know exact installation requirements

#### 6. get_installation_plan
- **Purpose**: Agent gets step-by-step installation instructions
- **Input**: component_ids (array), optional project_context
- **Output**: Installation steps including npm commands, imports, file paths
- **Capability**: Agents can generate documentation for humans or guide them through setup

#### 7. get_component_examples
- **Purpose**: Agent learns proper usage patterns
- **Input**: component_id, optional pattern name
- **Output**: Code examples for basic usage and common variants
- **Capability**: Agents generate code that follows best practices by learning from examples

### Phase 1 MVP Scope (What's Included)

**In Scope**:
- ✅ All 26+ components discoverable via search
- ✅ Full component API information (props, types, required flags)
- ✅ Sub-component APIs for compound components (Menu.Item, Card.Header, etc.)
- ✅ Basic code generation (component + props + imports)
- ✅ Dependency resolution (which npm packages per component)
- ✅ Installation instructions
- ✅ Component examples/patterns
- ✅ Search by name, description, category

**Out of Scope (Phase 2+)**:
- ❌ Design tokens (colors, typography, spacing)
- ❌ Theme generation
- ❌ Tailwind CSS class suggestions
- ❌ Style composition helpers
- ❌ Project initialization/scaffolding
- ❌ Accessibility patterns and helpers
- ❌ Compound component composition patterns
- ❌ Real-time component preview rendering

### Phase 1 Success Criteria

1. **Component Discovery**: Agents can list all components, search by name/category, and get component metadata
   - Test: `search_components("input")` returns Input, Textarea, Form components
   - Test: `get_component_details("button")` returns full metadata with variant options

2. **API Completeness**: Agents have complete, type-safe prop information
   - Test: `get_component_api("select")` returns all Select props + all sub-component APIs (Select.Trigger, Select.Content, Select.Item)
   - Test: Props include type information (string, enum, number, boolean, etc.) and required/optional flags

3. **Code Generation**: Agents generate working TSX code with correct imports
   - Test: `generate_component_code("button", props={variant: "primary"})` generates valid TSX that can be pasted into a React file
   - Test: Generated code includes proper imports and prop typing

4. **Dependency Clarity**: Agents understand dependencies before generating code
   - Test: `resolve_dependencies(["commandPalette"])` returns ["cmdk", "react-aria", "@floating-ui/react-dom"]
   - Test: `get_installation_plan(["menu", "select"])` returns correct `npm install` command

5. **Usability**: Agents can write a complete UI with 0 manual intervention
   - Test: Agent generates entire form UI using Input, Label, Button, Form with correct imports and proper structure
   - Test: All generated code is TSX-valid and components have proper props

### Phase 1 Effort Breakdown

**Estimated work**:
1. **Setup & Infrastructure** 
   - Create packages/mcp project structure
   - Set up MCP SDK and server scaffolding
   - Configure TypeScript, build system

2. **Registry Adapter** 
   - Import ui-lab-registry package
   - Create wrapper for registry queries (search, by ID, by category)
   - Implement caching for registry data

3. **Resources Implementation** 
   - Component catalog resource
   - Component search resource
   - Component details resource
   - Component API resource
   - Examples resource
   - Dependencies resource
   - Installation plan resource
   - Implement resource URI routing

4. **Tools Implementation** 
   - Implement search_components tool
   - Implement get_component_details tool
   - Implement get_component_api tool
   - Implement generate_component_code tool
   - Implement resolve_dependencies tool
   - Implement get_installation_plan tool
   - Implement get_component_examples tool

5. **Code Generation Engine** 
   - Template-based code generation (Mustache or simple template engine)
   - Handle props, variants, sub-components
   - Generate proper imports
   - Add TypeScript type annotations

6. **Testing & Documentation** 
   - Write tests for core tools
   - Create example agent prompts
   - Document MCP server setup
   - Test with actual agent usage

### Phase 1 Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| Component metadata incomplete or incorrect | Medium | High | Use existing registry (battle-tested), validate against actual components |
| Code generation produces invalid TSX | High | High | Template-based generation from known patterns, validate against component API |
| Dependency resolution misses transitive deps | Low | Medium | Use existing CLI DependencyResolver, test against known component combinations |
| Performance issues with large component list | Low | Medium | Cache registry data, implement pagination for search |
| Props extraction incomplete for edge cases | Medium | Low | Manual review of extracted props, fallback to showing raw prop types |

---


## Phase 1: MVP (Minimum Viable Product)

### Phase 1 Goal
Enable agents to **discover components, understand their APIs, and generate working component code** with proper imports and type-safe props. This is the core foundation—agents can autonomously build functional UIs without manual guidance.

### Phase 1 Resources (Read-Only Data)

#### 1. Component Catalog (GET /components)
- List all 26+ components with basic metadata (name, description, category)
- Essential fields: id, name, description, category, related components
- Omitted: full prop definitions (Phase 2), sub-component APIs (Phase 1 advanced), design system info

#### 2. Component Search (GET /components/search)
- Search by name, description, tags
- Filter by category (input, layout, navigation, etc.)
- Return matching components with metadata
- **Supports agent patterns**: "Find all form components", "Show me layout components"

#### 3. Component Details (GET /components/{id})
- Full component metadata for single component
- Includes: name, description, category, props (type, required, default), sub-components, related components
- Links to React Aria docs if applicable
- Includes accessibility info (e.g., "Full keyboard support, ARIA labels")

#### 4. Component API (GET /components/{id}/api)
- Extracted prop definitions with full type information
- Sub-component API definitions for compound components (Menu.Item, Card.Header, etc.)
- Descriptions for each prop
- Default values and enum options

#### 5. Component Examples (GET /examples/{id})
- Basic usage example (minimal working code)
- Variant examples (different prop combinations)
- Common patterns (e.g., "Menu with icons", "Form validation")
- Accessibility considerations

#### 6. Component Dependencies (GET /components/dependencies)
- For selected components, return npm packages required
- Example: button → ["react-aria"], menu → ["react-aria", "@floating-ui/react-dom", "cmdk"]
- Includes version constraints

#### 7. Installation Plan (GET /install/plan)
- Given component IDs, return:
  - `npm install` command(s) needed
  - Import statements for each component
  - File copy paths if components are scaffolded
  - Total size estimate
  - Compatibility notes (React version, etc.)

### Phase 1 Tools (Agent Actions)

#### 1. search_components
- **Purpose**: Agent discovers relevant components
- **Input**: query (string), category (optional), limit (optional)
- **Output**: Array of components matching query
- **Capability**: Enables agent to autonomously find components without hardcoding knowledge

#### 2. get_component_details
- **Purpose**: Agent gets full metadata for a component
- **Input**: component_id (string)
- **Output**: Full ComponentMetadata including API
- **Capability**: Agents understand component purpose, API, and related components

#### 3. get_component_api
- **Purpose**: Agent gets type-safe prop information
- **Input**: component_id (string)
- **Output**: Component API with prop types, descriptions, required flags
- **Capability**: Agents generate TypeScript-correct code without trial-and-error

#### 4. generate_component_code
- **Purpose**: Agent generates working TSX code
- **Input**: component_id, optional variant, optional props
- **Output**: TSX code snippet with proper imports
- **Capability**: Agents write working component code immediately

#### 5. resolve_dependencies
- **Purpose**: Agent understands what npm packages are needed
- **Input**: component_ids (array)
- **Output**: ResolvedDependencies with npm packages and versions
- **Capability**: Agents know exact installation requirements

#### 6. get_installation_plan
- **Purpose**: Agent gets step-by-step installation instructions
- **Input**: component_ids (array), optional project_context
- **Output**: Installation steps including npm commands, imports, file paths
- **Capability**: Agents can generate documentation for humans or guide them through setup

#### 7. get_component_examples
- **Purpose**: Agent learns proper usage patterns
- **Input**: component_id, optional pattern name
- **Output**: Code examples for basic usage and common variants
- **Capability**: Agents generate code that follows best practices by learning from examples

### Phase 1 MVP Scope (What's Included)

**In Scope**:
- ✅ All 26+ components discoverable via search
- ✅ Full component API information (props, types, required flags)
- ✅ Sub-component APIs for compound components (Menu.Item, Card.Header, etc.)
- ✅ Basic code generation (component + props + imports)
- ✅ Dependency resolution (which npm packages per component)
- ✅ Installation instructions
- ✅ Component examples/patterns
- ✅ Search by name, description, category

**Out of Scope (Phase 2+)**:
- ❌ Design tokens (colors, typography, spacing)
- ❌ Theme generation
- ❌ Tailwind CSS class suggestions
- ❌ Style composition helpers
- ❌ Project initialization/scaffolding
- ❌ Accessibility patterns and helpers
- ❌ Compound component composition patterns
- ❌ Real-time component preview rendering

### Phase 1 Success Criteria

1. **Component Discovery**: Agents can list all components, search by name/category, and get component metadata
   - Test: `search_components("input")` returns Input, Textarea, Form components
   - Test: `get_component_details("button")` returns full metadata with variant options

2. **API Completeness**: Agents have complete, type-safe prop information
   - Test: `get_component_api("select")` returns all Select props + all sub-component APIs (Select.Trigger, Select.Content, Select.Item)
   - Test: Props include type information (string, enum, number, boolean, etc.) and required/optional flags

3. **Code Generation**: Agents generate working TSX code with correct imports
   - Test: `generate_component_code("button", props={variant: "primary"})` generates valid TSX that can be pasted into a React file
   - Test: Generated code includes proper imports and prop typing

4. **Dependency Clarity**: Agents understand dependencies before generating code
   - Test: `resolve_dependencies(["commandPalette"])` returns ["cmdk", "react-aria", "@floating-ui/react-dom"]
   - Test: `get_installation_plan(["menu", "select"])` returns correct `npm install` command

5. **Usability**: Agents can write a complete UI with 0 manual intervention
   - Test: Agent generates entire form UI using Input, Label, Button, Form with correct imports and proper structure
   - Test: All generated code is TSX-valid and components have proper props

### Phase 1 Effort Breakdown

**Estimated work**:
1. **Setup & Infrastructure** 
   - Create packages/mcp project structure
   - Set up MCP SDK and server scaffolding
   - Configure TypeScript, build system

2. **Registry Adapter** 
   - Import ui-lab-registry package
   - Create wrapper for registry queries (search, by ID, by category)
   - Implement caching for registry data

3. **Resources Implementation** 
   - Component catalog resource
   - Component search resource
   - Component details resource
   - Component API resource
   - Examples resource
   - Dependencies resource
   - Installation plan resource
   - Implement resource URI routing

4. **Tools Implementation** 
   - Implement search_components tool
   - Implement get_component_details tool
   - Implement get_component_api tool
   - Implement generate_component_code tool
   - Implement resolve_dependencies tool
   - Implement get_installation_plan tool
   - Implement get_component_examples tool

5. **Code Generation Engine** 
   - Template-based code generation (Mustache or simple template engine)
   - Handle props, variants, sub-components
   - Generate proper imports
   - Add TypeScript type annotations

6. **Testing & Documentation** 
   - Write tests for core tools
   - Create example agent prompts
   - Document MCP server setup
   - Test with actual agent usage

### Phase 1 Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| Component metadata incomplete or incorrect | Medium | High | Use existing registry (battle-tested), validate against actual components |
| Code generation produces invalid TSX | High | High | Template-based generation from known patterns, validate against component API |
| Dependency resolution misses transitive deps | Low | Medium | Use existing CLI DependencyResolver, test against known component combinations |
| Performance issues with large component list | Low | Medium | Cache registry data, implement pagination for search |
| Props extraction incomplete for edge cases | Medium | Low | Manual review of extracted props, fallback to showing raw prop types |


