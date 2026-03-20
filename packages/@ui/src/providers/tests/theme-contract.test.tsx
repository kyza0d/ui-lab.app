import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ThemeProvider } from '../ThemeProvider'
import { useThemeMode } from '../useTheme'
import { generateColorModeScript } from '../themeScript'
import { parseThemeCookie, resolveThemeRootState } from '../theme-server'
import {
  applyThemeTokens,
  createThemeStylesheet,
  normalizeThemeTokens,
  type ThemeTokenBatch,
} from '../theme-contract'
import { useColorMode } from '../useColorMode'
import { generateThemePalettes as generatePackageThemePalettes, palettesToCssVariables } from '../extractThemeVars'
import { themes as siteThemes } from '../../../../../apps/site/src/features/theme/constants/themes'
import { generateThemePalettes as generateSiteThemePalettes } from '../../../../../apps/site/src/features/theme/lib/color/palette'
import { paletteToCssVars } from '../../../../../apps/site/src/features/theme/lib/color/palette-css'
import { generateThemeSetupFiles } from '../../../../../apps/site/src/features/theme/config/theme/generator'

const lightTokens: ThemeTokenBatch = {
  'background-500': 'oklch(60% 0 0)',
  'background-950': 'oklch(98% 0 0)',
  'foreground-50': 'oklch(12% 0 0)',
  'accent-500': 'oklch(32% 0.02 250)',
}

const darkTokens: ThemeTokenBatch = {
  'background-500': 'oklch(50% 0 0)',
  'background-950': 'oklch(18% 0 0)',
  'foreground-50': 'oklch(98% 0 0)',
  'accent-500': 'oklch(72% 0.02 250)',
}

const siteSemanticColors = {
  success: {
    light: { color: { l: 0.55, c: 0.187, h: 142 }, chromaLimit: 0.25 },
    dark: { color: { l: 0.55, c: 0.187, h: 142 }, chromaLimit: 0.25 },
  },
  danger: {
    light: { color: { l: 0.55, c: 0.22, h: 25 }, chromaLimit: 0.25 },
    dark: { color: { l: 0.55, c: 0.22, h: 25 }, chromaLimit: 0.25 },
  },
  warning: {
    light: { color: { l: 0.55, c: 0.209, h: 80 }, chromaLimit: 0.25 },
    dark: { color: { l: 0.55, c: 0.209, h: 80 }, chromaLimit: 0.25 },
  },
  info: {
    light: { color: { l: 0.55, c: 0.187, h: 255 }, chromaLimit: 0.25 },
    dark: { color: { l: 0.55, c: 0.187, h: 255 }, chromaLimit: 0.25 },
  },
} as const

const packageThemeConfig = {
  background: { l: 0.5, c: 0.012, h: 240 },
  foreground: { l: 0.55, c: 0.018, h: 240 },
  accent: { l: 0.55, c: 0.198, h: 250 },
  success: siteSemanticColors.success.light.color,
  danger: siteSemanticColors.danger.light.color,
  warning: siteSemanticColors.warning.light.color,
  info: siteSemanticColors.info.light.color,
} as const

function getSiteThemeBatch(mode: 'light' | 'dark'): ThemeTokenBatch {
  const palettes = generateSiteThemePalettes(
    packageThemeConfig.background,
    packageThemeConfig.foreground,
    packageThemeConfig.accent,
    mode,
    0,
    siteSemanticColors,
    0.3,
  )

  return {
    ...paletteToCssVars('background', palettes.background),
    ...paletteToCssVars('foreground', palettes.foreground),
    ...paletteToCssVars('accent', palettes.accent),
    ...paletteToCssVars('success', palettes.semantic?.success ?? {}),
    ...paletteToCssVars('danger', palettes.semantic?.danger ?? {}),
    ...paletteToCssVars('warning', palettes.semantic?.warning ?? {}),
    ...paletteToCssVars('info', palettes.semantic?.info ?? {}),
  }
}

function getSitePresetThemeBatch(themeName: keyof typeof siteThemes, mode: 'light' | 'dark'): ThemeTokenBatch {
  const config = siteThemes[themeName][mode]
  const palettes = generateSiteThemePalettes(
    config.background,
    config.foreground,
    config.accent,
    mode,
    0,
    config.semantic,
    config.accentChromaLimit ?? 0.3,
    config.accentEasing,
    config.accentChromaScaling,
    config.globalAdjustments,
  )

  return {
    ...paletteToCssVars('background', palettes.background),
    ...paletteToCssVars('foreground', palettes.foreground),
    ...paletteToCssVars('accent', palettes.accent),
    ...paletteToCssVars('success', palettes.semantic?.success ?? {}),
    ...paletteToCssVars('danger', palettes.semantic?.danger ?? {}),
    ...paletteToCssVars('warning', palettes.semantic?.warning ?? {}),
    ...paletteToCssVars('info', palettes.semantic?.info ?? {}),
  }
}

function ThemeModeProbe() {
  const { themeMode, toggleThemeMode } = useThemeMode()

  return (
    <>
      <output data-testid="theme-provider-mode">{themeMode}</output>
      <button type="button" onClick={toggleThemeMode}>
        toggle-provider-theme
      </button>
    </>
  )
}

function ColorModeProbe() {
  const { themeMode, toggleThemeMode } = useColorMode()

  return (
    <>
      <output data-testid="color-mode">{themeMode}</output>
      <button type="button" onClick={toggleThemeMode}>
        toggle-color-mode
      </button>
    </>
  )
}

describe('theme-contract', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
    document.cookie = 'ui-lab-theme=; Path=/; Max-Age=0'
  })

  it('normalizes token keys to CSS variable names', () => {
    expect(
      normalizeThemeTokens({
        'background-500': 'white',
        '--foreground-50': 'black',
      }),
    ).toEqual({
      '--background-500': 'white',
      '--foreground-50': 'black',
    })
  })

  it('creates a static two-mode stylesheet with Tailwind aliases', () => {
    const css = createThemeStylesheet({
      light: lightTokens,
      dark: darkTokens,
      defaultMode: 'dark',
    })

    expect(css).toContain(':root {')
    expect(css).toContain('color-scheme: dark;')
    expect(css).toContain('--background-950: oklch(18% 0 0);')
    expect(css).toContain(':root[data-theme="light"]')
    expect(css).toContain('--background-950: oklch(98% 0 0);')
    expect(css).not.toContain(':root[data-theme="dark"]')
    expect(css).toContain('--color-background-500: var(--background-500);')
    expect(css).not.toContain('@media (prefers-color-scheme: dark)')
  })

  it('applies normalized theme tokens directly to the root element', () => {
    applyThemeTokens(lightTokens)

    expect(document.documentElement.style.getPropertyValue('--background-500')).toBe('oklch(60% 0 0)')
    expect(document.documentElement.style.getPropertyValue('--accent-500')).toBe('oklch(32% 0.02 250)')
  })

  it('matches the site color generator for the default light and dark scales', () => {
    const packageLight = palettesToCssVariables(generatePackageThemePalettes(packageThemeConfig, { mode: 'light', accLimit: 0.3 }))
    const packageDark = palettesToCssVariables(generatePackageThemePalettes(packageThemeConfig, { mode: 'dark', accLimit: 0.3 }))

    expect(packageLight).toEqual(getSiteThemeBatch('light'))
    expect(packageDark).toEqual(getSiteThemeBatch('dark'))
  })

  it('generates theme setup files with both light and dark palettes', () => {
    const generated = generateThemeSetupFiles(siteThemes.Vitesse.dark, 'dark', 1.25, 1, 1, 1, 1, 0.2, 1, 1, 1)
    const expectedLight = getSitePresetThemeBatch('Vitesse', 'light')
    const expectedDark = getSitePresetThemeBatch('Vitesse', 'dark')

    expect(generated.themeCss).toContain(':root[data-theme=\'light\']')
    expect(generated.themeCss).not.toContain(':root[data-theme=\'dark\']')
    expect(generated.themeCss).toContain(`--background-950: ${expectedDark['--background-950']};`)
    expect(generated.themeCss).toContain(`--background-950: ${expectedLight['--background-950']};`)
    expect(generated.themeCss).toContain('--color-background-950: var(--background-950);')
  })

  it('resolves server-side root state from explicit theme preferences', () => {
    expect(parseThemeCookie('dark')).toBe('dark')
    expect(parseThemeCookie('system')).toBe('system')
    expect(parseThemeCookie('bogus')).toBeNull()
    expect(resolveThemeRootState('system')).toEqual({})
    expect(resolveThemeRootState('dark')).toEqual({
      className: 'dark',
      colorScheme: 'dark',
      dataTheme: 'dark',
    })
  })
})

describe('ThemeProvider', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('uses provided theme batches to resolve and apply the initial system mode', async () => {
    render(
      <ThemeProvider themes={{ light: lightTokens, dark: darkTokens }} defaultMode="system">
        <ThemeModeProbe />
      </ThemeProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-provider-mode')).toHaveTextContent('dark')
    })

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.style.colorScheme).toBe('dark')
    expect(document.documentElement.style.getPropertyValue('--background-950')).toBe('oklch(18% 0 0)')
  })

  it('toggles between provided light and dark token batches', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider themes={{ light: lightTokens, dark: darkTokens }} defaultMode="light">
        <ThemeModeProbe />
      </ThemeProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme-provider-mode')).toHaveTextContent('light')
    })

    await user.click(screen.getByRole('button', { name: 'toggle-provider-theme' }))

    await waitFor(() => {
      expect(screen.getByTestId('theme-provider-mode')).toHaveTextContent('dark')
    })

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.style.getPropertyValue('--background-950')).toBe('oklch(18% 0 0)')
  })
})

describe('useColorMode', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('resolves the system mode without stamping an explicit override', async () => {
    document.documentElement.style.setProperty('--background-950', 'from-stylesheet')

    render(<ColorModeProbe />)

    await waitFor(() => {
      expect(screen.getByTestId('color-mode')).toHaveTextContent('dark')
    })

    expect(document.documentElement.dataset.theme).toBeUndefined()
    expect(document.documentElement.style.colorScheme).toBe('')
    expect(document.documentElement.style.getPropertyValue('--background-950')).toBe('from-stylesheet')
  })

  it('toggles theme mode and persists the selected mode', async () => {
    const user = userEvent.setup()

    render(<ColorModeProbe />)

    await waitFor(() => {
      expect(screen.getByTestId('color-mode')).toHaveTextContent('dark')
    })

    await user.click(screen.getByRole('button', { name: 'toggle-color-mode' }))

    await waitFor(() => {
      expect(screen.getByTestId('color-mode')).toHaveTextContent('light')
    })

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(JSON.parse(localStorage.getItem('ui-lab-theme-complete') ?? '{}')).toEqual({ themeMode: 'light' })
  })

  it('prefers a stored theme over the system mode', async () => {
    localStorage.setItem('ui-lab-theme-complete', JSON.stringify({ themeMode: 'light' }))

    render(<ColorModeProbe />)

    await waitFor(() => {
      expect(screen.getByTestId('color-mode')).toHaveTextContent('light')
    })

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })
})

describe('generateColorModeScript', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.className = ''
    document.documentElement.removeAttribute('style')
    localStorage.clear()
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('uses the stored theme before hydration when available', () => {
    localStorage.setItem('ui-lab-theme-complete', JSON.stringify({ themeMode: 'light' }))

    window.eval(generateColorModeScript())

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })

  it('falls back to the requested default mode', () => {
    window.eval(generateColorModeScript({ defaultMode: 'light' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
  })
})
