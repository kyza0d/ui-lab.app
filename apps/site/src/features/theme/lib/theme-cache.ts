import { type SimpleThemeColors } from "../constants/themes";
import { type FontKey, SANS_FONTS, MONO_FONTS } from "../constants/font-config";
import { type TypographyConfig } from "./typography-config";
import { getDefaultThemeSourceConfig } from "./default-theme-config";

export interface ThemeSourceConfig {
  colors: SimpleThemeColors;
  typography: TypographyConfig;
  layout: { radius: number; borderWidth: number; spacingScale: number };
  fonts?: { sansFont: FontKey; monoFont: FontKey };
  mode: "light" | "dark";
}

interface CompleteThemeCache {
  cssVariables: Record<string, string>;
  themeMode: "light" | "dark";
  sourceConfig: ThemeSourceConfig;
  timestamp: number;
  version: 1;
}

export const THEME_CACHE_KEY = "uilab_theme_complete";
const REQUIRED_VARS = ["--background-500", "--text-md"];

function getDevicePreferredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function validateThemeCache(data: unknown): CompleteThemeCache | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (d.themeMode !== "light" && d.themeMode !== "dark") return null;
  if (!d.cssVariables || typeof d.cssVariables !== "object") return null;
  const vars = d.cssVariables as Record<string, unknown>;
  for (const v of REQUIRED_VARS) {
    if (!(v in vars) || typeof vars[v] !== "string") return null;
  }
  const themeMode = d.themeMode as "light" | "dark";
  const defaultSourceConfig = getDefaultSourceConfig(themeMode);
  const sourceConfig = d.sourceConfig as ThemeSourceConfig | undefined;
  return {
    cssVariables: vars as Record<string, string>,
    themeMode,
    sourceConfig: sourceConfig
      ? {
        ...defaultSourceConfig,
        ...sourceConfig,
        typography: {
          ...defaultSourceConfig.typography,
          ...(sourceConfig.typography || {}),
        },
        layout: {
          ...defaultSourceConfig.layout,
          ...(sourceConfig.layout || {}),
        },
        fonts: sourceConfig.fonts
          ? {
            ...defaultSourceConfig.fonts!,
            ...sourceConfig.fonts,
          }
          : defaultSourceConfig.fonts,
      }
      : defaultSourceConfig,
    timestamp: typeof d.timestamp === "number" ? d.timestamp : Date.now(),
    version: 1,
  };
}

function getDefaultSourceConfig(mode?: "light" | "dark"): ThemeSourceConfig {
  const resolvedMode = mode ?? getDevicePreferredTheme();
  return getDefaultThemeSourceConfig(resolvedMode);
}

function getCompleteThemeCache(): CompleteThemeCache | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(THEME_CACHE_KEY);
    if (!cached) return null;
    return validateThemeCache(JSON.parse(cached));
  } catch {
    return null;
  }
}

export function getSourceConfig(): ThemeSourceConfig | null {
  const cache = getCompleteThemeCache();
  return cache?.sourceConfig || null;
}

export function cacheCompleteTheme(
  cssVariables: Record<string, string>,
  sourceConfig: ThemeSourceConfig,
): void {
  if (typeof window === "undefined") return;
  try {
    const toCache: CompleteThemeCache = {
      cssVariables,
      themeMode: sourceConfig.mode,
      sourceConfig,
      timestamp: Date.now(),
      version: 1,
    };
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(toCache));
  } catch (error) {
    console.warn("[Theme] Failed to cache complete theme:", error);
  }
}

/**
 * Extract typography CSS variables from a complete cache.
 * These are the values that can be safely applied during initial hydration.
 *
 * Includes:
 * - --text-* (xs through 5xl)
 * - --header-text-* (xs through 5xl)
 * - --leading-* (header/body line heights)
 * - --letter-spacing-* (xs through 5xl)
 * - --font-weight-* (header and body variants)
 * - Scale/ratio variables (--header-type-size-ratio, etc.)
 */
function extractTypographyVariablesFromCache(
  cssVariables: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(cssVariables).filter(([key]) =>
      key.startsWith("--text-") ||
      key.startsWith("--header-text-") ||
      key.startsWith("--leading-") ||
      key.startsWith("--letter-spacing-") ||
      key.startsWith("--font-weight-") ||
      key.startsWith("--header-type-size-ratio") ||
      key.startsWith("--header-font-size-scale") ||
      key.startsWith("--body-type-size-ratio") ||
      key.startsWith("--body-font-size-scale")
    )
  );
}

export function applyThemeCacheToDOM(cache: CompleteThemeCache): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", cache.themeMode);
  Object.entries(cache.cssVariables).forEach(([varName, value]) => {
    root.style.setProperty(varName, value);
  });

  if (cache.sourceConfig.fonts) {
    const { sansFont, monoFont } = cache.sourceConfig.fonts;
    const sansFontFamily = getFontFamilyString(sansFont, "sans");
    const monoFontFamily = getFontFamilyString(monoFont, "mono");
    root.style.setProperty("--font-sans", sansFontFamily);
    root.style.setProperty("--font-mono", monoFontFamily);
  }
}

function getFontFamilyString(fontName: FontKey, category: "sans" | "mono"): string {
  const fonts = category === "sans" ? SANS_FONTS : MONO_FONTS;
  const fontConfig = fonts.find((f) => f.name === fontName);
  return fontConfig?.family || (category === "sans" ? '"Karla", system-ui, sans-serif' : '"Ioskeley Mono", monospace');
}
