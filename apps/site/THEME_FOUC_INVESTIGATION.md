# Theme FOUC and Spacing Variable Reliability Issue

## Current System Overview

### Architecture
This is a Next.js application with dynamic theming that allows users to customize:
- **Colors**: Theme mode (light/dark), background/foreground/accent colors, semantic colors
- **Typography**: Font size scale, font weight scale, type scale ratio
- **Layout**: Border radius, border width, spacing scale

### Current Implementation

#### 1. Inline Script (src/app/layout.tsx, lines 31-148)
- Synchronous JavaScript that executes in `<head>` before React hydration
- Reads from localStorage: `uilab_palette_cache` and `theme-preferences`
- Applies CSS variables via `document.documentElement.style.setProperty()`
- Flow:
  ```
  1. Read palette cache (colors) from localStorage → apply via setProperty
  2. Read theme preferences (typography, layout) from localStorage → calculate and apply
  3. Calculate typography scales → apply via setProperty
  4. Calculate spacing scales → apply via setProperty
  5. Calculate border radius/width → apply via setProperty
  ```

#### 2. Palette Cache (src/lib/palette-cache.ts)
- Pre-computed color CSS variables stored in localStorage key: `uilab_palette_cache`
- Structure: `{ colors, cssVariables, themeMode, timestamp, spacingVariables }`
- Applied early in inline script for fast initialization

#### 3. Theme Preferences Storage (src/lib/theme-persistence.ts)
- Raw preferences stored in localStorage key: `theme-preferences`
- Structure: `{ colors, typography, layout, mode }`
- Used as source of truth for recreating computed values on page load

#### 4. Theme Storage Hook (src/hooks/use-theme-storage.ts)
- When user changes settings: applies immediately to DOM + saves to localStorage
- Also computes and caches spacing variables for next page load
- Called from settings panel (src/components/landing/settings-panel.tsx)

## Current Problem: 2/3 Reliability on Reload

### Observed Behavior
- After modifying spacing scale in settings and reloading: ~66% success rate
- Sometimes spacing reverts to defaults despite cache existing
- No clear pattern to when it fails

### Root Cause Analysis (Hypothetical)

#### Potential Issues:
1. **Race Condition in Cache Writing**
   - `useThemeStorage` calls `cachePalette()` which writes to localStorage
   - `saveThemePreferences()` also writes to localStorage immediately after
   - If either write fails or is incomplete when page reloads, cache is corrupted
   - Browser might not have fully flushed localStorage before reload

2. **Data Consistency Issues**
   - Spacing is computed from `theme-preferences.layout.spacingScale` in hook
   - But if `theme-preferences` hasn't fully saved to localStorage yet, spacing calculation uses old values
   - Cache might contain stale spacing values

3. **Async/Timing Issues**
   - Multiple synchronized calls to localStorage in quick succession
   - JSON.parse/stringify operations on large objects
   - No error handling if parsing fails
   - Inline script assumes data exists and is valid - no fallback

4. **Storage Quota/Reliability**
   - localStorage can fail silently in some browsers/conditions
   - No retry logic or verification that write succeeded
   - No checksum/version validation of cached data

5. **Timing Gap in Inline Script**
   - Script reads from localStorage and immediately applies values
   - But if localStorage read returns undefined/empty, script has no fallback
   - Defaults from globals.css are used, causing FOUC anyway

## Implementation Details to Note

### Files Modified Recently
- `src/app/layout.tsx`: Inline script that applies theme on page load
- `src/lib/palette-cache.ts`: Extended to include spacingVariables
- `src/hooks/use-theme-storage.ts`: Computes and caches spacing variables
- `src/lib/theme-persistence.ts`: Loads/saves theme preferences
- `src/app/globals.css`: Contains CSS default values

### Current Code Flow (On Page Reload)
1. Browser loads HTML
2. Inline script executes:
   - `localStorage.getItem('uilab_palette_cache')`
   - Applies colors (if cached)
   - `localStorage.getItem('theme-preferences')`
   - Calculates and applies typography/spacing/layout
3. CSS defaults from globals.css are available as fallback
4. React hydration begins
5. Settings panel initializes and loads preferences again

### Current Code Flow (On Settings Change)
1. User adjusts spacing scale in settings panel
2. `applyAndPersistLayout()` hook executes:
   - Applies spacing variables to DOM immediately
   - Computes spacing variables object
   - Calls `cachePalette()` with spacing variables
   - Calls `saveThemePreferences()` with new layout config
3. Both localStorage writes happen nearly simultaneously

## Required Solution Properties

The solution must:
1. **Be Reliable** - Work 100% of the time on reload, not 2/3
2. **Eliminate FOUC** - No visible layout shift when spacing is applied
3. **Be Fast** - Execute synchronously before first paint (critical inline script)
4. **Be Maintainable** - Clear, understandable code with proper error handling
5. **Handle Edge Cases**:
   - First-time users with no saved preferences
   - localStorage failures/unavailability
   - Corrupted/incomplete cache data
   - Browser restarts/hard refreshes
   - Rapid setting changes before previous ones are saved

## Questions for Solution

1. **Why might caching to localStorage be unreliable?** Is there a race condition, quota issue, or data consistency problem?

2. **What are better approaches than relying on localStorage for critical layout values?**
   - Server-side rendering with cookies?
   - Session/IndexedDB instead of localStorage?
   - Different storage strategy (per-variable caching instead of batch)?
   - Pre-computation at build time?
   - Different timing approach (apply after page load instead of before)?

3. **Should spacing values be stored differently than colors?** Colors are read-only (computed from base colors), but spacing is configured directly by user.

4. **Is there a validation/checksum mechanism we should add?** How can we verify cached data is complete and valid before using it?

5. **Should we have a synchronous fallback** if cache fails to load? What should it be - CSS defaults or last-known-good values?

## Success Criteria for New Solution

- ✅ Spacing variables apply 100% reliably on every reload
- ✅ No FOUC - no visible layout shift regardless of spacing scale
- ✅ Fast execution - script completes in <10ms
- ✅ Graceful degradation - works correctly even if localStorage unavailable
- ✅ Clear error logging/debugging capabilities
- ✅ No flashing/flickering of default then custom values
- ✅ Maintains current UX and settings panel functionality
