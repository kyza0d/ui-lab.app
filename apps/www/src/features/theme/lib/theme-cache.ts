import { type SimpleThemeColors } from "../constants/themes";
import {
  type FontKey,
  BODY_FONTS,
  HEADER_FONTS,
  MONO_FONTS,
  type FontCategory,
  type FontCategoryInput,
  getDefaultBodyFont,
  getDefaultHeaderFont,
  getDefaultMonoFont,
} from "../constants/font-config";
import { type TypographyConfig } from "./typography-config";
import { DEFAULT_FONT_CONFIG, getDefaultThemeSourceConfig } from "./default-theme-config";

export interface ThemeFontsConfig {
  bodyFont: FontKey;
  headerFont: FontKey;
  monoFont: FontKey;
}

type LegacyThemeFontsConfig = Partial<ThemeFontsConfig> & {
  sansFont?: FontKey;
};

export interface ThemeSourceConfig {
  colors: SimpleThemeColors;
  typography: TypographyConfig;
  layout: { radius: number; borderWidth: number; spacingScale: number };
  fonts?: ThemeFontsConfig;
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
export const REQUIRED_COLOR_VARS = [
  "--background-500",
  "--foreground-100",
  "--accent-400",
] as const;
export const COLOR_CSS_VARIABLE_PREFIXES = [
  "--background-",
  "--foreground-",
  "--accent-",
  "--success-",
  "--danger-",
  "--warning-",
  "--info-",
  "--ui-lab-meta-",
] as const;

export function normalizeThemeFontsConfig(
  fonts?: LegacyThemeFontsConfig | null,
): ThemeFontsConfig {
  const bodyFont = (fonts?.bodyFont ??
    fonts?.sansFont ??
    DEFAULT_FONT_CONFIG.bodyFont) as FontKey;

  return {
    bodyFont,
    headerFont: (fonts?.headerFont ??
      fonts?.bodyFont ??
      fonts?.sansFont ??
      DEFAULT_FONT_CONFIG.headerFont) as FontKey,
    monoFont: (fonts?.monoFont ?? DEFAULT_FONT_CONFIG.monoFont) as FontKey,
  };
}

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
  for (const v of REQUIRED_COLOR_VARS) {
    if (!(v in vars) || typeof vars[v] !== "string") return null;
  }
  const themeMode = d.themeMode as "light" | "dark";
  const defaultSourceConfig = getDefaultSourceConfig(themeMode);
  const sourceConfig = d.sourceConfig as
    | (Partial<ThemeSourceConfig> & { fonts?: LegacyThemeFontsConfig })
    | undefined;
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
        fonts: normalizeThemeFontsConfig(sourceConfig.fonts),
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
    const normalizedSourceConfig: ThemeSourceConfig = {
      ...sourceConfig,
      fonts: normalizeThemeFontsConfig(sourceConfig.fonts),
    };
    const toCache: CompleteThemeCache = {
      cssVariables,
      themeMode: normalizedSourceConfig.mode,
      sourceConfig: normalizedSourceConfig,
      timestamp: Date.now(),
      version: 1,
    };
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(toCache));
  } catch (error) {
    console.warn("[Theme] Failed to cache complete theme:", error);
  }
}

export function extractColorVariablesFromCache(
  cssVariables: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(cssVariables).filter(([key]) =>
      COLOR_CSS_VARIABLE_PREFIXES.some((prefix) => key.startsWith(prefix)),
    ),
  );
}

export function applyThemeCacheToDOM(cache: CompleteThemeCache): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", cache.themeMode);
  root.style.colorScheme = cache.themeMode;
  Object.entries(cache.cssVariables).forEach(([varName, value]) => {
    root.style.setProperty(varName, value);
  });

  if (cache.sourceConfig.fonts) {
    const { bodyFont, headerFont, monoFont } = cache.sourceConfig.fonts;
    const bodyFontFamily = getFontFamilyString(bodyFont, "body");
    const headerFontFamily = getFontFamilyString(headerFont, "header");
    const monoFontFamily = getFontFamilyString(monoFont, "mono");
    root.style.setProperty("--font-body", bodyFontFamily);
    root.style.setProperty("--font-header", headerFontFamily);
    root.style.setProperty("--font-sans", bodyFontFamily);
    root.style.setProperty("--font-mono", monoFontFamily);
  }
}

function getFontFamilyString(fontName: FontKey, category: FontCategoryInput): string {
  const normalizedCategory: FontCategory = category === "sans" ? "body" : category;
  const fonts =
    normalizedCategory === "body"
      ? BODY_FONTS
      : normalizedCategory === "header"
        ? HEADER_FONTS
        : MONO_FONTS;
  const fontConfig = fonts.find((f) => f.name === fontName);
  return (
    fontConfig?.family ||
    (normalizedCategory === "body"
      ? getDefaultBodyFont().family
      : normalizedCategory === "header"
        ? getDefaultHeaderFont().family
        : getDefaultMonoFont().family)
  );
}
