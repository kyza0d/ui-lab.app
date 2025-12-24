/**
 * Agent Module
 * Complete UI Lab refactoring agent system
 */

export { FileAnalyzer, type FileAnalysisResult, type IdentifiedComponent, type UIPattern } from './file-analyzer.js';
export { ProjectContextDetector, type ProjectContext, type UILabConfig } from './project-context.js';
export { ComponentMapper, type ComponentMapping, type MappingResult } from './component-mapper.js';
export { RefactoringOrchestrator, type RefactoringRequest, type RefactoringResult, type RefactoringChange } from './refactoring-orchestrator.js';
