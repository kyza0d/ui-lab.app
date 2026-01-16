"use client";

import { useEffect, useState, memo, useMemo } from "react";
import Link from "next/link";
import { useApp } from "../../lib/app-context";
import {
  FaFont,
  FaRulerCombined,
  FaChevronDown,
  FaGear,
  FaBrush,
  FaSun,
  FaCheck,
} from "react-icons/fa6";
import { themes } from "../../constants/themes";
import {
  type OklchColor,
  type SemanticColorType,
  type SemanticColorConfig,
  type HueRange,
  type GlobalColorAdjustments,
  oklchToCss,
} from "../../lib/color-utils";

import { useThemeStorage } from "../../hooks/use-theme-storage";
import {
  getSemanticColorSafely,
  getSemanticChromaLimit,
} from "../../lib/semantic-color-utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
} from "ui-lab-components";
import { Slider } from "ui-lab-components";
import { Divider } from "ui-lab-components";

type ConfigTab = "colors" | "typography" | "layout";

interface ColorRowProps {
  type:
  | "background"
  | "foreground"
  | "accent"
  | "success"
  | "danger"
  | "warning"
  | "info";
  color: OklchColor;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (color: OklchColor) => void;
  chromaLimit?: number;
  onChromaLimitChange?: (limit: number) => void;
  hueRange?: HueRange;
}

interface GlobalSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}

interface ColorPickerProps {
  color: OklchColor;
  onChange: (color: OklchColor) => void;
  hueRange?: HueRange;
  type: string;
}

// Use text-sm (15px static) for labels and text-xs (14px static) for values
// These sizes are now enforced at the CSS level with minimum constraints
const MICRO_LABEL = "text-sm font-semibold text-foreground-500";
const VALUE_LABEL = "text-xs text-foreground-300";

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
  } = useThemeStorage({
    onColorsChange: setCurrentThemeColors,
    onTypographyChange: (config: any) => {
      setFontSizeScale(config.fontSizeScale);
      setFontWeightScale(config.fontWeightScale);
      setTypeSizeRatio(config.typeSizeRatio);
    },
    onLayoutChange: (config: any) => {
      setRadius(config.radius);
      setBorderWidth(config.borderWidth);
      setSpacingScale(config.spacingScale);
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
              value="typography"
              icon={<FaFont size={14} />}
            >
              Type
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
          <TabsContent value="colors" className="m-0 space-y-[8px]">
            <div className="mx-[6px] mb-2 p-3 bg-background-800/40 rounded-[12px] border border-background-700">
              <div className={`${MICRO_LABEL} mb-3 flex items-center gap-2`}>
                <FaSun size={12} className="text-foreground-400" />
                Global Adjustments
              </div>
              <div className="space-y-3">
                <GlobalSlider
                  label="Lightness"
                  value={localGlobalAdjustments.lightnessShift}
                  min={-0.015}
                  max={0.015}
                  step={0.001}
                  unit="%"
                  formatValue={(v) =>
                    `${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)}%`
                  }
                  onChange={(v) =>
                    handleGlobalAdjustmentChange("lightnessShift", v)
                  }
                />
                <GlobalSlider
                  label="Chroma"
                  value={localGlobalAdjustments.chromaBoost}
                  min={0.7}
                  max={1.5}
                  step={0.05}
                  unit="×"
                  formatValue={(v) => `×${v.toFixed(2)}`}
                  onChange={(v) =>
                    handleGlobalAdjustmentChange("chromaBoost", v)
                  }
                />
              </div>
            </div>
            <Divider />
            <div className={`${MICRO_LABEL} px-2 pt-2 opacity-70`}>
              Core Colors
            </div>
            {(["background", "foreground", "accent"] as const).map(
              (colorType) => (
                <ColorRow
                  key={colorType}
                  type={colorType}
                  color={localColors[colorType]}
                  isExpanded={expandedColor === colorType}
                  onToggle={() =>
                    setExpandedColor(
                      expandedColor === colorType ? null : colorType,
                    )
                  }
                  onChange={(c: OklchColor) => handleColorChange(colorType, c)}
                />
              ),
            )}

            <div className="pt-4 pb-2">
              <div className={`${MICRO_LABEL} px-2 mb-2 opacity-70`}>
                Semantic Layer
              </div>
              <div className="space-y-2">
                {(["success", "danger", "warning", "info"] as const).map(
                  (colorType) => {
                    const semanticColor = getSemanticColorSafely(
                      localColors.semantic,
                      colorType,
                      currentThemeMode,
                    );
                    const chromaLimit = getSemanticChromaLimit(
                      localColors.semantic,
                      colorType,
                      currentThemeMode,
                    );
                    const hueRange =
                      localColors.semantic?.[colorType]?.hueRange;

                    if (!semanticColor) return null;

                    return (
                      <ColorRow
                        key={colorType}
                        type={colorType}
                        color={semanticColor}
                        isExpanded={expandedColor === colorType}
                        onToggle={() =>
                          setExpandedColor(
                            expandedColor === colorType ? null : colorType,
                          )
                        }
                        onChange={(c: OklchColor) =>
                          handleColorChange(colorType, c)
                        }
                        chromaLimit={chromaLimit}
                        onChromaLimitChange={(limit) =>
                          handleChromaLimitChange(colorType, limit)
                        }
                        hueRange={hueRange}
                      />
                    );
                  },
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="px-[6px] m-0 space-y-2">
            <div className="px-4 space-y-3 pt-2">
              <SliderControl
                label="Weight Multiplier"
                value={fontWeightScale}
                min={0.75}
                max={1.25}
                step={0.05}
                unit="x"
                onChange={(scale) =>
                  applyAndPersistTypography({
                    fontSizeScale,
                    fontWeightScale: scale,
                    typeSizeRatio,
                  })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="layout" className="p-4 space-y-6">
            <SliderControl
              label="Corner Radius"
              value={radius}
              min={0}
              max={1.5}
              step={0.1}
              unit="rem"
              onChange={(value) =>
                applyAndPersistLayout({
                  radius: value,
                  borderWidth,
                  spacingScale,
                })
              }
            />
            <SliderControl
              label="Border Width"
              value={borderWidth}
              min={0}
              max={4}
              step={0.5}
              unit="px"
              onChange={(value) =>
                applyAndPersistLayout({
                  radius,
                  borderWidth: value,
                  spacingScale,
                })
              }
            />
            <SliderControl
              label="Spacing Density"
              value={spacingScale}
              min={0.75}
              max={1.25}
              step={0.05}
              unit="x"
              onChange={(value) =>
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
          className="ml-auto inline-flex cursor-pointer items-center justify-center rounded-lg text-sm px-[10px] py-[5px] border border-background-600 bg-background-700 text-foreground-300 hover:text-foreground-50 hover:bg-background-600 active:bg-accent-400 gap-2"
        >
          <FaGear className="mr-2" />
          Configuration
        </Link>
      </div>
    </div>
  );
};

const ColorRow = memo(
  ({
    type,
    color,
    isExpanded,
    onToggle,
    onChange,
    hueRange,
  }: ColorRowProps) => {
    const previewStyle = useMemo(
      () => ({
        backgroundColor: oklchToCss(
          color.c <= 0.005
            ? { l: 1, c: 0, h: 0 }
            : { l: 0.65, c: 0.18, h: color.h },
        ),
      }),
      [color.h, color.c],
    );

    return (
      <div>
        <div
          className={`mx-[6px] rounded-[12px] ${isExpanded ? "bg-background-700/40 border border-background-700" : "hover:bg-background-700/40 border border-transparent hover:border-background-700 active:bg-background-800/50"} mb-[8px] transition-all duration-300 overflow-hidden group`}
        >
          <button
            onClick={onToggle}
            className="cursor-pointer w-full flex items-center gap-3 py-[10px] px-[10px] text-left outline-none"
          >
            <div className="relative">
              <div
                className="w-7 h-7 rounded-[8px]"
                style={previewStyle}
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="text-sm font-semibold text-foreground-100 capitalize leading-tight group-hover:text-foreground-100 transition-colors">
                {type}
              </div>
            </div>

            <div
              className={`mr-3 text-foreground-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            >
              <FaChevronDown size={13} />
            </div>
          </button>

          <div
            className={`transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-3 pb-4 pt-0">
              <div className="h-px w-full bg-background-700/30 mb-4" />
              <ColorPicker
                type={type}
                color={color}
                onChange={onChange}
                hueRange={hueRange}
              />
            </div>
          </div>
        </div>
        <Divider />
      </div>
    );
  },
);

const SliderControl = memo(
  ({ label, value, min, max, step, unit, onChange }: SliderControlProps) => {
    return (
      <div className="space-y-2 group">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-foreground-400 group-hover:text-foreground-300 transition-colors">
            {label}
          </label>
          <span
            className={`${VALUE_LABEL} border border-background-700 rounded-[8px] bg-background-800 px-1.5 py-0.5 text-foreground-300`}
          >
            {value.toFixed(unit ? 2 : 3)}
            {unit}
          </span>
        </div>
        <Slider.Root
          value={[value]}
          onValueChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
          min={min}
          max={max}
          step={step}
          size="md"
        />
      </div>
    );
  },
);

const GlobalSlider = memo(
  ({
    label,
    value,
    min,
    max,
    step,
    formatValue,
    onChange,
  }: GlobalSliderProps) => {
    const isNeutral = Math.abs(value - (label === "Lightness" ? 0 : 1)) < 0.01;
    return (
      <div className="space-y-1.5 group">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-foreground-400 group-hover:text-foreground-300 transition-colors">
            {label}
          </label>
          <span
            className={`text-xs px-1.5 py-0.5 rounded-[4px] ${isNeutral ? "text-foreground-500" : "text-accent-400 bg-accent-900/30"}`}
          >
            {formatValue(value)}
          </span>
        </div>
        <Slider.Root
          value={[value]}
          onValueChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
          min={min}
          max={max}
          step={step}
          size="sm"
        />
      </div>
    );
  },
);

const ColorPicker = memo(
  ({ color, onChange, hueRange, type }: ColorPickerProps) => {
    const { currentThemeMode } = useApp();

    const swatches = useMemo(() => {
      const hueSwatches = Array.from({ length: 7 }, (_, i) => {
        if (hueRange) {
          return hueRange.min + (hueRange.max - hueRange.min) * (i / 6);
        }
        return (i * (360 / 7)) % 360;
      });
      if (type === "background" || type === "foreground") {
        return [...hueSwatches, null];
      }
      return hueSwatches;
    }, [hueRange, type]);

    const getPresentationColor = (h: number) => {
      if (type === "foreground") {
        return oklchToCss({
          l: currentThemeMode === "dark" ? 0.9 : 0.2,
          c: 0.04,
          h: h,
        });
      }
      return oklchToCss({
        l: 0.65,
        c: 0.18,
        h: h,
      });
    };

    return (
      <div className="grid grid-cols-4 gap-2">
        {swatches.map((h, i) => {
          const isNeutral = h === null;
          const isSelected = color.c <= 0.005
            ? isNeutral
            : !isNeutral && Math.abs(h - color.h) < 2;
          const displayColor = isNeutral
            ? oklchToCss({ l: 1, c: 0, h: 0 })
            : getPresentationColor(h);

          return (
            <button
              key={i}
              onClick={() => {
                if (isNeutral) {
                  onChange({ l: 1, c: 0, h: 180 });
                } else {
                  const defaultChroma = type === "foreground" ? 0.01 : 0.008;
                  onChange({ ...color, c: color.c === 0 ? defaultChroma : color.c, h });
                }
              }}
              className="relative h-10 rounded-[4px] transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
              style={{ backgroundColor: displayColor }}
            >
              {isSelected && (
                <FaCheck
                  className={
                    currentThemeMode === "dark" && type === "foreground"
                      ? "text-black"
                      : "text-white"
                  }
                  size={10}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  },
);
