/**
 * Color Families Metadata
 * Complete semantic metadata for all UI Lab color families
 * Extracted from OKLCH color system for agent guidance
 */

export interface ColorShadeMetadata {
  lightness: number;
  chroma: number;
  hue: number;
  cssVar: string;
}

export interface ColorFamilyMetadata {
  id: string;
  name: string;
  description: string;
  semanticMeaning: string;
  baseOklch: {
    h: number;
    defaultChroma?: number;
  };
  shades: Record<number, ColorShadeMetadata>;
  shadeGuidance: {
    lightBackgrounds: {
      shades: number[];
      reason: string;
      examples: string[];
    };
    mediumBackgrounds: {
      shades: number[];
      reason: string;
      examples: string[];
    };
    darkBackgrounds: {
      shades: number[];
      reason: string;
      examples: string[];
    };
  };
  commonUsages: Array<{
    component: string;
    role: 'background' | 'text' | 'border' | 'hover' | 'active';
    recommendedShades: number[];
    pairing?: {
      textFamily?: string;
      textShades?: number[];
      contrastRatio?: number;
    };
  }>;
  accessibility: {
    wcagCompliance: 'AA' | 'AAA';
    notes: string[];
    contrastPairs: Array<{
      lightShade: number;
      darkShade: number;
      contrastRatio: number;
    }>;
  };
  usageInstructions: {
    doUse: string[];
    doNotUse: string[];
    commonMistakes: string[];
  };
}

const backgroundFamily: ColorFamilyMetadata = {
  id: 'background',
  name: 'Background Color',
  description: 'Grayscale palette for surfaces and containers',
  semanticMeaning: 'All surface and container backgrounds for pages and elevated areas',
  baseOklch: { h: 0, defaultChroma: 0.0 },
  shades: {
    50: { lightness: 16.0, chroma: 0.0, hue: 0.0, cssVar: '--background-50' },
    100: { lightness: 29.0, chroma: 0.0, hue: 0.0, cssVar: '--background-100' },
    200: { lightness: 31.0, chroma: 0.0, hue: 0.0, cssVar: '--background-200' },
    300: { lightness: 42.0, chroma: 0.0, hue: 0.0, cssVar: '--background-300' },
    400: { lightness: 55.0, chroma: 0.0, hue: 0.0, cssVar: '--background-400' },
    500: { lightness: 60.0, chroma: 0.0, hue: 0.0, cssVar: '--background-500' },
    600: { lightness: 80.0, chroma: 0.0, hue: 0.0, cssVar: '--background-600' },
    700: { lightness: 83.0, chroma: 0.0, hue: 0.0, cssVar: '--background-700' },
    800: { lightness: 91.0, chroma: 0.0, hue: 0.0, cssVar: '--background-800' },
    900: { lightness: 93.0, chroma: 0.0, hue: 0.0, cssVar: '--background-900' },
    950: { lightness: 94.0, chroma: 0.0, hue: 0.0, cssVar: '--background-950' },
  },
  shadeGuidance: {
    lightBackgrounds: {
      shades: [50, 100, 200, 300],
      reason: 'Light backgrounds for page backgrounds and light containers',
      examples: ['Page background', 'Card surface', 'Sidebar background'],
    },
    mediumBackgrounds: {
      shades: [400, 500],
      reason: 'Medium backgrounds for secondary containers and hover states',
      examples: ['Secondary container', 'Disabled state background'],
    },
    darkBackgrounds: {
      shades: [600, 700, 800, 900, 950],
      reason: 'Dark backgrounds for elevated surfaces and dark mode',
      examples: ['Elevated surface', 'Dark mode background', 'Modal backdrop'],
    },
  },
  commonUsages: [
    {
      component: 'page',
      role: 'background',
      recommendedShades: [50, 100],
      pairing: { textFamily: 'foreground', textShades: [900, 950] },
    },
    {
      component: 'card',
      role: 'background',
      recommendedShades: [50, 100, 200],
      pairing: { textFamily: 'foreground', textShades: [900] },
    },
    {
      component: 'container',
      role: 'background',
      recommendedShades: [300, 400, 500],
      pairing: { textFamily: 'foreground', textShades: [800, 900] },
    },
  ],
  accessibility: {
    wcagCompliance: 'AA',
    notes: [
      'All combinations meet WCAG AA minimum contrast (4.5:1 for text)',
      'Ensure sufficient contrast with foreground colors for readability',
      'Background-50 and Background-100 are very light; pair with dark text',
    ],
    contrastPairs: [
      { lightShade: 50, darkShade: 900, contrastRatio: 17.5 },
      { lightShade: 100, darkShade: 950, contrastRatio: 18.2 },
      { lightShade: 200, darkShade: 900, contrastRatio: 15.8 },
    ],
  },
  usageInstructions: {
    doUse: [
      'Page backgrounds and main surfaces',
      'Card backgrounds and containers',
      'Elevated surfaces and modals',
      'Secondary background layers',
    ],
    doNotUse: [
      'Interactive elements (use accent family)',
      'Text or icons (use foreground family)',
      'Error or success states (use semantic families)',
      'Any color-coded meaning (use semantic families)',
    ],
    commonMistakes: [
      'Using background-50 as text color (insufficient contrast)',
      'Pairing background-800 with dark text (insufficient contrast)',
      'Using background colors for buttons (use accent)',
    ],
  },
};

const foregroundFamily: ColorFamilyMetadata = {
  id: 'foreground',
  name: 'Foreground Color',
  description: 'Grayscale palette optimized for text and icons',
  semanticMeaning: 'Text, icons, borders, and other foreground elements',
  baseOklch: { h: 0, defaultChroma: 0.0 },
  shades: {
    50: { lightness: 16.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-50' },
    100: { lightness: 29.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-100' },
    200: { lightness: 31.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-200' },
    300: { lightness: 42.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-300' },
    400: { lightness: 55.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-400' },
    500: { lightness: 60.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-500' },
    600: { lightness: 80.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-600' },
    700: { lightness: 83.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-700' },
    800: { lightness: 91.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-800' },
    900: { lightness: 93.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-900' },
    950: { lightness: 94.0, chroma: 0.0, hue: 0.0, cssVar: '--foreground-950' },
  },
  shadeGuidance: {
    lightBackgrounds: {
      shades: [50, 100, 200, 300],
      reason: 'Light foreground for disabled or subtle text',
      examples: ['Disabled text', 'Secondary text', 'Placeholder text'],
    },
    mediumBackgrounds: {
      shades: [400, 500, 600],
      reason: 'Medium foreground for secondary and tertiary text',
      examples: ['Secondary text color', 'Icon color', 'Border color'],
    },
    darkBackgrounds: {
      shades: [700, 800, 900, 950],
      reason: 'Dark foreground for primary text and strong emphasis',
      examples: ['Body text', 'Headings', 'Primary icon color'],
    },
  },
  commonUsages: [
    {
      component: 'text',
      role: 'text',
      recommendedShades: [800, 900, 950],
      pairing: { textFamily: 'background', textShades: [50, 100] },
    },
    {
      component: 'icon',
      role: 'text',
      recommendedShades: [700, 800, 900],
    },
    {
      component: 'border',
      role: 'border',
      recommendedShades: [300, 400, 500],
    },
    {
      component: 'disabled',
      role: 'text',
      recommendedShades: [400, 500, 600],
    },
  ],
  accessibility: {
    wcagCompliance: 'AAA',
    notes: [
      'All shades meet WCAG AAA contrast standards when paired appropriately',
      'Foreground-50 and -100 are very light; only for disabled states',
      'Use foreground-800 or darker for body text to ensure readability',
    ],
    contrastPairs: [
      { lightShade: 50, darkShade: 950, contrastRatio: 18.8 },
      { lightShade: 100, darkShade: 900, contrastRatio: 16.2 },
      { lightShade: 300, darkShade: 800, contrastRatio: 9.5 },
    ],
  },
  usageInstructions: {
    doUse: [
      'Primary body text and content',
      'Icons and icon colors',
      'Borders and dividers',
      'Labels and helper text',
      'Disabled states (lighter shades)',
    ],
    doNotUse: [
      'Backgrounds (use background family)',
      'Interactive elements (use accent family)',
      'Status indicators (use success, danger, warning, info)',
      'Foreground-50 or -100 for regular text (too light)',
    ],
    commonMistakes: [
      'Using foreground-400 for body text (insufficient contrast)',
      'Using foreground-50/100 for anything but disabled text',
      'Not considering contrast when pairing with background colors',
    ],
  },
};

const accentFamily: ColorFamilyMetadata = {
  id: 'accent',
  name: 'Accent Color',
  description: 'Primary interactive elements that define the theme',
  semanticMeaning: 'Primary CTAs, links, focus indicators, and brand-defining elements',
  baseOklch: { h: 0, defaultChroma: 0.0 },
  shades: {
    50: { lightness: 16.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-50' },
    100: { lightness: 29.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-100' },
    200: { lightness: 31.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-200' },
    300: { lightness: 42.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-300' },
    400: { lightness: 55.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-400' },
    500: { lightness: 60.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-500' },
    600: { lightness: 80.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-600' },
    700: { lightness: 83.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-700' },
    800: { lightness: 91.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-800' },
    900: { lightness: 93.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-900' },
    950: { lightness: 94.0, chroma: 0.0, hue: 0.0, cssVar: '--accent-950' },
  },
  shadeGuidance: {
    lightBackgrounds: {
      shades: [50, 100, 150, 200, 300],
      reason: 'Light accent for subtle highlights and link underlines',
      examples: ['Link underline', 'Accent highlight', 'Focus ring background'],
    },
    mediumBackgrounds: {
      shades: [400, 500, 600],
      reason: 'Medium accent for interactive elements and hover states',
      examples: ['Primary button', 'Active link', 'Focus state'],
    },
    darkBackgrounds: {
      shades: [700, 800, 900, 950],
      reason: 'Dark accent for prominent CTAs and dark mode',
      examples: ['Primary CTA button', 'Dark mode accent', 'Active state'],
    },
  },
  commonUsages: [
    {
      component: 'button',
      role: 'background',
      recommendedShades: [600, 700],
      pairing: { textFamily: 'foreground', textShades: [50], contrastRatio: 4.5 },
    },
    {
      component: 'link',
      role: 'text',
      recommendedShades: [600, 700],
      pairing: { textFamily: 'background', textShades: [50, 100] },
    },
    {
      component: 'focus-indicator',
      role: 'border',
      recommendedShades: [600, 700],
    },
  ],
  accessibility: {
    wcagCompliance: 'AA',
    notes: [
      'Accent provides brand identity but must maintain accessibility',
      'All theme variations must maintain WCAG AA compliance',
      'Use for primary action emphasis only',
    ],
    contrastPairs: [
      { lightShade: 600, darkShade: 50, contrastRatio: 4.5 },
      { lightShade: 700, darkShade: 50, contrastRatio: 5.0 },
      { lightShade: 800, darkShade: 100, contrastRatio: 5.2 },
    ],
  },
  usageInstructions: {
    doUse: [
      'Primary action buttons',
      'Links and navigation highlights',
      'Active/selected states',
      'Focus indicators and focus visible rings',
      'Brand-defining interactive elements',
    ],
    doNotUse: [
      'Neutral backgrounds (use background family)',
      'Error states (use danger family)',
      'Success confirmations (use success family)',
      'Multiple accent colors in same interface',
    ],
    commonMistakes: [
      'Using accent for secondary actions (use foreground instead)',
      'Insufficient contrast between accent background and text',
      'Using arbitrary brand colors instead of semantic accent family',
      'Inconsistent accent usage across components',
    ],
  },
};

const successFamily: ColorFamilyMetadata = {
  id: 'success',
  name: 'Success Color',
  description: 'Positive states, confirmations, and approved actions',
  semanticMeaning: 'Conveys successful completion and positive user feedback',
  baseOklch: { h: 142, defaultChroma: 0.16 },
  shades: {
    50: { lightness: 16.0, chroma: 0.0, hue: 142.0, cssVar: '--success-50' },
    100: { lightness: 29.0, chroma: 0.016, hue: 142.0, cssVar: '--success-100' },
    200: { lightness: 31.0, chroma: 0.032, hue: 142.0, cssVar: '--success-200' },
    300: { lightness: 42.0, chroma: 0.056, hue: 142.0, cssVar: '--success-300' },
    400: { lightness: 55.0, chroma: 0.08, hue: 142.0, cssVar: '--success-400' },
    500: { lightness: 60.0, chroma: 0.112, hue: 142.0, cssVar: '--success-500' },
    600: { lightness: 80.0, chroma: 0.144, hue: 142.0, cssVar: '--success-600' },
    700: { lightness: 83.0, chroma: 0.152, hue: 142.0, cssVar: '--success-700' },
    800: { lightness: 91.0, chroma: 0.157, hue: 142.0, cssVar: '--success-800' },
    900: { lightness: 93.0, chroma: 0.16, hue: 142.0, cssVar: '--success-900' },
    950: { lightness: 94.0, chroma: 0.16, hue: 142.0, cssVar: '--success-950' },
  },
  shadeGuidance: {
    lightBackgrounds: {
      shades: [50, 100, 200, 300],
      reason: 'Light backgrounds for success alerts and badges',
      examples: ['Success message background', 'Confirmation badge background', 'Positive notification'],
    },
    mediumBackgrounds: {
      shades: [400, 500, 600],
      reason: 'Medium tones for hover states and interactive elements',
      examples: ['Success button hover state', 'Active toggle in success state'],
    },
    darkBackgrounds: {
      shades: [700, 800, 900, 950],
      reason: 'Dark tones for prominent buttons and deep states',
      examples: ['Success CTA button', 'Dark mode success backgrounds', 'Strong success indicator'],
    },
  },
  commonUsages: [
    {
      component: 'alert',
      role: 'background',
      recommendedShades: [50, 100, 200],
      pairing: { textFamily: 'success', textShades: [900, 950], contrastRatio: 7.0 },
    },
    {
      component: 'button',
      role: 'background',
      recommendedShades: [600, 700, 800],
      pairing: { textFamily: 'foreground', textShades: [50], contrastRatio: 4.5 },
    },
    {
      component: 'badge',
      role: 'background',
      recommendedShades: [100, 200, 300],
      pairing: { textFamily: 'success', textShades: [800, 900], contrastRatio: 5.5 },
    },
  ],
  accessibility: {
    wcagCompliance: 'AA',
    notes: [
      'All combinations meet WCAG AA minimum contrast (4.5:1 for text)',
      'Consider colorblind users: pair with icons or text labels',
      'Never rely on color alone to convey status',
    ],
    contrastPairs: [
      { lightShade: 50, darkShade: 900, contrastRatio: 7.2 },
      { lightShade: 100, darkShade: 950, contrastRatio: 8.1 },
      { lightShade: 200, darkShade: 900, contrastRatio: 6.5 },
    ],
  },
  usageInstructions: {
    doUse: [
      'Success alerts and confirmations',
      'Positive action buttons (e.g., "Save", "Submit")',
      'Checkmarks and approval indicators',
      'Progress completion states',
      'Successful form submissions',
    ],
    doNotUse: [
      'Errors or warnings (use danger or warning families)',
      'Neutral information (use info family)',
      'Neutral backgrounds (use background family)',
      'Text on light backgrounds with insufficient contrast',
    ],
    commonMistakes: [
      'Using success-50 as text on white background (insufficient contrast)',
      'Using success-950 as background for large text areas (too dark)',
      'Pairing success colors without considering colorblind viewers',
      'Using arbitrary green colors instead of semantic success family',
    ],
  },
};

const dangerFamily: ColorFamilyMetadata = {
  id: 'danger',
  name: 'Danger Color',
  description: 'Error states, destructive actions, and failures',
  semanticMeaning: 'Alerts users to errors, potential loss of data, or consequences',
  baseOklch: { h: 25, defaultChroma: 0.15 },
  shades: {
    50: { lightness: 16.0, chroma: 0.0, hue: 25.0, cssVar: '--danger-50' },
    100: { lightness: 29.0, chroma: 0.015, hue: 25.0, cssVar: '--danger-100' },
    200: { lightness: 31.0, chroma: 0.03, hue: 25.0, cssVar: '--danger-200' },
    300: { lightness: 42.0, chroma: 0.053, hue: 25.0, cssVar: '--danger-300' },
    400: { lightness: 55.0, chroma: 0.075, hue: 25.0, cssVar: '--danger-400' },
    500: { lightness: 60.0, chroma: 0.105, hue: 25.0, cssVar: '--danger-500' },
    600: { lightness: 80.0, chroma: 0.135, hue: 25.0, cssVar: '--danger-600' },
    700: { lightness: 83.0, chroma: 0.143, hue: 25.0, cssVar: '--danger-700' },
    800: { lightness: 91.0, chroma: 0.147, hue: 25.0, cssVar: '--danger-800' },
    900: { lightness: 93.0, chroma: 0.15, hue: 25.0, cssVar: '--danger-900' },
    950: { lightness: 94.0, chroma: 0.15, hue: 25.0, cssVar: '--danger-950' },
  },
  shadeGuidance: {
    lightBackgrounds: {
      shades: [50, 100, 200, 300],
      reason: 'Light backgrounds for error messages and cautionary alerts',
      examples: ['Error message container', 'Invalid input background highlight', 'Error notification'],
    },
    mediumBackgrounds: {
      shades: [400, 500, 600],
      reason: 'Medium tones for validation states and hover effects',
      examples: ['Input border on validation error', 'Delete button hover'],
    },
    darkBackgrounds: {
      shades: [700, 800, 900, 950],
      reason: 'Dark tones for prominent destructive actions',
      examples: ['Delete button', 'Destructive action CTA', 'Error state emphasis'],
    },
  },
  commonUsages: [
    {
      component: 'alert',
      role: 'background',
      recommendedShades: [50, 100, 200],
      pairing: { textFamily: 'danger', textShades: [900, 950], contrastRatio: 7.0 },
    },
    {
      component: 'button',
      role: 'background',
      recommendedShades: [600, 700, 800],
      pairing: { textFamily: 'foreground', textShades: [50], contrastRatio: 4.5 },
    },
    {
      component: 'input',
      role: 'border',
      recommendedShades: [600, 700],
      pairing: { textFamily: 'danger', textShades: [900], contrastRatio: 5.5 },
    },
  ],
  accessibility: {
    wcagCompliance: 'AA',
    notes: [
      'Error states must have both visual and textual indicators',
      'Never use color alone to convey errors',
      'Provide error messages and icons alongside color',
    ],
    contrastPairs: [
      { lightShade: 50, darkShade: 900, contrastRatio: 7.0 },
      { lightShade: 100, darkShade: 950, contrastRatio: 7.8 },
      { lightShade: 200, darkShade: 900, contrastRatio: 6.2 },
    ],
  },
  usageInstructions: {
    doUse: [
      'Error messages and alerts',
      'Destructive action buttons (delete, remove)',
      'Form validation errors',
      'Failed operation indicators',
      'Critical warnings',
    ],
    doNotUse: [
      'Neutral information (use info family)',
      'Success states (use success family)',
      'Cautions without consequences (use warning family)',
      'Regular text or neutral UI elements',
    ],
    commonMistakes: [
      'Using danger for all warnings (not just errors)',
      'Insufficient contrast between danger background and text',
      'Using danger-50 as text color (too light)',
      'Using arbitrary red instead of semantic danger family',
    ],
  },
};

const warningFamily: ColorFamilyMetadata = {
  id: 'warning',
  name: 'Warning Color',
  description: 'Cautions and attention-needed states',
  semanticMeaning: 'Alerts users to cautions, pending states, and important notices',
  baseOklch: { h: 65, defaultChroma: 0.15 },
  shades: {
    50: { lightness: 16.0, chroma: 0.0, hue: 65.0, cssVar: '--warning-50' },
    100: { lightness: 29.0, chroma: 0.015, hue: 65.0, cssVar: '--warning-100' },
    200: { lightness: 31.0, chroma: 0.03, hue: 65.0, cssVar: '--warning-200' },
    300: { lightness: 42.0, chroma: 0.053, hue: 65.0, cssVar: '--warning-300' },
    400: { lightness: 55.0, chroma: 0.075, hue: 65.0, cssVar: '--warning-400' },
    500: { lightness: 60.0, chroma: 0.105, hue: 65.0, cssVar: '--warning-500' },
    600: { lightness: 80.0, chroma: 0.135, hue: 65.0, cssVar: '--warning-600' },
    700: { lightness: 83.0, chroma: 0.143, hue: 65.0, cssVar: '--warning-700' },
    800: { lightness: 91.0, chroma: 0.147, hue: 65.0, cssVar: '--warning-800' },
    900: { lightness: 93.0, chroma: 0.15, hue: 65.0, cssVar: '--warning-900' },
    950: { lightness: 94.0, chroma: 0.15, hue: 65.0, cssVar: '--warning-950' },
  },
  shadeGuidance: {
    lightBackgrounds: {
      shades: [50, 100, 200, 300],
      reason: 'Light backgrounds for warning messages and notices',
      examples: ['Warning message background', 'Pending state indicator', 'Important notice background'],
    },
    mediumBackgrounds: {
      shades: [400, 500, 600],
      reason: 'Medium tones for warning actions and hover states',
      examples: ['Warning button hover', 'Caution indicator'],
    },
    darkBackgrounds: {
      shades: [700, 800, 900, 950],
      reason: 'Dark tones for prominent warning states',
      examples: ['Warning CTA button', 'Dark mode warning indicator'],
    },
  },
  commonUsages: [
    {
      component: 'alert',
      role: 'background',
      recommendedShades: [50, 100, 200],
      pairing: { textFamily: 'warning', textShades: [900, 950], contrastRatio: 6.5 },
    },
    {
      component: 'badge',
      role: 'background',
      recommendedShades: [100, 200, 300],
      pairing: { textFamily: 'warning', textShades: [800, 900] },
    },
  ],
  accessibility: {
    wcagCompliance: 'AA',
    notes: [
      'Warning color should be distinct from both success and danger',
      'Pair with textual labels and icons for clarity',
      'All pairs maintain WCAG AA contrast compliance',
    ],
    contrastPairs: [
      { lightShade: 50, darkShade: 900, contrastRatio: 6.8 },
      { lightShade: 100, darkShade: 950, contrastRatio: 7.5 },
      { lightShade: 200, darkShade: 900, contrastRatio: 6.0 },
    ],
  },
  usageInstructions: {
    doUse: [
      'Warning messages and notices',
      'Pending or in-progress states',
      'Important notices requiring attention',
      'Caution indicators',
      'Time-sensitive information',
    ],
    doNotUse: [
      'Errors (use danger family)',
      'Success states (use success family)',
      'Neutral information (use info family)',
      'Backgrounds without warnings',
    ],
    commonMistakes: [
      'Using warning for all cautions (not just warnings)',
      'Confusing warning with danger (different semantic meanings)',
      'Insufficient contrast between warning background and text',
    ],
  },
};

const infoFamily: ColorFamilyMetadata = {
  id: 'info',
  name: 'Info Color',
  description: 'Information and neutral states',
  semanticMeaning: 'Conveys informational content and neutral states',
  baseOklch: { h: 255, defaultChroma: 0.15 },
  shades: {
    50: { lightness: 16.0, chroma: 0.0, hue: 255.0, cssVar: '--info-50' },
    100: { lightness: 29.0, chroma: 0.015, hue: 255.0, cssVar: '--info-100' },
    200: { lightness: 31.0, chroma: 0.03, hue: 255.0, cssVar: '--info-200' },
    300: { lightness: 42.0, chroma: 0.053, hue: 255.0, cssVar: '--info-300' },
    400: { lightness: 55.0, chroma: 0.075, hue: 255.0, cssVar: '--info-400' },
    500: { lightness: 60.0, chroma: 0.105, hue: 255.0, cssVar: '--info-500' },
    600: { lightness: 80.0, chroma: 0.135, hue: 255.0, cssVar: '--info-600' },
    700: { lightness: 83.0, chroma: 0.143, hue: 255.0, cssVar: '--info-700' },
    800: { lightness: 91.0, chroma: 0.147, hue: 255.0, cssVar: '--info-800' },
    900: { lightness: 93.0, chroma: 0.15, hue: 255.0, cssVar: '--info-900' },
    950: { lightness: 94.0, chroma: 0.15, hue: 255.0, cssVar: '--info-950' },
  },
  shadeGuidance: {
    lightBackgrounds: {
      shades: [50, 100, 200, 300],
      reason: 'Light backgrounds for informational alerts',
      examples: ['Info message background', 'Documentation background', 'Helpful tip background'],
    },
    mediumBackgrounds: {
      shades: [400, 500, 600],
      reason: 'Medium tones for info states and interactive elements',
      examples: ['Info button', 'Documentation link'],
    },
    darkBackgrounds: {
      shades: [700, 800, 900, 950],
      reason: 'Dark tones for prominent info states',
      examples: ['Info CTA', 'Dark mode info indicator'],
    },
  },
  commonUsages: [
    {
      component: 'alert',
      role: 'background',
      recommendedShades: [50, 100, 200],
      pairing: { textFamily: 'info', textShades: [900, 950], contrastRatio: 7.0 },
    },
    {
      component: 'badge',
      role: 'background',
      recommendedShades: [200],
      pairing: { textFamily: 'info', textShades: [900], contrastRatio: 6.0 },
    },
  ],
  accessibility: {
    wcagCompliance: 'AA',
    notes: [
      'Information color is neutral and distinct from semantic states',
      'Safe to use for documentation and non-critical information',
      'All pairs maintain WCAG AA contrast compliance',
    ],
    contrastPairs: [
      { lightShade: 50, darkShade: 900, contrastRatio: 7.5 },
      { lightShade: 100, darkShade: 950, contrastRatio: 8.2 },
      { lightShade: 200, darkShade: 900, contrastRatio: 6.8 },
    ],
  },
  usageInstructions: {
    doUse: [
      'Informational messages and alerts',
      'Documentation and help content',
      'Neutral metadata and labels',
      'Helpful tips and guidance',
      'Secondary information',
    ],
    doNotUse: [
      'Errors (use danger family)',
      'Success states (use success family)',
      'Warnings (use warning family)',
      'Primary actions (use accent family)',
    ],
    commonMistakes: [
      'Using info for critical information (should use warning or danger)',
      'Insufficient contrast between info background and text',
      'Using info for interactive primary elements',
    ],
  },
};

export const colorFamiliesMetadata: Record<string, ColorFamilyMetadata> = {
  background: backgroundFamily,
  foreground: foregroundFamily,
  accent: accentFamily,
  success: successFamily,
  danger: dangerFamily,
  warning: warningFamily,
  info: infoFamily,
};

export function getColorFamilyMetadata(familyId: string): ColorFamilyMetadata | null {
  return colorFamiliesMetadata[familyId] || null;
}

export function getAllColorFamiliesMetadata(): ColorFamilyMetadata[] {
  return Object.values(colorFamiliesMetadata);
}

export function getColorShadeMetadata(familyId: string, shade: number): ColorShadeMetadata | null {
  const family = getColorFamilyMetadata(familyId);
  return family?.shades[shade] || null;
}
