import type { SimpleThemeColors } from '@/constants/themes';

export interface CachedPalette {
  colors: SimpleThemeColors;
  cssVariables: Record<string, string>;
  themeMode: "light" | "dark";
  timestamp: number;
}

const PALETTE_CACHE_KEY = 'uilab_palette_cache';
const PALETTE_CACHE_VERSION = 1;

export function getCachedPalette(): CachedPalette | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(PALETTE_CACHE_KEY);
    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached) as CachedPalette & { version?: number };

    if (!parsed.colors || !parsed.cssVariables || !parsed.themeMode) {
      return null;
    }

    if (!parsed.colors.background || !parsed.colors.foreground || !parsed.colors.accent) {
      return null;
    }


    return {
      colors: parsed.colors,
      cssVariables: parsed.cssVariables,
      themeMode: parsed.themeMode,
      timestamp: parsed.timestamp || Date.now(),
    };
  } catch (e) {
    return null;
  }
}

export function cachePalette(
  colors: SimpleThemeColors,
  cssVariables: Record<string, string>,
  themeMode: "light" | "dark" = "dark"
): void {
  if (typeof window === 'undefined') return;

  try {
    const toCache: CachedPalette & { version: number } = {
      colors,
      cssVariables,
      themeMode,
      timestamp: Date.now(),
      version: PALETTE_CACHE_VERSION,
    };
    localStorage.setItem(PALETTE_CACHE_KEY, JSON.stringify(toCache));
  } catch (error) {
    console.warn('[Theme] Failed to cache palette:', error);
  }
}

export function clearCachedPalette(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(PALETTE_CACHE_KEY);
  } catch {
  }
}

export function applyPaletteFromCache(): boolean {
  if (typeof window === 'undefined') return false;

  const cached = getCachedPalette();
  if (!cached) return false;

  try {
    const root = document.documentElement;
    Object.entries(cached.cssVariables).forEach(([varName, value]) => {
      root.style.setProperty(varName, value);
    });
    return true;
  } catch {
    return false;
  }
}

export function getCachedCssVariables(): Record<string, string> | null {
  const cached = getCachedPalette();
  return cached?.cssVariables ?? null;
}
