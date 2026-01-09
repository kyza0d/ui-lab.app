# FOUC Elimination: Technical Analysis

## Problem Statement

When users refresh a page with a saved dark theme preference, they see a flash of light mode before it switches to dark. This is called Flash of Unstyled Content (FOUC).

Current state:
- Using `next/script` with `beforeInteractive` strategy
- Script executes too late because layout is a client component ('use client')
- Browser renders initial HTML → React hydration starts → Script finally runs → Theme changes → User sees flash

## Why Current Approach Fails

```
Browser receives HTML response
↓
Renders initial DOM (with default light CSS variables)
↓
React hydration begins (client component mounts)
↓
Script component initializes (AFTER hydration starts!)
↓
Script reads localStorage and applies theme
↓
CSS variables update → COLOR FLASH
```

The timing is critical: even with `beforeInteractive`, when the layout is a client component, React's hydration process means the browser has already rendered the initial HTML and started processing JavaScript.

## Approach Analysis

### Approach 1: Server Component with Raw Script Injection ✅ RECOMMENDED

**How it works:**
- Root layout is a server component (no 'use client' directive)
- Server component directly emits `<script>` tag as HTML in the response
- Script runs before React hydration, even before layout rendering
- Client component ThemeProvider wraps children for state management

**Timing:**
```
Browser receives HTML response WITH script tag in head
↓
Script executes immediately (before rendering anything)
↓
Theme is read from localStorage and CSS variables applied to document
↓
Browser renders page with correct theme colors
↓
React hydrates (color is already correct)
↓
NO FLASH ✓
```

**Pros:**
- ✅ Script runs earliest possible (in HTTP response)
- ✅ Eliminates flash entirely
- ✅ Clean separation of concerns (server for script, client for provider)
- ✅ Minimal consumer boilerplate

**Cons:**
- ⚠️ Layout cannot have 'use client' directive (must be server component)
- ⚠️ Client components must be children or wrapped inside

**Implementation:**
```tsx
// layout.tsx (SERVER COMPONENT - no 'use client')
import { ThemeScriptInjector } from 'ui-lab-components'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScriptInjector /> {/* Injects script as raw HTML */}
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders> {/* Client component */}
      </body>
    </html>
  )
}

// providers.tsx (CLIENT COMPONENT)
'use client'
import { ThemeProvider } from 'ui-lab-components'

export function ClientProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
```

### Approach 2: Custom Middleware + Response Headers ❌ NOT RECOMMENDED

Inject script via middleware/HTTP headers. Too complex, unreliable with streaming responses, doesn't work with all deployment platforms.

### Approach 3: Build-time Injection ❌ NOT RECOMMENDED

Inject script during Next.js build time. Requires modifying next.config.js, complicates build process, less flexible for future changes.

### Approach 4: Inline Script in HTML String ❌ NOT RECOMMENDED

Embed script string directly in layout JSX. Violates security best practices, violates requirement of "no manual script strings", verbose, hard to maintain.

## Recommendation

**Use Approach 1: Server Component with Raw Script Injection**

Reasons:
1. ✅ Solves FOUC completely by running script earliest possible
2. ✅ Aligns with Next.js 16 best practices (server components by default)
3. ✅ Minimal consumer boilerplate (just import component and use)
4. ✅ Clean separation: server for initialization, client for state management
5. ✅ Future-proof: works with streaming, edge functions, etc.

## Implementation Details

### Key Implementation: Direct Script Injection

Use `generateThemeScript()` directly in the server component layout with a raw `<script>` tag:

```tsx
// layout.tsx (SERVER COMPONENT)
import { generateThemeScript } from 'ui-lab-components'
import { ClientProviders } from './providers'

export default function RootLayout({ children }) {
  const themeScript = generateThemeScript()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="ui-lab-theme-injector"
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}

// providers.tsx (CLIENT COMPONENT)
'use client'

import { ThemeProvider } from 'ui-lab-components'

export function ClientProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
```

Why this approach:
- ✅ `generateThemeScript()` is a pure function (no client dependencies)
- ✅ Can be imported directly in server component layouts
- ✅ Raw `<script>` tag is included in initial HTML response
- ✅ No wrapper component needed
- ✅ Minimal boilerplate for consumers

### Optional: ThemeScriptInjector Component

The `ThemeScriptInjector` server component is provided as a convenience if consumers want a component-based approach. However, due to Next.js module resolution constraints, it must be imported from a separate entry point that doesn't include client components.

For simplicity, consumers can use `generateThemeScript()` directly as shown above.

## Why This Works

1. **Server Component Execution**: ThemeScriptInjector executes on the server at render time
2. **HTML Response**: The script tag is included in the HTML response sent to browser
3. **Browser Parsing**: When browser parses HTML head, it encounters script tag
4. **Immediate Execution**: Script executes immediately, before any CSS/layout rendering
5. **localStorage Applied**: Theme variables are set on document before rendering
6. **No Flash**: Page renders with correct theme from the start
7. **React Hydration**: When React hydrates, theme is already applied
8. **Functionality**: ThemeProvider context still manages state for theme toggling

## Edge Cases Handled

- **SSR**: Works correctly with server-side rendering
- **Streaming**: Works with React Server Component streaming
- **Hydration**: Prevents hydration mismatches via suppressHydrationWarning
- **localStorage**: Script checks localStorage before rendering
- **Dark Mode**: Default is dark; light mode inverts shade values

## Success Verification

The implementation is successful when:
1. Page renders with correct theme immediately (no light flash)
2. Refresh with saved dark theme → see dark immediately
3. Theme toggle still works
4. localStorage persists selection
5. No TypeScript errors
6. Consumer code is clean and minimal
