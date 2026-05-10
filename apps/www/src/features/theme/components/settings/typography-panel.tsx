"use client";

import { memo, useState, type ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { SliderControl } from "./shared-components";
import { Divider, Select } from "ui-lab-components";
import { BODY_FONTS, HEADER_FONTS, MONO_FONTS } from "../../constants/font-config";
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

type TypographySectionKey = "header" | "body";

interface TypographyPanelProps {
  selectedBodyFont: string;
  selectedHeaderFont: string;
  selectedMonoFont: string;
  typography: TypographyConfig;
  onBodyFontChange: (fontName: string) => void;
  onHeaderFontChange: (fontName: string) => void;
  onMonoFontChange: (fontName: string) => void;
  onTypographyChange: (next: Partial<TypographyConfig>) => void;
}

interface TypographySectionProps {
  icon: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const TypographySection = memo(
  ({ icon, title, isExpanded, onToggle, children }: TypographySectionProps) => {
    return (
      <div>
        <div
          className={`mx-[6px] rounded-[12px] ${isExpanded ? "bg-background-700/40 border border-background-700" : "hover:bg-background-700/40 border border-transparent hover:border-background-700 active:bg-background-800/50"} mb-[8px] transition-all duration-300 overflow-hidden group`}
        >
          <button
            type="button"
            onClick={onToggle}
            className="cursor-pointer w-full flex items-center gap-3 py-[10px] px-[10px] text-left outline-none"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-sm bg-background-700 border border-background-600 shrink-0">
              <span className="text-sm font-semibold text-foreground-100 leading-none">
                {icon}
              </span>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="text-sm font-semibold text-foreground-100 leading-tight group-hover:text-foreground-100 transition-colors">
                {title}
              </div>
            </div>

            <div
              className={`mr-3 text-foreground-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            >
              <FaChevronDown size={13} />
            </div>
          </button>

          <div
            className={`transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${isExpanded ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-3 pb-4 pt-0">
              <div className="h-px w-full bg-background-700/30 mb-4" />
              {children}
            </div>
          </div>
        </div>
        <Divider />
      </div>
    );
  },
);

TypographySection.displayName = "TypographySection";

export const TypographyPanel = memo(
  ({
    selectedBodyFont,
    selectedHeaderFont,
    selectedMonoFont,
    typography,
    onBodyFontChange,
    onHeaderFontChange,
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
    const [expandedSection, setExpandedSection] =
      useState<TypographySectionKey | null>(null);

    return (
      <div className="m-0 space-y-[8px] p-4">
        <div className="mx-[6px] mb-4 p-3 bg-background-900/40 rounded-[12px] border border-background-700 space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground-400 block">
              Mono Font
            </div>
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

          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground-400 block">
              Body Font
            </div>
            <Select
              selectedKey={selectedBodyFont}
              defaultValue={selectedBodyFont}
              onSelectionChange={(key) => onBodyFontChange(key as string)}
            >
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Select body font" />
              </Select.Trigger>
              <Select.Content>
                {BODY_FONTS.map((font) => (
                  <Select.Item key={font.name} value={font.name} textValue={font.name}>
                    {font.isDefault ? `${font.name} (default)` : font.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground-400 block">
              Header Font
            </div>
            <Select
              selectedKey={selectedHeaderFont}
              defaultValue={selectedHeaderFont}
              onSelectionChange={(key) => onHeaderFontChange(key as string)}
            >
              <Select.Trigger className="w-full">
                <Select.Value placeholder="Select header font" />
              </Select.Trigger>
              <Select.Content>
                {HEADER_FONTS.map((font) => (
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
            step={0.05}
            unit="px"
            onChange={(size) => onTypographyChange({ globalMinFontSizePx: size })}
          />
        </div>

        <Divider />

        <div className="space-y-[8px]">
          <TypographySection
            icon="H1"
            title="Header"
            isExpanded={expandedSection === "header"}
            onToggle={() =>
              setExpandedSection((current) =>
                current === "header" ? null : "header",
              )
            }
          >
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
          </TypographySection>

          <TypographySection
            icon="Aa"
            title="Body"
            isExpanded={expandedSection === "body"}
            onToggle={() =>
              setExpandedSection((current) =>
                current === "body" ? null : "body",
              )
            }
          >
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
          </TypographySection>
        </div>
      </div>
    );
  },
);

TypographyPanel.displayName = "TypographyPanel";
