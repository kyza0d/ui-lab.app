<objective>
Implement "Coming Soon" overlay pages for the Agents & MCPs and CLI documentation sections. Create a reusable ComingSoonOverlay component with a gradient backdrop and waitlist input that sits above the documentation layout but below the header, allowing header interaction while blocking access to documentation content.
</objective>

<context>
This is a UI Lab monorepo project (Next.js 16, TypeScript, React). The task involves creating an overlay component that will be applied to two documentation domains:
- `/agents-mcps/` (Agents & MCPs documentation)
- `/cli/` (CLI documentation)

The overlay should be a static element that overlays the documentation sidebar and content but does not interfere with header navigation. Users will see a "Coming Soon" message with a waitlist signup form.

@apps/site/src/app/agents-mcps/
@apps/site/src/app/cli/
@apps/site/src/app/docs/layout.tsx
@apps/site/src/components/
@apps/site/src/app/globals.css
@apps/site/src/constants/themes.ts
</context>

<requirements>
1. Create a reusable ComingSoonOverlay component that:
   - Displays a linear gradient backdrop from transparent (top) to bg-background-950 (bottom)
   - Centers a waitlist input form in the middle of the screen
   - Allows header interaction (not covered by overlay)
   - Sits above documentation sidebar and content using appropriate z-index
   - Includes proper responsive behavior for mobile/tablet/desktop

2. Waitlist input functionality:
   - Email input field with validation
   - Submit button
   - Show success message after submission (no backend integration required)
   - Include form labels and error states if email is invalid

3. Visual/UX requirements:
   - Use existing theme colors (bg-background-950, gradient from transparent)
   - Professional "Coming Soon" messaging
   - Smooth animations/transitions
   - Ensure accessibility (ARIA labels, keyboard navigation, proper contrast)

4. Integration:
   - Apply overlay to both `/agents-mcps/` and `/cli/` pages
   - Verify header remains interactive and visible
   - Ensure sidebar and content are visible but non-interactive beneath overlay
   - Test z-index layering to ensure proper stacking

5. Code quality:
   - Follow existing project conventions from CLAUDE.md
   - Use TypeScript with proper typing
   - Apply existing component patterns from the codebase
   - Ensure no TypeScript errors or warnings
</requirements>

<implementation>
1. Create the ComingSoonOverlay component as a reusable, self-contained component
2. Add styling using existing CSS/Tailwind patterns from the project
3. Implement email validation and success state management
4. Create or modify layout pages for agents-mcps and cli to include the overlay
5. Test z-index layering to ensure header remains interactive
6. Verify responsive behavior across screen sizes

Key constraints:
- The overlay must NOT cover the header (use z-index appropriately)
- The backdrop gradient should be visual but not harsh
- The component should be reusable for other "Coming Soon" pages in the future
- Email submissions should show confirmation without actual API calls
</implementation>

<output>
Create/modify the following files:

1. `./apps/site/src/components/ComingSoonOverlay.tsx` - Main overlay component with gradient backdrop and waitlist form
2. `./apps/site/src/app/agents-mcps/page.tsx` - Apply overlay to Agents & MCPs page
3. `./apps/site/src/app/cli/page.tsx` - Apply overlay to CLI page

Each file should include:
- Proper TypeScript typing
- Accessibility attributes
- Responsive design
- Error handling for invalid emails
- Success message state management
</output>

<verification>
Before declaring complete, verify:

1. Visual verification:
   - Overlay displays with correct gradient (transparent to bg-background-950)
   - Waitlist input is centered and visible
   - Header remains fully interactive and visible above overlay
   - Sidebar and content are visible but covered by semi-transparent overlay

2. Functional verification:
   - Email input accepts valid email addresses
   - Invalid emails show error message
   - Form submission shows success message
   - Success message persists or dismisses appropriately

3. Responsive verification:
   - Component looks good on mobile (< 640px)
   - Component looks good on tablet (640px - 1024px)
   - Component looks good on desktop (> 1024px)

4. Code quality verification:
   - No TypeScript errors
   - Component follows existing project patterns
   - Proper z-index layering (header > overlay > content)
   - Accessibility features working (keyboard navigation, screen readers)
</verification>

<success_criteria>
- ComingSoonOverlay component created and reusable
- Overlay applied successfully to both `/agents-mcps/` and `/cli/` pages
- Linear gradient backdrop renders correctly (transparent → bg-background-950)
- Header remains interactive and visible above overlay
- Waitlist input is centered and functional
- Email validation works with success message display
- No TypeScript compilation errors
- Responsive design works across all screen sizes
- Code follows project conventions and existing component patterns
</success_criteria>
