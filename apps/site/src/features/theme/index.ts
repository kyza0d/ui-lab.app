// Context (MOST IMPORTANT)
export { AppProvider, useApp } from "./lib/app-context";
export type { AppContextType } from "./lib/app-context";

// Components
export { default as ColorPaletteGrid } from "./components/color-palette-grid";
export { ColorScale } from "./components/color-scale";
export { SettingsContent } from "./components/settings/settings-content";

// Utilities
export * from "./lib/color-utils";
export * from "./lib/color/semantic";
export * from "./lib/css-variable-generator";
export * from "./lib/theme-cache";
export * from "./lib/theme-persistence";

// Shiki
export { generateShikiTheme } from "./lib/themes/shiki/generator";
export type { ShikiTheme } from "./lib/themes/shiki/types";
export { generateSyntaxPalettes } from "./lib/themes/syntax-colors";

// Hooks
export { useColorVariables } from "./hooks/use-color-variables";
export { useThemeConfiguration } from "./hooks/use-theme-configuration";
export { useThemeStorage } from "./hooks/use-theme-storage";

// Constants
export { themes } from "./constants/themes";
export { DEFAULT_GLOBAL_ADJUSTMENTS } from "./constants/themes";
