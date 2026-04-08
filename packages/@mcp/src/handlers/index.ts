import { handleSearchComponents, handleGetComponent } from './components.js';
import { handleGetSemanticColor, handleGetThemeSetup } from './design.js';
import { handleSearchGuides, handleGetGuide } from './guides.js';
import { handleSearchPatterns, handleGetPattern } from './patterns.js';
import { handleSearchElements, handleGetElement } from './elements.js';
import { handleSearchSections, handleGetSection } from './sections.js';
import { handleGetInspiration, handleGetVariationCode } from './inspiration.js';
import { handleSearchStarters, handleGetStarter, handleGetComponentSource } from './starters.js';

export async function handleTool(
  toolName: string,
  toolInput: Record<string, unknown>
): Promise<unknown> {
  switch (toolName) {
    case 'search_components':
      return handleSearchComponents(toolInput as any);
    case 'get_component':
      return handleGetComponent(toolInput as any);
    case 'get_component_source':
      return handleGetComponentSource(toolInput as any);
    case 'get_semantic_color':
      return handleGetSemanticColor(toolInput as any);
    case 'get_theme_setup':
      return handleGetThemeSetup(toolInput as any);
    case 'search_guides':
      return handleSearchGuides(toolInput as any);
    case 'get_guide':
      return handleGetGuide(toolInput as any);
    case 'search_patterns':
      return handleSearchPatterns(toolInput as any);
    case 'get_pattern':
      return handleGetPattern(toolInput as any);
    case 'search_elements':
      return handleSearchElements(toolInput as any);
    case 'get_element':
      return handleGetElement(toolInput as any);
    case 'search_sections':
      return handleSearchSections(toolInput as any);
    case 'get_section':
      return handleGetSection(toolInput as any);
    case 'get_inspiration':
      return handleGetInspiration(toolInput as any);
    case 'get_variation_code':
      return handleGetVariationCode(toolInput as any);
    case 'search_starters':
      return handleSearchStarters(toolInput as any);
    case 'get_starter':
      return handleGetStarter(toolInput as any);
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
