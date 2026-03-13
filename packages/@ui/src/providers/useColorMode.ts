'use client'

import { useEffect, useState } from 'react'
import type { ThemeMode } from './theme-contract'
import {
  applyThemeMode,
  DEFAULT_THEME_STORAGE_KEY,
  getSystemThemeMode,
  persistThemeMode,
  readStoredThemeMode,
  resolveThemeMode,
  THEME_CHANGE_EVENT,
  type ThemePreference,
} from './theme-mode'

export interface UseColorModeOptions {
  storageKey?: string
  defaultMode?: ThemePreference
}

export interface UseColorModeReturn {
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleThemeMode: () => void
}

function getInitialThemeMode(defaultMode: ThemePreference, storageKey: string): ThemeMode {
  if (typeof window === 'undefined') {
    return defaultMode === 'dark' ? 'dark' : 'light'
  }

  return resolveThemeMode(storageKey, defaultMode)
}

export function useColorMode(options: UseColorModeOptions = {}): UseColorModeReturn {
  const storageKey = options.storageKey ?? DEFAULT_THEME_STORAGE_KEY
  const defaultMode = options.defaultMode ?? 'system'

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => getInitialThemeMode(defaultMode, storageKey))

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const sync = () => {
      const nextMode = resolveThemeMode(storageKey, defaultMode)
      applyThemeMode(nextMode)
      setThemeModeState(nextMode)
    }

    const handleSystemChange = () => {
      if (readStoredThemeMode(storageKey) !== null) return
      sync()
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return
      sync()
    }

    sync()
    mediaQuery.addEventListener('change', handleSystemChange)
    window.addEventListener('storage', handleStorage)
    window.addEventListener(THEME_CHANGE_EVENT, sync)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange)
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(THEME_CHANGE_EVENT, sync)
    }
  }, [defaultMode, storageKey])

  const setThemeMode = (mode: ThemeMode) => {
    applyThemeMode(mode)
    persistThemeMode(mode, storageKey)
    setThemeModeState(mode)
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }

  const toggleThemeMode = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  return { themeMode, setThemeMode, toggleThemeMode }
}

export { getSystemThemeMode }
