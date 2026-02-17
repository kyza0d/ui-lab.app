# UI Lab MCP Server

A Model Context Protocol (MCP) server for the UI Lab component library that enables Claude and other AI coding agents to discover, understand, and generate production-ready component code.

## Overview

The UI Lab MCP Server bridges the gap between component metadata and AI agent capabilities, allowing agents to:

- **Discover Components**: Search for components by name, description, or category
- **Understand APIs**: Get complete type information for component props and sub-components
- **Generate Code**: Produce working TSX code with proper imports and type safety
- **Resolve Dependencies**: Understand what npm packages and internal components are required
- **Install Guidance**: Get step-by-step instructions for installing components

## Phase 1 Features (MVP)

### Tools (Agent-Callable Functions)

1. **search_components** - Search for components by query and category
2. **get_component** - Get full metadata for a specific component
3. **get_semantic_color** - Get recommended color for a component with intent
4. **generate_component** - Generate TSX code for a component
5. **transform_ui** - Transform entire UI file to use UI Lab components
6. **get_theme_setup** - Get theme system setup instructions and code for light/dark mode

### Quick Start

#### Installation

```bash
pnpm install
```

#### Build

```bash
pnpm build
```

#### Development

```bash
pnpm dev
```

#### Start Server

```bash
pnpm start
```

## Architecture

### Directory Structure

```
packages/mcp/
├── src/
│   ├── index.ts                 # Entry point
│   ├── server.ts                # MCP server setup
│   ├── tools.ts                 # Tool implementations
│   ├── types.ts                 # TypeScript type definitions
│   ├── adapters/
│   │   └── registry-adapter.ts  # Wrapper around ui-lab-registry
│   └── utils/
│       └── code-generator.ts    # Code generation utilities
├── dist/                        # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

### Key Components

**Registry Adapter** (`adapters/registry-adapter.ts`)
- Wraps the `ui-lab-registry` package
- Provides caching and query optimization
- Handles component lookup, search, and filtering

**Tools** (`tools.ts`)
- Implements all Phase 1 MCP tools
- Handles input validation and error handling
- Dispatches tool calls to appropriate handlers

**Code Generator** (`utils/code-generator.ts`)
- Generates valid TypeScript/TSX code
- Validates props against component APIs
- Creates import statements and component usage

**MCP Server** (`server.ts`)
- Initializes the MCP server
- Handles tool list requests
- Dispatches tool calls
- Uses stdio transport for communication

## Usage with Claude Desktop

To use this MCP server with Claude Desktop, add it to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ui-lab": {
      "command": "node",
      "args": ["/path/to/packages/mcp/dist/index.js"]
    }
  }
}
```

Then restart Claude Desktop.

## Future Phases

### Phase 2: Design System Integration
- Design tokens (colors, typography, spacing)
- Theme generation
- CSS variable management
- Tailwind CSS class suggestions

### Phase 3: Advanced Patterns
- Accessibility helpers
- Compound component composition
- Form validation patterns
- Real-time component preview

### Phase 4: Project Management
- Project initialization/scaffolding
- Component installation automation
- Configuration management
- Dependency conflict resolution

## Development

### Testing Tools Locally

You can test individual tools using Node.js:

```typescript
import { handleSearchComponents } from './tools.js';

const results = await handleSearchComponents({
  query: 'button',
  limit: 10
});

console.log(results);
```

### Type Safety

The server is fully typed with TypeScript. All MCP inputs and outputs have corresponding type definitions in `types.ts`.

## License

MIT
