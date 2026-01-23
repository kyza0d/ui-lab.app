"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  type SimpleThemeColors,
  DEFAULT_GLOBAL_ADJUSTMENTS,
} from "../constants/themes";
import { themes } from "../constants/themes";
import {
  getSourceConfig,
  validateThemeCache,
  applyThemeCacheToDOM,
  THEME_CACHE_KEY,
} from "./theme-cache";
import { ensureSemanticColorIntegrity } from "./semantic-color-utils";
import { type GlobalColorAdjustments } from "./color-utils";
import { useThemeConfiguration } from "../hooks/use-theme-configuration";
import { clampTypographyConfig, isValidTypographyConfig } from "./typography-constraints";

export interface AppContextType {
  isSettingsPanelOpen: boolean;
  setIsSettingsPanelOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  currentThemeColors: SimpleThemeColors | null;
  setCurrentThemeColors: (colors: SimpleThemeColors) => void;
  currentThemeMode: "light" | "dark";
  setCurrentThemeMode: (mode: "light" | "dark") => void;
  panelPosition: { x: number; y: number };
  setPanelPosition: (position: { x: number; y: number }) => void;
  isThemeInitialized: boolean;
  fontSizeScale: number;
  setFontSizeScale: (scale: number) => void;
  fontWeightScale: number;
  setFontWeightScale: (scale: number) => void;
  typeSizeRatio: number;
  setTypeSizeRatio: (ratio: number) => void;
  radius: number;
  setRadius: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
  spacingScale: number;
  setSpacingScale: (value: number) => void;
  globalAdjustments: GlobalColorAdjustments;
  setGlobalAdjustments: (adjustments: GlobalColorAdjustments) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultPreferences = {
  colors: {
    ...themes["Vitesse"]["dark"],
    semantic: themes["Vitesse"]["dark"].semantic
      ? ensureSemanticColorIntegrity(themes["Vitesse"]["dark"].semantic)
      : undefined,
  },
  mode: "dark" as const,
  fontSizeScale: 1,
  fontWeightScale: 1,
  typeSizeRatio: 1.2,
  radius: 0.5,
  borderWidth: 2,
  spacingScale: 0.9,
  globalAdjustments: DEFAULT_GLOBAL_ADJUSTMENTS,
};

function loadPreferencesFromStorage() {
  if (typeof window === "undefined") return null;

  const sourceConfig = getSourceConfig();
  if (!sourceConfig) return null;

  const validatedColors: SimpleThemeColors = {
    ...sourceConfig.colors,
    semantic: sourceConfig.colors.semantic
      ? ensureSemanticColorIntegrity(sourceConfig.colors.semantic)
      : undefined,
  };

  const fontSizeScale = sourceConfig.typography.fontSizeScale ?? 1;
  const typeSizeRatio = sourceConfig.typography.typeSizeRatio ?? 1.2;

  if (!isValidTypographyConfig(typeSizeRatio, fontSizeScale)) {
    const clamped = clampTypographyConfig(typeSizeRatio, fontSizeScale);
    console.warn(
      `[AppContext] Typography config violated 14px minimum. Clamped from ratio=${typeSizeRatio}, scale=${fontSizeScale} to ratio=${clamped.typeSizeRatio.toFixed(3)}, scale=${clamped.fontSizeScale.toFixed(3)}`
    );
    return {
      colors: validatedColors,
      mode: sourceConfig.mode,
      fontSizeScale: clamped.fontSizeScale,
      fontWeightScale: sourceConfig.typography.fontWeightScale ?? 1,
      typeSizeRatio: clamped.typeSizeRatio,
      radius: sourceConfig.layout.radius,
      borderWidth: sourceConfig.layout.borderWidth,
      spacingScale: sourceConfig.layout.spacingScale,
      globalAdjustments:
        sourceConfig.colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS,
    };
  }

  return {
    colors: validatedColors,
    mode: sourceConfig.mode,
    fontSizeScale,
    fontWeightScale: sourceConfig.typography.fontWeightScale ?? 1,
    typeSizeRatio,
    radius: sourceConfig.layout.radius,
    borderWidth: sourceConfig.layout.borderWidth,
    spacingScale: sourceConfig.layout.spacingScale,
    globalAdjustments:
      sourceConfig.colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS,
  };
}

function ThemeConfigurationApplier() {
  const { fontSizeScale, fontWeightScale, typeSizeRatio, radius, borderWidth, spacingScale } = useApp();

  useThemeConfiguration({
    typography: { fontSizeScale, fontWeightScale, typeSizeRatio },
    layout: { radius, borderWidth, spacingScale },
  });

  return null;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [currentThemeColors, setCurrentThemeColors] =
    useState<SimpleThemeColors | null>(defaultPreferences.colors);
  const [currentThemeMode, setCurrentThemeMode] = useState<"light" | "dark">(
    defaultPreferences.mode,
  );
  const [panelPosition, setPanelPosition] = useState({ x: 20, y: 80 });
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(
    defaultPreferences.fontSizeScale,
  );
  const [fontWeightScale, setFontWeightScale] = useState(
    defaultPreferences.fontWeightScale,
  );
  const [typeSizeRatio, setTypeSizeRatio] = useState(
    defaultPreferences.typeSizeRatio,
  );
  const [radius, setRadius] = useState(defaultPreferences.radius);
  const [borderWidth, setBorderWidth] = useState(
    defaultPreferences.borderWidth,
  );
  const [spacingScale, setSpacingScale] = useState(
    defaultPreferences.spacingScale,
  );
  const [globalAdjustments, setGlobalAdjustments] =
    useState<GlobalColorAdjustments>(defaultPreferences.globalAdjustments);

  useEffect(() => {
    const savedPrefs = loadPreferencesFromStorage();
    if (savedPrefs) {
      setCurrentThemeColors(savedPrefs.colors);
      setCurrentThemeMode(savedPrefs.mode);
      setFontSizeScale(savedPrefs.fontSizeScale);
      setFontWeightScale(savedPrefs.fontWeightScale);
      setTypeSizeRatio(savedPrefs.typeSizeRatio);
      setRadius(savedPrefs.radius);
      setBorderWidth(savedPrefs.borderWidth);
      setSpacingScale(savedPrefs.spacingScale);
      setGlobalAdjustments(savedPrefs.globalAdjustments);
    }
    setIsThemeInitialized(true);
  }, []);

  // Sync state across windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_CACHE_KEY && e.newValue) {
        try {
          const cache = validateThemeCache(JSON.parse(e.newValue));
          if (cache) {
            // Apply to DOM
            applyThemeCacheToDOM(cache);

            // Update State
            const config = cache.sourceConfig;

            // Validate colors before setting
            const validatedColors: SimpleThemeColors = {
              ...config.colors,
              semantic: config.colors.semantic
                ? ensureSemanticColorIntegrity(config.colors.semantic)
                : undefined,
            };

            const fontSizeScale = config.typography.fontSizeScale;
            const typeSizeRatio = config.typography.typeSizeRatio;

            if (!isValidTypographyConfig(typeSizeRatio, fontSizeScale)) {
              const clamped = clampTypographyConfig(typeSizeRatio, fontSizeScale);
              console.warn(
                `[AppContext] Storage sync contained invalid typography config. Clamped ratio=${typeSizeRatio} scale=${fontSizeScale} to ratio=${clamped.typeSizeRatio.toFixed(3)} scale=${clamped.fontSizeScale.toFixed(3)}`
              );
              setCurrentThemeColors(validatedColors);
              setCurrentThemeMode(config.mode);
              setFontSizeScale(clamped.fontSizeScale);
              setFontWeightScale(config.typography.fontWeightScale);
              setTypeSizeRatio(clamped.typeSizeRatio);
            } else {
              setCurrentThemeColors(validatedColors);
              setCurrentThemeMode(config.mode);
              setFontSizeScale(fontSizeScale);
              setFontWeightScale(config.typography.fontWeightScale);
              setTypeSizeRatio(typeSizeRatio);
            }
            setRadius(config.layout.radius);
            setBorderWidth(config.layout.borderWidth);
            setSpacingScale(config.layout.spacingScale);
            if (config.colors.globalAdjustments) {
              setGlobalAdjustments(config.colors.globalAdjustments);
            }
          }
        } catch (error) {
          console.warn("[AppContext] Failed to sync storage change:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = React.useMemo<AppContextType>(() => ({
    isSettingsPanelOpen,
    setIsSettingsPanelOpen,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
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
    globalAdjustments,
    setGlobalAdjustments,
  }), [
    isSettingsPanelOpen,
    isCommandPaletteOpen,
    currentThemeColors,
    currentThemeMode,
    panelPosition,
    isThemeInitialized,
    fontSizeScale,
    fontWeightScale,
    typeSizeRatio,
    radius,
    borderWidth,
    spacingScale,
    globalAdjustments
  ]);

  return <AppContext.Provider value={value}>
    <ThemeConfigurationApplier />
    {children}
  </AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useApp must be used within an AppProvider");
  return context;
}
