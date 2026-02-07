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
import { ensureSemanticColorIntegrity } from "./color/semantic";
import { type GlobalColorAdjustments } from "./color-utils";
import { useThemeConfiguration } from "../hooks/use-theme-configuration";
import { clampTypographyConfig, isValidTypographyConfig } from "./typography-constraints";
import { type FontKey, getDefaultSansFont, getDefaultMonoFont } from "../constants/font-config";

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
  radius: number;
  setRadius: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
  spacingScale: number;
  setSpacingScale: (value: number) => void;
  globalAdjustments: GlobalColorAdjustments;
  setGlobalAdjustments: (adjustments: GlobalColorAdjustments) => void;
  selectedSansFont: FontKey;
  setSelectedSansFont: (font: FontKey) => void;
  selectedMonoFont: FontKey;
  setSelectedMonoFont: (font: FontKey) => void;
  headerTypeSizeRatio: number;
  setHeaderTypeSizeRatio: (ratio: number) => void;
  headerFontSizeScale: number;
  setHeaderFontSizeScale: (scale: number) => void;
  headerFontWeightScale: number;
  setHeaderFontWeightScale: (scale: number) => void;
  headerLetterSpacingScale: number;
  setHeaderLetterSpacingScale: (scale: number) => void;
  bodyTypeSizeRatio: number;
  setBodyTypeSizeRatio: (ratio: number) => void;
  bodyFontSizeScale: number;
  setBodyFontSizeScale: (scale: number) => void;
  bodyFontWeightScale: number;
  setBodyFontWeightScale: (scale: number) => void;
  bodyLetterSpacingScale: number;
  setBodyLetterSpacingScale: (scale: number) => void;
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
  radius: 0.5,
  borderWidth: 2,
  spacingScale: 0.9,
  globalAdjustments: DEFAULT_GLOBAL_ADJUSTMENTS,
  selectedSansFont: getDefaultSansFont().name as FontKey,
  selectedMonoFont: getDefaultMonoFont().name as FontKey,
  headerTypeSizeRatio: 1.125,
  headerFontSizeScale: 1,
  headerFontWeightScale: 1,
  headerLetterSpacingScale: 1,
  bodyTypeSizeRatio: 1.2,
  bodyFontSizeScale: 1,
  bodyFontWeightScale: 1,
  bodyLetterSpacingScale: 1,
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

  const bodyTypeSizeRatio = sourceConfig.typography.bodyTypeSizeRatio ?? 1.2;
  const bodyFontSizeScale = sourceConfig.typography.bodyFontSizeScale ?? 1;

  let finalBodyTypeSizeRatio = bodyTypeSizeRatio;
  let finalBodyFontSizeScale = bodyFontSizeScale;

  if (!isValidTypographyConfig(bodyTypeSizeRatio, bodyFontSizeScale)) {
    const clamped = clampTypographyConfig(bodyTypeSizeRatio, bodyFontSizeScale);
    console.warn(
      `[AppContext] Body typography config violated 14px minimum. Clamped from ratio=${bodyTypeSizeRatio}, scale=${bodyFontSizeScale} to ratio=${clamped.typeSizeRatio.toFixed(3)}, scale=${clamped.fontSizeScale.toFixed(3)}`
    );
    finalBodyTypeSizeRatio = clamped.typeSizeRatio;
    finalBodyFontSizeScale = clamped.fontSizeScale;
  }

  return {
    colors: validatedColors,
    mode: sourceConfig.mode,
    radius: sourceConfig.layout.radius,
    borderWidth: sourceConfig.layout.borderWidth,
    spacingScale: sourceConfig.layout.spacingScale,
    globalAdjustments: sourceConfig.colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS,
    selectedSansFont: (sourceConfig.fonts?.sansFont ?? defaultPreferences.selectedSansFont) as FontKey,
    selectedMonoFont: (sourceConfig.fonts?.monoFont ?? defaultPreferences.selectedMonoFont) as FontKey,
    headerTypeSizeRatio: sourceConfig.typography.headerTypeSizeRatio ?? 1.125,
    headerFontSizeScale: sourceConfig.typography.headerFontSizeScale ?? 1,
    headerFontWeightScale: sourceConfig.typography.headerFontWeightScale ?? 1,
    headerLetterSpacingScale: sourceConfig.typography.headerLetterSpacingScale ?? 1,
    bodyTypeSizeRatio: finalBodyTypeSizeRatio,
    bodyFontSizeScale: finalBodyFontSizeScale,
    bodyFontWeightScale: sourceConfig.typography.bodyFontWeightScale ?? 1,
    bodyLetterSpacingScale: sourceConfig.typography.bodyLetterSpacingScale ?? 1,
  };
}

function ThemeConfigurationApplier() {
  const { headerTypeSizeRatio, headerFontSizeScale, headerFontWeightScale, headerLetterSpacingScale, bodyTypeSizeRatio, bodyFontSizeScale, bodyFontWeightScale, bodyLetterSpacingScale, radius, borderWidth, spacingScale } = useApp();

  useThemeConfiguration({
    typography: { headerTypeSizeRatio, headerFontSizeScale, headerFontWeightScale, headerLetterSpacingScale, bodyTypeSizeRatio, bodyFontSizeScale, bodyFontWeightScale, bodyLetterSpacingScale },
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
  const [radius, setRadius] = useState(defaultPreferences.radius);
  const [borderWidth, setBorderWidth] = useState(defaultPreferences.borderWidth);
  const [spacingScale, setSpacingScale] = useState(defaultPreferences.spacingScale);
  const [globalAdjustments, setGlobalAdjustments] =
    useState<GlobalColorAdjustments>(defaultPreferences.globalAdjustments);
  const [selectedSansFont, setSelectedSansFont] = useState<FontKey>(
    defaultPreferences.selectedSansFont,
  );
  const [selectedMonoFont, setSelectedMonoFont] = useState<FontKey>(
    defaultPreferences.selectedMonoFont,
  );
  const [headerTypeSizeRatio, setHeaderTypeSizeRatio] = useState(defaultPreferences.headerTypeSizeRatio);
  const [headerFontSizeScale, setHeaderFontSizeScale] = useState(defaultPreferences.headerFontSizeScale);
  const [headerFontWeightScale, setHeaderFontWeightScale] = useState(defaultPreferences.headerFontWeightScale);
  const [headerLetterSpacingScale, setHeaderLetterSpacingScale] = useState(defaultPreferences.headerLetterSpacingScale);
  const [bodyTypeSizeRatio, setBodyTypeSizeRatio] = useState(defaultPreferences.bodyTypeSizeRatio);
  const [bodyFontSizeScale, setBodyFontSizeScale] = useState(defaultPreferences.bodyFontSizeScale);
  const [bodyFontWeightScale, setBodyFontWeightScale] = useState(defaultPreferences.bodyFontWeightScale);
  const [bodyLetterSpacingScale, setBodyLetterSpacingScale] = useState(defaultPreferences.bodyLetterSpacingScale);

  useEffect(() => {
    const savedPrefs = loadPreferencesFromStorage();
    if (savedPrefs) {
      setCurrentThemeColors(savedPrefs.colors);
      setCurrentThemeMode(savedPrefs.mode);
      setRadius(savedPrefs.radius);
      setBorderWidth(savedPrefs.borderWidth);
      setSpacingScale(savedPrefs.spacingScale);
      setGlobalAdjustments(savedPrefs.globalAdjustments);
      setSelectedSansFont(savedPrefs.selectedSansFont);
      setSelectedMonoFont(savedPrefs.selectedMonoFont);
      setHeaderTypeSizeRatio(savedPrefs.headerTypeSizeRatio);
      setHeaderFontSizeScale(savedPrefs.headerFontSizeScale);
      setHeaderFontWeightScale(savedPrefs.headerFontWeightScale);
      setHeaderLetterSpacingScale(savedPrefs.headerLetterSpacingScale);
      setBodyTypeSizeRatio(savedPrefs.bodyTypeSizeRatio);
      setBodyFontSizeScale(savedPrefs.bodyFontSizeScale);
      setBodyFontWeightScale(savedPrefs.bodyFontWeightScale);
      setBodyLetterSpacingScale(savedPrefs.bodyLetterSpacingScale);
    }
    setIsThemeInitialized(true);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_CACHE_KEY && e.newValue) {
        try {
          const cache = validateThemeCache(JSON.parse(e.newValue));
          if (cache) {
            applyThemeCacheToDOM(cache);
            const config = cache.sourceConfig;

            const validatedColors: SimpleThemeColors = {
              ...config.colors,
              semantic: config.colors.semantic
                ? ensureSemanticColorIntegrity(config.colors.semantic)
                : undefined,
            };

            const bodyTypeSizeRatio = config.typography.bodyTypeSizeRatio;
            const bodyFontSizeScale = config.typography.bodyFontSizeScale;

            let finalBodyTypeSizeRatio = bodyTypeSizeRatio;
            let finalBodyFontSizeScale = bodyFontSizeScale;

            if (!isValidTypographyConfig(bodyTypeSizeRatio, bodyFontSizeScale)) {
              const clamped = clampTypographyConfig(bodyTypeSizeRatio, bodyFontSizeScale);
              console.warn(
                `[AppContext] Storage sync contained invalid body typography config. Clamped ratio=${bodyTypeSizeRatio} scale=${bodyFontSizeScale} to ratio=${clamped.typeSizeRatio.toFixed(3)} scale=${clamped.fontSizeScale.toFixed(3)}`
              );
              finalBodyTypeSizeRatio = clamped.typeSizeRatio;
              finalBodyFontSizeScale = clamped.fontSizeScale;
            }

            setCurrentThemeColors(validatedColors);
            setCurrentThemeMode(config.mode);
            setRadius(config.layout.radius);
            setBorderWidth(config.layout.borderWidth);
            setSpacingScale(config.layout.spacingScale);
            if (config.colors.globalAdjustments) {
              setGlobalAdjustments(config.colors.globalAdjustments);
            }
            if (config.fonts) {
              setSelectedSansFont(config.fonts.sansFont as FontKey);
              setSelectedMonoFont(config.fonts.monoFont as FontKey);
            }
            setHeaderTypeSizeRatio(config.typography.headerTypeSizeRatio);
            setHeaderFontSizeScale(config.typography.headerFontSizeScale);
            setHeaderFontWeightScale(config.typography.headerFontWeightScale);
            setHeaderLetterSpacingScale(config.typography.headerLetterSpacingScale);
            setBodyTypeSizeRatio(finalBodyTypeSizeRatio);
            setBodyFontSizeScale(finalBodyFontSizeScale);
            setBodyFontWeightScale(config.typography.bodyFontWeightScale);
            setBodyLetterSpacingScale(config.typography.bodyLetterSpacingScale);
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
    radius,
    setRadius,
    borderWidth,
    setBorderWidth,
    spacingScale,
    setSpacingScale,
    globalAdjustments,
    setGlobalAdjustments,
    selectedSansFont,
    setSelectedSansFont,
    selectedMonoFont,
    setSelectedMonoFont,
    headerTypeSizeRatio,
    setHeaderTypeSizeRatio,
    headerFontSizeScale,
    setHeaderFontSizeScale,
    headerFontWeightScale,
    setHeaderFontWeightScale,
    headerLetterSpacingScale,
    setHeaderLetterSpacingScale,
    bodyTypeSizeRatio,
    setBodyTypeSizeRatio,
    bodyFontSizeScale,
    setBodyFontSizeScale,
    bodyFontWeightScale,
    setBodyFontWeightScale,
    bodyLetterSpacingScale,
    setBodyLetterSpacingScale,
  }), [
    isSettingsPanelOpen,
    isCommandPaletteOpen,
    currentThemeColors,
    currentThemeMode,
    panelPosition,
    isThemeInitialized,
    radius,
    borderWidth,
    spacingScale,
    globalAdjustments,
    selectedSansFont,
    selectedMonoFont,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    headerLetterSpacingScale,
    bodyTypeSizeRatio,
    bodyFontSizeScale,
    bodyFontWeightScale,
    bodyLetterSpacingScale,
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
