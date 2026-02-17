// Shared exports
export { copyToClipboard } from "./shared/utils";
export type { ThemeConfig, GeneratedTypeScale, ExtendedTypeScale } from "./shared/types";

// Type Scale
export { getScaleName } from "./type-scale/generator";

// Spacing
export { generateFluidSpacingCSS, applyDynamicSpacingScale } from "./spacing/generator";

// Max Width
export { generateMaxWidthVariablesCSS, generateMaxWidthScaleCSS, applyMaxWidthScalesToDOM } from "./max-width/generator";

// Colors
export { generateColorPaletteCSS } from "./colors/generator";

// Typography
export {
  generateTypeScaleFromRatio,
  generateTypographyCSS,
  generateLetterSpacingCSS,
  applyDynamicFontSizeScalesWithRatio,
  applyDynamicFontSizeScales,
  applyDynamicHeaderFontSizeScales,
  applyDynamicLetterSpacingScales,
} from "./typography/generator";

// Font Weight
export { applyDynamicFontWeightScales } from "./font-weight/generator";

// Radius
export { generateRadiusScaleCSS, generateRadiusRootCSS } from "./radius/generator";

// Border Width
export { generateBorderWidthScaleCSS } from "./border-width/generator";

// Theme (Orchestrator)
export {
  generateThemeConfig,
  applyDynamicThemeScales,
  generateConfigMessage,
  generateFullThemeConfig,
} from "./theme/generator";
