"use client";

import { useEffect, useRef, useState, memo, useMemo } from "react";
import Link from "next/link";
import { useHeader } from "@/lib/header-context";
import { FaPalette, FaFont, FaRulerCombined, FaXmark, FaChevronDown, FaGear, FaBrush } from "react-icons/fa6";
import { themes } from "@/constants/themes";
import { type OklchColor, type SemanticColorType, type HueRange } from "@/lib/color-utils";
import { getScaleName } from "@/lib/config-generator";
import { useThemeStorage } from "@/hooks/use-theme-storage";
import { useThemeConfiguration } from "@/hooks/use-theme-configuration";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui-lab-components";
import { Slider } from "ui-lab-components";

type ConfigTab = "colors" | "typography" | "layout";

interface ColorRowProps {
  type: "background" | "foreground" | "accent" | "success" | "danger" | "warning" | "info";
  color: OklchColor;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (color: OklchColor) => void;
  chromaLimit?: number;
  onChromaLimitChange?: (limit: number) => void;
  hueRange?: HueRange;
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

interface TypeScaleSliderProps {
  value?: number;
  onChange: (ratio: number) => void;
  fontSizeScale: number;
}

interface ColorPickerProps {
  color: OklchColor;
  onChange: (color: OklchColor) => void;
  hueRange?: HueRange;
}

const MICRO_LABEL = "text-[14px] font-semibold text-foreground-500";
const VALUE_LABEL = "text-[14px] text-foreground-300";

export const SettingsPanel = () => {
  const {
    isSettingsPanelOpen,
    setIsSettingsPanelOpen,
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
  } = useHeader();

  const panelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ConfigTab>("colors");
  const [localColors, setLocalColors] = useState(currentThemeColors || themes["Vitesse"].dark);
  const [expandedColor, setExpandedColor] = useState<string | null>(null);

  useEffect(() => {
    if (isThemeInitialized && currentThemeColors) {
      setLocalColors(currentThemeColors);
    }
  }, [isThemeInitialized, currentThemeColors]);

  const { applyAndPersistColors, applyAndPersistTypography, applyAndPersistLayout } =
    useThemeStorage({
      onColorsChange: setCurrentThemeColors,
      onTypographyChange: (config) => {
        setFontSizeScale(config.fontSizeScale);
        setFontWeightScale(config.fontWeightScale);
        setTypeSizeRatio(config.typeSizeRatio);
      },
      onLayoutChange: (config) => {
        setRadius(config.radius);
        setBorderWidth(config.borderWidth);
        setSpacingScale(config.spacingScale);
      },
      currentThemeMode,
    });

  useThemeConfiguration({
    typography: { fontSizeScale, fontWeightScale, typeSizeRatio },
    layout: { radius, borderWidth, spacingScale },
  });

  const handleColorChange = (type: string, newColor: OklchColor) => {
    const updated = { ...localColors };
    if (["background", "foreground", "accent"].includes(type)) {
      (updated as any)[type] = newColor;
    } else {
      if (!updated.semantic) updated.semantic = {} as any;
      const existing = (updated.semantic as any)[type] || { light: {}, dark: {} };
      (updated.semantic as any)[type] = {
        ...existing,
        light: {
          ...existing.light,
          color: newColor,
          // Preserve chromaLimit from existing config (fallback to 0.25 for semantic colors)
          chromaLimit: existing.light?.chromaLimit ?? 0.25,
        },
        dark: {
          ...existing.dark,
          color: newColor,
          // Preserve chromaLimit from existing config (fallback to 0.25 for semantic colors)
          chromaLimit: existing.dark?.chromaLimit ?? 0.25,
        },
        // Preserve hueRange if it exists
        ...(existing.hueRange && { hueRange: existing.hueRange }),
      };
    }
    setLocalColors(updated);
    applyAndPersistColors(updated);
  };

  const handleChromaLimitChange = (type: SemanticColorType, chromaLimit: number) => {
    const updated = { ...localColors };
    if (!updated.semantic) updated.semantic = {} as any;
    const existing = (updated.semantic as any)[type] || { light: {}, dark: {} };
    (updated.semantic as any)[type] = {
      ...existing,
      light: { ...existing.light, chromaLimit },
      dark: { ...existing.dark, chromaLimit },
    };
    setLocalColors(updated);
    applyAndPersistColors(updated);
  };

  if (!isSettingsPanelOpen) return null;

  return (
    <div
      ref={panelRef}
      className={`fixed z-[300] w-[390px] h-[490px] bg-background-900 border border-background-700 bottom-[24px] right-[24px] rounded-[16px] overflow-hidden select-none flex flex-col shadow-2xl`}
    >
      {/* Header */}
      <div className="pr-[8px] py-[2px] flex items-center justify-between border-b border-background-700">
        {/* Segmented Sliding Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ConfigTab)}>
          <TabsList variant="underline" className="h-[44px] border-none -mb-0.5">
            <TabsTrigger className="text-[14px] w-[100px]" value="colors" icon={<FaBrush size={14} />}>
              Theme
            </TabsTrigger>
            <TabsTrigger className="text-[14px] w-[100px]" value="typography" icon={<FaFont size={14} />}>
              Type
            </TabsTrigger>
            <TabsTrigger className="text-[14px] w-[100px]" value="layout" icon={<FaRulerCombined size={14} />}>
              Layout
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <button
          onClick={() => setIsSettingsPanelOpen(false)}
          className="p-1.5 cursor-pointer text-foreground-400 hover:text-foreground-100 hover:bg-white/10 rounded-[9px] transition-all active:scale-90"
        >
          <FaXmark size={14} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ConfigTab)}>
          <TabsContent value="colors" className="px-[6px] m-0 space-y-2">
            {(["background", "foreground", "accent"] as const).map((colorType) => (
              <ColorRow
                key={colorType}
                type={colorType}
                color={localColors[colorType]}
                isExpanded={expandedColor === colorType}
                onToggle={() => setExpandedColor(expandedColor === colorType ? null : colorType)}
                onChange={(c: OklchColor) => handleColorChange(colorType, c)}
              />
            ))}

            <div className="pt-4 pb-2">
              <div className={`${MICRO_LABEL} px-2 mb-2 opacity-70`}>Semantic Layer</div>
              <div className="space-y-2">
                {(["success", "danger", "warning", "info"] as const).map((colorType) => {
                  const semanticConfig = localColors.semantic?.[colorType];
                  const modeConfig = currentThemeMode === "light" ? semanticConfig?.light : semanticConfig?.dark;

                  if (!modeConfig?.color) return null;

                  return (
                    <ColorRow
                      key={colorType}
                      type={colorType}
                      color={modeConfig.color}
                      isExpanded={expandedColor === colorType}
                      onToggle={() => setExpandedColor(expandedColor === colorType ? null : colorType)}
                      onChange={(c: OklchColor) => handleColorChange(colorType, c)}
                      chromaLimit={modeConfig.chromaLimit ?? 0.025}
                      onChromaLimitChange={(limit) => handleChromaLimitChange(colorType, limit)}
                      hueRange={semanticConfig?.hueRange}
                    />
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="px-[6px] m-0 space-y-2">
            <TypeScaleSlider
              value={typeSizeRatio}
              onChange={(ratio) => applyAndPersistTypography({ fontSizeScale, fontWeightScale, typeSizeRatio: ratio })}
              fontSizeScale={fontSizeScale}
            />
            <div className="px-4 space-y-3 pt-2">
              <SliderControl
                label="Global Scale"
                value={fontSizeScale}
                min={0.85}
                max={1.15}
                step={0.05}
                unit="x"
                onChange={(scale) =>
                  applyAndPersistTypography({ fontSizeScale: scale, fontWeightScale, typeSizeRatio })
                }
              />
              <SliderControl
                label="Weight Multiplier"
                value={fontWeightScale}
                min={0.75}
                max={1.25}
                step={0.05}
                unit="x"
                onChange={(scale) =>
                  applyAndPersistTypography({ fontSizeScale, fontWeightScale: scale, typeSizeRatio })
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
              onChange={(value) => applyAndPersistLayout({ radius: value, borderWidth, spacingScale })}
            />
            <SliderControl
              label="Border Width"
              value={borderWidth}
              min={0}
              max={4}
              step={0.5}
              unit="px"
              onChange={(value) => applyAndPersistLayout({ radius, borderWidth: value, spacingScale })}
            />
            <SliderControl
              label="Spacing Density"
              value={spacingScale}
              min={0.75}
              max={1.25}
              step={0.05}
              unit="x"
              onChange={(value) => applyAndPersistLayout({ radius, borderWidth, spacingScale: value })}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer - View Configuration Link */}
      <div className="border-t border-background-700 px-[8px] py-[6px] bg-background-800/50 flex items-center justify-between">
        <Link
          href="/config"
          className="ml-auto inline-flex cursor-pointer items-center justify-center rounded-lg text-[14px] px-[10px] py-[5px] border border-background-600 bg-background-700 text-foreground-300 hover:text-foreground-50 hover:bg-background-600 active:bg-accent-400 gap-2"
        >
          <FaGear className="mr-2" />
          Configuration
        </Link>
      </div>
    </div>
  );
};

const ColorRow = memo(({ type, color, isExpanded, onToggle, onChange, hueRange }: ColorRowProps) => {
  return (
    <div className={`rounded-[12px] ${isExpanded ? "bg-background-700/40 border border-background-700" : "hover:bg-background-700/40 border border-transparent hover:border-background-700 active:bg-background-800/50"} transition-all duration-300 overflow-hidden group`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-[6px] text-left outline-none"
      >
        <div className="relative">
          <div
            className="w-8 h-8 rounded-[8px]"
            style={{ backgroundColor: `oklch(${color.l} ${color.c} ${color.h})` }}
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="text-[14px] font-medium text-foreground-100 capitalize leading-tight group-hover:text-foreground-100 transition-colors">
            {type}
          </div>
          <div className={`${VALUE_LABEL} opacity-60`}>
            {Math.round(color.l * 100)}% / {color.c.toFixed(3)}
          </div>
        </div>

        <div className={`text-foreground-500 text-[10px] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
          <FaChevronDown size={13} />
        </div>
      </button>

      {/* Animated Content Expansion */}
      <div
        className={`transition-all border-t border-background-700 duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-3 pb-3 pt-0 space-y-4">
          <div className="h-px w-full bg-background-700/30 mb-3" />
          <ColorPicker color={color} onChange={onChange} hueRange={hueRange} />
        </div>
      </div>
    </div>
  );
});

const SliderControl = memo(({ label, value, min, max, step, unit, onChange }: SliderControlProps) => {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between items-end">
        <label className="text-[14px] font-medium text-foreground-400 group-hover:text-foreground-300 transition-colors">{label}</label>
        <span className={`${VALUE_LABEL} border border-background-700 rounded-[8px] bg-background-800 px-1.5 py-0.5 rounded-[4px] text-foreground-300`}>
          {value.toFixed(unit ? 2 : 3)}{unit}
        </span>
      </div>

      <Slider.Root
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        min={min}
        max={max}
        step={step}
        size="md"
      >
        <Slider.Thumb />
      </Slider.Root>
    </div>
  );
});

const TypeScaleSlider = memo(({ value, onChange, fontSizeScale }: TypeScaleSliderProps) => {
  const ratio = value ?? 1.2;
  const scaleName = getScaleName(ratio);

  return (
    <div className="bg-background-800/30 rounded-[12px] border border-background-700 space-y-3">
      <div className="flex justify-between items-start px-4 pt-2">
        <label className="text-[14px] font-medium text-foreground-400">Type Scale</label>
        <div className="flex flex-col items-end text-right">
          <span className="text-[14px] font-semibold text-foreground-100">{scaleName}</span>
          <span className={`${VALUE_LABEL} text-foreground-500`}>{ratio.toFixed(3)}</span>
        </div>
      </div>

      <div className="px-4 py-2 border-t border-background-700">
        <Slider.Root
          value={[ratio]}
          onValueChange={([newValue]) => onChange(newValue)}
          min={1.067}
          max={1.2}
          step={0.001}
          size="md"
        >
          <Slider.Thumb />
        </Slider.Root>
      </div>
    </div>
  );
});

const ColorPicker = memo(({ color, onChange, hueRange }: ColorPickerProps) => {
  const constrainHue = (hue: number): number => {
    if (!hueRange) return hue;
    return Math.max(hueRange.min, Math.min(hueRange.max, hue));
  };

  const GradientSlider = ({ value, min, max, step, background, onChangeValue }: any) => (
    <div className="space-y-1.5 flex items-center">
      <div className="relative h-3 w-full rounded-[3px] shadow-inner ring-1 ring-white/10 overflow-visible group">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChangeValue(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-[6px] [&::-webkit-slider-thumb]:bg-accent-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:-mt-2.5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:rounded-[6px] [&::-moz-range-thumb]:bg-accent-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:border-0"
        />
        <div className="absolute inset-0 rounded-[3px]" style={{ background }} />
        {/* Indicator Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
    </div>
  );

  const isSemanticColor = !!hueRange;

  return (
    <div className="space-y-3">
      {!isSemanticColor && (
        <>
          <GradientSlider
            value={color.l}
            min={0.1}
            max={0.99}
            step={0.01}
            background={`linear-gradient(to right, oklch(10% ${color.c} ${color.h}), oklch(99% ${color.c} ${color.h}))`}
            onChangeValue={(l: number) => onChange({ ...color, l })}
          />
          <GradientSlider
            value={color.c}
            min={0}
            max={0.4}
            step={0.01}
            background={`linear-gradient(to right, oklch(${color.l * 100}% 0 ${color.h}), oklch(${color.l * 100}% 0.4 ${color.h}))`}
            onChangeValue={(c: number) => onChange({ ...color, c })}
          />
        </>
      )}
      <GradientSlider
        value={constrainHue(color.h)}
        min={hueRange?.min ?? 0}
        max={hueRange?.max ?? 360}
        step={1}
        background={
          hueRange
            ? `linear-gradient(to right, ${Array.from({ length: 11 }, (_, i) => {
              const hue = hueRange.min + ((hueRange.max - hueRange.min) * i / 10);
              return `oklch(60% 0.2 ${hue})`;
            }).join(", ")})`
            : `linear-gradient(to right, oklch(60% 0.2 0), oklch(60% 0.2 60), oklch(60% 0.2 120), oklch(60% 0.2 180), oklch(60% 0.2 240), oklch(60% 0.2 300), oklch(60% 0.2 360))`
        }
        onChangeValue={(h: number) => onChange({ ...color, h: constrainHue(h) })}
      />
    </div>
  );
});
