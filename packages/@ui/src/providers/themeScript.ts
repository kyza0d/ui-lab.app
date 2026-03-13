import type { ThemeMode } from './theme-contract'
import { DEFAULT_THEME_STORAGE_KEY, type ThemePreference } from './theme-mode'

export interface ColorModeScriptOptions {
  storageKey?: string
  defaultMode?: ThemePreference
}

export function generateThemeScript(options: ColorModeScriptOptions = {}): string {
  const storageKey = options.storageKey ?? DEFAULT_THEME_STORAGE_KEY
  const defaultMode = options.defaultMode ?? 'system'

  return `(function(){
    var root = document.documentElement;
    var storageKey = ${JSON.stringify(storageKey)};
    var defaultMode = ${JSON.stringify(defaultMode)};

    function isThemeMode(value) {
      return value === 'light' || value === 'dark';
    }

    function getSystemMode() {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (_error) {
        return 'light';
      }
    }

    function readStoredMode() {
      try {
        var raw = localStorage.getItem(storageKey);
        if (!raw) return null;
        var parsed = JSON.parse(raw);
        if (isThemeMode(parsed)) return parsed;
        return parsed && isThemeMode(parsed.themeMode) ? parsed.themeMode : null;
      } catch (_error) {
        return null;
      }
    }

    var mode = readStoredMode();
    if (!isThemeMode(mode)) {
      mode = isThemeMode(defaultMode) ? defaultMode : getSystemMode();
    }

    root.dataset.theme = mode;
    root.style.colorScheme = mode;
  })();`
}

export const THEME_SCRIPT = generateThemeScript()
export const COLOR_MODE_SCRIPT = generateThemeScript()

export function generateColorModeScript(options: ColorModeScriptOptions = {}): string {
  return generateThemeScript(options)
}

export type { ThemeMode }
