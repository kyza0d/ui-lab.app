<objective>
Enhance the Button component's micro interactions with a custom easing system that provides a tactile, polished feel. Create a reusable easing system that can be applied across the entire component library, with visual previews in the component configurator that allow users to test and select different eases in real-time.

This work enables a consistent, premium feel across all components while giving users visibility into how different easing curves affect user perception of interactivity.
</objective>

<context>
This is a React component library (@packages/components) with a site documentation interface (@apps/site). The Button component currently has basic interactions but lacks sophisticated micro motion. The component configurator is the user-facing interface where designers and developers can test and compare different interaction easings.

Key files to examine:
- @packages/components/src/components/Button/Button.tsx (current button implementation)
- @packages/components/src/styles.css (where core easing definitions will live)
- @apps/site/src/components/component-configurator.tsx (where users select and preview eases)

Project uses pnpm workspaces, React, and CSS modules.
</context>

<requirements>
1. **Define Core Easing System** in @packages/components/src/styles.css:
   - Create 3 custom cubic-bezier easing functions suitable for micro interactions
   - Include a small bounce effect to add tactile feedback
   - Each ease should have a descriptive name that conveys its feeling (e.g., "smooth-settle", "snappy-pop", "gentle-ease")
   - Document each ease with comments explaining when/why to use it

2. **Generate Minipictogram Easing Previews**:
   - Create SVG-based static arch visualizations (not animated) that show the easing curve trajectory
   - Each minipictogram should be a visual representation of the easing curve (bezier arch displayed as a path)
   - Minipictograms should be small, icon-sized (approximately 24x24px or 32x32px)
   - Store these as reusable components or assets for use in the configurator dropdown

3. **Update Button Component** (@packages/components/src/components/Button/Button.tsx):
   - Integrate the easing system into button hover and click interactions
   - Apply the easing to properties like scale, opacity, or shadow transitions (choose properties that feel natural)
   - Ensure the motion feels responsive and tactile
   - Maintain existing Button API and props - easing should be internal implementation
   - Use CSS transitions with the custom easing functions

4. **Update Component Configurator** (@apps/site/src/components/component-configurator.tsx):
   - Add a dropdown/select control that displays all available eases
   - Show the minipictogram (easing curve preview) next to or within each ease option in the dropdown
   - When a user selects a different ease, the Button preview should update in real-time using that easing
   - Label the dropdown clearly (e.g., "Micro Interaction Ease")
   - Make it clear which ease is currently selected

5. **Ensure Consistency**:
   - The easing system should be documented and structured so that other components can easily adopt these eases in the future
   - Export the easing definitions in a way that makes them available across the component library
   - Consider creating a utility or constant file if helpful for organization

</requirements>

<implementation>
- Use CSS custom properties (CSS variables) for the easing functions so they can be easily referenced in components and tested
- For the minipictograms, create SVG arches that visually represent the bezier curve of each ease. The shape should intuitively communicate the motion feel (steep curves for snappy, gentle curves for smooth)
- Keep the Button's existing structure intact - easing changes should be purely visual/motion-based
- Use React state in the configurator to manage the currently selected ease, pass it to the Button preview
- Test that easing applies smoothly across different interaction states (hover, active, focus)
- Avoid over-engineering: the easing system should be straightforward to understand and maintain
- Follow the project's existing conventions (module imports, naming patterns, component structure)

Why these constraints matter:
- CSS variables make eases reusable and easily swappable across the library (future-proofing)
- Static SVG minipictograms load quickly and clearly show the easing behavior without animation overhead
- Keeping Button API unchanged prevents breaking existing usage
- Real-time preview in configurator lets designers validate feel before shipping
</implementation>

<output>
Create or modify the following files:

1. `./packages/components/src/styles.css` - Add the core easing system:
   - Define 3 custom cubic-bezier easing functions as CSS variables
   - Include descriptive comments for each ease
   - Example structure: `--ease-snappy: cubic-bezier(0.34, 1.56, 0.64, 1);` etc.

2. `./packages/components/src/utils/easing-utils.ts` or similar - Export easing definitions:
   - Export the easing names and bezier values as constants/objects
   - This allows other components and the site to reference them programmatically
   - Example: `export const EASING_FUNCTIONS = { snappy: '...' }` etc.

3. `./packages/components/src/components/EasingPreview.tsx` (or similar) - Create minipictogram component:
   - Accept an easing function name or bezier value as a prop
   - Render a static SVG arch that visually represents the easing curve
   - Size it appropriately for use in dropdowns (e.g., 24x32px or 32x40px)
   - Export as a reusable component

4. `./packages/components/src/components/Button/Button.tsx` - Update to use easing:
   - Add CSS transitions using the custom easing functions to button interactions
   - Apply easing to hover state, active state, and focus state
   - Keep the component API unchanged
   - Example: use transition properties like `transition: transform 0.2s var(--ease-snappy), ...`

5. `./apps/site/src/components/component-configurator.tsx` - Add easing selector:
   - Add a dropdown/select input that lists all available eases
   - Display the EasingPreview minipictogram next to each ease option
   - Use state to track the selected ease
   - Pass the selected ease to the Button preview component
   - Update the Button's styling dynamically based on the selected ease (inject CSS variable or apply className)
   - Label the control clearly and show the currently selected ease

</output>

<verification>
Before declaring complete, verify:
1. The three custom easing functions are defined in styles.css and accessible as CSS variables
2. Each easing is documented with clear comments explaining its use case
3. The Button component visibly transitions with the selected easing when hovering/clicking
4. The EasingPreview component renders clean SVG arches that accurately represent each easing curve
5. The configurator dropdown shows all eases with their minipictogram previews
6. Selecting a different ease in the dropdown updates the Button preview in real-time
7. All files follow the project's existing code style and structure
8. No TypeScript or ESLint errors when running `pnpm type-check` and `pnpm lint`
9. The component library still builds successfully: `pnpm run build:packages`
</verification>

<success_criteria>
- All 3 custom easing functions are defined and usable across the component library
- Button component demonstrates smooth, tactile micro interactions using the custom eases
- EasingPreview minipictogram component accurately visualizes each easing curve
- Component configurator allows users to select and preview different eases in real-time
- Button preview updates visually when a different ease is selected
- No breaking changes to the Button component's public API
- Code is maintainable, documented, and ready for other components to adopt the easing system
</success_criteria>
