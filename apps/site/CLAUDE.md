
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Package Manager: This project uses `pnpm` for package management.

Development Setup: Use `pnpm dev` to start both frontend (Next.js with Turbopack) and backend (Convex) in parallel. For frontend-only work, use `pnpm dev:frontend`. For backend-only, use `pnpm dev:backend`. Run `pnpm predev` to ensure the Convex backend is ready before starting the frontend.

Build Commands: **NEVER run `pnpm build` unless explicitly asked by the user.** The build process is time-consuming and should only be executed when the user specifically requests it or when preparing for deployment.

Testing & Quality: No specific test commands are configured. Linting is your primary quality check.

Code Style: NEVER use comments. Write self-documenting code with clear variable names, function names, and logical structure. Favor compact, efficient code by minimizing unnecessary spacing and newlines. Group logically related statements on the same lines when it enhances readability without sacrificing clarity. Prioritize concise implementations that are still easy to understand over verbose code with extensive formatting.

## Next.js Route Groups

**CRITICAL:** When creating or editing files in Next.js route group directories (directories with parentheses like `(main)`, `(preview)`, etc.), use the `Bash` tool with `cat >` or similar commands rather than the `Write` tool. The `Write` tool escapes parentheses in file paths, which creates files with escaped names like `\(main\)` instead of the actual `(main)` directory, breaking the routing.

**Correct approach for route group files:**
```bash
cat > "/path/to/(main)/elements/@content/page.tsx" << 'EOF'
// file content
EOF
```

**Incorrect approach:**
- Using `Write` tool with path `/path/to/\(main\)/elements/@content/page.tsx` creates wrong filenames

## Component Examples Pattern (Scalable for all 30 Components)

When adding example snippets to component detail pages, use this pattern for consistency and to enable automatic code loading from `examples.json`:

**Structure:**
1. Store example .tsx files in `packages/registry/src/components/[Component]/examples/` directory
2. Each example exports `default` (React component) and `metadata` ({ title, description })
3. Generate `examples.json` during build with extracted code snippets
4. In the component's `index.tsx`, define an `examplesData` array that maps examples to metadata
5. Import the `loadComponentExamples` utility to merge component previews with code from JSON

**Implementation steps for a new component:**

```typescript
// 1. In packages/registry/src/components/Button/index.tsx
import Example1, { metadata as metadata1 } from './examples/01-basic button.js';
import Example2, { metadata as metadata2 } from './examples/02-button variants.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

// 2. Define examplesData array
const examplesData = [
  { id: '01-basic button', Component: Example1, metadata: metadata1 },
  { id: '02-button variants', Component: Example2, metadata: metadata2 },
  // ... add all examples
];

// 3. Use loadComponentExamples in the detail object
export const componentDetail: ComponentDetail = {
  // ... other properties
  examples: [
    // Include preview/interactive example first
    { id: 'preview', title: 'Preview', ... },
    // Then spread the dynamically loaded examples with code
    ...loadComponentExamples(examplesData, examplesJson),
  ],
};
```

**Benefits:**
- Code snippets loaded at build-time from pre-generated JSON (no runtime I/O)
- Examples render as components (interactive previews)
- New examples don't require code changes—just add a .tsx file and regenerate JSON
- Scalable pattern for all 30 components with minimal duplication
- Keep component files lightweight—code is resolved from external source

**Utility:**
- Location: `packages/registry/src/utils/load-component-examples.ts`
- Maps `examplesData` array with component previews to `SiteComponentExample` array with code included
- Gracefully handles missing code (defaults to empty string)

## Key Instruction Override

**DO NOT create markdown files, summaries, analysis documents, or any other supplementary files.** When asked to analyze the implementation or thoroughly understand the current code, do the analysis mentally or as inline comments in actual code files only. After implementing fixes, provide a brief text explanation of what was done nothing more. The goal is to fix the code and explain the fix, not to document it separately.
