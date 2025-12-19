<research_objective>
Research and document comprehensive testing methods for a React component library built with React Aria and Tailwind CSS. The goal is to establish a reliable testing framework that:
- Maximizes use of React Aria testing utilities and accessibility-focused testing
- Avoids unnecessarily complex solutions requiring headless browsers for basic component testing
- Evaluates whether Playwright would add meaningful value for specific testing scenarios
- Provides clear guidance on which testing approach to use for different component types

This research will inform decisions about the testing infrastructure for ui-lab-components, a production React component library.
</research_objective>

<scope>
Focus on testing methodologies appropriate for:
- React components built with React Aria (accessibility-first)
- Tailwind CSS styling validation
- Component interactions, state changes, and event handling
- Accessibility compliance (a11y)

Research boundaries:
- Prioritize solutions with moderate setup complexity
- Include headless browser frameworks (like Playwright) only if they solve specific problems that simpler solutions cannot
- Consider both unit testing and integration testing approaches
- Do NOT focus on E2E testing of entire applications (only component-level testing)
- Include practical examples and trade-offs for each approach
</scope>

<research_areas>

1. **React Aria Testing Capabilities**
   - What testing utilities does React Aria provide?
   - How to test React Aria hooks and component behavior?
   - Accessibility testing with React Aria (ARIA attributes, keyboard navigation)
   - Limitations and what React Aria testing cannot cover alone

2. **Jest + React Testing Library (lightweight approach)**
   - Best practices for testing React Aria components
   - Accessibility assertions and queries (getByRole, etc.)
   - Interaction testing (user events, keyboard input)
   - CSS/styling validation techniques
   - Snapshot testing considerations

3. **Vitest as an alternative**
   - Why Vitest over Jest for component libraries
   - Setup with React components and Tailwind CSS
   - Performance and DX benefits for component testing
   - Integration with existing Vite build setup (already in use)

4. **Visual Testing / Snapshot Approaches**
   - Pros/cons of snapshot testing
   - Visual regression testing without headless browsers (if possible)
   - When visual testing is necessary vs. integration testing

5. **Playwright - Cost/Benefit Analysis**
   - When does Playwright solve problems that unit/integration testing cannot?
   - Specific scenarios where headless browser testing adds value for components
   - Setup complexity and maintenance overhead
   - Playwright vs. simpler alternatives (Puppeteer, Cypress)
   - Should it be used alongside unit tests or as replacement?

6. **Keyboard and Accessibility Testing**
   - How React Aria testing utilities handle keyboard navigation
   - Testing focus management, trap focus, etc.
   - Screen reader simulation and testing
   - Automated accessibility compliance checking

7. **Testing Strategy Recommendations**
   - Recommended testing pyramid (unit vs. integration vs. E2E)
   - Which tool for which component type
   - Best practices for a component library context
   - Avoiding test fragility and maintenance burden

</research_areas>

<deliverables>
Create a comprehensive research document at `/research/component-testing-methods.md` containing:

**Section 1: Executive Summary**
- Brief overview of recommended testing approach
- Key decision factors

**Section 2: Testing Methods Comparison Table**
- Method / Framework name
- Setup complexity (Low / Medium / High)
- Best use cases
- Limitations
- Maintenance burden
- Integration with Vite + React Aria

**Section 3: Detailed Analysis of Each Method**
For each testing approach (React Aria utilities, Jest + RTL, Vitest, Playwright, visual testing):
- How it works
- Pros and cons
- Example scenarios it handles well
- Code example (simplified)
- When to use / avoid

**Section 4: React Aria Testing Deep Dive**
- Native React Aria testing capabilities
- What it excels at
- Gaps that require other tools
- Integration with other frameworks

**Section 5: Playwright Evaluation**
- Specific problems it solves
- When headless browser testing is necessary
- Cost-benefit for component library testing
- Recommendations (use / don't use)

**Section 6: Recommended Testing Stack**
- Primary testing tool: [with justification]
- Secondary tools: [with justification]
- Implementation roadmap
- Example test structure for common component types

**Section 7: Example Test Cases**
Show example tests for the same component using different approaches to compare clarity, maintainability, and what each tests:
- Unit test example (React Aria + Jest)
- Accessibility test example
- Interaction test example
- One Playwright example if recommended

</deliverables>

<evaluation_criteria>
Assess research quality by:
- Is the comparison fair and unbiased?
- Are pros/cons backed by reasoning, not assumptions?
- Are recommendations justified by the analysis?
- Would a developer with this research be able to make a confident decision?
- Are trade-offs clearly explained?
- Are example code snippets practical and runnable?

Key questions the research must answer:
1. What should be our primary testing framework for unit/integration tests?
2. Should we use Playwright, and if so, for what specific scenarios?
3. How do we maximize React Aria's testing capabilities?
4. What's the minimal viable testing setup to catch real bugs and regressions?
5. How do we test accessibility effectively without overcomplicating the setup?
</evaluation_criteria>

<constraints>
- Thoroughly explore multiple sources and testing approaches
- Consider practical implementation - balance thoroughness with maintainability
- Explain the reasoning behind recommendations, not just conclusions
- Avoid over-engineering; recommend the simplest approach that solves real problems
- Focus on component library context, not full application testing
- Research should be current (2025 tools and best practices)
</constraints>

<verification>
Before completing, verify:
- All 7 research areas are covered with sufficient depth
- Comparison table includes at least 4-5 testing methods
- Each method has clear pros, cons, and use cases documented
- Playwright evaluation includes specific scenarios (or clear recommendation not to use)
- React Aria capabilities are thoroughly explored
- Recommended testing stack is justified with reasoning
- Example test cases demonstrate real differences between approaches
- The research answers all 5 key questions listed in evaluation_criteria
</verification>
