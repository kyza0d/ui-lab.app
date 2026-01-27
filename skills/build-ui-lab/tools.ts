/**
 * UI Lab Design Skill Tools
 *
 * Tools query design/ folder as source of truth:
 * - design/tokens.md - Color families, spacing, typography
 * - design/components.md - Component registry and APIs
 * - design/patterns.md - UI patterns with rationale
 * - design/guidelines.md - Philosophy and rules
 *
 * In production, data can also come from MCP resources.
 */

// ============================================================================
// TYPES
// ============================================================================

/** Valid color family names */
export type ColorFamilyName = 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'background' | 'foreground';

/** Valid shade values */
export type Shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** Color usage context */
export type ColorContext = 'text' | 'background' | 'border' | 'icon';

/** Semantic intent for color recommendations */
export type SemanticIntent = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'text' | 'background' | 'border';

export interface ColorFamily {
  name: string;
  availableShades: Shade[];
  wcagLevel: 'AA' | 'AAA';
  usageGuidance: string;
}

export interface ComponentMeta {
  id: string;
  acceptedProps: string[];
  requiredProps: string[];
  description?: string;
  category?: 'interactive' | 'form' | 'container' | 'status' | 'feedback' | 'navigation';
  useCases?: string[];
}

export interface ValidationResult {
  valid: boolean;
  issues: string[];
  warnings: string[];
  suggestions?: string[];
}

export interface ColorRecommendation {
  family: ColorFamilyName;
  shade: Shade;
  cssVar: string;
  rationale: string;
}

export interface Pattern {
  name: string;
  components: string[];
  description: string;
  rationale: string;
  code: string;
}

// ============================================================================
// DATA - Source of truth (would be loaded from design/ or MCP in production)
// ============================================================================

const VALID_FAMILIES: ColorFamilyName[] = ['accent', 'success', 'danger', 'warning', 'info', 'background', 'foreground'];
const VALID_SHADES: Shade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/** Component registry - mirrors design/components.md */
const COMPONENTS: ComponentMeta[] = [
  {
    id: 'button',
    acceptedProps: ['variant', 'disabled', 'size', 'className', 'onClick', 'children'],
    requiredProps: [],
    description: 'Interactive button with variants for different semantic intents',
    category: 'interactive',
    useCases: ['primary-action', 'secondary-action', 'destructive-action'],
  },
  {
    id: 'input',
    acceptedProps: ['type', 'placeholder', 'value', 'onChange', 'disabled', 'error', 'className'],
    requiredProps: [],
    description: 'Text input with type variants and validation support',
    category: 'form',
    useCases: ['text-entry', 'email', 'password', 'number'],
  },
  {
    id: 'card',
    acceptedProps: ['title', 'variant', 'className', 'children'],
    requiredProps: [],
    description: 'Container for grouping related content',
    category: 'container',
    useCases: ['content-grouping', 'elevated-surface', 'outlined-container'],
  },
  {
    id: 'badge',
    acceptedProps: ['variant', 'size', 'className', 'children'],
    requiredProps: [],
    description: 'Compact status label for inline indicators',
    category: 'status',
    useCases: ['status-label', 'category-tag', 'status-indicator'],
  },
  {
    id: 'alert',
    acceptedProps: ['variant', 'title', 'description', 'className', 'children'],
    requiredProps: [],
    description: 'Message container for feedback and notifications',
    category: 'feedback',
    useCases: ['success-message', 'error-message', 'warning-message', 'info-message'],
  },
  {
    id: 'dialog',
    acceptedProps: ['open', 'onOpenChange', 'title', 'className', 'children'],
    requiredProps: ['open', 'onOpenChange'],
    description: 'Modal overlay for focused interactions',
    category: 'container',
    useCases: ['confirmation', 'form-modal', 'detail-view'],
  },
  {
    id: 'tabs',
    acceptedProps: ['value', 'onValueChange', 'children'],
    requiredProps: ['value', 'onValueChange'],
    description: 'Tab interface for switching between content panels',
    category: 'navigation',
    useCases: ['settings-tabs', 'content-sections'],
  },
  {
    id: 'select',
    acceptedProps: ['options', 'value', 'onChange', 'placeholder', 'disabled'],
    requiredProps: ['options'],
    description: 'Dropdown for selecting one option from many',
    category: 'form',
    useCases: ['single-choice', 'dropdown-menu'],
  },
  {
    id: 'checkbox',
    acceptedProps: ['checked', 'onChange', 'label', 'disabled'],
    requiredProps: [],
    description: 'Boolean toggle or multiple selection',
    category: 'form',
    useCases: ['boolean-toggle', 'multiple-selection'],
  },
  {
    id: 'radio',
    acceptedProps: ['name', 'value', 'checked', 'onChange', 'label', 'disabled'],
    requiredProps: ['name', 'value'],
    description: 'Single selection from a small set of options',
    category: 'form',
    useCases: ['single-choice-few'],
  },
];

/** Design tokens - mirrors design/tokens.md */
const COLOR_FAMILIES: Record<ColorFamilyName, ColorFamily> = {
  accent: {
    name: 'accent',
    availableShades: VALID_SHADES,
    wcagLevel: 'AA',
    usageGuidance: 'Primary actions and brand color; 600 for buttons, 50-300 for subtle backgrounds',
  },
  success: {
    name: 'success',
    availableShades: VALID_SHADES,
    wcagLevel: 'AA',
    usageGuidance: 'Success states, confirmations; 50-100 for backgrounds, 600+ for text/icons',
  },
  danger: {
    name: 'danger',
    availableShades: VALID_SHADES,
    wcagLevel: 'AA',
    usageGuidance: 'Errors, destructive actions; 50-100 for backgrounds, 600-700 for buttons/text',
  },
  warning: {
    name: 'warning',
    availableShades: VALID_SHADES,
    wcagLevel: 'AA',
    usageGuidance: 'Warnings, cautions; 50-100 for backgrounds, 600+ for text/icons',
  },
  info: {
    name: 'info',
    availableShades: VALID_SHADES,
    wcagLevel: 'AA',
    usageGuidance: 'Information, help; 50-100 for backgrounds, 600+ for text/icons',
  },
  background: {
    name: 'background',
    availableShades: VALID_SHADES,
    wcagLevel: 'AA',
    usageGuidance: 'Surfaces, containers; 50-100 for light mode, 800-950 for dark mode',
  },
  foreground: {
    name: 'foreground',
    availableShades: VALID_SHADES,
    wcagLevel: 'AA',
    usageGuidance: 'Text, borders; 900-950 for primary text, 300-400 for borders, 50 for text on dark',
  },
};

/** Patterns - mirrors design/patterns.md */
const PATTERNS: Record<string, Pattern> = {
  'success-message': {
    name: 'success-message',
    components: ['alert'],
    description: 'Success feedback message',
    rationale: 'Alert with success variant provides clear, accessible positive feedback',
    code: `<Alert variant="success" title="Success" description="Operation completed successfully" />`,
  },
  'error-message': {
    name: 'error-message',
    components: ['alert'],
    description: 'Error feedback message',
    rationale: 'Alert with danger variant signals errors with semantic meaning',
    code: `<Alert variant="danger" title="Error" description="An error occurred. Please try again." />`,
  },
  'form-field': {
    name: 'form-field',
    components: ['input', 'label'],
    description: 'Form input with label and error support',
    rationale: 'Input with semantic labeling for accessibility and error states',
    code: `<div className="flex flex-col gap-2">
  <label className="text-[var(--foreground-900)]">Email</label>
  <Input type="email" placeholder="you@example.com" />
</div>`,
  },
  'primary-button': {
    name: 'primary-button',
    components: ['button'],
    description: 'Primary action button',
    rationale: 'Button variant="primary" for main CTAs using semantic accent color',
    code: `<Button variant="primary">Submit</Button>`,
  },
  'danger-button': {
    name: 'danger-button',
    components: ['button'],
    description: 'Destructive action button',
    rationale: 'Button variant="danger" signals destructive action using semantic danger color',
    code: `<Button variant="danger">Delete</Button>`,
  },
  'status-badge': {
    name: 'status-badge',
    components: ['badge'],
    description: 'Status indicator badge',
    rationale: 'Badge with semantic variant (success/danger/warning/info) for status labels',
    code: `<Badge variant="success">Active</Badge>`,
  },
  'card-with-title': {
    name: 'card-with-title',
    components: ['card'],
    description: 'Content card with title',
    rationale: 'Card with title prop for semantic content grouping',
    code: `<Card title="Settings"><div>Card content here</div></Card>`,
  },
  'confirmation-dialog': {
    name: 'confirmation-dialog',
    components: ['dialog', 'button', 'alert'],
    description: 'Delete confirmation modal',
    rationale: 'Dialog with danger alert and cancel/delete buttons for destructive confirmations',
    code: `<Dialog open={open} onOpenChange={setOpen}>
  <Alert variant="danger" title="Delete this item?" />
  <div className="flex gap-2 justify-end mt-4">
    <Button variant="secondary">Cancel</Button>
    <Button variant="danger">Delete</Button>
  </div>
</Dialog>`,
  },
};

/** Color intent mappings */
const COLOR_INTENTS: Record<SemanticIntent, ColorRecommendation> = {
  primary: { family: 'accent', shade: 600, cssVar: '--accent-600', rationale: 'Primary brand color for main CTAs' },
  success: { family: 'success', shade: 600, cssVar: '--success-600', rationale: 'Green for success states' },
  error: { family: 'danger', shade: 600, cssVar: '--danger-600', rationale: 'Red for errors and destructive actions' },
  warning: { family: 'warning', shade: 600, cssVar: '--warning-600', rationale: 'Orange for cautions' },
  info: { family: 'info', shade: 600, cssVar: '--info-600', rationale: 'Blue for informational content' },
  text: { family: 'foreground', shade: 950, cssVar: '--foreground-950', rationale: 'Darkest shade for primary text' },
  background: { family: 'background', shade: 50, cssVar: '--background-50', rationale: 'Lightest shade for page backgrounds' },
  border: { family: 'foreground', shade: 300, cssVar: '--foreground-300', rationale: 'Subtle shade for borders' },
};

// ============================================================================
// TOOL REGISTRY
// ============================================================================

export const toolRegistry = {
  phase1: {
    name: 'Core Infrastructure',
    description: 'Foundation tools for querying components and design tokens',
    tools: ['getAvailableComponents', 'getComponentProps', 'getDesignTokens', 'validateColorUsage', 'validateComponentCode'],
  },
  phase2: {
    name: 'MCP Integration',
    description: 'Tools for finding and recommending components',
    tools: ['searchComponents', 'suggestComponents', 'getComponentApi', 'getPatternComponents'],
  },
  phase3: {
    name: 'Design Validation',
    description: 'Tools for auditing code against design system',
    tools: ['checkArbitraryColors', 'getColorRecommendation', 'validateSemanticIntent', 'checkWcagContrast'],
  },
};

// ============================================================================
// PHASE 1: CORE INFRASTRUCTURE
// ============================================================================

/**
 * Query the component registry. Returns all available UI Lab components.
 */
export function getAvailableComponents(): {
  components: ComponentMeta[];
  total: number;
  categories: string[];
} {
  const categories = [...new Set(COMPONENTS.map((c) => c.category).filter(Boolean))] as string[];
  return {
    components: COMPONENTS,
    total: COMPONENTS.length,
    categories,
  };
}

/**
 * Get detailed prop information for a specific component.
 */
export function getComponentProps(componentName: string): {
  componentId: string;
  props: Record<string, unknown>;
  requiredProps: string[];
  optionalProps: string[];
  error?: string;
} {
  const component = COMPONENTS.find((c) => c.id.toLowerCase() === componentName.toLowerCase());

  if (!component) {
    return {
      componentId: componentName,
      props: {},
      requiredProps: [],
      optionalProps: [],
      error: `Component "${componentName}" not found. Available: ${COMPONENTS.map((c) => c.id).join(', ')}`,
    };
  }

  // Prop metadata based on component type
  const propMeta: Record<string, Record<string, unknown>> = {
    variant: { type: 'enum', values: ['primary', 'secondary', 'danger', 'ghost'], required: false },
    disabled: { type: 'boolean', required: false, default: false },
    size: { type: 'enum', values: ['sm', 'md', 'lg'], required: false, default: 'md' },
    className: { type: 'string', required: false, description: 'Additional classes (design tokens only)' },
    type: { type: 'enum', values: ['text', 'email', 'password', 'number', 'tel', 'url'], required: false, default: 'text' },
    error: { type: 'boolean', required: false, description: 'Shows error visual state' },
    open: { type: 'boolean', required: true, description: 'Controls open state' },
    onOpenChange: { type: 'function', required: true, description: 'Handler for state changes' },
  };

  const props: Record<string, unknown> = {};
  for (const prop of component.acceptedProps) {
    if (propMeta[prop]) {
      props[prop] = propMeta[prop];
    } else {
      props[prop] = { type: 'unknown' };
    }
  }

  return {
    componentId: component.id,
    props,
    requiredProps: component.requiredProps,
    optionalProps: component.acceptedProps.filter((p) => !component.requiredProps.includes(p)),
  };
}

/**
 * Load all design tokens from the system.
 */
export function getDesignTokens(): {
  colorFamilies: Record<string, ColorFamily>;
  spacingScale: number[];
  typographyScale: Record<string, unknown>;
  breakpoints: Record<string, number>;
} {
  return {
    colorFamilies: COLOR_FAMILIES,
    spacingScale: [0, 4, 8, 12, 16, 24, 32, 48, 64],
    typographyScale: {
      h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
      h2: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 },
      h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
      body: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
      caption: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    },
    breakpoints: { mobile: 480, tablet: 768, desktop: 1024, wide: 1280 },
  };
}

/**
 * Check if a color choice is valid and accessible.
 */
export function validateColorUsage(colorFamily: string, shade: number, context: string): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Validate family
  if (!VALID_FAMILIES.includes(colorFamily as ColorFamilyName)) {
    issues.push(`Invalid color family "${colorFamily}". Valid: ${VALID_FAMILIES.join(', ')}`);
    return { valid: false, issues, warnings, suggestions };
  }

  // Validate shade
  if (!VALID_SHADES.includes(shade as Shade)) {
    issues.push(`Invalid shade ${shade}. Valid: ${VALID_SHADES.join(', ')}`);
    return { valid: false, issues, warnings, suggestions };
  }

  const family = COLOR_FAMILIES[colorFamily as ColorFamilyName];

  // Context-specific validation
  if (context === 'text' && shade < 600 && colorFamily !== 'background') {
    warnings.push(`Light shade (${shade}) may have insufficient contrast for text. Use 700+ for better readability.`);
  }

  if (context === 'background' && shade > 700 && colorFamily !== 'foreground') {
    warnings.push(`Dark shade (${shade}) is unusual for backgrounds in light mode. Consider lighter shades.`);
  }

  suggestions.push(`${family.name}-${shade} meets WCAG ${family.wcagLevel} standards when used appropriately.`);

  return { valid: issues.length === 0, issues, warnings, suggestions };
}

/**
 * Validate generated code against design system rules.
 */
export function validateComponentCode(code: string): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check for arbitrary Tailwind colors
  const arbitraryColorPattern = /(bg|text|border)-(blue|red|green|yellow|purple|pink|gray|zinc|slate|stone|neutral|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-\d+/g;
  const arbitraryMatches = code.match(arbitraryColorPattern);
  if (arbitraryMatches) {
    issues.push(`Found arbitrary Tailwind colors: ${[...new Set(arbitraryMatches)].join(', ')}. Use semantic tokens (e.g., bg-[var(--accent-600)])`);
  }

  // Check for hex colors
  const hexColorPattern = /#[0-9a-fA-F]{3,8}/g;
  const hexMatches = code.match(hexColorPattern);
  if (hexMatches) {
    issues.push(`Found hex colors: ${[...new Set(hexMatches)].join(', ')}. Use CSS variable tokens instead.`);
  }

  // Check for dark: or hover: modifiers
  if (/\bdark:/.test(code)) {
    warnings.push('Found dark: modifiers. UI Lab components handle dark mode automatically via props.');
  }
  if (/\bhover:/.test(code)) {
    warnings.push('Found hover: modifiers. UI Lab components handle hover states internally.');
  }

  // Check for shadows and gradients
  if (/\bshadow-/.test(code) || /\bfrom-/.test(code) || /\bto-/.test(code) || /\bgradient/.test(code)) {
    warnings.push('Found shadow or gradient classes. Consider using component variants or design tokens.');
  }

  // Check for unknown components
  const componentPattern = /<([A-Z][a-zA-Z]*)/g;
  const usedComponents = new Set<string>();
  let match;
  while ((match = componentPattern.exec(code)) !== null) {
    usedComponents.add(match[1]);
  }

  const knownComponents = COMPONENTS.map((c) => c.id.toLowerCase());
  const commonReactComponents = ['react', 'fragment', 'provider', 'context', 'suspense', 'lazy'];

  for (const comp of usedComponents) {
    const lowerComp = comp.toLowerCase();
    if (!knownComponents.includes(lowerComp) && !commonReactComponents.includes(lowerComp)) {
      warnings.push(`Unknown component: <${comp}>. Available UI Lab components: ${COMPONENTS.map((c) => c.id).join(', ')}`);
    }
  }

  if (issues.length === 0 && warnings.length === 0) {
    suggestions.push('Code follows design system guidelines.');
  }

  return { valid: issues.length === 0, issues, warnings, suggestions };
}

// ============================================================================
// PHASE 2: MCP INTEGRATION
// ============================================================================

/**
 * Find components by keyword, category, or use-case.
 */
export function searchComponents(query: string): {
  results: Array<ComponentMeta & { relevanceScore: number }>;
  query: string;
} {
  const queryLower = query.toLowerCase();

  const results = COMPONENTS.map((component) => {
    let relevanceScore = 0;

    // Exact ID match
    if (component.id === queryLower) relevanceScore += 100;
    // ID contains query
    else if (component.id.includes(queryLower)) relevanceScore += 50;

    // Description match
    if (component.description?.toLowerCase().includes(queryLower)) relevanceScore += 30;

    // Category match
    if (component.category?.toLowerCase().includes(queryLower)) relevanceScore += 40;

    // Use case match
    if (component.useCases?.some((uc) => uc.toLowerCase().includes(queryLower))) relevanceScore += 25;

    return { ...component, relevanceScore };
  })
    .filter((c) => c.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  return { results, query };
}

/**
 * Get component recommendations based on a description.
 */
export function suggestComponents(uiRequirement: string): {
  recommendation: Array<{ component: ComponentMeta; reason: string }>;
  analysis: string;
} {
  const req = uiRequirement.toLowerCase();
  const recommendation: Array<{ component: ComponentMeta; reason: string }> = [];

  const patterns: Array<{ keywords: string[]; componentId: string; reason: string }> = [
    { keywords: ['button', 'action', 'click', 'submit', 'save', 'cancel'], componentId: 'button', reason: 'Button for interactive actions' },
    { keywords: ['input', 'text', 'email', 'password', 'field', 'entry'], componentId: 'input', reason: 'Input for text entry' },
    { keywords: ['card', 'container', 'group', 'section', 'panel'], componentId: 'card', reason: 'Card for content grouping' },
    { keywords: ['badge', 'tag', 'status', 'label', 'indicator'], componentId: 'badge', reason: 'Badge for status indicators' },
    { keywords: ['alert', 'message', 'notification', 'success', 'error', 'warning'], componentId: 'alert', reason: 'Alert for feedback messages' },
    { keywords: ['modal', 'dialog', 'popup', 'overlay', 'confirm'], componentId: 'dialog', reason: 'Dialog for modal interactions' },
    { keywords: ['tabs', 'tab', 'switch', 'sections'], componentId: 'tabs', reason: 'Tabs for section switching' },
    { keywords: ['select', 'dropdown', 'choose', 'pick', 'options'], componentId: 'select', reason: 'Select for choosing from options' },
    { keywords: ['checkbox', 'toggle', 'check', 'multiple'], componentId: 'checkbox', reason: 'Checkbox for toggles or multiple selection' },
    { keywords: ['radio', 'choice', 'single', 'one of'], componentId: 'radio', reason: 'Radio for single selection' },
    { keywords: ['delete', 'remove', 'destroy', 'dangerous'], componentId: 'button', reason: 'Button with danger variant for destructive actions' },
  ];

  for (const pattern of patterns) {
    if (pattern.keywords.some((kw) => req.includes(kw))) {
      const component = COMPONENTS.find((c) => c.id === pattern.componentId);
      if (component && !recommendation.some((r) => r.component.id === component.id)) {
        recommendation.push({ component, reason: pattern.reason });
      }
    }
  }

  // Fallback
  if (recommendation.length === 0) {
    recommendation.push({
      component: COMPONENTS[0],
      reason: 'Suggested as starting point - describe your needs more specifically for better recommendations',
    });
  }

  return {
    recommendation,
    analysis: `Analyzed: "${uiRequirement}"\nRecommended ${recommendation.length} component(s) based on semantic intent.`,
  };
}

/**
 * Get full API documentation for a component.
 */
export function getComponentApi(componentName: string): {
  component: ComponentMeta;
  apiDetails: string;
  examples: string[];
  error?: string;
} {
  const component = COMPONENTS.find((c) => c.id.toLowerCase() === componentName.toLowerCase());

  if (!component) {
    return {
      component: {} as ComponentMeta,
      apiDetails: '',
      examples: [],
      error: `Component "${componentName}" not found. Available: ${COMPONENTS.map((c) => c.id).join(', ')}`,
    };
  }

  const apiDetails = `Component: ${component.id}
Description: ${component.description}
Category: ${component.category}
Required Props: ${component.requiredProps.length > 0 ? component.requiredProps.join(', ') : 'none'}
Optional Props: ${component.acceptedProps.filter((p) => !component.requiredProps.includes(p)).join(', ')}
Use Cases: ${component.useCases?.join(', ') || 'general'}`;

  const pascalCase = component.id.charAt(0).toUpperCase() + component.id.slice(1);
  const examples = [
    `<${pascalCase} variant="primary">Content</${pascalCase}>`,
    `<${pascalCase} disabled>Disabled</${pascalCase}>`,
  ];

  return { component, apiDetails, examples };
}

/**
 * Get components and example code for a design pattern.
 */
export function getPatternComponents(patternName: string): Pattern & { error?: string } {
  const pattern = PATTERNS[patternName.toLowerCase()];

  if (!pattern) {
    return {
      name: patternName,
      components: [],
      description: 'Pattern not found',
      rationale: '',
      code: '',
      error: `Pattern "${patternName}" not found. Available: ${Object.keys(PATTERNS).join(', ')}`,
    };
  }

  return pattern;
}

// ============================================================================
// PHASE 3: DESIGN VALIDATION
// ============================================================================

/**
 * Detect arbitrary colors that violate the design system.
 */
export function checkArbitraryColors(code: string): {
  issues: Array<{ color: string; line: string; suggestion: string }>;
  summary: string;
} {
  const issues: Array<{ color: string; line: string; suggestion: string }> = [];

  // Arbitrary Tailwind colors
  const tailwindPatterns = [
    { pattern: /bg-(blue|red|green|yellow|gray|zinc|slate|stone|orange|purple|pink|indigo|cyan|teal|emerald|lime|amber|sky|violet|fuchsia|rose|neutral)-(\d+)/g, type: 'background' },
    { pattern: /text-(blue|red|green|yellow|gray|zinc|slate|stone|orange|purple|pink|indigo|cyan|teal|emerald|lime|amber|sky|violet|fuchsia|rose|neutral)-(\d+)/g, type: 'text' },
    { pattern: /border-(blue|red|green|yellow|gray|zinc|slate|stone|orange|purple|pink|indigo|cyan|teal|emerald|lime|amber|sky|violet|fuchsia|rose|neutral)-(\d+)/g, type: 'border' },
  ];

  const colorMapping: Record<string, string> = {
    blue: 'accent or info',
    red: 'danger',
    green: 'success',
    yellow: 'warning',
    orange: 'warning',
    gray: 'foreground or background',
    zinc: 'foreground or background',
    slate: 'foreground or background',
    stone: 'foreground or background',
    neutral: 'foreground or background',
  };

  for (const { pattern, type } of tailwindPatterns) {
    let match;
    while ((match = pattern.exec(code)) !== null) {
      const [fullMatch, color, shade] = match;
      const semantic = colorMapping[color] || 'appropriate semantic family';
      const prefix = type === 'background' ? 'bg' : type === 'text' ? 'text' : 'border';
      issues.push({
        color: fullMatch,
        line: fullMatch,
        suggestion: `Use ${prefix}-[var(--${semantic}-${shade})] instead`,
      });
    }
  }

  // Hex colors
  const hexPattern = /#[0-9a-fA-F]{3,8}/g;
  let hexMatch;
  while ((hexMatch = hexPattern.exec(code)) !== null) {
    issues.push({
      color: hexMatch[0],
      line: hexMatch[0],
      suggestion: 'Use CSS variable design tokens (--family-shade)',
    });
  }

  return {
    issues,
    summary: issues.length === 0
      ? 'No arbitrary colors detected. Code follows design system.'
      : `Found ${issues.length} arbitrary color(s) that should be replaced with design tokens.`,
  };
}

/**
 * Get the correct color for a semantic intent.
 */
export function getColorRecommendation(semanticIntent: string): {
  intent: string;
  recommendation: ColorRecommendation | null;
  alternatives?: ColorRecommendation[];
} {
  const intent = semanticIntent.toLowerCase() as SemanticIntent;
  const recommendation = COLOR_INTENTS[intent] || null;

  if (!recommendation) {
    return {
      intent: semanticIntent,
      recommendation: null,
      alternatives: undefined,
    };
  }

  // Provide alternatives
  const alternatives: ColorRecommendation[] = [];
  if (intent === 'primary') {
    alternatives.push({ family: 'accent', shade: 700, cssVar: '--accent-700', rationale: 'Darker shade for hover states' });
  }
  if (intent === 'text') {
    alternatives.push({ family: 'foreground', shade: 700, cssVar: '--foreground-700', rationale: 'Slightly lighter for secondary text' });
  }

  return { intent: semanticIntent, recommendation, alternatives: alternatives.length > 0 ? alternatives : undefined };
}

/**
 * Check that color families match their semantic meaning.
 */
export function validateSemanticIntent(code: string): {
  valid: boolean;
  analysis: string;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check destructive actions use danger
  if (/\b(Delete|Remove|Destroy)\b/i.test(code) && !/(danger|--danger-)/.test(code)) {
    issues.push('Destructive action detected but danger color family not used. Use variant="danger" or --danger-* colors.');
  }

  // Check success messages use success
  if (/\b(Success|Saved|Completed)\b/i.test(code) && !/(success|--success-)/.test(code)) {
    issues.push('Success content detected but success color family not used. Use variant="success" or --success-* colors.');
  }

  // Check warnings use warning
  if (/\b(Warning|Caution|Attention)\b/i.test(code) && !/(warning|--warning-)/.test(code)) {
    issues.push('Warning content detected but warning color family not used. Use variant="warning" or --warning-* colors.');
  }

  // Check errors use danger
  if (/\b(Error|Failed|Invalid)\b/i.test(code) && !/(danger|--danger-)/.test(code)) {
    issues.push('Error content detected but danger color family not used. Use variant="danger" or --danger-* colors.');
  }

  // Suggestions for primary actions
  if (/\b(Submit|Save|Confirm|Continue)\b/i.test(code) && !/(primary|accent|--accent-)/.test(code)) {
    suggestions.push('Consider using variant="primary" or accent colors for primary actions.');
  }

  return {
    valid: issues.length === 0,
    analysis: `Semantic intent validation: ${issues.length} issue(s), ${suggestions.length} suggestion(s)`,
    issues,
    suggestions,
  };
}

/**
 * Verify color pairs meet WCAG accessibility standards.
 */
export function checkWcagContrast(foregroundColor: string, backgroundColor: string): {
  color1: string;
  color2: string;
  wcagAA: boolean;
  wcagAAA: boolean;
  analysis: string;
  recommendation?: string;
} {
  // Known high-contrast pairs
  const highContrastPairs = [
    'foreground-950:background-50',
    'foreground-900:background-50',
    'foreground-900:background-100',
    'foreground-800:background-100',
    'foreground-800:background-200',
    'foreground-50:background-900',
    'foreground-50:background-950',
    'foreground-50:accent-600',
    'foreground-50:accent-700',
    'foreground-50:danger-600',
    'foreground-50:danger-700',
    'foreground-50:success-600',
    'foreground-50:success-700',
    'accent-600:foreground-50',
    'danger-600:foreground-50',
    'success-600:foreground-50',
  ];

  // Normalize color names
  const fg = foregroundColor.replace(/^--/, '');
  const bg = backgroundColor.replace(/^--/, '');
  const pair = `${fg}:${bg}`;
  const reversePair = `${bg}:${fg}`;

  const isHighContrast = highContrastPairs.includes(pair) || highContrastPairs.includes(reversePair);

  return {
    color1: foregroundColor,
    color2: backgroundColor,
    wcagAA: isHighContrast,
    wcagAAA: isHighContrast,
    analysis: `Contrast check for ${foregroundColor} on ${backgroundColor}`,
    recommendation: isHighContrast
      ? 'Colors meet WCAG AA standards for normal text.'
      : 'Consider using darker text (700+) or lighter background (50-200) for better contrast.',
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export const tools = {
  // Registry
  registry: toolRegistry,

  // Phase 1: Core Infrastructure
  getAvailableComponents,
  getComponentProps,
  getDesignTokens,
  validateColorUsage,
  validateComponentCode,

  // Phase 2: MCP Integration
  searchComponents,
  suggestComponents,
  getComponentApi,
  getPatternComponents,

  // Phase 3: Design Validation
  checkArbitraryColors,
  getColorRecommendation,
  validateSemanticIntent,
  checkWcagContrast,
};

export default tools;
