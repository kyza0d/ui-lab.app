# UI Lab Overhaul (Mechanical UI Swap)

You are performing a project-wide UI overhaul to UI Lab. The goal is not to redesign or improve the UI; it is to mechanically replace existing UI primitives/wrappers with UI Lab equivalents while preserving all product logic and behavior.

## Hard constraints (do not violate)

- Change only the view layer. Preserve state, events, props contracts, data fetching, routing, domain models, copy, and analytics hooks unless the user explicitly requests otherwise.
- Do not “improve” the design. No new flows, no UX changes, no layout invention, no feature additions, no refactors unrelated to UI replacement.
- Prefer the narrowest safe replacement: UI Lab **components** first, then **patterns**, then **elements/sections** only if they preserve the existing structure.
- If there is no clear UI Lab equivalent, keep the existing implementation (or wrap UI Lab around it) and record it in the migration report.

## Two-phase workflow (plan → confirm → execute)

You must perform the overhaul in two phases:
1) Produce a scoped plan + replacement report.
2) Stop and ask the user to confirm.
Only after explicit confirmation, proceed with code changes.

## Phase 1: Determine scope, verify setup, and propose a plan

### 1) Determine the scope of the task

- Ask the user to confirm what should be included:
  - Which app(s)/package(s) in the repo
  - Which routes/screens are in scope (or “everything”)
  - Any directories to exclude (e.g., `apps/site`, storybook, internal tooling)
- If the user provides only “overhaul our project UI”, infer a safe default:
  - In-scope: the main product UI app
  - Out-of-scope: docs/demo sites, tests/fixtures, build output

### 2) See if UI Lab is set up

- Determine whether UI Lab is already wired:
  - `ui-lab-components` installed and used
  - Token layer present (theme CSS) and stylesheet import order correct
  - At least one route already renders a UI Lab component with tokens active
- If not set up, do not start the overhaul yet:
  - Use MCP: `search_guides("set up ui lab")` → `get_guide("setup-ui-lab-in-project")`
  - Propose the smallest setup patch needed (installation + stylesheet wiring + a single verification render)
  - Include setup as the first block in the plan (and still require confirmation before applying)

### 3) Present a refactor plan + replacement report (no code changes yet)

Build and present:

- **Execution plan** (ordered, incremental)
  - Start with shared primitives, then shared composites, then pages/routes
  - Include validation checkpoints (typecheck/tests/build) between milestones
- **Replacement report** (inventory)
  - Project-local UI components to replace (e.g., `Button`, `Input`, `Modal`, etc.)
  - Native HTML primitives used directly in UI contexts (`button`, `a`-as-button, `input`, `select`, `textarea`, etc.)
  - For each item: where it is, what it becomes (UI Lab target), and confidence (High/Medium/Low)

MCP guidance for mapping:
- Use `search_components` → `get_component(detail="api")` to select correct UI Lab primitives and props.
- Use `get_component(detail="usage")` when choosing between surface/layout components or when nesting one UI Lab component inside another.
- Use `get_component_source` to ensure imports are correct and to flag likely client components.
- Use `search_patterns` / `get_pattern` only when it matches the existing structure and does not imply a redesign.

### 4) Ask for confirmation

Stop after the plan + report and ask:
- “Do you want me to proceed with the overhaul exactly as planned?”
- If there are any Low-confidence mappings, ask whether to (A) skip them, (B) keep existing UI for those parts, or (C) proceed and iterate.

## Phase 2: Proceed with overhaul (only after confirmation)

### 5) Apply setup (if needed), then overhaul bottom-up

- If UI Lab setup was required, apply it first and re-verify tokens/styles are active.
- Replace primitives first (1:1 mechanical swaps), then composites/pages.
- Keep public contracts stable:
  - Preserve exported component names/paths in the app where possible (swap internals behind the same API)
  - Preserve event/callback semantics and state transitions
  - Preserve accessibility semantics and keyboard behavior

### 6) Validate and produce the migration report

- Run the repo’s validations (typecheck/tests/build) and fix only UI-swap-introduced failures.
- Provide a final report:
  - Swapped items (old → UI Lab target) + key files touched
  - Items skipped/blocked and why
  - Known risks or follow-ups (especially around client/server boundaries, portals, focus traps)

## MCP tool checklist (use these actively)

- `search_guides` → `get_guide` for setup + translation playbooks (especially `translate-existing-ui-to-ui-lab`)
- `search_components` → `get_component(detail="api")` for correct props/slots
- `get_component(detail="usage")` for composition rules, anti-patterns, and preferred alternatives
- `get_component_source` for correct imports and client/server notes
- `get_semantic_color` only when you must replace raw colors encountered during UI swap (do not “re-theme” the app)

## Output format

- Keep updates operational: what you’re doing, what you changed, what’s next.
- Avoid design critique language; focus on equivalence and risk management.
