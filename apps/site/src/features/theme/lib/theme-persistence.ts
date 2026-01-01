import { type SimpleThemeColors } from "../constants/themes";

export interface ThemePreferences {
  colors: SimpleThemeColors;
  typography: {
    fontSizeScale: number;
    fontWeightScale: number;
    typeSizeRatio: number;
  };
  layout: {
    radius: number;
    borderWidth: number;
    spacingScale: number;
  };
  mode: "light" | "dark";
}

const STORAGE_KEY = "theme-preferences";

/**
 * Save theme preferences to localStorage
 */
export function saveThemePreferences(prefs: ThemePreferences): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    console.debug('[Theme] Preferences saved:', {
      mode: prefs.mode,
      colors: {
        background: prefs.colors.background,
        foreground: prefs.colors.foreground,
        accent: prefs.colors.accent,
        semantic: prefs.colors.semantic ? Object.keys(prefs.colors.semantic) : undefined,
      },
      typography: {
        fontSizeScale: prefs.typography.fontSizeScale,
        fontWeightScale: prefs.typography.fontWeightScale,
        typeSizeRatio: prefs.typography.typeSizeRatio,
      },
      layout: {
        radius: prefs.layout.radius,
        borderWidth: prefs.layout.borderWidth,
        spacingScale: prefs.layout.spacingScale,
      },
    });
  } catch (error) {
    console.warn('[Theme] Failed to save preferences:', error);
  }
}

/**
 * Load theme preferences from localStorage
 */
export function loadThemePreferences(): ThemePreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.debug('[Theme] No theme preferences found in localStorage');
      return null;
    }
    const prefs = JSON.parse(stored) as ThemePreferences;
    console.debug('[Theme] Loaded theme preferences:', {
      mode: prefs.mode,
      colors: {
        background: prefs.colors.background,
        foreground: prefs.colors.foreground,
        accent: prefs.colors.accent,
        semantic: prefs.colors.semantic ? Object.keys(prefs.colors.semantic) : undefined,
      },
      typography: {
        fontSizeScale: prefs.typography.fontSizeScale,
        fontWeightScale: prefs.typography.fontWeightScale,
        typeSizeRatio: prefs.typography.typeSizeRatio,
      },
      layout: {
        radius: prefs.layout.radius,
        borderWidth: prefs.layout.borderWidth,
        spacingScale: prefs.layout.spacingScale,
      },
    });
    return prefs;
  } catch (error) {
    console.warn("[Theme] Failed to load theme preferences:", error);
    return null;
  }
}

/**
 * Apply theme preferences to the DOM
 */
export function applyThemePreferences(prefs: ThemePreferences): void {
  const root = document.documentElement;

  // Apply theme mode
  root.setAttribute('data-theme', prefs.mode);

  // Apply colors
  applyColorsToDom(prefs.colors);

  // Apply typography
  root.style.setProperty("--font-size-scale", `${prefs.typography.fontSizeScale}`);
  root.style.setProperty("--font-weight-scale", `${prefs.typography.fontWeightScale}`);

  // Apply layout
  root.style.setProperty("--radius", `${prefs.layout.radius}rem`);
  root.style.setProperty("--border-width", `${prefs.layout.borderWidth}px`);
  root.style.setProperty("--spacing-scale", `${prefs.layout.spacingScale}`);
}

/**
 * Apply color palette to DOM
 */
function applyColorsToDom(colors: SimpleThemeColors): void {
  // This is already handled by the color-utils applyTheme function
  // but we include it here for completeness
}

/**
 * Clear saved preferences
 */
export function clearThemePreferences(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear theme preferences:", error);
  }
}
