'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { applyThemeCSSVariables, extractThemeVariables } from './extractThemeVars'
import { generateThemeScript } from './themeScript'

export interface ThemeContextType {
  cssVariables: Record<string, string>
  isThemeInitialized: boolean
  themeMode: 'light' | 'dark'
  setThemeMode: (mode: 'light' | 'dark') => void
  toggleThemeMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'ui-lab-theme-complete'

interface StoredThemeConfig {
  themeMode: 'light' | 'dark'
  cssVariables: Record<string, string>
}

function injectThemeScript(): void {
  if (typeof document === 'undefined') return

  const scriptId = 'theme-provider-script'
  if (document.getElementById(scriptId)) return

  const script = document.createElement('script')
  script.id = scriptId
  script.type = 'text/javascript'
  script.textContent = generateThemeScript()
  if (script.nonce) script.nonce = ''

  // Try to insert at the very beginning of head
  const head = document.head
  if (head && head.firstChild) {
    head.insertBefore(script, head.firstChild)
  } else if (head) {
    head.appendChild(script)
  }
}

function convertToUnderlyingVariables(colorPalette: Record<string, string>): Record<string, string> {
  return colorPalette
}

function invertPaletteForMode(cssVariables: Record<string, string>, mode: 'light' | 'dark'): Record<string, string> {
  if (mode === 'dark') return cssVariables

  const inverted: Record<string, string> = {}
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const shadeMap: Record<number, number> = {
    50: 950, 100: 900, 200: 800, 300: 700, 400: 600, 500: 500,
    600: 400, 700: 300, 800: 200, 900: 100, 950: 50,
  }

  Object.entries(cssVariables).forEach(([key, value]) => {
    const match = key.match(/--(.+?)-(\d+)$/)
    if (match) {
      const [, role, shadeStr] = match
      const shade = parseInt(shadeStr) as typeof shades[number]
      const invertedShade = shadeMap[shade]
      if (invertedShade !== undefined) {
        const invertedKey = `--${role}-${invertedShade}`
        inverted[key] = cssVariables[invertedKey] || value
      }
    }
  })

  return Object.keys(inverted).length > 0 ? inverted : cssVariables
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({})
  const [isThemeInitialized, setIsThemeInitialized] = useState(false)
  const [themeMode, setThemeModeState] = useState<'light' | 'dark'>('dark')
  const [darkPalette, setDarkPalette] = useState<Record<string, string> | null>(null)

  const setThemeMode = (mode: 'light' | 'dark') => {
    // Update DOM immediately to prevent visual flashing
    if (typeof window !== 'undefined') {
      try {
        document.documentElement.setAttribute('data-theme', mode)
      } catch (e) {
        console.warn('[ThemeProvider] Failed to set data-theme attribute:', e)
      }
    }

    // Update state and variables
    setThemeModeState(mode)

    if (typeof window === 'undefined') return

    try {
      let palette = darkPalette

      if (!darkPalette) {
        const { cssVariables: extracted } = extractThemeVariables('dark')
        if (Object.keys(extracted).length > 0) {
          palette = extracted
          setDarkPalette(extracted)
        }
      }

      if (palette && Object.keys(palette).length > 0) {
        const adjusted = invertPaletteForMode(palette, mode)
        const underlying = convertToUnderlyingVariables(adjusted)
        // Apply CSS variables immediately to DOM
        applyThemeCSSVariables(underlying)
        // Update state after DOM is updated
        setCssVariables(adjusted)

        try {
          const stored: StoredThemeConfig = {
            themeMode: mode,
            cssVariables: adjusted,
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
        } catch (e) {
          console.warn('[ThemeProvider] Failed to persist theme:', e)
        }
      }
    } catch (e) {
      console.warn('[ThemeProvider] Failed to update theme mode:', e)
    }
  }

  const toggleThemeMode = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    injectThemeScript()

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          const data = JSON.parse(saved) as StoredThemeConfig
          // Validate the saved data
          if (data && (data.themeMode === 'light' || data.themeMode === 'dark')) {
            setThemeModeState(data.themeMode)
            // Ensure theme is applied to DOM (the inline script should have done this, but sync it)
            document.documentElement.setAttribute('data-theme', data.themeMode)
            if (data.cssVariables && Object.keys(data.cssVariables).length > 0) {
              setCssVariables(data.cssVariables)
              setDarkPalette(data.cssVariables)
              // Re-apply CSS variables to DOM to ensure consistency
              const underlying = convertToUnderlyingVariables(data.cssVariables)
              applyThemeCSSVariables(underlying)
            }
          } else {
            throw new Error('Invalid saved theme data')
          }
        } catch (parseError) {
          console.warn('[ThemeProvider] Failed to parse saved theme:', parseError)
          // Clear invalid cache
          try {
            localStorage.removeItem(STORAGE_KEY)
          } catch (e) {
            // Ignore removal errors
          }
          // Fall back to extracting theme from CSS
          const { cssVariables: extracted } = extractThemeVariables('dark')
          if (Object.keys(extracted).length > 0) {
            setDarkPalette(extracted)
            setCssVariables(extracted)
            const underlying = convertToUnderlyingVariables(extracted)
            applyThemeCSSVariables(underlying)
          }
          setThemeModeState('dark')
          document.documentElement.setAttribute('data-theme', 'dark')
        }
      } else {
        // No saved theme, extract from CSS or use dark as default
        const { cssVariables: extracted } = extractThemeVariables('dark')
        if (Object.keys(extracted).length > 0) {
          setDarkPalette(extracted)
          setCssVariables(extracted)
          const underlying = convertToUnderlyingVariables(extracted)
          applyThemeCSSVariables(underlying)
        }
        setThemeModeState('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    } catch (e) {
      console.warn('[ThemeProvider] Failed to initialize theme:', e)
      setThemeModeState('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } finally {
      setIsThemeInitialized(true)
    }
  }, [])

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
  if (context === undefined) {
    console.warn(
      '[useThemeVariables] Hook must be used within a ThemeProvider. Returning empty theme.'
    )
    return {
      cssVariables: {},
      isThemeInitialized: false,
      themeMode: 'dark',
      setThemeMode: () => { },
      toggleThemeMode: () => { },
    }
  }
  return context
}
