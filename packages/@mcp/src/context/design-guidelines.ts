/**
 * Design Guidelines - Concise & Enforceable
 * These guidelines are injected into every MCP tool response to ensure
 * agents ALWAYS use UI Lab design tokens and never fall back to other color systems
 */

export const DESIGN_GUIDELINES = {
  colorFamilies: {
    accent: "Primary actions, CTAs, brand elements",
    success: "Success states, confirmations, approved",
    danger: "Errors, destructive actions, delete",
    warning: "Warnings, cautions, pending states",
    info: "Information, help, neutral messages",
    background: "Page/card backgrounds (grayscale)",
    foreground: "Text, borders, labels (grayscale)",
  },

  shadeRanges: {
    "bg-background": "600-950 (600=lightest, 950=darkest)",
    "text/border-foreground": "50-600 (50=lightest, 600=darkest)",
    "accent": "50-600 (for any use, 50=lightest, 600=darkest)",
    "success/danger/warning/info": "50-950 (full range available)",
  },

  rules: [
    "NEVER use Tailwind arbitrary colors: bg-white, bg-zinc-*, bg-red-*, bg-slate-*, bg-gray-*, etc.",
    "NEVER use hex colors directly: #fff, #000, #4F46E5, etc.",
    "NEVER use gradient classes: gradient, from-*, to-*, via-*",
    "NEVER use shadow classes: shadow, shadow-sm, shadow-md, shadow-lg, shadow-xl, drop-shadow, etc.",
    "ONLY use UI Lab design token classes: bg-family-shade, text-family-shade, border-family-shade",
    "Format: family-shade where family=[accent|success|danger|warning|info|background|foreground] and shade=[50|100|200|300|400|500|600|700|800|900|950]",
  ],

  commonMistakes: [
    "❌ bg-white (use bg-background-50)",
    "❌ text-gray-900 (use text-foreground-950)",
    "❌ bg-zinc-100 (use bg-foreground-100)",
    "❌ shadow-md (use nothing - no shadows allowed)",
    "❌ gradient (use nothing - no gradients allowed)",
    "❌ border-red-500 (use border-danger-500)",
  ],

  examples: {
    button: `<button className="bg-accent-600 text-foreground-50 hover:bg-accent-700">Action</button>`,
    alert: `<div className="bg-success-100 border border-success-300 text-success-900">Success</div>`,
    input: `<input className="bg-foreground-50 border border-foreground-300 text-foreground-950" />`,
    card: `<div className="bg-background-50 border border-foreground-200">Content</div>`,
  },

  enforcement:
    "If an agent generates code using arbitrary colors, gradients, or shadows, it MUST be corrected before returning. These are violations of the design system.",
} as const;

export function formatDesignGuidelines(): string {
  return `
## UI LAB DESIGN SYSTEM - MANDATORY GUIDELINES

### Color Families (Use These ONLY)
- accent: ${DESIGN_GUIDELINES.colorFamilies.accent}
- success: ${DESIGN_GUIDELINES.colorFamilies.success}
- danger: ${DESIGN_GUIDELINES.colorFamilies.danger}
- warning: ${DESIGN_GUIDELINES.colorFamilies.warning}
- info: ${DESIGN_GUIDELINES.colorFamilies.info}
- background: ${DESIGN_GUIDELINES.colorFamilies.background}
- foreground: ${DESIGN_GUIDELINES.colorFamilies.foreground}

### Shade Ranges (Strictly Enforced)
- bg-background: ${DESIGN_GUIDELINES.shadeRanges["bg-background"]}
- text/border-foreground: ${DESIGN_GUIDELINES.shadeRanges["text/border-foreground"]}
- accent colors: ${DESIGN_GUIDELINES.shadeRanges["accent"]}

### ABSOLUTE RULES (Non-Negotiable)
${DESIGN_GUIDELINES.rules.map((rule) => `- ${rule}`).join("\n")}

### Common Mistakes to Avoid
${DESIGN_GUIDELINES.commonMistakes.map((mistake) => `${mistake}`).join("\n")}

### Correct Examples
- Button: ${DESIGN_GUIDELINES.examples.button}
- Alert: ${DESIGN_GUIDELINES.examples.alert}
- Input: ${DESIGN_GUIDELINES.examples.input}
- Card: ${DESIGN_GUIDELINES.examples.card}

### Color + Shade Combinations
Background colors: bg-background-50, bg-background-100, ..., bg-background-950
Text colors: text-accent-50, text-accent-100, ..., text-accent-950 (or any family)
Border colors: border-danger-600, border-success-300, etc.
Hover states: hover:bg-accent-700, hover:text-foreground-900, etc.
`;
}
