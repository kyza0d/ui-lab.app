/**
 * EXAMPLE: Provider Setup
 * Wrap your application root in ThemeProvider to enable theme support.
 * This should be placed at the very top level of your app.
 *
 * File: app/providers.tsx
 */

// 'use client'
// import React from 'react'
// import { ThemeProvider } from '@ui/providers'
//
// export function Providers({ children }: { children: React.ReactNode }) {
//   return <ThemeProvider>{children}</ThemeProvider>
// }

/**
 * Then in app/layout.tsx:
 *
 * import { Providers } from './providers'
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <body>
 *         <Providers>{children}</Providers>
 *       </body>
 *     </html>
 *   )
 * }
 */

export const metadata = {
  title: 'Provider Setup',
  description: 'Wrap your app root in ThemeProvider to enable theme support',
  category: 'setup' as const,
}
