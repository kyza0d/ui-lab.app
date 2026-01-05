import { type SimpleThemeColors } from "../constants/themes";

export interface ThemeSourceConfig {
  colors: SimpleThemeColors;
  typography: {
    fontSizeScale: number;
    fontWeightScale: number;
    typeSizeRatio: number;
  };
  layout: { radius: number; borderWidth: number; spacingScale: number };
  mode: "light" | "dark";
}

export interface CompleteThemeCache {
  cssVariables: Record<string, string>;
  themeMode: "light" | "dark";
  sourceConfig: ThemeSourceConfig;
  timestamp: number;
  version: 1;
}

export const THEME_CACHE_KEY = "uilab_theme_complete";
const REQUIRED_VARS = ["--spacing-base", "--background-50", "--text-base"];

export function validateThemeCache(data: unknown): CompleteThemeCache | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  if (d.themeMode !== "light" && d.themeMode !== "dark") return null;
  if (!d.cssVariables || typeof d.cssVariables !== "object") return null;
  const vars = d.cssVariables as Record<string, unknown>;
  for (const v of REQUIRED_VARS) {
    if (!(v in vars) || typeof vars[v] !== "string") return null;
  }
  const sourceConfig = d.sourceConfig as ThemeSourceConfig | undefined;
  return {
    cssVariables: vars as Record<string, string>,
    themeMode: d.themeMode,
    sourceConfig: sourceConfig || getDefaultSourceConfig(d.themeMode),
    timestamp: typeof d.timestamp === "number" ? d.timestamp : Date.now(),
    version: 1,
  };
}

function getDefaultSourceConfig(mode: "light" | "dark"): ThemeSourceConfig {
  return {
    colors: {
      background: { h: 0, c: 0, l: 0.15 },
      foreground: { h: 0, c: 0, l: 0.98 },
      accent: { h: 210, c: 0.15, l: 0.5 },
    },
    typography: { fontSizeScale: 1, fontWeightScale: 1, typeSizeRatio: 1.2 },
    layout: { radius: 0.5, borderWidth: 2, spacingScale: 0.9 },
    mode,
  };
}

export function getCompleteThemeCache(): CompleteThemeCache | null {
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

export function applyThemeCacheToDOM(cache: CompleteThemeCache): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", cache.themeMode);
  Object.entries(cache.cssVariables).forEach(([varName, value]) => {
    root.style.setProperty(varName, value);
  });
}

export function clearCompleteThemeCache(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(THEME_CACHE_KEY);
  } catch {}
}
