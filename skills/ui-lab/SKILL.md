---
name: design
description: Build, audit, ideate, explore, or overhaul UI with UI Lab's component library. Routes to ideate (holistic feedback), audit (5-pillar validation), or overhaul (mechanical UI swap to UI Lab components without changing product logic or redesigning). Requires ui-lab-mcp server.
---

<objective>
Route UI Lab tasks to specialized agents. ideate produces design briefs. audit validates against 5 core pillars (Design System Adherence, Layout & Spacing, Accessibility & Usability, Cognitive Load, Visual Consistency) and produces star-rated reports. overhaul performs a mechanical UI swap to UI Lab components while preserving product logic (no redesign).
</objective>

<quick_start>
Paste your code or describe your UI. The skill routes to the right agent automatically. If you want a mechanical swap, say “overhaul our project UI with UI Lab components”.
</quick_start>

<routing>

| Intent | Agent | Trigger words |
|--------|-------|---------------|
| Ideate / critique | `ideate` | what should this have, what am I missing, ideate, is this the right design, what would make this better, design critique |
| Audit | `audit` | review, what's wrong, audit, fix, violations |
| Overhaul / replace UI | `overhaul` | overhaul, replace our ui, swap ui to ui lab, migrate project ui, convert ui to ui lab, refactor UI to UI Lab |

**Routing disambiguation:**
When trigger words match both `ideate` and `audit`:
- User provides existing code + asks "what's wrong / fix / review" → `audit`
- User asks "what should this have / what am I missing / is this right" with or without code → `ideate`
- User says "improve" without qualifying: ask "Do you want design system violations checked, or holistic design feedback on what should exist?"

When trigger words match `overhaul` and anything else:
- If the user wants a mechanical swap (“replace all available components with UI Lab equivalents”, “overhaul our project UI with UI Lab components”) → `overhaul`
- If the user wants a critique/audit of an existing UI (even if they also say “overhaul”) → ask whether they want (A) mechanical swap only or (B) swap + design critique; default to (A)

</routing>

<agent id="ideate">

<trigger>User wants holistic design critique: "what should this have", "improve the overall design", "is this the right design", "what am I missing", "ideate on this", "design critique", "what would make this better".</trigger>

<spawn_prompt_file>workflows/ideate.md</spawn_prompt_file>

</agent>

<agent id="audit">

<trigger>User provides existing code and wants it reviewed, improved, or audited.</trigger>

<spawn_prompt_file>workflows/audit.md</spawn_prompt_file>

</agent>

<agent id="overhaul">

<trigger>User wants a project-wide UI replacement to UI Lab components/patterns while preserving all existing product logic, data flow, and behavior (“overhaul our project UI with UI Lab components”, “swap/replace UI to UI Lab”, “migrate project UI”).</trigger>

<spawn_prompt_file>workflows/overhaul.md</spawn_prompt_file>

</agent>

<orchestration>

**Spawning:** Use the Task tool with subagent_type "general-purpose". Read the agent's `spawn_prompt_file` and pass its content as the prompt, appending the user's code, description, or file path at the end.

**MCP Usage:** Both agents leverage ui-lab-mcp tools to query the registry:
- **audit**: Validates components/props against registry via `search_components` → `get_component(detail="api")`; when a component's placement or nesting matters, also query `get_component(detail="usage")`. Uses `search_guides("theme")` → `get_guide` for theme/color setup validation instead of hardcoded rules.
- **ideate**: Discovers patterns/elements/sections/guides via search tools (`search_patterns`, `search_elements`, `search_sections`, `search_guides`) before suggesting gaps. Queries component examples via `get_component(detail="examples")` when needed and `get_component(detail="usage")` when composition semantics matter.
- **overhaul**: Uses `search_guides` → `get_guide("setup-ui-lab-in-project")` before any migration if UI Lab is not already wired. Uses `get_component(detail="api")` + `get_component(detail="usage")` + `get_component_source` to perform safe 1:1 replacements of primitives and to keep imports correct. Uses `get_pattern` / `get_element` / `get_section` only when it preserves the existing structure (no redesign).

</orchestration>

<success_criteria>

**audit**: An audit is complete when:
- Components validated against registry via `search_components` → `get_component(detail="api")`
- Native HTML elements checked first (`<button>`, `<a>`, `<input>`, `<select>`, `<div className="...">`, etc.) — any found are CRITICAL violations in the Adherence pillar
- Vibe-coded anti-patterns from `references/design-system.md` explicitly checked, including arbitrary typography utilities, over-specified text rhythm, and transition noise
- Each of the 5 pillars has been independently evaluated
- Star rating assigned based on violation severity and count (5 stars = no violations, 1 star = critical failures)
- Violations listed with specific element/component reference and actionable recommendation
- Summary provided with overall assessment and priority focus areas
- Output follows star-rated format (no code generation)

**ideate**: A brief is complete when:
- Registry queried via appropriate search tools (`search_patterns`, `search_elements`, `search_sections`, `search_guides`)
- Domain context, user mental model, and workflow reasoning documented (2–4 sentences)
- Element inventory flat-listed with role, load-bearing status, and value rating
- Gaps classified into CRITICAL, LAYOUT COHERENCE, PROGRESSIVE DISCLOSURE categories
- Top 5 suggestions ranked by spatial coherence impact first, then functional criticality
- No code written; focus purely on "what should exist"

**overhaul**: An overhaul is complete when:
- UI Lab is installed and styles/token layer are wired correctly (or it is explicitly confirmed already set up) using `search_guides` → `get_guide`
- A scoped plan + replacement report is presented and the user explicitly confirms before any overhaul changes are applied
- Only the view layer changes: preserve state, events, data fetching, routing, domain models, copy, and analytics hooks unless the user explicitly asks otherwise
- All eligible UI primitives/wrappers are swapped to UI Lab equivalents (components/patterns/elements/sections) where a clear match exists in the registry
- No “design improvement” changes are introduced (no new flows, no layout invention, no new features); any optional improvements are listed separately and not included in the patch
- A migration report is provided: what was swapped, what couldn’t be swapped (and why), and the highest-risk files/components

</success_criteria>
