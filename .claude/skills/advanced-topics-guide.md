# Advanced Topics & Integration Guide Generator

## Purpose
Generate documentation for advanced topics and integration scenarios that help developers use UI Lab in complex scenarios, optimize performance, troubleshoot issues, and extend the library's capabilities.

## Responsibilities
- Create troubleshooting and FAQ guides
- Document advanced customization scenarios
- Explain performance optimization strategies
- Create integration guides for specific frameworks
- Document advanced styling techniques
- Explain theme customization and generation
- Create debugging guides
- Document accessibility advanced topics

## Output Requirements
- **Problem-Solution Format**: Structure around real-world problems
- **Step-by-Step Solutions**: Provide clear resolution paths
- **Code Examples**: Include working code for solutions
- **Reference Links**: Cross-reference documentation sections
- **Testing Verification**: Include ways to verify solutions work
- **Performance Impact**: Note performance implications where relevant

## Key Topics to Cover

1. **Troubleshooting Guide**
   - Missing styles (CSS not imported)
   - Type errors with components
   - Component not rendering
   - Styling conflicts
   - State management issues
   - Accessibility testing failures
   - Build and bundling issues
   - Hot reload problems
   - TypeScript strict mode issues

2. **Frequently Asked Questions**
   - How to customize component colors?
   - How to change component sizes globally?
   - Can I use with different CSS frameworks?
   - How to tree-shake unused components?
   - How to use with SSR/SSG?
   - How to override component behavior?
   - How to extend components?
   - How to support multiple themes?

3. **Advanced Styling Techniques**
   - Creating custom component variants
   - Dynamic theme switching at runtime
   - CSS variable composition and layering
   - Advanced color customization
   - Creating design system extensions
   - Integrating with CSS-in-JS libraries
   - Animation and transition customization
   - Responsive design patterns

4. **Theme Customization & Generation**
   - Theme preset structure
   - Creating custom theme presets
   - CSS variable naming conventions
   - Color scale generation
   - Theme switching implementations
   - Storing theme preferences
   - Auto theme detection (light/dark)
   - Brand customization workflows

5. **Framework Integration Guides**
   - **Next.js Integration**
     - App router vs pages router
     - Server vs client components
     - Image optimization with icons
     - Static generation with components
     - CSS Module handling in Next.js

   - **Vite Integration**
     - HMR configuration
     - Build optimization
     - Environment variable handling
     - Plugin conflicts and solutions

   - **Other Framework Integration** (Remix, SvelteKit, etc.)
     - Compatibility notes
     - Build configuration
     - Styling concerns

6. **Component Extension Patterns**
   - Creating wrapper components
   - Extending component props
   - Composing multiple components
   - Creating component templates
   - HOC patterns with UI Lab components
   - Custom hook patterns

7. **Performance Optimization**
   - Bundle size reduction
   - Code splitting strategies
   - Component lazy loading
   - CSS optimization
   - Image optimization (icons)
   - Animation performance (GSAP tips)
   - Memory leak prevention
   - Render performance optimization

8. **Accessibility Advanced Topics**
   - Custom ARIA implementations
   - Screen reader testing strategies
   - Keyboard navigation testing
   - High contrast mode support
   - Internationalization considerations
   - Semantic HTML depth
   - Focus management in modals
   - Accessible form patterns

9. **Form Handling Advanced Patterns**
   - Multi-step forms with validation
   - Async validation patterns
   - File upload handling
   - Dynamic field arrays
   - Complex nested forms
   - Form state persistence
   - Integration with form libraries (React Hook Form, Formik)

10. **State Management Integration**
    - Using with Context API
    - Using with Redux
    - Using with Zustand
    - Using with Jotai/Recoil
    - State synchronization patterns
    - Global component state

11. **Testing Strategies**
    - Unit testing components
    - Integration testing
    - Accessibility testing tools
    - E2E testing with components
    - Snapshot testing considerations
    - Mock component patterns
    - Testing state changes
    - Testing event handlers

12. **Server-Side Rendering (SSR)**
    - SSR compatibility
    - Hydration issues
    - Event handler registration
    - CSS-in-JS with SSR
    - Data fetching patterns
    - Style sheet injection

13. **Debugging Techniques**
    - React DevTools with components
    - TypeScript debugging
    - CSS debugging tools
    - Network debugging
    - Performance profiling
    - Component inspection
    - State inspection
    - Event handler debugging

14. **Build Optimization**
    - Tree-shaking unused components
    - Bundle analysis
    - Minification settings
    - Asset optimization
    - Output format selection (ESM vs UMD)
    - Source map generation
    - Polyfill requirements

15. **Migration & Upgrade**
    - Upgrading UI Lab versions
    - Handling breaking changes
    - Component API updates
    - Dependency updates
    - Deprecation handling
    - Feature flag patterns

16. **Type Safety & TypeScript**
    - Strict mode compatibility
    - Generic component typing
    - Discriminated union types
    - Type inference
    - Type guard patterns
    - Extending component types
    - Type definitions for custom components

17. **Internationalization (i18n)**
    - Text localization in components
    - RTL (Right-to-Left) support
    - Date/time formatting
    - Number formatting
    - Accessible translations
    - Dynamic language switching

18. **Analytics & Monitoring**
    - Component usage tracking
    - Error tracking
    - Performance monitoring
    - User interaction tracking
    - A/B testing with components
    - Custom event tracking

19. **Advanced Animation Patterns**
    - GSAP integration patterns
    - Compound animations
    - Page transition animations
    - Interaction-based animations
    - Performance-conscious animations
    - Accessibility in animations

20. **Production Deployment**
    - Production build optimization
    - CDN deployment
    - Edge function compatibility
    - Browser support verification
    - Polyfill strategy
    - Cache invalidation
    - A/B testing deployment

## Common Troubleshooting Issues

### Issue: Components not styled (unstyled appearance)
**Solution:**
1. Import styles in app root: `import 'ui-lab-components/styles.css'`
2. Verify CSS is loaded (check DevTools)
3. Check Tailwind is configured
4. Verify PostCSS pipeline working

### Issue: Type errors in TypeScript
**Solution:**
1. Check TypeScript version (5.0+)
2. Verify UI Lab types installed
3. Check for `noImplicitAny` setting
4. Verify component imports correct

### Issue: Styling conflicts with other frameworks
**Solution:**
1. Check CSS specificity
2. Use CSS Modules for isolation
3. Override with CSS variables
4. Scope CSS if needed
5. Check PostCSS plugin order

### Issue: Performance issues with many components
**Solution:**
1. Code-split components with dynamic import
2. Tree-shake unused components
3. Analyze bundle size
4. Optimize component re-renders
5. Check for memory leaks

### Issue: Dark mode not working
**Solution:**
1. Set theme CSS variables
2. Use theme preset
3. Check CSS variable names
4. Verify media query preferences
5. Test variable inheritance

## Quality Checklist
- ✅ Cover common real-world scenarios
- ✅ Provide step-by-step solutions
- ✅ Include code examples for each solution
- ✅ Test solutions work with actual code
- ✅ Reference related documentation
- ✅ Explain why issues occur
- ✅ Provide verification steps
- ✅ Include performance considerations
- ✅ Cover both common and edge cases
- ✅ Add links to relevant tools and resources
