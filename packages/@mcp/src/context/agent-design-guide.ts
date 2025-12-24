/**
 * Agent Design System Guide
 * Structured guide for agents with reference tables, patterns, and best practices
 */

export interface QuickReferenceEntry {
  family: string;
  intent: string;
  usage: string;
  examples: string[];
}

export interface ColorPattern {
  name: string;
  family: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  description: string;
}

export interface CodeExample {
  title: string;
  correct: string;
  incorrect: string;
  explanation: string;
}

export function getColorFamilyReference(): QuickReferenceEntry[] {
  return [
    {
      family: 'accent',
      intent: 'primary',
      usage: 'Primary actions, brand elements, focus states',
      examples: [
        'Primary CTA button',
        'Main navigation link',
        'Active tab indicator',
        'Primary form focus ring',
      ],
    },
    {
      family: 'success',
      intent: 'success',
      usage: 'Confirmations, approved states, positive feedback',
      examples: [
        'Success message background',
        'Approved badge',
        'Checkmark icon',
        'Successful operation alert',
      ],
    },
    {
      family: 'danger',
      intent: 'danger',
      usage: 'Errors, delete buttons, failed states, destructive actions',
      examples: [
        'Error message background',
        'Delete button',
        'Invalid form field border',
        'Critical warning alert',
      ],
    },
    {
      family: 'warning',
      intent: 'warning',
      usage: 'Cautions, pending operations, important notices',
      examples: [
        'Warning message',
        'Pending status badge',
        'Deprecation notice',
        'Attention-needed indicator',
      ],
    },
    {
      family: 'info',
      intent: 'info',
      usage: 'Informational content, help text, neutral metadata',
      examples: [
        'Info message',
        'Help text',
        'Documentation highlight',
        'Tips and hints',
      ],
    },
    {
      family: 'background',
      intent: 'neutral',
      usage: 'Page backgrounds, card backgrounds, containers',
      examples: [
        'Page background',
        'Card surface',
        'Container fill',
        'Secondary background',
      ],
    },
    {
      family: 'foreground',
      intent: 'neutral',
      usage: 'Text, icons, borders, dividers',
      examples: [
        'Body text',
        'Label text',
        'Border color',
        'Icon color',
      ],
    },
  ];
}

export function getShadeSelectionGuide(): Record<string, { shades: string; purpose: string; examples: string[] }> {
  return {
    light_backgrounds: {
      shades: '50-300',
      purpose: 'Light backgrounds for alerts, cards, badges',
      examples: [
        'Page background: --background-50',
        'Success alert: --success-50 or --success-100',
        'Light badge: --info-100',
        'Card background: --background-100',
      ],
    },
    medium_backgrounds: {
      shades: '400-500',
      purpose: 'Medium backgrounds for hover states and secondary containers',
      examples: [
        'Hover state: --accent-500',
        'Disabled button: --background-500',
        'Secondary container: --background-400',
      ],
    },
    dark_backgrounds: {
      shades: '600-950',
      purpose: 'Dark backgrounds for dark mode and elevated surfaces',
      examples: [
        'Dark mode background: --background-800',
        'Dark card: --background-700',
        'Elevated dark surface: --background-900',
      ],
    },
    text_dark_shades: {
      shades: '700-950',
      purpose: 'Text on light backgrounds (must be dark for contrast)',
      examples: [
        'Body text: --foreground-900',
        'Headings: --foreground-950',
        'Labels: --foreground-800',
      ],
    },
    text_light_shades: {
      shades: '50-100',
      purpose: 'Text on dark backgrounds (must be light)',
      examples: [
        'Light text on dark: --foreground-50',
        'Light text alternate: --foreground-100',
      ],
    },
  };
}

export function getCommonPatterns(): ColorPattern[] {
  return [
    {
      name: 'Primary Button',
      family: 'accent',
      backgroundColor: '--accent-600',
      textColor: '--foreground-50',
      borderColor: 'optional --accent-700',
      description: 'Main CTA button with hover and active states',
    },
    {
      name: 'Success Button',
      family: 'success',
      backgroundColor: '--success-600',
      textColor: '--foreground-50',
      borderColor: 'optional --success-700',
      description: 'Confirmation or successful action button',
    },
    {
      name: 'Danger Button',
      family: 'danger',
      backgroundColor: '--danger-700',
      textColor: '--foreground-50',
      borderColor: 'optional --danger-800',
      description: 'Delete or destructive action button',
    },
    {
      name: 'Success Alert',
      family: 'success',
      backgroundColor: '--success-50',
      textColor: '--success-900',
      borderColor: '--success-300',
      description: 'Success message container',
    },
    {
      name: 'Error Alert',
      family: 'danger',
      backgroundColor: '--danger-50',
      textColor: '--danger-900',
      borderColor: '--danger-300',
      description: 'Error message container',
    },
    {
      name: 'Warning Alert',
      family: 'warning',
      backgroundColor: '--warning-50',
      textColor: '--warning-900',
      borderColor: '--warning-300',
      description: 'Warning message container',
    },
    {
      name: 'Info Alert',
      family: 'info',
      backgroundColor: '--info-50',
      textColor: '--info-900',
      borderColor: '--info-300',
      description: 'Informational message container',
    },
    {
      name: 'Success Badge',
      family: 'success',
      backgroundColor: '--success-200',
      textColor: '--success-900',
      borderColor: 'optional --success-300',
      description: 'Status badge for approved/completed items',
    },
    {
      name: 'Warning Badge',
      family: 'warning',
      backgroundColor: '--warning-200',
      textColor: '--warning-900',
      borderColor: 'optional --warning-300',
      description: 'Status badge for pending items',
    },
  ];
}

export function getCodeExamples(): CodeExample[] {
  return [
    {
      title: 'Button with Semantic Colors',
      incorrect: '<button className="bg-blue-600 text-white">Click</button>',
      correct: '<button className="bg-[var(--accent-600)] text-[var(--foreground-50)]">Click</button>',
      explanation: 'Use semantic color families instead of arbitrary Tailwind colors. This communicates intent and ensures consistency.',
    },
    {
      title: 'Alert Background',
      incorrect: '<div className="bg-red-50">Error</div>',
      correct: '<div className="bg-[var(--danger-50)]">Error</div>',
      explanation: 'Map semantic intent to color family: errors use danger family, success uses success family.',
    },
    {
      title: 'Text on Background',
      incorrect: '<p className="bg-white text-gray-300">Not readable</p>',
      correct: '<p className="bg-[var(--background-50)] text-[var(--foreground-900)]">Readable</p>',
      explanation: 'Use dark text shades (700-950) on light backgrounds for sufficient contrast.',
    },
    {
      title: 'Hover States',
      incorrect: '<button className="bg-blue-600">Click</button>',
      correct: '<button className="bg-[var(--accent-600)] hover:bg-[var(--accent-700)] active:bg-[var(--accent-800)]">Click</button>',
      explanation: 'Always include hover and active states using darker shades of the same family.',
    },
    {
      title: 'Badge Pattern',
      incorrect: '<span className="bg-green-100 text-green-800">Success</span>',
      correct: '<span className="bg-[var(--success-100)] text-[var(--success-900)]">Success</span>',
      explanation: 'Badges use light shade (100-200) for background and dark shade (800-950) for text.',
    },
  ];
}

export function getAccessibilityChecklist(): string[] {
  return [
    'Text color has sufficient contrast ratio (4.5:1 minimum for normal text)',
    'Light shades (50-300) never used for body text',
    'Dark shades (700-950) used for text on light backgrounds',
    'Light shades (50-100) used for text on dark backgrounds',
    'Color not the only way to convey meaning - use text labels and icons',
    'Hover and focus states are clearly visible',
    'All semantic colors verified for WCAG AA compliance',
    'Paired colors tested for contrast before implementation',
  ];
}

export function getMistakesToAvoid(): Record<string, { wrong: string; right: string; why: string }> {
  return {
    light_text_color: {
      wrong: 'text-[var(--foreground-50)]',
      right: 'text-[var(--foreground-900)]',
      why: 'Light shades are unreadable as text. Always use dark shades (700-950) for text on light backgrounds.',
    },
    wrong_color_family: {
      wrong: 'bg-[var(--success-50)] /* for error message */',
      right: 'bg-[var(--danger-50)] /* for error message */',
      why: 'Each family has semantic meaning: success = confirmations, danger = errors, warning = cautions.',
    },
    dark_shade_light_bg: {
      wrong: 'bg-[var(--background-50)] text-[var(--foreground-700)]',
      right: 'bg-[var(--background-50)] text-[var(--foreground-950)]',
      why: 'Darker shades provide better contrast. Use darkest available shades for text.',
    },
    missing_hover_states: {
      wrong: '<button className="bg-[var(--accent-600)]">Click</button>',
      right: '<button className="bg-[var(--accent-600)] hover:bg-[var(--accent-700)]">Click</button>',
      why: 'Interactive elements need clear visual feedback. Hover states guide users through interaction.',
    },
    arbitrary_tailwind: {
      wrong: 'className="bg-blue-500 text-gray-700"',
      right: 'className="bg-[var(--accent-600)] text-[var(--foreground-800)]"',
      why: 'Arbitrary colors don\'t communicate meaning. Always use semantic families.',
    },
  };
}

export function getToolUsageGuide(): Record<string, { when: string[]; inputs: string; returns: string }> {
  return {
    get_color_guidance: {
      when: [
        'Generating component code and uncertain about colors',
        'Need to verify semantic appropriateness for a context',
        'Want recommended shade ranges for a UI element',
        'Need accessibility contrast information',
      ],
      inputs: 'context (button, alert, badge, etc.), semantic_intent (primary, success, danger, warning, info)',
      returns: 'Recommended color family, shade ranges, examples, accessibility info, do-not-use guidance',
    },
    validate_color_usage: {
      when: [
        'After generating code and want to verify colors before returning',
        'Testing specific color+shade combination for appropriateness',
        'Want to catch semantic or accessibility issues',
        'Unsure if generated colors meet WCAG standards',
      ],
      inputs: 'color_family, shade, usage_context (text, button-background, border, etc.), optional paired_colors',
      returns: 'Valid/invalid status, detected issues (error/warning/info), accessibility compliance, recommendations',
    },
  };
}

export function getAgentDesignGuide(): string {
  const familyRef = getColorFamilyReference();
  const shadeGuide = getShadeSelectionGuide();
  const patterns = getCommonPatterns();
  const examples = getCodeExamples();
  const accessibility = getAccessibilityChecklist();
  const mistakes = getMistakesToAvoid();
  const toolGuide = getToolUsageGuide();

  let guide = '# Agent Design System Reference Guide\n\n';

  guide += '## Color Family Quick Reference\n\n';
  familyRef.forEach((entry) => {
    guide += `### ${entry.family.toUpperCase()} (${entry.intent})\n`;
    guide += `**Use for:** ${entry.usage}\n`;
    guide += `**Examples:**\n`;
    entry.examples.forEach((ex) => {
      guide += `  - ${ex}\n`;
    });
    guide += `\n`;
  });

  guide += '## Shade Selection Guide\n\n';
  Object.entries(shadeGuide).forEach(([key, value]) => {
    guide += `### ${key.replace(/_/g, ' ').toUpperCase()} (${value.shades})\n`;
    guide += `**Purpose:** ${value.purpose}\n`;
    guide += `**Examples:**\n`;
    value.examples.forEach((ex) => {
      guide += `  - ${ex}\n`;
    });
    guide += `\n`;
  });

  guide += '## Common Color Patterns\n\n';
  patterns.forEach((pattern) => {
    guide += `### ${pattern.name}\n`;
    guide += `**Family:** ${pattern.family}\n`;
    guide += `**Background:** ${pattern.backgroundColor}\n`;
    guide += `**Text:** ${pattern.textColor}\n`;
    guide += `**Border:** ${pattern.borderColor}\n`;
    guide += `**Description:** ${pattern.description}\n\n`;
  });

  guide += '## Code Examples\n\n';
  examples.forEach((example) => {
    guide += `### ${example.title}\n`;
    guide += `❌ **Incorrect:** \`${example.incorrect}\`\n`;
    guide += `✓ **Correct:** \`${example.correct}\`\n`;
    guide += `**Why:** ${example.explanation}\n\n`;
  });

  guide += '## Accessibility Checklist\n\n';
  accessibility.forEach((item) => {
    guide += `- [ ] ${item}\n`;
  });
  guide += `\n`;

  guide += '## Mistakes to Avoid\n\n';
  Object.entries(mistakes).forEach(([key, value]) => {
    guide += `### ${key.replace(/_/g, ' ').toUpperCase()}\n`;
    guide += `❌ **Wrong:** ${value.wrong}\n`;
    guide += `✓ **Right:** ${value.right}\n`;
    guide += `**Why:** ${value.why}\n\n`;
  });

  guide += '## Tool Usage Guide\n\n';
  Object.entries(toolGuide).forEach(([toolName, info]) => {
    guide += `### ${toolName}\n`;
    guide += `**When to use:**\n`;
    info.when.forEach((w) => {
      guide += `  - ${w}\n`;
    });
    guide += `**Inputs:** ${info.inputs}\n`;
    guide += `**Returns:** ${info.returns}\n\n`;
  });

  return guide;
}
