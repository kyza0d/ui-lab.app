const GRAYSCALE_FAMILIES = new Set(['gray', 'slate', 'zinc', 'neutral', 'stone']);

const COLOR_TO_SEMANTIC: Record<string, string> = {
  blue: 'accent',
  indigo: 'accent',
  violet: 'accent',
  purple: 'accent',
  red: 'danger',
  rose: 'danger',
  green: 'success',
  emerald: 'success',
  yellow: 'warning',
  amber: 'warning',
  orange: 'warning',
  sky: 'info',
  cyan: 'info',
  teal: 'info',
};

const SHADES = new Set(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']);

const SHADE_INVERSION: Record<string, string> = {
  '50': '950',
  '100': '900',
  '200': '800',
  '300': '700',
  '400': '600',
  '500': '500',
  '600': '400',
  '700': '300',
  '800': '200',
  '900': '100',
  '950': '50',
};

const REMOVED_PATTERNS = [
  /^shadow(?:-.*)?$/,
  /^drop-shadow(?:-.*)?$/,
  /^from-/,
  /^to-/,
  /^via-/,
  /^bg-gradient-/,
];

const GAP_TO_SPACING: Record<string, string> = {
  '0': '0',
  '0.5': 'xs',
  '1': 'xs',
  '1.5': 'xs',
  '2': 'sm',
  '3': 'sm',
  '4': 'md',
  '5': 'md',
  '6': 'lg',
  '8': 'xl',
  '10': 'xl',
  '12': 'xl',
  '16': 'xl',
};

export interface TailwindTransformResult {
  transformedClasses: string;
  removedClasses: string[];
  mappedClasses: Array<{ from: string; to: string }>;
  preservedClasses: string[];
}

function invertShade(shade: string): string {
  return SHADE_INVERSION[shade] || shade;
}

function clampBackgroundShade(shade: string): string {
  const num = parseInt(shade);
  if (num < 500) return '500';
  return shade;
}

function clampForegroundShade(shade: string): string {
  const num = parseInt(shade);
  if (num > 600) return '600';
  return shade;
}

export function transformTailwindClasses(className: string): TailwindTransformResult {
  const classes = className.split(/\s+/).filter(Boolean);
  const result: TailwindTransformResult = {
    transformedClasses: '',
    removedClasses: [],
    mappedClasses: [],
    preservedClasses: [],
  };

  const outputClasses: string[] = [];

  for (const cls of classes) {
    if (cls.startsWith('dark:')) {
      result.removedClasses.push(cls);
      continue;
    }

    const base = stripStatePrefix(cls);
    if (REMOVED_PATTERNS.some(p => p.test(base))) {
      result.removedClasses.push(cls);
      continue;
    }

    const transformed = transformColorClass(cls);
    if (transformed !== cls) {
      result.mappedClasses.push({ from: cls, to: transformed });
      outputClasses.push(transformed);
      continue;
    }

    result.preservedClasses.push(cls);
    outputClasses.push(cls);
  }

  result.transformedClasses = outputClasses.join(' ');
  return result;
}

function stripStatePrefix(cls: string): string {
  return cls.replace(/^(?:hover:|focus:|active:|disabled:|group-hover:|focus-within:|focus-visible:)+/, '');
}

function transformColorClass(cls: string): string {
  let prefix = '';
  let baseClass = cls;

  const stateMatch = cls.match(/^((?:hover:|focus:|active:|disabled:|focus-within:|focus-visible:)+)/);
  if (stateMatch) {
    prefix = stateMatch[1];
    baseClass = cls.slice(prefix.length);
  }

  if (baseClass === 'bg-white') return prefix + 'bg-background-950';
  if (baseClass === 'bg-black') return prefix + 'bg-background-500';
  if (baseClass === 'text-white') return prefix + 'text-foreground-50';
  if (baseClass === 'text-black') return prefix + 'text-foreground-50';
  if (baseClass === 'border-white') return prefix + 'border-background-700';
  if (baseClass === 'border-black') return prefix + 'border-background-700';

  const colorMatch = baseClass.match(/^(bg|text|border|ring|outline|divide)-(\w+)-(\d+)$/);
  if (colorMatch) {
    const [, utilityPrefix, color, shade] = colorMatch;

    if (!SHADES.has(shade)) return cls;

    if (GRAYSCALE_FAMILIES.has(color)) {
      if (utilityPrefix === 'bg') {
        const inverted = clampBackgroundShade(invertShade(shade));
        return prefix + `bg-background-${inverted}`;
      }
      if (utilityPrefix === 'text') {
        const inverted = clampForegroundShade(invertShade(shade));
        return prefix + `text-foreground-${inverted}`;
      }
      if (utilityPrefix === 'border' || utilityPrefix === 'divide') {
        return prefix + `${utilityPrefix}-background-700`;
      }
      if (utilityPrefix === 'ring' || utilityPrefix === 'outline') {
        return prefix + `${utilityPrefix}-background-700`;
      }
    }

    const semantic = COLOR_TO_SEMANTIC[color];
    if (semantic) {
      return prefix + `${utilityPrefix}-${semantic}-${shade}`;
    }
  }

  return cls;
}

export function gapClassToSpacing(gapClass: string): string | undefined {
  const match = gapClass.match(/^gap-(?:x-|y-)?(\d+(?:\.\d+)?)$/);
  if (!match) return undefined;
  return GAP_TO_SPACING[match[1]];
}

export function detectButtonVariant(classes: string[]): string | undefined {
  const hasBg = classes.some(c => /^bg-(blue|indigo|violet|purple|accent)-/.test(c));
  const hasDanger = classes.some(c => /^bg-(red|rose|danger)-/.test(c));
  const hasSuccess = classes.some(c => /^bg-(green|emerald|success)-/.test(c));
  const hasGhost = classes.some(c => c === 'bg-transparent') ||
    (!classes.some(c => c.startsWith('bg-')) && classes.some(c => c.startsWith('text-')));
  const hasOutline = classes.some(c => c.startsWith('border')) &&
    !classes.some(c => c.startsWith('bg-') && !c.includes('transparent'));

  if (hasDanger) return 'danger';
  if (hasSuccess) return 'success';
  if (hasBg) return 'primary';
  if (hasOutline) return 'outline';
  if (hasGhost) return 'ghost';

  const hasGrayBg = classes.some(c => /^bg-(gray|slate|zinc|neutral|stone)-/.test(c));
  if (hasGrayBg) return 'secondary';

  return undefined;
}

const BUTTON_ABSORBED = [
  /^bg-/,
  /^text-(white|foreground|gray|slate|zinc|neutral|stone|black)/,
  /^px-/,
  /^py-/,
  /^p-\d/,
  /^rounded/,
  /^hover:/,
  /^focus:/,
  /^active:/,
  /^cursor-/,
  /^font-(medium|semibold|bold)/,
  /^border(?:-|$)/,
  /^outline-/,
  /^ring-/,
  /^transition/,
  /^duration-/,
  /^ease-/,
  /^disabled:/,
  /^text-sm$/,
  /^text-xs$/,
  /^text-base$/,
  /^text-lg$/,
  /^inline-flex$/,
  /^items-center$/,
  /^justify-center$/,
  /^gap-\d/,
];

const INPUT_ABSORBED = [
  /^border(?:-|$)/,
  /^rounded/,
  /^bg-(white|foreground|background|gray|slate|zinc|neutral|stone)/,
  /^px-/,
  /^py-/,
  /^p-\d/,
  /^focus:/,
  /^text-(foreground|gray|slate|zinc|neutral|stone)/,
  /^outline-/,
  /^ring-/,
  /^placeholder-/,
  /^transition/,
  /^duration-/,
  /^text-sm$/,
  /^text-base$/,
];

const FLEX_ABSORBED = [
  /^flex$/,
  /^flex-row$/,
  /^flex-col$/,
  /^flex-col-reverse$/,
  /^flex-row-reverse$/,
  /^flex-wrap$/,
  /^flex-nowrap$/,
  /^gap-/,
  /^items-/,
  /^justify-/,
  /^space-x-/,
  /^space-y-/,
];

const GRID_ABSORBED = [
  /^grid$/,
  /^grid-cols-/,
  /^grid-rows-/,
  /^gap-/,
];

export function filterAbsorbedClasses(
  classes: string[],
  componentType: 'button' | 'input' | 'textarea' | 'flex' | 'grid' | 'label'
): { remaining: string[]; absorbed: string[] } {
  let patterns: RegExp[];

  switch (componentType) {
    case 'button':
      patterns = BUTTON_ABSORBED;
      break;
    case 'input':
    case 'textarea':
      patterns = INPUT_ABSORBED;
      break;
    case 'flex':
      patterns = FLEX_ABSORBED;
      break;
    case 'grid':
      patterns = GRID_ABSORBED;
      break;
    case 'label':
      patterns = [/^text-sm$/, /^font-medium$/, /^text-(foreground|gray|slate|zinc)/];
      break;
    default:
      return { remaining: classes, absorbed: [] };
  }

  const remaining: string[] = [];
  const absorbed: string[] = [];

  for (const cls of classes) {
    if (patterns.some(p => p.test(cls))) {
      absorbed.push(cls);
    } else {
      remaining.push(cls);
    }
  }

  return { remaining, absorbed };
}

export interface FlexProps {
  direction?: string;
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: string;
}

export function extractFlexProps(classes: string[]): FlexProps {
  const props: FlexProps = {};

  for (const cls of classes) {
    if (cls === 'flex-col') props.direction = 'column';
    if (cls === 'flex-col-reverse') props.direction = 'column-reverse';
    if (cls === 'flex-row-reverse') props.direction = 'row-reverse';

    const gapMatch = cls.match(/^gap-(\d+(?:\.\d+)?)$/);
    if (gapMatch && GAP_TO_SPACING[gapMatch[1]]) {
      props.gap = GAP_TO_SPACING[gapMatch[1]];
    }

    if (cls === 'items-center') props.align = 'center';
    if (cls === 'items-start') props.align = 'start';
    if (cls === 'items-end') props.align = 'end';
    if (cls === 'items-stretch') props.align = 'stretch';
    if (cls === 'items-baseline') props.align = 'baseline';

    if (cls === 'justify-center') props.justify = 'center';
    if (cls === 'justify-between') props.justify = 'between';
    if (cls === 'justify-around') props.justify = 'around';
    if (cls === 'justify-evenly') props.justify = 'evenly';
    if (cls === 'justify-end') props.justify = 'end';
    if (cls === 'justify-start') props.justify = 'start';

    if (cls === 'flex-wrap') props.wrap = 'wrap';
    if (cls === 'flex-nowrap') props.wrap = 'nowrap';
  }

  return props;
}

export interface GridProps {
  columns?: string;
  gap?: string;
  rows?: string;
}

export function extractGridProps(classes: string[]): GridProps {
  const props: GridProps = {};

  for (const cls of classes) {
    const colMatch = cls.match(/^grid-cols-(\d+)$/);
    if (colMatch) props.columns = colMatch[1];

    const rowMatch = cls.match(/^grid-rows-(\d+)$/);
    if (rowMatch) props.rows = rowMatch[1];

    const gapMatch = cls.match(/^gap-(\d+(?:\.\d+)?)$/);
    if (gapMatch && GAP_TO_SPACING[gapMatch[1]]) {
      props.gap = GAP_TO_SPACING[gapMatch[1]];
    }
  }

  return props;
}
