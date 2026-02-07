"use client";

import { memo, useMemo } from "react";
import {
  FaChevronDown,
  FaCheck,
  FaSun,
} from "react-icons/fa6";
import {
  type OklchColor,
  type HueRange,
  oklchToCss,
} from "../../lib/color-utils";
import { getScaleName } from "../../lib/config-generator";
import {
  Slider,
  Divider,
} from "ui-lab-components";
import { useApp } from "../../lib/app-context";

const MICRO_LABEL = "text-sm font-semibold text-foreground-500";
const VALUE_LABEL = "text-xs text-foreground-300";

export interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}

export interface GlobalSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  formatValue: (value: number) => string;
  onChange: (value: number) => void;
}

export interface ColorRowProps {
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

export interface TypeScaleSliderProps {
  value?: number;
  onChange: (ratio: number) => void;
  fontSizeScale: number;
}

export interface ColorPickerProps {
  color: OklchColor;
  onChange: (color: OklchColor) => void;
  hueRange?: HueRange;
  type: string;
}

export const SliderControl = memo(
  ({ label, value, min, max, step, unit, onChange }: SliderControlProps) => {
    const safeValue = value ?? (min + (max - min) / 2);
    return (
      <div className="space-y-2 group">
        <div className="flex justify-between items-end">
          <label className="text-sm font-medium text-foreground-400 group-hover:text-foreground-300 transition-colors">
            {label}
          </label>
          <span
            className={`${VALUE_LABEL} border border-background-700 rounded-[8px] bg-background-800 px-1.5 py-0.5 text-foreground-300`}
          >
            {safeValue.toFixed(unit ? 2 : 3)}
            {unit}
          </span>
        </div>
        <Slider.Root
          value={[safeValue]}
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

SliderControl.displayName = "SliderControl";

export const GlobalSlider = memo(
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
            className={`text-xs px-1.5 py-0.5 rounded-[4px] ${isNeutral ? "text-foreground-500" : "text-accent-400 bg-accent-600/30"}`}
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

GlobalSlider.displayName = "GlobalSlider";

const getPreviewColor = (
  type: ColorRowProps["type"],
  color: OklchColor,
  themeMode: "dark" | "light"
): OklchColor => {
  const isNeutral = color.c <= 0.005;

  if (type === "background") {
    return themeMode === "dark"
      ? { l: 0.32, c: isNeutral ? 0 : Math.min(color.c, 0.008), h: color.h }
      : { l: 0.88, c: isNeutral ? 0 : Math.min(color.c, 0.008), h: color.h };
  }

  if (type === "foreground") {
    return themeMode === "dark"
      ? { l: 0.95, c: isNeutral ? 0 : Math.min(color.c, 0.04), h: color.h }
      : { l: 0.29, c: isNeutral ? 0 : Math.min(color.c, 0.04), h: color.h };
  }

  if (type === "accent") {
    if (isNeutral) {
      return themeMode === "dark"
        ? { l: 0.58, c: 0, h: 0 }
        : { l: 0.58, c: 0, h: 0 };
    }
    return { l: 0.70, c: Math.min(color.c, 0.18), h: color.h };
  }

  return { l: 0.55, c: Math.min(color.c, 0.20), h: color.h };
};

export const ColorRow = memo(
  ({
    type,
    color,
    isExpanded,
    onToggle,
    onChange,
    hueRange,
  }: ColorRowProps) => {
    const { currentThemeMode } = useApp();
    const previewStyle = useMemo(
      () => ({
        backgroundColor: oklchToCss(getPreviewColor(type, color, currentThemeMode)),
      }),
      [type, color, currentThemeMode],
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

ColorRow.displayName = "ColorRow";

export const TypeScaleSlider = memo(
  ({ value, onChange, fontSizeScale }: TypeScaleSliderProps) => {
    const ratio = value ?? 1.2;
    const scaleName = getScaleName(ratio);

    return (
      <div className="bg-background-800/30 rounded-[12px] border border-background-700 space-y-3 mx-[6px] mt-2">
        <div className="flex justify-between items-start px-4 pt-2">
          <label className="text-sm font-medium text-foreground-400">
            Type Scale
          </label>
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-semibold text-foreground-100">
              {scaleName}
            </span>
            <span className={`${VALUE_LABEL} text-foreground-500`}>
              {ratio.toFixed(3)}
            </span>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-background-700">
          <Slider.Root
            value={[ratio]}
            onValueChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
            min={1.067}
            max={1.2}
            step={0.001}
            size="md"
          />
        </div>
      </div>
    );
  },
);

TypeScaleSlider.displayName = "TypeScaleSlider";

export const ColorPicker = memo(
  ({ color, onChange, hueRange, type }: ColorPickerProps) => {
    const { currentThemeMode } = useApp();

    const swatches = useMemo(() => {
      const hueSwatches = Array.from({ length: 7 }, (_, i) => {

        if (hueRange) return hueRange.min + (hueRange.max - hueRange.min) * (i / 6);

        return (i * (360 / 7)) % 360;
      });
      if (type === "background" || type === "foreground" || type === "accent") {
        return [...hueSwatches, null];
      }
      return hueSwatches;
    }, [hueRange, type]);

    const getSwatchColor = (h: number): OklchColor => {
      if (type === "background") {
        return currentThemeMode === "dark"
          ? { l: 0.32, c: 0.008, h }
          : { l: 0.88, c: 0.008, h };
      }
      if (type === "foreground") {
        return currentThemeMode === "dark"
          ? { l: 0.95, c: 0.04, h }
          : { l: 0.29, c: 0.04, h };
      }
      if (type === "accent") {
        return { l: 0.70, c: 0.18, h };
      }
      return { l: 0.55, c: 0.20, h };
    };

    const getNeutralSwatchColor = (): OklchColor => {
      if (type === "background") {
        return currentThemeMode === "dark"
          ? { l: 0.30, c: 0, h: 0 }
          : { l: 0.90, c: 0, h: 0 };
      }
      if (type === "foreground") {
        return currentThemeMode === "dark"
          ? { l: 0.95, c: 0, h: 0 }
          : { l: 0.29, c: 0, h: 0 };
      }
      return { l: 0.58, c: 0, h: 0 };
    };

    const getCheckmarkDark = (isNeutral: boolean): boolean => {
      if (type === "background") return currentThemeMode === "light";
      if (type === "foreground") return currentThemeMode === "dark";
      if (isNeutral) return false;
      return false;
    };

    return (
      <div className="grid grid-cols-4 gap-2">
        {swatches.map((h, i) => {
          const isNeutral = h === null;
          const isSelected = color.c <= 0.005
            ? isNeutral
            : !isNeutral && Math.abs(h - color.h) < 2;
          const displayColor = isNeutral
            ? oklchToCss(getNeutralSwatchColor())
            : oklchToCss(getSwatchColor(h));

          return (
            <button
              key={i}
              onClick={() => {
                if (isNeutral) {
                  onChange({ l: 1, c: 0, h: 0 });
                } else {
                  const isColorNeutral = color.c <= 0.005;
                  const defaultChroma = type === "foreground" ? 0.01 : type === "accent" ? 0.20 : 0.008;
                  let lightness = color.l;
                  if (isColorNeutral) {
                    if (type === "foreground") {
                      lightness = currentThemeMode === "dark" ? 0.4 : 0.2;
                    } else if (type === "accent") {
                      lightness = 0.5;
                    }
                  }
                  onChange({ l: lightness, c: color.c === 0 ? defaultChroma : color.c, h });
                }
              }}
              className="relative h-10 rounded-[4px] flex items-center justify-center"
              style={{ backgroundColor: displayColor }}
            >
              {isSelected && (
                <FaCheck
                  className={getCheckmarkDark(isNeutral) ? "text-background-950" : "text-accent-50"}
                  size={14}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";

export const GlobalAdjustmentsPanel = memo(
  ({ lightnessValue, chromaValue, onLightnessChange, onChromaChange }: {
    lightnessValue: number;
    chromaValue: number;
    onLightnessChange: (value: number) => void;
    onChromaChange: (value: number) => void;
  }) => {
    return (
      <div className="mx-[6px] mb-2 p-3 bg-background-800/40 rounded-[12px] border border-background-700">
        <div className={`${MICRO_LABEL} mb-3 flex items-center gap-2`}>
          <FaSun size={12} className="text-foreground-400" />
          Global Adjustments
        </div>
        <div className="space-y-3">
          <GlobalSlider
            label="Lightness"
            value={lightnessValue}
            min={-0.015}
            max={0.015}
            step={0.001}
            unit="%"
            formatValue={(v) =>
              `${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)}%`
            }
            onChange={onLightnessChange}
          />
          <GlobalSlider
            label="Chroma"
            value={chromaValue}
            min={0.7}
            max={1.5}
            step={0.05}
            unit="×"
            formatValue={(v) => `×${v.toFixed(2)}`}
            onChange={onChromaChange}
          />
        </div>
      </div>
    );
  },
);

GlobalAdjustmentsPanel.displayName = "GlobalAdjustmentsPanel";
