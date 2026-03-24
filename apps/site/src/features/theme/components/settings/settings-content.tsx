"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "../../lib/app-context";
import {
  findClosestValidFontSizeScale,
  isValidTypographyConfig,
} from "../../lib/typography-constraints";
import { themes } from "../../constants/themes";
import {
  type OklchColor,
  type SemanticColorType,
  type SemanticColorConfig,
  type GlobalColorAdjustments,
} from "../../lib/color-utils";
import { useThemeStorage } from "../../hooks/use-theme-storage";
import { getFontConfig } from "../../constants/font-config";
import { type TypographyConfig } from "../../lib/typography-config";
import {
  Tabs,
  Button,
  Scroll,
} from "ui-lab-components";
import { ColorsPanel } from "./colors-panel";
import { TypographyPanel } from "./typography-panel";
import { LayoutPanel } from "./layout-panel";

type ConfigTab = "colors" | "layout" | "fonts";

function useSettingsHandlers(
  localColors: any,
  localGlobalAdjustments: GlobalColorAdjustments,
  currentThemeMode: string,
  applyAndPersistColors: (colors: any) => void,
  applyAndPersistFonts: (fonts: any) => void,
  applyAndPersistTypography: (typography: TypographyConfig) => void,
  selectedSansFont: string,
  selectedMonoFont: string,
  globalMinFontSizePx: number,
  headerLineHeight: number,
  bodyLineHeight: number,
  currentTypography: TypographyConfig,
  setLocalColors: (colors: any) => void,
  setLocalGlobalAdjustments: (adj: GlobalColorAdjustments) => void,
  setGlobalAdjustments: (adj: GlobalColorAdjustments) => void,
) {
  const updateTypography = (next: Partial<TypographyConfig>) => {
    applyAndPersistTypography({
      ...currentTypography,
      ...next,
    });
  };

  const handleGlobalAdjustmentChange = (
    key: keyof GlobalColorAdjustments,
    value: number,
  ) => {
    const updated = { ...localGlobalAdjustments, [key]: value };
    setLocalGlobalAdjustments(updated);
    setGlobalAdjustments(updated);
    const updatedColors = { ...localColors, globalAdjustments: updated };
    setLocalColors(updatedColors);
    applyAndPersistColors(updatedColors);
  };

  const handleColorChange = (type: string, newColor: OklchColor) => {
    const updated = { ...localColors };
    const MIN_BACKGROUND_CHROMA = 0.008;

    if (type === "background") {
      updated.background = {
        l: newColor.l,
        c: newColor.c === 0 ? 0 : Math.max(newColor.c, MIN_BACKGROUND_CHROMA),
        h: newColor.h,
      };
      updated.foreground = newColor;
    } else if (type === "foreground") {
      updated.foreground = newColor;
    } else if (type === "accent") {
      updated.accent = newColor;
    } else {
      const semanticType = type as SemanticColorType;
      const semantic = (updated.semantic ?? {}) as Record<
        SemanticColorType,
        SemanticColorConfig
      >;
      const existing = semantic[semanticType] ?? {
        light: { color: newColor, chromaLimit: 0.25 },
        dark: { color: newColor, chromaLimit: 0.25 },
      };
      const modeKey = currentThemeMode as "light" | "dark";
      semantic[semanticType] = {
        ...existing,
        [modeKey]: {
          ...existing[modeKey],
          color: newColor,
          chromaLimit: existing[modeKey]?.chromaLimit ?? 0.25,
        },
      };
      updated.semantic = semantic;
    }
    setLocalColors(updated);
    applyAndPersistColors(updated);
  };

  const handleChromaLimitChange = (
    type: SemanticColorType,
    chromaLimit: number,
  ) => {
    const updated = { ...localColors };
    const semantic = (updated.semantic ?? {}) as Record<
      SemanticColorType,
      SemanticColorConfig
    >;
    const existing = semantic[type];
    if (existing) {
      const modeKey = currentThemeMode as "light" | "dark";
      semantic[type] = {
        ...existing,
        [modeKey]: { ...existing[modeKey], chromaLimit },
      };
      updated.semantic = semantic;
    }
    setLocalColors(updated);
    applyAndPersistColors(updated);
  };

  const handleSansFontChange = (fontName: string) => {
    const fontConfig = getFontConfig(fontName as any, "sans");
    if (fontConfig) {
      const {
        fontSizeScale: scale,
        typeSizeRatio: ratio,
        headerLetterSpacingScale: headerSpacing = 1,
        headerFontWeightScale: headerWeight = 1,
        headerLineHeight: nextHeaderLineHeight = headerLineHeight,
        bodyLetterSpacingScale: bodySpacing = 1,
        bodyFontWeightScale: bodyWeight = 1,
        bodyLineHeight: nextBodyLineHeight = bodyLineHeight,
      } = fontConfig.metrics;
      let finalScale = scale;
      if (!isValidTypographyConfig(ratio, scale, globalMinFontSizePx)) {
        finalScale = findClosestValidFontSizeScale(
          ratio,
          scale,
          globalMinFontSizePx,
        );
      }
      updateTypography({
        headerFontWeightScale: headerWeight,
        headerLetterSpacingScale: headerSpacing,
        headerLineHeight: nextHeaderLineHeight,
        bodyTypeSizeRatio: ratio,
        bodyFontSizeScale: finalScale,
        bodyFontWeightScale: bodyWeight,
        bodyLetterSpacingScale: bodySpacing,
        bodyLineHeight: nextBodyLineHeight,
      });
    }
    applyAndPersistFonts({ sansFont: fontName as any, monoFont: selectedMonoFont });
  };

  const handleMonoFontChange = (fontName: string) => {
    applyAndPersistFonts({ sansFont: selectedSansFont, monoFont: fontName as any });
  };

  return { handleGlobalAdjustmentChange, handleColorChange, handleChromaLimitChange, handleSansFontChange, handleMonoFontChange, updateTypography };
}

export const SettingsContent = () => {
  const {
    currentThemeColors,
    setCurrentThemeColors,
    radius,
    setRadius,
    borderWidth,
    setBorderWidth,
    spacingScale,
    setSpacingScale,
    currentThemeMode,
    isThemeInitialized,
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
    headerLineHeight,
    setHeaderLineHeight,
    bodyTypeSizeRatio,
    setBodyTypeSizeRatio,
    bodyFontSizeScale,
    setBodyFontSizeScale,
    bodyFontWeightScale,
    setBodyFontWeightScale,
    bodyLetterSpacingScale,
    setBodyLetterSpacingScale,
    bodyLineHeight,
    setBodyLineHeight,
    globalMinFontSizePx,
    setGlobalMinFontSizePx,
  } = useApp();

  const [activeTab, setActiveTab] = useState<ConfigTab>("colors");
  const [localColors, setLocalColors] = useState(
    currentThemeColors || themes["Vitesse"].dark,
  );
  const [expandedColor, setExpandedColor] = useState<string | null>(null);
  const [localGlobalAdjustments, setLocalGlobalAdjustments] =
    useState<GlobalColorAdjustments>(globalAdjustments);

  useEffect(() => {
    if (isThemeInitialized && currentThemeColors) {
      setLocalColors(currentThemeColors);
    }
  }, [isThemeInitialized, currentThemeColors]);

  // Derived state instead of useEffect:
  // Using a key prop on the component that renders this or a parent ensures reset on prop change.
  // Alternatively, if we MUST sync, this is how it should be done if NOT using a key prop:
  // const [localGlobalAdjustments, setLocalGlobalAdjustments] = useState(globalAdjustments);
  // if (prevGlobalAdjustments !== globalAdjustments) { setLocalGlobalAdjustments(globalAdjustments); ... }

  const {
    applyAndPersistColors,
    applyAndPersistTypography,
    applyAndPersistLayout,
    applyAndPersistFonts,
  } = useThemeStorage({
    onColorsChange: setCurrentThemeColors,
    onTypographyChange: (config: TypographyConfig) => {
      setHeaderTypeSizeRatio(config.headerTypeSizeRatio);
      setHeaderFontSizeScale(config.headerFontSizeScale);
      setHeaderFontWeightScale(config.headerFontWeightScale);
      setHeaderLetterSpacingScale(config.headerLetterSpacingScale);
      setHeaderLineHeight(config.headerLineHeight);
      setBodyTypeSizeRatio(config.bodyTypeSizeRatio);
      setBodyFontSizeScale(config.bodyFontSizeScale);
      setBodyFontWeightScale(config.bodyFontWeightScale);
      setBodyLetterSpacingScale(config.bodyLetterSpacingScale);
      setBodyLineHeight(config.bodyLineHeight);
      setGlobalMinFontSizePx(config.globalMinFontSizePx);
    },
    onLayoutChange: (config: any) => {
      setRadius(config.radius);
      setBorderWidth(config.borderWidth);
      setSpacingScale(config.spacingScale);
    },
    onFontsChange: (config: any) => {
      setSelectedSansFont(config.sansFont);
      setSelectedMonoFont(config.monoFont);
    },
    currentThemeMode,
  });

  const currentTypography: TypographyConfig = {
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
  };

  const { handleGlobalAdjustmentChange, handleColorChange, handleChromaLimitChange, handleSansFontChange, handleMonoFontChange, updateTypography } = useSettingsHandlers(
    localColors,
    localGlobalAdjustments,
    currentThemeMode,
    applyAndPersistColors,
    applyAndPersistFonts,
    applyAndPersistTypography,
    selectedSansFont,
    selectedMonoFont,
    globalMinFontSizePx,
    headerLineHeight,
    bodyLineHeight,
    currentTypography,
    setLocalColors,
    setLocalGlobalAdjustments,
    setGlobalAdjustments,
  );


  return (
    <div className="w-full h-full select-none flex flex-col bg-background-900/90 text-foreground">
      <div className="pr-[8px] flex items-center justify-between border-b border-background-700 shrink-0">
        <Tabs
          variant="underline"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ConfigTab)}
        >
          <Tabs.List className="h-[28px] mt-[10px] border-none">
            <Tabs.Trigger
              className="text-sm pb-[9px] mb-[6px] w-[80px]"
              value="colors"
            >
              Theme
            </Tabs.Trigger>
            <Tabs.Trigger
              className="text-sm pb-[9px] mb-[6px] w-[80px]"
              value="fonts"
            >
              Fonts
            </Tabs.Trigger>
            <Tabs.Trigger
              className="text-sm pb-[9px] mb-[6px] w-[80px]"
              value="layout"
            >
              Layout
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </div>

      <div className="border-b border-background-700 flex-1 overflow-hidden">
        <Scroll>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ConfigTab)}
        >
          <Tabs.Content value="colors" className="py-[8px]">
            <ColorsPanel
              localColors={localColors}
              expandedColor={expandedColor}
              localGlobalAdjustments={localGlobalAdjustments}
              onExpandedColorChange={setExpandedColor}
              onColorChange={handleColorChange}
              onChromaLimitChange={handleChromaLimitChange}
              onGlobalAdjustmentChange={handleGlobalAdjustmentChange}
            />
          </Tabs.Content>

          <Tabs.Content value="fonts" className="py-[8px]">
            <TypographyPanel
              selectedSansFont={selectedSansFont}
              selectedMonoFont={selectedMonoFont}
              typography={currentTypography}
              onSansFontChange={handleSansFontChange}
              onMonoFontChange={handleMonoFontChange}
              onTypographyChange={updateTypography}
            />
          </Tabs.Content>

          <Tabs.Content value="layout" className="py-[8px]">
            <LayoutPanel
              radius={radius}
              borderWidth={borderWidth}
              spacingScale={spacingScale}
              onRadiusChange={(value) =>
                applyAndPersistLayout({
                  radius: value,
                  borderWidth,
                  spacingScale,
                })
              }
              onBorderWidthChange={(value) =>
                applyAndPersistLayout({
                  radius,
                  borderWidth: value,
                  spacingScale,
                })
              }
              onSpacingScaleChange={(value) =>
                applyAndPersistLayout({
                  radius,
                  borderWidth,
                  spacingScale: value,
                })
              }
            />
          </Tabs.Content>
        </Tabs>
        </Scroll>
      </div>

      <Link href="/config" className="ml-auto m-2" >
        <Button size="sm">
          Configuration
        </Button>
      </Link>
    </div>
  );
};
