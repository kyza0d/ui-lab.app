import {
  elementsList,
  getAllSections,
  getAllPatterns,
  getElementById,
  getSectionById,
  getPatternById,
} from 'ui-lab-registry';

export interface VariationSummary {
  index: number;      // 1-based, matches "01-basic" convention
  name: string;
  id?: string;        // patterns only (e.g. "media-object-sm")
  demoPath?: string;  // elements/sections only (e.g. "chat-basic")
}

export interface Inspiration {
  id: string;
  type: 'element' | 'section' | 'pattern';
  category: string;
  purpose: string;
  tags: string[];
  codeStructureHint: string;
  relevanceScore: number;
  bestFor: string[];
  variationsSummary: VariationSummary[];
}

export interface InspirationSearchResult {
  matches: Inspiration[];
  query: string;
  totalMatches: number;
}

export interface VariationFile {
  filename: string;
  code: string;
  isEntryPoint?: boolean;
}

export interface VariationCodeResult {
  type: 'element' | 'section' | 'pattern';
  id: string;
  variationName: string;
  /** For patterns: single code string. For elements/sections: all files for this variation. */
  code?: string;
  files?: VariationFile[];
  notes?: string;
}

// ─── Synonyms ─────────────────────────────────────────────────────────────────

const SYNONYMS: Record<string, string[]> = {
  dropdown: ['select', 'group', 'combobox', 'menu'],
  checkbox: ['checkbox', 'list', 'selection'],
  table: ['list', 'table', 'data-table', 'row'],
  filter: ['filter', 'select', 'search'],
  modal: ['modal', 'confirmation', 'dialog'],
  dialog: ['modal', 'confirmation'],
  auth: ['auth', 'login', 'form'],
  form: ['form', 'input', 'field', 'labeled'],
  navigation: ['sidebar', 'header', 'navigation', 'menu'],
  pagination: ['pagination', 'data-table'],
  empty: ['empty', 'zero-state', 'feedback'],
  card: ['card', 'media-object', 'stat-block'],
  notification: ['notification', 'alert', 'inline-alert'],
  progress: ['progress', 'progress-metric'],
  file: ['list', 'data-table', 'filter', 'media-object'],
  selection: ['list', 'checkbox', 'select'],
  layout: ['layout', 'media-object', 'split-row', 'stat-block'],
  hero: ['hero', 'landing', 'cta'],
  pricing: ['pricing', 'cta'],
};

// ─── Structure hint builders ───────────────────────────────────────────────────

function extractPatternStructure(code: string, name: string): string {
  const fnMatch = code.match(/function\s+(\w+)\s*\(/);
  const fnName = fnMatch?.[1] ?? null;

  const importMatch = code.match(/import\s*\{([^}]+)\}\s*from/);
  if (importMatch) {
    const components = importMatch[1]
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    if (components.length > 0) {
      const base = fnName ?? name;
      return components.some(c => c === fnName)
        ? components.join(' | ')
        : `${base} [uses: ${components.join(', ')}]`;
    }
  }
  return fnName ?? name;
}

function buildElementStructure(el: any): string {
  const firstVariant = el.variants?.[0];
  if (firstVariant?.files?.length) {
    const subComponents = firstVariant.files
      .filter((f: any) => !f.isEntryPoint && f.filename !== 'index.tsx')
      .map((f: any) => f.filename.replace(/\.tsx?$/, ''))
      .filter((n: string) => n.length > 0)
      .slice(0, 4);
    if (subComponents.length > 0) {
      return [el.name, ...subComponents].join(' | ');
    }
  }
  if (el.componentDependencies?.length) {
    return [el.name, ...el.componentDependencies.slice(0, 3)].join(' | ');
  }
  return el.name;
}

function buildSectionStructure(s: any): string {
  if (s.componentDependencies?.length) {
    return [s.name, ...s.componentDependencies.slice(0, 3)].join(' | ');
  }
  const variantCount = s.variants?.length ?? 0;
  return variantCount > 1 ? `${s.name} (${variantCount} variations)` : s.name;
}

// ─── Variation summary builders ────────────────────────────────────────────────

function elementVariationsSummary(el: any): VariationSummary[] {
  return (el.variants ?? []).map((v: any, i: number) => ({
    index: i + 1,
    name: v.name,
    demoPath: v.demoPath,
  }));
}

function patternVariationsSummary(p: any): VariationSummary[] {
  return (p.variations ?? []).map((v: any, i: number) => ({
    index: i + 1,
    name: v.name,
    id: v.id,
  }));
}

// ─── Best-for inference ────────────────────────────────────────────────────────

function inferBestFor(tags: string[], category: string): string[] {
  const result = new Set<string>([category, ...tags.slice(0, 3)]);
  return Array.from(result).slice(0, 4);
}

// ─── Cache ────────────────────────────────────────────────────────────────────

let cache: Inspiration[] | null = null;

function buildCache(): Inspiration[] {
  const result: Inspiration[] = [];

  try {
    for (const el of elementsList) {
      result.push({
        id: el.id,
        type: 'element',
        category: el.category,
        purpose: el.description,
        tags: el.tags,
        codeStructureHint: buildElementStructure(el),
        relevanceScore: 0,
        bestFor: inferBestFor(el.tags, el.category),
        variationsSummary: elementVariationsSummary(el),
      });
    }
  } catch {}

  try {
    for (const s of getAllSections()) {
      result.push({
        id: s.id,
        type: 'section',
        category: s.category,
        purpose: s.description,
        tags: s.tags,
        codeStructureHint: buildSectionStructure(s),
        relevanceScore: 0,
        bestFor: inferBestFor(s.tags, s.category),
        variationsSummary: elementVariationsSummary(s),
      });
    }
  } catch {}

  try {
    for (const p of getAllPatterns()) {
      result.push({
        id: p.id,
        type: 'pattern',
        category: p.category,
        purpose: p.description,
        tags: p.tags,
        codeStructureHint: extractPatternStructure((p as any).code || '', p.name),
        relevanceScore: 0,
        bestFor: inferBestFor(p.tags, p.category),
        variationsSummary: patternVariationsSummary(p),
      });
    }
  } catch {}

  return result;
}

export function loadInspirationsCache(): void {
  if (!cache) {
    cache = buildCache();
  }
}

// ─── Search ───────────────────────────────────────────────────────────────────

function expandQuery(query: string): string[] {
  const lower = query.toLowerCase();
  return [lower, ...(SYNONYMS[lower] ?? [])];
}

function scoreItem(item: Inspiration, queries: string[]): number {
  const id = item.id.toLowerCase();
  const normalizedId = id.replace(/-/g, ' ');
  const purposeLower = item.purpose.toLowerCase();
  const tagsLower = item.tags.map(t => t.toLowerCase());
  const categoryLower = item.category.toLowerCase();

  let best = 0;

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    const mult = i === 0 ? 1 : 0.6;

    if (id === q || normalizedId === q) best = Math.max(best, 100 * mult);
    else if (id.startsWith(q) || normalizedId.startsWith(q)) best = Math.max(best, 85 * mult);
    else if (id.includes(q) || normalizedId.includes(q)) best = Math.max(best, 75 * mult);
    else if (tagsLower.some(t => t === q)) best = Math.max(best, 65 * mult);
    else if (categoryLower === q || categoryLower.includes(q)) best = Math.max(best, 55 * mult);
    else if (tagsLower.some(t => t.includes(q) || q.includes(t))) best = Math.max(best, 45 * mult);
    else if (purposeLower.includes(q)) best = Math.max(best, 30 * mult);
  }

  return Math.round(best);
}

export function searchInspirations(
  query: string,
  category?: 'elements' | 'sections' | 'patterns' | 'all',
  limit = 10
): InspirationSearchResult {
  loadInspirationsCache();
  const items = cache ?? [];
  const queries = expandQuery(query);
  const cat = category ?? 'all';

  const filtered =
    cat === 'all'
      ? items
      : items.filter(item => {
          if (cat === 'elements') return item.type === 'element';
          if (cat === 'sections') return item.type === 'section';
          if (cat === 'patterns') return item.type === 'pattern';
          return true;
        });

  const scored = filtered
    .map(item => ({ ...item, relevanceScore: scoreItem(item, queries) }))
    .filter(item => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return { matches: scored, query, totalMatches: scored.length };
}

// ─── Variation code fetcher ────────────────────────────────────────────────────

/**
 * Resolve a variation specifier to a 0-based index within a variants/variations array.
 * Accepts:
 *   - "1", "2", "3"   → 1-based numeric index
 *   - exact id/demoPath string (patterns / elements)
 *   - case-insensitive substring of variation name
 */
function resolveVariationIndex(
  specifier: string,
  items: Array<{ name?: string; id?: string; demoPath?: string }>
): number {
  const num = parseInt(specifier, 10);
  if (!isNaN(num)) return Math.max(0, num - 1);

  const lower = specifier.toLowerCase();
  // exact id match (patterns)
  let idx = items.findIndex(v => v.id?.toLowerCase() === lower);
  if (idx !== -1) return idx;
  // exact demoPath match (elements/sections)
  idx = items.findIndex(v => v.demoPath?.toLowerCase() === lower);
  if (idx !== -1) return idx;
  // name substring
  idx = items.findIndex(v => v.name?.toLowerCase().includes(lower));
  return idx;
}

export function getVariationCode(
  type: 'element' | 'section' | 'pattern',
  id: string,
  variation?: string
): VariationCodeResult | null {
  if (type === 'pattern') {
    const pattern = getPatternById(id) as any;
    if (!pattern) return null;

    // No variation specified → return main pattern code
    if (!variation) {
      return {
        type: 'pattern',
        id,
        variationName: pattern.name,
        code: pattern.code,
        notes: pattern.notes,
      };
    }

    const varIdx = resolveVariationIndex(variation, pattern.variations ?? []);
    const v = pattern.variations?.[varIdx];
    if (!v) return null;

    return {
      type: 'pattern',
      id,
      variationName: v.name,
      code: v.code,
    };
  }

  if (type === 'element') {
    const el = getElementById(id) as any;
    if (!el) return null;

    const variants = el.variants ?? [];
    const varIdx = variation ? resolveVariationIndex(variation, variants) : 0;
    const v = variants[Math.max(0, varIdx)];
    if (!v) return null;

    return {
      type: 'element',
      id,
      variationName: v.name,
      files: (v.files ?? []).map((f: any) => ({
        filename: f.filename,
        code: f.code,
        isEntryPoint: f.isEntryPoint,
      })),
    };
  }

  if (type === 'section') {
    const section = getSectionById(id) as any;
    if (!section) return null;

    const variants = section.variants ?? [];
    const varIdx = variation ? resolveVariationIndex(variation, variants) : 0;
    const v = variants[Math.max(0, varIdx)];
    if (!v) return null;

    return {
      type: 'section',
      id,
      variationName: v.name,
      files: (v.files ?? []).map((f: any) => ({
        filename: f.filename,
        code: f.code,
        isEntryPoint: f.isEntryPoint,
      })),
    };
  }

  return null;
}
