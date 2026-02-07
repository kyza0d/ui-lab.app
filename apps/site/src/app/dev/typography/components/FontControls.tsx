"use client";

import { memo } from "react";
import { Select, Divider } from "ui-lab-components";
import { SliderControl } from "@/features/theme/components/settings/shared-components";
import { SANS_FONTS } from "@/features/theme/constants/font-config";
import type { FontKey } from "@/features/theme/constants/font-config";
import type { FontDevMetrics } from "../lib/types";

interface FontControlsProps {
  selectedFont: FontKey;
  metrics: FontDevMetrics;
  onFontChange: (font: FontKey) => void;
  onMetricChange: (key: keyof FontDevMetrics, value: number) => void;
  onReset: (font: FontKey) => void;
}

export const FontControls = memo(
  ({
    selectedFont,
    metrics,
    onFontChange,
    onMetricChange,
    onReset,
  }: FontControlsProps) => {
    return (
      <div className="px-[6px] m-0 space-y-2 h-full overflow-y-auto">
        <div className="mx-[6px] mb-4 p-3 bg-background-800/40 rounded-[12px] border border-background-700 space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground-400 block">
              Font
            </label>
            <Select
              selectedKey={selectedFont}
              defaultValue={selectedFont}
              onSelectionChange={(key) => onFontChange(key as FontKey)}
            >
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Select font" />
              </Select.Trigger>
              <Select.Content>
                {SANS_FONTS.map((font) => (
                  <Select.Item key={font.name} value={font.name} textValue={font.name}>
                    {font.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <button
            onClick={() => onReset(selectedFont)}
            className="w-full px-3 py-1.5 text-xs font-medium text-foreground-400 hover:text-foreground-300 border border-background-700 rounded-md hover:bg-background-800/50 transition-colors"
          >
            Reset to Default
          </button>
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
                value={metrics.headerTypeSizeRatio}
                min={1.067}
                max={1.333}
                step={0.001}
                unit=""
                onChange={(value) => onMetricChange("headerTypeSizeRatio", value)}
              />
              <SliderControl
                label="Scale"
                value={metrics.headerFontSizeScale}
                min={0.8}
                max={1.2}
                step={0.01}
                unit="x"
                onChange={(value) => onMetricChange("headerFontSizeScale", value)}
              />
              <SliderControl
                label="Letter Spacing"
                value={metrics.headerLetterSpacingScale}
                min={-5.0}
                max={2.0}
                step={0.05}
                unit="x"
                onChange={(value) => onMetricChange("headerLetterSpacingScale", value)}
              />
              <SliderControl
                label="Weight"
                value={metrics.headerFontWeightScale}
                min={0.8}
                max={1.2}
                step={0.01}
                unit="x"
                onChange={(value) => onMetricChange("headerFontWeightScale", value)}
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
                value={metrics.bodyTypeSizeRatio}
                min={1.067}
                max={1.333}
                step={0.001}
                unit=""
                onChange={(value) => onMetricChange("bodyTypeSizeRatio", value)}
              />
              <SliderControl
                label="Scale"
                value={metrics.bodyFontSizeScale}
                min={0.8}
                max={1.2}
                step={0.001}
                unit="x"
                onChange={(value) => onMetricChange("bodyFontSizeScale", value)}
              />
              <SliderControl
                label="Letter Spacing"
                value={metrics.bodyLetterSpacingScale}
                min={0.2}
                max={5.0}
                step={0.05}
                unit="x"
                onChange={(value) => onMetricChange("bodyLetterSpacingScale", value)}
              />
              <SliderControl
                label="Weight"
                value={metrics.bodyFontWeightScale}
                min={0.8}
                max={1.2}
                step={0.01}
                unit="x"
                onChange={(value) => onMetricChange("bodyFontWeightScale", value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

FontControls.displayName = "FontControls";
