/**
 * EXAMPLE: Advanced Theme Patterns
 * Programmatic control, conditional rendering, and smooth transitions
 */

/**
 * 1. Programmatic theme control
 * Set theme to a specific mode based on user preference or application logic
 *
 * 'use client'
 * import { useTheme } from '@ui/providers'
 * import { Button } from 'ui-lab-components'
 *
 * export function ThemeControlPanel() {
 *   const { themeMode, setThemeMode, resetToDevicePreference } = useTheme()
 *
 *   return (
 *     <div className="flex gap-2">
 *       <Button
 *         variant={themeMode === 'light' ? 'primary' : 'outline'}
 *         onPress={() => setThemeMode('light')}
 *       >
 *         Light
 *       </Button>
 *       <Button
 *         variant={themeMode === 'dark' ? 'primary' : 'outline'}
 *         onPress={() => setThemeMode('dark')}
 *       >
 *         Dark
 *       </Button>
 *       <Button variant="ghost" onPress={resetToDevicePreference}>
 *         Reset to Device
 *       </Button>
 *     </div>
 *   )
 * }
 */

/**
 * 2. Conditional rendering based on theme
 * Show different content or styling based on current theme mode
 *
 * 'use client'
 * import { useThemeMode } from '@ui/providers'
 *
 * export function ThemeAwareContent() {
 *   const themeMode = useThemeMode()
 *
 *   return (
 *     <div className="p-4 border border-background-700 rounded-lg">
 *       {themeMode === 'light' ? (
 *         <div className="bg-background-100 text-foreground-400">
 *           <h2>Light Mode Content</h2>
 *           <p>This content is optimized for light mode viewing.</p>
 *         </div>
 *       ) : (
 *         <div className="bg-background-900 text-foreground-50">
 *           <h2>Dark Mode Content</h2>
 *           <p>This content is optimized for dark mode viewing.</p>
 *         </div>
 *       )}
 *     </div>
 *   )
 * }
 */

/**
 * 3. Smooth theme transitions using View Transition API
 * Creates animated transitions when switching themes
 *
 * 'use client'
 * import { useTheme } from '@ui/providers'
 * import { Button } from 'ui-lab-components'
 *
 * export function SmoothThemeToggle() {
 *   const { themeMode, toggleThemeMode } = useTheme()
 *
 *   const handleToggleWithTransition = () => {
 *     if (!('startViewTransition' in document)) {
 *       toggleThemeMode()
 *       return
 *     }
 *     (document as any).startViewTransition(() => {
 *       toggleThemeMode()
 *     })
 *   }
 *
 *   return (
 *     <Button
 *       variant="ghost"
 *       onPress={handleToggleWithTransition}
 *       className="transition-colors duration-200"
 *     >
 *       {themeMode === 'dark' ? '☀️' : '🌙'}
 *     </Button>
 *   )
 * }
 */

/**
 * 4. Full theme information display
 * Show comprehensive theme state including device preference and manual overrides
 *
 * 'use client'
 * import { useTheme } from '@ui/providers'
 *
 * export function ThemeStatusDisplay() {
 *   const { themeMode, themeSource, devicePreference } = useTheme()
 *
 *   return (
 *     <div className="space-y-2 p-4 bg-background-800 rounded-lg text-foreground-100 text-sm">
 *       <div className="flex justify-between">
 *         <span>Active Mode:</span>
 *         <span className="font-mono">{themeMode}</span>
 *       </div>
 *       <div className="flex justify-between">
 *         <span>Source:</span>
 *         <span className="font-mono capitalize">{themeSource}</span>
 *       </div>
 *       <div className="flex justify-between">
 *         <span>Device Preference:</span>
 *         <span className="font-mono capitalize">{devicePreference}</span>
 *       </div>
 *       {themeSource === 'manual' && (
 *         <div className="mt-2 p-2 bg-accent-900 rounded text-accent-200 text-xs">
 *           ℹ️ Override active: Theme is manually set, ignoring device preference
 *         </div>
 *       )}
 *     </div>
 *   )
 * }
 */

export const metadata = {
  title: 'Advanced Theme Patterns',
  description: 'Programmatic control, conditional rendering, and smooth transitions',
  category: 'advanced' as const,
}
