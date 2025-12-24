/**
 * Refactoring Orchestrator
 * Orchestrates the complete UI refactoring workflow
 */

import * as path from 'path';
import { FileAnalyzer, type FileAnalysisResult } from './file-analyzer.js';
import { ProjectContextDetector, type ProjectContext } from './project-context.js';
import { ComponentMapper, type MappingResult } from './component-mapper.js';
import type { ComponentMapping } from './component-mapper.js';

export interface RefactoringRequest {
  filePath: string;
  projectRoot?: string;
  preserveFunctionality?: boolean;
  applyDesignTokens?: boolean;
  targetComponents?: string[];
}

export interface RefactoringChange {
  type: 'component-replaced' | 'prop-mapped' | 'styling-updated' | 'import-added' | 'import-removed';
  component: string;
  oldValue?: string;
  newValue?: string;
  confidence: number;
  notes: string[];
}

export interface RefactoringResult {
  success: boolean;
  filePath: string;
  originalCode: string;
  refactoredCode: string;
  changes: RefactoringChange[];
  warnings: string[];
  summary: {
    componentsAnalyzed: number;
    componentsMapped: number;
    componentsUnmapped: number;
    mappingConfidence: number;
  };
  projectContext: ProjectContext;
  initializationNeeded: boolean;
  initializationSteps: string[];
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
  nextSteps: string[];
}

/**
 * Refactoring Orchestrator class
 */
export class RefactoringOrchestrator {
  private fileAnalyzer: FileAnalyzer;
  private projectContext: ProjectContext;
  private componentMapper: ComponentMapper;

  constructor(filePath: string, projectRoot?: string) {
    this.fileAnalyzer = new FileAnalyzer(filePath);
    this.projectContext = ProjectContextDetector.detect(projectRoot || path.dirname(filePath));
    this.componentMapper = new ComponentMapper();
  }

  /**
   * Run the complete refactoring workflow
   */
  async refactor(request: RefactoringRequest): Promise<RefactoringResult> {
    // Step 1: Analyze the file
    const analysis = this.fileAnalyzer.analyze();

    // Step 2: Map components to UI Lab alternatives
    const mappingResult = this.componentMapper.mapComponents(analysis.components);

    // Step 3: Generate refactored code
    const refactoredCode = this.generateRefactoredCode(analysis, mappingResult);

    // Step 4: Track changes
    const changes = this.trackChanges(analysis, mappingResult);

    // Step 5: Generate initialization steps if needed
    const { initializationNeeded, initializationSteps } = this.generateInitializationSteps();

    // Step 6: Generate next steps
    const nextSteps = this.generateNextSteps(mappingResult);

    // Step 7: Collect warnings
    const warnings = this.generateWarnings(analysis, mappingResult);

    return {
      success: true,
      filePath: request.filePath,
      originalCode: this.fileAnalyzer['content'],
      refactoredCode,
      changes,
      warnings,
      summary: {
        componentsAnalyzed: analysis.components.length,
        componentsMapped: mappingResult.summary.totalMapped,
        componentsUnmapped: mappingResult.summary.totalUnmapped,
        mappingConfidence: mappingResult.summary.averageConfidence,
      },
      projectContext: this.projectContext,
      initializationNeeded,
      initializationSteps,
      estimatedComplexity: analysis.summary.complexity,
      nextSteps,
    };
  }

  /**
   * Generate refactored code
   */
  private generateRefactoredCode(_analysis: FileAnalysisResult, mappingResult: MappingResult): string {
    let code = this.fileAnalyzer['content'];

    // Add new imports for UI Lab components
    const uiLabImports = this.generateUILabImports(mappingResult.mappings);
    if (uiLabImports.length > 0) {
      code = this.addImports(code, uiLabImports);
    }

    // Replace components in the code
    for (const mapping of mappingResult.mappings) {
      code = this.replaceComponent(code, mapping);
    }

    // Remove unused imports
    code = this.cleanupImports(code);

    return code;
  }

  /**
   * Generate imports for UI Lab components
   */
  private generateUILabImports(mappings: ComponentMapping[]): string[] {
    const imports = new Set<string>();

    for (const mapping of mappings) {
      const componentName = mapping.uiLabComponent.id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

      imports.add(`import { ${componentName} } from '@ui-lab/components';`);
    }

    return Array.from(imports);
  }

  /**
   * Add imports to the code
   */
  private addImports(code: string, imports: string[]): string {
    // Find the last import statement
    const importRegex = /import\s+.*?from\s+['"][^'"]+['"];?/g;
    const matches = Array.from(code.matchAll(importRegex));

    if (matches.length > 0) {
      const lastImport = matches[matches.length - 1];
      const insertPosition = lastImport.index! + lastImport[0].length;
      const importString = imports.join('\n');
      return code.slice(0, insertPosition) + '\n' + importString + code.slice(insertPosition);
    } else {
      // No imports found, add at the beginning
      return imports.join('\n') + '\n\n' + code;
    }
  }

  /**
   * Replace a component in the code
   */
  private replaceComponent(code: string, mapping: ComponentMapping): string {
    const { existing, uiLabComponent, propsMapping } = mapping;
    const oldComponentName = existing.name;
    const newComponentName = uiLabComponent.id
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    // Simple replacement (in production, would use more sophisticated AST-based approach)
    const componentRegex = new RegExp(`<${oldComponentName}(\\s|>)`, 'g');
    code = code.replace(componentRegex, `<${newComponentName}$1`);

    // Replace closing tags
    const closingRegex = new RegExp(`</${oldComponentName}>`, 'g');
    code = code.replace(closingRegex, `</${newComponentName}>`);

    // Map props (simple approach)
    for (const [oldProp, newProp] of Object.entries(propsMapping)) {
      const propRegex = new RegExp(`\\s${oldProp}=`, 'g');
      code = code.replace(propRegex, ` ${newProp}=`);
    }

    return code;
  }

  /**
   * Clean up unused imports
   */
  private cleanupImports(code: string): string {
    // This is a simplified version - production code would do more sophisticated AST analysis
    const importLines = code.match(/import\s+.*?from\s+['"][^'"]+['"];?/g) || [];

    for (const importLine of importLines) {
      // Extract imported names and source
      const match = importLine.match(/import\s+(?:{([^}]*)}|([^\s]+))\s+from\s+['"]([^'"]+)['"]/);
      if (!match) continue;

      const source = match[3];
      const importedNames = (match[1] || match[2]).split(',').map(n => n.trim().split(/\s+/)[0]);

      // Check if any imported names are used in the code
      let isUsed = false;
      for (const name of importedNames) {
        if (name && code.includes(name + '(') || code.includes('<' + name)) {
          isUsed = true;
          break;
        }
      }

      // Remove unused imports from non-UI-Lab sources
      if (!isUsed && !source.includes('@ui-lab')) {
        code = code.replace(importLine, '').trim();
      }
    }

    return code;
  }

  /**
   * Track changes made during refactoring
   */
  private trackChanges(_analysis: FileAnalysisResult, mappingResult: MappingResult): RefactoringChange[] {
    const changes: RefactoringChange[] = [];

    for (const mapping of mappingResult.mappings) {
      changes.push({
        type: 'component-replaced',
        component: mapping.existing.name,
        oldValue: mapping.existing.name,
        newValue: mapping.uiLabComponent.name,
        confidence: mapping.confidence,
        notes: mapping.notes,
      });

      // Track prop mappings
      for (const [oldProp, newProp] of Object.entries(mapping.propsMapping)) {
        if (oldProp !== newProp && mapping.existing.props[oldProp]) {
          changes.push({
            type: 'prop-mapped',
            component: mapping.existing.name,
            oldValue: `${oldProp}="${mapping.existing.props[oldProp]}"`,
            newValue: `${newProp}="${mapping.existing.props[oldProp]}"`,
            confidence: 0.8,
            notes: [],
          });
        }
      }
    }

    return changes;
  }

  /**
   * Generate initialization steps if UI Lab is not initialized
   */
  private generateInitializationSteps(): { initializationNeeded: boolean; initializationSteps: string[] } {
    if (this.projectContext.uiLabInitialized) {
      return { initializationNeeded: false, initializationSteps: [] };
    }

    const steps = ProjectContextDetector.getInitializationGuidance(this.projectContext);
    return { initializationNeeded: true, initializationSteps: steps };
  }

  /**
   * Generate warnings about the refactoring
   */
  private generateWarnings(analysis: FileAnalysisResult, mappingResult: MappingResult): string[] {
    const warnings: string[] = [];

    // Add file analysis warnings
    warnings.push(...(analysis.warnings || []));

    // Warn about unmapped components
    if (mappingResult.unmappedComponents.length > 0) {
      warnings.push(
        `${mappingResult.unmappedComponents.length} component(s) could not be automatically mapped: ${
          mappingResult.unmappedComponents.map(c => c.name).join(', ')
        }`
      );
    }

    // Warn about low confidence mappings
    const lowConfidenceMappings = mappingResult.mappings.filter(m => m.confidence < 0.6);
    if (lowConfidenceMappings.length > 0) {
      warnings.push(
        `${lowConfidenceMappings.length} mapping(s) have low confidence (< 0.6) - review these carefully`
      );
    }

    // Warn about custom styling
    if (analysis.styling?.tailwindDetected) {
      warnings.push('File uses Tailwind CSS classes - consider migrating to UI Lab design tokens');
    }

    if (analysis.styling?.styledComponentsDetected) {
      warnings.push('File uses styled-components - refactoring may require additional styling updates');
    }

    return warnings;
  }

  /**
   * Generate next steps
   */
  private generateNextSteps(mappingResult: MappingResult): string[] {
    const steps: string[] = [];

    if (mappingResult.unmappedComponents.length > 0) {
      steps.push(`Manually review and refactor ${mappingResult.unmappedComponents.length} unmapped component(s)`);
    }

    if (mappingResult.mappings.some(m => m.confidence < 0.7)) {
      steps.push('Test refactored components thoroughly - some mappings have moderate confidence');
    }

    steps.push('Run tests to ensure functionality is preserved');
    steps.push('Update component imports in other files if needed');
    steps.push('Review styling to ensure consistent with UI Lab design system');

    return steps;
  }

  /**
   * Static convenience method
   */
  static async refactor(request: RefactoringRequest): Promise<RefactoringResult> {
    const orchestrator = new RefactoringOrchestrator(request.filePath, request.projectRoot);
    return orchestrator.refactor(request);
  }
}

export default RefactoringOrchestrator;
