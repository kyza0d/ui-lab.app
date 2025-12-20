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

## Phase 2: Design System Integration

### Phase 2 Goal
Enable agents to **generate component code that's styled according to UI Lab's design system**. Agents understand colors, typography, spacing, and can generate components using semantic color roles and design tokens.

### Phase 2 New Resources

#### 1. Color Tokens Resource
- Get color palettes for all roles (background, foreground, accent, success, danger, warning, info)
- Each role includes all 11 shades (50, 100, 200, ..., 950)
- Returns hex values, OKLCH coordinates, and CSS variable names
- Example: `tokens/colors?role=accent` returns all accent shades with hex and CSS vars

#### 2. Typography Tokens Resource
- Font sizes, line heights, font families, font weights
- Clamp expressions for responsive sizing
- Example: `tokens/typography` returns { sizes: {...}, lineHeights: {...}, families: {...} }

#### 3. Spacing Tokens Resource
- Spacing scale (0.2rem to 32rem)
- Border radius presets (xs to 2xl)
- Example: `tokens/spacing` returns { scale: [...], radius: {...} }

#### 4. Theme Configuration Resource
- Available theme presets (vitesse-dark, vitesse-light, custom)
- Current theme configuration
- Semantic color mappings

#### 5. Design System Guidelines Resource
- Which color roles for which component states (e.g., primary button uses accent-600)
- Typography hierarchy (headings, body, captions)
- Spacing conventions (padding, margins, gaps)
- Accessibility minimum contrast ratios

### Phase 2 New Tools

#### 1. get_design_tokens
- **Purpose**: Agent gets design token values
- **Input**: token_type (colors, typography, spacing), options (role, format)
- **Output**: Token definitions with multiple formats (hex, OKLCH, CSS var names)
- **Capability**: Agents incorporate design system into generated code

#### 2. generate_styled_component
- **Purpose**: Agent generates component code with design system styling
- **Input**: component_id, variant, design_context (primary button, secondary form field, etc.)
- **Output**: TSX code using design tokens (CSS vars or Tailwind classes)
- **Capability**: Agents generate styled, on-brand components

#### 3. get_color_scale
- **Purpose**: Agent gets complete color palette for a role
- **Input**: role (accent, success, etc.), format (hex, oklch, css-var)
- **Output**: All 11 shades in requested format
- **Capability**: Agents understand color hierarchies and pick appropriate shades

#### 4. validate_color_usage
- **Purpose**: Agents verify color choices meet accessibility and design guidelines
- **Input**: role, shade, context (background, text, border)
- **Output**: Validation result with contrast ratios, accessibility warnings
- **Capability**: Agents generate accessible components automatically

#### 5. get_design_system_guidelines
- **Purpose**: Agent learns design system conventions
- **Input**: component_id (optional), aspect (colors, typography, spacing)
- **Output**: Guidelines and recommendations for using design system with component
- **Capability**: Agents make informed styling decisions

### Phase 2 Success Criteria

1. **Design Token Access**: Agents can retrieve all design tokens
   - Test: `get_design_tokens("colors", {role: "accent"})` returns all accent shades with hex and CSS var names
   - Test: `get_design_tokens("typography")` returns font sizes, families, line heights

2. **Styled Code Generation**: Agents generate component code using design tokens
   - Test: `generate_styled_component("button", variant="primary")` generates code using `--accent-600` or Tailwind classes
   - Test: Generated code respects color hierarchy and accessibility

3. **Accessibility**: Generated code meets accessibility standards
   - Test: `validate_color_usage("accent", 600, "text")` checks contrast against background
   - Test: Agents are warned about low-contrast color combinations

4. **Design Consistency**: All generated code follows design system conventions
   - Test: All buttons use consistent color roles and spacing
   - Test: Typography follows hierarchy (headings use larger fonts, etc.)

### Phase 2 Effort & Timeline
- **Effort**: ~5-8 days
- **Dependency**: Requires Phase 1 complete
- **Why Phase 2**: Design tokens are secondary to core component functionality; MVP works without them

---

## Phase 3: Advanced Features

### Phase 3 Goal
Enable agents to **compose complex UIs with advanced patterns**. Agents understand compound component composition, accessibility patterns, edge cases, and can generate sophisticated, production-ready component combinations.

### Phase 3 New Resources & Tools

#### 1. Compound Component Patterns
- How to compose Menu with sub-items, groups, separators, checkboxes
- Select composition with searchable mode
- Card with header, body, footer, actions
- Form with validation, error states, labels

#### 2. Accessibility Patterns
- ARIA attributes for components (roles, labels, descriptions)
- Keyboard shortcuts and focus management
- Screen reader hints
- Low vision considerations

#### 3. Responsive Patterns
- Breakpoint-aware component layouts
- Mobile-first component strategies
- Responsive typography and spacing

#### 4. State Management Patterns
- Controlled vs uncontrolled components
- Form state with validation
- Loading, error, success states
- Multi-select and modal interactions

#### 5. Component Composition Patterns
- Button groups with proper styling
- Modal with form and buttons
- Menu with command palette
- Nested cards and containers

### Phase 3 Tools

#### 1. generate_compound_component
- Generate complex component hierarchies (e.g., Menu with sub-items, icons, keyboard shortcuts)
- Proper composition of sub-components with required props

#### 2. get_accessibility_pattern
- Return proper ARIA attributes and keyboard handling for component

#### 3. get_responsive_layout
- Return responsive component code for different breakpoints

#### 4. generate_form_ui
- Generate complete form with validation, error handling, labels

#### 5. generate_data_table
- Generate table with sorting, filtering, pagination (if Table component supports)

### Phase 3 Success Criteria

1. **Compound Component Generation**: Agents generate complex component hierarchies
   - Test: `generate_compound_component("menu", {...})` with icons, groups, keyboard shortcuts
   - Test: All sub-components have required props and proper nesting

2. **Accessibility**: Generated code includes proper ARIA attributes
   - Test: `get_accessibility_pattern("modal")` returns proper role, aria-labelledby, focus trap
   - Test: All interactive components have keyboard support

3. **Responsive Design**: Agents generate responsive component code
   - Test: `get_responsive_layout("grid")` returns Tailwind breakpoint classes or CSS media queries
   - Test: Components adapt to mobile, tablet, desktop

4. **Form Patterns**: Agents generate complete form UIs with validation
   - Test: `generate_form_ui(fields=[{name: "email", type: "email"}, ...])` generates form with labels, inputs, validation
   - Test: Form includes error states and success feedback

### Phase 3 Effort & Timeline
- **Effort**: ~8-12 days
- **Dependency**: Requires Phase 1 & 2 complete
- **Why Phase 3**: Advanced features add sophistication; Phase 1 is sufficient for basic UI building

---

## Phase 4: Optional Future Integrations

### Phase 4 Goal
Deep integration with external systems and tools. This phase is speculative and depends on future requirements.

### Potential Phase 4 Capabilities

#### 1. **Integration with Design Files (Figma)**
- Connect to Figma designs and map to UI Lab components
- Auto-generate component code from Figma layers
- Bidirectional sync: code ↔ design

#### 2. **Integration with Monorepo Build Systems**
- Component library configuration in monorepo (Nx, Turborepo)
- Monorepo-aware component discovery and installation
- Versioning and component releases

#### 3. **Integration with Testing Frameworks**
- Auto-generate component tests (unit, visual, accessibility)
- Integration with Testing Library, Vitest, Playwright
- Generate test templates for common component patterns

#### 4. **Integration with Documentation Generators**
- Auto-generate Storybook stories from component metadata
- Docusaurus or Nextra documentation generation
- Interactive component playgrounds

#### 5. **Integration with Code Style & Linting**
- ESLint rules for component prop validation
- Prettier configuration for component code formatting
- Component usage patterns enforcement

#### 6. **Component Analytics & Usage Tracking**
- Track which components agents generate most frequently
- Usage patterns and popular component combinations
- Feedback loop for library improvements

---

## Key Decisions & Rationale

### Decision 1: MVP Scope - Component Discovery & Code Generation, NOT Design System

**Decision**: Phase 1 MVP excludes design tokens, theme generation, and styling. Phase 2 adds design system integration.

**Rationale**:
- Agents can generate working, functional component code without design tokens
- Design tokens are secondary to core functionality—agents can add CSS later
- Phase 1 MVP is achievable in 2-3 weeks; including design system adds complexity
- Design system integration is valuable but not blocking agent-driven UI building
- Separating MVP and Phase 2 allows incremental delivery and validation

**Trade-off**: Generated code from Phase 1 won't have design system styling; agents will need to add CSS or wait for Phase 2. Design systems are usually applied across entire projects anyway (via Tailwind config or CSS vars).

### Decision 2: Read-Only Operations, No Side Effects

**Decision**: Phase 1 tools are read-only. The MCP server does NOT install packages, modify files, or mutate project state.

**Rationale**:
- MCP server should be stateless and embeddable in any context
- Agents can read installation plans and guide users through manual steps
- File I/O is risky in sandboxed environments (agent endpoints)
- Read-only pattern is simpler to reason about and test
- Reusing CLI's existing install logic for file operations avoids duplication

**Trade-off**: Agents can't autonomously set up projects; they must guide humans through setup. This is acceptable for MVP—Phase 3+ could add optional scaffolding.

### Decision 3: Template-Based Code Generation

**Decision**: Code generation uses templates (Mustache or simple string substitution) rather than AST-based generation.

**Rationale**:
- Simpler to implement and maintain
- Easier to extend with new patterns
- Produces readable code (agents should be able to modify output easily)
- Template mistakes are obvious and easy to fix
- Full AST manipulation is overkill for MVP

**Trade-off**: Edge cases (nested props, complex prop combinations) may require manual template adjustments. AST-based generation in Phase 3 for sophistication.

### Decision 4: Leverage Existing Registry & CLI Code

**Decision**: The MCP server wraps existing `ui-lab-registry` and CLI utilities rather than reimplementing them.

**Rationale**:
- Registry is battle-tested and already extracting component metadata correctly
- CLI has proven patterns for dependency resolution, config management, theme generation
- Reusing code reduces bugs and maintenance burden
- Changes to registry automatically flow through to MCP
- Follows DRY principle

**Trade-off**: MCP server is tightly coupled to registry/CLI. If these systems change, MCP must adapt. This is acceptable—registry is stable API.

### Decision 5: Component Metadata is Hardcoded in Registry

**Decision**: Component metadata (names, descriptions, props) is hardcoded in registry, not dynamically loaded from component files.

**Rationale**:
- Metadata is performance-critical (agents query it frequently)
- Hardcoding allows CI/CD to validate metadata during build
- Extracted metadata (via scripts) is already versioned
- Dynamic metadata loading would require filesystem access or network calls

**Trade-off**: Metadata must be manually updated when components change. Registry generation scripts handle this—developers run `npm run generate:registry` after component changes.

---

## Open Questions & Decisions Needed

### 1. **MCP Transport Layer**
**Question**: How should agents communicate with the MCP server? (stdio, HTTP, WebSocket)

**Context**: MCP spec supports multiple transports. Stdio is simplest (works in sandboxes), HTTP/WebSocket enable remote servers.

**Options**:
- **stdio** (stdin/stdout pipes): Simplest, works in all environments, agents spawned as subprocesses
- **HTTP**: Allows web-based agents, requires server infrastructure
- **WebSocket**: Real-time communication, good for long-lived agents

**Recommendation**: Start with stdio for Phase 1. HTTP/WebSocket in later phases if needed.

**Action Needed**: User input on deployment model and agent runtime.

---

### 2. **Component Source Code Retrieval**

**Question**: Should the MCP expose actual component source code or only metadata?

**Context**: Agents might want to read component implementation for complex components.

**Options**:
- **Metadata Only** (Phase 1): Props, types, examples, but not source code. Simpler, focuses on usage.
- **With Source Code** (Phase 1 or 2): Include component TSX, CSS, type definitions. Agents can understand implementation details.
- **Lazy Loading**: Load source code only if agent requests it (performance optimization).

**Recommendation**: Phase 1 metadata only. Add source code in Phase 2 if agents request it.

**Action Needed**: Will agents need to read component implementations?

---

### 3. **Example Template Sourcing**

**Question**: Where should code examples come from for `get_component_examples` tool?

**Context**: Examples could be hardcoded, extracted from site demos, or generated from component patterns.

**Options**:
- **Hardcoded in Registry**: Examples written by library maintainers, consistent, requires manual updates
- **Extracted from Site**: Use existing `/apps/site/src/lib/component-demos/` examples
- **Generated from Props**: Agents generate examples programmatically from prop combinations
- **Hybrid**: Hardcoded examples for common patterns, generated for edge cases

**Recommendation**: Hardcoded in registry for MVP. Hybrid approach in Phase 2.

**Action Needed**: Should examples be manually curated or auto-generated?

---

### 4. **Project Context & Scaffolding**

**Question**: Should the MCP assume a project context, or be agnostic?

**Context**: Installation paths, Tailwind config, path aliases differ per project.

**Options**:
- **Project Agnostic** (Phase 1): Return generic instructions; agents adapt to their project
- **Project Aware** (Phase 2): Detect framework, paths, config; return project-specific instructions
- **Scaffolding** (Phase 3): Create projects, configure Tailwind, set up paths

**Recommendation**: Phase 1 project agnostic with generic paths. Phase 2 add project detection (optional).

**Action Needed**: Should MCP server read local project config?

---

### 5. **Component Version Management**

**Question**: How should the MCP handle component versions?

**Context**: Components may evolve; should agents always use latest or support older versions?

**Options**:
- **Latest Only**: Always return latest component metadata; simpler, no version management
- **Version-Aware**: Support multiple component versions; more complex but flexible
- **Version Locking**: MCP uses version from package.json; agents get that version's API

**Recommendation**: Phase 1 latest only. Version management in Phase 3 if needed.

**Action Needed**: Will agents need to work with older component versions?

---

### 6. **Compound Component Composition Limits**

**Question**: How deeply should the MCP support nested compound components?

**Context**: Menu can have Sub menus with Sub items. How many levels?

**Options**:
- **1 Level**: Simple composition (Menu → Item)
- **3-4 Levels**: Moderate nesting (Menu → Group → Sub → Item)
- **Unlimited**: Full support for arbitrary nesting depth

**Recommendation**: Phase 1 support 2-3 levels. Phase 3 arbitrary nesting.

**Action Needed**: What's the maximum nesting depth agents will need?

---

### 7. **Performance & Caching Strategy**

**Question**: Should the MCP cache extracted metadata, generated code, or queries?

**Context**: Registry data is static; query results are expensive. Cache could improve performance.

**Options**:
- **No Caching**: Fresh data on every request; simplest but slower
- **In-Memory Cache**: Cache registry data in MCP process memory; fast but uses RAM
- **Persistent Cache**: Cache to disk; survives process restarts
- **Agent-Level Cache**: Agents cache their own results; MCP doesn't cache

**Recommendation**: Phase 1 in-memory cache with 1-hour TTL. Persistent cache in Phase 2 if needed.

**Action Needed**: What's the acceptable latency for MCP queries?

---

### 8. **Error Handling & Fallbacks**

**Question**: When component metadata is incomplete, what should the MCP do?

**Context**: Prop extraction might miss some properties. Should MCP fail or degrade gracefully?

**Options**:
- **Strict**: Return error if metadata incomplete; forces maintainers to fix
- **Lenient**: Return partial metadata with warnings; agents can work with available data
- **Hybrid**: Errors for critical data (props), warnings for optional data (examples)

**Recommendation**: Hybrid approach. Errors for component props (critical), warnings for examples/docs (nice-to-have).

**Action Needed**: What metadata is critical vs optional?

---

### 9. **Accessibility Features for Agents**

**Question**: Should Phase 1 include accessibility helpers, or defer to Phase 3?

**Context**: Accessibility is important but complex. Could be Phase 1 or Phase 3.

**Options**:
- **Phase 1**: Include accessibility patterns in examples and guidelines
- **Phase 3**: Defer complex accessibility patterns (ARIA, keyboard shortcuts) to Phase 3
- **Phase 2**: Add accessibility as part of design system integration

**Recommendation**: Phase 1 include basic accessibility info (what component supports screen readers, keyboard). Phase 3 for advanced patterns.

**Action Needed**: How important is accessibility for initial agent workflows?

---

### 10. **Real-Time Component Preview**

**Question**: Should the MCP enable real-time rendering/preview of components?

**Context**: Agents could request a rendered preview of generated components.

**Options**:
- **No Preview** (Phase 1): MCP provides code only; agents/humans render it
- **Image Preview** (Phase 3): Render components to PNG/SVG for visual feedback
- **Interactive Preview** (Future): Browser-based component playground

**Recommendation**: Phase 1 no preview. Phase 3 optional image preview.

**Action Needed**: Do agents need visual feedback, or code + examples sufficient?

---

## Summary & Next Steps

### What's Complete
This Plan.md document provides:
- ✅ Complete codebase analysis with file paths and integration opportunities
- ✅ MCP architecture with 10 resources and 10 tools clearly defined
- ✅ MVP phase focused on component discovery and code generation (achievable in 2-3 weeks)
- ✅ Phase 2-4 roadmap with design system, advanced features, and future integrations
- ✅ Detailed success criteria for each phase
- ✅ Open questions requiring stakeholder input

### Next Steps for Implementation

1. **Get Stakeholder Approval** on:
   - MVP scope (is component discovery + code generation sufficient?)
   - Open questions (transport layer, caching, accessibility level)
   - Phase priorities (is Phase 2 design system integration important?)

2. **Create MCP Project Structure**:
   - Set up `packages/mcp` directory
   - Configure TypeScript, build system, dependencies
   - Add MCP SDK dependency

3. **Start Phase 1 Implementation**:
   - Build registry adapter
   - Implement resources (component catalog, search, API, examples, dependencies)
   - Implement tools (search, get details, generate code)
   - Integration testing with real component queries

4. **Iterate & Validate**:
   - Test with actual agent usage
   - Collect feedback on what agents need
   - Refine Phase 2 scope based on Phase 1 learnings

### Success Metrics

**Phase 1 Success**:
- Agents can discover 26+ components via search
- Agents can generate working TSX code for any component
- Agents understand component dependencies and API requirements
- Zero hardcoded component knowledge needed in agent prompts

**Phase 2 Success**:
- Generated component code includes design system styling
- Agents compose entire UIs using design tokens
- Generated code respects accessibility and visual hierarchy

**Phase 3 Success**:
- Agents generate complex, production-ready UIs with compound components
- All generated code is keyboard-accessible
- Agents handle edge cases (form validation, error states, loading states)

---

## Appendix: Resource & Tool Reference

### All Resources (URI Scheme)
1. `component://[id]` - Single component metadata
2. `component://*` - All components
3. `components://search?q=[query]&category=[category]&limit=[limit]` - Search results
4. `dependencies://resolve?components=[id1,id2,...]` - Resolved dependencies
5. `tokens://colors?role=[role]` - Color tokens
6. `tokens://typography` - Typography tokens
7. `tokens://spacing` - Spacing tokens
8. `api://component?id=[id]` - Component API
9. `examples://component?id=[id]&pattern=[pattern]` - Code examples
10. `project://config` - Project configuration
11. `install://plan?components=[id1,id2,...]` - Installation plan

### All Tools (Agent Callable Functions)
1. `search_components(query, category?, limit?)` → Components[]
2. `get_component_details(component_id)` → ComponentMetadata
3. `get_component_api(component_id)` → ComponentAPI
4. `generate_component_code(component_id, variant?, props?)` → TSX code
5. `resolve_dependencies(component_ids)` → ResolvedDependencies
6. `get_installation_plan(component_ids, project_context?)` → InstallationPlan
7. `get_component_examples(component_id, pattern?)` → CodeExamples
8. `get_design_tokens(token_type, options?)` → TokenDefinitions (Phase 2)
9. `validate_component_selection(component_ids, use_case?)` → ValidationResult
10. `analyze_component_dependencies(component_ids)` → DependencyTree

---

**End of Plan.md**

---

*This plan was created as a comprehensive ideation and architecture document for the UI Lab MCP Server. It provides the strategic direction, technical design, and phased roadmap needed to build a robust, extensible MCP server that enables autonomous UI building workflows.*
