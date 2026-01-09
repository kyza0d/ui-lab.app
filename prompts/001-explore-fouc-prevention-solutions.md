<objective>
Research and document multiple approaches to prevent Flash of Unstyled Content (FOUC) in Next.js consumer applications that use the ui-lab-components theme provider. The goal is to simplify the developer experience by reducing or eliminating the need for manual inline script injection in consumer layouts while maintaining reliable theme persistence across page refreshes.

Current state: A working solution using inline script injection in layout.tsx. Goal: Explore cleaner alternatives that maintain the same functionality without cluttering consumer code.
</objective>

<context>
Project: UI Lab monorepo with a component library (@packages/components) and consumer apps in ~/Temp/test

Current implementation:
- ThemeProvider in @packages/components uses React Context for theme state
- Theme recovery script runs from localStorage to restore saved theme on page load
- Consumer apps manually inject a script in layout.tsx to prevent FOUC
- Theme toggles update DOM immediately via setThemeMode()

Tech stack:
- Next.js 16 (Turbopack)
- React 19
- Workspace monorepo (consumer imports from local package reference)
- CSS variables for theme colors (OKLCH color space)
- localStorage for theme persistence

Key files:
@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/ThemeProvider.tsx - Main theme context and logic
@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/themeScript.ts - Theme recovery script generation
@/home/kyza/Temp/test/src/app/layout.tsx - Consumer app layout (current workaround location)
@/home/kyza/Temp/test/src/app/providers.tsx - Consumer app ThemeProvider wrapper

FOUC Problem:
- When user refreshes after saving dark mode in light theme UI, they briefly see light colors
- The inline script runs before CSS loads, but the developer experience is poor
- Manual setup required in every consumer app
</context>

<requirements>
Thoroughly explore and document at least 3-4 different approaches to prevent FOUC:

1. **Next.js Script Component Approach**
   - Investigate using Next.js Script tag with strategy='beforeInteractive'
   - Determine how/if this can automatically inject the theme script from the package
   - Document pros, cons, and implementation complexity
   - Consider how this works in workspace vs published package scenarios

2. **Next.js Middleware Approach**
   - Research using middleware.ts to detect theme preference early (from cookies/headers)
   - Explore injecting theme data into request context
   - Determine if this can set theme before hydration
   - Consider performance implications

3. **Cookie-Based Approach**
   - Document how to persist theme in cookies instead of localStorage
   - Explore setting cookies with response headers in middleware
   - Consider how server-side rendering can use cookie data
   - Determine trade-offs vs localStorage

4. **Custom Next.js Plugin/Wrapper Approach**
   - Research creating a custom hook/component that wraps the entire setup
   - Explore if the package can programmatically inject required files or setup
   - Document how to minimize boilerplate while maintaining flexibility

For each approach, analyze:
- **Implementation complexity**: How much setup does a consumer need?
- **Developer experience**: Does it require manual code, or is it automatic?
- **Reliability**: Does it consistently prevent FOUC on refresh and toggle?
- **Flexibility**: Can it be customized per app (light/dark defaults, etc)?
- **Compatibility**: Works with workspace reference? Published package? Both?
- **Performance**: Any impact on initial load, hydration, or runtime?
- **Maintainability**: Easy to debug if issues arise?

Recommendation:
After exploring each approach, recommend which 1-2 are most promising and why, considering:
- Simplicity for consumer developers
- Reliability in preventing FOUC
- Maintainability for the library authors
- Real-world usability
</requirements>

<research_sources>
Explore the following areas:

1. Next.js documentation on Script component and beforeInteractive strategy
2. Next.js middleware patterns and request/response manipulation
3. Cookie management in Next.js (http-only, secure, SameSite)
4. Server Component vs Client Component patterns for theme setup
5. Hydration mismatch prevention in Next.js 16
6. Common FOUC prevention patterns in modern React frameworks

Reference existing implementations:
@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/ThemeProvider.tsx - Current context-based approach
@/home/kyza/Projects/ui-lab/app/packages/components/src/providers/themeScript.ts - Current script generation
</research_sources>

<output>
Save findings to: `./research/fouc-prevention-approaches.md`

Structure the document as follows:

## FOUC Prevention Approaches Analysis

### Executive Summary
- Current working solution (inline script in layout)
- Why we want to improve
- Recommended approach(es)

### Approach 1: Next.js Script Component
- Overview
- How it works
- Implementation requirements in package
- Consumer setup code
- Pros and cons
- Feasibility assessment
- Example implementation (pseudocode)

### Approach 2: Next.js Middleware
- Overview
- How it works
- Implementation requirements
- Consumer setup code
- Pros and cons
- Feasibility assessment
- Example implementation (pseudocode)

### Approach 3: Cookie-Based with Middleware
- Overview
- How it works
- Implementation requirements
- Consumer setup code
- Pros and cons
- Feasibility assessment
- Example implementation (pseudocode)

### Approach 4: [Custom approach or alternative]
- Overview
- How it works
- Implementation requirements
- Consumer setup code
- Pros and cons
- Feasibility assessment
- Example implementation (pseudocode)

### Comparative Analysis Table
| Approach | Setup Complexity | FOUC Prevention | Developer Experience | Maintainability |
|----------|-----------------|-----------------|---------------------|-----------------|
| Current (inline) | Medium | ✓ Works | Poor (manual) | Good |
| Script Component | Low/Medium | ? | Good | ? |
| Middleware | Medium/High | ? | Excellent | ? |
| Cookies | Medium | ? | Good | ? |

### Recommendation
- Best approach(es) for simplifying DX
- Implementation priority
- Potential hybrid approach
- Next steps for implementation

### Implementation Roadmap
If implementing recommended solution:
- Phase 1: What needs to change in @packages/components
- Phase 2: What consumer apps need to do
- Phase 3: Testing and validation
</output>

<verification>
Before completing research, verify:
- [ ] All 3-4 approaches thoroughly explored (not superficial)
- [ ] Each approach has clear pros/cons assessment
- [ ] Consumer setup complexity documented for each
- [ ] Real-world feasibility considered (workspace + package)
- [ ] Comparative analysis completed
- [ ] A clear recommendation made with reasoning
- [ ] Implementation roadmap sketched out
</verification>

<success_criteria>
- Research document is comprehensive but readable (1500-2500 words)
- Each approach has enough detail to understand implementation effort
- Reader can understand trade-offs and make informed decision
- Recommendation is justified with specific reasoning
- Document serves as foundation for next phase (implementation planning)
</success_criteria>
