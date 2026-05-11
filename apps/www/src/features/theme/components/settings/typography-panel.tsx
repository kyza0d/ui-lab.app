"use client";

import { memo, useState, type ReactNode } from "react";
import {
  FaChevronDown,
  FaFont,
  FaHeading,
  FaArrowUpRightDots,
  FaTextWidth,
  FaScaleUnbalanced,
  FaRulerHorizontal,
  FaArrowsLeftRight,
} from "react-icons/fa6";
import { SliderControl } from "./shared-components";
import { Divider, Select, Slider } from "ui-lab-components";
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
  icon: ReactNode;
  title: string;
  select: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

interface SliderRowProps {
  icon: ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
}

interface FontSelectRowProps {
  value: string;
  placeholder: string;
  options: Array<{ name: string; isDefault?: boolean }>;
  onChange: (fontName: string) => void;
}

const TypographySection = memo(
  ({ icon, title, select, isExpanded, onToggle, children }: TypographySectionProps) => {
    return (
      <div>
        <div
          className={`mx-[6px] rounded-[12px] ${isExpanded ? "bg-background-700/40 border border-background-700" : "hover:bg-background-700/40 border border-transparent hover:border-background-700 active:bg-background-800/50"} mb-[8px] transition-all duration-300 overflow-hidden group`}
        >
          <div className="w-full grid grid-cols-[minmax(0,1fr)_minmax(160px,220px)_auto] items-center gap-3 py-[10px] px-[10px]">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isExpanded}
              className="cursor-pointer min-w-0 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-left outline-none"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-[8px] bg-background-700 border border-background-600 shrink-0 text-foreground-100">
                {icon}
              </div>

              <div className="min-w-0 flex flex-col justify-center">
                <div className="text-sm font-semibold text-foreground-100 leading-tight group-hover:text-foreground-100 transition-colors">
                  {title}
                </div>
              </div>
            </button>

            <div className="min-w-0">
              {select}
            </div>

            <button
              type="button"
              onClick={onToggle}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} ${title} typography settings`}
              aria-expanded={isExpanded}
              className="cursor-pointer mr-3 text-foreground-400 transition-colors hover:text-foreground-100 outline-none"
            >
              <FaChevronDown
                size={13}
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>

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

const SliderRow = memo(
  ({ icon, label, value, min, max, step, unit, onChange }: SliderRowProps) => {
    const safeValue = value ?? (min + (max - min) / 2);

    return (
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-1.5">
        <div className="w-7 h-7 flex items-center justify-center rounded-[8px] bg-background-700 border border-background-600 shrink-0 text-foreground-100">
          {icon}
        </div>
        <label className="text-sm font-medium text-foreground-400 leading-none">
          {label}
        </label>
        <span className="border border-background-700 rounded-[8px] bg-background-900 px-1.5 py-0.5 text-sm text-foreground-300 tabular-nums">
          {safeValue.toFixed(unit ? 2 : 3)}
          {unit}
        </span>
        <div className="col-span-3">
          <Slider.Root
            value={[safeValue]}
            onValueChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
            min={min}
            max={max}
            step={step}
          />
        </div>
      </div>
    );
  },
);

SliderRow.displayName = "SliderRow";

const FontSelectRow = memo(
  ({ value, placeholder, options, onChange }: FontSelectRowProps) => {
    return (
      <Select
        selectedKey={value}
        defaultValue={value}
        onSelectionChange={(key) => onChange(key as string)}
      >
        <Select.Trigger className="w-full">
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content>
          {options.map((font) => (
            <Select.Item key={font.name} value={font.name} textValue={font.name}>
              {font.isDefault ? `${font.name} (default)` : font.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    );
  },
);

FontSelectRow.displayName = "FontSelectRow";

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
      <div className="m-0 space-y-[8px]">
        <div className="space-y-[8px]">
          <TypographySection
            icon={<FaHeading size={14} />}
            title="Header"
            select={
              <FontSelectRow
                value={selectedHeaderFont}
                placeholder="Select header font"
                options={HEADER_FONTS}
                onChange={onHeaderFontChange}
              />
            }
            isExpanded={expandedSection === "header"}
            onToggle={() =>
              setExpandedSection((current) =>
                current === "header" ? null : "header",
              )
            }
          >
            <div className="space-y-3">
              <div className="h-px w-full bg-background-700/30" />
              <SliderRow
                icon={<FaArrowUpRightDots size={13} />}
                label="Type Scale Ratio"
                value={headerTypeSizeRatio}
                min={TYPOGRAPHY_TYPE_SIZE_RATIO_MIN}
                max={TYPOGRAPHY_TYPE_SIZE_RATIO_MAX}
                step={0.001}
                unit=""
                onChange={(ratio) => onTypographyChange({ headerTypeSizeRatio: ratio })}
              />
              <SliderRow
                icon={<FaTextWidth size={13} />}
                label="Scale"
                value={headerFontSizeScale}
                min={TYPOGRAPHY_FONT_SIZE_SCALE_MIN}
                max={TYPOGRAPHY_FONT_SIZE_SCALE_MAX}
                step={0.01}
                unit="x"
                onChange={(scale) => onTypographyChange({ headerFontSizeScale: scale })}
              />
              <SliderRow
                icon={<FaArrowsLeftRight size={13} />}
                label="Letter Spacing"
                value={headerLetterSpacingScale}
                min={-5.0}
                max={2.0}
                step={0.05}
                unit="x"
                onChange={(scale) => onTypographyChange({ headerLetterSpacingScale: scale })}
              />
              <SliderRow
                icon={<FaScaleUnbalanced size={13} />}
                label="Weight"
                value={headerFontWeightScale}
                min={0.80}
                max={1.20}
                step={0.01}
                unit="x"
                onChange={(scale) => onTypographyChange({ headerFontWeightScale: scale })}
              />
              <SliderRow
                icon={<FaRulerHorizontal size={13} />}
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
            icon={<FaFont size={14} />}
            title="Body"
            select={
              <FontSelectRow
                value={selectedBodyFont}
                placeholder="Select body font"
                options={BODY_FONTS}
                onChange={onBodyFontChange}
              />
            }
            isExpanded={expandedSection === "body"}
            onToggle={() =>
              setExpandedSection((current) =>
                current === "body" ? null : "body",
              )
            }
          >
            <div className="space-y-3">
              <div className="h-px w-full bg-background-700/30" />
              <SliderRow
                icon={<FaArrowUpRightDots size={13} />}
                label="Type Scale Ratio"
                value={bodyTypeSizeRatio}
                min={TYPOGRAPHY_TYPE_SIZE_RATIO_MIN}
                max={TYPOGRAPHY_TYPE_SIZE_RATIO_MAX}
                step={0.001}
                unit=""
                onChange={(ratio) => onTypographyChange({ bodyTypeSizeRatio: ratio })}
              />
              <SliderRow
                icon={<FaTextWidth size={13} />}
                label="Scale"
                value={bodyFontSizeScale}
                min={TYPOGRAPHY_FONT_SIZE_SCALE_MIN}
                max={TYPOGRAPHY_FONT_SIZE_SCALE_MAX}
                step={0.001}
                unit="x"
                onChange={(scale) => onTypographyChange({ bodyFontSizeScale: scale })}
              />
              <SliderRow
                icon={<FaArrowsLeftRight size={13} />}
                label="Letter Spacing"
                value={bodyLetterSpacingScale}
                min={0}
                max={3}
                step={0.05}
                unit="x"
                onChange={(scale) => onTypographyChange({ bodyLetterSpacingScale: scale })}
              />
              <SliderRow
                icon={<FaScaleUnbalanced size={13} />}
                label="Weight"
                value={bodyFontWeightScale}
                min={0.80}
                max={1.20}
                step={0.01}
                unit="x"
                onChange={(scale) => onTypographyChange({ bodyFontWeightScale: scale })}
              />
              <SliderRow
                icon={<FaRulerHorizontal size={13} />}
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
      </div>
    );
  },
);

TypographyPanel.displayName = "TypographyPanel";
