'use client'

import { useInsertionEffect, useSyncExternalStore } from 'react'
import type { ThemeMode } from './theme-contract'
import {
  applyThemePreference,
  clearThemeMode,
  DEFAULT_THEME_COOKIE_KEY,
  DEFAULT_THEME_STORAGE_KEY,
  getSystemThemeMode,
  parseStoredThemeMode,
  persistThemePreferenceCookie,
  persistThemeMode,
  readStoredThemeMode,
  THEME_CHANGE_EVENT,
  type ThemePreference,
} from './theme-mode'

export interface UseColorModeOptions {
  storageKey?: string
  cookieKey?: string
  defaultMode?: ThemePreference
}

export interface UseColorModeReturn {
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleThemeMode: () => void
}

function getRootThemeMode(): ThemeMode | null {
  if (typeof document === 'undefined') return null

  return parseStoredThemeMode(document.documentElement.dataset.theme)
}

function getSnapshot(defaultMode: ThemePreference, storageKey: string): ThemeMode {
  const rootMode = getRootThemeMode()
  if (rootMode) return rootMode

  const storedMode = readStoredThemeMode(storageKey)
  if (storedMode) return storedMode

  if (defaultMode === 'light' || defaultMode === 'dark') {
    return defaultMode
  }

  return getSystemThemeMode()
}

function subscribe(onStoreChange: () => void, storageKey: string): () => void {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleSystemChange = () => {
    if (readStoredThemeMode(storageKey) !== null || getRootThemeMode() !== null) return
    onStoreChange()
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return
    onStoreChange()
  }

  mediaQuery.addEventListener('change', handleSystemChange)
  window.addEventListener('storage', handleStorage)
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange)

  return () => {
    mediaQuery.removeEventListener('change', handleSystemChange)
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange)
  }
}

export function useColorMode(options: UseColorModeOptions = {}): UseColorModeReturn {
  const storageKey = options.storageKey ?? DEFAULT_THEME_STORAGE_KEY
  const cookieKey = options.cookieKey ?? DEFAULT_THEME_COOKIE_KEY
  const defaultMode = options.defaultMode ?? 'system'

  const themeMode = useSyncExternalStore(
    (onStoreChange) => subscribe(onStoreChange, storageKey),
    () => getSnapshot(defaultMode, storageKey),
    () => (defaultMode === 'dark' ? 'dark' : 'light'),
  )

  useInsertionEffect(() => {
    const storedMode = readStoredThemeMode(storageKey)

    if (storedMode) {
      applyThemePreference(storedMode)
      return
    }

    if (defaultMode === 'light' || defaultMode === 'dark') {
      applyThemePreference(defaultMode)
      return
    }

    if (getRootThemeMode() === null) {
      clearThemeMode()
    }
  }, [defaultMode, storageKey, themeMode])

  const setThemeMode = (mode: ThemeMode) => {
    applyThemePreference(mode)
    persistThemeMode(mode, storageKey)
    persistThemePreferenceCookie(mode, cookieKey)
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }

  const toggleThemeMode = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  return { themeMode, setThemeMode, toggleThemeMode }
}

export { getSystemThemeMode }
