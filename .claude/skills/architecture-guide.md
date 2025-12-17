# Project Architecture & Monorepo Guide Generator

## Purpose
Generate comprehensive documentation about the UI Lab project architecture, monorepo structure, and how the different packages work together. This skill creates technical documentation for developers who want to understand the project's organization and contribute to it.

## Responsibilities
- Document the monorepo structure and pnpm workspaces setup
- Explain how different packages interact
- Document build processes and tooling
- Create package-specific architecture guides
- Explain the component registry system
- Document development workflows
- Explain dependency management
- Create contributing guides based on architecture

## Output Requirements
- **Clear Hierarchy**: Show package relationships and dependencies
- **Accurate File Paths**: Reference actual directories in the monorepo
- **Build Process Details**: Explain how each package builds
- **Dependency Clarity**: Show internal and external dependencies
- **Technology Specifics**: Include exact tools and versions used
- **Visual Diagrams**: Use ASCII diagrams where helpful for structure

## Key Topics to Cover

1. **Monorepo Overview**
   - pnpm workspaces configuration
   - Root package.json scripts
   - pnpm-workspace.yaml structure
   - Why monorepo for this project
   - Workspace linking and interdependencies

2. **Packages Structure**
   ```
   packages/
   ├── components/     - Core component library
   ├── cli/           - Installation CLI tool
   └── registry/      - Component metadata system

   apps/
   └── site/          - Documentation website (Next.js)
   ```

3. **Components Package (@ui-lab/components)**
   - Purpose: Core component library with 27+ components
   - Entry point: src/index.ts
   - Build output: dist/ (ESM, UMD, Types)
   - Build tool: Vite 5
   - Key directories:
     - src/ - Component source files
     - src/styles.css - CSS variable system
     - src/lib/ - Utility functions (cn, etc.)
     - src/hooks/ - React hooks
     - dist/ - Build output
   - Exports: All components, utilities, hooks, types
   - Styling: CSS Modules + Tailwind CSS
   - Dependencies: React Aria, Floating UI, GSAP, Lucide, class-variance-authority
   - Build configuration: vite.config.ts with dts plugin

4. **CLI Package (@ui-lab/cli)**
   - Purpose: Command-line tool for project initialization and component installation
   - Entry point: src/bin/ui-lab.ts
   - Build tool: tsup
   - Target: Node.js 18+ (ESM only)
   - Core modules:
     - src/core/installer.ts - Component installation logic
     - src/core/config-manager.ts - Project configuration
     - src/core/registry-client.ts - Registry interface
     - src/core/dependency-resolver.ts - Dependency resolution
     - src/core/package-manager.ts - npm/pnpm operations
     - src/core/theme-generator.ts - Theme CSS generation
     - src/core/framework-scaffolder.ts - Project scaffolding
   - Commands: init, install/add
   - Dependencies: commander, @clack/prompts, picocolors
   - Type: Executable binary published as `ui-lab` command

5. **Registry Package (ui-lab-registry)**
   - Purpose: Component metadata and discovery system
   - Contents: Component type definitions, exports, registry data
   - Build tool: TypeScript compiler
   - Generator: tsx scripts
   - Used by: CLI for component validation, site for documentation
   - Introspection: Uses react-docgen-typescript

6. **Site App (@ui-lab/site)**
   - Purpose: Interactive documentation website
   - Framework: Next.js 16 with React 19
   - Build tool: Next.js (built-in webpack)
   - Key directories:
     - src/app/ - Next.js app directory
     - src/app/docs/ - Documentation pages (MDX)
     - src/app/components/ - Layout components
     - src/lib/component-demos/ - Interactive component examples
     - public/ - Static assets
   - Features:
     - MDX documentation pages
     - Live component demos
     - Interactive examples with Shiki syntax highlighting
     - 3D effects with Three.js + React Three Fiber
   - Styling: Tailwind CSS v4, CSS Modules
   - Uses: @ui-lab/components for demo purposes

7. **Build Pipeline**
   - Development: `pnpm dev` (runs all dev servers)
   - Individual dev: `pnpm dev:site`, `pnpm build:packages`
   - Production build: `pnpm build` (builds all packages)
   - Type checking: `pnpm type-check` across all packages
   - Publishing: `pnpm publish`
   - Local testing: Uses yalc for local npm registry

8. **Dependency Management**
   - Package manager: pnpm 10.21.0
   - Workspace references: Use `workspace:*` protocol
   - Peer dependencies: React 19, TypeScript 5
   - Shared dependencies:
     - React Aria, React Stately (accessibility)
     - Floating UI (positioning)
     - GSAP (animations)
     - Tailwind CSS, PostCSS (styling)
   - Dev dependencies:
     - TypeScript 5
     - Vite 5
     - Testing: vitest (if used)

9. **Build Process Details**

   **Components Package Build:**
   - Input: src/**/*.tsx, src/**/*.css
   - Processing: Vite bundle with TypeScript compilation
   - Output formats:
     - ESM: dist/ui-lab-ui.es.js
     - UMD: dist/ui-lab-ui.umd.js
     - Types: dist/index.d.ts
     - Styles: dist/styles.css
   - Type declarations: vite-plugin-dts generates .d.ts files

   **CLI Package Build:**
   - Input: src/**/*.ts
   - Processing: tsup (TypeScript bundler)
   - Output: dist/bin/ui-lab.js (executable)
   - Format: ESM with shebang for CLI execution
   - Tree-shaking enabled

   **Site Build:**
   - Input: app directory, MDX files, components
   - Processing: Next.js build
   - Output: Optimized production build
   - Static/dynamic: Static generation + ISR where needed

10. **Component Registry System**
    - Purpose: Metadata about all components
    - Contents:
      - Component names
      - Export locations
      - Dependencies between components
      - Type definitions
    - Usage:
      - CLI validates component names
      - Site generates documentation
      - Discovery and validation

11. **Development Workflows**
    - **Adding a new component**
      1. Create component in packages/components/src/
      2. Create component.module.css for styling
      3. Export from packages/components/src/index.ts
      4. Add demo to apps/site/src/lib/component-demos/
      5. Register in registry (if needed)
      6. Test: `pnpm dev` then visit site

    - **Modifying CLI**
      1. Edit packages/cli/src files
      2. Test with `pnpm dev` or direct execution
      3. Commands use Commander.js patterns

    - **Documentation updates**
      1. Modify apps/site/content/docs/ MDX files
      2. Changes hot reload in development

12. **Testing Strategy**
    - Component testing: Likely in src/__tests__/ or dedicated test files
    - CLI testing: Unit tests for core modules
    - Integration testing: End-to-end CLI tests
    - Accessibility testing: Manual using React Aria guidelines
    - Type checking: `pnpm type-check`

13. **Internal Package Communication**
    - Components exports public API
    - CLI imports from registry for metadata
    - Site imports components for demos
    - Registry is read-only (generated)
    - No circular dependencies between packages

14. **Contributing to the Project**
    - Clone repository
    - Install: `pnpm install`
    - Development: `pnpm dev`
    - Testing: `pnpm type-check`
    - Building: `pnpm build:packages`
    - Code organization: Follow existing patterns
    - Commit guidelines: Conventional commits

15. **Deployment**
    - Components: Published to npm as @ui-lab/components
    - CLI: Published to npm as ui-lab
    - Site: Hosted on Vercel (config in vercel.json)
    - Publishing: `pnpm publish` (from root)

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    NPM Consumers                        │
│         (ui-lab-components, ui-lab CLI)                 │
└──────────────┬──────────────────────────────────────────┘
               │
      ┌────────┴──────────┬─────────────────┐
      │                   │                 │
   ┌──▼────────┐   ┌─────▼──────┐   ┌────▼──────────┐
   │Components │   │    CLI     │   │  Site (Docs)  │
   │ Library   │   │    Tool    │   │    (Next.js)  │
   │ (Vite)    │   │   (tsup)   │   │               │
   └──────────┬┘   └────┬───────┘   └───────────────┘
              │         │
         Uses │    Uses │ + Registry
              │         │
         ┌────▼────┬────▼─────────┐
         │ React   │  Component   │
         │ Aria    │  Registry    │
         └────────┬└──────────────┘
                  │
         ┌────────▼──────────────┐
         │  Shared Dependencies  │
         │ (Floating UI, GSAP,   │
         │  Tailwind, TypeScript)│
         └───────────────────────┘
```

## Quality Checklist
- ✅ Reference actual directory paths
- ✅ Include correct package names and versions
- ✅ Explain tool choices (Vite, tsup, Next.js)
- ✅ Show workspace configuration accurately
- ✅ Document build output formats
- ✅ Explain package interdependencies
- ✅ Include development workflow steps
- ✅ Reference actual scripts in package.json
- ✅ Show build pipeline with actual tools
- ✅ Document registry system accurately
