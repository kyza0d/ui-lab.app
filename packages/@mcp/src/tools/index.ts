import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { searchComponentsTool, getComponentTool } from './components.js';
import { getSemanticColorTool, getThemeSetupTool } from './design.js';
import { searchGuidesTool, getGuideTool } from './guides.js';
import { searchPatternsTool, getPatternTool } from './patterns.js';
import { searchElementsTool, getElementTool } from './elements.js';
import { searchSectionsTool, getSectionTool } from './sections.js';
import { getInspirationTool, getVariationCodeTool } from './inspiration.js';
import { getStarterTool, searchStartersTool, getComponentSourceTool } from './starters.js';

export const tools: Tool[] = [
  searchComponentsTool,
  getComponentTool,
  getComponentSourceTool,
  getSemanticColorTool,
  getThemeSetupTool,
  searchGuidesTool,
  getGuideTool,
  searchPatternsTool,
  getPatternTool,
  searchElementsTool,
  getElementTool,
  searchSectionsTool,
  getSectionTool,
  getInspirationTool,
  getVariationCodeTool,
  searchStartersTool,
  getStarterTool,
];
