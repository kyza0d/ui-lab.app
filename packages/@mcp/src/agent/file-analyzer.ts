/**
 * File Analyzer Module
 * Parses existing code files and extracts UI patterns, components, and styling approaches
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Represents an identified component or UI element in the code
 */
export interface IdentifiedComponent {
  name: string;
  type: 'native' | 'custom' | 'third-party';
  props: Record<string, string | boolean | number>;
  children?: string;
  startLine: number;
  endLine: number;
  source: string;
  styling?: {
    className?: string;
    inlineStyles?: Record<string, string>;
    cssModule?: string;
  };
}

/**
 * Styling approach detected in the file
 */
export type StylingApproach = 'inline' | 'className' | 'css-module' | 'styled-components' | 'tailwind' | 'mixed';

/**
 * Detected UI pattern in the code
 */
export interface UIPattern {
  type: 'button-group' | 'form' | 'card' | 'modal' | 'navigation' | 'layout' | 'list' | 'custom';
  description: string;
  components: string[];
  confidence: number; // 0-1
  location: { startLine: number; endLine: number };
}

/**
 * Complete analysis result for a file
 */
export interface FileAnalysisResult {
  filePath: string;
  language: 'jsx' | 'tsx' | 'javascript' | 'typescript' | 'vue' | 'unknown';
  totalLines: number;
  components: IdentifiedComponent[];
  patterns: UIPattern[];
  styling: {
    approaches: StylingApproach[];
    tailwindDetected: boolean;
    cssModulesDetected: boolean;
    styledComponentsDetected: boolean;
  };
  imports: string[];
  exports: string[];
  warnings: string[];
  summary: {
    totalComponents: number;
    customComponents: number;
    nativeElements: number;
    complexity: 'simple' | 'moderate' | 'complex';
  };
}

/**
 * File Analyzer class
 * Provides methods to analyze React/TSX files and extract component information
 */
export class FileAnalyzer {
  private content: string;
  private filePath: string;
  private lines: string[];

  constructor(filePath: string) {
    this.filePath = filePath;
    this.content = fs.readFileSync(filePath, 'utf-8');
    this.lines = this.content.split('\n');
  }

  /**
   * Detect the file language/extension
   */
  private detectLanguage(): FileAnalysisResult['language'] {
    const ext = path.extname(this.filePath).toLowerCase();
    switch (ext) {
      case '.tsx':
        return 'tsx';
      case '.jsx':
        return 'jsx';
      case '.ts':
        return 'typescript';
      case '.js':
        return 'javascript';
      case '.vue':
        return 'vue';
      default:
        return 'unknown';
    }
  }

  /**
   * Extract all JSX/Vue components from the content
   */
  private extractComponents(): IdentifiedComponent[] {
    const components: IdentifiedComponent[] = [];

    // Regex to match JSX opening tags: <ComponentName ... />  or <ComponentName ...>
    const jsxRegex = /<([A-Z][a-zA-Z0-9]*)\s*([^>]*)(\/?)>/g;
    let match;
    let componentIndex = 0;

    while ((match = jsxRegex.exec(this.content)) !== null) {
      const [fullMatch, componentName, propsString] = match;
      const startIndex = match.index;
      const startLine = this.content.substring(0, startIndex).split('\n').length - 1;

      // Parse props
      const props = this.parseProps(propsString);

      // Determine component type
      const type = this.determineComponentType(componentName);

      // Extract children if present
      let children: string | undefined;
      let endLine = startLine;
      const closingTag = `</${componentName}>`;
      const closingTagIndex = this.content.indexOf(closingTag, startIndex);

      if (closingTagIndex > startIndex && match[3] !== '/') {
        const contentStart = startIndex + fullMatch.length;
        children = this.content.substring(contentStart, closingTagIndex).trim();
        endLine = this.content.substring(0, closingTagIndex).split('\n').length - 1;
      }

      // Extract styling
      const styling = this.extractStyling(propsString);

      components.push({
        name: componentName,
        type,
        props,
        children,
        startLine,
        endLine,
        source: fullMatch,
        styling,
      });

      componentIndex++;
    }

    return components;
  }

  /**
   * Parse component props from the props string
   */
  private parseProps(propsString: string): Record<string, string | boolean | number> {
    const props: Record<string, string | boolean | number> = {};

    // Match prop="value" or prop={value} or prop or prop={...}
    const propRegex = /([a-zA-Z][a-zA-Z0-9-]*)\s*(?:=\s*(?:{([^}]*)}|"([^"]*)"|'([^']*)')|(?=\s|>|\/|$))/g;
    let match;

    while ((match = propRegex.exec(propsString)) !== null) {
      const [, propName, braceValue, doubleQuoteValue, singleQuoteValue] = match;
      const value = braceValue || doubleQuoteValue || singleQuoteValue;

      if (value === undefined) {
        // Boolean prop without value
        props[propName] = true;
      } else if (value === '') {
        props[propName] = true;
      } else if (value === 'true') {
        props[propName] = true;
      } else if (value === 'false') {
        props[propName] = false;
      } else if (!isNaN(Number(value))) {
        props[propName] = Number(value);
      } else {
        props[propName] = value;
      }
    }

    return props;
  }

  /**
   * Determine if a component is native HTML, custom, or third-party
   */
  private determineComponentType(componentName: string): IdentifiedComponent['type'] {
    const nativeElements = new Set([
      'div', 'span', 'p', 'a', 'button', 'input', 'form', 'label', 'textarea',
      'select', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'header', 'footer', 'nav', 'section', 'article', 'main', 'aside',
      'table', 'tr', 'td', 'th', 'img', 'video', 'audio'
    ]);

    if (nativeElements.has(componentName.toLowerCase())) {
      return 'native';
    }

    // Check if it's a third-party component (heuristic)
    if (componentName.includes('.') || /^[a-z]/.test(componentName)) {
      return 'third-party';
    }

    return 'custom';
  }

  /**
   * Extract styling information from a component
   */
  private extractStyling(propsString: string): IdentifiedComponent['styling'] {
    const styling: IdentifiedComponent['styling'] = {};

    // Check for className
    const classNameMatch = propsString.match(/className\s*=\s*["']([^"']*)["']/);
    if (classNameMatch) {
      styling.className = classNameMatch[1];
    }

    // Check for style prop
    const styleMatch = propsString.match(/style\s*=\s*\{([^}]*)\}/);
    if (styleMatch) {
      const styleContent = styleMatch[1];
      styling.inlineStyles = this.parseInlineStyles(styleContent);
    }

    return Object.keys(styling).length > 0 ? styling : undefined;
  }

  /**
   * Parse inline CSS styles
   */
  private parseInlineStyles(styleString: string): Record<string, string> {
    const styles: Record<string, string> = {};
    const styleRules = styleString.split(',');

    for (const rule of styleRules) {
      const [key, value] = rule.split(':').map(s => s.trim());
      if (key && value) {
        const cssKey = key
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .replace(/^-/, '');
        styles[cssKey] = value.replace(/['"]/g, '');
      }
    }

    return styles;
  }

  /**
   * Detect UI patterns in components
   */
  private detectPatterns(components: IdentifiedComponent[]): UIPattern[] {
    const patterns: UIPattern[] = [];

    // Pattern: Form (inputs + buttons)
    const formInputs = components.filter(c =>
      c.name === 'Input' || c.name === 'TextArea' || c.name === 'Select'
    );
    const formButtons = components.filter(c => c.name === 'Button');
    if (formInputs.length > 0 && formButtons.length > 0) {
      patterns.push({
        type: 'form',
        description: `Form with ${formInputs.length} inputs and ${formButtons.length} buttons`,
        components: components.filter(c =>
          ['Input', 'TextArea', 'Select', 'Button', 'Label'].includes(c.name)
        ).map(c => c.name),
        confidence: 0.8,
        location: {
          startLine: Math.min(...components.map(c => c.startLine)),
          endLine: Math.max(...components.map(c => c.endLine)),
        },
      });
    }

    // Pattern: Button group (multiple buttons in flex/div)
    const buttonGroups = components.filter(c => c.name === 'Button' && c.startLine === components[0].startLine);
    if (buttonGroups.length > 2) {
      patterns.push({
        type: 'button-group',
        description: `Button group with ${buttonGroups.length} buttons`,
        components: buttonGroups.map(c => c.name),
        confidence: 0.7,
        location: {
          startLine: Math.min(...buttonGroups.map(c => c.startLine)),
          endLine: Math.max(...buttonGroups.map(c => c.endLine)),
        },
      });
    }

    // Pattern: Card (div with styled content)
    const styledDivs = components.filter(c => c.name === 'div' && c.styling?.className);
    if (styledDivs.some(d => d.styling?.className?.includes('card'))) {
      patterns.push({
        type: 'card',
        description: 'Card component (styled div with card classes)',
        components: ['div'],
        confidence: 0.6,
        location: {
          startLine: styledDivs[0].startLine,
          endLine: styledDivs[styledDivs.length - 1].endLine,
        },
      });
    }

    return patterns;
  }

  /**
   * Extract imports from the file
   */
  private extractImports(): string[] {
    const imports: string[] = [];
    const importRegex = /import\s+(?:{[^}]*}|[^\s]+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(this.content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  /**
   * Extract exports from the file
   */
  private extractExports(): string[] {
    const exports: string[] = [];

    // Match: export default function X, export const X, etc.
    const exportRegex = /export\s+(?:default\s+)?(?:function|const|class)\s+([a-zA-Z][a-zA-Z0-9]*)/g;
    let match;

    while ((match = exportRegex.exec(this.content)) !== null) {
      exports.push(match[1]);
    }

    return exports;
  }

  /**
   * Detect styling approaches used in the file
   */
  private detectStylingApproaches(): {
    approaches: StylingApproach[];
    tailwindDetected: boolean;
    cssModulesDetected: boolean;
    styledComponentsDetected: boolean;
  } {
    const approaches = new Set<StylingApproach>();
    let tailwindDetected = false;
    let cssModulesDetected = false;
    let styledComponentsDetected = false;

    // Check for Tailwind
    if (/className="[^"]*(?:w-|h-|m-|p-|bg-|text-|flex|grid)[^"]*"/.test(this.content)) {
      approaches.add('tailwind');
      tailwindDetected = true;
    }

    // Check for CSS modules
    if (/import\s+styles\s+from\s+['"][^'"]+\.module\.css['"]/.test(this.content)) {
      approaches.add('css-module');
      cssModulesDetected = true;
    }

    // Check for styled-components
    if (/import\s+styled\s+from\s+['"]styled-components['"]/.test(this.content)) {
      approaches.add('styled-components');
      styledComponentsDetected = true;
    }

    // Check for inline styles
    if (/style\s*=\s*\{/.test(this.content)) {
      approaches.add('inline');
    }

    // Check for className
    if (/className\s*=/.test(this.content)) {
      approaches.add('className');
    }

    if (approaches.size === 0) {
      approaches.add('mixed');
    }

    return {
      approaches: Array.from(approaches),
      tailwindDetected,
      cssModulesDetected,
      styledComponentsDetected,
    };
  }

  /**
   * Determine overall complexity of the component
   */
  private determineComplexity(components: IdentifiedComponent[]): 'simple' | 'moderate' | 'complex' {
    const componentCount = components.length;
    const patternCount = this.detectPatterns(components).length;

    if (componentCount <= 3 && patternCount === 0) {
      return 'simple';
    } else if (componentCount <= 15 && patternCount <= 2) {
      return 'moderate';
    } else {
      return 'complex';
    }
  }

  /**
   * Main analyze method
   */
  analyze(): FileAnalysisResult {
    const language = this.detectLanguage();
    const components = this.extractComponents();
    const patterns = this.detectPatterns(components);
    const styling = this.detectStylingApproaches();
    const imports = this.extractImports();
    const exports = this.extractExports();
    const warnings: string[] = [];
    const complexity = this.determineComplexity(components);

    // Generate warnings
    if (language === 'unknown') {
      warnings.push('Unknown file language - analysis may be incomplete');
    }

    if (components.filter(c => c.type === 'custom').length > 5) {
      warnings.push('Many custom components found - analysis accuracy may vary');
    }

    const customComponents = components.filter(c => c.type === 'custom').length;
    const nativeElements = components.filter(c => c.type === 'native').length;

    return {
      filePath: this.filePath,
      language,
      totalLines: this.lines.length,
      components,
      patterns,
      styling,
      imports,
      exports,
      warnings,
      summary: {
        totalComponents: components.length,
        customComponents,
        nativeElements,
        complexity,
      },
    };
  }

  /**
   * Static method for convenience
   */
  static analyze(filePath: string): FileAnalysisResult {
    return new FileAnalyzer(filePath).analyze();
  }
}

export default FileAnalyzer;
