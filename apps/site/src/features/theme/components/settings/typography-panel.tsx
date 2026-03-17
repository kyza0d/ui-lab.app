"use client";

import { memo } from "react";
import { SliderControl } from "./shared-components";
import { Divider, Select } from "ui-lab-components";
import { SANS_FONTS, MONO_FONTS } from "../../constants/font-config";
import {
  MAX_GLOBAL_MIN_FONT_SIZE_PX,
  MIN_GLOBAL_MIN_FONT_SIZE_PX,
  TYPOGRAPHY_FONT_SIZE_SCALE_MAX,
  TYPOGRAPHY_FONT_SIZE_SCALE_MIN,
  TYPOGRAPHY_LINE_HEIGHT_MAX,
  TYPOGRAPHY_LINE_HEIGHT_MIN,
  TYPOGRAPHY_TYPE_SIZE_RATIO_MAX,
  TYPOGRAPHY_TYPE_SIZE_RATIO_MIN,
  TypographyConfig,
} from "../../lib/typography-config";

interface TypographyPanelProps {
  selectedSansFont: string;
  selectedMonoFont: string;
  typography: TypographyConfig;
  onSansFontChange: (fontName: string) => void;
  onMonoFontChange: (fontName: string) => void;
  onTypographyChange: (next: Partial<TypographyConfig>) => void;
}

export const TypographyPanel = memo(
  ({
    selectedSansFont,
    selectedMonoFont,
    typography,
    onSansFontChange,
    onMonoFontChange,
    onTypographyChange,
  }: TypographyPanelProps) => {
    const {
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
    } = typography;
    return (
      <div className="m-0 space-y-2">
        <div className="mx-[6px] mb-4 p-3 bg-background-800/40 rounded-[12px] border border-background-700 space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground-400 block" htmlFor="sans-font-select">
              Sans Font
            </label>
            <Select
              selectedKey={selectedSansFont}
              defaultValue={selectedSansFont}
              onSelectionChange={(key) => onSansFontChange(key as string)}
            >
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Select sans font" />
              </Select.Trigger>
              <Select.Content>
                {SANS_FONTS.map((font) => (
                  <Select.Item key={font.name} value={font.name} textValue={font.name}>
                    {font.isDefault ? `${font.name} (default)` : font.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground-400 block" htmlFor="mono-font-select">
              Mono Font
            </label>
            <Select
              selectedKey={selectedMonoFont}
              defaultValue={selectedMonoFont}
              onSelectionChange={(key) => onMonoFontChange(key as string)}
            >
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Select mono font" />
              </Select.Trigger>
              <Select.Content>
                {MONO_FONTS.map((font) => (
                  <Select.Item key={font.name} value={font.name} textValue={font.name}>
                    {font.isDefault ? `${font.name} (default)` : font.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <SliderControl
            label="Global Min Font Size"
            value={globalMinFontSizePx}
            min={MIN_GLOBAL_MIN_FONT_SIZE_PX}
            max={MAX_GLOBAL_MIN_FONT_SIZE_PX}
            step={0.25}
            unit="px"
            onChange={(size) => onTypographyChange({ globalMinFontSizePx: size })}
          />
        </div>

        <Divider />

        <div className="m-0 space-y-3">
          <div className="bg-background-800 border border-background-700 rounded-[12px] p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-sm bg-background-700 border border-background-600">
                <h4 className="text-xs mb-0">H1</h4>
              </div>
              <h3 className="text-sm font-semibold text-foreground-100">Header</h3>
            </div>
            <div className="space-y-3">
              <SliderControl
                label="Type Scale Ratio"
                value={headerTypeSizeRatio}
                min={TYPOGRAPHY_TYPE_SIZE_RATIO_MIN}
                max={TYPOGRAPHY_TYPE_SIZE_RATIO_MAX}
                step={0.001}
                unit=""
                onChange={(ratio) => onTypographyChange({ headerTypeSizeRatio: ratio })}
              />
              <SliderControl
                label="Scale"
                value={headerFontSizeScale}
                min={TYPOGRAPHY_FONT_SIZE_SCALE_MIN}
                max={TYPOGRAPHY_FONT_SIZE_SCALE_MAX}
                step={0.01}
                unit="x"
                onChange={(scale) => onTypographyChange({ headerFontSizeScale: scale })}
              />
              <SliderControl
                label="Letter Spacing"
                value={headerLetterSpacingScale}
                min={-5.0}
                max={2.0}
                step={0.05}
                unit="x"
                onChange={(scale) => onTypographyChange({ headerLetterSpacingScale: scale })}
              />
              <SliderControl
                label="Weight"
                value={headerFontWeightScale}
                min={0.80}
                max={1.20}
                step={0.01}
                unit="x"
                onChange={(scale) => onTypographyChange({ headerFontWeightScale: scale })}
              />
              <SliderControl
                label="Line Height"
                value={headerLineHeight}
                min={TYPOGRAPHY_LINE_HEIGHT_MIN}
                max={TYPOGRAPHY_LINE_HEIGHT_MAX}
                step={0.01}
                unit=""
                onChange={(lineHeight) => onTypographyChange({ headerLineHeight: lineHeight })}
              />
            </div>
          </div>

          <div className="bg-background-800 border border-background-700 rounded-[12px] p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-sm bg-background-700 border border-background-600">
                <p className="text-xs font-semibold mb-0">Aa</p>
              </div>
              <h3 className="text-sm font-semibold text-foreground-100">Body</h3>
            </div>
            <div className="space-y-3">
              <SliderControl
                label="Type Scale Ratio"
                value={bodyTypeSizeRatio}
                min={TYPOGRAPHY_TYPE_SIZE_RATIO_MIN}
                max={TYPOGRAPHY_TYPE_SIZE_RATIO_MAX}
                step={0.001}
                unit=""
                onChange={(ratio) => onTypographyChange({ bodyTypeSizeRatio: ratio })}
              />
              <SliderControl
                label="Scale"
                value={bodyFontSizeScale}
                min={TYPOGRAPHY_FONT_SIZE_SCALE_MIN}
                max={TYPOGRAPHY_FONT_SIZE_SCALE_MAX}
                step={0.001}
                unit="x"
                onChange={(scale) => onTypographyChange({ bodyFontSizeScale: scale })}
              />
              <SliderControl
                label="Letter Spacing"
                value={bodyLetterSpacingScale}
                min={0}
                max={3}
                step={0.05}
                unit="x"
                onChange={(scale) => onTypographyChange({ bodyLetterSpacingScale: scale })}
              />
              <SliderControl
                label="Weight"
                value={bodyFontWeightScale}
                min={0.80}
                max={1.20}
                step={0.01}
                unit="x"
                onChange={(scale) => onTypographyChange({ bodyFontWeightScale: scale })}
              />
              <SliderControl
                label="Line Height"
                value={bodyLineHeight}
                min={TYPOGRAPHY_LINE_HEIGHT_MIN}
                max={TYPOGRAPHY_LINE_HEIGHT_MAX}
                step={0.01}
                unit=""
                onChange={(lineHeight) => onTypographyChange({ bodyLineHeight: lineHeight })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TypographyPanel.displayName = "TypographyPanel";
