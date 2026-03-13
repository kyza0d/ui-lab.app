import type { ThemeMode } from './theme-contract'

export const DEFAULT_THEME_STORAGE_KEY = 'ui-lab-theme-complete'
export const THEME_CHANGE_EVENT = 'ui-lab-theme-change'

export type ThemePreference = ThemeMode | 'system'

interface StoredThemeValue {
  themeMode?: ThemeMode
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark'
}

export function getSystemThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function parseStoredThemeMode(value: unknown): ThemeMode | null {
  if (isThemeMode(value)) return value

  if (value && typeof value === 'object' && 'themeMode' in value) {
    const themeMode = (value as StoredThemeValue).themeMode
    return isThemeMode(themeMode) ? themeMode : null
  }

  return null
}

export function readStoredThemeMode(storageKey: string = DEFAULT_THEME_STORAGE_KEY): ThemeMode | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) return null

    return parseStoredThemeMode(JSON.parse(raw))
  } catch {
    return null
  }
}

export function resolveThemeMode(
  storageKey: string = DEFAULT_THEME_STORAGE_KEY,
  defaultMode: ThemePreference = 'system',
): ThemeMode {
  const storedMode = readStoredThemeMode(storageKey)
  if (storedMode) return storedMode

  if (defaultMode === 'light' || defaultMode === 'dark') {
    return defaultMode
  }

  return getSystemThemeMode()
}

export function persistThemeMode(
  mode: ThemeMode,
  storageKey: string = DEFAULT_THEME_STORAGE_KEY,
): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ themeMode: mode }))
  } catch {
    // Ignore storage failures. The DOM has already been updated.
  }
}

export function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.dataset.theme = mode
  root.style.colorScheme = mode
}
