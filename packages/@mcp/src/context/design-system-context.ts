/**
 * Design System Context
 * Complete design system guidelines for agent instruction embedding
 */

export function getDesignSystemContext(): string {
  return `# UI Lab Design System Guidelines

## Design System: OKLCH Color System

UI Lab uses OKLCH, a perceptually-uniform color space for all colors.
This ensures consistent, accessible colors across all themes and components.

## Color Philosophy

OKLCH is a perceptually-uniform color space designed for human perception. Unlike RGB or HSL:
- Equal steps in lightness produce equal perceived brightness changes
- Colors maintain their character across the entire lightness scale
- All combinations are designed for WCAG AA compliance
- Dynamic theme generation maintains visual balance automatically

### Why Use Semantic Colors?

Always use semantic color families instead of arbitrary Tailwind colors:
- **Semantic colors** convey meaning and intent (success, danger, warning, info)
- **Arbitrary colors** (blue, red, zinc) don't communicate purpose to users or code readers
- **Consistency** ensures all components follow the same design language
- **Accessibility** is built in - all semantic colors meet WCAG AA minimum contrast

## Color Families (Semantic Meaning)

### background - Grayscale (Neutral)
All surface and container backgrounds
- Light shades (50-300): Page backgrounds, cards, containers
- Medium shades (400-500): Secondary containers, disabled states
- Dark shades (600-950): Elevated surfaces, dark mode backgrounds

Usage: Page backgrounds, cards, containers, elevated surfaces
CSS Variables: --background-50 through --background-950

### foreground - Grayscale (Neutral)
Text, icons, borders, and foreground elements
- Light shades (50-300): Disabled or subtle text, placeholders
- Medium shades (400-600): Secondary text, icons, borders
- Dark shades (700-950): Primary text, body copy, headings

Usage: Body text, labels, icons, borders, dividers
CSS Variables: --foreground-50 through --foreground-950
Accessibility: All shades meet WCAG AAA contrast standards

### accent - Interactive Color (Brand)
Primary interactive elements that define the theme
- Light shades (50-300): Subtle accents, link underlines, highlights
- Medium shades (400-600): Buttons, links, active states
- Dark shades (700-950): Prominent CTAs, dark mode accents

Usage: Primary action buttons, links, focus indicators, active states
CSS Variables: --accent-50 through --accent-950
Default Hue: 0° (theme-able, can be customized)

### success - Green (142° hue)
Positive actions and confirmations
- Light shades (50-300): Success message backgrounds, badges
- Medium shades (400-600): Success button hover states, active toggles
- Dark shades (700-950): Success CTA buttons, strong indicators

Usage: Success messages, confirmations, checkmarks, approved states
CSS Variables: --success-50 through --success-950
Semantic Meaning: Positive user feedback, successful completion
Contrast: Designed for WCAG AA compliance (4.5:1 minimum)

### danger - Red (25° hue)
Errors and destructive actions
- Light shades (50-300): Error message backgrounds, invalid input highlights
- Medium shades (400-600): Input borders on validation error, delete button hover
- Dark shades (700-950): Delete buttons, destructive action CTAs

Usage: Error messages, delete buttons, failed states, critical warnings
CSS Variables: --danger-50 through --danger-950
Semantic Meaning: Alerts users to errors and potential data loss
Contrast: Designed for WCAG AA compliance (4.5:1 minimum)

### warning - Orange (65° hue)
Cautions and pending states
- Light shades (50-300): Warning message backgrounds, pending indicators
- Medium shades (400-600): Warning button hover, caution indicators
- Dark shades (700-950): Warning CTA buttons, strong warning states

Usage: Warning messages, pending operations, important notices
CSS Variables: --warning-50 through --warning-950
Semantic Meaning: Alerts users to cautions and attention-needed states
Contrast: Designed for WCAG AA compliance

### info - Blue (255° hue)
Information and neutral states
- Light shades (50-300): Info message backgrounds, documentation backgrounds
- Medium shades (400-600): Info buttons, documentation links
- Dark shades (700-950): Info CTA buttons, dark mode info indicators

Usage: Info messages, documentation, neutral metadata, helpful tips
CSS Variables: --info-50 through --info-950
Semantic Meaning: Neutral information and non-critical guidance
Contrast: Designed for WCAG AA compliance (4.5:1 minimum)

## Shade Selection Rules

### For Light Backgrounds (Pages, Cards, Containers)
Use shades 50-300 from semantic color families
Examples: --background-50, --success-100, --danger-200

### For Medium Backgrounds (Secondary, Hover States)
Use shades 400-500 from semantic color families
Examples: --background-400, --success-500

### For Dark Backgrounds (Elevated, Dark Mode)
Use shades 600-950 from semantic color families
Examples: --background-700, --success-800

### For Text and Foreground
Use appropriate contrast-verified shades from foreground family
Dark text (primary): --foreground-800, --foreground-900, --foreground-950
Light text (on dark): --foreground-50, --foreground-100

## Accessibility Requirements

### Contrast Minimum
- **WCAG AA Standard**: 4.5:1 for normal text, 3:1 for large text
- **All semantic colors**: Pre-verified to meet WCAG AA minimum
- **Test before deployment**: Use WebAIM or APCA contrast checker

### Best Practices
1. **Always pair colors**: Never rely on color alone; use text labels + icons
2. **Test combinations**: Verify text/background pairs meet contrast requirements
3. **Consider colorblind users**: Pair semantic colors with supporting icons/text
4. **Use sufficient spacing**: Help distinguish similarly-colored elements through spacing

## CSS Variable Usage

All colors are available as CSS variables in the format: \`--{family}-{shade}\`

### Examples of Correct Usage
\`--background-50\`, \`--background-900\`
\`--foreground-300\`, \`--foreground-800\`
\`--accent-600\`, \`--accent-700\`
\`--success-100\`, \`--success-600\`
\`--danger-600\`, \`--danger-700\`
\`--warning-400\`, \`--warning-600\`
\`--info-500\`, \`--info-600\`

### CSS Usage
\`\`\`css
.button {
  background-color: var(--accent-600);
  color: var(--foreground-50);
  border-color: var(--accent-700);
}

.button:hover {
  background-color: var(--accent-700);
}

.success-alert {
  background-color: var(--success-50);
  color: var(--success-900);
  border: 1px solid var(--success-300);
}
\`\`\`

### React/TSX Usage
\`\`\`tsx
<button className="bg-[var(--accent-600)] text-[var(--foreground-50)]">
  Click Me
</button>

<div className="bg-[var(--success-50)] border border-[var(--success-300)] p-4">
  Success!
</div>
\`\`\`

## DO NOT use arbitrary Tailwind colors

❌ INCORRECT: \`bg-blue-600\`, \`bg-red-500\`, \`bg-zinc-800\`, \`text-gray-400\`
✓ CORRECT: \`bg-[var(--accent-600)]\`, \`bg-[var(--danger-600)]\`, \`text-[var(--foreground-800)]\`

All UI Lab components must use semantic color families, not default Tailwind colors.

## Example Patterns

### Success Alert Pattern
- Background: --success-50 or --success-100 (light)
- Text: --success-900 or --success-950 (dark for contrast)
- Border: --success-300 or --success-400

### Error/Danger Button Pattern
- Background: --danger-600 or --danger-700
- Text: --foreground-50 (white/light)
- Hover: --danger-700 or --danger-800
- Border: Optional --danger-700

### Primary CTA Button Pattern
- Background: --accent-600
- Text: --foreground-50
- Hover: --accent-700
- Focus: 2px solid --accent-600

### Info Badge Pattern
- Background: --info-200 or --info-300
- Text: --info-900 or --info-950
- Border: Optional --info-400

## Using Design System Tools

When uncertain about color choices, use these MCP tools:

### get_color_guidance
Get detailed guidance on selecting colors for a specific context
- Input: context (button, alert, badge, input, link, text, border, background) + semantic_intent (primary, success, danger, warning, info, neutral)
- Returns: Recommended color family, shade ranges, examples, accessibility info
- Use when: You're unsure which color family to use for a component

### validate_color_usage
Validate that a color choice is semantically appropriate and accessible
- Input: color_family, shade number, usage_context, optional paired colors
- Returns: Validation result with issues, accessibility info, semantic assessment
- Use when: You want to verify a color choice before implementing

## Integration Guidelines

When generating or modifying component code:
1. Always use semantic color families, not arbitrary Tailwind colors
2. Reference colors as CSS variables: --{family}-{shade}
3. Verify contrast ratios meet WCAG AA minimum (4.5:1)
4. Pair colors semantically (e.g., danger for errors, success for confirmations)
5. Use the get_color_guidance tool when uncertain about color choices
6. Use the validate_color_usage tool before finalizing color implementations

## Summary

The UI Lab design system ensures:
- ✓ Semantic color usage that communicates intent
- ✓ Accessibility compliance built into every color pairing
- ✓ Consistency across all components and themes
- ✓ Perceptual uniformity through OKLCH color space
- ✓ Clear guidance for color selection and validation
`;
}
