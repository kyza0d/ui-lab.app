# Best Practices & Component Development Guide Generator

## Purpose
Generate comprehensive best practices and component development guidelines for the UI Lab project. This skill creates documentation that teaches developers how to effectively use, extend, and develop components following UI Lab's patterns and conventions.

## Responsibilities
- Document component usage best practices
- Explain accessibility patterns and requirements
- Create typing and TypeScript guidelines
- Document state management patterns
- Explain component composition patterns
- Create performance optimization guidelines
- Document testing strategies for components
- Explain responsive design patterns in UI Lab

## Output Requirements
- **Pattern-Based Guidance**: Focus on patterns developers should follow
- **Do's and Don'ts**: Provide clear examples of correct and incorrect usage
- **Real Code Examples**: Use actual patterns from UI Lab components
- **Accessibility First**: Emphasize accessibility requirements throughout
- **Performance Aware**: Include performance considerations
- **Developer Focused**: Written for component users and contributors

## Key Topics to Cover

1. **Component Usage Best Practices**
   - Importing components correctly
   - Importing styles (styles.css must be imported once)
   - Using TypeScript with components
   - Proper prop usage for variants and sizes
   - Event handler patterns
   - Controlled vs uncontrolled components

2. **Accessibility Requirements**
   - React Aria foundation (all components built with it)
   - Keyboard navigation support
   - Screen reader compatibility
   - WCAG AA compliance level
   - Focus management patterns
   - Semantic HTML usage
   - ARIA attributes understanding
   - Testing accessibility (manual and automated)

3. **Styling Components Best Practices**
   - Using CSS variable system for consistency
   - When to use CSS Modules for custom styling
   - Overriding component styles safely
   - Dark/light mode support
   - Custom theme implementation
   - Responsive design with Tailwind utilities
   - Animation best practices with GSAP

4. **Type Safety**
   - Component prop types
   - Discriminated unions for variants
   - Generic component typing
   - Type exports for custom implementations
   - TypeScript strict mode benefits

5. **Component Composition Patterns**
   - Compound component pattern explanation
   - Slot-based composition
   - Context-based component families
   - Form composition patterns
   - Modal/Dialog composition

6. **State Management Patterns**
   - Using React hooks (useState, useCallback, etc.)
   - React Aria hooks integration
   - State lifting patterns
   - Avoiding common state issues
   - Uncontrolled component patterns

7. **Performance Optimization**
   - Memoization strategies (React.memo, useMemo)
   - Event handler optimization
   - List rendering with keys
   - Lazy loading components
   - Image optimization in components
   - Tree shaking for bundle size
   - Code splitting strategies

8. **Form Handling Best Practices**
   - Form component patterns
   - Input validation strategies
   - Error display patterns
   - Accessible form layouts
   - Multi-step form patterns
   - Form state management

9. **Testing Best Practices**
   - Unit testing components
   - Accessibility testing requirements
   - Snapshot testing considerations
   - Event interaction testing
   - Keyboard navigation testing
   - Screen reader testing

10. **Development Workflows**
    - Setting up component development environment
    - Hot module replacement during development
    - Using documentation site for testing
    - Debugging with React DevTools
    - TypeScript compilation checking
    - Linting and formatting

11. **Common Pitfalls to Avoid**
    - Not importing styles.css in application
    - Misusing variant and size props
    - Forgetting accessibility requirements
    - Improper event handling
    - Memory leaks in effects
    - Missing TypeScript types
    - Improper CSS overrides

12. **Responsive Design Patterns**
    - Using CSS variables for responsive sizing
    - Responsive spacing with --spacing-scale
    - Mobile-first design approach
    - Testing responsive behavior
    - Breakpoint considerations
    - Flexible layout patterns

13. **Icon Usage Best Practices**
    - Lucide React integration
    - Icon sizing and alignment
    - Semantic icon usage
    - Accessible icon patterns
    - Icon colors with CSS variables

14. **Documentation and Code Comments**
    - When to document props
    - Comment patterns for complex logic
    - JSDoc conventions
    - Prop description formats
    - Example comments in code

## Do's and Don'ts Examples

### Do's ✅
- Import styles.css once in application root
- Use CSS variables for theming
- Leverage React Aria accessibility features
- Type props with discriminated unions
- Test accessibility manually
- Use semantic HTML
- Handle focus management properly

### Don'ts ❌
- Don't manually add ARIA if React Aria provides it
- Don't override component styles with !important
- Don't ignore keyboard navigation
- Don't create custom select/checkbox (use provided)
- Don't hardcode colors (use CSS variables)
- Don't forget data-* attributes for custom styling

## Quality Checklist
- ✅ Base best practices on actual UI Lab patterns
- ✅ Include real code examples from projects
- ✅ Reference React Aria documentation concepts
- ✅ Include accessibility testing strategies
- ✅ Show performance implications where relevant
- ✅ Provide clear do/don't examples
- ✅ Include common error scenarios
- ✅ Link to related documentation sections
- ✅ Address security considerations (XSS, etc.)
