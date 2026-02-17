/**
 * EXAMPLE: Theme Toggle Component
 * Theme toggle button component.
 * Displays the current theme and allows users to switch between light and dark modes.
 *
 * File: components/theme-toggle.tsx
 */

// 'use client'
// import { useTheme } from '@ui/providers'
// import { Button } from 'ui-lab-components'
//
// export function ThemeToggle() {
//   const { themeMode, toggleThemeMode } = useTheme()
//
//   return (
//     <Button
//       variant="ghost"
//       size="sm"
//       onPress={toggleThemeMode}
//       aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
//     >
//       {themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
//     </Button>
//   )
// }

/**
 * Alternative: Theme indicator (read-only)
 * Shows current theme without toggle capability
 *
 * 'use client'
 * import { useTheme } from '@ui/providers'
 *
 * export function ThemeIndicator() {
 *   const { themeMode, themeSource } = useTheme()
 *
 *   return (
 *     <div className="flex items-center gap-2 text-foreground-400 text-sm">
 *       <span>{themeMode === 'dark' ? '🌙' : '☀️'}</span>
 *       <span className="capitalize">{themeMode} mode</span>
 *       {themeSource === 'device' && <span className="text-foreground-500">(device)</span>}
 *     </div>
 *   )
 * }
 */

export const metadata = {
  title: 'Theme Toggle Component',
  description: 'Create a toggle button to switch between light and dark modes',
  category: 'usage' as const,
}
