"use client";

import { memo } from "react";
import {
  SliderControl,
  TypeScaleSlider,
} from "./shared-components";
import { Divider, Select } from "ui-lab-components";
import { SANS_FONTS, MONO_FONTS } from "../../constants/font-config";

interface TypographyPanelProps {
  selectedSansFont: string;
  selectedMonoFont: string;
  headerLetterSpacingScale: number;
  bodyLetterSpacingScale: number;
  typeSizeRatio: number;
  fontSizeScale: number;
  fontWeightScale: number;
  onSansFontChange: (fontName: string) => void;
  onMonoFontChange: (fontName: string) => void;
  onHeaderLetterSpacingChange: (scale: number) => void;
  onBodyLetterSpacingChange: (scale: number) => void;
  onTypeSizeRatioChange: (ratio: number) => void;
  onFontSizeScaleChange: (scale: number) => void;
  onFontWeightScaleChange: (scale: number) => void;
}

export const TypographyPanel = memo(
  ({
    selectedSansFont,
    selectedMonoFont,
    headerLetterSpacingScale,
    bodyLetterSpacingScale,
    typeSizeRatio,
    fontSizeScale,
    fontWeightScale,
    onSansFontChange,
    onMonoFontChange,
    onHeaderLetterSpacingChange,
    onBodyLetterSpacingChange,
    onTypeSizeRatioChange,
    onFontSizeScaleChange,
    onFontWeightScaleChange,
  }: TypographyPanelProps) => {
    return (
      <div className="px-[6px] m-0 space-y-2">
        <div className="mx-[6px] mb-4 p-3 bg-background-800/40 rounded-[12px] border border-background-700 space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-400 block">
              Sans Font
            </label>
            <Select
              selectedKey={selectedSansFont}
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
            <label className="text-sm font-medium text-foreground-400 block">
              Mono Font
            </label>
            <Select
              selectedKey={selectedMonoFont}
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
        </div>

        <Divider />

        <div className="px-4 space-y-3">
          <SliderControl
            label="Header Letter Spacing"
            value={headerLetterSpacingScale}
            min={-5.0}
            max={2.0}
            step={0.05}
            unit="x"
            onChange={onHeaderLetterSpacingChange}
          />
          <SliderControl
            label="Body Letter Spacing"
            value={bodyLetterSpacingScale}
            min={0.2}
            max={5.0}
            step={0.05}
            unit="x"
            onChange={onBodyLetterSpacingChange}
          />
        </div>

        <Divider />

        <TypeScaleSlider
          value={typeSizeRatio}
          onChange={onTypeSizeRatioChange}
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
            onChange={onFontSizeScaleChange}
          />
          <SliderControl
            label="Weight Multiplier"
            value={fontWeightScale}
            min={0.01}
            max={1.5}
            step={0.01}
            unit="x"
            onChange={onFontWeightScaleChange}
          />
        </div>
      </div>
    );
  },
);

TypographyPanel.displayName = "TypographyPanel";
