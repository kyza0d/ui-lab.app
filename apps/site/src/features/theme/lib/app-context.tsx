"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  type SimpleThemeColors,
  DEFAULT_GLOBAL_ADJUSTMENTS,
} from "../constants/themes";
import {
  getSourceConfig,
  validateThemeCache,
  applyThemeCacheToDOM,
  THEME_CACHE_KEY,
  type ThemeSourceConfig,
} from "./theme-cache";
import { ensureSemanticColorIntegrity } from "./color/semantic";
import { type GlobalColorAdjustments } from "./color-utils";
import { useThemeConfiguration } from "../hooks/use-theme-configuration";
import {
  clampTypographyConfig,
  isValidTypographyConfig,
} from "./typography-constraints";
import { type FontKey } from "../constants/font-config";
import {
  normalizeGlobalMinFontSizePx,
  normalizeTypographyLineHeight,
} from "./typography-config";
import { getDefaultAppPreferences } from "./default-theme-config";

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
  headerLineHeight: number;
  setHeaderLineHeight: (lineHeight: number) => void;
  bodyTypeSizeRatio: number;
  setBodyTypeSizeRatio: (ratio: number) => void;
  bodyFontSizeScale: number;
  setBodyFontSizeScale: (scale: number) => void;
  bodyFontWeightScale: number;
  setBodyFontWeightScale: (scale: number) => void;
  bodyLetterSpacingScale: number;
  setBodyLetterSpacingScale: (scale: number) => void;
  bodyLineHeight: number;
  setBodyLineHeight: (lineHeight: number) => void;
  globalMinFontSizePx: number;
  setGlobalMinFontSizePx: (size: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultPreferences = getDefaultAppPreferences();

interface AppState {
  isSettingsPanelOpen: boolean;
  isCommandPaletteOpen: boolean;
  currentThemeColors: SimpleThemeColors | null;
  currentThemeMode: "light" | "dark";
  panelPosition: { x: number; y: number };
  isThemeInitialized: boolean;
  radius: number;
  borderWidth: number;
  spacingScale: number;
  globalAdjustments: GlobalColorAdjustments;
  selectedSansFont: FontKey;
  selectedMonoFont: FontKey;
  headerTypeSizeRatio: number;
  headerFontSizeScale: number;
  headerFontWeightScale: number;
  headerLetterSpacingScale: number;
  headerLineHeight: number;
  bodyTypeSizeRatio: number;
  bodyFontSizeScale: number;
  bodyFontWeightScale: number;
  bodyLetterSpacingScale: number;
  bodyLineHeight: number;
  globalMinFontSizePx: number;
}

type PersistedAppPreferences = Omit<
  AppState,
  | "isSettingsPanelOpen"
  | "isCommandPaletteOpen"
  | "panelPosition"
  | "isThemeInitialized"
>;

type AppAction =
  | { type: "merge"; value: Partial<AppState> }
  | {
      type: "set";
      key: keyof AppState;
      value: AppState[keyof AppState];
    };

const initialAppState: AppState = {
  isSettingsPanelOpen: false,
  isCommandPaletteOpen: false,
  currentThemeColors: defaultPreferences.colors,
  currentThemeMode: defaultPreferences.mode,
  panelPosition: { x: 20, y: 80 },
  isThemeInitialized: false,
  radius: defaultPreferences.radius,
  borderWidth: defaultPreferences.borderWidth,
  spacingScale: defaultPreferences.spacingScale,
  globalAdjustments: defaultPreferences.globalAdjustments,
  selectedSansFont: defaultPreferences.selectedSansFont,
  selectedMonoFont: defaultPreferences.selectedMonoFont,
  headerTypeSizeRatio: defaultPreferences.headerTypeSizeRatio,
  headerFontSizeScale: defaultPreferences.headerFontSizeScale,
  headerFontWeightScale: defaultPreferences.headerFontWeightScale,
  headerLetterSpacingScale: defaultPreferences.headerLetterSpacingScale,
  headerLineHeight: defaultPreferences.headerLineHeight,
  bodyTypeSizeRatio: defaultPreferences.bodyTypeSizeRatio,
  bodyFontSizeScale: defaultPreferences.bodyFontSizeScale,
  bodyFontWeightScale: defaultPreferences.bodyFontWeightScale,
  bodyLetterSpacingScale: defaultPreferences.bodyLetterSpacingScale,
  bodyLineHeight: defaultPreferences.bodyLineHeight,
  globalMinFontSizePx: defaultPreferences.globalMinFontSizePx,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "merge":
      return { ...state, ...action.value };
    case "set":
      return {
        ...state,
        [action.key]: action.value,
      } as AppState;
    default:
      return state;
  }
}

function getPersistedPreferences(
  sourceConfig: ThemeSourceConfig,
): PersistedAppPreferences {
  const validatedColors: SimpleThemeColors = {
    ...sourceConfig.colors,
    semantic: sourceConfig.colors.semantic
      ? ensureSemanticColorIntegrity(sourceConfig.colors.semantic)
      : undefined,
  };

  const globalMinFontSizePx = normalizeGlobalMinFontSizePx(
    sourceConfig.typography.globalMinFontSizePx,
  );
  const bodyTypeSizeRatio =
    sourceConfig.typography.bodyTypeSizeRatio ??
    defaultPreferences.bodyTypeSizeRatio;
  const bodyFontSizeScale =
    sourceConfig.typography.bodyFontSizeScale ??
    defaultPreferences.bodyFontSizeScale;

  let finalBodyTypeSizeRatio = bodyTypeSizeRatio;
  let finalBodyFontSizeScale = bodyFontSizeScale;

  if (
    !isValidTypographyConfig(
      bodyTypeSizeRatio,
      bodyFontSizeScale,
      globalMinFontSizePx,
    )
  ) {
    const clamped = clampTypographyConfig(
      bodyTypeSizeRatio,
      bodyFontSizeScale,
      globalMinFontSizePx,
    );
    console.warn(
      `[AppContext] Body typography config violated the ${globalMinFontSizePx}px minimum. Clamped from ratio=${bodyTypeSizeRatio}, scale=${bodyFontSizeScale} to ratio=${clamped.typeSizeRatio.toFixed(3)}, scale=${clamped.fontSizeScale.toFixed(3)}`,
    );
    finalBodyTypeSizeRatio = clamped.typeSizeRatio;
    finalBodyFontSizeScale = clamped.fontSizeScale;
  }

  return {
    currentThemeColors: validatedColors,
    currentThemeMode: sourceConfig.mode,
    radius: sourceConfig.layout.radius,
    borderWidth: sourceConfig.layout.borderWidth,
    spacingScale: sourceConfig.layout.spacingScale,
    globalAdjustments:
      sourceConfig.colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS,
    selectedSansFont: (sourceConfig.fonts?.sansFont ??
      defaultPreferences.selectedSansFont) as FontKey,
    selectedMonoFont: (sourceConfig.fonts?.monoFont ??
      defaultPreferences.selectedMonoFont) as FontKey,
    headerTypeSizeRatio:
      sourceConfig.typography.headerTypeSizeRatio ??
      defaultPreferences.headerTypeSizeRatio,
    headerFontSizeScale:
      sourceConfig.typography.headerFontSizeScale ??
      defaultPreferences.headerFontSizeScale,
    headerFontWeightScale:
      sourceConfig.typography.headerFontWeightScale ??
      defaultPreferences.headerFontWeightScale,
    headerLetterSpacingScale:
      sourceConfig.typography.headerLetterSpacingScale ??
      defaultPreferences.headerLetterSpacingScale,
    headerLineHeight: normalizeTypographyLineHeight(
      sourceConfig.typography.headerLineHeight,
      defaultPreferences.headerLineHeight,
    ),
    bodyTypeSizeRatio: finalBodyTypeSizeRatio,
    bodyFontSizeScale: finalBodyFontSizeScale,
    bodyFontWeightScale:
      sourceConfig.typography.bodyFontWeightScale ??
      defaultPreferences.bodyFontWeightScale,
    bodyLetterSpacingScale:
      sourceConfig.typography.bodyLetterSpacingScale ??
      defaultPreferences.bodyLetterSpacingScale,
    bodyLineHeight: normalizeTypographyLineHeight(
      sourceConfig.typography.bodyLineHeight,
      defaultPreferences.bodyLineHeight,
    ),
    globalMinFontSizePx,
  };
}

function loadPreferencesFromStorage(): PersistedAppPreferences | null {
  if (typeof window === "undefined") return null;

  const sourceConfig = getSourceConfig();
  if (!sourceConfig) return null;

  return getPersistedPreferences(sourceConfig);
}

function ThemeConfigurationApplier() {
  const {
    isThemeInitialized,
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    headerLetterSpacingScale,
    headerLineHeight,
    bodyTypeSizeRatio,
    bodyFontSizeScale,
    bodyFontWeightScale,
    bodyLetterSpacingScale,
    bodyLineHeight,
    globalMinFontSizePx,
    radius,
    borderWidth,
    spacingScale,
  } = useApp();

  useThemeConfiguration({
    typography: {
      headerTypeSizeRatio,
      headerFontSizeScale,
      headerFontWeightScale,
      headerLetterSpacingScale,
      headerLineHeight,
      bodyTypeSizeRatio,
      bodyFontSizeScale,
      bodyFontWeightScale,
      bodyLetterSpacingScale,
      bodyLineHeight,
      globalMinFontSizePx,
    },
    layout: { radius, borderWidth, spacingScale },
    isEnabled: isThemeInitialized,
  });

  return null;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    const savedPrefs = loadPreferencesFromStorage();
    dispatch({
      type: "merge",
      value: {
        ...(savedPrefs ?? {}),
        isThemeInitialized: true,
      },
    });
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_CACHE_KEY && e.newValue) {
        try {
          const cache = validateThemeCache(JSON.parse(e.newValue));
          if (cache) {
            // Multi-tab synchronization:
            // Tab A changed theme → stored in localStorage → fires storage event in Tab B
            // applyThemeCacheToDOM() applies ALL variables including typography
            // (This is safe here because we're explicitly syncing from another tab's change)
            applyThemeCacheToDOM(cache);
            dispatch({
              type: "merge",
              value: getPersistedPreferences(cache.sourceConfig),
            });
          }
        } catch (error) {
          console.warn("[AppContext] Failed to sync storage change:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = React.useMemo<AppContextType>(
    () => ({
      isSettingsPanelOpen: state.isSettingsPanelOpen,
      setIsSettingsPanelOpen: (open) =>
        dispatch({ type: "set", key: "isSettingsPanelOpen", value: open }),
      isCommandPaletteOpen: state.isCommandPaletteOpen,
      setIsCommandPaletteOpen: (open) =>
        dispatch({ type: "set", key: "isCommandPaletteOpen", value: open }),
      currentThemeColors: state.currentThemeColors,
      setCurrentThemeColors: (colors) =>
        dispatch({ type: "set", key: "currentThemeColors", value: colors }),
      currentThemeMode: state.currentThemeMode,
      setCurrentThemeMode: (mode) =>
        dispatch({ type: "set", key: "currentThemeMode", value: mode }),
      panelPosition: state.panelPosition,
      setPanelPosition: (position) =>
        dispatch({ type: "set", key: "panelPosition", value: position }),
      isThemeInitialized: state.isThemeInitialized,
      radius: state.radius,
      setRadius: (value) => dispatch({ type: "set", key: "radius", value }),
      borderWidth: state.borderWidth,
      setBorderWidth: (value) =>
        dispatch({ type: "set", key: "borderWidth", value }),
      spacingScale: state.spacingScale,
      setSpacingScale: (value) =>
        dispatch({ type: "set", key: "spacingScale", value }),
      globalAdjustments: state.globalAdjustments,
      setGlobalAdjustments: (adjustments) =>
        dispatch({ type: "set", key: "globalAdjustments", value: adjustments }),
      selectedSansFont: state.selectedSansFont,
      setSelectedSansFont: (font) =>
        dispatch({ type: "set", key: "selectedSansFont", value: font }),
      selectedMonoFont: state.selectedMonoFont,
      setSelectedMonoFont: (font) =>
        dispatch({ type: "set", key: "selectedMonoFont", value: font }),
      headerTypeSizeRatio: state.headerTypeSizeRatio,
      setHeaderTypeSizeRatio: (ratio) =>
        dispatch({ type: "set", key: "headerTypeSizeRatio", value: ratio }),
      headerFontSizeScale: state.headerFontSizeScale,
      setHeaderFontSizeScale: (scale) =>
        dispatch({ type: "set", key: "headerFontSizeScale", value: scale }),
      headerFontWeightScale: state.headerFontWeightScale,
      setHeaderFontWeightScale: (scale) =>
        dispatch({ type: "set", key: "headerFontWeightScale", value: scale }),
      headerLetterSpacingScale: state.headerLetterSpacingScale,
      setHeaderLetterSpacingScale: (scale) =>
        dispatch({
          type: "set",
          key: "headerLetterSpacingScale",
          value: scale,
        }),
      headerLineHeight: state.headerLineHeight,
      setHeaderLineHeight: (lineHeight) =>
        dispatch({ type: "set", key: "headerLineHeight", value: lineHeight }),
      bodyTypeSizeRatio: state.bodyTypeSizeRatio,
      setBodyTypeSizeRatio: (ratio) =>
        dispatch({ type: "set", key: "bodyTypeSizeRatio", value: ratio }),
      bodyFontSizeScale: state.bodyFontSizeScale,
      setBodyFontSizeScale: (scale) =>
        dispatch({ type: "set", key: "bodyFontSizeScale", value: scale }),
      bodyFontWeightScale: state.bodyFontWeightScale,
      setBodyFontWeightScale: (scale) =>
        dispatch({ type: "set", key: "bodyFontWeightScale", value: scale }),
      bodyLetterSpacingScale: state.bodyLetterSpacingScale,
      setBodyLetterSpacingScale: (scale) =>
        dispatch({
          type: "set",
          key: "bodyLetterSpacingScale",
          value: scale,
        }),
      bodyLineHeight: state.bodyLineHeight,
      setBodyLineHeight: (lineHeight) =>
        dispatch({ type: "set", key: "bodyLineHeight", value: lineHeight }),
      globalMinFontSizePx: state.globalMinFontSizePx,
      setGlobalMinFontSizePx: (size) =>
        dispatch({ type: "set", key: "globalMinFontSizePx", value: size }),
    }),
    [state, dispatch],
  );

  return (
    <AppContext.Provider value={value}>
      <ThemeConfigurationApplier />
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useApp must be used within an AppProvider");
  return context;
}
