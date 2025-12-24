'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { type SimpleThemeColors, DEFAULT_GLOBAL_ADJUSTMENTS } from "@/constants/themes";
import { themes } from "@/constants/themes";
import { getSourceConfig } from "./theme-cache";
import { ensureSemanticColorIntegrity } from "./semantic-color-utils";
import { type GlobalColorAdjustments } from "./color-utils";

interface AppContextType {
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
  radius: 0.2,
  borderWidth: 1,
  spacingScale: 1,
  globalAdjustments: DEFAULT_GLOBAL_ADJUSTMENTS,
};

function loadPreferencesFromStorage() {
  if (typeof window === 'undefined') return null;

  const sourceConfig = getSourceConfig();
  if (!sourceConfig) return null;

  const validatedColors: SimpleThemeColors = {
    ...sourceConfig.colors,
    semantic: sourceConfig.colors.semantic
      ? ensureSemanticColorIntegrity(sourceConfig.colors.semantic)
      : undefined,
  };

  return {
    colors: validatedColors,
    mode: sourceConfig.mode,
    fontSizeScale: sourceConfig.typography.fontSizeScale ?? 1,
    fontWeightScale: sourceConfig.typography.fontWeightScale ?? 1,
    typeSizeRatio: sourceConfig.typography.typeSizeRatio ?? 1.2,
    radius: sourceConfig.layout.radius,
    borderWidth: sourceConfig.layout.borderWidth,
    spacingScale: sourceConfig.layout.spacingScale,
    globalAdjustments: sourceConfig.colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS,
  };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const savedPrefs = typeof window !== 'undefined' ? loadPreferencesFromStorage() : null;
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [currentThemeColors, setCurrentThemeColors] = useState<SimpleThemeColors | null>(savedPrefs?.colors ?? defaultPreferences.colors);
  const [currentThemeMode, setCurrentThemeMode] = useState<"light" | "dark">(savedPrefs?.mode ?? defaultPreferences.mode);
  const [panelPosition, setPanelPosition] = useState({ x: 20, y: 80 });
  const [isThemeInitialized, setIsThemeInitialized] = useState(true);
  const [fontSizeScale, setFontSizeScale] = useState(savedPrefs?.fontSizeScale ?? defaultPreferences.fontSizeScale);
  const [fontWeightScale, setFontWeightScale] = useState(savedPrefs?.fontWeightScale ?? defaultPreferences.fontWeightScale);
  const [typeSizeRatio, setTypeSizeRatio] = useState(savedPrefs?.typeSizeRatio ?? defaultPreferences.typeSizeRatio);
  const [radius, setRadius] = useState(savedPrefs?.radius ?? defaultPreferences.radius);
  const [borderWidth, setBorderWidth] = useState(savedPrefs?.borderWidth ?? defaultPreferences.borderWidth);
  const [spacingScale, setSpacingScale] = useState(savedPrefs?.spacingScale ?? defaultPreferences.spacingScale);
  const [globalAdjustments, setGlobalAdjustments] = useState<GlobalColorAdjustments>(savedPrefs?.globalAdjustments ?? defaultPreferences.globalAdjustments);

  const value: AppContextType = {
    isSettingsPanelOpen, setIsSettingsPanelOpen,
    isCommandPaletteOpen, setIsCommandPaletteOpen,
    currentThemeColors, setCurrentThemeColors,
    currentThemeMode, setCurrentThemeMode,
    panelPosition, setPanelPosition,
    isThemeInitialized,
    fontSizeScale, setFontSizeScale,
    fontWeightScale, setFontWeightScale,
    typeSizeRatio, setTypeSizeRatio,
    radius, setRadius,
    borderWidth, setBorderWidth,
    spacingScale, setSpacingScale,
    globalAdjustments, setGlobalAdjustments,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("useApp must be used within an AppProvider");
  return context;
}
