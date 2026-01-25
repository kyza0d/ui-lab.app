"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "../../lib/app-context";
import {
  isValidTypographyConfig,
} from "../../lib/typography-constraints";
import {
  FaFont,
  FaRulerCombined,
  FaGear,
  FaBrush,
} from "react-icons/fa6";
import { themes } from "../../constants/themes";
import {
  type OklchColor,
  type SemanticColorType,
  type SemanticColorConfig,
  type GlobalColorAdjustments,
} from "../../lib/color-utils";
import { useThemeStorage } from "../../hooks/use-theme-storage";
import { getFontConfig } from "../../constants/font-config";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "ui-lab-components";
import { ColorsPanel } from "./colors-panel";
import { TypographyPanel } from "./typography-panel";
import { LayoutPanel } from "./layout-panel";

type ConfigTab = "colors" | "layout" | "fonts";

export const SettingsContent = () => {
  const {
    currentThemeColors,
    setCurrentThemeColors,
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
    currentThemeMode,
    isThemeInitialized,
    globalAdjustments,
    setGlobalAdjustments,
    selectedSansFont,
    setSelectedSansFont,
    selectedMonoFont,
    setSelectedMonoFont,
    headerLetterSpacingScale,
    setHeaderLetterSpacingScale,
    bodyLetterSpacingScale,
    setBodyLetterSpacingScale,
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

  useEffect(() => {
    if (isThemeInitialized) {
      setLocalGlobalAdjustments(globalAdjustments);
    }
  }, [isThemeInitialized, globalAdjustments]);

  const {
    applyAndPersistColors,
    applyAndPersistTypography,
    applyAndPersistLayout,
    applyAndPersistFonts,
  } = useThemeStorage({
    onColorsChange: setCurrentThemeColors,
    onTypographyChange: (config: any) => {
      setFontSizeScale(config.fontSizeScale);
      setFontWeightScale(config.fontWeightScale);
      setTypeSizeRatio(config.typeSizeRatio);
      setHeaderLetterSpacingScale(config.headerLetterSpacingScale);
      setBodyLetterSpacingScale(config.bodyLetterSpacingScale);
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
      const { fontSizeScale: scale, fontWeightScale: weight, typeSizeRatio: ratio } = fontConfig.metrics;
      let finalScale = scale;
      if (!isValidTypographyConfig(ratio, scale)) {
        let closestScale = scale;
        let closestDistance = Infinity;
        for (let s = 0.85; s <= 1.15; s += 0.001) {
          if (isValidTypographyConfig(ratio, s)) {
            const distance = Math.abs(s - scale);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestScale = s;
            }
          }
        }
        finalScale = closestScale;
      }
      applyAndPersistTypography({
        fontSizeScale: finalScale,
        fontWeightScale: weight,
        typeSizeRatio: ratio,
        headerLetterSpacingScale,
        bodyLetterSpacingScale,
      });
    }
    applyAndPersistFonts({ sansFont: fontName as any, monoFont: selectedMonoFont });
  };

  const handleMonoFontChange = (fontName: string) => {
    const fontConfig = getFontConfig(fontName as any, "mono");
    if (fontConfig) {
      const { fontSizeScale: scale, fontWeightScale: weight, typeSizeRatio: ratio } = fontConfig.metrics;
      let finalScale = scale;
      if (!isValidTypographyConfig(ratio, scale)) {
        let closestScale = scale;
        let closestDistance = Infinity;
        for (let s = 0.85; s <= 1.15; s += 0.001) {
          if (isValidTypographyConfig(ratio, s)) {
            const distance = Math.abs(s - scale);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestScale = s;
            }
          }
        }
        finalScale = closestScale;
      }
      applyAndPersistTypography({
        fontSizeScale: finalScale,
        fontWeightScale: weight,
        typeSizeRatio: ratio,
        headerLetterSpacingScale,
        bodyLetterSpacingScale,
      });
    }
    applyAndPersistFonts({ sansFont: selectedSansFont, monoFont: fontName as any });
  };

  const handleTypeSizeRatioChange = (ratio: number) => {
    let finalScale = fontSizeScale;
    if (!isValidTypographyConfig(ratio, fontSizeScale)) {
      let closestScale = fontSizeScale;
      let closestDistance = Infinity;
      for (let s = 0.85; s <= 1.15; s += 0.001) {
        if (isValidTypographyConfig(ratio, s)) {
          const distance = Math.abs(s - fontSizeScale);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestScale = s;
          }
        }
      }
      finalScale = closestScale;
    }
    applyAndPersistTypography({
      fontSizeScale: finalScale,
      fontWeightScale,
      typeSizeRatio: ratio,
      headerLetterSpacingScale,
      bodyLetterSpacingScale,
    });
  };

  const handleFontSizeScaleChange = (scale: number) => {
    let finalRatio = typeSizeRatio;
    if (!isValidTypographyConfig(typeSizeRatio, scale)) {
      let closestRatio = typeSizeRatio;
      let closestDistance = Infinity;
      for (let r = 1.067; r <= 1.2; r += 0.001) {
        if (isValidTypographyConfig(r, scale)) {
          const distance = Math.abs(r - typeSizeRatio);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestRatio = r;
          }
        }
      }
      finalRatio = closestRatio;
    }
    applyAndPersistTypography({
      fontSizeScale: scale,
      fontWeightScale,
      typeSizeRatio: finalRatio,
      headerLetterSpacingScale,
      bodyLetterSpacingScale,
    });
  };

  return (
    <div className="w-full h-full select-none flex flex-col bg-background-900/90 text-foreground">
      <div className="pr-[8px] py-[2px] flex items-center justify-between border-b border-background-700 shrink-0">
        <Tabs
          variant="underline"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ConfigTab)}
        >
          <TabsList className="h-[44px] border-none -mb-0.5">
            <TabsTrigger
              className="text-sm w-[100px]"
              value="colors"
              icon={<FaBrush size={14} />}
            >
              Theme
            </TabsTrigger>
            <TabsTrigger
              className="text-sm w-[100px]"
              value="fonts"
              icon={<FaFont size={14} />}
            >
              Fonts
            </TabsTrigger>
            <TabsTrigger
              className="text-sm w-[100px]"
              value="layout"
              icon={<FaRulerCombined size={14} />}
            >
              Layout
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pt-[8px]">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ConfigTab)}
        >
          <TabsContent value="colors">
            <ColorsPanel
              localColors={localColors}
              expandedColor={expandedColor}
              localGlobalAdjustments={localGlobalAdjustments}
              onExpandedColorChange={setExpandedColor}
              onColorChange={handleColorChange}
              onChromaLimitChange={handleChromaLimitChange}
              onGlobalAdjustmentChange={handleGlobalAdjustmentChange}
            />
          </TabsContent>

          <TabsContent value="fonts">
            <TypographyPanel
              selectedSansFont={selectedSansFont}
              selectedMonoFont={selectedMonoFont}
              headerLetterSpacingScale={headerLetterSpacingScale}
              bodyLetterSpacingScale={bodyLetterSpacingScale}
              typeSizeRatio={typeSizeRatio}
              fontSizeScale={fontSizeScale}
              fontWeightScale={fontWeightScale}
              onSansFontChange={handleSansFontChange}
              onMonoFontChange={handleMonoFontChange}
              onHeaderLetterSpacingChange={(scale) =>
                applyAndPersistTypography({
                  fontSizeScale,
                  fontWeightScale,
                  typeSizeRatio,
                  headerLetterSpacingScale: scale,
                  bodyLetterSpacingScale,
                })
              }
              onBodyLetterSpacingChange={(scale) =>
                applyAndPersistTypography({
                  fontSizeScale,
                  fontWeightScale,
                  typeSizeRatio,
                  headerLetterSpacingScale,
                  bodyLetterSpacingScale: scale,
                })
              }
              onTypeSizeRatioChange={handleTypeSizeRatioChange}
              onFontSizeScaleChange={handleFontSizeScaleChange}
              onFontWeightScaleChange={(scale) =>
                applyAndPersistTypography({
                  fontSizeScale,
                  fontWeightScale: scale,
                  typeSizeRatio,
                  headerLetterSpacingScale,
                  bodyLetterSpacingScale,
                })
              }
            />
          </TabsContent>

          <TabsContent value="layout">
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
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t border-background-700 px-[8px] py-[6px] bg-background-800/50 flex items-center justify-between shrink-0">
        <Link
          href="/config"
          className="ml-auto inline-flex cursor-pointer items-center justify-center rounded-md text-sm px-[10px] py-[5px] border border-background-600 bg-background-700 text-foreground-300 hover:text-foreground-50 hover:bg-background-600 active:bg-accent-400 gap-2"
        >
          <FaGear className="mr-2" />
          Configuration
        </Link>
      </div>
    </div>
  );
};
