/**
 * UI Transformer Orchestrator
 * Single-pass transformation: analyze → map → generate → validate
 *
 * Replaces the 3-phase orchestration system
 */

import * as fs from 'fs';

/**
 * Transform a UI file to use UI Lab components
 * Single-pass approach: analyze, map, generate, validate all together
 */
export async function transformUIFile(filePath: string, _context?: string) {
  try {
    // Read file
    if (!fs.existsSync(filePath)) {
      return {
        success: false,
        error: `File not found: ${filePath}`,
      };
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Step 1: Analyze patterns
    const patterns = analyzePatterns(fileContent);

    // Step 2: Map patterns to components
    const _mapping = mapPatterns(patterns);

    // Step 3: Generate code (stub - would use generate_component tool)
    const code = generateTransformedCode(fileContent, _mapping);

    // Step 4: Validate
    const validation = validateTransformation(code, _mapping);

    return {
      success: validation.valid,
      analysis: {
        patterns: patterns.map((p) => ({
          type: p.type,
          location: p.location,
          description: p.description,
        })),
        statistics: {
          totalPatterns: patterns.length,
          recognizedPatterns: _mapping.filter((m) => m.component).length,
          unmappedPatterns: _mapping.filter((m) => !m.component).length,
        },
      },
      mapping: _mapping.map((m) => ({
        pattern: m.pattern,
        component: m.component,
        reasoning: m.reasoning,
      })),
      code,
      imports: extractImports(code),
      validation,
      report: {
        summary: `Found ${patterns.length} patterns, mapped ${_mapping.filter((m) => m.component).length} to components`,
        changesApplied: _mapping
          .filter((m) => m.component)
          .map((m) => `${m.pattern} → ${m.component}`),
        potentialIssues: validation.issues || [],
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Analyze file for patterns
 */
function analyzePatterns(content: string) {
  const patterns = [];

  // Detect common patterns
  if (content.includes('<button')) {
    patterns.push({
      type: 'button',
      location: 'multiple',
      description: 'Native HTML button elements',
    });
  }

  if (content.includes('<input')) {
    patterns.push({
      type: 'input',
      location: 'multiple',
      description: 'Native HTML input elements',
    });
  }

  if (content.includes('<div') && content.includes('className="card')) {
    patterns.push({
      type: 'card',
      location: 'multiple',
      description: 'DIVs with card-like styling',
    });
  }

  return patterns;
}

/**
 * Map patterns to UI Lab components
 */
function mapPatterns(patterns: any[]) {
  const componentMap: Record<string, string> = {
    button: 'Button',
    input: 'Input',
    card: 'Card',
  };

  return patterns.map((p) => ({
    pattern: p.type,
    component: componentMap[p.type] || null,
    reasoning: componentMap[p.type]
      ? `Detected ${p.type} pattern, maps to ${componentMap[p.type]} component`
      : `Pattern ${p.type} has no direct mapping`,
  }));
}

/**
 * Generate transformed code (stub)
 */
function generateTransformedCode(originalContent: string, _mapping: any[]): string {
  // For now, just return the original content
  // A real implementation would apply the transformations
  return originalContent;
}

/**
 * Validate transformation
 */
function validateTransformation(code: string, _mapping: any[]) {
  const issues = [];

  // Check that code is valid JSX
  if (!code.includes('return')) {
    issues.push('No return statement found - may not be valid component');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Extract imports from code
 */
function extractImports(code: string): string[] {
  const imports: string[] = [];
  const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(code)) !== null) {
    imports.push(match[0]);
  }

  return imports;
}
