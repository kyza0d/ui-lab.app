import { generateThemeScript } from './themeScript'

/**
 * ThemeScriptInjector - Server Component for FOUC Prevention
 *
 * Eliminates Flash of Unstyled Content (FOUC) by injecting the theme
 * recovery script as a raw <script> tag in the initial HTML response.
 *
 * This script runs BEFORE React hydration, ensuring correct theme colors
 * are applied before the browser renders the page.
 *
 * ⚠️ IMPORTANT: This MUST be used in a SERVER COMPONENT layout.
 *
 * Why raw <script> instead of next/script with beforeInteractive:
 * - Server component: script is included in HTML response
 * - Browser executes script before rendering anything
 * - Theme is applied from localStorage immediately
 * - React hydrates after (theme already applied = no flash)
 *
 * How to use:
 *
 * 1. In layout.tsx (SERVER COMPONENT - no 'use client'):
 * ```tsx
 * import { ThemeScriptInjector } from 'ui-lab-components'
 * import { ClientProviders } from './providers'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en" suppressHydrationWarning>
 *       <head>
 *         <ThemeScriptInjector />
 *       </head>
 *       <body>
 *         <ClientProviders>{children}</ClientProviders>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * 2. In providers.tsx (CLIENT COMPONENT):
 * ```tsx
 * 'use client'
 * import { ThemeProvider } from 'ui-lab-components'
 *
 * export function ClientProviders({ children }) {
 *   return <ThemeProvider>{children}</ThemeProvider>
 * }
 * ```
 *
 * Timeline:
 * 1. Server renders layout (this component executes)
 * 2. Script tag is included in HTML response
 * 3. Browser receives HTML with script in <head>
 * 4. Browser executes script immediately
 * 5. Theme is read from localStorage and applied
 * 6. Browser renders page with correct colors
 * 7. React hydrates (colors already correct = no flash)
 */
export function ThemeScriptInjector() {
  const script = generateThemeScript()

  return (
    <script
      id="ui-lab-theme-injector"
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  )
}
