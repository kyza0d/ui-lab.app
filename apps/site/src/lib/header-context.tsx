"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type SimpleThemeColors } from "@/constants/themes";
import { getCachedPalette } from "./palette-cache";
import { themes } from "@/constants/themes";
import { loadThemePreferences } from "./theme-persistence";

interface HeaderContextType {
  isSettingsPanelOpen: boolean;
  setIsSettingsPanelOpen: (open: boolean) => void;
  currentThemeColors: SimpleThemeColors | null;
  setCurrentThemeColors: (colors: SimpleThemeColors) => void;
  currentThemeMode: "light" | "dark";
  setCurrentThemeMode: (mode: "light" | "dark") => void;
  panelPosition: { x: number; y: number };
  setPanelPosition: (position: { x: number; y: number }) => void;
  isThemeInitialized: boolean;
  // Typography
  fontSizeScale: number;
  setFontSizeScale: (scale: number) => void;
  fontWeightScale: number;
  setFontWeightScale: (scale: number) => void;
  typeSizeRatio: number;
  setTypeSizeRatio: (ratio: number) => void;
  // Layout
  radius: number;
  setRadius: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
  spacingScale: number;
  setSpacingScale: (value: number) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

// Default preferences for SSR - matches default client values
const defaultPreferences = {
  colors: themes["Vitesse"]["dark"],
  mode: "dark" as const,
  fontSizeScale: 1,
  fontWeightScale: 1,
  typeSizeRatio: 1.2,
  radius: 0.2,
  borderWidth: 1,
  spacingScale: 1,
};

console.debug('[HeaderContext] Default preferences initialized with semantic colors:', {
  semantic: defaultPreferences.colors.semantic ? Object.keys(defaultPreferences.colors.semantic) : undefined,
});

// Load preferences from localStorage (client-side only)
function loadPreferencesFromStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedPrefs = loadThemePreferences();

  if (savedPrefs) {
    console.debug('[HeaderContext] Loaded preferences from theme-preferences:', {
      colors: {
        background: savedPrefs.colors.background,
        foreground: savedPrefs.colors.foreground,
        accent: savedPrefs.colors.accent,
        semantic: savedPrefs.colors.semantic ? Object.keys(savedPrefs.colors.semantic) : undefined,
      },
      mode: savedPrefs.mode,
    });
    return {
      colors: savedPrefs.colors,
      mode: savedPrefs.mode as "light" | "dark",
      fontSizeScale: savedPrefs.typography.fontSizeScale ?? 1,
      fontWeightScale: savedPrefs.typography.fontWeightScale ?? 1,
      typeSizeRatio: savedPrefs.typography.typeSizeRatio ?? 1.2,
      radius: savedPrefs.layout.radius,
      borderWidth: savedPrefs.layout.borderWidth,
      spacingScale: savedPrefs.layout.spacingScale,
    };
  }

  // Try legacy cache
  const cachedPalette = getCachedPalette();
  if (cachedPalette) {
    console.debug('[HeaderContext] Loaded preferences from palette cache (legacy):', {
      colors: {
        background: cachedPalette.colors.background,
        foreground: cachedPalette.colors.foreground,
        accent: cachedPalette.colors.accent,
        semantic: cachedPalette.colors.semantic ? Object.keys(cachedPalette.colors.semantic) : undefined,
      },
      mode: cachedPalette.themeMode,
    });
    return {
      colors: cachedPalette.colors,
      mode: cachedPalette.themeMode as "light" | "dark",
      fontSizeScale: 1,
      fontWeightScale: 1,
      typeSizeRatio: 1.2,
      radius: 0.2,
      borderWidth: 1,
      spacingScale: 1,
    };
  }

  console.debug('[HeaderContext] No preferences found, using defaults');
  return null;
}

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [currentThemeColors, setCurrentThemeColors] = useState<SimpleThemeColors | null>(defaultPreferences.colors);
  const [currentThemeMode, setCurrentThemeMode] = useState<"light" | "dark">(defaultPreferences.mode);
  const [panelPosition, setPanelPosition] = useState({ x: 20, y: 80 });
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);

  // Typography
  const [fontSizeScale, setFontSizeScale] = useState(defaultPreferences.fontSizeScale);
  const [fontWeightScale, setFontWeightScale] = useState(defaultPreferences.fontWeightScale);
  const [typeSizeRatio, setTypeSizeRatio] = useState(defaultPreferences.typeSizeRatio);

  // Layout
  const [radius, setRadius] = useState(defaultPreferences.radius);
  const [borderWidth, setBorderWidth] = useState(defaultPreferences.borderWidth);
  const [spacingScale, setSpacingScale] = useState(defaultPreferences.spacingScale);

  // Load saved preferences from storage on mount (after hydration)
  // This ONLY loads data into React state for the UI to use.
  // DOM updates are handled by: (1) inline script in layout.tsx on page load, and
  // (2) useThemeStorage hook callbacks when settings change
  useEffect(() => {
    console.debug('[HeaderContext] Loading preferences from storage...');
    const savedPrefs = loadPreferencesFromStorage();
    if (savedPrefs) {
      console.debug('[HeaderContext] Setting loaded preferences to state:', {
        colors: {
          background: savedPrefs.colors.background,
          foreground: savedPrefs.colors.foreground,
          accent: savedPrefs.colors.accent,
          semantic: savedPrefs.colors.semantic ? Object.keys(savedPrefs.colors.semantic) : undefined,
        },
        mode: savedPrefs.mode,
        fontSizeScale: savedPrefs.fontSizeScale,
        radius: savedPrefs.radius,
        borderWidth: savedPrefs.borderWidth,
      });
      setCurrentThemeColors(savedPrefs.colors);
      setCurrentThemeMode(savedPrefs.mode);
      setFontSizeScale(savedPrefs.fontSizeScale);
      setFontWeightScale(savedPrefs.fontWeightScale);
      setTypeSizeRatio(savedPrefs.typeSizeRatio);
      setRadius(savedPrefs.radius);
      setBorderWidth(savedPrefs.borderWidth);
      setSpacingScale(savedPrefs.spacingScale);
    } else {
      console.debug('[HeaderContext] No saved preferences found, using defaults');
    }
    setIsThemeInitialized(true);
  }, []);


  const value: HeaderContextType = {
    isSettingsPanelOpen,
    setIsSettingsPanelOpen,
    currentThemeColors,
    setCurrentThemeColors,
    currentThemeMode,
    setCurrentThemeMode,
    panelPosition,
    setPanelPosition,
    isThemeInitialized,
    fontSizeScale,
    setFontSizeScale,
    fontWeightScale,
    setFontWeightScale,
    typeSizeRatio,
    setTypeSizeRatio,
    radius,
    setRadius,
    borderWidth,
    setBorderWidth,
    spacingScale,
    setSpacingScale,
  };

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
