/**
 * UI Lab Design Skill Tools
 *
 * Tools query design/ folder as source of truth:
 * - design/tokens.md - Color families, spacing, typography
 * - design/components.md - Component registry and APIs
 * - design/patterns.md - UI patterns with rationale
 * - design/guidelines.md - Philosophy and rules
 */

// ============================================================================
// TYPES
// ============================================================================

/** Valid color family names */
export type ColorFamilyName = 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'background' | 'foreground';

/** Valid shade values by family */
export type ForegroundShade = 50 | 100 | 200 | 300 | 400 | 500 | 600;
export type BackgroundShade = 500 | 600 | 700 | 800 | 900 | 950;
export type SemanticShade = 50 | 100 | 200 | 300 | 400 | 500 | 600;

/** Color usage context */
export type ColorContext = 'text' | 'background' | 'border' | 'icon';

/** Semantic intent for color recommendations */
export type SemanticIntent =
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'text'
  | 'text-heading'
  | 'text-muted'
  | 'background-page'
  | 'background-card'
  | 'border';

/** Component categories */
export type ComponentCategory =
  | 'layout'
  | 'composition'
  | 'action'
  | 'input'
  | 'information'
  | 'feedback'
  | 'navigation'
  | 'container'
  | 'data';

export interface ColorFamily {
  name: string;
  shadeRange: string;
  wcagLevel: 'AA' | 'AAA';
  usageGuidance: string;
}

export interface ComponentMeta {
  id: string;
  name: string;
  props: Record<string, string>;
  compoundComponents?: string[];
  description?: string;
  category?: ComponentCategory;
  useCases?: string[];
  importPath: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: string[];
  warnings: string[];
  suggestions?: string[];
}

export interface ColorRecommendation {
  family: ColorFamilyName;
  shade: number;
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
// DATA - Accurate UI Lab component registry
// ============================================================================

const VALID_FAMILIES: ColorFamilyName[] = ['accent', 'success', 'danger', 'warning', 'info', 'background', 'foreground'];

/** Component registry - mirrors actual UI Lab components */
const COMPONENTS: ComponentMeta[] = [
  // Layout
  {
    id: 'flex',
    name: 'Flex',
    props: {
      direction: '"row" | "column"',
      wrap: '"wrap" | "nowrap"',
      gap: '"xs" | "sm" | "md" | "lg" | "xl"',
      justify: '"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"',
      align: '"flex-start" | "flex-end" | "center" | "stretch" | "baseline"',
      containerQueryResponsive: 'boolean',
    },
    description: 'Flexbox layout container with semantic gap and alignment props',
    category: 'layout',
    useCases: ['row-layout', 'column-layout', 'centering', 'spacing'],
    importPath: "import { Flex } from 'ui-lab-components'",
  },
  {
    id: 'grid',
    name: 'Grid',
    props: {
      columns: '"1" | "2" | "3" | "4" | "5" | "6" | "auto-fit" | "auto-fill"',
      rows: '"1" | "2" | "3" | "4" | "5" | "6" | "auto"',
      gap: '"xs" | "sm" | "md" | "lg" | "xl"',
      rowGap: '"xs" | "sm" | "md" | "lg" | "xl"',
      columnGap: '"xs" | "sm" | "md" | "lg" | "xl"',
      containerQueryResponsive: 'boolean',
    },
    description: 'CSS Grid layout container with column/row configuration',
    category: 'layout',
    useCases: ['grid-layout', 'responsive-grid', 'card-grid'],
    importPath: "import { Grid } from 'ui-lab-components'",
  },
  {
    id: 'divider',
    name: 'Divider',
    props: {
      orientation: '"horizontal" | "vertical"',
    },
    description: 'Visual separator between content sections',
    category: 'layout',
    useCases: ['section-divider', 'list-separator'],
    importPath: "import { Divider } from 'ui-lab-components'",
  },
  // Action
  {
    id: 'button',
    name: 'Button',
    props: {
      variant: '"primary" | "default" | "secondary" | "outline" | "ghost"',
      size: '"sm" | "md" | "lg"',
      isDisabled: 'boolean',
      onPress: '(e) => void',
      icon: '{ left?: ReactNode, right?: ReactNode }',
    },
    description: 'Interactive button with variants and sizes. Built with React Aria.',
    category: 'action',
    useCases: ['primary-action', 'secondary-action', 'destructive-action', 'icon-button'],
    importPath: "import { Button } from 'ui-lab-components'",
  },
  {
    id: 'group',
    name: 'Group',
    props: {
      variant: '"default" | "ghost"',
      spacing: '"compact" | "normal" | "loose"',
    },
    compoundComponents: ['Group.Button'],
    description: 'Button grouping component for related actions',
    category: 'composition',
    useCases: ['action-group', 'button-bar'],
    importPath: "import { Group } from 'ui-lab-components'",
  },
  // Input
  {
    id: 'input',
    name: 'Input',
    props: {
      variant: '"default" | "ghost"',
      error: 'boolean',
      prefixIcon: 'ReactNode',
      suffixIcon: 'ReactNode',
      type: '"text" | "email" | "password" | "number" | "tel" | "url"',
    },
    description: 'Text input field with variants and icon support',
    category: 'input',
    useCases: ['text-entry', 'search', 'email', 'password'],
    importPath: "import { Input } from 'ui-lab-components'",
  },
  {
    id: 'textarea',
    name: 'Textarea',
    props: {
      placeholder: 'string',
      rows: 'number',
    },
    description: 'Multi-line text input',
    category: 'input',
    useCases: ['long-text', 'message', 'description'],
    importPath: "import { Textarea } from 'ui-lab-components'",
  },
  {
    id: 'select',
    name: 'Select',
    props: {},
    compoundComponents: ['Searchable'],
    description: 'Dropdown selection component',
    category: 'input',
    useCases: ['dropdown', 'single-choice'],
    importPath: "import { Select, Searchable } from 'ui-lab-components'",
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    props: {
      checked: 'boolean',
      onChange: '(e: ChangeEvent) => void',
      label: 'ReactNode',
      size: '"sm" | "md" | "lg"',
      disabled: 'boolean',
    },
    description: 'Boolean toggle or multiple selection',
    category: 'input',
    useCases: ['boolean-toggle', 'multiple-selection', 'agreement'],
    importPath: "import { Checkbox } from 'ui-lab-components'",
  },
  {
    id: 'radio',
    name: 'Radio',
    props: {
      name: 'string',
      value: 'string',
      onChange: '(value: string) => void',
    },
    description: 'Single selection from a group',
    category: 'input',
    useCases: ['single-choice', 'options'],
    importPath: "import { Radio } from 'ui-lab-components'",
  },
  {
    id: 'switch',
    name: 'Switch',
    props: {
      checked: 'boolean',
      onChange: '(checked: boolean) => void',
      disabled: 'boolean',
    },
    description: 'Toggle switch component',
    category: 'input',
    useCases: ['toggle', 'on-off'],
    importPath: "import { Switch } from 'ui-lab-components'",
  },
  {
    id: 'label',
    name: 'Label',
    props: {
      htmlFor: 'string',
    },
    description: 'Form field label',
    category: 'input',
    useCases: ['form-label'],
    importPath: "import { Label } from 'ui-lab-components'",
  },
  // Information
  {
    id: 'badge',
    name: 'Badge',
    props: {
      variant: '"default" | "success" | "warning" | "danger" | "info"',
      size: '"sm" | "md" | "lg"',
      icon: 'ReactNode',
      dismissible: 'boolean',
      onDismiss: '() => void',
      pill: 'boolean',
      count: 'number',
    },
    description: 'Compact status indicator or tag',
    category: 'information',
    useCases: ['status-label', 'tag', 'count', 'indicator'],
    importPath: "import { Badge } from 'ui-lab-components'",
  },
  {
    id: 'banner',
    name: 'Banner',
    props: {
      variant: '"note" | "info" | "success" | "warning" | "danger"',
      size: '"sm" | "md" | "lg"',
      isDismissible: 'boolean',
      onDismiss: '() => void',
    },
    compoundComponents: ['Banner.Title', 'Banner.Body'],
    description: 'Full-width notification banner with semantic variants',
    category: 'information',
    useCases: ['success-message', 'error-message', 'warning', 'info', 'notification'],
    importPath: "import { Banner } from 'ui-lab-components'",
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    props: {
      content: 'ReactNode',
    },
    description: 'Hover tooltip for additional information',
    category: 'information',
    useCases: ['hint', 'help-text'],
    importPath: "import { Tooltip } from 'ui-lab-components'",
  },
  {
    id: 'anchor',
    name: 'Anchor',
    props: {
      href: 'string',
    },
    compoundComponents: ['Anchor.Preview'],
    description: 'Styled link with optional popover preview',
    category: 'information',
    useCases: ['link', 'navigation'],
    importPath: "import { Anchor } from 'ui-lab-components'",
  },
  // Feedback
  {
    id: 'toast',
    name: 'Toast',
    props: {},
    description: 'Temporary notification messages. Use toast.success(), toast.error(), etc.',
    category: 'feedback',
    useCases: ['notification', 'alert', 'feedback'],
    importPath: "import { toast, Toaster } from 'ui-lab-components'",
  },
  {
    id: 'progress',
    name: 'Progress',
    props: {
      value: 'number',
      max: 'number',
      label: 'string',
      showValue: 'boolean',
      size: '"sm" | "md" | "lg"',
      variant: '"default" | "success" | "warning" | "danger"',
    },
    description: 'Progress indicator bar',
    category: 'feedback',
    useCases: ['loading', 'progress', 'completion'],
    importPath: "import { Progress } from 'ui-lab-components'",
  },
  {
    id: 'confirmation',
    name: 'Confirmation',
    props: {
      isOpen: 'boolean',
      onConfirm: '() => void',
      onCancel: '() => void',
      title: 'string',
      description: 'string',
    },
    description: 'Confirmation dialog for destructive actions',
    category: 'feedback',
    useCases: ['delete-confirm', 'action-confirm'],
    importPath: "import { Confirmation } from 'ui-lab-components'",
  },
  // Navigation
  {
    id: 'menu',
    name: 'Menu',
    props: {},
    compoundComponents: [
      'Menu.Trigger',
      'Menu.Portal',
      'Menu.Content',
      'Menu.Group',
      'Menu.Item',
      'Menu.CheckboxItem',
      'Menu.RadioGroup',
      'Menu.RadioItem',
      'Menu.Label',
      'Menu.Separator',
      'Menu.Shortcut',
      'Menu.Sub',
      'Menu.SubTrigger',
      'Menu.SubContent',
    ],
    description: 'Dropdown menu with items, groups, and nested submenus',
    category: 'navigation',
    useCases: ['dropdown-menu', 'context-menu', 'actions-menu'],
    importPath: "import { Menu } from 'ui-lab-components'",
  },
  {
    id: 'tabs',
    name: 'Tabs',
    props: {
      value: 'string',
      onValueChange: '(value: string) => void',
      defaultValue: 'string',
    },
    compoundComponents: ['TabsList', 'TabsTrigger', 'TabsContent'],
    description: 'Tab interface for content sections',
    category: 'navigation',
    useCases: ['section-tabs', 'settings-tabs'],
    importPath: "import { Tabs, TabsList, TabsTrigger, TabsContent } from 'ui-lab-components'",
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    props: {},
    compoundComponents: ['Breadcrumb'],
    description: 'Navigation breadcrumb trail',
    category: 'navigation',
    useCases: ['navigation', 'location'],
    importPath: "import { Breadcrumbs, Breadcrumb } from 'ui-lab-components'",
  },
  {
    id: 'command',
    name: 'Command',
    props: {},
    description: 'Command palette / search interface',
    category: 'navigation',
    useCases: ['command-palette', 'search'],
    importPath: "import { Command, CommandPalette } from 'ui-lab-components'",
  },
  // Container
  {
    id: 'card',
    name: 'Card',
    props: {},
    compoundComponents: ['Card.Header', 'Card.Body', 'Card.Footer'],
    description: 'Content container with header, body, footer',
    category: 'container',
    useCases: ['content-grouping', 'elevated-surface', 'panel'],
    importPath: "import { Card } from 'ui-lab-components'",
  },
  {
    id: 'modal',
    name: 'Modal',
    props: {
      isOpen: 'boolean',
      onOpenChange: '(isOpen: boolean) => void',
      title: 'ReactNode',
      footer: 'ReactNode',
      closeButton: 'boolean',
      size: '"sm" | "md" | "lg" | "xl"',
      isDismissable: 'boolean',
      isKeyboardDismissDisabled: 'boolean',
    },
    compoundComponents: ['Modal.Header', 'Modal.Body', 'Modal.Footer'],
    description: 'Modal dialog overlay',
    category: 'container',
    useCases: ['dialog', 'form-modal', 'confirmation'],
    importPath: "import { Modal } from 'ui-lab-components'",
  },
  {
    id: 'popover',
    name: 'Popover',
    props: {},
    description: 'Floating content panel triggered by interaction',
    category: 'container',
    useCases: ['dropdown', 'floating-content'],
    importPath: "import { Popover } from 'ui-lab-components'",
  },
  {
    id: 'fold',
    name: 'Fold',
    props: {},
    description: 'Collapsible/expandable content section',
    category: 'container',
    useCases: ['accordion', 'collapsible'],
    importPath: "import { Fold } from 'ui-lab-components'",
  },
  {
    id: 'list',
    name: 'List',
    props: {},
    compoundComponents: ['List.Container', 'List.Header', 'List.Item', 'List.ActionGroup', 'List.Divider', 'List.Footer'],
    description: 'Structured list container with items and actions',
    category: 'container',
    useCases: ['list', 'item-list'],
    importPath: "import { List } from 'ui-lab-components'",
  },
  // Data
  {
    id: 'table',
    name: 'Table',
    props: {
      columns: 'Column[]',
      data: 'any[]',
    },
    description: 'Data table with columns and rows',
    category: 'data',
    useCases: ['data-table', 'list-view'],
    importPath: "import { Table } from 'ui-lab-components'",
  },
];

/** Design tokens - mirrors design/tokens.md */
const COLOR_FAMILIES: Record<ColorFamilyName, ColorFamily> = {
  foreground: {
    name: 'foreground',
    shadeRange: '50-600',
    wcagLevel: 'AA',
    usageGuidance: 'Text and icons. 300 for body, 100-200 for headings, 500 for muted',
  },
  background: {
    name: 'background',
    shadeRange: '500-950',
    wcagLevel: 'AA',
    usageGuidance: '950 for page, 900 for cards, 700 for borders',
  },
  accent: {
    name: 'accent',
    shadeRange: '50-600',
    wcagLevel: 'AA',
    usageGuidance: '600 for buttons, 500 for links',
  },
  success: {
    name: 'success',
    shadeRange: '50-600',
    wcagLevel: 'AA',
    usageGuidance: '500-600 for success states and confirmations',
  },
  danger: {
    name: 'danger',
    shadeRange: '50-600',
    wcagLevel: 'AA',
    usageGuidance: '500-600 for errors and destructive actions',
  },
  warning: {
    name: 'warning',
    shadeRange: '50-600',
    wcagLevel: 'AA',
    usageGuidance: '500-600 for warnings and cautions',
  },
  info: {
    name: 'info',
    shadeRange: '50-600',
    wcagLevel: 'AA',
    usageGuidance: '500-600 for informational content',
  },
};

/** Patterns - mirrors design/patterns.md */
const PATTERNS: Record<string, Pattern> = {
  'success-banner': {
    name: 'success-banner',
    components: ['Banner'],
    description: 'Success feedback banner',
    rationale: 'Banner with success variant provides clear, accessible positive feedback',
    code: `<Banner variant="success" isDismissible onDismiss={handleDismiss}>
  <Banner.Title>Success!</Banner.Title>
  <Banner.Body>Your changes have been saved.</Banner.Body>
</Banner>`,
  },
  'error-banner': {
    name: 'error-banner',
    components: ['Banner'],
    description: 'Error feedback banner',
    rationale: 'Banner with danger variant signals errors with semantic meaning',
    code: `<Banner variant="danger">
  <Banner.Title>Error</Banner.Title>
  <Banner.Body>Something went wrong. Please try again.</Banner.Body>
</Banner>`,
  },
  'form-field': {
    name: 'form-field',
    components: ['Input', 'Label'],
    description: 'Form input with label and error support',
    rationale: 'Input with semantic labeling for accessibility and error states',
    code: `<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    error={!!errors.email}
  />
  {errors.email && (
    <p className="text-sm text-danger-500">{errors.email}</p>
  )}
</div>`,
  },
  'card-with-actions': {
    name: 'card-with-actions',
    components: ['Card', 'Group'],
    description: 'Card with header, body, and action buttons',
    rationale: 'Compound component pattern for organized content with actions',
    code: `<Card>
  <Card.Header>
    <h3 className="font-semibold text-foreground-100">Title</h3>
  </Card.Header>
  <Card.Body>
    <p className="text-foreground-300">Content goes here.</p>
  </Card.Body>
  <Card.Footer className="border-t border-background-700 pt-4">
    <Group>
      <Group.Button variant="ghost">Cancel</Group.Button>
      <Group.Button variant="primary">Save</Group.Button>
    </Group>
  </Card.Footer>
</Card>`,
  },
  'confirmation-modal': {
    name: 'confirmation-modal',
    components: ['Modal', 'Button', 'Flex'],
    description: 'Delete confirmation modal',
    rationale: 'Modal with compound pattern for confirmation dialogs',
    code: `<Modal isOpen={isOpen} onOpenChange={setIsOpen} title="Confirm" size="sm">
  <p className="text-foreground-300">Are you sure you want to proceed?</p>
  <Modal.Footer>
    <Flex gap="sm" justify="flex-end">
      <Button variant="ghost" onPress={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="danger" onPress={handleConfirm}>Delete</Button>
    </Flex>
  </Modal.Footer>
</Modal>`,
  },
  'status-badge': {
    name: 'status-badge',
    components: ['Badge'],
    description: 'Status indicator badge',
    rationale: 'Badge with semantic variant for status labels',
    code: `<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>`,
  },
  'button-group': {
    name: 'button-group',
    components: ['Group'],
    description: 'Button action group',
    rationale: 'Group component for related button actions',
    code: `<Group>
  <Group.Button variant="ghost">Cancel</Group.Button>
  <Group.Button variant="primary">Save</Group.Button>
</Group>`,
  },
  'tab-interface': {
    name: 'tab-interface',
    components: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    description: 'Tab navigation interface',
    rationale: 'Tabs for switching between content sections',
    code: `<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>`,
  },
  'breadcrumb-nav': {
    name: 'breadcrumb-nav',
    components: ['Breadcrumbs', 'Breadcrumb'],
    description: 'Breadcrumb navigation',
    rationale: 'Breadcrumbs for location hierarchy',
    code: `<Breadcrumbs>
  <Breadcrumb href="/">Home</Breadcrumb>
  <Breadcrumb href="/products">Products</Breadcrumb>
  <Breadcrumb>Current Page</Breadcrumb>
</Breadcrumbs>`,
  },
  'toast-notification': {
    name: 'toast-notification',
    components: ['Toaster', 'toast'],
    description: 'Toast notification pattern',
    rationale: 'Imperative toast API for temporary notifications',
    code: `// In layout
<Toaster />

// Trigger toast
toast.success("Saved successfully");
toast.error("Failed to save");
toast.warning("Check your input");
toast.info("New update available");`,
  },
};

/** Color intent mappings */
const COLOR_INTENTS: Record<SemanticIntent, ColorRecommendation> = {
  primary: { family: 'accent', shade: 600, cssVar: 'accent-600', rationale: 'Primary brand color for main CTAs' },
  success: { family: 'success', shade: 500, cssVar: 'success-500', rationale: 'Green for success states' },
  error: { family: 'danger', shade: 500, cssVar: 'danger-500', rationale: 'Red for errors and destructive actions' },
  warning: { family: 'warning', shade: 500, cssVar: 'warning-500', rationale: 'Orange for cautions' },
  info: { family: 'info', shade: 500, cssVar: 'info-500', rationale: 'Blue for informational content' },
  text: { family: 'foreground', shade: 300, cssVar: 'foreground-300', rationale: 'Default body text' },
  'text-heading': { family: 'foreground', shade: 100, cssVar: 'foreground-100', rationale: 'Headings and emphasis' },
  'text-muted': { family: 'foreground', shade: 500, cssVar: 'foreground-500', rationale: 'Muted/secondary text' },
  'background-page': { family: 'background', shade: 950, cssVar: 'background-950', rationale: 'Page background' },
  'background-card': { family: 'background', shade: 900, cssVar: 'background-900', rationale: 'Card/surface background' },
  border: { family: 'background', shade: 700, cssVar: 'background-700', rationale: 'Borders and dividers' },
};

// ============================================================================
// CORE TOOLS
// ============================================================================

/**
 * Query the component registry. Returns all available UI Lab components.
 */
export function getAvailableComponents(): {
  components: Record<ComponentCategory, string[]>;
  total: number;
} {
  const byCategory: Record<ComponentCategory, string[]> = {
    layout: [],
    composition: [],
    action: [],
    input: [],
    information: [],
    feedback: [],
    navigation: [],
    container: [],
    data: [],
  };

  for (const comp of COMPONENTS) {
    if (comp.category) {
      byCategory[comp.category].push(comp.name);
    }
  }

  return {
    components: byCategory,
    total: COMPONENTS.length,
  };
}

/**
 * Get full API documentation for a component.
 */
export function getComponentApi(componentName: string): {
  component: ComponentMeta | null;
  error?: string;
} {
  const component = COMPONENTS.find((c) => c.id.toLowerCase() === componentName.toLowerCase() || c.name.toLowerCase() === componentName.toLowerCase());

  if (!component) {
    return {
      component: null,
      error: `Component "${componentName}" not found. Available: ${COMPONENTS.map((c) => c.name).join(', ')}`,
    };
  }

  return { component };
}

/**
 * Load all design tokens from the system.
 */
export function getDesignTokens(): {
  colors: Record<string, ColorFamily>;
  spacing: { gap: string[] };
  typography: { body: string[]; header: string[] };
  radius: string[];
} {
  return {
    colors: COLOR_FAMILIES,
    spacing: {
      gap: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    typography: {
      body: ['--text-xs', '--text-sm', '--text-md', '--text-lg', '--text-xl', '--text-2xl', '--text-3xl', '--text-4xl', '--text-5xl'],
      header: ['--header-text-xs', '--header-text-sm', '--header-text-md', '--header-text-lg', '--header-text-xl', '--header-text-2xl', '--header-text-3xl', '--header-text-4xl', '--header-text-5xl'],
    },
    radius: ['--radius-xs', '--radius-sm', '--radius-base', '--radius-md', '--radius-lg', '--radius-xl', '--radius-2xl', '--radius-full'],
  };
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

/**
 * Get the correct color for a semantic intent.
 */
export function getColorRecommendation(semanticIntent: string): {
  intent: string;
  recommendation: ColorRecommendation | null;
} {
  const intent = semanticIntent.toLowerCase() as SemanticIntent;
  const recommendation = COLOR_INTENTS[intent] || null;

  return { intent: semanticIntent, recommendation };
}

/**
 * Validate generated code against design system rules.
 */
export function validateComponentCode(code: string): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check for arbitrary Tailwind colors
  const arbitraryColorPattern =
    /(bg|text|border)-(blue|red|green|yellow|purple|pink|gray|zinc|slate|stone|neutral|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-\d+/g;
  const arbitraryMatches = code.match(arbitraryColorPattern);
  if (arbitraryMatches) {
    issues.push(`Found arbitrary Tailwind colors: ${[...new Set(arbitraryMatches)].join(', ')}. Use semantic tokens (e.g., bg-background-900, text-foreground-300)`);
  }

  // Check for hex colors
  const hexColorPattern = /#[0-9a-fA-F]{3,8}/g;
  const hexMatches = code.match(hexColorPattern);
  if (hexMatches) {
    issues.push(`Found hex colors: ${[...new Set(hexMatches)].join(', ')}. Use design token CSS variables instead.`);
  }

  // Check for old API patterns
  if (/\bdisabled\b/.test(code) && /<Button/.test(code)) {
    warnings.push('Button uses "disabled" prop - consider using "isDisabled" (React Aria pattern)');
  }

  if (/\bonClick\b/.test(code) && /<Button/.test(code)) {
    suggestions.push('Button supports "onPress" in addition to "onClick" (React Aria pattern)');
  }

  // Check for Dialog instead of Modal
  if (/<Dialog/.test(code)) {
    warnings.push('UI Lab uses "Modal" component, not "Dialog"');
  }

  // Check for Alert instead of Banner
  if (/<Alert/.test(code)) {
    warnings.push('UI Lab uses "Banner" component, not "Alert"');
  }

  // Check for Card without compound pattern
  if (/<Card\s+title=/.test(code)) {
    warnings.push('Card uses compound pattern (Card.Header, Card.Body, Card.Footer), not title prop');
  }

  if (issues.length === 0 && warnings.length === 0) {
    suggestions.push('Code follows design system guidelines.');
  }

  return { valid: issues.length === 0, issues, warnings, suggestions };
}

/**
 * Detect arbitrary colors that violate the design system.
 */
export function checkArbitraryColors(code: string): {
  issues: Array<{ color: string; suggestion: string }>;
  summary: string;
} {
  const issues: Array<{ color: string; suggestion: string }> = [];

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

  const tailwindPattern =
    /(bg|text|border)-(blue|red|green|yellow|gray|zinc|slate|stone|orange|purple|pink|indigo|cyan|teal|emerald|lime|amber|sky|violet|fuchsia|rose|neutral)-(\d+)/g;

  let match;
  while ((match = tailwindPattern.exec(code)) !== null) {
    const [fullMatch, prefix, color, shade] = match;
    const semantic = colorMapping[color] || 'appropriate semantic family';
    issues.push({
      color: fullMatch,
      suggestion: `Use ${prefix}-${semantic}-${shade} instead`,
    });
  }

  return {
    issues,
    summary:
      issues.length === 0
        ? 'No arbitrary colors detected. Code follows design system.'
        : `Found ${issues.length} arbitrary color(s) that should use design tokens.`,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export const tools = {
  getAvailableComponents,
  getComponentApi,
  getDesignTokens,
  getPatternComponents,
  getColorRecommendation,
  validateComponentCode,
  checkArbitraryColors,
};

export default tools;
