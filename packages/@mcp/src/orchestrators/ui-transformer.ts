import * as fs from 'fs';
import * as path from 'path';
import {
  transformTailwindClasses,
  filterAbsorbedClasses,
  extractFlexProps,
  extractGridProps,
  detectButtonVariant,
} from '../utils/tailwind-mapper.js';
import {
  searchPatterns,
  getAllPatterns,
} from 'ui-lab-registry';

export interface TransformResult {
  success: boolean;
  originalCode: string;
  transformedCode: string;
  analysis: {
    componentsIdentified: string[];
    tailwindClassesMapped: number;
    tailwindClassesRemoved: number;
    uiLabComponentsAdded: string[];
    customStylesPreserved: number;
    patternsSuggested: string[];
  };
  suggestions: string[];
  warnings: string[];
}

function errorResult(message: string): TransformResult {
  return {
    success: false,
    originalCode: '',
    transformedCode: '',
    analysis: {
      componentsIdentified: [],
      tailwindClassesMapped: 0,
      tailwindClassesRemoved: 0,
      uiLabComponentsAdded: [],
      customStylesPreserved: 0,
      patternsSuggested: [],
    },
    suggestions: [],
    warnings: [message],
  };
}

export async function transformUIFile(filePath: string, context?: string): Promise<TransformResult> {
  if (!fs.existsSync(filePath)) {
    return errorResult(`File not found: ${filePath}`);
  }

  const ext = path.extname(filePath).toLowerCase();
  if (!['.tsx', '.jsx', '.ts', '.js'].includes(ext)) {
    if (ext === '.vue' || ext === '.svelte') {
      return errorResult(`Unsupported framework file: ${ext}. Transform UI supports TSX/JSX files only.`);
    }
    return errorResult(`Unsupported file type: ${ext}. Expected .tsx or .jsx`);
  }

  const originalCode = fs.readFileSync(filePath, 'utf-8');

  const componentsIdentified: string[] = [];
  const uiLabComponentsAdded = new Set<string>();
  let totalMapped = 0;
  let totalRemoved = 0;
  let totalPreserved = 0;
  const warnings: string[] = [];
  const suggestions: string[] = [];

  let code = originalCode;

  const hasStyledComponents = /import\s+styled\s+from\s+['"]styled-components['"]/.test(code);
  const hasCssModules = /import\s+\w+\s+from\s+['"][^'"]+\.module\.css['"]/.test(code);

  if (hasStyledComponents) {
    warnings.push('File uses styled-components - only className-based styles will be transformed. Styled-components require manual migration.');
  }
  if (hasCssModules) {
    warnings.push('File uses CSS modules - className template expressions will be preserved. Static className strings will be transformed.');
  }

  // Pass 1: Replace flex divs → Flex
  if (/className="[^"]*\bflex\b/.test(code)) {
    componentsIdentified.push('flex-layout');
    const flexResult = replaceFlexDivs(code);
    code = flexResult.code;
    if (flexResult.count > 0) {
      uiLabComponentsAdded.add('Flex');
      suggestions.push(`Converted ${flexResult.count} flex div(s) to Flex component with semantic gap/align/justify props`);
    }
  }

  // Pass 2: Replace grid divs → Grid
  if (/className="[^"]*\bgrid\b/.test(code)) {
    componentsIdentified.push('grid-layout');
    const gridResult = replaceGridDivs(code);
    code = gridResult.code;
    if (gridResult.count > 0) {
      uiLabComponentsAdded.add('Grid');
      suggestions.push(`Converted ${gridResult.count} grid div(s) to Grid component with columns/gap props`);
    }
  }

  // Pass 3: Replace buttons → Button
  if (/<button[\s>]/.test(code)) {
    componentsIdentified.push('button');
    const buttonResult = replaceButtons(code);
    code = buttonResult.code;
    if (buttonResult.count > 0) {
      uiLabComponentsAdded.add('Button');
    }
  }

  // Pass 4: Replace inputs → Input
  if (/<input[\s/]/.test(code)) {
    componentsIdentified.push('input');
    const inputResult = replaceInputs(code);
    code = inputResult.code;
    if (inputResult.count > 0) {
      uiLabComponentsAdded.add('Input');
    }
  }

  // Pass 5: Replace textareas → Textarea
  if (/<textarea[\s>]/.test(code)) {
    componentsIdentified.push('textarea');
    const taResult = replaceTextareas(code);
    code = taResult.code;
    if (taResult.count > 0) {
      uiLabComponentsAdded.add('Textarea');
    }
  }

  // Pass 6: Replace labels → Label
  if (/<label[\s>]/.test(code)) {
    componentsIdentified.push('label');
    const labelCount = (code.match(/<label[\s>]/g) || []).length;
    code = code.replace(/<label\b/g, '<Label');
    code = code.replace(/<\/label>/g, '</Label>');
    if (labelCount > 0) uiLabComponentsAdded.add('Label');
  }

  // Pass 7: Transform ALL remaining className="..." values (Tailwind → UI Lab)
  code = code.replace(/className="([^"]*)"/g, (_fullMatch, classValue: string) => {
    if (!classValue.trim()) return 'className=""';
    const result = transformTailwindClasses(classValue);
    totalMapped += result.mappedClasses.length;
    totalRemoved += result.removedClasses.length;
    totalPreserved += result.preservedClasses.length;
    if (!result.transformedClasses.trim()) return '';
    return `className="${result.transformedClasses}"`;
  });

  code = code.replace(/\s+className=""\s*/g, ' ');
  code = code.replace(/ {2,}/g, ' ');

  // Pass 8: Prop transformations (catch any remaining that per-element passes missed)
  // These use JSX-unaware regex, which is fine for simple attribute name substitution
  // since onClick/disabled don't contain special characters

  // Pass 9: Import management
  if (uiLabComponentsAdded.size > 0) {
    code = addUILabImports(code, Array.from(uiLabComponentsAdded));
  }

  // Pass 10: Pattern suggestions
  const patternSuggestions = suggestPatterns(componentsIdentified, originalCode, context);
  suggestions.push(...patternSuggestions.suggestions);

  // Validation warnings
  if (/<button[\s>]/.test(code) && uiLabComponentsAdded.has('Button')) {
    warnings.push('Some <button> elements remain - they may be inside template literals or dynamic expressions');
  }
  if (/\bdark:/.test(code)) {
    warnings.push('dark: prefixes detected in non-className contexts - UI Lab theme auto-inverts, these can be removed');
  }
  if (originalCode.split('\n').length > 300) {
    warnings.push('Large file - review transformations carefully, complex nesting may need manual adjustment');
  }

  return {
    success: true,
    originalCode,
    transformedCode: code,
    analysis: {
      componentsIdentified,
      tailwindClassesMapped: totalMapped,
      tailwindClassesRemoved: totalRemoved,
      uiLabComponentsAdded: Array.from(uiLabComponentsAdded),
      customStylesPreserved: totalPreserved,
      patternsSuggested: patternSuggestions.patterns,
    },
    suggestions,
    warnings,
  };
}

function findJsxTagEnd(code: string, tagStart: number): { end: number; selfClosing: boolean } | null {
  let pos = tagStart;
  while (pos < code.length && code[pos] !== ' ' && code[pos] !== '>' && code[pos] !== '/' && code[pos] !== '\n' && code[pos] !== '\t') {
    pos++;
  }

  let braceDepth = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inTemplateLiteral = false;

  while (pos < code.length) {
    const ch = code[pos];

    if (inSingleQuote) {
      if (ch === "'" && code[pos - 1] !== '\\') inSingleQuote = false;
    } else if (inDoubleQuote) {
      if (ch === '"' && code[pos - 1] !== '\\') inDoubleQuote = false;
    } else if (inTemplateLiteral) {
      if (ch === '`' && code[pos - 1] !== '\\') inTemplateLiteral = false;
    } else {
      if (ch === "'") inSingleQuote = true;
      else if (ch === '"') inDoubleQuote = true;
      else if (ch === '`') inTemplateLiteral = true;
      else if (ch === '{') braceDepth++;
      else if (ch === '}') braceDepth--;
      else if (ch === '>' && braceDepth === 0) {
        const selfClosing = pos > 0 && code[pos - 1] === '/';
        return { end: pos + 1, selfClosing };
      }
    }

    pos++;
  }

  return null;
}

function extractTagAttributes(code: string, tagStart: number): { attributes: string; tagEnd: number; selfClosing: boolean } | null {
  const tagEndInfo = findJsxTagEnd(code, tagStart);
  if (!tagEndInfo) return null;

  let nameEnd = tagStart;
  while (nameEnd < code.length && code[nameEnd] !== ' ' && code[nameEnd] !== '>' && code[nameEnd] !== '/' && code[nameEnd] !== '\n' && code[nameEnd] !== '\t') {
    nameEnd++;
  }

  const attrEnd = tagEndInfo.selfClosing ? tagEndInfo.end - 2 : tagEndInfo.end - 1;
  const attributes = code.slice(nameEnd, attrEnd).trim();

  return { attributes, tagEnd: tagEndInfo.end, selfClosing: tagEndInfo.selfClosing };
}

function findMatchingCloseTag(code: string, openingTagStart: number, tagName: string): number {
  const tagEndInfo = findJsxTagEnd(code, openingTagStart);
  if (!tagEndInfo || tagEndInfo.selfClosing) return -1;

  let pos = tagEndInfo.end;
  let depth = 1;
  const openPattern = `<${tagName}`;
  const closePattern = `</${tagName}>`;

  while (depth > 0 && pos < code.length) {
    const nextOpen = code.indexOf(openPattern, pos);
    const nextClose = code.indexOf(closePattern, pos);

    if (nextClose === -1) return -1;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      const charAfter = code[nextOpen + openPattern.length];
      if (charAfter && /[\s>\/\n\t]/.test(charAfter)) {
        const innerTagEnd = findJsxTagEnd(code, nextOpen);
        if (innerTagEnd && !innerTagEnd.selfClosing) {
          depth++;
        }
      }
      pos = (nextOpen + openPattern.length) > pos ? nextOpen + openPattern.length : pos + 1;
    } else {
      depth--;
      if (depth === 0) return nextClose;
      pos = nextClose + closePattern.length;
    }
  }

  return -1;
}

function findDivTagsWithClass(code: string, classPattern: RegExp): Array<{
  index: number;
  fullTagEnd: number;
  attributes: string;
  selfClosing: boolean;
}> {
  const matches: Array<{ index: number; fullTagEnd: number; attributes: string; selfClosing: boolean }> = [];
  let searchStart = 0;

  while (true) {
    const idx = code.indexOf('<div', searchStart);
    if (idx === -1) break;

    const charAfter = code[idx + 4];
    if (charAfter && !/[\s>\/\n\t]/.test(charAfter)) {
      searchStart = idx + 1;
      continue;
    }

    const tagInfo = extractTagAttributes(code, idx);
    if (!tagInfo) {
      searchStart = idx + 1;
      continue;
    }

    const classMatch = tagInfo.attributes.match(/className="([^"]*)"/);
    if (classMatch && classPattern.test(classMatch[1])) {
      matches.push({
        index: idx,
        fullTagEnd: tagInfo.tagEnd,
        attributes: tagInfo.attributes,
        selfClosing: tagInfo.selfClosing,
      });
    }

    searchStart = tagInfo.tagEnd;
  }

  return matches;
}

function replaceFlexDivs(code: string): { code: string; count: number } {
  let count = 0;
  let result = code;

  const matches = findDivTagsWithClass(result, /\bflex\b/);

  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    const classMatch = m.attributes.match(/className="([^"]*)"/);
    if (!classMatch) continue;

    const classes = classMatch[1].split(/\s+/).filter(Boolean);
    if (!classes.includes('flex')) continue;

    const flexProps = extractFlexProps(classes);
    const { remaining } = filterAbsorbedClasses(classes, 'flex');

    let propsStr = '';
    if (flexProps.direction) propsStr += ` direction="${flexProps.direction}"`;
    if (flexProps.gap) propsStr += ` gap="${flexProps.gap}"`;
    if (flexProps.align) propsStr += ` align="${flexProps.align}"`;
    if (flexProps.justify) propsStr += ` justify="${flexProps.justify}"`;
    if (flexProps.wrap) propsStr += ` wrap="${flexProps.wrap}"`;

    const otherAttrs = m.attributes.replace(/className="[^"]*"/, '').trim();
    const classStr = remaining.length > 0 ? ` className="${remaining.join(' ')}"` : '';
    const otherStr = otherAttrs ? ` ${otherAttrs}` : '';

    const newOpening = `<Flex${propsStr}${classStr}${otherStr}>`;

    if (!m.selfClosing) {
      const closingIndex = findMatchingCloseTag(result, m.index, 'div');
      if (closingIndex !== -1) {
        result = result.slice(0, closingIndex) + '</Flex>' + result.slice(closingIndex + '</div>'.length);
      }
    }
    result = result.slice(0, m.index) + newOpening + result.slice(m.fullTagEnd);

    count++;
  }

  return { code: result, count };
}

function replaceGridDivs(code: string): { code: string; count: number } {
  let count = 0;
  let result = code;

  const matches = findDivTagsWithClass(result, /\bgrid\b/);

  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    const classMatch = m.attributes.match(/className="([^"]*)"/);
    if (!classMatch) continue;

    const classes = classMatch[1].split(/\s+/).filter(Boolean);
    if (!classes.includes('grid')) continue;

    const gridProps = extractGridProps(classes);
    const { remaining } = filterAbsorbedClasses(classes, 'grid');

    let propsStr = '';
    if (gridProps.columns) propsStr += ` columns="${gridProps.columns}"`;
    if (gridProps.rows) propsStr += ` rows="${gridProps.rows}"`;
    if (gridProps.gap) propsStr += ` gap="${gridProps.gap}"`;

    const otherAttrs = m.attributes.replace(/className="[^"]*"/, '').trim();
    const classStr = remaining.length > 0 ? ` className="${remaining.join(' ')}"` : '';
    const otherStr = otherAttrs ? ` ${otherAttrs}` : '';

    const newOpening = `<Grid${propsStr}${classStr}${otherStr}>`;

    if (!m.selfClosing) {
      const closingIndex = findMatchingCloseTag(result, m.index, 'div');
      if (closingIndex !== -1) {
        result = result.slice(0, closingIndex) + '</Grid>' + result.slice(closingIndex + '</div>'.length);
      }
    }
    result = result.slice(0, m.index) + newOpening + result.slice(m.fullTagEnd);

    count++;
  }

  return { code: result, count };
}

function findAllTagOccurrences(code: string, tagName: string): Array<{
  index: number;
  fullTagEnd: number;
  attributes: string;
  selfClosing: boolean;
}> {
  const matches: Array<{ index: number; fullTagEnd: number; attributes: string; selfClosing: boolean }> = [];
  let searchStart = 0;
  const pattern = `<${tagName}`;

  while (true) {
    const idx = code.indexOf(pattern, searchStart);
    if (idx === -1) break;

    const charAfter = code[idx + pattern.length];
    if (charAfter && !/[\s>\/\n\t]/.test(charAfter)) {
      searchStart = idx + 1;
      continue;
    }

    const tagInfo = extractTagAttributes(code, idx);
    if (!tagInfo) {
      searchStart = idx + 1;
      continue;
    }

    matches.push({
      index: idx,
      fullTagEnd: tagInfo.tagEnd,
      attributes: tagInfo.attributes,
      selfClosing: tagInfo.selfClosing,
    });

    searchStart = tagInfo.tagEnd;
  }

  return matches;
}

function replaceButtons(code: string): { code: string; count: number } {
  let count = 0;
  let result = code;

  const matches = findAllTagOccurrences(result, 'button');

  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    let attrs = m.attributes;

    const classMatch = attrs.match(/className="([^"]*)"/);
    let variant: string | undefined;

    if (classMatch) {
      const classes = classMatch[1].split(/\s+/).filter(Boolean);
      variant = detectButtonVariant(classes);
      const { remaining } = filterAbsorbedClasses(classes, 'button');

      if (remaining.length > 0) {
        attrs = attrs.replace(/className="[^"]*"/, `className="${remaining.join(' ')}"`);
      } else {
        attrs = attrs.replace(/\s*className="[^"]*"/, '');
      }
    }

    attrs = attrs.replace(/\bonClick\b/g, 'onPress');
    attrs = attrs.replace(/\bdisabled\b(?!=)/g, 'isDisabled');

    const variantStr = variant ? ` variant="${variant}"` : '';
    const attrStr = attrs.trim() ? ` ${attrs.trim()}` : '';
    const newTag = m.selfClosing
      ? `<Button${variantStr}${attrStr} />`
      : `<Button${variantStr}${attrStr}>`;

    if (!m.selfClosing) {
      const closingIndex = findMatchingCloseTag(result, m.index, 'button');
      if (closingIndex !== -1) {
        result = result.slice(0, closingIndex) + '</Button>' + result.slice(closingIndex + '</button>'.length);
      }
    }

    result = result.slice(0, m.index) + newTag + result.slice(m.fullTagEnd);
    count++;
  }

  return { code: result, count };
}

function replaceInputs(code: string): { code: string; count: number } {
  let count = 0;
  let result = code;

  const matches = findAllTagOccurrences(result, 'input');

  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    let attrs = m.attributes;

    const classMatch = attrs.match(/className="([^"]*)"/);
    if (classMatch) {
      const classes = classMatch[1].split(/\s+/).filter(Boolean);
      const { remaining } = filterAbsorbedClasses(classes, 'input');
      if (remaining.length > 0) {
        attrs = attrs.replace(/className="[^"]*"/, `className="${remaining.join(' ')}"`);
      } else {
        attrs = attrs.replace(/\s*className="[^"]*"/, '');
      }
    }

    attrs = attrs.replace(/\bdisabled\b(?!=)/g, 'isDisabled');

    const attrStr = attrs.trim() ? ` ${attrs.trim()}` : '';
    const newTag = `<Input${attrStr} />`;

    result = result.slice(0, m.index) + newTag + result.slice(m.fullTagEnd);
    count++;
  }

  return { code: result, count };
}

function replaceTextareas(code: string): { code: string; count: number } {
  let count = 0;
  let result = code;

  const matches = findAllTagOccurrences(result, 'textarea');

  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    let attrs = m.attributes;

    const classMatch = attrs.match(/className="([^"]*)"/);
    if (classMatch) {
      const classes = classMatch[1].split(/\s+/).filter(Boolean);
      const { remaining } = filterAbsorbedClasses(classes, 'textarea');
      if (remaining.length > 0) {
        attrs = attrs.replace(/className="[^"]*"/, `className="${remaining.join(' ')}"`);
      } else {
        attrs = attrs.replace(/\s*className="[^"]*"/, '');
      }
    }

    attrs = attrs.replace(/\bdisabled\b(?!=)/g, 'isDisabled');

    const attrStr = attrs.trim() ? ` ${attrs.trim()}` : '';

    if (m.selfClosing) {
      result = result.slice(0, m.index) + `<Textarea${attrStr} />` + result.slice(m.fullTagEnd);
    } else {
      const closingIndex = findMatchingCloseTag(result, m.index, 'textarea');
      if (closingIndex !== -1) {
        result = result.slice(0, closingIndex) + '</Textarea>' + result.slice(closingIndex + '</textarea>'.length);
      }
      result = result.slice(0, m.index) + `<Textarea${attrStr}>` + result.slice(m.fullTagEnd);
    }

    count++;
  }

  return { code: result, count };
}

function addUILabImports(code: string, components: string[]): string {
  const sorted = [...components].sort();
  const importLine = `import { ${sorted.join(', ')} } from 'ui-lab-components'`;

  const existingImport = code.match(/import\s*\{([^}]*)\}\s*from\s*['"]ui-lab-components['"]/);
  if (existingImport) {
    const existing = existingImport[1].split(',').map(s => s.trim()).filter(Boolean);
    const merged = [...new Set([...existing, ...sorted])].sort();
    return code.replace(existingImport[0], `import { ${merged.join(', ')} } from 'ui-lab-components'`);
  }

  const importRegex = /^import\s+.*?from\s+['"][^'"]+['"];?\s*$/gm;
  const importMatches = Array.from(code.matchAll(importRegex));

  if (importMatches.length > 0) {
    const lastImport = importMatches[importMatches.length - 1];
    const insertPos = lastImport.index! + lastImport[0].length;
    return code.slice(0, insertPos) + '\n' + importLine + code.slice(insertPos);
  }

  return importLine + '\n\n' + code;
}

interface PatternSuggestionResult {
  patterns: string[];
  suggestions: string[];
}

function suggestPatterns(
  componentsIdentified: string[],
  originalCode: string,
  context?: string
): PatternSuggestionResult {
  const patterns: string[] = [];
  const suggestions: string[] = [];

  try {
    const allPatterns = getAllPatterns();

    const hasHeroSignals = /\b(hero|headline|cta|call.to.action)\b/i.test(originalCode) ||
      (componentsIdentified.includes('button') && /\b(h1|h2)\b/i.test(originalCode));

    const hasFeatureGrid = componentsIdentified.includes('grid-layout') &&
      (originalCode.includes('feature') || originalCode.includes('card'));

    const hasForm = componentsIdentified.includes('input') && componentsIdentified.includes('button');

    const hasPricing = /\b(pricing|plan|tier|subscription|month|year)\b/i.test(originalCode);

    const hasNavigation = /\b(nav|header|sticky|fixed)\b/i.test(originalCode) ||
      /<nav[\s>]/.test(originalCode) ||
      /<header[\s>]/.test(originalCode);

    for (const pattern of allPatterns) {
      let matched = false;
      let reason = '';

      if (pattern.id === 'hero-with-cta' && hasHeroSignals) {
        matched = true;
        reason = 'Detected hero section with headline and CTA buttons';
      } else if (pattern.id === 'feature-grid' && hasFeatureGrid) {
        matched = true;
        reason = 'Detected grid layout with card-like feature items';
      } else if (pattern.id === 'settings-form-layout' && hasForm) {
        matched = true;
        reason = 'Detected form with inputs and submit button';
      } else if (pattern.id === 'pricing-cards' && hasPricing) {
        matched = true;
        reason = 'Detected pricing/plan/tier content';
      } else if (pattern.id === 'sticky-header' && hasNavigation) {
        matched = true;
        reason = 'Detected navigation/header structure';
      }

      if (matched) {
        patterns.push(pattern.id);
        suggestions.push(`Pattern match: "${pattern.name}" - ${reason}. Uses: ${pattern.components.join(', ')}`);
      }
    }

    if (context) {
      const contextMatches = searchPatterns(context);
      for (const match of contextMatches) {
        if (!patterns.includes(match.id)) {
          patterns.push(match.id);
          suggestions.push(`Context match: "${match.name}" - matches your description "${context}". Components: ${match.components.join(', ')}`);
        }
      }
    }
  } catch {
    // Pattern registry unavailable
  }

  return { patterns, suggestions };
}
