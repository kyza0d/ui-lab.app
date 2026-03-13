'use client'

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { generateThemeScript } from './themeScript'
import { applyThemeTokens, normalizeThemeTokens, type ThemeMode, type ThemeTokenBatch } from './theme-contract'

export interface ThemeContextType {
  cssVariables: Record<string, string>
  isThemeInitialized: boolean
  themeMode: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleThemeMode: () => void
}

export interface ThemeProviderProps {
  children: React.ReactNode
  themes?: Partial<Record<ThemeMode, ThemeTokenBatch>>
  defaultMode?: ThemeMode | 'system'
  storageKey?: string
}

interface StoredThemeConfig {
  themeMode?: ThemeMode
  cssVariables?: Record<string, string>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const DEFAULT_STORAGE_KEY = 'ui-lab-theme-complete'

function injectThemeScript(storageKey: string, defaultMode: ThemeProviderProps['defaultMode']): void {
  if (typeof document === 'undefined') return

  const scriptId = 'theme-provider-script'
  const existing = document.getElementById(scriptId)
  const nextScript = generateThemeScript({ storageKey, defaultMode })

  if (existing) {
    if (existing.textContent !== nextScript) {
      existing.textContent = nextScript
    }
    return
  }

  const script = document.createElement('script')
  script.id = scriptId
  script.type = 'text/javascript'
  script.textContent = nextScript

  const head = document.head
  if (head?.firstChild) {
    head.insertBefore(script, head.firstChild)
    return
  }

  head?.appendChild(script)
}

function getSystemThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function readStoredTheme(storageKey: string): StoredThemeConfig | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return null
    return JSON.parse(raw) as StoredThemeConfig
  } catch {
    return null
  }
}

function resolveInitialThemeMode(
  defaultMode: ThemeProviderProps['defaultMode'],
  storageKey: string,
): ThemeMode {
  const storedTheme = readStoredTheme(storageKey)?.themeMode
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  if (defaultMode === 'light' || defaultMode === 'dark') {
    return defaultMode
  }

  return getSystemThemeMode()
}

function syncRootThemeMode(mode: ThemeMode): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.dataset.theme = mode
  root.style.colorScheme = mode
  root.classList.toggle('dark', mode === 'dark')
  root.classList.toggle('light', mode === 'light')
}

function persistThemeConfig(
  storageKey: string,
  mode: ThemeMode,
  cssVariables: Record<string, string>,
): void {
  if (typeof window === 'undefined') return

  try {
    const payload: StoredThemeConfig = { themeMode: mode }
    if (Object.keys(cssVariables).length > 0) {
      payload.cssVariables = cssVariables
    }
    localStorage.setItem(storageKey, JSON.stringify(payload))
  } catch {
    // Ignore storage failures. The DOM has already been updated.
  }
}

function getThemeTokensForMode(
  themes: ThemeProviderProps['themes'],
  mode: ThemeMode,
): Record<string, string> {
  return normalizeThemeTokens(themes?.[mode] ?? {})
}

export function ThemeProvider({
  children,
  themes,
  defaultMode = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({})
  const [isThemeInitialized, setIsThemeInitialized] = useState(false)
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => resolveInitialThemeMode(defaultMode, storageKey))
  const appliedTokensRef = useRef<Record<string, string>>({})

  const applyMode = (mode: ThemeMode) => {
    syncRootThemeMode(mode)

    const nextTokens = getThemeTokensForMode(themes, mode)
    if (Object.keys(nextTokens).length > 0) {
      applyThemeTokens(nextTokens, appliedTokensRef.current)
      appliedTokensRef.current = nextTokens
      setCssVariables(nextTokens)
      persistThemeConfig(storageKey, mode, nextTokens)
    } else {
      setCssVariables({})
      persistThemeConfig(storageKey, mode, {})
    }

    setThemeModeState(mode)
  }

  const setThemeMode = (mode: ThemeMode) => {
    applyMode(mode)
  }

  const toggleThemeMode = () => {
    applyMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    injectThemeScript(storageKey, defaultMode)

    const initialMode = resolveInitialThemeMode(defaultMode, storageKey)
    const storedVariables = readStoredTheme(storageKey)?.cssVariables ?? {}

    syncRootThemeMode(initialMode)

    const nextTokens = Object.keys(getThemeTokensForMode(themes, initialMode)).length > 0
      ? getThemeTokensForMode(themes, initialMode)
      : storedVariables

    if (Object.keys(nextTokens).length > 0) {
      applyThemeTokens(nextTokens, appliedTokensRef.current)
      appliedTokensRef.current = nextTokens
      setCssVariables(nextTokens)
      persistThemeConfig(storageKey, initialMode, nextTokens)
    }

    setThemeModeState(initialMode)
    setIsThemeInitialized(true)
  }, [defaultMode, storageKey, themes])

  const contextValue = useMemo(
    () => ({
      cssVariables,
      isThemeInitialized,
      themeMode,
      setThemeMode,
      toggleThemeMode,
    }),
    [cssVariables, isThemeInitialized, themeMode]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeVariables(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context) return context

  return {
    cssVariables: {},
    isThemeInitialized: false,
    themeMode: 'light',
    setThemeMode: () => { },
    toggleThemeMode: () => { },
  }
}
