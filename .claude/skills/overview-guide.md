# UI Lab Overview & Getting Started Guide Generator

## Purpose
Generate comprehensive overview and getting started documentation for the UI Lab project. This skill creates high-quality introductory documentation that explains what UI Lab is, its key features, and how to get started using it.

## Responsibilities
- Generate project overview sections explaining core features and value proposition
- Create quick start guides for new users
- Document installation methods (npm, CLI)
- Provide usage examples for common scenarios
- Explain the monorepo structure and workspace setup
- Create setup instructions for different frameworks (Next.js, Vite, etc.)

## Output Requirements
- **Accurate Technical Information**: All information must be verified against the actual codebase
- **High Quality Markdown**: Properly formatted with code blocks, lists, and sections
- **Copy-Paste Ready**: Code examples should be executable and complete
- **Framework Agnostic Options**: Show examples for both Next.js and Vite where applicable
- **No Component Docs**: Do NOT document individual components
- **Clear Structure**: Use H2 (##) for main sections, H3 (###) for subsections

## Key Topics to Cover
1. **What is UI Lab?**
   - Production-ready component library
   - 27+ accessible React components
   - CSS Modules + Tailwind CSS styling
   - Interactive documentation site
   - Component registry system
   - CLI tool for project initialization

2. **Key Features**
   - Accessibility (React Aria, WCAG AA compliance)
   - Type-safe styling with CSS variables
   - Component registry metadata
   - Interactive documentation with live demos
   - Multiple build formats (ESM, UMD)

3. **Quick Start**
   - Using npm: `npm install ui-lab-components`
   - Using CLI: `npx ui-lab init`
   - Basic component usage with imports
   - CSS variable import requirement
   - Next.js and Vite specific setup

4. **Project Structure**
   - Monorepo with pnpm workspaces
   - packages/components - Component library
   - packages/cli - Installation CLI tool
   - packages/registry - Component metadata
   - apps/site - Documentation website

5. **Technology Stack**
   - React 19, TypeScript 5
   - Vite (components), tsup (CLI), Next.js 16 (site)
   - Tailwind CSS v4, CSS Modules, PostCSS
   - React Aria, Floating UI, GSAP for interactions

## Quality Checklist
- ✅ Verify against actual package.json files
- ✅ Check CLI commands are correct (ui-lab init, ui-lab install)
- ✅ Ensure npm package name is accurate (ui-lab-components)
- ✅ Provide exact version requirements (Node 18+, pnpm 10.21.0)
- ✅ Include proper heading hierarchy
- ✅ Format code blocks with appropriate language tags
- ✅ Cross-reference related documentation sections
