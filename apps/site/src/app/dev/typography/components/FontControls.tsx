"use client";

import { memo } from "react";
import { Select, Divider } from "ui-lab-components";
import { SliderControl, TypeScaleSlider } from "@/features/theme/components/settings/shared-components";
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
      <div className="space-y-4 h-full overflow-y-auto">
        <div className="sticky top-0 bg-background-900 z-10 pb-2">
          <label className="text-sm font-medium text-foreground-400 block mb-2">
            Font Family
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
          <button
            onClick={() => onReset(selectedFont)}
            className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-foreground-400 hover:text-foreground-300 border border-background-700 rounded-md hover:bg-background-800/50 transition-colors"
          >
            Reset to Default
          </button>
          <Divider className="my-3" />
        </div>

        <div className="space-y-3">
          <TypeScaleSlider
            value={metrics.typeSizeRatio}
            onChange={(value) => onMetricChange("typeSizeRatio", value)}
            fontSizeScale={metrics.fontSizeScale}
          />

          <div className="px-4 space-y-3">
            <SliderControl
              label="Global Scale"
              value={metrics.fontSizeScale}
              min={0.95}
              max={1.1}
              step={0.01}
              unit="x"
              onChange={(value) => onMetricChange("fontSizeScale", value)}
            />

            <SliderControl
              label="Global Weight"
              value={metrics.fontWeightScale}
              min={0.8}
              max={1.2}
              step={0.01}
              unit="x"
              onChange={(value) => onMetricChange("fontWeightScale", value)}
            />
          </div>

          <Divider />

          <div className="px-4 space-y-3">
            <div className="bg-background-800 border border-background-700 rounded-md p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-sm bg-background-700 border border-background-600">
                  <h4 className="text-xs mb-0">H1</h4>
                </div>
                <h3 className="text-sm font-semibold text-foreground-100">Header</h3>
              </div>
              <div className="space-y-3">
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
      </div>
    );
  },
);

FontControls.displayName = "FontControls";
