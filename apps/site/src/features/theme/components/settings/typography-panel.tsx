"use client";

import { memo } from "react";
import { SliderControl } from "./shared-components";
import { Divider, Select } from "ui-lab-components";
import { SANS_FONTS, MONO_FONTS } from "../../constants/font-config";

interface TypographyPanelProps {
  selectedSansFont: string;
  selectedMonoFont: string;
  headerTypeSizeRatio: number;
  headerFontSizeScale: number;
  headerFontWeightScale: number;
  headerLetterSpacingScale: number;
  bodyTypeSizeRatio: number;
  bodyFontSizeScale: number;
  bodyFontWeightScale: number;
  bodyLetterSpacingScale: number;
  onSansFontChange: (fontName: string) => void;
  onMonoFontChange: (fontName: string) => void;
  onHeaderTypeSizeRatioChange: (ratio: number) => void;
  onHeaderFontSizeScaleChange: (scale: number) => void;
  onHeaderFontWeightScaleChange: (scale: number) => void;
  onHeaderLetterSpacingChange: (scale: number) => void;
  onBodyTypeSizeRatioChange: (ratio: number) => void;
  onBodyFontSizeScaleChange: (scale: number) => void;
  onBodyFontWeightScaleChange: (scale: number) => void;
  onBodyLetterSpacingChange: (scale: number) => void;
}

export const TypographyPanel = memo(
  ({
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
    onSansFontChange,
    onMonoFontChange,
    onHeaderTypeSizeRatioChange,
    onHeaderFontSizeScaleChange,
    onHeaderFontWeightScaleChange,
    onHeaderLetterSpacingChange,
    onBodyTypeSizeRatioChange,
    onBodyFontSizeScaleChange,
    onBodyFontWeightScaleChange,
    onBodyLetterSpacingChange,
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
            <label className="text-sm font-medium text-foreground-400 block">
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
        </div>

        <Divider />

        <div className="px-[6px] space-y-3">
          <div className="bg-background-800 border border-background-700 rounded-md p-4">
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
                min={1.067}
                max={1.333}
                step={0.001}
                unit=""
                onChange={onHeaderTypeSizeRatioChange}
              />
              <SliderControl
                label="Scale"
                value={headerFontSizeScale}
                min={0.80}
                max={1.20}
                step={0.01}
                unit="x"
                onChange={onHeaderFontSizeScaleChange}
              />
              <SliderControl
                label="Letter Spacing"
                value={headerLetterSpacingScale}
                min={-5.0}
                max={2.0}
                step={0.05}
                unit="x"
                onChange={onHeaderLetterSpacingChange}
              />
              <SliderControl
                label="Weight"
                value={headerFontWeightScale}
                min={0.80}
                max={1.20}
                step={0.01}
                unit="x"
                onChange={onHeaderFontWeightScaleChange}
              />
            </div>
          </div>

          <div className="bg-background-800 border border-background-700 rounded-md p-4">
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
                min={1.067}
                max={1.333}
                step={0.001}
                unit=""
                onChange={onBodyTypeSizeRatioChange}
              />
              <SliderControl
                label="Scale"
                value={bodyFontSizeScale}
                min={0.80}
                max={1.20}
                step={0.001}
                unit="x"
                onChange={onBodyFontSizeScaleChange}
              />
              <SliderControl
                label="Letter Spacing"
                value={bodyLetterSpacingScale}
                min={0.2}
                max={5.0}
                step={0.05}
                unit="x"
                onChange={onBodyLetterSpacingChange}
              />
              <SliderControl
                label="Weight"
                value={bodyFontWeightScale}
                min={0.80}
                max={1.20}
                step={0.01}
                unit="x"
                onChange={onBodyFontWeightScaleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TypographyPanel.displayName = "TypographyPanel";
